document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("nodeCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let nodes = [];

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        nodes.push({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            radius: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
        if (nodes.length > 50) nodes.shift();
        draw();
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        for (let i = 1; i < nodes.length; i++) {
            ctx.beginPath();
            ctx.moveTo(nodes[i-1].x, nodes[i-1].y);
            ctx.lineTo(nodes[i].x, nodes[i].y);
            ctx.stroke();
        }
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
        });
    }
});
