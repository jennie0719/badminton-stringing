// ====== 設定你的 Apps Script Web App URL ======
const BASE_URL = 'https://script.google.com/macros/s/AKfycbyYyyG7VvVuA2sFZ36vlCIv9IbJTSKJRRcQB96E28olGVVEs5yIeqY7k-z7tHkdtsQm/exec'; 
// 這裡使用一個手動定義的國家列表。
const COUNTRIES = [
    "Afghanistan (阿富汗)", "Albania (阿爾巴尼亞)", "Algeria (阿爾及利亞)", "Antigua and Barbuda (安地卡及巴布達)", "Argentina (阿根廷)",
    "Armenia (亞美尼亞)", "Australia (澳大利亞)", "Austria (奧地利)", "Azerbaijan (亞塞拜然)", "Bahamas (巴哈馬)", "Bahrain (巴林)",
    "Bangladesh (孟加拉國)", "Barbados (巴貝多)", "Belarus (白俄羅斯)", "Belgium (比利時)", "Belize (貝里斯)", "Benin (貝南)",
    "Bhutan (不丹)", "Bolivia (玻利維亞)", "Bosnia and Herzegovina (波士尼亞與赫塞哥維納)", "Botswana (波札那)", "Brazil (巴西)",
    "Brunei (汶萊)", "Bulgaria (保加利亞)", "Burkina Faso (布吉納法索)", "Burundi (蒲隆地)", "Cambodia (柬埔寨)", "Cameroon (喀麥隆)",
    "Canada (加拿大)", "Cape Verde (維德角)", "Central African Republic (中非共和國)", "Chad (查德)", "Chile (智利)", "China (中國)",
    "Colombia (哥倫比亞)", "Comoros (葛摩)", "Congo (剛果)", "Costa Rica (哥斯大黎加)", "Cote d'Ivoire (象牙海岸)", "Croatia (克羅埃西亞)",
    "Cuba (古巴)", "Cyprus (賽普勒斯)", "Czech Republic (捷克)", "Denmark (丹麥)", "Djibouti (吉布地)", "Dominica (多米尼克)",
    "Dominican Republic (多明尼加)", "East Timor (東帝汶)", "Ecuador (厄瓜多)", "Egypt (埃及)", "El Salvador (薩爾瓦多)",
    "Equatorial Guinea (赤道幾內亞)", "Eritrea (厄利垂亞)", "Estonia (愛沙尼亞)", "Eswatini (史瓦帝尼)", "Ethiopia (衣索比亞)",
    "Fiji (斐濟)", "Finland (芬蘭)", "France (法國)", "Gabon (加彭)", "Gambia (甘比亞)", "Georgia (喬治亞)", "Germany (德國)",
    "Ghana (迦納)", "Greece (希臘)", "Grenada (格瑞那達)", "Guatemala (瓜地馬拉)", "Guinea (幾內亞)", "Guinea-Bissau (幾內亞比索)",
    "Guyana (蓋亞那)", "Haiti (海地)", "Honduras (宏都拉斯)", "Hong Kong（香港）", "Hungary (匈牙利)", "Iceland (冰島)", "India (印度)", "Indonesia (印尼)",
    "Iran (伊朗)", "Iraq (伊拉克)", "Ireland (愛爾蘭)", "Israel (以色列)", "Italy (義大利)", "Jamaica (牙買加)", "Japan (日本)",
    "Jordan (約旦)", "Kazakhstan (哈薩克)", "Kenya (肯亞)", "Kiribati (吉里巴斯)", "Kosovo (科索沃)", "Kuwait (科威特)", "Kyrgyzstan (吉爾吉斯)",
    "Laos (寮國)", "Latvia (拉脫維亞)", "Lebanon (黎巴嫩)", "Lesotho (賴索托)", "Liberia (賴比瑞亞)", "Libya (利比亞)", "Liechtenstein (列支敦斯登)",
    "Lithuania (立陶宛)", "Luxembourg (盧森堡)", "Madagascar (馬達加斯加)", "Malawi (馬拉威)", "Malaysia (馬來西亞)", "Maldives (馬爾地夫)",
    "Mali (馬利)", "Malta (馬爾他)", "Marshall Islands (馬紹爾群島)", "Mauritania (茅利塔尼亞)", "Mauritius (模里西斯)", "Mexico (墨西哥)",
    "Micronesia (密克羅尼西亞)", "Moldova (摩爾多瓦)", "Monaco (摩納哥)", "Mongolia (蒙古)", "Montenegro (蒙特內哥羅)", "Morocco (摩洛哥)",
    "Mozambique (莫三比克)", "Myanmar (緬甸)", "Namibia (納米比亞)", "Nauru (諾魯)", "Nepal (尼泊爾)", "Netherlands (荷蘭)",
    "New Zealand (紐西蘭)", "Nicaragua (尼加拉瓜)", "Niger (尼日)", "Nigeria (奈及利亞)", "North Korea (北韓)", "North Macedonia (北馬其頓)",
    "Norway (挪威)", "Oman (阿曼)", "Pakistan (巴基斯坦)", "Palau (帛琉)", "Panama (巴拿馬)", "Papua New Guinea (巴布亞紐幾內亞)",
    "Paraguay (巴拉圭)", "Peru (秘魯)", "Philippines (菲律賓)", "Poland (波蘭)", "Portugal (葡萄牙)", "Qatar (卡達)",
    "Romania (羅馬尼亞)", "Russia (俄羅斯)", "Rwanda (盧安達)", "Saint Kitts and Nevis (聖克里斯多福及尼維斯)",
    "Saint Lucia (聖露西亞)", "Saint Vincent and the Grenadines (聖文森及格瑞那丁)", "Samoa (薩摩亞)", "San Marino (聖馬利諾)",
    "Sao Tome and Principe (聖多美普林西比)", "Saudi Arabia (沙烏地阿拉伯)", "Senegal (塞內加爾)", "Serbia (塞爾維亞)",
    "Seychelles (塞席爾)", "Sierra Leone (獅子山)", "Singapore (新加坡)", "Slovakia (斯洛伐克)", "Slovenia (斯洛維尼亞)",
    "Solomon Islands (索羅門群島)", "Somalia (索馬利亞)", "South Africa (南非)", "South Korea (南韓)", "South Sudan (南蘇丹)",
    "Spain (西班牙)", "Sri Lanka (斯里蘭卡)", "Sudan (蘇丹)", "Suriname (蘇利南)", "Sweden (瑞典)", "Switzerland (瑞士)",
    "Syria (敘利亞)", "Taiwan (台灣)", "Tajikistan (塔吉克)", "Tanzania (坦尚尼亞)", "Thailand (泰國)", "Togo (多哥)", "Tonga (東加)",
    "Trinidad and Tobago (千里達及多巴哥)", "Tunisia (突尼西亞)", "Turkey (土耳其)", "Turkmenistan (土庫曼)", "Tuvalu (吐瓦魯)",
    "Uganda (烏干達)", "Ukraine (烏克蘭)", "United Arab Emirates (阿拉伯聯合大公國)", "United Kingdom (英國)", "United States (美國)",
    "Uruguay (烏拉圭)", "Uzbekistan (烏茲別克)", "Vanuatu (萬那杜)", "Vatican City (梵蒂岡)", "Venezuela (委內瑞拉)", "Vietnam (越南)",
    "Yemen (葉門)", "Zambia (尚比亞)", "Zimbabwe (辛巴威)"
];

