
//基本參數
const baseUrl = 'https://livejs-api.hexschool.io/api/livejs/v1';
const apiPath = 'marcochiu';
const token = 'bAP1DqdP8HaOrx9SpP0R4a1Dbo03';
const config = { headers: { "Authorization": token } };

//連結
const productsUrl = `${baseUrl}/customer/${apiPath}/products`; //產品
const cartsUrl = `${baseUrl}/customer/${apiPath}/carts`; //購物車
const customerOrdersUrl = `${baseUrl}/customer/${apiPath}/orders`;  //前台post訂單
const adminOrdersUrl = `${baseUrl}/admin/${apiPath}/orders`;//管理員訂單

let productsData = [];
let cartsData = [];
let ordersData = [];

//##############共用##############
function axiosError(error) {
    let errorMessage = '';
    if (axios.isAxiosError(error)) {
        if (error.response) {
            errorMessage = `${error.response.data.message} `;
        } else if (error.request) {
            errorMessage = `Request Error:', ${error.request}`;
        } else {
            errorMessage = 'Error';
        }
    } else {
        errorMessage = `${error}`;
    }

    if (errorMessage.length > 0) {
        Swal.fire({
            icon: "error",
            title: "錯誤...",
            text: errorMessage,
            //footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}

////////////////GET//////////////
//https://israynotarray.com/javascript/20220514/1988711685/
const getData = async (array) => {
    try {
        const response = await Promise.all(array.map(x => axios.get(x.url, x.headers)));
        return response;
    } catch (error) {
        axiosError(error);
    }
}

///////////////POST//////////////
const postData = async (array) => {
    try {
        console.log(array);
        const response = await Promise.all(array.map(x => axios.post(x.url, x.obj, x.headers)));
        return response;
    } catch (error) {
        axiosError(error);
    }
}


//修改購物車數量
async function patchCustomerCarts() {

    const obj = {
        "data": {
            "id": "ywO6lTug8u4Llnt81pyk", //購物車ID
            "quantity": 123
        }
    }
    await axios.patch(`${baseUrl}/customer/${apiPath}/carts/`, obj)
        .then(function (response) {
            cartsData = response.data.carts;
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除單一品項
async function deleteCustomerCarts(id) {
    //id : 購物車id
    await axios.delete(`${baseUrl}/customer/${apiPath}/carts/${id}`)
        .then(function (response) {
            cartsData = response.data.carts;
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除全部購物車
async function deleteCustomerCarts() {
    //id : 購物車id
    await axios.delete(`${baseUrl}/customer/${apiPath}/carts/`)
        .then(function (response) {
            cartsData = response.data.carts;
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//##############Customer Orders##############


//##############Admin Orders 以下可拆到另一個js##############


//修改為已付款
async function putAdminOrders(id) {
    const obj = {
        "data": {
            "id": id, //訂單編號
            "paid": true
        }
    }
    await axios.put(`${baseUrl}/admin/${apiPath}/orders/`, obj, config)
        .then(function (response) {
            ordersData = response.data.orders;
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除單訂單
async function deleteAdminOrders(id) {
    //id : 購物車id
    await axios.delete(`${baseUrl}/admin/${apiPath}/orders/${id}`, config)
        .then(function (response) {
            ordersData = response.data.orders;
        })
        .catch(function (error) {
            axiosError(error);
        });
}

//刪除全部訂單
async function deleteAdminOrders() {
    //id : 購物車id
    await axios.delete(`${baseUrl}/admin/${apiPath}/orders/`, config)
        .then(function (response) {
            ordersData = response.data.orders;
        })
        .catch(function (error) {
            axiosError(error);
        });
}

