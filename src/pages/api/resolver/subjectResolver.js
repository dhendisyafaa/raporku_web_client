import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createSubject,
  deleteSubject,
  getAllSubject,
  updateSubject,
} from "../services/subjectApi";

const useAllSubject = () =>
  useQueryNoRefecth(["all subject"], async () => await getAllSubject());

const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createSubject(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all subject"],
      });
    },
  });
};

const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateSubject(data[0].id, data[1].data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all subject"],
      });
    },
  });
};

const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all subject"],
      });
    },
  });
};

export { useAllSubject, useCreateSubject, useDeleteSubject, useUpdateSubject };
