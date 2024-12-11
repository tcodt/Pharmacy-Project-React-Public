export default interface transaction {
    id: number
    transaction_type: "income" | "expense"
    amount: number,
    description: string,
    date: string;
    tax: number;
}