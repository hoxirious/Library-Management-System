import { ButtonAction, CustomDialog } from "components/common";
import Table from "components/common/Table";
import { cdColumns } from "components/data/columns.data";
import { TitleKey, TitleMap } from "models";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";

// todo: fetch rows, get columns -> call table
export const CdView = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const openFilterModal = () => {
        setIsFilterOpen(true);
    };
    const closeFilterModal = () => {
        setIsFilterOpen(false);
    };

    const { fetchCdList } = useStoreActions((store) => {
        return store.itemModel;
    })
    const { cdList } = useStoreState((store) => {
        return store.itemModel;
    })
    const { userToken } = useStoreState((store) => {
        return store.authModel;
    })
    useEffect(() => {
        fetchCdList(userToken);
    }, [userToken, fetchCdList])

    return (
        <div className="cd-view">
            <div className="button-modal">
                <ButtonAction
                    type="outlined"
                    onClick={() => openFilterModal()}
                >
                    Edit
                </ButtonAction>
            </div>
            <CustomDialog
                isOpen={isFilterOpen}
                header="Edit Row"
                headerClassName="editer-header"
                bodyClassName="editer-body"
                footer={
                    <ButtonAction
                        type="outlined"
                    >
                        Apply
                    </ButtonAction>
                }
                onClose={closeFilterModal}
            >
                <>
                    {Object.keys(TitleMap).map((titleKey) =>
                        <div className="input-row">
                            <p>{TitleMap[titleKey as TitleKey]}</p>
                            <input type="text" id={titleKey} className="input-element" ></input>
                        </div>
                    )}
                </>
            </CustomDialog>
            <Table data={cdList} columns={cdColumns} />
        </div>
    );
}