//รับค่าจากแต่ละElement
const btn_ramdom_num = document.getElementById('btn_random')

const text_input = document.querySelectorAll('.text_input')
const btn_summit = document.getElementById('btn_summit')

const btn_show = document.getElementByClass('btn_show')
const btn_hide = document.getElementByClass('btn_hide')


//ใส่Evenเมื่อกดrandom
btn_ramdom_num.addEventListener('submit', RandomNumberInput)

//ใส่Evenเมื่อsummit
btn_summit.addEventListener('submit', AddItemToList)

//ใส่Evenเมื่อกดแสดง และกดซ่อน
btn_show.addEventListener('submit',toggleBox)
btn_hide.addEventListener('submit',toggleBox)

//ฟังก์ชันสำหรับสุ่มค่าและเปลี่ยนค่าในปุ่มinput
function RandomNumberInput(e){
    e.preventDefault()
    const number_arr = generateRandomNumber().toString().split('').map(Number)
    text_input.forEach((text, index) => {
        text.value = number_arr[index]; 
    });
}

//ตัวแปรเก็บข้อมูลที่ได้รายการซื้อหวย
let  Datalist = JSON.parse(localStorage.getItem('DLlotteryNumbers')) || [];

 //ฟังก์ชันสำหรับใส่ค่าที่ป้อนลงในลิสต์
function AddItemToList(e){
    e.preventDefault()
    if([...text_input].some(text_input => text_input.value.trim() == '')){
        alert("Please enter complete information.")
    }else{
        const num_input = Number(Array.from(text_input).join(''))
        Datalist.push(num_input)
        localStorage.getItem('DLlotteryNumbers',JSON.stringify(Datalist))
        updateList();
        text_input.map(text => text.value = '');
    }
}

//ฟังก์ชันสำหรับอัพเดทรายการเมื่อกดปุ่ม
function updateList(){
    // ล้างรายการก่อน
    const listElement = document.getElementById('objectList')
    listElement.innerHTML = '' 
    const counts = {}

    //นับlistที่ซ้ำ
    Datalist.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
    });
    //แสดงผล
    for (const id in counts) {
        const listItem = document.createElement('li');
        listItem.textContent = `หมายเลขหวย: ${id} - จำนวน: ${counts[id]} ใบ`;
        listElement.appendChild(listItem);
    }
}


//ฟังก์ชันสำหรับเช็คผล 
function CheckResult(){
    const LotteryResult=GetLotteryResult()
    const winningLotteryNumbers=[]

    //นำหวยที่ถูกไปเก็บใน Arr winningLotteryNumbers
    for (const prizeType in LotteryResult) {
        if (LotteryResult.hasOwnProperty(prizeType)) {
            const winningNumbers = LotteryResult[prizeType];
            // สำหรับแต่ละหมายเลขรางวัล
            for (let i = 0; i < winningNumbers.length; i++) {
                const winningNumber = winningNumbers[i];
                const matchedData = Datalist.filter(number => number === winningNumber);
                if (matchedData.length > 0) {
                    winningLotteryNumbers.push(...matchedData)
                }
            }
        }
    }
    if(winningLotteryNumbers.length > 0){
        
    }else{
        
    }

}


//ฟังก์ชันสำหรับสร้างจำนวนชุดของหวยว่ามีกี่ชุด p1, p2, p3, p4, p5, pdf3, pdl3, pdl2
const GetLotteryResult = () => {
    const number_prize = [1, 1, 1, 1 ,1, ];
    const prizeTypes = ['prize_1', 'prize_2', 'prize_3', 'prize_4', 'prize_5'];
  
    return prizeTypes.reduce((acc, prize, index) => {
      acc[prize] = Array.from({ length: number_prize[index] }, generateRandomNumber);
      return acc;
    }, {});
};

//ฟังก์ชันสำหรับสุ่มตัวเลขหวย 6 ตัว
const generateRandomNumber = () => Math.floor(Math.random() * 900000) + 100000;

