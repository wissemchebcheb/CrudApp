import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'
import '../App.css';


import { CSSTransition } from 'react-transition-group';



const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const { updata, setUPdata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);



    const getdata = async () => {

        const res = await fetch("/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])



    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }

    useEffect(() => {
        if (udata) {
            const timeoutId = setTimeout(() => {
                setUdata(null);
            }, 5000); // 5 seconds

            return () => clearTimeout(timeoutId);
        }
    }, [udata]);

    useEffect(() => {
        if (updata) {
            const timeoutId = setTimeout(() => {
                setUPdata(null);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [updata]);

    useEffect(() => {
        if (dltdata) {
            const timeoutId = setTimeout(() => {
                setDLTdata(null);
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [dltdata]);

    

    return (

        <>
           
           <CSSTransition
    in={udata !== null}
    timeout={500}
    classNames="alert-fade"
    unmountOnExit
>
    <div className="alert alert-success" role="alert">
        <strong>{udata?.name}</strong> added successfully!
    </div>
</CSSTransition>

<CSSTransition
    in={updata !== null}
    timeout={500}
    classNames="alert-fade"
    unmountOnExit
>
    <div className="alert alert-success" role="alert">
        <strong>{updata?.name}</strong> updated successfully!
    </div>
</CSSTransition>

<CSSTransition
    in={dltdata !== null}
    timeout={500}
    classNames="alert-fade"
    unmountOnExit
>
    <div className="alert alert-danger" role="alert">
        <strong>{dltdata?.name}</strong> deleted successfully!
    </div>
</CSSTransition>





            <div className='mt-5'>
                <div className='container'>

                    <div>
                    <h1 style={{ fontWeight: 600 }}>Users list</h1>
                    </div>
                    <div className="add_btn mt-2 mb-2">
                    
                        <NavLink to="/register" className='btn btn-primary'>Add data</NavLink>
                        
                    </div>

                    <table className="table-striped mt-5" style={{boxShadow:"box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important"}}>

                        <thead>
                            <tr className="custom-backgournd-color">
                                <th scope="col">Id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-between">

                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}>  <button className='btn btn-primary'><ModeEditIcon /></button></NavLink>
                                                    <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>

                     

                </div>

            </div>



          

       
        </>
    )
}




export default Home