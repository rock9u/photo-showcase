import { PhotoMasonry } from "~/app/_components/PhotoMasonry";
import {
  PhotoPagination,
  PhotoShowcase,
} from "~/app/_components/PhotoShowcase";
import { STREET_REPO_NAME } from "~/server/api/apis/github";
import { api } from "~/trpc/server";

export async function StreetShowcase({
  limit,
  offset,
  masonry,
}: {
  limit: number;
  offset: number;
  masonry?: boolean;
}) {
  const streets = await api.street.all({ limit, offset });

  return (
    <section
      role="presentation"
      className="flex w-full flex-col items-center justify-center"
    >
      <PhotoPagination limit={limit} offset={offset} />
      {masonry ? (
        <PhotoMasonry photos={streets} repoName={STREET_REPO_NAME} />
      ) : (
        <PhotoShowcase photos={streets} repoName={STREET_REPO_NAME} />
      )}
    </section>
  );
}
