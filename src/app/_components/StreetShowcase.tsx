import { PhotoShowcase } from "~/app/_components/PhotoShowcase";
import { api } from "~/trpc/server";

export async function StreetShowcase() {
  const streets = await api.street.all();
  return <PhotoShowcase photos={streets} />;
}
