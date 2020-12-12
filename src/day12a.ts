export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/12.txt`);

  type Direction = "N" | "S" | "E" | "W";
  type Instruction = Direction | "L" | "R" | "F";
  type Pos = { x: number; y: number };

  const directions = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((raw) => {
      const letter = raw.slice(0, 1) as Instruction;
      const num = parseInt(raw.slice(1), 10);
      return { letter, num };
    });

  let pos: Pos = { x: 0, y: 0 };
  let dir: Direction = "E";

  directions.forEach(({ letter, num }) => {
    switch (letter) {
      case "N":
      case "S":
      case "E":
      case "W":
        pos = moveDir(pos, letter, num);
        break;
      case "L":
        dir = rotateLeft(dir, num);
        break;
      case "R":
        dir = rotateRight(dir, num);
        break;
      case "F":
        pos = moveDir(pos, dir, num);
        break;
      default:
        break;
    }
  });

  console.log(pos);
  console.log(Math.abs(pos.x) + Math.abs(pos.y));

  function moveDir(pos: Pos, dir: Direction, amount: number): Pos {
    const { x, y } = pos;
    switch (dir) {
      case "N":
        return { x, y: y - amount };
      case "S":
        return { x, y: y + amount };
      case "E":
        return { y, x: x + amount };
      case "W":
        return { y, x: x - amount };
    }
    throw new Error("Whoops");
  }

  function rotateLeft(current: Direction, amount: number): Direction {
    const dirs: Array<Direction> = ["N", "W", "S", "E"];
    const index = dirs.indexOf(current);
    const result = (index + amount / 90) % 4;
    return dirs[result];
  }

  function rotateRight(current: Direction, amount: number): Direction {
    const dirs: Array<Direction> = ["N", "E", "S", "W"];
    const index = dirs.indexOf(current);
    const result = (index + amount / 90) % 4;
    return dirs[result];
  }
})();
