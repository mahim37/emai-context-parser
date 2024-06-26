import { AxiosRequestConfig } from "axios";

const createConfig = (url: string, accessToken: string): AxiosRequestConfig => {
  return {
    method: 'GET',
    url: url.toString(),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };
};

export { createConfig };
