"use client"

import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useEditor } from "../hooks/use-editor";

export const Editor = () => {
    const {init} = useEditor();
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay: true,
                preserveObjectStacking: true
            }
        )

        init({
            initialCanvas: canvas,
            initialContainer: containerRef.current!,
        })
    },[init]);

    return (
        <div className="h-full flex flex-col">
            <div ref={containerRef} className="flex-1 h-full bg-muted">
                <canvas ref={canvasRef} />
            </div>
        </div>
    )
}