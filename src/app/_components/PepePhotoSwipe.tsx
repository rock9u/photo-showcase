"use client";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";

import "react-image-gallery/styles/css/image-gallery.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Pepe } from "~/server/api/apis/github";

const PEPE_REPO_URL = "https://rock9u.github.io/pepe-image";

export function PepePhotoSwipe({ pepes }: { pepes?: Pepe[] }) {
  return (
    <>
      {pepes ? (
        <Gallery id={"pepe-gallery"}>
          {pepes?.map(({ path }) => (
            <Item
              original={`${PEPE_REPO_URL}/${path}`}
              id={path}
              key={path}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  src={`${PEPE_REPO_URL}/${path}`}
                  width={600}
                  height={500}
                  onClick={open}
                  alt={path}
                />
              )}
            </Item>
          ))}
        </Gallery>
      ) : (
        <p>Loading pepes...</p>
      )}
    </>
  );
}
