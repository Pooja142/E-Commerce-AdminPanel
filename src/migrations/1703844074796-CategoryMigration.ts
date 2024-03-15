import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CategoryMigration1703844074796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "category",
            columns: [
                { name: "id", type: "serial", isPrimary: true },
                { name: "name", type: "varchar" },
                { name: "images", type: "text", isArray: true, isNullable: true },
                { name: "price", type: "numeric", isNullable: true },
                { name: "unit", type: "integer" },
                { name: "is_active", type: "integer" }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("category");
    }

}
