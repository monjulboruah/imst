import react, { useState, useEffect } from "react";
import "./create-company.css";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { composeValidators } from "react-admin";

export default function UpdateCompany() {
  const { compId } = useParams();
  const [compUserDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUserDetailsEmpty, setUserDetailsEmpty] = useState(false);
  const [compDept, setCompDept] = useState([]);
  const [isDeptEmpty, setDeptEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/all_contacts_details/" + compId)
      .then((res) => {
        if (res.data.length === 0) {
          setUserDetailsEmpty(true);
        } else {
          setUserDetails(res.data);
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/get_all_dept/" + compId).then((res) => {
      if (res.data.length === 0) {
        setDeptEmpty(true);
      } else {
        setCompDept(res.data);
      }
      setLoading(false);
    });
  }, []);

  const [companyData, setCompanyData] = useState({
    id: localStorage.getItem("userId"),
    assignee: 0,
    dept_assigned: 0,
    active: "",
  });

  const onChangeAssignee = (e) => {
    setCompanyData({
      ...companyData,
      assignee: e.target.value,
    });
  };

  const onChangeDeptAssigned = (e) => {
    setCompanyData({
      ...companyData,
      dept_assigned: e.target.value,
    });
  };

  const onChangeActive = (e) => {
    setCompanyData({
      ...companyData,
      active: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let { id, assignee, dept_assigned, active } = companyData;
    axios
      .post("http://127.0.0.1:8000/update_company_details/" + compId, {
        id,
        assignee,
        dept_assigned,
        active,
      })
      .then(function (response) {
        alert("Company details updated successfully");
        window.location.href = "/all-company";
      })
      .catch((err) => {
        window.location.href("/all-company");
        console.log(err);
      });
  };

  return (
    <div className="newUser">
      {loading ? (
        <div>Loading... | Please wait</div>
      ) : isUserDetailsEmpty ? (
        <div>
          No user found for this company; to update a company users are required
        </div>
      ) : isDeptEmpty ? (
        <div>
          No user found for this company; to update a company users are required
        </div>
      ) : (
        <>
          <h3 className="newUserTitle">Update Company Details</h3>
          <div className="newUserForm">
            <div className="newUserItem">
              <label>Assignee</label>

              <select
                className="newUserSelect"
                name="Assignee"
                id="Assignee"
                onChange={onChangeAssignee}
              >
                {compUserDetails.map((ele, index) => {
                  return (
                    <option value={ele.contact_id} key={index}>
                      {ele.full_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="newUserItem">
              <label>Department Assigned</label>
              <select
                className="newUserSelect"
                name="dept"
                id="dept"
                onChange={onChangeDeptAssigned}
              >
                {compDept.map((ele, index) => {
                  return (
                    <option value={ele.dept_id} key={index}>
                      {ele.full_dept_name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="newUserItem">
              <label>Active</label>
              <select
                className="newUserSelect"
                name="active"
                id="active"
                onChange={onChangeActive}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <button className="newUserButton" onClick={onSubmit}>
              Update
            </button>
          </div>
        </>
      )}
    </div>
  );
}
