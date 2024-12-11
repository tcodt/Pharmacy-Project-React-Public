import { useState } from "react";
import { HStack, Heading, Box, Text, Button, VStack } from "@chakra-ui/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { LuPill } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import menuItems from "../entities/menuItems";

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); // گرفتن مسیر فعلی

  const handleMenuClick = (index: number, path?: string) => {
    if (path) {
      navigate(path);
    } else {
      setActiveMenu(activeMenu === index ? null : index);
    }
  };

  const handleSubMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box h={"100%"} bgColor={"#121621"} px={5}>
      <HStack
        paddingTop={4}
        direction={"column"}
        alignItems={"start"}
        justifyContent={"right"}
      >
        <HStack px={2}>
          <LuPill color="white" size={35} />
          <Heading
            fontFamily={"Jomhuria"}
            fontSize={"52px"}
            color={"white"}
            as="h3"
          >
            منو
          </Heading>
        </HStack>
      </HStack>
      {menuItems.map((item, index) => (
        <VStack align="stretch" key={index}>
          <Button
            colorScheme="teal"
            variant="ghost"
            marginTop={8}
            px={4}
            justifyContent={"right"}
            color={
              location.pathname === item.path // بررسی مسیر فعلی
                ? "#B5EBF5" // اگر کاربر در مسیر منوی اصلی است
                : "white"
            }
            _hover={{ color: "#B5EBF5" }}
            _active={{ color: "#3e92ce" }}
            onClick={() => handleMenuClick(index, item.path)}
          >
            <item.icon color="inherit" size={"28px"} />
            <Text
              px={2}
              fontFamily={"Rubik"}
              fontSize={"16px"}
              color={"inherit"}
            >
              {item.name}
            </Text>
            {item.subMenu &&
              (activeMenu === index ? (
                <FaAngleUp color="inherit" />
              ) : (
                <FaAngleDown color="inherit" />
              ))}
          </Button>

          {activeMenu === index && item.subMenu && (
            <VStack align="stretch" pl={8} spacing={2}>
              {item.subMenu.map((subItem, subIndex) => (
                <Button
                  key={subIndex}
                  colorScheme="teal"
                  variant="ghost"
                  color={
                    location.pathname === subItem.path // بررسی مسیر فعلی برای زیرمنو
                      ? "#B5EBF5" // اگر کاربر در مسیر زیرمنوی فعلی است
                      : "white"
                  }
                  _hover={{ color: "#B5EBF5" }}
                  _active={{ color: "#3e92ce" }}
                  justifyContent={"right"}
                  onClick={() => handleSubMenuClick(subItem.path)}
                >
                  <Text
                    fontFamily={"Rubik"}
                    fontSize={"14px"}
                    color={"inherit"}
                  >
                    {subItem.name}
                  </Text>
                </Button>
              ))}
            </VStack>
          )}
        </VStack>
      ))}
    </Box>
  );
};

export default MenuBar;
