import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import edit from "../../assets/icons/gallery-edit.png";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import "./Profile.css";
import axios from "../../Apis/api";
import { useNavigate } from "react-router-dom";
import { StateContext } from "../../context/Context";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


export default function ProfileInfo() {
  const navigate = useNavigate();
  const { avatar, setAvatar, loggedIn } = useContext(StateContext);
  const [responseData, setresponseData] = useState({});
  const [gender, setGender] = useState("");
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [specialty, setspecialty] = useState("");
  const [about_me, setAbout_me] = useState("");
  const [birthday, setBirthday] = useState("");
  const [interests, setinterests] = useState("");
  const [district, setDistrict] = useState("");
  const [images, setImages] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState();
  const [telegramUrl, setTelegramUrl] = useState();
  const [youtubeUrl, setYoutubeUrl] = useState();
  const [instagramUrl, setInstagramUrl] = useState();
  const [linkedinUrl, setLinkedinUrl] = useState();
  const [githubUrl, setGithubUrl] = useState();
  const [facebookUrl, setFacebookUrl] = useState();
  const [language, setLanguage] = useState();
  const [softSkills, setSoftSkills] = useState();
  const [hardSkills, setHardSkills] = useState();
  const [courseLicense, setCourseLicense] = useState();
  const [currentAddress, setCurrentAddress] = useState();

  // const [avatar, setAvatar] = useState("")

  const sendddata = async () => {
    console.log("click");
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      const formData = new FormData();
      console.log("adwdawdadw2");
      images.img && formData.append("profile_picture", images.img);
      console.log("adwdawdadw3");
      name && formData.append("f_name", name);
      surname && formData.append("l_name", surname);
      formData.append("email", email);
      formData.append("country", country);
      formData.append("district", region);
      formData.append("speciality", specialty);
      formData.append("interests", interests);
      formData.append("about_me", about_me);
      formData.append("sex", gender);
      formData.append("youtube_url", youtubeUrl);
      formData.append("telegram_url", telegramUrl);
      formData.append("linkedin_url", linkedinUrl);
      formData.append("github_url", githubUrl);
      formData.append("instagram_url", instagramUrl);
      formData.append("facebook_url", facebookUrl);
      formData.append("languages", language);
      formData.append("soft_skill", softSkills);
      formData.append("hard_skill", hardSkills);
      formData.append("courses_licenses", courseLicense);
      formData.append("current_country", district);
      formData.append("current_address", currentAddress);
      console.log("adwdawdadw4");
      // birthday && formData.append(
        // "date_birth",
        // moment(birthday._d).format("YYYY-MM-DDThh:mm")
      // );

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
          console.log("res");
          navigate("/userAbout");
        })
        .catch((err) => {});
    } catch (error) {}
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
            setresponseData(res.data);
            setname(res.data.f_name);
            setsurname(res.data.l_name);
            setmobile(res.data.phone_number);
            setemail(res.data.email);
            setGender(res.data.sex);
            setAvatar(res.data.profile_picture);
            setspecialty(res.data.speciality);
            console.log(res.data.speciality);
            setCountry(res.data.country);
            setRegion(res.data.district);
            setAbout_me(res.data.about_me);
            setinterests(res.data.interests);
            setBirthday(
              res.data.date_birth && res.data.date_birth.replace("+05:00", "")
            );
            setGithubUrl(res.data.github_url);
            setInstagramUrl(res.data.instagram_url);
            setLinkedinUrl(res.data.linkedin_url);
            setTelegramUrl(res.data.telegram_url);
            setYoutubeUrl(res.data.youtube_url);
            setFacebookUrl(res.data.facebook_url);
            setCourseLicense(res.data.courses_licenses);
            setLanguage(res.data.languages);
            setSoftSkills(res.data.soft_skill);
            setHardSkills(res.data.hard_skill);
            setCurrentAddress(res.data.current_address);
            setDistrict(res.data.current_country);
            console.log(res.data);
            // console.log(res.data.languages);
          });
    } catch (error) {}
  }, []);

  return (
    <div className="container">
      <div className="container_body rowGrid">
        <div className="left_container col-5 col-lg-5 col-sm-24">
          {`${process.env.REACT_APP_API_KEY}${avatar}` ==
            `${process.env.REACT_APP_API_KEY}null` &&
          images.preViews == null ? (
            <svg
              class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium avatarka pointer "
              focusable="false"
              ariaHidden="true"
              viewBox="0 0 24 24"
              data-testid="AccountCircleIcon"
              ariaDescribedby="2069"
              width={"150px"}
              height="150px"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
            </svg>
          ) : (
            <img
              className="profile_picture"
              src={
                images.preViews
                  ? images.preViews
                  : `${process.env.REACT_APP_API_KEY}${avatar}`
              }
              alt=""
            />
          )}
          <div className="uploadImg">
            <input
              id="profile_picture"
              type="file"
              onChange={(e) =>
                setImages({
                  img: e.target.files[0],
                  preViews: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            <label htmlFor="profile_picture">
              <p className="d-align-center mt-30">
                <img className="smImg" src={edit} alt="img" /> Rasmni
                ozgartirish
              </p>
            </label>
          </div>
        </div>
        <div className="right_container col-16 col-lg-19 col-sm-24">
          <p className="overallInfo common">Umumiy malumotlar</p>
          <form action="">
            <div id="fioForm">
              <div className="d-flex f-direction">
                <TextField
                  className="inputs"
                  sx={{
                    width: "50%",
                    marginRight: "30px",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
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
                  label="Familiyangiz"
                  variant="outlined"
                  value={surname}
                  onChange={(e) => setsurname(e.target.value)}
                />
                <TextField
                  className="inputs"
                  sx={{
                    maxWidth: "100% !important",
                    width: "50%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                      maxWidth: "100% !important",
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
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  variant="outlined"
                />
              </div>
              <div className="d-flex f-direction f-dar">
                <TextField
                  className="inputs mt-34"
                  sx={{
                    width: "100%",
                    marginRight: "30px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
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
                  label="Telefon raqamingiz "
                  onChange={(e) => setmobile(e.target.value)}
                  variant="outlined"
                  value={mobile}
                />
                <TextField
                  className="inputs mt-30"
                  sx={{
                    width: "100%",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
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
                  label="Elektron pochtangiz"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  variant="outlined"
                />
              </div>

              <Box>
                <div className="container">
                  <div className="rowGrid">
                    <div className="col-24 col-sm-24">
                      <p className="genderTitle overallInfo">Jinsingiz</p>
                      <div className="rowGrid">
                        <div className="gender-box">
                          <input
                            className="d-none"
                            type="radio"
                            id="erkak"
                            name="gender"
                            onClick={(e) => setGender(e.target.value)}
                            value="Erkak"
                          />
                          <label
                            style={
                              responseData.sex === "Erkak"
                                ? { borderColor: "#006aff" }
                                : null
                            }
                            className="mr-30 genderBtn"
                            for="erkak"
                          >
                            Erkak
                          </label>
                          <input
                            className="d-none"
                            type="radio"
                            id="ayol"
                            name="gender"
                            onClick={(e) => setGender(e.target.value)}
                            value="Ayol"
                          />
                          <label
                            style={
                              responseData.sex === "Ayol"
                                ? { borderColor: "#006aff" }
                                : null
                            }
                            className="genderBtn"
                            for="ayol"
                          >
                            Ayol
                          </label>
                        </div>
                        <div
                          className="rowGrid col-24"
                          id="dataMobilePickerPar"
                        >
                          <div className="col-12 txtMob">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-helper-label">
                      Kasbingiz
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={specialty}
                        label="Kasbingiz"
                        onChange={(e) => setspecialty(e.target.value)}
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
                        }}>
                        <MenuItem value={"Tadbirkor"}>Tadbirkor</MenuItem>
                        <MenuItem value={"Davlat korxona xodimi"}>Davlat korxona xodimi</MenuItem>
                        <MenuItem value={"Xususiy korxona xodimi"}>Xususiy korxona xodimi</MenuItem>
                        <MenuItem value={"Talaba"}>Talaba</MenuItem>
                        <MenuItem value={"Nafaqada"}>Nafaqada</MenuItem>
                        <MenuItem value={"Uy bekasi"}>Uy bekasi</MenuItem>
                        <MenuItem value={"Abituriyent"}>Abituriyent</MenuItem>
                        <MenuItem value={"Boshqa"}>Boshqa</MenuItem>
                      </Select>
                    </FormControl>
                          </div>
                          <div className="col-12" id="dataMobilePicker">
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                              <MobileDatePicker
                                label="Tugilgan sanangiz"
                                sx={{
                                  width: "100%",
                                  color: "#000",
                                  marginBottom: "35px",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderRadius: "15px !important",
                                    height: "70px",
                                    border: "2px solid #D9D9D9",
                                  },
                                }}
                                value={birthday}
                                onChange={(newValue) => {
                                  setBirthday(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
              <p className=" overallInfo">Tug'ilgan joyingiz</p>
              <div className="d-flex f-direction f-dar country-container">
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

              {/* <div className="d-flex f-direction">
                <TextField
                  className="inputs"
                  sx={{
                    width: "50%",
                    marginRight: "30px",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
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
                  label="Telegram"
                  variant="outlined"
                  value={telegramUrl || ""}
                  onChange={(e) => setTelegramUrl(e.target.value)}
                />
                <TextField
                  className="inputs"
                  sx={{
                    maxWidth: "100% !important",
                    width: "50%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                      maxWidth: "100% !important",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Facebook"
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  value={facebookUrl || ""}
                  variant="outlined"
                />
              </div>

              <div className="d-flex f-direction">
                <TextField
                  className="inputs"
                  sx={{
                    width: "50%",
                    marginRight: "30px",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
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
                  label="Linkedin"
                  variant="outlined"
                  value={linkedinUrl || ""}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
                <TextField
                  className="inputs"
                  sx={{
                    maxWidth: "100% !important",
                    width: "50%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                      maxWidth: "100% !important",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Github"
                  onChange={(e) => setGithubUrl(e.target.value)}
                  value={githubUrl || ""}
                  variant="outlined"
                />
              </div>

              <div className="d-flex f-direction">
                <TextField
                  className="inputs"
                  sx={{
                    width: "50%",
                    marginRight: "30px",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
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
                  label="Instagram"
                  variant="outlined"
                  value={instagramUrl || ""}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />

                <TextField
                  className="inputs"
                  sx={{
                    maxWidth: "100% !important",
                    width: "50%",
                    marginBottom: "44px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "15px",
                      height: "70px",
                      border: "2px solid #D9D9D9",
                    },
                    "& .MuiOutlinedInput-input": {
                      height: "70px",
                      padding: "0 0 0 25px",
                      marginTop: "-4px",
                      fontSize: "20px",
                      maxWidth: "100% !important",
                    },
                    "& .MuiInputLabel-root": {
                      top: "4px",
                    },
                    "& .MuiInputLabel-shrink": {
                      top: "0",
                      left: "2px",
                    },
                  }}
                  label="Youtube"
                  variant="outlined"
                  value={youtubeUrl || ""}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div> */}

              <div className="d-grid">
                <div className="comments">
                  <p className="titleComments">Men haqimda</p>
                  <textarea
                    className="inputs aboutMe"
                    label="Men haqimda"
                    variant="outlined"
                    value={about_me}
                    onChange={(e) => setAbout_me(e.target.value)}
                  ></textarea>
                </div>
                {/* <TextField
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
                      marginTop: "-4px",
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
                  label="Qiziqishlarim"
                  variant="outlined"
                  value={interests}
                  onChange={(e) => setinterests(e.target.value)}
                /> */}
{/* 
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
                      marginTop: "-4px",
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
                  label="Soft Skills"
                  variant="outlined"
                  value={softSkills || ""}
                  onChange={(e) => setSoftSkills(e.target.value)}
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
                      marginTop: "-4px",
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
                  label="Hard Skills"
                  variant="outlined"
                  value={hardSkills || ""}
                  onChange={(e) => setHardSkills(e.target.value)}
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
                      marginTop: "-4px",
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
                  onChange={(e) => setLanguage(e.target.value)}
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
                      marginTop: "-4px",
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
                  label="Qaysi kurs yoki to'garakni tugatgansiz"
                  variant="outlined"
                  value={courseLicense || ""}
                  onChange={(e) => setCourseLicense(e.target.value)}
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
                      marginTop: "-4px",
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
                  label="Hozir qayerdasiz"
                  variant="outlined"
                  value={currentAddress || ""}
                  onChange={(e) => setCurrentAddress(e.target.value)}
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
                      marginTop: "-4px",
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
                  label="Qaysi tumanda yashaysiz"
                  variant="outlined"
                  value={district || ""}
                  onChange={(e) => setDistrict(e.target.value)}
                /> */}

                <Button
                  style={{
                    borderRadius: 15,
                    color: "white",
                    backgroundColor: "#80B5FF",
                    fontWeight: "500",
                    width: "1   1px",
                    height: "55px",
                  }}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  type="button"
                  onClick={sendddata}
                >
                  Saqlash
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
