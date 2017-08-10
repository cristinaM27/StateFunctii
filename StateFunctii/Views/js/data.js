$(document).ready(function () {
    $("a.mobile").click(function () {
        $(".sidebar").slideToggle('fast');
    });
    window.resize = function (event) {
        if ($(window).width() > 320) {
            $(".sidebar").show();
        }
    };
});

function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

$('#click_href').onclick(function () {
    var ulCadre = $('#ulCadre');
   // var ul, li;
    $.ajax({
        type: 'GET',
        url: '/api/CadreDidactice',
        dataType: 'json',
        success: function (response) {
            ulCadre.empty();
            $.each(response, function (index, val) {
                var fullCadru = val.id + ' ' + val.Departament + ' ' + val.nume + ' ' + val.prenume + ' ' + val.titular + ' ' + val.Pozitia;
                ulCadre.append('<li>' + fullCadru + '</li>')
            });
        },
        error: function () {
            alert("Nu merge");
        }

    });
});

$('#btnLogout').click(function () {

    sessionStorage.clear();
    console.log("Error");
    window.location.href = "Login.html"
});


//$(document).ready(function () {
//    var oTable = $('#Database1').DataTable({
//        "ajax": {
//            "url": 'localhost:51060/api/Views/Data/SignIn',
//            "type": "get",
//            "datatype": "json"
//        },
//        "columns": [
//            { "data":"Departament", "autoWidth":true},
//            { "data":"Nume", "autoWidth":true},
//            { "data":"Prenume", "autoWidth":true },
//            { "data":"Titular", "autoWidth":true },
//            { "data": "Pozitie", "autoWidth": true }
            
//            { "data": "ID", "width": "50px", "render": function (data) {
//                return '<a class="popup" href="/home/save/' + data + '">Edit</a>';
//            }
//            },

//            {
//                "data": "ID", "width": "50px", "render": function (data) {
//                    return '<a class="popup" href="/home/del/' + data + '">Delete</a>';
//                }
//            }
//        ]
//    })
//    $('.tableD').on('click', 'a.popup', function (e) {
//        e.preventDefault();
//        OpenPopup($(this).attr('href'));
//    })
//    function OpenPopup(pageUrl) {
//        var $pageContent = $('<div/>');
//        $pageContent.load(pageUrl);
//        $dialog = $('<div class="popupWindow" style="overflow:auto"></div>')
//            .html($pageContent)
//            .dialog({
//                draggable: false,
//                autoOpen: false,
//                resizible: false,
//                model: true,
//                title: 'Popup Dialog',
//                height: 550,
//                width: 600,
//                close: function () {
//                    $dialog.dialog('destroy').remove();
//                }
//            })
//    }
//})

