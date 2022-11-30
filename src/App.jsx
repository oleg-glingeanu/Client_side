import ResponsiveAppBar from './Components/Appbar/Appbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import CreatePostForm from './Pages/CreatePostForm'
import { Provider } from 'react-redux'
import store from './Redux/store'
import Post from './Pages/Post'

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Router basename="/">
        <ResponsiveAppBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/create-form' element={<CreatePostForm />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}
