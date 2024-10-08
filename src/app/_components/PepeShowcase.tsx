"use client";
import "photoswipe/dist/photoswipe.css";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Pepe } from "~/server/api/apis/github";

const PEPE_REPO_URL = "https://rock9u.github.io/pepe-image";

export function PepeShowcase({ pepes }: { pepes?: Pepe[] }) {
  const images = pepes?.map((el) => ({
    original: `${PEPE_REPO_URL}/${el.path}`,
    thumbnail: `${PEPE_REPO_URL}/${el.path}`,
  }));
  return (
    <>{pepes ? <ImageGallery items={images} /> : <p>Loading pepes...</p>}</>
  );
}