//ฟังก์ชันสำหรับเปลี่ยน Class เพื่อแสดงรายกการ
function toggleBox(){
    const box_list = document.getElementById('box_list').classList.toggle("active");
}

window.onload = function() {
    updateList();
};

////////////////////////////



      // ตัวแปรเก็บเลขลอตเตอรี่
      let lotteryNumbers = [];
      let confirmedNumbers = [];
      let history = JSON.parse(localStorage.getItem('DLlotteryNumbers')) || []
      
      // ฟังก์ชันสุ่มเลข
      function generateRandomNumbers() {
        lotteryNumbers = [];
        for(let i = 0; i < 6; i++) {
          lotteryNumbers.push(Math.floor(Math.random() * 10));
        }
        displayNumbers();
        
        // เพิ่มเอฟเฟกต์การหมุนเลข
        const boxes = document.querySelectorAll('.number-box');
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
          document.getElementById(`num${i+1}`).textContent = lotteryNumbers[i];
        }
      }
      
      // ยืนยันเลข
      function confirmNumbers() {
        if(lotteryNumbers.length === 0) {
          showAlert('กรุณาสุ่มเลขก่อนยืนยัน', 'error');
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
        localStorage.setItem('DLlotteryNumbers', JSON.stringify(history))
        updateHistory();
        showAlert(`ยืนยันเลขลอตเตอรี่เรียบร้อยแล้ว: ${numbersStr}`, 'success');
      }
      
      // ล้างเลข
      function clearNumbers() {
        lotteryNumbers = [];
        for(let i = 1; i <= 6; i++) {
          document.getElementById(`num${i}`).textContent = '';
        }
      }
      
      // ดูฉลาก
      function viewLabel() {
        if(confirmedNumbers.length === 0) {
          showAlert('คุณยังไม่ได้ยืนยันเลขลอตเตอรี่', 'error');
        } else {
          const numbersStr = confirmedNumbers.join('');
          showAlert(`เลขลอตเตอรี่ของคุณ: ${numbersStr}`, 'info');
        }
      }
      
      // อัพเดทประวัติ
      function updateHistory() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        
        history.forEach(item => {
          const historyItem = document.createElement('div');
          historyItem.className = 'history-item flex justify-between items-center p-3 bg-white rounded-lg shadow';
          historyItem.innerHTML = `
            <span class="font-medium">${item.numbers}</span>
            <span class="text-gray-500 text-sm">${item.time}</span>
          `;
          historyList.appendChild(historyItem);
        });
      }
      
      // นับถอยหลัง
      function updateCountdown() {
        const now = new Date();
        const nextHour = new Date();
        nextHour.setHours(now.getHours() + 1);
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
        const alertBox = document.createElement('div');
        alertBox.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
          type === 'error' ? 'bg-red-500' : 
          type === 'success' ? 'bg-green-500' : 
          'bg-blue-500'
        }`;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        
        setTimeout(() => {
          alertBox.remove();
        }, 3000);
      }
      
      // สุ่มเลขรางวัล
      function generatePrizes() {
        for(let i = 1; i <= 5; i++) {
          let prize = '';
          for(let j = 0; j < 6; j++) {
            prize += Math.floor(Math.random() * 10);
          }
          document.getElementById(`prize${i}`).textContent = prize;
        }
      }
      
      // ตั้งค่าปุ่ม
      document.getElementById('randomBtn').addEventListener('click', generateRandomNumbers);
      document.getElementById('confirmBtn').addEventListener('click', confirmNumbers);
      document.getElementById('clearBtn').addEventListener('click', clearNumbers);
      document.getElementById('viewLabel').addEventListener('click', viewLabel);
      
      // อัพเดทนับถอยหลังทุกวินาที
      setInterval(updateCountdown, 1000);
      updateCountdown(); // เรียกครั้งแรกเพื่อแสดงผลทันที
      
      // สุ่มเลขรางวัลเมื่อโหลดหน้า
      generatePrizes();
      
      // สุ่มเลขเริ่มต้นเมื่อโหลดหน้า
      generateRandomNumbers();
  