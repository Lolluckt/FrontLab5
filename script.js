window.onload = function() {
    const table = document.getElementById("colorTable");
    let tableHTML = '';
    for (let i = 0; i < 6; i++) {
        tableHTML += '<tr>';
        for (let j = 1; j <= 6; j++) {
            let cellNumber = i * 6 + j;
            tableHTML += `<td onclick="chooseColor(this)" ondblclick="changeDiagonalColor(this)" onmouseover="randomColor(this)">${cellNumber}</td>`;
        }
        tableHTML += '</tr>';
    }
    table.innerHTML = tableHTML;
}

function validateForm() {
    const fields = [
        { id: 'name', regex: /^[А-Яа-яЁёЇїІіЄєҐґ'’\s]+$/, error: "Некоректне ПІБ." },
        { id: 'idCard', regex: /^[А-Яа-я]{2} №\d{6}$/, error: "Некоректний ID-карт." },
        { id: 'faculty', regex: /^[А-Яа-яЇїІіЄєҐґA-Za-z]{3,5}$/, error: "Некоректний факультет." }, 
        { id: 'birthdate', regex: /^\d{2}\.\d{2}\.\d{4}$/, error: "Некоректна дата народження. Формат: ДД.ММ.РРРР" },
        { id: 'address', regex: /^м\.\s?[А-Яа-яЁёЇїІіЄєҐґ]+$/, error: "Некоректна адреса. Формат: м. Місто" }
    ];

    let allValid = true;
    let userData = "";

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (field.regex.test(input.value)) {
            input.classList.remove("incorrect");
            input.classList.add("correct");
            userData += `${input.previousElementSibling.innerText} ${input.value}\n`;
        } else {
            input.classList.remove("correct");
            input.classList.add("incorrect");
            allValid = false;
        }
    });

    if (allValid) {
        alert("Дані введені коректно:\n" + userData);
    } else {
        alert("Будь ласка, виправте помилки у виділених полях.");
    }
}


function randomColor(cell) {
    if (cell.textContent == '4') { 
        cell.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
}


function chooseColor(cell) {
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.style.position = "absolute";
    colorInput.style.opacity = 0;
    document.body.appendChild(colorInput);
    
    colorInput.onchange = function() {
        cell.style.backgroundColor = colorInput.value;
        document.body.removeChild(colorInput);
    };

    colorInput.click();
}


function changeDiagonalColor(cell) {
    const table = document.getElementById('colorTable');
    for (let i = 0; i < 6; i++) {
        table.rows[i].cells[5 - i].style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
}