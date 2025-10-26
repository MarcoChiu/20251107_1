//共用
const productsUrl = `${baseUrl}/customer/${apiPath}/products`; //產品
const cartsUrl = `${baseUrl}/customer/${apiPath}/carts`; //購物車
const OrdersUrl = `${baseUrl}/customer/${apiPath}/orders`;  //前台post訂單

//陣列
//let productslist = [];

//物件
const productWrap = document.querySelector('.productWrap');
const cartBody = document.querySelector('.shoppingCart-table tbody');

//function
const rederProducts = (data) => {
    //console.log(data);
    let html = '';
    data.forEach(x => html += `
         <li class="productCard">
                    <h4 class="productType">${x.category}</h4>
                    <img src="${x.images}" alt="${x.description}">
                    <a href="javascript:void(0)" data-id='${x.id}' class="addCardBtn">加入購物車</a>
                    <h3>${x.title}</h3>
                    <del class="originPrice">NT$${x.origin_price}</del>
                    <p class="nowPrice">NT$${x.price}</p>
                </li>
        `);
    productWrap.innerHTML = html.length > 0 ? html : '<li class="productCard">查無產品資料!!</li>';
}

const rederProduct = (data) => {
    //console.log(data);
    let html = '';
    data.forEach(x => html += `
    <tr>
        <td>
            <div class="cardItem-title">
                <img src="" alt="">
                <p></p>
            </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td class="discardBtn">
            <a href="#" class="material-icons">
                clear
            </a>
        </td>
    </tr>
        `);
    cartBody.innerHTML = html.length > 0 ? html : '<tr><td colspan="4">購物車中尚無資料!!</td></tr>';
}

const init = async () => {
    try {
        const response = await getApi([{ url: productsUrl }, { url: cartsUrl }]);
        rederProducts(response[0].data.products);
        rederProduct(response[1].data.carts);
    } catch (error) {
        axiosError(error);
    }
}

//action

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
