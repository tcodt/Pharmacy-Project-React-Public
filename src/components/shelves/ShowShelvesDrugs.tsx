import useDrugs from "../../hooks/useDrugs.ts";
import {Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

interface Props {
    shelve_name:string;
}

const ShowShelvesDrugs = ({shelve_name}:Props) => {

    const {data:drugs} = useDrugs()

    if (!drugs) {
        return (
            <div>
                دارویی موجود نیست!
            </div>
        )
    }

    const filteredDrugs = drugs.filter(drug => drug.shelf === shelve_name);

    return (
        <div>
            <TableContainer  boxShadow="md">
                <Table variant="simple">
                    <TableCaption>قفسه دارو ها</TableCaption>
                    <Thead bgColor={"gray.200"}>
                        <Tr>
                            <Th>شناسه</Th>
                            <Th>نام دارو</Th>
                            <Th>قیمت</Th>
                            <Th>تعداد موجود</Th>
                            <Th>شرکت سازنده</Th>
                            <Th>تاریخ انقضا</Th>
                            <Th>تاریخ ایجاد</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredDrugs?.map((drug) => (
                            <Tr key={drug.id}>
                                <Td>{drug.id}</Td>
                                <Td>{drug.name}</Td>
                                <Td>{drug.price}</Td>
                                <Td>{drug.quantity}</Td>
                                <Td>{drug.manufacturer}</Td>
                                <Td>{drug.expiration_date}</Td>
                                <Td>
                                    {new Date(drug.created_at).toLocaleDateString("fa-IR")}
                                </Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ShowShelvesDrugs;