let form = document.getElementById("myform");
let ul = document.getElementById("list")
const url='https://crudcrud.com/api/2e19fbe0c19149928ea6c224649db977/Expenc';
form.addEventListener("submit",afterSubmit);

window.addEventListener("load",afterLoad());

ul.addEventListener("click",listClick);

function afterSubmit(e){
    let amt = document.getElementById("amount").value;
    let desp = document.getElementById("desp").value;
    let cho = document.getElementById("choose").value;

    const obj = {
        amount : amt,
        description : desp,
        choose : cho ,
    } 
    console.log(obj);
    axios.post(url,obj)
    .then(res=>console.log(res, "Succesfully uploded"))
    .catch(err=>console.log(err));
}


function afterLoad(e){
    axios.get(url)
    .then(res=>{
        let totalAmount = 0;
        res.data.forEach((obj)=>{
            const add = `<li>
                            <p hidden>${obj._id}</p>
                            $${obj.amount} ${obj.description} ${obj.choose}
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                        </li>`;
            document.getElementById('list').innerHTML += add;
            totalAmount += parseInt(obj.amount) ;
        });
        total.appendChild(document.createTextNode("$"+totalAmount));
    })
    .catch(err=>console.log(err));

}

function listClick(e){
    let li = e.target.parentElement;
    let key=li.childNodes[1].textContent;
    const newUrl = url+'/'+key;
    if(e.target.classList.contains('delete')){
        ul.removeChild(li);
        axios.delete(newUrl).then(res=>console.log(res));
    }

    if(e.target.classList.contains('edit')){ 
        axios.get(newUrl)
        .then(res=>{
        let obj= res.data;
        let amt = document.getElementById("amount");
        let desp = document.getElementById("desp");
        let cho = document.getElementById("choose");
        amt.value = obj.amount;
        desp.value = obj.description;
        cho.value = obj.choose;
        axios.delete(newUrl).then(res=>console.log(res));
        ul.removeChild(li);
        })
        .catch(err=>console.log(err));  
    }
}