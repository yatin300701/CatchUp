"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Checkbox, Input, Typography, useTheme } from "@mui/joy";
import { CloseOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

type SubTask = {
  id: number;
  name: string;
  completed: boolean;
  createdAt: number;
};

export type Task = {
  id: number;
  name: string;
  completed: boolean;
  createdAt: number;
  subTasks?: SubTask[];
};

async function getTasks(): Promise<Task[]> {
  return [
    {
      id: 1,
      name: "Dzylo",
      completed: false,
      createdAt: Date.now(),
      subTasks: [
        {
          id: 10,
          name: "Task 1",
          completed: false,
          createdAt: Date.now(),
        },
      ],
    },
    {
      id: 2,
      name: "Old Task",
      completed: false,
      createdAt: Date.now() - 86400000 * 2,
    },
  ];
}

export default function TasksList() {
  const theme = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading tasks</Typography>;

  const isToday = (timestamp: number) => {
    const today = new Date();
    const d = new Date(timestamp);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  };

  const todayTasks = tasks?.filter((t) => isToday(t.createdAt));
  const remainingTasks = tasks?.filter((t) => !isToday(t.createdAt));

  const toggleTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const newCompleted = !task.completed;

        return {
          ...task,
          completed: newCompleted,
          subTasks: task.subTasks?.map((sub) => ({
            ...sub,
            completed: newCompleted,
          })),
        };
      }),
    );
  };

  const toggleSubTask = (taskId: number, subTaskId: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const updatedSubs =
          task.subTasks?.map((sub) =>
            sub.id === subTaskId ? { ...sub, completed: !sub.completed } : sub,
          ) ?? [];

        const allCompleted =
          updatedSubs.length > 0 && updatedSubs.every((s) => s.completed);

        return {
          ...task,
          completed: allCompleted,
          subTasks: updatedSubs,
        };
      }),
    );
  };

  const editTaskName = (taskId: number, value: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, name: value } : task,
      ),
    );
  };

  const editSubTaskName = (
    taskId: number,
    subTaskId: number,
    value: string,
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks?.map((sub) =>
                sub.id === subTaskId ? { ...sub, name: value } : sub,
              ),
            }
          : task,
      ),
    );
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      name: "New Task",
      completed: false,
      createdAt: Date.now(),
      subTasks: [],
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const addSubTask = (taskId: number) => {
    const newSub: SubTask = {
      id: Date.now(),
      name: "New Subtask",
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: [...(task.subTasks || []), newSub],
            }
          : task,
      ),
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const deleteSubTask = (taskId: number, subTaskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subTasks: task.subTasks?.filter((sub) => sub.id !== subTaskId),
            }
          : task,
      ),
    );
  };

  const renderTask = (task: Task) => (
    <Box key={task.id} display="flex" flexDirection="column">
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
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        <Input
          value={task.name}
          variant="noborder"
          size="sm"
          fullWidth
          sx={{
            width: "80%",
            textDecoration: task.completed ? "line-through" : "none",
          }}
          onChange={(e) => editTaskName(task.id, e.target.value)}
        />

        <CloseOutlined
          className="closeIcon"
          onClick={() => deleteTask(task.id)}
          sx={{
            cursor: "pointer",
            color: theme.palette.primary[400],
          }}
        />
      </Box>

      <Box ml={3} display="flex" flexDirection="column" gap={1}>
        {task.subTasks?.map((sub) => (
          <Box
            key={sub.id}
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              ".closeIcon": { display: "none" },
              ":hover": {
                ".closeIcon": { display: "block" },
                input: {
                  color: theme.palette.text.primary,
                },
              },
            }}
          >
            <Checkbox
              size="sm"
              variant="rounded"
              checked={sub.completed}
              onChange={() => toggleSubTask(task.id, sub.id)}
            />

            <Input
              value={sub.name}
              variant="noborder"
              size="sm"
              fullWidth
              sx={{
                width: "80%",
                textDecoration: sub.completed ? "line-through" : "none",
              }}
              onChange={(e) => editSubTaskName(task.id, sub.id, e.target.value)}
            />

            <CloseOutlined
              className="closeIcon"
              onClick={() => deleteSubTask(task.id, sub.id)}
              sx={{
                cursor: "pointer",
                color: theme.palette.primary[400],
              }}
            />
          </Box>
        ))}

        {!task?.completed && (
          <Typography
            level="body-sm"
            sx={{
              color: theme.palette.primary[500],
              cursor: "pointer",
            }}
            onClick={() => addSubTask(task.id)}
          >
            + Add subtask
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography level="h4" mb={2}>
        Today
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {todayTasks.map(renderTask)}

        <Typography
          level="body-sm"
          sx={{
            color: theme.palette.primary[400],
            cursor: "pointer",
          }}
          onClick={addTask}
        >
          + Add Task
        </Typography>
      </Box>

      {remainingTasks.length > 0 && (
        <Box>
          <Typography level="h4" mt={4} mb={2}>
            Remaining Tasks
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            {remainingTasks.map(renderTask)}
          </Box>
        </Box>
      )}
    </Box>
  );
}
