const fs = require("fs");

// ---------- Read JSON ----------
const data = JSON.parse(fs.readFileSync("testCase.json"));
const k = data.keys.k;

// ---------- Convert base-n string to BigInt ----------
// function baseToBigInt(value, base) {
//   let result = 0n;
//   const b = BigInt(base);

//   for (const ch of value.toLowerCase()) {
//     let digit;
//     if (ch >= "0" && ch <= "9") digit = BigInt(ch);
//     else digit = BigInt(ch.charCodeAt(0) - 87); // a = 10

//     result = result * b + digit;
//   }
//   return result;
// }

function baseToBigInt(value, base) {
  let result = 0n;
  const b = BigInt(base);

  for (let i = 0; i < value.length; i++) {
    const digit = BigInt(parseInt(value[i], base));
    result = result * b + digit;
  }
  return result;
}

// ---------- Extract first k points ----------
const points = [];
for (const key of Object.keys(data)) {
  if (key !== "keys" && points.length < k) {
    const x = BigInt(key);
    const base = Number(data[key].base);
    const y = baseToBigInt(data[key].value, base);

    points.push({ x, y });
  }
}

// ---------- Lagrange Interpolation at x = 0 ----------
function findConstantC(points) {
  let c = 0n;

  for (let i = 0; i < points.length; i++) {
    let term = points[i].y;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        term = (term * -points[j].x) / (points[i].x - points[j].x);
      }
    }
    c += term;
  }

  return c;
}

// ---------- Output ----------
const c = findConstantC(points);
console.log(c.toString());



-6290016743746469883
