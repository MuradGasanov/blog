$(function () {
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }

            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    });

    var form = {
        title: $("#title").on("keyup", function (e) {
            var self = $(this);
            if (self.val().length == 0) {
                $(".validation-msg[data-for='title']").show()
            } else {
                $(".validation-msg[data-for='title']").hide()
            }
        }),
        text: $('#editor').morrigan_editor({
            iframeStyles: '/static/css/add-post-editor.css',
            imageUpload: 'upload-image/',
            width: '100%',
            height: '550px',
            onKeyUp: function (e) {
                if (form.get().text.length == 0) {
                    $(".validation-msg[data-for='editor']").show()
                } else {
                    $(".validation-msg[data-for='editor']").hide()
                }
            }
        }),
        is_public: $("#is_public"),
        use_post_image: $("#use_post_image"),
        get: function() {
            return {
                title: this.title.val(),
                text: this.text.morrigan_editor("html"),
                is_public: this.is_public.prop('checked'),
                use_post_image: this.use_post_image.prop('checked')
            }
        },
        validate: function () {
            var data = this.get();
            var is_valid = true;
            if (data.title.length == 0) {
                is_valid = false;
                $(".validation-msg[data-for='title']").show()
            }
            if (data.text.length == 0) {
                is_valid = false;
                $(".validation-msg[data-for='editor']").show()
            }
            return is_valid;
        }
    };

    $("#submit").on("click", function(e) {
        e.preventDefault();
        if (!form.validate()) { return }
        var data = form.get();
        $.post("/blog/post-edit/create/", {item: JSON.stringify(data)},
        function(response) {
            console.log(response);
            window.location.href = '/blog/post/'+response.id+"/";
        },"json")
    })
});