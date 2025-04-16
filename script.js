document.getElementById('cake').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hidden');
    startConfetti();
  });
  
  document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });
  
  // Confetti effect
  function startConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff', '#3333ff', '#00cc66', '#ffcc00'];
  
    const canvas = document.getElementById('confetti-canvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    let particles = [];
  
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 50 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }
  
    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        context.beginPath();
        context.lineWidth = p.r;
        context.strokeStyle = p.color;
        context.moveTo(p.x + p.tilt + p.r / 2, p.y);
        context.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        context.stroke();
      });
      update();
    }
  
    function update() {
      let now = Date.now();
      particles.forEach(p => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle - (p.r / 3));
      });
      if (now < animationEnd) {
        requestAnimationFrame(draw);
      }
    }
  
    draw();
  }
  