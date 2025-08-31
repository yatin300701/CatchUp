import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import moment from "moment";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Maximize2, Minimize2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { db } from "@/services/indexdb";
const FormSchema = z.object({
  name: z.string().min(1, { error: "Name can't be empty" }),
  description: z.string(),
  dueDate: z.string(),
  file: z.string(),
});

function CreateTask() {
  const [fillAllTaskDetails, setFillAllTaskDetails] = useState(false);
  const [autoFillTaskDetails, setAutoFillTaskDetails] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      dueDate: moment().format("YYYY-MM-DD"),
      file: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const id = await db.tasks.add({
        name: data.name,
        description: data.description,
        dueDate: data.dueDate,
      });
      toast.success("Task Created Successfully", {
        description: `Task ID: ${id}`,
      });
      form.reset();
    } catch (err) {}
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="gap-2">
          <CardHeader>
            <CardTitle>Create Task</CardTitle>
            {!fillAllTaskDetails && (
              <CardDescription className="flex gap-2 items-center my-2">
                <Checkbox
                  checked={autoFillTaskDetails}
                  onClick={() => setAutoFillTaskDetails(!autoFillTaskDetails)}
                />
                Autofill details
              </CardDescription>
            )}
            <CardAction className="cursor-pointer">
              {fillAllTaskDetails && (
                <Minimize2
                  size="14"
                  onClick={() => setFillAllTaskDetails(!fillAllTaskDetails)}
                />
              )}
              {!fillAllTaskDetails && (
                <Maximize2
                  size="14"
                  onClick={() => setFillAllTaskDetails(!fillAllTaskDetails)}
                />
              )}
            </CardAction>
          </CardHeader>
          <CardContent
            className={cn(
              "gap-2 flex ",
              fillAllTaskDetails ? "flex-col" : "items-end"
            )}
          >
            {(fillAllTaskDetails || !autoFillTaskDetails) && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Name" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {fillAllTaskDetails && (
              <>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {autoFillTaskDetails && !fillAllTaskDetails && (
              <>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Upload (Auto-fill details)</FormLabel>
                      <FormControl>
                        <Input type="file" placeholder="Add file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {fillAllTaskDetails && (
              <>
                <div>
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Due Date"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            {!fillAllTaskDetails && <Button type="submit">Submit</Button>}
          </CardContent>
          <CardFooter>
            {fillAllTaskDetails && (
              <Button type="submit" className="w-full">
                Submit
              </Button>
            )}
            {!fillAllTaskDetails && (
              <Label className="text-xs  text-gray-400">
                Note: Due date is today
              </Label>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default CreateTask;
