// let aa =`sr.no,holidays,date
// 1,diwali,16-08-2023
// 2,raksha,09-09-2023
// 3,diwali,09-09-2023
// `
// sr.no,holidays,date
// 1,diwali,17-08-2023
// 2,raksha ,20-09-2023
// 3,diwali,09-09-2023

export function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}
