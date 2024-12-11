import {
  Box,
  Text,
  HStack,
  Button,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
} from "@chakra-ui/react";
import useDrugs from "../hooks/useDrugs";
import { useNavigate } from "react-router-dom";

const DrugsList = () => {
  const { data: drugs, error, isLoading } = useDrugs();

  const navigate = useNavigate();

  const handleAddDrugClick = () => {
    navigate("/add-drug"); // Navigate to /add-user page
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
          لیست دارو ها
        </Text>
        <Button colorScheme="teal" onClick={handleAddDrugClick}>
          افزودن
        </Button>
      </HStack>
      <Box>
        <TableContainer borderRadius={"20px"} boxShadow="md">
          <Table variant="striped" colorScheme="teal">
            <TableCaption>لیست دارو ها</TableCaption>
            <Thead bgColor={"gray.300"}>
              <Tr>
                <Th>شناسه</Th>
                <Th>نام دارو</Th>
                <Th>قیمت</Th>
                <Th>تعداد موجود</Th>
                <Th>شرکت سازنده</Th>
                <Th>تاریخ انقضا</Th>
                <Th>تاریخ ایجاد</Th>
              </Tr>
            </Thead>
            <Tbody>
              {drugs?.map((drug) => (
                <Tr key={drug.id}>
                  <Td>{drug.id}</Td>
                  <Td>{drug.name}</Td>
                  <Td>{drug.price}</Td>
                  <Td>{drug.quantity}</Td>
                  <Td>{drug.manufacturer}</Td>
                  <Td>{drug.expiration_date}</Td>
                  <Td>
                    {new Date(drug.created_at).toLocaleDateString("fa-IR")}
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

export default DrugsList;
