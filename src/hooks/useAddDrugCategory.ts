import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { DrugCategory } from "../entities/DrugCategory";

const apiClient = new APIClient<DrugCategory>("/medicines/api/category-drugs/");

const useAddDrugCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory: Omit<DrugCategory, "id" | "created_at" | "updated_at">) =>
      apiClient.post(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    onError: (error) => {
      console.error("Error adding category:", error);
    },
  });
};

export default useAddDrugCategory;
