//รับค่าจากแต่ละElement
const text_input = document.querySelectorAll('.text_input')
const btn_ramdom_num = document.getElementById('btn_random')
const btn_summit = document.getElementById('btn_summit')

//ใส่Evenเมื่อsummit
btn_summit.addEventListener('submit', LotteryResult)

//ใส่Evenเมื่อกดrandom
btn_ramdom_num.addEventListener('submit', RandomNumberInput)

//ฟังก์ชันสำหรับสุ่มค่าและเปลี่ยนค่าในปุ่มinput
function RandomNumberInput(){
    const number_arr = generateRandomNumber().toString().split('').map(Number)
    text_input.forEach((text, index) => {
        text.value = number_arr[index]; 
    });
}

 //ฟังก์ชันสำหรับแสดงผล ค่าที่ได้จากการสุ่ม
function LotteryResult(e){
    e.preventDefault()
    if([...text_input].some(text_input => text_input.value.trim() == '')){
        alert("Please enter complete information.")
    }else{
        const num_input = Number(Array.from(text_input).join(''))
        const LotteryResult=GetLotteryResult()
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

