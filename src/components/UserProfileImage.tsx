// src/components/UserProfileImage.tsx

import React from 'react';
import {jwtDecode} from "jwt-decode"; // ایمپورت jwt-decode
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/user-profile.jpg"; // مسیر تصویر پیش‌فرض
import useUsers from "../hooks/useUsers"; // استفاده از هوک useUsers
import {Users} from "../entities/Users"; // اینترفیس User
import useCurrentUser from '../hooks/useCurrentUser';



const UserProfileImage: React.FC = () => {
  const{currentUser : user, isPending, error}=useCurrentUser();
  const navigate = useNavigate();

  const handleAccount = () => {
    navigate("/account");
  };

  // مدیریت خروج کاربر
  const handleLogout = () => {
    // Clear local storage token
    localStorage.removeItem("token");
  
    // Clear all cookies
    const cookies = document.cookie.split(";");
  
    for (let cookie of cookies) {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    }
  
    // Navigate to login page
    navigate("/login");
  };

  // مدیریت وضعیت بارگذاری و خطا
  if (isPending) {
    return <Spinner/>;
  }

  let src = profile; // مسیر تصویر پیش‌فرض

  if (!isPending && !error && user?.image) {
    src = user.image;
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar
          src={src}
          size="md"
          cursor="pointer"
        />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleAccount}>حساب کاربری</MenuItem>
        <MenuItem onClick={handleLogout}>خروج</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfileImage;
