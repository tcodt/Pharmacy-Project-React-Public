// services/api-client.ts
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://pharmacyapi.pythonanywhere.com/api/",
});

axiosInstance.interceptors.request.use(function (config) {
  // بررسی وجود توکن در localStorage
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.clear();
    return config;
  }
  config.headers["Authorization"] = "Bearer " + token;
  return config;
}, function (error) {
  // مدیریت خطاهای درخواست
  return Promise.reject(error);
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  get = (id: number) => {
    const url = `${this.endpoint}/${id}/`; // فرض بر اینکه API از trailing slash استفاده می‌کند
    return axiosInstance.get<T>(url).then((res) => res.data);
  };

  post = <X>(data: X, config?: AxiosRequestConfig) => {
    return axiosInstance.post<T>(this.endpoint, data, { ...config }).then((res) => res.data);
  };

  put = <X>(id: number, data: X, config?: AxiosRequestConfig) => {
    const url = `${this.endpoint}/${id}/`;
    return axiosInstance.put<T>(url, data, { ...config }).then((res) => res.data);
  };
}

export default APIClient;
