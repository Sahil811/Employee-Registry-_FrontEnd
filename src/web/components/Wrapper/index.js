
import Header from "../../layout/Header";
import "./index.scss"

export default function Wrapper({children}) {
  return <>
    <Header />
    <div className="wrapper__children">
       {children}
    </div>
  </>
}
