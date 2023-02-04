import {authedFetchGet} from "./fetch.js";
import {renderTableData, renderTableFetchLoader} from "./render.js";

async function addTableScripts(){
    let housesData=await authedFetchGet('houses');
    const housesAmount = housesData.map(value => {
        return (
            `
            <option value="${value.id}">
                ${value.id}
            </option>
            `
        );
    }).join('');

    const tableHouseSelector = document.getElementById("debtorsHouseSelector");
    tableHouseSelector.insertAdjacentHTML('beforeend',housesAmount)

    document.getElementById('debtorsHouseSelector').addEventListener('change',async function(){
        renderTableFetchLoader()
        let data;
        let houseId=document.getElementById('debtorsHouseSelector').value
        let months=document.getElementById('debtorsMonthsInput').value
        if(months){
            data=await authedFetchGet(`debts-by-house-and-months/${houseId}/${months}`)
        } else {
            data=await authedFetchGet(`debts-by-house/${houseId}`)
        }
        renderTableData(data)
    })

    function debounce( callback, delay ) {
        let timeout;
        return function() {
            clearTimeout( timeout );
            timeout = setTimeout( callback, delay );
        }
    }

    document.getElementById('debtorsMonthsInput').addEventListener('input',debounce(async function(){
        let data
        let houseId=document.getElementById('debtorsHouseSelector').value
        let months=document.getElementById('debtorsMonthsInput').value
        if(houseId && months){
            renderTableFetchLoader()
            data=await authedFetchGet(`debts-by-house-and-months/${houseId}/${months}`)
            renderTableData(data)
        } else if(houseId && !months){
            renderTableFetchLoader()
            data=await authedFetchGet(`debts-by-house/${houseId}`)
            renderTableData(data)
        }
    },250))
}

export {addTableScripts}

