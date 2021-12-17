import { useStoreState } from "store/StoreFront"
import "styles/views/layouts/MainLayout.sass"
import { Navbar, RouterBar } from "views"
import { MainManager } from "views/MainManager"

/**
 * Props:
 * HTMLElements to be rendered in MainManager
 * Router to be rendered in RouterBar
 */
export const MainLayout = () => {
    const { userType } = useStoreState((store) => { return store.authModel });
    return (
        <div className="main-layout">
            <div className="header">
                <Navbar />
                <RouterBar userType={userType} />
            </div>
            <div className="body">
                <MainManager />
            </div>
        </div>
    )
}