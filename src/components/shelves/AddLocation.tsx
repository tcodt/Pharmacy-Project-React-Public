import {useState} from "react";
import {
    Button, Checkbox, Flex, FormControl, FormLabel, Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay, Text,
    useDisclosure
} from "@chakra-ui/react";
import APIClient from "../../services/api-client.ts";
import {CreateLocation} from "../../entities/Loaction.ts";
import {useMutation} from "@tanstack/react-query";
import {z} from "zod";

const apiPostClient = new APIClient < CreateLocation >("shelves/api/location/create/")

const useAddLocation = () => {
    return useMutation({
        mutationFn: (newLoc: CreateLocation) =>
            apiPostClient.post(newLoc),
    });
};

const addLocationSchema = z.object({
    name: z.string().min(1, "نام قفسه اجباریست").max(255, "نام موقعیت قفسه بیشتر از 255 حرف نمیتواند باشد."),
    status: z.boolean()
})


const AddLocation = () => {

    const [name, setName] = useState("")
    const [status, setStatus] = useState<boolean>(false);
    const [addLocationErrors, setAddLocationErrors] = useState<{ [key: string]: { message: string } }>({})

    const {isOpen, onOpen, onClose} = useDisclosure();

    const func = useAddLocation();


    return (
        <div>
            <Button my={8} onClick={onOpen} colorScheme={"green"}>
                افزودن موقعیت قفسه +
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
                                status: status,
                            }

                            const {success, error} = addLocationSchema.safeParse(data)
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

                                setAddLocationErrors(errrrr)

                                return;
                            }
                            func.mutate(data)
                            onClose()


                        }} noValidate>
                            <FormControl>
                                <FormLabel>نام موقعیت</FormLabel>
                                <Input onChange={(event) => setName(event.currentTarget.value)}
                                       placeholder='نام موقعیت'/>
                                {addLocationErrors.name && <Text color={"red"}>{addLocationErrors.name.message}</Text>}
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel> وضعیت </FormLabel>
                                <Checkbox type={"checkbox"}
                                          onChange={(event) => setStatus(event.target.checked)}>موجود</Checkbox>
                            </FormControl>

                            <Flex mt={5}>
                                <Button type={"submit"} onClick={() => window.location.pathname = "/shelves"}   colorScheme='blue' ml={3}>
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


export default AddLocation;