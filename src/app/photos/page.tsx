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
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#6534a9] to-[#15162c] text-white">
      <h1>Street Photos</h1>
      <StreetShowcase limit={limit} offset={offset} />
      <div className="container flex flex-row flex-wrap items-center justify-center gap-12 px-4 py-16"></div>
    </main>
  );
}
