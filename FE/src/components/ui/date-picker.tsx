import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
	date?: Date;
	setDate: (date?: Date) => void;
	startDate?: Date;
	endDate?: Date;
}

export function Calendar22({ date, setDate, startDate, endDate }: Props) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" id="date" className="w-full justify-between ">
					{date ? date.toLocaleDateString() : "Select date"}
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto overflow-hidden p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					endMonth={endDate}
					startMonth={startDate}
					captionLayout="dropdown"
					onSelect={(date) => {
						setDate(date);
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
