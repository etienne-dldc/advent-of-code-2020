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
  const diffs = [];
  for (let i = 1; i < all.length; i++) {
    const num = all[i];
    const prev = all[i - 1];
    const diff = num - prev;
    diffs.push(diff);
    if (diff === 1) {
      oneDiff += 1;
    } else if (diff === 3) {
      threeDiff += 1;
    } else {
      console.log(diff);
      throw new Error("Invalid diff ?");
    }
  }

  console.log(all);
  console.log(diffs.length, all.length);

  const diffStr = diffs.join("");

  const groups = diffStr.split(/(13+)/).filter((v) => v.length > 0);

  let count = 1;

  groups.forEach((group) => {
    if (group.length === 0) {
      return;
    }
    if (group.indexOf("3") >= 0) {
      return;
    }
    const size = group.length;
    switch (size) {
      case 1:
        count *= 2;
        break;
      case 2:
        count *= 4;
        break;
      case 3:
        count *= 7;
        break;
      default:
        throw new Error(`Unhandled size ${size}`);
    }
  });

  console.log(count);
})();
