import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { updateAvatar } from "../services/avatarApi";

const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationFn: (data) => console.log(data[0], data[1], data[2]),
    mutationFn: (data) => updateAvatar(data[0].level, data[1].id, data[2].data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student", data[1].id],
      });
    },
  });
};

export { useUpdateAvatar };
