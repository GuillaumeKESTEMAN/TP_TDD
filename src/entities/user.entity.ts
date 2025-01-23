import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  constructor(username: string, password: string, id?: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
