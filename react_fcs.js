
var mainElement = document.querySelector("SettingsSidePanel");
var infoScreenElement = document.querySelector("HelpInfoScreen");

function fcs_load_manual_settings(){
    console.log(">>react: loading manual settings");
    ReactDOM.render(<ManualSettings></ManualSettings>, mainElement);
}

function fcs_load_easy_settings(){
    console.log(">>react: loading manual settings");
    ReactDOM.render(<EasySettings></EasySettings>, mainElement);
}

function fcs_load_help_screen(){
    console.log(">>react: info help screen show");
    ReactDOM.render(<InfoHelpScreen></InfoHelpScreen>, infoScreenElement);
}

function fcs_hide_help_screen(){
    console.log(">>react: info help screen show");
    ReactDOM.render(<InfoHelpScreenHide></InfoHelpScreenHide>, infoScreenElement);
}


var EasySettings = React.createClass({

  render: function() {
    return (
        <div id="easy_setting_view">
            <div className="models_scroll_box">
                <p className="p_hl">models:</p>
                <ol id="model_list_div"></ol>
            </div>
            <form id="upload_form">
                <label className="label_import_btn button" id="import_label">import file</label>
            </form>
            <div className="easy_settings">
                <div className="rotation_menu_manual">
                    <p>rotaton:</p><br />
                    <p>x: <input type="text" id="rot_x" name="rot_x" className="rotation_inp"></input></p>
                    <p>y: <input type="text" id="rot_y" name="rot_y" className="rotation_inp"></input></p>
                    <p>z: <input type="text" id="rot_z" name="rot_z" className="rotation_inp"></input></p>
                    <br />
                    <button id="set_rotation" className="button">set rotation</button>
                </div>
                <div className="scale_menu_manual">
                    <p>scale:</p>
                    <br />
                    <button id="unify_scale" className="icon_btn unify_scale"></button>
                    <div className="no_unify_scale_div">
                        <p>x: <input type="text" id="scale_x" name="scale_x" className="scale_inp"></input></p>
                        <p>y: <input type="text" id="scale_z" name="scale_z" className="scale_inp"></input></p>
                        <p>z: <input type="text" id="scale_y" name="scale_y" className="scale_inp"></input></p>
                    </div>
                    <div className="unify_scale_div">
                        <p><input type="text" id="scale_unify" name="scale_unify" className="scale_inp"></input></p>
                    </div>
                    <br />
                    <button id="set_scale" className="button">set scale</button>
                </div>
                <div className="easy_set_div">
                    <p className="easy_set_div_label label_preset_select">preset: </p>
                    <p className="easy_set_div_label label_preset_material"></p>
                    <div className="preset_select">
                        <select id="preset">
                        </select>
                    </div>
                    <p className="easy_set_div_label label_infill_type">infill: </p>
                    <div className="infill_type">
                        <select id="infill_type">
                            <option value="PLA generic">Honeycomb</option>
                            <option value="PLA smartie">Rectilinear</option>
                            <option value="PLA generic">3D Honeycomb</option>
                        </select>
                    </div>
                    <p className="easy_set_div_label" id="help_info" data="print_quality">print quality: </p>
                    <p className="slider_value slider_value_qv"></p>
                    <div id="quality_slider"></div>
                    <br />
                    <p className="easy_set_div_label" id="help_info" data="infill_density">infill density: </p>
                    <p className="slider_value slider_value_sp"></p>
                    <div id="infill_slider"></div>
                    <br />
                    <div className="switch_set sw_support" id="help_info" data="generate_supports">
                      <button type="button" className="btn btn-toggle focus active" data-toggle="button" aria-pressed="flase">
                        <div className="handle"></div>
                      </button>
                    </div>
                    <p className="sw_label_set" id="help_info" data="generate_supports">generate supports</p>
                    <br />
                    <div className="switch_set sw_layer_fan" id="help_info" data="layer_fan">
                      <button type="button" className="btn btn-toggle focus active" data-toggle="button" aria-pressed="false">
                        <div className="handle"></div>
                      </button>
                    </div>
                    <p className="sw_label_set" id="help_info" data="layer_fan">layer fan</p>
                    <br />
                </div>
            </div>
        </div>
    );
  },

});

