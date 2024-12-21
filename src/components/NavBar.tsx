import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import ColorModeSwitch from "./ColorModeSwitch";
import MenuBar from "./MenuBar";
// import NotificationBell from "./NotificationBell"; //TODO: Changed by Amir
import { IoMdChatbubbles } from "react-icons/io";
import TicketForm from "./TicketForm";
import { useNavigate } from "react-router-dom";
import UserProfileImage from "./UserProfileImage";

const NavBar = () => {
  const [showMenuIcon, setShowMenuIcon] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isTicketOpen, setIsTicketOpen] = useState(false); //TODO: Changed by Amir
  const [isTicketOpen] = useState(false); //TODO: Changed by Amir

  const navigate = useNavigate();
  const handelTicket = () => {
    navigate("/ticket");
  };

  useEffect(() => {
    const handleResize = () => {
      const isLgOrGreater = window.innerWidth >= 992;
      setShowMenuIcon(!isLgOrGreater);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Box
        w={"100%"}
        padding={2}
        borderBottom={"1px"}
        paddingStart={4}
        paddingEnd={4}
      >
        <Box>
          <HStack justifyContent={"space-between"}>
            <HStack>
              {showMenuIcon && <CiMenuBurger size={"24px"} onClick={onOpen} />}
              <CiSearch size={"24px"} />
            </HStack>
            <HStack display={"flex"}>
              <ColorModeSwitch />
              <IconButton
                icon={<IoMdChatbubbles size="24px" />}
                onClick={handelTicket}
                aria-label="Tickets"
              />
              {isTicketOpen && <TicketForm />}

              {/* <NotificationBell /> */}
              <UserProfileImage />
            </HStack>
          </HStack>
        </Box>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <Box
            bgColor={"#121621"}
            position="relative"
            height="100%"
            display="flex"
            flexDirection="column"
          >
            <IconButton
              aria-label="Close menu"
              icon={<FaTimes />}
              position="absolute"
              top={4}
              left={8}
              onClick={onClose}
              backgroundColor="transparent"
              color="white"
              size={"lg"}
              _hover={{ backgroundColor: "none", color: "red" }}
            />
            <DrawerBody>
              <MenuBar />
            </DrawerBody>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
