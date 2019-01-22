
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
        load_pref_config();
    }, 600);

    $(document).on('click','.sw_backdrop_blur', function(){
        $(".sw_backdrop_blur_help").show();
    });

    $(document).on('click','#pref_win_btn_restore', function(){
        $(".pref_win_app").css("filter","blur(10px)");
        $(".filter_pref").fadeIn("slow");
    });

    $(document).on('click','#pref_win_btn_save', function(){
        save_pref_config();
        console.log(">> saving config");
    });

    $(document).on('click','#confirm_dialog_btn_cancel', function(){
        $(".pref_win_app").css("filter","blur(0px)");
        $(".filter_pref").fadeOut("slow");
    });

    $(document).on('click','#confirm_dialog_btn_continue', function(){
        $(".pref_win_app").css("filter","blur(0px)");
        $(".filter_pref_shure").fadeOut("slow");
    });

    $(document).on('click','#confirm_dialog_btn_cancel_continue', function(){
        var config = ini.parse(fs.readFileSync('./app_settings/app_config.ini', 'utf-8'));
        $(".printer_select_pref .select-styled").html("earc e-one");
        $(".pref_win_app").css("filter","blur(0px)");
        $(".filter_pref_shure").fadeOut("slow");
    });

    $(document).on('click','#confirm_dialog_btn_restore', function(){   // restore dafault settings
        $(".pref_win_app").css("filter","blur(0px)");
        $(".filter_pref").fadeOut("slow");

        var config = ini.parse(fs.readFileSync('./app_settings/app_config_default.ini', 'utf-8'));
        fs.writeFileSync('./app_settings/app_config.ini', ini.stringify(config));
    });

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

                console.log("select: " + $this.val());

                if($this.val() == "Prusa i3"){
                    $(".pref_win_app").css("filter","blur(10px)");
                    $(".filter_pref_shure").fadeIn("slow");
                }

                //console.log($this.val());
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
                $list.hide();
            });

        });

    }, 400);
    // ------- select dialog end -----

    function load_pref_config(){
        var config = ini.parse(fs.readFileSync('./app_settings/app_config.ini', 'utf-8'));

        $(".printer_select_pref .select-styled").html(config.printer_name);

        $("#buil_area_x").val(config.build_area_x);
        $("#buil_area_y").val(config.build_area_y);
        $("#buil_area_z").val(config.build_area_z);

        var gcode_flavor = config.gcode_flavor;
        var gcode_flavor_name = $('option[value="' + gcode_flavor + '"]').html();
        $(".gcode_flavor_select_pref .select-styled").html(gcode_flavor_name);

        $(".inp_nozzle_daim").val(config.nozzle_diameter);
        $(".inp_fil_daim").val(config.filament_diameter);

        if(config.show_help == 0){
            $(".sw_show_help .btn-toggle").removeClass("active");
            $(".sw_show_help .btn-toggle").removeClass("focus");
            $(".sw_show_help .btn-toggle").attr("pressed","false");
        } else {

            if(!$(".sw_show_help .btn-toggle").hasClass("active")){
                $(".sw_show_help .btn-toggle").addClass("active");
                $(".sw_show_help .btn-toggle").addClass("focus");
            }
            $(".sw_show_help .btn-toggle").attr("pressed","true")
        }

        if(config.blur_background == 0){
            $(".sw_backdrop_blur .btn-toggle").removeClass("active");
            $(".sw_backdrop_blur .btn-toggle").removeClass("focus");
            $(".sw_backdrop_blur .btn-toggle").attr("pressed","false");
        } else {

            if(!$(".sw_backdrop_blur .btn-toggle").hasClass("active")){
                $(".sw_backdrop_blur .btn-toggle").addClass("active");
                $(".sw_backdrop_blur .btn-toggle").addClass("focus");
            }
            $(".sw_backdrop_blur .btn-toggle").attr("pressed","true")
        }

        $(".inp_brim_width").val(config.brim_width);
        $(".inp_raft_layers").val(config.raft_layers);

        $(".pref_start_gcode").val(config.start_gcode);
        $(".pref_end_gcode").val(config.end_gcode);
    }

    function save_pref_config(){
        var config = ini.parse(fs.readFileSync('./app_settings/app_config.ini', 'utf-8'));

        config.printer_name = $(".printer_select_pref .select-styled").html();
        config.build_area_x = $("#buil_area_x").val();
        config.build_area_y = $("#buil_area_y").val();
        config.build_area_z = $("#buil_area_z").val();


        var gcode_flavor_name = $(".gcode_flavor_select_pref .select-styled").html();
        var gcode_flavor = $( "option:contains('" + gcode_flavor_name + "')" ).val();
        config.gcode_flavor = gcode_flavor;

        config.nozzle_diameter = $(".inp_nozzle_daim").val();
        config.filament_diameter = $(".inp_fil_daim").val();

        if($(".sw_show_help .btn-toggle").hasClass("active")){
            config.show_help = 1;
        } else {
            config.show_help = 0;
        }

        if($(".sw_backdrop_blur .btn-toggle").hasClass("active")){
            config.blur_background = 1;
        } else {
            config.blur_background = 0;
        }

        config.brim_width = $(".inp_brim_width").val();
        config.raft_layers = $(".inp_raft_layers").val();
        config.start_gcode = $(".pref_start_gcode").val();
        config.end_gcode = $(".pref_end_gcode").val();

        console.log($(".pref_start_gcode").val());

        fs.writeFileSync('./app_settings/app_config.ini', ini.stringify(config));

        setTimeout(function(){
            load_pref_config();

            $(".pref_win_app").css("filter","blur(12px)");
            $(".filter_pref_msg").fadeIn("slow");

            setTimeout(function(){
                $(".pref_win_app").css("filter","blur(0px)");
                $(".filter_pref_msg").fadeOut("fast");
            }, 1400);

        }, 100);
    }

    // if e-one set e-one preset

});
