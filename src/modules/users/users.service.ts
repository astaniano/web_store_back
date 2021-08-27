import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GrantRoleDto } from './dto/grant-role.dto';
import { User } from './users.entity';
import { RolesService } from '../roles/roles.service';
import { UserToRoles } from '../roles/user-roles.entity';
import { ImageService } from '../common/image_handler/image.service';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private roleService: RolesService,
    private imageService: ImageService,
  ) {}

  async createUser(userToCreate: User) {
    const role = await this.roleService.getRoleByValue('USER');
    const userToRoles = new UserToRoles();
    userToRoles.user_id = userToCreate.id;
    userToRoles.role_id = role.id;

    userToCreate.userToRoles = [userToRoles];
    return await this.userRepo.save(userToCreate);
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOne({
      where: { email },
      // relations: ['userToRoles', 'userToRoles.role'], // works but is not needed
    });
  }

  async findUserByActivationLink(activation_link: string) {
    return await this.userRepo.findOne({
      where: { activation_link },
    });
  }

  async findUserById(user_id: number) {
    return await this.userRepo.findOne(user_id);
  }

  async updateUser(user: User) {
    return await this.userRepo.save(user);
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

  async getUserPhoto(userId: number) {
    try {
      const absolutePathToPhotosFolder = path.resolve(
        `${__dirname}/../../../user_photos`,
      );

      // userPhoto example: "33.jpg" where 33 is userId
      const userPhoto = await this.imageService.findImageInFolder(
        absolutePathToPhotosFolder,
        userId,
      );

      return this.imageService.getImage(
        absolutePathToPhotosFolder + '/' + userPhoto,
      );
    } catch (e) {
      throw new HttpException(
        'could not find user photo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
