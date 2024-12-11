import {Badge, Stack} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import APIClient from "../../services/api-client.ts";
import {GetLocation} from "../../entities/Loaction.ts";
import {useQuery} from "@tanstack/react-query";

const ShowLocations = () => {

    const {data: locations, } = useGetAllLocation()

    return (
        <Stack wrap={"wrap"} mb={5} direction='row'>
            {locations && locations.length > 0 && locations.map(location => (
                <Badge p={2} borderRadius={7} key={location.id} colorScheme='purple'>
                    <Link  key={location.id}  to={"/shelves?location_id=" + location.id + "&location_name=" + location.name}>
                        {location.name}
                    </Link>
                </Badge>
            ))}
        </Stack>
    );
}


const apiGetAllClient = new APIClient<GetLocation[]>("shelves/api/location/")

const useGetAllLocation = () => useQuery({
    queryKey: ["Locations"],
    queryFn: apiGetAllClient.getAll,
})


export default ShowLocations;