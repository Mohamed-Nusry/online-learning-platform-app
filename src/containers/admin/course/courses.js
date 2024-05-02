import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, getCourseDetails } from "../../../library/store/course";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';
import { toastMessage } from "../../../library/store/toast";
import { confirmDialog } from 'primereact/confirmdialog';
 

export default function CoursesPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    const courseData = useSelector(state => state.course)

    useEffect(() => {
        dispatch(getCourseDetails());
    }, [])

    useEffect(() => {
        if(courseData.isDeleteSuccess) {
            const message = {
                severity: "success",
                summary: "Deletion",
                detail: "Deleted Successfully!",
                life: 3000,
            };
            dispatch(toastMessage(message));
            dispatch(getCourseDetails());
        }
    }, [courseData.isDeleteSuccess])

    const onEditClick = (rowData) => {
        history.push(`/admin/course/edit/${rowData.id}`);
    };

    const onDeleteClick = (rowData) => {
        confirmDialog({
            message: 'Are you sure want to delete? This cannot be undone.',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => dispatch(deleteCourse(rowData.id)),
            reject: () => null
        });
    };

    const createNew = () => {
        history.push("/admin/courses/new");
    }

    const actionsTemplate = (rowData) => {
        return<>
        <Button icon="pi pi-pencil" severity="warning" onClick={() => onEditClick(rowData)} />
        &nbsp; &nbsp;
        <Button icon="pi pi-trash" severity="danger"  onClick={() => onDeleteClick(rowData)} /> 
        </>;
    };

    const descriptionTemplate = (data) => {
        if(data.description != null && data.description != '') {
            var string = data.description;
            var length = 100;
            var trimmedString = string.length > length ? string.substring(0, length - 3) + "..." : string;
    
            return trimmedString;
        }else {
            return 'No Description';
        }
       
    };

    return<> 
        {courseData.isLoading ? 
        <div className="form-box">
            <div className="fullHeight p-ai-center p-d-flex p-jc-center">
                <div className="m-3 px-3 py-4 px-sm-4 py-sm-5">
                    <ProgressSpinner />
                </div>
            </div>
        </div>

        :

        <div>
            <h4>Courses</h4>
            <br /><br />
            <Button label="Create" onClick={createNew} />
            <br /><br />
            <div className="card">
                <DataTable value={courseData.data} dataKey="id" tableStyle={{ minWidth: '100%' }}>
                    <Column field="name" header="Name"></Column>
                    <Column body={descriptionTemplate} header="Description"></Column>
                    <Column field="action" header="Actions" body={actionsTemplate}></Column>
                </DataTable>
            </div>
        </div>

        }


        
    </>
}