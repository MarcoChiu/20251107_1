
//共用
const token = 'bAP1DqdP8HaOrx9SpP0R4a1Dbo03';
const headers = { headers: { "Authorization": token } };
const adminUrl = `${baseUrl}/admin/${apiPath}/orders`;//管理員訂單

//dom
const orderBody = document.querySelector('.orderPage-table tbody');
const chartSelect = document.querySelector('.chartSelect');
const sectionTitle = document.querySelector('.section-title');
//data
const arrPaid = ['未處理', '已處理'];
const arrChart = ['全品項營收比重', '全品項營收前三名'];
//render(主要渲染及產生畫面)
const rederOrder = (data) => {

    let html = '';
    data.orders.forEach(x => {
        const pHtml = x.products.map((v, i) => `<p>${i + 1}.${v.title}(${v.quantity})</p>`).join('');
        const pPaid = arrPaid[Number(x.paid)];// x.paid ? "已處理" : "未處理";
        html += `
    <tr>
        <td>${x.id}</td>
        <td><p>${x.user.name}</p><p>${x.user.tel}</p></td>
        <td>${x.user.address}</td>
        <td>${x.user.email}</td>
        <td >${pHtml}</td>
        <td>${formatDateTime(x.createdAt)}</td>
        <td class="orderStatus" nowrap="nowrap"><a href="javascript:void(0);" data-id='${x.id}' data-paid=${pPaid} class='paidChange'>${pPaid}</a></td>
        <td >
        ${x.paid ? '' : `<input type="button" class="delSingleOrder-Btn" value="刪除"  data-id='${x.id}' data-title='${x.id}' />`}
        </td>
    </tr> 
    `});
    orderBody.innerHTML = html.length > 0 ? html : '<tr><td colspan="8">尚無訂單資料!!</td></tr>';
}

const renderChart = (val, data = null) => {

    //有重新讀資料時存檔 change時沒資料直接拿出來用
    data ? localStorage.setItem("chart", JSON.stringify(data)) : data = JSON.parse(localStorage.getItem("chart"));

    let result = [];
    let objCal = {};
    switch (arrChart.indexOf(val)) {
        default:
        case 0:
            //1.類別含三項，共有：床架、收納、窗簾 全產品類別營收比重 資料整理
            data.orders.forEach(x => {
                x.products.forEach(y => {
                    objCal[y.category] = (objCal[y.category] || 0) + y.price * y.quantity; //如果沒有為0有繼續累加
                });
            });

            Object.entries(objCal).forEach(([k, v]) => {
                result.push([k, v]);
            });

            //AI搞得超強
            //result = Object.entries(data.orders.flatMap(o => o.products).reduce((a, { category, price, quantity }) => (a[category] = (a[category] || 0) + price * quantity, a), {}));
            break;
        case 1:
            //2.全品項營收比重，類別含四項，篩選出前三名營收品項，其他 4~8 名都統整為「其它」
            let arr = [];
            data.orders.forEach(x => {
                x.products.forEach(y => {
                    const f = arr.find(item => item[0] === y.title);
                    f ? f[1] += y.price * y.quantity : arr.push([y.title, y.price * y.quantity]);//有相加，沒有新增一筆
                });
            });

            arr.sort((a, b) => {
                return b[1] - a[1];
            });

            result = arr.reduce((acc, item, index) => {
                if (index < 3) {
                    acc.push(item);           // 前三筆直接算進累加
                } else {
                    acc[3] = acc[3] || ["其他", 0]; //  第四筆其他  
                    acc[3][1] += item[1];     // 累加剩下的數字
                }
                return acc;
            }, []);            
            break;
    }    

    //標題
    sectionTitle.textContent = val;

    // C3.js
    const chart = c3.generate({
        bindto: '#chart', // HTML 元素綁定
        data: {
            type: "donut",
            columns:
                result
            // [
            //     ['Louvre 雙人床架', 1],
            //     ['Antony 雙人床架', 2],
            //     ['Anty 雙人床架', 3],
            //     ['其他', 4],
            // ]
            // ,
            // colors: {
            //     "Louvre 雙人床架": "#DACBFF",
            //     "Antony 雙人床架": "#9D7FEA",
            //     "Anty 雙人床架": "#5434A7",
            //     "其他": "#301E5F",
            // }
        },
        donut: {
            title: val
        },
    });
}

//function(資料傳遞、資料篩選、傳給渲染、Loading、sweetalert2)
const init = async () => {
    Loading.show();
    try {
        const response = await getApi([{ url: adminUrl, headers: headers }]);
        rederOrder(response[0].data);
        renderChart(chartSelect.value, response[0].data);
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

const initSelect = () => {
    arrChart.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        chartSelect.appendChild(option);
    });
}

const putPaid = async (id, paid) => {
    Loading.show();
    try {
        const response = await putApi([{ url: adminUrl, headers: headers, obj: { "data": { "id": id, "paid": paid } } }]);
        rederOrder(response[0].data);
        renderChart(chartSelect.value, response[0].data);
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

const deleteOrdersConfirm = (id = "", title = "") => {
    const swalText = (id != "") ? `請問確定刪除訂單編號${title}?刪除後將無法復原` : "請問確定刪除所有訂單?刪除後將無法復原";
    Swal.fire({
        title: "刪除訂單",
        text: swalText,
        showCancelButton: true,
        confirmButtonText: "刪除",
        confirmButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteOrders(id);
        }
    });
}

const deleteOrders = async (id = "") => {
    Loading.show();
    try {
        //刪除全部的話，正常來說有已處理就不能刪除
        const response = await deleteApi([{ url: (id != "") ? adminUrl + `/${id}` : adminUrl, headers: headers }]);
        rederOrder(response[0].data);
        renderChart(chartSelect.value, response[0].data);
        Swal.fire("已刪除!!", "", "success");
    } catch (error) {
        axiosError(error);
    } finally {
        Loading.hide();
    }
}

//addEventListener(監聽、判斷驗證、抓取dom元素) 
document.addEventListener("click", (e) => {
    const paidChange = e.target.closest(".paidChange");
    const delSingleOrderBtn = e.target.closest('.delSingleOrder-Btn');
    const discardAllBtn = e.target.closest('.discardAllBtn');

    paidChange && putPaid(paidChange.dataset.id, Boolean(1 - arrPaid.indexOf(paidChange.dataset.paid))); //arr 搜尋文字對應的index [false 0,true 1] > 將狀態0 1反轉後 > 轉成bool 
    delSingleOrderBtn && deleteOrdersConfirm(delSingleOrderBtn.dataset.id, delSingleOrderBtn.dataset.title);
    discardAllBtn && deleteOrdersConfirm();
});

chartSelect.addEventListener('change', (e) => {
    renderChart(chartSelect.value);
});


initSelect();

init();
 
//#####################################################################################
// 預設 JS，請同學不要修改此處
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