import { Inject, Injectable } from '@nestjs/common';
import { AppAttributes } from './entities/app-attributes.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttributesService } from '../attributes/attributes.service';

@Injectable()
export class AppAttributesService {
  constructor(
    @InjectModel(AppAttributes.name)
    public readonly appAttributesModel: Model<AppAttributes>,

    @Inject(AttributesService)
    private readonly attributesService: AttributesService,
  ) {}

  async createAppAttribute(appId: string, key: string, value: string) {
    const attribute = await this.attributesService.getAttributesByKey(key);
    if (!attribute) {
      return null;
    }

    const appAttribute = new this.appAttributesModel({
      app: appId,
      key: attribute.key,
      value,
    });

    await appAttribute.save();
    return appAttribute;
  }

  async getAppAttributes(appId: string) {
    const appAttributes = await this.appAttributesModel.find({ app: appId });
    return appAttributes;
  }

  async createAppAttributes(
    appId: string,
    attributes: { key: string; value: string }[],
  ) {
    const appAttributes = attributes.map((attribute) =>
      this.createAppAttribute(appId, attribute.key, attribute.value),
    );
    return appAttributes;
  }
}