// ====== 新增功能：填充國家下拉式選單 ======
async function populateCountryDropdown() {
    const countrySelect = document.getElementById('country');
        
    COUNTRIES.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id');

    if (playerId) {
        document.getElementById('newBwfId').value = playerId;
    }
}

// ====== 首頁 (index.html) 的邏輯 ======
async function queryPlayerAndRedirect() {
    document.getElementById('loading-overlay').classList.remove('hidden');
    const bwfId = document.getElementById('bwfId').value;
    if (!bwfId) {
        alert('請輸入選手ID。\nPlease enter the player\'s BWF ID.');
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
        alert('查詢失敗，請稍後再試。\nSomething went wrong. Please try again later.');
    } finally {
        // 無論成功或失敗，都在這裡隱藏遮罩
        document.getElementById('loading-overlay').classList.add('hidden');
    }
}

async function queryOrderAndRedirect() {
    const orderId = document.getElementById('orderId').value;
    if (!orderId) {
        alert('請輸入訂單編號。\nPlease enter the order number.');
        return;
    }
    window.location.href = `pickup.html?orderId=${orderId}`;
}

// ====== 新增選手頁面 (createPlayer.html) 的邏輯 ======
document.addEventListener('DOMContentLoaded', () => {
    const playerForm = document.getElementById('playerForm');
    if (playerForm) {
        playerForm.addEventListener('submit', async function(e) {
            document.getElementById('loading-overlay').classList.remove('hidden'); 
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
                    alert('選手新增成功！即將為您導向新增訂單頁面。\nPlayer added! Taking you to the New Order page.');
                    window.location.href = `createOrder.html?id=${bwfId}`;
                } else {
                    statusMessage.textContent = '新增失敗 Failed to Add: ' + data.message;
                }
            } catch (error) {
                console.error('Error:', error);
                statusMessage.textContent = '連線失敗，請檢查網路。\nFailed to connect. Check your internet connection.';
            } finally {
                // 無論成功或失敗，都在這裡隱藏遮罩
                document.getElementById('loading-overlay').classList.add('hidden');
            }
        });
    }
});

