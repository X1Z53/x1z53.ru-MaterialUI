import React from "react";
import { Typography } from "@mui/material";

import Views from "../components/Views";

const { image_storage } = require("../databases/config.json");
const database = require("../databases/trum_blacklist.json");

const backgroundColors = Object.keys(database).map((name) =>
  database[name]["is_banned"] ? "error.main" : "success.main"
);
const headers = [
  "Имя",
  "Причина попадания в ЧС",
  "Количество банов",
  "Период бана",
];
const blacklist = Object.keys(database).map((name) => [
  <div>
    <img
      height="100px"
      src={image_storage + "trum_blacklist/" + name + ".jpg"}
      alt={name}
    />
    <Typography>{name}</Typography>
  </div>,
  database[name]["ban_reason"],
  database[name]["bans_count"],
  database[name]["ban_period"],
]);

export default () => (
  <Views
    headers={headers}
    database={blacklist}
    backgroundColors={backgroundColors}
  />
);
