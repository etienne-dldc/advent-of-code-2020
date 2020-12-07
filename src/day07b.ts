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

  const cache = new Map<string, number>();

  function count(color: string): number {
    if (cache.has(color)) {
      return cache.get(color)!;
    }
    const bag = rules.find((r) => r.color === color);
    if (!bag) {
      throw new Error("Np bag ?");
    }
    console.log(bag);
    const total = bag.contains
      .map((sub) => sub.count * count(sub.color))
      .reduce((acc, v) => acc + v, 1);
    cache.set(color, total);
    return total;
  }

  console.log(count("shiny gold") - 1);
})();
