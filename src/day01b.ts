export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/01.txt`);

  const nums = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((v) => parseInt(v, 10));

  let found: [number, number, number] | null = null;
  nums.forEach((num1) => {
    if (found) {
      return;
    }
    nums.forEach((num2) => {
      if (found) {
        return;
      }
      const sum = num1 + num2;
      const diff = 2020 - sum;
      if (diff < 0) {
        return;
      }
      if (nums.includes(diff)) {
        found = [num1, num2, diff];
      }
    });
  });

  if (found === null) {
    console.log("Oops");
    return;
  }

  console.log(found);
  console.log(found[0] * found[1] * found[2]);
})();
