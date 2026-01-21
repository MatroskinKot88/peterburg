// Дожидаемся полной загрузки HTML
$(document).ready(function() {

  // Плавный скролл по якорным ссылкам 
  $('a[href^="#"]').click(function(e) {
    e.preventDefault(); 

    const targetId = $(this).attr('href'); // получаем id секции
    const $targetSection = $(targetId);    // находим элемент на странице

    // Проверяем, что такая секция существует
    if ($targetSection.length) {
      // Прокручиваем плавно к ней, учитывая высоту фиксированного хедера (80px)
      $('html, body').animate({
        scrollTop: $targetSection.offset().top - 80
      }, 800);
    }

    // На мобильных устройствах закрываем меню после клика
    if ($(window).width() < 992) {
      $('#mainNav').collapse('hide');
    }
  });

  // Выпадающий список красок
  $('.materials-item[data-type="paints"]').click(function() {
    $('.paints-list').slideToggle(300);
  });

  // Переключение валюты (₽ ↔ $)
  $('.currency-btn').click(function() {
    const selectedCurrency = $(this).data('currency');

    // Обновляем все обычные цены
    $('.price').each(function() {
      const rubAmount = parseInt($(this).data('rub'), 10);
      if (isNaN(rubAmount)) return; // если нет данных — пропускаем

      if (selectedCurrency === 'USD') {
        const usdAmount = Math.round(rubAmount / 70);
        $(this).text(`${usdAmount} $`);
      } else {
        $(this).text(`${rubAmount} ₽`);
      }
    });

    // Обновляем все зачёркнутые ("старые") цены
    $('.old-price').each(function() {
      const rubOldAmount = parseInt($(this).data('rub-old'), 10);
      if (isNaN(rubOldAmount)) return;

      if (selectedCurrency === 'USD') {
        const usdOldAmount = Math.round(rubOldAmount / 70);
        $(this).text(`${usdOldAmount} $`);
      } else {
        $(this).text(`${rubOldAmount} ₽`);
      }
    });

    // Делаем активной только ту кнопку, по которой кликнули
    $('.currency-btn').removeClass('active');
    $(this).addClass('active');
  });

  // FAQ: при клике на вопрос показываем/скрываем ответ
  $('.faq-question').click(function() {
    const $answer = $(this).next('.faq-answer');
    $answer.slideToggle(300);

    // Меняем иконку стрелки
    const $icon = $(this).find('i');
    if ($icon.hasClass('fa-chevron-down')) {
      $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else {
      $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
  });

  // Закрываем мобильное меню, если кликнули ВНЕ меню
  $(document).click(function(e) {
    const isClickInsideNavbar = $(e.target).closest('.navbar').length > 0;
    const isMobile = $(window).width() < 992;

    if (!isClickInsideNavbar && isMobile) {
      $('#mainNav').collapse('hide');
    }
  });

  // Закрываем мобильное меню при клике на любую ссылку в нём
  $('.nav-link').click(function() {
    if ($(window).width() < 992) {
      $('#mainNav').collapse('hide');
    }
  });

});