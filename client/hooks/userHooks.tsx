import { loginUser } from '@/UserRequest/userLogin';
import { userSignUp } from '@/UserRequest/userSignup';
import { useMutation } from '@tanstack/react-query';

export const useLoginUser = () => {
    return useMutation({
        mutationKey: ['loginUser'],
        mutationFn: loginUser,
    });
};

export const useCreateUser = () => {
    return useMutation({
        mutationKey: ['SignupUser'],
        mutationFn: userSignUp
    })
};

