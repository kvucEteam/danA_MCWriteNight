var JsonObj;
var json_streng;

function loadData(url) {
    $.ajax({
        url: url,
        // contentType: "application/json; charset=utf-8",  // Blot en test af tegnsaettet....
        //dataType: 'json', // <------ VIGTIGT: Saadan boer en angivelse til en JSON-fil vaere! 
        dataType: 'text', // <------ VIGTIGT: Pga. ???, saa bliver vi noedt til at angive JSON som text. 
        async: false, // <------ VIGTIGT: Sikring af at JSON hentes i den rigtige raekkefoelge (ikke asynkront). 
        success: function(data, textStatus, jqXHR) {
            JsonObj = jQuery.parseJSON(data);
            // Alt data JsonObj foeres over i arrays:


            //$(".correct").html("Correct answers: <b>" + score + " / " + antal_korrekte + " </b> Attempts: <b>" + attempts + "</b>");
            //next_round();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error!!!\njqXHR:" + jqXHR + "\ntextStatus: " + textStatus + "\nerrorThrown: " + errorThrown);
        }
    });
    json_streng = JSON.stringify(JsonObj);

    console.log("jSON loaded");
    init();
}

function init() {

    $(".btn_bland").click(bland_kategorier);
    for (var i = 0; i < JsonObj.kategorier.length; i++) {;
        $(".kategori_container").append("<div class='kat_obj_container col-xs-3'><div class='imgcontent'><img src='" + JsonObj.kategorier[i].imgcontent[Math.floor(Math.random() * JsonObj.kategorier[i].imgcontent.length)] + "' /></div><div class='content_header h4'>" + JsonObj.kategorier[i].tekst + "</div></div><div class='col-xs-1 glyph_container'> <span class='glyphicon glyphicon-plus-sign'></span></div>");
    }
    $(".glyph_container").eq($(".glyph_container").length - 1).hide();
}


function bland_kategorier() {


    $(".imgcontent").each(function(index) {
        console.log(index + ": " + $(this).text());
        $(this).find("img").animate({
            opacity: "0",
        }, 200 + Math.random() * 300, function() {
            console.log("anim complete");
            $("img").eq(index).attr("src", JsonObj.kategorier[index].imgcontent[Math.floor(Math.random() * JsonObj.kategorier[index].imgcontent.length)])
            $("img").eq(index).animate({
                opacity: "1"
            }, 200);
        });


        //$(this).attr("src", JsonObj.kategorier[index].imgcontent[Math.floor(Math.random() * JsonObj.kategorier[index].imgcontent.length)]);

    });




}
