
/**
 * 
 * @param {product} - product object
 * @returns { jsx } - маркер статуса опубликованности
 */
function PublicationMarker({ product }) {
    return (
        <div className="absolute top-2 right-2 z-10">
            <label className="flex items-center cursor-pointer bg-white bg-opacity-80 px-2 py-1 rounded-full shadow-sm">
                <span className={`text-xs mr-1 ${product.published ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                    {product.published ? 'Опубликован' : 'Не опубликован'}
                </span>

            </label>
        </div>
    )
}

export default PublicationMarker;