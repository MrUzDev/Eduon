import React, { useContext, useEffect, useState } from "react";
import "./VendorSchool.css";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import moment from "moment";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";

import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
// import { Language } from "@mui/icons-material";

import MultiSelect from "react-select";
import makeAnimated from "react-select/animated";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ishBeruvchi from "../../assets/images/IshBeruvchi.png";
import grantBeruvchi from "../../assets/images/grantBeruvchi.png";
import Student from "../../assets/images/Student.png";
import Spiker from "../../assets/images/spiker.png";
import Logo from "../../assets/images/vendorSchoolLogo.jpg";

import GibridImg from "../../assets/images/sotuvchilarGibrid.png";
import OnlineImg from "../../assets/images/sotuvchilarOnline.png";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
// import {
//   CheckBoxOutlineBlankOutlined,
//   DraftsOutlined,
//   HomeOutlined,
//   InboxOutlined,
//   MailOutline,
//   ReceiptOutlined,
// } from "@material-ui/icons";

import {
  CheckBoxOutlineBlankOutlined,
  DraftsOutlined,
  HomeOutlined,
  InboxOutlined,
  MailOutline,
  ReceiptOutlined,
} from "@mui/icons-material";

function VendorSchool() {
  const [userType, setUserType] = useState('student');
  const { navStretch, loggedIn } = useContext(StateContext);
  const [nextBtn, setNextBtn] = useState(true);
  const [isDocsError, setIsDocsError] = useState(false);
  const [getGrandProfileErr, setGetGrandProfileErr] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [specialty, setspecialty] = useState("");
  const [birthday, setBirthday] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState();
  const [language, setLanguage] = useState();
  const [softSkills, setSoftSkills] = useState();
  const [hardSkills, setHardSkills] = useState();
  const [courseLicense, setCourseLicense] = useState();
  const [currentAddress, setCurrentAddress] = useState();
  const [country, setCountry] = useState("");

  const [compName, setCompName] = useState("");
  const [workersCount, setWorkersCount] = useState("");
  const [vacancyCount, setVacancyCount] = useState("");
  const [vacancySalary, setVacancySalary] = useState("");
  const [vacancyRate, setVacancyRate] = useState("");

  const [grandType, setGrandType] = useState("");
  const [grandSum, setGrandSum] = useState("");
  const [grantConditions, setGrantConditions] = useState("");

  const [getGrand, setGetGrand] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [ironBook, setIronBook] = useState("");
  const [isOrphan, setIsOrphan] = useState("");
  const [graduationGoal, setGraduationGoal] = useState("");

  const [vendorDays, setVendorDays] = useState("");
  const [isDay, setIsDay] = useState("");
  const [isTime, setIsTime] = useState("");
  const [FilteredisDay, setFilteredIsDay] = useState("");
  const [FilteredisTime, setFilteredIsTime] = useState("");

  const [vendorTypeCom, setVendorTypeCom] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const animatedComponents = makeAnimated();

  const navigate = useNavigate();

  const Dataincomplete = () => toast.error("Ma'lumotlar to'liq emas!");
  const technicalError = () => toast.error("Bu bo'lim hozircha mavjud emas!");
  const chooseVariant = () => toast.error("Variantlardan birini tanlang!");
  const VendorDateincomplete = () =>
    toast.error("Iltimos vaqtlardan kamida 1 tasini tanlang!");
  const Profileincomplete = () =>
    toast.error("Profile ma'lumotlari to'liq emas!");
  const CheckAdminRequest = () =>
    toast.success(" So’rovingiz qabul qilindi, siz bilan tez orada ma’sul adminlar bog’lanishadi");

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
            setname(res.data.f_name);
            setsurname(res.data.l_name);
            setmobile(res.data.phone_number);
            setemail(res.data.email);
            setspecialty(res.data.speciality);
            setRegion(res.data.district);
            setBirthday(
              res.data.date_birth && res.data.date_birth.replace("+05:00", "")
            );
            setCourseLicense(res.data.courses_licenses);
            setLanguage(res.data.languages);
            setSoftSkills(res.data.soft_skill);
            setHardSkills(res.data.hard_skill);
            setCurrentAddress(res.data.current_address);
            setDistrict(res.data.current_country);
            setCountry(res.data.country);
          });
    } catch (error) {}
  }, []);

  const postVendorSchool = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      const formData = new FormData();
      name && formData.append("f_name", name);
      surname && formData.append("l_name", surname);
      formData.append("to_school", true);

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
          isDocsError && setIsDocsError(false);
          setUserType("");
          setVendorTypeCom(true);
        })
        .catch((err) => {});
    } catch (error) {}
  };

  const registerVS = async(vendoronofli) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };

      const formData = new FormData();
      formData.append("to_school", true);

          await axios
            .put(
              `${process.env.REACT_APP_API_KEY}/api/v1/accounts/update`,
              formData,
              {
                headers,
              }
            )
            .then((res) => {});
    
            await axios
              .post(
                `${process.env.REACT_APP_API_KEY}/api/v2/accounts/post-app-to-grant-school`,
                {
                  study_type: vendoronofli
                },
                { headers }
              )
              .then((res) => {
                console.log(res.data);
                CheckAdminRequest()
              })

       
       
    } catch (error) {}
    if(vendoronofli == 'HYBRID') {
      sendTelegramMessage()
    }

    const successReg = () => {
      setVendorTypeCom(false);
      setVendorDays(true);
      navigate("/sotuvchilarMaktabi/MyCourses");
    }

    setTimeout(() => {
      successReg()
    }, 3000);
  };

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
      softSkills &&
      hardSkills &&
      courseLicense &&
      district &&
      currentAddress &&
      specialty &&
      region &&
      country &&
      email &&
      birthday
    ) {
      try {
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
              isDocsError && setIsDocsError(false);
              setGetGrand("");
              setUserType("");
              setVendorDays(true);
            })
            .catch((err) => {
              refresh(err.response.status, err.response.status.text);
            }));
      } catch (error) {}
    } else {
      Profileincomplete();
    }
  };

  const grandShareRequest = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    try {
      if (compName && grandType && grandSum && grantConditions) {
        loggedIn &&
          (await axios
            .post(
              `${process.env.REACT_APP_API_KEY}/api/v2/accounts/post-app-grand-share-school`,
              {
                comp_name: compName,
                grant_type: grandType,
                grant_sum: grandSum,
                grant_conditions: grantConditions,
              },
              { headers }
            )
            .then((res) => {
              console.log(res.data);
              setModalIsOpen(true);
            })
            .catch((err) => {
              refresh(err.response.status, err.response.status.text);
            }));
      } else {
        Dataincomplete();
      }
    } catch (error) {}
  };

  const employerRequest = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    try {
      if (
        (compName && vacancyRate && vacancySalary && vacancyCount, workersCount)
      ) {
        loggedIn &&
          (await axios
            .post(
              `${process.env.REACT_APP_API_KEY}/api/v2/accounts/post-app-work-school`,
              {
                comp_name: compName && compName,
                workers_count: workersCount && workersCount,
                vacancy_count: vacancyCount && vacancyCount,
                vacancy_salary: vacancySalary && vacancySalary,
                vacancy_rate: vacancyRate && vacancyRate,
              },
              { headers }
            )
            .then((res) => {
              console.log(res.data);
              setModalIsOpen(true);
            })
            .catch((err) => {
              refresh(err.response.status, err.response.status.text);
            }));
      } else {
        Dataincomplete();
      }
    } catch (error) {}
  };



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
    },
  };

  const vendorTimeDate = [
    { value: "Dushanba-Payshanba", label: "Dushanba-Payshanba" },
    { value: "Seshanba-Juma", label: "Seshanba-Juma" },
    { value: "Chorchanba-Shanba", label: "Chorchanba-Shanba" },
  ];
  
  const vendorTime = [
    { value: "9:30-11-30", label: "9:30-11-30" },
    { value: "14:30-16-30", label: "14:30-16-30" },
    { value: "18:30-20-30", label: "18:30-20-30" },
  ];

  async function filterDateValue() {
    if (isDay && isTime) {
      isDay &&
        isDay.forEach((element) =>
          setFilteredIsDay((val) => [...val, element.value])
        );

      isTime &&
        isTime.forEach((element) =>
          setFilteredIsTime((val) => [...val, element.value])
        );
    } else {
      VendorDateincomplete();
    }
  }

  const vendorTimeSend = async () => {
    console.log(FilteredisDay, FilteredisTime);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/accounts/update`,
          {
            lesson_time: FilteredisDay + " " + FilteredisTime,
          },
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res.data);
          setModalIsOpen(true);
        })
        .catch((err) => {
          console.log("error time vendor");
        });
    } catch (error) {}
  };

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

  const sendTelegramMessage = () => {

    let tg = {
        token: "6385168505:AAFMNKikz8XkwRe6aJazZecAM0lLu-AyBt0",
        chat_id: "@smt_users",
        messageValue: `ism familya: ${name} ${surname},\n nomer: ${mobile}` 
        // messageValue: "Hello\nworld"   
    }

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
        try {
          axios.get(`https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&&text=${tg.messageValue}`,
          {
            config
          })
        } catch (error) {
          
        }
  
}

  useEffect(() => {
    FilteredisDay && FilteredisTime && vendorTimeSend();
  }, [FilteredisDay]);

  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="Vendor-School">
          <div className="container">
            <div className="vendor-school-title">
              <h2>Ro'yxatdan o'tish</h2>

              {/* <div className="flex justify-center align-center gap-1">
                <span
                  onClick={() => {
                    setVendorTypeCom(false);
                    setNextBtn(false);
                    setVendorOnliOfli("");
                  }}
                ></span>
                <span
                  className={(vendorOnliOfli != "") | vendorDays ? "" : "role2"}
                ></span>
              </div> */}
            </div>
            {!nextBtn && (
              <div className="vendor-question-user-type">
                <div className="vendor-school-question width-100">
                  <h5 className="mb-24 text-center">
                    Saytda kim sifatida ro'yxatdan o'tmoqchisiz?
                  </h5>

                  <div className="vendor-types-center flex justify-center align-center gap-2">
                    <div>
                      <img
                        className={`${
                          userType === "employer" && "active"
                        } pointer vendor-type`}
                        src={ishBeruvchi}
                        alt="employer"
                      />
                      <p
                        onClick={() =>
                          // setUserType("employer")
                          technicalError()
                        }
                      >
                        Ish beruvchi
                      </p>
                    </div>
                    <div>
                      <img
                        className={`${
                          userType === "student" && "active"
                        } pointer vendor-type`}
                        src={Student}
                        alt="student"
                      />
                      <p onClick={() => setUserType("student")}>Student</p>
                    </div>
                  </div>

                  <div className="flex justify-center align-center pointer mb-50 vendor-types-center gap-2">
                    <div>
                      <img
                        className={`${
                          userType === "grandGiver" && "active"
                        } vendor-type`}
                        src={grantBeruvchi}
                        alt="grantBeruvchi"
                      />
                      <p
                        onClick={() =>
                          // setUserType("grandGiver")
                          technicalError()
                        }
                      >
                        Grant beruvchi
                      </p>
                    </div>
                    <div>
                      <img
                        className={`${
                          userType === "Spiker" && "active"
                        } vendor-type`}
                        src={Spiker}
                        alt="Spiker"
                      />
                      <p
                        onClick={() =>
                          // setUserType("Spiker")
                          technicalError()
                        }
                      >
                        Spiker
                      </p>
                    </div>
                  </div>
                  <ToastContainer />

                  {/* <div className="vendor-question-types">
                    <h2
                      className={userType === "student" && "active"}
                      onClick={() => setUserType("student")}
                    >
                      Student
                    </h2>
                    <h2
                      className={userType === "employer" && "active"}
                      onClick={() => setUserType("employer")}
                    >
                      Ish Beruvchi
                    </h2>
                    <h2
                      className={userType === "grandGiver" && "active"}
                      onClick={() => setUserType("grandGiver")}
                    >
                      Grant Beruvchi
                    </h2>
                  </div> */}

                  <div className="vendor-question-btn d-flex flex-full">
                    <button
                      className="vendor-btn"
                      onClick={() => {
                        userType && setNextBtn(true);
                        userType && setVendorTypeCom(true);
                      }}
                    >
                      Davom etish
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="vendor-school-content">
              {/* {nextBtn && userType === "student" && (
                <div className="ven-con-box">
                  <div className="vendor-school-title">
                    <h2>Profilni to’ldiring</h2>
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
                      label="Telefon raqamingiz"
                      variant="outlined"
                      value={mobile || ""}
                      onChange={(e) => setmobile(e.target.value)}
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
                      label="Ismingiz"
                      variant="outlined"
                      value={name || ""}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>

                  <div className="vendor-school-user-about-container vendor-school-textarea">
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
                      value={surname || ""}
                      onChange={(e) => setsurname(e.target.value)}
                    />
                  </div>

                  <div className="get-grand">
                    <div className="get-grand-title">
                      <button
                        className="grant-btn"
                        onClick={() => {
                          setGetGrand(true);
                          setUserType("");
                        }}
                      >
                        Grantga ariza topshirish
                      </button>
                    </div>
                  </div>

                  <button
                    className="vendor-btn middle-btn-margin-bottom"
                    onClick={() => postVendorSchool()}
                  >
                    Davom etish
                  </button>
                </div>
              )} */}
              {getGrand && (
                <div className="get-grand-container">
                  <div className="vendor-school-title">
                    <h3>Grantga ariza topshirish</h3>
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
                      label="Qaysi Tumanda Yashaysiz"
                      variant="outlined"
                      value={district || ""}
                      onChange={(e) => {
                        setDistrict(e.target.value);
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
                      label="Qaysi tillarni bilasiz"
                      variant="outlined"
                      value={language || ""}
                      onChange={(e) => {
                        setLanguage(e.target.value);
                        alertInput(e);
                      }}
                    />
                    <span className="LanguagesList"></span>
                  </div>

                  <div className="vendor-school-user-about-container vendor-school-textarea">
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
                  </div>

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
                      className="vendor-btn middle-btn-margin-bottom"
                      onClick={() => getGrandRequest()}
                    >
                      Arizani yuborish
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              )}

              {vendorTypeCom && (
                <div className="vendor-types-container">
                  <div className="vendor-school-title">
                    <h2>Qaysi shaklda o’qimoqchisiz?</h2>
                  </div>

                  <div className="vendor-types-box flex-full gap-2">
                    <div className="vendor-types-img-box">
                      <button
                        className="vendor-types-img-box-img"
                        onClick={() => {registerVS('HYBRID')}}>
                        <img src={GibridImg} alt="" />
                        <button className="vendor-btn-2 margin-y-2">Offline+online=gibrid</button>
                      <div></div>
                      </button>
                    </div>

                    <div className="vendor-types-img-box">
                      <button
                        className="vendor-types-img-box-img"
                        onClick={() => { registerVS()}}>
                         <img src={OnlineImg} alt="" />
                         <button className="vendor-btn-2 margin-y-2">Faqat online</button>
                      <div></div>
                      </button>
                    </div>
                  </div>
                  <div className="flex-full">
                    <ToastContainer />
                  </div>
                </div>
              )}

              {vendorDays && (
                <div className="vendor-days-container">
                  <div className="vendor-school-title">
                    <h2>Kursga yozilish</h2>
                    <p>
                      O’zingizga qulay bo’lgan kamida 2 ta hafta kunlari va
                      kamida 2 ta dars soatlarini tanlang:
                    </p>
                  </div>

                  <div className="vendor-days-input">
                    <MultiSelect
                      isMulti
                      isLoading={isLoading}
                      placeholder="Dars kunlarini tanlang"
                      options={vendorTimeDate}
                      components={animatedComponents}
                      className="vendor-time-select basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => setIsDay(e)}
                    />

                    <MultiSelect
                      isMulti
                      isLoading={isLoading}
                      placeholder="Dars vaqtini tanlang"
                      options={vendorTime}
                      components={animatedComponents}
                      className="vendor-time-select basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => setIsTime(e)}
                    />
                  </div>

                  <div className="vendor-days-txt">
                    <p>
                      Kuratorlar arizangizni ko’rib chiqib kursga qabul
                      qilishadi*
                    </p>
                  </div>
                  <button className="vendor-btn" onClick={filterDateValue}>
                    Tasdiqlash
                  </button>
                  <ToastContainer />
                </div>
              )}

              {nextBtn && userType === "employer" && (
                <div className="ven-con-box">
                  <div className="vendor-school-title">
                    <h2>Ish beruvchi profilni to’ldiring</h2>
                  </div>
                  <div className="vendor-school-user-about-container vendor-school-textarea">
                    <TextField
                      className="inputs"
                      sx={{
                        width: "100%",
                        marginBottom: "44px",

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: "15px",
                          border: "2px solid #D9D9D9",
                        },
                        "& .MuiOutlinedInput-input": {
                          marginTop: "-2px",
                          fontSize: "20px",
                        },
                      }}
                      label="Tashkilotingiz nomi"
                      variant="outlined"
                      value={compName || ""}
                      onChange={(e) => setCompName(e.target.value)}
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
                      label="Korxonangizdachi ishchilar soni"
                      variant="outlined"
                      value={workersCount || ""}
                      onChange={(e) => setWorkersCount(e.target.value)}
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
                      label="Nechta xodim olmoqchisiz"
                      variant="outlined"
                      value={vacancyCount || ""}
                      onChange={(e) => setVacancyCount(e.target.value)}
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
                      label="Nech pul oylik taklif qilasiz"
                      variant="outlined"
                      value={vacancySalary || ""}
                      onChange={(e) => setVacancySalary(e.target.value)}
                    />

                    <FormControl>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Xodimlarni qanday tartibda olmoqchisiz?
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
                        value={vacancyRate}
                        onChange={(e) => setVacancyRate(e.target.value)}
                        label="Xodimlarni qanday tartibda olmoqchisiz?"
                      >
                        <MenuItem value={"internship"}>Stajirovka</MenuItem>
                        <MenuItem value={"half_rate"}>Yarim stavka</MenuItem>
                        <MenuItem value={"constant"}>Doimiy</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="school-full-width-btn">
                    <button
                      className="vendor-btn middle-btn-margin-bottom"
                      onClick={() => employerRequest()}
                    >
                      Arizani yuborish
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              )}

              {nextBtn && userType === "grandGiver" && (
                <div className="ven-con-box">
                  <div className="vendor-school-title">
                    <h2>Grant beruvchi profilni to’ldiring</h2>
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
                      label="Tashkilotingiz nomi"
                      variant="outlined"
                      value={compName || ""}
                      onChange={(e) => setCompName(e.target.value)}
                    />

                    <FormControl>
                      <InputLabel id="demo-simple-select-helper-label">
                        Kimlarga grant ajratasiz
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={grandType}
                        label="Kimlarga grant ajratasiz"
                        onChange={(e) => setGrandType(e.target.value)}
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
                          },
                        }}
                      >
                        <MenuItem value={"NEED"}>Muhtojlarga</MenuItem>
                        <MenuItem value={"SKILL"}>Qobiliyatlilarga</MenuItem>
                      </Select>
                    </FormControl>
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
                      label="Siz bermoqchi bo'lgan grand miqdori"
                      variant="outlined"
                      value={grandSum || ""}
                      onChange={(e) => setGrandSum(e.target.value)}
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
                      label="Grand sharti"
                      variant="outlined"
                      value={grantConditions || ""}
                      onChange={(e) => setGrantConditions(e.target.value)}
                    />
                  </div>

                  <div className="school-full-width-btn middle-btn-margin-bottom">
                    <button
                      className="vendor-btn"
                      onClick={() => grandShareRequest()}
                    >
                      Arizani yuborish
                    </button>
                    <ToastContainer />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Collapse in={isDocsError}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setIsDocsError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          className="alert animation"
          severity="error"
        >
          <strong>
            <p style={{ fontSize: "18px" }}>Ma'lumotlar to'liq emas!</p>
          </strong>
        </Alert>
      </Collapse>

      <Collapse in={getGrandProfileErr}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setGetGrandProfileErr(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          className="alert animation"
          severity="error"
        >
          <strong>
            <p style={{ fontSize: "18px" }}>
              Profile ma'lumotlari to'liq emas!
            </p>
          </strong>
        </Alert>
      </Collapse>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="iconButtonModal">
          <IconButton
            aria-label="close"
            color="inherit"
            size="normal"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
        <div style={{ background: "#fff" }}>
          <img
            src="https://images.squarespace-cdn.com/content/v1/6209fc508f791e729abec7d0/18641903-a848-4a3a-a0a3-c9e2ddaa15c4/02-lottie-tick-01-instant-2.gif"
            alt=""
          />
          <h4>So'rovingiz muvaffaqiyatli yuborildi!</h4>
        </div>
        <button className="vendor-btn" onClick={() => navigate("/")}>
          Ortga qaytish
        </button>
      </Modal>
    </>
  );
}

export default VendorSchool;
