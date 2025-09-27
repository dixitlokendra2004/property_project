import { BASE_URL } from "../services/constants";
import axios from "axios";

//Admin login api
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Invalid login credentials");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong. Please try again.");
  }
};

//Admin register api
export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Invalid login credentials");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong. Please try again.");
  }
};

// Add Property api
export const addProperty = async (propertyData) => {
  try {
    console.log("Sending Data:", propertyData);
    const response = await fetch(`${BASE_URL}/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });
    console.log("API Response Status:", response.status);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to add property");
    }
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

//Show properties api
export const getProperties = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/get_properties`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

//Show property detail api
const fetchProperty = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/get_property/${id}`);
    if (!response.ok) throw new Error("Property not found");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchProperty(1);

export const cancelProperty = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/cancel_property/${id}/status`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error canceling property:", error);
    return { success: false, message: "Failed to cancel property" };
  }
};

export const editProperty = async (id, propertyData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/edit_property/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    });
    if (!response.ok) {
      throw new Error("Failed to edit property");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
