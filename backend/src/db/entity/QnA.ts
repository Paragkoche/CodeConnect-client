import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Catalog } from "./Catalog";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  q: string;

  @Column()
  testCase: string;

  @OneToMany(() => Answer, (ans) => ans.q)
  solve: Answer[];

  @ManyToMany(() => User)
  @JoinTable()
  createBy: User[];
  @ManyToMany(() => Catalog)
  @JoinTable()
  catalog: Catalog[];
}
@Entity()
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  ans: string;
  @Column()
  states: string;
  @Column({
    nullable: true,
  })
  comment: string;
  @ManyToOne(() => Question, (q) => q.solve)
  @JoinColumn()
  q: Question;
  @ManyToMany(() => User, (s) => s.so)
  @JoinTable()
  AnsBy: User[];
}
