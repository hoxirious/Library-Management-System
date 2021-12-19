import { ButtonAction, CustomCard } from "components/common";
import Table from "components/common/Table";
import { bookColumns } from "components/data";
import { ItemInfo, TitleMap } from "models";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import "styles/views/BookView.sass";
import { ItemCard } from "./ItemCard";

// todo: fetch rows, get columns -> call table
export const BookView = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { fetchItem } = useStoreActions(store => {
        return store.itemModel;
    })
    const { addToCart } = useStoreActions((store) => {
        return store.cartModel;
    })
    const { userType } = useStoreState((store) => {
        return store.authModel;
    })
    const { bookList } = useStoreState((store) => {
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
        fetchItem("book");
    }, [fetchItem])

    return (
        <>
            <div className="book-view">
                {userType === "STUDENT" &&
                    <>
                        {
                            bookList.map((eachBook) => {
                                return <CustomCard
                                    key={`${eachBook.item_id}${eachBook.type}`}
                                    header={<p>{eachBook.name}</p>}
                                    footer={<input name="book-items" id={eachBook.item_id.toString()} type="checkbox"></input>}
                                >
                                    <div className="card-item">
                                        {(Object.keys(eachBook) as (keyof ItemInfo)[]).map(ItemKey => {
                                            return (<p id={ItemKey}> {TitleMap[ItemKey]}: {eachBook[ItemKey]}</p>)
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
                        <Table data={bookList} columns={bookColumns} />
                    </>
                }
            </div>
        </>

    );
}