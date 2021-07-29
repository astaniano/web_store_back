import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleModel: Repository<Role>) {}

  async getRoleByValue(value: string) {
    return await this.roleModel.findOne({ where: { value } });
  }
}
