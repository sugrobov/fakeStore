
import Breadcrumbs from "./Breadcrumbs";

/**
 * Компонент для отображения информации о компании
 * @returns {JSX.Element}
 */
function AboutFrom() {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
             <Breadcrumbs currentPage="О компании" />
            <h1 className="text-3xl font-bold text-gray-800 mb-6">О нашей компании</h1>

            <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
                    hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                    eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum
                    non venenatis nisl tempor.
                </p>

                <p className="text-lg leading-relaxed">
                    Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est,
                    vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo
                    quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor.
                </p>

                <p className="text-lg leading-relaxed">
                    Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                    euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu,
                    fermentum et, dapibus sed, urna. Morbi interdum mollis sapien. Sed ac risus.
                </p>

                <p className="text-lg leading-relaxed">
                    Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae
                    facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius,
                    adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut
                    lectus.
                </p>

                <p className="text-lg leading-relaxed">
                    Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede,
                    ornare a, lacinia eu, vulputate vel, nisl. Suspendisse mauris. Fusce accumsan mollis
                    eros. Pellentesque a diam sit amet mi ullamcorper vehicula.
                </p>

                <p className="text-lg leading-relaxed">
                    Aliquam erat volutpat. Ut tincidunt tincidunt erat. Etiam feugiat lorem non metus.
                    Vestibulum dapibus nunc ac augue. Curabitur vestibulum aliquam leo. Praesent egestas
                    neque eu enim.
                </p>
            </div>

            <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Наши контакты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-medium text-gray-700">Адрес:</h3>
                        <p className="text-gray-600">г. Москва, ул. Примерная, д. 123</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700">Телефон:</h3>
                        <p className="text-gray-600">+7 (123) 456-78-90</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700">Email:</h3>
                        <p className="text-gray-600">info@example.com</p>
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-700">Режим работы:</h3>
                        <p className="text-gray-600">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AboutFrom;