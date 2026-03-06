"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

function isExternal(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

export default function AppImage(props: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(props.src);

  useEffect(() => {
    setCurrentSrc(props.src);
  }, [props.src]);

  const useUnoptimized = typeof currentSrc === "string" && isExternal(currentSrc);
  const hasFallback =
    typeof props.src === "string" &&
    props.src !== "/placeholder-image.svg" &&
    props.src !== "/placeholder-image.png";

  return (
    <Image
      {...props}
      alt={props.alt ?? ""}
      src={currentSrc}
      unoptimized={useUnoptimized}
      onError={(event) => {
        props.onError?.(event);
        if (hasFallback) {
          setCurrentSrc("/placeholder-image.svg");
        }
      }}
    />
  );
}
