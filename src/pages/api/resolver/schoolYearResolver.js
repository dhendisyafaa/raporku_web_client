import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { createSchoolYear, getAllSchoolYear } from "../services/schoolYearApi";

const useAllSchoolYear = () =>
  useQueryNoRefecth(["all school year"], async () => await getAllSchoolYear());

const useCreateSchoolYear = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createSchoolYear(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all school year"],
      });
    },
  });
};

export { useAllSchoolYear, useCreateSchoolYear };
