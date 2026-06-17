"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Expand, PlayCircle, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "@/components/ui/image";
import { cn } from "@/lib/utils";
import { Media } from "@/types/media";

type Props = {
  media: Media[];
  productName: string;
};

const isVideo = (item: Media) => item.mime?.startsWith("video/") ?? false;

const ARROW_BUTTON_CLASSES =
  "absolute top-1/2 -translate-y-1/2 rounded-full bg-white/95 p-2 text-slate-900 shadow-lg transition-transform hover:scale-110 hover:bg-white";

const ProductMediaCarousel = ({ media, productName }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: media.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxVisible, setLightboxVisible] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (media.length === 0) return null;

  const openLightbox = () => {
    setLightboxIndex(selectedIndex);
    setLightboxVisible(true);
    setLightboxOpen(true);
  };

  const goToLightboxIndex = (index: number) => {
    setLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex(index);
      setLightboxVisible(true);
    }, 150);
  };

  const activeItem = media[lightboxIndex];

  return (
    <div className="flex h-full flex-col">
      <div className="border-accent-foreground/50 flex flex-1 flex-col overflow-hidden rounded-2xl border bg-linear-180 from-slate-700/60 via-slate-800/50 to-slate-900/40 shadow-lg ring-1 shadow-black/30 ring-white/10 backdrop-blur-md backdrop-saturate-150 ring-inset">
        <div className="group relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="relative aspect-square min-w-0 shrink-0 grow basis-full md:aspect-video"
                >
                  {isVideo(item) ? (
                    <video
                      src={item.url}
                      controls
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.alternativeText || productName}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Xem toàn màn hình"
            onClick={openLightbox}
            className="absolute top-3 right-3 rounded-full bg-white/95 p-2 text-slate-900 shadow-lg transition-transform hover:scale-110 hover:bg-white"
          >
            <Expand className="size-4" />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={() => emblaApi?.scrollPrev()}
                className={cn(ARROW_BUTTON_CLASSES, "left-3")}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => emblaApi?.scrollNext()}
                className={cn(ARROW_BUTTON_CLASSES, "right-3")}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {media.length > 1 && (
          <div className="border-accent-foreground/30 flex flex-1 items-center justify-center gap-2 overflow-x-auto border-t p-3">
            {media.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Xem ảnh ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-20",
                  index === selectedIndex
                    ? "border-sky-400"
                    : "border-accent-foreground/40 hover:border-accent-foreground/80"
                )}
              >
                {isVideo(item) ? (
                  <div className="flex h-full w-full items-center justify-center bg-slate-800">
                    <PlayCircle className="text-text-base/80 size-6" />
                  </div>
                ) : (
                  <Image
                    src={item.formats?.thumbnail?.url || item.url}
                    alt={item.alternativeText || productName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          fullscreen
          hideCloseButton
          className="flex items-center justify-center bg-black/95"
        >
          <DialogTitle className="sr-only">{productName}</DialogTitle>

          <button
            type="button"
            aria-label="Đóng"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/95 p-2 text-slate-900 shadow-lg transition-transform hover:scale-110 hover:bg-white"
          >
            <X className="size-5" />
          </button>

          <div className="relative h-full w-full">
            {activeItem && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-150",
                  lightboxVisible ? "opacity-100" : "opacity-0"
                )}
              >
                {isVideo(activeItem) ? (
                  <video
                    src={activeItem.url}
                    controls
                    autoPlay
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Image
                    src={activeItem.url}
                    alt={activeItem.alternativeText || productName}
                    width={activeItem.width}
                    height={activeItem.height}
                    className="max-h-[90vh] max-w-[90vw] object-contain"
                  />
                )}
              </div>
            )}

            {media.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() =>
                    goToLightboxIndex((lightboxIndex - 1 + media.length) % media.length)
                  }
                  className={cn(ARROW_BUTTON_CLASSES, "left-4")}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => goToLightboxIndex((lightboxIndex + 1) % media.length)}
                  className={cn(ARROW_BUTTON_CLASSES, "right-4")}
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductMediaCarousel;
