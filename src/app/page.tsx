import { PepeShowcase } from "~/app/_components/PepeShowcase";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4 text-white">
      <h1>Pepe Images</h1>
      <PepeShowcase />
    </main>
  );
}
