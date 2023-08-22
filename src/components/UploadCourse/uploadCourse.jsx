import { TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/Context";
import "./uploadCourse.css";
import uploadIcon from "../../assets/icons/send-square.png";
import axios from "../../Apis/api";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import ModuleUpload from "../ModuleUpload/ModuleUpload";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SidebarActive from "../Sidebar/SidebarActive";
import { BounceLoader } from "react-spinners";
import NavbarSm from "../Navbar/NavbarSm";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Alert } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import FormHelperText from '@mui/material/FormHelperText';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UploadCourse() {
  const { navStretch, courseUpBool, setCourseUpBool, streamStart } =
    useContext(StateContext);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [lang, setLang] = useState("");
  const [level, setLevel] = useState("");
  // const [image, setImage] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [learn, setLearn] = useState(EditorState.createEmpty());
  const [whomCourse, setWhomCourse] = useState("");
  // const [students, setStudents] = useState("");
  const [price, setPrice] = useState("");
  const [decr, setDecr] = useState(EditorState.createEmpty());
  // const [discontPrice, setDiscontPrice] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [trailerVideo, setTrailerVideo] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState([]);
  const [subValue, setSubValue] = useState("");
  const [exchangeUrl, setExchangeUrl] = useState("");
  const [recommendation, setRecommendation] = useState(
    EditorState.createEmpty()
  );
  const [showModule, setShowModule] = useState(false);
  const [error, setError] = useState(false);
  const [courseCategory, setcourseCategory] = useState([]);
  const [courseId, setCourseId] = useState();
  const [courseUploaded, setcourseUploaded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [imageError, setimageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [checkVideoSend, setCheckVideoSend] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [vebinarName, setVebinarName] = useState("");
  const [vebinarLanguage, setVebinarLanguage] = useState("");
  const [aboutVebinar, setAboutVebinar] = useState(EditorState.createEmpty());
  const [streamPrice, setStreamPrice] = useState(0);
  const [tokenDay, setTokenDay] = useState("");
  const [tokenTime, setTokenTime] = useState("");
  const [streamErr, setStreamErr] = useState(false);
  const [spikerStream, setSpikerStream] = useState(false);
  const [addSpeakerNum, setAddSpeakerNum] = useState("");
  const [addSpeakerId, setAddSpeakerId] = useState();
  const [errorUploadVideo, setErrorUploadVideo] = useState(false);

  const [youTubeLink, setYouTubeLink] = useState();
  const [vebinarType, setVebinarType] = useState('');

  const [platform, setPlatform] = useState()

  const navigate = useNavigate();

  const UploadError = () => toast.error("Ma`lumotlar to`liq emas!");

  const onChangeEditor = (e) => {
    setAboutVebinar(e);
  };

  const onChangerecommendation = (e) => {
    courseUpBool === false && setCourseUpBool(true);
    setRecommendation(e);
  };

  const onChangeEditorCourse = (e) => {
    courseUpBool === false && setCourseUpBool(true);
    setDecr(e);
  };

  const onChangeLearn = (e) => {
    courseUpBool === false && setCourseUpBool(true);
    setLearn(e);
  };

  const uploadVideo = async (e) => {
    e.preventDefault();
    setLoader(true);
    const headers = {
      "Content-type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      const formData = new FormData();
      formData.append("video", trailerVideo.video);
      // checkVideoSend &&
      await axios
        // .post("http://92.63.206.134:8080/media/upload", formData, { headers })
        .post(`${process.env.REACT_APP_STREAM_API}/media/upload`, formData, {
          headers,
        })
        .then((res) => {
          console.log(res.data);
          senddata(res.data.urls);
        })
        .catch((err) => {
          console.log(err);
          setErrorUploadVideo(true);
          setLoader(false);
          setVideoError(true);
          setCheckVideoSend(true);
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };

  const senddata = async (url) => {
    setLoader(true);
    const filteredCategory = courseCategory.filter(
      (item) => item.name == category
    )[0];
    const filteredSubCategory = filteredCategory.subcategory.filter(
      (sub) => sub.name == subValue
    )[0];
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("lang", lang);
      formData.append(
        "short_descr",
        draftToHtml(convertToRaw(decr.getCurrentContent()))
      );
      formData.append("level", level);
      formData.append("whom_this_course", whomCourse);
      formData.append("category", filteredCategory.id);
      formData.append("subcategory", filteredSubCategory.id);
      formData.append("cover_img", coverImg.img);
      // formData.append("trailer_file", trailerVideo.video);
      if (url.p1080) {
        formData.append("trailer_url", url.p1080);
        setVideoUrl(url.p1080);
      } else if (url.p720) {
        formData.append("trailer_url", url.p720);
        setVideoUrl(url.p720);
      } else if (url.p480) {
        formData.append("trailer_url", url.p480);
        setVideoUrl(url.p480);
      } else if (url.p360) {
        formData.append("trailer_url", url.p360);
        setVideoUrl(url.p360);
      } else {
        url.p240 && formData.append("trailer_url", url.p240);
        setVideoUrl(url.p240);
      }
      // url.p1080
      //   ? formData.append("trailer_url", url.p1080)
      //   : url.p720
      //   ? formData.append("trailer_url", url.p720)
      //   : url.p480
      //   ? formData.append("trailer_url", url.p480)
      //   : url.p360
      //   ? formData.append("trailer_url", url.p360)
      //   : url.p240 && formData.append("trailer_url", url.p240);

      formData.append("key_words", keyWords);
      formData.append("platform", platform);
      formData.append(
        "what_to_learn",
        draftToHtml(convertToRaw(learn.getCurrentContent()))
      );
      formData.append("price", parseInt(price));
      formData.append("exchange_url", null);
      formData.append(
        "recommendation",
        draftToHtml(convertToRaw(recommendation.getCurrentContent()))
      );
      formData.append("type", price ? "PAID" : "FREE");
      // formData.append("trailer_url", "https://youtube.com");

      await axios
        // .post("${process.env.REACT_APP_API_KEY}/api/v1/courses/", formData, { headers })
        .post(`${process.env.REACT_APP_API_KEY}/api/v1/courses/`, formData, {
          headers,
        })
        .then((res) => {
          setCourseId(res.data.id);
          console.log(res);
          setcourseUploaded(true);
          setLoader(false);
          setCourseUpBool(false);
          seterrorMessage("");
          setimageError(false);
        })
        .catch((err) => {
          setError(true);
          setLoader(false);
          seterrorMessage(
            "Kurs yuklashda xatolik yuz berdi! Umumiy va qo'shimcha ma'lumotlarni tekshirib ko'ring"
          );
          refresh(err.response.status, err.response.status.text);
          if (
            !coverImg.img.name.includes(".apng") ||
            !coverImg.img.name.includes(".avif") ||
            !coverImg.img.name.includes(".gif") ||
            !coverImg.img.name.includes(".jpg") ||
            !coverImg.img.name.includes(".jpeg") ||
            !coverImg.img.name.includes(".jfif") ||
            !coverImg.img.name.includes(".pjpeg") ||
            !coverImg.img.name.includes(".pjpeg") ||
            !coverImg.img.name.includes(".png") ||
            !coverImg.img.name.includes(".svg") ||
            !coverImg.img.name.includes(".webp")
          ) {
            setimageError(true);
          }
        });
    } catch (error) {
      refresh(error.response.status, error.response.status.text);

      // setErrorMessage("Kurs yuklashda xatolik yuz berdi! Umumiy va Qo'shimcha ma'lumotlarni qayta tekshirib ko'ring")
    }
  };

  useEffect(() => {
    // const filteredCategory = courseCategory.filter(
    //   (item) => item.name == category
    //   )[0];
    //   const filteredSubCategory = filteredCategory.subcategory.filter(
    //     (sub) => sub.name == subValue
    //     )[0];
    // console.log(filteredCategory.id);
    // console.log(filteredSubCategory.id);
  }, []);

  useEffect(() => {}, [trailerVideo]);
  const updateData = async () => {
    const filteredCategory = courseCategory.filter(
      (item) => item.name == category
    )[0];
    const filteredSubCategory = filteredCategory.subcategory.filter(
      (sub) => sub.name == subValue
    )[0];

    console.log(filteredSubCategory.id);

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("lang", lang);
      formData.append(
        "short_descr",
        draftToHtml(convertToRaw(decr.getCurrentContent()))
      );
      formData.append("level", level);
      formData.append("whom_this_course", whomCourse);
      formData.append("category", filteredCategory.id);
      formData.append("subcategory", filteredSubCategory.id);
      coverImg.img && formData.append("cover_img", coverImg.img);
      // trailerVideo.video && formData.append("trailer_file", trailerVideo.video);
      formData.append("key_words", keyWords);
      formData.append("platform", platform);
      formData.append(
        "what_to_learn",
        draftToHtml(convertToRaw(learn.getCurrentContent()))
      );
      formData.append("price", parseInt(price));
      formData.append("exchange_url", exchangeUrl);
      formData.append(
        "recommendation",
        draftToHtml(convertToRaw(recommendation.getCurrentContent()))
      );
      formData.append("type", price ? "PAID" : "FREE");
      videoUrl && formData.append("trailer_url", videoUrl);

      formData.append("discount_price", 0);

      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/${courseId}`,
          formData,
          {
            headers,
          }
        )
        .then((res) => {
          setCourseId(res.data.id);
          setCourseUpBool(false);
          setLoader(false);
        })
        .catch((err) => {
          setError(true);
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {
      refresh(error.response.status, error.response.status.text);
    }
  };

  useEffect(() => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      axios

        .get(`${process.env.REACT_APP_API_KEY}/api/v1/courses/categories/`, {
          headers,
        })
        .then((res) => {
          setcourseCategory(res.data);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {
      refresh(error.response.status, error.response.status.text);
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const filteredCategory = courseCategory.filter(
      (item) => item.name == category
    )[0];
    setSubcategory(filteredCategory ? filteredCategory.subcategory : []);
  }, [category]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "4px solid #006aff",
    borderRadius: "15px",
    boxShadow: 24,
    p: 5,
  };

  const vebinarCreate = async () => {
    if(vebinarType && vebinarName && tokenDay.$y && tokenTime.$H && vebinarLanguage && coverImg.img) {
      setLoader(true);
      const streamErrFnc = setTimeout(streamErrOff, 3000);
  
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        };
  
        const formData2 = new FormData();
        formData2.append("name", vebinarName);
        formData2.append(
          "start_time",
          `${tokenDay.$y}-${tokenDay.$M + 1}-${tokenDay.$D}T${tokenTime.$H}:${
            tokenTime.$m
          }`
        );
        formData2.append(
          "short_descr",
          draftToHtml(convertToRaw(aboutVebinar.getCurrentContent()))
        );
        formData2.append("lang", vebinarLanguage);
        formData2.append(
          "type",
          streamPrice == 0 ||
            streamPrice == "0" ||
            streamPrice == "" ||
            streamPrice == " "
            ? "FREE"
            : "PAID"
        );
        formData2.append("price", streamPrice);
        formData2.append("discount_price", 0);
        formData2.append("cover_img", coverImg.img);
        formData2.append("is_valid", "ON HOLD");
        formData2.append("trailer_file", trailerVideo && trailerVideo.video);
        formData2.append('webinar_type', vebinarType)
        formData2.append('youtube_link', youTubeLink ? youTubeLink.replace('watch?v=' , 'embed/') : null)
  
        
        await axios
          .post(
            `${process.env.REACT_APP_API_KEY}/api/v2/stream/webinar-create/`,
            formData2,
            {
              headers,
            }
          )
          .then((res) => {
            addSpeakerNum ? addSpeaker(res.data.id) : setLocalStream(res);
          })
          .catch((err) => {
            console.log(err);
            console.log("xato");
            setStreamErr(true);
            streamErrFnc();
          });
      } catch (error) {
        setStreamErr(true);
        streamErrFnc();
      }
    }else {
      UploadError()
    }
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    addSpeakerNum &&
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v2/stream/students-filter/${addSpeakerNum}`,
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res.data[0].id);
          setAddSpeakerId(res.data[0].id);
        });
  }, [addSpeakerNum]);

  const addSpeaker = (vebinarId) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    addSpeakerId &&
      axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v2/stream/add-user-to-speaker/`,
          {
            webinar_id: vebinarId && vebinarId,
            user_id: addSpeakerId,
          },
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res.data);
          setLocalStream(res);
        })
        .catch((err) => console.log(err));
  };

  const streamErrOff = () => setStreamErr(false);

  const setLocalStream = (data) => {
    const streamErrFnc = setTimeout(streamErrOff, 3000);

    if (data) {
      setSpikerStream(true);
      setLoader(false);
      navigate("/speaker");
    } else {
      console.log("error stream form");
      setStreamErr(true);
      streamErrFnc();
    }
  };
  return (
    <>
      <NavbarDemo />
      <NavbarSm />
      <SidebarActive active={5} />
      <div
        className={
          navStretch ? "courses coursesSm ml-240" : "courses coursesSm ml-100"
        }
      >
        <div className="container">
          <div className="upload-course">
            {/* <h1 className="title">Kurs yuklash</h1> */}
            <form>
              <Box className="mt-100" sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    {streamStart ? (
                      <>
                        <Tab
                          label="Jonli vebinarni yuklash"
                          {...a11yProps(0)}
                        />
                        {/* <Tab label="Qo'shimcha ma'lumotlar" {...a11yProps(1)} /> */}
                      </>
                    ) : (
                      <>
                        <Tab
                          label="Kurs umumiy ma'lumotlari"
                          {...a11yProps(0)}
                        />
                        <Tab label="Qo'shimcha ma'lumotlar" {...a11yProps(1)} />
                        <Tab
                          // disabled={
                          //   price &&
                          //   learn &&
                          //   lang &&
                          //   decr &&
                          //   level &&
                          //   whomCourse &&
                          //   coverImg.img &&
                          //   keyWords
                          //     ? false
                          //     : true
                          // }
                          onClick={(e) => {
                            if (
                              name &&
                              price &&
                              learn &&
                              lang &&
                              decr &&
                              level &&
                              whomCourse &&
                              coverImg.img &&
                              keyWords &&
                              trailerVideo
                            ) {
                              if (courseUpBool === null) {
                                uploadVideo(e);
                              } else if (courseUpBool === true) {
                                updateData();
                              }
                            } else {
                              setOpen(true);
                            }
                          }}
                          label="Video yuklash"
                          {...a11yProps(
                            price &&
                              learn &&
                              lang &&
                              decr &&
                              level &&
                              whomCourse &&
                              coverImg.img &&
                              keyWords &&
                              2
                          )}
                        />
                      </>
                    )}
                  </Tabs>
                </Box>
                {streamStart ? (
                  <div id="vebinar-container">
                    <TabPanel value={value} index={0}>
                      <div className="rowGrid">
                        <div className="col-12 col-sm-24 relative">
                          <TextField
                            className="inputs"
                            sx={{
                              width: "100%",
                              marginBottom: "30px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "15px",
                                height: "70px",
                                border: "2px solid #D9D9D9",
                              },
                              "& .MuiOutlinedInput-input": {
                                height: "70px",
                                padding: "0 0 0 25px",
                              },
                              "& .MuiInputLabel-root": {
                                top: "6.5px",
                              },
                              "& .MuiInputLabel-shrink": {
                                top: "0",
                                left: "2px",
                              },
                            }}
                            label="Vebinar nomi"
                            variant="outlined"
                            onChange={(e) => {
                              setVebinarName(e.target.value);
                            }}
                            value={vebinarName}
                          />
                          {vebinarName.length != 0 ? null : (
                            <NewReleasesIcon fill="red" className="required" />
                          )}
                        </div>
                        <div className="col-12 col-sm-24 lang relative select">
                          <FormControl fullWidth>
                            <InputLabel
                              className="inputLabel"
                              id="demo-simple-select-label"
                            >
                              Vebinar tili
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={vebinarLanguage}
                              label="Bo'lim"
                              onChange={(e) => {
                                setVebinarLanguage(e.target.value);
                              }}
                              sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "75px !important",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "75px !important",
                                  padding: "0 0 0 25px",
                                },

                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                            >
                              <MenuItem value="O'zbekcha">O'zbek</MenuItem>
                              <MenuItem value="RUSSIAN">Русский</MenuItem>
                              <MenuItem value="ENGLISH">English</MenuItem>
                            </Select>
                          </FormControl>

                          {vebinarLanguage.length != 0 ? null : (
                            <NewReleasesIcon fill="red" class="required" />
                          )}
                        </div>

                        <div className="col-12 col-sm-24">
                          <h2 className="miniTitle">Vebinar treyleri</h2>

                          <div className="button-upload relative">
                            <label htmlFor="trailerVideo">
                              <img
                                src={uploadIcon}
                                alt="..."
                                className="mr-10"
                              />
                              {trailerVideo.video
                                ? trailerVideo.video.name.slice(0, 18)
                                : "Yuklash"}
                            </label>
                            <input
                              id="trailerVideo"
                              type="file"
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                // setCheckVideoSend(true);
                                console.log("hello");
                                setTrailerVideo({
                                  video: e.target.files[0],
                                  // preViews: URL.createObjectURL(e.target.files[0]),
                                });
                              }}
                            />
                          </div>
                          {videoError && (
                            <p className="error-messageee">
                              Video yuklashda xatolik yuz berdi
                            </p>
                          )}
                        </div>

                        <div className="col-12 col-sm-24">
                          {imageError && (
                            <p className="error-messageee">
                              Mavjud rasm formatlari : .apng, .avif, .gif, .jpg,
                              .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .webp
                            </p>
                          )}

                          <h2 className="miniTitle">Vebinar muqovasi</h2>
                          <div className="button-upload relative">
                            <label htmlFor="coverImg">
                              <img
                                src={uploadIcon}
                                alt="..."
                                className="mr-10"
                              />
                              {coverImg.img
                                ? coverImg.img.name.slice(0, 18)
                                : "Yuklash"}
                              {coverImg.img &&
                                console.log(
                                  coverImg.img.name.includes(".png"),
                                  221
                                )}
                            </label>
                            <input
                              id="coverImg"
                              type="file"
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                setCoverImg({
                                  img: e.target.files[0],
                                  preViews: URL.createObjectURL(
                                    e.target.files[0]
                                  ),
                                });
                                console.log(
                                  e.target.files[0],
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                            {coverImg ? null : (
                              <NewReleasesIcon
                                style={{ top: "22px" }}
                                fill="red"
                                class="required"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="rowGrid">
                        <div
                          className="col-24 col-sm-24 jc "
                          id="DataTimePicker"
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div className="relative">
                              <MobileDatePicker
                                label="Vebinar sanasi"
                                sx={{
                                  width: "100% !important",
                                  color: "#000",
                                  marginBottom: "35px",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderRadius: "15px !important",
                                    height: "70px",
                                    border: "2px solid #D9D9D9",
                                  },
                                }}
                                onChange={(newValue) => {
                                  setTokenDay(newValue);
                                }}
                                value={tokenDay && tokenDay}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                              {tokenDay && tokenDay.length != 0 ? null : (
                                <NewReleasesIcon
                                  fill="red"
                                  class="required top-4"
                                />
                              )}
                            </div>

                            <div className="relative">
                              <MobileTimePicker
                                label="Vebinarni boshlanish vaqti"
                                value={tokenTime}
                                ampm={false}
                                onChange={(newValue) => {
                                  setTokenTime(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                              {tokenTime.length != 0 ? null : (
                                <NewReleasesIcon
                                  fill="red"
                                  class="required top-4"
                                />
                              )}
                            </div>
                          </LocalizationProvider>
                          <div className="relative">
                            <TextField
                              className="inputs"
                              sx={{
                                width: "100%",
                                marginBottom: "30px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "70px",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "70px",
                                  padding: "0 0 0 25px",
                                },
                                "& .MuiInputLabel-root": {
                                  top: "6.5px",
                                },
                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                              label="Vebinar narxi"
                              variant="outlined"
                              onChange={(e) => {
                                setStreamPrice(e.target.value);
                              }}
                            />
                            {streamPrice.length != 0 ? null : (
                              <NewReleasesIcon
                                fill="red"
                                class="required top-4"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="rowGrid">
                        <div className="col-24 col-sm-24 textarea relative">
                          <h2 className="miniTitle">
                            Vebinarga spiker qo'shish
                          </h2>
                          <div className="vebinar">
                            <TextField
                              className="inputs"
                              sx={{
                                width: "100%",
                                marginBottom: "30px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "70px",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "70px",
                                  padding: "0 0 0 25px",
                                },
                                "& .MuiInputLabel-root": {
                                  top: "6.5px",
                                },
                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                              label="speaker raqami"
                              variant="outlined"
                              onChange={(e) => {
                                setAddSpeakerNum(
                                  e.target.value.replace("+", "")
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="rowGrid">
                        <div className="col-24">
                          <h2 className="miniTitle">YouTube havola</h2>
                        </div>
                        <div className="col-12 col-sm-24 relative">
                          <TextField
                            className="inputs"
                            sx={{
                              width: "100%",
                              marginBottom: "30px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "15px",
                                height: "70px",
                                border: "2px solid #D9D9D9",
                              },
                              "& .MuiOutlinedInput-input": {
                                height: "70px",
                                padding: "0 0 0 25px",
                              },
                              "& .MuiInputLabel-root": {
                                top: "6.5px",
                              },
                              "& .MuiInputLabel-shrink": {
                                top: "0",
                                left: "2px",
                              },
                            }}
                            label="YouTube havola"
                            variant="outlined"
                            onChange={(e) => {
                              setYouTubeLink(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-12 col-sm-24 lang relative select">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"  className="inputLabel">
                              Vebinar turi
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={vebinarType || ''}
                              label="Vebinar Turi"
                              onChange={(e) => {setVebinarType(e.target.value); console.log(e.target.value);}}
                              sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "75px !important",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "75px !important",
                                  padding: "0 0 0 25px",
                                },

                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                            >
                              <MenuItem value={'AGORA'}>Agora</MenuItem>
                              <MenuItem value={'YOUTUBE'}>YouTube</MenuItem>
                            </Select>
                            </FormControl>

                            {vebinarType.length != 0 ? null : (
                            <NewReleasesIcon fill="red" class="required" />
                          )}
                        </div>
                      </div>

                      <div className="rowGrid">
                        <div className="col-24 col-sm-24 textarea relative">
                          <h2 className="miniTitle">Vebinar haqida</h2>
                          <div className="vebinarEditor">
                            <Editor
                              toolbar={{
                                inline: { className: "UploadEditorDesk" },
                              }}
                              editorState={aboutVebinar}
                              toolbarClassName="toolbarClassName"
                              wrapperClassName="wrapperClassName"
                              editorClassName="editorClassName"
                              onEditorStateChange={onChangeEditor}
                            />

                            {aboutVebinar.length != 0 ? null : (
                              <NewReleasesIcon
                                style={{ top: "60px" }}
                                fill="red"
                                class="required top-4"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="rowGrid">
                        <div className="col-24 d-flex justify-end">
                          <div
                            onClick={() => vebinarCreate()}
                            className="btn-next"
                          >
                            Jo'natish
                          </div>
                          <ToastContainer style={{ marginTop: "50px" }} />
                        </div>
                      </div>
                    </TabPanel>
                  </div>
                ) : (
                  <>
                    <TabPanel value={value} index={0}>
                      <div className="rowGrid">
                        <div className="col-12 col-sm-24 relative">
                          <TextField
                            className="inputs"
                            sx={{
                              width: "100%",
                              marginBottom: "30px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "15px",
                                height: "70px",
                                border: "2px solid #D9D9D9",
                              },
                              "& .MuiOutlinedInput-input": {
                                height: "70px",
                                padding: "0 0 0 25px",
                              },
                              "& .MuiInputLabel-root": {
                                top: "6.5px",
                              },
                              "& .MuiInputLabel-shrink": {
                                top: "0",
                                left: "2px",
                              },
                            }}
                            label="Kurs nomi"
                            variant="outlined"
                            value={name}
                            onChange={(e) => {
                              courseUpBool === false && setCourseUpBool(true);
                              setName(e.target.value);
                            }}
                          />

                          {name.length != 0 ? null : (
                            <NewReleasesIcon fill="red" class="required" />
                          )}
                        </div>
                        <div className="col-12 col-sm-24 lang relative select">
                          <FormControl fullWidth>
                            <InputLabel
                              className="inputLabel"
                              id="demo-simple-select-label"
                            >
                              Kurs tili
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={lang}
                              label="Bo'lim"
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                setLang(e.target.value);
                              }}
                              sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "75px !important",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "75px !important",
                                  padding: "0 0 0 25px",
                                },

                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                            >
                              <MenuItem value="O'zbekcha">O'zbek</MenuItem>
                              <MenuItem value="RUSSIAN">Русский</MenuItem>
                              <MenuItem value="ENGLISH">English</MenuItem>
                            </Select>
                          </FormControl>

                          {lang.length != 0 ? null : (
                            <NewReleasesIcon fill="red" class="required" />
                          )}
                        </div>
                      </div>
                      <div className="rowGrid">
                        <div className="col-24 col-sm-24 textarea relative">
                          <h2 className="miniTitle">Qaysi platformaga kurs yuklamoqchisiz</h2>
                        
                          <FormControl className="width-100">
                            <InputLabel id="demo-simple-select-autowidth-label0">
                            Qaysi platformaga kurs yuklamoqchisiz?
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
                              value={platform}
                              onChange={(e) => {
                                setPlatform(e.target.value);
                              }}
                              label="Qaysi platformaga kurs yuklamoqchisiz?"
                            >
                              <MenuItem value={"EDUON"}>Eduon</MenuItem>
                              <MenuItem value={"SM"}>Sotuvchilar maktabi</MenuItem>
                            </Select>
                          </FormControl>

                        </div>
                      </div>
                      
                      <div className="rowGrid">
                        <div className="col-24 col-sm-24 textarea relative">
                          <h2 className="miniTitle">Kurs haqida</h2>
                          <Editor
                            toolbar={{
                              inline: { className: "UploadEditorDesk" },
                            }}
                            editorState={decr}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChangeEditorCourse}
                          />

                          {decr.length != 0 ? null : (
                            <NewReleasesIcon
                              style={{ top: "60px" }}
                              fill="red"
                              class="required top-4"
                            />
                          )}
                        </div>
                      </div>
                      <div className="rowGrid">
                        <div className="col-24 d-flex justify-end">
                          <div onClick={() => setValue(1)} className="btn-next">
                            Keyingisi
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <div className="rowGrid">
                        <div className="col-12 col-sm-24 lang relative select">
                          <FormControl fullWidth>
                            <InputLabel
                              className="inputLabel"
                              id="demo-simple-select-label"
                            >
                              Daraja
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Daraja"
                              value={level}
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                setLevel(e.target.value);
                              }}
                              sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "74px !important",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "70px !important",
                                  padding: "0 0 0 25px",
                                },
                                "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                  {
                                    top: "50% !important",
                                    transform: "translateY(-50%) !important",
                                  },
                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                            >
                              <MenuItem value={"Boshlang'ich"}>
                                Boshlang'ich
                              </MenuItem>
                              <MenuItem value={"O'rta"}>O'rta</MenuItem>
                              <MenuItem value={"Yuqori"}>Yuqori</MenuItem>
                            </Select>
                          </FormControl>

                          {lang.length != 0 ? null : (
                            <NewReleasesIcon fill="red" class="required" />
                          )}
                        </div>
                        <div className="col-12 col-sm-24 relative">
                          <TextField
                            className="inputs"
                            sx={{
                              width: "100%",
                              marginBottom: "30px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "15px",
                                height: "70px",
                                border: "2px solid #D9D9D9",
                              },
                              "& .MuiOutlinedInput-input": {
                                height: "70px",
                                padding: "0 0 0 25px",
                              },
                              "& .MuiInputLabel-root": {
                                top: "6.5px",
                              },
                              "& .MuiInputLabel-shrink": {
                                top: "0",
                                left: "2px",
                              },
                            }}
                            label="Kurs kimlar uchun"
                            variant="outlined"
                            value={whomCourse}
                            onChange={(e) => {
                              courseUpBool === false && setCourseUpBool(true);
                              setWhomCourse(e.target.value);
                            }}
                          />
                          {whomCourse.length != 0 ? null : (
                            <NewReleasesIcon fill="red" class="required" />
                          )}
                        </div>
                      </div>
                      <div className="rowGrid">
                        <div className="col-12 col-sm-24 select">
                          <FormControl fullWidth>
                            <InputLabel
                              className="inputLabel"
                              id="demo-simple-select-label"
                            >
                              Bo'lim
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={category}
                              label="Bo'lim"
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                setCategory(e.target.value);
                              }}
                              sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "75px !important",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "75px !important",
                                  padding: "0 0 0 25px",
                                },
                                "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                  {
                                    top: "50% !important",
                                    transform: "translateY(-50%) !important",
                                  },
                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                            >
                              {courseCategory.map((item, index) => (
                                <MenuItem key={index} value={item.name}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col-12 col-sm-24 select">
                          <FormControl fullWidth>
                            <InputLabel
                              className="inputLabel"
                              id="demo-simple-select-label"
                            >
                              Subkategoriya
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={subValue}
                              label="Subkategoriya"
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                setSubValue(e.target.value);
                              }}
                              sx={{
                                width: "100%",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderRadius: "15px",
                                  height: "75px !important",
                                  border: "2px solid #D9D9D9",
                                },
                                "& .MuiOutlinedInput-input": {
                                  height: "75px !important",
                                  padding: "0 0 0 25px",
                                },
                                "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":
                                  {
                                    top: "50% !important",
                                    transform: "translateY(-50%) !important",
                                  },
                                "& .MuiInputLabel-shrink": {
                                  top: "0",
                                  left: "2px",
                                },
                              }}
                            >
                              {subcategory.length > 0 ? (
                                subcategory.map((item, index) => (
                                  <MenuItem key={index} value={item.name}>
                                    {item.name}
                                  </MenuItem>
                                ))
                              ) : (
                                <p className="col-24">Kategoriyani tanlang</p>
                              )}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div className="rowGrid">
                        <div className="col-12 col-sm-24">
                          <h2 className="miniTitle">Kurs muqovasi</h2>
                          {imageError && (
                            <p className="error-messageee">
                              Mavjud rasm formatlari : .apng, .avif, .gif, .jpg,
                              .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .webp
                            </p>
                          )}

                          <div className="button-upload relative">
                            <label htmlFor="coverImg">
                              <img
                                src={uploadIcon}
                                alt="..."
                                className="mr-10"
                              />
                              {coverImg.img
                                ? coverImg.img.name.slice(0, 18)
                                : "Yuklash"}
                              {coverImg.img &&
                                console.log(
                                  coverImg.img.name.includes(".png"),
                                  221
                                )}
                            </label>
                            <input
                              id="coverImg"
                              type="file"
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                setCoverImg({
                                  img: e.target.files[0],
                                  preViews: URL.createObjectURL(
                                    e.target.files[0]
                                  ),
                                });
                              }}
                            />
                            {coverImg ? null : (
                              <NewReleasesIcon
                                style={{ top: "22px" }}
                                fill="red"
                                class="required"
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-24">
                          <h2 className="miniTitle">Treyler yuklash</h2>

                          <div className="button-upload relative">
                            <label htmlFor="trailerVideo">
                              <img
                                src={uploadIcon}
                                alt="..."
                                className="mr-10"
                              />
                              {trailerVideo.video
                                ? trailerVideo.video.name.slice(0, 18)
                                : "Yuklash"}
                            </label>
                            <input
                              id="trailerVideo"
                              type="file"
                              onChange={(e) => {
                                courseUpBool === false && setCourseUpBool(true);
                                // setCheckVideoSend(true);
                                setTrailerVideo({
                                  video: e.target.files[0],
                                  // preViews: URL.createObjectURL(e.target.files[0]),
                                });
                              }}
                            />
                            {trailerVideo ? null : (
                              <NewReleasesIcon
                                style={{ top: "22px" }}
                                fill="red"
                                class="required"
                              />
                            )}
                          </div>
                          {videoError && (
                            <p className="error-messageee">
                              Video yuklashda xatolik yuz berdi
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="rowGrid">
                        <div className="col-12 col-sm-24 relative">
                          <TextField
                            className="inputs"
                            sx={{
                              width: "100%",
                              marginBottom: "30px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "15px",
                                height: "70px",
                                border: "2px solid #D9D9D9",
                              },
                              "& .MuiOutlinedInput-input": {
                                height: "70px",
                                padding: "0 0 0 25px",
                              },
                              "& .MuiInputLabel-root": {
                                top: "6.5px",
                              },
                              "& .MuiInputLabel-shrink": {
                                top: "0",
                                left: "2px",
                              },
                            }}
                            label="Kalit so'zlar"
                            variant="outlined"
                            value={keyWords}
                            onChange={(e) => {
                              courseUpBool === false && setCourseUpBool(true);
                              setKeyWords(e.target.value);
                            }}
                          />
                          {keyWords.length != 0 ? null : (
                            <NewReleasesIcon
                              style={{ top: "25px" }}
                              fill="red"
                              class="required"
                            />
                          )}
                        </div>
                        <div className="col-12 col-sm-24 relative">
                          <TextField
                            className="inputs"
                            sx={{
                              width: "100%",
                              marginBottom: "30px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: "15px",
                                height: "70px",
                                border: "2px solid #D9D9D9",
                              },
                              "& .MuiOutlinedInput-input": {
                                height: "70px",
                                padding: "0 0 0 25px",
                              },
                              "& .MuiInputLabel-root": {
                                top: "6.5px",
                              },
                              "& .MuiInputLabel-shrink": {
                                top: "0",
                                left: "2px",
                              },
                            }}
                            label="Kurs narxi"
                            variant="outlined"
                            value={price}
                            type="number"
                            onChange={(e) => {
                              courseUpBool === false && setCourseUpBool(true);
                              setPrice(e.target.value);
                            }}
                          />
                          {/* {price.length != 0 ? null : ( */}
                          <NewReleasesIcon
                            style={{ top: "25px" }}
                            fill="red"
                            class="required"
                          />
                          {/* )} */}
                        </div>
                        {/* <div className="col-8 col-sm-24 relative">
                      <TextField
                        className="inputs"
                        sx={{
                          width: "100%",
                          marginBottom: "30px",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderRadius: "15px",
                            height: "70px",
                            border: "2px solid #D9D9D9",
                          },
                          "& .MuiOutlinedInput-input": {
                            height: "70px",
                            padding: "0 0 0 25px",
                          },
                          "& .MuiInputLabel-root": {
                            top: "6.5px",
                          },
                          "& .MuiInputLabel-shrink": {
                            top: "0",
                            left: "2px",
                          },
                        }}
                        label="Havola"
                        variant="outlined"
                        value={exchangeUrl}
                        onChange={(e) => {
                          courseUpBool === false && setCourseUpBool(true);
                          setExchangeUrl(e.target.value);
                        }}
                      />
                    </div> */}
                      </div>
                      <div className="rowGrid">
                        <div className="col-24 col-sm-24 relative">
                          <h5 className="miniTitle">Kursni tavsifi</h5>

                          <Editor
                            toolbar={{
                              inline: { className: "UploadEditorDesk" },
                            }}
                            editorState={recommendation}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChangerecommendation}
                          />
                        </div>
                        <div className="col-24 col-sm-24 relative">
                          <h5 className="miniTitle">
                            Kursda nimalar o'rganiladi
                          </h5>
                          <Editor
                            toolbar={{
                              inline: { className: "UploadEditorDesk" },
                            }}
                            editorState={learn}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChangeLearn}
                          />
                          {learn.length != 0 ? null : (
                            <NewReleasesIcon
                              style={{ top: "25px" }}
                              fill="red"
                              class="required"
                            />
                          )}
                        </div>
                      </div>
                      <div className="rowGrid">
                        <div className="col-24 d-flex justify-between">
                          <div
                            onClick={() => setValue(0)}
                            className="btn-next bg-disabled"
                          >
                            Ortga
                          </div>
                          <div
                            onClick={(e) => {
                              // e.preventDeafult()
                              if (
                                name &&
                                price &&
                                learn &&
                                lang &&
                                decr &&
                                level &&
                                whomCourse &&
                                coverImg.img &&
                                keyWords
                              ) {
                                setValue(2);
                                if (courseUpBool === null) {
                                  uploadVideo(e);
                                } else if (courseUpBool === true) {
                                  updateData();
                                }
                              } else {
                                setOpen(true);
                              }
                            }}
                            className="btn-next"
                          >
                            Keyingisi
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      {courseUploaded && (
                        <ModuleUpload
                          courseId={courseId}
                          showModule={showModule}
                          setShowModule={setShowModule}
                          setType={setType}
                          uploadIcon={uploadIcon}
                        />
                      )}
                      <div className="col-24 d-flex justify-between">
                        <div
                          onClick={() => setValue(1)}
                          className="btn-next bg-disabled"
                        >
                          Ortga
                        </div>
                      </div>
                      {loader && (
                        <div className="loader">
                          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
                        </div>
                      )}
                      <p className="error-messageee">{errorMessage}</p>
                    </TabPanel>
                  </>
                )}
              </Box>
            </form>
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style} className="container">
              <div className="rowGrid">
                <p style={{ color: "#1c1c1c" }} className="col-24">
                  <span
                    style={{ color: "#006aff", textDecoration: "underline" }}
                  >
                    <ul>
                      <li>{!name && "kurs nomi, "}</li>
                      <li>{!decr && "kurs haqida, "}</li>
                      <li>{!price && "narx, "}</li>
                      <li>{!learn && "kursda nimalar o'rganiladi, "}</li>
                      <li>{!lang && "til, "}</li>
                      <li>{!decr && "kurs haqida, "}</li>
                      <li>{!level && "daraja, "}</li>
                      <li>{!whomCourse && "kurs kimlar uchun, "}</li>
                      <li>{!coverImg.img && "kurs muqovasi, "}</li>
                      <li>{!keyWords && "kalit so'zlar "}</li>
                    </ul>
                    {/* {(!name && "kurs nomi, ") +
                    (!decr && "kurs haqida, ") +
                    (!price && "narx, ") +
                      (!learn && "kursda nimalar o'rganiladi, ") +
                      (!lang && "til, ") +
                      (!decr && "kurs haqida, ") +
                      (!level && "daraja, ") +
                      (!whomCourse && "kurs kimlar uchun, ") +
                      (!coverImg.img && "muqova, ") +
                      (!keyWords && "kalit so'zlar ")} */}
                  </span>{" "}
                  - ma'lumotlari kiritilmadi. Iltimos barcha ma'lumotlarni
                  kiriting!
                  <div className="col-24">
                    <Button
                      sx={{
                        width: "100%",
                        marginTop: "20px",
                        backgroundColor: "#80B5FF",
                        borderRadius: "15px",
                        height: "59px",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "500",
                      }}
                      className="btn"
                      onClick={() => {
                        // setOpen(false);
                        handleClose();
                        // setValue(0);
                      }}
                    >
                      OK
                    </Button>
                  </div>{" "}
                </p>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div id="streamUploadError">
        {streamErr ? (
          <Alert className="alert animation" severity="error">
            <strong>
              <p style={{ fontSize: "18px" }}>Vebinar yaratishda xatolik!</p>
            </strong>
          </Alert>
        ) : null}
      </div>
      {loader && (
        <div className="loader">
          <BounceLoader color="#006AFF" speedMultiplier={1.2} />
        </div>
      )}

      <Collapse in={errorUploadVideo}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setErrorUploadVideo(false);
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
            <p style={{ fontSize: "18px" }}>Serverda Xatolik bor!</p>
          </strong>
        </Alert>
      </Collapse>
    </>
  );
}
