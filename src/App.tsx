import {useEffect, useState} from 'react';
//
import './App.css';
import Header from './components/Header';
import {Route, RouterProvider, Routes, createRoutesFromElements} from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {Link, createBrowserRouter} from 'react-router-dom';
import {UserStorage} from './store/user.storage';

export default function App() {
    // @ts-ignore
    const appName = 'RealWorld Exam';
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(UserStorage.isLoggedIn());
    }, []);

    return (
        <main>
            <Header
                appName={appName}
                isLoggedIn={isLoggedIn}
            ></Header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Register />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
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
