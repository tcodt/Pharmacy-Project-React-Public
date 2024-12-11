import { useState } from "react";
import {
  Box,
  Heading,
  Stack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Button,
  Textarea,
  Select,
  Text,
} from "@chakra-ui/react";
import useAddDrug from "../hooks/useAddDrug";
import { useGetAllShelves } from "./shelves/ShowShelves.tsx";

const AddDrugsForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState<number | "">(0);
  const [manufacturer, setManufacturer] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<number | "">(0);
  const [status, setStatus] = useState("true");
  const [shelveId, setShelveId] = useState(0);
  const [error, setError] = useState("");

  const { data: shelves } = useGetAllShelves();

  const addDrug = useAddDrug(); // استفاده از هوک برای ارسال درخواست

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shelveId) {
      setError("یک قفسه انتخاب کنید");
    }

    // ارسال داده به API
    addDrug.mutate(
      {
        name,
        price,
        quantity: Number(quantity),
        manufacturer,
        expiration_date: expirationDate,
        description,
        status: status === "true",
        category: Number(category),
        shelf_id: shelveId,
      },
      {
        onSuccess: () => {
          // بعد از موفقیت فرم را ریست می‌کنیم
          setName("");
          setPrice("");
          setQuantity(0);
          setManufacturer("");
          setExpirationDate("");
          setDescription("");
          setCategory(0);
          setStatus("true");
          setShelveId(0);
        },
      }
    );
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
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        افزودن دارو جدید
      </Heading>
      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>نام دارو</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <HStack>
            <FormControl id="price" isRequired>
              <FormLabel>قیمت</FormLabel>
              <Input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl id="quantity" isRequired>
              <FormLabel>تعداد موجود</FormLabel>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </FormControl>
          </HStack>

          <FormControl id="manufacturer" isRequired>
            <FormLabel>شرکت سازنده</FormLabel>
            <Input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </FormControl>

          <FormControl id="expiration_date" isRequired>
            <FormLabel>تاریخ انقضا</FormLabel>
            <Input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>توضیحات</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="category" isRequired>
            <FormLabel>دسته‌بندی</FormLabel>
            <Input
              type="number"
              value={category}
              onChange={(e) => setCategory(Number(e.target.value))}
            />
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel>وضعیت</FormLabel>
            <RadioGroup
              value={status}
              onChange={(value: string) => setStatus(value)}
            >
              <HStack spacing="24px">
                <Radio value="true">موجود</Radio>
                <Radio value="false">ناموجود</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <Select
              placeholder="انتخاب قفسه"
              textAlign={"right"}
              dir="ltr"
              value={shelveId || ""} // Controlled value
              onChange={(event) =>
                setShelveId(parseInt(event.currentTarget.value))
              }
            >
              {shelves &&
                shelves.map((shelve) => (
                  <option key={shelve.id} value={shelve.id}>
                    {shelve.name}
                  </option>
                ))}
            </Select>
            <Text color={"red"}>{error}</Text>
          </FormControl>

          <Button
            colorScheme="teal"
            type="submit"
            size="lg"
            mt={4}
            isLoading={addDrug.isPending}
          >
            افزودن دارو
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddDrugsForm;
