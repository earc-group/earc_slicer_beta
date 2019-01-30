'use strict';

/**
 * THREE.GCodeLoader is used to load gcode files usually used for 3D printing or CNC applications.
 *
 * Gcode files are composed by commands used by machines to create objects.
 *
 * @class THREE.GCodeLoader
 * @param {Manager} manager Loading manager.
 * @author tentone
 * @author joewalnes
 */

/*

console.log(global_var_gcode_start);
console.log(global_var_gcode_end);

*/

THREE.GCodeLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

	this.splitLayer = false;

};

THREE.GCodeLoader.prototype.load = function ( url, onLoad, onProgress, onError ) {

	var self = this;

	var loader = new THREE.FileLoader( self.manager );
	loader.setPath( self.path );
	loader.load( url, function ( text ) {

		onLoad( self.parse( text ) );

	}, onProgress, onError );

};

THREE.GCodeLoader.prototype.setPath = function ( value ) {

	this.path = value;
	return this;

};

THREE.GCodeLoader.prototype.parse = function ( data ) {

	var state = { x: 0, y: 0, z: 0, e: 0, f: 0, extruding: false, relative: false };
	var layers = [];
    var points = [];

	var currentLayer = undefined;

	var pathMaterial = new THREE.LineBasicMaterial( { color: 0xE89C2A } );
	pathMaterial.name = 'path';

	var extrudingMaterial = new THREE.LineBasicMaterial( { color: 0x00D8ED } );
	extrudingMaterial.name = 'extruded';

	function newLayer( line ) {

		currentLayer = { vertex: [], pathVertex: [], z: line.z };
		layers.push( currentLayer );

	}

	//Create lie segment between p1 and p2
	function addSegment( p1, p2 ) {

		if ( currentLayer === undefined ) {

			newLayer( p1 );

		}

		if ( line.extruding ) {

			currentLayer.vertex.push( p1.x, p1.y, p1.z );
			currentLayer.vertex.push( p2.x, p2.y, p2.z );

            points.push( v( p1.x, p1.y, p1.z ) );
            points.push( v( p2.x, p2.y, p2.z ) );

		} else {

			currentLayer.pathVertex.push( p1.x, p1.y, p1.z );
			currentLayer.pathVertex.push( p2.x, p2.y, p2.z );

		}

	}

	function delta( v1, v2 ) {

		return state.relative ? v2 : v2 - v1;

	}

	function absolute( v1, v2 ) {

		return state.relative ? v1 + v2 : v2;

	}

	var lines = data.replace( /;.+/g, '' ).split( '\n' );


    for ( var i = 0; i < lines.length; i ++ ) {

		var tokens = lines[ i ].split( ' ' );
		var cmd = tokens[ 0 ].toUpperCase();

		//Argumments
		var args = {};
		tokens.splice( 1 ).forEach( function ( token ) {

			if ( token[ 0 ] !== undefined ) {

				var key = token[ 0 ].toLowerCase();
				var value = parseFloat( token.substring( 1 ) );
				args[ key ] = value;

			}

		} );

		//Process commands
		//G0/G1 – Linear Movement
		if ( cmd === 'G0' || cmd === 'G1' ) {

			var line = {
				x: args.x !== undefined ? absolute( state.x, args.x ) : state.x,
				y: args.y !== undefined ? absolute( state.y, args.y ) : state.y,
				z: args.z !== undefined ? absolute( state.z, args.z ) : state.z,
				e: args.e !== undefined ? absolute( state.e, args.e ) : state.e,
				f: args.f !== undefined ? absolute( state.f, args.f ) : state.f,
			};

			//Layer change detection is or made by watching Z, it's made by watching when we extrude at a new Z position
			if ( delta( state.e, line.e ) > 0 ) {

				line.extruding = delta( state.e, line.e ) > 0;

				if ( currentLayer == undefined || line.z != currentLayer.z ) {

					newLayer( line );

				}

			}

			addSegment( state, line );
			state = line;

		} else if ( cmd === 'G2' || cmd === 'G3' ) {

			//G2/G3 - Arc Movement ( G2 clock wise and G3 counter clock wise )
			console.warn( 'THREE.GCodeLoader: Arc command not supported' );

		} else if ( cmd === 'G90' ) {

			//G90: Set to Absolute Positioning
			state.relative = false;

		} else if ( cmd === 'G91' ) {

			//G91: Set to state.relative Positioning
			state.relative = true;

		} else if ( cmd === 'G92' ) {

			//G92: Set Position
			var line = state;
			line.x = args.x !== undefined ? args.x : line.x;
			line.y = args.y !== undefined ? args.y : line.y;
			line.z = args.z !== undefined ? args.z : line.z;
			line.e = args.e !== undefined ? args.e : line.e;
			state = line;

		} else {

			//console.warn( 'THREE.GCodeLoader: Command not supported:' + cmd );

		}

	}

	/*
function addObject( vertex, extruding ) {

		var geometry = new THREE.BufferGeometry();
		geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertex, 3 ) );

		var segments = new THREE.LineSegments( geometry, extruding ? extrudingMaterial : pathMaterial );
        //var segments = new THREE.Mesh( geometry, pathMaterial );

		segments.name = 'layer' + i;
		object.add( segments );

	}*/

	/*
var object = new THREE.Group();
	object.name = 'gcode';

    //var gcode_start = Math.round((layers.length/100)*global_var_gcode_start);
    var gcode_end = Math.round(global_var_gcode_end * (layers.length/100))

    //console.log(gcode_start);
    console.log(global_var_gcode_end);

    if ( this.splitLayer ) {

		for ( var i = 0; i < gcode_end; i ++ ) {

			var layer = layers[ i ];
			addObject( layer.vertex, true );
			addObject( layer.pathVertex, false );

		}

	} else {

		var vertex = [], pathVertex = [];

		for ( var i = 0; i < gcode_end; i ++ ) {

			var layer = layers[ i ];

			vertex = vertex.concat( layer.vertex );
			pathVertex = pathVertex.concat( layer.pathVertex );

		}

		addObject( vertex, true );
		addObject( pathVertex, false );

	}

	object.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0 ) );*/


    display_gcode_3Dlines(points);

    function display_gcode_3Dlines(get_points){
        var points = get_points;

        var radius = 0.23;    // nozzle diameter /2 + 0.03
        var radius_sp = radius;
        var faces = 4;
        var faces_sp = 4;

        var length;
        var combined = new THREE.Geometry();

        console.log(points.length/4);
        console.log("loading ...");

        for ( var i = 0; i < (points.length/4)-1; i++ ) {

            if(points[i].x == points[i+1].x && points[i].y == points[i+1].y && points[i].z == points[i+1].z){
                //console.log("--");
            } else {

                var geometry_sph = new THREE.SphereGeometry( radius_sp, faces_sp, faces_sp );
                mesh = new THREE.Mesh( geometry_sph );
                mesh.position.set(points[i].x, points[i].y, points[i].z);

                mesh.updateMatrix();
                combined.merge( mesh.geometry, mesh.matrix );

                length = points[i].distanceTo( points[1+i] );
                var geometry = new THREE.CylinderGeometry(radius, radius, length, faces, faces);
                geometry.translate( 0, length / 2, 0 );
                geometry.rotateX( Math.PI / 2 );

                var mesh = new THREE.Mesh(geometry);
                mesh.lookAt(points[i+1].x - points[i].x, points[i+1].y - points[i].y, points[i+1].z - points[i].z );
                mesh.position.set(points[i].x, points[i].y, points[i].z);

                mesh.updateMatrix();
                combined.merge( mesh.geometry, mesh.matrix );
            }

        }

        var material = new THREE.MeshPhongMaterial( { color: 0x008CC1, shininess: 10 } );
        var mesh = new THREE.Mesh( combined, material );
        mesh.rotateX( -Math.PI / 2 );
        mesh.position.set( -100,0,100 );
        scene.add( mesh );

        //function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
    }

    function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

    //get_points = points;
	//return object;
	//return points;
	return ">> loaded";

};
