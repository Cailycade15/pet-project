import { useState, useEffect, useMemo } from "react"
import Card_Product from "../card_product/Card_Product"
import Items_limit_UI from "../items_limit_UI/Items_limit_UI"
import Items_per_row_UI from "../items_per_row_UI/Items_per_row_UI"
import Pagination from "../pagination/Pagination"
import type {type_Get_Product, type_Cart} from "@/types/type_Get_Product"
import cl from "./Cards_grid.module.css"
import Filters from "../filters/Filters"
import { ALL_CATEGORIES } from "@/constants/categories"
import { useCartStore } from "../../store/store";

type Props = {
    products: type_Get_Product[],
    categorys: string[]
}



const Card_grid = ({products, categorys}: Props) => {
    
    const name_cookie_itemsLimit = "itemsLimit";
    const name_cookie_itemsPerRow = "itemsPerRow";
    const name_cookie_selectedCategory = "selectedCategory";
    const name_cookie_favorites_products = "favorites";
    const name_cookie_compare_products = "compare";
    const name_cookie_added_to_cart = "added_to_cart";
    
    const [currentPage, setCurrentPage] = useState<number>(0);

    
    const [addedToCart, setAddedToCart] = useState<type_Cart[]>(() => {
        const saved = localStorage.getItem(name_cookie_added_to_cart);

        return saved
            ? JSON.parse(saved) as type_Cart[]
            : [];
    });

    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem(name_cookie_favorites_products);

        return saved
            ? JSON.parse(saved)
            : [];
    });

    const [compare, setCompare] = useState<number[]>(() => {
        const saved = localStorage.getItem(name_cookie_compare_products);

        return saved
            ? JSON.parse(saved)
            : [];
    });

    const [itemsLimit, setItemsLimit] = useState<number>(() => {
        const saved = localStorage.getItem(name_cookie_itemsLimit);
        return saved ? Number(saved) : 12;
    });

    const [itemsPerRow, setItemsPerRow] = useState<number>(() => {
        const saved = localStorage.getItem(name_cookie_itemsPerRow);
        return saved ? Number(saved) : 3;
    });

    useEffect(() => {
        localStorage.setItem(name_cookie_added_to_cart, JSON.stringify(addedToCart));
    }, [addedToCart])

    useEffect(() => {
        localStorage.setItem(name_cookie_favorites_products, JSON.stringify(favorites));
    }, [favorites])

    useEffect(() => {
        localStorage.setItem(name_cookie_compare_products, JSON.stringify(compare));
    }, [compare])


    useEffect(() => {
        localStorage.setItem(name_cookie_itemsLimit, itemsLimit.toString());
        setCurrentPage(0);
    }, [itemsLimit])

    useEffect(() => {   
        localStorage.setItem(name_cookie_itemsPerRow, itemsPerRow.toString());
    }, [itemsPerRow])


    const [selectedCategory, setSelectedCategory] = useState<string>(() => {
        return localStorage.getItem(name_cookie_selectedCategory) || ALL_CATEGORIES;
    });

    const filteredProducts = useMemo(() => {
        return selectedCategory != ALL_CATEGORIES
            ? products.filter(item => item.category === selectedCategory)
            : products;
    }, [selectedCategory, products]);

    useEffect(() => {
        setCurrentPage(0);
    }, [filteredProducts]);

    useEffect(() => {
        setCurrentPage(0);
        if(selectedCategory != ""){
            localStorage.setItem(name_cookie_selectedCategory, selectedCategory);
        }
    }, [selectedCategory])


    const changeCategory = (selectCategory: string) => {
        setSelectedCategory(selectCategory);
    }

    const cartVersion = useCartStore(
        (state) => state.cartVersion
    );

    useEffect(() => {
        const saved = localStorage.getItem(name_cookie_added_to_cart);

        setAddedToCart(
            saved
                ? JSON.parse(saved) as type_Cart[]
                : []
        );
    }, [cartVersion]);

    return(
    <>
        <div className="container">
            <div className={cl.grid_container}>
                <Filters categorys={categorys} changeCategory={changeCategory} selectedCategory={selectedCategory}/>

                <div>
                    <div className={cl.toolbar}>
                        <Items_limit_UI value={itemsLimit} setValue={setItemsLimit}/>
                        <Items_per_row_UI value={itemsPerRow} setValue={setItemsPerRow}/>
                    </div>

                    <div className={`${cl.grid_products_container} ${itemsPerRow == 2 ? cl.grid_2x2 : itemsPerRow == 3 ? cl.grid_3x3 : cl.grid_4x4}`}>    
                        {filteredProducts.slice(currentPage*itemsLimit, (currentPage+1)*itemsLimit).map((product) => (
                            <Card_Product key={product.id} product={product} favoriteProducts={favorites} setFavorites={setFavorites} compare={compare} setCompare={setCompare} addedToCart={addedToCart} setAddedToCart={setAddedToCart}/>
                        ))}
                    </div>

                    <div className={cl.div_pagination}>
                        <Pagination filteredProducts={filteredProducts} itemsLimit={itemsLimit} component={[currentPage, setCurrentPage]}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Card_grid;