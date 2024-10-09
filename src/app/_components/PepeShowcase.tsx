import { PhotoShowcase } from "~/app/_components/PhotoShowcase";
import { PEPE_REPO_NAME } from "~/server/api/apis/github";
import { api } from "~/trpc/server";

export async function PepeShowcase() {
  const pepes = await api.pepe.all();
  return <PhotoShowcase photos={pepes} repoName={PEPE_REPO_NAME} />;
}
