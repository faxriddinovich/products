import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid"
import {useDispatch} from "react-redux";
import {addProduct} from "../../store/productSlice";

function CreateProduct(props: any) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>('');
    const [titleError, setTitleError] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');
    const [language, setLanguage] = useState<string>('en');
    const [pages, setPages] = useState<number>(0);
    const [pagesError, setPagesError] = useState<boolean>(false);
    const [publisher, setPublisher] = useState<string>('');
    const [publisherError, setPublisherError] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        if(title.length>=3 && description.length>=10 && language && pages>=3 && publisher.length>=3){
            setTitleError(false);
            setDescriptionError(false);
            setPublisherError(false);
            const productObject ={
                id: uuidv4(),
                saleInfo:{
                    country: language,
                    isEbook: false,
                    saleability: "NOT_FOR_SALE"
                },
                volumeInfo:{
                    language: language,
                    pageCount: pages,
                    description: description,
                    title: title,
                    publisher: publisher,
                    ...(image && { imageLinks: {thumbnail: image} })
                }
            }
            dispatch(addProduct(productObject));
            navigate("/products");
        }
        if (title.length<3){
            setTitleError(true);
        }
        if (description.length<10){
            setDescriptionError(true);
        }
        if(pages<3){
            setPagesError(true);
        }
        if (publisher.length<3){
            setPublisherError(true);
        }
    }
    return (
        <div className={'container'}>
            <div className="row">
                <div className="col-12">
                    <h1 className={'text-center my-2'}>Create product</h1>
                    <div className={'w-100 d-flex align-items-center my-2 py-2'}>
                        <button className={'btn btn-light'} onClick={()=>navigate(-1)}>
                            &lt;
                            Back
                        </button>
                    </div>
                    <form className={'d-flex flex-wrap rounded border p-3 justify-content-between'} onSubmit={handleSubmit}>
                        <div className="form-group w-50 px-1 my-2">
                            <label htmlFor="title">Product title:</label>
                            <input type="text" className={'form-control'} placeholder="Enter title" id={'title'} value={title} onChange={(e) => setTitle(e.target.value)}/>
                            {titleError && (<p className={'text-danger'}>Title is not valid!</p>)}
                        </div>

                        <div className="form-group w-50 px-1 my-2">
                            <label htmlFor="image">Product image:</label>
                            <input type="file" className={'form-control'} placeholder="Product image" id={'image'}
                                    accept="image/*" onChange={handleImageChange}/>
                        </div>

                        <div className="form-group w-50 px-1 my-2">
                            <label htmlFor="description">Description:</label>
                            <textarea name="description" id="description"  className={'form-control'} cols={30} value={description} onChange={(e) => setDescription(e.target.value)}
                                      rows={10}></textarea>
                            {descriptionError && (<p className={'text-danger'}>Description is not valid!</p>)}
                        </div>

                        <div className="form-group w-50 px-1 my-2">
                            <label htmlFor="lang">Language:</label>
                            <select name="lang"  id="lang" className={'form-control'} onChange={(e) => setLanguage(e.target.value)} value={language}>
                                <option value="en">English</option>
                                <option value="fr">France</option>
                                <option value="it">Italian</option>
                                <option value="es">Spanish</option>
                                <option value="ru">Russian</option>
                                <option value="uz">Uzbek</option>
                            </select>
                        </div>

                        <div className="form-group w-50 px-1 my-2">
                            <label htmlFor="pages">Pages:</label>
                            <input type="number" className={'form-control'} placeholder="Pages" id={'pages'} value={pages} onChange={(e)=>setPages(Number(e.target.value))}/>
                            {pagesError && (<p className={'text-danger'}>Pages not valid! Pages must be 3 at least!</p>)}
                        </div>

                        <div className="form-group w-50 px-1 my-2">
                            <label htmlFor="publisher">Publisher:</label>
                            <input type="text" className={'form-control'} placeholder="Publisher" id={'publisher'} value={publisher} onChange={(e) => setPublisher(e.target.value)}
                                   />
                            {publisherError && (<p className={'text-danger'}>Publisher name is not valid!</p>)}
                        </div>

                        <button className={'btn btn-success'} type={'submit'} onClick={handleSubmit}>Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct;