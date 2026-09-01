import { useState } from "react";
import cl from "./Header.module.css";
import Menu from "./show_menu";
import logo_img from "@/assets/images/logo.png"
import Mini_Cart from "./mini_cart/Mini_Cart";


const Header = () => {
    return(
        <div className={cl.header}>
            <div className="container">
                <div className={cl.header_content}>
                    <a href="/" className={cl.div_left}>
                        <img className={cl.img_Logo} src={logo_img} alt="RBS Reactor" />
                        <span>Our Site</span>
                    </a>
                    <div className={cl.div_center}>
                        <Menu />
                    </div>
                    <div className={cl.div_right}>
                        <Mini_Cart />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;