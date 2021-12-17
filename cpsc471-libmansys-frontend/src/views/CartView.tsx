import { ButtonAction, CustomCard } from "components/common";
import { BorrowedItemInfo, CartElementInfo, FineInfo } from "models";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import "styles/views/MyCartPage.sass";

export const CartView = () => {
    // const [items, setItems] = useState<string[]>([]);
    // const { fetchItemById } = useStoreActions(store => {
    //     return store.itemModel;
    // })
    const { fetchFine, fetchBorrowedForUser, postCart } = useStoreActions(store => {
        return store.cartModel;
    })
    const { fineList, myCart, borrowedList } = useStoreState(store => {
        return store.cartModel;
    })

    useEffect(() => {
        fetchBorrowedForUser();
        fetchFine();
        // let arrayString: string[] = [];
        // myCart.map(async ({ item_id }: CartElementInfo) => {
        //     console.log(item_id);
        //     const result = await fetchItemById(item_id);
        //     arrayString.push(result?.name ?? "");
        // });
        // setItems(arrayString);
    }, [fetchFine, fetchBorrowedForUser])

    return (
        <div className="cart-view">
            <div className="cart-items">
                <CustomCard
                    key="card-1"
                    header="My Cart"
                    footer={
                        <ButtonAction
                            type="contained"
                            onClick={() => postCart()}
                        >
                            Borrow
                        </ButtonAction>
                    }
                >
                    <div>
                        {
                            // items.map(item => {
                            //     return (<p>{item}</p>)
                            // })
                            myCart.map(({ item_id }: CartElementInfo) => {
                                return (<p>Item Id: {item_id}</p>)
                            })
                        }
                    </div>
                </CustomCard>
                <CustomCard
                    key="card-2"
                    header="My Fines"
                    children={
                        <div>
                            {fineList.map(fine => {
                                return (
                                    <>
                                        {fine && (Object.keys(fine) as (keyof FineInfo)[]).map(ItemKey => {
                                            return (<p id={ItemKey}>{ItemKey}: {fine[ItemKey]}</p>)
                                        })}
                                    </>
                                )
                            })}
                        </div>
                    }
                />
            </div>
            <div className="cart-billing">
                <CustomCard
                    header="My Billing"
                    children={
                        <div>
                            {borrowedList.map(item => {
                                return (
                                    <>
                                        {item && (Object.keys(item) as (keyof BorrowedItemInfo)[]).map(ItemKey => {
                                            return (<p>{ItemKey}: {item[ItemKey].toString()}</p>)
                                        })}
                                    </>
                                )
                            })}
                        </div>
                    }
                />
            </div>
        </div>
    )
}