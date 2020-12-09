export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/09.txt`);

  const nums = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((v) => parseInt(v, 10));

  const invalid = findInvalid(nums);
  console.log({ invalid });

  const seq = findSequence(invalid);
  const check = seq.reduce((acc, v) => acc + v, 0);
  console.log({ check });

  const min = Math.min(...seq);
  const max = Math.max(...seq);
  console.log(min + max);

  function findSequence(invalid: number) {
    for (let i = 0; i < nums.length; i++) {
      let offset = 1;
      let sum = nums[i];
      if (nums[i] !== invalid) {
        while (sum < invalid) {
          sum += nums[i + offset];
          offset += 1;
        }
        if (sum === invalid) {
          return nums.slice(i, i + offset);
        }
      }
    }
    throw new Error("Not found");
  }

  function findInvalid(nums: Array<number>): number {
    for (let i = 25; i < nums.length; i++) {
      const num = nums[i];
      const list = nums.slice(i - 25, i);
      if (!findSum(list, num)) {
        return num;
      }
    }
    throw new Error("Not found");
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
