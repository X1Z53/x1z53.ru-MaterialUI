import React from 'react'
import { Button, Divider, Stack, Typography, Paper } from '@mui/material'

export default ({ name, links, element }) =>
    <Paper sx={{ padding: "20px 5px 50px 5px", }}>
        <Typography variant='h4'>{name}</Typography>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="center" margin={1}>
            {Object.keys(links).map((name) => <Button sx={{ color: "#ffffff" }} underline='none' href={links[name]}>{name}</Button>)}
        </Stack>
        {element}
    </Paper >
