import { useEffect, useState } from "react";
import { getItems } from "../../functions/apis";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/productSlice";
import { RootState } from "../../store/store";
import ProductCard from "../../components/ProductCard";
import "../../assets/products.css";
import FilterComponent from "../../components/FilterComponent";
import {Link} from "react-router-dom";

function Products() {
    const products: any[] = useSelector((state: RootState) => state.products.items);
    const favorites: any[] = useSelector((state: RootState) => state.products.favorites);

    const [filterValue, setFilterValue] = useState("");
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const dispatch = useDispatch();

    const handleFilterChange = (value: string) => {
        setFilterValue(value);
    };

    useEffect(() => {
        if (products.length===0){
            const fetchItems = async () => {
                const fetchedItems: any = await getItems();
                dispatch(setProducts(fetchedItems));
            };
            fetchItems();
        }
    }, [dispatch]);

    useEffect(() => {
        let updatedItems = products;

        if (filterValue==='fav'){
            updatedItems = updatedItems.filter((item) => favorites.includes(item.id));
        }

        setFilteredItems(updatedItems);
    }, [products, filterValue, favorites]);


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-2">The most popular books</h1>
                    <FilterComponent onFilterChange={handleFilterChange} />
                    <div className="books-container my-3">
                        {filteredItems?.length > 0 ? (
                            filteredItems.map((item: any) => (
                                <ProductCard product={item} key={item.id} />
                            ))
                        ) : (
                            <p className="text-center">No products found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
