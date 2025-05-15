// ตัวแปรเก็บเลขลอตเตอรี่
let lotteryNumbers = [];
let confirmedNumbers = [];
let history = JSON.parse(localStorage.getItem('DataList')) || [];
let resultnumber =[]
let prize_fb = [
    {
        name: 'รางวัลเลขหน้า 3 ตัว',
        id: 'prize_f_3',
    },
    {
        name: 'รางวัลเลขท้าย 3 ตัว',
        id: 'prize_b_3',
    },
    {
        name: 'รางวัลเลขท้าย 2 ตัว',
        id: 'prize_b_2',
    }
  ]
let alertQueue = [];
let username = JSON.parse(localStorage.getItem('usernameData')) || 'username';
let loginStatus = JSON.parse(localStorage.getItem('loginStatus')) || false;
let countLottery =  JSON.parse(localStorage.getItem('countLottery')) || 0;
let countWin =  JSON.parse(localStorage.getItem('countWin')) || 0;

// ฟังก์ชันสุ่มเลข
function generateRandomNumbers() {
    lotteryNumbers = [];
    for(let i = 0; i < 6; i++) {
    lotteryNumbers.push(Math.floor(Math.random() * 10));
    }
    displayNumbers();
    
    // เพิ่มเอฟเฟกต์การหมุนเลข
    const boxes = document.querySelectorAll('.input_num');
    boxes.forEach(box => {
    box.style.transform = 'rotateX(360deg)';
    setTimeout(() => {
        box.style.transform = 'rotateX(0)';
    }, 500);
    });
}

// แสดงเลขในช่อง
function displayNumbers() {
    for(let i = 0; i < 6; i++) {
    document.getElementById(`inputnum${i+1}`).value = lotteryNumbers[i];
    }
}

// ยืนยันเลข
function confirmNumbers() {
    countLottery++;
    const input = document.querySelectorAll('.input_num')
    lotteryNumbers = Array.from(input).map(input => input.value);
    if(lotteryNumbers.some(num => num === '')) {
    showAlert('กรุณากรอกเลขให้ครบทุกช่อง', 'error');
    return;
    }
    if(lotteryNumbers.some(num => num > 9 || num < 0)) {
    showAlert('กรุณากรอกเลข 0-9 เท่านั้น', 'error');
    return;
    }
    confirmedNumbers = [...lotteryNumbers];
    const numbersStr = confirmedNumbers.join('');
    
    // เพิ่มในประวัติ
    const now = new Date();
    const timeStr = now.toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'});
    history.unshift({
    numbers: numbersStr,
    time: timeStr
    });

    updateHistory();
    showAlert(`ยืนยันเลขลอตเตอรี่เรียบร้อยแล้ว: ${numbersStr}`, 'success');
}

// ล้างเลข
function clearNumbers() {
    lotteryNumbers = [];
    for(let i = 1; i <= 6; i++) {
    document.getElementById(`inputnum${i}`).value = '';
    }
}

// อัพเดทประวัติ
function updateHistory() {
    // บันทึกประวัติลง localStorage
    localStorage.setItem('countLottery', JSON.stringify(countLottery));
    localStorage.setItem('countWin', JSON.stringify(countWin));
    localStorage.setItem('DataList', JSON.stringify(history));
    const historyHeader = document.getElementById('history_header');
    const historyList = document.getElementById('historyList');
    //clear historyList
    historyList.innerHTML = '';
    history.forEach(item => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item flex justify-between items-center p-3 bg-white rounded-lg shadow';
    historyItem.innerHTML = `
        <span class="font-medium">${item.numbers}</span>
        <span class="text-gray-500 text-sm">${item.time}</span>`;
    historyList.appendChild(historyItem);
    });
    historyHeader.innerHTML = `ประวัติหวยที่ซื้อ: <u class="text-red-500">จำนวน ${history.length} ใบ</u>`
}

// อัพเดทผลรางวัล
function UpdateResult(resultLottery) {
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.toggle('hidden');
    const resultList = document.getElementById('resultList');
    //clear resultList
    resultList.innerHTML = '';
    resultLottery.forEach(item => {
    const ResultItem = document.createElement('div');
    ResultItem.className = 'result-item flex justify-between items-center p-3 bg-[rgb(65,241,165)] rounded-lg shadow';
    ResultItem.innerHTML = `
        <span class="font-medium text-red-600">${item.numbers}</span>
        <span class="text-gray-500 text-sm">${item.time}</span>`;
    resultList.appendChild(ResultItem);
    });
    resultLottery = [];
}

