import React, { useContext, useState, useEffect } from "react";
import "./VendorSchoolGetGrand.css";
import VendorSchoolSidebar from "../VendorSchoolSidebar/VendorSchoolSidebar";
import VendorSchoolNavbar from "../VendorSchoolNavbar/VendorSchoolNavbar";
import { StateContext } from "../../context/Context";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/images/sotuvchilarMaktabi.png";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import moment from "moment";
import axios from "axios";

import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import Modal from "react-modal";
import { AllDistrict } from "../DistrictData/DistrictData";
import VendorSchoolChat from "../Vendor-SchoolChat/VendorSchoolChat";

export default function VendorSchoolGetGrand() {
  const { sidebarOpen, loggedIn } = useContext(StateContext);

  const [motivation, setMotivation] = useState("");
  const [ironBook, setIronBook] = useState("");
  const [isOrphan, setIsOrphan] = useState("");
  const [graduationGoal, setGraduationGoal] = useState("");
  const [softSkills, setSoftSkills] = useState();
  const [hardSkills, setHardSkills] = useState();
  const [courseLicense, setCourseLicense] = useState();
  const [currentAddress, setCurrentAddress] = useState();
  const [country, setCountry] = useState("");

  const [email, setemail] = useState("");
  const [specialty, setspecialty] = useState("");
  const [birthday, setBirthday] = useState("");
  const [district, setDistrict] = useState();
  const [region, setRegion] = useState();
  const [language, setLanguage] = useState();

  const [name, setName] = useState();
  const [f_name, setF_name] = useState();
  const [mobileNum, setMobileNum] = useState();
  const [married, setMarried] = useState();
  const [neighborhood, setNeighborhood] = useState();
  const [gender, setGender] = useState();
  const [street, setStreet] = useState()

  const [showGrantInput, setShowGrantInput] = useState(false);
  const [showGrantAlert, setShowGrantAlert] = useState(false);

  const [manualVideo, setManualVideo] = useState()


  const Profileincomplete = () =>
    toast.error("Ma'lumotlar to'liq emas!");
  const getGrandRequestAllert = () => toast.success("So`rov yuborildi");

  const alertInput = (e) => {
    // console.log(e.target.value);
    if (e.target.value.length < 5) {
      e.target.nextElementSibling.style.borderColor = "#e74c3c";
    } else {
      e.target.nextElementSibling.style.borderColor = "#D9D9D9";
    }
  };

  const alertInputDate = (e) => {
    const datePicker = document.querySelector(
      ".vendor-school-user-about-container-birth .MobileDatePicker fieldset"
    );
    datePicker.style.border = "2px solid #D9D9D9";
  };

  const alertInputBigValue = (e) => {
    if (e.target.value.length < 100) {
      // console.log(e.target.value);
      e.target.nextElementSibling.nextElementSibling.style.borderColor =
        "#e74c3c";
    } else {
      e.target.nextElementSibling.nextElementSibling.style.borderColor =
        "#D9D9D9";
    }
  };

  useEffect(() => {
    try {
      loggedIn &&
        axios
          .get(`${process.env.REACT_APP_API_KEY}/api/v1/accounts/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((res) => {
            setName(res.data.f_name);
            setF_name(res.data.l_name);
            // setMobileNum(res.data.phone_number);
            // setemail(res.data.email);
            setspecialty(res.data.speciality);
            // setRegion(res.data.district);
            setBirthday(
              res.data.date_birth && res.data.date_birth.replace("+05:00", "")
            );
            setCourseLicense(res.data.courses_licenses);
            setLanguage(res.data.languages);
            // setSoftSkills(res.data.soft_skill);
            // setHardSkills(res.data.hard_skill);
            setCurrentAddress(res.data.current_address);
            setDistrict(res.data.current_country);
            setCountry(res.data.country);
          });
    } catch (error) {}
  }, []);

  const getGrandRequest = async () => {
    const allNullInputs = document.querySelectorAll(
      ".get-grand-container .vendor-school-user-about-container input"
    );
    const allNullSelect = document.querySelectorAll(
      ".get-grand-container .vendor-school-user-about-container select"
    );
    const allNullArea = document.querySelectorAll(
      ".get-grand-container .vendor-school-user-about-container .Vendor-box-textareaa textarea:nth-child(odd)"
    );
    const allNullSelects = document.querySelectorAll(
      ".get-grand-container .vendor-selects input"
    );

    for (let i = 0; i < allNullInputs.length; i++) {
      if (allNullInputs[i].value.length < 5) {
        allNullInputs[i].nextElementSibling.style.borderColor = "#e74c3c";
        allNullInputs[i].nextElementSibling.style.borderWidth = "2px";
      } else {
        allNullInputs[i].nextElementSibling.style.border = "2px solid #D9D9D9";
      }
    }

    for (let i = 0; i < allNullArea.length; i++) {
      if (allNullArea[i].value.length < 100) {
        // console.log(allNullArea[i].nextElementSibling.value);

        allNullArea[i].nextElementSibling.nextElementSibling.style.border =
          "2px solid #e74c3c";
      } else {
        allNullArea[i].nextElementSibling.nextElementSibling.style.border =
          "2px solid #D9D9D9";
      }
    }

    for (let i = 0; i < allNullSelect.length; i++) {
      // console.log(allNullSelect[i]);
      if (allNullSelect[i].value.length < 5) {
        allNullSelect[i].style.borderColor = "#e74c3c";
        allNullSelect[i].style.borderWidth = "2px";
      } else {
        allNullSelect[i].style.border = "2px solid #D9D9D9";
      }
    }

    for (let i = 0; i < allNullSelects.length; i++) {
      if (allNullSelects[i].value.length < 1) {
        allNullSelects[
          i
        ].nextElementSibling.nextElementSibling.style.borderColor = "#e74c3c";
        allNullSelects[
          i
        ].nextElementSibling.nextElementSibling.style.borderWidth = "2px";
      } else {
        allNullSelects[
          i
        ].nextElementSibling.nextElementSibling.style.borderColor = " #D9D9D9";
      }
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    if (
      motivation &&
      graduationGoal &&
      ironBook &&
      isOrphan &&
      language &&
      courseLicense &&
      district &&
      currentAddress &&
      specialty &&
      region &&
      country &&
      birthday
    ) {
      try {
        const formData = new FormData();
        name && formData.append("f_name", name);
        f_name && formData.append("l_name", f_name);
        // email && formData.append("email", email);
        country && formData.append("country", country);
        region && formData.append("district", region);
        specialty && formData.append("speciality", specialty);
        language && formData.append("languages", language);
        courseLicense && formData.append("courses_licenses", courseLicense);
        district && formData.append("current_country", district);
        currentAddress && formData.append("current_address", currentAddress);
        birthday._d &&
          formData.append(
            "date_birth",
            moment(birthday._d).format("YYYY-MM-DDThh:mm")
          );

        await axios
          .put(
            `${process.env.REACT_APP_API_KEY}/api/v1/accounts/update`,
            formData,
            {
              headers,
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {});
      } catch (error) {}

      try {
        console.log(motivation);
        console.log(ironBook);
        console.log(isOrphan);
        console.log(graduationGoal);
        loggedIn &&
          (await axios
            .post(
              `${process.env.REACT_APP_API_KEY}/api/v2/accounts/post-app-to-grant-school`,
              {
                motivation: motivation && motivation,
                in_iron_book: ironBook && ironBook,
                is_orphan: isOrphan && isOrphan,
                graduation_goal: graduationGoal && graduationGoal,
              },
              { headers }
            )
            .then((res) => {
              console.log(res.data);
              console.log('ddd');
              getGrandRequestAllert();
            })
            .catch((err) => {
              refresh(err.response.status, err.response.status.text);
            }));
      } catch (error) {}
    } else {
      Profileincomplete();
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDistrict(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

 

  // useEffect(() => {
  //     try {
  //       axios.get('https://api.online-mahalla.uz/api/v1/public/district/list?area_id=301')
  //       .then((res) => console.log(res.data.data))
  //     } catch (error) {
        
  //     }
  // }, [])

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "15px",
      zIndex: "2",
      width: "600px",
    },
  };

  return (
    <div>
      <VendorSchoolNavbar />
      <VendorSchoolSidebar active={"getGrand"} />

      <div
        className={`${
          sidebarOpen ? "vs-content" : "vs-content-noactive"
        } vs-big-container`}
      >
        <div className="container">
          <div className="flex justify-between align-center mb-24 vs-title-video-box">
            <div className="vendor-title">
              <h2 className="text-black">Grantga ariza topshirish</h2>
            </div>
            <div onClick={() => setManualVideo(true)}>
              <button className="vendor-btn bg-red flex align-center justify-center radius10 pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="mr-10"
                >
                  <path
                    d="M17.999 3C9.71902 3 2.99902 9.72 2.99902 18C2.99902 26.28 9.71902 33 17.999 33C26.279 33 32.999 26.28 32.999 18C32.999 9.72 26.279 3 17.999 3ZM21.989 20.595L20.069 21.705L18.149 22.815C15.674 24.24 13.649 23.07 13.649 20.22V18V15.78C13.649 12.915 15.674 11.76 18.149 13.185L20.069 14.295L21.989 15.405C24.464 16.83 24.464 19.17 21.989 20.595Z"
                    fill="#F9F9F9"
                  />
                </svg>
                Video qo’llanma
              </button>
            </div>
          </div>

          {showGrantInput ? (
            <div className="get-grand-container vs-getGrand">
              <div className="vendor-school-user-about-container">
                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      // top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Ismingiz"
                  variant="outlined"
                  value={name || ""}
                  onChange={(e) => {
                    setName(e.target.value);
                    alertInput(e);
                  }}
                />

                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Familyangiz"
                  variant="outlined"
                  value={f_name || ""}
                  onChange={(e) => {
                    setF_name(e.target.value);
                    alertInput(e);
                  }}
                />
              </div>

              <div className="vendor-school-user-about-container vendor-school-user-about-container-birth">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    label="Tugilgan sanangiz"
                    className="MobileDatePicker"
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthday(newValue);
                      alertInputDate(newValue);
                    }}
                    sx={{
                      width: "100%",
                      marginBottom: "44px",
                      // marginTop: '44px',

                      "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "15px",
                        height: "70px",
                        border: "2px solid #D9D9D9",
                      },
                      "& .MuiOutlinedInput-input": {
                        height: "70px",
                        padding: "0 0 0 25px",
                        marginTop: "-2px",
                        fontSize: "20px",
                      },
                      "& .MuiInputLabel-root": {
                        top: "4px",
                      },
                      "& .MuiInputLabel-shrink": {
                        top: "0",
                        left: "2px",
                      },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <TextField
                  className="inputs birth-box-bottom-child"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",
                    // marginTop: '44px',

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Kasbingiz"
                  variant="outlined"
                  value={specialty || ""}
                  onChange={(e) => {
                    setspecialty(e.target.value);
                    alertInput(e);
                  }}
                />
              </div>

              <div className="vendor-school-user-about-container">
                <FormControl>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Oilaviy holatingiz
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    sx={{
                      width: "100%",
                      color: "#000",
                      marginBottom: "44px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        height: "70px",
                        border: "2px solid #D9D9D9",
                        borderRadius: "15px",
                      },
                    }}
                    value={married}
                    onChange={(e) => {
                      setNeighborhood(e.target.value);
                    }}
                    label="Oilaviy holatingiz"
                  >
                    <MenuItem value={"married"}>Uylangan</MenuItem>
                    <MenuItem value={"unmarried"}>Bo'ydoq</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Jinsingiz
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    sx={{
                      width: "100%",
                      color: "#000",
                      marginBottom: "44px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        height: "70px",
                        border: "2px solid #D9D9D9",
                        borderRadius: "15px",
                      },
                    }}
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    label="Jinsingiz"
                  >
                    <MenuItem value={"male"}>Erkak</MenuItem>
                    <MenuItem value={"female"}>Ayol</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <h4 className=" overallInfo">Tug'ilgan joyingiz</h4>
              <div className="vendor-school-user-about-container">
                <CountryDropdown
                  className="inputs mt-34 countryDropdown"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  defaultOptionLabel="Mamlakat"
                />

                <RegionDropdown
                  className="inputs mt-34 countryDropdown"
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                  defaultOptionLabel="Shahar yoki viloyat"
                />
              </div>

              <div className="vendor-school-user-about-container">
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tumaningiz</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district || ''}
                    label="Tumaningiz"
                    onChange={handleChange}
                    sx={{
                      width: "100%",
                      color: "#000",
                      marginBottom: "44px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        height: "70px",
                        border: "2px solid #D9D9D9",
                        borderRadius: "15px",
                      },
                    }}
                  >
                     {AllDistrict.map((name) => (
                      <MenuItem
                        // key={name.name_uz}
                        value={name.name_uz || ''}
                      >
                        {name.name_uz}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Mahallangiz"
                  variant="outlined"
                  value={currentAddress || ""}
                  onChange={(e) => {
                    setCurrentAddress(e.target.value);
                    alertInput(e);
                  }}
                />
                {/* <span className="LanguagesList"></span> */}
              </div>

              <div className="vendor-school-user-about-container ">
              <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Qaysi tillarni bilasiz"
                  variant="outlined"
                  value={language || ""}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    alertInput(e);
                  }}
                />

                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Qaysi kurslarni bitirgansiz"
                  variant="outlined"
                  value={courseLicense || ""}
                  onChange={(e) => {
                    setCourseLicense(e.target.value);
                    alertInput(e);
                  }}
                />
              </div>

              {/* <div className="vendor-school-user-about-container">
                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      // top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Emailingiz"
                  variant="outlined"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                    alertInput(e);
                  }}
                />

                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Hard skills"
                  variant="outlined"
                  value={hardSkills || ""}
                  onChange={(e) => {
                    setHardSkills(e.target.value);
                    alertInput(e);
                  }}
                />
              </div>

              <div className="vendor-school-user-about-container">
                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Soft skills"
                  variant="outlined"
                  value={softSkills || ""}
                  onChange={(e) => {
                    setSoftSkills(e.target.value);
                    alertInput(e);
                  }}
                />

                <TextField
                  className="inputs"
                  sx={{
                    width: "100%",
                    marginBottom: "44px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-2px",
                      fontSize: "20px",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Yashash joyingiz"
                  variant="outlined"
                  value={currentAddress || ""}
                  onChange={(e) => {
                    setCurrentAddress(e.target.value);
                    alertInput(e);
                  }}
                />
              </div> */}

              <div className="vendor-school-user-about-container vendor-school-textarea">
                <TextField
                  className="Vendor-box-textareaa"
                  id="outlined-multiline-static"
                  label="Motivatsion xat, kamida 100 ta harf"
                  multiline
                  rows={4}
                  sx={{
                    width: "100%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "20px",
                    },
                  }}
                  onChange={(e) => {
                    setMotivation(e.target.value);
                    alertInputBigValue(e);
                  }}
                />

                <TextField
                  className="Vendor-box-textareaa"
                  id="outlined-multiline-static"
                  label="Kursni bitirgandan keyingi maqsadlaringiz"
                  multiline
                  rows={4}
                  sx={{
                    width: "100%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "20px",
                    },
                  }}
                  onChange={(e) => {
                    setGraduationGoal(e.target.value);
                    alertInputBigValue(e);
                  }}
                />
              </div>

              <div className="vendor-school-user-about-container vendor vendor-selects">
                <FormControl>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Temir daftardamisiz?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    sx={{
                      width: "100%",
                      color: "#000",
                      marginBottom: "44px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        height: "70px",
                        border: "2px solid #D9D9D9",
                        borderRadius: "15px",
                      },
                    }}
                    value={ironBook}
                    onChange={(e) => {
                      setIronBook(e.target.value);
                    }}
                    label="Temir daftardamisiz?"
                  >
                    <MenuItem value={"true"}>Ha</MenuItem>
                    <MenuItem value={"false"}>Yo'q</MenuItem>
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Ota-onagizni yo’qotganmisiz
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    sx={{
                      width: "100%",
                      color: "#000",
                      marginBottom: "44px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        height: "70px",
                        border: "2px solid #D9D9D9",
                        borderRadius: "15px",
                      },
                    }}
                    value={isOrphan}
                    onChange={(e) => setIsOrphan(e.target.value)}
                    label="Ota-onagizni yo’qotganmisiz"
                  >
                    <MenuItem value={"true"}>Ha</MenuItem>
                    <MenuItem value={"false"}>Yo'q</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="school-full-width-btn">
                <button
                  className="vendor-btn bg-red middle-btn-margin-bottom"
                  onClick={() => getGrandRequest()}
                >
                  Arizani yuborish
                </button>
                <ToastContainer />
              </div>
            </div>
          ) : (
            <button
              className="vendor-btn bg-red"
              onClick={() => {
                setShowGrantInput(true);
                setShowGrantAlert(true);
              }}
            >
              Ariza topshirish
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={showGrantAlert}
        onRequestClose={() => setShowGrantAlert(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        id="modal"
      >
        <div className="iconButtonModal">
          <IconButton
            aria-label="close"
            color="inherit"
            size="normal"
            onClick={() => {
              setShowGrantAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div
          style={{
            background: "#fff",
            position: "relative",
            overflowY: "hidden",
          }}
        >
          <h4
            id="addMoneyMtcTitle"
            className="text-center"
            style={{ marginBottom: "20px", color: "red" }}
          >
            ⚠️Eslatma!
          </h4>
          <p
            style={{ fontSize: "20px", color: "#1C1C1C", marginBottom: "20px" }}
          >
            -Hurmatli student siz Grantga ariza topshirish bosqichidasiz, shu
            sababli sizga berilgan xar bir savolga to’liq va mazmunli javob
            berishingizni so’raymiz. Unutmang sizning javoblaringiz GRANT
            olishga ta’sir qiladi
          </p>

          <div className="text-center">
            <button
              className="vendor-btn bg-red"
              onClick={() => setShowGrantAlert(false)}
            >
              Ariza topshirish
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={manualVideo}
        onRequestClose={() => setManualVideo(false)}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        id="modal"
      >
        <div className="iconButtonModal">
          <IconButton
            aria-label="close"
            color="inherit"
            size="normal"
            onClick={() => {
              setManualVideo(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div
          style={{
            background: "#fff",
            position: "relative",
            overflowY: "hidden",
          }}
        >
          <iframe style={{width: '100%', height: '300px', borderRadius: '10px', margin: '20px 0'}}  src="https://www.youtube.com/embed/z6S3J45rTrg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

          <p  style={{color: "#000", fontSize: '22px'
          }}>Grantga ariza topshirish

          haqida video qo’llanma</p>

        </div>
      </Modal>
    </div>
  );
}
