import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { createRapor, getRaporByStudent } from "../services/raporApi";

const useRaporByStudent = (id, semester) =>
  useQueryNoRefecth(
    [`student ${id}`, `semester ${semester}`],
    async () => await getRaporByStudent(id, semester)
  );

const useCreateRapor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createRapor(newData),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["all major"],
    //   });
    // },
  });
};

export { useRaporByStudent, useCreateRapor };
