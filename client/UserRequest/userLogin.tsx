import { LoginUserDocument, LoginUserMutationVariables } from "@/GraphQL/generated/graphql";
import axiosClient from "@/utils/axiosClient";
import { setCookie } from 'cookies-next';
import { print } from "graphql";

interface user {
    emailOrUsername: string,
    password: string
}

export interface LoginResponse {
    token: string,
    user: object
}

export async function loginUser(userData: user) {
    try {
        await axiosClient.post(`/graphql`, {
            query: print(LoginUserDocument),
            variables: {
                username: userData.emailOrUsername,
                email: userData.emailOrUsername,
                password: userData.password,
            } as LoginUserMutationVariables,
        }).then(response => {
            const data = response.data.data.loginUser
            setCookie('accessToken', data.accessToken, {
                path: '/',
                maxAge: 1 * 60 * 60 
            });
            setCookie('refreshToken', data.refreshToken, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60    
            });
            localStorage.setItem('userData', JSON.stringify(data))
            return response.data.data.loginUser
        }).catch(error => console.log(error))

    } catch (error) {
        console.error(error)
    }
}
