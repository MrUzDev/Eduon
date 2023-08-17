import React, { useContext, useEffect, useState } from "react";
import "./Quiz.css";
import { StateContext } from "../../context/Context";
import axios from "../../Apis/api";
import Sidebar from "../Sidebar/Sidebar";
import NavbarDemo from "../Navbar/Navbar";
import NavbarSm from "../Navbar/NavbarSm";
import { refresh } from "../../Apis/RefreshToken/RefreshToken";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import addNotification from 'react-push-notification';

import { useNavigate } from "react-router-dom";
// import { io } from 'socket.io-client';

// const express = require("express")
// const app = express()
// const https = require('https').createServer(app)

function Quiz() {
  const { navStretch, loggedIn } = useContext(StateContext);

  const navigate = useNavigate();

  const [datasQuiz, setDatasQuiz] = useState([]);
  const [someVar, setSomeVar] = useState([]);
  const [filteredIds, setFilteredIds] = useState([])

  const [againGetData, setAgainData] = useState(false)

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };
    try {
      axios
        .get(`${process.env.REACT_APP_API_KEY}/api/v2/speakers/get-quiz/`, {
          headers,
        })
        .then((res) => {
          setDatasQuiz(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log("quiz error");
    }
  }, [againGetData]);


  const quizAnswerPost = async () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    };

    const set = new Set(someVar)
    console.log([...set]);
    try {
      //   someVar.forEach((item) =>
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/v2/speakers/pos-answer-quiz`,
          {
            answer_id: [...set],
            answer_type: "MULTI",
          },
          {
            headers,
          }
        )
        .then(() => {setAgainData(set); setSomeVar([]); set = '';})
        .catch((err) => console.log(err.response.status));
      //   );
    } catch (error) {}
  };



  const addId = (idd, isAnswered) => {

    if(!isAnswered) {
      setSomeVar(id => [...id, idd])     
      
      document.getElementById(`check-${idd}`).checked = true
    }
  }

  useEffect(()=> {
    console.log(someVar);
  }, [someVar])


  const removeId = (id) => {

    if(!document.getElementById(`check-${id}`).checked) {
      setSomeVar(someVar.filter(idd => idd !== id))
    }else {
      setSomeVar(idd => [...idd, id])   
    }
  }

  useEffect(() => {
    // io.on('connection', socket => {
    //   socket.on('messageSent', function (msg) {
    //     console.log(msg);
    //   });
    // });

    
  },[])


  const buttonClick = () => {
    // addNotification({
    //     title: 'Warning',
    //     // subtitle: 'This is a subtitle',
    //     message: 'This is a very long message',
    //     native: true // when using native, your OS will handle theming.
    // });
    // console.log('sss');

    // Notification.requestPermission().then(persm => {
    //   if(persm == 'granted') {
    //     new Notification('salom')
    //   }
    // })
  }

  return (
    <>
      <NavbarSm />
      <NavbarDemo />
      <Sidebar />
      <div className={navStretch ? "courses ml-240" : "courses ml-100"}>
        <div className="Quiz">
          <div className="container">
            <div className="quiz-boxs-container">
              {/* <button onClick={buttonClick}>sasas</button> */}
              {datasQuiz.map((item, indexx) => (
                <div className="quiz-box">
                  <h2 key={indexx}>{item.question}</h2>
                  {item.answer.map((answers, index) => (
                    <>
                      <p key={index} className="answer-variants" id={`id-${answers.id}`}>
                        <p className="answer-variant-content-box" onClick={() => {addId(answers.id, item.is_answered)}}>
                        <span>{answers.count}% </span>
                        {answers.text }
                        </p>
                       {!item.is_answered &&
                         <input type="checkbox" id={`check-${answers.id}`} onClick={() => removeId(answers.id)}/>}
                      {item.is_answered && item.user_answers[0] === answers.id | item.user_answers[1] === answers.id | item.user_answers[2] === answers.id | item.user_answers[3] === answers.id | item.user_answers[4] === answers.id ? <CheckCircleIcon/> : ''}
                      </p>
                      <span style={{display: 'block', background: 'black', height: '3px', marginBottom: '.5rem', borderRadius: '2px', width: `${answers.count}%` }}></span>
                    </>
                  ))}
                  <p>Umumiy ovozlar soni: {item.count_all}</p>
                  
                  {!item.is_answered ? (
                    <button
                      className="Quiz-btn"
                      onClick={() => quizAnswerPost()}
                    >
                      Ovoz berish
                    </button>
                  ): <button
                  className="Quiz-btn Quiz-btn-red"
                >
                  Ovoz berildi!
                </button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
