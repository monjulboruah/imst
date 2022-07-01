import "./sidebar.css";
import { useContext } from "react";
import NotFound from "../../utils/NotFound";
import { Global } from "../../Global";
import {
  LineStyle,
  Timeline,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import WorkIcon from "@material-ui/icons/Work";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ListAltIcon from "@material-ui/icons/ListAlt";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";


export default function Sidebar() {
  const state = useContext(Global);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  const [isCompany] = state.userApi.isCompany;
  const [isHr] = state.userApi.isHr;
  const [isManager] = state.userApi.isManager;
  const [isEmployee] = state.userApi.isEmployee;

  return (
    <>
    {isLogged ? (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            
            
            {isAdmin || isCompany || isHr || isManager ? (
              <>
              <Link to="/all-incidents" className="link">
              <li className="sidebarListItem">
                <ReportProblemIcon className="sidebarIcon" />
                Incidents
              </li>
            </Link>
                
              </>
            ): (
              
              <li className="sidebarListItem" onClick={() => window.location.href("/all-incidents")}>
                <ReportProblemIcon className="sidebarIcon" />
                Incidents
              </li>
            
            )}
            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Incident Management</h3>
          <ul className="sidebarList">
            <Link to="/all-incidents" className="link">
              <li className="sidebarListItem">
                <ListAltIcon className="sidebarIcon" />
                All Incident
              </li>
            </Link>
            
            <Link to="/create-ticket" className="link">
              <li className="sidebarListItem">
                <AddCircleIcon className="sidebarIcon" />
                Create Incident
              </li>
            </Link>
            <Link to="/my-assigned-ticket" className="link">
              <li className="sidebarListItem">
                <AddCircleIcon className="sidebarIcon" />
                My Assigned Incident
              </li>
            </Link>
            {
              isAdmin || isHr || isCompany  || isManager? (
                <Link to="/assign-ticket" className="link">
                <li className="sidebarListItem">
                <AssignmentIcon className="sidebarIcon" />
                Assign Incident
              </li>
              </Link>
              ): (
                <div>

                </div>
              )
            }
             <Link to="/solutions" className="link">
              <li className="sidebarListItem">
                <ListAltIcon className="sidebarIcon" />
                Solutions
              </li>
            </Link>
            <Link to="/all-incidents" className="link">
            <li className="sidebarListItem">
           
              <BarChart className="sidebarIcon" />
              Reports
            </li>
            </Link>
          </ul>
        </div>

        
        {
          isAdmin ||  isCompany || isHr || isManager? (
            <>
            <div className="sidebarMenu">
          <h3 className="sidebarTitle">Contact Management</h3>
          <ul className="sidebarList">
            <Link to="/all-contacts" className="link">
              <li className="sidebarListItem">
                <ListAltIcon className="sidebarIcon" />
                All Contacts
              </li>
            </Link>
            <Link to="/create-contact" className="link">
              <li className="sidebarListItem">
                <AddCircleIcon className="sidebarIcon" />
                Create Contact
              </li>
            </Link>
            <li className="sidebarListItem">
              <AssignmentIcon className="sidebarIcon" />
              Actions
            </li>
            
            <Link to="/all-contacts" className="link">
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
        <h3 className="sidebarTitle">Department Management</h3>
        <ul className="sidebarList">
          <Link to="/all-department" className="link">
            <li className="sidebarListItem">
              <ListAltIcon className="sidebarIcon" />
              All Departments
            </li>
          </Link>
          <Link to="/create-department" className="link">
            <li className="sidebarListItem">
              <AddCircleIcon className="sidebarIcon" />
              Create Department
            </li>
          </Link>
          <li className="sidebarListItem">
            <AssignmentIcon className="sidebarIcon" />
            Actions
          </li>
          <Link to="/all-department" className="link">
          <li className="sidebarListItem">
          
            <BarChart className="sidebarIcon" />
            Reports
            
          </li>
          </Link>
        </ul>
      </div>
      <div className="sidebarMenu">
        <h3 className="sidebarTitle">Status Management</h3>
        <ul className="sidebarList">
          <Link to="/all-status" className="link">
            <li className="sidebarListItem">
              <ListAltIcon className="sidebarIcon" />
              All Status
            </li>
          </Link>
          <Link to="/create-status" className="link">
            <li className="sidebarListItem">
              <AddCircleIcon className="sidebarIcon" />
              Create Status
            </li>
          </Link>
          
        </ul>
      </div>
      <div className="sidebarMenu">
          <h3 className="sidebarTitle">Ticket Category Management</h3>
          <ul className="sidebarList">
            <Link to="/all-category" className="link">
              <li className="sidebarListItem">
                <ListAltIcon className="sidebarIcon" />
                All Category
              </li>
            </Link>
            <Link to="/create-category" className="link">
              <li className="sidebarListItem">
                <AddCircleIcon className="sidebarIcon" />
                Create Category
              </li>
            </Link>
            <li className="sidebarListItem">
              <AssignmentIcon className="sidebarIcon" />
              Actions
            </li>
            <Link to="/all-category" className="link">
            <li className="sidebarListItem">
            
              <BarChart className="sidebarIcon" />
              Reports
            
            </li>
            </Link>
          </ul>
        </div>
      </>
          ): (
            <div>
              
            </div>
          )
        }


        
        {
          isAdmin ? (
            <div className="sidebarMenu">
          <h3 className="sidebarTitle">Company Management</h3>
          <ul className="sidebarList">
            <Link to="/all-company" className="link">
              <li className="sidebarListItem">
                <ListAltIcon className="sidebarIcon" />
                All Company
              </li>
            </Link>
            <Link to="/create-company" className="link">
              <li className="sidebarListItem">
                <AddCircleIcon className="sidebarIcon" />
                Create Company
              </li>
            </Link>
            <li className="sidebarListItem">
              <AssignmentIcon className="sidebarIcon" />
              Actions
            </li>
            <Link to="/all-company" className="link">
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
            </Link>
          </ul>
        </div>
          ) : (
            <div> </div>
          )
        }
        
      </div>
    </div>
    ) : NotFound }
  </>
  );
}
