import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { employeeDetailsActionCreator } from "../../../redux/slices/employeeList";
import { commentCreateActionCreator, commentListActionCreator, clearMessageCommentActionCreator, commentUpdateActionCreator, commentDeleteActionCreator } from "../../../redux/slices/comments";
import { useLocation } from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import DetailCard from "../../components/DetailCard";
import Comment from "../../components/Comment";

export default function ProfilePage() {
   const location = useLocation();
   const pathnameArray = location.pathname.split('/');
   const userId = pathnameArray[pathnameArray.length - 1];
   const profile = useSelector((state) => state.employeeData.profile);
   const messageData = useSelector((state) => state.commentsData.messageData);
   const comments = useSelector((state) => state.commentsData.list);
   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(employeeDetailsActionCreator({ userRef: userId }))
    dispatch(commentListActionCreator({ userRef: userId }))
   },[])

  const addCommentHandler = (data) => {
    dispatch(commentCreateActionCreator({userRef: userId, ...data}))
  }

  const updateCommentHandler = (data) => {
    dispatch(commentUpdateActionCreator(data))
  }

  const deleteCommentHandler = (data) => {
    dispatch(commentDeleteActionCreator(data))
  }

  useEffect(() => {
    if (messageData) {
      if (messageData?.code === 100) {
        toast.success(messageData?.message);
      } else {
        toast.error(messageData?.message);
      }
      dispatch(clearMessageCommentActionCreator());
      dispatch(commentListActionCreator({ userRef: userId }))
    }
  }, [messageData]);

  return <Wrapper>
    <ToastContainer style={{ top: '90px' }} />
     <div>
        <DetailCard text="Employee Details:" data={profile}/>
        <h2>Comments</h2>
        <Comment addHandler={addCommentHandler} updateHandler={updateCommentHandler} deleteHandler={deleteCommentHandler} data={comments}/>
    </div>
  </Wrapper>
}
