// earc slicer - Vue.js - three.js app by earc - (core: Jan Kovar) - 2018

var camera, scene, renderer, control; var model;
var cameraTarget, selected_object, exporter, container, stats;
var selected_object_obj, saveString, gcode_view;

var hover_over_element = "";

var cmd = require('node-cmd');
const fs = require('fs');

var loaded_models = {};
loaded_models.model = [];

/*
var o = {
  model: [
    { attribute: "value" },
    { attribute: "value" }
  ]
};    */

init();
animate();

function init() {

    var space_x = 200;
    var space_y = 200;
    var space_height = 200;

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xffffff );
	//renderer.setSize( 800, 500 );
	//renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setSize( Math.round((window.innerWidth/100)*74), window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//camera = new THREE.PerspectiveCamera( 30, 800 / 500, 1, 2000 );
	camera = new THREE.PerspectiveCamera( 30, Math.round((window.innerWidth/100)*74) / window.innerHeight, 1, 3000 );
	camera.position.set( 260, 280, 360 );
    //camera.up = new THREE.Vector3( 0, 0, 1 ); // x y z

    exporter = new THREE.STLExporter();

    $(document).on('click','#camera_presp_view', function(){
        camera.position.set( 260, 280, 360 );
    })

    $(document).on('click','#camera_top_view', function(){
        camera.position.set( 0, 500, 0 );
    })

    $(document).on('click','#camera_front_view', function(){
        camera.position.set( 0, 0, 500 );
    })

    $(document).on('click','#camera_side_view', function(){
        camera.position.set( 500, 0, 0 );
    })

	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	control = new THREE.OrbitControls( camera, renderer.domElement );
	control.rotateSpeed = 1;
	control.enableZoom = true;
	control.zoomSpeed = 1.2;
	control.enableDamping = false;
	//control.minPolarAngle = Math.PI / 3;
	//control.maxPolarAngle = Math.PI / 3;

	scene = new THREE.Scene();

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 800, 1000 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 0, 800, -1000 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 550, 800, 0 );
	scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( -550, 800, 0 );
	scene.add( light );

	var light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );


	// world

	var Texture = new THREE.ImageUtils.loadTexture( 'assets/img/grid.png' );
	Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping;
	Texture.repeat.set( 1, 1 );	Texture.offset.set( 0, 0 );

	var Material = new THREE.MeshBasicMaterial( { map: Texture, side: THREE.DoubleSide } );
	var Geometry = new THREE.PlaneGeometry( space_x, space_y, 1, 1 );

	var checkerboard = new THREE.Mesh( Geometry, Material );
	checkerboard.position.y = - 0.1;
	checkerboard.rotation.x =  Math.PI / 2;
	//checkerboard.position.x =  -x_plate / 2;
	//checkerboard.position.z =  y_plate / 2;
	scene.add( checkerboard );

    var material = new THREE.LineBasicMaterial( { color: 0xD2D2D2 } );
    var geometry = new THREE.Geometry();
                                        //     x  z   y
    geometry.vertices.push(new THREE.Vector3( space_x/2, 0, space_y/2) );
    geometry.vertices.push(new THREE.Vector3( space_x/2, space_height, space_y/2) );
    geometry.vertices.push(new THREE.Vector3( space_x/2, space_height, -space_y/2) );
    geometry.vertices.push(new THREE.Vector3( space_x/2, 0, -space_y/2) );
    geometry.vertices.push(new THREE.Vector3( -space_x/2, 0, -space_y/2) );
    geometry.vertices.push(new THREE.Vector3( -space_x/2, space_height, -space_y/2) );
    geometry.vertices.push(new THREE.Vector3( -space_x/2, space_height, space_y/2) );
    geometry.vertices.push(new THREE.Vector3( -space_x/2, 0, space_y/2) );
    geometry.vertices.push(new THREE.Vector3( -space_x/2, space_height, space_y/2) );
    geometry.vertices.push(new THREE.Vector3( space_x/2, space_height, space_y/2) );
    geometry.vertices.push(new THREE.Vector3( space_x/2, space_height, -space_y/2) );
    geometry.vertices.push(new THREE.Vector3( -space_x/2, space_height, -space_y/2) );
    //geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );

    var line = new THREE.Line( geometry, material );
    scene.add( line );

	ObjectControl1 = new ObjectControls( camera, renderer.domElement );
	ObjectControl1.projectionMap = checkerboard; ObjectControl1.fixed.y = true;

	var object3D = new THREE.Object3D;
	var mesh = new THREE.Mesh( geometry, material );
	object3D.add( mesh );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.y = h; mesh.rotation.x = Math.PI / 2; mesh.rotation.z = Math.PI / 2;
	object3D.add( mesh );
	object3D.position.set( 25, h / 2, 175 );
	scene.add( object3D );  ObjectControl1.attach( object3D );


	ObjectControl2 = new ObjectControls( camera, renderer.domElement );
	ObjectControl2.projectionMap = checkerboard; ObjectControl2.fixed.y = true;
	ObjectControl2.move = function() {

		this.container.style.cursor = 'move'
		this.focused.position.x = 25 + 50 * Math.round( ( this.focused.position.x - 25 ) / 50 );
		this.focused.position.z = 25 + 50 * Math.round( ( this.focused.position.z - 25 ) / 50 );

	}

	ObjectControl2.mouseup = function() {

		var x = ( this.focused.position.x - 25 ) / 50;
		var z = ( this.focused.position.z - 25 ) / 50;

		var sum = Math.abs( ( x + z ) % 2 );
		if ( sum == 0 ) { this.returnPrevious() }
		this.container.style.cursor = 'auto';

	}

	ObjectControl2.onclick = function() {

		console.log( this.focused.name );
		if ( this.focusedpart != null ) console.log( this.focusedpart.name )
			else  console.log( 'this.focusedpart is null' );

	}

    var h;
	var mesh_pos, mesh_box;

    $('#fileUpload').on('change', function() {
        var file = this.files[0];

        var file_path = file.path;
        console.log(file.path);

        var ext = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
        if(ext == "stl"){
            console.log("ext --> ." + ext + " -> OK");
            load_stl_model(file.path, file.name);
        } /*
        else if(ext == "obj"){              // EXPERIMENTAL --> disabled
            console.log("ext --> ." + ext + " -> OK");
            load_obj_model(f.path, f.name);
        } */

        else {
            console.log("ERROR --> Unsupported File --> ." + ext);
            alert("Unsupported File --> ." + ext + "  (only .stl)");
        }

    });

    function load_stl_model(model_file_path, model_file_name){

        var file_path = model_file_path;

        $("#model_list_div").append("<li id='model_li' class='model_menu_li'><p id='model_li_p'>" + model_file_name + "</p><div class='cross_icon del_model_btn' id='" + model_file_name + "'></div></li>");

        loaded_models.model.push({ name: model_file_name, path: file_path });   // add object to array with properties

        console.log(loaded_models);

        var loader = new THREE.STLLoader();
		loader.load( file_path, function ( geometry ) {

			var material = new THREE.MeshPhongMaterial( { color: 0x00BAFF, specular: 0x111111, shininess: 200 } );
			var mesh = new THREE.Mesh( geometry, material );

            model_file_name == "gcode_view" ? model_file_name = "gcode_model" : model_file_name = model_file_name;
            mesh.name = model_file_name;

            console.log(model_file_name);
            selected_object = model_file_name;

			mesh.rotation.set( Math.PI*1.5, 0, 0 );
			mesh.scale.set( 1, 1, 1 );

			mesh.castShadow = true;
			mesh.receiveShadow = true;

			var box = new THREE.Box3().setFromObject( mesh );

            console.log("---> - height: " + box.min.y);
            console.log("---> + height: " + box.max.y);

            if(box.min.y < 0){
                mesh.position.set( 0, -(box.min.y), 0 );
            } else if(box.min.y > 0){
                mesh.position.set( 0, -(box.min.y), 0 );
            } else {
                mesh.position.set( 0, 0, 0 );
            }

            console.log("------ ");
            console.log("---> pos: " + mesh.position.y);

            var box = new THREE.Box3().setFromObject( mesh );

            var helper = new THREE.Box3Helper( box, 0xffff00 );
            //scene.add( helper );
            //console.log(helper.position);

			scene.add( mesh ); ObjectControl1.attach( mesh );

			if ( mesh instanceof THREE.Mesh ) {
               mesh_pos = mesh; // set value to the global variable, applicable, if the objMesh has one child of THREE.Mesh()
        	}

            selected_object_obj = mesh_pos;

		} );

    }

    function load_obj_model(model_file_path, model_file_name){      // EXPERIMENTAL --> disabled

        $("#model_list_div").append("<li id='model_li' class=''>" + model_file_name + "</li>");

        loaded_models.model.push({ name: model_file_name, path: file_path });   // add object to array with properties

        console.log(loaded_models);


        var loader = new THREE.OBJLoader()
            loader.load( file_path, function ( mesh ) {

                var color = new THREE.Color( 0x00BAFF );
                mesh.traverse( function ( child ) {
                    if ( child.isMesh ) child.material.color = color;
                } );

                model_file_name == "gcode_view" ? model_file_name = "gcode_model" : model_file_name = model_file_name;
                mesh.name = model_file_name;

                console.log(model_file_name);
                selected_object = model_file_name;

    			mesh.rotation.set( Math.PI*1.5, 0, 0 );
    			mesh.scale.set( 1, 1, 1 );

    			mesh.castShadow = true;
    			mesh.receiveShadow = true;


    			var box = new THREE.Box3().setFromObject( mesh );

                console.log("---> - height: " + box.min.y);
                console.log("---> + height: " + box.max.y);

                if(box.min.y < 0){
                    mesh.position.set( 0, -(box.min.y), 0 );
                } else if(box.min.y > 0){
                    mesh.position.set( 0, -(box.min.y), 0 );
                } else {
                    mesh.position.set( 0, 0, 0 );
                }

                console.log("------ ");
                console.log("---> pos: " + mesh.position.y);

                var box = new THREE.Box3().setFromObject( mesh );

                var helper = new THREE.Box3Helper( box, 0xffff00 );
                //scene.add( helper );
                //console.log(helper.position);

    			scene.add( mesh ); ObjectControl1.attach( mesh );

    			if ( mesh instanceof THREE.Mesh ) {
                   mesh_pos = mesh; // set value to the global variable, applicable, if the objMesh has one child of THREE.Mesh()
            	}

                selected_object_obj = mesh_pos;

        } );

    }


    // --------- DRAG AND DROP FILE ----------- //

    var dropZone = document.getElementById('drag-file');

    function showDropZone() {
        dropZone.style.visibility = "visible";
    }
    function hideDropZone() {
        dropZone.style.visibility = "hidden";
    }

    function allowDrag(e) {
        if (true) {  // Test that the item being dragged is a valid one
            e.dataTransfer.dropEffect = 'copy';
            e.preventDefault();
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        hideDropZone();

        //alert('Drop!');
    }

    // 1
    window.addEventListener('dragenter', function(e) {
        showDropZone();
    });

    // 2
    dropZone.addEventListener('dragenter', allowDrag);
    dropZone.addEventListener('dragover', allowDrag);

    // 3
    dropZone.addEventListener('dragleave', function(e) {
        hideDropZone();
    });

    // 4
    dropZone.addEventListener('drop', handleDrop);


    (function () {
        var holder = document.getElementById('drag-file');

        holder.ondragover = () => {
            return false;
        };

        holder.ondragleave = () => {
            return false;
        };

        holder.ondragend = () => {
            return false;
        };

        holder.ondrop = (e) => {
            e.preventDefault();

            for (let f of e.dataTransfer.files) {
                console.log('File(s) you dragged here: ', f.path);
                //$('#fileUpload').val(f.path);

                var ext = f.name.slice((f.name.lastIndexOf(".") - 1 >>> 0) + 2);
                if(ext == "stl"){
                    console.log("ext --> ." + ext + " -> OK");
                    load_stl_model(f.path, f.name);
                } /*
                else if(ext == "obj"){              // EXPERIMENTAL --> disabled
                    console.log("ext --> ." + ext + " -> OK");
                    load_obj_model(f.path, f.name);
                } */

                else {
                    console.log("ERROR --> Unsupported File --> ." + ext);
                    alert("Unsupported File --> ." + ext + "  (only .stl)");
                }

            }

            return false;
        };
    })();

    // --------- END OF DRAG AND DROP ----------- //


    $(document).on('click','#show_gcode', function(){       // ---------->> load gcode <<------
        show_gcode();
    });

    function show_gcode(){       // ---------->> load and show gcode <<------

        var gcode_view = scene.getObjectByName( "gcode_view", true );
        gcode_view == null ? console.log("no old gcode view") : gcode_view.visible = false;
        //gcode_view.visible = false;     // Hide old gcode view before slicing new one

        var loader = new THREE.GCodeLoader();
    	loader.load( 'output/output.gcode', function ( gcode_view_mesh ) {

    		gcode_view_mesh.position.set( -100, 0, 100 );
            gcode_view_mesh.name = "gcode_view";
    		scene.add( gcode_view_mesh );

            if ( gcode_view_mesh instanceof THREE.Mesh ) {
               gcode_view = gcode_view_mesh; // set value to the global variable, applicable, if the objMesh has one child of THREE.Mesh()
        	}

    	} );
    }

    $(document).on('click', '#back_to_models', function(){

        var gcode_view = scene.getObjectByName( "gcode_view", true );
        gcode_view.visible = false;

        var object = scene.getObjectByName(loaded_models.model[0].name);
        //object.visible = true;
        console.log(object);

        setTimeout(function(){

            for(var i = 0; i < loaded_models.model.length; i++){    // get name from object array to hide them
                var object = scene.getObjectByName( loaded_models.model[i].name, true );
                object.visible = true;
            }

        }, 100);
        $("#back_to_gcode").show();
        $("#back_to_models").hide();
    });

    $(document).on('click', '#back_to_gcode', function(){

        for(var i = 0; i < loaded_models.model.length; i++){    // get name from object array to hide them
            var object = scene.getObjectByName( loaded_models.model[i].name, true );
            object.visible = false;
        }

        setTimeout(function(){
            var gcode_view = scene.getObjectByName( "gcode_view", true );
            gcode_view.visible = true;
        }, 100);
        $("#back_to_gcode").hide();
        $("#back_to_models").show();
    })

    $(".loading_screen_slice").hide();

    $(document).on('click','#slice_btn', function(){
        console.log(">> start slicing");

        function show_div_load_slice(){    // Animated loading / slicing screen
        	$(".loading_screen_slice").show();
            function show_div_load_slice(){
            	$(".loading_screen_slice").addClass("show");
            	$(".loading_screen_slice").removeClass("hide");
            }
            setTimeout(show_div_load_slice, 500);
        }
        setTimeout(show_div_load_slice, 100);

        exportASCII();  // export stl with right rotation

        var path_to_file = "output/output.stl"; // get prepared stl file

        setTimeout(function(){      // send comand to slicer core
            cmd.get(
                'perl slicer_core/slic3r.pl -o output/output.gcode output/output.stl ',
                function(err, data, stderr){
                    console.log(data);

                    if (data !== null) {
                      console.log(">> Done");       // script if sucess
                      //alert("Done!");
                      setTimeout(function(){
                          show_gcode();
                          $("#back_to_gcode").hide();
                          $("#back_to_models").show();

                          function show_div_load_slice(){
                          	$(".loading_screen_slice").addClass("hide");
                            $(".loading_screen_slice").removeClass("show");
                              function show_div_load_slice(){
                              	$(".loading_screen_slice").hide();
                              }
                              setTimeout(show_div_load_slice, 600);
                          }
                          setTimeout(show_div_load_slice, 200);

                      }, 500);
                    }
                }
            );
        }, 1000);

        console.log(">> working ...");

    });

    function exportASCII() {    // export stl with right rotation

        console.log("object.model --> export ");

        for(var i = 0; i < loaded_models.model.length; i++){    // get name from object array to hide them
            var object = scene.getObjectByName( loaded_models.model[i].name, true );
            object.visible = false;
        }

        var group = new THREE.Group();      // create group from objects for export
        for(var i = 0; i < loaded_models.model.length; i++){
            var addObject = scene.getObjectByName(loaded_models.model[i].name);

            selected_object_obj = scene.getObjectByName(loaded_models.model[i].name);
            selected_object = loaded_models.model[i].name;
            $("#rot_x").val($("#rot_x").val() + 90);        // set rotaion dimestions for slicer_core
            rotation_set();

            var cloneObject = addObject.clone();            // group delete original --> clone object same name
            cloneObject.name = loaded_models.model[i].name;
            scene.add(cloneObject);
                                                            // set rotation and position for cloned object
            cloneObject.rotation.set((cloneObject.rotation.x - (Math.PI / 2)), cloneObject.rotation.y, cloneObject.rotation.z);
            cloneObject.position.set(addObject.position.x, addObject.position.y, addObject.position.z);

            group.add( addObject );
        }

        setTimeout(function(){      // export objects to one stl output
            var result = exporter.parse( group );
            saveString( result, 'output/output.stl' );
        }, 200);

    }

    function saveString( text, filename ) {

        var data = text;
        fs.writeFile(filename, data, (err) => {
            if (err) throw err;
            //console.log('The file has been saved!');
        });
	}

	ObjectControl5 = new ObjectControls( camera, renderer.domElement );
	ObjectControl5.displacing = false; ObjectControl5.attach( checkerboard );

	ObjectControl5.mouseover = function () {
		control.enabled = true;		///------>> zoom pad disable

		ObjectControl1.onclick = function() {

			//console.log("mouse_click --> drag");
			control.enabled = false;

			//mesh_pos.material.color.setHex( 0x008EB4 );    // issue with .obj

			ObjectControl1.mouseup = function() {
				control.enabled = true;

                selected_object = this.focused.name;
                selected_object_obj = this.focused;
                console.log( "selected: " + selected_object );

                //this.focused.material.color.setHex( 0x00BAFF );   // issue with .obj

                //delete_obj(this.focused.name);

				var mesh_move_x = 100 + selected_object_obj.position.x;
				var mesh_move_y = 100 + selected_object_obj.position.z;
				console.log("x: " + mesh_move_x);
				console.log("y: " + mesh_move_y);
				//console.log(mesh_pos.position);

			}
		}
	}

    $("#rot_x").val(0);
    $("#rot_y").val(0);
    $("#rot_z").val(0);

function rotation_set(){     // --> set rotation of model

    var rot_x = $('#rot_x').val();
    var rot_y = $("#rot_y").val();
    var rot_z = $("#rot_z").val();

    console.log("rot_x_y_z: " + rot_x +"-"+ rot_y +"-"+ rot_z);

    selected_object_obj.rotation.x = (270 + parseInt(rot_x)) * (Math.PI / 180);
    selected_object_obj.rotation.y = rot_y * (Math.PI / 180);
    selected_object_obj.rotation.z = rot_z * (Math.PI / 180);

    var selectedObject = scene.getObjectByName(selected_object);
    var box = new THREE.Box3().setFromObject( selectedObject );

    if(box.min.y < 0){
        selectedObject.position.y = -(box.min.y);
    } else if(box.min.y > 0){
        selectedObject.position.y = -(box.min.y);
    } else {
        console.log("z = 0");
    }

    var helper = new THREE.Box3Helper( box, 0xffff00 );

    $("#rot_x").val(Math.abs(Math.round(selected_object_obj.rotation.x / (Math.PI / 180)) - 270));  // cant set 30.5 !! Math.round()  //  x -> 270 axis compensate
    //$("#rot_x").val(Math.round(selected_object_obj.rotation.x / (Math.PI / 180)));
    $("#rot_y").val(Math.round(selected_object_obj.rotation.y / (Math.PI / 180)));
    $("#rot_z").val(Math.round(selected_object_obj.rotation.z / (Math.PI / 180)));

    var box = new THREE.Box3().setFromObject( selectedObject );

    var helper = new THREE.Box3Helper( box, 0xffff00 );
    //scene.add( helper );

    set_floor(selected_object);
    $(".rotation_menu_manual").removeClass("active");
}

$("#scale_x").val(100);
$("#scale_y").val(100);
$("#scale_z").val(100);
$("#scale_unify").val(100);

function scale_set(){     // --> set scale of model

    var unify;

    $("#unify_scale").hasClass("unify_scale") ? unify = 1 : unify = 0;

    if(unify == 1){
        console.log("unify");

        var scale_x = $('#scale_unify').val();
        var scale_y = $("#scale_unify").val();
        var scale_z = $("#scale_unify").val();
    } else {
        console.log("no-unify");

        var scale_x = $('#scale_x').val();
        var scale_y = $("#scale_y").val();
        var scale_z = $("#scale_z").val();
    }

    console.log("scale_x_y_z: " + scale_x +"-"+ scale_y +"-"+ scale_z);

    selected_object_obj.scale.x = scale_x / 100;
    selected_object_obj.scale.y = scale_y / 100;
    selected_object_obj.scale.z = scale_z / 100;

    var selectedObject = scene.getObjectByName(selected_object);
    var box = new THREE.Box3().setFromObject( selectedObject );

    if(box.min.y < 0){
        selectedObject.position.y = -(box.min.y);
    } else if(box.min.y > 0){
        selectedObject.position.y = -(box.min.y);
    } else {
        console.log("z = 0");
    }

    var helper = new THREE.Box3Helper( box, 0xffff00 );

    $("#scale_x").val(selected_object_obj.scale.x * 100);
    $("#scale_y").val(selected_object_obj.scale.y * 100);
    $("#scale_z").val(selected_object_obj.scale.z * 100);
    $("#scale_unify").val(selected_object_obj.scale.x * 100);

    var box = new THREE.Box3().setFromObject( selectedObject );

    var helper = new THREE.Box3Helper( box, 0xffff00 );
    //scene.add( helper );

    set_floor(selected_object);
    $(".scale_menu_manual").removeClass("active");
}

    $(document).on('click','#set_rotation', function(){     // --> set rotation of model
        rotation_set();
    })

    $('.rotation_inp').keyup(function(e){if(e.keyCode == 13)        // --> set rotation of model enter
        rotation_set();
    })

    $(document).on('click','#rotate_object_y', function(){     // --> set rotation of model
        var rotaion_deg = Math.round(selected_object_obj.rotation.y / (Math.PI / 180)) + 90;
        rotaion_deg > 360 ? rotaion_deg = 0 : console.log(" y +90 deg");
        $("#rot_y").val(rotaion_deg);
        rotation_set();
    })

    $(document).on('click','#rotate_object_x', function(){     // --> set rotation of model     //ERROR: ----> Not Wokr +90 deg!!
        var rotaion_deg = Math.round((Math.abs(selected_object_obj.rotation.x - 270))/ (Math.PI / 180)) + 90;
        rotaion_deg > 360 ? rotaion_deg = 0 : console.log("x +90 deg");
        $("#rot_x").val(rotaion_deg);
        rotation_set();
    })

    $(document).on('click','#rotate_object_z', function(){     // --> set rotation of model
        var rotaion_deg = Math.round(selected_object_obj.rotation.z / (Math.PI / 180)) + 90;
        rotaion_deg > 360 ? rotaion_deg = 0 : console.log("z +90 deg");
        $("#rot_z").val(rotaion_deg);
        rotation_set();
    })

    $(document).on('click','#delete_object', function(){
        delete_obj(selected_object);
    })

    $(document).on('click','.del_model_btn', function(){
        var object_to_delete = $(this).attr("id");
        delete_obj(object_to_delete);
    })



    $(document).on('click','#set_scale', function(){     // --> set scale of model
        scale_set();
    })

    $('.scale_inp').keyup(function(e){if(e.keyCode == 13)        // --> set scale of model enter
        scale_set();
    })

    $('html').keyup(function(e){if(e.keyCode == 46)
        delete_obj(selected_object);
    })

    $(document).on('click','#set_floor', function(){
        set_floor_00(selected_object);
    })

    $(document).on('click','#exp_stl', function(){      // exp stl ----> debug
        exportASCII();
    })

	ObjectControl5.mouseout = function () {
		control.enabled = true;
	}
}

