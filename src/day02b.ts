export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/02.txt`);

  const lines = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((v) => {
      const [count, char, pass] = v.split(/:? /);
      const [p1, p2] = count.split("-").map((v) => parseInt(v, 10));
      return {
        p1,
        p2,
        char,
        pass,
      };
    });

  const validLines = lines.filter((line) => {
    const p1Valid = line.pass[line.p1 - 1] === line.char;
    const p2Valid = line.pass[line.p2 - 1] === line.char;
    if (p1Valid && p2Valid) {
      return false;
    }
    return p1Valid || p2Valid;
  });

  console.log(validLines.length);
})();
