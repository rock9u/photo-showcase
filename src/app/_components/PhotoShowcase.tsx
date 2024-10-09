"use client";
import ReactImageGallery from "react-image-gallery";
import type { Photo } from "~/server/api/apis/github";
import "react-image-gallery/styles/css/image-gallery.css";

const PEPE_REPO_URL = "https://rock9u.github.io/pepe-image";
export function PhotoShowcase({ photos }: { photos?: Photo[] }) {
  const images =
    photos?.map((el) => ({
      original: `${PEPE_REPO_URL}/${el.path}`,
      thumbnail: `${PEPE_REPO_URL}/${el.path}`,
    })) ?? [];
  return (
    <>
      {photos ? <ReactImageGallery items={images} /> : <p>Loading pepes...</p>}
    </>
  );
}
