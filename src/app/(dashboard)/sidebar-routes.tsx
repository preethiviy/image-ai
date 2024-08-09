"use client";

import { 
  CreditCard, 
  Crown, 
  Home, 
  MessageCircleQuestion
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";

import { SidebarItem } from "./sidebar-item";
import { Button } from "@/components/ui/button";

export const SidebarRoutes = () => {

	const pathname = usePathname();

	const onClick = () => {
		
	};

	return (
		<div className="flex flex-col gap-y-4 flex-1">
			<div className="px-3">
            	<Button
              		onClick={() => {}}
              		disabled={false}
              		className="w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition"
              		variant="outline"
              		size="lg"
            	>
              	<Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
              		Upgrade to Image AI Pro
            	</Button>
          	</div>
          	<div className="px-3">
            	<Separator />
          	</div>
			<ul className="flex flex-col gap-y-1 px-3">
				<SidebarItem
					href="/"
					icon={Home}
					label="Home"
					isActive={pathname === "/"}
				/>
			</ul>
			<div className="px-3">
				<Separator />
			</div>
			<ul className="flex flex-col gap-y-1 px-3">
				<SidebarItem
					href={pathname}
					icon={CreditCard}
					label="Billing"
					onClick={onClick}
				/>
				<SidebarItem
					href="mailto:preethivirajyambem@gmail.com"
					icon={MessageCircleQuestion}
					label="Get Help"
				/>
			</ul>
		</div>
	);
};
