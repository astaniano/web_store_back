import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GrantRoleDto } from './dto/grant-role.dto';
import { User } from './users.model';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(userToCreate: User) {
    const createdUser = await this.userModel.create(userToCreate);
    const role = await this.roleService.getRoleByValue('USER');
    await createdUser.$set('roles', [role.id]);
    createdUser.roles = [role];
    return createdUser;
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async getUserByActivationLink(activation_link: string) {
    return await this.userModel.findOne({
      where: { activation_link },
    });
  }

  async findById(user_id: number) {
    return await this.userModel.findByPk(user_id);
  }

  async grantRole(dto: GrantRoleDto) {
    const user = await this.userModel.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'either user or role was not found',
      HttpStatus.NOT_FOUND,
    );
  }
}
