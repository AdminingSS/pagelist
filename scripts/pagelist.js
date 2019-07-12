class Pagelist {

    constructor (options) {

        this.elem = options.elem;

        this.pagelistClasses = {
            main: 'pagelist-main',
            section: 'pagelist-section',
            //slide: 'slider-slide'
        };
        
        this.currentSection = 0;
        this.currentSectionStart = 0;
        this.currentSectionEnd = 0;
        this.sectionsCount = 0;
        this.viewportSections = false;
        this.allowPrev = false;
        this.allowNext = false;
        // this.currentWidth = 0;
        // this.baseSlidesToShow = options.slidesToShow || 1;
        // this.baseSlideMargin = options.slideMargin || 0;
        // this.slidesToShow = options.slidesToShow || 1;
        // this.slideMargin = options.slideMargin || 0;
        // this.leftBlocked = false;
        // this.rightBlocked = false;
        // this.responsiveOptions = options.responsiveOptions || [];
        //this.slidesOffsets = [];

        this.init();
        //this.reInit();
    }

    init() {

        // this.slidesToShow = this.baseSlidesToShow;
        // this.slideMargin = this.baseSlideMargin;
        //
        // if(this.responsiveOptions.length) {
        //     const optionsCounter = this.responsiveOptions.length;
        //     for(let i = 0; i < optionsCounter; i++) {
        //         if(this.checkResponsive(this.responsiveOptions[i].breakpoint)) {
        //             this.slidesToShow = this.responsiveOptions[i].slidesToShow;
        //             this.slideMargin = this.responsiveOptions[i].slideMargin;
        //         }
        //     }
        // }

        // const totalVisibleMargins = this.slideMargin * (this.slidesToShow -1);
        //
        // this.currentWidth = this.elem.offsetWidth || this.elem.getBoundingClientRect().width;
        //
        // const slideWidth = (this.currentWidth - totalVisibleMargins) / this.slidesToShow;

        this.elem.classList.add(this.pagelistClasses.main); //?

        this.pagelistSections = this.elem.querySelectorAll('.' + this.pagelistClasses.section);

        this.sectionsCount = this.pagelistSections.length;

        if(this.viewportSections) {
            this.pagelistSections.forEach(function (element) {
                element.classList.add('section-vh');
            })
        }

        this.currentSectionStart = this.getTop(this.pagelistSections[this.currentSection]);
        this.currentSectionEnd = this.currentSectionStart + this.pagelistSections[this.currentSection].scrollHeight;


        //wrapper = track
        // this.wrapper = document.createElement('div');
        // this.wrapper.classList.add(this.sliderClasses.container);

        // while(slideElems.length) {
        //     slideElems[0].classList.add(this.sliderClasses.slide);
        //     slideElems[0].style.width = slideWidth + 'px';
        //     slideElems[0].style.marginRight = this.slideMargin + 'px';
        //     this.wrapper.appendChild(slideElems[0]);
        // }
        //
        // this.elem.appendChild(this.wrapper);
        //
        // if(this.currentSlide === 0) this.leftBlocked = true;
        // if(this.currentSlide === slideElems.length - 1 ) this.rightBlocked = true;
        //
        // const prevArrow = document.createElement('div');
        // prevArrow.classList.add('prev-arrow');
        // this.elem.appendChild(prevArrow);
        //
        // const nextArrow = document.createElement('div');
        // nextArrow.classList.add('next-arrow');
        // this.elem.appendChild(nextArrow);
        //
        // this.slidesCount = this.wrapper.children.length;

        // for(let i = 0; i < this.slidesCount; i++) {
        //     this.slidesOffsets[i] = this.wrapper.children[i].offsetLeft;
        // }

        // this.showSlide(this.currentSlide);

        window.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });

        // this.elem.addEventListener('click', this.eventHandler.bind(this));
        //
        // window.addEventListener('resize', this.reInit.bind(this));
    }

    getTop(elem) {
        const box = elem.getBoundingClientRect();
        const body = document.body;
        const docEl = document.documentElement;
        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        const clientTop = docEl.clientTop || body.clientTop || 0;
        return box.top + scrollTop - clientTop;
    }

    handleScroll(e) {
        console.log(e.deltaY);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if(e.deltaY < 0 && this.allowPrev) {
            this.prevSection();
        }
        else if (e.deltaY > 0 && this.allowNext) {
            this.nextSection();
        }
    }

    eventHandler (event) {
        let target = event.target;

        while (target != this.elem) {
            if (target.classList.contains('prev-arrow') && !this.leftBlocked) {
                this.prevSlide();
                return;
            }
            if (target.classList.contains('next-arrow') && !this.rightBlocked) {
                this.nextSlide();
                return;
            }
            target = target.parentNode;
        }
    }

    scrollToSection(number) {

        console.log(this.getTop(this.pagelistSections[number]));

        window.scrollTo(0, this.getTop(this.pagelistSections[number]));

        // if(number) {
        //     this.leftBlocked = false;
        // } else {
        //     this.leftBlocked = true;
        // }
        // if(number >= (this.slidesCount - this.slidesToShow)) {
        //     this.rightBlocked = true;
        //     number = this.slidesCount - this.slidesToShow;
        // } else {
        //     this.rightBlocked = false;
        // }
        //
        // const newLeft = -this.wrapper.children[number].offsetLeft;
        // this.wrapper.style.left = newLeft + 'px';

        //const newWidth = this.wrapper.children[number].offsetWidth || this.wrapper.children[number].getBoundingClientRect().width;
        //if (newWidth) this.elem.style.width = newWidth + 'px';
    }

    prevSection() {
        this.currentSection = Math.max(this.currentSection - 1, 0);
        this.scrollToSection(this.currentSection);
    }

    nextSection() {
        this.currentSection = Math.min(this.currentSection + 1, this.sectionsCount - 1);
        this.scrollToSection(this.currentSection);
    }

    reInit() {

        this.slidesToShow = this.baseSlidesToShow;
        this.slideMargin = this.baseSlideMargin;

        if(this.responsiveOptions.length) {
            const optionsCounter = this.responsiveOptions.length;
            for(let i = 0; i < optionsCounter; i++) {
                if(this.checkResponsive(this.responsiveOptions[i].breakpoint)) {
                    this.slidesToShow = this.responsiveOptions[i].slidesToShow;
                    this.slideMargin = this.responsiveOptions[i].slideMargin;
                }
            }
        }

        const totalVisibleMargins = this.slideMargin * (this.slidesToShow -1);

        this.currentWidth = this.elem.offsetWidth || this.elem.getBoundingClientRect().width;

        const slideWidth = (this.currentWidth - totalVisibleMargins) / this.slidesToShow;

        const slideElems = this.wrapper.children;

        //wrap to div

        let counter = slideElems.length - 1;

        while(counter + 1) {
            slideElems[counter].style.width = slideWidth + 'px';
            counter--;
        }

        // const prevArrow = document.createElement('div');
        // prevArrow.classList.add('prev-arrow');
        // this.elem.appendChild(prevArrow);
        //
        // const nextArrow = document.createElement('div');
        // nextArrow.classList.add('next-arrow');
        // this.elem.appendChild(nextArrow);

        //this.slidesCount = this.wrapper.children.length;

        // for(let i = 0; i < this.slidesCount; i++) {
        //     this.slidesOffsets[i] = this.wrapper.children[i].offsetLeft;
        // }

        this.showSlide(this.currentSlide);

        //this.elem.addEventListener('click', this.eventHandler.bind(this));
    }

    // makeResponsive() {
    //     this.responsiveOptions.forEach(function (options) {
    //
    //     });
    // }

    checkResponsive(breakpoint) {
        return window.innerWidth < breakpoint;
    }

}