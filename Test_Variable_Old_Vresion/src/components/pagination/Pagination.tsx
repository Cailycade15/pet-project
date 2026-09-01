import type {type_Get_Product} from "@/types/type_Get_Product"
import cl from "./Pagination.module.css"
import { useTranslation } from "react-i18next"

type Props = {
    filteredProducts: type_Get_Product[],
    itemsLimit: number,
    component: [
        number,
        React.Dispatch<React.SetStateAction<number>>
    ]
    
}

const Pagination = ({filteredProducts, itemsLimit, component}: Props) => {

    const { t } = useTranslation();

    const pages = Math.ceil(filteredProducts.length / itemsLimit);

    const [currentPage, setCurrentPage] = component;

    const prevPage = () => {
        if(currentPage-1 >= 0)setCurrentPage(currentPage-1);
    }
    const nextPage = () => {
        if(currentPage+1 < pages) setCurrentPage(currentPage+1);
    }


    const getPaginationItems = () => {
        const maxVisible = 10;
        const pagesArray: (number | string)[] = [];

        if (pages <= maxVisible) {
            return Array.from({ length: pages }, (_, i) => i);
        }

        // первые страницы
        if (currentPage < 5) {
            for (let i = 0; i < 7; i++) {
                pagesArray.push(i);
            }

            pagesArray.push("...");
            pagesArray.push(pages - 1);
        }

        // последние страницы
        else if (currentPage > pages - 6) {
            pagesArray.push(0);
            pagesArray.push("...");

            for (let i = pages - 7; i < pages; i++) {
                pagesArray.push(i);
            }
        }

        // середина
        else {
            pagesArray.push(0);
            pagesArray.push("...");

            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pagesArray.push(i);
            }

            pagesArray.push("...");
            pagesArray.push(pages - 1);
        }

        return pagesArray;
    };

    return(
        <div className={cl.content}>
            <button 
                disabled={currentPage === 0}
                onClick={prevPage}>
                    ↢ 
            </button>
            {
                getPaginationItems().map((item, index) => {
                    if (item === "...") {
                        return (
                            <span key={index} className={cl.dots}>
                                {t('pagination.dots')}
                            </span>
                        );
                    }

                    return (
                        <button
                            key={index}
                            className={currentPage === item ? cl.active : ""}
                            onClick={() => {
                                setCurrentPage(Number(item));
                                window.scrollTo({top: 0});
                            }}
                        >
                            {Number(item) + 1}
                        </button>
                    );
                })
            }
            <button 
                disabled={currentPage === pages - 1}
                onClick={() => nextPage()}> 
                    ↣ 
            </button>
        </div>
    )
}

export default Pagination;