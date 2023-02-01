import {addTableScripts} from "./table.js";

function renderDebtorsTable(){
    let debtorsTable= `
    <div class="row">
        <div class="col-md-6 debtorsSelectBlock">
            <div class="debtorsSelectHeader">№ Дома:</div>
            <select id="debtorsHouseSelector" class="debtorsHouseSelect">
            <option value="" selected disabled hidden>--Выберите дом--</option>
            </select>
        </div>
        <div class="col-md-6 debtorsSelectBlock">
            <div class="debtorsSelectHeader">Месяцы задолженности:</div>
            <input class="debtorsMonthsInput" id="debtorsMonthsInput" type="number">
        </div>
    </div>

    <div class="row debtorsTableBlock">
        <table id="debtorsTable" class="debtorsTable col-xs-12">
            <thead>
                <th>№ п/п</th>
                <th>Фамилия</th>
                <th>Месяцы</th>
                <th>Задолженность</th>
            </thead>
            <tbody id="debtorsTableBody"></tbody>
        </table>
    </div>
    `
    document.getElementById('debtorsTableContainer').innerHTML=debtorsTable
    document.getElementById('debtorsMonthsInput').addEventListener("keypress", function (evt) {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
        {
            evt.preventDefault();
        }
    });
    addTableScripts();
}

function renderTableData(data){
    let tableData = data.map(value => {
        return (
            `<tr>
       <td>${value.rec_id}</td>
       <td>${value.username}</td>
       <td>${value.quant_month}</td>
       <td>${value.quant_bal}</td>
            </tr>`
        );
    }).join('');

    let table = document.getElementById("debtorsTableBody");
    table.innerHTML=tableData
}

function renderLoader(){
    let loader=`
    <div>
        <div class="debtorsLoading"></div>
    </div>
    `
    document.getElementById('debtorsTableContainer').innerHTML=loader
}

function renderTableFetchLoader(){
    let loader=`
    <div>
        <div class="debtorsLoading"></div>
    </div>
    `
    document.getElementById('debtorsTableBody').innerHTML=loader
}

function renderError(message){
    document.getElementById('debtorsTableContainer').innerHTML=`<h1>${message}</h1>`;
}

window.addEventListener('load',function (){
    renderDebtorsTable();
})

export {renderDebtorsTable,renderLoader,renderTableFetchLoader,renderTableData,renderError}