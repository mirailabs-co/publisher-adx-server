import { Module } from '@nestjs/common';
import { AppAttributesService } from './app-attributes.service';
import { AppAttributesController } from './app-attributes.controller';
import { AppAttributesSchema } from './entities/app-attributes.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AppAttributes } from './entities/app-attributes.entity';
import { AttributesModule } from '../attributes/attributes.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppAttributes.name, schema: AppAttributesSchema },
    ]),
    AttributesModule,
  ],
  controllers: [AppAttributesController],
  providers: [AppAttributesService],
  exports: [AppAttributesService],
})
export class AppAttributesModule {}
