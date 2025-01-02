import { CreateTodoDocument, CreateTodoMutationVariables, DeleteTodoDocument, DeleteTodoMutationVariables, GetTodoByIdDocument, GetTodoByIdQueryVariables, GetTodosDocument, GetTodosQueryVariables, UpdateTaskDocument, UpdateTaskMutationVariables } from "@/GraphQL/generated/graphql";
import {  FormData, Task } from "@/types/todoType";
import axiosClient from "@/utils/axiosClient";
import { print } from "graphql";

export const addTask = async (formData: FormData) => {
    const user_id = JSON.parse(localStorage.getItem('userData') as string).user_id
    try {
        const response = await axiosClient.post(`/graphql`,
            {
                query: print(CreateTodoDocument),
                variables: {...formData, userId: user_id } as CreateTodoMutationVariables,  
            }, { withCredentials: true }
        )
        const data = response.data.data.createTodo;
        return data;

    } catch (error) {
        console.error(error)
    }
}

export const updateTask = async (formData: Task) => {
    try {
        const response = await axiosClient.post(`/graphql`, {
            query: print(UpdateTaskDocument),
            variables: {...formData} as UpdateTaskMutationVariables
        }, {
            withCredentials: true,
        })
        const data = response.data.data;

        return data;
    } catch (error) {
        console.error(error)
    }
};

export const getTasks = async () => {
    const userId = JSON.parse(localStorage.getItem('userData') as string).user_id;
    
    try {
        const response = await axiosClient.post(`/graphql`, {
            query: print(GetTodosDocument) ,
            variables: { userId } as GetTodosQueryVariables,
        }, {
            withCredentials: true,
        }
        );
        const data = response.data.data.getTodos;
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const deleteTask = async (task_id: string) => {
    try {
        const response = await axiosClient.post(`/graphql`, {
            query: print(DeleteTodoDocument),
            variables: { task_id } as DeleteTodoMutationVariables,
        }, {
            withCredentials: true
        });
        const data = response.data.data.deleteTodo;
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getTaskById = async (task_id: string) => {
    try {
        const response = await axiosClient.post(`/graphql`, {
            query: GetTodoByIdDocument,
            variables: { task_id } as GetTodoByIdQueryVariables,
        }, {
            withCredentials: true,
        });
        const data = response.data.data.getTodoById;
        return data;
    } catch (error) {
        console.error(error)
    }
}
