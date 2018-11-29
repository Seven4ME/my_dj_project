$(document).ready(function () {
    //Filter page scripts
    var deviceWidth;
    ($(window).width() > 768) ? deviceWidth = 'normal' : deviceWidth = 'small';
    $('#slider').slider({
        range: 'min',
        max: 15000,
        min: 500,
        step: 500,
        start: 1000,
        value: 1000,
        slide: function (event, ui) {
            if (deviceWidth === 'normal') {
                if (ui.value === 15000) {
                    $('#input-ui-slider').text(ui.value + '+');
                } else {
                    $('#input-ui-slider').text(ui.value);
                }
            }
            else {
                if (ui.value === 15000) {
                    $('#input-ui-slider').val(ui.value + '+');
                } else {
                    $('#input-ui-slider').val(ui.value + 'грн');
                }
            }
        }
    });
    if (deviceWidth === 'normal') {
        $('<div id="input-ui-slider">1000</div>').appendTo('#slider .ui-slider-handle');
    } else {
        $('<input id="input-ui-slider" value="1000" readonly>').appendTo('#credit-sum-span');
    }

    $('#credit-term-slider').slider({
        range: 'min',
        max: 70,
        min: 1,
        step: 1,
        start: 7,
        value: 7,
        slide: function (event, ui) {
            if (deviceWidth === 'normal') {
                if (ui.value === 70) {
                    $('#input-ui-slider-term').text(ui.value + '+');
                } else {
                    $('#input-ui-slider-term').text(ui.value);
                }
            }
            else {
                if (ui.value === 70) {
                    $('#input-ui-slider-term').val(ui.value + '+');
                } else {
                    $('#input-ui-slider-term').val(ui.value);
                }
            }
        }
    });
    if (deviceWidth === 'normal') {
        $('<div id="input-ui-slider-term">7</div>').appendTo('#credit-term-slider .ui-slider-handle');
    } else {
        $('<input id="input-ui-slider-term" value="7" readonly>').appendTo('#credit-term-span');
    }


    $('a.not-recommend-link').click(function (e) {
        e.preventDefault();
        $('#not-recommend').modal();
    });

    $('a.not-recommend-link').click(function (e) {
        e.preventDefault();
        $('#not-recommend').modal();
        var text = $(this).closest('tr').find('td:first-child div').attr('data-bank-name');
        $('#not-recommend h4 b:nth-child(2)').text(text);
        $('#a-not-recommend').attr('href', $(this).attr('href'));
    });

    $('a#change-filter').click(function () {
        scrollToElem('body', 800);
    });

    $('#first-offer').after($('#offer-ads'));

    //Comments page scripts

    $('ul.reviews-sort .li-sort').css("cursor", "pointer");

    $(document).on('click', 'ul.reviews-sort .li-sort', function () {
        $('ul.reviews-sort .li-sort').removeClass('active');
        $(this).addClass('active');
        var functionName = getSortFunction($(this));
        $('.user-review-offer-wrap .one-comment-wrap').sort(window[functionName]).appendTo('.user-review-offer-wrap');
    });
    
    var id = new Array();
    var sortFlag = false;

    $('ul.reviews-sort .li-sort').removeClass('active');
    $(this).addClass('active');

    $(document).on('click', 'span.good-rev', function () {
        rateReview($(this), 'green', id);
    });

    $(document).on('click', 'span.bad-rev', function () {
        rateReview($(this), 'red', id);
    });

    //Comment answer scripts

    $('a.answer-anchor').click(function (e) {
        e.preventDefault();
        $('#set-answer').show();
        var name = $(this).closest('.user-review-offer').find('.review-info p:not(.date)').text();
        var commentId = $(this).closest('.user-review-offer').attr('data-comment');
        scrollToElem('form-comment', 800);
        $('textarea').val(name + ', ').focus();
        $('#comment-id').val(commentId);
    });

    $('.comment-answer').each(function () {
        var commentID = $(this).attr('data-comment-answer');
        $('.user-review-offer[data-comment=' + commentID + ']').after($(this));
    });

    //Auth page scripts

    var reg = $('.registration');
    var login = $('.login');
    var regP = $('.reg-p');
    var logP = $('.login-p');
    var fbAuth = $('#fb-auth-p');
    var gpAuth = $('#gp-auth-p');
    var btn = $('button');
    $('.auth-choice div').click(function () {
        if (!$(this).hasClass('active')) {
            $('.auth-choice div').removeClass('active');
            $(this).addClass('active');
            if ($(this).hasClass('left')) {
                reg.hide();
                regP.hide();
                login.show();
                logP.show();
                fbAuth.text('Вход через Facebook');
                gpAuth.text('Вход через Google');
                btn.attr('name', 'login');
                btn.attr('value', 'login');
                btn.text('Вход');
                if (btn.next().is('p')) {
                    btn.next().remove();
                }
            } else if ($(this).hasClass('right')) {
                login.hide();
                logP.hide();
                reg.show();
                regP.show();
                fbAuth.text('Регистрация с Facebook');
                gpAuth.text('Регистрация с Google');
                btn.attr('name', 'registration');
                btn.attr('value', 'registration');
                btn.text('Регистрация');
                if (btn.next().is('p')) {
                    btn.next().remove();
                }
            }
        }
    });

    //Offer page scripts

    $('#sw').animate({"width": getBgPercent($('p.rate-mark-sw').text())}, 600);
    $('#rel').animate({"width": getBgPercent($('p.rate-mark-rel').text())}, 800);
    $('#rep').animate({"width": getBgPercent($('p.rate-mark-rep').text())}, 1000);
    $('#pers').animate({'width': getBgPercent($('p.rate-mark-pers').text())}, 1200);
    $('.about-menu-wrap ul li').css("cursor", "pointer");

    $(document).on('click', '.about-menu-wrap ul li', function () {
        $('.about-menu-wrap ul li').removeClass('active');
        $(this).addClass('active');
        switch ($(this).text()) {
            case 'О компании':
                showInfo('about');
                break;
            case 'Условия':
                showInfo('conditions');
                break;
            case 'Контакты':
                showInfo('contacts');
                break;
            case 'Промокоды':
                showInfo('coupons');
                break;
        }
    });

    if ($(window).width < 767) {
        $('.offer-loan-img img').attr('src', '/templates/oka-credit/img/offer-loan-company-320.png');
    }

    $('a.review.a-btn').click(function () {
        localStorage.setItem('bank', $(this).attr('data-bank-name'));
    });

    $('span.review-count').click(function () {
        scrollToElem('reviews', 800);
    });

    $('a.not-recommend-link').click(function (e) {
        e.preventDefault();
        $('#not-recommend').modal();
        $('#not-recommend h4 b:nth-child(2)').text($('h1').text());
        $('#a-not-recommend').attr('href', $(this).attr('href'));
    });

    //Auth modal scripts

    $('#set-review-anchor').click(function (event) {
        if ($(this).attr('data-access') != 1)
            showModal(event);
    });
    $('.a-btn.review').click(function (event) {
        showModal(event);
    });



    var loginEmailInput = false, loginPassInput = false;
    var regEmailInput = false, regPassInput = false, regPassRepeatInput = false;

    $('.login input[name="login-email"]').keyup(function () {
        loginEmailInput = validateEmail($(this));
    });
    $('.login input[name="login-pass"').keyup(function () {
        loginPassInput = validatePassword($(this));
    });

    $('.registration input[name="reg-email"]').keyup(function () {
        regEmailInput = validateEmail($(this));
    });

    $('.registration input[name="reg-pass"]').keyup(function () {
        regPassInput = validatePassword($(this));
    });

    $('.registration input[name="reg-repeat-pass"]').keyup(function () {
        regPassRepeatInput = validatePasswordRepeat($(this), $('.registration input[name="reg-pass"]'));
    })


    $('#auth-form button').on('click', function (event) {
        var formData = $(this).closest('form').serializeArray();
        formData.push({name: this.name, value: this.value});
        event.preventDefault();
        if ( (loginEmailInput && loginPassInput) || (regEmailInput && regPassInput && regPassRepeatInput)) {
            ajax(formData);

        } else {
            if (!$('form button').next().is('p')) {
                $('form').append('<p class="text-center" style="color: #B22222">Не правильно заполнены поля</p>');
            }
        }
    });

    //Article comments scripts
    $('form#form-add-comment').submit(function () {
        if (!validateName($('#name')) | !validateEmail($('#email')) | !validateComment($('textarea'))) {
            scrollToElem('form-comment', 500);
            return false;
        }
    });

    $('a.answer-anchor').click(function () {
        var name = $(this).closest('.user-review-offer').find('#comment-name').text();
        var id = $(this).closest('.user-review-offer').attr('data-comment');
        $('#comment-id').val(id);
        $('textarea').val(name + ', ').focus();
        scrollToElem('form-add-comment', 1000);
        return false;
    });

    $('.comment-answer').each(function () {
        var commentID = $(this).attr('data-comment-answer');
        $('.user-review-offer[data-comment=' + commentID + ']').after($(this));
    });

    //Add site scripts
    $('form#add-site').on('submit', function () {
        console.log('submit');
        if (!validateNumber($("#service-max-sum")) | !validateNumber($("#service-max-term")) | !validateAddress($("#service-url")) | !validateName($("#service-name")) | !validateCheckbox($(".checkbox input")) | !validateEmail($('#service-email')) | !validateTextarea($('#service-textarea'))) {
            setPlaceholder('#service-url', 'Пример: mysite.com');
            scrollToElem('add-site-title', 800);
            $('#modal-invalid').modal('show');
            return false;
        }
    });

    //Set review scripts
    var mark = $('.service-mark');
    mark.css('cursor', 'pointer');

    mark.click(function () {
        var number = getStarNumber($(this).attr('class'));
        var parentClass = getWrapClass($(this).closest('.service-mark-wrap').attr('class'));
        $('input.mark-' + parentClass.substr(1)).val(number);
        $(parentClass + ' div').removeClass('service-mark-active fix').addClass('service-mark');
        for (var i = 1; i <= number; i++) {
            $(parentClass + ' .star-' + i).removeClass('service-mark').addClass('service-mark-active fix');
        }
    });

    mark.hover(function () {
        var number = getStarNumber($(this).attr('class'));
        var parentClass = getWrapClass($(this).closest('.service-mark-wrap').attr('class'));
        for (var i = 1; i <= number; i++) {
            $(parentClass + ' .star-' + i).removeClass('service-mark').addClass('service-mark-active');
        }
    });

    mark.mouseleave(function () {
        var parentClass = getWrapClass($(this).closest('.service-mark-wrap').attr('class'));
        for (var i = 1; i < 6; i++) {
            if (!$(parentClass + ' .star-' + i).hasClass('fix')) {
                $(parentClass + ' .star-' + i).removeClass('service-mark-active').addClass('service-mark');
            }
        }
    });

    $('form#set-review-form').submit(function () {
        if (!validateForm($('#bank-select')) | !validateName($('#name-input')) | !validateEmail($('#email-input')) | !validateForm($('textarea')) || !checkRateMark()) {
            setPlaceholder('#name-input', 'Введите свое имя (от 2-х букв)');
            setPlaceholder('#email-input', 'Введите свой настоящий email');
            setPlaceholder('textarea', 'Напишите отзыв о банке');
            scrollToElem('set-review-title', 800);
            $('#modal-invalid').modal('show');
            return false;
        }

    });

    var bankName = localStorage.getItem('bank');
    if (bankName) {
        $('select [value="' + bankName + '"]').attr("selected", "selected");
    }
    localStorage.clear();


});

