import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [forwardRef(() => UsersModule)],
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
