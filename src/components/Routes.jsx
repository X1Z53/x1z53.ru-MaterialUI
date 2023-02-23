import React from "react"
import { Container } from "@mui/material"
import { Routes, Route } from "react-router-dom"

import Main from "../pages/Main"
import Collection from "../pages/Collection"
import TrumBlacklist from "../pages/TrumBlacklist"
import TrumAdmins from "../pages/TrumAdmins"
import ImportSubstitution from "../pages/ImportSubstitution"
import SnakeGame from "../pages/SnakeGame"
import Plug from "../pages/Plug"

export default () =>
    <Container component="main" sx={{ padding: "20px" }}>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<Plug />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/trum_admins" element={<TrumAdmins />} />
            <Route path="/trum_blacklist" element={<TrumBlacklist />} />
            <Route path="/import_substitution" element={<ImportSubstitution />} />
            <Route path="/snake_game" element={<SnakeGame />} />
        </Routes>
    </Container>