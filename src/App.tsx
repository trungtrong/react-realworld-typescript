import {Suspense, lazy, useEffect, useState} from 'react';
//
import './App.css';
import {Route, Routes} from 'react-router';
import {Link} from 'react-router-dom';
import {UserStorage} from './store/user.storage';
import Header from './components/Header';
import Todos from './components/todos';
//
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Settings = lazy(() => import('./components/Settings'));
const ArticleEditor = lazy(() => import('./components/editor/Editor'));
const ProfileDetail = lazy(() => import('./components/profile/ProfileDetail'));


export default function App() {
    // @ts-ignore
    const appName = 'RealWorld Exam';
    const [isLoggedIn, setIsLoggedIn] = useState(UserStorage.isLoggedIn());

    useEffect(() => {
        setIsLoggedIn(UserStorage.isLoggedIn());
    }, []);

    return (
        <main>
            <Header></Header>

            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<Register />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/editor/:id" element={<ArticleEditor />} />
                    <Route path="/profile/:username" element={<ProfileDetail />} />
                    <Route path="/todos" element={<Todos />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </Suspense>
        </main>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
