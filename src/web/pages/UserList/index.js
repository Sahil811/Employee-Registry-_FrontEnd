import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { employeeListActionCreator, employeeUpdateActionCreator, employeeDeleteActionCreator, clearMessageEmployeeActionCreator, employeeImportActionCreator } from "../../../redux/slices/employeeList";
import TableComponent from "../../components/Table"
import Wrapper from "../../components/Wrapper"
import { ADMIN_USER_ACTIONS } from "../../constants";
import UploadButtons from "../../components/UploadButton";

export default function UserList() {
  const employeeData = useSelector((state) => state.employeeData.list);
  const messageData = useSelector((state) => state.employeeData.messageData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeListActionCreator())
  }, [])


  const tableHeader = ["No.", "User Name", "Email", "First Name", "Last Name", "Address", "Role"]

  const updateEmployeeHandler = (data) => {
     dispatch(employeeUpdateActionCreator(
      {
        userRef: data.id,
        ...data
      }
     ))
  }

  const deleteEmployeeHandler = (id) => {
    dispatch(employeeDeleteActionCreator(
     {
       userRef: id,
       action: ADMIN_USER_ACTIONS.DELETED
     }
    ))
 }

 const importEmployeeHandler = (file) => {
    if(file) {
      dispatch(employeeImportActionCreator({employeeCsv: file}))
    }
 }

  useEffect(() => {
    if (messageData) {
      if (messageData?.code === 100) {
        toast.success(messageData?.message);
      } else {
        toast.error(messageData?.message);
      }
      dispatch(clearMessageEmployeeActionCreator());
      dispatch(employeeListActionCreator())
    }
  }, [messageData]);

  return <Wrapper>
    <ToastContainer style={{ top: '90px' }} />
    <div>
      <UploadButtons importHandler={importEmployeeHandler} text="Import Employee"/>
      <TableComponent deleteHandler={deleteEmployeeHandler} updateHandler={updateEmployeeHandler} data={employeeData} tableHeader={tableHeader}/>
    </div>
  </Wrapper>
}
