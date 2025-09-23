// 等待整個 HTML 文件都載入完成後再執行
document.addEventListener('DOMContentLoaded', () => {

    // 獲取遊戲中需要用到的所有 HTML 元素
    const choiceButtons = document.querySelectorAll('.choice-btn');
    const playerChoiceSpan = document.getElementById('player-choice');
    const computerChoiceSpan = document.getElementById('computer-choice');
    const resultTextSpan = document.getElementById('result-text');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');
    const resetBtn = document.getElementById('reset-btn');

    // 初始化分數
    let playerScore = 0;
    let computerScore = 0;
    const choices = ['rock', 'paper', 'scissors'];
    const choiceMap = {
        'rock': '✊ 石頭',
        'paper': '✋ 布',
        'scissors': '✌️ 剪刀'
    };

    // 為每個選擇按鈕添加點擊事件監聽器
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.dataset.choice;
            const computerChoice = getComputerChoice();
            playRound(playerChoice, computerChoice);
        });
    });
    
    // 重置按鈕的事件監聽器
    resetBtn.addEventListener('click', resetGame);

    // 電腦隨機選擇一個選項
    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // 進行一局遊戲
    function playRound(player, computer) {
        let result = '';
        let resultClass = '';

        if (player === computer) {
            result = '平手！';
            resultClass = 'draw';
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            result = '你贏了！🎉';
            resultClass = 'win';
            playerScore++;
        } else {
            result = '你輸了...';
            resultClass = 'lose';
            computerScore++;
        }

        updateUI(player, computer, result, resultClass);
    }

    // 更新使用者介面 (UI)
    function updateUI(player, computer, result, resultClass) {
        playerChoiceSpan.textContent = choiceMap[player];
        computerChoiceSpan.textContent = choiceMap[computer];
        
        resultTextSpan.textContent = result;
        resultTextSpan.className = resultClass; // 清除舊 class 並設置新 class

        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
    }
    
    // 重置遊戲分數和顯示
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerChoiceSpan.textContent = '---';
        computerChoiceSpan.textContent = '---';
        resultTextSpan.textContent = '---';
        resultTextSpan.className = '';
        playerScoreSpan.textContent = '0';
        computerScoreSpan.textContent = '0';
    }
});
