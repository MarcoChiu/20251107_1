
//基本參數
const baseUrl = 'https://livejs-api.hexschool.io/api/livejs/v1';
const apiPath = 'marcochiu';
const token = 'bAP1DqdP8HaOrx9SpP0R4a1Dbo03';
const headers = { headers: { "Authorization": token } };

//連結
const productsUrl = `${baseUrl}/customer/${apiPath}/products`; //產品
const cartsUrl = `${baseUrl}/customer/${apiPath}/carts`; //購物車
const customerOrdersUrl = `${baseUrl}/customer/${apiPath}/orders`;  //前台post訂單
const adminOrdersUrl = `${baseUrl}/admin/${apiPath}/orders`;//管理員訂單

let productsData = [];
let cartsData = [];
let ordersData = [];


////////////////GET//////////////
const getTemp = [
    { url: productsUrl, headers: null }, //取得所有產品
    { url: cartsUrl, headers: null }, //取得目前購物車產品
    { url: adminOrdersUrl, headers: headers } //取得後台訂單
];

//取得資料
getApi(getTemp)
    .then(function (response) {
        console.log(response[0].data);
        console.log(response[1].data);
        console.log(response[2].data);
    });

/////////////POST//////////////
const postTemp1 = [
    { "data": { "productId": "6PkWdMDBB5lxUoa2zAE2", "quantity": 1 } },
    { "data": { "productId": "QrjXKCshVckgKrGTqkzq", "quantity": 3 } },
    { "data": { "productId": "YZAQwt3Q6rXGjxUsPcFY", "quantity": 5 } },
    { "data": { "productId": "d7X2DL5cRF5MsHLmpNOE", "quantity": 7 } },
    { "data": { "productId": "dYFboZBUKqFW1ZnIoYQ9", "quantity": 9 } },
    { "data": { "productId": "j79UktehKjADpHYfKUuG", "quantity": 11 } },
    { "data": { "productId": "nYFWTx5coNXRoQz5mIio", "quantity": 13 } },
    { "data": { "productId": "tg0o2s4KtJ2i4fqxioWM", "quantity": 15 } }
];
// 新增產品至購物車
// postApi(postTemp1.map(x => { return { url: cartsUrl, headers: null, obj: x }; }))
//     .then((response) => {
//         console.log(response);
//     });

const postTemp2 = {
    "data": {
        "user": {
            "name": "333",
            "tel": "0912456789",
            "email": "hexschoolxx@hexschool.com",
            "address": "台北六角學院路",
            "payment": "Line Pay 333"
        }
    }
}
// 新增購物車轉訂單
// postApi([{ url: customerOrdersUrl, headers: null, obj: postTemp2 }])
//     .then((response) => {
//         console.log(response);
//     });

///////////////Patch////////////// 
const patchTemp = [
    { "data": { "id": "29j5i8TRAChKpKJkUttc", "quantity": 99 } },
    { "data": { "id": "6cvUvCLTL50p6iXteulY", "quantity": 88 } }
];

//修改購物車數量
// patchApi(patchTemp.map(x => { return { url: cartsUrl, headers: null, obj: x }; }))
//     .then((response) => {
//         console.log(response);
//     }); 

///////////////Put//////////////

const putTemp = [
    { "data": { "id": "JFA6APxYnwRPkgzUaBej", "paid": false } },
    { "data": { "id": "QxO0iyXCcBjVKZNvMQi1", "paid": false } }
];

//修改為已付款
// putApi(putTemp.map(x => { return { url: adminOrdersUrl, headers: headers, obj: x }; }))
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

///////////////Delete//////////////
const deleteTemp = [
    { url: cartsUrl + '/6aTiJhOkGb0dVtMflQHA', headers: null } ,//刪除購物車單一品項
    { url: cartsUrl, headers: null },//刪除購物車全部
    { url: adminOrdersUrl + '/dyztW76FTnFli0MM3a1G', headers: headers } ,//刪除訂單單一訂單
    { url: adminOrdersUrl  , headers: headers } //刪除全部訂單
];

//刪除購物車或訂單資料
// deleteApi(deleteTemp)
//     .then((response) => {
//         console.log(response);
//     });


 
 