import { GrOverview } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { MdOutlineCategory } from "react-icons/md";
import { MdOutlineRequestPage } from "react-icons/md";
import { FaPills } from "react-icons/fa6";
import { IconType } from "react-icons";

interface SubMenuItem {
  name: string;
  path: string;  // اضافه کردن مسیر برای هر زیرمنو
}

interface MenuItem {
  name: string;
  icon: IconType;
  path?: string;  // اضافه کردن مسیر برای منوهای اصلی
  subMenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: "پیش نمایش",
    icon: GrOverview,
    path: "/dashboard", // مسیر برای پیش نمایش
  },
  {
    name: "مدیریت کاربران",
    icon: CiUser,
    subMenu: [
      { name: "لیست کاربران", path: "/users" },
      { name: "افزودن کاربران", path: "/add-user" },
    ],
  },
  // {
  //   name: "مدیریت دسترسی",
  //   icon: SiOpenaccess,
  //   subMenu: [
  //     { name: "لیست دسترسی ها", path: "/list-of-access" },
  //     { name: "افزودن دسترسی", path: "/add-access" },
  //   ],
  // },
  {
    name: "مدیریت دسته بندی",
    icon: MdOutlineCategory,
    subMenu: [
      { name: "لیست دسته بندی دارو ها", path: "/list-of-drug-categories" },
      { name: "لیست دسته بندی بهداشتی ها", path: "/list-of-cosmetic-categories" },
    ],
  },
  {
    name: "مدیریت محصولات",
    icon: FaPills,
    subMenu: [
      { name: "لیست دارو ها", path: "/list-of-drugs" },
      { name: "افزودن دارو ", path: "/add-drug" },
      { name: "لیست آرایشی ها", path: "/list-of-cosmetic" },
      { name: "افزودن آرایشی", path: "/add-cosmetic" },
    ],
  },
    {
    name: "مدیریت مالی",
    icon: MdOutlineRequestPage,
    subMenu: [{ name: "تراکنش ها", path: "/transactions" }],
  },
  {
    name:"قفسه ها",
    icon: MdOutlineCategory,
    path:"/shelves"
  }
  // {
  //   name: "مدیریت سفارش ها",
  //   icon: MdOutlineRequestPage,
  //   subMenu: [{ name: "لیست سفارش ها", path: "/list-of-orders" }],
  // },

  // {
  //   name: "مدیریت بیمه ها",
  //   icon: LiaClipboardListSolid,
  //   subMenu: [{ name: "لیست بیمه ها", path: "/list-of-insurance" }],
  // },
];

export default menuItems;
