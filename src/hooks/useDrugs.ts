import { useQuery } from "@tanstack/react-query"
import APIClient from "../services/api-client"
import { Drugs } from "../entities/Drug"

const apiClient = new APIClient<Drugs[]>("medicines/api/drugs/")


const useDrugs = () =>
    useQuery({
        queryKey: ["Drugs"],
        queryFn: apiClient.getAll,
        retry:3,
    })

export default useDrugs;