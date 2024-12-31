import { LOGIN_USER } from "@/GraphQL/GetUsetGQL/getUser";
import axiosClient from "@/utils/axiosClient";
import { setCookie } from 'cookies-next';

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
            query: LOGIN_USER,
            variables: {
                username: userData.emailOrUsername,
                email: userData.emailOrUsername,
                password: userData.password,
            },
        }).then(response => {
            const data = response.data.data.loginUser
            setCookie('accessToken', data.accessToken, {
                path: '/',
                maxAge: 1 * 60 * 60 * 1000
            });
            setCookie('refreshToken', data.refreshToken, {
                path: '/',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            localStorage.setItem('userData', JSON.stringify(data.userData))
            return response.data.data.loginUser
        }).catch(error => console.log(error))

    } catch (error) {
        console.error(error)
    }
}
