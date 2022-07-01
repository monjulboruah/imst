import "./all-assignee.css";
import React, {useEffect} from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function AllTickets() {
  const [data, setData] = useState([]);
  const {ticketId} = useParams();
  const compId = localStorage.getItem("compId");

  useEffect(() => {
   axios.get("http://127.0.0.1:8000/all_contacts_details/"+compId).then((res)=> {
      let dta = res.data;
       dta.forEach((ele, index ) => {
           ele.id = index
       })
       setData(dta);
       
   }).catch((err) => {
     alert("Could not fetch assignee");
     window.location.href = "/"
   })
  }, []);


  const assignTicket = (contact_Id) => {

    axios.get("http://127.0.0.1:8000/reassigne_ticket/"+ticketId+"/"+contact_Id).then((res)=>{
      alert("Ticket assigned successfully");
      window.location.href ="/all-incidents";
    }).catch((err)=> {
      alert("Could not assigned ticket");
      console.log(err);
    })

  } 

  const columns = [
    {field: "id", headerName: "ID", width: 135 },
    { field: "contact_id", headerName: "Contact ID", width: 135 },
    {
      field: "full_name",
      headerName: "Full Name",
      width: 150,
      
    },
    { field: "role", headerName: "Role", width: 200 },
    
    

    {
        field: "phone_number",
        headerName: "Phone Number",
        width: 200,
      },
      

      {
        field: "active",
        headerName: "Active",
        width: 200,
      },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
              <button className="productListEdit" onClick={(e) => assignTicket(params.row.contact_id)}>Assign</button>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {
        data.length === 0 ? (<div>Loading... | Please wait</div>) : (
          <div id="div1" >
      
          <div id="div3">
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={4}
            checkboxSelection
          />
         
         </div>
         </div>
        )
      }
     
    </div>
  );
}
