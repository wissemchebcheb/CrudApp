import React, { useContext, useState } from 'react'
import { NavLink, json , useNavigate} from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const {udata, setUdata}= useContext(adddata);
    const navigate = useNavigate(""); 

     const [inpval,setINP]= useState({
        name:"",
        email:"",
        age:"",
        mobile:"",
        work:"",
        add:"",
        desc:""
     })


    const setdata=(e)=>{
             console.log(e.target.value);
             const {name,value}= e.target;
             setINP((preval)=>{
                return{
                    ...preval,
                    [name]: value
                }
             })      
    }

const addinpdata = async(e)=>{
    e.preventDefault();

    const {name, email, age, mobile, work, add, desc} = inpval;
    const res = await fetch("/register", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            name, email, age, mobile, work, add, desc
        })
    })

    const data = await res.json();
    console.log(data);

    if(res.status === 422 || !data){
        alert("error")
        console.log("error");
    }else{
        // alert("data added")
        navigate("/")
        setUdata(data)
        console.log("data added");
    }
}


    return (
        <div className='container' style={{marginTop:"5%"}}>
            <NavLink to="/"> Back to the home page</NavLink>


            <form className="mt-5">
                    <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label className="form-label">Name</label>
                        <input type="text" onChange={setdata}  value={inpval.name} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label  className="form-label">email</label>
                        <input type="email" onChange={setdata}  name="email" value={inpval.email} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label  className="form-label">age</label>
                        <input type="text"  onChange={setdata}  name="age" value={inpval.age} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label  className="form-label">Mobile</label>
                        <input type="number" onChange={setdata}  name="mobile" value={inpval.mobile} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label  className="form-label">Work</label>
                        <input type="text"  onChange={setdata}  name="work"  value={inpval.work}className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label  className="form-label">Address</label>
                        <input type="text"  onChange={setdata}  name="add" value={inpval.add} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label  className="form-label">Description</label>
                        <textarea name="desc" onChange={setdata}   value={inpval.desc} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register