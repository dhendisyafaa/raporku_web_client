import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createStudentData,
  deleteStudentData,
  getAllStudent,
  getAllStudentByClass,
  getStudentById,
  updateStudentData,
} from "../services/studentApi";

const useAllStudent = () =>
  useQueryNoRefecth(["all student"], async () => await getAllStudent());

const useAllStudentByClass = (id) =>
  useQueryNoRefecth(
    [`allStudent ${id}`],
    async () => await getAllStudentByClass(id)
  );

const useStudentById = (id) =>
  useQueryNoRefecth(["student", id], async () => await getStudentById(id));

const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createStudentData(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all student"],
      });
    },
  });
};

const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateStudentData(data[0].id, data[1].data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all student"],
      });
    },
  });
};

const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idSiswa) => deleteStudentData(idSiswa),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all student"],
      });
    },
  });
};

export {
  useAllStudent,
  useAllStudentByClass,
  useCreateStudent,
  useDeleteStudent,
  useStudentById,
  useUpdateStudent,
};
