import { useState, useEffect } from "react";
import { Box, Badge, IconButton, VStack, Text, HStack } from "@chakra-ui/react";
import { PiBellRingingThin } from "react-icons/pi";
import useDrugs from "../hooks/useDrugs";

const NotificationBell = () => {
  const { data: drugs = [] } = useDrugs();
  const [notifications, setNotifications] = useState<{ name: string; daysLeft: number }[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const today = new Date();
    const soonExpiringDrugs = drugs
      .map((drug) => {
        const expirationDate = new Date(drug.expiration_date);
        const diffTime = expirationDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 30 && diffDays > 0) {
          return { name: drug.name, daysLeft: diffDays };
        }
        return null;
      })
      .filter(Boolean) as { name: string; daysLeft: number }[];

    setNotifications(soonExpiringDrugs);
    setUnreadCount(soonExpiringDrugs.length);
  }, [drugs]); // فقط drugs را به عنوان وابستگی قرار دهید

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    if (unreadCount > 0) {
      setUnreadCount(0); // Reset unread count after viewing
    }
  };

  return (
    <Box position="relative" display="inline-block">
      <IconButton
        aria-label="Notifications"
        icon={<PiBellRingingThin size="24px" />}
        onClick={toggleNotifications}
        variant="outline"
        colorScheme="teal"
      />
      {unreadCount > 0 && (
        <Badge
          position="absolute"
          top="-1"
          right="-1"
          colorScheme="red"
          borderRadius="full"
          px={2}
          py={1}
          fontSize="xs"
        >
          {unreadCount}
        </Badge>
      )}

      {showNotifications && (
        <Box
          position="absolute"
          top="40px"
          left="0"
          w="320px"
          maxH="300px"
          overflowY="auto"
          bg="white"
          boxShadow="xl"
          borderRadius="lg"
          zIndex="1000"
          p={4}
          animation="fadeIn 0.3s ease-out"
          border="1px solid"
          borderColor="gray.200"
        >
          <Text fontWeight="bold" mb={2} fontSize="lg" color="teal.600">
            اعلانات
          </Text>
          {notifications.length > 0 ? (
            <VStack align="start" spacing={3}>
              {notifications.map((notification, index) => (
                <Box
                  key={index}
                  bg="gray.50"
                  p={3}
                  borderRadius="md"
                  w="100%"
                  boxShadow="sm"
                  _hover={{ bg: "gray.100" }}
                >
                  <HStack justifyContent="space-between">
                    <Text fontSize="md" color="gray.700" fontWeight="bold">
                      {notification.name}
                    </Text>
                    <Text fontSize="sm" color="red.500" fontWeight="semibold">
                      {notification.daysLeft} روز مانده
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          ) : (
            <Text color="gray.500" fontSize="sm">
              !اعلانی وجود ندارد
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default NotificationBell;
