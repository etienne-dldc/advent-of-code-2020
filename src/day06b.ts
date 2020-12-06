export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/06.txt`);

  const groups = input.split("\n\n").filter((v) => v.length);

  const counts = groups.map((group) => {
    const answers = group.split("\n").filter((v) => v.length);
    let all = "abcdefghijklmnopqrstuvwxyz".split("");
    answers.forEach((letters) => {
      all = all.filter((letter) => letters.includes(letter));
    });
    console.log(all);
    return all.length;
  });

  const sum = counts.reduce((acc, v) => acc + v, 0);

  console.log({ sum });
})();
