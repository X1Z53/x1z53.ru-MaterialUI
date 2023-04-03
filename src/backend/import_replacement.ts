const fs = require("fs")
const { parse } = require("node-xlsx")

const database: { name: string, analogue: string, registryNumber: string, classes: string[] }[] =
  parse("import_replacement.xlsx")[0]
    .data
    .slice(1)
    .map((row: string[]) => ({
      name: row[0].trim().replace(/\s+/g, ' '),
      analogue: row[1].trim().replace(/\s+/g, ' '),
      registryNumber: row[2],
      classes: row.slice(3),
    }))

const objects: Record<string, { analogue: string[], classes: string[] }> = {}
for (const row of database) {
  const { name, analogue, registryNumber, classes } = row
  if (objects.hasOwnProperty(name)) {
    objects[name].analogue.push(`${analogue} (${registryNumber})`)
    objects[name].classes.push(...classes)
  } else {
    objects[name] = { analogue: [`${analogue} (${registryNumber})`], classes }
  }
}


const filteredData: string[] = Object.entries(objects).map(([name, { analogue, classes }]) => [
  name,
  [...new Set(analogue)].join("|"),
  [...new Set(classes)].join("|"),
].join(";"))

fs.writeFileSync("import_replacement.csv", "name;analogue;classes\n" + filteredData.join("\n"))

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const toDelete = (file: string) => readline.question(
  `Delete ${file}? `,
  (toDelete: string) => (toDelete == 'y') ? fs.unlinkSync(file) : console.log('File not deleted')
)

toDelete('import_replacement.xlsx')
toDelete('import_replacement.js')

export { }
