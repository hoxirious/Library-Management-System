import { ReactElement, ReactNode } from "react"
import "styles/components/CustomCard.sass"
import cx from "classnames"

interface CustomCardProps {
    header: ReactNode,
    children: ReactElement;
    footer?: ReactNode,
    cardStyle?: string;
    headerStyle?: string;
    childrenStyle?: string;
    footerStyle?: string;
}

export const CustomCard = ({ header, footer, children, cardStyle, headerStyle, footerStyle, childrenStyle }: CustomCardProps) => {
    return (
        <div className={cx("custom-card", { [`${cardStyle}`]: cardStyle })}>
            <div className="card-header">{header}</div>
            <div className="card-body">{children}</div>

            {footer &&
                <div className="card-footer">{footer}</div>}
        </div>
    )
}