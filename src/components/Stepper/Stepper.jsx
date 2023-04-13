import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import React from "react";
import "./stepper.css";

const StepperComponent = ({ activeStep }) => {
  const steps = [
    {
      lable: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },

    {
      lable: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },

    {
      lable: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <div className="steperContainer">
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel icon={item.icon} style={{
                color:activeStep >= index ?"tomato":"rgba(0,0,0,0.365",
               
            }}>{item.lable}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default StepperComponent;