function delete_obj(objName){
  var selectedObject = scene.getObjectByName(objName);
  scene.remove( selectedObject );

  $('#model_list_div li:contains("' + objName + '")').remove();


  var index_item = loaded_models.model.findIndex(x => x.name == objName);
  //console.log(index);
  loaded_models.model.splice(index_item, 1);

  console.log("object deleted");
  console.log(loaded_models);

  animate();
}

function set_floor_00(objName){
  var selectedObject = scene.getObjectByName(objName);

  selectedObject.position.set( 0, 0, 0 );

  var box = new THREE.Box3().setFromObject( selectedObject );

  if(box.min.y < 0){
      selectedObject.position.set( 0, -(box.min.y), 0 );
  } else if(box.min.y > 0){
      selectedObject.position.set( 0, -(box.min.y), 0 );
  } else {
      selectedObject.position.set( 0, 0, 0 );
  }

  var box = new THREE.Box3().setFromObject( selectedObject );

  var helper = new THREE.Box3Helper( box, 0xffff00 );
  //scene.add( helper );

  //console.log(helper.position);

  animate();

}

function set_floor(objName){
  var selectedObject = scene.getObjectByName(objName);

  var box = new THREE.Box3().setFromObject( selectedObject );

  if(box.min.y < 0){
      selectedObject.position.y = -(box.min.y);
  } else if(box.min.y > 0){
      selectedObject.position.y = -(box.min.y);
  } else {
      console.log("z = 0");
  }

  var box = new THREE.Box3().setFromObject( selectedObject );

  var helper = new THREE.Box3Helper( box, 0xffff00 );
  //scene.add( helper );

  //console.log(helper.position);

  animate();

}

