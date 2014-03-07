// Type definitions for KineticJS
// Project: http://kineticjs.com/
// Definitions by: Basarat Ali Syed <http://www.github.com/basarat>, Ralph de Ruijter <http://www.superdopey.nl/techblog/>
// DefinitelyTyped: https://github.com/borisyankov/DefinitelyTyped

declare module Kinetic {

    var Node: {
        new (config: ObjectOptionsConfig);
    }

    interface INode {
        cache(cacheConfig?: any): INode;
        clone(attrs): INode;
        destroy(): void;
        draw(): INode;
        drawBuffer();
        drawScene();
        getAbsoluteOpacity(): number;
        getAbsolutePosition(): Vector2d;
        getAbsoluteTransform(): any;
        getAbsoluteZIndex(): number;
        getAttrs(): any;
        getDragBounds(): any;
        getDragConstraint(): any;
        getDraggable(): boolean;
        getLayer(): any;
        getLevel(): number;
        getListening(): any;
        getName(): string;
        getOffset(): Vector2d;
        getOpacity(): number;
        getParent(): any;
        getPosition(): Vector2d;
        getRotation(): number;
        getRotationDeg(): number;
        getScale(): Vector2d;
        getScaleX(): number;
        getScaleY(): number;
        getSize(): ISize;
        getStage(): IStage;
        getTransform(): any;
        getZIndex(): number;
        hide(): void;
        isDraggable(): boolean;
        isDragging(): boolean;
        isListening(): boolean;
        move(x: number, y: number): void;
        moveDown(): void;
        moveTo(newContainer: IContainer): void;
        moveToBottom(): void;
        moveToTop(): void;
        moveUp(): void;
        name(): string;
        name(string): void;
        rotate(theta: number): void;
        rotateDeg(deg: number): void;

        // Events 
        on(typesStr: string, handler: (data) => any): void;
        off(typesStr: string): void;
        fire(typeStr: string, event?: any, bubble?: boolean);

        setAbsolutePosition(pos: Vector2d): void;
        setAttrs(config): void;
        setDefaultAttrs(config): void;
        setDragBounds(bounds): void;

        setDragConstraint(constraint: string): void;
        setDraggable(draggable: boolean): void;
        setListening(listening: boolean): void;
        setOffset(offset: Vector2d);
        setOpacity(opacity: any): void;
        setPosition(position: Vector2d): void;
        setRotation(theta: number): void;
        setRotationDeg(rotDeg: number): void;
        setScale(scale: Vector2d): void;
        setScaleX(scale: number): void;
        setScaleY(scale: number): void;
        setSize(size: ISize): any;
        setZIndex(zIndex: number): void;
        show(): void;
        simulate(eventType: string): void;
        toDataURL(config: any): void;
        transitionTo(config: any): void;

        // Width / Height
        width(): number;
        width(width: number): void;
        getWidth(): any;
        setWidth(width: number): void;
        height(): number;
        height(height: number): void;
        getHeight(): any;
        setHeight(height: number): any;

        // id 
        id(): string;
        id(id: string): void;
        getId(): string;
        setId(id: string): void;

        // Position
        x(): number;
        x(x: number): void;
        y(): number;
        y(y: number): void;
        getX(): number;
        setX(x: number): void;
        getY(): number;
        setY(y: number): void;
    }

    var Container: {
        // TODO: Constructor / static
    }

    interface IContainer extends INode {
        add(child);
        clone(attrs): IContainer;
        destroyChildren(): IContainer;
        find(selector: string): any;
        get(selector);
        getChildren(): INode[];
        getIntersections(point);
        isAncestorOf(node);
        remove(child);
        removeChildren();
    }

    var Stage: {
        // TODO: Constructor / static
        new (config: StageConfig): IStage;
    }

    interface IStage extends IContainer {
        add(layer: ILayer);
        clear();
        getContainer(): HTMLElement;
        getDOM(): HTMLElement;
        getHeight(): number;
        getIntersection(pos);
        getMousePosition(evt?: Event);
        getPointerPosition(): Vector2d;
        getStage(): IStage;
        getTouchPosition(evt?: Event);
        getUserPosition(evt?: Event);
        getWidth(): number;
        load(JSON);
        reset();
        setHeight(height: number);
        setWidth(width: number);
        toDataURL(config);
        toImage(config, callback: () => any);
        toJSON();
    }

    var Layer: {
        // TODO: Constructor / static
        new (config?: LayerConfig): ILayer;
    }

    interface ILayer extends IContainer {
        afterDraw(handler: () => any);
        beforeDraw(handler: () => any);
        clear();
        getCanvas(): Canvas;
        getClearBeforeDraw();
        getContext(): CanvasRenderingContext2D;
        remove();
        setClearBeforeDraw(clearBeforeDraw: boolean);
        toDataURL(config);
    }

    class Canvas {

    }

