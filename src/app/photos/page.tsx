import { StreetShowcase } from "~/app/_components/StreetShowcase";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1>Show Me 10 Street Photos</h1>
      <StreetShowcase />
      <div className="container flex flex-row flex-wrap items-center justify-center gap-12 px-4 py-16"></div>
    </main>
  );
}
