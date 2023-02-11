import React from 'react'
import { Button, Divider, Stack, Typography } from '@mui/material'

export default function ModuleDemo({ name, links, element }) {
    console.log(links)
    return <div>
        <Typography variant='h4'>{name}</Typography>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} justifyContent="center" margin={1}>
            {Object.keys(links).map((name) => <Button underline='none' href={links[name]}>{name}</Button>)}
        </Stack>
        {element}
    </div >
}