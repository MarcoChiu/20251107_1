////////////////GET//////////////
// const getTemp = [
//     { url: productsUrl, headers: null }, //取得所有產品
//     { url: cartsUrl, headers: null }, //取得目前購物車產品
//     { url: adminUrl, headers: headers } //取得後台訂單
// ];

//取得資料
// getApi(getTemp)
//     .then(function (response) {
//         console.log(response[0].data);
//         console.log(response[1].data);
//         console.log(response[2].data);
//     });

/////////////POST//////////////
//新增產品至購物車
// const postTemp1 = [
//     { "data": { "productId": "6PkWdMDBB5lxUoa2zAE2", "quantity": 1 } },
//     { "data": { "productId": "QrjXKCshVckgKrGTqkzq", "quantity": 3 } },
//     { "data": { "productId": "YZAQwt3Q6rXGjxUsPcFY", "quantity": 5 } },
//     { "data": { "productId": "d7X2DL5cRF5MsHLmpNOE", "quantity": 7 } },
//     { "data": { "productId": "dYFboZBUKqFW1ZnIoYQ9", "quantity": 9 } },
//     { "data": { "productId": "j79UktehKjADpHYfKUuG", "quantity": 11 } },
//     { "data": { "productId": "nYFWTx5coNXRoQz5mIio", "quantity": 13 } },
//     { "data": { "productId": "tg0o2s4KtJ2i4fqxioWM", "quantity": 15 } }
// ];

// postApi(postTemp1.map(x => { return { url: cartsUrl, headers: null, obj: x }; }))
//     .then((response) => {
//         console.log(response);
//     });

// 新增購物車轉訂單
// const postTemp2 = {
//     "data": {
//         "user": {
//             "name": "333",
//             "tel": "0912456789",
//             "email": "hexschoolxx@hexschool.com",
//             "address": "台北六角學院路",
//             "payment": "Line Pay 333"
//         }
//     }
// }

// postApi([{ url: OrdersUrl, headers: null, obj: postTemp2 }])
//     .then((response) => {
//         console.log(response);
//     });

///////////////Patch//////////////
//修改購物車數量
// const patchTemp = [
//     { "data": { "id": "29j5i8TRAChKpKJkUttc", "quantity": 99 } },
//     { "data": { "id": "6cvUvCLTL50p6iXteulY", "quantity": 88 } }
// ];

// patchApi(patchTemp.map(x => { return { url: cartsUrl, headers: null, obj: x }; }))
//     .then((response) => {
//         console.log(response);
//     });

///////////////Put//////////////
//修改為已付款
// const putTemp = [
//     { "data": { "id": "JFA6APxYnwRPkgzUaBej", "paid": false } },
//     { "data": { "id": "QxO0iyXCcBjVKZNvMQi1", "paid": false } }
// ];

// putApi(putTemp.map(x => { return { url: adminUrl, headers: headers, obj: x }; }))
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

///////////////Delete//////////////
//刪除購物車或訂單資料
// const deleteTemp = [
//     { url: cartsUrl + '/6aTiJhOkGb0dVtMflQHA', headers: null } ,//刪除購物車單一品項
//     { url: cartsUrl, headers: null },//刪除購物車全部
//     { url: adminUrl + '/dyztW76FTnFli0MM3a1G', headers: headers } ,//刪除訂單單一訂單
//     { url: adminUrl  , headers: headers } //刪除全部訂單
// ];


// deleteApi(deleteTemp)
//     .then((response) => {
//         console.log(response);
//     });



