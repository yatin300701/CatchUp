import dayjs from "dayjs";
import { type FC, useActionState, useState } from "react";
import { WeekDays } from "@/lib/config";
import { cn } from "@/lib/utils";
import type { WeekDay } from "@/models/common";
import type { Habit } from "@/models/habit";
import { Button } from "../ui/button";
import { Calendar22 } from "../ui/date-picker";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type HabitFormState = Omit<Habit, "id">;

interface HabitDialogProps {
	open: boolean;
	onSubmit: (task: HabitFormState) => void;
	onClose: () => void;
}

const initHabit: Omit<Habit, "id"> = {
	name: "",
	description: "",
	createdAt: 0,
	updatedAt: 0,
	workingDays: [],
	workingTimePeriod: {
		start: 0,
		end: 0,
	},
};

const HabitDialog: FC<HabitDialogProps> = ({ open, onSubmit, onClose }) => {
	const [state, formAction] = useActionState(setHabit, initHabit);
	const [workingTimePeriod, setWorkingTimePeriod] = useState<{
		start?: Date;
		end?: Date;
	}>({
		start: new Date(),
		end: new Date(),
	});
	const [selectedWorkingDays, setSelectedWorkingDays] = useState<WeekDay[]>([]);

	async function setHabit(
		previousState: HabitFormState,
		formData: FormData,
	): Promise<HabitFormState> {
		const updatedHabit: HabitFormState = {
			...previousState,
			name: String(formData.get("name") ?? ""),
			description: String(formData.get("description") ?? ""),
			updatedAt: Date.now(),
			createdAt: Date.now(),
			workingDays: selectedWorkingDays,
			workingTimePeriod: {
				start: dayjs(workingTimePeriod.start).unix(),
				end: dayjs(workingTimePeriod.end).unix(),
			},
		};
		if (
			updatedHabit.name.trim() === "" ||
			updatedHabit.workingDays.length === 0
		)
			return updatedHabit;

		onSubmit(updatedHabit);
		return updatedHabit;
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Habit</DialogTitle>
				</DialogHeader>
				<form action={formAction} className="flex flex-col gap-3">
					<div className="grid w-full  items-center gap-1">
						<Label htmlFor="name">Name</Label>
						<Input
							name="name"
							id="name"
							placeholder="Enter name"
							defaultValue={state.name}
							required
						/>
					</div>
					<div className="grid w-full  items-center gap-1">
						<Label htmlFor="description">Description</Label>
						<Textarea
							name="description"
							id="description"
							placeholder="Enter description"
							defaultValue={state.description}
						/>
					</div>
					<div className="flex gap-2">
						<div className=" flex flex-col gap-1 w-full">
							<Label htmlFor="workingTimePeriodStart">Start Date</Label>
							<Input
								type="hidden"
								name="workingTimePeriodStart"
								value={state.workingTimePeriod.start}
							/>
							<Calendar22
								date={workingTimePeriod.start}
								startDate={new Date()}
								setDate={(date) => {
									setWorkingTimePeriod((prev) => {
										return {
											...prev,
											start: date,
										};
									});
								}}
							/>
						</div>
						<div className=" flex flex-col gap-1 w-full">
							{" "}
							<Label htmlFor="workingTimePeriodEnd">End Date</Label>
							<Input
								type="hidden"
								name="workingTimePeriodEnd"
								value={state.workingTimePeriod.end}
							/>
							<Calendar22
								date={workingTimePeriod.end}
								setDate={(date) => {
									setWorkingTimePeriod((prev) => {
										return {
											...prev,
											end: date,
										};
									});
								}}
								endDate={new Date(new Date().getFullYear() + 1, 11)}
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="workingDays">Working Days</Label>
						<div className="flex gap-2 my-2 items-center ">
							{WeekDays.map((d) => {
								return (
									<button
										type="button"
										key={d}
										className={cn(
											"border border-solid border-black size-8 text-sm rounded-full flex items-center justify-center cursor-pointer",
											selectedWorkingDays.includes(d) &&
												"bg-accent-foreground text-accent",
										)}
										onClick={() =>
											setSelectedWorkingDays((prev) => {
												if (prev.includes(d)) {
													return prev.filter((day) => d !== day);
												}
												return [...prev, d];
											})
										}
									>
										{d[0]}
									</button>
								);
							})}
						</div>
					</div>

					<DialogFooter>
						<Button variant="ghost">Cancel</Button>
						<Button type="submit">Save</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default HabitDialog;
