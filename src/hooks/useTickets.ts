// hooks/useTickets.ts
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Ticket } from "../entities/Ticket";

const apiClient = new APIClient<Ticket[]>("/chats/tickets/");

export const useTickets = () => 
  useQuery({
    queryKey: ["tickets"], 
    queryFn: apiClient.getAll 
  });
