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
    $.widget("custom.combobox", {
        options: {
            onSelect: function () {}
        },
        val: null,
        _create: function () {
            this.wrapper = $("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function () {
            var selected = this.element.children(":selected"),
                value = selected.val() ? selected.text() : "";
            this.val = this.element.val();
            this.input = $("<input>")
                .appendTo(this.wrapper)
                .val(value)
                .attr("title", "")
                .addClass("custom-combobox-input ui-widget ui-widget-content ui-corner-left")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy(this, "_source")
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });

            this._on(this.input, {
                autocompleteselect: function (event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_value"
            });
        },

        _createShowAllButton: function () {
            var input = this.input,
                wasOpen = false;

            $("<a>")
                .attr("tabIndex", -1)
                .attr("title", "Выберите из списка или введите новое значение")
                .tooltip()
                .appendTo(this.wrapper)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("custom-combobox-toggle ui-corner-right")
                .mousedown(function () {
                    wasOpen = input.autocomplete("widget").is(":visible");
                })
                .click(function () {
                    input.focus();

                    // Close if already visible
                    if (wasOpen) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                });
        },

        _source: function (request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function () {
                var text = $(this).text();
                if (this.value && ( !request.term || matcher.test(text) ))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _value: function (event, ui) {
            var self = this;
            // Selected an item, nothing to do
            if (ui.item) {
                self.val = parseInt(ui.item.option.value);
                self.options.onSelect(event);
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children("option").each(function () {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    self.val = parseInt($(this).val());
                    this.selected = valid = true;
                    self.options.onSelect(event);
                    return false;
                }
            });
            if (valid) {
                return;
            }
            self.val = this.input.val();
            self.options.onSelect(event);
        },

        _destroy: function () {
            this.wrapper.remove();
            this.element.show();
        },

        value: function () {
            return this.val
        }
    });

    function split(val) {
        return val.split(/,\s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }

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
        tags: $("#tags")
            .bind("keydown", function (event) {
                if (event.keyCode === $.ui.keyCode.TAB &&
                    $(this).autocomplete("instance").menu.active) {
                    event.preventDefault();
                }
            })
            .on("keyup", function (e) {
                var self = $(this);
                if (self.val().length == 0) {
                    $(".validation-msg[data-for='tags']").show()
                } else {
                    $(".validation-msg[data-for='tags']").hide()
                }
            })
            .autocomplete({
                source: function (request, response) {
                    $.getJSON("tags/", {
                        tag: extractLast(request.term)
                    }, response);
                },
                search: function () {
                    var term = extractLast(this.value);
                    if (term.length < 2) {
                        return false;
                    }
                },
                focus: function () {
                    return false;
                },
                select: function (event, ui) {
                    var terms = split(this.value);
                    terms.pop();
                    terms.push(ui.item.value);
                    terms.push("");
                    this.value = terms.join(", ");
                    return false;
                }
            }),
        categories: $("#categories").combobox({
            onSelect: function (e) {
                var category = form.get().category;
                if (!category || (category == "0")) {
                    $(".validation-msg[data-for='category']").show()
                } else {
                    $(".validation-msg[data-for='category']").hide()
                }
            }
        }),
        is_public: $("#is_public"),
        use_post_image: $("#use_post_image"),
        get: function () {
            var tags = this.tags.val();
            tags = $.trim(tags);
            tags = split(tags);
            $.each(tags, function(i, o) {
                tags[i] = $.trim(o);
            });
            return {
                title: this.title.val(),
                text: this.text.morrigan_editor("html"),
                category: this.categories.combobox("value"),
                tags: tags,
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
            if (this.tags.val().length == 0) {
                is_valid = false;
                $(".validation-msg[data-for='tags']").show()
            }
            if (!data.category || (data.category == "0")) {
                is_valid = false;
                $(".validation-msg[data-for='category']").show()
            }
            return is_valid;
        }
    };

    window.cat = form.categories;

    $("#submit").on("click", function (e) {
        console.log(form.get());
        e.preventDefault();
        if (!form.validate()) {
            return
        }
        var data = form.get();
        $.post("/blog/add-post/save/", {item: JSON.stringify(data)},
            function (response) {
                console.log(response);
                window.location.href = '/blog/post/' + response.id + "/";
            }, "json")
    })
});