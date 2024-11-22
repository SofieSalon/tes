<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monitoring System</title>
    <link rel="stylesheet" href="style.css"> <!-- Menghubungkan file CSS -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
    <header>
        <!-- Navbar -->
        <?php include 'navbar.php'; ?>

        <h1>Monitoring System</h1>
        <p>Live Data from Blynk</p>
    </header>

    <div class="data-container" id="monitoring">
        <table class="data-table">
            <thead>
                <tr>
                    <th>Sensor</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Asap (Smoke)</td>
                    <td><span id="smoke">Loading...</span></td>
                </tr>
                <tr>
                    <td>Suhu (Temperature)</td>
                    <td><span id="temperature">Loading...</span> °C</td>
                </tr>
                <tr>
                    <td>Flame Sensor</td>
                    <td>Aktif</td>
                </tr>
                <tr>
                    <td>PIR Sensor Status</td>
                    <td><span id="pir-status">Loading...</span></td>
                </tr>
            </tbody>
        </table>
        <p id="error-message" class="error"></p>
    </div>

    <div class="chart-container">
        <canvas id="smokeChart"></canvas>
        <canvas id="tempChart"></canvas>
    </div>

    <script src="script.js"></script> <!-- Menghubungkan file JavaScript -->
</body>

</html>