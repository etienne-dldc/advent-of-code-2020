export {};

const rows = 128;
const columns = 8;

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/05.txt`);

  const seats = input.split("\n").filter((v) => v.length > 0);

  const seatsNums = seats
    .map((seat) => toSeatId(decode(seat)))
    .sort((l, r) => l - r);

  seatsNums.forEach((seatNum, i) => {
    if (i === 0) {
      return;
    }
    const prev = seatsNums[i - 1];
    if (prev + 1 !== seatNum) {
      console.log(prev, seatNum);
      return;
    }
  });

  function toSeatId(obj: { row: number; col: number }): number {
    return obj.row * 8 + obj.col;
  }

  function decode(seat: string): { row: number; col: number } {
    const rowBin = seat
      .slice(0, 7)
      .split("")
      .map((v) => {
        if (v === "F") {
          return true;
        }
        if (v === "B") {
          return false;
        }
        throw new Error("Invalid value");
      });
    const colBin = seat
      .slice(-3)
      .split("")
      .map((v) => {
        if (v === "L") {
          return true;
        }
        if (v === "R") {
          return false;
        }
        throw new Error("Invalid value");
      });
    const row = binrayPartition(rows, rowBin);
    const col = binrayPartition(columns, colBin);

    return { row, col };
  }

  function binrayPartition(size: number, bin: Array<boolean>): number {
    let min = 0;
    let max = size - 1;
    const queue = [...bin];
    while (min !== max) {
      const choice = queue.shift();
      if (choice === undefined) {
        throw new Error("Queue empty !");
      }
      const diff = max - min + 1;
      if (choice === true) {
        max = max - diff / 2;
      } else {
        min = min + diff / 2;
      }
    }
    if (queue.length > 0) {
      throw new Error("Queue not empty !");
    }
    return min;
  }
})();
