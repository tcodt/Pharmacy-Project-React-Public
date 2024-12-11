import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { CosmeticCategory } from "../entities/CosmeticCategory";

const apiClient = new APIClient<CosmeticCategory[]>("cosmetics/api/cosmetics/");

const useAddCosmeticCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory: Omit<CosmeticCategory, "id" | "created_at" | "updated_at">) =>
      apiClient.post(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    onError: (error) => {
      console.error("Error adding category:", error);
    },
  });
};

export default useAddCosmeticCategory;
