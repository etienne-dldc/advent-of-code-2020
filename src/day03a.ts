export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/03.txt`);

  const map = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((line) => {
      const trees = line.split("").map((v) => v === "#");
      return trees;
    });

  const width = map[0].length;
  const height = map.length;

  let count = 0;
  let x = 0;
  let y = 0;

  while (y < height) {
    const result = map[y][x];
    if (result) {
      count++;
    }
    x = (x + 3) % width;
    y = y + 1;
  }

  console.log({
    count,
    x,
    y,
  });
})();
