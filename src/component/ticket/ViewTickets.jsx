import "./create-ticket.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Global } from "../../Global";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    root: {
      minWidth: 700,
      border: "2px solid #032d42",
    },
    
    title: {
      fontSize: 15,
      fontWeight: "bold",
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  
export default function EditTicket() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

  const {ticketId} = useParams();

  const [ticketData, setTicketData] = useState({
            
            summary:"",
            description:"",
            img: "",
  });


  useEffect(() => {

    setLoading(true);
    axios.get("http://127.0.0.1:8000/get_ticket/"+ticketId)
    .then((res) => {
        setTicketData({
            summary: res.data.summary,
            description: res.data.description,
            img: "../../../../../imst-backend" + (res.data.img),
        })

        console.log(ticketData.img)

    }).catch((err)=> {
        alert("Could not fetch ticket data | Problems in server");
        window.location.href("/all-incidents");
        console.log(err);
    })

    setLoading(false);

  }, [])

  

  return (


    <div className="newUser">
      {
        loading === true ? 
          (
            <div>Loading... | Please wait</div>
          ):
          (
            <>

        <h3 className="newUserTitle">Ticket Details</h3>
        <Card className={classes.root}>
        <CardContent>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
            Ticket Id: {ticketId}
            </Typography>
            <Divider/>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
                Description
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                {ticketData.description}
            </Typography>
            <Divider/>

            <Typography className={classes.title} color="textPrimary" gutterBottom>
                Summary
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                {ticketData.summary}
            </Typography>
            <Divider/>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
                Error Image
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                
            </Typography>
            <Divider/>
        </CardContent>
        <CardActions>
            <Button size="small" style={{backgroundColor: "#032d42", color: "white"}}>Edit Ticket </Button>
        </CardActions>
        </Card>
        {/* {
          ticketData.img !== "" ? <p>Loading image...</p> :  <img src={require(ticketData.img)} style={{height: "300px"}}/>
        }
          */}
         {/* <img src={require("../../../../../imst-backend/media/images.png")} style={{height: "300px"}}/> */}

    </>
          )
      }
      
    </div>
  );
}
