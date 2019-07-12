class Pagelist {

    constructor (options) {

        this.elem = options.elem;

        this.pagelistClasses = {
            main: 'pagelist-main',
            section: 'pagelist-section'
        };
        
        this.currentSection = 0;
        this.currentSectionStart = 0;
        this.currentSectionEnd = 0;
        this.sectionsCount = 0;
        this.viewportSections = false;
        this.allowPrev = false;
        this.allowNext = false;

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

        this.scrollToSection(this.currentSection);

        this.checkBoundaries();

        window.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });

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

    checkBoundaries() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        if(this.currentSectionStart >= scrollTop && this.currentSection !== 0) {
            this.allowPrev = true;
        }
        else {
            this.allowPrev = false;
        }

        if(this.currentSectionEnd <= scrollTop + document.documentElement.clientHeight && this.currentSection !== this.sectionsCount - 1) {
            this.allowNext = true;
        }
        else {
            this.allowNext = false;
        }

        return this.allowPrev || this.allowNext;
    }

    handleScroll(e) {
        if(this.checkBoundaries()) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }

        //this.checkBoundaries();

        if(e.deltaY < 0) {
            this.prevSection();
            if(this.checkBoundaries()) {
                this.prevSection();
            }
        }
        else if (e.deltaY > 0) {
            this.nextSection();
            if(this.checkBoundaries()) {
                this.nextSection()
            }
        }
    }

    scrollToSection(number) {
        console.log(this.getTop(this.pagelistSections[number]));
        window.scrollTo(0, this.getTop(this.pagelistSections[number]));
    }

    prevSection() {
        this.currentSection = Math.max(this.currentSection - 1, 0);

        this.currentSectionStart = this.getTop(this.pagelistSections[this.currentSection]);
        this.currentSectionEnd = this.currentSectionStart + this.pagelistSections[this.currentSection].scrollHeight;

        this.scrollToSection(this.currentSection);

        this.checkBoundaries();
    }

    nextSection() {
        this.currentSection = Math.min(this.currentSection + 1, this.sectionsCount - 1);

        this.currentSectionStart = this.getTop(this.pagelistSections[this.currentSection]);
        this.currentSectionEnd = this.currentSectionStart + this.pagelistSections[this.currentSection].scrollHeight;

        this.scrollToSection(this.currentSection);

        this.checkBoundaries();
    }

    // reInit() {
    //
    //     this.slidesToShow = this.baseSlidesToShow;
    //     this.slideMargin = this.baseSlideMargin;
    //
    //     if(this.responsiveOptions.length) {
    //         const optionsCounter = this.responsiveOptions.length;
    //         for(let i = 0; i < optionsCounter; i++) {
    //             if(this.checkResponsive(this.responsiveOptions[i].breakpoint)) {
    //                 this.slidesToShow = this.responsiveOptions[i].slidesToShow;
    //                 this.slideMargin = this.responsiveOptions[i].slideMargin;
    //             }
    //         }
    //     }
    //
    //     const totalVisibleMargins = this.slideMargin * (this.slidesToShow -1);
    //
    //     this.currentWidth = this.elem.offsetWidth || this.elem.getBoundingClientRect().width;
    //
    //     const slideWidth = (this.currentWidth - totalVisibleMargins) / this.slidesToShow;
    //
    //     const slideElems = this.wrapper.children;
    //
    //     //wrap to div
    //
    //     let counter = slideElems.length - 1;
    //
    //     while(counter + 1) {
    //         slideElems[counter].style.width = slideWidth + 'px';
    //         counter--;
    //     }
    //
    //     // const prevArrow = document.createElement('div');
    //     // prevArrow.classList.add('prev-arrow');
    //     // this.elem.appendChild(prevArrow);
    //     //
    //     // const nextArrow = document.createElement('div');
    //     // nextArrow.classList.add('next-arrow');
    //     // this.elem.appendChild(nextArrow);
    //
    //     //this.slidesCount = this.wrapper.children.length;
    //
    //     // for(let i = 0; i < this.slidesCount; i++) {
    //     //     this.slidesOffsets[i] = this.wrapper.children[i].offsetLeft;
    //     // }
    //
    //     this.showSlide(this.currentSlide);
    //
    //     //this.elem.addEventListener('click', this.eventHandler.bind(this));
    // }

    // makeResponsive() {
    //     this.responsiveOptions.forEach(function (options) {
    //
    //     });
    // }

    // checkResponsive(breakpoint) {
    //     return window.innerWidth < breakpoint;
    // }

}