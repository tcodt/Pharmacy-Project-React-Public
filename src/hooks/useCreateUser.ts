
import { useState } from "react";
import APIClient from "../services/api-client";
import { CreateUserParams } from "../entities/CreateUserParams"; 

interface acl {
  user:number,
  permissions:[]
}

const apiClient = new APIClient<CreateUserParams>("users/create/");
const apiClientACL = new APIClient<CreateUserParams>("acl/user-permissions/create/");

 export const useCreateUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: CreateUserParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post(userData);
      setLoading(false);
      console.log(response)
      return response; 
    } catch (err) {
      setLoading(false);
      setError("خطا در ایجاد کاربر");
      throw err; 
    }
  };

  return { createUser, isLoading, error };
};


export const useCreateUserACL = () => {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUserAcl = async (userAcl: acl) => {
    setPending(true);
    setError(null);

    try {
      const response = await apiClientACL.post(userAcl);
      setPending(false);
      return response; 
    } catch (err) {
      setPending(false);
      setError("خطا در ایجاد دسترسی کاربر کاربر");
      throw err; 
    }
  };

  return { createUserAcl, isPending, error };
};

