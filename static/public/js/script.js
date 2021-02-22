var checkboxLabels = document.querySelectorAll(`form.zoekopdracht>div>div label`);
var chooseSelects = document.querySelectorAll(`form.zoekopdracht select`);

var imageInputs = document.querySelectorAll(`form.fotos input`);
var imageLabels = document.querySelectorAll(`form.fotos label`);

checkboxLabels.forEach(function (checkboxLabel) {
    checkboxLabel.addEventListener(`click`, function () {
        checkboxLabel.classList.toggle(`checked`);
    });
});

chooseSelects.forEach(function (chooseSelect) {
    chooseSelect.addEventListener(`change`, function () {
        chooseSelect.classList.add(`checked`);
    });
});

imageInputs.forEach(function (imageInput) {
    imageInput.addEventListener(`change`, function (e) {
        displayImage(e);
        displayLabel();
    });
});

function displayImage (e) {
    var labelElement = document.querySelector(`[for = "${e.target.id}"]`)

    var fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.addEventListener(`load`, function () {
        labelElement.innerHTML = `<img src="${this.result}" />`
    });

    e.target.addEventListener(`click`, function (e) {
        e.preventDefault();
    });
}

function displayLabel () {
    var found = false

    imageLabels.forEach(function(imageLabel, index) {
        imageLabel.childNodes.forEach(function (childNode) {
            if(childNode.tagName !== `IMG` && !found) {
                found = true
                imageLabels[index+1].style.display = 'block';
            }
        });
    });
}