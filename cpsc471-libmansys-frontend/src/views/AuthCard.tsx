import { ButtonAction, CustomDialog } from "components/common"
import { InputRegisterMap, LabelRegisterMap, LoginInfo, RegistrationTypeKey, StudentRegisterInfo } from "models";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useStoreActions, useStoreState } from "store/StoreFront"
import "styles/views/AuthCard.sass"

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
                    {/* {Object.keys(LabelRegisterMap).map((labelKey) => {
                        return (
                            <div className="input-row">
                                <input id={labelKey} type={InputRegisterMap[labelKey as RegistrationTypeKey]} placeholder={LabelRegisterMap[labelKey as RegistrationTypeKey]}></input>
                            </div>
                        )
                    })
                    } */}
                    <div className="input-row">
                        <p>Student Name</p>
                        <input type="text" className="input-element" value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Faculty</p>
                        <input type="text" className="input-element" value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Phone Number</p>
                        <input type="text" className="input-element" value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Username</p>
                        <input type="text" className="input-element" value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Password</p>
                        <input type="password" className="input-element" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Library</p>
                        <input type="text" className="input-element" value={library}
                            onChange={(e) => setLibrary(e.target.value)}
                        ></input>
                    </div>
                </div>
            </CustomDialog>
        </div >
    )
}