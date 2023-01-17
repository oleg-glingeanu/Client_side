import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Home from "Pages/HomePage"
import LoginPage from "Pages/LoginPage"
import AddNewPost from "Pages/AddNewPost"
import ErrorPage from "Pages/ErrorPage"
import ProfilePage from "Pages/ProfilePage"
import NotificationsPage from "Pages/NotificationsPage"
import PostPage from "Pages/PostPage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { themeSettings } from "Styles/Theme"
import 'ScrollBar.css'
export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token));
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
            <Route
              path="/profile/:_id"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/newpost"
              element={isAuth ? <AddNewPost /> : <Navigate to="/" />}
            />
            <Route
              path="/post/:_id"
              element={isAuth ? <PostPage /> : <Navigate to="/" />}
            />
            <Route
              path="/notifications"
              element={isAuth ? <NotificationsPage /> : <Navigate to="/" />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
