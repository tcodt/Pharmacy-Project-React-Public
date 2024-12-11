import { useQuery } from "@tanstack/react-query"
import APIClient from "../services/api-client"
import { Cosmetic } from "../entities/Cosmetic";

const apiClient = new APIClient<Cosmetic[]>("cosmetics/api/cosmetics/");


const useCosmetics = () =>
    useQuery({
        queryKey: ["Cosmetic"],
        queryFn: apiClient.getAll,
        retry:3,
    })

export default useCosmetics;