const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createFirework() {
    const particles = [];
    const colors = ['#ff0', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    const numParticles = 100; // Increased number of particles for better effect
    const color = colors[Math.floor(random(0, colors.length))];

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: random(-5, 5),
            vy: random(-5, 5),
            life: random(20, 100),
            color: color
        });
    }

    return particles;
}

let fireworks = createFirework();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((particle, index) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2); // Slightly larger particles
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;

        if (particle.life <= 0) {
            fireworks.splice(index, 1);
        }
    });

    if (fireworks.length === 0) {
        fireworks = createFirework();
    }

    requestAnimationFrame(draw);
}

draw();
