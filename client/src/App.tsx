import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Otp from './pages/Otp'
import Settings from './components/Settings'
import Main from './components/Main'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import ChatInit from './components/ChatInit'
import Chats from './components/chats/Chats'
import Storys from './components/storys/Storys'
import AddStory from './components/storys/AddStory'
import StorysShow from './components/storys/StorysShow'
import StorysInit from './components/storys/StorysInit'
import PageNotFound from './pages/NotFoundPage'
import Groups from './components/groups/Groups'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<Navigate to='/chat' />} />
            <Route path='/chat' element={<Main />}>
              <Route
                index
                path='/chat/'
                element={<Navigate to={'/chat/profile'} />}
              />
              <Route path='/chat/profile' element={<ChatInit />} />
              <Route path='/chat/:id' element={<Chats />} />
              <Route path='/chat/group/:id' element={<Groups />} />
            </Route>
            <Route path='/settings' element={<Settings />} />
            <Route path='/storys' element={<Storys />}>
              <Route index element={<Navigate to='/storys/start' />} />
              <Route path='/storys/start' element={<StorysInit />} />
              <Route path='/storys/:id' element={<StorysShow />} />
            </Route>
            <Route path='/add-story' element={<AddStory />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/otp' element={<Otp />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
