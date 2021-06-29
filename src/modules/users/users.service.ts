import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/modules/roles/roles.service';
import { GrantRoleDto } from './dto/grant-role.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(userToCreate: User) {
    const createdUser = await this.userRepository.create(userToCreate);
    const role = await this.roleService.getRoleByValue('USER');
    await createdUser.$set('roles', [role.id]);
    createdUser.roles = [role];
    return createdUser;
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async grantRole(dto: GrantRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
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
