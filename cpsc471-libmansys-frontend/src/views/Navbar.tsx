import { ButtonAction } from "components/common"
import "styles/views/Navbar.sass"

export const Navbar = () => {
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
                </div>
            </div>
        </div>
    )
}