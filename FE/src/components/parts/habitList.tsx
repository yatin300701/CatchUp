import dayjs from "dayjs";
import { CalendarClock, Plus, Trash } from "lucide-react";
import { type FC, useMemo, useState } from "react";
import { WeekDays } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { Habit } from "@/models/habit";
import Confirmation from "../dialogs/Confirmation";
import HabitDialog from "../dialogs/Habit";
import { Button } from "../ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../ui/empty";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

type HeaderKey =
	| "name"
	| "workingDays"
	| "workingTimePeriod"
	| "description"
	| "actions";

interface Header {
	name: string;
	key: HeaderKey;
}

//  name: string;
//   description: string;
//   createdAt: number;
//   updatedAt: number;
//   workingDays: WeekDay[];
//   workingTimePeriod:

const headers: Header[] = [
	{ name: "Name", key: "name" },
	{ name: "Description", key: "description" },
	{ name: "Duration", key: "workingTimePeriod" },
	{ name: "Working Days", key: "workingDays" },
	{ name: "Action", key: "actions" },
];

const HabitList: FC = () => {
	const [habitDialogOpen, setHabitDialogOpen] = useState(false);
	const [habit, setHabit] = useState<Habit[]>([]);
	const [activeHeaderKeys, setActiveHeaderKeys] = useState<HeaderKey[]>([
		"name",
		"workingDays",
		"workingTimePeriod",
		"actions",
		"description",
	]);
	const [openConfirmationDialog, setOpenConfirmationDialog] = useState<{
		open: boolean;
		selectedHabit: Habit | null;
	}>({ open: false, selectedHabit: null });

	const activeHeaders = useMemo(
		() => headers.filter((h) => activeHeaderKeys.includes(h.key)),
		[activeHeaderKeys],
	);

	const handleConfirmation = (res: boolean) => {
		if (res) {
			setHabit((prev) =>
				prev.filter((t) => t.id !== openConfirmationDialog.selectedHabit?.id),
			);
		}
		setOpenConfirmationDialog({ open: false, selectedHabit: null });
	};

	return (
		<div className="mx-8 my-2">
			<div className="flex items-center justify-end ">
				<Button
					className="   h-8 px-3 cursor-pointer text-xs active:scale-95 transition-transform"
					onClick={() => setHabitDialogOpen(true)}
				>
					<Plus className="h-4 w-4" />
					Habit
				</Button>
			</div>
			<div>
				{habit.length > 0 && (
					<Table>
						<TableHeader>
							<TableRow>
								{activeHeaders.map((header) => (
									<TableHead
										key={header.key}
										className="text-xs  text-gray-400 dark:text-gray-400"
									>
										{header.name}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{habit.map((task: Habit) => (
								<TableRow key={task.id}>
									{activeHeaders.map((header) => {
										switch (header.key) {
											case "name":
												return (
													<TableCell key={header.key}>{task.name}</TableCell>
												);
											case "workingDays":
												return (
													<TableCell key={header.key} className="flex">
														{WeekDays.map((d) => {
															return (
																<button
																	type="button"
																	key={d}
																	className={cn(
																		"border border-solid border-black size-8 text-sm rounded-full flex items-center justify-center ",
																		task.workingDays.includes(d) &&
																			"bg-accent-foreground text-accent",
																	)}
																>
																	{d[0]}
																</button>
															);
														})}
													</TableCell>
												);
											case "workingTimePeriod":
												return (
													<TableCell key={header.key}>
														{dayjs(task.workingTimePeriod.start * 1000).format(
															"DD MMM YYYY",
														)}{" "}
														-{" "}
														{dayjs(task.workingTimePeriod.end * 1000).format(
															"DD MMM YYYY",
														)}
													</TableCell>
												);
											case "actions":
												return (
													<TableCell className="w-40" key={header.key}>
														<Button
															variant="ghost"
															size="icon"
															className="cursor-pointer"
															onClick={() =>
																setOpenConfirmationDialog({
																	open: true,
																	selectedHabit: task,
																})
															}
														>
															<Trash />
														</Button>
													</TableCell>
												);

											default:
												return (
													<TableCell
														className="capitalize whitespace-break-spaces"
														key={header.key}
													>
														{task?.[header.key]}{" "}
													</TableCell>
												);
										}
									})}
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}

				{habit.length === 0 && (
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<CalendarClock />
							</EmptyMedia>
							<EmptyTitle>No Habit Yet</EmptyTitle>
							<EmptyDescription>
								You haven&apos;t created any habit yet. Get started by creating
								your first habit.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<div className="flex gap-2">
								<Button onClick={() => setHabitDialogOpen(true)}>
									Create Habit
								</Button>
							</div>
						</EmptyContent>
					</Empty>
				)}
			</div>
			{openConfirmationDialog && (
				<Confirmation
					open={openConfirmationDialog.open}
					onClose={(res) => handleConfirmation(res)}
				/>
			)}
			{habitDialogOpen && (
				<HabitDialog
					open={habitDialogOpen}
					onClose={() => setHabitDialogOpen(false)}
					onSubmit={(task: Omit<Habit, "id">) => {
						setHabit((prev) => [
							...prev,
							{ ...task, id: Date.now().toString() },
						]);
						setHabitDialogOpen(false);
					}}
				/>
			)}
		</div>
	);
};

export default HabitList;
