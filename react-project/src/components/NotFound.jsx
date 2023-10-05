import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      페이지가 없습니다.
      <Link to='/main'>메인으로 이동</Link>
    </div>
  )
}

export default NotFound