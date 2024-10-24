import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export function PhotoPagination({
  limit,
  offset,
  masonry,
  hideSummary,
}: {
  limit: number;
  offset: number;
  masonry?: boolean;
  hideSummary?: boolean;
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
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevLink}
            aria-disabled={offset <= 0}
            tabIndex={offset <= 0 ? -1 : undefined}
            className={offset <= 0 ? "pointer-events-none" : ""}
          >
            {`Last ${limit}`}
          </PaginationPrevious>
        </PaginationItem>
        {hideSummary ? (
          <></>
        ) : (
          <PaginationItem className="px-2">
            {`From ${offset + 1} to ${offset + limit}`}
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href={nextLink}>{`Next ${limit}`}</PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
