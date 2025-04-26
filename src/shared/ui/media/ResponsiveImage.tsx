import { cn } from "@/shared/lib/utils";
import { type ImgHTMLAttributes } from "react";

export interface ResponsiveImageProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "wide";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

const aspectRatioClasses = {
  auto: "",
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
};

const objectFitClasses = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

/**
 * A responsive image component that handles aspect ratio and object fit correctly
 * across different screen sizes
 */
export function ResponsiveImage({
  src,
  alt,
  className,
  aspectRatio = "auto",
  objectFit = "cover",
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  loading = "lazy",
  ...props
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "w-full",
        aspectRatioClasses[aspectRatio],
        objectFitClasses[objectFit],
        className
      )}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : loading}
      {...props}
    />
  );
}

export interface ResponsiveBackgroundProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
  overlayClassName?: string;
  mobileImage?: string;
}

/**
 * A responsive background image component with optional overlay
 */
export function ResponsiveBackground({
  src,
  className,
  children,
  overlayClassName,
  mobileImage,
}: ResponsiveBackgroundProps) {
  const mobileSrc = mobileImage || src;

  return (
    <div
      className={cn("relative bg-cover bg-center bg-no-repeat", className)}
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      {/* Mobile-specific background using media query */}
      {mobileImage && (
        <style jsx>{`
          @media (max-width: 768px) {
            div {
              background-image: url(${mobileSrc}) !important;
            }
          }
        `}</style>
      )}

      {/* Optional overlay */}
      {overlayClassName && (
        <div className={cn("absolute inset-0", overlayClassName)} />
      )}

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
