import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Header from "../../commons/Header";
import axios from "axios";

import { Form } from 'react-bootstrap';
import Menubar from "../../commons/Menubar";



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const baseUrl =require("../../config/default");


export default function Home(){

  const[transactions,setTransactions]=useState([]);
  const[previousTransactions,setPreviousTransactions]=useState([]);
   
    useEffect(()=>{
        const getTransactionForReconcile=async()=>{
          const result=await axios.get(`${baseUrl}/api/transactionforReconcile`)
          .then(res=>{
            setTransactions(res.data);
            console.log(res.data);
          }).catch(err=>{
            toast.error(err.response.data);
          })
        }

        getTransactionForReconcile();
    },[])

    useEffect(()=>{
      const getTransactionForReconcile=async()=>{
        const result=await axios.get(`${baseUrl}/api/reconciledTransaction`)
        .then(res=>{
          setPreviousTransactions(res.data);
          console.log(res.data);
        }).catch(err=>{
          toast.error(err.response.data);
        })
      }

      getTransactionForReconcile();
  },[transactions])


    const reconcileTransaction=async(transactionId)=>{
      
      const result=await axios.put(`${baseUrl}/api/reconcileTransaction/${transactionId}`)
      .then(res=>{
        toast.success("Transaction has been ReConciled")
        setTransactions(res.data);
      }).catch(err=>{
        toast.error(err.response.data);
        console.log(err);
      })

    }

    const declineTransaction=async(transactionId)=>{
      const result=await axios.put(`${baseUrl}/api/reconcileTransaction/${transactionId}`)
      .then(res=>{
        toast.success("Transaction has Deleted")
        setTransactions(res.data);
      }).catch(err=>{
        toast.error(err.response.data);
        console.log(err);
      })
    }
 
    return(
        <>
            <Header />
            <Menubar/>
            <main id="main" className="main">

            <div className="form-group">
                  <ToastContainer />
                </div>

                <div className="pagetitle">
                  <h1>Reconcile Transaction</h1>
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a>Home</a></li>
                    
                    </ol>
                  </nav>
                </div>

                <section className="section dashboard">
                 <div className="row">
                <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <h5 class="card-title">Reconcile Transaction Here</h5>



                <table class="table">
                <thead>
                  <tr>
                  
                    <th scope="col">School Name</th>
                    <th scope="col">Money Disburesed</th>
                    <th scope="col">Payment Mode</th>
                    <th scope="col">Reason For Disbursement</th>

                    <th scope="col">update</th>

                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction)=>{
                    return <tr>
                    <th scope="row">{transaction.schoolName}</th>
                    <td>{transaction.amount}</td>
                    <td>{transaction.payment_mode}</td>
                    <td>{transaction.desc}</td>

                      <td><a className="icon" href="#" data-bs-toggle="dropdown"><a href="" title="Edit Booking">&#9998;</a></a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li><a  className="dropdown-item" onClick={()=>reconcileTransaction(transaction._id)} >Reconcile Transaction</a></li>

                          <li><a  className="dropdown-item" onClick={()=>declineTransaction(transaction._id)} >Decline Transaction Request</a></li>
                          
                        </ul></td>
                    </tr>
                  })}
                </tbody>
                </table>

                </div>
                </div>

                </div>

                
                   

            </div>


      
        </section>


        <section className="section dashboard">
                 <div className="row">
                <div class="col-lg-12">
                <div class="card">
                <div class="card-body">
                <h5 class="card-title">Previously Reconciled Transaction</h5>



                <table class="table">
                <thead>
                  <tr>
                  
                    <th scope="col">School Name</th>
                    <th scope="col">Money Disburesed</th>
                    <th scope="col">Payment Mode</th>
                    <th scope="col">Reason For Disbursement</th>

                 

                  </tr>
                </thead>
                <tbody>
                  {previousTransactions.map((transaction)=>{
                    return <tr>
                    <th scope="row">{transaction.schoolName}</th>
                    <td>{transaction.amount}</td>
                    <td>{transaction.payment_mode}</td>
                    <td>{transaction.desc}</td>

                     
                    </tr>
                  })}
                </tbody>
                </table>

                </div>
                </div>

                </div>

                
                   

            </div>


      
        </section>


</main>
        


        </>
    )
}