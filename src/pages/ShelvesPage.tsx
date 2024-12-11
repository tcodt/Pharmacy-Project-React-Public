import {
    TabList, TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import AddLocation from "../components/shelves/AddLocation.tsx";
import { useSearchParams} from "react-router-dom";
import AddShelve from "../components/shelves/AddShelve.tsx";
import ShowShelves, {useGetAllShelves} from "../components/shelves/ShowShelves.tsx";
import ShowLocations from "../components/shelves/ShowLocation.tsx";
import ShowShelvesDrugs from "../components/shelves/ShowShelvesDrugs.tsx";


const ShelvesPage = () => {

    const [searchParams,] = useSearchParams();
    const location_id = searchParams.get("location_id");
    const location_name = searchParams.get("location_name");

    console.log(location_id);
    // TODO: به تعداد شلف ها تب میخوایم داخل هر لوکیشن
    return (
        <div>
            <AddLocation/>
            <ShowLocations />
            <AddShelve location_id={location_id!} />
            <Tabs variant='enclosed'>
                <TabList>
                    <ShowShelves  location_name={location_name!} />
                </TabList>
                <TabPanels>
                    <ShowTabsForShelves location_name={location_name!} />
                </TabPanels>
            </Tabs>
        </div>
    );
};

const ShowTabsForShelves = ({location_name}:{location_name:string}) => {

    const {data:shelves, } = useGetAllShelves();

    if (!shelves) {
        return null;
    }

    const filterdShelves = shelves.filter(shelve => shelve.location[0] === location_name);


    return (
        <TabPanels>
            {filterdShelves && filterdShelves.map(shelve => (
                <TabPanel key={shelve.id}>
                    <ShowShelvesDrugs shelve_name={shelve.name} />
                </TabPanel>
            ))}
        </TabPanels>
    )
}

export default ShelvesPage;