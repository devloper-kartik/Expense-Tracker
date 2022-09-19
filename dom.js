let form = document.getElementById("myform");
let ul = document.getElementById("list")
const url='https://crudcrud.com/api/5bc5f5d0e7d141dab198f4ff6d9707e7/expense';
form.addEventListener("submit",afterSubmit);

window.addEventListener("load",afterLoad);

ul.addEventListener("click",listClick);


async function afterSubmit(e){
    e.preventDefault();
    let amt = document.getElementById("amount").value;
    let desp = document.getElementById("desp").value;
    let cho = document.getElementById("choose").value;

    const obj = {
        amount : amt,
        description : desp,
        choose : cho ,
    } 
    try{
        let res= await axios.post(url,obj);
        const add = `<li>
        <p hidden>${res.data._id}</p>
        $${obj.amount} ${obj.description} ${obj.choose}
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </li>`;
    ul.innerHTML += add;
    const count =document.getElementById("total");
    count.innerHTML = `$ ${parseInt(count.childNodes[0].textContent.slice(1))+parseInt(obj.amount)}`
    }
    catch(err){
        console.log(err);
    }
}


async function afterLoad(e){
    try{
        const res = await axios.get(url);
        let totalAmount = 0;
        res.data.forEach((obj)=>{
            const add = `<li>
                            <p hidden>${obj._id}</p>
                            $${obj.amount} ${obj.description} ${obj.choose}
                            <button class="edit">Edit</button>
                            <button class="delete">Delete</button>
                        </li>`;
        ul.innerHTML += add;
        totalAmount += parseInt(obj.amount) ;
        });
        total.appendChild(document.createTextNode("$"+totalAmount));
    }catch(e){
        console.log(e)
    }
}

async function listClick(e){
    let li = e.target.parentElement;
    let key=li.childNodes[1].textContent;
    const newUrl = url+'/'+key;
    if(e.target.classList.contains('delete')){
        try{
            await axios.delete(newUrl);
            ul.removeChild(li);
        }catch(e){
            console.log(e);
        }
        
    }
    if(e.target.classList.contains('edit')){ 
        try{
            const res =await axios.get(newUrl);
            let obj= res.data;
            let amt = document.getElementById("amount");
            let desp = document.getElementById("desp");
            let cho = document.getElementById("choose");
            amt.value = obj.amount;
            desp.value = obj.description;
            cho.value = obj.choose;
            await axios.delete(newUrl)
            ul.removeChild(li);    
        }catch(e){
            console.log(e)
        }
    }
}