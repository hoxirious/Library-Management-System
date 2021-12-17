import { CustomCard } from "components/common";
import "styles/pages/ProfilePage.sass";


export const ProfilePage = () => {
    return (
        <div className="profile-page">
            <CustomCard
                header={<p>Profile</p>}
                children={
                    <div>
                        <p> Name: Luca Lacu</p>
                        <p> UCID: 300864624</p>
                        <p> Username: luca.lacu@ucalgary.ca</p>
                        <p> Password: ********</p>
                        <p> Your fine: $5.02</p>
                        <button> Change password</button>
                    </div>
                }
                footer={<button>Save</button>}
                cardStyle="profile-card"
            />
        </div>
    )
}
