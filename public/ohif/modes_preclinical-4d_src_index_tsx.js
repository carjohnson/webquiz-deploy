"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["modes_preclinical-4d_src_index_tsx"],{

/***/ "../../../modes/preclinical-4d/src/getWorkflowSettings.ts":
/*!****************************************************************!*\
  !*** ../../../modes/preclinical-4d/src/getWorkflowSettings.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWorkflowSettings)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const dynamicVolume = {
  sopClassHandler: '@ohif/extension-cornerstone-dynamic-volume.sopClassHandlerModule.dynamic-volume',
  leftPanel: '@ohif/extension-cornerstone-dynamic-volume.panelModule.dynamic-volume',
  segmentation: '@ohif/extension-cornerstone-dynamic-volume.panelModule.dynamic-segmentation'
};
const cornerstone = {
  segmentation: '@ohif/extension-cornerstone.panelModule.panelSegmentationNoHeader',
  activeViewportWindowLevel: '@ohif/extension-cornerstone.panelModule.activeViewportWindowLevel'
};
const defaultButtons = {
  buttonSection: 'primary',
  buttons: ['MeasurementTools', 'Zoom', 'WindowLevel', 'Crosshairs', 'Pan']
};
const defaultLeftPanel = [[dynamicVolume.leftPanel, cornerstone.activeViewportWindowLevel]];
const defaultLayout = {
  panels: {
    left: defaultLeftPanel,
    right: []
  }
};
function getWorkflowSettings({
  servicesManager
}) {
  return {
    steps: [{
      id: 'dataPreparation',
      name: 'Data Preparation',
      layout: {
        panels: {
          left: defaultLeftPanel
        }
      },
      toolbarButtons: defaultButtons,
      hangingProtocol: {
        protocolId: 'default4D',
        stageId: 'dataPreparation'
      },
      info: 'In the Data Preparation step, you can visualize the dynamic PT volume data in three orthogonal views: axial, sagittal, and coronal. Use the left panel controls to adjust the visualization settings, such as playback speed, or navigate between different frames. This step allows you to assess the quality of the PT data and prepare for further analysis or registration with other modalities.'
    }, {
      id: 'registration',
      name: 'Registration',
      layout: defaultLayout,
      toolbarButtons: defaultButtons,
      hangingProtocol: {
        protocolId: 'default4D',
        stageId: 'registration'
      },
      info: 'The Registration step provides a comprehensive view of the CT, PT, and fused CT-PT volume data in multiple orientations. The fusion viewports display the CT and PT volumes overlaid, allowing you to visually assess the alignment and registration between the two modalities. The individual CT and PT viewports are also available for side-by-side comparison. This step is crucial for ensuring proper registration before proceeding with further analysis or quantification.'
    }, {
      id: 'roiQuantification',
      name: 'ROI Quantification',
      layout: {
        panels: {
          left: defaultLeftPanel,
          right: [[dynamicVolume.segmentation]]
        },
        options: {
          leftPanelClosed: false,
          rightPanelClosed: false
        }
      },
      toolbarButtons: [defaultButtons, {
        buttonSection: 'dynamic-toolbox',
        buttons: ['BrushTools', 'RectangleROIStartEndThreshold']
      }],
      hangingProtocol: {
        protocolId: 'default4D',
        stageId: 'roiQuantification'
      },
      info: 'The ROI quantification step allows you to define regions of interest (ROIs) with labelmap segmentations, on the fused CT-PT volume data using the labelmap tools. The left panel provides controls for adjusting the dynamic volume visualization, while the right panel offers tools for segmentation, editing, and exporting the ROI data. This step enables you to quantify the uptake or other measures within the defined ROIs for further analysis.'
    }, {
      id: 'kineticAnalysis',
      name: 'Kinetic Analysis',
      layout: defaultLayout,
      toolbarButtons: defaultButtons,
      hangingProtocol: {
        protocolId: 'default4D',
        stageId: 'kineticAnalysis'
      },
      onEnter: [{
        commandName: 'updateSegmentationsChartDisplaySet',
        options: {
          servicesManager
        }
      }],
      info: 'The Kinetic Analysis step provides a comprehensive view for visualizing and analyzing the dynamic data derived from the ROI segmentations. The fusion viewports display the combined CT-PT volume data, while a dedicated viewport shows a series chart representing the data over time. This step allows you to explore the temporal dynamics of the uptake or other kinetic measures within the defined regions of interest, enabling further quantitative analysis and modeling.'
    }]
  };
}


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

/***/ "../../../modes/preclinical-4d/src/id.js":
/*!***********************************************!*\
  !*** ../../../modes/preclinical-4d/src/id.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../modes/preclinical-4d/package.json");
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

/***/ "../../../modes/preclinical-4d/src/index.tsx":
/*!***************************************************!*\
  !*** ../../../modes/preclinical-4d/src/index.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../modes/preclinical-4d/src/id.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _initWorkflowSteps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./initWorkflowSteps */ "../../../modes/preclinical-4d/src/initWorkflowSteps.ts");
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initToolGroups */ "../../../modes/preclinical-4d/src/initToolGroups.tsx");
/* harmony import */ var _toolbarButtons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toolbarButtons */ "../../../modes/preclinical-4d/src/toolbarButtons.tsx");
/* harmony import */ var _segmentationButtons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./segmentationButtons */ "../../../modes/preclinical-4d/src/segmentationButtons.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const extensionDependencies = {
  '@ohif/extension-default': '3.7.0-beta.76',
  '@ohif/extension-cornerstone': '3.7.0-beta.76',
  '@ohif/extension-cornerstone-dynamic-volume': '3.7.0-beta.76',
  '@ohif/extension-cornerstone-dicom-seg': '3.7.0-beta.76',
  '@ohif/extension-tmtv': '3.7.0-beta.76'
};
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  defaultSopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  chartSopClassHandler: '@ohif/extension-default.sopClassHandlerModule.chart',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-default.panelModule.measure',
  chartViewport: '@ohif/extension-default.viewportModule.chartViewport'
};
const dynamicVolume = {
  leftPanel: '@ohif/extension-cornerstone-dynamic-volume.panelModule.dynamic-volume'
};
const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
  activeViewportWindowLevel: '@ohif/extension-cornerstone.panelModule.activeViewportWindowLevel'
};
function modeFactory({
  modeConfiguration
}) {
  return {
    id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
    routeName: 'dynamic-volume',
    displayName: 'Preclinical 4D',
    onModeEnter: function ({
      servicesManager,
      extensionManager,
      commandsManager
    }) {
      const {
        measurementService,
        toolbarService,
        cineService,
        cornerstoneViewportService,
        toolGroupService,
        customizationService,
        viewportGridService
      } = servicesManager.services;
      const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
      const {
        toolNames,
        Enums
      } = utilityModule.exports;
      measurementService.clearMeasurements();
      (0,_initToolGroups__WEBPACK_IMPORTED_MODULE_3__["default"])({
        toolNames,
        Enums,
        toolGroupService,
        commandsManager,
        servicesManager
      });
      toolbarService.addButtons([..._toolbarButtons__WEBPACK_IMPORTED_MODULE_4__["default"], ..._segmentationButtons__WEBPACK_IMPORTED_MODULE_5__["default"]]);
      toolbarService.createButtonSection('secondary', ['ProgressDropdown']);

      // the primary button section is created in the workflow steps
      // specific to the step
      customizationService.addModeCustomizations([{
        id: 'PanelSegmentation.tableMode',
        mode: 'expanded'
      }, {
        id: 'PanelSegmentation.onSegmentationAdd',
        onSegmentationAdd: () => {
          commandsManager.run('createNewLabelMapForDynamicVolume');
        }
      }, {
        id: 'PanelSegmentation.showAddSegment',
        showAddSegment: false
      }, {
        id: 'PanelSegmentation.readableText',
        // remove following if you are not interested in that stats
        readableText: {
          lesionStats: 'Lesion Statistics',
          minValue: 'Minimum Value',
          maxValue: 'Maximum Value',
          meanValue: 'Mean Value (ml)',
          volume: 'Volume',
          suvPeak: 'SUV Peak',
          suvMax: 'Maximum SUV',
          suvMaxIJK: 'SUV Max IJK'
        }
      }]);

      // Auto play the clip initially when the volumes are loaded
      const {
        unsubscribe
      } = cornerstoneViewportService.subscribe(cornerstoneViewportService.EVENTS.VIEWPORT_VOLUMES_CHANGED, () => {
        const viewportId = viewportGridService.getActiveViewportId();
        const csViewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
        cineService.playClip(csViewport.element, {
          viewportId
        });
        // cineService.setIsCineEnabled(true);

        unsubscribe();
      });
    },
    onSetupRouteComplete: ({
      servicesManager
    }) => {
      // This needs to run after hanging protocol matching process because
      // it may change the protocol/stage based on workflow stage settings
      (0,_initWorkflowSteps__WEBPACK_IMPORTED_MODULE_2__["default"])({
        servicesManager
      });
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService
      } = servicesManager.services;
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    get validationTags() {
      return {
        study: [],
        series: []
      };
    },
    isValidMode: ({
      modalities,
      study
    }) => {
      // Todo: we need to find a better way to validate the mode
      return {
        valid: study.mrn === 'M1',
        description: 'This mode is only available for 4D PET/CT studies.'
      };
    },
    /**
     * Mode Routes are used to define the mode's behavior. A list of Mode Route
     * that includes the mode's path and the layout to be used. The layout will
     * include the components that are used in the layout. For instance, if the
     * default layoutTemplate is used (id: '@ohif/extension-default.layoutTemplateModule.viewerLayout')
     * it will include the leftPanels, rightPanels, and viewports. However, if
     * you define another layoutTemplate that includes a Footer for instance,
     * you should provide the Footer component here too. Note: We use Strings
     * to reference the component's ID as they are registered in the internal
     * ExtensionManager. The template for the string is:
     * `${extensionId}.{moduleType}.${componentId}`.
     */
    routes: [{
      path: 'preclinical-4d',
      layoutTemplate: ({
        location,
        servicesManager
      }) => {
        return {
          id: ohif.layout,
          props: {
            leftPanels: [[dynamicVolume.leftPanel, cornerstone.activeViewportWindowLevel]],
            rightPanels: [],
            rightPanelClosed: true,
            viewports: [{
              namespace: cornerstone.viewport,
              displaySetsToDisplay: [ohif.defaultSopClassHandler]
            }, {
              namespace: ohif.chartViewport,
              displaySetsToDisplay: [ohif.chartSopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    // Default protocol gets self-registered by default in the init
    hangingProtocol: 'default4D',
    // Order is important in sop class handlers when two handlers both use
    // the same sop class under different situations.  In that case, the more
    // general handler needs to come last.  For this case, the dicomvideo must
    // come first to remove video transfer syntax before ohif uses images
    sopClassHandlers: [ohif.chartSopClassHandler, ohif.defaultSopClassHandler],
    hotkeys: [..._ohif_core__WEBPACK_IMPORTED_MODULE_1__.hotkeys.defaults.hotkeyBindings]
  };
}
const mode = {
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
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

/***/ "../../../modes/preclinical-4d/src/initToolGroups.tsx":
/*!************************************************************!*\
  !*** ../../../modes/preclinical-4d/src/initToolGroups.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initToolGroups),
/* harmony export */   toolGroupIds: () => (/* binding */ toolGroupIds)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const toolGroupIds = {
  default: 'dynamic4D-default',
  PT: 'dynamic4D-pt',
  Fusion: 'dynamic4D-fusion',
  CT: 'dynamic4D-ct'
};
const colours = {
  'viewport-0': 'rgb(200, 0, 0)',
  'viewport-1': 'rgb(200, 200, 0)',
  'viewport-2': 'rgb(0, 200, 0)'
};
const colorsByOrientation = {
  axial: 'rgb(200, 0, 0)',
  sagittal: 'rgb(200, 200, 0)',
  coronal: 'rgb(0, 200, 0)'
};
function _initToolGroups(toolNames, Enums, toolGroupService, commandsManager, servicesManager) {
  const {
    cornerstoneViewportService
  } = servicesManager.services;
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
      toolName: toolNames.ArrowAnnotate
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.RectangleROIThreshold
    }, {
      toolName: toolNames.RectangleScissors
    }, {
      toolName: toolNames.PaintFill
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: 'CircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_CIRCLE',
        brushSize: 7
      }
    }, {
      toolName: 'CircularEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_CIRCLE',
        brushSize: 7
      }
    }, {
      toolName: 'SphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'FILL_INSIDE_SPHERE',
        brushSize: 7
      }
    }, {
      toolName: 'SphereEraser',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'ERASE_INSIDE_SPHERE',
        brushSize: 7
      }
    }, {
      toolName: 'ThresholdCircularBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_CIRCLE',
        brushSize: 7
      }
    }, {
      toolName: 'ThresholdSphereBrush',
      parentTool: 'Brush',
      configuration: {
        activeStrategy: 'THRESHOLD_INSIDE_SPHERE',
        brushSize: 7
      }
    }, {
      toolName: toolNames.CircleScissors
    }, {
      toolName: toolNames.RectangleScissors
    }, {
      toolName: toolNames.SphereScissors
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Magnify
    }],
    enabled: [],
    disabled: [{
      toolName: toolNames.Crosshairs,
      configuration: {
        viewportIndicators: true,
        viewportIndicatorsConfig: {
          circleRadius: 5,
          xOffset: 0.95,
          yOffset: 0.05
        },
        disableOnPassive: true,
        autoPan: {
          enabled: false,
          panSize: 10
        },
        getReferenceLineColor: viewportId => {
          const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
          const viewportOptions = viewportInfo?.viewportOptions;
          if (viewportOptions) {
            return colours[viewportOptions.id] || colorsByOrientation[viewportOptions.orientation] || '#0c0';
          } else {
            console.warn('missing viewport?', viewportId);
            return '#0c0';
          }
        }
      }
    }]
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.PT, {
    ...tools,
    passive: [...tools.passive, {
      toolName: 'RectangleROIStartEndThreshold'
    }]
  });
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.CT, {
    ...tools,
    passive: [...tools.passive, {
      toolName: 'RectangleROIStartEndThreshold'
    }]
  });
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.Fusion, {
    ...tools,
    passive: [...tools.passive, {
      toolName: 'RectangleROIStartEndThreshold'
    }]
  });
  toolGroupService.createToolGroupAndAddTools(toolGroupIds.default, tools);
}
function initToolGroups({
  toolNames,
  Enums,
  toolGroupService,
  commandsManager,
  servicesManager
}) {
  _initToolGroups(toolNames, Enums, toolGroupService, commandsManager, servicesManager);
}


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

