import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTokens1626927404425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE tokens (
            id serial PRIMARY KEY,
            refresh_token VARCHAR(450) NOT NULL,
            user_id INT UNIQUE NOT NULL,
              CONSTRAINT fk_user
                FOREIGN KEY(user_id)
                REFERENCES users(id)
                ON DELETE CASCADE
          );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tokens;`);
  }
}
