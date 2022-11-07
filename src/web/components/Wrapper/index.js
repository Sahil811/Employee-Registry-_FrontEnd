
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie';
import Header from "../../layout/Header";
import "./index.scss"

export default function Wrapper({children}) {
  const navigate = useNavigate()
  useEffect(() => {
    if(!Cookie.get('token')) {
      navigate('/')
    }
  }, [])

  return <>
    <Header />
    <div className="wrapper__children">
       {children}
    </div>
  </>
}
