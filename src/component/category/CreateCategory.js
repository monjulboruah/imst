import "./create-category.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Global } from "../../Global";

export default function CreateCategory() {
  const state = useContext(Global);
  const [departments] = state.DepartmentApi.departments;
  const [priority] = state.DepartmentApi.departmentPriority;
  const [userDetails] = state.userApi.userDetails;

  const [categoryData, setCategoryData] = useState({
    category_name: "",
    cat_desc: "",
    assignee: 0,
    department: 0,
    active: "",
    defaultPri: 1,
    fullCatDesc: "",
  });

  const onChangeCategoryName = (e) => {
    setCategoryData({
      ...categoryData,
      category_name: e.target.value,
    });
  };

  const onChangeCategoryDesc = (e) => {
    setCategoryData({
      ...categoryData,
      cat_desc: e.target.value,
    });
  };

  const onChangeAssignee = (e) => {
    setCategoryData({
      ...categoryData,
      assignee: parseInt(e.target.value),
    });
  };

  const onChangeDepartment = (e) => {
    setCategoryData({
      ...categoryData,
      department: parseInt(e.target.value),
    });
  };

  const onChangeIsActive = (e) => {
    setCategoryData({
      ...categoryData,
      active: e.target.value,
    });
  };

  const onChangeDefaultPri = (e) => {
    setCategoryData({
      ...categoryData,
      defaultPri: parseInt(e.target.value),
    });
  };

  const onChangeFullCatDesc = (e) => {
    setCategoryData({
      ...categoryData,
      fullCatDesc: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let {
      category_name,
      cat_desc,
      assignee,
      department,
      active,
      defaultPri,
      fullCatDesc,
    } = categoryData;

    axios
      .post("http://127.0.0.1:8000/add_category", {
        category_name,
        cat_desc,
        assignee,
        department,
        active,
        defaultPri,
        fullCatDesc,
      })
      .then(function (response) {
        alert("Category created successfully ");
        window.location.href = "/all-category";
      })
      .catch((err) => {
        alert("Problems in server");
        window.location.href = "/create-category";
        console.log(err);
      });
  };

  return (
    <div className="newUser">
      {departments.length === 0 ||
      priority.length === 0 ||
      userDetails.length === 0 ? (
        <div>Loading... | Please wait</div>
      ) : (
        <>
          <h3 className="newUserTitle">Create New Category</h3>
          <div className="newUserForm">
            <div className="newUserItem">
              <label>Category Name</label>
              <input
                type="text"
                value={categoryData.category_name}
                placeholder="john"
                onChange={onChangeCategoryName}
                required
              />
            </div>

            <div className="newUserItem">
              <label>Category Description</label>
              <input
                type="text"
                value={categoryData.cat_desc}
                placeholder="write category description"
                onChange={onChangeCategoryDesc}
                required
              />
            </div>

            <div className="newUserItem">
              <label>Assignee</label>

              <select
                className="newUserSelect"
                name="assignee"
                id="assignee"
                onChange={onChangeAssignee}
                required
              >
                <option>Select an option</option>
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
              <label>Department</label>

              <select
                className="newUserSelect"
                name="dept"
                id="dept"
                onChange={onChangeDepartment}
                required
              >
                <option>Select an option</option>
                {departments.map((ele, index) => {
                  return (
                    <option value={ele.dept_id}>{ele.full_dept_name}</option>
                  );
                })}
              </select>
            </div>

            <div className="newUserItem">
              <label>Active</label>

              <select
                className="newUserSelect"
                value={categoryData.active}
                onChange={onChangeIsActive}
                name="active"
                id="active"
                required
              >
                <option>Select an option</option>
                <option value={1}>True</option>
                <option value={0}>False</option>
              </select>
            </div>

            <div className="newUserItem">
              <label>Default Priority</label>

              <select
                className="newUserSelect"
                name="priority"
                id="priority"
                onChange={onChangeDefaultPri}
                required
              >
                <option>Select an option</option>
                {priority.map((ele, index) => {
                  return (
                    <option value={ele.priLevel} key={index}>
                      {ele.priDesc}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="newUserItem">
              <label>Full Category Description</label>
              <input
                type="text"
                value={categoryData.fullCatDesc}
                onChange={onChangeFullCatDesc}
                placeholder="Description"
                required
              />
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
