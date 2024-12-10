import React from "react";
import "../assets/product-card.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons"
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {removeProduct, toggleFavorite} from "../store/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {Link} from "react-router-dom";

library.add(faHeart,faTrashAlt,solidHeart);

interface ProductCardProps {
    product: any; // Define product prop type
}

const ProductCard: React.FunctionComponent<ProductCardProps> = ({product}) => {
    const favs:any[] = useSelector((state:RootState) => state.products.favorites);
    const dispatch = useDispatch();
    const toggleFav=(event:any,id:string):void=>{
        event.stopPropagation();
        dispatch(toggleFavorite(id));
    }
    const deleteItem=(event:any,id:string):void=>{
        event.stopPropagation();
        dispatch(removeProduct(id))
    }
    const isFav=(id:string)=>{
        return favs.includes(id);
    }
    return (
        <div className={'product-card border rounded p-2'}>
            <Link to={`/product/${product.id}`} className={'text-decoration-none'}>
                <div className="img-box">
                    <img
                        src={product.volumeInfo.imageLinks?.thumbnail || 'https://avatars.mds.yandex.net/i?id=10a6644b5593f45e695e76d80cc5be13_l-5262023-images-thumbs&n=13'}
                        alt={product.name}/>
                </div>
                <div className="info-box border-top mt-2">
                    <b className={'text-dark text-decoration-none'}>{product.volumeInfo.title}</b>
                    <div className={'d-flex justify-content-between align-items-center'}>
                        <p className={'w-auto m-0 text-dark text-decoration-none'}>{product.volumeInfo.authors?.map((item: any) => item)}</p>
                        <div className="btn-box w-50 d-flex align-items-center justify-content-end">
                            <button type={"button"} className={'btn'} onClick={(event) => toggleFav(event, product.id)}>
                                <FontAwesomeIcon icon={isFav(product.id) ? solidHeart : faHeart}
                                                 color={isFav(product.id) ? 'red' : ''}/>
                            </button>
                            <button type={"button"} className={'btn btn-outline-danger'}
                                    onClick={(event) => deleteItem(event, product.id)}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard;