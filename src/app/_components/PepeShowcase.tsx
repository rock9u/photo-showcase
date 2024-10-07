"use client";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import { Pepe } from "~/server/api/apis/github";

export function PepeShowcase({ pepes }: { pepes?: Pepe[] }) {
  return (
    <div className="w-full max-w-xs">
      {pepes ? (
        <Gallery id={"pepe-gallery"}>
          {pepes?.map(({ path }) => (
            <Item
              original={`http://rock9u.github.io/pepe-image/${path}`}
              thumbnail={`http://rock9u.github.io/pepe-image/${path}`}
              width="768"
              height="768"
              id={path}
              key={path}
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={`http://rock9u.github.io/pepe-image/${path}`}
                />
              )}
            </Item>
          ))}
        </Gallery>
      ) : (
        <p>Loading pepes...</p>
      )}
    </div>
  );
}
