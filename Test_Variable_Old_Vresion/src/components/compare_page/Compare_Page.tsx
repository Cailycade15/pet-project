import { useState, useEffect } from "react";
import type {type_Get_Product} from "@/types/type_Get_Product"
import cl from "./Compare_Page.module.css"
import Card_Product from "../card_product/Card_Product";
import { useTranslation } from "react-i18next"


const Compare_Page = () => {

    const { t } = useTranslation();

    let compare_id: number[] = [];
    const saved = localStorage.getItem("compare");
    if (saved) {
        try {
            compare_id = JSON.parse(saved);
        } catch {
            compare_id = [];
        }
    }


    const [compareProducts, setCompareProducts] = useState<type_Get_Product[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const products = await Promise.all(
                compare_id.map(async (id) => {
                    const originalId = ((id - 1) % 20) + 1;

                    const response = await fetch(
                        `https://fakestoreapi.com/products/${originalId}`
                    );

                    return response.json();
                })
            );

            setCompareProducts(products);
        };

        loadFavorites();
    }, []);


    const name_cookie_itemsPerRow = "itemsPerRow";
    const name_cookie_compare_products = "compare";


    const [itemsPerRow] = useState<number>(() => {
        const saved = localStorage.getItem(name_cookie_itemsPerRow);
        return saved ? Number(saved) : 3;
    });


    return(
        <div className={`${cl.grid_products_container} ${itemsPerRow == 2 ? cl.grid_2x2 : itemsPerRow == 3 ? cl.grid_3x3 : cl.grid_4x4}`}>    
            <button onClick={() => {
                    localStorage.removeItem(name_cookie_compare_products);
                    setCompareProducts([])
                }}>
                {t('compare.clear')}
            </button>
            
            {compareProducts.map((product) => (
                <Card_Product key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Compare_Page;