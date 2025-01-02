'use client';

import EditForm from '@/components/EditForm';
import Loader from '@/components/Loader';
import { GetTodoByIdDocument, GetTodoByIdQueryVariables } from '@/GraphQL/generated/graphql';
import { Task } from '@/types/todoType';
import axiosClient from '@/utils/axiosClient';
import { useQuery } from '@tanstack/react-query';
import {print} from 'graphql';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
    const params = useParams();
    const task_id = params.task_id as string;
    const [showForm, setShowForm] = useState(false);
    const [taskDetail, setTaskDetail] = useState<Task | null>(null);

    const getTaskById = async () => {
        try {
            const response = await axiosClient.post(`/graphql`, {
                query: print(GetTodoByIdDocument),
                variables: { task_id: task_id[0] } as GetTodoByIdQueryVariables,
            }, {
                withCredentials: true,
            });
            const data = response.data.data.getTodoById;
            return data;
        } catch (error) {
            console.error(error)
        }
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ['gettaskdetails', task_id],
        queryFn: getTaskById,
    });

    useEffect(() => {
        if (data) {
            setTaskDetail(data);
        }
    }, [data]);

    const onSubmitForm = (formData: Task) => {
        setShowForm(false);
        setTaskDetail(formData);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                taskDetail && (
                    <div className="flex flex-col justify-center items-center font-serif">
                        <div className="flex flex-col mt-12 border-4 rounded-xl border-blue-500 p-8 justify-center items-center">
                            <header className="text-blue-700 font-bold text-5xl">Task Details</header>
                            <div className="mt-6 text-lg">
                                <div>Task ID : {taskDetail.task_id}</div>
                                <div>Title : {taskDetail.title}</div>
                                <div>Description : {taskDetail.task_description}</div>
                                <div>Priority : {taskDetail.priority}</div>
                                <div>Status : {taskDetail.status}</div>
                                <div>Due Date : {new Date(taskDetail.dueDate).toISOString().split('T')[0]}</div>
                                <div className="flex justify-center">
                                    <button
                                        className="w-full text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-xl mt-8"
                                        onClick={() => setShowForm(true)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
            {showForm && taskDetail && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg overflow-y-auto">
                        <EditForm OldFormData={taskDetail} onFormSubmit={onSubmitForm} onClose={closeForm} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
