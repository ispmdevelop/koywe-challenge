import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DBService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DBService) {}

  create(user: User) {
    return this.dbService.user.create({ data: user });
  }

  findByEmail(email: string) {
    return this.dbService.user.findUnique({ where: { email } });
  }
}
