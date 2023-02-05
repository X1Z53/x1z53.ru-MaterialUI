import TableConstructor from "../components/TableConstructor";

const { file_storage } = require("../databases/config.json");
const database = require("../databases/trum_admins.json");
const admins = Object.keys(database).map((name) =>
  [
    <img
      height="100px"
      src={file_storage + "trum_admins/" + name + ".jpg"}
      alt={name}
    />,
    name,
    database[name]["duty_days"],
    database[name]["contacts"],
    database[name]["rank"]
  ].map(function (item) {
    let items = [];
    if (typeof item === "string") {
      item = item.split("|");
      for (const value in item) {
        items.push(item[value], <br />);
      }
    } else {
      items = item;
    }
    return items;
  })
);

export default function TrumAdmins() {
  return (
    <TableConstructor
      headers={["Фото", "Имя", "Дни дежурства", "Контакты", "Звание"]}
      rows={admins}
    />
  );
}
