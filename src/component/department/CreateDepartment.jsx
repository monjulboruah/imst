import axios from "axios";
import React, { useState, useContext } from "react";
import {Global} from "../../Global";

function CreateDepartment() {

  const state = useContext(Global);

  const [deptPriority] = state.DepartmentApi.departmentPriority;
  const [userDetails] = state.userApi.userDetails;



  const [deptData, setDeptData] = useState({
    deptName: "",
    fullDeptName: "",
    compId: localStorage.getItem("compId"),
    managerId: "",
    initialAssigneeId: "",
    techDept: "",
    active: "",
    defaultPri: "",
  });


  const onSubmit = (e) => {
    e.preventDefault();
    let sendData = {
      "dept_name": deptData.deptName,
      "comp_id": deptData.compId,
      "manager_id": deptData.managerId,
      "initial_assignee_id": deptData.initialAssigneeId,
      "tech_dept": deptData.techDept,
      "active": deptData.active,
      "default_pri": deptData.defaultPri,
      "full_dept_name": deptData.fullDeptName,
    };
    axios
      .post("http://127.0.0.1:8000/dept", sendData)
      .then((response) => {
        alert("Department created successfully");
        window.location.href = "/all-department";
      })
      .catch((err) => {
        alert("Could not create department | A Manager should assign only one department");
       // window.location.href = "/create-department";
        console.log(err);
      });
  };
  
  

  return (
    <div className="newUser">
      {
        userDetails.length === 0 || deptPriority.length === 0 ? (<div>Loading... | Please wait</div>)
        : (
          <>

      <h2 className="newUserTitle">Create New Department</h2>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Department Name</label>
          <input
            type="text"
            placeholder="IT"
            required
            onChange={(e) =>
              setDeptData({ ...deptData, deptName: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Full Department Name</label>
          <input
            type="text"
            placeholder="Information Technology"
            required
            onChange={(e) =>
              setDeptData({ ...deptData, fullDeptName: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Company Id</label>
          <input
            type="number"
            placeholder="123456"
            required
            value={deptData.compId}
            disabled
          />
        </div>
        <div className="newUserItem">
          <label>Manager</label>
          <select
            className="newUserSelect"
            name="manager"
            id="manager"
            onChange={(e) =>
              setDeptData({ ...deptData, managerId: e.target.value })
            }
            required
          >
            {userDetails.map((ele, index) => {
              let dta = {}
               if(ele.role === "Manager"){
                  dta = ele;
                  return (
                    <option value={dta.contact_id} key={index}>
                      {dta.full_name}
                    </option>
                  );
              }
              
            })}
          </select>
          
        </div>
        <div className="newUserItem">
          <label>Initial Assignee</label>

          <select
            className="newUserSelect"
            name="assignee"
            id="assignee"
            onChange={(e) =>
              setDeptData({ ...deptData, initialAssigneeId: e.target.value })
            }
            required
          >
            {userDetails.map((ele, index) => {
              return (
                <option value={ele.contact_id} key={index}>
                  {ele.full_name}
                </option>
              );
            })}
          </select>

        </div>
        <div className="newUserItem">
          <label>Tech Department</label>
          <select
            className="newUserSelect"
            name="techDept"
            id="techDept"
            required
            onChange={(e) =>
              setDeptData({ ...deptData, techDept: e.target.value })
            }
          >
            <option value="">Select an option</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Default Priority</label>

          <select
            className="newUserSelect"
            name="priority"
            id="priority"
            onChange={(e) =>
              setDeptData({ ...deptData, defaultPri: e.target.value })
            }
            required
          >
            {deptPriority.map((ele, index) => {
              return (
                <option value={ele.priLevel} key={index}>
                  {ele.priDesc}
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
            required
            onChange={(e) =>
              setDeptData({ ...deptData, active: e.target.value })
            }
          >
            <option value="">Select an option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={(e) => onSubmit(e)}>
          Create
        </button>
      </form>
          </>
        )
      }
     
    </div>
  );
}

export default CreateDepartment;
