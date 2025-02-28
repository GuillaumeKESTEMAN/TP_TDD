import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../routes/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '15m' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
