import { useState, useEffect } from "react";
import axios from "axios";

function CategoriesApi() {
  const [categories, setCategories] = useState([]);
  const [categoryPriority, setCategoryPriority] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_all_category");

        setCategories(res.data);
      } catch (err) {
        alert(err);
      }
    };

    getAllCategory();
  }, [callback]);

  useEffect(() => {
    const getCategoryPriority = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/get_all_priority");

        setCategoryPriority(res.data);
      } catch (error) {}
    };

    getCategoryPriority();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
    categoryPriority: [categoryPriority, setCategoryPriority],
  };
}

export default CategoriesApi;
