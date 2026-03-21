import { Task, SubTask } from "@/types/task.types";
import { CloseOutlined } from "@mui/icons-material";
import { Box, Checkbox, Input, Typography } from "@mui/joy";

export type TaskItemProps = {
  task: Task;
  theme: any;

  onToggleTask: (task: Task) => void;
  onToggleSubTask: (taskId: string, sub: SubTask) => void;

  onEditTask: (task: Task, value: string) => void;
  onEditSubTask: (taskId: string, sub: SubTask, value: string) => void;

  onAddSubTask: (taskId: string) => void;

  onDeleteTask: (taskId: string) => void;
  onDeleteSubTask: (subTaskId: string) => void;
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
          checked={task.status === "Done"}
          onChange={() => onToggleTask(task)}
        />

        <Input
          defaultValue={task.text}
          variant="noborder"
          size="sm"
          fullWidth
          sx={{
            textDecoration: task.status === "Done" ? "line-through" : "none",
            transition: "all 0.2s ease",
          }}
          onBlur={(e) => onEditTask(task, e.target.value)}
        />

        <CloseOutlined
          className="closeIcon"
          onClick={() => onDeleteTask(task.taskId)}
          sx={{
            width: 20,
            height: 20,
            cursor: "pointer",
            color: theme.palette.primary[400],
          }}
        />
      </Box>

      <Box ml={3} display="flex" flexDirection="column" gap={1}>
        {task.subtasks?.map((sub) => (
          <Box
            key={sub.taskId}
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
              checked={sub.status === "Done"}
              onChange={() => onToggleSubTask(task.taskId, sub)}
            />

            <Input
              defaultValue={sub.text}
              variant="noborder"
              size="sm"
              fullWidth
              sx={{
                textDecoration: sub.status === "Done" ? "line-through" : "none",
                transition: "all 0.2s ease",
              }}
              onBlur={(e) => onEditSubTask(task.taskId, sub, e.target.value)}
            />

            <CloseOutlined
              className="closeIcon"
              onClick={() => onDeleteSubTask(sub.taskId)}
              sx={{
                width: 20,
                height: 20,
                cursor: "pointer",
                color: theme.palette.primary[400],
              }}
            />
          </Box>
        ))}

        {task.status !== "Done" && (
          <Typography
            level="body-sm"
            sx={{
              color: theme.palette.primary[500],
              cursor: "pointer",
            }}
            onClick={() => onAddSubTask(task.taskId)}
          >
            + Add subtask
          </Typography>
        )}
      </Box>
    </Box>
  );
}
