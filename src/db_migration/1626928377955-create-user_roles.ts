import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserRoles1626928377955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE user_to_roles (
            id serial PRIMARY KEY,
            user_id INT NOT NULL,
            role_id INT NOT NULL,
                CONSTRAINT fk_user
                    FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE,
                CONSTRAINT fk_roles
                    FOREIGN KEY(role_id)
                    REFERENCES roles(id)
                    ON DELETE CASCADE   
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_roles;`);
  }
}
