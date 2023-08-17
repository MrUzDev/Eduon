import React, { useState, useContext, useEffect } from 'react'
import './VendorSchoolSidebar.css'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { StateContext } from '../../context/Context';

export default function VendorSchoolSidebar(props) {
  const {sidebarOpen, setSidebarOpen, setShowVsChat} = useContext(StateContext)


  useEffect(() => {
      
  }, [])

  const sidebarNavigateLink = (link) => {
    navigate(link)
    setSidebarOpen(true)
    setShowVsChat(false)
  }

  const navigate = useNavigate()
  return (
    <div>
      <nav className='vs-nav'>
        <ul>
          <li className={`${props.active == 'myCourses' && 'active'} flex align-center`} onClick={() => sidebarNavigateLink('/sotuvchilarMaktabi/MyCourses')}><AddIcon/> {sidebarOpen && 'Mening kurslarim'}</li>
          <li className={`${props.active == 'AllCourses' && 'active'} flex align-center`} onClick={() => sidebarNavigateLink('/sotuvchilarMaktabi/allCourses')}><AddIcon/>{sidebarOpen && 'Barcha kurslar'}</li>
          {/* <li className={`${props.active == 'getGrand' && 'active'} flex align-center`} onClick={() => {navigate('/sotuvchilarMaktabi/getGrand'); setSidebarOpen(true)}}> <AddIcon/>{sidebarOpen && 'Grantga ariza topshirish'}</li> */}
          <li className={`${props.active == 'sertificate' && 'active'} flex align-center`} onClick={() => sidebarNavigateLink('/sotuvchilarMaktabi/sertificate')}> <AddIcon/>{sidebarOpen && 'Sertifikatlarim'}</li>
          <li className={`${props.active == 'transaction' && 'active'} flex align-center`} onClick={() => sidebarNavigateLink('/sotuvchilarMaktabi/paymets')}> <AddIcon/>{sidebarOpen && 'To’lovlar'}</li>
          <li className='flex align-center' onClick={() => navigate('/')}> <AddIcon/>{sidebarOpen && 'Chiqish'}</li>
        </ul>
      </nav>
    </div>
  )
}
