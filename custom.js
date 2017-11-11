(function($) {
    $.fn.flash_message = function(options) {

        options = $.extend({
            text: 'Done',
            time: 4200,
            how: 'append',
            class_name: 'alert-danger'
        }, options);

        return $(this).each(function() {
            var check = $(this).parent().find('.flash_message').get(0);
            if(check) {
                check.remove();
            }

            var message = $('<div />', {
                'class': 'flash_message alert ' + options.class_name,
                text: options.text
            }).hide().fadeIn('fast');

            $(this)[options.how](message);

            message.delay(options.time).fadeOut('normal', function() {
                $(this).remove();
            });

        });
    };
})(jQuery);