//อัพเดท Username
function updateUsername() {
    localStorage.setItem('usernameData', JSON.stringify(username));
    localStorage.setItem('loginStatus', JSON.stringify(loginStatus));
    const usernameInput = document.getElementById('username');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginBtn = document.getElementById('login-outBtn');

    if (username === 'username') {
        loginBtn.textContent = 'เข้าสู่ระบบ';
    } else {
        usernameInput.value = username;
        loginBtn.textContent = 'ออกจากระบบ';
    }
    usernameInput.textContent = username;
    usernameDisplay.textContent = username[0].toUpperCase();
}

// นับถอยหลัง
function updateCountdown() {
    const now = new Date();
    const nextHour = new Date();
    nextHour.setHours(now.getHours() + 24);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    
    const diff = nextHour - now;
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    document.getElementById('countdown').textContent = 
    `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// แสดง Alert
function showAlert(message, type) {
    alertQueue.push({ message, type });
    if (alertQueue.length === 1) {
        displayNextAlert();
    }
}

function displayNextAlert() {
    if (alertQueue.length > 0) {
        const { message, type } = alertQueue[0];
        // Create alert box
        const alertBox = document.createElement('div');
        alertBox.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
            type === 'error' ? 'bg-[rgb(255,127,217)]' : 
            type === 'success' ? 'bg-[rgb(94,209,255)]' : 
            'bg-blue-500'
        }`;
        alertBox.textContent = message;
        
        setTimeout(() => {
            document.body.appendChild(alertBox); // Display the alert box
        }, 100);
        
        setTimeout(() => {
            alertBox.remove(); // Remove the alert box
            alertQueue.shift(); // Remove the alert from the queue
            displayNextAlert(); // Display the next alert if there is one
        }, 1000); // Time for alert display before removing
    }
}
/*
// สุ่มเลขรางวัล
function generatePrizes() {
    for(let i = 1; i <= 5; i++) {
    let prize = '';
    for(let j = 0; j < 6; j++) {
        prize += Math.floor(Math.random() * 10);
    }
    document.getElementById(`prize${i}`).textContent = prize;
    }
}*/
/*   
const GetLotteryResult = () => {
    const number_prize = [1, 1, 1, 1 ,1, ];
    const prizeTypes = ['prize_1', 'prize_2', 'prize_3', 'prize_4', 'prize_5'];

    return prizeTypes.reduce((acc, prize, index) => {
        acc[prize] = Array.from({ length: number_prize[index] }, generateRandomNumber);
        return acc;
    }, {});
};*/

// ฟังก์ชันแสดงผลรางวัล
function getResult(e){
    if (history.length === 0) {
        alert('กรุณาซื้อหวยก่อน', 'error');
        return;
    }
    e.preventDefault();
    // สุ่มเลขรางวัล 1-5
  for (let i = 1; i <= 5; i++) {
    const randomPrizeNumber = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    resultnumber.push(randomPrizeNumber);
    document.getElementById(`prize${i}`).textContent = randomPrizeNumber; // Update the prize display
  }
  // สุ่มเลขรางวัล 3,2 ตัวท้าย และ 3 ตัวหน้า
  for (let i = 0; i < 2; i++) {
    const randomPrizeNumber = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10)).join('');
    document.getElementById(prize_fb[i].id).textContent = randomPrizeNumber; 
    prize_fb[i].number = randomPrizeNumber;
  }
  for (let i = 2; i < 3; i++) {
    const randomPrizeNumber = Array.from({ length: 2 }, () => Math.floor(Math.random() * 10)).join('');
    document.getElementById(prize_fb[i].id).textContent = randomPrizeNumber;
    prize_fb[i].number = randomPrizeNumber;
  }
  console.log(prize_fb);
  checkIfWon()
}

