export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/06.txt`);

  const groups = input.split("\n\n").filter((v) => v.length);

  const counts = groups.map((group) => {
    const answers = group.split("\n").filter((v) => v.length);
    const all = new Set<string>();
    answers.forEach((answer) => {
      const yeses = answer.split("");
      yeses.forEach((letter) => {
        all.add(letter);
      });
    });
    return all.size;
  });

  const sum = counts.reduce((acc, v) => acc + v, 0);

  console.log({ sum });
})();
