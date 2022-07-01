import React, {useState, useContext, useEffect} from "react";
import {Global} from "../../Global"
import axios from "axios";
import Chart from "../../component/chart/Chart";
import FeaturedInfo from "../../component/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../component/widgetSm/WidgetSm";
import WidgetLg from "../../component/widgetLg/WidgetLg";


export default function Home() {

  const state = useContext(Global);
  const  [allTicket, setAllTicket] = state.TicketApi.allTicket;
  const [userDetails, setUserDetails] =  state.userApi.userDetails;
  const [allUser, getAllUser] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const compId = localStorage.getItem("compId")


  useEffect(() => {
    setLoading(true);
    if(userDetails.length === 0){
      const getUserDetails = async () => {
        try {
          const res = await axios.get(
            "http://127.0.0.1:8000/all_contacts_details/" + compId
          );
  
          //console.log(res.data);
          setUserDetails(res.data);
          getAllUser(res.data);
          setLoading(false);
        } catch (error) {
          alert(error);
        }
      };
  
      getUserDetails();
    }else{
      getAllUser(userDetails);
      setLoading(false);
    }
    
  }, []);

  useEffect(() => {
    setLoading(true);
    if(allTicket.length === 0){
      axios.get("http://127.0.0.1:8000/get_all_tickets/"+compId).then((res)=> {
      let dta = res.data;
      if(dta.length === 0){
        return;
      }else{
        dta.forEach((ele, index ) => {
          ele.id = index
      })
      }
       
       setTicketData(dta);
       setAllTicket(dta);
       setLoading(false);
      
   }).catch((err) => {
     alert("Could not fetch tickets")
    
   })
    }else{
      setTicketData(allTicket);
      setLoading(false);
    }
   
  }, []);


  return (
    <div className="home">{
      loading ? (
          <div>Loading... | Please Wait</div>
      ): (
        <>
 <FeaturedInfo ticketData={ticketData} userData = {allUser} />
    <Chart data={userData} title="Critical Incidents" grid dataKey="Projects"/>
    <div className="homeWidgets">
      <WidgetSm/>
      <WidgetLg title="Latest Incident" ticketData={ticketData}/>
    </div>
    

    <Chart data={userData} title="All Incident Matrices" grid dataKey="Projects"/>
    <div className="homeWidgets">
      
      <WidgetLg title="Critical Incident"/>
    </div>
        </>
      )
    }
   
  </div>
  );
}
