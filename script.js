const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-Indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*",
    
}

const GeneratePassword = () => {
       let staticPassword = "",
       randomPassword="",
       excludeDuplicate = false,
       passLength = lengthSlider.value;

       options.forEach(option => {
        if(option.checked) {
            if(option.id !== "exc-duplicate" && option.id !=="space"){
                staticPassword += characters[option.id];
            }else if(option.id === "spaces"){
                staticPassword += ` ${staticPassword} `;

            } else {

                excludeDuplicate = true;

            }
            }
        });
        for (let i = 0; i < passLength; i++) {
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
            if(excludeDuplicate) {
                !randomPassword.includes(randomChar || randomChar == " " ? 
                randomPassword += randomChar : i--)

            } else {
                randomPassword +=randomChar;
            }
        }
        passwordInput.value = randomPassword;
       
    }

    const updatePassIndicator = () => {
        passIndicator.id = lengthSlider.value <=8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";

    }
    const updateSlider = () => {
        document.querySelector(".pass-length span").innerText = lengthSlider.value;
        GeneratePassword();
        updatePassIndicator();

    }
    updateSlider();
    
    const copyPassword = () => {
        navigator.clipboard.writeText(passwordInput.value);
        copyIcon.innerText = "check";
        copyIcon.Style.color = "#4285f4";
        setTimeout(() => {
            copyIcon.innerText ="copy_all";
            copyIcon.style.color ="#707070";
                }, 15000)
    }

    copyIcon.addEventListener("click", copyPassword);
    lengthSlider.addEventListener("input", updateSlider);
    generateBtn.addEventListener("click", GeneratePassword);
    
