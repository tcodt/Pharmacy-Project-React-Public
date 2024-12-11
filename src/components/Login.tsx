import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import texture from "../assets/bb.jpg";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { axiosInstance } from "../services/api-client.ts";

// interface LoginData{
//   password: string,
//   phoneNumber: string,
// }

interface LoginResponse {
  id: number;
  first_name: string;
  last_name: string;
  tokens: {
    access: string;
    refresh: string;
  };
}

const Login = () => {
  const signIn = useSignIn();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    setError(true);
    e.preventDefault();

    const response = await axiosInstance.post("accounts/login/", {
      password: password,
      phoneNumber: phoneNumber,
    });
    const data: LoginResponse = await response.data;
    console.log(data);

    if (
      signIn({
        auth: {
          token: data.tokens.access,
          type: "Bearer",
        },
        refresh: data.tokens.refresh,

        userState: {
          firstName: data.first_name,
          lastName: data.last_name,
        },
      })
    ) {
      setLoading(false);
      setError(false);
      localStorage.setItem("token", data.tokens.access);
      localStorage.setItem("refreshToken", data.tokens.refresh);
      navigate("/dashboard");
    }
    setLoading(false);
    setError(false);
  };

  const handelSignIn = () => {
    navigate("/register");
  };

  return (
    <Box
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      pt={100}
      backgroundImage={texture}
      h={"100vh"}
    >
      <Box
        bgColor={"white"}
        maxW="xl"
        mx="auto"
        p={6}
        pt={50}
        pb={50}
        borderWidth={1}
        borderRadius="3xl"
        boxShadow="2xl"
      >
        <Heading as="h2" size="lg" mb={10} textAlign="center">
          ورود
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl id="phoneNumber" isRequired>
            <FormLabel>شماره موبایل</FormLabel>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="شماره موبایل خود را وارد کنید"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>رمز عبور</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور خود را وارد کنید"
            />
          </FormControl>
          {error && (
            <Text color="red.500" mt={4}>
              {error}
            </Text>
          )}
          <Button
            colorScheme="teal"
            type="submit"
            size="lg"
            mt={10}
            isLoading={loading}
          >
            ورود
          </Button>
          <Text pt={4} textAlign="center" color="gray.600" fontSize="sm">
            هنوز حساب کاربری ندارید؟{" "}
            <Button variant="link" colorScheme="teal" onClick={handelSignIn}>
              ثبت‌نام
            </Button>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
