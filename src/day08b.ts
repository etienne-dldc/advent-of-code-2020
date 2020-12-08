export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/08.txt`);

  //   const input = `nop +0
  // acc +1
  // jmp +4
  // acc +3
  // jmp -3
  // acc -99
  // acc +1
  // jmp -4
  // acc +6
  // `;

  const instructions = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((instruction) => {
      const [operation, argument] = instruction.split(" ");
      return { operation, argument: parseInt(argument, 10) };
    });

  instructions.forEach((instruction, index) => {
    if (instruction.operation === "acc") {
      return;
    }
    const copy = [...instructions];
    copy[index] = {
      operation: instruction.operation === "jmp" ? "nop" : "jmp",
      argument: instruction.argument,
    };
    const result = run(copy);
    if (result.code === "finish") {
      console.log(index, result.accumulator);
    }
  });

  function run(
    instructions: Array<{
      operation: string;
      argument: number;
    }>
  ) {
    let accumulator = 0;
    let cursor = 0;

    const visitedInstructions = new Set<number>();

    while (true) {
      if (cursor === instructions.length) {
        return { code: "finish", accumulator };
      }
      if (visitedInstructions.has(cursor)) {
        return { code: "loop", accumulator };
      }
      visitedInstructions.add(cursor);
      const instruction = instructions[cursor];
      if (!instruction) {
        throw new Error("Out of bound ?");
      }
      if (instruction.operation === "acc") {
        accumulator += instruction.argument;
        cursor += 1;
      } else if (instruction.operation === "jmp") {
        cursor += instruction.argument;
      } else if (instruction.operation === "nop") {
        cursor += 1;
      }
    }
  }
})();
