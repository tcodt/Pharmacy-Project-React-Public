import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import transaction from "../entities/transaction";
const apiClient = new APIClient<transaction[]>("financial/transactions/");

const useAddTransaction = () => {
    return useMutation({
        mutationFn: (newTransaction: Omit<transaction, "id">) =>
            apiClient.post(newTransaction),
        onError: (error) => {
            console.error("Error adding transaction:", error);
        }
    });
};


export default useAddTransaction;
