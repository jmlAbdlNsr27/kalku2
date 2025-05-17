let chart;

function hitungBEP() {
    const biayaTetap = parseFloat(document.getElementById("biayaTetap").value);
    const biayaVariabel = parseFloat(document.getElementById("biayaVariabel").value);
    const jumlahUnit = parseFloat(document.getElementById("jumlahUnit").value);
    const labaPersen = parseFloat(document.getElementById("labaPersen").value);

    if (isNaN(biayaTetap) || isNaN(biayaVariabel) || isNaN(jumlahUnit) || isNaN(labaPersen)) {
        alert("Mohon isi semua input dengan angka yang valid.");
        return;
    }

    const totalBiaya = biayaTetap + (biayaVariabel * jumlahUnit);
    const targetLaba = (labaPersen / 100) * totalBiaya;
    const totalTargetPendapatan = totalBiaya + targetLaba;
    const hargaJualPerUnit = totalTargetPendapatan / jumlahUnit;
    const jumlahProfit = totalTargetPendapatan - totalBiaya;

    const bepUnit = Math.ceil(biayaTetap / (hargaJualPerUnit - biayaVariabel));

    document.getElementById("hargaJual").textContent = hargaJualPerUnit.toFixed(2);
    document.getElementById("bep").textContent = bepUnit;
    document.getElementById("jumlahProfit").textContent = jumlahProfit.toFixed(2);

    tampilkanGrafik(biayaTetap, biayaVariabel, hargaJualPerUnit, jumlahUnit, bepUnit);
}


function tampilkanGrafik(biayaTetap, biayaVariabel, hargaJualPerUnit, jumlahUnit, bepUnit) {
    const unitData = Array.from({
        length: jumlahUnit + 1
    }, (_, i) => i);
    const totalBiayaData = unitData.map(unit => biayaTetap + (biayaVariabel * unit));
    const totalPendapatanData = unitData.map(unit => hargaJualPerUnit * unit);

    const ctx = document.getElementById("grafikBEP").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: unitData,
            datasets: [{
                    label: 'Total Biaya',
                    data: totalBiayaData,
                    borderColor: 'red',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Total Pendapatan',
                    data: totalPendapatanData,
                    borderColor: 'green',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Grafik Break Even Point (BEP)',
                    font: {
                        size: 18
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Unit Terjual'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rupiah (Rp)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}