import Table from "components/common/Table";
import { cdColumns } from "components/data/columns.data";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";

// todo: fetch rows, get columns -> call table
export const CdView = () => {
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
        <div>
            <Table data={cdList} columns={cdColumns} />
        </div>
    );
}