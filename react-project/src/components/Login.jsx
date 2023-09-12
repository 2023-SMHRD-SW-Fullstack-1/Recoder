import React, { useEffect, useRef, useState } from 'react';
import '../css/Login.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
  const nav = useNavigate()

  const idRef = useRef()
  const pwRef = useRef()

  const [userData, setUserData] = useState({})

  const handleLogin = (e) => {

    e.preventDefault()

    setUserData({
      user_id : idRef.current.value,
      user_pw : pwRef.current.value
    })
  }

  useEffect(() => {
    if (userData.user_id !== undefined) {
      axios.post('http://localhost:8000/user/login', userData)
      .then((res) => {
        console.log(res);
        if (res.data.user_id) {
          window.location.href = 'http://localhost:3000/main'
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }, [userData])

  const handleJoin = () => {
    nav('/join')
  }

  return (
    <div className="login-container">
      <table>
        <tbody>
          <tr>
            <td>
              <div className='content'>
                {/* <div className='login-title'> */}
                  <h1>로그인</h1>
                {/* </div> */}
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder=" 아이디를 입력해주세요."
                    maxLength="15"
                    autoFocus
                    ref={idRef}
                  />

                  <input
                    type="password"
                    placeholder="  비밀번호를 입력해주세요."
                    maxLength="15"
                    ref={pwRef}
                  />

                  <button className="login-button" type="submit">
                    로그인
                  </button>

                  <button className="join-button" onClick={handleJoin}>회원가입</button>
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Login;
