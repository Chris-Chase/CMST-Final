const hamburger = document.querySelector('.hamburger');
        const navList = document.querySelector('.nav-list');

        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        document.getElementById('cipherType').addEventListener('change', function() {
            const caesarInput = document.getElementById('caesarInput');
            const vigenereInput = document.getElementById('vigenereInput');
            if (this.value === 'caesar') {
                caesarInput.style.display = 'block';
                vigenereInput.style.display = 'none';
            } else {
                caesarInput.style.display = 'none';
                vigenereInput.style.display = 'block';
            }
        });
        
        function caesarCipher(text, shift, encode = true) {
            return text
                .split('')
                .map(char => {
                    if (char.match(/[a-z]/i)) {
                        const code = char.charCodeAt(0);
                        let shiftAmount = encode ? shift : -shift;
                        if (code >= 65 && code <= 90) {
                            return String.fromCharCode(((code - 65 + shiftAmount + 26) % 26) + 65);
                        } else if (code >= 97 && code <= 122) {
                            return String.fromCharCode(((code - 97 + shiftAmount + 26) % 26) + 97);
                        }
                    }
                    return char;
                })
                .join('');
        }
        
        function vigenereChipher(text, key, encode = true) {
            let result = '';
            let keyIndex = 0;
            
            for (let i = 0; i < text.length; i++) {
                let char = text[i];
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt(0);
                    const shift = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
                    let newCode;
                    
                    if (code >= 65 && code <= 90) {
                        newCode = encode 
                            ? ((code - 65 + shift) % 26) + 65
                            : ((code - 65 - shift + 26) % 26) + 65;
                    } else if (code >= 97 && code <= 122) {
                        newCode = encode
                            ? ((code - 97 + shift) % 26) + 97
                            : ((code - 97 - shift + 26) % 26) + 97;
                    }
                    
                    result += String.fromCharCode(newCode);
                    keyIndex++;
                } else {
                    result += char;
                }
            }
            
            return result;
        }
        
        function encode() {
            const input = document.getElementById('input').value;
            const cipherType = document.getElementById('cipherType').value;
            let output;
        
            if (cipherType === 'caesar') {
                const shift = parseInt(document.getElementById('shift').value);
                output = caesarCipher(input, shift);
            } else {
                const key = document.getElementById('key').value;
                output = vigenereChipher(input, key);
            }
        
            document.getElementById('output').value = output;
        }
        
        function decode() {
            const input = document.getElementById('input').value;
            const cipherType = document.getElementById('cipherType').value;
            let output;
        
            if (cipherType === 'caesar') {
                const shift = parseInt(document.getElementById('shift').value);
                output = caesarCipher(input, shift, false);
            } else {
                const key = document.getElementById('key').value;
                output = vigenereChipher(input, key, false);
            }
        
            document.getElementById('output').value = output;
        }       