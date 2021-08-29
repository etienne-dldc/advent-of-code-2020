export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/13.txt`);

  const [startRaw, linesRaw] = input.split("\n");
  const start = parseInt(startRaw, 10);
  const lines = linesRaw
    .split(",")
    .filter((v) => v !== "x")
    .map((v) => parseInt(v, 10));

  console.log({
    start,
    lines,
  });

  const startTime = lines.map((line) => {
    return {
      line,
      start: line - (start % line),
    };
  });

  let min: number = Infinity;
  let result: { line: number; start: number } = startTime[0];
  startTime.forEach((item) => {
    if (item.start < min) {
      result = item;
      min = item.start;
    }
  });
  console.log(result.line * result.start);
})();
