
import APIClient from "../../services/api-client.ts";
import {GetAllShelves} from "../../entities/Shelves.ts";
import {useQuery} from "@tanstack/react-query";
import {Box, HStack, Tab} from "@chakra-ui/react";

interface Props {
    location_name:string;
}

const ShowShelves = ({location_name}:Props) => {

    const {data:shelves,} = useGetAllShelves()

    if (!shelves) {
        return (
            <Box fontSize={20}>
                قفسه ای موجود نیست!
            </Box>
        )
    }

    const shelvesForLocation = shelves.filter(shelve => shelve.location[0] === location_name);
    if (!(shelvesForLocation.length > 0)) {
        return (
            <Box p={3} fontSize={20}>
                قفسه ای موجود نیست!
            </Box>
        )
    }


    return (
        <HStack>
            {shelvesForLocation.map(shelve => (
                <Tab key={shelve.id}>{shelve.name}</Tab>
            ))}
        </HStack>
    );
};

const apiGetAllClient = new APIClient<GetAllShelves[]>("shelves/api/shelves/")

export const useGetAllShelves = () => useQuery({
    queryKey: ["Shelves"],
    queryFn: apiGetAllClient.getAll,
})


export default ShowShelves;