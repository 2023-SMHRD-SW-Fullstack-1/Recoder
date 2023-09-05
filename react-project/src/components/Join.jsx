import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Join.css';

const Join = () => {

  const navigate = useNavigate();
  const [duplicateMessage, setDuplicateMessage] = useState('');
  const [checkMbId, setCheckMbId] = useState(false);

  const [formData, setFormData] = useState({
    mb_id: '',
    mb_email: '',
    mb_pw: '',
    mb_pw_confirm: '',
    mb_nick: '',
  });

  // 이메일 중복확인
  const checkDuplicate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/checkId', {
        mb_id: formData.mb_id,
      });
  
      if (response.data.success) {
        setDuplicateMessage('사용 가능한 아이디입니다.');
        setCheckMbId(true);
      } else {
        setDuplicateMessage('중복된 아이디입니다.');
        setCheckMbId(false);
      }
    } catch (error) {
      setDuplicateMessage('중복된 아이디입니다.');
      setCheckMbId(false);
    }
  };


  // 가입
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.mb_pw !== formData.mb_pw_confirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', {
        mb_id: formData.mb_id,
        mb_email: formData.mb_email,
        mb_pw: formData.mb_pw,
        mb_nick: formData.mb_nick,
      });
      console.log(response);

      if (response.data.success) {
        alert(response.data.message || "회원가입되었습니다!");
        navigate("/Login");
      } else {
        alert(response.data.message || "회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error(error);
      alert('회원가입 도중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="Join-container">
      <table>
        <tbody>
          <tr>

            <td className="content1">
              <div className='join-title'><h1>회원가입</h1></div>
              
                <form onSubmit={onSubmit} className="Join_content1">

                  <div className='abc'>
                  {/* 아이디 */}
                    <label htmlFor="mb_id"></label>
                    <input
                      type="text"
                      name="mb_id"
                      value={formData.mb_id}
                      onChange={onChange}
                      placeholder='아이디를 입력해주세요.'
                      autoFocus
                    />
                    <button
                    type="button"
                    onClick={checkDuplicate}
                    className="email-check"
                    >
                      아이디 중복체크
                    </button>
                    </div>
                    <span className="duplicate-message">{duplicateMessage}</span>
                    
                  {/* 이메일 */}
                    <label htmlFor="mb_email"></label>
                    <div className="email-input-container">
                      <input
                        type="email"
                        name="mb_email"
                        value={formData.mb_email}
                        onChange={onChange}
                        placeholder='이메일을 입력해주세요.'
                      />
                    </div>

                  {/* 비밀번호 */}
                    <label htmlFor="mb_pw"></label>
                    <input
                      type="password"
                      name="mb_pw"
                      value={formData.mb_pw}
                      onChange={onChange}
                      placeholder='비밀번호를 입력하세요.'
                    />

                  {/* 비밀번호 확인 */}
                    <label htmlFor="mb_pw_confirm"></label>
                    <input
                      type="password"
                      name="mb_pw_confirm"
                      value={formData.mb_pw_confirm}
                      onChange={onChange}
                      placeholder='비밀번호를 다시 입력해주세요.'
                    />

                  {/* 닉네임 */}
                    <label htmlFor="mb_nick"></label>
                    <input
                      type="text"
                      name="mb_nick"
                      value={formData.mb_nick}
                      onChange={onChange}
                      placeholder='닉네임을 입력해주세요.'
                    />
                 
                  
                  {/* 가입완료 버튼 */}
                  <button type="submit" className="join-button">
                    가입하기
                  </button>
                </form>
            </td>


          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Join;