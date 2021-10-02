import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { CookieOptions } from 'express-serve-static-core';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { userDataDto } from './dto/user-data.dto';

class AuthServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signIn(userDto: SignInDto): Promise<userDataDto> {
    return {
      accessToken: 'fdsafsadfsadfsdfsdafsadfsadf',
      refreshToken: 'fsdafsadfsadfsadfsadfsdafsafas',
      user: {
        id: 1,
        email: 'fff@ail.com',
        password: '123456',
        firstName: 'dddddd',
        lastName: 'ssssss',
        isActivated: false,
        activationLink: 'http........',
        token: null,
        userToRoles: null,
      },
    };
  }
}

describe('AuthController', () => {
  let authController: AuthController;
  let spyService: AuthService;

  const result = {
    accessToken: 'fdsafsadfsadfsdfsdafsadfsadf',
    refreshToken: 'fsdafsadfsadfsadfsadfsdafsafas',
    user: {
      id: 1,
      email: 'fff@ail.com',
      password: '123456',
      firstName: 'dddddd',
      lastName: 'ssssss',
      isActivated: false,
      activationLink: 'http........',
      token: null,
      userToRoles: null,
    },
  };

  beforeAll(async () => {
    const AuthServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        signin: jest.fn((userDto: SignInDto): Promise<userDataDto> => {
          return new Promise((resolve) => {
            resolve(result);
          });
        }),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceProvider],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    spyService = app.get<AuthService>(AuthService);
  });

  const signInDto: SignInDto = {
    email: 'fff@ttt.com',
    password: '12345678',
  };
  const response = {
    cookie: (name: string, val: string, options: CookieOptions) => {
      return {};
    },
    statusCode: 0,
  } as Response;

  describe('signin', () => {
    it('should call signin in authService', async () => {
      await authController.signin(signInDto, response);
      expect(spyService.signin).toHaveBeenCalled();
    });
  });

  describe('signin', () => {
    it('should return correct response', async () => {
      expect(await authController.signin(signInDto, response)).toEqual(result);
    });
  });
});
