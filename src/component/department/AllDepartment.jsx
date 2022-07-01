import "./all-department.css";
import React, { useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AllDepartment() {
  const [data, setData] = useState([]);
  const compId = localStorage.getItem("compId");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/get_all_dept/" + compId).then((res) => {
      let dta = res.data;
      dta.forEach((ele, index) => {
        ele.id = index;
      });
      setData(dta);
      
    }).catch((err)=> {
      alert("Could not fetch department data");
      window.location.href("/");
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 135 },
    { field: "dept_id", headerName: "Department ID", width: 135 },
    {
      field: "dept_name",
      headerName: "Department Name",
      width: 150,
    },

    {
      field: "full_dept_name",
      headerName: "Department Description",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/edit-dept/" + params.row.dept_id}>
              <button className="productListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {
       data.length === 0 ? (<div>Loading... | Please wait </div>) : (
        <div id="div1">
        <div id="div3">
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={4}
            checkboxSelection
          />
        </div>
      </div>
       )
      }
      
    </div>
  );
}
