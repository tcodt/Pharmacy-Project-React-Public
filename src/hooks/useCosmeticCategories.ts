import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { CosmeticCategory } from "../entities/CosmeticCategory";


const apiClient = new APIClient<CosmeticCategory[]>("cosmetics/api/cosmetics/");



const useCosmeticsCategories = () =>
    useQuery({
        queryKey: ["CosmeticCategories"],
        queryFn: apiClient.getAll,
        staleTime: 72 * 60 * 60 * 1000,
    })

export default useCosmeticsCategories;



