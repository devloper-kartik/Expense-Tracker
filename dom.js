let form = document.getElementById("myform");
let ul = document.getElementById("list")

form.addEventListener("submit",afterSubmit);

window.addEventListener("load",afterLoad());

ul.addEventListener("click",listClick);

function afterSubmit(){
    let amt = document.getElementById("amount").value;
    let desp = document.getElementById("desp").value;
    let cho = document.getElementById("choose").value;

    let obj = {
        amount : amt,
        description : desp,
        choose : cho ,
    }

    localStorage.setItem(desp,JSON.stringify(obj));
}


function afterLoad(){
    let total =document.getElementById("total");
    let totalAmount = 0;
    for(let i=0;i<localStorage.length;i++){
        var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let li = document.createElement("li");

        let del = document.createElement("button");
        let edit = document.createElement("button");
        del.appendChild(document.createTextNode("Delete"));
        del.className = "delete";
        edit.appendChild(document.createTextNode("Edit"));
        edit.className = "edit";
        console.log(obj.amount);
        totalAmount += parseInt(obj.amount) ;

        li.appendChild(document.createTextNode("$"+obj.amount + " "));
        li.appendChild(document.createTextNode(obj.description));
        li.appendChild(document.createTextNode(" "+obj.choose +" "));
        li.appendChild(edit);
        li.appendChild(del);
        ul.appendChild(li);
    }
    total.appendChild(document.createTextNode("$"+totalAmount));
}

function listClick(e){
    let li = e.target.parentElement;
    let key=li.childNodes[1].textContent;
    // console.log(JSON.parse(localStorage.getItem(key)));
    if(e.target.classList.contains('delete')){
        localStorage.removeItem(key);
        ul.removeChild(li);
    }

    if(e.target.classList.contains('edit')){
        
        let obj = JSON.parse(localStorage.getItem(key));
        let amt = document.getElementById("amount");
        let desp = document.getElementById("desp");
        let cho = document.getElementById("choose");
        amt.value = obj.amount;
        desp.value = obj.description;
        cho.value = obj.choose;
        localStorage.removeItem(key);
        ul.removeChild(li);
    }
}