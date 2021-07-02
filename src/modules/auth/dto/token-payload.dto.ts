import { Role } from '../../roles/roles.model';

export class tokenPayloadDto {
  email: string;
  id: number;
  roles: Role[];
}
