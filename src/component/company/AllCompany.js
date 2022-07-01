import React, { useState, useEffect, useContext } from "react";
import "./all-company.css";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Global } from "../../Global";

export default function AllCompany(props) {
  const state = useContext(Global);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCompanyEmpty, setCompanyEmpty] = useState(false);
  const [allCompany, setAllCompany] = state.CompaniesApi.allCompany;

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
            setCompanyEmpty(true);
          } else {
            dta.forEach((ele, index) => {
              ele.id = index;
            });
            setData(dta);
            setAllCompany(dta);
          }

          setLoading(false);
        })
        .catch((err) => {
          alert("Could not fetch company data");
          window.location.href = "/";
          console.log(err);
        });
    } else {
      setData(allCompany);
      setLoading(false);
    }
  }, []);

  // console.log(data);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "comp_name",
      headerName: "Company Name",
      width: 200,
    },
    { field: "comp_contact", headerName: "Contact", width: 200 },
    {
      field: "date_created",
      headerName: "Created",
      width: 200,
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 200,
    },

    {
      field: "postal_address",
      headerName: "Postal Address",
      width: 200,
    },
    {
      field: "active",
      headerName: "Is Active",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/update-company-details/" + params.row.comp_id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <Link to={"/delete-company/" + params.row.comp_id}>
              <DeleteOutline className="productListDelete" />
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
      ) : isCompanyEmpty ? (
        <div>No company found</div>
      ) : (
        <div id="div1">
          <div id="div3">
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          </div>
        </div>
      )}
    </div>
  );
}
