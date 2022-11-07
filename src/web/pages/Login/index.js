import { useEffect } from "react";
import Cookie from 'js-cookie';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { userLoginActionCreator, clearMessageUserActionCreator } from "../../../redux/slices/user";
import "./index.scss"

// input fields
import Input from "../../UI/InputFields/input"; 
import SubmitButton from "../../UI/InputFields/submitButton";
import Password from "../../UI/InputFields/password";


export default function Login() {
  const navigate = useNavigate()
  const messageData = useSelector((state) => state?.userData?.messageData);
  const dispatch = useDispatch();

  useEffect(() => {
    if(Cookie.get('token')) {
      navigate('/userList')
    }
  }, [])

  //   yup validation schema
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .required("No password provided.")
    })
    .required();

  // react-hooks-form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  // form submit handler
  const onSubmit =  async ({ email, password}) => {
     dispatch(userLoginActionCreator({ email, password}));
  };

  useEffect(() => {
    if (messageData) {
      if (messageData?.code === 100) {
        toast.success(messageData?.message);
        setTimeout(() => { navigate("/userList") }, 2000)
      } else {
        toast.error(messageData?.message);
      }
      dispatch(clearMessageUserActionCreator());
    }
  }, [messageData]);

  return (
      <div className="loginPage"> 
         <ToastContainer style={{ top: '90px' }} />
         <div className="form-container" style={styleSheet.container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={styleSheet.formStyle}>
               <Input
                name="email"
                register={register}
                error={errors.email?.message}
                placeholder={"User Email"}
                />
                <Password
                name="password"
                register={register}
                error={errors.password?.message}
                placeholder={"Password"}
                />
               <SubmitButton type="submit"/>
               <div>Don't have an account?</div>
               <Button onClick={() => navigate('/signup')} variant="outlined">Sign up</Button>
            </form>
        </div>
     </div>
  );
}
const styleSheet = {
  container: {
    display: "flex",
    flexDirection: "column",
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: "6px",
    padding: "20px",
    margin: "50px",
    width: "500px",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    border: "none",
    outline: "none",
    width: "200px",
    height: "50px",
    borderRadius: "6px",
  },
};
