import NextImage, { ImageProps as NextImageProps } from "next/image";

import { getMediaUrl } from "@/lib/utils";

type Props = Omit<NextImageProps, "src"> & {
  src?: string | null;
};

const isPrivateUrl = (url: string) => {
  return url.includes("localhost") || url.includes("127.0.0.1") || url.includes("::1");
};

const Image = ({ src, alt, ...props }: Props) => {
  if (!src) return null;

  const fullUrl = getMediaUrl(src);
  const unoptimized = process.env.NODE_ENV === "development" && isPrivateUrl(fullUrl);

  return <NextImage src={fullUrl} alt={alt} unoptimized={unoptimized} {...props} />;
};

export default Image;
