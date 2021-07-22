// import { Role } from './roles.entity';
// import { User } from '../users/users.entity';

// @Table({ tableName: 'user_roles', timestamps: false })
// export class UserRolesModel extends Model<UserRolesModel> {
//   @Column({
//     type: DataType.INTEGER,
//     unique: true,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   id: number;

//   @ForeignKey(() => Role)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   role_id: number;

//   @ForeignKey(() => User)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   user_id: number;
// }
