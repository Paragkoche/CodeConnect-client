import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  phone_number: string;
  @Column()
  password: string;
  @Column()
  email: string;
}
