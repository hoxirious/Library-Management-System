import { ButtonAction, CustomCard } from "components/common";
import Table from "components/common/Table";
import { magazineColumns } from "components/data";
import { ItemInfo, TitleMap } from "models";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import { ItemCard } from "./ItemCard";

// todo: fetch rows, get columns -> call table
export const MagazineView = () => {
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

    const { magazineList } = useStoreState((store) => {
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
        fetchItem("magazine");
    }, [fetchItem])
    return (
        <>
            <div className="book-view">
                {userType === "STUDENT" &&
                    <>
                        {
                            magazineList.map((eachMagazine) => {
                                return <CustomCard
                                    key={`${eachMagazine.item_id}${eachMagazine.type}`}
                                    header={<p>{eachMagazine.name}</p>}
                                    footer={<input name="book-items" id={eachMagazine.item_id.toString()} type="checkbox"></input>}
                                >
                                    <div className="card-item">
                                        {(Object.keys(eachMagazine) as (keyof ItemInfo)[]).map(ItemKey => {
                                            return (<p id={ItemKey}> {TitleMap[ItemKey]}: {eachMagazine[ItemKey]}</p>)
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
                        <Table data={magazineList} columns={magazineColumns} />
                    </>
                }
            </div>
        </>
    );
}