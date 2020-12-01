export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/01.txt`);

  const nums = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((v) => parseInt(v, 10));

  let found: [number, number] | null = null;
  nums.forEach((num1) => {
    const diff = 2020 - num1;
    if (nums.includes(diff)) {
      found = [num1, diff];
    }
  });

  if (found === null) {
    console.log("Oops");
    return;
  }

  console.log(found);
  console.log(found[0] * found[1]);
})();
