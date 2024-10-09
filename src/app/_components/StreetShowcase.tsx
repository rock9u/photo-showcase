import {
  PhotoPagination,
  PhotoShowcase,
} from "~/app/_components/PhotoShowcase";
import { STREET_REPO_NAME } from "~/server/api/apis/github";
import { api } from "~/trpc/server";

export async function StreetShowcase({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) {
  const streets = await api.street.all({ limit, offset });

  return (
    <>
      <PhotoPagination limit={limit} offset={offset} />
      <PhotoShowcase photos={streets} repoName={STREET_REPO_NAME} />;
    </>
  );
}