// ====== 新增訂單頁面 (createOrder.html) 的邏輯 ======
async function initCreateOrderPage() {
    document.getElementById('loading-overlay').classList.remove('hidden'); 
    const params = new URLSearchParams(window.location.search);
    const bwfId = params.get('id');
    const infoBox = document.getElementById('player-info');

    if (!bwfId) {
        infoBox.textContent = '無效的選手ID，請回到首頁查詢。\nInvalid player ID. Return to homepage to search.';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}?action=queryPlayer&id=${bwfId}`);
        const data = await response.json();

        if (data.found) {
            infoBox.innerHTML = `選手 Name：<strong>${data.name}</strong><br>國家 Country：<strong>${data.country}</strong>`;
            document.getElementById('bwfId').value = bwfId;
            document.getElementById('name').value = data.name;
            document.getElementById('country').value = data.country;
        } else {
            infoBox.textContent = '查無此選手。\nPlayer not found.';
            alert('選手資料異常，請回到首頁重新查詢。\nInvalid player data. Return to homepage to search.');
        }
    } catch (error) {
        console.error('Error:', error);
        infoBox.textContent = '查詢失敗，請稍後再試。\nSomething went wrong. Please try again later.';
    } finally {
        // 無論成功或失敗，都在這裡隱藏遮罩
        document.getElementById('loading-overlay').classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(e) {
            document.getElementById('loading-overlay').classList.remove('hidden'); 
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const payStatus = document.getElementById('paid').checked ? '已付清' : '未付清';
            
            const orderData = {
                bwfId: document.getElementById('bwfId').value,
                name: formData.get('name'),
                country: formData.get('country'),
                model: formData.get('model'), 
                string: formData.get('string'),
                tension: formData.get('tension'),
                racketCount: parseInt(formData.get('racketCount')),
                payStatus: payStatus, 
                note: formData.get('note'),
                dropOffTime: new Date().toLocaleString()
            };

            const statusMessage = document.getElementById('status-message');

            try {
                const response = await fetch(`${BASE_URL}?action=createOrder`, {
                    method: 'POST',
                    body: JSON.stringify(orderData)
                });
                const data = await response.json();

                if (data.success) {
                    statusMessage.innerHTML = `存取完成！訂單編號為：<strong>${data.orderId}</strong>。是否列印？<br>Saved successfully! Order number: <strong>${data.orderId}</strong>. Print now?`;
                    const printBtn = document.createElement('button');
                    printBtn.textContent = '列印 Print';
                    printBtn.onclick = () => window.open(`print.html?orderId=${data.orderId}`, '_blank');
                    statusMessage.appendChild(printBtn);
                    form.reset();
                } else {
                    statusMessage.textContent = '存取失敗 Failed to Save：' + data.message;
                }
            } catch (error) {
                console.error('Error:', error);
                statusMessage.textContent = '連線失敗，請檢查網路。\nFailed to connect. Check your internet connection.';
            } finally {
                // 無論成功或失敗，都在這裡隱藏遮罩
                document.getElementById('loading-overlay').classList.add('hidden');
            }
        });
    }
});


// ====== 取拍頁面 (pickup.html) 的邏輯 ======
async function queryOrder(orderId) {
    document.getElementById('loading-overlay').classList.remove('hidden'); 
    const orderDetails = document.getElementById('order-details');
    const statusMessage = document.getElementById('status-message');
    
    try {
        const response = await fetch(`${BASE_URL}?action=queryOrder&orderId=${orderId}`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            renderOrderDetails(data.data);
        orderDetails.style.display = 'block';
        } else {
            statusMessage.textContent = '查無此訂單，請確認編號是否正確。\nOrder not found. Please check if the number is correct.';
            orderDetails.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        statusMessage.textContent = '查詢失敗，請稍後再試。\nSomething went wrong. Please try again later.';
        orderDetails.style.display = 'none';
    } finally {
        // 無論成功或失敗，都在這裡隱藏遮罩
        document.getElementById('loading-overlay').classList.add('hidden');
    }
}

async function renderOrderDetails(rackets) {
    const orderDetails = document.getElementById('order-details');
    const racketList = document.getElementById('racket-list');
    const statusBar = document.getElementById('status-bar-container');
    const statusMessage = document.getElementById('status-message');

    const firstRacket = rackets[0];
    let statusText = '未完成 Incomplete';
    let statusClass = 'status-1';
    let isCompleted = false;
    let isPickedUp = false;

    if (firstRacket['pickupTime']) {
        statusText = '已取拍 Picked Up';
        statusClass = 'status-3';
        isPickedUp = true;
    } else if (firstRacket['completeTime']) {
        statusText = '已完成 Completed';
        statusClass = 'status-2';
        isCompleted = true;
    }

    statusBar.innerHTML = `<div class="status-bar ${statusClass}">目前狀態 Current Status：${statusText}</div>`;
    // 將「付清」按鈕設為隱藏，而不是禁用
    if (firstRacket['payStatus'] === '已付清') {
        document.getElementById('pay-btn').style.display = 'none';
    } else {
        document.getElementById('pay-btn').style.display = 'inline-block';
    }
    document.getElementById('complete-btn').disabled = isCompleted || isPickedUp;
    document.getElementById('pickup-btn').disabled = isPickedUp || !isCompleted;
    document.getElementById('stringer').disabled = isCompleted || isPickedUp;

    if (isCompleted || isPickedUp) {
        document.getElementById('stringer').value = firstRacket['stringer'];
    }

    racketList.innerHTML = '';
    rackets.forEach(racket => {
        const item = document.createElement('div');
        item.innerHTML = `
            <h3>單據號碼 Serial Number：${racket['serial']}</h3>
            <div><strong>姓名 Name：</strong>${racket['name']}</div>
            <div><strong>國家 Country：</strong>${racket['country']}</div>
            <div><strong>拍型 Racket Model / 線材 String / 磅數 Tension：</strong>${racket['model']} / ${racket['string']} / ${racket['tension']}</div>
            <div><strong>繳費狀態 Pay Status：</strong>${racket['payStatus']}</div>
            <div><strong>備註 Note：</strong>${racket['note']}</div>
            ${racket['completeTime'] ? `<div><strong>完成時間 Complete Time：</strong>${racket['completeTime']}</div>` : ''}
            ${racket['pickupTime'] ? `<div><strong>取拍時間 Pickup Time：</strong>${racket['pickupTime']}</div>` : ''}
        `;
        racketList.appendChild(item);
    });

    orderDetails.classList.remove('hidden');
    statusMessage.textContent = '';
}

async function updateOrder(field, value) {
    document.getElementById('loading-overlay').classList.remove('hidden'); 
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    if (!orderId) {
        document.getElementById('status-message').textContent = '無效的訂單編號。\nInvalid order number.';
        return;
    }
    
    if (field === 'completeTime' && !document.getElementById('stringer').value) {
        alert('請先輸入穿線師姓名再標記完成！\nPlease enter the stringer\’s name before marking as complete!');
        document.getElementById('stringer').focus();
        return;
    }

    if (field === 'completeTime') {
        updateOrder('stringer', document.getElementById('stringer').value);
        updateOrder('status', '已完成');
    } else if (field === 'pickupTime') {
        updateOrder('status', '已取拍');
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
            document.getElementById('status-message').textContent = '更新成功！\nUpdate successful!';
            const reloadResponse = await fetch(`${BASE_URL}?action=queryOrder&orderId=${orderId}`);
            const reloadData = await reloadResponse.json();
            if (reloadData.success) {
                renderOrderDetails(reloadData.data);
            }
        } else {
            document.getElementById('status-message').textContent = '更新失敗 Update Failed：' + data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('status-message').textContent = '連線失敗，請檢查網路。\nFailed to connect. Check your internet connection.';
    } finally {
        // 無論成功或失敗，都在這裡隱藏遮罩
        document.getElementById('loading-overlay').classList.add('hidden');
    }
}

// ====== 列印頁面 (print.html) 的邏輯 ======
function initPrintPage() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    
    if (orderId) {
        printOrder(orderId);
    } else {
        document.getElementById('print-container').textContent = '無效的訂單編號。\nInvalid order number.';
    }
}

function printCurOrder() {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    if (!orderId) {
        document.getElementById('status-message').textContent = '無效的訂單編號。\nInvalid order number.';
        return;
    }
    window.open(`print.html?orderId=${orderId}`, '_blank')
}

async function printOrder(orderId) {
    document.getElementById('loading-overlay').classList.remove('hidden'); 
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
                    <p><strong>訂單編號：</strong>${racket['orderId']}</p>
                    <p><strong>單據號碼：</strong>${racket['serial']}</p>
                    <p><strong>選手姓名：</strong>${racket['name']}</p>
                    <p><strong>國家：</strong>${racket['country']}</p>
                    <p><strong>拍型：</strong>${racket['model']}</p>
                    <p><strong>線材：</strong>${racket['string']}</p>
                    <p><strong>磅數：</strong>${racket['tension']} 磅</p>
                    <p><strong>備註：</strong>${racket['note']}</p>
                    <img src="${racket['url']}" alt ="QR Code">
                `;
                printContainer.appendChild(printItem);
            });
            setTimeout(() => { window.print(); }, 500);
        } else {
            printContainer.textContent = '無法取得訂單資料。\nUnable to retrieve order data.';
        }
    } catch (error) {
        console.error('Error:', error);
        printContainer.textContent = '連線失敗，無法取得資料。\nFailed to connect. Check your internet connection.';
    } finally {
        // 無論成功或失敗，都在這裡隱藏遮罩
        document.getElementById('loading-overlay').classList.add('hidden');
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