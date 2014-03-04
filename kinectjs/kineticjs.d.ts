/**
 * Typing for the KineticJS JavaScript Library v.0.0.1
 * http://www.superdopey.nl/techblog/
 * Copyright 2012, Ralph de Ruijter
 * Licensed under the MIT or GPL Version 2 licenses.
 * Date: Oct 6 2012
 *
 * Copyright (C) 2012 by Ralph de Ruijter
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
module Kinetic {
    class Node {
        constructor (config);
        clone(attrs): Node;
        getAbsoluteOpacity(): number;
        getAbsolutePosition(): Vector2d;
        getAbsoluteTransform(): any;
        getAbsoluteZIndex(): number;
        getAttrs(): any;
        getDragBounds(): any;
        getDragConstraint(): any;
        getDraggable(): bool; 
        getId(): any;
        getLayer(): any;
        getLevel(): number;
        getListening(): any;
        getName(): string;
        getOffset(): number;
        getOpacity(): number;
        getParent(): any;
        getPosition(): Vector2d;
        getRotation(): number;
        getRotationDeg(): number;
        getScale(): number;
        getStage(): Stage;
        getTransform(): any;
        getX(): number;
        getY(): number;
        getZIndex(): number;
        hide(): void;
        isDraggable(): bool;
        isDragging(): bool;
        isListening(): bool;
        move(x: number, y: number): void;
        moveDown(): void;
        moveTo(newContainer: Container): void;
        moveToBottom(): void;
        moveToTop(): void;
        moveUp(): void;
        off(typesStr: string): void;
        on(typesStr: string, handler: () =>{ }): void;
        rotate(theta: number): void;
        rotateDeg(deg: number): void;

        setAbsolutePosition(pos: Vector2d): void;
        setAttrs(config): void;
        setDefaultAttrs(config): void;
        setDragBounds(bounds): void;

        setDragConstraint(constraint: string): void;
        setDraggable(draggable: string): void;
        setListening(listening: bool): void;
        setOffset(x: number, y: number);
        setOpacity(opacity: any): void;
        setPosition(x: number, y: number): void;
        setRotation(theta: number): void;
        setRotationDeg(rotDeg: number): void;
        setScale(x: number, y: number): void;
        setX(x: number): void;
        setY(y: number): void;
        setZIndex(zIndex: number): void;
        show(): void;
        simulate(eventType: string): void;
        toDataURL(config: any): void;
        transitionTo(config: any): void;
    }

    class Container extends Node {
        add(child);
        clone(attrs): Container;
        get(selector);
        getChildren();
        getIntersections(point);
        isAncestorOf(node);
        remove(child);
        removeChildren();
    }

    class Stage extends Container {
        add(layer: Layer);
        clear();
        draw();
        getContainer(): HTMLElement;
        getDOM(): HTMLElement;
        getHeight(): number;
        getIntersection(pos);
        getMousePosition(evt?: Event);
        getSize();
        getStage(): Stage;
        getTouchPosition(evt?: Event);
        getUserPosition(evt?: Event);
        getWidth(): number;
        load(JSON);
        reset();
        setHeight(height: number);
        setSize(width: number, height: number);
        setWidth(width: number);
        toDataURL(config);
        toImage(config, callback: () =>{ });
        toJSON();
    }

    class Layer extends Container {
        constructor (config?: LayerConfig);
        afterDraw(handler: () =>{ });
        beforeDraw(handler: () =>{ });
        clear();
        draw();
        drawBuffer();
        drawScene();
        getCanvas(): Canvas;
        getClearBeforeDraw();
        getContext(): CanvasRenderingContext2D;
        remove();
        setClearBeforeDraw(clearBeforeDraw: bool);
        toDataURL(config);
    }

    class Canvas {

    }

    class Shape extends Node {
        applyLineJoin(): void;
        drawImage(): void;
        fill(): void;
        fillText(text:string): void;
        getCanvas(): Canvas;
        getContext(): any;
        getDrawFunc();
        getFill():string;
        getLineJoin();
        getShadow();
        getSize(): any;
        getStroke();
        getStrokeWidth(): number;
        intersects(point): bool;
        setDrawFunc(drawFunc: () =>{ });
        setFill(fill:string);
        setLineJoin();
        setShadow(config);
        setSize();
        setStroke(stroke:string);
        setStrokeWidth(strokeWidth: number);
        stroke();
        strokeText(text:string);
    }

    class Rect extends  Shape {
        constructor (config: RectConfig);
        getCornerRadius(): number;
        getHeight(): number;
        getWidth(): number;
        setCornerRadius(radius: number);
        setHeight(height: number);
        setWidth(width: number);
    }

    class Circle extends  Shape {
        constructor (config: CircleConfig);
        getRadius(): number;
        setRadius(radius: number);
    }

    class Ellipse extends  Shape {
        constructor (config: CircleConfig);
        getRadius(): number;
        setRadius(radius: number);
    }

    class Group extends Container {
        constructor (config: ObjectOptionsConfig);
    }

    class Collection {
        apply(method, val);
        each(func: () =>{ });
    }

    class Image extends Shape {
        constructor (config: ImageConfig);
        applyFilter(config);
        clearImageBuffer();
        createImageBuffer(callback: () =>{ });
        getCrop();
        getFilter();
        getHeight(): number;
        getImage(): Image;
        getWidth(): number;
        setCrop(config: CropConfig);
        setFilter(config);
        setHeight(height: number);
        setImage(image: Image);
        setWidth(width: number);
    }

    class Line extends Shape {
        constructor (config: LineConfig);
        getDashArray();
        getLineCap();
        getPoints();
        setDashArray(dashArray);
        setLineCap(lineCap: string);
        setPoints(can: Array);
    }

    class Path extends Shape {
        constructor (config: PathConfig);
        getData(): string;
        static parsePathData(data: string);
        setData(SVG: string);
    }

    class Polygon extends Shape {
        constructor (config: PolygonConfig);
        getPoints();
        setPoints(points);
    }

    class RegularPolygon extends Shape {
        constructor (config: RegularPolygonConfig);
        getRadius(): number;
        getSides(): number;
        setRadius(radius: number);
        setSides(sides: number);
    }

    class Sprite extends Shape {
        constructor (config: SpriteConfig);
        afterFrame(index: number, func: () =>{ });
        getAnimation(): string;
        getAnimations();
        getIndex(): number;
        setAnimation(anim: string);
        setAnimations(animations);
        setIndex(index: number);
        start();
        stop();
    }

    class Star extends Shape {
        constructor (config: StarConfig);
        getInnerRadius(): number;
        getNumPoints(): number;
        getOuterRadius(): number;
        setInnerRadius(radius: number);
        setNumPoints(points: number);
        setOuterRadius(radius: number);
    }

    class Text extends Shape {
        constructor (config: TextConfig);
        getAlign(): string;
        getBoxHeight(): number;
        getBoxWidth(): number;
        getFontFamily(): string;
        getFontSize(): number;
        getFontStyle(): string;
        getHeight(): number;
        getLineHeight(): number;
        getPadding(): number;
        getShadow(): any;
        getText(): string;
        getTextFill(): any;
        getTextHeight(): number;
        getTextStroke(): any;
        getTextStrokeWidth(): number;
        getTextWidth(): number;
        getWidth(): number;
        setAlign(align: string);
        setFontFamily(fontFamily: string);
        setFontSize(fontSize: number);
        setFontStroke(textStroke: any);
        setFontStyle(fontStyle: string);
        setHeight(height: number);
        setLineHeight(lineHeight: number);
        setPadding(padding: number);
        setShadow(config);
        setText(text: string);
        setTextFill(textFill: any);
        setTextStrokeWidth(textStrokeWidth: number);
        setWidth(width: number);
    }

    class TextPath extends Shape {
        contructor(config);
        getFontFamily(): string;
        getFontSize(): number;
        getFontStyle(): string;
        getText(): string;
        getTextFill(): any;
        getTextHeight(): number;
        getTextStroke(): any;
        getTextStrokeWidth(): number;
        getTextWidth(): number;
        setFontFamily(fontFamily: string);
        setFontSize(fontSize: number);
        setFontStroke(textStroke: any);
        setFontStyle(fontStyle: string);
        setText(text: string);
        setTextFill(textFill: any);
        setTextStrokeWidth(textStrokeWidth: number);
    }

    class Transition {
        constructor (node: Node, config);
        start();
        stop();
    }

    interface CropConfig {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    class Animation extends Container {
        start();
        stop();
    }

    interface StageConfig extends ObjectOptionsConfig {
        container: string;
        width: number;
        height: number;
    }

    interface LayerConfig extends ObjectOptionsConfig {
        clearBeforeDraw?: bool;
    }

    //shape configs class
    interface RectConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        width: number;
        height: number;
        cornerRadius?: number;
    }

    interface CircleConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        radius: number;
    }

    interface ImageConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        image: any;
        width?: number;
        height?: number;
        crop?: any;
    }

    interface SpriteConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        image: any;
        animations: any;
        animation: any;
        frameRate?: number;
    }

    interface TextConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        text: string;
        fontSize?: number;
        fontFamily?: string;
        fontStyle?: string;
        textFill?: any;
        textStroke?: any;
        textStrokeWidth?: number;
        align?: string;
        padding?: string;
        width?: number;
        height?: number;
        lineHeight?: number;
        cornerRadius?: number;
    }

    interface LineConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        points: any;
        lineCap?: string;
        dashArray?: any;
    }

    interface PolygonConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        points: any;
    }

    interface RegularPolygonConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        sides: number;
        radius: number;
    }

    interface PathConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        data: string;
    }

    interface StarConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        numPoints: number;
        outerRadius: number;
        innerRadius: number;
    }

    interface CustomConfig extends DrawOptionsConfig, ObjectOptionsConfig {
        drawFunc: () =>{ };
    }

    interface DrawOptionsConfig {
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        lineJoin?: string;
        shadow?: any;
    }

    interface Vector2d {
        x: number;
        y: number;
    }

    interface ObjectOptionsConfig {
        x?: number;
        y?: number;
        visible?: bool;
        listening?: bool;
        id?: string;
        name?: string;
        opacity?: any;
        scale?: Vector2d;
        rotation?: number;
        rotationDeg?: number;
        offset?: Vector2d;
        draggable?: bool;
        dragConstraint?: string;
        dragBounds?: any;
    }

    
}

//declare var Kinetic: KineticNS.Kinetic;
