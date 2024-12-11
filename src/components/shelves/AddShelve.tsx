import APIClient from "../../services/api-client.ts";
import {CreateShelves} from "../../entities/Shelves.ts";
import {useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {useEffect, useState} from "react";
import {
    Button, Checkbox, Flex, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";


const apiPostClient = new APIClient < CreateShelves >("/shelves/api/shelves/")

const useAddShelve = () => {
    return useMutation({
        mutationFn: (newShelve: CreateShelves) =>
            apiPostClient.post(newShelve),
    });
};

const addShelveSchema = z.object({
    name: z.string().min(1, "نام قفسه اجباریست").max(255, "نام  قفسه بیشتر از 255 حرف نمیتواند باشد."),
    location_ids:z.array(z.number()),
    status: z.boolean()
})

interface Props{
    location_id:string;
}

const AddShelve = ({location_id}:Props) => {

    const [name, setName] = useState("");
    const [locationsIds, setLocationsIds] = useState<number[]>([]);
    const [capacity, setCapacity] = useState<number>(1);
    const [status, setStatus] = useState<boolean>(false);
    const [addShelveErrors, setAddShelveErrors] = useState<{ [key: string]: { message: string } }>({});

    const func = useAddShelve();
    const {isOpen, onOpen, onClose} = useDisclosure();


    useEffect(() => {
        if (!location_id) return;
        setLocationsIds([parseInt(location_id)]);
    },[location_id]);


    if (!location_id) return;



    return (
        <div>
            <Button my={8} onClick={onOpen} colorScheme={"green"}>
                افزودن قفسه +
            </Button>
            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <form onSubmit={(event) => {
                            event.preventDefault()

                            const data = {
                                name: name,
                                location_ids: locationsIds,
                                capacity: capacity,
                                status: status,
                            }

                            const {success, error} = addShelveSchema.safeParse(data)
                            if (!success) {
                                console.log(data)

                                // FIXME : change the name of errrr to something more meaningful
                                const errrrr: { [key: string]: { message: string } } = {}
                                // {
                                // "name":{message:""}
                                // }
                                error?.errors.map(err => {
                                    errrrr[err.path[0]] = {message: err.message};
                                })

                                setAddShelveErrors(errrrr)

                                return;
                            }
                            func.mutate(data)
                            onClose()


                        }} noValidate>
                            <FormControl>
                                <FormLabel>نام قفسه</FormLabel>
                                <Input onChange={(event) => setName(event.currentTarget.value)}
                                       placeholder='نام قفسه'/>
                                {addShelveErrors.name && <Text color={"red"}>{addShelveErrors.name.message}</Text>}
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel> وضعیت </FormLabel>
                                <Checkbox type={"checkbox"}
                                          onChange={(event) => setStatus(event.target.checked)}>موجود</Checkbox>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel> ظرفیت </FormLabel>
                                <Input type={"text"}
                                       onChange={(event) => setCapacity(event.target.value as unknown as number)} />
                            </FormControl>


                            <Flex mt={5}>
                                <Button type={"submit"} onClick={() => window.location.pathname = "/shelves"} colorScheme='blue' ml={3}>
                                    ذخیره
                                </Button>
                                <Button onClick={onClose}>بستن</Button>
                            </Flex>
                        </form>
                    </ModalBody>

                </ModalContent>

            </Modal>
        </div>
    )
}


export default AddShelve;