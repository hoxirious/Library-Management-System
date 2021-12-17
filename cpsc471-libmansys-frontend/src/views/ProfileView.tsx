import { CustomCard } from "components/common";
import { StudentInfo } from "models";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import "styles/views/ProfilePage.sass";


export const ProfileView = () => {
    const { fetchStudentInfo } = useStoreActions(store => {
        return store.authModel
    })
    const { studentInfo } = useStoreState(store => {
        return store.authModel
    })


    useEffect(() => {
        fetchStudentInfo();
    }, [fetchStudentInfo])
    return (
        <div className="profile-view">
            <CustomCard
                header={<p>Profile</p>}
                footer={<button>Save</button>}
                cardStyle="profile-card"
            >
                <div className="card-item">
                    {studentInfo && (Object.keys(studentInfo) as (keyof StudentInfo)[]).map(ItemKey => {
                        return (<p>{ItemKey}: {studentInfo[ItemKey].toString()}</p>)
                    })}
                </div>
            </CustomCard>
        </div>
    )
}
