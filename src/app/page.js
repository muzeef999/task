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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const Router = useRouter();
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
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.username &&
      formData.phoneNumber
    ) {
      axios
        .post("/api/signup", formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      toast.success("Register Succesfull");
      Router.push("/dashboard");
    } else {
      alert("plese fill all inputs");
    }
  };
  return (
    <div css={containerStyle} className="box1">
      <Card css={cardStyle} className="box">
        <CardContent>
          <h1 style={{ textAlign: "center" }}>SignUp</h1>
          <form required={true}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="first-name"
                  label="First name"
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="last-name"
                  label="Last name"
                  variant="outlined"
                  name="lastName"
                  fullWidth
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </Grid>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="phone-number"
                  label="Phone number"
                  variant="outlined"
                  name="phoneNumber"
                  fullWidth
                  required={true}
                  onChange={handleChange}
                  value={formData.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                />
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
