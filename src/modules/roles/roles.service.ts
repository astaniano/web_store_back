import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepositiry: typeof Role) {}
    
    async createRole(dto: createRoleDto) {
        return await this.roleRepositiry.create(dto);
    }

    async getRoleByValue(value: string) {
        return await this.roleRepositiry.findOne({where: {value}});
    }

}
