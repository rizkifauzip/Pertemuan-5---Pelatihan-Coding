const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const dirPath = `./data`;
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
};   
const dataPath = `data/contacts.json`;
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, `[]`, `utf-8`)
};

function validateGmail(gmail) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(gmail);
  }
function validatePhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/; // Validasi nomor telepon dengan tepat 10 digit
    return phoneRegex.test(phone);
  }
  
    function getUserInput() {
rl.question('what is your name?',(nama)=> {
    rl.question('what is your number phone?',(phone)=> {
        if (!validatePhoneNumber(phone)) {
            console.log('Nomor telepon tidak valid. Harus terdiri dari 10 digit angka.!!!');
            getUserInput();
            return;
        };
        rl.question('what is your gmail?',(gmail)=> {
            if(!validateGmail (gmail)){
                console.log('Alamat Gmail tidak sesuai!,Silahkan mengisi ulang tambahkan @gmail.com')
                getUserInput();
                return;
            };
            
    console.log(`your name is ${nama} ,`, `your number is ${phone} ,`, `your gmail is ${gmail},`);

simpanContact(nama, gmail, phone);
    
rl.close();
        });
    });
});

const simpanContact = (nama, gmail, phone) =>{
    const contact = {nama, gmail, phone};
    const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
    const contacts = JSON.parse(file);
            
    contacts.push(contact);
    fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts));
}

};
getUserInput();