export type Photo = {
  url: string;
  path: string;
};

export const PEPE_REPO_NAME = "pepe-image";
export const getPepes = async () => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `http://api.github.com/repos/rock9u/${PEPE_REPO_NAME}/git/trees/master?recursive=1`,
      options,
    );

    // eslint-disable-next-line
    const json = await response.json();
    // eslint-disable-next-line
    return json?.tree.filter((el: any) => el?.type === "blob") as Photo[];
  } catch (err) {
    console.error(err);
  }
};

export const STREET_REPO_NAME = "photo-storage";
export const getStreets = async (
  {
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  } = {
    limit: 10,
    offset: 0,
  },
) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      `http://api.github.com/repos/rock9u/${STREET_REPO_NAME}/git/trees/main?recursive=1`,
      options,
    );

    // eslint-disable-next-line
    const json = await response.json();
    // eslint-disable-next-line
    const photos: Photo[] = [
      // eslint-disable-next-line
      ...(json?.tree.filter((el: any) => el?.type === "blob") ?? []),
    ].sort((a: Photo, b: Photo) => {
      return b.path.localeCompare(a.path);
    });
    const paginated = photos.filter((el: Photo, index: number) => {
      if (limit !== undefined && offset !== undefined) {
        return index >= offset && index < offset + limit;
      }
      return true;
    });
    return paginated;
  } catch (err) {
    console.error(err);
  }
};
