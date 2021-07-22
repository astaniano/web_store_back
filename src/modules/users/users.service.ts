import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrantRoleDto } from './dto/grant-role.dto';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    // private roleService: RolesService,
  ) {}

  async createUser(userToCreate: User) {
    const createdUser = await this.userRepo.save(userToCreate);
    // const role = await this.roleService.getRoleByValue('USER');
    // await createdUser.$set('roles', [role.id]);
    // createdUser.roles = [role];
    return createdUser;
  }

  async getUserByEmail(email: string) {
    // return await this.userRepo.findOne({
    //   where: { email },
    //   include: { all: true },
    // });
    return null;
  }

  async getUserByActivationLink(activation_link: string) {
    // return await this.userRepo.findOne({
    //   where: { activation_link },
    // });
    return null;
  }

  async findById(user_id: number) {
    // return await this.userRepo.findByPk(user_id);
    return null;
  }

  async grantRole(dto: GrantRoleDto) {
    // const user = await this.userRepo.findByPk(dto.userId);
    // const role = await this.roleService.getRoleByValue(dto.value);
    // if (role && user) {
    //   await user.$add('role', role.id);
    //   return dto;
    // }
    // throw new HttpException(
    //   'either user or role was not found',
    //   HttpStatus.NOT_FOUND,
    // );
    return null;
  }
}
