import TableConstructor from "../components/TableConstructor";

const { file_storage } = require("../databases/config.json");
const database = require("../databases/trum_blacklist.json");
const backgroundColors = Object.keys(database).map((name) =>
  database[name]["is_banned"] ? "error.main" : "success.main"
);
const blacklist = Object.keys(database).map((name) => [
  <img height="100px" src={file_storage + "trum_blacklist/" + name + ".jpg"} alt={name} />,
  name,
  database[name]["ban_reason"],
  database[name]["bans_count"],
  database[name]["ban_period"]
]);

export default function TrumBlacklist() {
  return (
    <TableConstructor
      headers={[
        "Фото",
        "Имя",
        "Причина попадания в ЧС",
        "Количество банов",
        "Период бана"
      ]}
      rows={blacklist}
      backgroundColors={backgroundColors}
    />
  );
}
