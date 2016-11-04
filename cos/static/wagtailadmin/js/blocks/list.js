(function($) {
    window.ListBlock = function(opts) {
        /* contents of 'opts':
            definitionPrefix (required)
            childInitializer (optional) - JS initializer function for each child
        */
        var listMemberTemplate = $('#' + opts.definitionPrefix + '-newmember').text();

        return function(elementPrefix) {
            var sequence = Sequence({
                prefix: elementPrefix,
                onInitializeMember: function(sequenceMember) {
                    /* initialize child block's JS behaviour */

                    var blockTypeName = $('#' + sequenceMember.prefix + '-type').val();
                    var available_block_types = ['centered_text','whitespaceblock','clear_fixblock','code_block','calender_blog','render_file','journal_block', 'customImage'];
                    if(!(available_block_types.includes(blockTypeName))){
                        $('#' + sequenceMember.prefix + '-setting').remove();
                    }

                    if (opts.childInitializer) {
                        opts.childInitializer(sequenceMember.prefix + '-value');
                    }

                    /* initialise delete button */
                    $('#' + sequenceMember.prefix + '-delete').click(function() {
                        sequenceMember.delete();
                    });

                    /* initialise move up/down buttons */
                    $('#' + sequenceMember.prefix + '-moveup').click(function() {
                        sequenceMember.moveUp();
                    });

                    $('#' + sequenceMember.prefix + '-movedown').click(function() {
                        sequenceMember.moveDown();
                    });

                    $('#' + sequenceMember.prefix + '-setting').click(function() {
                        var form = $('#' + "css-style-" + sequenceMember.prefix + '-value');
                        form.toggle();

                        var add_button = form.find(".add_field_button"); //Add button ID
                        if(form.is(':visible')) {

                            var wrapper = form.find(".input_fields_wrap"); //Fields wrapper
                            var style_input = form.find('#' + sequenceMember.prefix + '-value-css_style')

                            $(wrapper).empty();
                            var inputed_style_text = style_input.val();
                            if (inputed_style_text.length > 0) {
                                var text_arrays = inputed_style_text.split(";");
                                for (var i = 0; i < text_arrays.length - 1; i++) {
                                    var text_parts = text_arrays[i].split(":");
                                    var key = text_parts[0];
                                    var value = text_parts[1];
                                    var html_text = '<div class="row"><br><div style="display: inline-block;"><input type="text" class="input_text key_text" value="' + key + '"></div><span>  :  </span><div style="display: inline-block;"><input type="text", class="input_text value_text" value="'
                                        + value + '"></div><a href="#" class="remove_field">&nbsp&nbsp&nbsp<i class="icon icon-fa-times icon-fa-2x"></i></a></div>';
                                    $(wrapper).append(html_text);
                                }
                            }

                            function fill_style_field() {
                                var style_text = ""
                                form.find(".row").each(
                                    function () {
                                        var key = $(this).find(".key_text").val();
                                        var value = $(this).find(".value_text").val();
                                        style_text = style_text + key + ":" + value + ";";
                                    }
                                )
                                style_input.val(style_text);
                            }

                            function refresh_inputs_listener() {
                                var text_inputs = form.find(".input_text");
                                $(text_inputs).change(function (e) {
                                    e.preventDefault();
                                    fill_style_field();
                                });
                            }

                            fill_style_field();
                            refresh_inputs_listener();


                            $(add_button).on('click',function (e) { //on add input button click
                                e.preventDefault();

                                $(wrapper).append('<div class="row"><br><div style="display: inline-block;"><input type="text" class="input_text key_text"></div><span>  :  </span><div style="display: inline-block;"><input type="text", class="input_text value_text"></div><a href="#" class="remove_field">&nbsp&nbsp&nbsp<i class="icon icon-fa-times icon-fa-2x"></i></a></div>'); //add input box

                                fill_style_field();
                                refresh_inputs_listener();

                            });

                            $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
                                e.preventDefault();
                                $(this).parent('div').remove();
                                fill_style_field();
                                refresh_inputs_listener();
                            })
                        }
                        else{
                            $(add_button).off();
                        }
                    });

                },

                onEnableMoveUp: function(sequenceMember) {
                    $('#' + sequenceMember.prefix + '-moveup').removeClass('disabled');
                },

                onDisableMoveUp: function(sequenceMember) {
                    $('#' + sequenceMember.prefix + '-moveup').addClass('disabled');
                },

                onEnableMoveDown: function(sequenceMember) {
                    $('#' + sequenceMember.prefix + '-movedown').removeClass('disabled');
                },

                onDisableMoveDown: function(sequenceMember) {
                    $('#' + sequenceMember.prefix + '-movedown').addClass('disabled');
                }
            });

            /* initialize 'add' button */
            $('#' + elementPrefix + '-add').click(function() {
                sequence.insertMemberAtEnd(listMemberTemplate);
            });
        };
    };
})(jQuery);
