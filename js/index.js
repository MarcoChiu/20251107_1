//共用
const productsUrl = `${baseUrl}/customer/${apiPath}/products`; //產品
const cartsUrl = `${baseUrl}/customer/${apiPath}/carts`; //購物車
const OrdersUrl = `${baseUrl}/customer/${apiPath}/orders`;  //前台post訂單

//陣列
//let productslist = [];

//物件
const loading = document.querySelector('.loading-mask');
//reder用
//products
const productSelect = document.querySelector('.productSelect');
const productWrap = document.querySelector('.productWrap');
//carts
const shoppingCart = document.querySelector('.shoppingCart');
const cartsBody = document.querySelector('.shoppingCart-table tbody');
const cartsFooter = document.querySelector('.shoppingCart-table tfoot');
//order
const orderInfo = document.querySelector('#orderInfo');

//render
const rederProducts = (data) => {
    let html = '';
    data.products.forEach(x => html += `
         <li class="productCard">
                    <h4 class="productType">${x.category}</h4>
                    <img src="${x.images}" alt="${x.description}">
                    <a href="javascript:void(0);" data-id='${x.id}' class="addCardBtn">加入購物車</a>
                    <h3>${x.title}</h3>
                    <del class="originPrice">NT$${formatNumber(x.origin_price)}</del>
                    <p class="nowPrice">NT$${formatNumber(x.price)}</p>
                </li>
        `);
    productWrap.innerHTML = html.length > 0 ? html : '<li class="productCard">查無產品資料!!</li>';
}

const redercarts = (data) => {
    if (data.carts.length == 0) {
        shoppingCart.classList.add('d-none');
        orderInfo.classList.add('d-none');
        return;
    }

    shoppingCart.classList.remove('d-none');
    orderInfo.classList.remove('d-none');

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
        <td>${formatNumber(x.quantity)}</td>
        <td>NT$${formatNumber(x.product.price)}</td>
        <td class="discardBtn" data-id='${x.id}'  data-product-title='${x.product.title}'>
            <a href="javascript:void(0);" class="material-icons">
                clear
            </a>
        </td>
    </tr>
        `);
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

//function
const init = async () => {
    loading.classList.toggle('d-none');
    try {
        const response = await getApi([{ url: productsUrl }, { url: cartsUrl }]);
        rederProducts(response[0].data);
        redercarts(response[1].data);
    } catch (error) {
        axiosError(error);
    } finally {
        loading.classList.toggle('d-none');
    }
}

const productSelectChange = async (val) => {
    loading.classList.toggle('d-none');
    try {
        const response = await getApi([{ url: productsUrl }]);
        (val != "") && (response[0].data.products = response[0].data.products.filter(x => x.category === val));
        rederProducts(response[0].data);
    } catch (error) {
        axiosError(error);
    } finally {
        loading.classList.toggle('d-none');
    }
}

const deleteCartsConfirm = (id = "", productTitle = "") => {
    const title = (id != "") ? `請問確定刪除${productTitle}?` : "請問確定刪除所有品項?";
    Swal.fire({
        title: title,
        showCancelButton: true,
        confirmButtonText: "刪除",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteCarts(id);
        }
    });
}

const deleteCarts = async (id = "") => {
    loading.classList.toggle('d-none');
    try {
        const response = await deleteApi([{ url: (id != "") ? cartsUrl + `/${id}` : cartsUrl }]);
        redercarts(response[0].data);
        Swal.fire("已刪除!!", "", "success");
    } catch (error) {
        axiosError(error);
    } finally {
        loading.classList.toggle('d-none');
    }
}

const addCarts = async (id, qty) => {
    loading.classList.toggle('d-none');
    try {
        let response = await getApi([{ url: cartsUrl }]);
        const q = response[0].data.carts.find(x => x.product.id === id);
        if (q == null) {
            response = await postApi([{ url: cartsUrl, obj: { "data": { "productId": id, "quantity": qty } } }]);

        } else {
            response = await patchApi([{ url: cartsUrl, obj: { "data": { "id": q.id, "quantity": q.quantity + qty } } }]);
        }
        redercarts(response[0].data);
    } catch (error) {
        axiosError(error);
    } finally {
        loading.classList.toggle('d-none');
    }
}

//addEventListener
productSelect.addEventListener('change', (e) => {
    productSelectChange(e.target.value);
});

document.addEventListener("click", (e) => {
    const discardBtn = e.target.closest(".discardBtn");
    const discardAllBtn = e.target.closest(".discardAllBtn");
    const addCardBtn = e.target.closest(".addCardBtn");

    discardBtn && deleteCartsConfirm(discardBtn.dataset.id, discardBtn.dataset.productTitle);
    discardAllBtn && deleteCartsConfirm();

    addCardBtn && addCarts(addCardBtn.dataset.id, 1);

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
