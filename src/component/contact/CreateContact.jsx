import React, { useState, useContext, useEffect } from "react";
import "./newContact.css";
import axios from "axios";
import {Global} from "../../Global";

function CreateContact() {
  const state = useContext(Global);

  const [isAdmin] = state.userApi.isAdmin;
  const [allCompany, setAllCompany] = state.CompaniesApi.allCompany;
  const [contactPriotity ]= state.userApi.contactPriotity;

  const [loading, setLoading] = useState(false);

  const [userData, setUser] = useState({
    userName: "",
    fullName: "",
    role: "",
    companyId: localStorage.getItem("compId"),
    emailAddress: "",
    phoneNumber: "",
    cellNumber: " ",
    techStaff: "",
    password: "",
    defaultPri: " ",
    p_skill: "",
    s_skill: "",
    allTickOpt: "true",
    loggedOn: "true",
    active: "",
  });

  useEffect(() => {
    setLoading(true);
    if (allCompany.length === 0) {
      axios
        .get("http://127.0.0.1:8000/get_all_company", {
          crossdomain: true,
        })
        .then((res) => {
          let dta = res.data;

          if (dta.length === 0) {
            alert("No companies found");
          } else {
            dta.forEach((ele, index) => {
              ele.id = index;
            });
            
            setAllCompany(dta);
          }

         
        })
        .catch((err) => {
          alert("Could not fetch company data");
          window.location.href = "/";
          console.log(err);
        });
    } 
      setLoading(false);
    
  }, []);

  // console.log(loading);
  // console.log(allCompany);

  const onSubmit = (e) => {
    e.preventDefault();
    let sendData = {
      "full_name": userData.fullName,
      "user_name": userData.userName,
      "role": userData.role,
      "email": userData.emailAddress,
      "company_id": userData.companyId,
      "phone_number": userData.phoneNumber,
      "cell_number": userData.cellNumber,
      "tech_staff": userData.techStaff,
      "active": userData.active,
      "p_skill": userData.p_skill,
      "s_skill": userData.s_skill,
      "password": userData.password,
      "default_pri": userData.defaultPri,
      "all_tick_opt": userData.allTickOpt,
      "logged_on": userData.loggedOn,
    };
    axios
      .post("http://127.0.0.1:8000/contact", sendData)
      .then((response) => {
      
        alert("Contact created successfully");
        window.location.href = "/all-contacts";
      })
      .catch((err) => {
        alert("Problems in server side");
        console.log(err);
       // window.location.href = "/create-contact";
      });
  };
 

 

  return (
    <div className="newUser">
      {
        contactPriotity.length === 0 || loading ?  (<div>Loading... | Please wait</div>) : (
          <>
             <h1 className="newUserTitle">New Contact</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john"
            required
            onChange={(e) => setUser({ ...userData, userName: e.target.value })}
          />
        </div>

        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            required
            onChange={(e) => setUser({ ...userData, fullName: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Role</label>
          <select
            className="newUserSelect"
            name="role"
            id="role"
            required
            onChange={(e) => setUser({ ...userData, role: e.target.value })}
          >
            <option value="">Select an option</option>
            {
              isAdmin ? (<option value="Admin">Admin</option>) : (<></>)
            }
            
            <option value="Manager">Manager</option>
            <option value="hr">HR</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="newUserItem">
          <label>Company</label>
          {
            isAdmin ? 
            (
              <select
              className="newUserSelect"
              name="company"
              id="company"
              required
              onChange={(e) => setUser({ ...userData, companyId: e.target.value })}
              >
                {
                  allCompany.map((ele, idx) => {
                    return (
                      <option value={ele.comp_id} key={idx}>{ele.comp_name}</option>
                    )
                  })
                }
              </select>

            ) :
            (
              <input
              type="number"
              placeholder="15623"
              required
              value={userData.companyId}
            />
            )
          }
          
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            required
            onChange={(e) =>
              setUser({ ...userData, emailAddress: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Phone Number</label>
          <input
            type="number"
            placeholder="+1 123 456 78"
            required
            onChange={(e) =>
              setUser({ ...userData, phoneNumber: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Cell Number</label>
          <input
            type="number"
            placeholder="+011 123 456 78"
            required
            onChange={(e) =>
              setUser({ ...userData, cellNumber: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Techniacal Staff</label>
          <select
            className="newUserSelect"
            name="tect-staff"
            id="tect-staff"
            required
            onChange={(e) =>
              setUser({ ...userData, techStaff: e.target.value })
            }
          >
            <option value="">Select an option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          
        </div>
        <div className="newUserItem">
          <label>Primary Skill</label>
          <input
            type="text"
            placeholder="Eg: Web Development"
            required
            onChange={(e) =>
              setUser({ ...userData, p_skill: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Secondary Skill</label>
          <input
            type="text"
            placeholder="Eg: SAP"
            required
            onChange={(e) =>
              setUser({ ...userData, s_skill: e.target.value })
            }
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setUser({ ...userData, password: e.target.value })}
          />
        </div>
        <div className="newUserItem">
          <label>Default Priority</label>

          <select
            className="newUserSelect"
            name="priority"
            id="priority"
            required
            onChange={(e) =>
              setUser({ ...userData, defaultPri: e.target.value })
            }
          >
            {
              contactPriotity.map((ele, idx) => {
                  return (
                    <option value={ele.priLevel} key={idx}>{ele.priDesc}</option>
                  )
              })
            }

          </select>

        </div>


        <div className="newUserItem">
          <label>Active</label>
          <select
            className="newUserSelect"
            name="active"
            id="active"
            required
            onChange={(e) => setUser({ ...userData, active: e.target.value })}
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

export default CreateContact;
