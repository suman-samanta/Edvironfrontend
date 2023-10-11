import { Link,useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function Header(props) {
    const {user}=useContext(Context);
    const navigate = useNavigate();
  
const signOut=()=>{
    localStorage.clear();
    window.location.replace('/');

}

   const handleLoginClick=()=>{
    navigate('/login');
   }

   const handleSignupClick=()=>{
    navigate('/signup')
   }

    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center ">
                  <Link to="/">  <a  className="logo d-flex align-items-center">
                        <span className="">Fees ManageMent</span>
                    </a></Link>
                  
                </div>

              

                <nav className="header-nav ms-auto">

                   {
                        !user &&

                        <div className="d-flex align-items-center" >

                        <button className="btn btn-primary" type="button" onClick={handleLoginClick} >Login</button>
                        <button className="btn btn-primary" type="button" onClick={handleSignupClick} >Sign Up</button>

                        </div>

                    }

                    {user && 
                    <ul className="d-flex align-items-center">

                     
                        <li className="nav-item dropdown pe-3">

                        <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                            <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                            <span className="d-none d-md-block dropdown-toggle ps-2">{user.email}</span>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{user.email}</h6>
                                <span>{user.role}</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            
                           
                           

                            <li onClick={()=>signOut()}>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </a>
                            </li>

                        </ul>
                        </li>

                        </ul>
                     }

                    

                        

                   

                    
                </nav>

                

            </header>
        </>
    )
}