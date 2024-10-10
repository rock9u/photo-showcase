"use client";
import ReactImageGallery from "react-image-gallery";
import { STREET_REPO_NAME, type Photo } from "~/server/api/apis/github";
import "react-image-gallery/styles/css/image-gallery.css";
import { redirect, useRouter } from "next/navigation";

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

export function PhotoShowcase({
  photos,
  repoName,
}: {
  photos?: Photo[];
  repoName: string;
}) {
  const url = "https://rock9u.github.io/" + repoName;
  const images = (photos ?? [])?.map((el) => ({
    original: `${url}/${el.path}`,
    thumbnail: `${url}/${el.path}`,
  }));
  return (
    <div
      role="figure"
      className="flex max-w-screen-lg flex-col items-center justify-center overflow-auto"
    >
      {photos ? (
        <ReactImageGallery items={images} showIndex thumbnailPosition="left" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export function PhotoPagination({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const router = useRouter();
  const onNext = () =>
    router.push(`/photos?limit=${limit}&offset=${offset + limit}`);
  const onPrev = () =>
    router.push(`/photos?limit=${limit}&offset=${offset - limit}`);

  return (
    <nav className="flex flex-row items-center justify-around gap-2">
      <button onClick={onPrev} disabled={offset <= 0}>{`Last ${limit}`}</button>
      <small>{`From ${offset + 1} to ${offset + limit}`}</small>
      <button onClick={onNext}>{`Next ${limit}`}</button>
    </nav>
  );
}
