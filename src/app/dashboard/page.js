"use client";
import axios from "axios";
import React, { useEffect } from "react";
import useSWR from "swr";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { FaUserCircle } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { IoAddSharp } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetails,
  selectTotalFollowers,
  updateQuality,
} from "../Redux/Userslice";

const Page = () => {
  const dispatch = useDispatch();

  const userdetails = useSelector((state) => state.user.Followers);

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const qtyChangeHandler = (userId, followers) => {
    dispatch(updateQuality({ userId, followers }));
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
        gap: "20px",
      }}
    >
      {userdetails.map((i) => (
        <Card
          key={i._id}
          className="wrapper"
          style={{ width: "90%", display: "flex", margin: "10px" }}
        >
          <CardContent
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <FaUserCircle size={60} style={{ color: "#a6a6a6" }} />
            </div>
            <div>
              <div>
                <p style={{ fontSize: "24px" }}>{i.username}</p>
              </div>
              <div>
                <p style={{ fontSize: "22px" }}>{i.firstName}</p>
              </div>
            </div>

            <div>
              <span className="cartqty">
                <Button
                  variant="contained"
                  onClick={() => qtyChangeHandler(i._id, i.followers - 1)}
                  disabled={i.quantity == 1}
                >
                  <RiSubtractLine /> Increase Followers
                </Button>
                <p>Followers:{i.followers}</p>
                <Button
                  variant="contained"
                  onClick={() => qtyChangeHandler(i._id, i.followers + 1)}
                >
                  <IoAddSharp /> Increase Followers
                </Button>
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Page;
