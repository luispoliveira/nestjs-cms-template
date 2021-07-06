import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableUserRolePermission1625584362722 implements MigrationInterface {
    name = 'createTableUserRolePermission1625584362722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role"
                                 (
                                     "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                     "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                     "createdBy" character varying,
                                     "updatedBy" character varying,
                                     "id"        SERIAL            NOT NULL,
                                     "name"      character varying NOT NULL,
                                     CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                                     CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`CREATE TABLE "user"
                                 (
                                     "createdAt"            TIMESTAMP         NOT NULL DEFAULT now(),
                                     "updatedAt"            TIMESTAMP         NOT NULL DEFAULT now(),
                                     "createdBy"            character varying,
                                     "updatedBy"            character varying,
                                     "id"                   SERIAL            NOT NULL,
                                     "username"             character varying NOT NULL,
                                     "email"                character varying NOT NULL,
                                     "password"             character varying NOT NULL,
                                     "isActive"             boolean           NOT NULL DEFAULT false,
                                     "resetPasswordToken"   character varying,
                                     "resetPasswordExpires" TIMESTAMP,
                                     CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                                     CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                                     CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`CREATE TABLE "permission"
                                 (
                                     "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                     "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
                                     "createdBy" character varying,
                                     "updatedBy" character varying,
                                     "id"        SERIAL            NOT NULL,
                                     "name"      character varying NOT NULL,
                                     CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"),
                                     CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`CREATE TABLE "role_permissions_permission"
                                 (
                                     "roleId"       integer NOT NULL,
                                     "permissionId" integer NOT NULL,
                                     CONSTRAINT "PK_b817d7eca3b85f22130861259dd" PRIMARY KEY ("roleId", "permissionId")
                                 )`);
        await queryRunner.query(`CREATE
        INDEX "IDX_b36cb2e04bc353ca4ede00d87b" ON "role_permissions_permission" ("roleId") `);
        await queryRunner.query(`CREATE
        INDEX "IDX_bfbc9e263d4cea6d7a8c9eb3ad" ON "role_permissions_permission" ("permissionId") `);
        await queryRunner.query(`CREATE TABLE "user_roles_role"
                                 (
                                     "userId" integer NOT NULL,
                                     "roleId" integer NOT NULL,
                                     CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId")
                                 )`);
        await queryRunner.query(`CREATE
        INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE
        INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "user_permissions_permission"
                                 (
                                     "userId"       integer NOT NULL,
                                     "permissionId" integer NOT NULL,
                                     CONSTRAINT "PK_8dd49853fbad35f9a0f91b11877" PRIMARY KEY ("userId", "permissionId")
                                 )`);
        await queryRunner.query(`CREATE
        INDEX "IDX_5b72d197d92b8bafbe7906782e" ON "user_permissions_permission" ("userId") `);
        await queryRunner.query(`CREATE
        INDEX "IDX_c43a6a56e3ef281cbfba9a7745" ON "user_permissions_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission"
            ADD CONSTRAINT "FK_b36cb2e04bc353ca4ede00d87b9" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission"
            ADD CONSTRAINT "FK_bfbc9e263d4cea6d7a8c9eb3ad2" FOREIGN KEY ("permissionId") REFERENCES "permission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role"
            ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role"
            ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission"
            ADD CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission"
            ADD CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457" FOREIGN KEY ("permissionId") REFERENCES "permission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457"`);
        await queryRunner.query(`ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_bfbc9e263d4cea6d7a8c9eb3ad2"`);
        await queryRunner.query(`ALTER TABLE "role_permissions_permission" DROP CONSTRAINT "FK_b36cb2e04bc353ca4ede00d87b9"`);
        await queryRunner.query(`DROP
        INDEX "IDX_c43a6a56e3ef281cbfba9a7745"`);
        await queryRunner.query(`DROP
        INDEX "IDX_5b72d197d92b8bafbe7906782e"`);
        await queryRunner.query(`DROP TABLE "user_permissions_permission"`);
        await queryRunner.query(`DROP
        INDEX "IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP
        INDEX "IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP
        INDEX "IDX_bfbc9e263d4cea6d7a8c9eb3ad"`);
        await queryRunner.query(`DROP
        INDEX "IDX_b36cb2e04bc353ca4ede00d87b"`);
        await queryRunner.query(`DROP TABLE "role_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
