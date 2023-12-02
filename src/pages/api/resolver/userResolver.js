import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { getUserById } from "../services/userApi";

const useUserById = (level, id) =>
  useQueryNoRefecth(
    ["user", level, id],
    async () => await getUserById(level, id)
  );

export { useUserById };
