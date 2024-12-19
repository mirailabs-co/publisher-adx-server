import { Module } from '@nestjs/common';
import { UserAttributesService } from './user-attributes.service';
import { UserAttributesController } from './user-attributes.controller';
import {
  UserAttributes,
  UserAttributesSchema,
} from './entities/user-attributes.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AttributesModule } from '../attributes/attributes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserAttributes.name,
        schema: UserAttributesSchema,
      },
    ]),
    AttributesModule,
  ],
  controllers: [UserAttributesController],
  providers: [UserAttributesService],
  exports: [UserAttributesService],
})
export class UserAttributesModule {}
