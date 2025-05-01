"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx"],{

/***/ "../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function createSEGToolGroupAndAddTools(ToolGroupService, customizationService, toolGroupId) {
  const {
    tools
  } = customizationService.get('cornerstone.overlayViewportTools') ?? {};
  return ToolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSEGToolGroupAndAddTools);

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  HYDRATE_SEG: 5
};
function promptHydrateSEG({
  servicesManager,
  segDisplaySet,
  viewportId,
  preHydrateCallbacks,
  hydrateCallback
}) {
  const {
    uiViewportDialogService
  } = servicesManager.services;
  const extensionManager = servicesManager._extensionManager;
  const appConfig = extensionManager._appConfig;
  return new Promise(async function (resolve, reject) {
    const promptResult = appConfig?.disableConfirmationPrompts ? RESPONSE.HYDRATE_SEG : await _askHydrate(uiViewportDialogService, viewportId);
    if (promptResult === RESPONSE.HYDRATE_SEG) {
      preHydrateCallbacks?.forEach(callback => {
        callback();
      });
      window.setTimeout(async () => {
        const isHydrated = await hydrateCallback({
          segDisplaySet,
          viewportId
        });
        resolve(isHydrated);
      }, 0);
    }
  });
}
function _askHydrate(uiViewportDialogService, viewportId) {
  return new Promise(function (resolve, reject) {
    const message = 'Do you want to open this Segmentation?';
    const actions = [{
      id: 'no-hydrate',
      type: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonEnums.type.secondary,
      text: 'No',
      value: RESPONSE.CANCEL
    }, {
      id: 'yes-hydrate',
      type: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonEnums.type.primary,
      text: 'Yes',
      value: RESPONSE.HYDRATE_SEG
    }];
    const onSubmit = result => {
      uiViewportDialogService.hide();
      resolve(result);
    };
    uiViewportDialogService.show({
      viewportId,
      type: 'info',
      message,
      actions,
      onSubmit,
      onOutsideClick: () => {
        uiViewportDialogService.hide();
        resolve(RESPONSE.CANCEL);
      },
      onKeyPress: event => {
        if (event.key === 'Enter') {
          onSubmit(RESPONSE.HYDRATE_SEG);
        }
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptHydrateSEG);

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/viewports/OHIFCornerstoneSEGViewport.tsx ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _utils_initSEGToolGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/initSEGToolGroup */ "../../../extensions/cornerstone-dicom-seg/src/utils/initSEGToolGroup.ts");
/* harmony import */ var _utils_promptHydrateSEG__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/promptHydrateSEG */ "../../../extensions/cornerstone-dicom-seg/src/utils/promptHydrateSEG.ts");
/* harmony import */ var _getStatusComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_getStatusComponent */ "../../../extensions/cornerstone-dicom-seg/src/viewports/_getStatusComponent.tsx");
/* harmony import */ var _cornerstonejs_tools_enums__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cornerstonejs/tools/enums */ "../../../node_modules/@cornerstonejs/tools/dist/esm/enums/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}







const SEG_TOOLGROUP_BASE_NAME = 'SEGToolGroup';
function OHIFCornerstoneSEGViewport(props) {
  _s2();
  _s();
  const {
    children,
    displaySets,
    viewportOptions,
    servicesManager,
    extensionManager,
    commandsManager
  } = props;
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)('SEGViewport');
  const viewportId = viewportOptions.viewportId;
  const {
    displaySetService,
    toolGroupService,
    segmentationService,
    customizationService,
    viewportActionCornersService
  } = servicesManager.services;
  const toolGroupId = `${SEG_TOOLGROUP_BASE_NAME}-${viewportId}`;

  // SEG viewport will always have a single display set
  if (displaySets.length > 1) {
    throw new Error('SEG viewport should only have a single display set');
  }
  const segDisplaySet = displaySets[0];
  const [viewportGrid, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid)();

  // States
  const [selectedSegment, setSelectedSegment] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);

  // Hydration means that the SEG is opened and segments are loaded into the
  // segmentation panel, and SEG is also rendered on any viewport that is in the
  // same frameOfReferenceUID as the referencedSeriesUID of the SEG. However,
  // loading basically means SEG loading over network and bit unpacking of the
  // SEG data.
  const [isHydrated, setIsHydrated] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(segDisplaySet.isHydrated);
  const [segIsLoading, setSegIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!segDisplaySet.isLoaded);
  const [element, setElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [processingProgress, setProcessingProgress] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    percentComplete: null,
    totalSegments: null
  });

  // refs
  const referencedDisplaySetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    viewports,
    activeViewportId
  } = viewportGrid;
  const referencedDisplaySetInstanceUID = segDisplaySet.referencedDisplaySetInstanceUID;
  const referencedDisplaySet = displaySetService.getDisplaySetByUID(referencedDisplaySetInstanceUID);
  const referencedDisplaySetMetadata = _getReferencedDisplaySetMetadata(referencedDisplaySet, segDisplaySet);
  referencedDisplaySetRef.current = {
    displaySet: referencedDisplaySet,
    metadata: referencedDisplaySetMetadata
  };
  /**
   * OnElementEnabled callback which is called after the cornerstoneExtension
   * has enabled the element. Note: we delegate all the image rendering to
   * cornerstoneExtension, so we don't need to do anything here regarding
   * the image rendering, element enabling etc.
   */
  const onElementEnabled = evt => {
    setElement(evt.detail.element);
  };
  const onElementDisabled = () => {
    setElement(null);
  };
  const storePresentationState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    viewportGrid?.viewports.forEach(({
      viewportId
    }) => {
      commandsManager.runCommand('storePresentation', {
        viewportId
      });
    });
  }, [viewportGrid]);
  const getCornerstoneViewport = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const {
      component: Component
    } = extensionManager.getModuleEntry('@ohif/extension-cornerstone.viewportModule.cornerstone');

    // Todo: jump to the center of the first segment
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _extends({}, props, {
      displaySets: [segDisplaySet],
      viewportOptions: {
        viewportType: viewportOptions.viewportType,
        toolGroupId: toolGroupId,
        orientation: viewportOptions.orientation,
        viewportId: viewportOptions.viewportId,
        presentationIds: viewportOptions.presentationIds
      },
      onElementEnabled: evt => {
        props.onElementEnabled?.(evt);
        onElementEnabled(evt);
      },
      onElementDisabled: onElementDisabled
    }));
  }, [viewportId, segDisplaySet, toolGroupId]);
  const onSegmentChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(direction => {
    const segmentationId = segDisplaySet.displaySetInstanceUID;
    const segmentation = segmentationService.getSegmentation(segmentationId);
    const {
      segments
    } = segmentation;
    const numberOfSegments = Object.keys(segments).length;
    let newSelectedSegmentIndex = selectedSegment + direction;

    // Segment 0 is always background

    if (newSelectedSegmentIndex > numberOfSegments - 1) {
      newSelectedSegmentIndex = 1;
    } else if (newSelectedSegmentIndex === 0) {
      newSelectedSegmentIndex = numberOfSegments - 1;
    }
    segmentationService.jumpToSegmentCenter(segmentationId, newSelectedSegmentIndex, viewportId);
    setSelectedSegment(newSelectedSegmentIndex);
  }, [selectedSegment]);
  const hydrateSEG = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    // update the previously stored segmentationPresentation with the new viewportId
    // presentation so that when we put the referencedDisplaySet back in the viewport
    // it will have the correct segmentation representation hydrated
    commandsManager.runCommand('updateStoredSegmentationPresentation', {
      displaySet: segDisplaySet,
      type: _cornerstonejs_tools_enums__WEBPACK_IMPORTED_MODULE_6__.SegmentationRepresentations.Labelmap
    });

    // update the previously stored positionPresentation with the new viewportId
    // presentation so that when we put the referencedDisplaySet back in the viewport
    // it will be in the correct position zoom and pan
    commandsManager.runCommand('updateStoredPositionPresentation', {
      viewportId,
      displaySetInstanceUID: referencedDisplaySet.displaySetInstanceUID
    });
    viewportGridService.setDisplaySetsForViewport({
      viewportId,
      displaySetInstanceUIDs: [referencedDisplaySet.displaySetInstanceUID]
    });
  }, [commandsManager, viewportId, referencedDisplaySet, segDisplaySet]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (segIsLoading) {
      return;
    }
    (0,_utils_promptHydrateSEG__WEBPACK_IMPORTED_MODULE_4__["default"])({
      servicesManager,
      viewportId,
      segDisplaySet,
      preHydrateCallbacks: [storePresentationState],
      hydrateCallback: hydrateSEG
    }).then(isHydrated => {
      if (isHydrated) {
        setIsHydrated(true);
      }
    });
  }, [servicesManager, viewportId, segDisplaySet, segIsLoading, hydrateSEG]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // on new seg display set, remove all segmentations from all viewports
    segmentationService.clearSegmentationRepresentations(viewportId);
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_LOADING_COMPLETE, evt => {
      if (evt.segDisplaySet.displaySetInstanceUID === segDisplaySet.displaySetInstanceUID) {
        setSegIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [segDisplaySet]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = segmentationService.subscribe(segmentationService.EVENTS.SEGMENT_LOADING_COMPLETE, ({
      percentComplete,
      numSegments
    }) => {
      setProcessingProgress({
        percentComplete,
        totalSegments: numSegments
      });
    });
    return () => {
      unsubscribe();
    };
  }, [segDisplaySet]);

  /**
   Cleanup the SEG viewport when the viewport is destroyed
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onDisplaySetsRemovedSubscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_REMOVED, ({
      displaySetInstanceUIDs
    }) => {
      const activeViewport = viewports.get(activeViewportId);
      if (displaySetInstanceUIDs.includes(activeViewport.displaySetInstanceUID)) {
        viewportGridService.setDisplaySetsForViewport({
          viewportId: activeViewportId,
          displaySetInstanceUIDs: []
        });
      }
    });
    return () => {
      onDisplaySetsRemovedSubscription.unsubscribe();
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let toolGroup = toolGroupService.getToolGroup(toolGroupId);
    if (toolGroup) {
      return;
    }

    // keep the already stored segmentationPresentation for this viewport in memory
    // so that we can restore it after hydrating the SEG
    commandsManager.runCommand('updateStoredSegmentationPresentation', {
      displaySet: segDisplaySet,
      type: _cornerstonejs_tools_enums__WEBPACK_IMPORTED_MODULE_6__.SegmentationRepresentations.Labelmap
    });

    // always start fresh for this viewport since it is special type of viewport
    // that should only show one segmentation at a time.
    segmentationService.clearSegmentationRepresentations(viewportId);

    // This creates a custom tool group which has the lifetime of this view
    // only, and does NOT interfere with currently displayed segmentations.
    toolGroup = (0,_utils_initSEGToolGroup__WEBPACK_IMPORTED_MODULE_3__["default"])(toolGroupService, customizationService, toolGroupId);
    return () => {
      // remove the segmentation representations if seg displayset changed
      // e.g., another seg displayset is dragged into the viewport
      segmentationService.clearSegmentationRepresentations(viewportId);

      // Only destroy the viewport specific implementation
      toolGroupService.destroyToolGroup(toolGroupId);
    };
  }, []);
  const onStatusClick = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    // Before hydrating a SEG and make it added to all viewports in the grid
    // that share the same frameOfReferenceUID, we need to store the viewport grid
    // presentation state, so that we can restore it after hydrating the SEG. This is
    // required if the user has changed the viewport (other viewport than SEG viewport)
    // presentation state (w/l and invert) and then opens the SEG. If we don't store
    // the presentation state, the viewport will be reset to the default presentation
    storePresentationState();
    hydrateSEG();
  }, [storePresentationState, hydrateSEG]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    viewportActionCornersService.addComponents([{
      viewportId,
      id: 'viewportStatusComponent',
      component: (0,_getStatusComponent__WEBPACK_IMPORTED_MODULE_5__["default"])({
        isHydrated,
        onStatusClick
      }),
      indexPriority: -100,
      location: viewportActionCornersService.LOCATIONS.topLeft
    }, {
      viewportId,
      id: 'viewportActionArrowsComponent',
      component: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.ViewportActionArrows, {
        key: "actionArrows",
        onArrowsClick: onSegmentChange,
        className: viewportId === activeViewportId ? 'visible' : 'invisible group-hover/pane:visible'
      }),
      indexPriority: 0,
      location: viewportActionCornersService.LOCATIONS.topRight
    }]);
  }, [activeViewportId, isHydrated, onSegmentChange, onStatusClick, viewportActionCornersService, viewportId]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let childrenWithProps = null;
  if (!referencedDisplaySetRef.current || referencedDisplaySet.displaySetInstanceUID !== referencedDisplaySetRef.current.displaySet.displaySetInstanceUID) {
    return null;
  }
  if (children && children.length) {
    childrenWithProps = children.map((child, index) => {
      return child && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().cloneElement(child, {
        viewportId,
        key: index
      });
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex h-full w-full flex-row overflow-hidden"
  }, segIsLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.LoadingIndicatorTotalPercent, {
    className: "h-full w-full",
    totalNumbers: processingProgress.totalSegments,
    percentComplete: processingProgress.percentComplete,
    loadingText: "Loading SEG..."
  }), getCornerstoneViewport(), childrenWithProps));
}
_s2(OHIFCornerstoneSEGViewport, "YpZ9o81QmqO74UxRqjk3psZEoUg=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid];
});
_c2 = OHIFCornerstoneSEGViewport;
_s(OHIFCornerstoneSEGViewport, "SEAiWRTfJXlkS4oIwyl0Ku6DkcQ=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useViewportGrid];
});
_c = OHIFCornerstoneSEGViewport;
function _getReferencedDisplaySetMetadata(referencedDisplaySet, segDisplaySet) {
  const {
    SharedFunctionalGroupsSequence
  } = segDisplaySet.instance;
  const SharedFunctionalGroup = Array.isArray(SharedFunctionalGroupsSequence) ? SharedFunctionalGroupsSequence[0] : SharedFunctionalGroupsSequence;
  const {
    PixelMeasuresSequence
  } = SharedFunctionalGroup;
  const PixelMeasures = Array.isArray(PixelMeasuresSequence) ? PixelMeasuresSequence[0] : PixelMeasuresSequence;
  const {
    SpacingBetweenSlices,
    SliceThickness
  } = PixelMeasures;
  const image0 = referencedDisplaySet.images[0];
  const referencedDisplaySetMetadata = {
    PatientID: image0.PatientID,
    PatientName: image0.PatientName,
    PatientSex: image0.PatientSex,
    PatientAge: image0.PatientAge,
    SliceThickness: image0.SliceThickness || SliceThickness,
    StudyDate: image0.StudyDate,
    SeriesDescription: image0.SeriesDescription,
    SeriesInstanceUID: image0.SeriesInstanceUID,
    SeriesNumber: image0.SeriesNumber,
    ManufacturerModelName: image0.ManufacturerModelName,
    SpacingBetweenSlices: image0.SpacingBetweenSlices || SpacingBetweenSlices
  };
  return referencedDisplaySetMetadata;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstoneSEGViewport);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneSEGViewport");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "OHIFCornerstoneSEGViewport");

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

/***/ "../../../extensions/cornerstone-dicom-seg/src/viewports/_getStatusComponent.tsx":
/*!***************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dicom-seg/src/viewports/_getStatusComponent.tsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getStatusComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function _getStatusComponent({
  isHydrated,
  onStatusClick
}) {
  var _s2 = __webpack_require__.$Refresh$.signature();
  var _s = __webpack_require__.$Refresh$.signature();
  let ToolTipMessage = null;
  let StatusIcon = null;
  switch (isHydrated) {
    case true:
      StatusIcon = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        name: "status-alert"
      });
      ToolTipMessage = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "This Segmentation is loaded in the segmentation panel");
      break;
    case false:
      StatusIcon = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Icon, {
        className: "text-aqua-pale",
        name: "status-untracked"
      });
      ToolTipMessage = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Click LOAD to load segmentation.");
  }
  const StatusArea = () => {
    _s2();
    _s();
    const {
      t
    } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)('Common');
    const loadStr = t('LOAD');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex h-6 cursor-default text-sm leading-6 text-white"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "bg-customgray-100 flex min-w-[45px] items-center rounded-l-xl rounded-r p-1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StatusIcon, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "ml-1"
    }, "SEG")), !isHydrated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "bg-primary-main hover:bg-primary-light ml-1 cursor-pointer rounded px-1.5 hover:text-black"
      // Using onMouseUp here because onClick is not working when the viewport is not active and is styled with pointer-events:none
      ,

      onMouseUp: onStatusClick
    }, loadStr));
  };
  _s2(StatusArea, "EHitWn2MOpZJ3EHE1EThwmMZIjo=", false, function () {
    return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation];
  });
  _s(StatusArea, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function () {
    return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation];
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, ToolTipMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
    content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ToolTipMessage, null),
    position: "bottom-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StatusArea, null)), !ToolTipMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StatusArea, null));
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

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dicom-seg_src_viewports_OHIFCornerstoneSEGViewport_tsx.js.map