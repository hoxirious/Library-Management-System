import { CustomCard } from "components/common"
import Table from "components/common/Table"
import { columns, data } from "components/data/table.data"
import { MyCartPage, ProfilePage, StudentPage } from "pages"
import { Switch } from "react-router-dom"
import "styles/views/MainManager.sass"
    
export const MainManager = () => {
    return (
        <Switch>
            <div className="main-manager">
                <div className="main-content">
                    {/* {subRouteInfoList.map((subRouteInfo) => {
                    return <Route key={subRouteInfo.path} {...subRouteInfo} />;
                    })} */}
                    {/* <MyCartPage /> */}
                    <ProfilePage />
                    {/* <StudentPage /> */}
                    {/* <Table data={data} columns={columns} /> */}
                </div>
            </div>
        </Switch>
    )
}
