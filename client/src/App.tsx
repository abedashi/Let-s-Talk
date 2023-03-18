import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Otp from './pages/Otp';
import Settings from './components/Settings';
import Main from './components/Main';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import ChatInit from './components/ChatInit';
import Chats from './components/Chats';
import Storys from './components/Storys';
import AddStory from './components/AddStory';
import PageNotFound from './pages/NotFoundPage';

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
            </Route>
            <Route path='/settings' element={<Settings />} />
            <Route path='/storys' element={<Storys />} />
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
  );
};

export default App;
