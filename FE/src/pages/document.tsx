import { Pin, Plus } from "lucide-react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Document: FC = () => {
	return (
		<>
			<main className="w-full relative">
				<SidebarTrigger className="absolute bottom-0.5 left-0" />
				<div className="flex flex-col my-2 mx-4 gap-2 ">
					<h3 className="font-semibold text-2xl">Good Morning</h3>
					<div>
						<h2>12 Mar, 24</h2>
						<div className="flex gap-8 py-4">
							<div className="border border-solid border-muted rounded-sm p-3 w-32 h-40 flex flex-col justify-between items-center">
								<img height="70" alt="Img" className="w-full h-[40%]" />
								<div>
									<p className="text-sm text-muted-foreground">CN Books</p>
									<p className="text-xs text-muted-foreground">
										This is new copy of cn
									</p>
								</div>

								<span className="text-[10px] w-full text-right">12 Apr,24</span>
							</div>
							<div className="border border-solid border-muted rounded-sm p-3 w-32 h-40 flex flex-col justify-between items-center">
								<img height="70" alt="Img" className="w-full h-[40%]" />
								<div>
									<p className="text-sm text-muted-foreground">CN Books</p>
									<p className="text-xs text-muted-foreground">
										This is new copy of cn
									</p>
								</div>

								<span className="text-[10px] w-full text-right">12 Apr,24</span>
							</div>
						</div>
					</div>
				</div>
			</main>
			<div className="bg-sidebar w-72">
				<div className="h-1/2">
					<div className="mt-4 mx-1 mb-1 text-sm hover:bg-sidebar-accent p-1 px-2 flex items-center justify-between rounded-sm">
						<span className="flex items-center gap-1">
							<Pin size="14" className="fill-current" /> Documents
						</span>
						<Button
							variant="secondary"
							className="h-6 w-6 rounded-sm cursor-pointer"
						>
							<Plus />
						</Button>
					</div>
					<Separator className="" />
					<div className="text-xs text-muted-foreground p-4">
						<p className="flex justify-between w-full gap-3">
							<span className=" whitespace-nowrap w-full overflow-hidden text-ellipsis ">
								Computer Networj Networj Networj Networj v Computer Networj
								Networj Networj Networj v
							</span>
							<span className="whitespace-nowrap ">12 Apr,24</span>
						</p>
					</div>
				</div>
				<div className="mx-1 mb-1 text-sm hover:bg-sidebar-accent p-1 px-2 flex items-center justify-between rounded-sm">
					<span className="flex items-center gap-1">
						<Pin size="14" className="fill-current" /> Links
					</span>
					<Button
						variant="secondary"
						className="h-6 w-6 rounded-sm cursor-pointer"
					>
						<Plus />
					</Button>
				</div>
				<Separator className="" />
				<div className="text-xs text-muted-foreground p-4">
					<p className="flex justify-between w-full gap-3">
						<span className=" whitespace-nowrap w-full overflow-hidden text-ellipsis ">
							Computer Networj Networj Networj Networj v Computer Networj
							Networj Networj Networj v
						</span>
						<span className="whitespace-nowrap ">12 Apr,24</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default Document;
