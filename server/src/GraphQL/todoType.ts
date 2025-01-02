import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Task {
    @Field(() => ID)
    task_id!: string;

    @Field()
    userId!: string;

    @Field()
    title!: string;

    @Field()
    task_description!: string;

    @Field(() => Date)
    dueDate!: Date;

    @Field()
    status!: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

    @Field()
    priority!: 'LOW' | 'MEDIUM' | 'HIGH';

    @Field(() => Date)
    createdAt!: Date;

    @Field(() => Date)
    updatedAt!: Date;
}

import { InputType } from "type-graphql";

@InputType()
export class TaskInput {
    @Field()
    title!: string;

    @Field()
    task_description!: string;

    @Field()
    dueDate!: Date;

    @Field()
    userId!: string;

    @Field()
    priority!: 'LOW' | 'MEDIUM' | 'HIGH';
}
