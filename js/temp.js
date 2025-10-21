// GET用法
// getData([{ url: productsUrl, headers: null }, { url: cartsUrl, headers: null }, { url: adminOrdersUrl, headers: config }])
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// POST用法 1
// 新增產品至購物車
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
// postData(tempData.map(x => { return { url: cartsUrl, headers: null, obj: x }; }))
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// POST用法 2
// 新增購物車轉訂單
// const objtest = {
//     "data": {
//         "user": {
//             "name": "7角學院",
//             "tel": "0912456789",
//             "email": "hexschoolxx@hexschool.com",
//             "address": "台北六角學院路",
//             "payment": "Line Pay 2"
//         }
//     }
// }
// postData([{ url: customerOrdersUrl, headers: null, obj: objtest }])
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });




//############################舊的############################
//查產品
// const getCustomerProducts = async() => {
//    await axios.get(`${baseUrl}/customer/${apiPath}/products`);
//         // .then(function (response) {
//         //     return response.data.products;
//         // })
//         // .catch(function (error) {
//         //     axiosError(error);
//         // });
// }
// async function getCustomerProducts() {
//     try {
//         return await axios.get(`${baseUrl}/customer/${apiPath}/products`);
//     } catch (error) {
//         axiosError(error);
//     }
// }

//查購物車
// async function getCustomerCarts() {
//     await axios.get(`${baseUrl}/customer/${apiPath}/carts`)
//         .then(function (response) {
//             cartsData = response.data.carts;
//         })
//         .catch(function (error) {
//             axiosError(error);
//         });
// }

//查訂單
// async function getAdminOrders() {
//     await axios.get(`${baseUrl}/admin/${apiPath}/orders`, config)
//         .then(function (response) {
//             ordersData = response.data.orders;
//         })
//         .catch(function (error) {
//             axiosError(error);
//         });
// }

//新增購物車數量
//async function postCustomerCarts() {
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
//     axios.post(`${baseUrl}/customer/${apiPath}/carts`, obj)
//         .then(function (response) {
//             //console.log(response);
//             cartsData = response.data.carts;
//             console.log(cartsData);
//         })
//         .catch(function (error) {
//             axiosError(error);
//         });
// });


//     const obj = {
//         "data": {
//             "productId": "6PkWdMDBB5lxUoa2zAE2",//產品ID
//             "quantity": 120 //數量
//         }
//     }

//     await axios.post(`${baseUrl}/customer/${apiPath}/carts`, obj)
//         .then(function (response) {
//             cartsData = response.data.carts;
//         })
//         .catch(function (error) {
//             axiosError(error);
//         });
// }

//新增購物車至訂單
// async function postCustomerOrder() {

//     const obj = {
//         "data": {
//             "user": {
//                 "name": "7角學院",
//                 "tel": "0912456789",
//                 "email": "hexschoolxx@hexschool.com",
//                 "address": "台北六角學院路",
//                 "payment": "Line Pay"
//             }
//         }
//     }

//     await axios.post(`${baseUrl}/customer/${apiPath}/orders`, obj)
//         .then(function (response) {
//             ordersData = response.data.orders;
//         })
//         .catch(function (error) {
//             axiosError(error);
//         });
// }