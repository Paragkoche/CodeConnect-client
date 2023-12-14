import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Redux {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column("text")
  json: string;
  @OneToMany(() => User, (u) => u.redux)
  @JoinColumn()
  user: User[];
}
