 //共用
const productsUrl = `${baseUrl}/customer/${apiPath}/products`; //產品
const cartsUrl = `${baseUrl}/customer/${apiPath}/carts`; //購物車
const OrdersUrl = `${baseUrl}/customer/${apiPath}/orders`;  //前台post訂單

//dom
const loading = document.querySelector('.loading-mask'); 
//products
const productSelect = document.querySelector('.productSelect');
const productWrap = document.querySelector('.productWrap');
//carts
const shoppingCart = document.querySelector('.shoppingCart');
const cartsBody = document.querySelector('.shoppingCart-table tbody');
const cartsFooter = document.querySelector('.shoppingCart-table tfoot');
//order
const orderInfo = document.querySelector('#orderInfo');
//form
const form = document.querySelector('form');
const fields = ['customerName', 'customerPhone', 'customerEmail', 'customerAddress', 'tradeWay'];

//render(主要渲染及產生畫面)
const rederProducts = (data) => {
    let html = '';
    data.products.forEach(x => html += `
         <li class="productCard">
                    <h4 class="productType">${x.category}</h4>
                    <img src="${x.images}" alt="${x.description}">
                    <a href="javascript:void(0);" data-id='${x.id}'  class="addCardBtn">加入購物車</a>
                    <h3>${x.title}</h3>
                    <del class="originPrice">NT$${formatNumber(x.origin_price)}</del>
                    <p class="nowPrice">NT$${formatNumber(x.price)}</p>
                </li>
        `);
    productWrap.innerHTML = html.length > 0 ? html : '<li class="productCard">查無產品資料!!</li>';
}

const redercarts = (data) => {
    //個人
    // if (data.carts.length === 0) {
    //     [shoppingCart, orderInfo].forEach(el => el.classList.add('d-none'));
    //     return;
    // } else {
    //     [shoppingCart, orderInfo].forEach(el => el.classList.remove('d-none'));
    // }

    //AI 優化
    [shoppingCart, orderInfo].forEach(el => el.classList.toggle('d-none', data.carts.length === 0));

    let html = '';
    data.carts.forEach(x => html += `
    <tr>
        <td>
            <div class="cardItem-title">
                <img src="${x.product.images}" alt="${x.product.description}">
                <p>${x.product.title}</p>
            </div>
        </td>
        <td>NT$${formatNumber(x.product.origin_price)}</td>
        <td>
            <button type="button" class="plusBtn" data-id='${x.product.id}'>+</button> 
             ${formatNumber(x.quantity)}  
            <button type="button" class="minusBtn" data-id='${x.product.id}'  data-product-title='${x.product.title}'>-</button> 
        </td>
        <td>NT$${formatNumber(x.product.price)}</td>
        <td class="discardBtn" data-id='${x.id}'  data-product-title='${x.product.title}'>
            <a href="javascript:void(0);" class="material-icons">
                clear
            </a>
        </td>
    </tr>
        `);

    //後來修改購物車無資料不顯示
    cartsBody.innerHTML = html.length > 0 ? html : '<tr><td colspan="4">購物車中尚無資料!!</td></tr>';
    cartsFooter.innerHTML = `
<tr>
    <td>
        ${data.carts.length > 0 ? `<a href="javascript:void(0);" class="discardAllBtn">刪除所有品項</a>` : ''}
    </td>
    <td></td>
    <td></td>
    <td>
        ${data.carts.length > 0 ? `<p>總金額</p>` : ''}        
    </td>
    <td>
        ${data.carts.length > 0 ? `NT$${formatNumber(data.finalTotal)}` : ''}    
    </td>
</tr>`;
}

