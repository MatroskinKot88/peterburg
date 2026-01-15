$(document).ready(function() {
    // === Инициализация Bootstrap компонентов ===
    // Инициализируем collapse для мобильного меню
    $('#mainNav').collapse({
        toggle: false
    });
    
    // === Бургер-меню для мобильных устройств ===
    $('.navbar-toggler').on('click', function() {
        $('#mainNav').collapse('toggle');
    });
    
    // === Инициализация всех collapse элементов ===
    $('[data-toggle="collapse"]').each(function() {
        const target = $(this).data('target');
        if (target) {
            $(target).collapse({
                toggle: false
            });
        }
    });
    
    // === Закрытие мобильного меню при клике вне его ===
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length && $(window).width() < 992) {
            $('#mainNav').collapse('hide');
        }
    });
    
    // === Закрытие мобильного меню при клике на ссылку ===
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('#mainNav').collapse('hide');
        }
    });
    
    // === Инициализация всех collapse элементов при загрузке ===
    $('[data-toggle="collapse"]').each(function() {
        const target = $(this).data('target');
        if (target) {
            $(target).collapse({
                toggle: false
            });
        }
    });

    // === Скролл к секциям ===
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
        
        // Закрываем мобильное меню после клика
        if ($(window).width() < 992) {
            $('#mainNav').collapse('hide');
        }
    });

    // === Выпадающий список красок ===
    $('.materials-item[data-type="paints"]').on('click', function() {
        $('.paints-list').slideToggle(300);
    });

    // === Конвертация валют ===
    const RATE_USD = 70; // 1$ = 70₽

    $(document).on('click', '.currency-btn:not(:disabled)', function() {
        const targetCurrency = $(this).data('currency');

        // Обновляем ВСЕ цены на странице
        $('.price').each(function() {
            const rub = parseInt($(this).attr('data-rub'), 10);
            if (isNaN(rub)) return;

            if (targetCurrency === 'USD') {
                const usd = Math.round(rub / RATE_USD);
                $(this).text(`${usd} $`);
            } else { // RUB
                $(this).text(`${rub.toLocaleString('ru-RU')} ₽`);
            }
        });

        // Обновляем ВСЕ зачёркнутые цены
        $('.old-price').each(function() {
            const rubOld = parseInt($(this).attr('data-rub-old'), 10);
            if (isNaN(rubOld)) return;

            if (targetCurrency === 'USD') {
                const usdOld = Math.round(rubOld / RATE_USD);
                $(this).text(`${usdOld} $`);
            } else { // RUB
                $(this).text(`${rubOld.toLocaleString('ru-RU')} ₽`);
            }
        });

        // Синхронизируем активную кнопку во ВСЕХ карточках
        $('.currency-btn').removeClass('active');
        $(`.currency-btn[data-currency="${targetCurrency}"]`).addClass('active');
    });

    // FAQ показать/скрыть
    $('.faq-question').on('click', function() {
        const $answer = $(this).next('.faq-answer');
        const $icon = $(this).find('i');

        $('.faq-answer').not($answer).slideUp(300);
        $('.faq-question').not($(this)).removeClass('active');

        // Переключаем текущий
        $answer.slideToggle(300);
        $(this).toggleClass('active');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length && $(window).width() < 992) {
            $('#mainNav').collapse('hide');
        }
    });
});