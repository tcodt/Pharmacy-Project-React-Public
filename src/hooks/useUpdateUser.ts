import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Users } from "../entities/Users";

const userClient = new APIClient<Users[]>("users/update");

const useUpdateUser = () => {
  return useMutation({
    mutationFn: (userData: Users) => {
      return userClient.put<Users>(userData.id, userData); // Convert id to string if necessary
    },
    onSuccess: () => {
      console.log("User updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
};

export default useUpdateUser;
