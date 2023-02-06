window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/803d51670cab44e3ad7bd4598a118ca4/Orders')
        .then((res)=>{
            for(let i=0; i<res.data.length; i++){
                showOrderOnScreen(res.data[i])
            }
        })
})

function submitOrder(e){
    const price = document.getElementById('price').value
    const dish = document.getElementById('dish').value
    const tableNumber = document.getElementById('table-number').value
    console.log(price, dish, tableNumber)

    let obj={
        price:price,
        dish:dish,
        tableNumber:tableNumber
    };

    axios.post('https://crudcrud.com/api/803d51670cab44e3ad7bd4598a118ca4/Orders', obj)
        .then((res)=>{
            showOrderOnScreen(res.data)
        })
        .catch((err)=>console.log(err))
}

function showOrderOnScreen(order){
    
    let orderELement = `<li id='${order._id}'>${order.price}-${order.dish}-table ${order.tableNumber}
    <button onclick=deleteOrder('${order._id}') class="delete-buttons">Delete Order</button>
    </li>`
    let parDiv = document.getElementById(`table-${order.tableNumber}-list`)
    parDiv.innerHTML = parDiv.innerHTML + orderELement
}

function deleteOrder(_id){
    axios.delete(`https://crudcrud.com/api/803d51670cab44e3ad7bd4598a118ca4/Orders/${_id}`)
        .then(()=>{
            let orderToDelete = document.getElementById(`${_id}`)
            let par = orderToDelete.parentElement
            par.removeChild(orderToDelete)
        })
        .catch((err)=>console.log(err))
}
