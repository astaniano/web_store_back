import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRoles1626928082066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE roles (
            id serial PRIMARY KEY,
            value VARCHAR(40) UNIQUE NOT NULL,
            description VARCHAR(150)            
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE roles;`);
  }
}
