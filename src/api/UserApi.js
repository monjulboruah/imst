import { useState, useEffect } from "react";
import axios from "axios";

function UserApi() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCompany, setCompany] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isHr, setHr] = useState(false);
  const [isManager, setManager] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [history, setHistory] = useState([]);
  const [contactPriotity, setContactPriority] = useState([]);
  const [assignTicket, setAssignTicket] = useState([]);
  const [callback, setCallback] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const compId = localStorage.getItem("compId");

  useEffect(() => {
    if (token) {
      try {
        const role = localStorage.getItem("role");
        const userId = localStorage.getItem("userId");

        setIsLogged(true);

        role === "Admin" ? setIsAdmin(true) : setIsAdmin(false);
        role === "Employee" ? setEmployee(true) : setEmployee(false);
        role === "hr" ? setHr(true) : setHr(false);
        role === "company" ? setCompany(true) : setCompany(false);
        role === "Manager" ? setManager(true) : setManager(false);
      } catch (err) {
        alert(err);
      }
    }
  }, [token]);

  useEffect(() => {
    const getContactPriority = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_all_priority");

        setContactPriority(res.data);
      } catch (error) {
        alert(error);
      }
    };

    getContactPriority();
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/all_contacts_details/" + compId
        );

        //console.log(res.data);
        setUserDetails(res.data);
      } catch (error) {
        alert(error);
      }
    };

    getUserDetails();
  }, []);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isCompany: [isCompany, setCompany],
    isEmployee: [isEmployee, setEmployee],
    isHr: [isHr, setHr],
    isManager: [isManager, setManager],
    contactPriotity: [contactPriotity, setContactPriority],
    userDetails: [userDetails, setUserDetails],
    assignTicket: [assignTicket, setAssignTicket],
    history: [history, setHistory],
  };
}

export default UserApi;
