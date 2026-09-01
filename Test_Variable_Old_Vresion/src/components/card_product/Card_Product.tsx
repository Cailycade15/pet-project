import { Heart, GitCompare, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import cl from "./Card_Product.module.css";
import type { type_Get_Product, type_Cart } from "@/types/type_Get_Product";

type Props = {
    product: type_Get_Product,
    favoriteProducts?: number[],
    setFavorites?: React.Dispatch<React.SetStateAction<number[]>>,
    compare?: number[],
    setCompare?: React.Dispatch<React.SetStateAction<number[]>>,
    addedToCart?: type_Cart[],
    setAddedToCart?: React.Dispatch<React.SetStateAction<type_Cart[]>>;
}

const Card_Product = ({product, favoriteProducts, setFavorites, compare, setCompare, addedToCart, setAddedToCart}: Props) => {

    const { t } = useTranslation();

    const shareProduct = () => {
        console.log("share:", product.id);
    }

    const actionToFavorite = () => {
        if(!favoriteProducts?.includes(product.id)){
            setFavorites?.(prev => prev.includes(product.id) ? prev : [...prev , product.id]);
        }
        else{
            setFavorites?.(prev => prev.filter(id => id !== product.id))
        }
    }

    const actionToCompare = () => {
        if(!compare?.includes(product.id)){
            setCompare?.(prev => prev.includes(product.id) ? prev : [...prev , product.id]);
        }
        else{
            setCompare?.(prev => prev.filter(id => id !== product.id))
        }
    }

    const actionToCart = () => {
        setAddedToCart?.(prev => {
            const exists = prev.some(
                item => item.product.id === product.id
            );

            if (exists) {
                return prev.filter(
                    item => item.product.id !== product.id
                );
            }

            return [
                ...prev,
                {
                    product,
                    quantity: 1,
                },
            ];
        });
    };


    const isAddedToCart = addedToCart?.some(
        item => item.product.id === product.id
    );

    return(
        <div className={cl.card_product}>

            <div className={cl.actions}>

                <button 
                    className={cl.action_button}
                    onClick={actionToFavorite}
                    title={t('product.addToFavorites')}
                >
                    <Heart 
                        size={18}
                        fill={favoriteProducts?.includes(product.id) ? "red" : "transparent"}
                        />
                </button>


                <button 
                    className={cl.action_button}
                    onClick={actionToCompare}
                    title={t('product.addToCompare')}
                >
                    <GitCompare 
                        size={18}
                        color={compare?.includes(product.id) ? "red" : "black"}
                        />
                </button>


                <button 
                    className={cl.action_button}
                    onClick={shareProduct}
                    title={t('product.share')}
                >
                    <Share2 size={18}/>
                </button>

            </div>


            <div className={cl.class_flex_column}>

                <div className={cl.image_wrapper}>
                    <img 
                        className={cl.product_image} 
                        src={product.image} 
                        alt={product.title} 
                    />
                </div>


                <div className={cl.product_title}>
                    {product.title}
                </div>


                <div className={cl.product_price}>{t('product.price', { price: product.price })}</div>

            </div>

            <button 
                className={cl.add_to_cart_button}
                onClick={actionToCart}
                >
                    
                {
                    isAddedToCart 
                        ? t('product.inCart')
                        : t('product.addToCart')
                }
            </button>

        </div>
    )
}

export default Card_Product;