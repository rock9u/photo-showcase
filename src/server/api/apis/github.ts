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

    const json = await response.json();
    return json?.tree.filter((el) => el?.type === "blob") as {
      url: string;
      path: string;
    }[];
  } catch (err) {
    console.error(err);
  }
};
