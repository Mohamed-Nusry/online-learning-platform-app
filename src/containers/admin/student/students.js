import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getStudentDetails } from "../../../library/store/student";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';
import { toastMessage } from "../../../library/store/toast";
import { confirmDialog } from 'primereact/confirmdialog';
 
export default function StudentsPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const studentData = useSelector(state => state.student)

    useEffect(() => {
        dispatch(getStudentDetails());
    }, [])

    useEffect(() => {
        if(studentData.isDeleteSuccess) {
            const message = {
                severity: "success",
                summary: "Deletion",
                detail: "Deleted Successfully!",
                life: 3000,
            };
            dispatch(toastMessage(message));
            dispatch(getStudentDetails());
        }
    }, [studentData.isDeleteSuccess])

    const onEditClick = (rowData) => {
        history.push(`/admin/student/edit/${rowData.id}`);
    };

    const onDeleteClick = (rowData) => {
        confirmDialog({
            message: 'Are you sure want to delete? This cannot be undone.',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => dispatch(deleteStudent(rowData.id)),
            reject: () => null
        });
    };

    const createNew = () => {
        history.push("/admin/students/new");
    }

    const actionsTemplate = (rowData) => {
        return<>
        <Button icon="pi pi-pencil" severity="warning" onClick={() => onEditClick(rowData)} />
        &nbsp; &nbsp;
        <Button icon="pi pi-trash" severity="danger"  onClick={() => onDeleteClick(rowData)} /> 
        </>;
    };

    return<> 
        {studentData.isLoading ? 
        <div className="form-box">
            <div className="fullHeight p-ai-center p-d-flex p-jc-center">
                <div className="m-3 px-3 py-4 px-sm-4 py-sm-5">
                    <ProgressSpinner />
                </div>
            </div>
        </div>

        :

        <div>
            <h4>Students</h4>
            <br /><br />
            <Button label="Create" onClick={createNew} />
            <br /><br />
            <div className="card">
                <DataTable value={studentData.data} dataKey="id" tableStyle={{ minWidth: '100%' }}>
                    <Column field="first_name" header="First Name"></Column>
                    <Column field="last_name" header="Last Name"></Column>
                    <Column field="username" header="Username"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="action" header="Actions" body={actionsTemplate}></Column>
                </DataTable>
            </div>
        </div>

        }

    </>
}