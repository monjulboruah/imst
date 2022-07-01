import "./all-category.css";
import React, { useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AllCategory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCategoryEmpty, setCategoryEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/get_all_category")
      .then((res) => {
        let dta = res.data;
        if (dta.length === 0) {
          setCategoryEmpty(true);
        } else {
          dta.forEach((ele, index) => {
            ele.id = index;
          });
          setData(dta);
        }
        setLoading(false);
      })
      .catch((err) => {
        alert("Could not fetch category data");
        console.log(err);
        window.location.href = "/";
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 135 },
    { field: "categoryId", headerName: "Category ID", width: 135 },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 150,
    },

    {
      field: "catDesc",
      headerName: "Category Description",
      width: 200,
    },

    {
      field: "Active",
      headerName: "Is Active",
      width: 200,
    },

    {
      field: "fullCatDesc",
      headerName: "Full Category Description",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/edit-category/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {loading === true ? (
        <div>Loading... | Please wait</div>
      ) : isCategoryEmpty === true ? (
        <div>No category found</div>
      ) : (
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
      )}
    </div>
  );
}
