let pid = document.getElementById('pid').innerHTML;
let cart = document.getElementById('cartId').innerHTML;

// Swal.fire({
//     background: 'rgb(20,20,20)',
//     color: 'rgb(180, 180, 180)',
//     title: 'Enter your cart ID',
//     input: 'text',
//     inputValidator: (value) => {
//         return !value && 'You need to enter the cart';
//     },
//     allowOutsideClick: false
// }).then(result => {
//     cart = result.value;
// });

const addToCart = async () => {
    let quantity = document.getElementById("quantity").value;
    quantity = parseInt(quantity);
    if (quantity > 0) {
        let result = await fetch(`https://coderhouse-backend-production-7e93.up.railway.app/api/carts/${cart}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([{
                _id: pid,
                quantity: quantity,
            }])
        }).then(res => res.json()).then(json => {
            console.log(json);
            if (json.status == "Ok") {
                Swal.fire({
                    background: 'rgb(20,20,20)',
                    color: 'rgb(180, 180, 180)',
                    title: 'Product added',
                    icon: 'success'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    background: 'rgb(20,20,20)',
                    color: 'rgb(180, 180, 180)',
                    title: json.message,
                    showCloseButton: true
                })
            }
        })
    } else {
        Swal.fire({
            icon: 'error',
            background: 'rgb(20,20,20)',
            color: 'rgb(180, 180, 180)',
            title: 'You need to enter a quantity',
            showCloseButton: true
        })
    }
}
