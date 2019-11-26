$('#list_0').toggleClass('active');
$('#cinner_0').toggleClass('active');

function activeoff(){
    $('.list-group-item').removeClass('active');
    $('.carousel-inner > .carousel-item').removeClass('active');
}
function activeon(num){
    $('#list_'+num).toggleClass('active');
    $('#cinner_'+num).toggleClass('active');
}

$('.list-group-item').on('click', function() {
    activeoff();
    var id = $(this).attr("id");
    var num = id.substr(id.length - 1);
    activeon(num);
});

$('.carousel-inner > .carousel-item').on('click', function() {
    activeoff();
    var id = $(this).attr("id");
    var num = id.substr(id.length - 1);
    activeon(num);
});
$('.carousel-inner > .carousel-item').hover(
    function(){
        $('.carousel-inner > .carousel-item p').css('visibility', 'visible');
    },
    function(){
        $('.carousel-inner > .carousel-item p').css('visibility', 'hidden');
    }
);

$('#myCarousel').on('slid.bs.carousel', function () {
    $('.list-group-item').removeClass('active');
});

$('#myCarousel').on('slid.bs.carousel', function () {
    var num = $('div.active').index();
    $('#list_'+num).toggleClass('active');    
})


