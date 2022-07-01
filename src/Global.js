import React, { createContext, useState, useEffect } from "react";
import UserApi from "./api/UserApi.js";
import CompaniesApi from "./api/CompaniesApi.js";
import DepartmentApi from "./api/DepartmentApi.js";
import TicketApi from "./api/TicketApi.js";
import CategoriesApi from "./api/CategoriesApi.js";
import jwtDecode from "jwt-decode";

import axios from "axios";

export const Global = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const settingToken = () => {
        const getToken = localStorage.getItem("jwtToken");
        setToken(getToken);
      };
      settingToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    CompaniesApi: CompaniesApi(),
    userApi: UserApi(),
    TicketApi: TicketApi(),
    DepartmentApi: DepartmentApi(),
    CategoriesApi: CategoriesApi(),
  };

  return <Global.Provider value={state}>{children}</Global.Provider>;
};
