"use client";

import { Box, Checkbox, Input, Typography, useTheme } from "@mui/joy";
import { CloseOutlined } from "@mui/icons-material";
import {
  useCreateSubTask,
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "@/hooks/task";
import { SubTask, Task } from "@/types/task.types";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TasksList() {
  const theme = useTheme();
  const [newlyCreatedId, setNewlyCreatedId] = useState<string | null>(null);

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useTasks();

  const createTaskMutation = useCreateTask();
  const createSubTaskMutation = useCreateSubTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => b.createdAt - a.createdAt),
    [tasks],
  );

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading tasks</Typography>;

  const toggleTask = (taskId: string, task: Task) => {
    const newStatus = task.status === "Done" ? "Todo" : "Done";

    updateTaskMutation.mutate({
      id: taskId,
      payload: {
        text: task.text,
        taskType: "Task",
        status: newStatus,
      },
    });
  };

  const toggleSubTask = (taskId: string, sub: SubTask) => {
    const newStatus = sub.status === "Done" ? "Todo" : "Done";

    updateTaskMutation.mutate({
      id: sub.taskId,
      payload: {
        text: sub.text,
        taskType: "Subtask",
        status: newStatus,
        parentTaskId: taskId,
      },
    });
  };

  const editTaskName = (task: Task, value: string) => {
    updateTaskMutation.mutate({
      id: task.taskId,
      payload: {
        text: value,
        taskType: "Task",
        status: task.status,
      },
    });
  };

  const editSubTaskName = (taskId: string, sub: SubTask, value: string) => {
    updateTaskMutation.mutate({
      id: sub.taskId,
      payload: {
        text: value,
        taskType: "Subtask",
        status: sub.status,
        parentTaskId: taskId,
      },
    });
  };

  const addTask = () => {
    createTaskMutation.mutate(
      { text: "New Task" },
      {
        onSuccess: (data: any) => {
          setNewlyCreatedId(data.taskId);
        },
      },
    );
  };

  const addSubTask = (taskId: string) => {
    createSubTaskMutation.mutate(
      {
        taskId,
        name: "New Subtask",
      },
      {
        onSuccess: (data: any) => {
          setNewlyCreatedId(data.taskId);
        },
      },
    );
  };

  const deleteTask = (taskId: string) => {
    deleteTaskMutation.mutate({ taskId });
  };

  const deleteSubTask = (taskId: string, subTaskId: string) => {
    deleteTaskMutation.mutate({ taskId, subtaskId: subTaskId });
  };

  const renderTask = (task: Task) => (
    <motion.div
      key={task.taskId}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        x: [0, -2, 2, -2, 2, 0],
        scale: [1, 1.1, 0],
        opacity: [1, 1, 0],
        transition: {
          x: { duration: 0.2, repeat: 1 },
          scale: { duration: 0.4, delay: 0.2 },
          opacity: { duration: 0.3, delay: 0.2 },
        },
      }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          ".closeIcon": { display: "none" },
          ":hover": {
            ".closeIcon": { display: "block" },
            input: { color: theme.palette.text.primary },
          },
        }}
      >
        <Checkbox
          size="sm"
          checked={task.status === "Done"}
          onChange={() => toggleTask(task.taskId, task)}
        />

        <Input
          defaultValue={task.text}
          variant="noborder"
          size="sm"
          fullWidth
          autoFocus={task.taskId === newlyCreatedId}
          onFocus={(e) => {
            if (task.taskId === newlyCreatedId) {
              setNewlyCreatedId(null);
              e.target.select();
            }
          }}
          sx={{
            width: "80%",
            textDecoration: task.status === "Done" ? "line-through" : "none",
          }}
          onBlur={(e) => editTaskName(task, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            }
          }}
        />

        <CloseOutlined
          className="closeIcon"
          onClick={() => deleteTask(task.taskId)}
          sx={{
            cursor: "pointer",
            color: theme.palette.primary[400],
          }}
        />
      </Box>

      <Box ml={3} display="flex" flexDirection="column" gap={1}>
        <AnimatePresence>
          {task.subtasks?.map((sub) => (
            <Box
              component={motion.div}
              key={sub.taskId}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                x: [0, -2, 2, -2, 2, 0],
                scale: [1, 1.1, 0],
                opacity: [1, 1, 0],
                transition: {
                  x: { duration: 0.2, repeat: 1 },
                  scale: { duration: 0.4, delay: 0.2 },
                  opacity: { duration: 0.3, delay: 0.2 },
                },
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                ".subCloseIcon": { display: "none" },
                ":hover": {
                  ".subCloseIcon": { display: "block" },
                },
              }}
            >
              <Checkbox
                size="sm"
                variant="rounded"
                checked={sub.status === "Done"}
                onChange={() => toggleSubTask(task.taskId, sub)}
              />

              <Input
                defaultValue={sub.text}
                variant="noborder"
                size="sm"
                fullWidth
                autoFocus={sub.taskId === newlyCreatedId}
                onFocus={(e) => {
                  if (sub.taskId === newlyCreatedId) {
                    setNewlyCreatedId(null);
                    e.target.select();
                  }
                }}
                sx={{
                  width: "80%",
                  textDecoration:
                    sub.status === "Done" ? "line-through" : "none",
                }}
                onBlur={(e) =>
                  editSubTaskName(task.taskId, sub, e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
              />

              <CloseOutlined
                className="subCloseIcon"
                onClick={() => deleteSubTask(task.taskId, sub.taskId)}
                sx={{
                  cursor: "pointer",
                  color: theme.palette.primary[400],
                  fontSize: 18,
                }}
              />
            </Box>
          ))}
        </AnimatePresence>

        {task.status !== "Done" && (
          <Typography
            level="body-sm"
            sx={{
              color: theme.palette.primary[500],
              cursor: "pointer",
            }}
            onClick={() => addSubTask(task.taskId)}
          >
            + Add subtask
          </Typography>
        )}
      </Box>
    </motion.div>
  );

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography level="h3">Tasks</Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <AnimatePresence mode="popLayout">
          {sortedTasks.length > 0 ? (
            sortedTasks.map(renderTask)
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="no-tasks"
            >
              <Typography color="neutral" sx={{ textAlign: "center", py: 4 }}>
                No tasks found.
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        <Typography
          level="body-sm"
          sx={{
            color: theme.palette.primary[400],
            cursor: "pointer",
            mt: 1,
          }}
          onClick={addTask}
        >
          + Add Task
        </Typography>
      </Box>
    </Box>
  );
}
