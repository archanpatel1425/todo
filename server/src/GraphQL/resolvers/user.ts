import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { generateAccessToken, generateRefreshToken } from '../../utils/tokenUtils';
import { LoginResponse, User } from '../userType';

const prisma = new PrismaClient();

@Resolver(User)
export default class userResolver {

    @Query(() => User, { nullable: true })
    async getUser(@Arg('user_id') user_id: string): Promise<User | null> {
        const userData = await prisma.user.findUnique({
            where: { user_id },
        });
        return userData || null;
    }

    @Mutation(() => LoginResponse)
    async loginUser(
        @Arg('username') username: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() context: any
    ): Promise<LoginResponse> {
        try {
            var userData = await prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }]
                }
            });

            if (!userData) throw new Error('User not found');

            const isPasswordValid = await bcrypt.compare(password, userData.password as string);
            if (!isPasswordValid) throw new Error('Invalid password');

            const refreshToken = generateRefreshToken(userData.user_id);
            const accessToken = generateAccessToken(userData.user_id);

            userData = await prisma.user.update({
                where: { user_id: userData.user_id },
                data: { refreshToken },
            });

            return { ...userData, refreshToken, accessToken };

        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Failed to log in');
        }
    }

    @Mutation(() => LoginResponse)
    async createUser(
        @Arg('first_name') first_name: string,
        @Arg('last_name') last_name: string,
        @Arg('password') password: string,
        @Arg('username') username: string,
        @Arg('email') email: string,
        @Ctx() context: any
    ): Promise<LoginResponse> {
        try {
            const checkUserThrewEmail = await prisma.user.findFirst({
                where: { email }
            });
            if (checkUserThrewEmail) {
                throw new Error('email is already taken');
            }

            const checkUserThrewUsername = await prisma.user.findFirst({
                where: { username }
            });
            if (checkUserThrewUsername) {
                throw new Error('Username is already taken');
            }

            const salt = bcrypt.genSaltSync(10);
            const encrypted_password = await bcrypt.hash(password, salt);

            var userData = await prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    username,
                    email,
                    password: encrypted_password,
                },
            });

            const refreshToken = generateRefreshToken(userData.user_id);
            const accessToken = generateAccessToken(userData.user_id);

            userData = await prisma.user.update({
                where: { email },
                data: { refreshToken },
            });
            return { ...userData, refreshToken, accessToken };

        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }
}
