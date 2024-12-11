export interface Ticket {
    user: number;
    admin: number;
    subject: string;
    description: string;
    status: "Open" | "Close";
}
