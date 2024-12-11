import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ColorModeSwitch: React.FC = () => {
  // استفاده از hook برای مدیریت حالت رنگ
  const { colorMode, toggleColorMode } = useColorMode();

  // انتخاب آیکون بر اساس حالت رنگ فعلی
  const icon = colorMode === "light" ? <MdDarkMode /> : <MdLightMode />;

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={icon}
      onClick={toggleColorMode} // تابعی برای تغییر حالت رنگ
      colorScheme="teal"
      variant='inline'

      size="lg"
    />
  );
};

export default ColorModeSwitch;
