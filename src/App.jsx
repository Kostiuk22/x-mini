import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Bookmarks from './pages/Bookmarks/Bookmarks';
import Profile from './pages/Profile/Profile';
import Replies from './pages/Profile/Replies/Replies';
import RepostedPosts from './pages/Profile/RepostedPosts/RepostedPosts';
import MessageSection from './components/MessageSection/MessageSection';
import Media from './pages/Profile/Media/Media';
import Likes from './pages/Profile/Likes/Likes';
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Post from './pages/Post/Post';

import MainLayout from './layouts/MainLayout';
import MessagesLayout from './layouts/MessagesLayout';
import SettingsLayout from './layouts/SettingsLayout';
import Auth from './pages/Auth/Auth';
import { Provider } from 'react-redux';
import store from './store';
import RootLayout from './layouts/RootLayout';
import DefaultMessages from './pages/Messages/DefaultMessages/DefaultMessages';
import ChangeTag from './pages/Settings/ChangeTag/ChangeTag';
import ChangePassword from './pages/Settings/ChangePassword/ChangePassword';
import { ToastContainer } from 'react-toastify';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/auth" element={<Auth />} />
      <Route path="/x.com" element={<MainLayout />}>
        <Route path="/x.com/home" element={<Home />} />
        <Route path="/x.com/explore" element={<Explore />} />
        <Route path="/x.com/i/bookmarks" element={<Bookmarks />} />

        <Route path="/x.com/messages" element={<MessagesLayout />}>
          <Route index element={<DefaultMessages />} />
          <Route path="/x.com/messages/:chatId" element={<MessageSection />} />
        </Route>

        <Route path="/x.com/:tag" element={<Profile />}>
          <Route index element={<RepostedPosts />} />
          <Route path="/x.com/:tag/with_replies" element={<Replies />} />
          <Route path="/x.com/:tag/media" element={<Media />} />
          <Route path="/x.com/:tag/likes" element={<Likes />} />
        </Route>
        <Route path="/x.com/:tag/status/:postId" element={<Post />} />

        <Route path="/x.com/settings" element={<SettingsLayout />}>
          <Route path="change_tag" element={<ChangeTag />} />
          <Route path="change_password" element={<ChangePassword />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        icon={false}
        closeButton={false}
      />
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </>
  );
}

export default App;
