import React, { useEffect, useState } from 'react';
import '../css/WareCreate.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
// import App from './CreateWarehouse';

const WareCreate = ({ comSeq }) => {

    const [name, setName] = useState('');
    const [width, setWidth] = useState(null);
    const [length, setLength] = useState(null);
    const nav = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        const warehouse_info = { name: name, width: width, length: length , comSeq: comSeq};
        let url = "http://localhost:8000/ware";

        axios.post(url, warehouse_info)
            .then((res) => {
                console.log( "2번째로 넘겨줄 데이터", res.data);
                // localStorage.setItem('warehouse', Json.stringify(res.data));
                nav('/ware/createwarehouse')
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <div className="ware_create_all">
            <div className='ware_create_title'>
                <h1>창고생성</h1>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className="ware_create_container">
                            <form onSubmit={handleSubmit}>
                                <div className='ware_name_input_container'>
                                    {/* 아이디 */}
                                    <input
                                        type="text"
                                        placeholder='창고 이름을 입력해주세요.'
                                        autoFocus
                                        value={name}
                                        // onChange={handletext}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* 가로 */}
                                <div className="width_input_container">
                                    <input
                                        type="number"
                                        placeholder='가로 길이를 입력해주세요.'
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                    />
                                </div>

                                {/* 세로 */}
                                <div className="length_input_container">
                                    <input
                                        type="number"
                                        placeholder='세로 길이를 입력해주세요.'
                                        value={length}
                                        onChange={(e) => setLength(e.target.value)}
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