//Filter page scripts
function filterIt() {
    $('tr:hidden').show();
    var setSum = $('#slider').slider("value");
    var setTerm = $('#credit-term-slider').slider("value");
    var setHowTake = $('#filter-receivy').val();

    var tdPrice = $('td.td-price');
    var getSum = objToArr(tdPrice);
    var getTerm = objToArr($('td.td-term'));
    var getHowTake = [];
    value = $('td.td-how-take');
    $(value).each(function (index, value) {
        getHowTake[index] = $(value).find('p').attr('data-how-get');
    })

    if (setHowTake === '') {
        for (var k = 0; k < getSum.length; k++) {
            if (setSum > stringToInt(getSum[k]) || setTerm > stringToInt(getTerm[k]))
                tdPrice.eq(k).closest('tr').hide();
        }
    } else {
        for (var i = 0; i < getSum.length; i++) {
            if (setSum > stringToInt(getSum[i]) || setTerm > stringToInt(getTerm[i]) || setHowTake !== getHowTake[i])
                tdPrice.eq(i).closest('tr').hide();
        }
    }


    lastItemNoneBorder();
    displayClientOffer();
    scrollToElem('your-best-deals', 800);
}

function scrollToElem(elem, speed) {
    if (document.getElementById(elem)) {
        var destination = $('#' + elem).offset().top;
        $("html,body").animate({scrollTop: destination}, speed);
    }
}

