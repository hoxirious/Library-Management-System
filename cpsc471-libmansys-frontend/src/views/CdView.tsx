import { ButtonAction, CustomCard } from "components/common";
import Table from "components/common/Table";
import { cdColumns } from "components/data/columns.data";
import { ItemInfo, TitleMap } from "models";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import { ItemCard } from "./ItemCard";


// todo: fetch rows, get columns -> call table
export const CdView = (cd: string) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { fetchItem} = useStoreActions(store => {
        return store.itemModel;
    })
    const { addToCart } = useStoreActions((store) => {
        return store.cartModel;
    })

    const { userType } = useStoreState((store) => {
        return store.authModel;
    })

    const { cdList } = useStoreState((store) => {
        return store.itemModel;
    })

    const openFilterModal = () => {
        setIsFilterOpen(true);
    };
    const closeFilterModal = () => {
        setIsFilterOpen(false);
    };

    const addCheckedItems = () => {
        const checkboxes = document.querySelectorAll('input[name="book-items"]:checked');
        checkboxes.forEach((value) => {
            addToCart({ item_id: parseInt(value.id) });
        })
    }

    useEffect(() => {
        fetchItem("cd");
    }, [fetchItem])

    return (
        <>
            <div className="book-view">
                {userType === "STUDENT" &&
                    <>
                        {
                            cdList.map((eachCd) => {
                                return <CustomCard
                                    key={`${eachCd.item_id}${eachCd.type}`}
                                    header={<p>{eachCd.name}</p>}
                                    footer={<input name="book-items" id={eachCd.item_id.toString()} type="checkbox"></input>}
                                >
                                    <div className="card-item">
                                        {(Object.keys(eachCd) as (keyof ItemInfo)[]).map(ItemKey => {
                                            return (<p id={ItemKey}> {TitleMap[ItemKey]}: {eachCd[ItemKey]}</p>)
                                        })}
                                    </div>
                                </CustomCard>
                            })
                        }
                        <ButtonAction
                            type="contained"
                            className="button-addcart"
                            onClick={addCheckedItems}
                        >
                            Add to cart
                        </ButtonAction>
                    </>
                }
            </div>
            <div className="cd-view">
                {userType !== "STUDENT" &&
                    <>
                        <div className="button-modal">
                            <ButtonAction
                                type="outlined"
                                onClick={() => openFilterModal()}
                            >
                                Edit Table
                            </ButtonAction>
                        </div>
                        <ItemCard onClose={closeFilterModal} isOpen={isFilterOpen} />
                        <Table data={cdList} columns={cdColumns} />
                    </>
                }
            </div >
        </>
    );
}