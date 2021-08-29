export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/13.txt`);

  const [, linesRaw] = input.split("\n");
  const lines = linesRaw
    .split(",")
    .map((v) => (v === "x" ? null : BigInt(parseInt(v, 10))));

  const validLines = lines
    .map((line, index) => {
      return { line, index: BigInt(index) };
    })
    .filter((v): v is { line: bigint; index: bigint } => v.line !== null);

  let interval: bigint = validLines[0].line;
  let start: bigint = 0n;

  for (let i = 1; i < 4; i++) {
    const item = validLines[i];
    console.log({ item, interval });
    const result = findNextInterval(start, interval, item.line, item.index);
    start = result.start;
    interval = result.interval;
    console.log(start);
  }

  console.log("===");
  console.log({ interval });
  console.log("===");

  validLines.forEach((item) => {
    console.log(item.index, (interval + item.index) % item.line);
  });

  function findNextInterval(
    start: bigint,
    interval: bigint,
    line: bigint,
    index: bigint
  ) {
    let x = 0n;
    while (true) {
      if ((start + x * interval + index) % line === 0n) {
        break;
      }
      x++;
    }
    const nextStart = start + x * interval;
    x = 1n;
    while (true) {
      if (start + x * interval === 0n) {
        break;
      }
      x++;
    }
    return { start: nextStart, interval: x * interval };
  }
})();

// (t + 23) mod 37 = 0
// x = k1 * 37 - 23, x = 29 * k2
// 29 * k2 = k1 * 37 - 23
// k2 = (k1 * 37 - 23) / 29
// k2 / k1 =

// t mod interval = 0
// t + index mod line = 0
// index mod line

// idx - ((t + x) % idx) = 0

// t = (interval * y1)
// t = (nextBusNumber * y2) + nextBusOffset;

// (interval * y1) + start = (idx * y2) + x;
// interval * y1 = (idx * y2) + x - start;

// (x * interval + index) % line = 0
//
