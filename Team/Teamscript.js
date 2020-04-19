$('.team .motion .dot').each(function (color) {
    $(this).click(function () {
      $(this).addClass('activecolor').siblings().removeClass('activecolor');
      $($(this).data('val')).css({
        filter: 'none',
        filter: 'grayscale(0%)',
        borderBottom: '5px solid #f7600e',
        transform: 'scale(1.1)'
      });

      $($(this).data('face')).css('color', '#3b5998')
      $($(this).data('t')).css('color', '#5f666d')
      $($(this).data('twitter')).css('color', '#1da1f2')
      $($(this).data('google')).css('color', '#dd4b39')
      $($(this).data('text')).addClass('tx');

      

      console.log( $($(this).data('val')).parent())

    });

  });