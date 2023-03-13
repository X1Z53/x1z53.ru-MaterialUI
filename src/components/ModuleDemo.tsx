import React, { ReactElement } from "react"
import { Button, Box, Divider, Stack, Typography, Paper, Card, CardContent } from "@mui/material"

type Props = {
  name: string,
  links: { [key: string]: string },
  element: any
}

export default ({ name, links, element }: Props) => <Paper style={{ padding: "20px 5px 50px 5px" }}>
    <Typography variant="h4">{name}</Typography>
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="center"
      margin={1}
    >
      {Object.keys(links).map((name, index) =>
        <Button key={index} style={{ color: "#fff" }} href={links[name]}>{name}</Button>
      )}
    </Stack>
    {element}
</Paper>
