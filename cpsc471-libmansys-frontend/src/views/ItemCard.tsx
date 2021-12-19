import { ButtonAction, CustomDialog } from "components/common";
import { DEBOUNCE_TIME, SELECTION, SelectionKey, SelectionValue } from "components/data";
import { ItemInfo, ItemInput, ItemType } from "models";
import { useState } from "react";
import { useDebounce } from "react-use";
import { useStoreActions } from "store/StoreFront";

interface ItemCardProp {
    onClose: () => void
    isOpen: boolean
}

export const ItemCard = ({ onClose, isOpen }: ItemCardProp) => {
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
    const [selectedId, setSelectedId] = useState<SelectionValue>("Edit Item");

    const { fetchItemById, updateItemInfo, addItemInfo, deleteItemInfo } = useStoreActions(store => {
        return store.itemModel;
    })

    const resetInputs = () => {
        setItem_id(0);
        setName("");
        setAmount(0);
        setLocation(0);
        setLibrary("");
        setPub_id(0);
        setGenre("");
        setAuthor_id(0);
        setType("");
        setPages(0);
        setLength(0);
    }

    function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        Object.keys(SELECTION).forEach((key) => {
            if (key === value) {
                setSelectedId(SELECTION[key as SelectionKey])
            }
        })
    }

    const itemInputMapperList: ItemInput[] = [
        {
            title: "Item Id",
            input: {
                type: "number",
                value: item_id,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setItem_id(e.target.valueAsNumber),
        },
        {
            title: "Item Name",
            input: {
                type: "text",
                value: name,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
        },
        {
            title: "Number Available",
            input: {
                type: "number",
                value: amount,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.valueAsNumber),
        },
        {
            title: "Location",
            input: {
                type: "number",
                value: location,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.valueAsNumber),
        },
        {
            title: "Library",
            input: {
                type: "text",
                value: library,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLibrary(e.target.value),
        },
        {
            title: "Published Id",
            input: {
                type: "number",
                value: pub_id,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPub_id(e.target.valueAsNumber),
        },
        {
            title: "Item Type",
            input: {
                type: "text",
                value: type,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value),
        },
        {
            title: "Genre",
            input: {
                type: "text",
                value: genre,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGenre(e.target.value),
        },
        {
            title: "Length",
            input: {
                type: "number",
                value: length,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLength(e.target.valueAsNumber),
        },
        {
            title: "Author Id",
            input: {
                type: "number",
                value: author_id,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAuthor_id(e.target.valueAsNumber),
        },
        {
            title: "Number of pages",
            input: {
                type: "number",
                value: pages,
                className: "input-element"
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPages(e.target.valueAsNumber),
        },
    ]

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
        console.log(item);
        if (selectedId === "Edit Item") {
            console.log("edit item");
            updateItemInfo(item);
        }
        else if (selectedId === "Add Item") {
            console.log("add item");
            addItemInfo(item);
        }
        else if (selectedId === "Remove Item") {
            console.log("delete item");
            deleteItemInfo(item);
        }
        resetInputs();
    }

    const setItemData = (item_id: number) => {
        const result = fetchItemById(item_id);
        result.then(itemInfo => {
            if (itemInfo) {
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

    useDebounce(() => setItemData(item_id), DEBOUNCE_TIME, [item_id]);

    return (
        <div>
            <CustomDialog
                isOpen={isOpen}
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
                onClose={onClose}
            >
                <>
                    <div key="item_id" className="input-row">
                        <select id="choices" onChange={onChange} name="inputs">
                            {Object.keys(SELECTION).map(key => {
                                return (<option id={key} value={key}>{SELECTION[key as SelectionKey]}</option>)
                            })}
                        </select>
                    </div>
                    {itemInputMapperList.map(item => {
                        return (
                            <div key={item.title} className="input-row">
                                <p>{item.title}</p>
                                <input {...item.input} onChange={item.onChange} />
                            </div>
                        )
                    })}
                </>
            </CustomDialog>
        </div>
    )
}