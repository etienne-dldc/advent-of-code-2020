export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/10.txt`);

  const nums = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((v) => parseInt(v, 10));

  const max = Math.max(...nums) + 3;

  const all = [0, ...nums, max].sort((l, r) => l - r);

  let oneDiff = 0;
  let threeDiff = 0;
  for (let i = 1; i < all.length; i++) {
    const num = all[i];
    const prev = all[i - 1];
    const diff = num - prev;
    if (diff === 1) {
      oneDiff += 1;
    } else if (diff === 3) {
      threeDiff += 1;
    } else {
      console.log(diff);
      throw new Error("Invalid diff ?");
    }
  }

  console.log({ oneDiff, threeDiff });
  console.log(oneDiff * threeDiff);
})();
