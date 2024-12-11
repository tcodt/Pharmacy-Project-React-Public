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
  import useCosmetics from "../hooks/useCosmetics";
  import { useNavigate } from "react-router-dom";
  
  const CosmeticsList = () => {
    const { data: cosmetics, error, isLoading } = useCosmetics();
  
    const navigate = useNavigate();
  
    const handleAddDrugClick = () => {
      navigate("/add-cosmetic"); // Navigate to /add-user page
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
            لیست آرایشی ها
          </Text>
          <Button colorScheme="teal" onClick={handleAddDrugClick}>
            افزودن
          </Button>
        </HStack>
        <Box>
          <TableContainer borderRadius={"20px"} boxShadow="md">
            <Table variant="striped" colorScheme="teal">
              <TableCaption>لیست آرایشی ها</TableCaption>
              <Thead bgColor={"gray.300"}>
                <Tr>
                  <Th>شناسه</Th>
                  <Th>نام آرایشی</Th>
                  <Th>قیمت</Th>
                  <Th>تعداد موجود</Th>
                  <Th>شرکت سازنده</Th>
                  <Th>تاریخ انقضا</Th>
                  <Th>تاریخ ایجاد</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cosmetics?.map((cosmetic) => (
                  <Tr key={cosmetic.id}>
                    <Td>{cosmetic.id}</Td>
                    <Td>{cosmetic.name}</Td>
                    <Td>{cosmetic.price}</Td>
                    <Td>{cosmetic.quantity}</Td>
                    <Td>{cosmetic.manufacturer}</Td>
                    <Td>{cosmetic.expiration_date}</Td>
                    <Td>
                      {new Date(cosmetic.created_at).toLocaleDateString("fa-IR")}
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
  
  export default CosmeticsList;
  