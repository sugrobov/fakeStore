function ConfirmationModal({
    isOpen,
    onConfirm,
    onCancel,
    title,
    message }) {

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-amber-50 rounded-lg p-6 max-w-sm w-full shadow-xl">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border bg-white border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;