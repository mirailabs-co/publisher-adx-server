import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Attributes, AttributesSchema } from './entities/attributes.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Attributes.name,
        schema: AttributesSchema,
      },
    ]),
  ],
  controllers: [AttributesController],
  providers: [AttributesService],
  exports: [AttributesService],
})
export class AttributesModule {}
