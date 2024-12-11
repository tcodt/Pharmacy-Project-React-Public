// AddUserForm.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  HStack,
  useToast,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import {useCreateUser} from "../hooks/useCreateUser"; 
import {useCreateUserACL} from "../hooks/useCreateUser"; 

const AddUserForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const [maritalStatus, setMaritalStatus] = useState<"S" | "M">("S");

  const { createUser, isLoading  } = useCreateUser(); // Use hook
  const { createUserAcl,isPending } = useCreateUserACL(); // Use hook
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      first_name: firstName, 
      last_name: lastName,
      phoneNumber, 
      national_id: nationalId, 
      password,
      marital_status: maritalStatus, 
    };

    console.log("Sending user data:", userData);

    try {
      await createUser(userData ); 
      toast({
        title: "کاربر با موفقیت اضافه شد",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      ;
      // Reset form
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setNationalId("");
      setPassword("");
      setMaritalStatus("S");
    } catch (error) {
      toast({
        title: "خطا در ساخت کاربر",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      
    }
  };

  return (
    <Box
      maxW="2xl"
      mx="auto"
      mt={5}
      p={10}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      {/* <Heading as="h2" size="lg" mb={6} textAlign="center">
        افزودن کاربر جدید
      </Heading> */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <HStack>
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
          </HStack>

          <HStack>
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
          </HStack>

          <FormControl id="password" isRequired>
            <FormLabel>رمز عبور</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel>وضعیت تاهل</FormLabel>
            <RadioGroup
              value={maritalStatus}
              onChange={(value: string) => setMaritalStatus(value as "S" | "M")}
            >
              <HStack spacing="24px">
                <Radio value="S">مجرد</Radio>
                <Radio value="M">متأهل</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Button
            colorScheme="teal"
            type="submit"
            size="lg"
            mt={4}
            isLoading={isLoading}
          >
            افزودن کاربر
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddUserForm;