function animate() {

	requestAnimationFrame(animate);
	render();

}

function render() {

	ObjectControl1.update();
	ObjectControl2.update();
	//ObjectControl3.update();
	//ObjectControl4.update();
	ObjectControl5.update();

	control.update();
	renderer.render(scene, camera);

}

var hover_over_element = "";

function clone_object(objname){

    var get_obj_clone = scene.getObjectByName(objname);
    var cloneObject = get_obj_clone.clone();
    var new_file_name = "(cp)" + objname
    cloneObject.name = new_file_name;

    var box = new THREE.Box3().setFromObject( get_obj_clone );

    console.log(Math.abs(box.max.x - box.min.x));
    console.log(Math.abs(box.max.z - box.min.z));

    cloneObject.position.x = get_obj_clone.position.x + (Math.abs(box.max.x - box.min.x) / 2) + 10;
    cloneObject.position.z = get_obj_clone.position.z + (Math.abs(box.max.z - box.min.z) / 2) + 10;

    var model_obj = loaded_models.model.find(x => x.name == objname);   // get obj path
    var clone_path = model_obj.path;

    loaded_models.model.push({ name: new_file_name, path: clone_path });

    $("#model_list_div").append("<li id='model_li' class='model_menu_li'><p id='model_li_p'>" + new_file_name + "</p><div class='cross_icon del_model_btn' id='" + new_file_name + "'></div></li>");

    console.log("item_selected_ctx");
    console.log(item_selected_ctx);
    console.log(hover_over_element);

    console.log("clone object path: " + model_obj.path);
    console.log(loaded_models.model);

    scene.add(cloneObject); ObjectControl1.attach(cloneObject);

}

