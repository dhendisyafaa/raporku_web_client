import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createMajorData,
  deleteMajorData,
  getAllMajor,
  updateMajorData,
} from "../services/majorApi";

const useAllMajor = () =>
  useQueryNoRefecth(["all major"], async () => await getAllMajor());

const useCreateMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createMajorData(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all major"],
      });
    },
  });
};

const useUpdateMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateMajorData(data[0].id, data[1].data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all major"],
      });
    },
  });
};

const useDeleteMajor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idSiswa) => deleteMajorData(idSiswa),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all major"],
      });
    },
  });
};

export { useAllMajor, useCreateMajor, useUpdateMajor, useDeleteMajor };
