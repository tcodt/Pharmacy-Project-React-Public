import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import useCurrentUser from "../hooks/useCurrentUser"; // هوک برای دریافت اطلاعات کاربر
import useUpdateUser from "../hooks/useUpdateUser"; // هوک برای به‌روزرسانی اطلاعات کاربر

const UserAccount: React.FC = () => {
  const { currentUser, isPending, error } = useCurrentUser();
  const { mutate: updateUser } = useUpdateUser(); // تابع برای به‌روزرسانی اطلاعات کاربر

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phoneNumber: "",
    national_id: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      // پر کردن فرم با اطلاعات فعلی کاربر
      setFormData({
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        phoneNumber: currentUser.phoneNumber,
        national_id: currentUser.national_id,
        password: "", // پسورد را خالی می‌گذاریم
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //TODO: Changed by Amir
    if (!currentUser?.id) {
      console.log("User ID is undefined. Cannot update user.");
      return;
    }

    // updateUser({ ...formData, id: currentUser?.id }); //TODO: Changed by Amir

    //TODO: Changed by Amir
    const fullUserData = {
      ...formData,
      id: currentUser.id,
      created_at: currentUser.created_at,
      marital_status: currentUser.marital_status,
      image: currentUser.image,
    };

    updateUser(fullUserData); //TODO: Changed by Amir
  };

  if (isPending) return <Text>در حال بارگذاری...</Text>;
  if (error) return <Text color="red.500">خطا در بارگذاری اطلاعات کاربر</Text>;

  return (
    <Box
      maxW="xl"
      mx="auto"
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        مدیریت حساب کاربری
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="first_name" isRequired>
          <FormLabel>نام</FormLabel>
          <Input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="نام خود را وارد کنید"
          />
        </FormControl>
        <FormControl id="last_name" isRequired mt={4}>
          <FormLabel>نام خانوادگی</FormLabel>
          <Input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="نام خانوادگی خود را وارد کنید"
          />
        </FormControl>
        <FormControl id="phoneNumber" isRequired mt={4}>
          <FormLabel>شماره موبایل</FormLabel>
          <Input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="شماره موبایل خود را وارد کنید"
          />
        </FormControl>
        <FormControl id="national_id" isRequired mt={4}>
          <FormLabel>کد ملی</FormLabel>
          <Input
            type="text"
            name="national_id"
            value={formData.national_id}
            onChange={handleChange}
            placeholder="کد ملی خود را وارد کنید"
          />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel>رمز عبور</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="رمز عبور جدید را وارد کنید"
          />
        </FormControl>
        <Button colorScheme="teal" type="submit" size="lg" mt={6}>
          ثبت تغییرات
        </Button>
      </form>
    </Box>
  );
};

export default UserAccount;
