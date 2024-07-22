import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FillColorSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FillColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}: FillColorSidebarProps) => {
    const onClose = () => {
        onChangeActiveTool("select");
    };

    const onChange = (value: string) => {
        editor?.changeFillColor(value);
    };
    return (
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "fill" ? "visible" : "hidden"
        )} >
            <ToolSidebarHeader 
                title="Fill color"
                description="Add fill color to your element"
            />
            <ScrollArea>
                <div className="p-4 space-y-6">
                    
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose} />
        </aside>
    )
}