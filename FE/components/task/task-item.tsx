import { CloseOutlined } from "@mui/icons-material";
import { Box, Checkbox, Input, Typography } from "@mui/joy";

export type SubTask = {
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

export type TaskItemProps = {
  task: Task;
  theme: any;
  onToggleTask: (taskId: number) => void;
  onToggleSubTask: (taskId: number, subTaskId: number) => void;
  onEditTask: (taskId: number, value: string) => void;
  onEditSubTask: (taskId: number, subTaskId: number, value: string) => void;
  onAddSubTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onDeleteSubTask: (taskId: number, subTaskId: number) => void;
};

export function TaskItem({
  task,
  theme,
  onToggleTask,
  onToggleSubTask,
  onEditTask,
  onEditSubTask,
  onAddSubTask,
  onDeleteTask,
  onDeleteSubTask,
}: TaskItemProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          ".closeIcon": { display: "none" },
          ":hover": { ".closeIcon": { display: "block" } },
        }}
      >
        <Checkbox
          size="sm"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />

        <Input
          value={task.name}
          variant="noborder"
          size="sm"
          fullWidth
          sx={{
            textDecoration: task.completed ? "line-through" : "none",
            transition: "all 0.2s ease",
          }}
          onChange={(e) => onEditTask(task.id, e.target.value)}
        />

        <CloseOutlined
          className="closeIcon"
          onClick={() => onDeleteTask(task.id)}
          sx={{
            width: 20,
            height: 20,
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
              ":hover": { ".closeIcon": { display: "block" } },
            }}
          >
            <Checkbox
              size="sm"
              variant="rounded"
              checked={sub.completed}
              onChange={() => onToggleSubTask(task.id, sub.id)}
            />

            <Input
              value={sub.name}
              variant="noborder"
              size="sm"
              fullWidth
              sx={{
                textDecoration: sub.completed ? "line-through" : "none",
                transition: "all 0.2s ease",
              }}
              onChange={(e) => onEditSubTask(task.id, sub.id, e.target.value)}
            />

            <CloseOutlined
              className="closeIcon"
              onClick={() => onDeleteSubTask(task.id, sub.id)}
              sx={{
                width: 20,
                height: 20,
                cursor: "pointer",
                color: theme.palette.primary[400],
              }}
            />
          </Box>
        ))}

        <Typography
          level="body-sm"
          sx={{
            color: theme.palette.primary[500],
            cursor: "pointer",
          }}
          onClick={() => onAddSubTask(task.id)}
        >
          + Add subtask
        </Typography>
      </Box>
    </Box>
  );
}
