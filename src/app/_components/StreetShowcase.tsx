import { PhotoShowcase } from "~/app/_components/PhotoShowcase";
import { STREET_REPO_NAME } from "~/server/api/apis/github";
import { api } from "~/trpc/server";

export async function StreetShowcase() {
  const streets = await api.street.all({});
  return <PhotoShowcase photos={streets} repoName={STREET_REPO_NAME} />;
}
