import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Replies from './pages/Profile/Replies/Replies';
import RepostedPosts from './pages/Profile/RepostedPosts/RepostedPosts';
import MessageSection from './components/MessageSection/MessageSection';
import Media from './pages/Profile/Media/Media';
import Likes from './pages/Profile/Likes/Likes';
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Post from './pages/Post/Post';
import Auth from './pages/Auth/Auth';
import DefaultMessages from './pages/Messages/DefaultMessages/DefaultMessages';
import ChangeTag from './pages/Settings/ChangeTag/ChangeTag';
import ChangePassword from './pages/Settings/ChangePassword/ChangePassword';
import Following from './pages/Profile/StatsWrapper/Following/Following';
import SettingsLayout from './layouts/SettingsLayout';
import store from './store';
import RootLayout from './layouts/RootLayout';
import LoadingSpinner from './components/ui/LoadingSpinner/LoadingSpinner';
import Followers from './pages/Profile/StatsWrapper/Followers/Followers';

const Bookmarks = lazy(() => import('./pages/Bookmarks/Bookmarks'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const StatsWrapper = lazy(() =>
  import('./pages/Profile/StatsWrapper/StatsWrapper')
);
const MainLayout = lazy(() => import('./layouts/MainLayout'));
const MessagesLayout = lazy(() => import('./layouts/MessagesLayout'));


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/x.com"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <MainLayout />
          </Suspense>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route
          path="i/bookmarks"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Bookmarks />
            </Suspense>
          }
        />

        <Route
          path="messages"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <MessagesLayout />
            </Suspense>
          }
        >
          <Route index element={<DefaultMessages />} />
          <Route path=":chatId" element={<MessageSection />} />
        </Route>

        <Route
          path=":tag"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          }
        >
          <Route index element={<RepostedPosts />} />
          <Route path="with_replies" element={<Replies />} />
          <Route path="media" element={<Media />} />
          <Route path="likes" element={<Likes />} />
        </Route>
        <Route path=":tag/stats" element={<StatsWrapper />}>
          <Route index element={<Following />} />
          <Route path="following" element={<Following />} />
          <Route path="followers" element={<Followers />} />
        </Route>
        <Route path=":tag/status/:postId" element={<Post />} />

        <Route path="settings" element={<SettingsLayout />}>
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
