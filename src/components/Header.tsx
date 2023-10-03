import {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import { UserStorage } from '../store/user.storage';

export default function Header({appName, isLoggedIn}: any) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            setCurrentUser(UserStorage.getUserInfo());
        } else {
            setCurrentUser(null);
        }
    }, [isLoggedIn]);

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    {appName.toLowerCase()}
                </Link>
                <LoggedInView currentUser={currentUser}></LoggedInView>
            </div>
        </nav>
    );
}

const LoggedInView = (props: any) => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        end={true}
                        caseSensitive={true}
                        className="nav-link"
                    >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/editor"
                        end={true}
                        caseSensitive={true}
                        className="nav-link"
                    >
                        <i className="icon-compose"></i>&nbsp;New Post
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/settings"
                        end={true}
                        caseSensitive={true}
                        className="nav-link"
                    >
                        <i className="ion-gear-a"></i>&nbsp;Settings
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to={`/@${props.currentUser.username}`}
                        end={true}
                        caseSensitive={true}
                        className="nav-link"
                    >
                        <img
                            src={props.currentUser.image}
                            className="user-pic"
                            alt={props.currentUser.username}
                        />
                        {props.currentUser.username}
                    </NavLink>
                </li>
            </ul>
        );
    } else {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <NavLink to="/" end={true} className="nav-link">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/login"
                        end={true}
                        caseSensitive={true}
                        className={({isActive}) =>
                            isActive ? 'active nav-link' : 'nav-link'
                        }
                    >
                        Sign In
                    </NavLink>

                    {/* because className="active" is default for active route path
                    <NavLink
                        to="/login" end={true}
                        caseSensitive={true}
                        className="nav-link">
                        Sign In
                    </NavLink>
                    */}
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/sign-up"
                        end={true}
                        caseSensitive={true}
                        className="nav-link"
                    >
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        );
    }
};
