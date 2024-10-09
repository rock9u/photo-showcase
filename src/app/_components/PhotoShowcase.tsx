"use client";
import ReactImageGallery from "react-image-gallery";
import { STREET_REPO_NAME, type Photo } from "~/server/api/apis/github";
import "react-image-gallery/styles/css/image-gallery.css";

const STREET_REPO_URL = "https://rock9u.github.io/" + STREET_REPO_NAME;
function pickRandom(array: Photo[], quantity = 10) {
  const result: Photo[] = [];
  if (array.length < quantity) {
    return array;
  }
  for (let i = 0; i < quantity; i++) {
    const add: Photo = array[Math.floor(Math.random() * array.length)]!;
    result.push(add);
  }
  return result;
}

export function PhotoShowcase({ photos }: { photos?: Photo[] }) {
  const images = pickRandom(photos ?? [])?.map((el) => ({
    original: `${STREET_REPO_URL}/${el.path}`,
    thumbnail: `${STREET_REPO_URL}/${el.path}`,
  }));
  return (
    <>{photos ? <ReactImageGallery items={images} /> : <p>Loading...</p>}</>
  );
}
