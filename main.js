const submitbtn = document.querySelector('button[type="submit"]'); // Submit-btn
// Buttons on the form
const poundbtn = document.getElementsByClassName("left-btn")[0];
const timeAndYearBtn = document.getElementsByClassName("right-btn");
//Error Paragraph
const error = document.getElementsByClassName("error");
//Radio Buttons
const repayment = document.getElementById("repayment");
const interestOnly = document.getElementById("interestOnly");
//Display Boxes for the results
const empty = document.getElementsByClassName("empty")[0];
const complete = document.getElementsByClassName("complete")[0];
//Adding Text to the resbox
const monthlyRepaymentText = document.getElementById("monthlyRepayment");
const totalRepaymentText = document.getElementById("totalRepayment");
//Clear btn
const clear = document.getElementById("clear");
//Form
const form = document.getElementById("myform");
//Radio Boxes
const radio1 = document.getElementById("radio1");
const radio2 = document.getElementById("radio2");

form.addEventListener("submit",function(e){
    e.preventDefault();
});

radio1.addEventListener("click",function(){
    radio1.classList.add("lime-light-bg");
    radio2.classList.remove("lime-light-bg");
});
radio2.addEventListener("click",function(){
    radio2.classList.add("lime-light-bg");
    radio1.classList.remove("lime-light-bg");
})

document.getElementById("amount").addEventListener("focus",function(){
    poundbtn.classList.add("lime-bg");    
});
document.getElementById("amount").addEventListener("focusout",function(){
    poundbtn.classList.remove("lime-bg");
});


document.getElementById("term").addEventListener("focus",function(){
    timeAndYearBtn[0].classList.add("lime-bg");
});
document.getElementById("term").addEventListener("focusout",function(){
    timeAndYearBtn[0].classList.remove("lime-bg");
});

document.getElementById("rate").addEventListener("focus",function(){
    timeAndYearBtn[1].classList.add("lime-bg");
});
document.getElementById("rate").addEventListener("focusout",function(){
    timeAndYearBtn[1].classList.remove("lime-bg");
});

function checkValid(amount,term,rate){
    let hasError = false;
    let h1=false;
    let h2=false;
    let h3=false;
    let h4=false;
    if(isNaN(amount) || amount<=0){
        // console.log("Amount has error");
        error[0].innerHTML = "This field is required";
        poundbtn.classList.add("red-bg");
        h1=true;
    }else{
        // console.log("Amount has no error");
        error[0].innerHTML = "";
        poundbtn.classList.remove("red-bg");
        h1=false;
    }
    if(isNaN(term) || term<=0){
        // console.log("Term has error");
        error[1].innerHTML = "This field is required";
        timeAndYearBtn[0].classList.add("red-bg");
        h2=true;
    }else{
        // console.log("Term has no error");
        error[1].innerHTML = "";
        timeAndYearBtn[0].classList.remove("red-bg");
        h2=false;
    }
    if(isNaN(rate) || rate<=0){
        // console.log("Rate has error");
        error[2].innerHTML = "This field is required";
        timeAndYearBtn[1].classList.add("red-bg");
        h3=true;
    }else{
        // console.log("Rate has no error");
        error[2].innerHTML = "";
        timeAndYearBtn[1].classList.remove("red-bg");
        h3=false;
    }
    if(repayment.checked || interestOnly.checked){
        error[3].innerHTML = "";
        h4=false;
    }else{
        error[3].innerHTML = "This field is required";
        h4 = true;
    }

    if(h1||h2||h3||h4){
        hasError=true;
    }
    return hasError;
};

submitbtn.addEventListener("click",function(){
    const amount = parseFloat(document.getElementById("amount").value);
    const term = parseFloat(document.getElementById("term").value);
    let rate = parseFloat(document.getElementById("rate").value);
    const isValid = checkValid(amount,term,rate);
    if(isValid){
        // console.log("Has Error");
        empty.classList.remove("hidden");
        complete.classList.add("hidden");
    } else{
        // console.log("Has No error");
        empty.classList.add("hidden");
        complete.classList.remove("hidden");
        //Calculate Based on the selection
        rate = rate/100;
        const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

        let monthlyRepayment = 0;
        let totalRepayment = 0;

        if(mortgageType.value === "repayment"){
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyRepayment = (amount * monthlyRate)/(1 - Math.pow((1 + monthlyRate),-n));
            totalRepayment = monthlyRepayment*n;
        }else if(mortgageType.value === "interestOnly"){
            monthlyRepayment = (amount * rate)/12;
            totalRepayment = monthlyRepayment * term *12;
        }
        // console.log(monthlyRepayment);
        // console.log(totalRepayment);
        monthlyRepaymentText.innerHTML ="£"+ monthlyRepayment.toFixed(2);
        totalRepaymentText.innerHTML ="£"+ totalRepayment.toFixed(2);
    }
});

clear.addEventListener("click",function(){
    form.reset();
});
