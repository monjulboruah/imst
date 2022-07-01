import react, { useState, useContext } from "react";
import "./create-company.css";
import axios from "axios";
import { Global } from "../../Global";

export default function CreateCompany() {
  const state = useContext(Global);

  const [compPriority] = state.CompaniesApi.compPriority;

  const [companyData, setCompanyData] = useState({
    comp_name: "",
    comp_contact: "",
    phone_number: "",
    postal_address: "",
    active: "",
    default_pri: 0,
  });

  const onChangeCompName = (e) => {
    setCompanyData({
      ...companyData,
      comp_name: e.target.value,
    });
  };

  const onChangeCompContact = (e) => {
    setCompanyData({
      ...companyData,
      comp_contact: e.target.value,
    });
  };

  const onChangePhNo = (e) => {
    setCompanyData({
      ...companyData,
      phone_number: e.target.value,
    });
  };

  const onChangePostalAdd = (e) => {
    setCompanyData({
      ...companyData,
      postal_address: e.target.value,
    });
  };

  const onChangeIsActive = (e) => {
    setCompanyData({
      ...companyData,
      active: e.target.value,
    });
  };

  const onChangeDefaultPri = (e) => {
    setCompanyData({
      ...companyData,
      default_pri: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let {
      comp_name,
      comp_contact,
      phone_number,
      postal_address,
      active,
      default_pri,
    } = companyData;
    axios
      .post("http://127.0.0.1:8000/company", {
        comp_name,
        comp_contact,
        phone_number,
        postal_address,
        active,
        default_pri,
      })
      .then(function (response) {
        alert("Company created successfully");
        window.location.href = "/all-company";
      })
      .catch((err) => {
        alert("Problems in server side");
        console.log(err);
        //window.location.href = "/create-company";
      });
  };

  return (
    <div className="newUser">
      {compPriority.length === 0 ? (
        <div>Loading... | Please wait</div>
      ) : (
        <>
          <h3 className="newUserTitle">Create New Company</h3>
          <div className="newUserForm">
            <div className="newUserItem">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Eg: Microsoft"
                onChange={onChangeCompName}
                required
              />
            </div>

            <div className="newUserItem">
              <label>Company Contact</label>
              <input
                type="number"
                placeholder="eg@mail.com"
                onChange={onChangeCompContact}
                required
              />
            </div>

            <div className="newUserItem">
              <label>Phone number</label>
              <input
                type="text"
                placeholder="+91 123456789"
                onChange={onChangePhNo}
                required
              />
            </div>

            <div className="newUserItem">
              <label>Postal Address</label>
              <input
                type="Text"
                placeholder="eg 787055"
                onChange={onChangePostalAdd}
                required
              />
            </div>

            <div className="newUserItem">
              <label>Active</label>
              <select
                className="newUserSelect"
                name="active"
                id="active"
                onChange={onChangeIsActive}
                required
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div className="newUserItem">
              <label>Default Priority</label>
              <select
                className="newUserSelect"
                name="active"
                id="active"
                onChange={onChangeDefaultPri}
                required
              >
                {compPriority.map((ele, idx) => {
                  return (
                    <option value={ele.priLevel} key={idx}>
                      {ele.priDesc}
                    </option>
                  );
                })}
              </select>
            </div>

            <button className="newUserButton" onClick={onSubmit}>
              Create
            </button>
          </div>
        </>
      )}
    </div>
  );
}
