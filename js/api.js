const baseUrl ='https://livejs-api.hexschool.io/api/livejs/v1/';
const apiPath = 'marcochiu';
const token = 'bAP1DqdP8HaOrx9SpP0R4a1Dbo03';
let productsData = [];
let cartsData = [];
let ordersData = [];

//##############共用##############
function axiosError(error) {
    //AI
    // Handle the error
    if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response) {
            //console.log(error);
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.error('Message:', error.message);
            // console.error('Response Error:', error.response.data);
            // console.error('Status Code:', error.response.status);
            // console.error('Headers:', error.response.headers);
            alert(`Status Code:${error.response.status} , Message:${error.response.data.message} `);
        } else if (error.request) {
            // The request was made but no response was received
            alert('Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('Error Message:', error.message);
        }
    } else {
        // Generic JavaScript error handling
        alert('Non-Axios Error:', error);
    }
}

//##############Customer Products##############
//查產品
async function getCustomerProducts() {

    axios.get(`${baseUrl}customer/${apiPath}/products`)
        .then(function (response) {
            productsData = response.data.products;
            console.log(productsData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//##############Customer Carts##############
//查購物車
async function getCustomerCarts() {
    await axios.get(`${baseUrl}customer/${apiPath}/carts`)
        .then(function (response) {
            //console.log(response);
            cartsData = response.data.carts;
            console.log(cartsData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//新增或修改購物車數量
async function postCustomerCarts() {
    //喬丹6尺雙人加大床頭片 6PkWdMDBB5lxUoa2zAE2
    //安東尼可調高度床邊桌  QrjXKCshVckgKrGTqkzq
    //Antony 雙人床架／雙人加大 YZAQwt3Q6rXGjxUsPcFY
    //Charles 系列儲物組合 d7X2DL5cRF5MsHLmpNOE
    //Louvre 單人床架 dYFboZBUKqFW1ZnIoYQ9
    //Louvre 雙人床架／雙人加大 j79UktehKjADpHYfKUuG
    //Antony 遮光窗簾 nYFWTx5coNXRoQz5mIio
    //Charles 雙人床架 tg0o2s4KtJ2i4fqxioWM

    //測試用
    // const tempData = [
    //     { "data": { "productId": "6PkWdMDBB5lxUoa2zAE2", "quantity": 1 } },
    //     { "data": { "productId": "QrjXKCshVckgKrGTqkzq", "quantity": 3 } },
    //     { "data": { "productId": "YZAQwt3Q6rXGjxUsPcFY", "quantity": 5 } },
    //     { "data": { "productId": "d7X2DL5cRF5MsHLmpNOE", "quantity": 7 } },
    //     { "data": { "productId": "dYFboZBUKqFW1ZnIoYQ9", "quantity": 9 } },
    //     { "data": { "productId": "j79UktehKjADpHYfKUuG", "quantity": 11 } },
    //     { "data": { "productId": "nYFWTx5coNXRoQz5mIio", "quantity": 13 } },
    //     { "data": { "productId": "tg0o2s4KtJ2i4fqxioWM", "quantity": 15 } }
    // ];
    // tempData.forEach(function (obj) {
    //     axios.post(`${baseUrl}customer/${apiPath}/carts`, obj)
    //         .then(function (response) {
    //             //console.log(response);
    //             cartsData = response.data.carts;
    //             console.log(cartsData);
    //         })
    //         .catch(function (error) {
    //             axiosError(error);
    //         });
    // });


    const obj = {
        "data": {
            "productId": "6PkWdMDBB5lxUoa2zAE2",//產品ID
            "quantity": 120 //數量
        }
    }

    await axios.post(`${baseUrl}customer/${apiPath}/carts`, obj)
        .then(function (response) {
            //console.log(response);
            cartsData = response.data.carts;
            console.log(cartsData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//修改購物車數量
async function patchCustomerCarts() {

    const obj = {
        "data": {
            "id": "ywO6lTug8u4Llnt81pyk", //購物車ID
            "quantity": 123
        }
    }
    await axios.patch(`${baseUrl}customer/${apiPath}/carts/`, obj)
        .then(function (response) {
            //console.log(response);
            cartsData = response.data.carts;
            console.log(cartsData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除單一品項
async function deleteCustomerCarts(id) {
    //id : 購物車id
    await axios.delete(`${baseUrl}customer/${apiPath}/carts/${id}`)
        .then(function (response) {
            //console.log(response);
            cartsData = response.data.carts;
            console.log(cartsData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除全部購物車
async function deleteCustomerCarts() {
    //id : 購物車id
    await axios.delete(`${baseUrl}customer/${apiPath}/carts/`)
        .then(function (response) {
            //console.log(response);
            cartsData = response.data.carts;
            console.log(cartsData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//##############Customer Orders##############
//新增購物車至訂單
async function postCustomerOrder() {

    const obj = {
        "data": {
            "user": {
                "name": "7角學院",
                "tel": "0912456789",
                "email": "hexschoolxx@hexschool.com",
                "address": "台北六角學院路",
                "payment": "Line Pay"
            }
        }
    }

    await axios.post(`${baseUrl}customer/${apiPath}/orders`, obj)
        .then(function (response) {
            //console.log(response);
            //ordersData = response.data.orders;
            console.log(response.data);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//##############Admin Orders##############
//查訂單
async function getAdminOrders() {
    await axios.get(`${baseUrl}admin/${apiPath}/orders`,
        {
            headers: {
                'Authorization': token
            }
        })
        .then(function (response) {
            //console.log(response);
            ordersData = response.data.orders;
            console.log(ordersData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//修改為已付款
async function putAdminOrders(id) {
    const obj = {
        "data": {
            "id": id, //訂單編號
            "paid": true
        }
    }
    await axios.put(`${baseUrl}admin/${apiPath}/orders/`, obj,
        {
            headers: {
                'Authorization': token
            }
        })
        .then(function (response) {
            //console.log(response);
            ordersData = response.data.orders;
            console.log(ordersData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除單訂單
async function deleteAdminOrders(id) {
    //id : 購物車id
    await axios.delete(`${baseUrl}admin/${apiPath}/orders/${id}`,
        {
            headers: {
                'Authorization': token
            }
        })
        .then(function (response) {
            //console.log(response);
            ordersData = response.data.orders;
            console.log(ordersData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除全部訂單
async function deleteAdminOrders() {
    //id : 購物車id
    await axios.delete(`${baseUrl}admin/${apiPath}/orders/`,
        {
            headers: {
                'Authorization': token
            }
        })
        .then(function (response) {
            //console.log(response);
            ordersData = response.data.orders;
            console.log(ordersData);
        })
        .catch(function (error) {
            axiosError(error);
        });
}


