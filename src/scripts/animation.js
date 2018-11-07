function animate(draw, duration, callback) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        } else if (callback) {
            callback();
        }
    });
}

function slideIn(element, distance, duration, displayTo = 'flex') {
    element.style.opacity = 0;
    element.style.display = displayTo;
    animate((timePassed) => {
        const progress = timePassed / duration;
        element.style.opacity = progress;
        element.style.left = `${- distance + distance * progress}px`;
    }, duration);
}

function slideOut(element, distance, duration) {
    animate((timePassed) => {
        const progress = timePassed / duration;
        element.style.opacity = 1 - progress;
        element.style.left = `${distance * progress}px`;
    }, duration, () => { element.style.display = 'none'; });
}