import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import ListErrors from './ListErrors';
import {UserStorage} from '../store/user.storage';

/**
Input: CurrentUser
OutPut: Update CurrentUser

 */
export default function Settings() {
    const navigate = useNavigate();
    //
    const [errors, setErrors] = useState([]);
    const [inProgress, setInProgress] = useState(false);

    //
    const onClickLogout = () => {};

    //
    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <ListErrors errors={errors}></ListErrors>

                        <SettingsForm updateInProgress={setInProgress} />
                        <hr />

                        <button
                            disabled={inProgress}
                            className="btn btn-outline-danger"
                            onClick={onClickLogout}
                        >
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsForm({ updateInProgress }: any) {
    const [image, setImage] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => {
        const userInfo = UserStorage.getUserInfo();
        setImage(userInfo.image);
        setUsername(userInfo.username);
        setBio(userInfo.bio);
        setEmail(userInfo.email);
    }, []);
    /**
     * set InProgress in Parent and child
     * Call
     */

    const updateState = (fieldType: string) => (event: any) => {
        const value = event.target.value;
        switch (fieldType) {
            case 'image':
                setImage(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'bio':
                setBio(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const submitForm = (event: any) => {
        event.preventDefault();
        setInProgress(true);
        updateInProgress(true);
        //
        try {
            
        } catch (error) {

        } finally {
            setInProgress(false);
            updateInProgress(false);
        }
    };

    return (
        <form onSubmit={submitForm}>
            <fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="URL of profile picture"
                        value={image}
                        onChange={updateState('image')}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={updateState('username')}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <textarea
                        className="form-control form-control-lg"
                        rows={8}
                        placeholder="Short bio about you"
                        value={bio}
                        onChange={updateState('bio')}
                    ></textarea>
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={updateState('email')}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={updateState('password')}
                    />
                </fieldset>

                <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}
                >
                    Update Settings
                </button>
            </fieldset>
        </form>
    );
}
