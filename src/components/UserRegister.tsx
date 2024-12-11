// components/UserRegister.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Text,
} from '@chakra-ui/react';
import useRegister from '../hooks/useRegister'; // Import hook
import { useNavigate } from 'react-router-dom';
import texture from "../assets/bb.jpg";


const UserRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');

  const { registerUser, isLoading } = useRegister(); // Use hook
  const toast = useToast();

  const navigate = useNavigate();

  const handeLogIn = () => {
    navigate("/login")
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    const userData = {
      first_name: firstName,
      last_name: lastName,
      phoneNumber,
      national_id: nationalId,
      password,
    };

    try {
      await registerUser(userData); // Call registerUser hook
      toast({
        title: 'کاربر با موفقیت ثبت شد',
        status: 'success',
        duration: 5000,
        isClosable: true,
      } );
      // Reset form
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setNationalId('');
      setPassword('');
    } catch (error) {
      toast({
        title: 'خطا در ثبت نام کاربر',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      p={5}
      backgroundImage={texture}
      h={"100%"}
    >
    <Box
      maxW="xl"
      mx="auto"
      p={10}
      borderWidth={1}
      borderRadius="3xl"
      boxShadow="lg"
      bgColor={"white"}
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        ثبت نام
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="firstName" isRequired>
            <FormLabel>نام</FormLabel>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>

          <FormControl id="lastName" isRequired>
            <FormLabel>نام خانوادگی</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>

          <FormControl id="phoneNumber" isRequired>
            <FormLabel>شماره موبایل</FormLabel>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>

          <FormControl id="nationalId" isRequired>
            <FormLabel>کد ملی</FormLabel>
            <Input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>رمز عبور</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            type="submit"
            size="lg"
            mt={4}
            isLoading={isLoading}
          >
            ثبت نام
          </Button>
          <Text pt={4} textAlign="center" color="gray.600" fontSize="sm">
             حساب کاربری دارید؟
            <Button variant="link" colorScheme="teal" onClick={handeLogIn}>
              ورود
            </Button>
          </Text>
        </Stack>
      </form>
    </Box>
    </Box>
  );
};

export default UserRegister;
