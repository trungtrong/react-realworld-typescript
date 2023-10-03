import {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import { userService } from '../store/user.interactions';
import { UserModel } from '../models';

export default function Header({}: any) {
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>(undefined);

    useEffect(() => {
        const subscription = userService.userSubject.subscribe((user) => {
            setCurrentUser(user);
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Conduilt
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
                        to="/editor/new"
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
                        to={`/profile/@${props.currentUser.username}`}
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
