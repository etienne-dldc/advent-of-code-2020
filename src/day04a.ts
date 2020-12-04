export {};

(async () => {
  const input = await Deno.readTextFile(`./src/inputs/04.txt`);

  const passports = input.split(`\n\n`).map((passRaw) => {
    return Object.fromEntries(
      passRaw
        .split(/\n| /)
        .filter((v) => v.length)
        .map((v) => v.split(":"))
    );
  });

  // byr (Birth Year)
  // iyr (Issue Year)
  // eyr (Expiration Year)
  // hgt (Height)
  // hcl (Hair Color)
  // ecl (Eye Color)
  // pid (Passport ID)
  // cid (Country ID)

  const requiredFiels = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const allFieals = [...requiredFiels, "cid"];

  const valids = passports.filter((passport) => {
    const fields = Object.keys(passport);
    if (fields.some((f) => !allFieals.includes(f))) {
      console.log(`Invalid fields`);
      console.log(fields);
      return false;
    }
    if (requiredFiels.some((f) => !fields.includes(f))) {
      console.log(`Missing required field`);
      console.log(fields);
      return false;
    }
    return true;
  });

  console.log(valids.length);
})();
