import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { apiConnector } from "../../services/apiConnector";
import { IoIosArrowDropdownCircle ,  IoMdArrowDropdown} from 'react-icons/io'
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { ProfileDropDown } from "../cors/Auth/ProfileDropDown";

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const [subLinks , setSubLinks] = useState([]);
    const fetchSubLinks = async() => {
        try{
            const result = await apiConnector("GET" , categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }

    useEffect( () => {
        fetchSubLinks();
    },[])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath(route , location.pathname)
    }

  return (
    <div className="h-14 flex items-center border-b-[1px] border-b-richblack-700 bg-richblack-800">
        <div className="flex w-11/12 max-w-[1260px] items-center justify-between mx-auto">
           
            <Link to='/' >
                <img src={logo} loading='lazy' className="h-[35px]"/>
            </Link>

            <nav>
                <ul className="flex gap-x-6 items-center">
                    {
                        NavbarLinks.map((link , index) => (
                            <li key={index}>
                                {
                                    link.title === 'Catalog' ? 
                                    (<div className="text-richblack-25 flex items-center gap-x-1 group relative">
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle />

                                        <div className="invisible absolute top-[50%] translate-y-[29px] translate-x-[-45%]
                                        flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                        transition-all duration-200 group-hover:visible gap-y-2
                                        lg:w-[300px] w-[100px]">

                                            <div className="absolute w-6 h-6 -top-2 rotate-45 rounded bg-richblack-5 right-[28%] -z-[20]"></div>
                                            {
                                                subLinks.length ? 
                                                    subLinks.map((value , index) => (
                                                        <Link to={`/${value.name}`} key={index}>
                                                            <p className="text-richblack-700 bg-richblack-100 rounded-md p-2">{value.name}</p>
                                                        </Link>
                                                    )): <div></div>
                                            }
                                        </div>
                                    </div>) : 
                                    (<Link to={link?.path}>
                                        <p  className={`${matchRoute(link?.path) ? "text-yellow-25" :
                                                "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                    </Link>)
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            <div className="flex gap-x-4">
                {
                    token === null && (
                        <Link to="/login">
                            <button className="border-richblack-700 bg-richblack-900 p-[8px]
                                                rounded-md text-richblack-50">
                                Login
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className="border-richblack-700 bg-richblack-900 p-[8px]
                                                rounded-md text-richblack-50">
                                Signup
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && (<ProfileDropDown totalItems={totalItems} user={user}/>)
                }
            </div>

        </div>
    </div>
  )
}

export default Navbar