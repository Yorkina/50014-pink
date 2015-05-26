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

		test.open("post", "http://simonenko.su/academy/echo" + time);

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
				});
				reader.readAsDataURL(file);
				}
			}
		}
})();


