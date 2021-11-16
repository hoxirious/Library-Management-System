import { routeMap } from "components/data";
import { RouteProps } from "components/utils";
import { NavLink } from "react-router-dom";
import "styles/components/ButtonRoute.sass"

export interface ButtonRouteProps extends RouteProps {
    buttonTitle: string;
    buttonStyle?: string;
    buttonActive?: string;
}

export const ButtonRoute = ({
    buttonTitle,
    buttonActive,
    routeTo,
    extraPath,
    buttonStyle,
}: ButtonRouteProps) => {

    const routePath = routeTo ? routeMap[routeTo] as string : "";

    return (
        <NavLink
            key={buttonTitle}
            activeClassName={buttonActive}
            className={buttonStyle}
            to={routePath}
        >
            <span>{buttonTitle}</span>
        </NavLink>
    );
};