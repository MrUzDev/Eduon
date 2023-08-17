import moment from 'moment'
import axios from '../Apis/api'

// speakers/received-money 👇 ****************
export const StudentRecevidMoney = (start, end) => {
  //   console.log(localStorage.getItem('access'))
  try {
    let data = axios.post(
      `${process.env.REACT_APP_API_KEY}/api/v2/speakers/received-money-amount/`,
      {
          min: start,
          max: end
      },
      { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data 
  } catch (error) {}

}

// speaker-enrolled-students-with-time 👇 *****************
export const statisEnrolledPost = (start, end, id) => {
  try {
    let data = axios.post(
      `${process.env.REACT_APP_API_KEY}/api/v2/speakers/speaker-enrolled-students-with-time/`,

      {
        min: start,
        max: end,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}

// speaker-with-time-rating  👇 *****************
export const statisRatingPost = (start, end, id) => {
  try {
    let data = axios.post(
      `${process.env.REACT_APP_API_KEY}/api/v2/speakers/speaker-with-time-rating/`,
      {
        min: start,
        max: end,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}

// General statistics ☝️ ================================================
// Courses statistics  👇 ================================================

export const exchangeRateGain = (id) => {
  try {
    let data = axios.get(
      `${process.env.REACT_APP_API_KEY}/api/v2/speakers/received-money-from-course/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}

// speakers/received-money 👇 ***************
export const StudentCourseInside = (id) => {
  //   console.log(localStorage.getItem('access'))

  try {
    let data = axios.get(
      `${process.env.REACT_APP_API_KEY}/api/v2/speakers/enrolled-course-students/${id}`,
      //   https://back.eduon-test.uz/api/v2/speakers/enrolled-course-students/406
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}

export const statisticCourses = (id) => {
  //   console.log(localStorage.getItem('access'))

  try {
    let data = axios.get(
      `${process.env.REACT_APP_API_KEY}/api/v2/courses/${id}`,
      //   https://back.eduon-test.uz/api/v2/speakers/enrolled-course-students/406
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}


export const VebinarJoinedUsers = (id) => {
  try {
    let data = axios.get(
      `${process.env.REACT_APP_API_KEY}/api/v2/stream/get-webinar-viewers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}


export const VebinarInfo = (id) => {
  try {
    let data = axios.get(
      `${process.env.REACT_APP_API_KEY}/api/v2/stream/get-webinar/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}

export const statisChartAmout = (start, end, id) => {
  try {
    let data = axios.post(
      `${process.env.REACT_APP_API_KEY}/api/v2/speakers/received-money/`,
      {
        min: start.slice(0,10),
        max: end.slice(0,10),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      },
    )
    return data
  } catch (error) {}
}