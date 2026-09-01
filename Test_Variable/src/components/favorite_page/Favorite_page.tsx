import { useState, useEffect } from "react";
import type {type_Get_Product} from "@/types/type_Get_Product"
import cl from "./Favorite_page.module.css"
import Card_Product from "../card_product/Card_Product";
import Items_limit_UI from "../items_limit_UI/Items_limit_UI";
import Items_per_row_UI from "../items_per_row_UI/Items_per_row_UI";
import Pagination from "../pagination/Pagination";


const Favorite_Page = () => {

    let favorites_id: number[] = [];
    const saved = localStorage.getItem("favorites");
    if (saved) {
        try {
            favorites_id = JSON.parse(saved);
        } catch {
            favorites_id = [];
        }
    }


    const [favoriteProducts, setFavoriteProducts] = useState<type_Get_Product[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const products = await Promise.all(
                favorites_id.map(async (id) => {
                    const originalId = ((id - 1) % 20) + 1;

                    const response = await fetch(
                        `https://fakestoreapi.com/products/${originalId}`
                    );

                    return response.json();
                })
            );

            setFavoriteProducts(products);
        };

        loadFavorites();
    }, []);



    const [currentPage, setCurrentPage] = useState<number>(0);


    const name_cookie_itemsLimit = "itemsLimit";
    const name_cookie_itemsPerRow = "itemsPerRow";
    const name_cookie_selectedCategory = "selectedCategory";
    const name_cookie_favorites_products = "favorites";
    const name_cookie_compare_products = "compare";


    const [itemsLimit, setItemsLimit] = useState<number>(() => {
        const saved = localStorage.getItem(name_cookie_itemsLimit);
        return saved ? Number(saved) : 12;
    });

    const [itemsPerRow, setItemsPerRow] = useState<number>(() => {
        const saved = localStorage.getItem(name_cookie_itemsPerRow);
        return saved ? Number(saved) : 3;
    });

    useEffect(() => {
        setCurrentPage(0);
            localStorage.setItem(name_cookie_itemsLimit, itemsLimit.toString());
        }, [itemsLimit])
    
    useEffect(() => {   
        localStorage.setItem(name_cookie_itemsPerRow, itemsPerRow.toString());
    }, [itemsPerRow])


    return(
    <div className="container">
        <div className={cl.grid_container} >

            <div className={cl.favorite_header}>
                <h1 className={cl.title}>
                    Избранные товары
                </h1>

                <button 
                    className={cl.clear_button}
                    onClick={() => {
                        localStorage.removeItem(name_cookie_favorites_products);
                        setFavoriteProducts([]);
                    }}
                >
                    Очистить избранное
                </button>
            </div>

            <div className={cl.toolbar}>
                <Items_limit_UI value={itemsLimit} setValue={setItemsLimit}/>
                <Items_per_row_UI value={itemsPerRow} setValue={setItemsPerRow}/>
            </div>





            {
                favoriteProducts.length === 0 ? (

                    <div className={cl.empty}>
                        <div className={cl.empty_icon}>
                            ♡
                        </div>

                        <span>
                            В избранном пока ничего нет
                        </span>
                    </div>

                ) : (

                    <div className={`${cl.grid_products_container} ${
                        itemsPerRow === 2 
                            ? cl.grid_2x2 
                            : itemsPerRow === 3 
                                ? cl.grid_3x3 
                                : cl.grid_4x4
                    }`}>

                        {favoriteProducts.slice(currentPage*itemsLimit, (currentPage+1)*itemsLimit).map((product) => (
                            <Card_Product 
                                key={product.id} 
                                product={product}
                            />
                        ))}

                    </div>
                )
            }

            <div className={cl.div_pagination}>
                <Pagination filteredProducts={favoriteProducts} itemsLimit={itemsLimit} component={[currentPage, setCurrentPage]}/>
            </div>

        </div>
    </div>
)
}

export default Favorite_Page;