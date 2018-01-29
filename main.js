const container = document.getElementById("loading");
const searchBar = document.getElementById("searching");

function clicked() {
    console.log("You clicked me!")
    const newRequest = new XMLHttpRequest();
    newRequest.open('GET', 'https://api.github.com/orgs/HackYourFuture/repos');
    newRequest.onload = function () {
        const newData = JSON.parse(newRequest.responseText);
        renderHtml(newData);
    };
    newRequest.send();
};

function renderHtml(data) {
    let contant = "";
    for (let i = 0; i < data.length; i++) {
        contant += "<li id='list-item'>" + "<a href='https://github.com/HackYourFuture/" + data[i].name + "' target=_blank>" + data[i].name + "</a>" + "</li>";
    }
    loading.insertAdjacentHTML('beforeend', contant);
    searchBar.addEventListener('keyup', function (e) {
        const term = e.target.value.toLowerCase();
        const result = loading.getElementsByTagName("li");
        Array.from(result).forEach(function (respo) {
            const title = respo.firstElementChild.textContent;
            if (title.toLocaleLowerCase().indexOf(term) != -1) {
                respo.style.display = 'block';
            }
            else {
                respo.style.display = 'none';
            }
        });
    });
};