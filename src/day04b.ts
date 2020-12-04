export {};

(async () => {
  const HAIR_REG = /^#[0-9a-f]{6}$/;
  const VALID_EYE_COLOR = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  const PID_REG = /^[0-9]{9}$/;

  const input = await Deno.readTextFile(`./src/inputs/04.txt`);

  const passports = input.split(`\n\n`).map((passRaw) => {
    return Object.fromEntries(
      passRaw
        .split(/\n| /)
        .filter((v) => v.length)
        .map((v) => v.split(":"))
    );
  });

  const requiredFiels = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const allFieals = [...requiredFiels, "cid"];

  const almostValids = passports.filter((passport) => {
    const fields = Object.keys(passport);
    if (fields.some((f) => !allFieals.includes(f))) {
      // console.log(`Invalid fields`);
      // console.log(fields);
      return false;
    }
    if (requiredFiels.some((f) => !fields.includes(f))) {
      // console.log(`Missing required field`);
      // console.log(fields);
      return false;
    }
    return true;
  });

  const valids = almostValids.filter((passport) => {
    const validations = [
      isFourDigit(passport.byr, 1920, 2002),
      isFourDigit(passport.iyr, 2010, 2020),
      isFourDigit(passport.eyr, 2020, 2030),
      isValidHeight(passport.hgt),
      isValidHair(passport.hcl),
      isValidEye(passport.ecl),
      isValidPid(passport.pid),
    ];
    return validations.every((v) => v);
  });

  console.log(valids.length);

  function isValidPid(val: string): boolean {
    return PID_REG.test(val);
  }

  function isValidEye(val: string): boolean {
    return VALID_EYE_COLOR.includes(val);
  }

  function isValidHair(val: string): boolean {
    return HAIR_REG.test(val);
  }

  function isValidHeight(val: string): boolean {
    if (val.endsWith("cm")) {
      const num = parseInt(val, 10);
      if (num < 150 || num > 193) {
        return false;
      }
      return true;
    }
    if (val.endsWith("in")) {
      const num = parseInt(val, 10);
      if (num < 59 || num > 76) {
        return false;
      }
      return true;
    }
    return false;
  }

  function isFourDigit(val: string, min: number, max: number): boolean {
    if (val.length !== 4) {
      return false;
    }
    const num = parseInt(val, 10);
    if (num < min || num > max) {
      return false;
    }
    return true;
  }
})();
