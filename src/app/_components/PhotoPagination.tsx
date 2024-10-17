import Link from "next/link";

export function PhotoPagination({
  limit,
  offset,
  masonry,
}: {
  limit: number;
  offset: number;
  masonry?: boolean;
}) {
  const nextNewOffset = offset + limit;
  const nextLink =
    `/photos?limit=${limit}&offset=${nextNewOffset}` +
    (masonry ? "&masonry" : "");
  const prevNewOffset = limit < 0 ? 0 : offset - limit;
  const prevLink =
    `/photos?limit=${limit}&offset=${prevNewOffset}` +
    (masonry ? "&masonry" : "");

  return (
    <nav className="flex flex-row items-center justify-around gap-2">
      <Link
        href={prevLink}
        aria-disabled={offset <= 0}
        className={offset <= 0 ? "pointer-events-none" : ""}
        tabIndex={offset <= 0 ? -1 : undefined}
      >{`Last ${limit}`}</Link>
      <small>{`From ${offset + 1} to ${offset + limit}`}</small>
      <Link href={nextLink}>{`Next ${limit}`}</Link>
    </nav>
  );
}
