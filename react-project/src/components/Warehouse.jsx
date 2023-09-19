import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../three/show_warehouse'
import axios from 'axios';

const Warehouse = () => {
    let { wh_seq } = useParams()

    console.log(wh_seq);

    const [warehouseInfo, setWarehouseInfo] = useState(null);

    const [warehouseWidth, setWarehouseWidth] = useState(null);
    const [warehouseLength, setWarehouseLength] = useState(null);
    const [rackWidth, setRackWidth] = useState(1);
    const [rackLength, setRackLength] = useState(1);
    const [rackFloor, setRackFloor] = useState(1);

    // wh_seq를 가지고 해당 창고 정보 불러오기
    useEffect(() => {
        axios.get(`http://localhost:8000/warehouse/${wh_seq}`)
        .then(res => {
            setWarehouseInfo(res.data);
            console.log(res.data);
            console.log(parseInt(res.data.wh_width));
            setWarehouseWidth(parseInt(res.data.wh_width));
            setWarehouseLength(parseInt(res.data.wh_length));
            console.log("warehouseWidth 값",warehouseWidth);
            console.log("warehouseLength 값",warehouseLength);
        })
        .catch((error) => {
            console.error(error);
        })
    }, [warehouseWidth, warehouseLength])


    useEffect(() => {
        new App(
            warehouseWidth,
            warehouseLength,
            rackWidth,
            rackLength,
            rackFloor,
        );
    }, [warehouseWidth, warehouseLength]);

    return (
        <div id="webgl-container"></div>
    );

}

export default Warehouse