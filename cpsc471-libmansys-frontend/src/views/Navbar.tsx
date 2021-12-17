import { ButtonAction } from "components/common"
import { useStoreActions } from "store/StoreFront"
import "styles/views/Navbar.sass"

export const Navbar = () => {
    const { logout } = useStoreActions((store) => store.authModel);

    return (
        <div className="navbar">
            <div className="navbar__content">
                <div className="navbar__content--block-left">
                    <p className="logo">LIBMANSYS.</p>
                    <input placeholder="Search your item" className="search"></input>
                </div>
                <div className="navbar__content--block-right">
                    <ButtonAction>My Cart</ButtonAction>
                    <ButtonAction>Profile</ButtonAction>
                    <ButtonAction
                        onClick={() => logout()}
                    >Logout</ButtonAction>
                </div>
            </div>
        </div>
    )
}