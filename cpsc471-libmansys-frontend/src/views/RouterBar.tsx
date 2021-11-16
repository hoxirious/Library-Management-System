import { routeInfoMap, RouteKey, routeMap } from "components/data"
import { ButtonRoute } from "components/common"
import "styles/views/RouterBar.sass"

export const RouterBar = () => {
    return (
        <div className="router-bar">
            {Object.keys(routeMap).map((route) => (
                <ButtonRoute
                    buttonTitle={routeInfoMap[route as RouteKey].displayName}
                    buttonActive="button-route--active"
                    buttonStyle="button-route"
                    routeTo={routeInfoMap[route as RouteKey].routeKey}
                />
            ))}
        </div>
    )
}