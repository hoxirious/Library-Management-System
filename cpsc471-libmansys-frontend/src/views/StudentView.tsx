import { ButtonAction, CustomDialog } from "components/common"
import Table from "components/common/Table"
import { borrowedColumns, returnedColumns } from "components/data"
import { ReturnedItemInfo } from "models"
import { useEffect, useState } from "react"
import { useStoreActions, useStoreState } from "store/StoreFront"
import "styles/views/StudentPage.sass"

export const StudentView = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { fetchBorrowedForAll, fetchReturnedForAll, postReturned } = useStoreActions(store => {
        return store.cartModel;
    })
    const [id, setId] = useState<number>(0);
    const [itemId, setItemId] = useState<number>(0);
    const [borrowed, setBorrowed] = useState<string>("");
    const [returned, setReturned] = useState<string>("");
    const { returnedList, borrowedList } = useStoreState(store => {
        return store.cartModel;
    })
    const openFilterModal = () => {
        setIsFilterOpen(true);
    };
    const closeFilterModal = () => {
        setIsFilterOpen(false);
    };

    const applyAction = () => {
        const item: ReturnedItemInfo = {
            student_id: id,
            item_id: itemId,
            return_date: returned,
            borrow_date: borrowed,
        }
        postReturned(item);
        fetchBorrowedForAll();
        fetchReturnedForAll();
    }

    useEffect(() => {
        fetchBorrowedForAll();
        fetchReturnedForAll();
    }, [fetchBorrowedForAll, fetchReturnedForAll])

    return (
        <div className="student-view">
            <p>Item Borrowed Table</p>
            <Table columns={borrowedColumns} data={borrowedList} />
            <div>
                <p>Item Returned Table</p>
                <ButtonAction
                    type="contained"
                    onClick={openFilterModal}
                >
                    Add Item Returned
                </ButtonAction>
            </div>
            <Table columns={returnedColumns} data={returnedList} />

            <CustomDialog
                isOpen={isFilterOpen}
                header="Student Registration"
                headerClassName="editer-header"
                bodyClassName="editer-body"
                footer={
                    <ButtonAction
                        type="outlined"
                        onClick={() => applyAction()}
                    >
                        Add
                    </ButtonAction>
                }
                onClose={closeFilterModal}
            >
                <div>
                    <div className="input-row">
                        <p>Student Id</p>
                        <input type="number" className="input-element" value={id}
                            onChange={(e) => setId(e.target.valueAsNumber)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Item Id</p>
                        <input type="number" className="input-element" value={itemId}
                            onChange={(e) => setItemId(e.target.valueAsNumber)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Borrowed Date</p>
                        <input type="text" className="input-element" value={borrowed}
                            onChange={(e) => setBorrowed(e.target.value)}
                        ></input>
                    </div>
                    <div className="input-row">
                        <p>Returned Date</p>
                        <input type="text" className="input-element" value={returned}
                            onChange={(e) => setReturned(e.target.value)}
                        ></input>
                    </div>
                </div>
            </CustomDialog>
        </div>
    )
}