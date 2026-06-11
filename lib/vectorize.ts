//@ts-ignore
import ImageTracer from 'imagetracerjs';

export interface VectorizeOptions {
  colors: number; // 2-32
  blurradius: number;
  simplification: number;
}

export function vectorizeImage(imageDataUrl: string, options: VectorizeOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const defaultOptions = {
        colorquantcycles: 3,
        numberofcolors: options.colors,
        blurradius: options.blurradius,
        pathomit: options.simplification,
        corsenabled: false,
      };

      ImageTracer.imageToSVG(
        imageDataUrl,
        (svgString: string) => {
          resolve(svgString);
        },
        defaultOptions
      );
    } catch (error) {
      reject(error);
    }
  });
}
