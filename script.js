const AUTH_TOKEN = 'KSx2mKACw-gD8V9z8YD1aQtsZaFAsEnl'; // Ganti dengan Auth Token Anda
const BASE_URL = 'https://blynk.cloud/external/api/get?token=' + AUTH_TOKEN;
// Inisialisasi grafik menggunakan Chart.js
const smokeCtx = document.getElementById('smokeChart').getContext('2d');
const tempCtx = document.getElementById('tempChart').getContext('2d');

const smokeChart = new Chart(smokeCtx, {
    type: 'line',
    data: {
        labels: [], // Waktu
        datasets: [{
            label: 'Asap (Smoke)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Waktu' } },
            y: { title: { display: true, text: 'Nilai' } }
        }
    }
});

const tempChart = new Chart(tempCtx, {
    type: 'line',
    data: {
        labels: [], // Waktu
        datasets: [{
            label: 'Suhu (Temperature)',
            data: [],
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.4
        }]
    },
    options: {
        scales: {
            x: { title: { display: true, text: 'Waktu' } },
            y: { title: { display: true, text: 'Nilai (°C)' } }
        }
    }
});

// Fungsi untuk mendapatkan status PIR berdasarkan waktu
function getPirStatus() {
    const now = new Date();
    const currentHour = now.getHours();
    return (currentHour >= 18 || currentHour < 6) ? "Aktif" : "Tidak Aktif";
}

// Fungsi untuk mengambil data dari Blynk
async function fetchData(pin, elementId, chart = null) {
    try {
        const response = await fetch(`${BASE_URL}&pin=${pin}`);
        if (!response.ok) throw new Error(`Failed to fetch data for pin ${pin}`);
        const data = await response.text();

        // Perbarui teks
        document.getElementById(elementId).innerText = data;

        // Perbarui grafik jika ada
        if (chart) {
            const time = new Date().toLocaleTimeString();
            chart.data.labels.push(time);
            chart.data.datasets[0].data.push(parseFloat(data));

            // Batasi jumlah data dalam grafik ke 4 titik waktu
            if (chart.data.labels.length > 4) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }

            chart.update();
        }
    } catch (error) {
        console.error(error);
        document.getElementById('error-message').innerText = error.message;
    }
}

// Fungsi untuk memperbarui semua data
function updateData() {
    fetchData('V3', 'smoke', smokeChart);       // Data asap (smoke)
    fetchData('V4', 'temperature', tempChart);  // Data suhu (temperature)

    // Update status PIR berdasarkan waktu
    document.getElementById('pir-status').innerText = getPirStatus();
}

// Tombol toggle untuk Dark Mode menggunakan switch
const darkModeSwitch = document.getElementById('darkModeSwitch');
darkModeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
});

// Jalankan pembaruan data setiap 2 detik
setInterval(updateData, 2000);
updateData(); // Update data pertama kali saat halaman dimuat
