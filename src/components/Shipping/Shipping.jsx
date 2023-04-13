import React, { Fragment, useState } from "react";
import "./shipping.css";
import { Country, State, City } from "country-state-city";
import { saveShippingInfoFun } from "../../Redux/Actions/ShippingInfoAction";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import StepperComponent from "../Stepper/Stepper";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingInfoSlice } = useSelector((state) => state);

    const [addressState, setAddressState] = useState(shippingInfoSlice.addressState);
    const [pinCodeState, setPinCodeState] = useState(shippingInfoSlice.pinCodeState);
    const [phoneNOState, setPhoneNoState] = useState(shippingInfoSlice.phoneNOState);
    const [stateState, setStateState] = useState(shippingInfoSlice.stateState);
    const [countryState, setCountryState] = useState(shippingInfoSlice.countryState);
    const [cityState, setCityState] = useState(shippingInfoSlice.cityState);

    console.log(Country.getAllCountries());

    const shippingSubmitHandler = (e) => {
        e.preventDefault();
        if (phoneNOState.length < 10 || phoneNOState.length > 13) {
            toast.error("Phone Number must be 10 degit long");
            return;
        }

        dispatch(
            saveShippingInfoFun({
                addressState,
                pinCodeState,
                phoneNOState,
                stateState,
                countryState,
                cityState,
            })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <div className="shippingContainer">
                <StepperComponent activeStep={0} />
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmitHandler}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={addressState}
                                onChange={(e) => setAddressState(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCodeState}
                                onChange={(e) => setPinCodeState(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNOState}
                                onChange={(e) => setPhoneNoState(e.target.value)}
                                size={"10"}
                            />
                        </div>

                        <div>
                            <PublicIcon />
                            <select
                                required
                                value={countryState}
                                onChange={(e) => setCountryState(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item, index) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* ////////////////////////////////////////// */}
                        {countryState && (
                            <div>
                                <TransferWithinAStationIcon />
                                <select
                                    required
                                    value={stateState}
                                    onChange={(e) => setStateState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(countryState).map(
                                            (item, index) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                </select>
                            </div>
                        )}

                        {countryState && stateState && (
                            <div>
                                <LocationCityIcon />
                                <select
                                    required
                                    value={cityState}
                                    onChange={(e) => setCityState(e.target.value)}
                                >
                                    <option value="">City</option>
                                    {City &&
                                        City.getCitiesOfState(countryState, stateState).map(
                                            (item, index) => (
                                                <option key={item.name} value={item.name}>
                                                    {item.name}
                                                </option>
                                            )
                                        )}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value={"Continue"}
                            className="shippingBtn"
                            disabled={cityState?false :true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
