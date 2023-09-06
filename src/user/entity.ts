import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column("varchar", { length: 255, unique: true, nullable: false })
  email: string;

  @Column("text", { nullable: false })
  password: string;
}
