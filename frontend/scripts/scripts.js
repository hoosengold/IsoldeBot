function display_array() {
    var e = "";
    var array = document.getElementsByClassName('tb');

    for (var i = 0; i < array.length; i++) {
        e += "Element " + i + " = " + array[i] + "<br/>";
    }
    document.getElementById("Result").innerHTML = e;
}
var inputCounter = 0;

function addElement() {
    inputCounter++;
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'div_' + inputCounter);
    newDiv.innerHTML = '<input type="text" id="tb_' + inputCounter + '" name="tb_' + inputCounter + '"/>';
    document.getElementById('content').appendChild(newDiv);
}

function removeElement() {
    if (0 < inputCounter) {
        document.getElementById('content').removeChild(document.getElementById('div_' + inputCounter));
        inputCounter--;
    } else {
        alert("No textbox to remove");
    }
}

//var commandType = document.documentElement.id
function input() {
    if (commandType === "poll") {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'div_')
        newDiv.innerHTML = '<input type="text" id="tb_" name="tb_"/>';
        document.getElementById('addinput').appendChild(newDiv);
    }
}