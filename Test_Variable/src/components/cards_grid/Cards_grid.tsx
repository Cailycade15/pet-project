import { useState, useEffect } from "react"
import Card_Product from "../card_product/Card_Product"
import Items_limit_UI from "../Items_limit_UI"
import Items_per_row_UI from "../Items_per_row_UI"
import type {type_Get_Product} from "../../types/type_Get_Product"
import cl from "./Cards_grid.module.css"
import Filters from "../filters/Filters"

type Props = {
    products: type_Get_Product[],
    categorys: string[]
}



const Card_grid = ({products, categorys}: Props) => {
    
    const name_cookie_itemsLimit = "itemsLimit";
    const name_cookie_itemsPerRow = "itemsPerRow";
    const name_cookie_selectedCategory = "selectedCategory";

    const [itemsLimit, setItemsLimit] = useState<number>(() => {
        const saved = localStorage.getItem(name_cookie_itemsLimit);
        return saved ? Number(saved) : 12;
    });

    const [itemsPerRow, setItemsPerRow] = useState<number>(() => {
        const saved = localStorage.getItem(name_cookie_itemsPerRow);
        return saved ? Number(saved) : 3;
    });

    // const [] = useState<>();

    useEffect(() => {
        localStorage.setItem(name_cookie_itemsLimit, itemsLimit.toString());
    }, [itemsLimit])

    useEffect(() => {   
        localStorage.setItem(name_cookie_itemsPerRow, itemsPerRow.toString());
    }, [itemsPerRow])



    function getCookie(name: string) {
        const cookies = document.cookie.split("; ");

        for (const cookie of cookies) {
            const [key, value] = cookie.split("=");

            if (key === name) {
                return decodeURIComponent(value);
            }
        }

        return "";
    }


    const [selectedCategory, setSelectedCategory] = useState<string>(() => {
        const saved = getCookie(name_cookie_selectedCategory);
        // console.log("saved:" + saved)
        return saved;
    });
    const [filteredProducts, setFilteredProducts] = useState<type_Get_Product[]>(products);




    useEffect(() => {
        if(selectedCategory != ""){
            setFilteredProducts(products.filter(item => item.category === selectedCategory))
            document.cookie = "selectedCategory = " + selectedCategory + ";";
        }
        else setFilteredProducts(products)

    }, [selectedCategory, products])

    useEffect(() => {
        if(selectedCategory != ""){
            setFilteredProducts(products.filter(item => item.category === selectedCategory))
            document.cookie = "selectedCategory = " + selectedCategory + ";";
        }
        else setFilteredProducts(products)

    }, [selectedCategory, products])


    const changeCategory = (selectCategory: string) => {
        setSelectedCategory(selectCategory);
    }

    return(
    <>

        <div className={cl.grid_container}>
            <Filters categorys={categorys} changeCategory={changeCategory}/>

            <div>
                <div style={{display: "flex", gap: "20px", alignItems: "center", justifyContent: "end", marginBottom: "20px", marginRight: "50px"}}>
                    <Items_limit_UI value={itemsLimit} setValue={setItemsLimit}/>
                    <Items_per_row_UI value={itemsPerRow} setValue={setItemsPerRow}/>
                </div>

                <div className={`${cl.grid_products_container} ${itemsPerRow == 2 ? cl.grid_2x2 : itemsPerRow == 3 ? cl.grid_3x3 : cl.grid_4x4}`}>    
                    {filteredProducts.slice(0, itemsLimit).map((product) => (
                        <Card_Product key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    </>
    )
}

export default Card_grid;