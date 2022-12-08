import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Home from "Pages/HomePage"
import LoginPage from "Pages/LoginPage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { themeSettings } from "Styles/Theme"



export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth)
  console.log(theme)
  console.log(mode)
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
