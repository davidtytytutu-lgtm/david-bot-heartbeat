const http = require("http");

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {

    // ==========================================
    // HEARTBEAT REÇU
    // ==========================================

    if (req.url === "/heartbeat") {

        console.log("💓 Heartbeat reçu de DAVID BOT");

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            status: "ok",
            heartbeat: true,
            from: "DAVID-BOT-HEARTBEAT"
        }));

        return;
    }

    // ==========================================
    // PAGE PRINCIPALE
    // ==========================================

    if (req.url === "/") {

        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });

        res.end(
            "💓 DAVID BOT HEARTBEAT SERVER est en ligne !"
        );

        return;
    }

    // ==========================================
    // 404
    // ==========================================

    res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("404 - Not Found");

});


// ==========================================
// DÉMARRAGE
// ==========================================

server.listen(PORT, "0.0.0.0", () => {

    console.log(
        `💓 HEARTBEAT SERVER démarré sur le port ${PORT}`
    );

    console.log(
        `🌐 Port Render : ${PORT}`
    );

});
