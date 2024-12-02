import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});

// src/main.ts
const correctPin = "2706"; // PIN yang benar
let enteredPin = ""; // PIN yang dimasukkan oleh pengguna

const dots = document.querySelectorAll(".dot");
const errorMessage = document.getElementById("error-message") as HTMLElement; // Ambil elemen pesan kesalahan

const buttons = document.querySelectorAll(".pin-button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = (button as HTMLButtonElement).dataset.value;
        if (value) {
            enteredPin += value; // Tambahkan angka ke PIN yang dimasukkan

            // Update titik
            const filledDots = Array.from(dots);
            filledDots.forEach((dot, index) => {
                if (index < enteredPin.length) {
                    dot.classList.add('filled'); // Mengisi titik
                } else {
                    dot.classList.remove('filled'); // Mengosongkan titik jika PIN tidak cukup panjang
                }
            });

            // Cek jika panjang PIN sudah sesuai
            if (enteredPin.length === correctPin.length) {
                if (enteredPin === correctPin) {
                    errorMessage.style.display = 'none'; // Sembunyikan pesan kesalahan
                    // Arahkan pengguna ke halaman baru setelah login berhasil
                    window.location.href = 'main.html'; // Ganti dengan URL halaman yang diinginkan
                } else {
                    errorMessage.innerText = "when is ur birthday ? 27 June right ?"; // Tampilkan pesan kesalahan
                    errorMessage.style.display = 'block'; // Tampilkan pesan kesalahan
                    // Reset PIN setelah kesalahan
                    enteredPin = "";
                    filledDots.forEach(dot => dot.classList.remove('filled')); // Reset titik
                }
            }
        }
    });
});


