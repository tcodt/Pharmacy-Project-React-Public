// hooks/useUser.ts
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { User } from "../entities/User";

const apiClient = new APIClient<User>("accounts/users/");

const useUser = () =>
    useQuery({
        queryKey: ["User"],
        queryFn: apiClient.getAll,
    })

export default useUser;
