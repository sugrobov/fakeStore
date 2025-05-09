import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
function ProductList({
    paginatedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    filteredProducts
}) {
    return (
        <>
            {
                paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {
                            paginatedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product} />
                            ))
                        }
                    </div>

                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <h3>No products found.</h3>
                    </div>
                )}

            {
                totalPages > 1 && filteredProducts.length > 0 && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage} />
                )
            }


        </>
    )


}

export default ProductList;