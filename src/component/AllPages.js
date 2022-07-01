import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Global } from "../Global";

//auth
import Login from "./auth/Login";
import NotFound from "../utils/NotFound";
import Home from "../pages/home/Home";

//status
import AllStatus from "./status/AllStatus";
import CreateStatus from "./status/CreateStatus";

//ticket
import CreateTicket from "./ticket/CreateTicket";
import AllTickets from "./ticket/AllTickets";
import AssignTicket from "./ticket/AssignTicket";
import AllAssignee from "./ticket/AllAssignee";
import MyAssignedTicket from "./ticket/MyAssignedTicket";
import EditTicket from "./ticket/EditTicket";
import CloseTicket from "./ticket/CloseTicket";
import Solutions from "./ticket/Solutions";
import ViewTicket from "./ticket/ViewTickets";

//company
import CreateCompany from "./company/CreateCompany";
import AllCompany from "./company/AllCompany";
import DeleteCompany from "./company/DeleteCompany";
import UpdateCompany from "./company/UpdateCompany";

//contact
import CreateContact from "./contact/CreateContact";
import AllContact from "./contact/AllContact";

//department
import CreateDepartment from "./department/CreateDepartment";
import AllDepartment from "./department/AllDepartment";
import DeleteDepartment from "./department/DeleteDepartment";

//categories
import CreateCategory from "./category/CreateCategory";
import AllCategory from "./category/AllCategory";

function AllPages() {
  const state = useContext(Global);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  const [isCompany] = state.userApi.isCompany;
  const [isHr] = state.userApi.isHr;
  const [isEmployee] = state.userApi.isEmployee;
  const [isManager] = state.userApi.isManager;

  return (
    <>
      <Switch>
        <Route path="/" exact component={isLogged ? Home : Login} />

        <Route path="/login" exact component={isLogged ? Home : Login} />

        <Route path="/dashboard" exact component={isLogged ? Home : NotFound} />

        <Route
          path="/all-status"
          exact
          component={isLogged ? AllStatus : NotFound}
        />

        <Route
          path="/create-status"
          exact
          component={isLogged ? CreateStatus : NotFound}
        />

        <Route
          path="/create-ticket"
          exact
          component={isLogged ? CreateTicket : NotFound}
        />

        <Route
          path="/all-incidents"
          exact
          component={isLogged ? AllTickets : NotFound}
        />
        <Route
          path="/assign-ticket"
          exact
          component={isAdmin || isHr || isManager ? AssignTicket : NotFound}
        />

        <Route
          path="/assign-ticket/:ticketId"
          exact
          component={isAdmin || isHr || isManager ? AllAssignee : NotFound}
        />

        <Route
          path="/view-ticket/:ticketId"
          exact
          component={isAdmin || isHr || isManager ? ViewTicket : NotFound}
        />

        <Route
          path="/close-ticket/:ticketId"
          exact
          component={
            isAdmin || isHr || isManager || isEmployee ? CloseTicket : NotFound
          }
        />

        <Route
          path="/solutions"
          exact
          component={
            isAdmin || isHr || isManager || isEmployee ? Solutions : NotFound
          }
        />

        <Route
          path="/my-assigned-ticket"
          exact
          component={isLogged ? MyAssignedTicket : NotFound}
        />

        <Route
          path="/edit-ticket/:ticketId"
          exact
          component={isLogged ? EditTicket : NotFound}
        />

        <Route
          path="/create-company"
          exact
          component={isAdmin ? CreateCompany : NotFound}
        />

        <Route
          path="/all-company"
          exact
          component={isAdmin ? AllCompany : NotFound}
        />

        <Route
          path="/delete-company/:compId"
          exact
          component={isAdmin ? DeleteCompany : NotFound}
        />

        <Route
          path="/update-company-details/:compId"
          exact
          component={isAdmin ? UpdateCompany : NotFound}
        />

        <Route
          path="/create-contact"
          exact
          component={isAdmin || isHr || isManager ? CreateContact : NotFound}
        />

        <Route
          path="/all-contacts"
          exact
          component={isAdmin || isHr || isManager ? AllContact : NotFound}
        />

        <Route
          path="/create-contact"
          exact
          component={isAdmin || isHr || isManager ? CreateContact : NotFound}
        />

        <Route
          path="/create-category"
          exact
          component={isAdmin || isHr || isManager ? CreateCategory : NotFound}
        />

        <Route
          path="/all-category"
          exact
          component={isAdmin || isHr || isManager ? AllCategory : NotFound}
        />

        <Route
          path="/create-department"
          exact
          component={isAdmin || isHr || isManager ? CreateDepartment : NotFound}
        />
        <Route
          path="/all-department"
          exact
          component={isAdmin || isHr || isManager ? AllDepartment : NotFound}
        />

        <Route
          path="/edit-dept/:deptId"
          exact
          component={isAdmin || isHr || isManager ? DeleteDepartment : NotFound}
        />

        <Route path="*" exact component={NotFound} />
      </Switch>
    </>
  );
}

export default AllPages;
