import { User } from '../../users/users.entity';

export class userDataDto {
  accessToken: string;
  refreshToken: string;
  user: User;
}
