import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Header from "../../commons/Header";
import axios from "axios";

import { Form } from 'react-bootstrap';
import Menubar from "../../commons/Menubar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl =require("../../config/default");


export default function DisburseAmount(){

    const[schools,setSchools]=useState([]);
    const[school,setSchool]=useState();
    const[schoolName,setSchoolName]=useState();

    const[amount,setAmount]=useState();
    const[paymentMode,setPaymentMode]=useState();
    const[desc,setDesc]=useState();

    useEffect(()=>{
        const getSchools=async()=>{
          const result=await axios.get(`${baseUrl}/api/getAllSchools`);
          setSchools(result.data);

        }

        getSchools();
    },[])


    const handleOptionClick = (option,name) => {
        console.log(option);
        console.log(name);
        setSchool(option);
        setSchoolName(name)
        
      };



    const handleSchool=async(e)=>{
        console.log(e);
        const id=e.target.value;

        if(id!=='empty'){
          const result=await axios.get(`${baseUrl}/api/getSchool/${id}`)
          console.log(result.data);
          if(result.data){
            setSchool(result.data._id);
            setSchoolName(result.data.name);
          }else{
            toast.error("School Not exist");
          }
        }else{
            toast.error("Please select a proper school");
        }
      
    }

   

    const handleSubmit=async()=>{
        const newTransaction={
            school:school,
            schoolName:schoolName,
            status:"FALSE",
            amount:amount,
            payment_mode:paymentMode,
            desc:desc
        }

        console.log(newTransaction);
       const result=await axios.post(`${baseUrl}/api/createTransaction`,newTransaction)
       .then(res=>{
        toast.success("New Transaction is initiated")
       }
        
       ).catch(err=>{
        toast.error(err.response.data);
        console.log(err);
       })
    }
    
 
    return(
        <>
            <Header />
            <Menubar/>
            <main id="main" className="main">

<div className="pagetitle">
  <h1>Disburse Amount in School</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a>Home</a></li>
     
    </ol>
  </nav>
</div>

<section className="section dashboard">
           <div className="row">
           <div className="wrap">
                <div className="form-group">
                  <ToastContainer />
                </div>
                <div className="container-fluid">
                  <div className="hotel-form">
                    <div className="container">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-section">
                           
                          <div className="row">
                                <div className="col-md-4">
                                  <div className="mb-3">
                                  <label className="form-small-h">School</label>
                                        <select 
                                           value={school}
                                           onChange={(e)=>{handleSchool(e)}}
                                            className="form-control"
                                            name="school" >
                                            <option value={"empty"}>Select School Name</option>
                                            {schools.map((element,index)=>{

                                                 
                                            return  <option key={index} value={element._id}  onClick={() => handleOptionClick(element,element.name)}>
                                              {element.name} 
                                            </option>
                                            })}
                                        </select>
                                  </div>
                            </div>


                            <div className="col-md-2">
                                  <div className="mb-3">
                                  <label className="form-small-h">Amount</label>

                                    <input type="number" className="form-control" placeholder="0"
                                     onChange={e=>setAmount(e.target.value)}
                                      />
                                    <div className="valid-feedback">Looks Good</div>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                                  <div className="mb-3">
                                  <label className="form-small-h">Payment Mode</label>
                                        <select 
                                            onChange={e=>setPaymentMode(e.target.value)}
                                            className="form-control"
                                            name="school" >

                                            <option>Select Payment Mode</option>
                                            <option>CASH</option>
                                            <option>CHEQUE</option>
                                            <option>ONLINE</option>
                                        </select>
                                  </div>

                            </div>

                            <div className="col-md-6">
                                  <div className="mb-3">
                                  <label className="form-small-h">Reason for Payment</label>

                                  <input type="text" className="form-control" placeholder="Description"
                                     onChange={e=>setDesc(e.target.value)}
                                      />
                                    <div className="valid-feedback">Looks Good</div>
                                      
                                  </div>

                            </div>
                            <div className="text_center">
                            <button className="btn btn-primary"  type="submit" onClick={handleSubmit}>Submit </button>
                            </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>     

            </div>
        </section>


</main>
        


        </>
    )
}