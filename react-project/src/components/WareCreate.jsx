import React, { useState } from 'react';
import '../css/WareCreate.css';

const WareCreate = () => {

    return (
        <div className="ware_create_all">
            <div className='ware_create_title'>
                <h1>창고생성</h1>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className="ware_create_container">
                            <form>
                                <div className='ware_name-input_container'>
                                    {/* 아이디 */}
                                    <input
                                        type="text"
                                        placeholder='창고 이름을 입력해주세요.'
                                        autoFocus
                                    />
                                </div>

                                {/* 가로 */}
                                <div className="width-input_container">
                                    <input
                                        type="number"
                                        placeholder='가로 길이를 입력해주세요.'
                                    />
                                </div>

                                {/* 세로 */}
                                <div className="length-input_container">
                                    <input
                                        type="number"
                                        placeholder='세로 길이를 입력해주세요.'
                                    />
                                </div>

                                {/* 생성완료 버튼 */}
                                <div className="ware_create_submit_button">
                                    <button type="submit" className="create-button">
                                        생성하기
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

export default WareCreate;