// --------- END OF THREE.JS ----------- //


$(document).on('click','#rotate_object', function(){
    $(".rotation_menu").toggleClass("active");
})

$(document).on('click','#rotate_object_manual', function(){
    $(".rotation_menu_manual").toggleClass("active");
    $(".rotation_menu").toggleClass("active");
})

$(document).on('click','#scale_object', function(){
    $(".scale_menu_manual").toggleClass("active");
})

$(document).on('click','#model_li_p', function(){
    selected_object = $(this).text();
})

$(".no_unify_scale_div").hide();

$(document).on('click','#unify_scale', function(){
    $(this).toggleClass("unify_scale");
    $(this).toggleClass("no_unify_scale");
    if($("#unify_scale").hasClass("unify_scale")){
        $(".unify_scale_div").show();
        $(".no_unify_scale_div").hide();
    } else {
        $(".unify_scale_div").hide();
        $(".no_unify_scale_div").show();
    }
})

var shell = require('shelljs');
shell.ls('*.js');

const exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};

// call the function --> test if core work OK?
execute('perl slicer_core/slic3r.pl --version', (output) => {
    console.log("slicer_core respond test --> v:" + output);
    if(output == ""){
        alert("slicer_core --> is not responding");
        console.error("ERROR: slicer_core --> is not responding");
        console.log("check folder slicer_core if is correctly installed.");
        console.log("check perl instalation");
        console.log("Slicing will not work!");
        console.log("----------------------");
    }
});

