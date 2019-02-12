/**
 *
 *
 */
function RippleEffect(element){
    this.element = element;
    this.element.addEventListener('click', this.run.bind(this), false);
}
RippleEffect.prototype = {
    run: function(event){
        var ripplerContainer = this.element.querySelector('.ripple-container');
        var offsetInfo = this.element.getBoundingClientRect();
        if(ripplerContainer) {
            ripplerContainer.remove();
        }
        var rippleContainer = document.createElement('div');
        rippleContainer.style.position = 'fixed';
        rippleContainer.style.zIndex = -1;
        rippleContainer.style.width = offsetInfo.width + 'px';
        rippleContainer.style.left = offsetInfo.left + 'px';
        rippleContainer.style.top = offsetInfo.top + 'px';
        rippleContainer.style.height = offsetInfo.height + 'px';
        rippleContainer.className = 'ripple-container';
        // rippleContainer.style.overflow = 'hidden';
        this.element.appendChild(rippleContainer);

        var circleD = offsetInfo.width * 2;

        var ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = circleD -20 + 'px';
        ripple.style.height = circleD -20 + 'px';
        ripple.style.borderRadius = '500px';
        ripple.style.left = - circleD/4 + 10 + 'px';
        ripple.style.top =  - circleD/4 + 10 + 'px';
        ripple.className = 'ripple';
        rippleContainer.appendChild(ripple);
        ripple.addEventListener('animationend', function(){
            rippleContainer.remove();
        }.bind(this), false);
    }
};