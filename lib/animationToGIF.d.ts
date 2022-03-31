interface AnimationToGIFOption {
    totalTime: number;
    container: HTMLElement;
    frames?: number;
    debug?: boolean;
}
interface AnimationItem {
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null;
    options?: number | KeyframeAnimationOptions;
    selector: Parameters<Document['querySelector']>[0];
}
export declare function animationToGIF(list: AnimationItem[], options: AnimationToGIFOption): Promise<Blob>;
export {};
