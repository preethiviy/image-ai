"use client"

import { useState } from "react";
import { ActiveTool, Editor } from "../types"
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";

interface ToolbarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
    editor,
    activeTool,
    onChangeActiveTool
}: ToolbarProps) => {
    // const selectedObject = editor?.canvas.getActiveObject();

    // const getProperty = (property: any) => {
    //     if(!selectedObject) return null;

    //     return selectedObject.get(property);
    // }

    // const fillColor = getProperty("fill");
    const fillColor = editor?.getActiveFillColor();
    const strokeColor = editor?.getActiveStrokeColor();
    
    // const [properties, setProperties] = useState({
    //     fillColor
    // });

    if(editor?.selectedObjects.length === 0){
        return (
            <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">

            </div>    
        )
    }

    return (
        <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
            <div className="flex items-center h-full justify-center">
                <Hint label="Color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("fill")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            activeTool === "fill" && "bg-gray-100"
                        )}
                    >
                        <div 
                            className="rounded-sm size-4 border"
                            style={{
                                backgroundColor: fillColor
                            }}
                        />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Stroke color" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("stroke-color")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            activeTool === "stroke-color" && "bg-gray-100"
                        )}
                    >
                        <div 
                            className="rounded-sm size-4 border-2 bg-white"
                            style={{
                                borderColor: strokeColor
                            }}
                        />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Stroke width" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("stroke-width")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            activeTool === "stroke-width" && "bg-gray-100"
                        )}
                    >
                        <BsBorderWidth className="size-4" />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}