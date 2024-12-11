import { useState } from "react";
import {
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Box,
  useToast,
  Collapse,
  Text,
  HStack,
} from "@chakra-ui/react";
import useAddDrugCategory from "../hooks/useAddDrugCategory";
import { IoMdAdd, IoMdClose } from "react-icons/io";

const AddDrugsCategory = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const { mutate, isPending } = useAddDrugCategory(); // اصلاح نام به isLoading
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        name,
        status: status === "active",
      },
      {
        onSuccess: () => {
          toast({
            title: "دسته‌بندی با موفقیت اضافه شد",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setName(""); // ریست کردن نام
          setStatus("active"); // ریست کردن وضعیت
          setIsFormOpen(false); // بستن فرم بعد از موفقیت
          onClose(); // فراخوانی تابع onClose برای بستن فرم
        },
        onError: (error) => {
          toast({
            title: "خطا در افزودن دسته‌بندی",
            description:
              error instanceof Error ? error.message : "خطای ناشناخته",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Box>
      <HStack p={5} justifyContent={"space-between"}>
        <Text fontSize="lg" fontWeight="bold">
          دسته‌بندی‌ها
        </Text>
        <Button
          leftIcon={isFormOpen ? <IoMdClose /> : <IoMdAdd />}
          colorScheme="teal"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "بستن" : "افزودن"}
        </Button>
      </HStack>

      {/* فرم افزودن دسته‌بندی */}
      <Collapse in={isFormOpen} animateOpacity>
        <Box
          p={5}
          borderWidth={1}
          borderRadius="lg"
          mb={5}
          boxShadow="md"
          bgColor="gray.50"
        >
          <FormControl id="categoryName" mb={4}>
            <FormLabel>نام دسته‌بندی</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="نام دسته‌بندی را وارد کنید"
            />
          </FormControl>
          <FormControl id="categoryStatus" mb={4}>
            <FormLabel>وضعیت</FormLabel>
            <Select
            textAlign={"right"}
            dir="ltr"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">موجود</option>
              <option value="inactive">ناموجود</option>
            </Select>
          </FormControl>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            isLoading={isPending}
          >
            افزودن
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
};

export default AddDrugsCategory;
