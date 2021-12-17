import { RouteComponentList } from "components/data"
import { Route, Switch } from "react-router-dom"
import "styles/views/MainManager.sass"

export const MainManager = () => {
    return (
        <Switch>
            <div className="main-manager">
                <div className="main-content">
                    {RouteComponentList.map((componentRoute) => {
                        return <Route key={componentRoute.path} {...componentRoute} />;
                    })}
                    {/* <MyCartPage /> */}
                    {/* <ProfilePage /> */}
                    {/* <StudentPage /> */}
                    {/* <Table data={data} columns={columns} /> */}
                </div>
            </div>
        </Switch>
    )
}
