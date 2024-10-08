export type Pepe = {
  url: string;
  path: string;
};
export const getPepes = async () => {
  const options = {
    method: "GET",
    headers: {
      "User-Agent": "insomnia/2023.5.8",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  };

  try {
    const response = await fetch(
      "http://api.github.com/repos/rock9u/pepe-image/git/trees/master?recursive=1",
      options,
    );

    // eslint-disable-next-line
    const json = await response.json();
    // eslint-disable-next-line
    return json?.tree.filter((el: any) => el?.type === "blob") as Pepe[];
  } catch (err) {
    console.error(err);
  }
};
