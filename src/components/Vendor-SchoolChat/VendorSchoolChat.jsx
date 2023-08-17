import React from 'react'
import './VendorSchoolChat.css'
import CloseIcon from '@mui/icons-material/Close';
import { StateContext } from '../../context/Context';
import { useContext } from 'react';

export default function VendorSchoolChat() {
    const {showVsChat, setShowVsChat} = useContext(StateContext)
  return (
    <div className='vs-Chat'>
        <div className='flex justify-end mb-24'>
            <CloseIcon onClick={() => setShowVsChat(false)} className='pointer'/>
        </div>
        <div className='flex align-center'>
            <h6>Hozircha Chatlar Mavjud Emas!</h6>
        </div>
    </div>
  )
}