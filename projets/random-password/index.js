const dataLowercase = "qwertyuiopasdfghjklzxcvbnm";
const dataUppercase = dataLowercase.toUpperCase();
const dataNumbers = "0123456789";
const dataSymbols = "`~!@#$%^&*()))_+-=[]{};:'\",.<>/?";
const rangeValue = document.getElementById('password-length');
const passwordOutput = document.getElementById("password-output");

function generatePassword() {
    let data = [];
    let password = "";
    
    if (lowecase.checked) data.push(...dataLowercase);
    if (uppercase.checked) data.push(...dataUppercase);
    if (number.checked) data.push(...dataNumbers);
    if (symbols.checked) data.push(...dataSymbols);
    
    if (data.length === 0) {
        alert("Veuillez selectionner des criteres");
        return;
    }
        
    for (i = 0; i < rangeValue.value; i++) {
            password += data[Math.floor(Math.random() * data.length)];
    }
    passwordOutput.value = password;
    
    passwordOutput.select();
    document.execCommand("copy");
    
    generateButton.textContent = "copie";
    
    setTimeout(() => {
        generateButton.textContent = "generer mot de passe";
    }, 2000);
}

generateButton.addEventListener('click', generatePassword);