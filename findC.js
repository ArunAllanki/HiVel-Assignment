
const fs = require("fs");
const path = require("path");

const calcY = (value, base) => {
  let res = 0n;
  let b = BigInt(base);

  for (let i = 0; i < value.length; i++) {
    let digit = BigInt(parseInt(value[i], base));
    res = res * b + digit;
  }
  return res;
};

const getConstant = (points) => {
  let c = 0n;

  for (let i = 0; i < points.length; i++) {
    let t = points[i].y;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        t = (t * -points[j].x) / (points[i].x - points[j].x);
      }
    }
    c += t;
  }
  return c;
};

const testCases = "./testCases";
const files = fs.readdirSync(testCases);

files.forEach((file, index) => {
  const data = JSON.parse(fs.readFileSync(path.join(testCases, file)));
  const k = data.keys.k;

  const points = [];

  for (const key of Object.keys(data)) {
    if (key !== "keys" && points.length < k) {
      let x = BigInt(key);
      let base = Number(data[key].base);
      let y = calcY(data[key].value, base);

      points.push({ x, y });
    }
  }

  console.log(getConstant(points).toString());
});
