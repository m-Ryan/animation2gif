import workletURL from 'gif.js/dist/gif.worker.js?url';
import GIF from 'gif.js';

export interface GenerateGifOptions {
  images: Array<HTMLImageElement>;
  gif?: GIF.Options;
  perFrameTime?: number;
}
export const generateGif = (options: GenerateGifOptions): Promise<Blob> => {
  const { perFrameTime = 1000 / 24, gif: gifOption, images } = options;
  return new Promise(resolve => {

    const gif = new GIF({
      workers: 2,
      quality: 1,
      workerScript: workletURL,
      ...gifOption
    });

    images.forEach(frame => {
      gif.addFrame(frame, {
        delay: perFrameTime
      });
    });

    gif.on('finished', function (blob) {
      resolve(blob);
    });

    gif.render();

  });
};
