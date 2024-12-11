import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import {CreateDrugs} from "../entities/Drug";

const apiClient = new APIClient<CreateDrugs[]>("medicines/api/drugs/");

const useAddDrug = () => {
  return useMutation({
    mutationFn: (newDrug: CreateDrugs) =>
      apiClient.post(newDrug),
  });
};

export default useAddDrug;
