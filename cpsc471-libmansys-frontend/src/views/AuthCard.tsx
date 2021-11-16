import { ButtonAction } from "components/common"
import "styles/views/AuthCard.sass"

export const AuthCard = () => {
    return (
        <div className="auth-card">
            <p className="logo">LIBMANSYS.</p>
            <input placeholder="Enter your email" type="email" className="input "></input>
            <input placeholder="Enter your password" type="password" className="input"></input>
            <ButtonAction 
                type="contained"
                className ="button button__login"
            >
                Log In
            </ButtonAction>
            <div className="line"></div>
            <ButtonAction
                type="outlined"
                className ="button button__create"
            >
                Create Account
            </ButtonAction>
        </div>
    )
}