import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { createPassword } from "@/util/password";
import { Answer } from "./QnA";
import { Redux } from "./redux";
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
  @Column({ unique: true })
  email: string;
  @Column()
  role: "Teacher" | "Student";
  @Column({ default: 0 })
  score: number;
  @ManyToMany(() => Answer, (ans) => ans.AnsBy)
  so: Answer[];
  @ManyToOne(() => Redux, (r) => r.user)
  @JoinColumn()
  redux: Redux;
  @BeforeInsert()
  async g(password: string) {
    return await createPassword(this, password);
  }
}
