import {Link} from "react-router-dom";

function FilterComponent({onFilterChange}:{onFilterChange:Function}) {
    return (
            <div className="w-100 d-flex justify-content-between align-items-center">
                <div className="filters">
                    <select className={'form-control my-2'} onChange={(e)=>onFilterChange(e.target.value)}>
                        <option value={'all'}>All</option>
                        <option value={'fav'}>Favourites</option>
                    </select>
                </div>

                <div className="create-btn">
                    <Link to={'/create-product'} className={'btn btn-primary'}>Create</Link>
                </div>
            </div>
    )
}

export default FilterComponent