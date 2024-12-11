import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";

const Layout = () => {

  

  return (
    <Grid
      height="100vh"  // تمام ارتفاع صفحه را پر می‌کند
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"aside nav"
             "aside main"`,
      }}
      templateColumns={{ base: "1fr", lg: "280px 1fr" }} // عرض ثابت برای MenuBar و باقیمانده برای NavBar
      templateRows={{ base: "auto 1fr", lg: "auto 1fr" }} // ارتفاع نو بار و محتوا
    >
      <Show above="lg">
        <GridItem
          area={"aside"}
          bg="gray.800"
          color="white"
          height="100vh"  // ارتفاع ثابت برای MenuBar
          position="sticky"
          top="0"  // ثابت نگه‌داشتن MenuBar
        >
          <MenuBar />
        </GridItem>
      </Show>
      <GridItem
        area={"nav"}
        boxShadow={"xl"}
        position="sticky"
        top="0"  // ثابت نگه‌داشتن NavBar
        zIndex={1}  // برای قرار گرفتن بالای دیگر محتوا
      >
        <NavBar />
      </GridItem>
      <GridItem
        area={"main"}
        p={4}
        overflowY="auto"  // اسکرول فقط برای بخش main
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
