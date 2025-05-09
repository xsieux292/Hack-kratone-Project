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
    const number_prize = [1, 5, 10, 15 ,20, 2, 2, 2, 1];
    const prizeTypes = ['prize_1', 'prize_2', 'prize_3', 'prize_4', 'prize_5', 'prize_1_same', 'prize_3_d_first', 'prize_3_d_last', 'prize_2_d_last'];
  
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