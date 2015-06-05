;(function() {
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
    function requestAjax(data, fn) {
        var test = new XMLHttpRequest();
        var time = (new Date()).getTime();

        test.open("post", "http://simonenko.ru/academy/echo" + time, true);

        test.addEventListener("readystatechange", function() {
            if (test.readyState == 4) {
                fn(test.responseText);
            }
        });

        test.send(data);
    }
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

    function Counter(options) {
        var wrap = document.querySelector(options.wrap);
        var countElem = document.querySelector(options.box);
        var maxIncrease = +options.max > 0 ? +options.max : 365;

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
        box: ".travel-duration__trip-date",
        minus: "travel-duration__btn-minus",
        plus: "travel-duration__btn-plus"
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



    var failure = document.querySelector(".failure-popup");
    var button = failure.querySelector(".failure-popup__button");

    button.addEventListener("click", function(event) {
        event.preventDefault();
        failure.classList.add("failure-popup--hidden");
    });

    var request = document.querySelector(".request-popup");
    var btn = request.querySelector(".request-popup__button");

    btn.addEventListener("click", function(event) {
        event.preventDefault();
        request.classList.add("request-popup--hidden");
    });
})();

