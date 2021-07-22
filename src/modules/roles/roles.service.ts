import { Injectable } from '@nestjs/common';
// import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  // constructor(@InjectModel(Role) private roleModel: typeof Role) {}
  constructor() {}

  async getRoleByValue(value: string) {
    // return await this.roleModel.findOne({ where: { value } });
    return null;
  }
}
