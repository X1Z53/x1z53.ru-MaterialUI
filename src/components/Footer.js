import GitHubIcon from '@mui/icons-material/GitHub'
import { Link, Typography } from "@mui/material"


export default function Footer() {
  return (
    <footer style={{ marginTop: "auto", paddingTop: "20px", paddingBottom: "10px", textAlign: "center" }}>
      <Typography variant="h6" component="footer">X1Z53</Typography>
      <Link href="https://github.com/X1Z53/site_mui">
        <GitHubIcon sx={{ color: "text.primary" }} />
      </Link>
    </footer>
  )
}
