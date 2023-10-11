import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import ListErrors from '../../shared/components/ListErrors';
import {UserStorage} from '../../core/interactions/user.storage';
import UserAPI from '../../core/services/user.service';

/**
Input: CurrentUser
OutPut: Update CurrentUser

 */
export default function Settings() {
    const navigate = useNavigate();
    //
    const [errors, setErrors] = useState([]);
    const [inProgress, setInProgress] = useState(false);
    const isLoggedIn = UserStorage.isLoggedIn();
    //
    useEffect(() => {
        if (!isLoggedIn) {
            navigate(`/`);
        }
    }, []);
    //
    const onClickLogout = (e: any) => {
        e.preventDefault();
        //
        UserStorage.removeUserInfo();
        navigate("/");
    };

    //
    return isLoggedIn ? (
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
    ) : null;
}

function SettingsForm({ updateInProgress }: { updateInProgress: Function }) {
    const navigate = useNavigate();
    //
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [userInfo, setUserInfo] = useState({
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
    });
    const currentUser = UserStorage.getUserInfo();

    useEffect(() => {
        const isLoggedIn = UserStorage.isLoggedIn();
        if (!isLoggedIn) {
            return;
        }
        //
        setUserInfo({ 
            ...userInfo, 
            image: currentUser?.image ? currentUser?.image : '',
            username: currentUser?.username ? currentUser?.username : '',
            bio: currentUser?.bio ? currentUser?.bio : '',
            email: currentUser?.email ? currentUser?.email : '',
        })
    }, [])

    const updateState = (field: string) => (e: any) => {
        const state = userInfo;
        const newState = { ...state, [field]: e.target.value };
        setUserInfo(newState);
    };

    const submitForm = async (e: any) => {
        e.preventDefault();
        updateInProgress(true);
        setIsLoading(true);
        //
        const user = { ...userInfo };
        if (!user?.password) {
            // @ts-ignore
            delete user.password;
        }
        //
        try {
            const { data, status } = await UserAPI.updateUserInfo(user);
            if (status !== 200) {
                setErrors(data.errors.body);
            }

            if (data?.user) {
                UserStorage.storeUserInfo({ user: user })
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
            updateInProgress(false);
        }
    }
    
    return (
        <>
            <ListErrors errors={errors}></ListErrors>
            <form onSubmit={submitForm}>
                <fieldset>
                <fieldset className="form-group">
                    <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={userInfo.image}
                    onChange={updateState("image")}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={userInfo.username}
                    onChange={updateState("username")}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <textarea
                        className="form-control form-control-lg"
                        rows={8}
                        placeholder="Short bio about you"
                        value={userInfo.bio}
                        onChange={updateState("bio")}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={updateState("email")}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    value={userInfo.password}
                    onChange={updateState("password")}
                    />
                </fieldset>

                <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={isLoading}
                >
                    Update Settings
                </button>
                </fieldset>
            </form>
        </>
    )
}