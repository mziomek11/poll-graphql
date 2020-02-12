import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
export default class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 255, unique: true })
  username: string;

  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Field()
  @Column('bool', { default: false })
  confirmed: boolean;

  @Column('varchar', { length: 255 })
  password: string;
}
