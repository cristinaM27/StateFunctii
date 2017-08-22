$('#btnLogout').click(function () {
    sessionStorage.clear();
    console.log("Error");
    window.location.href = "Login.html"
});
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
        "<td>" + grupa.cod_pi + "</td>" +
        "<td>" + grupa.An + "</td>" +
        "<td>" + grupa.nr_grupe + "</td>" +
        "<td>" + grupa.nr_subgr + "</td>" +
        "<td>" + grupa.Facultate + "</td>" +
        "<td>" +
        "<button type='button'" +
        "onclick='grupaDelete(this);'" +
        "class='btn btn-default' " +
        "data-id='" + grupa.cod_pi+ "'>" +
        'Delete'+
        "</button>" +
        "<td>"+
        "</tr>";  
    return ret;
}
$(document).ready(function () {
    grupeList();
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
