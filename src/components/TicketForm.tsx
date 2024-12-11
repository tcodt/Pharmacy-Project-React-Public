import { useState } from "react";
import useSendTicket from "../hooks/useSendTicket";
import { Ticket } from "../entities/Ticket";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Box,
  Text,
} from "@chakra-ui/react";
import useUser from "../hooks/useUser";

const TicketForm = () => {
  const { data: user, isLoading: loadingUser } = useUser();
  const sendTicket = useSendTicket();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    subject?: string;
    description?: string;
    admin?: string;
  }>({}); // State for errors

  const handleSubmit = () => {
    const newErrors: {
      subject?: string;
      description?: string;
      admin?: string;
    } = {};

    if (!subject) newErrors.subject = "برای ارسال تیکت موضوع بنویسید!";
    if (!description) newErrors.description = "برای ارسال تیکت توضیحات بنویسد!";
    if (!selectedAdmin)
      newErrors.admin = "برای ارسال تیکت یک ادمین را انتخاب کنید!";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Stop if there are errors

    const newTicket: Ticket = {
      user: Number(localStorage.getItem("userId")),
      admin: selectedAdmin!,
      subject,
      description,
      status: "Open",
    };

    sendTicket.mutate(newTicket, {
      onSuccess: () => {
        setMessage("تیکت با موفقیت ارسال شد");
        setSubject("");
        setDescription("");
        setSelectedAdmin(null);
        setErrors({});
      },
      onError: () => {
        setMessage("خطا ! دوباره تلاش کنید");
      },
    });
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <FormControl id="subject" mb={4} isInvalid={!!errors.subject}>
        <FormLabel>موضوع</FormLabel>
        <Input
          type="text"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setErrors((prev) => ({ ...prev, subject: undefined })); // Clear error on change
          }}
          placeholder="موضوع تیکت را وارد کنید"
          borderColor={errors.subject ? "red.500" : undefined} // Set border color if there's an error
        />
        {errors.subject && <Text color="red.500">{errors.subject}</Text>}{" "}
        {/* Display error message */}
      </FormControl>

      <FormControl id="description" mb={4} isInvalid={!!errors.description}>
        <FormLabel>توضیحات</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: undefined })); // Clear error on change
          }}
          placeholder="توضیحات تیکت"
          borderColor={errors.description ? "red.500" : undefined} // Set border color if there's an error
        />
        {errors.description && (
          <Text color="red.500">{errors.description}</Text>
        )}{" "}
        {/* Display error message */}
      </FormControl>

      <FormControl id="admin" mb={4} isInvalid={!!errors.admin}>
        <FormLabel>انتخاب ادمین</FormLabel>
        {loadingUser ? (
          <p>در حال بارگذاری...</p>
        ) : (
          <Select
            textAlign={"right"}
            dir="ltr"
            placeholder="یک ادمین انتخاب کنید"
            onChange={(e) => {
              setSelectedAdmin(Number(e.target.value));
              setErrors((prev) => ({ ...prev, admin: undefined })); // Clear error on change
            }}
            borderColor={errors.admin ? "red.500" : undefined} // Set border color if there's an error
          >
            {user && (
              <option key={user.id} value={user.id}>
                {user.first_name
                  ? `${user.first_name} ${user.last_name}`
                  : `Admin ID: ${user.id}`}
              </option>
            )}
          </Select>
        )}
        {errors.admin && <Text color="red.500">{errors.admin}</Text>}{" "}
        {/* Display error message */}
      </FormControl>

      <Button
        colorScheme="blue"
        onClick={handleSubmit}
        isDisabled={sendTicket.isPending}
      >
        ارسال تیکت
      </Button>

      {message && (
        <Text
          mt={4}
          color={message.startsWith("خطا") ? "red.500" : "green.500"}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

export default TicketForm;
