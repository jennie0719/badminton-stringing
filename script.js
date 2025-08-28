// ====== 設定你的 Apps Script Web App URL ======
const BASE_URL = 'https://script.google.com/macros/s/AKfycbyYyyG7VvVuA2sFZ36vlCIv9IbJTSKJRRcQB96E28olGVVEs5yIeqY7k-z7tHkdtsQm/exec'; 

// ====== 首頁 (index.html) 的邏輯 ======
async function queryPlayerAndRedirect() {
    const bwfId = document.getElementById('bwfId').value;
    if (!bwfId) {
        alert('請輸入選手ID。');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?action=queryPlayer&id=${bwfId}`);
        const data = await response.json();

        if (data.found) {
            // 找到選手，導向新增訂單頁面
            window.location.href = `createOrder.html?id=${bwfId}`;
        } else {
            // 找不到選手，導向新增選手頁面
            window.location.href = `createPlayer.html?id=${bwfId}`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('查詢失敗，請稍後再試。');
    }
}

async function queryOrderAndRedirect() {
    const orderId = document.getElementById('orderId').value;
    if (!orderId) {
        alert('請輸入訂單編號。');
        return;
    }
    window.location.href = `pickup.html?orderId=${orderId}`;
}

// ====== 新增選手頁面 (createPlayer.html) 的邏輯 ======
document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    if (playerForm) {
        playerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const bwfId = document.getElementById('newBwfId').value;
            const name = document.getElementById('name').value;
            const country = document.getElementById('country').value;
            const statusMessage = document.getElementById('status-message');

            try {
                const response = await fetch(`${BASE_URL}?action=createPlayer`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: bwfId,
                        name: name,
                        country: country
                    })
                });
                const data = await response.json();

                if (data.success) {
                    alert('選手新增成功！即將為您導向新增訂單頁面。');
                    window.location.href = `createOrder.html?id=${bwfId}`;
                } else {
                    statusMessage.textContent = '新增失敗：' + data.message;
                }
            } catch (error) {
                console.error('Error:', error);
                statusMessage.textContent = '連線失敗，請檢查網路。';
            }
        });
    }
});

// ====== 新增訂單頁面 (createOrder.html) 的邏輯 ======
async function initCreateOrderPage() {
    const params = new URLSearchParams(window.location.search);
    const bwfId = params.get('id');
    const infoBox = document.getElementById('player-info');

    if (!bwfId) {
        infoBox.textContent = '無效的選手ID，請回到首頁查詢。';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?action=queryPlayer&id=${bwfId}`);
        const data = await response.json();

        if (data.found) {
            infoBox.innerHTML = `選手：<strong>${data.name}</strong> (國家：${data.country})`;
            document.getElementById('bwfId').value = bwfId;
            document.getElementById('name').value = data.name;
            document.getElementById('country').value = data.country;
        } else {
            infoBox.textContent = '查無此選手。';
            alert('選手資料異常，請回到首頁重新查詢。');
        }
    } catch (error) {
        console.error('Error:', error);
        infoBox.textContent = '查詢失敗，請稍後再試。';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const payStatus = document.getElementById('paid').checked ? '已付清' : '未付清';
            
            const orderData = {
                bwfId: document.getElementById('bwfId').value,
                name: formData.get('name'),
                country: formData.get('country'),
                racketModel: formData.get('model'), 
                string: formData.get('string'),
                pounds: formData.get('tension'),
                racketCount: parseInt(formData.get('racketCount')),
                payStatus: payStatus, 
                note: formData.get('note')
            };

            const statusMessage = document.getElementById('status-message');
            try {
                const response = await fetch(`${BASE_URL}?action=createOrder`, {
                    method: 'POST',
                    body: JSON.stringify(orderData)
                });
                const data = await response.json();

                if (data.success) {
                    statusMessage.innerHTML = `存取完成！訂單編號為：<strong>${data.orderId}</strong>。是否列印？`;
                    const printBtn = document.createElement('button');
                    printBtn.textContent = '列印單據';
                    printBtn.onclick = () => window.open(`print.html?orderId=${data.orderId}`, '_blank');
                    statusMessage.appendChild(printBtn);
                    form.reset();
                } else {
                    statusMessage.textContent = '存取失敗：' + data.message;
                }
            } catch (error) {
                console.error('Error:', error);
                statusMessage.textContent = '連線失敗，請檢查網路。';
            }
        });
    }
});


