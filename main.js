// 轮播图逻辑
class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        // 绑定控制按钮
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());
        
        // 启动自动轮播
        this.startSlideShow();
    }
    
    showSlide(index) {
        // 移除当前活动slide的active类
        this.slides[this.currentSlide].classList.remove('active');
        
        // 更新当前slide索引
        this.currentSlide = (index + this.slides.length) % this.slides.length;
        
        // 为新的当前slide添加active类
        this.slides[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    startSlideShow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
        this.slideInterval = setInterval(() => this.nextSlide(), 8000);
    }
}

// 移动端菜单逻辑
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.isOpen = false;
        
        // 绑定点击事件
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navLinks.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        this.hamburger.classList.add('active');
        this.navLinks.classList.add('active');
    }
    
    closeMenu() {
        this.isOpen = false;
        this.hamburger.classList.remove('active');
        this.navLinks.classList.remove('active');
    }
}

// 模态窗口控制
class Modal {
    constructor() {
        this.aboutModal = document.getElementById('aboutModal');
        this.contactModal = document.getElementById('contactModal');
        this.wechatModal = document.getElementById('wechatModal');
        this.aboutBtn = document.querySelector('.about-btn');
        this.contactBtn = document.querySelector('.contact-btn');
        this.wechatBtn = document.getElementById('wechatBtn');
        
        // 获取所有关闭按钮
        const closeButtons = document.querySelectorAll('.close-modal');
        
        // 绑定事件
        this.aboutBtn.addEventListener('click', () => this.openModal(this.aboutModal));
        this.contactBtn.addEventListener('click', () => this.openModal(this.contactModal));
        this.wechatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openModal(this.wechatModal);
        });
        
        // 为所有关闭按钮绑定事件
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });
        
        // 点击模态窗口外部关闭
        [this.aboutModal, this.contactModal, this.wechatModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
    }
    
    openModal(modal) {
        // 关闭所有打开的模态窗口
        this.closeModal();
        // 打开指定的模态窗口
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        // 关闭所有模态窗口
        [this.aboutModal, this.contactModal, this.wechatModal].forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = '';
    }
}

// 图片加载处理
class ImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img');
        this.loadImages();
    }
    
    loadImages() {
        this.images.forEach(img => {
            if (img.complete) {
                this.markAsLoaded(img);
            } else {
                img.addEventListener('load', () => this.markAsLoaded(img));
                img.addEventListener('error', () => this.handleError(img));
            }
        });
    }
    
    markAsLoaded(img) {
        img.setAttribute('loaded', '');
    }
    
    handleError(img) {
        img.style.background = '#f0f0f0';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.color = '#666';
        img.style.fontSize = '14px';
        img.style.padding = '20px';
        img.style.textAlign = 'center';
        img.innerHTML = '图片加载失败';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
    new MobileMenu();
    new Modal();
    new ImageLoader();
}); 