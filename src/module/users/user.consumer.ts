import { Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { UsersService } from './users.service';

@Processor('user-handle-queue')
export class UserConsumer {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}
}
