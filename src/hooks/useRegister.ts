// hooks/useRegister.ts
import { useState } from 'react';
import APIClient from '../services/api-client';
import { User } from '../entities/User';

const apiClient = new APIClient<User>('accounts/register/'); // برای درخواست POST

interface RegisterParams {
  first_name: string;
  last_name: string;
  phoneNumber: string;
  national_id: string;
  password: string;
}

const useRegister = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (userData: RegisterParams) => {
    setLoading(true);
    setError(null);

    try {
      await apiClient.post(userData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("خطا در ثبت نام کاربر");
      throw err;
    }
  };

  return { registerUser, isLoading, error };
};

export default useRegister;
