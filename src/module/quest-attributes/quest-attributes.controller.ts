import { Controller } from '@nestjs/common';
import { QuestAttributesService } from './quest-attributes.service';

@Controller('quest-attributes')
export class QuestAttributesController {
  constructor(private readonly questAttributesService: QuestAttributesService) {}
}
