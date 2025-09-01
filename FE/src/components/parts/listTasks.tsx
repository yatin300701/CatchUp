import { db, type Task } from "@/services/indexdb";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ListTasks() {
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const handleDelete = (task: Task) => {
    db.tasks.delete(task.id);
  };

  return (
    <div className="mt-8 mx-1 mb-4">
      <h1 className="text-2xl font-bold">List</h1>
      <Separator className="my-2" />
      <div className="flex flex-col gap-4 h-[calc(100vh-300px)] overflow-auto mt-4">
        {tasks?.map((item) => (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardAction className="flex  items-center gap-2">
                  Done <Checkbox onClick={() => handleDelete(item)} />
                </CardAction>
              </CardHeader>
              <CardContent>
                <CardDescription className="whitespace-break-spaces">
                  {item.description}
                </CardDescription>
                <CardAction className="text-right text-xs">
                  Due Date: {item.dueDate}
                </CardAction>
              </CardContent>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
}

export default ListTasks;
