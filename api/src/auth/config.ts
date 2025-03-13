export const AuthConfig = {
  jwtSecret: process.env.JWT_SECRET,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10),
};
