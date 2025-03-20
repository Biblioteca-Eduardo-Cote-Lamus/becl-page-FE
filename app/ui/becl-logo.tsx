import Image from "next/image";
import type { ImageProps } from "next/image";

export default function AcmeLogo() {
  const imageProps: Pick<ImageProps, "src" | "alt" | "width" | "height" | "priority" | "style"> = {
    src: "/BIBLIOTECA-EDUARDO-COTE-LAMUS-min.png",
    alt: "BECL Logo",
    width: 270,
    height: 60,
    priority: true,
    style: {
      maxWidth: "100%",
      height: "auto",
      objectFit: "contain" as const
    }
  };

  return <Image {...imageProps} />;
}