$('#btnLogout').click(function () {
    sessionStorage.clear();
    console.log("Error");
    window.location.href = "Login.html"
});

function myFunction() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("grupeTable");
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

function grupeList() {

    var id;
    var id1 = sessionStorage.getItem("id1");
    if (id = id1) {
        $.ajax({
            url: '/api/CrudGrupeAn/' + id1,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                grupeListSuccess(response);
                //alert(id);
            },
            error: function () {
                alert("Error");
            }
        });
    }
}

function grupeListSuccess(response) {

    $.each(response, function (index, grupa) {
 
        grupaAddRow(grupa);
    });
}
function grupaAddRow(grupa) {
   
    if ($("#grupeTable tbody").length == 0) {
        $("#grupeTable").append("<tbody></tbody>");
    }

    $("#grupeTable tbody").append(
        grupaBuildTableRow(grupa));
}
function grupaBuildTableRow(grupa) {
    var ret = "<tr>" +
        "<td>" + grupa.id + "</td>" +
        "<td>" + grupa.cod_pi + "</td>" +
        "<td>" + grupa.An + "</td>" +
        "<td>" + grupa.nr_grupe + "</td>" +
        "<td>" + grupa.nr_subgr + "</td>" +
        "<td>" + grupa.Facultate + "</td>" +
        //"<td><button type='button' onclick='grupaGet(this)' data-id='" + grupa.id + "'><span class='glyphicon glyphicon-edit edit-button'></span></button></td>" +
        "<td>" +
        "<button type='button'" +
        "onclick='grupaGet(this);'" +
        "data-target='#myModal1'" +
        "data-toggle='modal'"+
        "data-id='" + grupa.id + "'>" +
        "<span class='glyphicon glyphicon-edit edit-button'></span>" +
        "</button>" +
        "</td>"+
        "<td>" +
        "<button type='button'" +
        "onclick='grupaDelete(this);'" +
        "class='btn btn-default' " +
        "data-id='" + grupa.id+ "'>" +
        'Delete'+
        "</button>" +
        "<td>"+
        "</tr>";  
    return ret;
}

$(document).ready(function () {
   $("#click_href1").click(function () {
       // $("#grupeTable").attr("style", "visibility: hidden");
       // $("#planuriTable").attr("style", "visibility: visible");
       //$("#grupeTable").replace($("#planuriTable"));
       document.getElementById("grupeTable").innerHTML = "Lalala1";
       grupeList();
    });
    $("#click_href").click(function () {
       // $("#planuriTable").attr("style", "visibility: hidden");
        //$("#grupeTable").attr("style", "visibility: visible");
        document.getElementById("planuriTable").innerHTML = "Lalala";
        grupeList();

       // $("#planuriTable").replace($("#grupeTable"));
    });
});

function grupaDelete(ctl) {
   var id = $(ctl).data("id");
   $.ajax({
        url: "/api/CrudGrupeAn/" + id,
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
$('#btnSave').click(function () {
        var cadru = { cod_pi: $('#txtCod').val(), An: $('#txtAn').val(), nr_grupe: $('#txtNrg').val(), nr_subgr: $('#txtNrsg').val(), Facultate: $('#txtFac').val() };
        $.ajax({
            url: '/api/CrudGrupeAn',
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
function grupaGet(ctl) {
    $('#btnEdit').click(function () {
        var id = $(ctl).data("id");
        var grupa = { cod_pi: $("#txtCod1").val(), an: $("#txtAn1").val(),nr_grupe: $("#txtNr1").val(), nr_subgr: $("#txtNr_sub").val()};
        $.ajax({
            url: '/api/CrudGrupeAn/' + id,
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(grupa),
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
