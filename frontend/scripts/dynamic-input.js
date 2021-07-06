//var commandType = document.documentElement.id
function input() {
    if (commandType === "poll") {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'div_')
        newDiv.innerHTML = '<input type="text" id="tb_" name="tb_"/>';
        document.getElementById('addinput').appendChild(newDiv);
    }
}