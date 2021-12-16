import { routeInfoMap, RouteKey, routeMap } from "components/data"
import { ButtonRoute } from "components/common"
import "styles/views/RouterBar.sass"
import { UserType, UserTypeValue } from "models"

interface RouterBarProp {
    userType: UserTypeValue | null
}
export const RouterBar = ({ userType }: RouterBarProp) => {
    return (
        <div className="router-bar">
            {(userType === UserType.librarian || userType === UserType.admin) &&
                Object.keys(routeMap).map((route) => (
                    <ButtonRoute
                        buttonTitle={routeInfoMap[route as RouteKey].displayName}
                        buttonActive="button-route--active"
                        buttonStyle="button-route"
                        routeTo={routeInfoMap[route as RouteKey].routeKey}
                    />
                ))
            }
            {userType === UserType.student &&
                Object.keys(routeMap).map((route) => (
                    route !== "student" &&
                    (<ButtonRoute
                        buttonTitle={routeInfoMap[route as RouteKey].displayName}
                        buttonActive="button-route--active"
                        buttonStyle="button-route"
                        routeTo={routeInfoMap[route as RouteKey].routeKey}
                    />)
                ))
            }
        </div>
    )
}