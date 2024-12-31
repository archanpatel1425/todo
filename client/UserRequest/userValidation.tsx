import axiosClient from '@/utils/axiosClient';
import { getCookie, setCookie } from 'cookies-next';
import { GET_USER } from "../GraphQL/GetUsetGQL/getUser";
import { generateAccessToken, getAccessTokenPayload, getRefreshTokenPayload, verifyRefreshToken } from "../utils/tokenUtils";

type ValidateTokenResult = {
    isAuthenticated: boolean;
    userId?: string;
};

async function getUser(){
    const user_id = JSON.parse(localStorage.getItem('userData') as string).user_id;
    try {
        const response = await axiosClient.post(
            'http://localhost:5000/graphql',
            {
                query: GET_USER,
                variables: { user_id },
            }
        );
        return response.data.data.GetUser;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const validateToken = async (): Promise<ValidateTokenResult> => {
    const accessToken = getCookie('accessToken') as string;
    if (!!accessToken) {
        const userId = getAccessTokenPayload(accessToken);
        return { isAuthenticated: true, userId };
    } else {
        const refreshToken = getCookie('refreshToken') as string;
        if (refreshToken && verifyRefreshToken(refreshToken)) {
            const userId = getRefreshTokenPayload(refreshToken);
            const newAccessToken = generateAccessToken(userId);
            setCookie('accessToken', newAccessToken, {
                path: '/',
                maxAge: 1 * 60 * 60 * 1000
            });

            return { isAuthenticated: true, userId };
        } else {
            return { isAuthenticated: false };
        }
    }
};

async function validateUser(): Promise<{ isAuthenticated: boolean }> {
    const { isAuthenticated, userId } = await validateToken();
    if (isAuthenticated) {
        const user = await getUser();
        if (user) {
            localStorage.setItem('userData', JSON.stringify(user));
        }
        return { isAuthenticated: true };
    } else {
        return { isAuthenticated: false };
    }
}

export { getUser, validateToken, validateUser };

