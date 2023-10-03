import {useState} from 'react';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import ListErrors from './ListErrors';
import agent from '../agent';
import { UserStorage } from '../store/user.storage';

export default function Login() {
    const navigate = useNavigate();
    /**
     * Warning: A component is changing an uncontrolled input to be controlled. 
     * This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.
     */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [inProgress, setInProgress] = useState(false);

    const changeEmail = (event: any) => {
        setEmail(event.target.value);
    };

    const changePassword = (event: any) => {
        setPassword(event.target.value);
    };

    const submitForm = async (event: any) => {
        event.preventDefault();
        setInProgress(true);
        //
        try {
            const res = await agent.Auth.login(email, password);
            if (!!res?.errors?.length) {
                setErrors(res?.errors?.length ? res?.errors : []);
                setInProgress(false);
                return;
            }
            if (!res || !res?.user?.token) {
                setInProgress(false);
                return;
            }
            //
            UserStorage.storeUserInfo(res.user);
            navigate('/');
        } catch (res: any) {
            if (!!res?.errors?.length) {
                setErrors(res?.errors?.length ? res?.errors : []);
            }
            setInProgress(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign Up</h1>
                        <p className="text-xs-center">
                            <Link to="/sign-up">Need an account?</Link>
                        </p>

                        <ListErrors errors={errors}></ListErrors>
                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={changeEmail}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={changePassword}
                                    />
                                </fieldset>
                            </fieldset>
                        </form>

                        <button
                            className="btn btn-lg btn-primary pull-xs-right"
                            type="submit"
                            disabled={inProgress}
                            onClick={submitForm}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
