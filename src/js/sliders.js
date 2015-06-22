;(function() {
    var linkArrow = document.querySelectorAll(".review-slider__arrow a");
    var inputNav = document.querySelectorAll('[name^="r-toggle"]');

    console.log(linkArrow, inputNav);

    for (var i = 0; i < linkArrow.length; i++) {
        linkArrow[i].addEventListener('click', function(e) {
            e.preventDefault();
            var currentInput = document.querySelector(".review-slider input:checked");
            var currentInputIndex = [].indexOf.call(inputNav, currentInput);
            var inputCount = inputNav.length;
            console.log("Работает");
            switch (this.dataset.direction) {
                case "left":
                    if (currentInputIndex == 0) {
                        inputNav[inputCount - 1].checked = true;
                    } else {
                        inputNav[currentInputIndex - 1].checked = true;
                    }
                    break;

                case "right":
                    if ((inputCount - 1) == currentInputIndex) {
                        inputNav[0].checked = true;
                    } else {
                        inputNav[currentInputIndex + 1].checked = true;
                    }
                    break;
            }
        });
    }
})();
