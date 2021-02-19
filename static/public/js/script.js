var kiesImage = document.querySelectorAll('form.fotos input');
var displayImage = document.querySelectorAll('form.fotos label');

var checkboxLabels = document.querySelectorAll('form.zoekopdracht>div>div label');
var chooseSelects = document.querySelectorAll('form.zoekopdracht select ');

checkboxLabels.forEach(function (checkboxLabel) {
    checkboxLabel.addEventListener('click', function () {
        checkboxLabel.classList.toggle('checked')
    })
});

chooseSelects.forEach(function (chooseSelect) {
    chooseSelect.addEventListener('change', function () {
        chooseSelect.classList.add('checked')
    })
});

kiesImage.addEventListener('change', function () {
    getDataImg();
});

function getDataImg () {
    var files1 = kiesImage[0].files[0];
    var files2 = kiesImage[1].files[1];
    var files3 = kiesImage[2].files[2];
    var files4 = kiesImage[3].files[3];
    var files5 = kiesImage[4].files[4];
    var files6 = kiesImage[5].files[5];
    var files7 = kiesImage[6].files[6];
    var files8 = kiesImage[7].files[7];
    var files9 = kiesImage[8].files[8];

    if (files1){
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files1);
        fileReader.addEventListener("load", function () {
            displayImage[0].style.display = "block";
            displayImage[0].innerHTML = '<img src="' + this.result + '" />'
        });
    }
    if (files2) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files2);
        fileReader.addEventListener("load", function () {
            displayImage[1].style.display = "block";
            displayImage[1].innerHTML = '<img src="' + this.result + '" />'
        });
    };
    if (files3){
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files3);
        fileReader.addEventListener("load", function () {
            displayImage[2].style.display = "block";
            displayImage[2].innerHTML = '<img src="' + this.result + '" />'
        });
    }
    if (files4) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files4);
        fileReader.addEventListener("load", function () {
            displayImage[3].style.display = "block";
            displayImage[3].innerHTML = '<img src="' + this.result + '" />'
        });
    };
    if (files5){
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files5);
        fileReader.addEventListener("load", function () {
            displayImage[4].style.display = "block";
            displayImage[4].innerHTML = '<img src="' + this.result + '" />'
        });
    }
    if (files6) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files6);
        fileReader.addEventListener("load", function () {
            displayImage[5].style.display = "block";
            displayImage[5].innerHTML = '<img src="' + this.result + '" />'
        });
    };
    if (files7){
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files7);
        fileReader.addEventListener("load", function () {
            displayImage[6].style.display = "block";
            displayImage[6].innerHTML = '<img src="' + this.result + '" />'
        });
    }
    if (files8) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files8);
        fileReader.addEventListener("load", function () {
            displayImage[7].style.display = "block";
            displayImage[7].innerHTML = '<img src="' + this.result + '" />'
        });
    };
    if (files9) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files9);
        fileReader.addEventListener("load", function () {
            displayImage[8].style.display = "block";
            displayImage[8].innerHTML = '<img src="' + this.result + '" />'
        });
    };
}





