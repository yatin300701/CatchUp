import { useQuery } from "@tanstack/react-query";
import { createSubTask, fetchTasks } from "@/api/task.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/api/task.api";
import { updateTask } from "@/api/task.api";
import { deleteTask } from "@/api/task.api";
import { CreateSubTaskPayload } from "@/types/task.types";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useCreateSubTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, name }: CreateSubTaskPayload) =>
      createSubTask(taskId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: any) => updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      subtaskId,
    }: {
      taskId: string;
      subtaskId?: string;
    }) => deleteTask(taskId, subtaskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
