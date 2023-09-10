import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Join.css';

const Join = () => {

const navigate = useNavigate();
const [duplicateMessage, setDuplicateMessage] = useState('');
const [checkMbId, setCheckMbId] = useState(false);

const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
    user_pw_confirm: '',
    user_nick: '',
    user_cname: '',
});

// 이메일 중복확인
const checkDuplicate = async () => {
    try {
        const response = await axios.post('http://localhost:8000/user/checkid', {
            id: formData.user_id,
        });
        if (response.data === '회원가입 가능') {
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
    if (formData.user_pw !== formData.user_pw_confirm) {
        alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/user', {
            user_id: formData.user_id,
            user_pw: formData.user_pw,
            user_nick: formData.user_nick,
        });
        if (response.data === 'ok') {
            alert(response.data.message || "회원가입되었습니다!");
            navigate("/");
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

                            <div className='id-input-container'>
                                {/* 아이디 */}
                                <label htmlFor="user_id"></label>
                                <input
                                    type="text"
                                    name="user_id"
                                    value={formData.user_id}
                                    onChange={onChange}
                                    placeholder='아이디를 입력해주세요.'
                                    autoFocus
                                />
                                <div>
                                <button
                                    type="button"
                                    onClick={checkDuplicate}
                                    className="id-check"
                                >
                                    아이디 중복체크
                                </button>
                                </div>
                                
                            </div>
                            <span className="duplicate-message">{duplicateMessage}</span>



                            {/* 비밀번호 */}
                            <label htmlFor="user_pw"></label>
                            <div className="pw-input-container">
                                <input
                                    type="password"
                                    name="user_pw"
                                    value={formData.user_pw}
                                    onChange={onChange}
                                    placeholder='비밀번호를 입력하세요.'
                                />
                            </div>

                            {/* 비밀번호 확인 */}
                            <label htmlFor="user_pw_confirm"></label>
                            <div className="pw-confirm-input-container">
                                <input
                                    type="password"
                                    name="user_pw_confirm"
                                    value={formData.user_pw_confirm}
                                    onChange={onChange}
                                    placeholder='비밀번호를 다시 입력해주세요.'
                                />
                            </div>

                            {/* 이름 */}
                            <label htmlFor="user_name"></label>
                            <div className="name-input-container">
                                <input
                                    type="text"
                                    name="user_nick"
                                    value={formData.user_nick}
                                    onChange={onChange}
                                    placeholder='닉네임을 입력해주세요.'
                                />
                            </div>

                            {/* 회사명 */}
                            {/* <label htmlFor="user_cname"></label>
                            <div className="cname-input-container">
                                <input
                                    type="text"
                                    name="user_cname"
                                    value={formData.user_cname}
                                    onChange={onChange}
                                    placeholder='회사명을 입력해주세요.'
                                />
                            </div> */}

                            {/* 가입완료 버튼 */}
                            <div className="submit-button">
                                <button type="submit" className="join-button">
                                    가입하기
                                </button>
                            </div>
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);
}

export default Join;