var ManualSettings = React.createClass({

  render: function() {
    return (
        <div id="manual_setting_view">
            <div className="manual_settings">
                <div className="easy_set_div">
                    <p className="easy_set_div_label label_preset_select">preset: </p>
                    <p className="easy_set_div_label label_preset_material"></p>
                    <div className="preset_select">
                        <select id="preset">

                        </select>
                    </div>

                    <p className="easy_set_div_label label_infill_type">infill: </p>
                    <div className="infill_type">
                        <select id="infill_type">
                            <option value="PLA generic">Honeycomb</option>
                            <option value="PLA smartie">Rectilinear</option>
                            <option value="PLA generic">3D Honeycomb</option>
                        </select>
                    </div>

                    <p className="easy_set_div_label" id="help_info" data="print_quality">layer height: </p>
                    <p className="slider_value slider_value_qv"></p>
                    <div id="quality_slider"></div>
                    <br />

                    <p className="easy_set_div_label" id="help_info" data="infill_density">infill density: </p>
                    <p className="slider_value slider_value_sp"></p>
                    <div id="infill_slider"></div>
                    <br />

                    <p className="easy_set_div_label" id="help_info" data="print_quality">print speed: </p>
                    <p className="slider_value slider_value_speed"></p>
                    <div id="speed_slider"></div>
                    <br />

                    <hr />

                    <p className="easy_set_div_label" id="help_info" data="head_temperature">nozzle temperature: </p>
                    <p className="slider_value slider_value_tp_end"></p>
                    <div id="temp_end_slider"></div>
                    <br />

                    <p className="easy_set_div_label" id="help_info" data="bed_temperature">bed temperature: </p>
                    <p className="slider_value slider_value_tp_bed"></p>
                    <div id="temp_bed_slider"></div>
                    <br />

                    <p className="easy_set_div_label" id="help_info" data="extrude_multipler">extruder multipler: </p>
                    <p className="slider_value slider_value_ext_mpt"></p>
                    <div id="ext_mpt_slider"></div>
                    <br />

                    <div className="switch_set sw_support">
                      <button type="button" className="btn btn-toggle focus active" data-toggle="button" aria-pressed="flase">
                        <div className="handle"></div>
                      </button>
                    </div>

                    <p className="sw_label_set" id="help_info" data="generate_supports">generate supports</p>
                    <br />

                    <div className="switch_set sw_layer_fan">
                      <button type="button" className="btn btn-toggle focus active" data-toggle="button" aria-pressed="false">
                        <div className="handle"></div>
                      </button>
                    </div>

                    <p className="sw_label_set" id="help_info" data="layer_fan">layer fan</p>
                    <br />

                    <div className="switch_set sw_retraction">
                      <button type="button" className="btn btn-toggle focus active" data-toggle="button" aria-pressed="false">
                        <div className="handle"></div>
                      </button>
                    </div>

                    <p className="sw_label_set" id="help_info" data="retration">retration[mm]</p>
                    <br />
                    <input type="number" className="inp_retraction"></input>

                    <div className="switch_set sw_brim">
                      <button type="button" className="btn btn-toggle focus active" data-toggle="button" aria-pressed="false">
                        <div className="handle"></div>
                      </button>
                    </div>

                    <p className="sw_label_set" id="help_info" data="brim">brim</p>
                    <br />

                    <div className="switch_set sw_raft">
                      <button type="button" className="btn btn-toggle focus active" data-toggle="button" aria-pressed="false">
                        <div className="handle"></div>
                      </button>
                    </div>

                    <p className="sw_label_set" id="help_info" data="raft">raft</p>
                    <br />

                </div>
            </div>
        </div>
    );
  },

});

var InfoHelpScreen = React.createClass({
  render: function() {
    return (
        <div id="info_help_screen">
            <button id="close_info_help"></button>
            <h2 className="info_headline">hello world</h2>
            <hr className="info_view_hr" />
            <br />
            <p className="info_help_text"></p>
            <img className="info_help_img"/>
        </div>
    );
  },
});

var InfoHelpScreenHide = React.createClass({
  render: function() {
    return (
        <div id="info_help_screen_hidden" className="info_help_screen_hidden">

        </div>
    );
  },
});

ReactDOM.render(<EasySettings></EasySettings>, mainElement);
