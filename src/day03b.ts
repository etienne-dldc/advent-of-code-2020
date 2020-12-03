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

  function checkSlope(xSlope: number, ySlope: number): number {
    let count = 0;
    let x = 0;
    let y = 0;

    while (y < height) {
      const result = map[y][x];
      if (result) {
        count++;
      }
      x = (x + xSlope) % width;
      y = y + ySlope;
    }

    return count;
  }

  const results = [
    checkSlope(1, 1),
    checkSlope(3, 1),
    checkSlope(5, 1),
    checkSlope(7, 1),
    checkSlope(1, 2),
  ];

  console.log(results);
  const mult = results.reduce((acc, i) => acc * i, 1);
  console.log(mult);
})();
