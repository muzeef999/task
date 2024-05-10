"use client";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
} from "@mui/material";
import { css } from "@emotion/react";
import axios from "axios";

import { useState } from "react";
export default function Home() {
  const containerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 50px;
  `;

  const cardStyle = css`
    width: 300px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  `;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    username: "",
    // Add more fields as needed
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the state with the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      axios
        .post("http://localhost:3000/api/signin", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
    }
    const errors = {};
    // Check if any field is empty
    if (!formData.email) errors.email = "Please fill in this field";
    if (!formData.password) errors.password = "Please fill in this field";

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData); // Submit form if no errors
    }
  };
  return (
    <div css={containerStyle} className="box">
      <Card css={cardStyle}>
        <CardContent>
          <h1 style={{ textAlign: "center" }}>SignUp</h1>
          <form required={true}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  value={formData.email}
                />
                 {errors.email && (
                  <span style={{ color: "red" }}>please fill this filled</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  name="password"
                  fullWidth
                  type="password"
                  onChange={handleChange}
                  value={formData.password}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>please fill this filled</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleButtonClick}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
