import { ButtonAction, CustomCard, CustomDialog } from "components/common";
import { LibrarianInfo, StudentInfo, UserTypeValue } from "models";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "store/StoreFront";
import "styles/views/ProfilePage.sass";


export const ProfileView = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { fetchStudentInfo, fetchLibrarianInfo, updateStudentInfo, updateLibrarianInfo } = useStoreActions(store => {
        return store.authModel
    })
    const { studentInfo, userType, librarianInfo } = useStoreState(store => {
        return store.authModel
    })
    const [libName, setLibName] = useState<string>("");
    const [studentName, setStudentName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("");

    const openFilterModal = () => {
        setIsFilterOpen(true);
    };
    const closeFilterModal = () => {
        setIsFilterOpen(false);
    };

    const applyAction = (userType: UserTypeValue) => {
        if (userType === "LIBRARIAN") {
            updateLibrarianInfo({ name: libName });
        }
        else if (userType === "STUDENT") {
            updateStudentInfo({ name: studentName, faculty, phone });
        }
    }


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
                <>
                    <CustomCard
                        header={<p>Profile</p>}
                        footer={<ButtonAction type="contained" onClick={openFilterModal}>Edit</ButtonAction >}
                        cardStyle="profile-card"
                    >
                        <div className="card-item">
                            {studentInfo && (Object.keys(studentInfo) as (keyof StudentInfo)[]).map(ItemKey => {
                                return (<p>{ItemKey}: {studentInfo[ItemKey].toString()}</p>)
                            })}
                        </div>
                    </CustomCard>

                    <CustomDialog
                        isOpen={isFilterOpen}
                        header="Change Information"
                        headerClassName="editer-header"
                        bodyClassName="editer-body"
                        footer={
                            <ButtonAction
                                type="outlined"
                                onClick={() => applyAction("STUDENT")}
                            >
                                Change
                            </ButtonAction>
                        }
                        onClose={closeFilterModal}
                    >
                        <div>
                            <div className="input-row">
                                <p>Student Name</p>
                                <input type="text" className="input-element" value={studentName} placeholder={studentInfo?.name}
                                    onChange={(e) => setStudentName(e.target.value)}
                                ></input>
                            </div>
                            <div className="input-row">
                                <p>Student Faculty</p>
                                <input type="text" className="input-element" value={faculty} placeholder={studentInfo?.faculty}
                                    onChange={(e) => setFaculty(e.target.value)}
                                ></input>
                            </div>
                            <div className="input-row">
                                <p>Student Phone</p>
                                <input type="text" className="input-element" value={phone} placeholder={studentInfo?.phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></input>
                            </div>
                        </div>
                    </CustomDialog>
                </>
            }

            {
                userType === "LIBRARIAN" &&
                <>
                    <CustomCard
                        header={<p>Profile</p>}
                        footer={<ButtonAction type="contained" onClick={openFilterModal}>Edit</ButtonAction >}
                        cardStyle="profile-card"
                    >
                        <div className="card-item">
                            {librarianInfo && (Object.keys(librarianInfo) as (keyof LibrarianInfo)[]).map(ItemKey => {
                                return (<p>{ItemKey}: {librarianInfo[ItemKey].toString()}</p>)
                            })}
                        </div>
                    </CustomCard>
                    <CustomDialog
                        isOpen={isFilterOpen}
                        header="Change Information"
                        headerClassName="editer-header"
                        bodyClassName="editer-body"
                        footer={
                            <ButtonAction
                                type="outlined"
                                onClick={() => applyAction("LIBRARIAN")}
                            >
                                Change
                            </ButtonAction>
                        }
                        onClose={closeFilterModal}
                    >
                        <div>
                            <div className="input-row">
                                <p>Librarian Name</p>
                                <input type="text" className="input-element" value={libName} placeholder={librarianInfo?.name}
                                    onChange={(e) => setLibName(e.target.value)}
                                ></input>
                            </div>
                        </div>
                    </CustomDialog>
                </>
            }
        </div>
    )
}
