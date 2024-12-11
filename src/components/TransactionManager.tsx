import {
    Box,
    Button,
    Input,
    Select,
    Textarea,
    VStack,
    HStack,
    Text,
    Divider,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useAddTransaction from "../hooks/useAddTransaction";
import useTransactions from "../hooks/useTransactions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import transaction from "../entities/transaction";
import { faCalendarAlt, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";

const TransactionManager = () => {
    const { isOpen, onToggle } = useDisclosure();
    const toast = useToast();
    const queryClient = useQueryClient();

    const [newTransaction, setNewTransaction] = useState<Omit<transaction, "id">>({
        transaction_type: "income",
        amount: 0,
        description: "",
        date: new Date().toISOString(),
        tax: 0,
    });

    const { mutate: addTransaction } = useAddTransaction();
    const { data: transactions } = useTransactions();

    const handleAddTransaction = () => {
        if (newTransaction.amount <= 0) {
            toast({
                title: "خطا در افزودن تراکنش",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        addTransaction(newTransaction, {
            onSuccess: () => {
                toast({
                    title: "تراکنش با موفقیت اضافه شد",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setNewTransaction({
                    transaction_type: "income",
                    amount: 0,
                    description: "",
                    date: new Date().toISOString(),
                    tax: 0,
                });
                queryClient.invalidateQueries({queryKey:["transactions"]});
            },
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    return (
        <Box p={5} maxWidth="600px" mx="auto">
            <Button colorScheme="teal" onClick={onToggle} leftIcon={<FontAwesomeIcon icon={isOpen ? faTimes : faPlus} />}>
                {isOpen ? "بستن فرم تراکنش" : "افزودن تراکنش جدید"}
            </Button>

            {isOpen && (
                <VStack
                    spacing={4}
                    p={4}
                    mt={4}
                    border="1px solid"
                    borderRadius="md"
                    borderColor="gray.200"
                >
                    <Textarea
                        placeholder="توضیحات تراکنش"
                        value={newTransaction.description}
                        onChange={(e) =>
                            setNewTransaction({ ...newTransaction, description: e.target.value })
                        }
                    />

                    <HStack width="100%">
                        <Select
                            flex="1"
                            value={newTransaction.transaction_type}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    transaction_type: e.target.value as "income" | "expense",
                                })
                            }
                        >
                            <option value="income">دریافتی</option>
                            <option value="expense">پرداختی</option>
                        </Select>

                        <Input
                            flex="1"
                            type="number"
                            placeholder="مبلغ را وارد کنید"
                            value={newTransaction.amount}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    amount: Number(e.target.value),
                                })
                            }
                        />
                    </HStack>

                    <HStack>
                        <DatePicker
                            selected={new Date(newTransaction.date)}
                            onChange={(date) => {
                                if (date) {
                                    setNewTransaction({
                                        ...newTransaction,
                                        date: date.toISOString(),
                                    });
                                }
                            }}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="تاریخ را انتخاب کنید"
                            customInput={
                                <Button leftIcon={<FontAwesomeIcon icon={faCalendarAlt} />} colorScheme="blue">
                                    انتخاب تاریخ
                                </Button>
                            }
                        />
                    </HStack>

                    <Button colorScheme="blue" onClick={handleAddTransaction}>
                        ذخیره تراکنش
                    </Button>
                </VStack>
            )}

            <Divider my={5} />

            <VStack spacing={3} align="start">
                <Text fontWeight="bold">لیست تراکنش‌ها</Text>
                {transactions?.map((transaction) => (
                    <Box
                        key={transaction.id}
                        p={3}
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        width="100%"
                    >
                        <Text>شناسه: {transaction.id}</Text>
                        <Text>توضیحات: {transaction.description}</Text>
                        <Text>
                            نوع تراکنش: {transaction.transaction_type === "income" ? "دریافتی" : "پرداختی"}
                        </Text>
                        <Text>مبلغ: {transaction.amount}</Text>
                        <Text>تاریخ: {formatDate(transaction.date)}</Text>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default TransactionManager;
