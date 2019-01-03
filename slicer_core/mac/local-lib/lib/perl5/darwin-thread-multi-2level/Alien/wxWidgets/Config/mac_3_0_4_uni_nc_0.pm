package Alien::wxWidgets::Config::mac_3_0_4_uni_nc_0;

use strict;

our %VALUES;

{
    no strict 'vars';
    %VALUES = %{
$VAR1 = {
          '_libraries' => {
                            'adv' => {
                                       'dll' => 'libwx_osx_cocoau_adv-3.0.dylib',
                                       'link' => '-lwx_osx_cocoau_adv-3.0'
                                     },
                            'aui' => {
                                       'dll' => 'libwx_osx_cocoau_aui-3.0.dylib',
                                       'link' => '-lwx_osx_cocoau_aui-3.0'
                                     },
                            'base' => {
                                        'dll' => 'libwx_baseu-3.0.dylib',
                                        'link' => '-lwx_baseu-3.0'
                                      },
                            'core' => {
                                        'dll' => 'libwx_osx_cocoau_core-3.0.dylib',
                                        'link' => '-lwx_osx_cocoau_core-3.0'
                                      },
                            'gl' => {
                                      'dll' => 'libwx_osx_cocoau_gl-3.0.dylib',
                                      'link' => '-lwx_osx_cocoau_gl-3.0'
                                    },
                            'html' => {
                                        'dll' => 'libwx_osx_cocoau_html-3.0.dylib',
                                        'link' => '-lwx_osx_cocoau_html-3.0'
                                      },
                            'media' => {
                                         'dll' => 'libwx_osx_cocoau_media-3.0.dylib',
                                         'link' => '-lwx_osx_cocoau_media-3.0'
                                       },
                            'net' => {
                                       'dll' => 'libwx_baseu_net-3.0.dylib',
                                       'link' => '-lwx_baseu_net-3.0'
                                     },
                            'propgrid' => {
                                            'dll' => 'libwx_osx_cocoau_propgrid-3.0.dylib',
                                            'link' => '-lwx_osx_cocoau_propgrid-3.0'
                                          },
                            'qa' => {
                                      'dll' => 'libwx_osx_cocoau_qa-3.0.dylib',
                                      'link' => '-lwx_osx_cocoau_qa-3.0'
                                    },
                            'ribbon' => {
                                          'dll' => 'libwx_osx_cocoau_ribbon-3.0.dylib',
                                          'link' => '-lwx_osx_cocoau_ribbon-3.0'
                                        },
                            'richtext' => {
                                            'dll' => 'libwx_osx_cocoau_richtext-3.0.dylib',
                                            'link' => '-lwx_osx_cocoau_richtext-3.0'
                                          },
                            'stc' => {
                                       'dll' => 'libwx_osx_cocoau_stc-3.0.dylib',
                                       'link' => '-lwx_osx_cocoau_stc-3.0'
                                     },
                            'webview' => {
                                           'dll' => 'libwx_osx_cocoau_webview-3.0.dylib',
                                           'link' => '-lwx_osx_cocoau_webview-3.0'
                                         },
                            'xml' => {
                                       'dll' => 'libwx_baseu_xml-3.0.dylib',
                                       'link' => '-lwx_baseu_xml-3.0'
                                     },
                            'xrc' => {
                                       'dll' => 'libwx_osx_cocoau_xrc-3.0.dylib',
                                       'link' => '-lwx_osx_cocoau_xrc-3.0'
                                     }
                          },
          'alien_base' => 'mac_3_0_4_uni_nc_0',
          'alien_package' => 'Alien::wxWidgets::Config::mac_3_0_4_uni_nc_0',
          'c_flags' => '-UWX_PRECOMP ',
          'compiler' => 'clang++ -mmacosx-version-min=10.14',
          'config' => {
                        'build' => 'multi',
                        'compiler_kind' => 'nc',
                        'compiler_version' => 0,
                        'debug' => 0,
                        'mslu' => 0,
                        'toolkit' => 'mac',
                        'unicode' => 1
                      },
          'defines' => '-D_FILE_OFFSET_BITS=64 -DWXUSINGDLL -D__WXMAC__ -D__WXOSX__ -D__WXOSX_COCOA__ ',
          'include_path' => '-I/usr/local/lib/wx/include/osx_cocoa-unicode-3.0 -I/usr/local/include/wx-3.0 ',
          'link_flags' => '',
          'linker' => 'clang++ -mmacosx-version-min=10.14',
          'prefix' => '/usr/local',
          'version' => '3.000004'
        };
    };
}

my $key = substr __PACKAGE__, 1 + rindex __PACKAGE__, ':';

sub values { %VALUES, key => $key }

sub config {
   +{ %{$VALUES{config}},
      package       => __PACKAGE__,
      key           => $key,
      version       => $VALUES{version},
      }
}

1;
