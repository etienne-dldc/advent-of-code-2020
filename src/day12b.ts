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

  let waypoint: Pos = { x: 10, y: -1 };
  let pos: Pos = { x: 0, y: 0 };

  directions.forEach(({ letter, num }) => {
    switch (letter) {
      case "N":
      case "S":
      case "E":
      case "W":
        waypoint = moveDir(waypoint, letter, num);
        break;
      case "L":
        waypoint = rotateLeft(waypoint, num);
        break;
      case "R":
        waypoint = rotateRight(waypoint, num);
        break;
      case "F":
        pos = moveForward(pos, waypoint, num);
        break;
      default:
        break;
    }
  });

  console.log(pos);
  console.log(Math.abs(pos.x) + Math.abs(pos.y));

  function moveForward(pos: Pos, waypoint: Pos, amount: number): Pos {
    return {
      x: pos.x + waypoint.x * amount,
      y: pos.y + waypoint.y * amount,
    };
  }

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

  function rotateLeft(waypoint: Pos, amount: number): Pos {
    return rotate2D(waypoint, amount);
  }

  function rotateRight(waypoint: Pos, amount: number): Pos {
    return rotate2D(waypoint, -amount);
  }

  function rotate2D(vector: Pos, angle: number): Pos {
    var theta = (angle * Math.PI) / 180; // radians
    var matrix = [
      Math.cos(theta),
      Math.sin(theta),
      -Math.sin(theta),
      Math.cos(theta),
    ];

    return {
      x: Math.round(matrix[0] * vector.x + matrix[1] * vector.y),
      y: Math.round(matrix[2] * vector.x + matrix[3] * vector.y),
    };
  }
})();
