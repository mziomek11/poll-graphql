import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;
}
