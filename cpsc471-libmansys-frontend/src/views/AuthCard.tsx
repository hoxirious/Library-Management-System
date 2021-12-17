import { ButtonAction } from "components/common"
import { LoginInfo } from "models";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "store/StoreFront"
import "styles/views/AuthCard.sass"

export const AuthCard = () => {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const { login } = useStoreActions(store => {
        return store.authModel;
    })
    const { isLogin } = useStoreState((store) => {
        return store.authModel;
    });

    const handleLogin = async (email: string, password: string) => {
        const account: LoginInfo = { library: "LIBRARY0", username: email, password: password };
        await login(account);
    };

    if (isLogin) {
        return <Redirect to="/library" />;
    }
    return (
        <div className="auth-card">
            <p className="logo">LIBMANSYS.</p>
            <input placeholder="Enter your email" type="email" className="input"
                onChange={(e) => { setInputEmail(e.target.value); }}
            />
            <input placeholder="Enter your password" type="password" className="input"
                onChange={(e) => { setInputPassword(e.target.value); }}
            />
            <ButtonAction
                type="contained"
                className="button button__login"
                onClick={() => handleLogin(inputEmail, inputPassword)}
            >
                Log In
            </ButtonAction>
            <div className="line"></div>
            <ButtonAction
                type="outlined"
                className="button button__create"
            >
                Create Account
            </ButtonAction>
        </div >
    )
}