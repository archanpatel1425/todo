'use client'
import { UserData } from "@/types/userType";
import { getUser } from "@/UserRequest/userValidation";
import axiosClient from "@/utils/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";


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
