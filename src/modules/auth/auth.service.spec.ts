import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './token/token.entity';import { User } from '../users/users.entity';
import { CommonModule } from '../common/common.module';
import { TokenService } from './token/token.service';
// import { Role } from '../roles/roles.entity';
// import { UserRolesModel } from '../roles/user-roles.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, TokenService],
      imports: [   ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('ffffffff', () => {
    expect(3).toEqual(3);
  });
});
