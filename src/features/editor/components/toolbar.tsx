"use client"

import { ActiveTool, Editor, FONT_SIZE, FONT_STYLE, FONT_WEIGHT } from "../types"
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp, ChevronDown, Trash } from "lucide-react";
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { FontSizeInput } from "./font-size-input";
import { TbColorFilter } from "react-icons/tb";

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
    const selectedObject = editor?.selectedObjects[0];
    const selectedObjectType = editor?.selectedObjects[0]?.type;

    // const getProperty = (property: any) => {
    //     if(!selectedObject) return null;

    //     return selectedObject.get(property);
    // }

    // const fillColor = getProperty("fill");
    const fillColor = editor?.getActiveFillColor();
    const strokeColor = editor?.getActiveStrokeColor();
    const fontFamily = editor?.getActiveFontFamily();
    const fontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
    const fontStyle = editor?.getActiveFontStyle() || FONT_STYLE;
    const fontLinethrough = editor?.getActiveFontLinethrough() || false;
    const fontUnderline = editor?.getActiveFontUnderline() || false;
    const textAlign = editor?.getActiveTextAlign() || "left";
    const fontSize = editor?.getActiveFontSize() || FONT_SIZE;
    
    // const [properties, setProperties] = useState({
    //     fillColor
    // });

    const isSelectedText = isTextType(selectedObjectType);
    const isSelectedImage = selectedObjectType === "image";

    const toggleBold = () => {
        if(!selectedObject) return;

        const newValue = fontWeight > 500 ? 500 : 700;
        editor.changeFontWeight(newValue);
    }

    const toggleItalic = () => {
        if(!selectedObject) return;

        const isItalic = fontStyle === "italic";
        const newValue = isItalic ? "normal" : "italic";
        editor.changeFontStyle(newValue);
    }

    const toggleLinethrough = () => {
        if(!selectedObject) return;

        const newValue = fontLinethrough ? false : true;
        editor.changeFontLinethrough(newValue);
    }

    const toggleUnderline = () => {
        if(!selectedObject) return;

        const newValue = fontUnderline ? false : true;
        editor.changeFontUnderline(newValue);
    }

    const onChangeTextAlign = (value: string) => {
        if(!selectedObject) return;

        editor.changeTextAlign(value);
    }

    const onChangeFontSize = (value: number) => {
        if(!selectedObject) return;
        editor.changeFontSize(value);
    }

    if(editor?.selectedObjects.length === 0){
        return (
            <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">

            </div>    
        )
    }

    return (
        <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
            {
                !isSelectedImage &&
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
            }
            {
                !isSelectedText && (
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
                )
            }

            {
                !isSelectedText &&
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
            }

            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Font" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeActiveTool("font")}
                            size="icon"
                            variant="ghost"
                            className={cn("w-auto px-2 text-sm",
                                activeTool === "font" && "bg-gray-100"
                            )}
                        >
                            <div className="max-w-[100px] truncate">
                                {fontFamily}
                            </div>
                            <ChevronDown className="size-4 ml-2 shrink-0" />
                        </Button>
                    </Hint>
                </div>
            }
            
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Bold" side="bottom" sideOffset={5}>
                        <Button
                            onClick={toggleBold}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                fontWeight > 500 && "bg-gray-100"
                            )}
                        >
                            <FaBold className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Italic" side="bottom" sideOffset={5}>
                        <Button
                            onClick={toggleItalic}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                fontStyle === "italic" && "bg-gray-100"
                            )}
                        >
                            <FaItalic className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Underline" side="bottom" sideOffset={5}>
                        <Button
                            onClick={toggleUnderline}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                fontUnderline && "bg-gray-100"
                            )}
                        >
                            <FaUnderline className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Strike" side="bottom" sideOffset={5}>
                        <Button
                            onClick={toggleLinethrough}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                fontLinethrough && "bg-gray-100"
                            )}
                        >
                            <FaStrikethrough className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Align left" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeTextAlign("left")}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                textAlign === "left" && "bg-gray-100"
                            )}
                        >
                            <AlignLeft className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Align center" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeTextAlign("center")}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                textAlign === "center" && "bg-gray-100"
                            )}
                        >
                            <AlignCenter className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Align right" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeTextAlign("right")}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                textAlign === "right" && "bg-gray-100"
                            )}
                        >
                            <AlignRight className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            {   
                isSelectedText &&
                <div className="flex items-center h-full justify-center">
                    <FontSizeInput 
                        value={fontSize}
                        onChange={onChangeFontSize}
                    />
                </div>
            }
            {   
                isSelectedImage &&
                <div className="flex items-center h-full justify-center">
                    <Hint label="Filters" side="bottom" sideOffset={5}>
                        <Button
                            onClick={() => onChangeActiveTool("filter")}
                            size="icon"
                            variant="ghost"
                            className={cn(
                                activeTool === "filter" && "bg-gray-100"
                            )}
                        >
                            <TbColorFilter className="size-4" />
                        </Button>
                    </Hint>
                </div>
            }
            <div className="flex items-center h-full justify-center">
                <Hint label="Bring forward" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.bringForward()}
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowUp className="size-4" />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Send backwards" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.sendBackwards()}
                        size="icon"
                        variant="ghost"
                    >
                        <ArrowDown className="size-4" />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Opacity" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => onChangeActiveTool("opacity")}
                        size="icon"
                        variant="ghost"
                        className={cn(
                            activeTool === "stroke-width" && "bg-gray-100"
                        )}
                    >
                        <RxTransparencyGrid className="size-4" />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center h-full justify-center">
                <Hint label="Delete" side="bottom" sideOffset={5}>
                    <Button
                        onClick={() => editor?.delete()}
                        size="icon"
                        variant="ghost"
                    >
                        <Trash className="size-4" />
                    </Button>
                </Hint>
            </div>
        </div>
    )
}