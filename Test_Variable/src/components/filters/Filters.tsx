import cl from "./Filters.module.css"

type Props = {
    categorys: string[],
    changeCategory: (newCategory: string) => void,
    selectedCategory: string;
}

const Filters = ({categorys, changeCategory, selectedCategory}: Props) => {


    return(
        <div className={cl.filters_menu}>
            <div className={cl.filters_title}>Категории</div>
            {categorys.map((item, index) => (
                <div key={index} className={`${cl.filters_menu_item} ${selectedCategory == item ? cl.active : ""}`} onClick={() => changeCategory(item)}>{item}</div>
            ))}
            <div className={`${cl.filters_menu_item} ${selectedCategory == "All_Categorys" ? cl.active : ""}`} onClick={() => changeCategory("All_Categorys")}>All Categorys</div>
        </div>
    )
}

export default Filters;