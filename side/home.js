$(document).ready(function () {
    var hidden = true;
    $(".chat-header").on("click", function (e) {
        if (hidden) {
            console.log('doing it');
            $(".chat-content").animate({
                width: '300px',
                speed: 2000
            }, () => {
                $(".event-text").fadeIn("slow");
                $(".header").animate({
                    width: '300px',
                    speed: 2000
                });
            });
        } else {
            $(".event-text").fadeOut("fast", () => {
                $(".chat-content").animate({
                    width: '0px',
                    speed: 2000
                });
            });
        }
        hidden = !hidden;
    });
});