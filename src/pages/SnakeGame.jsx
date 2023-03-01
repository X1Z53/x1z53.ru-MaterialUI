import React from "react";
import Snake from "@yewyewxd/react-simple-snake";

import ModuleDemo from "../components/ModuleDemo";

const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

export default function SnakeGame() {
  return (
    <ModuleDemo
      name={"@yewyewxd/react-simple-snake"}
      links={{
        GitHub: "https://github.com/yewyewxd/react-simple-snake",
        NPM: "https://www.npmjs.com/package/@yewyewxd/react-simple-snake",
      }}
      element={<Snake percentageWidth={pageWidth > pageHeight ? 40 : 75} />}
    />
  );
}
