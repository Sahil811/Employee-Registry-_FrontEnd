import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { employeeListActionCreator, employeeUpdateActionCreator, clearMessageEmployeeActionCreator } from "../../../redux/slices/employeeList";
import TableComponent from "../../components/Table"
import Wrapper from "../../components/Wrapper"

export default function UserList() {
  const employeeData = useSelector((state) => state.employeeData.list);
  const messageData = useSelector((state) => state.employeeData.messageData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeListActionCreator())
  }, [])


  const tableHeader = ["No.", "User Name", "Email", "First Name", "Last Name", "Address", "Role"]

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

  const updateEmployeeHandler = (data) => {
     dispatch(employeeUpdateActionCreator(
      {
        userRef: data.id,
        ...data
      }
     ))
  }

  return <Wrapper>
    <ToastContainer style={{ top: '90px' }} />
    <div>
      <TableComponent update={updateEmployeeHandler} data={employeeData} tableHeader={tableHeader}/>
    </div>
  </Wrapper>
}
