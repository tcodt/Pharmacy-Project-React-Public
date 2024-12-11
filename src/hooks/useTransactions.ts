import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import transaction from "../entities/transaction";

const apiClient = new APIClient<transaction[]>("financial/transactions/");

const useTransactions = () =>
    useQuery({
        queryKey: ["transactions"],
        queryFn: apiClient.getAll
    });

export default useTransactions
