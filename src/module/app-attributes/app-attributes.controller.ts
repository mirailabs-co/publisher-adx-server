import { Controller } from '@nestjs/common';
import { AppAttributesService } from './app-attributes.service';

@Controller('app-attributes')
export class AppAttributesController {
  constructor(private readonly appAttributesService: AppAttributesService) {}
}
