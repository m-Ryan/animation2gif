import GIF from 'gif.js';
export interface GenerateGifOptions {
    images: Array<HTMLImageElement>;
    gif?: GIF.Options;
    perFrameTime?: number;
}
export declare const generateGif: (options: GenerateGifOptions) => Promise<Blob>;
