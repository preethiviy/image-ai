"use client"

import React from 'react'
import { Logo } from './logo';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown, MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import { CiFileOn } from 'react-icons/ci';
import { Separator } from '@/components/ui/separator';
import { Hint } from '@/components/hint';

export const Navbar = () => {
    return (
        <nav className='w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]'>
            <Logo />
            <div className='w-full flex items-center gap-x-1 h-full'>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger>
                        <Button>
                            File
                            <ChevronDown className='size-4 ml-2' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' className='min-w-60'>
                        <DropdownMenuItem onClick={() => {}} className='flex items-center gap-x-2'>
                            <CiFileOn className='size-8' />
                            <div>
                                <p>Open</p>
                                <p className='text-xs text-muted-foreground'>Open a JSON file</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation='vertical' className='mx-2' />
                <Hint label='Select' side='bottom' sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {}}
                        className=''
                    >
                        <MousePointerClick className='size-4' />
                    </Button>
                </Hint>
                <Hint label='Undo' side='bottom' sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {}}
                        className=''
                    >
                        <Undo2 className='size-4' />
                    </Button>
                </Hint>
                <Hint label='Redo' side='bottom' sideOffset={10}>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {}}
                        className=''
                    >
                        <Redo2 className='size-4' />
                    </Button>
                </Hint>
                <Separator orientation='vertical' className='mx-2' />
            </div>
        </nav>
    )
}