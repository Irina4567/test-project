let table;
$(function () {
    table = new Tabulator(".table", {
        layout:"fitColumns",      
        responsiveLayout:"hide",                        
        height: "300px",           
        //pagination:"local",       
        paginationSize:9,         
        movableColumns:false,      
        resizableRows:false,       
        columns:[                 
            {title:"Id", field:"name", visible:false},
            {title:"Current from", field:"cur_from"},
            {title:"Current to", field:"cur_to"},
            {title:"Value", field:"value"},
            {title:"Date", field:"date"},
        ],
    });

    $('.button-add-data').button().on('click',(e)=> {
        $('#dialog').dialog("open");
    });

    $(".button-request").on('click', (e)=> {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'https://24.143.176.130/621inc/pngenerator/currency/currency_r.php?r=0&from=USD&to=CAD',
            dataType: 'json', 
            crossDomain: true, 
            success: (response)=> {
               table.setData(response);
            }   
        });
    });

    let addData = function(){
        let data = $('form').serializeArray();
        // Проверка на пустые поля 
        for (let element = 0; element<data.length; element++) {
            if (data[element].value === "") {
                alert("Not all data is filled in");
                return -1;
            }
        }
        //Проверка на валидный ввод
        if ($(".setup--error").css('display') === 'block') {
            alert("Invalid user input");
            return -1;
        }
        
        $.ajax({
            url: "php/parse.php",
            type: 'post',
            data: data,
            success: function(response) {
                table.addData(response);
                //$('#dialog').dialog("close");
                alert("Data added");
            }
        })
    };

    $('#dialog').dialog({
		autoOpen: false,
        buttons: [{text: "OK", class: 'dialog-save', click: addData},
                  {text: "Cancel", class: 'dialog-cancel', click : function () {$(this).dialog("close")}}],
        width: 340,
        dialogClass: "dialog-font-size",
	});

    $(".input-current-from").on('keydown', function(e){
        //Запрет на ввод цифр в текстовое поле
        if( e.key.match(/[0-9]/) ) return e.preventDefault();
    });

	$(".date").on("change", function () {
        //Поставить в качестве атрибута data-date дату полученную из value в другом формате
        this.setAttribute("data-date", moment(this.value, "YYYY-MM-DD")
        .format( this.getAttribute("data-date-format")));
        
        //Записать в аттрибут value дату в новом формате
        this.setAttribute("value", this.getAttribute("data-date"));
        }).trigger("change");
});

 

  