// ====== 取拍頁面 (pickup.html) 的邏輯 ======
async function queryOrder(orderId) {
    const orderDetails = document.getElementById('order-details');
    const racketList = document.getElementById('racket-list');
    const statusMessage = document.getElementById('status-message');
    
    try {
        const response = await fetch(`${BASE_URL}?action=queryOrder&orderId=${orderId}`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            renderOrderDetails(data.data);
            orderDetails.style.display = 'block';
        } else {
            statusMessage.textContent = '查無此訂單，請確認編號是否正確。';
            orderDetails.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        statusMessage.textContent = '查詢失敗，請稍後再試。';
        orderDetails.style.display = 'none';
    }
}

async function renderOrderDetails(rackets) {
    const orderDetails = document.getElementById('order-details');
    const racketList = document.getElementById('racket-list');
    const statusBar = document.getElementById('status-bar-container');
    const statusMessage = document.getElementById('status-message');

    const firstRacket = rackets[0];
    let statusText = '已收拍';
    let statusClass = 'status-1';
    let isCompleted = false;
    let isPickedUp = false;

    if (firstRacket['實際取拍時間']) {
        statusText = '已取拍';
        statusClass = 'status-3';
        isPickedUp = true;
    } else if (firstRacket['完成時間']) {
        statusText = '已完成';
        statusClass = 'status-2';
        isCompleted = true;
    }

    statusBar.innerHTML = `<div class="status-bar ${statusClass}">目前狀態：${statusText}</div>`;
    document.getElementById('pay-btn').disabled = firstRacket['繳費狀態'] === '已付清';
    document.getElementById('complete-btn').disabled = isCompleted || isPickedUp;
    document.getElementById('pickup-btn').disabled = isPickedUp || !isCompleted;
    document.getElementById('stringer').disabled = isCompleted || isPickedUp;

    if (isCompleted || isPickedUp) {
        document.getElementById('stringer').value = firstRacket['穿線師'];
    }

    racketList.innerHTML = '';
    rackets.forEach(racket => {
        const item = document.createElement('div');
        item.innerHTML = `
            <h3>單據號碼：${racket['單據號碼']}</h3>
            <div><strong>客人：</strong>${racket['選手姓名']} (${racket['國家']})</div>
            <div><strong>拍型 / 線材 / 磅數：</strong>${racket['拍型']} / ${racket['線材']} / ${racket['磅數']}</div>
            <div><strong>繳費狀態：</strong>${racket['繳費狀態']}</div>
            <div><strong>備註：</strong>${racket['備註']}</div>
            ${racket['完成時間'] ? `<div><strong>完成時間：</strong>${racket['完成時間']}</div>` : ''}
            ${racket['實際取拍時間'] ? `<div><strong>實際取拍時間：</strong>${racket['實際取拍時間']}</div>` : ''}
        `;
        racketList.appendChild(item);
    });

    orderDetails.classList.remove('hidden');
    statusMessage.textContent = '';
}

async function updateOrder(field, value) {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    if (!orderId) {
        document.getElementById('status-message').textContent = '無效的訂單編號。';
        return;
    }
    
    if (field === '完成時間' && !document.getElementById('stringer').value) {
        alert('請先輸入穿線師姓名再標記完成！');
        document.getElementById('stringer').focus();
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?action=updateOrder`, {
            method: 'POST',
            body: JSON.stringify({
                orderId: orderId,
                field: field,
                value: value
            })
        });
        const data = await response.json();

        if (data.success) {
            document.getElementById('status-message').textContent = '更新成功！';
            const reloadResponse = await fetch(`${BASE_URL}?action=queryOrder&orderId=${orderId}`);
            const reloadData = await reloadResponse.json();
            if (reloadData.success) {
                renderOrderDetails(reloadData.data);
            }
        } else {
            document.getElementById('status-message').textContent = '更新失敗：' + data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('status-message').textContent = '連線失敗，請檢查網路。';
    }
}

// ====== 列印頁面 (print.html) 的邏輯 ======
function initPrintPage() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    
    if (orderId) {
        printOrder(orderId);
    } else {
        document.getElementById('print-container').textContent = '無效的訂單編號。';
    }
}

async function printOrder(orderId) {
    const printContainer = document.getElementById('print-container');
    try {
        const response = await fetch(`${BASE_URL}?action=queryOrder&orderId=${orderId}`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            const rackets = data.data;
            rackets.forEach(racket => {
                const printItem = document.createElement('div');
                printItem.className = 'print-item';
                printItem.innerHTML = `
                    <h2>羽球穿線單</h2>
                    <p><strong>訂單編號：</strong>${racket['訂單編號']}</p>
                    <p><strong>單據號碼：</strong>${racket['單據號碼']}</p>
                    <p><strong>選手姓名：</strong>${racket['選手姓名']}</p>
                    <p><strong>拍型：</strong>${racket['拍型']}</p>
                    <p><strong>線材：</strong>${racket['線材']}</p>
                    <p><strong>磅數：</strong>${racket['磅數']} 磅</p>
                    <p><strong>備註：</strong>${racket['備註']}</p>
                `;
                printContainer.appendChild(printItem);
            });
            setTimeout(() => { window.print(); }, 500);
        } else {
            printContainer.textContent = '無法取得訂單資料。';
        }
    } catch (error) {
        console.error('Error:', error);
        printContainer.textContent = '連線失敗，無法取得資料。';
    }
}

// 根據 URL 載入不同頁面邏輯
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('createPlayer.html')) {
        // initCreatePlayerPage() 的邏輯已整合在事件監聽器中
        // 無需額外函式
    } else if (window.location.pathname.includes('createOrder.html')) {
        initCreateOrderPage();
    } else if (window.location.pathname.includes('pickup.html')) {
        // pickup.html 的載入邏輯已寫在 HTML 裡
    } else if (window.location.pathname.includes('print.html')) {
        initPrintPage();
    }
});