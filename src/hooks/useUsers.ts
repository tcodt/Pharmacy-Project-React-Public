import { useQuery } from "@tanstack/react-query"
import APIClient from "../services/api-client"
import { Users } from "../entities/Users"

const apiClient = new APIClient<Users[]>("users/")


const useUsers = () =>
    useQuery({
        queryKey: ["Users"],
        queryFn: apiClient.getAll,
       
    })

export default useUsers;