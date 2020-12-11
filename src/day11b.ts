export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/11.txt`);

  type Cell = "L" | "." | "#";
  type Cells = Array<Cell>;

  const height = input.split("\n").filter((v) => v.length > 0).length;
  const width = input.split("\n")[0].length;

  console.log({ height, width });

  const data = input.split("\n").join("").split("") as Cells;

  let current: Cells = data;
  print(current);
  let next = compute(current);
  while (current.join("") !== next.join("")) {
    current = next;
    next = compute(current);
  }
  print(next);
  console.log(next.filter((v) => v === "#").length);

  function compute(current: Cells): Cells {
    return current.map((cell, index) => {
      if (cell === ".") {
        return ".";
      }
      const [x, y] = toCoords(index);
      const around = [
        getAtCoords(current, x, y, 0, -1),
        getAtCoords(current, x, y, +1, -1),
        getAtCoords(current, x, y, +1, 0),
        getAtCoords(current, x, y, +1, +1),
        getAtCoords(current, x, y, 0, +1),
        getAtCoords(current, x, y, -1, +1),
        getAtCoords(current, x, y, -1, 0),
        getAtCoords(current, x, y, -1, -1),
      ];
      if (cell === "L" && around.every((v) => v === "." || v === "L")) {
        return "#";
      }
      if (cell === "#" && around.filter((v) => v === "#").length >= 5) {
        return "L";
      }
      return cell;
    });
  }

  function toCoords(index: number): [number, number] {
    const x = index % width;
    const y = Math.floor(index / width);
    return [x, y];
  }

  function fromCoords(x: number, y: number): number {
    return y * width + x;
  }

  function getAtCoords(
    data: Cells,
    x: number,
    y: number,
    dx: number,
    dy: number
  ): Cell {
    let dist = 1;
    while (true) {
      const cx = x + dist * dx;
      const cy = y + dist * dy;
      if (cx < 0 || cx >= width || cy < 0 || cy >= height) {
        return ".";
      }
      const index = fromCoords(cx, cy);
      const cell = data[index];
      if (cell !== ".") {
        return cell;
      }
      dist++;
    }
  }

  function print(data: Cells) {
    let res = "";
    data.forEach((cell, i) => {
      if (i > 0 && i % width === 0) {
        res += "\n";
      }
      res += cell;
    });
    res += "\n";
    console.log(res);
  }
})();
