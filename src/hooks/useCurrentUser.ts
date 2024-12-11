// hooks/useCurrentUser.ts
import useUsers from "../hooks/useUsers"; // استفاده از هوک useUsers به جای APIClient
import { jwtDecode } from "jwt-decode"; // اصلاح import
import { Users } from "../entities/Users";

interface DecodedToken {
    user_id: number; // فیلدی که user_id را در توکن ذخیره می‌کند
}

const useCurrentUser = () => {
    // استخراج توکن از localStorage
    const token = localStorage.getItem("token");

    // دیکد کردن توکن و استخراج userId
    const decodedToken: DecodedToken | null = token ? jwtDecode<DecodedToken>(token) : null;
    const userId = decodedToken?.user_id;

    // استفاده از هوک useUsers برای دریافت لیست کاربران
    const { data: users, isPending, error } = useUsers();

    // پیدا کردن کاربر فعلی با استفاده از userId
    const currentUser = users?.find((user: Users) => user.id === userId);

    return { currentUser, isPending, error };
};

export default useCurrentUser;
