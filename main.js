const track = document.querySelector('.carosel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carosel_button--right') ;
const prevButton = document.querySelector('.carosel_button--left');
const dotsNav = document.querySelector('.carosel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;
//console.log(slideWidth);

//arrange slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth *index + 'px';
};
slides.forEach(setSlidePosition);

const moveToslide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
    currentSlide.classList.remove('current_slide');
    targetSlide.classList.add('current_slide');
}

const updateDots = (currentDot,targetDot) => {
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}

const hideShowArrows = (targetIndex,slides,nextButton,prevButton) => {
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }else if (targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//when i click left move slide to the left 
prevButton.addEventListener('click',(e)=>{
    const currentSlide = track.querySelector('.current_slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const prevDot = currentDot.previousElementSibling;
    const nextIndex = slides.findIndex(slide => slide === prevSlide);

    moveToslide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(nextIndex, slides,nextButton,prevButton);

})

//when i click right move slide to the right 
nextButton.addEventListener('click',(e) => {
    const currentSlide = track.querySelector('.current_slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToslide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(nextIndex, slides,nextButton,prevButton);

});


//when i click the nav indicator move to that slide

dotsNav.addEventListener('click',(e) => {
    //what indicator we clicked on 
    const targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentSlide = track.querySelector('.current_slide');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToslide(track, currentSlide, targetSlide);
    updateDots(currentDot,targetDot);  
    hideShowArrows(targetIndex, slides,nextButton,prevButton);


});