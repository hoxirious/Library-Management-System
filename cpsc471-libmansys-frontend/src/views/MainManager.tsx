import { CustomCard } from "components/common"
import Table from "components/common/Table"
import { columns, data } from "components/data/table.data"
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
                {/* <Table data={data} columns={columns} /> */}
            </div>
        </div>
    )
}
