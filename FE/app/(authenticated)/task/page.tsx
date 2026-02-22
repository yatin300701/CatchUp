import Header from "@/components/common/Header";
import { Button, Box, Typography } from "@mui/joy";
import { FC } from "react";
import TasksList from "@/components/task/task-list";

const Task: FC = async () => {
  return (
    <>
      <Header></Header>
      <Box p={2}>
        <TasksList />
      </Box>
    </>
  );
};

export default Task;
