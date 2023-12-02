import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createTeacherData,
  deleteTeacherData,
  getAllTeacher,
  getTeacherById,
  updateTeacherData,
} from "../services/teacherApi";

const useAllTeacher = () =>
  useQueryNoRefecth(["all teacher"], async () => await getAllTeacher());

const useTeacherById = (id) =>
  useQueryNoRefecth(["teacher", id], async () => await getTeacherById(id));

const useCreateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createTeacherData(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all teacher"],
      });
    },
  });
};

const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateTeacherData(data[0].id, data[1].data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all teacher"],
      });
    },
  });
};

const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteTeacherData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all teacher"],
      });
    },
  });
};

export {
  useAllTeacher,
  useCreateTeacher,
  useDeleteTeacher,
  useTeacherById,
  useUpdateTeacher,
};
