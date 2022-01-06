import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addColumnInProducts1641460079083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("products", new TableColumn({
            name: "price",
            type: "numeric(5,2)",
            default: 19.50
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "price")
    }
}
