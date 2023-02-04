import {configColor,configScrollable,configHeight} from "./config.js";

let overflowStyle;
let height;
function isNumericAndPositive(value) {
    return /^\d+$/.test(value);
}
let isValidHeight=isNumericAndPositive(configHeight)

isValidHeight ? height=`${configHeight}px` : height="auto"
configScrollable==="true" ? overflowStyle="overflow-y:auto;overflow-x:hidden" : overflowStyle="overflow:hidden"

let styles=`
<style title="Стили виджета таблицы должников">
.debtorsTableContainer{
    height: ${height};
    ${overflowStyle};
}

.debtorsSelectBlock{
    display: flex;
    align-items: center;
}

.debtorsSelectHeader{
    color: ${configColor};
}

.debtorsHouseSelect{
    padding:10px;
    color: black;
    width: 100%;
}

.debtorsMonthsInput{
    padding:10px;
    color: black;
    width: 100%;
}

.debtorsTableBlock{
    margin-top: 20px;
}

.debtorsTable{
    border: 1px solid black;
}

.debtorsFormLabel{
    /* width: 100%; */
    color:${configColor};
    font-size: large;
}

.debtorsFormInput{
    padding-left:5px;
    padding-right: 5px;
    color: black;
}

/*Loader*/

.debtorsLoading {
    display: flex;
    justify-content: center;
}

.debtorsLoading::after {
    content: "";
    width: 50px;
    height: 50px;
    border: 10px solid #dddddd;
    border-top-color: ${configColor};
    border-radius: 50%;
    animation: debtorsLoading 1s ease infinite;
}

@keyframes debtorsLoading {
    to {
        transform: rotate(1turn);
    }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}
</style>
`



document.head.insertAdjacentHTML('beforeend',styles);