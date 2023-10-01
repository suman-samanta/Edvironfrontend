import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Header from "../../commons/Header";
import axios from "axios";
import './index.css';
import { Form } from 'react-bootstrap';

const baseUrl =require("../../config/default");


export default function Home(){
    // const PF=`${baseUrl}/images/noimg.jpg`;
    const [properties,setProperties]=useState([]);
    const [cityName,setCityName]=useState(null);
    const[availableDate,setAvailableDate]=useState(null);
    const [propertyType,setPropertyType]=useState(null);
    const [minPrice,setMinPrice]=useState(0);
    const [maxPrice,setMaxPrice]=useState(15000);
    const [validError,setValidError]=useState(false);

    const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Bangalore', 'Hyderabad','Ahmedabad','New York', 'Los Angeles', 'Chicago', 'Houston'];

    useEffect(()=>{
        const getProperties=async()=>{
            const result=await axios.get(`${baseUrl}/api/getAllProperty`)

          

            setProperties(result.data);

            console.log(result.data);
        }

        getProperties();
    },[])

    const handlePropertyType=(e)=>{
        const value=e.target.value
        if(value=="4 BHK"){
            setPropertyType(4);
        }else if(value=="3 BHK"){
            setPropertyType(3);
        }else if(value=="2 BHK"){
            setPropertyType(2);
        }else if(value=="1 BHK"){
            setPropertyType(1);
        }
    }

    const handleFilter=async()=>{

       
        if(propertyType==null||cityName==null||availableDate==null){
            setValidError(true);
        }

        if(propertyType!==null&&cityName!==null&&availableDate!==null){
            const filter={
                cityName,
                propertyType,
                minPrice,
                maxPrice,
                availableDate
            }
            const result=await axios.post(`${baseUrl}/api/filter/property`,filter);
            console.log(result.data);
            setProperties(result.data);
        }

        console.log(validError);
    }
 
    return(
        <>
            <Header />
            <main id="main" className="main">

<div className="pagetitle">
  <h1>Search Properties For Rent</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a>Home</a></li>
     
    </ol>
  </nav>
</div>

<section className="section dashboard">
           <div className="row">

                 <div className="col-md-2">
                                  <div className="mb-3">
                                    <label className="form-small-h">City<span className="color-red"></span></label>
                                    <select 
                                    onChange={e =>setCityName(e.target.value)} 
                                      className="form-control">
                                      <option>Select Location   </option>
                                      {cities.map((city, index) => (
                                        <option key={index} value={city}>
                                            {city}
                                        </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>


                                <div className="col-md-2">
                                  <div className="mb-3">
                                    <label className="form-small-h">Available From: <span className="color-red"></span></label>
                                    <input type="date" className="form-control" placeholder="Select Available From"
                                      onChange={e => setAvailableDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    />
                                    
                                  </div>
                                </div>

                                <div className="col-md-3">
                                  <div className="mb-3">
                    <Form.Group controlId="priceRange">
                    <Form.Label>Price Range</Form.Label>
                    <Form.Control
                    type="range"
                    value={minPrice}
                    min={0}
                    max={maxPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    />
                    <Form.Control
                    type="range"
                    value={maxPrice}
                    min={0}
                    max={15000}
                    onChange={(e) =>setMaxPrice(parseInt(e.target.value)) }
                    />
                    <div>
                    Min Price:{minPrice}
                    <br />
                    Max Price: {maxPrice}
                    </div>
                </Form.Group>
                </div>
                </div>


                <div className="col-md-2">
                                  <div className="mb-3">
                                    <label className="form-small-h">Property Type<span className="color-red"></span></label>
                                    <select 
                                    onChange={e =>handlePropertyType(e)} 
                                      className="form-control">
                                      <option>Select Property Type</option>
                                      <option>1 BHK</option> 
                                      <option>2 BHK</option>
                                      <option>3 BHK</option> 
                                      <option>4 BHK</option> 

                                    </select>
                                  </div>
                                </div>

                                <div className="col-md-3">
                                  <div className="mb-3">
                         <div className="d-flex align-items-center" >        

                          <button className="btn btn-primary" type="button" onClick={handleFilter} >Apply</button>
                        </div>
                        </div>
                        </div>
                        {validError?<label for="yourPassword" className="form-label color-red ">Please Enter all the Filter procedure!!</label>:null}

            </div>
        </section>


</main>
        

        <section className="section dashboard">
        <div className="row">


        {properties.map((p)=>{
            return(
                <div className="col-md-4">

              <div className="post">
                
                <img className="postImg" src="assets/img/noimg.jpg"alt="Property Image"/>
              
                
                <div className="postInfo">
                    
                    <span className="postTitle">
                           {p.propertyName}
                        </span>
                    <span className="propertylocation">{p.location}</span>
                    <span className="breadcrumb">
                        Price -{p.price}
                        </span>

                    <div className="propertyPerInfo">

                    <div className="mb-1 left">
                    BedRoom-{p.bedRoom}
                   
                    </div>
                    <div className="mb-1">
                    BathRoom-{p.bathRoom}
                   
                    </div>

                    <div className="mb-1">
                    Total Area-{p.areaInMeterSq}mt2
                   
                    </div>

                    </div>
                </div>
                <p className="propertyDesc">
                  property owner-{p.propertyOwner}
                </p>
            </div>
             
           
         </div>
            )
            
        })}
        

        
        </div>
        </section>


        </>
    )
}