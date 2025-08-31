import Dexie, { type EntityTable } from "dexie";

interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
}

const db = new Dexie("TaskDatabase") as Dexie & {
  tasks: EntityTable<
    Task,
    "id" // primary key "id"
  >;
};
// Schema declaration:
db.version(1).stores({
  tasks: "++id, name, description, dueDate", // primary key "id" (for the runtime!)
});

export type { Task };
export { db };
