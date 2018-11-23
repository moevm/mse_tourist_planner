
var steps = $("#StepForm fieldset");

var count = steps.size();

$("#savebtn").hide();
$("#StepForm").before("<ul id = 'steps'></ul>");

steps.each(function (i) {
    var name = $(this).find("legend").html();
    $("#steps").append("<li id='stepDesc" + i + "'>Step "+ (i+1) + "<span>" + name + "</span>");
    $(this).wrap("<div id = 'step" + i + "'></div>");
    $(this).append("<p id='step" +i +"commands'</p>");
    createNextButton(i);
    selectStep(i);
    if(i+2 === count) {
        $("#Savebtn").show();
    }
});


function createNextButton(i) {
    var stepName = "step" + i;
    $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class = 'w3-button w3-cyan'>Next ></a>");
    $("#" + stepName + "Next").bind("click", function (e) {
        $("#step"+ (i+1)).show();
        selectStep(i+1);
    });
}

function selectStep(i) {
    $("#steps li").removeClass("current");
    $("#stepDesc" +i).addClass("current");

}


