
function myFunction() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("cadreTable");
    tr = table.getElementsByTagName("tr");

   
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$('#btnLogout').click(function () {
    sessionStorage.clear();
    console.log("Error");
    window.location.href = "Login.html"
});

$('#btnSave').click(function () {
    var id2 = sessionStorage.getItem("id2");
    var id3 = sessionStorage.getItem("id3");
    var id;
    if (id = id2) {
        var cadru = { nume: $('#txtNume').val(), prenume: $('#txtPren').val(), Departament: $('#txtDep').val(), Pozitia: $('#txtPoz').val(), Titlu: $('#txtTitlu').val(), Titular: $('#txtTitular').val() };
        $.ajax({
            url: '/api/CadreDidactice1',
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
    }
    else if (id = id3) {
        var id3 = sessionStorage.getItem("id3");
        var cadru = { nume: $('#txtNume').val(), prenume: $('#txtPren').val(), Departament: id3, Pozitia: $('#txtPoz').val(), Titlu: $('#txtTitlu').val(), Titular: $('#txtTitular').val() };
        $.ajax({
            url: '/api/CadreDidactice2',
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
    }
});


function cadreList() {
    var id;
    var id2 = sessionStorage.getItem("id2");
    var id3 = sessionStorage.getItem("id3");
    if (id = id2) {
        $.ajax({
            url: '/api/CadreDidactice1/' + id2,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                cadreListSuccess(response);
          
            },
            error: function () {
                alert("Error");
            }
        });
    }
    else if (id = id3) {
        $.ajax({
            url: '/api/CadreDidactice2/' + id3,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                cadreListSuccess(response);
       
            },
            error: function () {
                alert("Error");
            }
        });
    }
   
}

function cadreListSuccess(response) {
 
    $.each(response, function (index, cadru) {
 
        cadruAddRow(cadru);
    });
}
function cadruAddRow(cadru) {

    if ($("#cadreTable tbody").length == 0) {
        $("#cadreTable").append("<tbody></tbody>");
    }

    $("#cadreTable tbody").append(
        cadruBuildTableRow(cadru));
}
function cadruBuildTableRow(cadru) {
    var ret = "<tr>" +
        "<td>" + cadru.id + "</td>" +
        "<td>" + cadru.nume + "</td>" +
        "<td>" + cadru.prenume + "</td>" +
        "<td>" + cadru.Departament + "</td>" +
        "<td>" + cadru.Pozitia + "</td>" +
        "<td>" + cadru.Titlu + "</td>" +
        "<td>" + cadru.Titular + "</td>" +
        "<td><button type='button' onclick='cadruGet(this)' data-id='" + cadru.id +"'><span class='glyphicon glyphicon-edit edit-button'></span></button></td>" +
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
    var id2 = sessionStorage.getItem("id2");
    var id3 = sessionStorage.getItem("id3");
    var idd;
    if (idd = id2) {
        $.ajax({
            url: "/api/CadreDidactice1/" + id,
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
    else if (idd = id3) {
        $.ajax({
            url: "/api/CadreDidactice2/" + id,
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

}
function cadruGet(ctl)
{
    $('#myModal1').modal();
    var id2 = sessionStorage.getItem("id2");
    var id3 = sessionStorage.getItem("id3");
    var idd;
    if (idd = id3) {
        $('#btnEdit').click(function () {
            var id = $(ctl).data("id");
            var cadru = { nume: $("#txtNume1").val(), prenume: $("#txtPren1").val(), Pozitia: $("#txtPoz1").val(), Titlu: $("#txtTitlu1").val(), Titular: $("#txtTitular1").val() };
            $.ajax({
                url: '/api/CadreDidactice2/' + id,
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(cadru),
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
    }
    if (idd = id2) {
        $('#btnEdit').click(function () {
            var id = $(ctl).data("id");
            var cadru = { nume: $("#txtNume1").val(), prenume: $("#txtPren1").val(), Departament: $("#txtDep1").val(), Pozitia: $("#txtPoz1").val(), Titlu: $("#txtTitlu1").val(), Titular: $("#txtTitular1").val() };
            $.ajax({
                url: '/api/CadreDidactice1/' + id,
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(cadru),
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
    }
    
}
