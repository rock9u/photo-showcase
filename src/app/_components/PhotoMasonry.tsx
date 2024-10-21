"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";
import { Photo } from "~/server/api/apis/github";

export type PhotoMasonryProps = {
  photos?: Photo[];
  repoName: string;
  children?: React.ReactNode;
};

export function PhotoMasonry({
  photos,
  repoName,
  children,
}: PhotoMasonryProps): JSX.Element {
  const url = "https://rock9u.github.io/" + repoName;
  const imageUrls = (photos ?? [])?.map((el) => `${url}/${el.path}`);
  // const [progress, setProgress] = React.useState(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const proxy: {
          skew: number;
        } = { skew: 0 },
        skewSetter = gsap.quickSetter("img", "skewY", "deg"),
        clamp = gsap.utils.clamp(-20, 20);
      const tl = gsap.timeline().from(`img[role="img"]`, {
        duration: 2,
        delay: 0.5,
        stagger: 0.1,
        opacity: 0,
        y: -300,
        ease: "elastic.out(1,0.67)",
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / 300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.5,
              ease: "power4.easeInOut",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew) as void,
            });
          }
        },
      });
    },
    { dependencies: [photos] },
  );

  return (
    <section
      className="grid-cols grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{
        gridTemplateRows: "masonry",
      }}
    >
      {children}
      {imageUrls.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Street Photo from ${repoName}, index ${index}`}
          width="0"
          height="0"
          sizes="100vw"
          role="img"
          aria-label="Street Photo"
          className={cn("row-start-auto h-auto w-full")}
          priority={index < 5}
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            const spanRatio = img.height / img.width;
            img.setAttribute("span-ratio", spanRatio.toString());
            if (spanRatio < 0.7) {
              img.style.gridRowEnd = `span 1`;
            }
            if (spanRatio > 0.7) {
              img.style.gridRowEnd = `span 2`;
            }
          }}
        />
      ))}
    </section>
  );
}
