import "./create-ticket.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Global } from "../../Global";

export default function EditTicket() {
  const state = useContext(Global);
  const [priority] = state.DepartmentApi.departmentPriority;
  const [userDetails] = state.userApi.userDetails;
  const [ticketStatus] = state.TicketApi.ticketStatus;
  const [loading, setLoading] = useState(false);

  const {ticketId} = useParams();

  const [ticketData, setTicketData] = useState({
    ticket_id: ticketId,
    status_id:0,
    priId:0,
    assignee_id:0,
    archiveDate: "4/04/2022",
    defaultStatusId: 0,
    defaultPriId: 0,
    defaultAssigneeId: 0,
  });


  useEffect(() => {

    setLoading(true);
    axios.get("http://127.0.0.1:8000/get_ticket/"+ticketId)
    .then((res) => {
        setTicketData({
            status_id: res.data.statusId,
            priId: res.data.priority,
            assignee_id: res.data.assignee,
            archiveDate: res.data.archiveDate,
            defaultStatusId: res.data.statusId,
            defaultPriId: res.data.priority,
            defaultAssigneeId: res.data.assignee,
        })
        setLoading(false);

    }).catch((err)=> {
        alert("Could not fetch ticket data | Problems in server");
        window.location.href("/all-incidents");
        console.log(err);
    })

  }, [])

  const onChangeArchiveDate = (e) => {
    setTicketData({
      ...ticketData,
      archiveDate: e.target.value,
    })
  }

  const onChangeAssignee = (e) => {
    setTicketData({
      ...ticketData,
      assignee_id : e.target.value,
    })
  }
 
  const onChangeStatus = (e) => {
    setTicketData({
      ...ticketData,
      status_id: e.target.value,
    })
  }

  const onChangePriority = (e) => {
    setTicketData({
      ...ticketData,
      priId: e.target.value,
    })
  }


  const onSubmit = (e) => {
    e.preventDefault();

    let {
        ticket_id,
        status_id,
        priId,
        assignee_id,
        archiveDate,
    } = ticketData;

    axios
      .post("http://127.0.0.1:8000/update_ticket", {
        ticket_id: ticketId,
        status_id,
        priId,
        assignee_id,
        
      })
      .then(function (response) {
        window.location.href = "/all-incidents";
        alert("Updated ticket successfully ");
      })
      .catch((err) => {
        alert("Problems in server");
        console.log(err);
      });
  };


  return (


    <div className="newUser">
      {
        loading === true ||  priority.length === 0 || userDetails.length === 0 || ticketStatus.length === 0 ? 
          (
            <div>Loading... | Please wait</div>
          ):
          (
            <>

<h3 className="newUserTitle">Update Ticket</h3>
      <div className="newUserForm">
        <div className="newUserItem">
          <label>Status</label>

          <select
            className="newUserSelect"
            name="status"
            id="status"
            onChange={onChangeStatus}
            required
          >
             
              {ticketStatus.map((ele, index) => {
                  if(ticketData.defaultStatusId === ele.statusId){
                      return(
                        <option value={ele.statusId} key={index} selected>
                        {ele.statusDesc}
                      </option>
                      )
                  }else{
                    return (
                        <option value={ele.statusId} key={index}>
                          {ele.statusDesc}
                        </option>
                      );
                  }
              
            })}
          </select>
          
        </div>


        <div className="newUserItem">
          <label>Priority</label>

          <select
            className="newUserSelect"
            name="priority"
            id="priority"
            onChange={onChangePriority}
            required
          >
             
              {priority.map((ele, index) => {
                  if(ticketData.defaultPriId === ele.priLevel){
                      return(
                        <option value={ele.priLevel} key={index} selected>
                        {ele.priDesc}
                      </option>
                      )
                  }else{
                    return (
                        <option value={ele.priLevel} key={index}>
                          {ele.priDesc}
                        </option>
                      );
                  }
              
            })}
          </select>
          
        </div>

        <div className="newUserItem">
          <label>Assignee</label>

          <select
            className="newUserSelect"
            name="assignee"
            id="assignee"
            onChange={onChangeAssignee}
            
          >
             
              {userDetails.map((ele, index) => {
                  if(ticketData.defaultAssigneeId === ele.contact_id){
                      return(
                        <option value={ele.contact_id} key={index} selected>
                        {ele.full_name}
                      </option>
                      )
                  }else{
                    return (
                      <option value={ele.contact_id} key={index}>
                      {ele.full_name}
                    </option>
                      );
                  }
              
            })}
          </select>
          
        </div>

        <div className="newUserItem">
          <label>Archive Date</label>
          <input
            type="text"
            value={ticketData.archiveDate}
            placeholder={ticketData.archiveDate}
            onChange={onChangeArchiveDate}
            required
          />
        </div>

        <div className="newUserItem">
          <label>Comment</label>
          <input
            type="text"
            
            placeholder= "Comment about ticket"
            
            required
          />
        </div>

        <button className="newUserButton" onClick={onSubmit}>
          Update
        </button>
      </div>
            </>
          )
      }
      
    </div>
  );
}
