"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const type_graphql_1 = require("type-graphql");
const tokenUtils_1 = require("../../utils/tokenUtils");
const userType_1 = require("../userType");
const prisma = new client_1.PrismaClient();
let userResolver = class userResolver {
    async getUser(user_id) {
        const userData = await prisma.user.findUnique({
            where: { user_id },
        });
        return userData || null;
    }
    async loginUser(username, email, password, context) {
        try {
            var userData = await prisma.user.findFirst({
                where: {
                    OR: [{ username }, { email }]
                }
            });
            if (!userData)
                throw new Error('User not found');
            const isPasswordValid = await bcrypt_1.default.compare(password, userData.password);
            if (!isPasswordValid)
                throw new Error('Invalid password');
            const refreshToken = (0, tokenUtils_1.generateRefreshToken)(userData.user_id);
            const accessToken = (0, tokenUtils_1.generateAccessToken)(userData.user_id);
            userData = await prisma.user.update({
                where: { user_id: userData.user_id },
                data: { refreshToken },
            });
            return { ...userData, refreshToken, accessToken };
        }
        catch (error) {
            console.error('Login failed:', error);
            throw new Error('Failed to log in');
        }
    }
    async createUser(first_name, last_name, password, username, email, context) {
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
            const salt = bcrypt_1.default.genSaltSync(10);
            const encrypted_password = await bcrypt_1.default.hash(password, salt);
            var userData = await prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    username,
                    email,
                    password: encrypted_password,
                },
            });
            const refreshToken = (0, tokenUtils_1.generateRefreshToken)(userData.user_id);
            const accessToken = (0, tokenUtils_1.generateAccessToken)(userData.user_id);
            userData = await prisma.user.update({
                where: { email },
                data: { refreshToken },
            });
            return { ...userData, refreshToken, accessToken };
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => userType_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "getUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userType_1.LoginResponse),
    __param(0, (0, type_graphql_1.Arg)('username')),
    __param(1, (0, type_graphql_1.Arg)('email')),
    __param(2, (0, type_graphql_1.Arg)('password')),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "loginUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => userType_1.LoginResponse),
    __param(0, (0, type_graphql_1.Arg)('first_name')),
    __param(1, (0, type_graphql_1.Arg)('last_name')),
    __param(2, (0, type_graphql_1.Arg)('password')),
    __param(3, (0, type_graphql_1.Arg)('username')),
    __param(4, (0, type_graphql_1.Arg)('email')),
    __param(5, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "createUser", null);
userResolver = __decorate([
    (0, type_graphql_1.Resolver)(userType_1.User)
], userResolver);
exports.default = userResolver;