/***/ "../../../modes/preclinical-4d/src/initWorkflowSteps.ts":
/*!**************************************************************!*\
  !*** ../../../modes/preclinical-4d/src/initWorkflowSteps.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initWorkflowSteps)
/* harmony export */ });
/* harmony import */ var _getWorkflowSettings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWorkflowSettings */ "../../../modes/preclinical-4d/src/getWorkflowSettings.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function initWorkflowSteps({
  servicesManager
}) {
  const {
    workflowStepsService
  } = servicesManager.services;
  const workflowSettings = (0,_getWorkflowSettings__WEBPACK_IMPORTED_MODULE_0__["default"])({
    servicesManager
  });
  workflowStepsService.addWorkflowSteps(workflowSettings.steps);
  workflowStepsService.setActiveWorkflowStep(workflowSettings.steps[0].id);
}

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

/***/ "../../../modes/preclinical-4d/src/segmentationButtons.ts":
/*!****************************************************************!*\
  !*** ../../../modes/preclinical-4d/src/segmentationButtons.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const toolbarButtons = [{
  id: 'BrushTools',
  uiType: 'ohif.buttonGroup',
  props: {
    groupId: 'BrushTools',
    items: [{
      id: 'Brush',
      icon: 'icon-tool-brush',
      label: 'Brush',
      evaluate: {
        name: 'evaluate.cornerstone.segmentation',
        toolNames: ['CircularBrush', 'SphereBrush']
      },
      options: [{
        name: 'Size (mm)',
        id: 'brush-radius',
        type: 'range',
        min: 0.5,
        max: 99.5,
        step: 0.5,
        value: 7,
        commands: {
          commandName: 'setBrushSize',
          commandOptions: {
            toolNames: ['CircularBrush', 'SphereBrush']
          }
        }
      }, {
        name: 'Shape',
        type: 'radio',
        id: 'brush-mode',
        value: 'CircularBrush',
        values: [{
          value: 'CircularBrush',
          label: 'Circle'
        }, {
          value: 'SphereBrush',
          label: 'Sphere'
        }],
        commands: 'setToolActiveToolbar'
      }]
    }, {
      id: 'Eraser',
      icon: 'icon-tool-eraser',
      label: 'Eraser',
      evaluate: {
        name: 'evaluate.cornerstone.segmentation',
        toolNames: ['CircularEraser', 'SphereEraser']
      },
      options: [{
        name: 'Radius (mm)',
        id: 'eraser-radius',
        type: 'range',
        min: 0.5,
        max: 99.5,
        step: 0.5,
        value: 7,
        commands: {
          commandName: 'setBrushSize',
          commandOptions: {
            toolNames: ['CircularEraser', 'SphereEraser']
          }
        }
      }, {
        name: 'Shape',
        type: 'radio',
        id: 'eraser-mode',
        value: 'CircularEraser',
        values: [{
          value: 'CircularEraser',
          label: 'Circle'
        }, {
          value: 'SphereEraser',
          label: 'Sphere'
        }],
        commands: 'setToolActiveToolbar'
      }]
    }, {
      id: 'Threshold',
      icon: 'icon-tool-threshold',
      label: 'Eraser',
      evaluate: {
        name: 'evaluate.cornerstone.segmentation',
        toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush']
      },
      options: [{
        name: 'Radius (mm)',
        id: 'threshold-radius',
        type: 'range',
        min: 0.5,
        max: 99.5,
        step: 0.5,
        value: 7,
        commands: {
          commandName: 'setBrushSize',
          commandOptions: {
            toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush']
          }
        }
      }, {
        name: 'Shape',
        type: 'radio',
        id: 'eraser-mode',
        value: 'ThresholdCircularBrush',
        values: [{
          value: 'ThresholdCircularBrush',
          label: 'Circle'
        }, {
          value: 'ThresholdSphereBrush',
          label: 'Sphere'
        }],
        commands: 'setToolActiveToolbar'
      }, {
        name: 'ThresholdRange',
        type: 'double-range',
        id: 'threshold-range',
        min: 0,
        max: 100,
        step: 0.5,
        value: [2, 50],
        commands: {
          commandName: 'setThresholdRange',
          commandOptions: {
            toolNames: ['ThresholdCircularBrush', 'ThresholdSphereBrush']
          }
        }
      }]
    }]
  }
}, {
  id: 'Shapes',
  uiType: 'ohif.radioGroup',
  props: {
    label: 'Shapes',
    evaluate: {
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['CircleScissor', 'SphereScissor', 'RectangleScissor']
    },
    icon: 'icon-tool-shape',
    options: [{
      name: 'Shape',
      type: 'radio',
      value: 'CircleScissor',
      id: 'shape-mode',
      values: [{
        value: 'CircleScissor',
        label: 'Circle'
      }, {
        value: 'SphereScissor',
        label: 'Sphere'
      }, {
        value: 'RectangleScissor',
        label: 'Rectangle'
      }],
      commands: 'setToolActiveToolbar'
    }]
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

/***/ "../../../modes/preclinical-4d/src/toolbarButtons.tsx":
/*!************************************************************!*\
  !*** ../../../modes/preclinical-4d/src/toolbarButtons.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _initToolGroups__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initToolGroups */ "../../../modes/preclinical-4d/src/initToolGroups.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const {
  createButton
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.ToolbarService;
const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: [_initToolGroups__WEBPACK_IMPORTED_MODULE_1__.toolGroupIds.PT, _initToolGroups__WEBPACK_IMPORTED_MODULE_1__.toolGroupIds.CT, _initToolGroups__WEBPACK_IMPORTED_MODULE_1__.toolGroupIds.Fusion, _initToolGroups__WEBPACK_IMPORTED_MODULE_1__.toolGroupIds.default]
  }
};
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.splitButton',
  props: {
    groupId: 'MeasurementTools',
    evaluate: 'evaluate.group.promoteToPrimaryIfCornerstoneToolNotActiveInTheList',
    primary: createButton({
      id: 'Length',
      icon: 'tool-length',
      label: 'Length',
      tooltip: 'Length Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }),
    secondary: {
      icon: 'chevron-down',
      tooltip: 'More Measure Tools'
    },
    items: [{
      id: 'Length',
      icon: 'tool-length',
      label: 'Length',
      tooltip: 'Length Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }, {
      id: 'Bidirectional',
      icon: 'tool-bidirectional',
      label: 'Bidirectional',
      tooltip: 'Bidirectional Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }, {
      id: 'ArrowAnnotate',
      icon: 'tool-annotate',
      label: 'Annotation',
      tooltip: 'Arrow Annotate',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }, {
      id: 'EllipticalROI',
      icon: 'tool-ellipse',
      label: 'Ellipse',
      tooltip: 'Ellipse ROI',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }]
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-zoom',
    label: 'Zoom',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'WindowLevel',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-window-level',
    label: 'Window Level',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Pan',
  uiType: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-move',
    label: 'Pan',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'TrackballRotate',
  uiType: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-3d-rotate',
    label: '3D Rotate',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'Capture',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-capture',
    label: 'Capture',
    commands: 'showDownloadViewportModal',
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
    evaluate: 'evaluate.action'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-crosshair',
    label: 'Crosshairs',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'ProgressDropdown',
  uiType: 'ohif.progressDropdown'
}, {
  id: 'RectangleROIStartEndThreshold',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-create-threshold',
    label: 'Rectangle ROI Threshold',
    commands: setToolActiveToolbar,
    evaluate: {
      name: 'evaluate.cornerstone.segmentation',
      toolNames: ['RectangleROIStartEndThreshold']
    },
    options: 'tmtv.RectangleROIThresholdOptions'
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

/***/ "../../../modes/preclinical-4d/package.json":
/*!**************************************************!*\
  !*** ../../../modes/preclinical-4d/package.json ***!
  \**************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/mode-preclinical-4d","version":"3.9.1","description":"4D Workflow","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/index.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist/**","public/**","README.md"],"keywords":["ohif-mode"],"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --debug --output-pathinfo","dev:cornerstone":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.9.1","@ohif/extension-cornerstone":"3.9.1","@ohif/extension-cornerstone-dicom-seg":"3.9.1","@ohif/extension-cornerstone-dynamic-volume":"3.9.1","@ohif/extension-default":"3.9.1","@ohif/extension-tmtv":"3.9.1"},"dependencies":{"@babel/runtime":"^7.20.13"},"devDependencies":{"webpack":"5.94.0","webpack-merge":"^5.7.3"}}');

/***/ })

}]);
//# sourceMappingURL=modes_preclinical-4d_src_index_tsx.js.map