import { StreetBreadcrumbs } from "~/app/_components/Breadcrumb";
import { StreetShowcase } from "~/app/_components/StreetShowcase";

export const metadata = {
  title: "Street Gallery",
  description: "Streets",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default async function PhotoPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[]>;
}) {
  const limit = parseInt(searchParams.limit as string) || 10;
  const offset = parseInt(searchParams.offset as string) || 0;
  const isMasonry = searchParams.hasOwnProperty("masonry");
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#2B2D42] to-[#981625] p-4 text-white">
      <h1>Street Photos</h1>
      <StreetShowcase limit={limit} offset={offset} masonry={isMasonry} />
    </main>
  );
}
