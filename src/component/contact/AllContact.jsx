import "./all-contact.css";
import React, {useEffect, useContext} from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";
import {Global} from "../../Global"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AllContact() {
  const classes = useStyles();
  const state = useContext(Global);
  const [data, setData] = useState([]); 
  const compId = localStorage.getItem("compId");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [isContactEmpty, setIsContactEmpty] = useState(false)
  const [isAdmin] = state.userApi.isAdmin;
  const [query, setQuery] = useState("")
  const [queryCol, setQueryCol] = useState("")
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setLoading(true);
   axios.get("http://127.0.0.1:8000/all_contacts_details/"+compId).then((res)=> {
      let dta = res.data;
      if(dta.length === 0){
        setIsContactEmpty(true);
      }else{
        dta.forEach((ele, index ) => {
          ele.id = index
        })
      setData(dta);
      }
       
       setLoading(false);
       
   }).catch((err)=> {
    setLoading(false);
     alert("Could not fetch contact data");
   })
  }, []);

  const handleChangeQueryCol = (e) => {
    e.preventDefault()
    setQueryCol(e.target.value)   
  };

  const handleChangeQueryString = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  const searchContact = (e) => {
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

 
  const deleteUser = () => {
    
    if(isAdmin){
      axios.get("http://127.0.0.1:8000/delete_inactive_user/"+ userId).then((res) => {
     
      alert("Users deleted successfully");
      window.location.href = "/all-contacts"
      })
    }else{
      alert("You are not authorised");
    }
    
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
      field: "email_address",
      headerName: "Email Address",
      width: 200,
    },

    {
        field: "phone_number",
        headerName: "Phone Number",
        width: 200,
      },

      {
        field: "cell_number",
        headerName: "Cell Number",
        width: 200,
      },

      
      {
        field: "user_name",
        headerName: "User Name",
        width: 300,
      },

      {
        field: "company",
        headerName: "Company",
        width: 200,
      },
      {
        field: "primary_skill_set",
        headerName: "Primary Skill",
        width: 200,
      },
      {
        field: "secondary_skill_set",
        headerName: "Secondary Skill",
        width: 200,
      },
      {
        field: "department",
        headerName: "Department",
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
              <button className="productListEdit" >Edit</button>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">


      {
        loading ? (<div>Loading... | Please wait</div>) : isContactEmpty ? 
        
        <div> No contact found</div> : (
          <>
         
          <div>
          <h2 style={{marginLeft: "auto", marginRight: "auto"}}>All Contacts Data</h2>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Fields</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={queryCol}
          onChange={handleChangeQueryCol}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="contact_id">Contact ID</MenuItem>
          <MenuItem value="full_name">Full Name</MenuItem>
          <MenuItem value="primary_skill_set">Primary Skill</MenuItem>
          <MenuItem value="secondary_skill_set">Secondary Skill</MenuItem>
          <MenuItem value="department">Department</MenuItem>
          <MenuItem value="user_name">User Name</MenuItem>
          <MenuItem value="role">Role</MenuItem>
          
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} style={{width: "400px"}}>
        <TextField id="standard-basic" value={query} label="Enter Query Eg: creator" onChange={handleChangeQueryString}/>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" onClick={searchContact} style={{marginTop: "8px",
        backgroundColor: "#032d42", color: "white"}}>Search</Button>
      </FormControl>
          </div>
         
          <div id="div1" style={{marginTop: "20px"}}>
      
            <div id="div3">
            <DataGrid
              rows={query < 1 ? data : searchResult }
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          
          </div>
          </div>
          <p>Delete all inactive user</p>
          <button className="productListEdit" onClick={deleteUser}>Delete</button>
        </>
          
        )
      }
      
    </div>
  );
}
