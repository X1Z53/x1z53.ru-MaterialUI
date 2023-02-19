import React, { useState } from "react"
import { Box, Typography, Button, Collapse, TextField } from "@mui/material"
import RegulationAndRules from "../components/RegulationAndRules"
import emailjs from "@emailjs/browser"

export default function TrumAccountForm() {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  function sendEmail(e) {
    e.preventDefault()

    emailjs.sendForm(
      "service_zoczq0p", "template_h4facrt", e.target, "EnOTiDgiLagu5ULuS"
    ).then(
      (result) => { window.location.reload() },
      (error) => { console.log(error.text) }
    )
  }

  return (
    <Box>
      <form onSubmit={sendEmail}>
        <TextField label="Имя" name="name" margin="normal" required />
        <TextField label="Фамилия" name="last_name" margin="normal" required />
        <br />
        <TextField label="Логин" name="login" helperText="Имя для входа" margin="normal" required />
        <TextField label="Контакты" name="contacts" helperText="Ссылка на ВК, телефон или почта" margin="normal" />
        <br />
        <Button onClick={setOpen}>Продолжить</Button>
        <br />
        <Collapse in={open}>
          <Typography variant="h6">Тебе известны правила ТРЮМа?</Typography>
          <RegulationAndRules />
          <Button onClick={setChecked}>Я подтверждаю, что ознакомился с правилами, и буду их соблюдать</Button>
        </Collapse>
        <Collapse in={checked}>
          <Typography variant="h6">При первом входе, вы должны установить желаемый пароль</Typography>
          <br />
          <Typography variant="h6">
            Ни администраторы ТРЮМа, ни системные администраторы не будут знать данные от вашего аккаута
          </Typography>
          <Button type="submit">Я хочу создать свой аккаунт</Button>
        </Collapse>
      </form>
    </Box>
  )
}