/*
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})*/

/*
var app = new Vue({
    el: '#app',

data: {
        model_list: "",
        some_text: 'hello world',
    },
    methods: {
        reverseMessage: function () {

            //this.lang == "CZ" ? this.lang = "EN" : this.lang = "CZ"

        },
    }


})*/

jQuery(document).ready(function($) {

    $(document).ready(function(){
        function hide_div_load(){
        	$(".loading_screen").addClass("hide");
            function hide_div_load(){
            	$(".loading_screen").hide();
            }
            setTimeout(hide_div_load, 600);
        }
        setTimeout(hide_div_load, 600);
    })

});


// context menu
const { remote } = require('electron')
const { Menu, MenuItem } = remote

var item_selected_ctx = "";

const menu_1 = new Menu()
menu_1.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu_1.append(new MenuItem({ type: 'separator' }))
menu_1.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

const model_li_menu = new Menu()
model_li_menu.append(new MenuItem({ label: 'duplicate', click() {
    console.log('clone obj');
    clone_object(item_selected_ctx);
} }))
model_li_menu.append(new MenuItem({ label: 'remove', click() {
    delete_obj(item_selected_ctx);
    alert(item_selected_ctx);
    console.log('removed');
} }))

window.addEventListener('contextmenu', (e) => {

    item_selected_ctx = $(e.target).text();
    hover_over_element = $(e.target).attr('id');

    if(hover_over_element == "side_bar"){
        e.preventDefault()
        menu_1.popup({ window: remote.getCurrentWindow() })
    } else if(hover_over_element == "canvas"){

    } else if(hover_over_element == "model_li_p"){
        e.preventDefault()
        model_li_menu.popup({ window: remote.getCurrentWindow() })

        hover_over_element = "";
    } else {
        e.preventDefault()
        menu_1.popup({ window: remote.getCurrentWindow() })
    }

    console.log(hover_over_element);

}, false)


$("canvas").hover(function() {      // no right click on canvas 3D view
    hover_over_element = "canvas";
}, function() {
    hover_over_element = "";
});




/*

$( ".top_bar" ).mouseover(function() {
    console.log("mouseover");

    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      menu_1.popup({ window: remote.getCurrentWindow() })
    }, false)

});
*/
