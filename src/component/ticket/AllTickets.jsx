import "./all-ticket.css";
import React, {useEffect} from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Global} from "../../Global";
const compId = localStorage.getItem("compId");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AllTickets() {

  const state = useContext(Global);
  const [allTicket, setAllTicket] = state.TicketApi.allTicket; 
  const [isEmployee, setEmployee] = state.userApi.isEmployee;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("")
  const [queryCol, setQueryCol] = useState("")
  const [loading, setLoading] = useState(false);
  const [isTicketEmpty, setTicketEmpty] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const classes = useStyles();

  console.log(isEmployee);

  useEffect(() => {
    setLoading(true);
    if(allTicket.length === 0){
      axios.get("http://127.0.0.1:8000/get_all_tickets/"+compId).then((res)=> {
      let dta = res.data;
      if(dta.length === 0){
        setTicketEmpty(true);
      }else{
        dta.forEach((ele, index ) => {
          ele.id = index
      })
      }
       
       setData(dta);
       setAllTicket(dta);
       setLoading(false);
      
   }).catch((err) => {
     alert("Could not fetch tickets")
     window.location.href("/");
   })
    }else{
      setData(allTicket);
      setLoading(false);
    }
   
  }, []);

  
  const handleChangeQueryCol = (e) => {
    e.preventDefault()
    setQueryCol(e.target.value)   
  };

  const handleChangeQueryString = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  const searchTicket = (e) => {
    e.preventDefault()

    if(query === "" || queryCol === "" ){
      setSearchResult(data);
    }else{
      const result = data.filter((ele) => {
        if(isNaN(ele[queryCol]) === false){
          console.log(isNaN(ele[queryCol]));
          return ele[queryCol].toString().includes(query.toString());
        }else{
          return ele[queryCol].toLowerCase().includes(query.toLowerCase());
        }
              
      })
      console.log(result);
      setSearchResult(result);
    }
  }

  const columns = [
    {field: "id", headerName: "ID", width: 135 },
    { field: "ticketId", headerName: "Ticket ID", width: 135 },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      
    },
    { field: "categoryId", headerName: "Category", width: 200 },
    { field: "priority", headerName: "Priority", width: 200 },
   
    {
      field: "creator",
      headerName: "Creator",
      width: 200,
    },

    {
        field: "dateClosed",
        headerName: "Date Closed",
        width: 200,
      },

      {
        field: "dateCreated",
        headerName: "Date Created",
        width: 200,
      },

      
      {
        field: "description",
        headerName: "Description",
        width: 300,
      },
      {
        field: "img",
        headerName: "Image",
        width: 300,
      },

      {
        field: "lastModified",
        headerName: "Last Modified",
        width: 200,
      },


    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
          {isEmployee === true ? <></>: (<Link to={"/edit-ticket/" + params.row.ticketId}>
              <button className="productListEdit">Edit</button>
            </Link>) }
            
            {
              isEmployee === true ? <></> : (
                <Link to={"/close-ticket/" + params.row.ticketId}>
                <button className="productListEdit">Close</button>
              </Link>
              )
            }
            
            <Link to={"/view-ticket/" + params.row.ticketId}>
              <button className="productListEdit">View</button>
            </Link>
           
          </>
        );
      },
    },
  ];

 

  return (
  <div className="all-ticket-class">

    {
      loading === true ? (<div>Loading... | Please wait</div>) : 
      isTicketEmpty ? (<div>No Tickets generated till now</div>)
      : (<>
      <div>
        <h2 style={{marginLeft: "auto", marginRight: "auto"}}>All Tickets Data</h2>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Fields</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={queryCol}
          onChange={handleChangeQueryCol}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="ticketId">Ticket ID</MenuItem>
          <MenuItem value="assignee">Assignee</MenuItem>
          <MenuItem value="categoryId">Category</MenuItem>
          <MenuItem value="creator">Creator</MenuItem>
          <MenuItem value="description">Description</MenuItem>
          <MenuItem value="lastModified">Last Modified</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} style={{width: "400px"}}>
        <TextField id="standard-basic" value={query} label="Enter Query Eg: creator" onChange={handleChangeQueryString}/>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" onClick={searchTicket} style={{marginTop: "8px",
        backgroundColor: "#032d42", color: "white"}}>Search</Button>
      </FormControl>
      </div>
        <div id="div1" >
      
        <div id="div3">
        
            <DataGrid
              rows={query < 1 ? data : searchResult }
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
              className="data-grid"
            />
        
      </div>
     
   
  </div>
  </>  )
    }

    
</div>
  );
}
