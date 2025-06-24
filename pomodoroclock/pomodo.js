
        let sessionLength = 25;
        let breakLength = 5;
       // let timeLeft = sessionLength * 60;
        let isRunning = false;
        let isSession = true;
        let sessionCount = 1; // Added session counter
        let timerInterval;
    
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    
        function toggleButtons(state) {
            document.getElementById("increase-session").disabled = state;
            document.getElementById("decrease-session").disabled = state;
            document.getElementById("increase-break").disabled = state;
            document.getElementById("decrease-break").disabled = state;
        }
    
        function startTimer() {
            if (isRunning) return;
            isRunning = true;
            toggleButtons(true);
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    isSession = !isSession;
                    if (isSession) {
                        sessionCount++; // Increment session count when a new session starts
                    }
                    timeLeft = (isSession ? sessionLength : breakLength) * 60;
                    document.getElementById("session-label").innerText = isSession ? `Session ${sessionCount}` : "Break";
                }
            }, 1000);
        }
        
        function pauseTimer() {
            clearInterval(timerInterval);
            isRunning = false;
        }
    
        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            isSession = true;
            sessionCount = 1; 
            sessionLength = 25;
            breakLength = 5;
            timeLeft = sessionLength * 60;
            document.getElementById("session-length").innerText = "25";
            document.getElementById("break-length").innerText = "5";
            document.getElementById("session-label").innerText = "Session 1";
            updateDisplay();
            toggleButtons(false);
        }
    
        document.getElementById("increase-session").addEventListener("click", () => {
            if (!isRunning) {
                sessionLength++;
                document.getElementById("session-length").innerText = sessionLength;
                timeLeft = sessionLength * 60;
                updateDisplay();
            }
        });
        
        document.getElementById("decrease-session").addEventListener("click", () => {
            if (!isRunning && sessionLength > 1) {
                sessionLength--;
                document.getElementById("session-length").innerText = sessionLength;
                timeLeft = sessionLength * 60;
                updateDisplay();
            }
        });
    
        document.getElementById("increase-break").addEventListener("click", () => {
            if (!isRunning) {
                breakLength++;
                document.getElementById("break-length").innerText = breakLength;
            }
        });
        
        document.getElementById("decrease-break").addEventListener("click", () => {
            if (!isRunning && breakLength > 1) {
                breakLength--;
                document.getElementById("break-length").innerText = breakLength;
            }
        }); 
    
        document.getElementById("start").addEventListener("click", startTimer);
        document.getElementById("pause").addEventListener("click", pauseTimer);
        document.getElementById("reset").addEventListener("click", resetTimer);
    
        updateDisplay();