"use client";
import { PhotoMasonry } from "~/app/_components/PhotoMasonry";
import { PhotoShowcase } from "~/app/_components/PhotoShowcase";
import { PhotoPagination } from "./PhotoPagination";
import { STREET_REPO_NAME } from "~/server/api/apis/github";
import { api } from "~/trpc/react";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { useEffect, useState } from "react";

export function StreetShowcase({
  limit,
  offset,
  masonry,
}: {
  limit: number;
  offset: number;
  masonry?: boolean;
}) {
  // const streets = await api.street.all({ limit, offset });
  const {
    data: streets,
    isLoading,
    isFetched,
  } = api.street.all.useQuery({
    limit,
    offset,
  });

  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      role="presentation"
      className={cn("flex w-full flex-col items-center justify-center gap-2")}
    >
      <PhotoPagination limit={limit} offset={offset} masonry={masonry} />
      <Progress
        value={progress}
        className={cn("w-[60%]", [
          !isLoading ? "hidden" : undefined,
          "animate:fade-out:duration-300:ease-in-out",
        ])}
      />

      {isFetched && (
        <div
          className={cn([
            isLoading ? "hidden" : undefined,
            "animation:fade-in:duration-300:ease-in-out",
          ])}
        >
          {masonry ? (
            <PhotoMasonry photos={streets} repoName={STREET_REPO_NAME} />
          ) : (
            <PhotoShowcase photos={streets} repoName={STREET_REPO_NAME} />
          )}
        </div>
      )}
      <PhotoPagination
        limit={limit}
        offset={offset}
        masonry={masonry}
        hideSummary
      />
    </section>
  );
}
