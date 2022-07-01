import { useState, useEffect } from "react";
import axios from "axios";

function DepartmentApi() {
  const [departments, setDepartments] = useState([]);
  const [departmentPriority, setDepartmentPriority] = useState([]);
  const [callback, setCallback] = useState(false);

  const compId = localStorage.getItem("compId");

  useEffect(() => {
    const getDepartments = async () => {
      const res = await axios.get(
        "http://127.0.0.1:8000/get_all_dept/" + compId
      );

      setDepartments(res.data);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const getDepartmentPriority = async () => {
      const res = await axios.get("http://127.0.0.1:8000/get_all_priority");

      setDepartmentPriority(res.data);
    };
    getDepartmentPriority();
  }, []);

  return {
    departments: [departments, setDepartments],
    departmentPriority: [departmentPriority, setDepartmentPriority],
    callback: [callback, setCallback],
  };
}

export default DepartmentApi;
