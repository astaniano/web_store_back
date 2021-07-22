import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1626924237480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users (
             id serial PRIMARY KEY,
             email VARCHAR(50) UNIQUE NOT NULL,
             password VARCHAR(50) NOT NULL,
             firstName VARCHAR(50) NOT NULL,
             lastName VARCHAR(50) NOT NULL,
             isActivated BOOLEAN DEFAULT FALSE,
             activationLink VARCHAR(255) NOT NULL
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
  }
}
