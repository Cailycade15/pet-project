import cl from "./Filters.module.css"
import { useTranslation } from "react-i18next"
import { ALL_CATEGORIES } from "@/constants/categories"

type Props = {
    categorys: string[],
    changeCategory: (newCategory: string) => void,
    selectedCategory: string;
}

const Filters = ({categorys, changeCategory, selectedCategory}: Props) => {

    const { t } = useTranslation();

    return(
        <div className={cl.filters_menu}>
            <div className={cl.filters_title}>{t('filters.title')}</div>
            <div className={`${cl.filters_menu_item} ${selectedCategory == ALL_CATEGORIES ? cl.active : ""}`} onClick={() => changeCategory(ALL_CATEGORIES)}>{t('filters.allCategories')}</div>
            {categorys.map((item, index) => (
                <div key={index} className={`${cl.filters_menu_item} ${selectedCategory == item ? cl.active : ""}`} onClick={() => changeCategory(item)}>{item}</div>
            ))}
        </div>
    )
}

export default Filters;
