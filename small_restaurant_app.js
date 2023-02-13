window.addEventListener("DOMContentLoaded",()=>{

    try{
        axios.get('https://crudcrud.com/api/a3bf909391fe40829451019aed2470cb/Orders')
        .then((res)=>{
            for(let i=0; i<res.data.length; i++){
                showOrderOnScreen(res.data[i])
            }
        })
    }
    catch(err){
        console.log(err)
    }
    
})

async function submitOrder(e){
    
    try{
        const price = document.getElementById('price').value
        const dish = document.getElementById('dish').value
        const tableNumber = document.getElementById('table-number').value

        console.log(price, dish, tableNumber)

        let obj={
            price:price,
            dish:dish,
            tableNumber:tableNumber
        };

        console.log(obj)

        await axios.post('https://crudcrud.com/api/a3bf909391fe40829451019aed2470cb/Orders', obj)
            .then((res)=>{
                showOrderOnScreen(res.data)
                document.getElementById('price').value = ''
                document.getElementById('dish').value = ''
                document.getElementById('table-number').value = '1'
            })
    }

    catch(err){
        console.log(err)
    }
}

async function showOrderOnScreen(order){
    
    try{
        let orderELement = `<li id='${order._id}'>${order.price}-${order.dish}-table ${order.tableNumber}
        <button onclick=deleteOrder('${order._id}') class="delete-buttons">Delete Order</button>
        </li>`
        let parDiv = document.getElementById(`table-${order.tableNumber}-list`)
        console.log('table number in obj is '+ order.tableNumber)
        console.log('parDiv=', parDiv)
        parDiv.innerHTML = parDiv.innerHTML + orderELement
    }
    catch(err){
        console.log(err)
    }
}

async function deleteOrder(_id){
    try{
        await axios.delete(`https://crudcrud.com/api/a3bf909391fe40829451019aed2470cb/Orders/${_id}`)
        .then(()=>{
            let orderToDelete = document.getElementById(`${_id}`)
            let par = orderToDelete.parentElement
            par.removeChild(orderToDelete)
        })
    }


        catch(err){
            console.log(err)
        }
}
