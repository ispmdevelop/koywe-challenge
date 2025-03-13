import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthConfig } from './config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { DBModule } from '../db/db.module';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { DBService } from '../db/db.service';

const getModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      UserModule,
      PassportModule,
      DBModule,
      JwtModule.register({
        secret: AuthConfig.jwtSecret,
        signOptions: { expiresIn: '2h' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
  }).compile();
  return module;
};

describe('AuthController', () => {
  let controller: AuthController;
  let userService: UserService;
  let authService: AuthService;
  let dbService: DBService;
  let module: TestingModule;

  describe('when user log in', () => {
    const validUser: Partial<User> = {
      id: '562914db-e5a9-4bf9-bff3-6a75c0719076',
      email: 'ispmdevelop@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    beforeEach(async () => {
      module = await getModule();
      controller = module.get<AuthController>(AuthController);
      authService = module.get<AuthService>(AuthService);
      jest.spyOn(authService, 'validateUser').mockImplementation(() => {
        return validUser as any;
      });
    });
    it('should return a token', async () => {
      const user = { email: 'ispmdevelop@gmail.com', password: 'pass123' };
      const res = await controller.login({ user }, user);

      expect(res).toHaveProperty('access_token');
    });
  });

  describe('when user try to sign up', () => {
    const validUser: Partial<User> = {
      id: '562914db-e5a9-4bf9-bff3-6a75c0719076',
      email: 'ispmdevelop@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    describe('and user does not exist', () => {
      beforeEach(async () => {
        module = await getModule();
        controller = module.get<AuthController>(AuthController);
        userService = module.get<UserService>(UserService);
        dbService = module.get<DBService>(DBService);
        jest.spyOn(userService, 'findByEmail').mockImplementation(() => {
          return null;
        });
        jest.spyOn(dbService.user, 'create').mockImplementation(() => {
          return validUser as any;
        });
      });

      it('should return a token', async () => {
        const body = { email: 'ispmdevelop@gmail.com', password: 'pass123' };
        const res = await controller.signUp(body);
        expect(res).toHaveProperty('access_token');
      });
    });

    describe('and user already exists', () => {
      beforeEach(async () => {
        module = await getModule();
        controller = module.get<AuthController>(AuthController);
        userService = module.get<UserService>(UserService);
        dbService = module.get<DBService>(DBService);
        jest.spyOn(userService, 'findByEmail').mockImplementation(() => {
          return validUser as any;
        });
      });

      it('should return an error', async () => {
        const body = { email: 'ispmdevelop@gmail.com', password: 'pass123' };
        return expect(controller.signUp(body)).rejects.toThrow(
          'Email already in use',
        );
      });
    });
  });
});
