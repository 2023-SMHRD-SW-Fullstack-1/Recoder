import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import App from '../three/show_warehouse'

const Warehouse = () => {
    let { wh_seq } = useParams()

    console.log(wh_seq);

    // const [warehouse_num, setWarehouse_num] = useSearchParams()

    const [warehouseWidth, setWarehouseWidth] = useState(null);
    const [warehouseLength, setWarehouseLength] = useState(null);

    useEffect(() => {
        
    })

    // useEffect(() => {
    //     new App(
    //         warehouseWidth,
    //         warehouseLength,
    //     );
    // }, [warehouseWidth, warehouseLength]);

    // return (
    //     <div id="webgl-container"></div>
    // );

}

export default Warehouse