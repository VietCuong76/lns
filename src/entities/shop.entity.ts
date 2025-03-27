import { ROLE } from 'src/common/constants/enum';
import { AbstracEntity } from 'src/common/entities/abstracEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shop extends AbstracEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  status: string;

  @Column({ default: false })
  verify: boolean;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  roles: ROLE;
}
