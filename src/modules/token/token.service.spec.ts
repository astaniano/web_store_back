import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './token.entity';
import { User } from '../users/users.entity';
// import { Role } from '../../roles/roles.entity';
// import { UserRolesModel } from '../../roles/user-roles.model';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
      imports: [JwtModule.register({})],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