//function(資料傳遞、資料篩選、傳給渲染、Loading、sweetalert2、不抓取dom元素)
const init = async () => {
    Loading.show();
    try {
        const response = await getApi([{ url: productsUrl }, { url: cartsUrl }]);
        rederProducts(response[0].data);
        redercarts(response[1].data);
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

const productSelectChange = async (val) => {
    Loading.show();
    try {
        const response = await getApi([{ url: productsUrl }]);
        (val != "") && (response[0].data.products = response[0].data.products.filter(x => x.category === val));
        rederProducts(response[0].data);
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

const deleteCartsConfirm = (id = "", title = "") => {
    const swalTitle = (id != "") ? `請問確定刪除${title}?` : "請問確定刪除所有品項?";
    Swal.fire({
        title: swalTitle,
        showCancelButton: true,
        confirmButtonText: "刪除",
        confirmButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteCarts(id);
        }
    });
}

const deleteCarts = async (id = "") => {
    Loading.show();
    try {
        const response = await deleteApi([{ url: (id != "") ? cartsUrl + `/${id}` : cartsUrl }]);
        redercarts(response[0].data);
        Swal.fire("已刪除!!", "", "success");
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

const addCarts = async (id, qty, move = false, title = "") => {
    Loading.show();
    try {
        let response = await getApi([{ url: cartsUrl }]);
        const q = response[0].data.carts.find(x => x.product.id === id);

        //減去最後一個時
        if (q != null && q.quantity + qty <= 0) {
            deleteCartsConfirm(q.id, title);
            return;
        }

        //個人
        // if (q == null) {
        //     response = await postApi([{ url: cartsUrl, obj: { "data": { "productId": id, "quantity": qty } } }]);
        // } else {
        //     response = await patchApi([{ url: cartsUrl, obj: { "data": { "id": q.id, "quantity": q.quantity + qty } } }]);
        // }
        //AI優化 判斷方法  判斷物件
        response = await (q == null ? postApi : patchApi)
            ([{
                url: cartsUrl,
                obj: {
                    data: q == null ? { productId: id, quantity: qty } : { id: q.id, quantity: q.quantity + qty }
                }
            }]);

        redercarts(response[0].data);
        move && scrollToId('.shoppingCart');
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

const postCarts = async (user) => {
    Loading.show();
    try {
        let response = await postApi([{ url: OrdersUrl, headers: null, obj: { "data": { "user": user } } }]);
        const orderId = response[0].data.id;
        Swal.fire("購買成功!!", `訂單編號:<b>${orderId}<b>`, "success");
        response = await getApi([{ url: cartsUrl }]); //這邊也可以改成給一個空的response但也許有多個網頁同時買所以還是抓了一次
        redercarts(response[0].data);
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

//addEventListener(監聽、判斷驗證、抓取dom元素) 
productSelect.addEventListener('change', (e) => {
    productSelectChange(e.target.value);
});

document.addEventListener("click", (e) => {
    const discardBtn = e.target.closest(".discardBtn");
    const discardAllBtn = e.target.closest(".discardAllBtn");
    const addCardBtn = e.target.closest(".addCardBtn");
    const plusBtn = e.target.closest(".plusBtn");
    const minusBtn = e.target.closest(".minusBtn");

    discardBtn && deleteCartsConfirm(discardBtn.dataset.id, discardBtn.dataset.productTitle);
    discardAllBtn && deleteCartsConfirm();
    addCardBtn && addCarts(addCardBtn.dataset.id, 1, true);
    plusBtn && addCarts(plusBtn.dataset.id, 1);
    minusBtn && addCarts(minusBtn.dataset.id, -1, false, minusBtn.dataset.productTitle);
});

form.addEventListener('submit', function (e) {
    e.preventDefault(); // 先阻止表單送出
    let allPass = true;
    fields.forEach(id => {
        const valid = validateForm(document.querySelector(`#${id}`));
        if (!valid) allPass = false;
    });
    if (!allPass) return;
    let user = {};
    fields.forEach(id => {
        const input = document.querySelector(`#${id}`);
        switch (id) {
            case "customerName":
                user["name"] = input.value;
                break;
            case "customerPhone":
                user["tel"] = input.value;
                break;
            case "customerEmail":
                user["email"] = input.value;
                break;
            case "customerAddress":
                user["address"] = input.value;
                break;
            case "tradeWay":
                user["payment"] = input.value;
                break;
        }
    });
    postCarts(user);
});

fields.forEach(id => {
    //監聽多個欄位，如有更好請再提供
    const input = document.querySelector(`#${id}`);
    input.addEventListener('blur', () => validateForm(input));
});

init();

//#####################################################################################
// 預設 JS，請同學不要修改此處  
document.addEventListener('DOMContentLoaded', function () {
    const ele = document.querySelector('.recommendation-wall');
    ele.style.cursor = 'grab';
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };
    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
});
// menu 切換
let menuOpenBtn = document.querySelector('.menuToggle');
let linkBtn = document.querySelectorAll('.topBar-menu a');
let menu = document.querySelector('.topBar-menu');
menuOpenBtn.addEventListener('click', menuToggle);

linkBtn.forEach((item) => {
    item.addEventListener('click', closeMenu);
})

function menuToggle() {
    if (menu.classList.contains('openMenu')) {
        menu.classList.remove('openMenu');
    } else {
        menu.classList.add('openMenu');
    }
}
function closeMenu() {
    menu.classList.remove('openMenu');
}
