import cl from "./Header.module.css";
import { useTranslation } from "react-i18next";
import Menu from "./show_menu";
import logo_img from "@/assets/images/logo.png"
import Mini_Cart from "./mini_cart/Mini_Cart";
import Swither_language from "../../shared_components/switcher_language/Swither_language";


const Header = () => {

    const { t } = useTranslation();

    return(
        <div className={cl.header}>
            <div className="container">
                <div className={cl.header_content}>
                    <a href="/" className={cl.div_left}>
                        <img className={cl.img_Logo} src={logo_img} alt={t('header.logoAlt')} />
                        <span>{t('header.siteName')}</span>
                    </a>
                    <div className={cl.div_center}>
                        <Menu />
                    </div>
                    <div className={cl.div_right}>
                        <Mini_Cart />
                        <Swither_language />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
