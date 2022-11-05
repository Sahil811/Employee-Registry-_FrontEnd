import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import "./index.scss"

// input fields
import Input from "../../UI/InputFields/input";
import SubmitButton from "../../UI/InputFields/submitButton";
import Password from "../../UI/InputFields/password";


export default function Signup() {
  const navigate = useNavigate()
  //   yup validation schema
  const schema = yup
    .object({
      email: yup.string().email().required(),
      userName: yup.string().required(),
      role: yup.string().required(),
      address: yup.string().required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
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
      userName: "",
      role: "",
      address: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    mode: "onBlur",
  });

  // form submit handler
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
      <div className="SignUpPage">
         <div className="form-container" style={styleSheet.container}>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={styleSheet.formStyle}>
               <Input
                name="email"
                register={register}
                error={errors.email?.message}
                placeholder={"User Email"}
                />
               <Input
                name="userName"
                register={register}
                error={errors.userName?.message}
                placeholder={"User Name"}
                />
                <Input
                name="firstName"
                register={register}
                error={errors.firstName?.message}
                placeholder={"First Name"}
                />
                <Input
                name="lastName"
                register={register}
                error={errors.lastName?.message}
                placeholder={"Last Name"}
                />
                <Input
                name="role"
                register={register}
                error={errors.role?.message}
                placeholder={"Role"}
                />
                <Input
                name="address"
                register={register}
                error={errors.address?.message}
                placeholder={"Address"}
                />
                <Password
                name="password"
                register={register}
                error={errors.password?.message}
                placeholder={"Password"}
                />
               <SubmitButton type="submit"/>
               <Button onClick={() => navigate('/login')} variant="outlined">Login</Button>
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
