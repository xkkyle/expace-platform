import axios from "axios";
import { RegisterFormSchema } from "@/components";
import { UserType } from "@/models/user";

const API_URL = "/api/users";

const fetchUsers = async (): Promise<UserType[]> => {
  const { data } = await axios.get(API_URL);
  console.log(data.data);
  return data;
};

const createUser = async (values: RegisterFormSchema) => {
  return await axios.post(API_URL, values);
};

const deleteUser = async ({
  id,
}: {
  id: string;
}): Promise<{ data: { message: string }; status: number }> => {
  const { data, status } = await axios.delete(`${API_URL}/${id}`);
  console.log(data, status);

  return { data, status };
};

export { fetchUsers, createUser, deleteUser };
