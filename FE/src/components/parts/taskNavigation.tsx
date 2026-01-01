import { AlarmCheckIcon, ClipboardList, Hourglass } from "lucide-react";
import type { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavItem = {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
	{
		label: "Today Plan",
		href: "/task",
		icon: Hourglass,
	},
	{
		label: "Task List",
		href: "/task/list",
		icon: ClipboardList,
	},
	{
		label: "Habit",
		href: "/task/habit",
		icon: AlarmCheckIcon,
	},
];

const TaskNavigation: FC = () => {
	const { pathname } = useLocation();

	const isActive = (href: string) => pathname === href;

	return (
		<div className="flex items-center h-14 justify-between px-10 w-full border-b border-[#252833] border-solid ">
			<h4 className="text-primary font-extrabold text-2xl">Tasks</h4>
			<ul className="flex items-center gap-4 h-full ">
				{NAV_ITEMS.map(({ label, href, icon: Icon }) => (
					<NavLink
						key={label}
						to={href}
						className={cn(
							" group flex text-subtle opacity-60 hover:opacity-100 relative h-full items-center justify-center gap-2",
							isActive(href) && "text-primary font-semibold opacity-100",
						)}
					>
						<Icon className={cn("size-5 transition-transform duration-200")} />
						<span
							className={cn(
								"overflow-hidden whitespace-nowrap transition-all duration-500 ",
								"opacity-0 max-w-0 translate-x-[-6px]",
								isActive(href) && "opacity-100 max-w-[120px] translate-x-0",
							)}
						>
							{label}
						</span>
						<div className="absolute bottom-0 left-[-15%] w-[130%] h-[2px] bg-gradient-to-r from-transparent via-[#740DF6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 "></div>
						{isActive(href) && (
							<div className="absolute bottom-0 left-[-15%] w-[130%] h-[2px] bg-gradient-to-r from-transparent via-[#740DF6] to-transparent transition-all duration-500 " />
						)}
					</NavLink>
				))}
			</ul>
		</div>
	);
};

export default TaskNavigation;
