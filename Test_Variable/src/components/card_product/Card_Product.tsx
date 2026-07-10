import cl from "./Card_Product.module.css"
import type { type_Get_Product } from "../../types/type_Get_Product";

type Props = {
    product: type_Get_Product;
}

const Card_Product = ({product}: Props) => {

    return(
    <div className={`${cl.card_product}`}>
        <div className={cl.class_flex_column}>
            <img className={cl.product_image} src={product.image} alt="Product_Title" />
            <div>{product.title}</div>
            <div>{product.price}$</div>
        </div>
        <button>ADD TO CART</button>
    </div>
    )
}

export default Card_Product;