function objToArr(obj) {
    var arr = obj.map(function () {
        return $(this).text();
    }).get();
    return arr;
}

function stringToInt(string) {
    return string.replace(/\D/g, '');
}

function displayClientOffer() {
    var table = $('table');
    var offerNone = $('p#offer-none');
    if (offerNone) offerNone.remove();
    if ($('tbody tr:hidden').length === ($('tbody tr').length)) {
        table.css('margin-bottom', '100px');
        table.after('<p class="text-center" id="offer-none">Такие предложения сейчас отсутствуют, <a id="change-filter" style="cursor: pointer" onclick="scrollToElem(\'section-filter\', 800)">изменить параметры поиска</a></p>').css('margin-bottom', '0');
        $('#offer-none').css({
            'font-size': '24px',
            'margin-top': '40px',
            'margin-bottom': '40px',
            'text-transform': 'uppercase'
        });
    }
}

function lastItemNoneBorder() {
    if ($(window).width > 767) {
        $('table tr').css('border-bottom', '1px solid #AFAFAF');
        $('table').find('tr:visible:last').css('border-bottom', 'none');
    }
    ;
}

//Comments page scripts

function getSortFunction(element) {
    var functionName;
    var attr = $(element).attr('data-sort');
    if ($(element).hasClass('li-date')) {
        functionName = 'dateSortReviews';
        functionName += getSortFunctionSuffix(attr);
        if ($(window).width() <= 768) {
            mobileDisplaySortType(attr, element);
        } else {
            displaySortType(attr, element);
        }
        $(element).attr('data-sort', -attr);
        return functionName;
    } else if ($(element).hasClass('li-rate')) {
        functionName = 'rateSortReviews';
        functionName += getSortFunctionSuffix(attr);
        if ($(window).width() <= 768) {
            mobileDisplaySortType(attr, element);
        } else {
            displaySortType(attr, element);
        }
        $(element).attr('data-sort', -attr);
        return functionName;
    } else if ($(element).hasClass('li-profit')) {
        functionName = 'profitSortReviews';
        functionName += getSortFunctionSuffix(attr);
        if ($(window).width() <= 768) {
            mobileDisplaySortType(attr, element);
        } else {
            displaySortType(attr, element);
        }
        $(element).attr('data-sort', -attr);
        return functionName;
    }
}

