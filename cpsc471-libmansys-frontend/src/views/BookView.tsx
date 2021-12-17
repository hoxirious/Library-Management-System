import { ButtonAction, CustomCard, CustomDialog } from "components/common";
import Table from "components/common/Table";
import { bookColumns, DEBOUNCE_TIME, SELECTION, SelectionKey, SelectionValue } from "components/data";
import { ItemInfo, ItemType, TitleMap } from "models";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import { useDebounce } from "react-use";
import "styles/views/BookView.sass";

// todo: fetch rows, get columns -> call table
export const BookView = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [item_id, setItem_id] = useState<number>(0);
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [location, setLocation] = useState<number>(0);
    const [library, setLibrary] = useState<string>("");
    const [pub_id, setPub_id] = useState<number>(0);
    const [type, setType] = useState<string>("");
    const [genre, setGenre] = useState<string>("");
    const [author_id, setAuthor_id] = useState<number>(0);
    const [pages, setPages] = useState<number>(0);
    const [length, setLength] = useState<number>(0);
    const [selectedId, setSelectedId] = useState<SelectionValue>();

    const { fetchItemById, fetchItem, updateItemInfo, addItemInfo, deleteItemInfo } = useStoreActions(store => {
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
    const applyAction = () => {
        const item: ItemInfo = {
            item_id: item_id,
            name: name,
            amount: amount,
            location: location,
            library: library,
            pub_id: pub_id,
            type: type as ItemType,
            genre: genre,
            length: length,
            author_id: author_id,
            pages: pages
        }
        if (selectedId === "Edit Item") {
            updateItemInfo(item);
        }
        else if (selectedId === "Add Item") {
            console.log("add item");
            addItemInfo(item);
        }
        else {
            console.log("delete item");
            deleteItemInfo(item);
        }
    }

    const setItemData = (item_id: number) => {
        const result = fetchItemById(item_id);
        result.then(itemInfo => {
            if (itemInfo) {
                console.log(itemInfo);
                setName(itemInfo.name);
                setAmount(itemInfo.amount);
                setLocation(itemInfo.location);
                setLibrary(itemInfo.library);
                setPub_id(itemInfo.pub_id);
                setGenre(itemInfo.genre);
                setAuthor_id(itemInfo.author_id);
                setType(itemInfo.type);
                setPages(itemInfo.pages);
                setLength(itemInfo.length);
            }
        })
    }

    function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        Object.keys(SELECTION).forEach((key) => {
            if (key === value) {
                setSelectedId(SELECTION[key as SelectionKey])
            }
        })
    }

    useDebounce(() => setItemData(item_id), DEBOUNCE_TIME, [item_id]);

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
                        <CustomDialog
                            isOpen={isFilterOpen}
                            header="Edit Row"
                            headerClassName="editer-header"
                            bodyClassName="editer-body"
                            footer={
                                <ButtonAction
                                    type="outlined"
                                    onClick={() => applyAction()
                                    }
                                >
                                    Apply
                                </ButtonAction>
                            }
                            onClose={closeFilterModal}
                        >
                            <>
                                {/* {Object.keys(TitleMap).map((titleKey) =>
                        <div className="input-row">
                            <p>{TitleMap[titleKey as TitleKey]}</p>
                            <input type="text" id={titleKey} className="input-element"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setName(e.target.value)
                                }
                            ></input>
                        </div>
                    )} */}
                                <div key="item_id" className="input-row">
                                    <select id="choices" onChange={onChange} name="inputs">
                                        {Object.keys(SELECTION).map(key => {
                                            return (<option id={key} value={key}>{SELECTION[key as SelectionKey]}</option>)
                                        })}
                                    </select>
                                </div>
                                <div key="item_id" className="input-row">
                                    <p>{TitleMap.item_id}</p>
                                    <input type="number" id="item_id" className="input-element"
                                        value={item_id}
                                        onChange={(e) => setItem_id(e.target.valueAsNumber)}
                                    />
                                </div>
                                <div key="name" className="input-row">
                                    <p>{TitleMap.name}</p>
                                    <input type="text" id="name" className="input-element"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div key="amount" className="input-row">
                                    <p>{TitleMap.amount}</p>
                                    <input type="number" id="amount" className="input-element"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.valueAsNumber)}
                                    />
                                </div>
                                <div key="location" className="input-row">
                                    <p>{TitleMap.location}</p>
                                    <input type="number" id="location" className="input-element"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.valueAsNumber)}
                                    />
                                </div>
                                <div key="library" className="input-row">
                                    <p>{TitleMap.library}</p>
                                    <input type="text" id="library" className="input-element"
                                        value={library}
                                        onChange={(e) => setLibrary(e.target.value)}
                                    />
                                </div>
                                <div key="pub_id" className="input-row">
                                    <p>{TitleMap.pub_id}</p>
                                    <input type="number" id="pub_id" className="input-element"
                                        value={pub_id}
                                        onChange={(e) => setPub_id(e.target.valueAsNumber)}
                                    />
                                </div>
                                <div key="type" className="input-row">
                                    <p>{TitleMap.type}</p>
                                    <input type="text" id="type" className="input-element"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>
                                <div key="genre" className="input-row">
                                    <p>{TitleMap.genre}</p>
                                    <input type="text" id="genre" className="input-element"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                    />
                                </div>
                                <div key="length" className="input-row">
                                    <p>{TitleMap.length}</p>
                                    <input type="number" id="length" className="input-element"
                                        value={length}
                                        onChange={(e) => setLength(e.target.valueAsNumber)}
                                    />
                                </div>
                                <div key="author_id" className="input-row">
                                    <p>{TitleMap.author_id}</p>
                                    <input type="number" id="author_id" className="input-element"
                                        value={author_id}
                                        onChange={(e) => setAuthor_id(e.target.valueAsNumber)}
                                    />
                                </div>
                                <div key="pages" className="input-row">
                                    <p>{TitleMap.pages}</p>
                                    <input type="number" id="pages" className="input-element"
                                        value={pages}
                                        onChange={(e) => setPages(e.target.valueAsNumber)}
                                    />
                                </div>
                            </>
                        </CustomDialog>
                        <Table data={bookList} columns={bookColumns} />
                    </>
                }
            </div>
        </>

    );
}