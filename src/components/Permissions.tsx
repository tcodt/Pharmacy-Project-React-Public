import {
  Box,
  Checkbox,
  Button,
  VStack,
  HStack,
  Heading,
  Card,
  CardBody,
  Divider,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useParams } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { permissionsList } from "../entities/permissionsList";

const Permissions = () => {
  const { userId } = useParams<{ userId: string }>();
  const numericUserId = Number(userId); // Ensure userId is a number

  //TODO: Changed by Amir
  if (isNaN(numericUserId)) {
    throw new Error(
      "Invalid userId. Please ensure the URL contains a valid numeric userId."
    );
  }

  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const apiClient = new APIClient("/acl/user-permissions");

  const togglePermission = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id)
        ? prev.filter((permissionId) => permissionId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPermissions.length === permissionsList.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(
        permissionsList.map((permission) => permission.id)
      );
    }
  };

  const { mutate: updatePermissions } = useMutation({
    // mutationFn: (permissions: number[]) => apiClient.put(`${numericUserId}`, { permissions }), //TODO: Changed by Amir
    mutationFn: (permissions: number[]) =>
      apiClient.put(numericUserId, { permissions }), //TODO: Changed by Amir
  });

  const handleSavePermissions = () => {
    updatePermissions(selectedPermissions);
    console.log(numericUserId);
  };

  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box p={5}>
      <Heading size="md" mb={4}>
        Manage Permissions
      </Heading>

      <Card bg={cardBg} border="1px solid" borderColor={cardBorderColor} p={5}>
        <CardBody>
          <VStack align="start" spacing={4}>
            <Checkbox
              isChecked={selectedPermissions.length === permissionsList.length}
              onChange={toggleSelectAll}
            >
              Select All Permissions
            </Checkbox>

            <Divider />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} w="full">
              {permissionsList.map((permission) => (
                <Card
                  key={permission.id}
                  bg={cardBg}
                  border="1px solid"
                  borderColor={cardBorderColor}
                  p={3}
                  borderRadius="md"
                >
                  <HStack>
                    <Checkbox
                      isChecked={selectedPermissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                    />
                    <Text>{permission.name}</Text>
                  </HStack>
                </Card>
              ))}
            </SimpleGrid>

            <Divider />

            <HStack justifyContent="flex-end" w="full">
              <Button
                colorScheme="teal"
                size="lg"
                leftIcon={<BsCheck2Circle />}
                onClick={handleSavePermissions}
              >
                Save Permissions
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Permissions;
