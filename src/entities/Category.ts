import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number = 0; 

  @Column()
  name: string = '';

  @Column('simple-array', { nullable: true })
  images: string[] = [];

  @Column({ nullable: true })
  price: number = 0;

  @Column()
  unit: number = 0;

  @Column()
  is_active: number = 0;
}
