import { PhotoShowcase } from "~/app/_components/PhotoShowcase";
import { api } from "~/trpc/server";

export async function PepeShowcase() {
  const pepes = await api.pepe.all();
  return <PhotoShowcase photos={pepes} />;
}
