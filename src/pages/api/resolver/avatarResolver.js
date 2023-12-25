import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { removeAvatar, updateAvatar } from "../services/avatarApi";

const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateAvatar(data[0].level, data[1].id, data[2].data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables[0].level, variables[1].id],
      });
    },
    onError: (error, variables, context) => {
      console.error("Gagal memperbarui foto profile", error);
    },
  });
};

const useRemoveAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => removeAvatar(data.level, data.id),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.level, variables.id],
      });
    },
    onError: (error, variables, context) => {
      console.error("Gagal menghapus foto profile", error);
    },
  });
};

export { useUpdateAvatar, useRemoveAvatar };
