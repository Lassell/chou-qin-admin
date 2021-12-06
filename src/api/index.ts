import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestData, ResponseData } from "@/types";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 60000,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    authorization: localStorage.getItem("chouqin_token") || "",
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    return response.data;
  },
  (error: AxiosError<ResponseData<any>>) => {
    console.warn(error);
    return {
      code: 500,
      message: "系统繁忙，请稍后再试！",
      success: false,
      data: null,
    };
  }
);

export const get = (url: string, data: RequestData<any>) => {
  return axiosInstance.get(url, data);
};

export const post = (url: string, data: RequestData<any>) => {
  return axiosInstance.post(url, data);
};

export const upload = (url: string, data: RequestData<any>) => {
  const formData = new FormData();
  formData.append("file", data);
  return axiosInstance.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const download = (url: string, data: RequestData<any>) => {
  return axiosInstance.post(url, data, {
    responseType: "blob",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
};
