import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Box,
  Text,
  TableContainer,
  TableCaption,
} from "@chakra-ui/react";
import useDrugsCategories from "../hooks/useDrugsCategories";
import AddDrugsCategory from "./AddDrugsCategory";
import useAddDrugCategory from "../hooks/useAddDrugCategory";

const DrugsCategoryList = () => {
  const { data = [], error,  refetch } = useDrugsCategories();
  const { isPending } = useAddDrugCategory(); 

 
  if (isPending) return <Spinner />;

  return (
    <Box p={5}>
      <AddDrugsCategory onClose={() => refetch()} />{" "}
      {/* تغییر onClose به تابعی که refetch می‌کند */}
      <Box maxW="5xl" mx="auto" mt={5}>
        {error && (
          <Box p={5}>
            <Text color="red.500">
              خطا:{" "}
              {error instanceof Error ? error.message : "خطا در دریافت داده‌ها"}
            </Text>
          </Box>
        )}
        <TableContainer borderRadius={"20px"} boxShadow="md">
          <Table variant="striped" colorScheme="teal">
            <TableCaption>دسته‌بندی‌ها</TableCaption>
            <Thead bgColor={"gray.300"}>
              <Tr>
                <Th>شناسه</Th>
                <Th>نام</Th>
                <Th>وضعیت</Th>
                <Th>تاریخ ایجاد</Th>
                <Th>آخرین بروزرسانی</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((category) => (
                <Tr key={category.id}>
                  <Td>{category.id}</Td>
                  <Td>{category.name}</Td>
                  <Td>{category.status ? "موجود" : "ناموجود"}</Td>
                  <Td>{new Date(category.created_at).toLocaleDateString()}</Td>
                  <Td>{new Date(category.updated_at).toLocaleDateString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DrugsCategoryList;
