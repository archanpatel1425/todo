import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class User {

    @Field(() => ID)
    user_id!: string;

    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field()
    first_name!: string;

    @Field()
    last_name!: string;

    @Field()
    password!: string;
}

@ObjectType()
export class LoginResponse {
    @Field(() => ID)
    user_id!: string;

    @Field()
    username!: string;

    @Field()
    email!: string;

    @Field()
    first_name!: string;

    @Field()
    last_name!: string;

    @Field()
    password!: string;
    
    @Field()
    accessToken!: string;

    @Field()
    refreshToken!: string;
}
