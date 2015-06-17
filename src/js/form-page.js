;
if (document.querySelector(".form-content__form")) {
    addLocalStorage();
    sendForm();
};

function sendForm() {
    if (!("FormData" in window)) {
        return;
    }
    var form = document.querySelector(".form-content__form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        var data = new FormData(form);
        requestAjax(data, function(response) {
            console.log(response);
        });
    });
};

function requestAjax(data, fn) {
    var test = new XMLHttpRequest();
    var time = (new Date()).getTime();

    test.open("post", "http://simonenko.su/academy/echo?" + time, true);

    test.addEventListener("readystatechange", function() {
        var overlay = document.querySelector(".popup-overlay");
        var request = document.querySelector(".request-popup");
        var failure = document.querySelector(".failure-popup");
        if (test.readyState == 4) {
            if (test.status == 200) { 
                
                fn(test.responseText);
                localStorage.clear();
//ОТКРЫТИЕ ПОПАПОВ//
                console.log(overlay);
                var btn = request.querySelector(".request-popup__button");

                overlay.classList.add("popup-overlay--show");
                request.classList.add("request-popup--hidden");
                btn.addEventListener("click", function(event) {
                    event.preventDefault();
                    request.classList.remove("request-popup--hidden");
                    overlay.classList.remove("popup-overlay--show");
                });
            } else {
                var button = failure.querySelector(".failure-popup__button");

                overlay.classList.add("popup-overlay--show");
                failure.classList.add("failure-popup--hidden");
                button.addEventListener("click", function(event) {
                    event.preventDefault();
                    failure.classList.remove("failure-popup--hidden");
                    overlay.classList.remove("popup-overlay--show");
                });
            }
        }
    });

    test.send(data);
};

//ЛОКАЛ СТОРАЖ//

function addLocalStorage() {
    if (window.localStorage) {
        var form = document.querySelector(".form-content__form");
        var saveParam = form.querySelectorAll("[name]");
        for (var i = 0; i < saveParam.length; i++) {

            getState(saveParam[i]);
            setState(saveParam[i]);

        }
    }
};

function getState(saveParam) {

    var name = saveParam.getAttribute('name');
    saveParam.value = localStorage.getItem(name) || '';

};

function setState(saveParam) {
    var name = saveParam.getAttribute('name');
    var saver = function() {
        console.info('Форма обнаружена ===!');
        var value = this.value;

        if (!value) {
            value = '';
        }

        localStorage.setItem(name, value);

    }
    saveParam.addEventListener('keyup', saver);
    //saveParam.addEventListener('change', saver); 
};

//ФОТО//
if ("FileReader" in window) {
    var area = document.querySelector(".travel-photo");
    var adder = document.querySelector(".travel-photo__images");

    area.querySelector("#upload__photo").addEventListener("change", function() {

        var files = this.files;

        for (var i = 0; i < files.length; i++) {
            preview(files[i]);
        }
    });

    function preview(file) {
        if (file.type.match(/image.*/)) {
            var reader = new FileReader();
            reader.addEventListener("load", function(event) {

                var figure = document.createElement("figure");
                var img = document.createElement("img");
                var cancel = document.createElement("a");
                var caption = document.createElement("figcaption");

                img.src = event.target.result;
                img.alt = file.name;

                cancel.classList.add("travel-photo__btn-cancel");
                cancel.innerHTML = ("&times;");
                cancel.href = "#";

                caption.innerHTML = (file.name.toUpperCase());

                adder.appendChild(figure);
                figure.appendChild(img);
                figure.appendChild(cancel);
                figure.appendChild(caption);

                cancel.addEventListener('click', function(event) {
                    event.preventDefault();
                    this.parentNode.remove();
                });
            });
            reader.readAsDataURL(file);
        }
    }
}
//ДОБАВЛЕНИЕ ПОЛЕЙ ВВОДА //
function travelersBox(options) {
        var curCount = 0,
            wrap = document.querySelector(options.wrap),
            self = this;

        this.init = function(count) {
            curCount = +count;
            wrap.innerHTML = "";
            for (var i = 1; i <= curCount; i++) {
                var row = getHtmlTemplate(i);
                wrap.innerHTML += row;
            };
            setEvents();
        }

        this.change = function(count) {
            var count = +count;
            return count != curCount ? (count > curCount ? addRows(count) : removeRows(count)) : false;
        }

        var addRows = function(count) {
            curCount = +count;
            if (wrap.children.length < curCount) {
                var row = getHtmlTemplate(curCount);
                wrap.innerHTML += row;
                setEvents();
            }
        }

        var removeRows = function(count) {
            curCount = +count;
            wrap.lastChild.remove();
        }

        var getHtmlTemplate = function(num) {
            var num = +num,
                curCount = curCount < num ? num : curCount,
                tpl = '<div class="travelers__row">\
                            <div class="travelers__names">\
                                <header>\
                                    <span>№</span>\
                                    <label for="traveler-name">Имя:\
                                        <sup>*</sup>\
                                    </label>\
                                </header>\
                                <span class="travelers__form-number">' + num + '</span>\
                                <input type="text" name="traveler-name[' + num + ']" tabindex="13" value="" placeholder="Введите ваше имя" required>\
                                <button class="travelers__name--delete">Удалить</button>\
                            </div>\
                            <div class="travelers__nick">\
                                <label for="traveler-nick">Прозвище:</label>\
                                <input type="text" name="traveler-nick[' + num + ']" tabindex="13" value="" placeholder="Ну как же без этого!" required>\
                            </div>\
                        </div>';
            return tpl;
        }

        var setEvents = function() {
            var rows = wrap.querySelectorAll("button.travelers__name--delete");
            for (var i = rows.length - 1; i >= 0; i--) {
                rows[i].addEventListener('click', function(event) {
                    event.preventDefault();
                    this.parentNode.parentNode.remove();
                    curCount = +wrap.children.length;
                    options.counter.value = curCount;
                    if (curCount > 0)
                        updateNums(curCount);
                });
            };
        }
        var updateNums = function(count) {
            var rows = wrap.children;
            for (var i = 0, c = 1; i <= rows.length - 1, c <= count; i++, c++) {
                rows[i].querySelector(".travelers__form-number").innerText = c;
                rows[i].querySelector(".travelers__names input[type=text]").name = "traveler-name[" + c + "]";
                rows[i].querySelector(".travelers__nick input[type=text]").name = "traveler-nick[" + c + "]";
            };
        }
    }
