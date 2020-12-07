export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/07.txt`);

  const rules = input
    .split("\n")
    .filter((v) => v.length > 0)
    .map((rawRule) => {
      const [firstPart, ...other] = rawRule
        .split(", ")
        .map((v) => v.replace(/\.$/, ""));
      const [bag, first] = firstPart.split(" contain ");
      const all = [first, ...other];
      const [color1, color2, bags] = bag.split(" ");
      const color = color1 + " " + color2;
      if (bags !== "bags") {
        throw new Error("What ?");
      }
      const contains = parseContain(all);
      return {
        color,
        contains,
      };
    });

  function parseContain(rules: Array<string>) {
    if (rules.length === 1 && rules[0] === "no other bags") {
      return [];
    }
    return rules.map((rule) => {
      const [numStr, color1, color2, bags] = rule.split(" ");
      const count = parseInt(numStr, 10);
      const color = color1 + " " + color2;
      const expectedBag = count > 1 ? "bags" : "bag";
      if (bags !== expectedBag) {
        console.log({ bags, expectedBag, rule });

        throw new Error("What ?");
      }
      return { color, count };
    });
  }

  let current = rules.filter((rule) => {
    return rule.contains.find((r) => r.color === "shiny gold");
  });

  const handled = new Set<string>([...current.map((v) => v.color)]);

  let safe = 1000;

  while (current.length > 0 && safe > 0) {
    safe--;
    const currentColors = current.map((v) => v.color);
    current = rules.filter((rule) => {
      if (handled.has(rule.color)) {
        return false;
      }
      return rule.contains.find((r) => currentColors.includes(r.color));
    });
    current.forEach((rule) => {
      handled.add(rule.color);
    });
  }

  console.log({
    handled,
    safe,
  });
  console.log(handled.size);
})();
