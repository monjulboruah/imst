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

export default function Solutions() {

   
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("")
  const [queryCol, setQueryCol] = useState("")
  const [loading, setLoading] = useState(false);
  const [isSolEmpty, setSolEmpty] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const classes = useStyles();


  useEffect(() => {
    setLoading(true);
   
      axios.get("http://127.0.0.1:8000/all_solution/"+compId).then((res)=> {
      let dta = res.data;
      if(dta.length === 0){
        setSolEmpty(true);
      }else{
        dta.forEach((ele, index ) => {
          ele.id = index
      })
      }
       
       setData(dta);
       setLoading(false);
      
   }).catch((err) => {
     alert("Could not fetch solutions")
     window.location.href("/");
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
    { field: "solution_id", headerName: "Solution ID", width: 135 },
    { field: "ticket_id", headerName: "Ticket ID", width: 135 },
    { field: "category_id", headerName: "Category", width: 135 },
 
    
    {
      field: "creator",
      headerName: "Creator",
      width: 200,
    },

    {
        field: "closed_by",
        headerName: "Closed By",
        width: 200,
      },


      {
        field: "date_created",
        headerName: "Created Date",
        width: 200,
      },

      {
        field: "closed_date",
        headerName: "Closed Date",
        width: 200,
      },

      
      {
        field: "solution_text",
        headerName: "Solution",
        width: 150,
        
      },
  ];

 

  return (
  <div className="all-ticket-class">

    {
      loading === true ? (<div>Loading... | Please wait</div>) : 
      isSolEmpty ? (<div>No Solutions generated till now</div>)
      : (<>
      <div>
      
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Fields</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={queryCol}
          onChange={handleChangeQueryCol}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="ticket_id">Ticket ID</MenuItem>
          <MenuItem value="solution_id">Solution ID</MenuItem>
          <MenuItem value="category_id">Category</MenuItem>
          <MenuItem value="creator">Creator</MenuItem>
          <MenuItem value="closed_by">Closed By</MenuItem>
          <MenuItem value="solution_text">Solution</MenuItem>
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
