const http = require("http");

// ==================================================
// CONFIGURATION
// ==================================================

const PORT = process.env.PORT || 10000;

const DAVID_BOT_URL =
    "https://david-bot-l5up.onrender.com/heartbeat";

const HEARTBEAT_DELAY = 5000;

// ==================================================
// SERVEUR HTTP
// ==================================================

const server = http.createServer((req, res) => {

    // ==================================================
    // HEARTBEAT REÇU
    // ==================================================

    if (req.url === "/heartbeat") {

        console.log(
            "💓 Heartbeat reçu de DAVID BOT"
        );

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            status: "ok",
            heartbeat: true,
            from: "HEARTBEAT-SERVER"
        }));

        console.log(
            `⏱️ Prochain heartbeat vers DAVID BOT dans ${HEARTBEAT_DELAY / 1000}s`
        );

        setTimeout(() => {
            sendHeartbeatToDavidBot();
        }, HEARTBEAT_DELAY);

        return;
    }

    // ==================================================
    // PAGE PRINCIPALE
    // ==================================================

    if (req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(
            "💓 DAVID BOT HEARTBEAT SERVER est en ligne !"
        );

        return;
    }

    // ==================================================
    // 404
    // ==================================================

    res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("404 - Not Found");
});

// ==================================================
// ENVOI HEARTBEAT → DAVID BOT
// ==================================================

async function sendHeartbeatToDavidBot() {

    try {

        console.log(
            "💓 HEARTBEAT SERVER → DAVID BOT"
        );

        const response = await fetch(
            DAVID_BOT_URL
        );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const data = await response.json();

        console.log(
            "✅ DAVID BOT a répondu :",
            data.status
        );

    } catch (error) {

        console.error(
            "❌ Erreur heartbeat → DAVID BOT :",
            error.message
        );

        console.log(
            "🔄 Nouvelle tentative dans 30 secondes..."
        );

        setTimeout(() => {
            sendHeartbeatToDavidBot();
        }, 30000);
    }
}

// ==================================================
// DÉMARRAGE SERVEUR
// ==================================================

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `💓 HEARTBEAT SERVER démarré sur le port ${PORT}`
        );

        console.log(
            `🌐 Port : ${PORT}`
        );

        console.log(
            "⏱️ Premier heartbeat vers DAVID BOT dans 5 secondes..."
        );

        // Premier heartbeat
        setTimeout(() => {
            sendHeartbeatToDavidBot();
        }, 500);

    }
);
