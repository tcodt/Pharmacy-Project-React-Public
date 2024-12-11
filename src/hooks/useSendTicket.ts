import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Ticket } from "../entities/Ticket";

const useSendTicket = (): UseMutationResult<Ticket, Error, Ticket> => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<Ticket>("/chats/tickets/");

  return useMutation<Ticket, Error, Ticket>({
    mutationFn: async (ticketData: Ticket) => {
      return apiClient.post(ticketData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (error: Error) => {
      console.error("Error creating ticket:", error);
    },
  });
};

export default useSendTicket;
