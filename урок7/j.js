$(document).ready(function() {
    $('.button').click(() => {
        // Показываем текст загрузки в момент клика
        $('.result').html('<p>Завантаження даних...</p>');

        // Делаем запрос к рабочему и стабильному аналогу Bored API
        $.ajax('https://appbrewery.com', {
            dataType: 'json',
            success: (result) => {
                // Рассчитываем понятную цену (если 0, то 0, иначе форматируем)
                let formattedPrice = result.price === 0 ? '0' : (result.price * 10).toFixed(0);

                // Выводим все три параметра на страницу
                $('.result').html(`
                    <p>Activity: ${result.activity}</p>
                    <p>Price: ${formattedPrice} $</p>
                    <p>Type: ${result.type}</p>
                `);
            },
            error: (xhr) => {
                console.log("Ошибка запроса:", xhr.statusText);
                $('.result').html('<p style="color: red;">Помилка мережі. Спробуйте ще раз.</p>');
            }
        });
    });
});