function displaySortType(attr) {
    $('i.glyphicon').remove();
    if (parseInt(attr) === 1) {
        if (sortFlag) {
            $('span.glyphicon-sort-by-attributes').removeClass('glyphicon-sort-by-attributes').addClass('glyphicon-sort-by-attributes-alt');
        } else {
            $('ul.reviews-sort').append('<span class="glyphicon glyphicon-sort-by-attributes-alt"></span>');
            sortFlag = true;
        }
    } else {
        if (sortFlag) {
            $('span.glyphicon-sort-by-attributes-alt').removeClass('glyphicon-sort-by-attributes-alt').addClass('glyphicon-sort-by-attributes');
        } else {
            $('ul.reviews-sort').append('<span class="glyphicon glyphicon-sort-by-attributes"></span>');
            sortFlag = true;
        }
    }
}

function mobileDisplaySortType(attr, element) {
    $('i.glyphicon').remove();
    if (parseInt(attr) === 1) {
        $(element).append('<i class="glyphicon glyphicon-arrow-up"></i>');
    } else {
        $(element).append('<i class="glyphicon glyphicon-arrow-down"></i>');
    }
}

function getSortFunctionSuffix(attr) {
    attr = parseInt(attr);
    return attr === 1 ? 'Desc' : 'Asc';
}

