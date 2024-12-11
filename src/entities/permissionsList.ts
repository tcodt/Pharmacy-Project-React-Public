export const permissionsList = [
    { id: 1, name: "لیست کاربران", code: "user_list" },
    { id: 2, name: "افزودن کاربر", code: "user_create" },
    { id: 3, name: "ویرایش کاربر", code: "user_edit" },
    { id: 4, name: "حذف کاربر", code: "user_delete" },
    { id: 5, name: "تغییر رمز عبور کاربر", code: "user_change_password" },
    { id: 6, name: "لیست نقش ها", code: "role_list" },
    { id: 7, name: "افزودن نقش", code: "role_create" },
    { id: 8, name: "ویرایش نقش", code: "role_edit" },
    { id: 9, name: "حذف نقش", code: "role_delete" },
    { id: 10, name: "لیست نوبت دهی", code: "appointment_list" },
    { id: 11, name: "افزودن نوبت دهی", code: "appointment_create" },
    { id: 12, name: "ویرایش نوبت دهی", code: "appointment_edit" },
    { id: 13, name: "حذف نوبت دهی", code: "appointment_delete" },
    { id: 14, name: "لیست پزشکان", code: "doctors_list" },
    { id: 15, name: "افزودن پزشکان", code: "doctors_create" },
    { id: 16, name: "ویرایش پزشکان", code: "doctors_edit" },
    { id: 17, name: "حذف پزشکان", code: "doctors_delete" },
    { id: 18, name: "لیست دارو ها", code: "drugs_list" },
    { id: 19, name: "افزودن دارو ها", code: "drugs_create" },
    { id: 20, name: "ویرایش دارو ها", code: "drugs_edit" },
    { id: 21, name: "حذف دارو ها", code: "drugs_delete" },
    { id: 22, name: "لیست بیمه ها", code: "insurances_list" },
    { id: 23, name: "افزودن بیمه ها", code: "insurances_create" },
    { id: 24, name: "ویرایش بیمه ها", code: "insurances_edit" },
    { id: 25, name: "حذف بیمه ها", code: "insurances_delete" },
    { id: 26, name: "لیست دسته بندی دارو ها", code: "category_drug_list" },
    { id: 27, name: "افزودن دسته بندی دارو ها", code: "category_drug_create" },
    { id: 28, name: "ویرایش دسته بندی دارو ها", code: "category_drug_edit" },
    { id: 29, name: "حذف دسته بندی دارو ها", code: "category_drug_delete" },
    { id: 30, name: "لیست انبار ها", code: "warehouses_list" },
    { id: 31, name: "افزودن انبار ها", code: "warehouses_create" },
    { id: 32, name: "ویرایش انبار ها", code: "warehouses_edit" },
    { id: 33, name: "حذف انبار ها", code: "warehouses_delete" },
    { id: 34, name: "لیست دسترسی کاربر ها", code: "user_permissions_list" },
    { id: 35, name: "افزودن دسترسی کاربر ها", code: "user_permissions_create" },
    { id: 36, name: "ویرایش دسترسی کاربر ها", code: "user_permissions_edit" },
    { id: 37, name: "حذف دسترسی کاربر ها", code: "user_permissions_delete" },
    { id: 38, name: "لیست جواب آزمایش", code: "test_result_list" },
    { id: 39, name: "افزودن جواب آزمایش", code: "test_result_create" },
    { id: 40, name: "ویرایش جواب آزمایش", code: "test_result_edit" },
    { id: 41, name: "حذف جواب آزمایش", code: "test_result_delete" },
    { id: 42, name: "لیست تراکنش ها", code: "payments_list" },
    { id: 43, name: "لیست پیام", code: "chats_list" },
    { id: 44, name: "افزودن پیام", code: "chats_create" },
    { id: 45, name: "ویرایش پیام", code: "chats_edit" },
    { id: 46, name: "حذف پیام", code: "chats_delete" },
];

export interface Permission {
    id: number;
    name: string;
    code: string;
}

export interface UserPermissions {
    id: number;
    phoneNumber: string;
    permissions: Permission[];
}