    var Shape: {
        // TODO: Constructor / static
    }

    interface IShape extends INode {
        applyLineJoin(): void;
        drawImage(): void;
        fill(): void;
        fillText(text: string): void;
        getCanvas(): Canvas;
        getContext(): any;
        getDrawFunc();
        getFill(): string;
        getLineJoin();
        getShadow();
        getStroke();
        getStrokeWidth(): number;
        intersects(point): boolean;
        setDrawFunc(drawFunc: () => any);
        setFill(fill: string);
        setLineJoin();
        setShadow(config);
        setSize(size: ISize);
        setStroke(stroke: string);
        setStrokeWidth(strokeWidth: number);
        stroke();
        strokeText(text: string);
    }

    var Rect: {
        // TODO: Constructor / static
        new (config: RectConfig): IRect;
    }

    interface IRect extends IShape {
        getCornerRadius(): number;
        getHeight(): number;
        getWidth(): number;
        setCornerRadius(radius: number);
        setHeight(height: number);
        setWidth(width: number);
    }

    var Circle: {
        // TODO: Constructor / static
        new (config: CircleConfig): ICircle;

    }

    interface ICircle extends IShape {
        getRadius(): number;
        setRadius(radius: number);
    }

    var Ellipse: {
        new (config: CircleConfig): IEllipse;
    }

    interface IEllipse extends IShape {
        getRadius(): number;
        setRadius(radius: number);
    }

    var Group: {
        new (config?: ObjectOptionsConfig): IGroup;
    }

    interface IGroup extends IContainer {
    }

    var Collection: {
        // TODO: Constructor / static
    }

    interface ICollection {
        apply(method, val);
        each(func: () => any);
    }

    var Image: {
        new (config?: ImageConfig): IImage;
    }

    interface IImage extends IShape {
        applyFilter(config);
        clearImageBuffer();
        createImageBuffer(callback: () => any);
        getCrop();
        getFilter();
        getHeight(): number;
        getImage(): IImage;
        getWidth(): number;
        setCrop(config: CropConfig);
        setFilter(config);
        setHeight(height: number);
        setImage(image: IImage);
        setWidth(width: number);
    }

    var Line: {
        new (config: LineConfig): ILine;
    }

    interface ILine extends IShape {
        getDashArray();
        getLineCap();
        getPoints();
        setDashArray(dashArray);
        setLineCap(lineCap: string);
        setPoints(can: any[]);
    }

    var Path: {
        new (config: PathConfig): IPath;
        parsePathData(data: string);
    }
    interface IPath extends IShape {
        getData(): string;
        setData(SVG: string);
    }

    var Polygon: {
        new (config: PolygonConfig): IPolygon;
    }

    interface IPolygon extends IShape {
        getPoints();
        setPoints(points);
    }

    var RegularPolygon: {
        new (config: RegularPolygonConfig): IRegularPolygon;
    }

    interface IRegularPolygon extends IShape {
        getRadius(): number;
        getSides(): number;
        setRadius(radius: number);
        setSides(sides: number);
    }

    var Sprite: {
        new (config: SpriteConfig): ISprite;
    }
    interface ISprite extends IShape {
        afterFrame(index: number, func: () => any);
        getAnimation(): string;
        getAnimations();
        getIndex(): number;
        setAnimation(anim: string);
        setAnimations(animations);
        setIndex(index: number);
        start();
        stop();
    }

    var Star: {
        new (config: StarConfig): IStar;
    }
    interface IStar extends IShape {
        getInnerRadius(): number;
        getNumPoints(): number;
        getOuterRadius(): number;
        setInnerRadius(radius: number);
        setNumPoints(points: number);
        setOuterRadius(radius: number);
    }

    var Text: {
        new (config: TextConfig): IText;
    }
    interface IText extends IShape {
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

    var TextPath: {
        new (config): ITextPath;
    }
    interface ITextPath extends IShape {
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

    var Transition: {
        new (node: Node, config): ITransition;
    }
    interface ITransition {
        start();
        stop();
    }

    var Animation: {
        // TODO: Constructor / static
    }
    interface IAnimation extends IContainer {
        start();
        stop();
    }

    interface CropConfig {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    interface StageConfig extends ObjectOptionsConfig {
        container: string;
        width: number;
        height: number;
    }

    interface LayerConfig extends ObjectOptionsConfig {
        clearBeforeDraw?: boolean;
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
        drawFunc: () => any;
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
        visible?: boolean;
        listening?: boolean;
        id?: string;
        name?: string;
        opacity?: any;
        scale?: Vector2d;
        rotation?: number;
        rotationDeg?: number;
        offset?: Vector2d;
        draggable?: boolean;
        dragConstraint?: string;
        dragBounds?: any;
        dragBoundFunc?: (pos: Vector2d) => Vector2d;
        width?: number;
        height?: number;
    }

    interface ISize {
        width: number;
        height: number;
    }
}