//sort block
function dateSortReviewsDesc(a, b) {
    var date1 = dateToSort($(a).find(".date").text());
    var date2 = dateToSort($(b).find(".date").text());

    return date1 < date2;
}

function dateSortReviewsAsc(a, b) {
    var date1 = dateToSort($(a).find(".date").text());
    var date2 = dateToSort($(b).find(".date").text());

    return date1 > date2;
}

function dateToSort(date) {
    date = date.split('.');
    return new Date(date[2], date[1] - 1, date[0]);
}

function rateSortReviewsDesc(a, b) {
    return $(a).find(".review-star-active").length < $(b).find(".review-star-active").length;
}

function rateSortReviewsAsc(a, b) {
    return $(a).find(".review-star-active").length > $(b).find(".review-star-active").length;
}

function profitSortReviewsAsc(a, b) {
    var profit1 = profitValue($(a).find('.good-rev .value').text(), $(a).find('.bad-rev .value').text());
    var profit2 = profitValue($(b).find('.good-rev .value').text(), $(b).find('.bad-rev .value').text());

    return profit1 > profit2;
}

function profitSortReviewsDesc(a, b) {
    var profit1 = profitValue($(a).find('.good-rev .value').text(), $(a).find('.bad-rev .value').text());
    var profit2 = profitValue($(b).find('.good-rev .value').text(), $(b).find('.bad-rev .value').text());

    return profit1 < profit2;
}

function profitValue(a, b) {
    return a - b;
}

function rateReview(span, color, id) {
    var elementId = getElementId($(span));
    if (id.includes(elementId)) {
        return false;
    }
    id.push(elementId);
    $(span).css('color', color);
    var count = getReviewCount($(span));
    setReviewCount($(span), count);
    var comment;
    if ($(span).hasClass('good-rev')) {
        comment = 'good';
    } else if ($(span).hasClass('bad-rev')) {
        comment = 'bad';
    }
    $.post('/comment_rate.php', {id: elementId, comment: comment});
}

function getElementId(element) {
    var id = $(element).closest('.user-review-offer').find('.user-comment-rate').attr('data-comment');
    var id = parseInt(id);
    return id;
}

function getReviewCount(element) {
    var count = $(element).find('.value').text();
    var count = parseInt(count);
    return count;
}

function setReviewCount(element, count) {
    $(element).find('.value').text(++count);
}

//Offer page scripts

function getBgPercent(value) {
    return ((value / 5) * 100) + '%';
}

function showInfo(htmlClass) {
    $('.about-credit-company div.active').removeClass('active');
    $('.about-credit-company div.' + htmlClass + '-text').addClass('active');
}

//Auth modal scripts

function showModal(event) {
    if ($('#auth-modal').length > 0) {
        event.preventDefault();
        $('#auth-modal').modal();
    }
}

