import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Cosmetic } from "../entities/Cosmetic";

const apiClient = new APIClient<Cosmetic[]>("cosmetics/api/cosmetics/");

const useAddCosmetic = () => {
  return useMutation({
    mutationFn: (newCosmetic: Omit<Cosmetic, "id" | "created_at">) => 
      apiClient.post(newCosmetic),
  });
};

export default useAddCosmetic;
