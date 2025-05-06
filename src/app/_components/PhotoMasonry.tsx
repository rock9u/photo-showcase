"use client";
import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useReducer, useRef, useState } from "react";
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
  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [key, refreshKey] = useReducer<React.Reducer<number, void>>(
    (state) => state + 1,
    0,
  );
  const imgsRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    imgsRef.current = [];
    refreshKey();
  }, []);

  const addToRefs = (el: HTMLImageElement) => {
    if (el && !imgsRef.current.includes(el)) {
      imgsRef.current.push(el);
    }
  };

  useEffect(() => {
    imgsRef.current.forEach((obj) => {
      focusSelected(obj);
    });
    function focusSelected(obj: HTMLImageElement) {
      const attrIndex = obj.getAttribute("attr-index");
      const index =
        attrIndex !== null && attrIndex !== undefined
          ? parseInt(attrIndex)
          : undefined;
      const timeline = gsap.timeline();
      const rect = obj.getBoundingClientRect();
      const fullScreenScale = Math.min(
        window.innerHeight / rect.height,
        window.innerWidth / rect.width,
      );
      if (index === selected) {
        timeline.fromTo(
          obj,
          {
            scale: 1,
            zIndex: 0,
          },
          {
            scale: fullScreenScale,
            duration: 0.2,
            x: window.innerWidth / 2 - rect.x - rect.width / 2,
            y: window.innerHeight / 2 - rect.y - rect.height / 2,
            ease: "power4.easeInOut",
            zIndex: 10,
          },
        );
      } else {
        timeline.fromTo(
          obj,
          {
            zIndex: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power4.easeInOut",
          },
        );
      }
      timeline.play();
    }
  }, [selected]);

  return (
    <section
      key={key}
      className="grid-cols grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{
        gridTemplateRows: "masonry",
      }}
    >
      {children}
      {imageUrls.map((src, index) => (
        <Image
          ref={addToRefs}
          key={src}
          src={src}
          alt={`Street Photo from ${repoName}, index ${index}`}
          width="0"
          height="0"
          sizes="100vw"
          role="img"
          aria-label="Street Photo"
          attr-index={index}
          onClick={(e) => {
            setSelected(index);
          }}
          onDoubleClick={(e) => {
            setSelected(undefined);
          }}
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
