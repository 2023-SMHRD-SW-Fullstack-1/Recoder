import React, { useState } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 수정된 loginUser 함수
  const loginUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        { mb_id: userId, mb_pw: password },
        { withCredentials: true } // 쿠키를 전송하도록 설정
      );
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);

        // memberId를 로컬 스토리지에 저장 (API 응답에 따라 적절한 key로 변경해야 함)
        const memberId = response.data.memberId;
        localStorage.setItem('memberId', memberId);

        window.location.href = '/';
      } else {
        alert('로그인에 실패하였습니다.');
      }
    } catch (error) {
      alert('로그인에 실패하였습니다.');
      console.error(error);
    }
  };

  // 회원가입 버튼을 눌렀을 때 동작할 함수
  const handleJoin = (e) => {
    e.preventDefault();
    window.location.href = '/Join'; // 회원가입 페이지로 이동
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser();
  };
  return (
    <div className="login-container">
      <table>
        <tbody>
          <tr>
            <td>
              <div className='content'>
                <div className='login-title'><h1>로그인</h1></div>
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="  이메일을 입력해주세요."
                    maxLength="10"
                    autoFocus
                    onChange={(e) => setUserId(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="  비밀번호를 입력해주세요."
                    maxLength="15"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button className="login-button" type="submit" onClick={handleLogin}>
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
