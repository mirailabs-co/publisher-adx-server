import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAttributes } from './entities/user-attributes.entity';
import { AttributesService } from '../attributes/attributes.service';

@Injectable()
export class UserAttributesService {
  constructor(
    @InjectModel(UserAttributes.name)
    public readonly userAttributesModel: Model<UserAttributes>,

    @Inject(AttributesService)
    private readonly attributesService: AttributesService,
  ) {}

  async createUserAttribute(userId: string, key: string, value: string) {
    const attribute = await this.attributesService.getAttributesByKey(key);
    if (!attribute) {
      return null;
    }

    const userAttribute = new this.userAttributesModel({
      user: userId,
      key: attribute.key,
      value,
    });

    await userAttribute.save();
    return userAttribute;
  }

  async createUserAttributes(
    userId: string,
    attributes: { key: string; value: string }[],
  ) {
    const userAttributes = attributes.map((attribute) =>
      this.createUserAttribute(userId, attribute.key, attribute.value),
    );
    return userAttributes;
  }

  async getUserAttributes(userId: string) {
    return this.userAttributesModel.find({ user: userId });
  }
}
