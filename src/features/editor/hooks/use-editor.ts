import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { 
    BuildEditorProps, 
    CIRCLE_OPTIONS, 
    DIAMOND_OPTIONS, 
    Editor, 
    EditorHookProps, 
    FILL_COLOR, 
    FONT_FAMILY, 
    FONT_SIZE, 
    FONT_STYLE, 
    FONT_WEIGHT, 
    JSON_KEYS, 
    RECTANGLE_OPTIONS, 
    STROKE_COLOR, 
    STROKE_DASH_ARRAY, 
    STROKE_WIDTH, 
    TEXT_OPTIONS, 
    TRIANGLE_OPTIONS 
} from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { createFilter, isTextType } from "../utils";
import { useClipboard } from "./use-clipboard";
import { useHistory } from "./use-history";
import { useHotkeys } from "./use-hotkeys";

const buildEditor = ({
    canvas,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeDashArray,
    setStrokeDashArray,
    opacity,
    setOpacity,
    fontFamily,
    setFontFamily,
    fontWeight,
    setFontWeight,
    fontStyle,
    setFontStyle,
    fontLinethrough,
    setFontLinethrough,
    fontUnderline,
    setFontUnderline,
    textAlign,
    setTextAlign,
    fontSize, 
    setFontSize,
    selectedObjects,
    copy, 
    paste,
    autoZoom,
    save,
    redo, 
    undo,
    canRedo,
    canUndo
}: BuildEditorProps): Editor => {
    const getWorkspace = () => {
        return canvas.getObjects().find((object) => object.name === "clip");
    }

    const center = (object: fabric.Object) => {
        const workspace = getWorkspace();
        const center = workspace?.getCenterPoint();
        if(!center) return;
        //@ts-ignore
        canvas._centerObject(object, center);
    };

    const addToCanvas = (object: fabric.Object) => {
        center(object);
        canvas.add(object);
        canvas.setActiveObject(object);
    }

    return {
        addCircle: () => {
            const object = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
            addToCanvas(object);
        },
        addSoftRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 50,
                ry: 50,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
            addToCanvas(object);
        },
        addRectangle: () => {
            const object = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
            addToCanvas(object);
        },
        addTriangle: () => {
            const object = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            });
            addToCanvas(object);
        },
        addInverseTriangle: () => {
            const HEIGHT = TRIANGLE_OPTIONS.height;
            const WIDTH = TRIANGLE_OPTIONS.width;
            const object = new fabric.Polygon(
                [
                   { x: 0, y: 0},
                   { x: WIDTH, y: 0},
                   { x: WIDTH/2, y: HEIGHT}, 
                ],
                {
                    ...TRIANGLE_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                }
            );
            addToCanvas(object);
        },
        addDiamond: () => {
            const HEIGHT = DIAMOND_OPTIONS.height;
            const WIDTH = DIAMOND_OPTIONS.width;
            const object = new fabric.Polygon(
                [
                   { x: WIDTH /2, y: 0},
                   { x: WIDTH, y: HEIGHT/2},
                   { x: WIDTH /2, y: HEIGHT},
                   { x: 0, y: HEIGHT/2}, 
                ],
                {
                    ...DIAMOND_OPTIONS,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeDashArray
                }
            );
            addToCanvas(object);
        },
        addText: (value, options) => {
            const object = new fabric.Textbox(value, {
                ...TEXT_OPTIONS,
                fill: fillColor,
                ...options
            });
            addToCanvas(object);
        },
        delete: () => {
            canvas.getActiveObjects().forEach((object) => 
                canvas.remove(object)
            );
            canvas.discardActiveObject();
            canvas.renderAll();
        },
        addImage: (value: string) => {
            fabric.Image.fromURL(
                value,
                (image) => {
                    const workspace = getWorkspace();
                    image.scaleToWidth(workspace?.width || 0);
                    image.scaleToHeight(workspace?.height || 0);

                    addToCanvas(image);
                },
                {
                    crossOrigin: "anonymous"
                }
            )
        },
        changeFillColor: (value: string) => {
            setFillColor(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({fill: value})
            });
            canvas.renderAll();
        },
        changeStrokeColor: (value: string) => {
            setStrokeColor(value);
            canvas.getActiveObjects().forEach((object) => {
                //text types dont have stroke
                if(isTextType(object.type)){
                    object.set({fill: value})
                    return;
                }
                object.set({stroke: value})
            });
            canvas.freeDrawingBrush.color = value;
            canvas.renderAll();
        },
        changeStrokeWidth: (value: number) => {
            setStrokeWidth(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({strokeWidth: value})
            });
            canvas.freeDrawingBrush.width = value;
            canvas.renderAll();
        },
        changeStrokeDashArray: (value: number[]) => {
            setStrokeDashArray(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({strokeDashArray: value})
            });
            canvas.renderAll();
        },
        changeOpacity: (value: number) => {
            setOpacity(value);
            canvas.getActiveObjects().forEach((object) => {
                object.set({ opacity: value})
            })

            canvas.renderAll();
        },
        changeFontFamily: (value: string) => {
            setFontFamily(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({ fontFamily: value});
                }
            });
            canvas.renderAll();
        },
        changeFontWeight: (value: number) => {
            setFontWeight(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({ fontWeight: value})
                }
            })

            canvas.renderAll();
        },
        changeFontStyle: (value) => {
            setFontStyle(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({ fontStyle: value})
                }
            })

            canvas.renderAll();
        },
        changeFontLinethrough: (value) => {
            setFontLinethrough(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({ linethrough: value})
                }
            })

            canvas.renderAll();
        },
        changeFontUnderline: (value) => {
            setFontUnderline(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({ underline: value})
                }
            })

            canvas.renderAll();
        },
        changeTextAlign: (value) => {
            setTextAlign(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({ textAlign: value})
                }
            })

            canvas.renderAll();
        },
        changeFontSize: (value) => {
            setFontSize(value);
            canvas.getActiveObjects().forEach((object) => {
                if(isTextType(object.type)){
                    //@ts-ignore
                    object.set({ fontSize: value})
                }
            })

            canvas.renderAll();
        },
        changeImageFilter: (value) => {
            // setFontSize(value);
            canvas.getActiveObjects().forEach((object) => {
                if(object.type === "image"){
                    const imageObject = object as fabric.Image;
                    const effect = createFilter(value);

                    imageObject.filters = effect ? [effect] : [];
                    imageObject.applyFilters();
                    canvas.renderAll();
                }
            })

            canvas.renderAll();
        },
        getActiveFillColor: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return fillColor
            }

            const value = selectedObject.get("fill") || fillColor;

            //only strings are supported in the form of rgba
            return value as string;
        },
        getActiveStrokeColor: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return strokeColor
            }

            const value = selectedObject.get("stroke") || strokeColor;
            
            return value;
        },
        getActiveStrokeWidth: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return strokeWidth
            }

            const value = selectedObject.get("strokeWidth") || strokeWidth;
            
            return value;
        },
        getActiveStrokeDashArray: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return strokeDashArray
            }

            const value = selectedObject.get("strokeDashArray") || strokeDashArray;
            
            return value;
        },
        getActiveOpacity: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return opacity;
            }

            const value = selectedObject.get("opacity") || opacity;
            
            return value;
        },
        getActiveFontFamily: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return fontFamily
            }

            //@ts-ignore
            const value = selectedObject.get("fontFamily") || fontFamily;

            return value;
        },
        getActiveFontWeight: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return fontWeight
            }

            //@ts-ignore
            const value = selectedObject.get("fontWeight") || fontWeight;
            
            return value;
        },
        getActiveFontStyle: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return fontStyle
            }

            //@ts-ignore
            const value = selectedObject.get("fontStyle") || fontStyle;
            
            return value;
        },
        getActiveFontLinethrough: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return fontLinethrough
            }

            //@ts-ignore
            const value = selectedObject.get("linethrough") || fontLinethrough;
            
            return value;
        },
        getActiveFontUnderline: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return fontUnderline
            }

            //@ts-ignore
            const value = selectedObject.get("underline") || fontUnderline;
            
            return value;
        },
        getActiveTextAlign: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return textAlign
            }

            //@ts-ignore
            const value = selectedObject.get("textAlign") || textAlign;
            
            return value;
        },
        getActiveFontSize: () => {
            const selectedObject = selectedObjects[0];

            if(!selectedObject){
                return fontSize
            }

            //@ts-ignore
            const value = selectedObject.get("fontSize") || fontSize;
            
            return value;
        },
        bringForward: () => {
            canvas.getActiveObjects().forEach((object) => {
                canvas.bringForward(object);
            })

            canvas.renderAll();

            const workspace = getWorkspace();
            workspace?.sendToBack();
        },
        sendBackwards: () => {
            canvas.getActiveObjects().forEach((object) => {
                canvas.sendBackwards(object);
            })

            canvas.renderAll();

            const workspace = getWorkspace();
            workspace?.sendToBack();
        },
        canvas,
        selectedObjects,
        onCopy: () => copy(),
        onPaste: () => paste(),
        enableDrawingMode: () => {
            canvas.discardActiveObject();
            canvas.renderAll();
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = strokeWidth;
            canvas.freeDrawingBrush.color = strokeColor;
        },
        disableDrawingMode: () => {
            canvas.isDrawingMode = true;
        },
        changeSize: (size: {width: number; height: number}) => {
            const workspace = getWorkspace();

            workspace?.set(size);
            autoZoom();
            save();
        },
        changeBackground: (value: string) => {
            const workspace = getWorkspace();
            workspace?.set({fill: value});
            canvas.renderAll();
            save();
        }, 
        getWorkspace,
        autoZoom,
        zoomIn: () => {
            let zoomRatio = canvas.getZoom();
            zoomRatio += 0.05;
            const center = canvas.getCenter();
            canvas.zoomToPoint(
                new fabric.Point(center.left, center.top),
                zoomRatio > 1 ? 1 : zoomRatio
            )
        },
        zoomOut: () => {
            let zoomRatio = canvas.getZoom();
            zoomRatio -= 0.05;
            const center = canvas.getCenter();
            canvas.zoomToPoint(
                new fabric.Point(center.left, center.top),
                zoomRatio < 0.2 ? 0.2 : zoomRatio
            )
        },
        onUndo: () => undo(),
        onRedo: () => redo(),
        canUndo,
        canRedo
    };
}

