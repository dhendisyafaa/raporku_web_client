import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { createRapor, getRaporByStudent } from "../services/raporApi";

const useRaporByStudent = (data) =>
  useQueryNoRefecth(
    [`student ${data?.id}`, `semester ${data?.semester}`],
    async () => await getRaporByStudent(data?.id, data?.semester)
  );

const useCreateRapor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createRapor(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chart ranking"],
      });
      queryClient.invalidateQueries({
        queryKey: ["average student score by class"],
      });
    },
  });
};

export { useRaporByStudent, useCreateRapor };