//СЧЕТЧИК//
function Counter(options) {
    var wrap = document.querySelector(options.wrap);
    var countElem = document.querySelector(options.box);
    var maxIncrease = +options.max > 0 ? +options.max : 30;

    var travelers = options.travelersBox ? new travelersBox({
        wrap: options.travelersBox,
        counter: countElem
    }) : false;
    var self = this;

    wrap.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.className == options.minus) {
            countDecrease();
        } else if (event.target.className == options.plus) {
            countIncrease();
        }

        if (travelers instanceof travelersBox) {
            travelers.change(countElem.value)
        }
    });
//ПРОВЕРКА НА ВВОД//
    countElem.oninput = function(e) {
        var pattern = /^[^A-Za-zА-Яа-я/]+$/g;
        if (this.value.match(pattern)) {
            self.setCount(+this.value);
            return;
        } else {
            this.value = this.value.replace(/[A-Za-zА-Яа-я]+/, '');
        }
    };

    function countDecrease() {
        if (countElem.value != 0) {
            countElem.value = +countElem.value - 1;
        }
    }

    function countIncrease() {
        if (countElem.value != maxIncrease) {
            countElem.value = +countElem.value + 1;
        }
    }

    this.setCount = function(add) {
        countElem.value = +add < 0 ? 0 : (+add <= maxIncrease ? +add : maxIncrease);

        if (travelers instanceof travelersBox) {
            travelers.init(countElem.value)
        }
    };
}

var calc = new Counter({
    wrap: ".trip-date-wrapper",
    box: ".travel-duration__trip-date"
});

calc.setCount(0);

var calcTravalers = new Counter({
    wrap: ".travelers__count",
    box: ".travelers__trip-count",
    minus: "travelers__btn-minus",
    plus: "travelers__btn-plus",
    max: 9,
    travelersBox: ".travelers__info-form"
});

calcTravalers.setCount(2);

//ИЗМЕНЕНИЕ ДАТЫ ИНПУТОВ//
if (document.querySelector(".form-content__form")) {
    var tripLasting = document.getElementById('trip-lasting');
    var btnMinus = document.querySelector('.travel-duration__btn-minus');
    var btnPlus = document.querySelector('.travel-duration__btn-plus');

    btnMinus.addEventListener('click', function(e) {

        e.preventDefault();
        changeNumbers(-1, tripLasting);
        plusDate(tripLasting.value);
    });

    btnPlus.addEventListener('click', function(e) {

        e.preventDefault();
        changeNumbers(1, tripLasting);
        plusDate(tripLasting.value);
    });


    function diffDate() {
        var dateCheck = new Date(checkout.value).getTime();
        var dateDepart = new Date(departure.value).getTime();

        var dateDiff = Math.floor((dateDepart - dateCheckout) / 1000 / 60 / 60 / 24);
        if (dateDiff < 0) {
            tripDuration.value = 0;
        } else {
            tripDuration.value = dateDiff;
        }
    }

    function plusDate(num) {

        if (!checkout.value) {
            date = new Date();
            var month = (date.getMonth() + 1).toString();
            var month = month[1] ? month : '0' + month[0]

            var day = date.getDate().toString();
            var day = day[1] ? day : '0' + day[0]
            checkout.value = date.getFullYear() + '-' + month + '-' + day; /* TODO: refactor */

            checkout.addEventListener('change', function() {
                plusDate(tripLasting.value);
                departure.addEventListener('change', function() {
                    diffDate();
                });
            });
        }
        var dateCheck = new Date(checkout.value).getTime();
        var d = Math.floor(num * 1000 * 60 * 60 * 24 + dateCheck);
        var a = new Date(d);


        var month = (a.getMonth() + 1).toString();
        var month = month[1] ? month : '0' + month[0]

        var day = a.getDate().toString();
        var day = day[1] ? day : '0' + day[0];

        departure.value = a.getFullYear() + '-' + month + '-' + day;
    }
    tripLasting.addEventListener('change', function() {
        if (tripLasting.value) {
            plusDate(tripLasting.value);
        }
    });
    checkout.addEventListener('change', function() {
        if (checkout.value) {
            plusDate(tripLasting.value);
        }
    });

    function changeNumbers(number, el) {
        if ((parseInt(el.value) + number) < 1) {
            el.value = 1;
        } else if ((parseInt(el.value) + number) >= 1 && (parseInt(el.value) + number) <= 30) {
            if (!el.value) {
                el.value = 1;
            }
            el.value = parseInt(el.value) + number;
        } else {
            el.value = 1;
        }
    }
}
//JQ КАЛЕНДАРИК ДЛЯ ИНПУТОВ С ТИПОМ ДАТА//
window.isMobile = function() {
    var check = false;
    (function(a, b) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
$(function() {
    if (!isMobile()) {
        $('input[type=date]').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: "-90",
            onSelect: function() {
                if (checkout.value) {
                    plusDate(tripLasting.value);
                }
            }
        });
    }
});

