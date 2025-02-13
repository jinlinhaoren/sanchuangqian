class InkAnimation {
    constructor() {
        this.canvas = document.getElementById('inkAnimation');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 50;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        this.animate();
        this.generateParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    generateParticles() {
        if (this.particles.length < this.maxParticles) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 100 + 50,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                alpha: Math.random() * 0.5,
                color: `rgba(45, 52, 54, ${Math.random() * 0.1})`
            });
        }
        
        setTimeout(() => this.generateParticles(), 1000);
    }
    
    drawParticle(p) {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();
        
        // 添加水墨效果
        const gradient = this.ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.size
        );
        gradient.addColorStop(0, 'rgba(45, 52, 54, 0.1)');
        gradient.addColorStop(1, 'rgba(45, 52, 54, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.002;
            p.size += 0.2;
            
            if (p.alpha <= 0) {
                this.particles.splice(index, 1);
            } else {
                this.drawParticle(p);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
} 