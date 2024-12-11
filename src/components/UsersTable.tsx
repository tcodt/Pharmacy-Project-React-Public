import {
  Box,
  Button,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Spinner,
} from "@chakra-ui/react";
import useUsers from "../hooks/useUsers";
import { LuPill } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const { data: users, error, isLoading } = useUsers();

  const navigate = useNavigate();
  

  const handleAddUserClick = () => {
    navigate("/add-user"); // Navigate to /add-user page
  };
  const handlePermissionClick = (userId: number) => {
    navigate(`/user-permissions/${userId}`);
  };

  if (isLoading) {
    return (
      <Box p={5} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>در حال بارگذاری...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Text p={5} color="red.500">
        {error.message}
      </Text>
    );
  }

  return (
    <Box p={5}>
      <HStack p={5} justifyContent={"space-between"}>
        <Text fontSize="lg" fontWeight="bold">
          لیست کاربران
        </Text>
        <Button colorScheme="teal" onClick={handleAddUserClick}>
          افزودن
        </Button>
      </HStack>
      <Box>
        <TableContainer borderRadius={"20px"} boxShadow="md">
          <Table variant="striped" colorScheme="teal">
            <TableCaption>لیست کاربران</TableCaption>
            <Thead bgColor={"gray.300"}>
              <Tr>
                <Th textAlign={"center"}>شناسه</Th>
                <Th textAlign={"center"}>نام</Th>
                <Th textAlign={"center"}>نام خانوادگی</Th>
                <Th textAlign={"center"}>شماره موبایل</Th>
                <Th textAlign={"center"}>کد ملی</Th>
                <Th textAlign={"center"}>تاریخ</Th>
                <Th textAlign={"center"}>عملیات</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.map((user) => (
                <Tr key={user.id}>
                  <Td textAlign={"center"}>{user.id}</Td>
                  <Td textAlign={"center"}>{user.first_name}</Td>
                  <Td textAlign={"center"}>{user.last_name}</Td>
                  <Td textAlign={"center"}>{user.phoneNumber}</Td>
                  <Td textAlign={"center"}>{user.national_id}</Td>
                  <Td textAlign={"center"}>
                    {new Date(user.created_at).toLocaleDateString("fa-IR")}
                  </Td>
                  <Td textAlign={"center"}>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      leftIcon={<LuPill color="white" size={10} />}
                      onClick={() => handlePermissionClick(user.id)}
                    >
                      عملیات
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UsersTable;
