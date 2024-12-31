import { GET_TODO_QUERY } from "@/GraphQL/GetToDoGQL/getToDo";
import axiosClient from "@/utils/axiosClient";

export const getTasks = async () => {
    const userId = JSON.parse(localStorage.getItem('userData') as string).user_id;
    try {
        const response = await axiosClient.post(`/graphql`, {
            query: GET_TODO_QUERY,
            variables: { userId },
        }, {
            withCredentials: true,
        }
        );
        const data = response.data.data.getTodos;
        return data;
    } catch (error) {
        console.error(error)
    }
}