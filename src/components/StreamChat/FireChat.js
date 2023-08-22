import React, { useEffect, useState, useContext } from "react";
import { myFirestore, firebasee } from "./FirebaseConfig";
import "./FireChat.css";
import { StateContext } from "../../context/Context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function FChat(props) {
  const [data, setData] = useState([]);
  const [messagee, setMessagee] = useState("");
  const { name, profilePhoto } = useContext(StateContext);


  useEffect(() => {
      props.channelName && myFirestore
        .collection(props.channelName)
        // .limit(20)
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const dataa = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setData(dataa);
        });
  }, [props.channelName, messagee]);
  

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.channelName && messagee != ' ' && messagee != '  ' && messagee != '   ' && name &&
      myFirestore.collection(props.channelName).add({
        text: messagee,
        displayName: name,
        profilePhoto: profilePhoto,
        createdAt: firebasee.firestore.FieldValue.serverTimestamp()
      });

    setMessagee("");
  };


  return (
    <div id="StreamChat">
      <div id="messages">
        {data &&
          data.map((item, index) => (
            <div style={{display: 'flex', margin: '5px 0'}} key={index}>
             <div className="photo-container">
             {item.profilePhoto ? (
                <img id="ChatUserPhoto" src={`${process.env.REACT_APP_API_KEY}${item.profilePhoto}`} />
              ): <AccountCircleIcon
              className="avatar pointer"
            />}
             </div>
              <div className="content-container">
              <h6>{item.displayName}</h6>
              <p>{item.text}</p>
              </div>
            </div>
          ))}
      </div>

      <form onSubmit={handleOnSubmit} id="chatForm">
        <input
          type="text"
          id="message"
          value={messagee}
          placeholder="Xabar yuborish"
          autoComplete="off"
          onChange={(e) => setMessagee(e.target.value)}
        />
        <button type="submit">Jo'natish</button>
      </form>
    </div>
  );
}
