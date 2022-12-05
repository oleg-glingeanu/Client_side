import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Home from "Pages/HomePage"
import LoginPage from "Pages/LoginPage"
import ProfilePage from "Pages/ProfilePage"
import RegisterPage from "Pages/RegisterPage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { themeSettings } from "Styles/Theme"



export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
