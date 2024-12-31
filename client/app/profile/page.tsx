'use client'
import { getUser } from "@/UserRequest/userValidation";
import axiosClient from "@/utils/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
interface UserData {
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
}

const Page = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            router.push('/login')
        }
    }, []);

    const { data, isLoading, error, refetch } = useQuery<UserData>({
        queryKey: ['getUserData'],
        queryFn: getUser,
    });

    useEffect(() => {
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Render the user data in the table
    return (
        <div>
            {data && (
                <table className="flex justify-center items-center font-serif">
                    <tbody>
                        <tr>
                            <td>User_id </td>
                            <td>: {data.user_id}</td>
                        </tr>
                        <tr>
                            <td>First name </td>
                            <td>: {data.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last name </td>
                            <td>: {data.last_name}</td>
                        </tr>
                        <tr>
                            <td>Username </td>
                            <td>: {data.username}</td>
                        </tr>
                        <tr>
                            <td>Email-id </td>
                            <td>: {data.email}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Page;
