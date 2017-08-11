
$('#linkClose').click(function () {
    $('#divError').hide('fade');
});
$('#btnLogin').click(function () {
    var user = { Scurt: $('#txtScurt').val(), Parola: $('#txtParola').val() };
        $.ajax({
            url: 'http://localhost:51383/api/Views/Login/SignIn',
            type: "POST",
            contentType: 'application/json',
            data:
            JSON.stringify(user),           
           success: function (response) {
                if (status == "success") 
                    sessionStorage.setItem('accesToken', response.access_token);
                    sessionStorage.setItem('Scurt', response.Scurt);
                    window.location.href = "Data.html";
            },
            error: function (error) {
                alert("Usename or password incorrect!");
            }
        });
});

$('#btn').click(function () {
   var ulCadre = $('#ulCadre');
        $.ajax({
            type: 'GET',
            url: '/api/CadreDidactice',
            dataType:'json',
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

$('#btn1').click(function () {
    $.ajax({
        type: 'DELETE',
        url: '/api/CadreDidactice/398',
        dataType: 'json',
        success: function (response) {
            alert("Sters cu succes");
        },
        error: function () {
            alert("Nu merge");
        }

    });
});
$('#btn2').click(function () {
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
$('#btn3').click(function () {
    var cadru = { Departament: $('#txtDep').val(), nume: $('#txtNume').val(), prenume: $('#txtPren').val(), titular: $('#txtTitular').val(), Pozitia: $('#txtPoz').val() };
    $.ajax({
        url: '/api/CadreDidactice/2158',
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
