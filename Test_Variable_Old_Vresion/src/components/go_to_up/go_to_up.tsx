import cl from "./go_to_up.module.css"
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const Go_To_Up = () => {

    const { t } = useTranslation();

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return(
        <button 
            className={cl.circle}
            onClick={goToTop}
            title={t('common.backToTop')}
        >
            <ArrowUp size={24} />
        </button>
    )
}

export default Go_To_Up;
