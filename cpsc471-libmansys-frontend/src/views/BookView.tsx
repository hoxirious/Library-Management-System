import { CustomCard } from "components/common";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import "styles/views/BookView.sass";

// todo: fetch rows, get columns -> call table
export const BookView = () => {
    const { fetchBookList } = useStoreActions((store) => {
        return store.itemModel;
    })
    const { bookList } = useStoreState((store) => {
        return store.itemModel;
    })
    const { userToken } = useStoreState((store) => {
        return store.authModel;
    })
    useEffect(() => {
        fetchBookList(userToken);
    }, [userToken, fetchBookList])

    return (
        <div className="book-view">
            {
                bookList.map((eachBook) => {

                    return <CustomCard
                        header={<p>{eachBook.name}</p>}
                        footer={<input type="checkbox"></input>}
                    >
                        <div>
                            <div>
                                Genre: {eachBook.genre}
                            </div>
                            <div>
                                Library: {eachBook.library}
                            </div>
                            <div>
                                Location: {eachBook.location}
                            </div>
                            <div>
                                Number of pages: {eachBook.pages}
                            </div>
                            <div>
                                Publisher Id: {eachBook.pub_id}
                            </div>
                            <div>
                                Number Available: {eachBook.amount}
                            </div>
                        </div>

                    </CustomCard>
                })
            }
        </div>
    );
}