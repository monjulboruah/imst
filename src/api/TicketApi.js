import { useState, useEffect } from "react";
import axios from "axios";

function TicketApi() {
  const [ticketCategories, setTicketCategories] = useState([]);
  const [ticketPriority, setTicketPriority] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);
  const [allTicket, setAllTicket] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getTicketCategory = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_all_category");

        let category = [];

        res.data.forEach((element) => {
          let dta = {
            categoryId: element.categoryId,
            categoryName: element.categoryName,
          };
          category.push(dta);
        });

        setTicketCategories(category);
      } catch (err) {
        alert(err);
      }
    };

    getTicketCategory();
  }, []);

  useEffect(() => {
    const getTicketPriority = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_all_priority");

        setTicketPriority(res.data);
      } catch (error) {}
    };

    getTicketPriority();
  }, []);

  useEffect(() => {
    const getTicketStatus = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_all_status");

        setTicketStatus(res.data);
      } catch (error) {}
    };

    getTicketStatus();
  }, []);

  return {
    ticketCategories: [ticketCategories, setTicketCategories],
    callback: [callback, setCallback],
    allTicket: [allTicket, setAllTicket],
    ticketPriority: [ticketPriority, setTicketPriority],
    ticketStatus: [ticketStatus, setTicketStatus],
  };
}

export default TicketApi;
