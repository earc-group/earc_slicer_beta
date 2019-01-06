
// js script for preset save app

var cmd = require('node-cmd');
const fs = require('fs');
const { ipcRenderer } = require('electron');
const { dialog } = require('electron').remote;
var os = require('os');
var ini = require('ini');
const path = require('path');

const { remote } = require('electron');
const { Menu, MenuItem } = remote;

const electron = require('electron');
const ipc = electron.ipcRenderer;

jQuery(document).ready(function($) {

    setTimeout(function(){
        $('.loading_screen_app').fadeOut("slow");
    }, 600);

    //  ----- select dialog -----
    setTimeout(function(){

        $('select').each(function(){
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            $this.addClass('select-hidden');
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="select-styled"></div>');

            var $styledSelect = $this.next('div.select-styled');
            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.select-styled.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            });

            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();

                if($this.parent().parent().attr('class') == "preset_select"){
                    console.log("select: " + $(".select-styled").html());
                    load_preset($(".select-styled").html());
                }

                //console.log($this.val());
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });

        });

    }, 600);

    // ------- select dialog end -----

    var settings_files = [];
    var settings_file_names = [];
    const directoryPath = path.join(__dirname, 'user_settings');
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            var string_array = file.split("_");
            if(string_array.length == 2){
                if(string_array[0] == "user#preset"){
                    var name = string_array[1];
                    name = name.split(".")
                    if(name.length !== 2){
                        console.warn("incorrect settings file name");
                    }  else {
                        if(name[0] !== ""){
                            settings_files.push(name[0]);
                            settings_file_names.push(file);
                        }
                    }
                }
            } else {
                console.warn("incorrect settings file name");
            }
        });
    });

    setTimeout(function(){

        for(var i = 0; i < settings_files.length; i++){
            var preset_name = settings_files[i].replace("-", " ");
            $(".preset_select_save select").append("<option value=" + preset_name + ">" + preset_name + "</option>");
        }
        console.log("loaded presets:");
        console.log(settings_files);
        console.log(settings_file_names);

    }, 200);

    $(document).on('click','#save_pres_btn', function(){
        save_config();
    })

    $(document).keydown(function (e) {
        if (e.keyCode == 13) {
            var isVisible = $(".saveas_pres_app").is(':visible');
            if (isVisible === true) {
               save_new_config();
            } else {
               save_config();
            }
        }
    });

    $(document).on('click','#saveas_pres_btn', function(){
        $(".save_pres_app").fadeOut("fast");
        setTimeout(function(){
            $(".saveas_pres_app").fadeIn("slow");
        }, 300);

    })

    $(document).on('click','#saveas_pres_btn_save', function(){
        save_new_config();
    })

    function save_config(){     // save preset << user settings

        console.log(">> saving settings");

        var selected_preset = $(".select-styled").html();
        ipc.send("pres_name_send", selected_preset);

        selected_preset = selected_preset.replace(" ", "-");
        var index = settings_files.indexOf(selected_preset);
        var selected_preset_name = settings_file_names[index];

        console.log(">> saving to: ");
        console.log(selected_preset_name);

        var config = ini.parse(fs.readFileSync('./app_settings/last_config.ini', 'utf-8'))

        setTimeout(function(){
            fs.writeFileSync('./user_settings/' + selected_preset_name, ini.stringify(config));
            console.log(">> saving complete");
            $(".done_screen_app").fadeIn("slow");
            setTimeout(function(){
                window.close();
            }, 1000);
        }, 600);
    }

    function save_new_config(){     // save new preset << user settings

        console.log(">> saving new settings");

        var selected_preset = $(".inp_name_pres_save").val();

        if(selected_preset !== null){
            var save_ok = 1;
            if (selected_preset.indexOf('-') > -1 || selected_preset.indexOf('.') > -1 || selected_preset.indexOf('_') > -1){
                console.log("invalid name >> no (-._)");
                save_ok = 0;
                $(".label_preset_note_as").css('color', '#CB5252');
                $(".label_preset_note_as").text('you can\'t use \"- . _\" in name');
                $(".error_screen_app").fadeIn("slow");
                setTimeout(function(){
                    $(".error_screen_app").fadeOut("slow");
                }, 800);
            }

            ipc.send("pres_name_send", selected_preset);    // send arg to main.js >> main_script.sj

            selected_preset = selected_preset.replace(" ", "-");
            var index = settings_files.indexOf(selected_preset);

            if (index !== -1){
                console.log("invalid name >> exist");
                save_ok = 0;
                $(".label_preset_note_as").css('color', '#CB5252');
                $(".label_preset_note_as").text('name is already taken');
                $(".error_screen_app").fadeIn("slow");
                setTimeout(function(){
                    $(".error_screen_app").fadeOut("slow");
                }, 800);
            }

            if(save_ok == 1){
                var selected_preset_name = "user#preset_" + selected_preset + ".ini";

                console.log(">> saving to: ");
                console.log(selected_preset_name);

                var config = ini.parse(fs.readFileSync('./app_settings/last_config.ini', 'utf-8'))

                setTimeout(function(){
                    fs.writeFileSync('./user_settings/' + selected_preset_name, ini.stringify(config));
                    console.log(">> saving complete");
                    $(".done_screen_app").fadeIn("slow");
                    setTimeout(function(){
                        window.close();
                    }, 1000);
                }, 600);

            } else {
                console.log("error while saving");
                var save_ok = 1;
            }
        }
    }

});
