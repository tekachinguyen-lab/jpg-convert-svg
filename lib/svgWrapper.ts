export function createSvgWrapper(base64Image: string, width: number, height: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image href="${base64Image}" width="${width}" height="${height}" />
</svg>`;
}
