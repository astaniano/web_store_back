import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedRoles1626928907310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles(value, description) VALUES ('ADMIN', 'main user');`,
    );
    await queryRunner.query(
      `INSERT INTO roles(value, description) VALUES ('USER', 'regular user');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles WHERE id = 1`);
    await queryRunner.query(`DELETE FROM roles WHERE id = 2`);
  }
}
