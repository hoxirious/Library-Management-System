import { CustomCard } from "components/common";
import "styles/pages/MyCartPage.sass";

export const MyCartPage = () => {
    return (
        <div className="cart-page">
            <div className="cart-items">
                <CustomCard
                    header="My Cart"
                    children={
                        <>
                            <p>CD       Naruto      Anime      $40</p>
                            <p>Magazine       New York Times      Fashion      $10</p>
                            <p>Book       Chicken Nugget      Food      $10</p>
                        </>
                    }
                />
            </div>
            <div className="cart-billing">
                <CustomCard
                    header="My Billing"
                    children={
                        <>
                            <p>Naruto  $40</p>
                            <p>New York Times  $10</p>
                            <p>Chicken Nudget  $40</p>
                            <p>Fines  $5.02</p>
                            <p>Total  $95.02</p>
                        </>
                    }
                />
            </div>
        </div>
    )
}