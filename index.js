
function LotteryResult(){
    const LotteryResult=GetLotteryResult()
}

//ฟังก์ชันสำหรับสร้างจำนวนชุดของหวยว่ามีกี่ชุด p1, p2, p3, p4, p5, pdf3, pdl3, pdl2
const GetLotteryResult = () => {
    const number_prize = [1, 5, 10, 50,100, 2, 2, 2, 1];
    const prizeTypes = ['prize_1', 'prize_2', 'prize_3', 'prize_4', 'prize_5', 'prize_1_same', 'prize_3_d_first', 'prize_3_d_last', 'prize_2_d_last'];
  
    return prizeTypes.reduce((acc, prize, index) => {
      acc[prize] = Array.from({ length: number_prize[index] }, generateRandomNumber);
      return acc;
    }, {});
};

//ฟังก์ชันสำหรับสุ่มตัวเลขหวย 6 ตัว
const generateRandomNumber = () => Math.floor(Math.random() * 900000) + 100000;
