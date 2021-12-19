import { ButtonAction, CustomDialog } from "components/common";
import { AuthInput, LoginInfo, StudentRegisterInfo } from "models";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "store/StoreFront";
import "styles/views/AuthCard.sass";

export const AuthCard = () => {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);



    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [library, setLibrary] = useState<string>("");

    const { login, register } = useStoreActions(store => {
        return store.authModel;
    })
    const { isLogin } = useStoreState((store) => {
        return store.authModel;
    });

    const authInputMapperList: AuthInput[] = [
        {
            title: "Student Name",
            input: {
                type: "text",
                placeholder: "Input your name",
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
        },
        {
            title: "Student Phone",
            input: {
                type: "text",
                placeholder: "Input your phone",
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value),
        },
        {
            title: "Student Faculty",
            input: {
                type: "text",
                placeholder: "Input your faculty",
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFaculty(e.target.value),
        },
        {
            title: "Username",
            input: {
                type: "text",
                placeholder: "Input your userName",
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value),
        },
        {
            title: "Password",
            input: {
                type: "password",
                placeholder: "Input your password",
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
        },
        {
            title: "Library Name",
            input: {
                type: "text",
                placeholder: "Input your library",
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLibrary(e.target.value),
        },
    ]


    const openFilterModal = () => {
        setIsFilterOpen(true);
    };
    const closeFilterModal = () => {
        setIsFilterOpen(false);
    };

    const handleLogin = async (email: string, password: string) => {
        const account: LoginInfo = { library: "LIBRARY0", username: email, password: password };
        await login(account);
    };

    const applyAction = () => {
        const registrationAccount: StudentRegisterInfo = {
            name: name,
            phone: phone,
            faculty: faculty,
            username: username,
            password: password,
            library: library,
        }
        register(registrationAccount);
    }

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
                onClick={openFilterModal}
            >
                Create Account
            </ButtonAction>

            <CustomDialog
                isOpen={isFilterOpen}
                header="Student Registration"
                headerClassName="editer-header"
                bodyClassName="editer-body"
                footer={
                    <ButtonAction
                        type="outlined"
                        onClick={() => applyAction()}
                    >
                        Register
                    </ButtonAction>
                }
                onClose={closeFilterModal}
            >
                <div>
                    {authInputMapperList.map(input => {
                        return (
                            <div className="input-row">
                                <p>{input.title}</p>
                                <input {...input.input} onChange={input.onChange} />
                            </div>
                        )
                    })}

                </div>
            </CustomDialog>
        </div >
    )
}