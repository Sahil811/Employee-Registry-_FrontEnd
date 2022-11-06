import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { employeeDetailsActionCreator } from "../../../redux/slices/employeeList";
import { useLocation } from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import DetailCard from "../../components/DetailCard";

export default function ProfilePage() {
   const location = useLocation();
   const pathnameArray = location.pathname.split('/');
   const userId = pathnameArray[pathnameArray.length - 1];
   const profile = useSelector((state) => state.employeeData.profile);
   const messageData = useSelector((state) => state.employeeData.messageData);
   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(employeeDetailsActionCreator({ userRef: userId }))
   },[])

  return <Wrapper>
    <ToastContainer style={{ top: '90px' }} />
     <div>
        <DetailCard text="Employee Details:" data={profile}/>
    </div>
  </Wrapper>
}
