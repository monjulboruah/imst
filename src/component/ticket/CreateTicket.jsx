import React, { useState, useContext } from "react";
import axios from "axios";
import "./create-ticket.css";
import { Global } from "../../Global";
import Loading from "../../utils/Loading"

export default function CreateTicket() {
  
  const state = useContext(Global);

  const [ticketCategories] = state.TicketApi.ticketCategories;
  const [ticketPriority] = state.TicketApi.ticketPriority;
  const [ticketStatus] = state.TicketApi.ticketStatus;
  const [loading, setLoading] = useState(false)

  const[ticketData, setTicketData] = useState(
    {
      contact_id: parseInt(localStorage.getItem("userId")),
      pri_id: 0,
      status_id: 1,
      description: "",
      creator: parseInt(localStorage.getItem("userId")),
      summary: "",
      img: null,
      categoryId: 0,
      ip: ""
    }
  )

  const onChangePriorityId = (e) => {
    setTicketData({
      ...ticketData,
      pri_id: parseInt(e.target.value),
    })
  }

  const onChangeStatusId = (e) => {
    setTicketData({
      ...ticketData,
      status_id: parseInt(e.target.value),
    })
  }

  const onChangeCategoryId = (e) => {
    setTicketData({
      ...ticketData,
      categoryId: parseInt(e.target.value),
    })
  }

  const onchangeDescription = (e) => {
    setTicketData({
      ...ticketData,
      description: e.target.value,
    })
  }
   
  

  const onChangeSummary = (e) => {
    setTicketData({
      ...ticketData,
      summary: e.target.value
    })
  }

  const onChangeIp = (e) => {
    setTicketData({
      ...ticketData,
      ip: e.target.value
    })
  }

  const onChangeImage = (e) => {
    setTicketData({
      ...ticketData, 
      img: e.target.files[0]
    })
    
  }

  const createTicket = (e) => {
    e.preventDefault()

    setLoading(true);
    let form_data = new FormData();
    form_data.append('img', ticketData.img);
   // console.log(ticketData);
    axios
      .post("http://127.0.0.1:8000/generate_ticket" ,{
        
          contact_id : ticketData.contact_id,
          pri_id: ticketData.pri_id,
          status_id : ticketData.pri_id,
          description : ticketData.description,
          creator: ticketData.creator,
          summary : ticketData.summary,
          category_id: ticketData.categoryId,
          ip: ticketData.ip
          
          
      })
      .then(function (response) {
        
        let ticket_id = response.data[0];
        console.log(ticket_id);
        
        if(ticketData.img != null){
        let form_data = new FormData();
        form_data.append('img', ticketData.img);
        let url = "http://127.0.0.1:8000/t_img/"+ ticket_id;
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
         
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
        }
        alert("Ticket created successfully");
       // window.location.href = "/all-incidents";
        setLoading(false);
      })
      .catch((err) => {
        alert("Problems in server side");
        //window.location.href = "/create-ticket";
        console.log(err);
      });

   
   
    
  }
  return (
    <div className="newUser">
      {
        ticketCategories.length === 0 || ticketPriority.length === 0 || ticketStatus.length === 0 ? 
        (<div>Loading... | Please wait</div>):
        (
          <>
        <h1 className="newUserTitle">Create New Ticket</h1>
            <div className="newUserForm">
      

      <div className="newUserItem">
        <label>Contact Id</label>
        <input type="Number" value={ticketData.contact_id}/>
      </div>

      <div className="newUserItem">
        <label>Priority Level</label>
        <select className="newUserSelect" name="active" id="active" onChange={onChangePriorityId} required>
        <option>Select an option</option>
        {
          ticketPriority.map((ele, idx)=> {
            return(
              <option value={ele.priLevel} key={idx}>{ele.priDesc}</option>
            )
          })
        }
        </select>
       
      </div>
      <div className="newUserItem">
        <label>Category</label>

        <select className="newUserSelect" name="active" id="active" onChange={onChangeCategoryId} required>
            <option >Select an option</option>
        {
          ticketCategories.map((ele, idx)=> {
            return(
              <option value={ele.categoryId} key={idx}>{ele.categoryName}</option>
            )
          })
        }
        </select>
      </div>

      <div className="newUserItem">
        <label>Status Id</label>
        <select className="newUserSelect" name="active" id="active" onChange={onChangeStatusId} required>
        <option>Select an option</option>
        {
          ticketStatus.map((ele, idx)=> {
            return(
              <option value={ele.statusId} key={idx}>{ele.statusDesc}</option>
            )
          })
        }
        </select>
      </div>

      <div className="newUserItem">
        <label>Creator Id</label>
        <input type="Number" value={ticketData.creator}/>
      </div>

      <div className="newUserItem">
        <label>Description</label>
        <input type="text" placeholder="Description about the ticket" onChange={onchangeDescription} required />
      </div>

      <div className="newUserItem">
        <label>Summary</label>
        <input type="text" placeholder="Summary about the ticket" onChange={onChangeSummary} required />
      </div>

    <div  className="newUserItem">
    <label>Error Image</label>
        <input type="file"
        id="image"
        accept="image/png, image/jpeg"  
        onChange={onChangeImage} required/>
    </div>
      
     
      <div className="newUserItem">
        <label>Device ID</label>
        <input type="text" placeholder="abc123" onChange={onChangeIp} required />
      </div>
      <button className="newUserButton" onClick={createTicket}>Create</button>
    </div>
  
  </>
        ) 
      }
  </div> 
  );
}
