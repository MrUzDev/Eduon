import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../context/Context";
import "../UploadCourse/uploadCourse.css";
import uploadIcon from "../../assets/icons/send-square.png";
import axios from "../../Apis/api";
import { useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import NavbarDemo from "../Navbar/Navbar";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import ModuleUpload from "../ModuleUpload/ModuleUpload";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { Alert, TextField } from "@mui/material";
import SidebarActive from "../Sidebar/SidebarActive";
import NavbarSm from "../Navbar/NavbarSm";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";


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

export default function EditCourse() {
  const { navStretch } = useContext(StateContext);
  const id = useParams();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [lang, setLang] = useState("");
  const [level, setLevel] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [learn, setLearn] = useState("");
  const [whomCourse, setWhomCourse] = useState("");
  const [price, setPrice] = useState("");
  const [decr, setDecr] = useState(EditorState.createEmpty());
  const [coverImg, setCoverImg] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState([]);
  const [subValue, setSubValue] = useState("");
  const [exchangeUrl, setExchangeUrl] = useState("");
  const [recommendation, setRecommendation] = useState(EditorState.createEmpty());
  const [showModule, setShowModule] = useState(false);
  const [error, setError] = useState(false);
  const [courseCategory, setcourseCategory] = useState([]);
  // const [courseId, setCourseId] = useState();
  const [value, setValue] = useState(0);
  const [images, setImages] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [categoryId, setcategoryId] = useState();
  const [subCategoryId, setsubCategoryId] = useState();
  const [valid, setValid] = useState(false);
  const [dataDecr, setDataDecr] = useState()
  const [dataRecomendation, setDataRecomendation] = useState()
  const [dataLearn, setDataLearn] = useState()
  const [platform, setPlatform] = useState()

 useEffect(() => {
  var stateFromHTML = require('draft-js-import-html').stateFromHTML;
  let contentState = stateFromHTML(dataDecr);
  setDecr(EditorState.createWithContent(contentState))

 },[dataDecr])

 useEffect(() => {
  var stateFromHTML2 = require('draft-js-import-html').stateFromHTML;
  let setRecommendationHTML = stateFromHTML2(dataRecomendation)
  setRecommendation(EditorState.createWithContent(setRecommendationHTML))
 }, [dataRecomendation])

 useEffect(() => {
  var stateFromHTML3 = require('draft-js-import-html').stateFromHTML;
  let setLearnHTML = stateFromHTML3(dataLearn)
  setLearn(EditorState.createWithContent(setLearnHTML))
 }, [dataLearn])

 
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeEditorCours = (e) => {
    setDecr(e)
  }

  const onChangerecommendation = (e) => {
    setRecommendation(e)
  }
  
  const onChangelearn = (e) => {
    setLearn(e)
  }

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/uploaded-courses/${id.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        )
        .then((res) => {
          setPlatform(res.data.platform)
          setName(res.data.name && res.data.name);
          setLang(res.data.lang && res.data.lang);
          setDataDecr(res.data.short_descr && res.data.short_descr);
          setLevel(res.data.level && res.data.level);
          setWhomCourse(res.data.whom_this_course && res.data.whom_this_course);
          setcategoryId(res.data.category && res.data.category);
          setsubCategoryId(res.data.subcategory && res.data.subcategory);
          setKeyWords(res.data.key_words && res.data.key_words);
          setPrice(res.data.price && res.data.price);
          setDataRecomendation(res.data.recommendation && res.data.recommendation);
          setType(res.data.type && res.data.type);
          setExchangeUrl(res.data.exchange_url && res.data.exchange_url);
          setDataLearn(res.data.what_to_learn && res.data.what_to_learn);
          setAvatar(res.data.cover_img && res.data.cover_img);
          res.data.is_valid === "VALID" && setValid(true);
        })
        .catch((err) => {
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    let filteredSubCategory;
    let filteredCategory = courseCategory.filter(
      (item) => item.id === parseInt(categoryId)
    )[0];

    setCategory(filteredCategory?.name);
    filteredSubCategory =
      filteredCategory?.subcategory.length !== 0 &&
      filteredCategory?.subcategory.filter(
        (item) => item.id === parseInt(subCategoryId)
      )[0];
    setSubValue(filteredSubCategory?.name);
  }, [categoryId, subCategoryId, courseCategory]);

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
    } catch (error) {}
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);
  useEffect(() => {
    const filteredCategory = courseCategory.filter(
      (item) => item.name == category
    )[0];
    setSubcategory(filteredCategory ? filteredCategory.subcategory : []);
  }, [category]);

  const updateData = async (e) => {
    const filteredCategory = courseCategory.filter(
      (item) => item.name == category
    )[0];
    const filteredSubCategory = filteredCategory?.subcategory.filter(
      (sub) => sub.name == subValue
    )[0];

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("lang", lang);
      formData.append("short_descr", draftToHtml(convertToRaw(decr.getCurrentContent())));
      formData.append("level", level);
      formData.append("whom_this_course", whomCourse);
      formData.append("category", filteredCategory.id);
      formData.append("subcategory", filteredSubCategory.id);
      coverImg.img && formData.append("cover_img", coverImg.img);
      formData.append("key_words", keyWords);
      formData.append("what_to_learn", draftToHtml(convertToRaw(learn.getCurrentContent())));
      formData.append("price", parseInt(price));
      formData.append('platform', platform)
      formData.append("exchange_url", exchangeUrl);
      formData.append("recommendation", draftToHtml(convertToRaw(recommendation.getCurrentContent())));
      formData.append("type", price ? "PAID" : "FREE");
      formData.append("trailer_url", "https://youtube.com");
      // formData.append("discount_price", 0);

      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/v1/courses/${id.id}`,
          formData,
          {
            headers,
          }
        )
        .then((res) => {
          e.target.innerHTML === "Yakunlash" && navigate("/speakerMyCourses");
          // e.target.innerHTML !== "Yakunlash" && navigate("/speakerMyCoursess");
        })
        .catch((err) => {
          setError(true);
          refresh(err.response.status, err.response.status.text);
        });
    } catch (error) {}
  };


  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(false);
      }, 3000);
  }, [error]);

  return (
    <>
      <SidebarActive />
      <NavbarDemo />
      <NavbarSm />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="container upload-course">
          <form>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Kurs umumiy ma'lumotlari" {...a11yProps(0)} />
                  <Tab
                    onClick={(e) => {
                      updateData(e);
                    }}
                    label="Kurs tarkibi"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <h2 className="miniTitle">Kurs muqovasi</h2>
                <div className="rowGrid">
                  <div className="col-4 col-sm-24">
                    <img
                      className="profile_picture"
                      style={{ width: "100% !important", marginBottom: "20px" }}
                      src={
                        coverImg.preViews
                          ? coverImg.preViews
                          : `${process.env.REACT_APP_API_KEY}${avatar}`
                      }
                      alt="...."
                    />
                  </div>
                  <div className="col-24 col-sm-24">
                    <div className="button-upload relative">
                      <label htmlFor="coverImg">
                        <img src={uploadIcon} alt="..." className="mr-10" />
                        {images.img ? images.img.name : "Muqovani o'zgartirish"}
                      </label>
                      <input
                        id="coverImg"
                        type="file"
                        onChange={(e) => {
                          setCoverImg({
                            img: e.target.files[0],
                            preViews: URL.createObjectURL(e.target.files[0]),
                          });
                        }}
                      />
                    </div>
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
                      label="Kurs nomi"
                      variant="outlined"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {name.length !== 0 ? null : (
                      <NewReleasesIcon fill="red" class="required" />
                    )}
                  </div>
                  <div className="col-12 col-sm-24 lang relative select">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Kurs tili
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={lang}
                        label="Bo'lim"
                        onChange={(e) => {
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
                        <MenuItem value="O'zbekcha">O'zbek</MenuItem>
                        <MenuItem value="RUSSIAN">Русский</MenuItem>
                        <MenuItem value="ENGLISH">English</MenuItem>
                      </Select>
                    </FormControl>

                    {lang.length !== 0 ? null : (
                      <NewReleasesIcon fill="red" class="required" />
                    )}
                  </div>
                </div>
                <div className="rowGrid">
                  <div className="col-24 col-sm-24 textarea relative">
                    <h2 className="miniTitle smMarginTop-30">Kurs haqida</h2>
                      <Editor
                              toolbar={{inline:{className: 'UploadEditorDesk'}}}
                            editorState={decr}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChangeEditorCours}
                          />
                         {console.log(decr)}
                    {decr.length !== 0 ? null : (
                      <NewReleasesIcon
                        style={{ top: "60px" }}
                        fill="red"
                        class="required"
                      />
                    )}
                  </div>
                </div>
                <h2 className="miniTitle smMarginTopAddition-20">
                  Qo'shimcha ma'lumotlar
                </h2>
                <div className="rowGrid">
                  <div className="col-12 col-sm-24 col-sm-24 lang relative select">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Daraja
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Daraja"
                        value={level}
                        onChange={(e) => {
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
                        <MenuItem value={"Boshlang'ich"}>Boshlang'ich</MenuItem>
                        <MenuItem value={"O'rta"}>O'rta</MenuItem>
                        <MenuItem value={"Yuqori"}>Yuqori</MenuItem>
                      </Select>
                    </FormControl>

                    {lang.length !== 0 ? null : (
                      <NewReleasesIcon fill="red" class="required" />
                    )}
                  </div>
                  <div className="col-12 col-sm-24 relative smMarginTop-20">
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
                        setWhomCourse(e.target.value);
                      }}
                    />
                    {whomCourse.length !== 0 ? null : (
                      <NewReleasesIcon fill="red" class="required" />
                    )}
                  </div>
                </div>
                <div className="rowGrid">
                  <div className="col-12 col-sm-24 select smMargin-10">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Bo'lim
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Bo'lim"
                        onChange={(e) => {
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
                  <div className="col-12 col-sm-24 select smMargintop-30">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Subkategoriya
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={subValue}
                        label="Subkategoriya"
                        onChange={(e) => {
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
                  <div className="col-8 col-sm-24 relative smMarginTopKey-30">
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
                        setKeyWords(e.target.value);
                      }}
                    />
                    {keyWords.length !== 0 ? null : (
                      <NewReleasesIcon
                        style={{ top: "25px" }}
                        fill="red"
                        class="required"
                      />
                    )}
                  </div>
                  <div className="col-8 col-sm-24 relative">
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
                        setPrice(e.target.value);
                      }}
                    />
                    {price.length !== 0 ? null : (
                      <NewReleasesIcon
                        style={{ top: "25px" }}
                        fill="red"
                        class="required"
                      />
                    )}
                  </div>
                  <div className="col-8 col-sm-24 relative">
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
                        setExchangeUrl(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="rowGrid">
                  <div className="col-24 col-sm-24 relative">
                   <h3 className="miniTitle">Kurs talabi</h3>
                       <Editor
                          toolbar={{inline: {className: 'UploadEditorDesk'}}}
                            editorState={recommendation}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChangerecommendation}
                          />
                  </div>
                  <div className="col-24 col-sm-24 relative">
                    <h3 className="miniTitle">Kursda nimalar o'rganiladi</h3>
                  
                      <Editor
                          toolbar={{inline: {className: 'UploadEditorDesk'}}}
                            editorState={learn}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onChangelearn}
                          />
                    {/* {learn.length !== 0 ? null : (
                      <NewReleasesIcon
                        style={{ top: "25px" }}
                        fill="red"
                        class="required"
                      />
                    )} */}
                  </div>
                  <p
                    onClick={(e) => {
                      updateData(e);
                      // navigate(`/speakerChosenCourse/${id.id}`);
                    }}
                    style={{
                      textAlign: "center",
                      color: "#006aff",
                      fontSize: "20px",
                    }}
                    className="col-24 pointer"
                  >
                    Yakunlash
                  </p>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ModuleUpload
                  courseId={id.id}
                  showModule={showModule}
                  setShowModule={setShowModule}
                  //   setType={setType}
                  uploadIcon={uploadIcon}
                  valid={valid}
                />
              </TabPanel>
            </Box>
          </form>
          <Alert
            className={error ? "alert animation" : "alert"}
            severity="error"
          >
            <strong>Ma'lumotlarni tahrirlashda xatolik yuz berdi!</strong>
          </Alert>
        </div>
      </div>
    </>
  );
}
