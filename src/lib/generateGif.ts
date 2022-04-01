import workletURL from 'gif.js/dist/gif.worker.js?url';
import GIF from 'gif.js';

export interface GenerateGifOptions {
  images: Array<HTMLImageElement>;
  gif?: GIF.Options;
  perFrameTime?: number;
}
export const generateGif = (options: GenerateGifOptions): Promise<Blob> => {
  const { perFrameTime = 1000 / 24, gif: gifOption, images } = options;

  const framesOption: { frame: HTMLImageElement, delay: number; }[] = [];
  images.forEach(item => {
    const last = framesOption[framesOption.length - 1];
    const imgEqual = last && last.frame.src === item.src && last.frame.width == item.width && last.frame.height === item.height;

    if (!last || !imgEqual) {
      framesOption.push({
        frame: item,
        delay: perFrameTime
      });
    } else {

      last.delay += perFrameTime;
    }
  });

  return new Promise(resolve => {

    const gif = new GIF({
      workers: 2,
      quality: 1,
      workerScript: workletURL,
      ...gifOption
    });

    framesOption.forEach(item => {
      gif.addFrame(item.frame, {
        delay: item.delay
      });
    });

    gif.on('finished', function (blob) {
      resolve(blob);
    });

    gif.render();

  });
};
