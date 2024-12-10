import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCurrentBook} from "../../functions/apis";
import '../../assets/product-details.css'

function ProductDetails(props: any) {
    const { id } = useParams<{ id: string }>();
    const [currentBook, setCurrentBook] = useState<any>(undefined);
    const navigate = useNavigate();
    useEffect(()=>{

        async function setItem(){
            const book = await getCurrentBook(id);
            setCurrentBook(book);
        }
        setItem();
    },[])
    return (
        <div className={'container'}>
            <div className="row">
                <div className="col-12">
                    <div className={'w-100 d-flex align-items-center my-2'}>
                        <button className={'btn btn-light'} onClick={()=>navigate(-1)}>
                            &lt;
                            Back
                        </button>
                    </div>
                    <h1 className={'text-center my-3'}>Product Details</h1>
                    {currentBook ? <>
                        <div className={'image-box'}>
                            {currentBook.volumeInfo.imageLinks ? (
                                <img src={currentBook.volumeInfo.imageLinks.thumbnail} alt=""/>
                            ) : (
                                <div className={'border rounded'}>
                                    <h6 className={'text-center m-0'}>No image available</h6>
                                </div>
                            )}
                        </div>
                        <ul className={'list-group my-3'}>
                            <li className={'list-group-item'}>
                                <b>Country:</b> <span>{currentBook.accessInfo.country}</span>
                            </li>
                            <li className={'list-group-item'}>
                                <b>Ebook: </b>
                                <span>{currentBook.saleInfo.isEbook ? 'Available' : 'Not available'}</span>
                            </li>
                            <li className={'list-group-item'}>
                                <b>Title:</b> <span>{currentBook.volumeInfo.title}</span>
                            </li>
                            <li className={'list-group-item'}>
                                <b>Authors: </b>
                                <span>{currentBook.volumeInfo.authors?.map((item: string) => item)}</span>
                            </li>
                            {currentBook.volumeInfo.categories ? (<li className={'list-group-item'}>
                                <b>Categories: </b>
                                <span>{currentBook.volumeInfo.categories?.map((item: string) => item)}</span>
                            </li>) : null}
                            <li className={'list-group-item'}>
                                <b>Description:</b> <span>{currentBook.volumeInfo.description}</span>
                            </li>
                            {currentBook.volumeInfo.dimensions ? (<li className={'list-group-item'}>
                                <b>Dimensions: </b>
                                <span>Height: {currentBook.volumeInfo.dimensions.height} / Width: {currentBook.volumeInfo.dimensions.width} / Thickness: {currentBook.volumeInfo.dimensions.thickness}</span>
                            </li>) : null}
                            <li className={'list-group-item'}>
                                <b>Language:</b> <span>{currentBook.volumeInfo.language}</span>
                            </li>
                            <li className={'list-group-item'}>
                                <b>Pages:</b> <span>{currentBook.volumeInfo.pageCount}</span>
                            </li>
                            <li className={'list-group-item'}>
                                <b>Publisher:</b> <span>{currentBook.volumeInfo.publisher}</span>
                            </li>
                            <li className={'list-group-item'}>
                                <b>Published date:</b> <span>{currentBook.volumeInfo.publishedDate}</span>
                            </li>
                        </ul>
                    </> : <h1 className={'text-center my-3'}>Loading...</h1>}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;