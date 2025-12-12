const analyzeBtn = document.getElementById("analyzeBtn");
const loader = document.getElementById("loader");
const results = document.getElementById("results");
const output = document.getElementById("analysisOutput");
const gaugeFill = document.getElementById("gaugeFill");
const percentageLabel = document.getElementById("percentageLabel");

analyzeBtn.addEventListener("click", async () => {
    const text = document.getElementById("textInput").value.trim();
    if (!text) return alert("Colle un texte à analyser.");

    loader.classList.remove("hidden");
    results.classList.add("hidden");

    try {
        const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await res.json();

        if (data.error) {
            alert("Erreur : " + data.error);
            loader.classList.add("hidden");
            return;
        }

        // Affichage texte analyse
        output.textContent = data.commentaire;

        // Mise à jour jauge
        updateGauge(data.score);

        loader.classList.add("hidden");
        results.classList.remove("hidden");

    } catch (e) {
        console.error(e);
        alert("Erreur serveur.");
        loader.classList.add("hidden");
    }
});

function updateGauge(score) {
    const s = Math.min(Math.max(score, 0), 100);

    gaugeFill.style.width = s + "%";

    const r = Math.floor((s / 100) * 255);
    const g = Math.floor(255 - (s / 100) * 255);
    gaugeFill.style.backgroundColor = `rgb(${r}, ${g}, 0)`;

    percentageLabel.textContent = s + "% de tonalité connotée";
}
