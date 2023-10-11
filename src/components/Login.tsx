import {useCallback, useState} from 'react';
import {useNavigate} from 'react-router';
import ListErrors from './ListErrors';
import agent from '../app/core/services/base.service';
import { UserStorage } from '../app/core/interactions/user.storage';

export default function LoginForm() {
    const navigate = useNavigate();
    //
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');

    const handleEmailChange = useCallback((event: any) => {
        setEmail(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: any) => {
        setPassword(event.target.value);
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        //
        try {
            const { data } = await agent.Auth.login(email, password);
            if (!!data?.errors?.length) {
                setErrors(data?.errors?.length ? data?.errors : []);
                setIsLoading(false);
                return;
            }
            if (!data || !data?.user?.token) {
                setIsLoading(false);
                return;
            }
            //
            UserStorage.storeUserInfo({
                user: data.user,
                accessToken: data.user.token
            });
            navigate('/');
        } catch (error: any) {
            if (!!error?.errors?.length) {
                setErrors(error?.errors?.length ? error?.errors : []);
            }
            setIsLoading(false);
        }
    }

    return (
        <>
            <ListErrors errors={errors}></ListErrors>

            <form onSubmit={handleSubmit}>
                <fieldset>
                <fieldset className="form-group">
                    <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    />
                </fieldset>

                <fieldset className="form-group">
                    <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </fieldset>

                <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={isLoading}
                >
                    Sign in
                </button>
                </fieldset>
            </form>
        </>
    )
}