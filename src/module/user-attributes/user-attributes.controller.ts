import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserAttributesService } from './user-attributes.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JWTGuard } from 'src/auth/guard/jwt.guard';
import { CreateUserAttributesDto } from './dtos/CreateUserAttributes.dto';

@Controller('user-attributes')
export class UserAttributesController {
  constructor(private readonly userAttributesService: UserAttributesService) {}

  @ApiTags('User Attributes')
  @UseGuards(JWTGuard)
  @ApiBearerAuth('access-token')
  @Post('/')
  @ApiOperation({
    description: 'Api create user attributes',
    summary: 'Api create user attributes',
  })
  async createUserAttributes(
    @Req() req,
    @Body() body: CreateUserAttributesDto,
  ) {
    return this.userAttributesService.createUserAttributes(
      req.user._id,
      body.attributes,
    );
  }
}
