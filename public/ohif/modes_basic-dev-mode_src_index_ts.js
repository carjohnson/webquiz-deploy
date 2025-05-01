"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["modes_basic-dev-mode_src_index_ts"],{

/***/ "../../../modes/basic-dev-mode/src/id.js":
/*!***********************************************!*\
  !*** ../../../modes/basic-dev-mode/src/id.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/basic-dev-mode/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../modes/basic-dev-mode/src/index.ts":
/*!**************************************************!*\
  !*** ../../../modes/basic-dev-mode/src/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _toolbarButtons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolbarButtons.js */ "../../../modes/basic-dev-mode/src/toolbarButtons.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./id */ "../../../modes/basic-dev-mode/src/id.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





const configs = {
  Length: {}
  //
};
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  measurements: '@ohif/extension-default.panelModule.measure',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList'
};
const cs3d = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video',
  viewport: '@ohif/extension-dicom-video.viewportModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1'
};
function modeFactory({
  modeConfiguration
}) {
  return {
    id: _id__WEBPACK_IMPORTED_MODULE_2__.id,
    routeName: 'dev',
    displayName: i18next__WEBPACK_IMPORTED_MODULE_3__["default"].t('Modes:Basic Dev Viewer'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({
      servicesManager,
      extensionManager
    }) => {
      const {
        toolbarService,
        toolGroupService
      } = servicesManager.services;
      const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
      const {
        toolNames,
        Enums
      } = utilityModule.exports;
      const tools = {
        active: [{
          toolName: toolNames.WindowLevel,
          bindings: [{
            mouseButton: Enums.MouseBindings.Primary
          }]
        }, {
          toolName: toolNames.Pan,
          bindings: [{
            mouseButton: Enums.MouseBindings.Auxiliary
          }]
        }, {
          toolName: toolNames.Zoom,
          bindings: [{
            mouseButton: Enums.MouseBindings.Secondary
          }]
        }, {
          toolName: toolNames.StackScroll,
          bindings: [{
            mouseButton: Enums.MouseBindings.Wheel
          }]
        }],
        passive: [{
          toolName: toolNames.Length
        }, {
          toolName: toolNames.Bidirectional
        }, {
          toolName: toolNames.Probe
        }, {
          toolName: toolNames.EllipticalROI
        }, {
          toolName: toolNames.CircleROI
        }, {
          toolName: toolNames.RectangleROI
        }, {
          toolName: toolNames.StackScroll
        }, {
          toolName: toolNames.CalibrationLine
        }],
        // enabled
        enabled: [{
          toolName: toolNames.ImageOverlayViewer
        }]
        // disabled
      };
      toolGroupService.createToolGroupAndAddTools('default', tools);
      toolbarService.addButtons(_toolbarButtons_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
      toolbarService.createButtonSection('primary', ['MeasurementTools', 'Zoom', 'WindowLevel', 'Pan', 'Layout', 'MoreTools']);
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolGroupService,
        measurementService,
        toolbarService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      uiDialogService.dismissAll();
      uiModalService.hide();
      toolGroupService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: ({
      modalities
    }) => {
      const modalities_list = modalities.split('\\');

      // Slide Microscopy modality not supported by basic mode yet
      return {
        valid: !modalities_list.includes('SM'),
        description: 'The mode does not support the following modalities: SM'
      };
    },
    routes: [{
      path: 'viewer-cs3d',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: ({
        location,
        servicesManager
      }) => {
        return {
          id: ohif.layout,
          props: {
            // TODO: Should be optional, or required to pass empty array for slots?
            leftPanels: [ohif.thumbnailList],
            rightPanels: [ohif.measurements],
            viewports: [{
              namespace: cs3d.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler]
            }, {
              namespace: dicomvideo.viewport,
              displaySetsToDisplay: [dicomvideo.sopClassHandler]
            }, {
              namespace: dicompdf.viewport,
              displaySetsToDisplay: [dicompdf.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    hangingProtocol: 'default',
    sopClassHandlers: [dicomvideo.sopClassHandler, ohif.sopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler],
    hotkeys: [..._ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys.defaults.hotkeyBindings]
  };
}
const mode = {
  id: _id__WEBPACK_IMPORTED_MODULE_2__.id,
  modeFactory,
  extensionDependencies
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mode);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../modes/basic-dev-mode/src/toolbarButtons.js":
/*!***********************************************************!*\
  !*** ../../../modes/basic-dev-mode/src/toolbarButtons.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const {
  windowLevelPresets
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.defaults;
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    commands: [{
      commandName: 'setWindowLevel',
      commandOptions: {
        ...windowLevelPresets[preset]
      },
      context: 'CORNERSTONE'
    }]
  };
}
function _createSetToolActiveCommands(toolName, toolGroupIds = ['default', 'mpr']) {
  return toolGroupIds.map(toolGroupId => ({
    commandName: 'setToolActive',
    commandOptions: {
      toolGroupId,
      toolName
    },
    context: 'CORNERSTONE'
  }));
}
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.splitButton',
  props: {
    groupId: 'MeasurementTools',
    evaluate: 'evaluate.group.promoteToPrimaryIfCornerstoneToolNotActiveInTheList',
    primary: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'Length',
      icon: 'tool-length',
      label: 'Length',
      tooltip: 'Length Tool',
      commands: _createSetToolActiveCommands('Length'),
      evaluate: 'evaluate.cornerstoneTool'
    }),
    secondary: {
      icon: 'chevron-down',
      tooltip: 'More Measure Tools'
    },
    items: [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'Bidirectional',
      icon: 'tool-bidirectional',
      label: 'Bidirectional',
      tooltip: 'Bidirectional Tool',
      commands: _createSetToolActiveCommands('Bidirectional'),
      evaluate: 'evaluate.cornerstoneTool'
    }), _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'EllipticalROI',
      icon: 'tool-ellipse',
      label: 'Ellipse',
      tooltip: 'Ellipse ROI',
      commands: _createSetToolActiveCommands('EllipticalROI'),
      evaluate: 'evaluate.cornerstoneTool'
    }), _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'CircleROI',
      icon: 'tool-circle',
      label: 'Circle',
      tooltip: 'Circle Tool',
      commands: _createSetToolActiveCommands('CircleROI'),
      evaluate: 'evaluate.cornerstoneTool'
    })]
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-zoom',
    label: 'Zoom',
    commands: _createSetToolActiveCommands('Zoom'),
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'WindowLevel',
  uiType: 'ohif.splitButton',
  props: {
    groupId: 'WindowLevel',
    primary: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'WindowLevel',
      icon: 'tool-window-level',
      label: 'Window Level',
      tooltip: 'Window Level',
      commands: _createSetToolActiveCommands('WindowLevel'),
      evaluate: 'evaluate.cornerstoneTool'
    }),
    secondary: {
      icon: 'chevron-down',
      tooltip: 'W/L Presets'
    },
    renderer: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.WindowLevelMenuItem,
    items: [_createWwwcPreset(1, 'Soft tissue', '400 / 40'), _createWwwcPreset(2, 'Lung', '1500 / -600'), _createWwwcPreset(3, 'Liver', '150 / 90'), _createWwwcPreset(4, 'Bone', '2500 / 480'), _createWwwcPreset(5, 'Brain', '80 / 40')]
  }
}, {
  id: 'Pan',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-move',
    label: 'Pan',
    commands: _createSetToolActiveCommands('Pan'),
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Capture',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-capture',
    label: 'Capture',
    commands: [{
      commandName: 'showDownloadViewportModal',
      context: 'CORNERSTONE'
    }],
    evaluate: ['evaluate.action', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'wholeSlide']
    }]
  }
}, {
  id: 'Layout',
  uiType: 'ohif.layoutSelector',
  props: {
    rows: 3,
    columns: 4,
    evaluate: 'evaluate.action',
    commands: [{
      commandName: 'setViewportGridLayout'
    }]
  }
}, {
  id: 'MoreTools',
  uiType: 'ohif.splitButton',
  props: {
    groupId: 'MoreTools',
    evaluate: 'evaluate.group.promoteToPrimaryIfCornerstoneToolNotActiveInTheList',
    primary: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'Reset',
      icon: 'tool-reset',
      label: 'Reset View',
      tooltip: 'Reset View',
      commands: [{
        commandName: 'resetViewport',
        context: 'CORNERSTONE'
      }],
      evaluate: 'evaluate.action'
    }),
    secondary: {
      icon: 'chevron-down',
      tooltip: 'More Tools'
    },
    items: [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'Reset',
      icon: 'tool-reset',
      label: 'Reset View',
      tooltip: 'Reset View',
      commands: [{
        commandName: 'resetViewport',
        context: 'CORNERSTONE'
      }],
      evaluate: 'evaluate.action'
    }), _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'RotateRight',
      icon: 'tool-rotate-right',
      label: 'Rotate Right',
      tooltip: 'Rotate Right +90',
      commands: [{
        commandName: 'rotateViewportCW',
        context: 'CORNERSTONE'
      }],
      evaluate: 'evaluate.action'
    }), _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'FlipHorizontal',
      icon: 'tool-flip-horizontal',
      label: 'Flip Horizontally',
      tooltip: 'Flip Horizontally',
      commands: [{
        commandName: 'flipViewportHorizontal',
        context: 'CORNERSTONE'
      }],
      evaluate: 'evaluate.action'
    }), _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'StackScroll',
      icon: 'tool-stack-scroll',
      label: 'Stack Scroll',
      tooltip: 'Stack Scroll',
      commands: _createSetToolActiveCommands('StackScroll'),
      evaluate: 'evaluate.cornerstoneTool'
    }), _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'Invert',
      icon: 'tool-invert',
      label: 'Invert Colors',
      tooltip: 'Invert Colors',
      commands: [{
        commandName: 'invertViewport',
        context: 'CORNERSTONE'
      }],
      evaluate: 'evaluate.action'
    }), _ohif_core__WEBPACK_IMPORTED_MODULE_1__.ToolbarService.createButton({
      id: 'CalibrationLine',
      icon: 'tool-calibration',
      label: 'Calibration Line',
      tooltip: 'Calibration Line',
      commands: _createSetToolActiveCommands('CalibrationLine'),
      evaluate: 'evaluate.cornerstoneTool'
    })]
  }
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toolbarButtons);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (false) {}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../modes/basic-dev-mode/package.json":
/*!**************************************************!*\
  !*** ../../../modes/basic-dev-mode/package.json ***!
  \**************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-basic-dev-mode","version":"3.9.1","description":"Basic OHIF Viewer Using Cornerstone","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-mode-basic-dev-mode.umd.js","module":"src/index.ts","engines":{"node":">=10","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.9.1","@ohif/extension-cornerstone":"3.9.1","@ohif/extension-cornerstone-dicom-sr":"3.9.1","@ohif/extension-default":"3.9.1","@ohif/extension-dicom-pdf":"3.9.1","@ohif/extension-dicom-video":"3.9.1"},"dependencies":{"@babel/runtime":"^7.20.13","i18next":"^17.0.3"},"devDependencies":{"webpack":"5.94.0","webpack-merge":"^5.7.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_basic-dev-mode_src_index_ts.js.map