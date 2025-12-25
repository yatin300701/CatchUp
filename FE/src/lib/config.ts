import { CircleCheckBig, CircleDashed, CircleDot } from "lucide-react";
import type { WeekDay } from "@/models/common";

export const TASK_STATUS_CONFIG = {
	pending: {
		label: "Pending",
		Icon: CircleDashed,
		className: "text-muted-foreground",
	},
	"in-progress": {
		label: "In Progress",
		Icon: CircleDot,
		className: "text-orange-600",
	},
	completed: {
		label: "Completed",
		Icon: CircleCheckBig,
		className: "text-green-600",
	},
} as const;

export type TaskStatus = keyof typeof TASK_STATUS_CONFIG;

export const WeekDays: WeekDay[] = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
