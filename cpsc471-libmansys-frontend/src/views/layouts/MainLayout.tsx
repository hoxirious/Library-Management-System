import "styles/views/layouts/MainLayout.sass"
import { Navbar, RouterBar } from "views"
import { MainManager } from "views/MainManager"

/**
 * Props:
 * HTMLElements to be rendered in MainManager
 * Router to be rendered in RouterBar
 */
export const MainLayout = () => {
    return (
        <div className="main-layout">
            <div className="header">
                <Navbar />
                <RouterBar />
            </div>
            <div className="body">
                <MainManager />
            </div>
        </div>
    )
}