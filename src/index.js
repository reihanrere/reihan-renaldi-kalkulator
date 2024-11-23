const moon = document.querySelector("#moon")
const body = document.querySelector("body")
const formInput = document.querySelector("#formInput");

moon.addEventListener("click", ()=>{
    body.classList.toggle("dark")
});

function keyInput(key){
    switch (key) {
        case 'clear':
            formInput.value = "";
        break;
        case '7':
            formInput.value += key;
            break;
        case '8':
            formInput.value += key;
            break;
        case '9':
            formInput.value += key;
            break;
        case '*':
            formInput.value += 'x';
            break;
        case '4':
            formInput.value += key;
            break;
        case '5':
            formInput.value += key;
            break;
        case '6':
            formInput.value += key;
            break;
        case '-':
            formInput.value += key;
            break;
        case '1':
            formInput.value += key;
            break;
        case '2':
            formInput.value += key;
            break;
        case '3':
            formInput.value += key;
            break;
        case '+':
            formInput.value += key;
            break;
        case '0':
            formInput.value += key;
            break;
        case '=':
            const input = formInput.value;
            const ekspresi = input.match(/\d+|\D+/g);
            const hasil = hitung(ekspresi);
            formInput.value = hasil;
            break;
        case '%':
            formInput.value += key;
            break;
        case '/':
            formInput.value += key;
            break;
        case 'backSpace':
            let str = removeCharacter(formInput.value);
            formInput.value = str;
            break;
    }
}

function removeCharacter(str) {
    let n = str.length;
    let newString = "";
    for (let i = 0; i < n - 1; i++) {
        newString += str[i];
    }
    return newString;
}

function hitung(ekspresi) {
    ekspresi = ekspresi.map((item, index, arr) => {
        if (item.match(/^[x\/%+-]$/) && arr[index + 1]?.match(/^[x\/%+-]$/)) {
            return item + arr[index + 1];
        }
        return item;
    }).filter((item, index, arr) => {
        return !(item.match(/^[x\/%+-]$/) && arr[index - 1]?.match(/^[x\/%+-]$/));
    });

    let i = 1;
    while (i < ekspresi.length) {
        if (ekspresi[i] === 'x' || ekspresi[i] === '/') {
            let hasil;
            if (ekspresi[i] === 'x') {
                hasil = Number(ekspresi[i - 1]) * Number(ekspresi[i + 1]);
            } else {
                hasil = Number(ekspresi[i - 1]) / Number(ekspresi[i + 1]);
            }
            ekspresi.splice(i - 1, 3, hasil.toString());
        } else {
            i += 2;
        }
    }

    i = 1;
    while (i < ekspresi.length) {
        if (ekspresi[i] === '+' || ekspresi[i] === '-') {
            let hasil;
            if (ekspresi[i] === '+') {
                hasil = Number(ekspresi[i - 1]) + Number(ekspresi[i + 1]);
            } else {
                hasil = Number(ekspresi[i - 1]) - Number(ekspresi[i + 1]);
            }
            ekspresi.splice(i - 1, 3, hasil.toString());
        } else {
            i += 2;
        }
    }

    i = 1;
    while (i < ekspresi.length) {
        if (ekspresi[i] === '%') {
            const hasil = Number(ekspresi[i - 1]) % Number(ekspresi[i + 1]);
            ekspresi.splice(i - 1, 3, hasil.toString());
        } else {
            i += 2;
        }
    }

    return Number(ekspresi[0]);
}