export const useEditor = ({
    clearSelectionCallback
}: EditorHookProps) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

    const [fillColor, setFillColor] = useState(FILL_COLOR);
    const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
    const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
    const [opacity, setOpacity] = useState(1);
    const [fontWeight, setFontWeight] = useState(FONT_WEIGHT);
    const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);
    const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
    const [fontStyle, setFontStyle] = useState(FONT_STYLE);
    const [fontLinethrough, setFontLinethrough] = useState(false);
    const [fontUnderline, setFontUnderline] = useState(false);
    const [textAlign, setTextAlign] = useState("left");
    const [fontSize, setFontSize] = useState(FONT_SIZE);

    const { 
        save, 
        canRedo, 
        canUndo, 
        redo, 
        undo,
        canvasHistory,
        setHistoryIndex 
    } = useHistory({canvas});

    const {copy, paste} = useClipboard({
        canvas
    });

    const { autoZoom } = useAutoResize({
        canvas, 
        container
    });

    useCanvasEvents({
        canvas,
        setSelectedObjects,
        clearSelectionCallback,
        save
    })

    useHotkeys({
        canvas,
        undo,
        redo,
        copy,
        paste,
        save
    })

    const editor = useMemo(() => {
        if(canvas){
            return buildEditor({
                canvas,
                fillColor,
                setFillColor,
                strokeColor,
                setStrokeColor,
                strokeWidth,
                setStrokeWidth,
                strokeDashArray,
                setStrokeDashArray,
                opacity,
                setOpacity,
                selectedObjects,
                fontFamily,
                setFontFamily,
                fontWeight,
                setFontWeight,
                fontStyle,
                setFontStyle,
                fontLinethrough,
                setFontLinethrough,
                fontUnderline,
                setFontUnderline,
                textAlign,
                setTextAlign,
                fontSize,
                setFontSize,
                copy, 
                paste,
                autoZoom,
                save, 
                undo, 
                redo,
                canRedo,
                canUndo
            });
        }

        return undefined;
    }, [
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeDashArray,
        opacity,
        fontFamily,
        fontWeight,
        fontStyle,
        fontLinethrough,
        fontUnderline,
        textAlign,
        fontSize,
        selectedObjects,
        autoZoom,
        save, 
        undo, 
        redo,
        canRedo,
        canUndo
    ]);

    const init = useCallback(({
        initialCanvas,
        initialContainer
    }: {
        initialCanvas: fabric.Canvas;
        initialContainer: HTMLDivElement
    }) => {
        // console.log("Initializing editor");
        fabric.Object.prototype.set({
            cornerColor: "#fff",
            cornerStyle: "circle",
            borderColor: "#3b82f6",
            borderScaleFactor: 1.5,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: "#3b82f6"
        });

        const initialWorkspace = new fabric.Rect({
            width: 920,
            height: 1200,
            name: "clip",
            fill: "white",
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
                blur: 5
            })
        });

        initialCanvas.setWidth(initialContainer.offsetWidth);
        initialCanvas.setHeight(initialContainer.offsetHeight);

        initialCanvas.add(initialWorkspace);
        initialCanvas.centerObject(initialWorkspace);
        initialCanvas.clipPath = initialWorkspace;

        setCanvas(initialCanvas);
        setContainer(initialContainer);

        const currentState = JSON.stringify(
            initialCanvas.toJSON(JSON_KEYS)
        );
        canvasHistory.current = [currentState];
        setHistoryIndex(0);
    }, []);

    return {init, editor};
}