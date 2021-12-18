import { CustomCard } from "components/common";
import { LibrarianInfo, StudentInfo } from "models";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import "styles/views/ProfilePage.sass";


export const ProfileView = () => {
    const { fetchStudentInfo, fetchLibrarianInfo } = useStoreActions(store => {
        return store.authModel
    })
    const { studentInfo, userType, librarianInfo } = useStoreState(store => {
        return store.authModel
    })


    useEffect(() => {
        if (userType === "STUDENT") {
            fetchStudentInfo();
        }
        else if (userType === "LIBRARIAN") {
            fetchLibrarianInfo();
        }
    }, [fetchStudentInfo, fetchLibrarianInfo, userType])
    return (
        <div className="profile-view">
            {
                userType === "STUDENT" &&
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
            }

            {
                userType === "LIBRARIAN" &&
                <CustomCard
                    header={<p>Profile</p>}
                    footer={<button>Save</button>}
                    cardStyle="profile-card"
                >
                    <div className="card-item">
                        {librarianInfo && (Object.keys(librarianInfo) as (keyof LibrarianInfo)[]).map(ItemKey => {
                            return (<p>{ItemKey}: {librarianInfo[ItemKey].toString()}</p>)
                        })}
                    </div>
                </CustomCard>
            }
        </div>
    )
}
