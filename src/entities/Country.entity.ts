import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType('Country')
@Entity({ name: 'Countries' })
export default class CountryEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ unique: true })
    code: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    emoji: string;

    @Field()
    @Column()
    continent: string;
}

