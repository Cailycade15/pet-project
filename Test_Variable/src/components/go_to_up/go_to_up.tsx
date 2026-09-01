import cl from "./go_to_up.module.css"
import { ArrowUp } from "lucide-react";

const Go_To_Up = () => {

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
            title="Наверх"
        >
            <ArrowUp size={24} />
        </button>
    )
}

export default Go_To_Up;