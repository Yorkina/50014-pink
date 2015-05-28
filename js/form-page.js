console.log ("start");
(function() {
	if (!("FormData" in window)) {
		return;
	}

	var form = document.querySelector(".form-content__form");

	form.addEventListener("submit", function(event) {
		event.preventDefault();

		var data = new FormData(form);

		request(data, function(response) {
			console.log(response);
		});
	});

console.log ("middle");

	function request(data, fn) {
		var test = new XMLHttpRequest();
		var time = (new Date()). getTime();

		test.open("post", "http://simonenko.ru/academy/echo" + time);

		test.addEventListener("readystatechange", function() {
			if(test.readyState == 4) {
				fn(test.responseText);
			}
	});

	test.send(data);
	}

console.log("center");

	if("FileReader" in window) {
		var area = document.querySelector(".travel-photo");
		var adder = document.querySelector(".travel-photo__images");
		area.querySelector("#upload__photo").addEventListener("change", function() {

			var files = this.files;

			for(var i = 0; i < files.length; i++) {
				prewiew(files[i]);
			}
		});

console.log("test");

		function prewiew(file) {
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

					caption.innerHTML = (file.name.toUpperCase());

					adder.appendChild(figure);
					figure.appendChild(img);
					figure.appendChild(cancel);
					figure.appendChild(caption);

					cancel.onclick = function(event) {
						event.preventDefault();
						this.parentNode.remove();
					}
				});
				reader.readAsDataURL(file);
				}
			}
		}
		function Counter(options) {
			var wrap = document.querySelector(options.wrap);;
			var countElem = document.querySelector(options.box);

			wrap.onclick = function(event) {
				event.preventDefault();
				if(event.target.className == options.minus) {
					countDecrease();
				} else if (event.target.className == options.plus) {
					countIncrease();
				}
			}
			countElem.oninput = function(e) {
				var pattern = /^[^A-Za-zА-Яа-я/]+$/g;
				if(this.value.match(pattern)) {
					return;
				} else {
					this.value = this.value.replace(/[A-Za-zА-Яа-я]+/,'');
				}
			};
			function countDecrease() {
				if (countElem.value != 0) {
				countElem.value = +countElem.value -1;
				}
			}

			function countIncrease() {
				if (countElem.value != 365) {
				countElem.value = +countElem.value +1;
				}
			}

			this.setCount = function(add) {
				countElem.value = +add;
			};
		}

		var calc = new Counter ({
			wrap: ".trip-date-wrapper",
			box: ".travel-duration__trip-date",
			minus: "travel-duration__btn-minus",
			plus: "travel-duration__btn-plus"

		});

		calc.setCount(0);

		var calcTravalers = new Counter ({
			wrap: ".travelers__count",
			box: ".travelers__trip-count",
			minus: "travelers__btn-minus",
			plus: "travelers__btn-plus"
		});

		calc.setCount(0);
})();

