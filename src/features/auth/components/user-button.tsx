"use client";

import { useSession, signOut } from "next-auth/react";
import { CreditCard, Loader, LogOut } from "lucide-react";

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const UserButton = () => {
    const session = useSession();

    if (session.status === "loading") {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    if (session.status === "unauthenticated" || !session.data) {
        return <Link href="/sign-in" className="text-sm bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-400 transition-all duration-150">Sign in</Link>;
    }

    const name = session.data?.user?.name!;
    const imageUrl = session.data?.user?.image;

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opcaity-75 transition">
                    <AvatarImage alt={name} src={imageUrl || ""} />
                    <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
                        {name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
                <DropdownMenuItem
                    disabled={false}
                    onClick={() => {}}
                    className="h-10"
                >
                    <CreditCard className="size-4 mr-2" />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="h-10" onClick={() => signOut()}>
                    <LogOut className="size-4 mr-2" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
