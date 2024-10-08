"use client";
import Image from "next/image";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import { Pepe } from "~/server/api/apis/github";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const PEPE_REPO_URL = "https://rock9u.github.io/pepe-image";

// export function PepeShowcase({ pepes }: { pepes?: Pepe[] }) {
//   return (
//     <>
//       {pepes ? (
//         <Gallery id={"pepe-gallery"}>
//           {pepes?.map(({ path }) => (
//             <Item
//               original={`${PEPE_REPO_URL}/${path}`}
//               id={path}
//               key={path}
//               width="1024"
//               height="768"
//             >
//               {({ ref, open }) => (
//                 <Image
//                   ref={ref}
//                   src={`${PEPE_REPO_URL}/${path}`}
//                   width={600}
//                   height={500}
//                   onClick={open}
//                   alt={path}
//                 />
//               )}
//             </Item>
//           ))}
//         </Gallery>
//       ) : (
//         <p>Loading pepes...</p>
//       )}
//     </>
//   );
// }

export function PepeShowcase({ pepes }: { pepes?: Pepe[] }) {
  const images = pepes?.map((el) => ({
    original: `${PEPE_REPO_URL}/${el.path}`,
    thumbnail: `${PEPE_REPO_URL}/${el.path}`,
  }));
  return (
    <>{pepes ? <ImageGallery items={images} /> : <p>Loading pepes...</p>}</>
  );
}
