"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";
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

  useGSAP(() => {
    gsap.timeline().from(`img[role="img"]`, {
      duration: 2,
      delay: 0.5,
      stagger: 0.1,
      opacity: 0,
      y: -300,
      ease: "elastic.out(1,0.67)",
    });
  });

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
          className="h-auto w-full"
          priority={index < 5}
          onLoad={(e) => {
            //set height of image in css
            const img = e.target as HTMLImageElement;
            const spanRatio = img.height / img.width;
            img.setAttribute("spanRatio", spanRatio.toString());
            img.style.gridRow = `auto / span ${spanRatio * 2}`;
          }}
        />
      ))}
    </section>
  );
}
