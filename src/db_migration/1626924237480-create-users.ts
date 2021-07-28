import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsers1626924237480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users (
             id serial PRIMARY KEY,
             email VARCHAR(150) UNIQUE NOT NULL,
             password VARCHAR(200) NOT NULL,
             first_name VARCHAR(100) NOT NULL,
             last_name VARCHAR(100) NOT NULL,
             is_activated BOOLEAN DEFAULT FALSE,
             activation_link VARCHAR(300) NOT NULL
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
  }
}
