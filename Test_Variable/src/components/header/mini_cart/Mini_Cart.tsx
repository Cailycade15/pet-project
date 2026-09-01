import { useState, useEffect } from "react";
import icon_cart from "@/assets/icons/icon_cart.png"
import type { type_Cart } from "@/types/type_Get_Product";

import cl from "./Mini_Cart.module.css"


const Mini_Cart = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSidebarOpen(false);
            }
        };


        document.addEventListener("keydown", handleEscape);


        return () => {
            document.removeEventListener("keydown", handleEscape);
        };

    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }


        return () => {
            document.body.style.overflow = "";
        };

    }, [isSidebarOpen]);


    const name_cookie_added_to_cart = "added_to_cart";
    const [addedToCart, setAddedToCart] = useState<type_Cart[]>(() => {
        const saved = localStorage.getItem(name_cookie_added_to_cart);

        return saved
            ? JSON.parse(saved) as type_Cart[]
            : [];
    });

    useEffect(() => {
        localStorage.setItem(name_cookie_added_to_cart, JSON.stringify(addedToCart));
    }, [addedToCart])

    const plusQuantity = (item: type_Cart) => {
        setAddedToCart(prev =>
            prev.map(cartItem =>
                cartItem.product.id === item.product.id
                    ? {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    }
                    : cartItem
            )
        );
    }

    const minusQuantity = (item: type_Cart) => {
        setAddedToCart(prev =>
            prev
                .map(cartItem =>
                    cartItem.product.id === item.product.id
                        ? {
                            ...cartItem,
                            quantity: cartItem.quantity - 1
                        }
                        : cartItem
                )
                .filter(cartItem => cartItem.quantity > 0)
        );
    }

    const calculate_sum = () => {
        let sum = 0;

        addedToCart.forEach(item => {
            sum += item.quantity * item.product.price;
        })

        return sum.toFixed(2);
    }

    return(
    <>
        <img 
            onClick={() => setSidebarOpen(prev => !prev)}
            className={cl.icon} 
            src={icon_cart} 
            alt="cart icon"
        />


        {isSidebarOpen && (
            <div 
                className={cl.overlay}
                onClick={() => setSidebarOpen(false)}
            />
        )}


        <aside className={isSidebarOpen ? `${cl.sidebar} ${cl.open}` : cl.sidebar}>

            <div className={cl.sidebar_header}>
                <div className={cl.sidebar_title}>
                    Корзина
                </div>

                <button 
                    className={cl.cart_close_button} 
                    onClick={() => setSidebarOpen(false)}
                >
                    ✕
                </button>
            </div>


            <div className={cl.products_div}>
                {
                    addedToCart.map((item) => (
                        <div 
                            key={item.product.id} 
                            className={cl.item_product}
                        >

                            <img 
                                src={item.product.image} 
                                className={cl.img} 
                                alt="product image" 
                            />


                            <div className={cl.info_text}>
                                <span className={cl.text_title}>
                                    {item.product.title}
                                </span>

                                <span className={cl.text_price}>
                                    {item.product.price} $
                                </span>
                            </div>


                            <div className={cl.counter}>

                                <button onClick={() => minusQuantity(item)}>
                                    -
                                </button>


                                <input 
                                    value={item.quantity}
                                    type="number"
                                    onChange={(e) => {
                                        const value = Number(e.target.value);

                                        setAddedToCart(prev =>
                                            prev.map(cartItem =>
                                                cartItem.product.id === item.product.id
                                                ? {
                                                    ...cartItem,
                                                    quantity: value
                                                }
                                                : cartItem
                                            )
                                        );
                                    }}
                                />


                                <button onClick={() => plusQuantity(item)}>
                                    +
                                </button>

                            </div>

                        </div>
                    ))
                }
            </div>


            <div className={cl.cart_footer}>
                <div>
                    Итого: {calculate_sum()} $
                </div>

                <button 
                    className={cl.btn_clear}
                    onClick={() => setAddedToCart([])}
                    >
                    Очистить корзину
                </button>

                <button>
                    Купить
                </button>
            </div>


        </aside>
    </>
    )
}

export default Mini_Cart;