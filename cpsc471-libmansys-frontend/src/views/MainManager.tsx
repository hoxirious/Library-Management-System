import { CustomCard } from "components/common"
import "styles/views/MainManager.sass"

export const MainManager = () => {
    return (
        <div className="main-manager">
            <div className="main-content">
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
                <CustomCard title="Chicken Nugget" genre="Food" />
            </div>
        </div>
    )
}