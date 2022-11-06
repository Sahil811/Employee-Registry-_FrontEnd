import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { employeeListActionCreator, employeeUpdateActionCreator, employeeDeleteActionCreator, clearMessageEmployeeActionCreator, employeeImportActionCreator } from "../../../redux/slices/employeeList";
import TableComponent from "../../components/Table"
import Wrapper from "../../components/Wrapper"

export default function ProfilePage() {

  return <Wrapper>
    <ToastContainer style={{ top: '90px' }} />
     <div>
       hello
    </div>
  </Wrapper>
}
