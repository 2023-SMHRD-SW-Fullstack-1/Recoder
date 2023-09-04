import React from 'react'
import '../Nav_test.css'

function Nav_test() {
    const openNav = ()=>{
        document.getElementById("mySidenav").style.width = "250px";
    }
    
    const closeNav = ()=>{
        document.getElementById("mySidenav").style.width = "0";
    }

    return (
        <div>
        <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
            <a href="#">홈</a>
            <a href="#">입고</a>
            <a href="#">출고</a>
            <a href="#">재고</a>
            <a href="#">창고관리</a>
        </div>


<img id='nav_logo' src={process.env.PUBLIC_URL + 'img/menu_icon.png'} onClick={openNav}/> 
</div>
    )
}

export default Nav_test