export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/09.txt`);

  const nums = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((v) => parseInt(v, 10));

  for (let i = 25; i < nums.length; i++) {
    const num = nums[i];
    const list = nums.slice(i - 25, i);
    if (!findSum(list, num)) {
      console.log(i, num);
    }
  }

  function findSum(list: Array<number>, sum: number): boolean {
    for (let i = 0; i < list.length; i++) {
      const num = list[i];
      for (let j = i + 1; j < list.length; j++) {
        if (num + list[j] === sum) {
          return true;
        }
      }
    }
    return false;
  }
})();
