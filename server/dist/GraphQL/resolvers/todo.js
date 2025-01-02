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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const client_1 = require("@prisma/client");
const type_graphql_1 = require("type-graphql");
const todoType_1 = require("../todoType");
const prisma = new client_1.PrismaClient();
let TaskResolver = class TaskResolver {
    async getTodos(userId) {
        try {
            return await prisma.task.findMany({
                where: { userId },
            });
        }
        catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Unable to fetch tasks.");
        }
    }
    async getTodoById(task_id) {
        const task = await prisma.task.findUnique({ where: { task_id } });
        return task || null;
    }
    async createTodo(title, task_description, dueDate, userId, priority, context) {
        const userExists = await prisma.user.findUnique({ where: { user_id: userId } });
        if (!userExists) {
            throw new Error("User not authorized to create tasks");
        }
        const date = new Date(dueDate);
        return await prisma.task.create({
            data: {
                userId: userId,
                title: title,
                task_description: task_description,
                dueDate: date,
                priority: priority,
            },
        });
    }
    async deleteTodo(task_id) {
        const task = await prisma.task.findUnique({ where: { task_id } });
        if (!task) {
            throw new Error("Task not found");
        }
        return await prisma.task.delete({ where: { task_id } });
    }
    async updateTask(task_id, title, task_description, dueDate, priority, status, context) {
        const date = new Date(dueDate);
        try {
            const updatedTask = await prisma.task.update({
                where: { task_id },
                data: {
                    title: title,
                    task_description: task_description,
                    dueDate: date,
                    priority: priority,
                    status: status,
                },
            });
            return updatedTask;
        }
        catch (error) {
            console.error('Error updating task:', error);
            throw new Error('Failed to update task');
        }
    }
    async completeTodo(task_id, context) {
        const task = await prisma.task.findUnique({ where: { task_id } });
        if (!task) {
            throw new Error("Task not found");
        }
        return await prisma.task.update({
            where: { task_id },
            data: { status: "COMPLETED" },
        });
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [todoType_1.Task]),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTodos", null);
__decorate([
    (0, type_graphql_1.Query)(() => todoType_1.Task, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("task_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "getTodoById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => todoType_1.Task),
    __param(0, (0, type_graphql_1.Arg)('title')),
    __param(1, (0, type_graphql_1.Arg)('task_description')),
    __param(2, (0, type_graphql_1.Arg)('dueDate')),
    __param(3, (0, type_graphql_1.Arg)('userId')),
    __param(4, (0, type_graphql_1.Arg)('priority')),
    __param(5, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTodo", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => todoType_1.Task),
    __param(0, (0, type_graphql_1.Arg)("task_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTodo", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => todoType_1.Task),
    __param(0, (0, type_graphql_1.Arg)("task_id")),
    __param(1, (0, type_graphql_1.Arg)('title')),
    __param(2, (0, type_graphql_1.Arg)('task_description')),
    __param(3, (0, type_graphql_1.Arg)('dueDate')),
    __param(4, (0, type_graphql_1.Arg)('priority')),
    __param(5, (0, type_graphql_1.Arg)('status')),
    __param(6, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => todoType_1.Task),
    __param(0, (0, type_graphql_1.Arg)("task_id")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "completeTodo", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)(todoType_1.Task)
], TaskResolver);
