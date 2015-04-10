$(document).ready(function(){

        $('.slide-block-btn').on('click',function(){
            $(this).parent().find('.slide-block-content').stop().slideToggle();
            $(this).parent().find('.arrow-nav').toggleClass('active');
        });

    $(document).on('click','.realty-nav-btn',function(){
        $('.realty-nav-btn').removeClass('active');
        $(this).addClass('active');
    });


});



