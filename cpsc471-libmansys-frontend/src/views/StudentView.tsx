import Table from "components/common/Table"
import { borrowedColumns, returnedColumns } from "components/data"
import { BorrowedItemInfo } from "models"
import { useEffect } from "react"
import { useStoreActions, useStoreState } from "store/StoreFront"
import "styles/views/StudentPage.sass"

export const StudentView = () => {
    const { fetchBorrowedForAll, fetchReturnedForAll } = useStoreActions(store => {
        return store.cartModel;
    })
    const { returnedList, borrowedList } = useStoreState(store => {
        return store.cartModel;
    })

    useEffect(() => {
        fetchBorrowedForAll();
        fetchReturnedForAll();
    }, [fetchBorrowedForAll])

    return (
        <div className="student-view">
            <p>Item Borrowed Table</p>
            <Table columns={borrowedColumns} data={borrowedList} />
            <p>Item Returned Table</p>
            <Table columns={returnedColumns} data={returnedList} />
        </div>
    )
}