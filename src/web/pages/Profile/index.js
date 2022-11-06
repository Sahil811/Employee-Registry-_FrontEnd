import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { employeeDetailsActionCreator } from "../../../redux/slices/employeeList";
import { commentCreateActionCreator, commentListActionCreator } from "../../../redux/slices/comments";
import { useLocation } from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import DetailCard from "../../components/DetailCard";
import Comment from "../../components/Comment";

export default function ProfilePage() {
   const location = useLocation();
   const pathnameArray = location.pathname.split('/');
   const userId = pathnameArray[pathnameArray.length - 1];
   const profile = useSelector((state) => state.employeeData.profile);
   const comments = useSelector((state) => state.commentsData.list);
   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(employeeDetailsActionCreator({ userRef: userId }))
    dispatch(commentListActionCreator({ userRef: userId }))
   },[])

   console.log(comments, "com")

  return <Wrapper>
    <ToastContainer style={{ top: '90px' }} />
     <div>
        <DetailCard text="Employee Details:" data={profile}/>
        <h2>Comments</h2>
        <Comment data={comments}/>
    </div>
  </Wrapper>
}
