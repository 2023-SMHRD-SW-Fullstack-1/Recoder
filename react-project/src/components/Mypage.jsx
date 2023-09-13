import React, { useEffect, useRef, useState } from 'react'
import '../css/Mypage.css'
import '../css/Join.css'
import axios from 'axios'

const Mypage = () => {

    const [uid, setUid] = useState('')
    const [nick, setNick] = useState('')
    const [putUserData, setPutUserData] = useState({})
    const pwRef = useRef()
    const checkPwRef = useRef()
    const nickRef = useRef()

    useEffect(() => {
        axios.get('http://localhost:8000/user')
        .then((res) => {
            console.log(res);
            setUid(res.data.user_id)
            setNick(res.data.user_nick)
        })
        .catch((err) => {
            console.error(err);
        })
    }, [])

    const handleUserData = (e) => {
        e.preventDefault()

        if (pwRef.current.value !== checkPwRef.current.value) {
            alert('비밀번호가 일치하지 않습니다!')
        } else {
            if (pwRef.current.value && nickRef.current.value) {
                setPutUserData({
                    user_pw: pwRef.current.value,
                    user_nick: nickRef.current.value
                })
            } else {
                alert('정보를 모두 입력해주세요!')
            }
        }
    }
    
    useEffect(() => {
        axios.patch('http://localhost:8000/user', putUserData)
        .then((res) => {
            console.log(res);
            if (res.data === 'ok') {
                window.location.href = 'http://localhost:3000/mypage'
            }
        })
        .catch((err) => {
            console.error(err);
        })        
    }, [putUserData])

  return (
    <div className="Join-container">
        <table>
            <tbody>
                <tr>
                    <td className="content1">
                        <div className='join-title'>
                            <h1>마이페이지</h1>
                        </div>

                        <form
                            className="Join_content1"
                            onSubmit={handleUserData}
                        >

                            <div className='id_input_container'>
                                {/* 아이디 */}
                                <label htmlFor="user_id"></label>
                                <input
                                    type="text"
                                    name="user_id"
                                    value={uid}
                                    disabled
                                />
                            </div>



                            {/* 비밀번호 */}
                            <label htmlFor="user_pw"></label>
                            <div className="pw-input-container">
                                <input
                                    type="password"
                                    name="user_pw"
                                    placeholder='비밀번호를 입력하세요.'
                                    ref={pwRef}
                                />
                            </div>

                            {/* 비밀번호 확인 */}
                            <label htmlFor="user_pw_confirm"></label>
                            {/* <div className="pw-confirm-input-container"> */}
                                <input
                                    type="password"
                                    name="user_pw_confirm"
                                    placeholder='비밀번호를 다시 입력해주세요.'
                                    ref={checkPwRef}
                                />
                            {/* </div> */}

                            {/* 이름 */}
                            <label htmlFor="user_name"></label>
                            {/* <div className="name-input-container"> */}
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder={nick}
                                    ref={nickRef}
                                />
                            {/* </div> */}

                            {/* 회사명 */}
                            <label htmlFor="user_cname"></label>
                            {/* <div className="cname-input-container"> */}
                                <input
                                    type="text"
                                    name="user_cname"
                                    placeholder='로그인한 사용자 회사명'
                                />
                            {/* </div> */}

                            {/* 가입완료 버튼 */}
                            <div className="submit-button">
                                <button type="submit" className="join-button">
                                    회원정보 수정
                                </button>
                            </div>
                        </form>
                    </td>


                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Mypage