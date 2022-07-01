import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import WorkIcon from '@material-ui/icons/Work';
import { userData } from "../../dummyData";

export default function FeaturedInfo(props) {
  let ticketData = props.ticketData;
  let allUser = props.userData;

  const pendingTicket = () => {
    let pending = [];

    ticketData.forEach(ele => {
      if(ele.statusId === "dbcksjdb h fs 4klgnkj 546"){
        pending.push(ele);
      }
    });

    return pending;
  }

  const criticalTicket = () => {
    let critical = [];

    ticketData.forEach(ele => {
      if(ele.priority === "High"){
        critical.push(ele);
      }
    });

    return critical;
  }

  const getHr = () => {
    let hr = [];

    allUser.forEach((ele) => {
      if(ele.role === "hr"){
        hr.push(ele);
      }
    })

    return hr;
  }

  const getManager = () => {
    let manager = [];

    allUser.forEach((ele) => {
      if(ele.role === "Manager"){
        manager.push(ele);
      }
    })

    return manager;
  }

  const getEmp = () => {
    let emp = [];

    allUser.forEach((ele) => {
      if(ele.role === "Employee"){
        emp.push(ele);
      }
    })

    return emp;
  }


  //console.log(allUser);
  return (
   <>
    <div className="featured">
      <div className="featuredItem">
     
        <span className="featuredTitle">All Incidents</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{ticketData.length}</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Pending</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{pendingTicket().length}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Critical</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{criticalTicket().length}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      
    </div>
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Employee</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{getEmp().length}</span>
         
        </div>
        
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">HR</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{getHr().length}</span>
          
        </div>
        
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Project Manager</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{getManager().length}</span>
          
        </div>
        
      </div>
    </div>
    </> 
  );
}
