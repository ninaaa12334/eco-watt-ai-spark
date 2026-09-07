// Downscale a photo in the browser and return base64 (no data: prefix).
// Large phone photos (5-12 MB) fail to reach the analyzer, so we cap the size.
export async function fileToResizedBase64(
  file: File,
  maxSide = 1600,
  quality = 0.85
): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read the file"));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not open the image"));
    image.src = dataUrl;
  });

  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl.split(",")[1];
  ctx.drawImage(img, 0, 0, w, h);

  return canvas.toDataURL("image/jpeg", quality).split(",")[1];
}
