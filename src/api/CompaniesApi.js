import { useState, useEffect } from "react";
import axios from "axios";

function CompaniesApi() {
  const [compPriority, setCompPriority] = useState([]);
  const [allCompany, setAllCompany] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [callback, setCallback] = useState(false);
  const compId = localStorage.getItem("compId");

  useEffect(() => {
    const getCompPriority = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_all_priority");

        setCompPriority(res.data);
      } catch (err) {
        alert(err);
      }
    };

    getCompPriority();
  }, []);

  useEffect(() => {
    const getCompDetails = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/company_details_by_id/" + compId
        );

        setCompanyDetails(res.data);
      } catch (err) {
        alert(err);
      }
    };

    getCompDetails();
  }, []);
  return {
    compPriority: [compPriority, setCompPriority],
    callback: [callback, setCallback],
    allCompany: [allCompany, setAllCompany],
    companyDetails: [companyDetails, setCompanyDetails],
  };
}

export default CompaniesApi;
