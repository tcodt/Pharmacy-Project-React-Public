import { useQuery } from "@tanstack/react-query";
import { DrugCategory } from "../entities/DrugCategory";
import APIClient from "../services/api-client";


const apiClient = new APIClient<DrugCategory[]>("medicines/api/category-drugs/")



const useDrugsCategories = () =>
    useQuery({
        queryKey: ["DrugCategories"],
        queryFn: apiClient.getAll,
        staleTime: 72 * 60 * 60 * 1000,
    })

export default useDrugsCategories;



