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
  /*  $(document).ready(function () {
        //var ulCadre = $('#ulCadre');

        $.ajax({
            type: 'GET',
            url: '/api/CadreDidactice',
            dataType: 'json',
            success: function (response) {
                $.each(response, function (i, item) {
                    $('<tr>').html("<td>" + response[i].id + "</td><td>" + response[i].Departament + "</td><td>" + response[i].nume + "</td><td>" + response[i].prenume + "</td><td>" + response[i].titular + "</td><td>" + response[i].Pozitia + "</td><td>" + "<button  data-toggle='modal' data-target='#myModal1' id='modalEdit'>Edit</button>" + "</td><td>" + "<button id='btnDelete' >Delete</button>").appendTo('#Database1');
                    $('#btnDelete').click(function () {
                        $.ajax({
                            type: 'DELETE',
                            url: '/api/CadreDidactice/' +id,
                            dataType: 'json',
                            success: function (response) {
                                alert("Sters cu succes");
                            },
                            error: function () {
                                alert("Nu merge");
                            }

                        });
                    });
                });
               // $('#Database1').pagtable({ perpag: 30 }); 
            },
            error: function () {
                alert("Nu merge");
            },
           

        });
       
    });*/

$('#btnSave').click(function () {
    var cadru = { Departament: $('#txtDep').val(), nume: $('#txtNume').val(), prenume: $('#txtPren').val(), titular: $('#txtTitular').val(), Pozitia: $('#txtPoz').val() };
    $.ajax({
        url: '/api/CadreDidactice',
        type: "POST",
        contentType: 'application/json',
        data:
        JSON.stringify(cadru),
        success: function (response) {
            if (status == "success")
                sessionStorage.setItem('accesToken', response.access_token);
            alert("Inserat");
        },
        error: function (error) {
            alert("Nu s-a inserat.");
        }
    });
    });

$('#btnEdit').click(function () {
    var cadru = { Departament: $('#txtDep').val(), nume: $('#txtNume').val(), prenume: $('#txtPren').val(), titular: $('#txtTitular').val(), Pozitia: $('#txtPoz').val() };
    $.ajax({
        url: '/api/CadreDidactice',
        type: "PUT",
        contentType: 'application/json',
        data:
        JSON.stringify(cadru),
        success: function (response) {
            if (status == "success")
                sessionStorage.setItem('accesToken', response.access_token);
            alert("Actualizat");
        },
        error: function (error) {
            alert("Nu s-a actualizat.");
        }
    });
});

function showPage(id) {
    var totalNumberOfPages = 2;
    for (i = 1; i <= totalNumberOfPages; i++) {
        if (document.getElementById('page' + i))
            document.getElementById('page' + i).style.display = 'none';

    }
    if (document.getElementById('page' + i))
        document.getElementById('page' + i).style.display = 'block';
}
function cadreList() {
    // Call Web API to get a list of Product
    $.ajax({
        url: '/api/CadreDidactice/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            cadreListSuccess(response);
        },
        error: function () {
            allert("Error");
        }
    });
}
function cadreListSuccess(response) {
    // Iterate over the collection of data
    $.each(response, function (index, cadru) {
        // Add a row to the Product table
        cadruAddRow(cadru);
    });
}
function cadruAddRow(cadru) {
    // Check if <tbody> tag exists, add one if not
    if ($("#cadreTable tbody").length == 0) {
        $("#cadreTable").append("<tbody></tbody>");
    }
    // Append row to <table>
    $("#cadreTable tbody").append(
        cadruBuildTableRow(cadru));
}
function cadruBuildTableRow(cadru) {
    var ret =
        "<tr>" +
        "<td>" + cadru.id + "</td>" +
        "<td>" + cadru.Departament + "</td>"
        + "<td>" + cadru.nume + "</td>"
        + "<td>" + cadru.prenume + "</td>"
        + "<td>" + cadru.titular + "</td>"
        + "<td>" + cadru.Pozitia + "</td>" +

        "<td><a href='#' onclick='cadruGet()'><span class='glyphicon glyphicon-edit edit-button'></span></a></td>"

        "<td>" +
        /* "<button type='button' " +
         "onclick='productGet(this);' " +
         "data-id='" + cadru.id + "'>" +
         "<span class='glyphicon glyphicon-edit' />"
         + "</button>" +*/
        "<button type='button' " +
        "onclick='cadruGet();'"+
        "class='btn btn-default' " +
        //"data-target='#myModal1'" +
        "data-toggle='modal'"+
        "data-id='" + cadru.id + "'  > "+
       "<span class='glyphicon glyphicon-edit' />" +
        "</button>" +
        /*$("#myModal1").modal({
            show:'true'
        }) +*/
        "</td >" +
        "<td>" +
        "<button type='button' " +
        "onclick='cadruDelete(this);' " +
        "class='btn btn-default' " +
        "data-id='" + cadru.id + "'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "</td>" +
        "</tr>";
    return ret;
}
$(document).ready(function () {
    cadreList();
});

function cadruDelete(ctl) {
    var id = $(ctl).data("id");

    $.ajax({
        url: "/api/CadreDidactice/" + id,
        type: 'DELETE',
        success: function (cadru) {
            $(ctl).parents("tr").remove();
            alert("Sters cu succes!");
        },
        error: function () {
            alert("Nu s-a sters");
        }
    });
}
function cadruGet()
{
    $('#myModal1').modal();
}