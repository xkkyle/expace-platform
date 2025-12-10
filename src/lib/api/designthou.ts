import axios from "axios";
import { NewsType } from "@/models/news";
import { NewsRegisterFormSchema } from "@/components";

const API_URL = "/api/designthou/news";

const getNewsList = async (): Promise<NewsType[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

const createNews = async (values: NewsRegisterFormSchema) => {
  return await axios.post(API_URL, values);
};

const deleteNews = async ({
  id,
}: {
  id: string;
}): Promise<{ data: { message: string }; status: number }> => {
  const { data, status } = await axios.delete(`${API_URL}/${id}`);

  return { data, status };
};

export { getNewsList, createNews, deleteNews };
