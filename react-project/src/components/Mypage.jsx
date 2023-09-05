import React from 'react'
import '../css/Mypage.css'
import '../css/Join.css'

const Mypage = () => {
  return (
    <div className="Join-container">
        <table>
            <tbody>
                <tr>
                    <td className="content1">
                        <div className='join-title'>
                            <h1>마이페이지</h1>
                        </div>

                        <form className="Join_content1">

                            <div className='id_input_container'>
                                {/* 아이디 */}
                                <label htmlFor="user_id"></label>
                                <input
                                    type="text"
                                    name="user_id"
                                    value='로그인한 사용자 아이디'
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
                                />
                            </div>

                            {/* 비밀번호 확인 */}
                            <label htmlFor="user_pw_confirm"></label>
                            {/* <div className="pw-confirm-input-container"> */}
                                <input
                                    type="password"
                                    name="user_pw_confirm"
                                    placeholder='비밀번호를 다시 입력해주세요.'
                                />
                            {/* </div> */}

                            {/* 이름 */}
                            <label htmlFor="user_name"></label>
                            {/* <div className="name-input-container"> */}
                                <input
                                    type="text"
                                    name="user_name"
                                    placeholder='로그인한 사용자 이름'
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