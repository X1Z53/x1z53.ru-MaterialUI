import React from 'react'
import { Button, List, Typography } from '@mui/material'
import Snake from '@yewyewxd/react-simple-snake'

const pageWidth = document.documentElement.scrollWidth
const pageHeight = document.documentElement.scrollHeight

export default function SnakeGame() {
    return <div>
        <Typography variant='h4'>@yewyewxd/react-simple-snake</Typography>
        <List>
            <Button underline='none' href="https://www.npmjs.com/package/@yewyewxd/react-simple-snake">
                NPM
            </Button>
            <Button underline='none' href="https://github.com/yewyewxd/react-simple-snake">
                Github
            </Button>
        </List>
        <Snake percentageWidth={pageWidth > pageHeight ? 50 : 75} />
    </div>
}