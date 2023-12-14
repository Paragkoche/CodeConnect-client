import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
}
