import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createClassname,
  deleteClassname,
  getAllClassname,
  updateClassname,
} from "../services/classnameApi";

const useAllClassname = () =>
  useQueryNoRefecth(["all classname"], async () => await getAllClassname());

const useCreateClassname = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createClassname(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all classname"],
      });
    },
  });
};

const useUpdateClassname = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateClassname(data[0].id, data[1].data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all classname"],
      });
    },
  });
};

const useDeleteClassname = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteClassname(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all classname"],
      });
    },
  });
};

export {
  useAllClassname,
  useCreateClassname,
  useDeleteClassname,
  useUpdateClassname,
};