function checkIfWon() {
    let resultLottery = [];
    let isWinner = false;
    //เช็ค 1-5
    for (let i = 1; i <= 5; i++) {
        const prizeNumber = resultnumber[i - 1];
        for (let item of history) {
            const numcheck = item.numbers;
            if (numcheck === prizeNumber) {
                countWin++;
                resultLottery.push(item);
                // แสดงผลรางวัลที่ถูกรางวัล
                showAlert(`ยินดีด้วย! คุณถูกรางวัลที่ ${i}: ${prizeNumber}`, 'success');
                isWinner = true;
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        const prizeNumber = prize_fb[i].number;
        for (let item of history) {
            const numcheck = item.numbers;
            if (i === 0) {
                // 3 ตัวหน้า (สมมติเลข 6 หลัก)
                if (Math.floor(numcheck / 1000) === prizeNumber ) {
                    countWin++;
                    resultLottery.push(item);
                    showAlert(`ยินดีด้วย! คุณถูกรางวัลเลขหน้า 3 ตัว: ${numcheck}`, 'success');
                    isWinner = true;
                }
            } 
            if (i === 1) {
                // 3 ตัวท้าย
                if ((numcheck % 1000) === prizeNumber ) {
                    countWin++;
                    resultLottery.push(item);
                    showAlert(`ยินดีด้วย! คุณถูกรางวัลเลขท้าย 3 ตัว: ${numcheck}`, 'success');
                    isWinner = true;
                }
            } 
            if (i === 2) {
                // 2 ตัวท้าย
                if ((numcheck % 100) === prizeNumber ) {
                    countWin++;
                    resultLottery.push(item);
                    showAlert(`ยินดีด้วย! คุณถูกรางวัลเลขท้าย 2 ตัว: ${numcheck}`, 'success');
                    isWinner = true;
                }
            }
        }
    }
    history = [];
    //แสดงผลรางวัลที่ถูกรางวัล
    UpdateResult(resultLottery);
    // อัพเดทประวัติ
    updateHistory();
    if (!isWinner) {
        showAlert("เสียใจด้วย คุณไม่ถูกรางวัล", "error");
    }
    const NumberWin = document.getElementById('numberWin');
    NumberWin.textContent = `จำนวนรางวัลที่ถูกรางวัล: ${resultLottery.length} ใบ`;
    // แสดงอัตราการชนะ
    CalculateWinRate();
}

function DeleteHistory() {
    countLottery--;
  history.pop();
  updateHistory();
  showAlert('ลบประวัติการทำรายการเรียบร้อยแล้ว', 'success');
}
function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    menu.style.visibility = 'visible';
    } else {
    menu.classList.add('hidden');
    menu.style.visibility = 'hidden';
    }
}
function toggleLogin() {
  const loginForm = document.getElementById('login');
      if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
      } else {
        loginForm.classList.add('hidden');
      }
}

//ฟังก์ชันตรวจสอบการเข้าสู่ระบบ
function CheckLoginPassword(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    if (usernameInput.value.trim() === '') {
        alert('กรุณากรอกชื่อผู้ใช้', 'error');
        return;
    }
    if (passwordInput.value.trim() === '') {
        alert('กรุณากรอกรหัสผ่าน', 'error');
        return;
    } else if (passwordInput.value !== 'JWC888Gokgok') {
        alert('รหัสผ่านไม่ถูกต้อง', 'error');
        return;
    } else{
        showAlert('เข้าสู่ระบบสำเร็จ', 'success');
    }
    username = usernameInput.value;
    loginStatus = true;
    updateUsername();
    toggleLogin();
    toggleMenu();
}

function CalculateWinRate() {
    localStorage.setItem('countLottery', JSON.stringify(0));
    localStorage.setItem('countWin', JSON.stringify(0));
    const winRate = (countWin / countLottery) * 100;
    const winRateDisplay = document.getElementById('winRate');
    winRateDisplay.textContent = `${winRate.toFixed(2)}%`;
}

// ตั้งค่าปุ่ม
document.getElementById('randomBtn').addEventListener('click', generateRandomNumbers);
document.getElementById('confirmBtn').addEventListener('click', confirmNumbers);
document.getElementById('clearBtn').addEventListener('click', clearNumbers);
document.getElementById('viewLabel').addEventListener('click', getResult);
document.getElementById('deletehistory').addEventListener('click', DeleteHistory);
document.getElementById('userBtn').addEventListener('click', toggleMenu);
document.getElementById('login-outBtn').addEventListener('click', function() {
    if (loginStatus) {
        // Clear username and login status
        document.getElementById('login-outBtn').textContent = 'เข้าสู่ระบบ';
        username = 'username';
        loginStatus = false;
        updateUsername();
        showAlert('Logout successful', 'success');
        toggleMenu();
    } else {
        toggleLogin();
    }
}
);
document.getElementById('login-closeBtn').addEventListener('click', function() {
toggleLogin();
toggleMenu();
});
document.getElementById('loginBtn').addEventListener('click', CheckLoginPassword);



//ฟังก์ชันรีเซ็ตทุกๆ 24 ชั่วโมง (ยังไม่ได้เขียน)


// อัพเดทนับถอยหลังทุกวินาที
setInterval(updateCountdown, 1000);
updateCountdown(); // เรียกครั้งแรกเพื่อแสดงผลทันที

/*
// สุ่มเลขรางวัลเมื่อโหลดหน้า
generatePrizes();*/
    
// สุ่มเลขเริ่มต้นเมื่อโหลดหน้า
generateRandomNumbers();
window.onload = function() {
    updateHistory();
    updateUsername();
};

