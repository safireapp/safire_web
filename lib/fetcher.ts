import axios, { AxiosRequestConfig } from "axios";

export default async function fetcher(
  url: string,
  options: AxiosRequestConfig
) {
  try {
    const res = await axios(url, { ...options });
    const data = await res.data;

    if (data) {
      return data;
    }
  } catch (error) {
    error.data = { message: error.response.data.message };
    return {};
  }
}
