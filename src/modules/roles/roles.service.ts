import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  async getRoleByValue(value: string) {
    return await this.roleModel.findOne({ where: { value } });
  }
}
