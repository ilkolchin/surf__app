(function () {
    const validateFields = (form, fieldsArray) => {

        fieldsArray.forEach(field => {
            field.removeClass('input-error');

            if (field.val().trim() === '') {
                field.addClass('input-error')
            }
        });

        const errorFields = form.find(".input-error");

        return errorFields.length === 0;
    }

    $('.form').on('submit', e => {
        e.preventDefault();

        const form = $(e.currentTarget);
        const name = form.find("[name='name']");
        const phone = form.find("[name='phone']");
        const comment = form.find("[name='comment']");
        const to = form.find("[name='to']");

        const modal = $('#modal');
        const content = modal.find('.modal__content');

        modal.removeClass('modal__error');

        const isValid = validateFields(form, [name, phone, comment, to]);

        if (isValid) {
            $.ajax({
                url: "https://webdev-api.loftschool.com/sendmail",
                method: "post",
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    comment: comment.val(),
                    to: to.val()
                },
                success: data => {
                    content.text(data.message);

                    Fancybox.show([{
                        src: "#modal",
                        type: "inline",
                        dragToClose: false,
                        closeButton: "",
                        animated: false
                    }]);
                },
                error: data => {
                    const message = data.responseJSON.message;
                    content.text(message);
                    modal.addClass('modal__error');

                    Fancybox.show([{
                        src: "#modal",
                        type: "inline",
                        dragToClose: false,
                        closeButton: "",
                        animated: false
                    }]);
                }
            })
        }





    })

    $('.app-close-modal').on('click', e => {
        e.preventDefault();

        Fancybox.close();

    })
})()