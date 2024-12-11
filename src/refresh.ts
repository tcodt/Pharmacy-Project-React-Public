import axios from "axios";
import createRefresh from "react-auth-kit/createRefresh";

const refresh = createRefresh({
  interval: 1, // زمان بازبینی توکن به ثانیه
  refreshApiCallback: async () => {
    try {
      // دریافت توکن از localStorage
      const authToken = localStorage.getItem("refreshToken")
      if (!authToken) {
        console.error("Access token not found in localStorage");
        return {
          isSuccess: false,
          newAuthToken: "",
          newAuthTokenExpireIn: 0,
          newRefreshTokenExpiresIn: 0,
        };
      }

      const response = await axios.post(
        "/api/accounts/token/refresh/",
        { refresh: authToken }, // ارسال توکن به API
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Token refreshed successfully");

      return {
        isSuccess: true,
        newAuthToken: response.data.access, // توکن جدید از پاسخ
        newAuthTokenExpireIn: 10 * 60, // زمان انقضای توکن به ثانیه (اینجا 10 دقیقه)
        newRefreshTokenExpiresIn: 7 * 24 * 60 * 60, // فرضاً 7 روز
      };
    } catch (error) {
      console.error("Error refreshing token:", error);

      return {
        isSuccess: false,
        newAuthToken: "",
        newAuthTokenExpireIn: 0,
        newRefreshTokenExpiresIn: 0,
      };
    }
  },
});

export default refresh;
