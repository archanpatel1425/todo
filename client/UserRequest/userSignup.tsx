import { CreateUserDocument, CreateUserMutationVariables } from '@/GraphQL/generated/graphql';
import axiosClient from '@/utils/axiosClient';
import { setCookie } from 'cookies-next';
import { print } from "graphql";

interface formData {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string
}

export interface LoginResponse {
    token: string,
    user: object
}

export async function userSignUp(userData: formData) {
    try {
        await axiosClient.post('/graphql', {
            query: print(CreateUserDocument),
            variables: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                username: userData.username,
                email: userData.email,
                password: userData.password,
            } as CreateUserMutationVariables,
        }, {
            withCredentials: true,
        })
            .then((response) => {
                const data = response.data.data.createUser
                setCookie('accessToken', data.accessToken, {
                    path: '/',
                    maxAge: 1 * 60 * 60
                });
                setCookie('refreshToken', data.refreshToken, {
                    path: '/',
                    maxAge: 7 * 24 * 60 * 60
                });
                localStorage.setItem('userData', JSON.stringify(data))
                return data
            })
            .catch((error) => {
                console.error('SignUp Failed:', error);
            });

    } catch (error) {
        console.error('Signup Failed:', error);
    }
}
