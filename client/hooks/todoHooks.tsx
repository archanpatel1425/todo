import { useMutation } from "@tanstack/react-query";
import { addTask, deleteTask, updateTask } from "../TodoRequest/TodoRequest";

export const usedeleteTask = () => {
    return useMutation({
        mutationFn: deleteTask,
    });
};

export const useUpdateTask = () => {
    return useMutation({
        mutationFn: updateTask
    })
};

export const useAddTask = () => {
    return useMutation({
        mutationFn: addTask
    })
};