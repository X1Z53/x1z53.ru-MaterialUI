import React from "react"
import { useState } from "react"
import { Button, Collapse } from "@mui/material"

const { file_storage } = require("../databases/config.json")

export default function RegulationAndRules(props) {
  const { extend } = props
  const [checked, setChecked] = useState(false)

  return (
    <>
      <Button onClick={setChecked}>Показать устав и правила</Button>
      <Collapse in={checked}>
        <img width="300px" src={file_storage + "Regulation.svg"} alt="Regulation and rules" />
        <img width="300px" src={file_storage + "Rules.svg"} alt="Regulation and rules" />
        {extend}
      </Collapse>
    </>
  )
}
