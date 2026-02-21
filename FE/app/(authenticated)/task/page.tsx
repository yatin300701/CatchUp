import Header from "@/components/common/Header";
import { Button, Box, Typography } from "@mui/joy";
import { FC } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Task: FC = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts-comments"],
    queryFn: getComments,
  });

  // const tasks = await axios.get("/api/tasks");
  return (
    <>
      <Header>
        <Button variant="plain">+ Add Task</Button>
      </Header>
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography level="h4">Today</Typography>
          <Typography level="body-sm">{new Date().toDateString()}</Typography>
        </Box>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Box>Whats</Box>
        </HydrationBoundary>
      </Box>
    </>
  );
};

export default Task;
