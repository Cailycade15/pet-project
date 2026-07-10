import cl from "./Filters.module.css"

type Props = {
    categorys: string[],
    changeCategory: (newCategory: string) => void;
}

const Filters = ({categorys, changeCategory}: Props) => {


    return(
        <div className={cl.filters_menu}>
            {categorys.map((item, index) => (
                <div key={index} className={cl.filters_menu_item} onClick={() => changeCategory(item)}>{item}</div>
            ))}
            <div className={cl.filters_menu_item} onClick={() => changeCategory("")}>All categorys</div>
        </div>
    )
}

export default Filters;