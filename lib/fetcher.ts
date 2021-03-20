import axios, { AxiosRequestConfig } from "axios";

export default async function fetcher(
  url: string,
  options: AxiosRequestConfig
) {
  try {
    const res = await axios(url, { ...options });
    
    if (res.data && res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return {};
  }
}
