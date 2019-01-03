/*
 * WARNING: This file was auto-generated. Changes will be lost!
 */

#include <cstring>
#include <cstdlib>
#include <ostream>
#include <sstream>
#include <libslic3r/GCodeSender.hpp>

#ifdef __cplusplus
extern "C" {
#endif
#include "EXTERN.h"
#include "perl.h"
#include "XSUB.h"
#include "ppport.h"
#undef do_open
#undef do_close
#ifdef __cplusplus
}
#endif

MODULE = Slic3r::XS	PACKAGE = Slic3r::XS

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/SLAPrint.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/GUI.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Geometry.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/MotionPlanner.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Layer.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/SlicingAdaptive.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/ConditionalGcode.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/SurfaceCollection.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/GCodeSender.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/XS.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Flow.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Point.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Clipper.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/TriangleMesh.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/BoundingBox.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/GCodeTimeEstimator.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Model.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Config.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/LayerHeightSpline.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/GUI_3DScene.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/SupportMaterial.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/GCodeWriter.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Surface.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/GCode.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Line.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Polygon.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/PerimeterGenerator.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/PlaceholderParser.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/ExtrusionPath.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/ExPolygonCollection.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/PolylineCollection.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Print.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/ExtrusionLoop.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/BridgeDetector.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/ExtrusionEntityCollection.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Polyline.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/ExPolygon.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Extruder.xsp"

INCLUDE_COMMAND: $^X -MExtUtils::XSpp::Cmd -e xspp -- -t "/Users/jankovar/Slic3r/xs/xsp/typemap.xspt"  "/Users/jankovar/Slic3r/xs/xsp/Filler.xsp"

