import { Priority, PrismaClient, Status } from "@prisma/client";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../todoType";

const prisma = new PrismaClient();

@Resolver(Task)
export class TaskResolver {

    @Query(() => [Task])
    async getTodos(@Arg("userId") userId: string): Promise<Task[]> {
        try {
            return await prisma.task.findMany({
                where: { userId },
            });
        } catch (error) {
            console.error("Error fetching tasks:", error);
            throw new Error("Unable to fetch tasks.");
        }
    }

    @Query(() => Task, { nullable: true })
    async getTodoById(@Arg("task_id") task_id: string): Promise<Task | null> {
        const task = await prisma.task.findUnique({ where: { task_id } });
        return task || null;
    }

    @Mutation(() => Task)
    async createTodo(
        @Arg('title') title: string,
        @Arg('task_description') task_description: string,
        @Arg('dueDate') dueDate: string,
        @Arg('userId') userId: string,
        @Arg('priority') priority: Priority,
        @Ctx() context: any): Promise<Task> {

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

    @Mutation(() => Task)
    async deleteTodo(@Arg("task_id") task_id: string): Promise<Task> {
        const task = await prisma.task.findUnique({ where: { task_id } });
        if (!task) {
            throw new Error("Task not found");
        }
        return await prisma.task.delete({ where: { task_id } });
    }

    @Mutation(() => Task)
    async updateTask(
        @Arg("task_id") task_id: string,
        @Arg('title') title: string,
        @Arg('task_description') task_description: string,
        @Arg('dueDate') dueDate: string,
        @Arg('priority') priority: Priority,
        @Arg('status') status: Status,
        @Ctx() context: any
    ): Promise<Task> {
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
        } catch (error) {
            console.error('Error updating task:', error);
            throw new Error('Failed to update task');
        }
    }

    @Mutation(() => Task)
    async completeTodo(
        @Arg("task_id") task_id: string,
        @Ctx() context: any
    ): Promise<Task> {
        const task = await prisma.task.findUnique({ where: { task_id } });
        if (!task) {
            throw new Error("Task not found");
        }
        return await prisma.task.update({
            where: { task_id },
            data: { status: "COMPLETED" },
        });
    }
}