function ajax(data) {
    $.ajax({
        type: 'POST',
        url: '/auth_modal.php',
        data: data,
        beforeSend: function () {
            if ($('#answer').length <= 0) {
                $('<p class="text-center" id="answer">Отправка данных...</p>').appendTo('#auth-form');
            } else {
                $('#answer').text('Отправка данных...').css('color', 'black');
            }
        },
        success: function (response) {
            if (response == 1) {
                window.location.href = "/set-review/";
            } else {
                grecaptcha.reset(widgetId);
                var text = $.each(JSON.parse(response), function (key, value) {
                    text += value;
                });
                $('#answer').text(text).css('color', 'red');
            }
        }
    });
}

//Article comments scripts
function validateName(id) {
    if (id.val().match(/[А-яA-z]{2,}/g) === null) {
        id.css("border", "1px solid #B22222");
        return false;
    } else {
        id.css("border", "1px solid #E1E1E1");
        return true;
    }
}

function validatePassword(elem) {
    if (elem.val() === '') {
        elem.css("border", "1px solid #B22222");
        if (!elem.next().is('p')) {
            elem.after('<p class="text-center" style="color: #B22222">Поле пароля не заполнено</p>');
        }
        return false;
    } else {
        elem.css("border", "1px solid green");
        if (elem.next().is('p')) {
            elem.next().remove();
        }
        return true;
    }
}

function validatePasswordRepeat(elem, pass) {
    if (validatePassword) {
        if (elem.val() != pass.val()) {
            elem.css("border", "1px solid #B22222");
            if (!elem.next().is('p'))
                elem.after('<p class="text-center" style="color: #B22222">Пароли не совпадают</p>');
        } else {
            elem.css("border", "1px solid green");
            if (elem.next().is('p')) {
                elem.next().remove();
            }
            return true;
        }
    } else {
        return false;
    }
}

function validateEmail(elem) {
    if (elem.val().match(/\S+@\S+\.\S+/) === null) {
        elem.css("border", "1px solid #B22222");
        if (!elem.next().is('p')) {
            elem.after('<p class="text-center" style="color: #B22222">Не верно введен Email</p>')
        }
        return false;
    } else {
        elem.css("border", "1px solid green");
        if (elem.next().is('p')) {
            elem.next().remove();
        }
        return true;
    }
}

function validateComment(id) {
    if (id.val().length <= 0) {
        id.css("border", "1px solid #B22222");
        return false;
    } else {
        id.css("border", "1px solid #E1E1E1");
        return true;
    }
}

//Add site scripts
function validateNumber(id) {
    if (!Number.isInteger(parseInt(id.val()))) {
        id.css("border", "1px solid #B22222");
        return false;
    } else {
        id.css("border", "1px solid #E1E1E1");
        return true;
    }
}

function validateAddress(id) {
    if (!id.val().match(/(([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}/g)) {
        id.css("border", "1px solid #B22222");
        return false;
    } else {
        id.css("border", "1px solid #E1E1E1");
        return true;
    }
}

function validateCheckbox(inputs) {
    var countOfChecks = 0;
    $.each(inputs, function (index, value) {
        if ($(value).prop('checked')) {
            countOfChecks++;
        }
    });
    if (countOfChecks <= 0) {
        $('h2.service-get-money-types').css('color', '#B22222');
        return false;
    }
    return true;
}

function validateTextarea(id) {
    if (!id.val()) {
        id.css("border", "1px solid #B22222");
        return false;
    } else {
        id.css("border", "1px solid #E1E1E1");
        return true;
    }
}

function setPlaceholder(selector, text) {
    $(selector).attr('placeholder', text);
}

//Set review scripts

function getWrapClass(string) {
    string = string.split(" ");
    return '.' + string[string.length - 1];
}

function getStarNumber(string) {
    return string.match(/\d/);
}

function validateForm(id) {
    if (!id.val()) {
        id.css("border", "1px solid #B22222");
        return false;
    }
    else {
        id.css("border", "1px solid #E1E1E1");
        return true;
    }
}

function checkRateMark() {
    var result = true;
    $('input.mark').map(function (index, element) {
        if ($(element).val() == 0) {
            result = false;
        }
    });
    return result;
}

