import { addTask } from "@/components/AddTaskForm";
import { updateTask } from "@/components/EditForm";
import { deleteTask } from "@/components/UserTasks";
import { useMutation } from "@tanstack/react-query";

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