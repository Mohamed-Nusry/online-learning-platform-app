import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEnrollment, getEnrollmentDetails } from "../../../library/store/enrollment";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';
import { toastMessage } from "../../../library/store/toast";
import { confirmDialog } from 'primereact/confirmdialog';
 
export default function EnrollmentsPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const enrollmentData = useSelector(state => state.enrollment)

    useEffect(() => {
        dispatch(getEnrollmentDetails());
    }, [])

    useEffect(() => {
        if(enrollmentData.isDeleteSuccess) {
            const message = {
                severity: "success",
                summary: "Deletion",
                detail: "Deleted Successfully!",
                life: 3000,
            };
            dispatch(toastMessage(message));
            dispatch(getEnrollmentDetails());
        }
    }, [enrollmentData.isDeleteSuccess])

    const onEditClick = (rowData) => {
        history.push(`/admin/enrollment/edit/${rowData.id}`);
    };

    const onDeleteClick = (rowData) => {
        confirmDialog({
            message: 'Are you sure want to delete? This cannot be undone.',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => dispatch(deleteEnrollment(rowData.id)),
            reject: () => null
        });
    };

    const createNew = () => {
        history.push("/admin/enrollments/new");
    }

    const actionsTemplate = (rowData) => {
        return<>
        <Button icon="pi pi-pencil" severity="warning" onClick={() => onEditClick(rowData)} />
        &nbsp; &nbsp;
        <Button icon="pi pi-trash" severity="danger"  onClick={() => onDeleteClick(rowData)} /> 
        </>;
    };


    return<> 
        {enrollmentData.isLoading ? 
        <div className="form-box">
            <div className="fullHeight p-ai-center p-d-flex p-jc-center">
                <div className="m-3 px-3 py-4 px-sm-4 py-sm-5">
                    <ProgressSpinner />
                </div>
            </div>
        </div>

        :

        <div>
            <h4>Enrollments</h4>
            <br /><br />
            <Button label="Create" onClick={createNew} />
            <br /><br />
            <div className="card">
                <DataTable value={enrollmentData.data} dataKey="id" tableStyle={{ minWidth: '100%' }}>
                    <Column field="student_data.first_name" header="Student First Name"></Column>
                    <Column field="student_data.last_name" header="Student Last Name"></Column>
                    <Column field="student_data.email" header="Student Email"></Column>
                    <Column field="course_data.name" header="Course Name"></Column>
                    <Column field="action" header="Actions" body={actionsTemplate}></Column>
                </DataTable>
            </div>
        </div>

        }
        
    </>
}