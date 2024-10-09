import "photoswipe/dist/photoswipe.css";

import "react-image-gallery/styles/css/image-gallery.css";
import { PhotoShowcase } from "~/app/_components/photoShowcase";
import { api } from "~/trpc/server";

export async function PepeShowcase() {
  const pepes = await api.pepe.all();
  return <PhotoShowcase photos={pepes} />;
}
