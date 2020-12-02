export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/02.txt`);

  const lines = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((v) => {
      const [count, char, pass] = v.split(/:? /);
      const [min, max] = count.split("-").map((v) => parseInt(v, 10));
      return {
        min,
        max,
        char,
        pass,
      };
    });

  const validLines = lines.filter((line) => {
    const chars = line.pass.split("").filter((c) => c === line.char);
    return chars.length >= line.min && chars.length <= line.max;
  });

  console.log(validLines.length);
})();
