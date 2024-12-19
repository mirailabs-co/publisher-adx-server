import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guard/jwt.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards(JWTGuard)
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
