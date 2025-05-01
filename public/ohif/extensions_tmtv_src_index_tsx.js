"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["extensions_tmtv_src_index_tsx"],{

/***/ "../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx":
/*!***********************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelPetSUV)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();





const DEFAULT_MEATADATA = {
  PatientWeight: null,
  PatientSex: null,
  SeriesTime: null,
  RadiopharmaceuticalInformationSequence: {
    RadionuclideTotalDose: null,
    RadionuclideHalfLife: null,
    RadiopharmaceuticalStartTime: null
  }
};

/*
 * PETSUV panel enables the user to modify the patient related information, such as
 * patient sex, patientWeight. This is allowed since
 * sometimes these metadata are missing or wrong. By changing them
 * @param param0
 * @returns
 */
function PanelPetSUV({
  servicesManager,
  commandsManager
}) {
  _s2();
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation)('PanelSUV');
  const {
    displaySetService,
    toolGroupService,
    toolbarService,
    hangingProtocolService
  } = servicesManager.services;
  const [metadata, setMetadata] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_MEATADATA);
  const [ptDisplaySet, setPtDisplaySet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const handleMetadataChange = metadata => {
    setMetadata(prevState => {
      const newState = {
        ...prevState
      };
      Object.keys(metadata).forEach(key => {
        if (typeof metadata[key] === 'object') {
          newState[key] = {
            ...prevState[key],
            ...metadata[key]
          };
        } else {
          newState[key] = metadata[key];
        }
      });
      return newState;
    });
  };
  const getMatchingPTDisplaySet = viewportMatchDetails => {
    const ptDisplaySet = commandsManager.runCommand('getMatchingPTDisplaySet', {
      viewportMatchDetails
    });
    if (!ptDisplaySet) {
      return;
    }
    const metadata = commandsManager.runCommand('getPTMetadata', {
      ptDisplaySet
    });
    return {
      ptDisplaySet,
      metadata
    };
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const displaySets = displaySetService.getActiveDisplaySets();
    const {
      viewportMatchDetails
    } = hangingProtocolService.getMatchDetails();
    if (!displaySets.length) {
      return;
    }
    const displaySetInfo = getMatchingPTDisplaySet(viewportMatchDetails);
    if (!displaySetInfo) {
      return;
    }
    const {
      ptDisplaySet,
      metadata
    } = displaySetInfo;
    setPtDisplaySet(ptDisplaySet);
    setMetadata(metadata);
  }, []);

  // get the patientMetadata from the StudyInstanceUIDs and update the state
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(hangingProtocolService.EVENTS.PROTOCOL_CHANGED, ({
      viewportMatchDetails
    }) => {
      const displaySetInfo = getMatchingPTDisplaySet(viewportMatchDetails);
      if (!displaySetInfo) {
        return;
      }
      const {
        ptDisplaySet,
        metadata
      } = displaySetInfo;
      setPtDisplaySet(ptDisplaySet);
      setMetadata(metadata);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  function updateMetadata() {
    if (!ptDisplaySet) {
      throw new Error('No ptDisplaySet found');
    }

    // metadata should be dcmjs naturalized
    _ohif_core__WEBPACK_IMPORTED_MODULE_3__.DicomMetadataStore.updateMetadataForSeries(ptDisplaySet.StudyInstanceUID, ptDisplaySet.SeriesInstanceUID, metadata);

    // update the displaySets
    displaySetService.setDisplaySetMetadataInvalidated(ptDisplaySet.displaySetInstanceUID);

    // Crosshair position depends on the metadata values such as the positioning interaction
    // between series, so when the metadata is updated, the crosshairs need to be reset.
    setTimeout(() => {
      commandsManager.runCommand('resetCrosshairs');
    }, 0);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ohif-scrollbar flex min-h-0 flex-auto select-none flex-col justify-between overflow-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex min-h-0 flex-1 flex-col bg-black text-[13px] font-[300]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.PanelSection, {
    title: t('Patient Information')
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-primary-dark flex flex-col gap-4 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Input, {
    containerClassName: '!flex-row !justify-between items-center',
    label: t('Patient Sex'),
    labelClassName: "text-[13px] font-inter text-white",
    className: "!m-0 !h-[26px] !w-[117px]",
    value: metadata.PatientSex || '',
    onChange: e => {
      handleMetadataChange({
        PatientSex: e.target.value
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Input, {
    containerClassName: '!flex-row !justify-between items-center',
    label: t('Weight'),
    labelChildren: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "text-aqua-pale"
    }, " kg"),
    labelClassName: "text-[13px] font-inter text-white",
    className: "!m-0 !h-[26px] !w-[117px]",
    value: metadata.PatientWeight || '',
    onChange: e => {
      handleMetadataChange({
        PatientWeight: e.target.value
      });
    },
    id: "weight-input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Input, {
    containerClassName: '!flex-row !justify-between items-center',
    label: t('Total Dose'),
    labelChildren: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "text-aqua-pale"
    }, " bq"),
    labelClassName: "text-[13px] font-inter text-white",
    className: "!m-0 !h-[26px] !w-[117px]",
    value: metadata.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadionuclideTotalDose: e.target.value
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Input, {
    containerClassName: '!flex-row !justify-between items-center',
    label: t('Half Life'),
    labelChildren: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "text-aqua-pale"
    }, " s"),
    labelClassName: "text-[13px] font-inter text-white",
    className: "!m-0 !h-[26px] !w-[117px]",
    value: metadata.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadionuclideHalfLife: e.target.value
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Input, {
    containerClassName: '!flex-row !justify-between items-center',
    label: t('Injection Time'),
    labelChildren: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "text-aqua-pale"
    }, " s"),
    labelClassName: "text-[13px] font-inter text-white",
    className: "!m-0 !h-[26px] !w-[117px]",
    value: metadata.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime || '',
    onChange: e => {
      handleMetadataChange({
        RadiopharmaceuticalInformationSequence: {
          RadiopharmaceuticalStartTime: e.target.value
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Input, {
    containerClassName: '!flex-row !justify-between items-center',
    label: t('Acquisition Time'),
    labelChildren: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "text-aqua-pale"
    }, " s"),
    labelClassName: "text-[13px] font-inter text-white",
    className: "!m-0 !h-[26px] !w-[117px]",
    value: metadata.SeriesTime || '',
    onChange: () => {}
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: "!h-[26px] !w-[115px] self-end !p-0",
    onClick: updateMetadata
  }, "Reload Data")))))));
}
_s2(PanelPetSUV, "9s2ottHWreFSj2uFUW3/JrDLBVE=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation];
});
_c2 = PanelPetSUV;
_s(PanelPetSUV, "IPB00jupIT/8SWikKIOy9yjSj+g=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_4__.useTranslation];
});
_c = PanelPetSUV;
PanelPetSUV.propTypes = {
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    services: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
      measurementService: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
        getMeasurements: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        subscribe: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
        EVENTS: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
        VALUE_TYPES: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelPetSUV");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "PanelPetSUV");

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

/***/ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx":
/*!*****************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelRoiThresholdSegmentation)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _utils_handleROIThresholding__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/handleROIThresholding */ "../../../extensions/tmtv/src/utils/handleROIThresholding.ts");
/* harmony import */ var _ohif_core_src_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core/src/utils */ "../../core/src/utils/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




function PanelRoiThresholdSegmentation({
  servicesManager,
  commandsManager
}) {
  _s2();
  _s();
  const {
    segmentationService
  } = servicesManager.services;
  const {
    segmentationsWithRepresentations: segmentationsInfo
  } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations)({
    servicesManager
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const segmentationIds = segmentationsInfo.map(segmentationInfo => segmentationInfo.segmentation.segmentationId);
    const initialRun = async () => {
      for (const segmentationId of segmentationIds) {
        await (0,_utils_handleROIThresholding__WEBPACK_IMPORTED_MODULE_2__.handleROIThresholding)({
          segmentationId,
          commandsManager,
          segmentationService
        });
      }
    };
    initialRun();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const debouncedHandleROIThresholding = (0,_ohif_core_src_utils__WEBPACK_IMPORTED_MODULE_3__.debounce)(async eventDetail => {
      const {
        segmentationId
      } = eventDetail;
      await (0,_utils_handleROIThresholding__WEBPACK_IMPORTED_MODULE_2__.handleROIThresholding)({
        segmentationId,
        commandsManager,
        segmentationService
      });
    }, 100);
    const dataModifiedCallback = eventDetail => {
      debouncedHandleROIThresholding(eventDetail);
    };
    const dataModifiedSubscription = segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_DATA_MODIFIED, dataModifiedCallback);
    return () => {
      dataModifiedSubscription.unsubscribe();
    };
  }, [commandsManager, segmentationService]);

  // Find the first segmentation with a TMTV value since all of them have the same value
  const tmtvSegmentation = segmentationsInfo.find(info => info.segmentation.cachedStats?.tmtv !== undefined);
  const tmtvValue = tmtvSegmentation?.segmentation.cachedStats?.tmtv;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 mb-10 flex flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "invisible-scrollbar overflow-y-auto overflow-x-hidden"
  }, tmtvValue !== null && tmtvValue !== undefined ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-secondary-dark flex items-baseline justify-between px-2 py-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-base font-bold uppercase tracking-widest text-white"
  }, 'TMTV:'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-white"
  }, `${tmtvValue.toFixed(3)} mL`)) : null));
}
_s2(PanelRoiThresholdSegmentation, "dActmvrvp+x6UQHMO4KR+Z9iVGY=", false, function () {
  return [_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations];
});
_c2 = PanelRoiThresholdSegmentation;
_s(PanelRoiThresholdSegmentation, "hWmObWJcsVALB8Sl9s6oF1mH6DE=", false, function () {
  return [_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations];
});
_c = PanelRoiThresholdSegmentation;
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelRoiThresholdSegmentation");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "PanelRoiThresholdSegmentation");

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

/***/ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx":
/*!*******************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ROI_STAT: () => (/* binding */ ROI_STAT),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



const ROI_STAT = 'roi_stat';
const RANGE = 'range';
const options = [{
  value: ROI_STAT,
  label: 'Max',
  placeHolder: 'Max'
}, {
  value: RANGE,
  label: 'Range',
  placeHolder: 'Range'
}];
function ROIThresholdConfiguration({
  config,
  dispatch,
  runCommand
}) {
  _s2();
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('ROIThresholdConfiguration');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-primary-dark flex flex-col space-y-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-end space-x-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-1/2 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
    label: t('Strategy'),
    closeMenuOnSelect: true,
    className: "border-primary-main mr-2 bg-black text-white ",
    options: options,
    placeholder: options.find(option => option.value === config.strategy).placeHolder,
    value: config.strategy,
    onChange: ({
      value
    }) => {
      dispatch({
        type: 'setStrategy',
        payload: {
          strategy: value
        }
      });
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-1/2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.LegacyButtonGroup, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.LegacyButton, {
    size: "initial",
    className: "px-2 py-2 text-base text-white",
    color: "primaryLight",
    variant: "outlined",
    onClick: () => runCommand('setStartSliceForROIThresholdTool')
  }, t('Start')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.LegacyButton, {
    size: "initial",
    color: "primaryLight",
    variant: "outlined",
    className: "px-2 py-2 text-base text-white",
    onClick: () => runCommand('setEndSliceForROIThresholdTool')
  }, t('End'))))), config.strategy === ROI_STAT && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    label: t('Percentage of Max SUV'),
    labelClassName: "text-[13px] font-inter text-white",
    className: "border-primary-main bg-black",
    type: "text",
    containerClassName: "mr-2",
    value: config.weight,
    onChange: e => {
      dispatch({
        type: 'setWeight',
        payload: {
          weight: e.target.value
        }
      });
    }
  }), config.strategy !== ROI_STAT && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mr-2 text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "pr-4",
    colSpan: "3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Label, {
    className: "font-inter text-[13px] text-white",
    text: "Lower & Upper Ranges"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "pr-4 pt-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Label, {
    className: "text-white",
    text: "CT"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    label: t(''),
    labelClassName: "text-white",
    className: "border-primary-main mt-2 bg-black",
    type: "text",
    containerClassName: "mr-2",
    value: config.ctLower,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ctLower: e.target.value
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    label: t(''),
    labelClassName: "text-white",
    className: "border-primary-main mt-2 bg-black",
    type: "text",
    containerClassName: "mr-2",
    value: config.ctUpper,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ctUpper: e.target.value
        }
      });
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
    className: "pr-4 pt-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Label, {
    className: "text-white",
    text: "PT"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    label: t(''),
    labelClassName: "text-white",
    className: "border-primary-main mt-2 bg-black",
    type: "text",
    containerClassName: "mr-2",
    value: config.ptLower,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ptLower: e.target.value
        }
      });
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
    label: t(''),
    labelClassName: "text-white",
    className: "border-primary-main mt-2 bg-black",
    type: "text",
    containerClassName: "mr-2",
    value: config.ptUpper,
    onChange: e => {
      dispatch({
        type: 'setThreshold',
        payload: {
          ptUpper: e.target.value
        }
      });
    }
  }))))))));
}
_s2(ROIThresholdConfiguration, "vu2xTFBfHkv41zWfADiErp1aWcA=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c2 = ROIThresholdConfiguration;
_s(ROIThresholdConfiguration, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c = ROIThresholdConfiguration;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ROIThresholdConfiguration);
var _c;
__webpack_require__.$Refresh$.register(_c, "ROIThresholdConfiguration");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ROIThresholdConfiguration");

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

/***/ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PanelROIThresholdExport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelROIThresholdExport */ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/PanelROIThresholdExport.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_PanelROIThresholdExport__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "../../../extensions/tmtv/src/Panels/PanelTMTV.tsx":
/*!*********************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/PanelTMTV.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelTMTV)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



function PanelTMTV({
  servicesManager,
  commandsManager,
  extensionManager,
  configuration
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.PanelSegmentation, {
    servicesManager: servicesManager,
    commandsManager: commandsManager,
    extensionManager: extensionManager,
    configuration: configuration
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ExportCSV, {
    servicesManager: servicesManager,
    commandsManager: commandsManager
  })));
}
_c3 = PanelTMTV;
_c = PanelTMTV;
const ExportCSV = ({
  servicesManager,
  commandsManager
}) => {
  _s2();
  _s();
  const {
    segmentationsWithRepresentations: representations
  } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations)({
    servicesManager
  });
  const tmtv = representations[0]?.segmentation.cachedStats?.tmtv;
  const segmentations = representations.map(representation => representation.segmentation);
  if (!segmentations.length) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex h-8 w-full items-center rounded pr-0.5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Button, {
    size: "sm",
    variant: "ghost",
    className: "pl-1.5",
    onClick: () => {
      commandsManager.runCommand('exportTMTVReportCSV', {
        segmentations,
        tmtv,
        config: {}
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.Download, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "pl-1"
  }, "CSV")));
};
_s2(ExportCSV, "qw4n3wb5KlKkfHeENz8O7ggxl7Y=", false, function () {
  return [_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations];
});
_c4 = ExportCSV;
_s(ExportCSV, "KwNyyMBhhdV/xHs8zjYqtvFcW4s=", false, function () {
  return [_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.useActiveViewportSegmentationRepresentations];
});
_c2 = ExportCSV;
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "PanelTMTV");
__webpack_require__.$Refresh$.register(_c2, "ExportCSV");
var _c3, _c4;
__webpack_require__.$Refresh$.register(_c3, "PanelTMTV");
__webpack_require__.$Refresh$.register(_c4, "ExportCSV");

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

/***/ "../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx":
/*!*******************************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _PanelROIThresholdSegmentation_ROIThresholdConfiguration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelROIThresholdSegmentation/ROIThresholdConfiguration */ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/ROIThresholdConfiguration.tsx");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




const LOWER_CT_THRESHOLD_DEFAULT = -1024;
const UPPER_CT_THRESHOLD_DEFAULT = 1024;
const LOWER_PT_THRESHOLD_DEFAULT = 2.5;
const UPPER_PT_THRESHOLD_DEFAULT = 100;
const WEIGHT_DEFAULT = 0.41; // a default weight for suv max often used in the literature
const DEFAULT_STRATEGY = _PanelROIThresholdSegmentation_ROIThresholdConfiguration__WEBPACK_IMPORTED_MODULE_2__.ROI_STAT;
function reducer(state, action) {
  const {
    payload
  } = action;
  const {
    strategy,
    ctLower,
    ctUpper,
    ptLower,
    ptUpper,
    weight
  } = payload;
  switch (action.type) {
    case 'setStrategy':
      return {
        ...state,
        strategy
      };
    case 'setThreshold':
      return {
        ...state,
        ctLower: ctLower ? ctLower : state.ctLower,
        ctUpper: ctUpper ? ctUpper : state.ctUpper,
        ptLower: ptLower ? ptLower : state.ptLower,
        ptUpper: ptUpper ? ptUpper : state.ptUpper
      };
    case 'setWeight':
      return {
        ...state,
        weight
      };
    default:
      return state;
  }
}
function RectangleROIOptions({
  servicesManager,
  commandsManager
}) {
  _s2();
  _s();
  const {
    segmentationService
  } = servicesManager.services;
  const [selectedSegmentationId, setSelectedSegmentationId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const runCommand = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((commandName, commandOptions = {}) => {
    return commandsManager.runCommand(commandName, commandOptions);
  }, [commandsManager]);
  const [config, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(reducer, {
    strategy: DEFAULT_STRATEGY,
    ctLower: LOWER_CT_THRESHOLD_DEFAULT,
    ctUpper: UPPER_CT_THRESHOLD_DEFAULT,
    ptLower: LOWER_PT_THRESHOLD_DEFAULT,
    ptUpper: UPPER_PT_THRESHOLD_DEFAULT,
    weight: WEIGHT_DEFAULT
  });
  const handleROIThresholding = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const segmentationId = selectedSegmentationId;
    const activeSegmentIndex = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.segmentation.segmentIndex.getActiveSegmentIndex(segmentationId);

    // run the threshold based on the active segment index
    // Todo: later find a way to associate each rectangle with a segment (e.g., maybe with color?)
    runCommand('thresholdSegmentationByRectangleROITool', {
      segmentationId,
      config,
      segmentIndex: activeSegmentIndex
    });
  }, [selectedSegmentationId, config]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const segmentations = segmentationService.getSegmentationRepresentations();
    if (!segmentations.length) {
      return;
    }
    const isActive = segmentations.find(seg => seg.isActive);
    setSelectedSegmentationId(isActive.id);
  }, []);

  /**
   * Update UI based on segmentation changes (added, removed, updated)
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // ~~ Subscription
    const updated = segmentationService.EVENTS.SEGMENTATION_MODIFIED;
    const subscriptions = [];
    [updated].forEach(evt => {
      const {
        unsubscribe
      } = segmentationService.subscribe(evt, () => {
        const segmentations = segmentationService.getSegmentationRepresentations();
        if (!segmentations.length) {
          return;
        }
        const isActive = segmentations.find(seg => seg.isActive);
        setSelectedSegmentationId(isActive.id);
      });
      subscriptions.push(unsubscribe);
    });
    return () => {
      subscriptions.forEach(unsub => {
        unsub();
      });
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "invisible-scrollbar mb-2 flex flex-col overflow-y-auto overflow-x-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PanelROIThresholdSegmentation_ROIThresholdConfiguration__WEBPACK_IMPORTED_MODULE_2__["default"], {
    config: config,
    dispatch: dispatch,
    runCommand: runCommand
  }), selectedSegmentationId !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "mt-2 !h-[26px] !w-[75px]",
    onClick: handleROIThresholding
  }, "Run"));
}
_s2(RectangleROIOptions, "veurJOE/aJCOzf9R8TmZNEs/fpw=");
_c2 = RectangleROIOptions;
_s(RectangleROIOptions, "tVpN+M//pSOzaiI2UIKNfvDVi64=");
_c = RectangleROIOptions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RectangleROIOptions);
var _c;
__webpack_require__.$Refresh$.register(_c, "RectangleROIOptions");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "RectangleROIOptions");

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

/***/ "../../../extensions/tmtv/src/Panels/index.tsx":
/*!*****************************************************!*\
  !*** ../../../extensions/tmtv/src/Panels/index.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelPetSUV: () => (/* reexport safe */ _PanelPetSUV__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   PanelROIThresholdExport: () => (/* reexport safe */ _PanelROIThresholdSegmentation__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _PanelPetSUV__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PanelPetSUV */ "../../../extensions/tmtv/src/Panels/PanelPetSUV.tsx");
/* harmony import */ var _PanelROIThresholdSegmentation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelROIThresholdSegmentation */ "../../../extensions/tmtv/src/Panels/PanelROIThresholdSegmentation/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





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

/***/ "../../../extensions/tmtv/src/commandsModule.ts":
/*!******************************************************!*\
  !*** ../../../extensions/tmtv/src/commandsModule.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _utils_getThresholdValue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/getThresholdValue */ "../../../extensions/tmtv/src/utils/getThresholdValue.ts");
/* harmony import */ var _utils_createAndDownloadTMTVReport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/createAndDownloadTMTVReport */ "../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js");
/* harmony import */ var _utils_dicomRTAnnotationExport_RTStructureSet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/dicomRTAnnotationExport/RTStructureSet */ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");










const {
  SegmentationRepresentations
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.Enums;
const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes.MetadataProvider;
const ROI_THRESHOLD_MANUAL_TOOL_IDS = ['RectangleROIStartEndThreshold', 'RectangleROIThreshold', 'CircleROIStartEndThreshold'];
const workerManager = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.getWebWorkerManager)();
const options = {
  maxWorkerInstances: 1,
  autoTerminateOnIdle: {
    enabled: true,
    idleTimeThreshold: 3000
  }
};

// Register the task
const workerFn = () => {
  return new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("suv-peak-worker"), __webpack_require__.b), {
    name: 'suv-peak-worker' // name used by the browser to name the worker
  });
};
function getVolumesFromSegmentation(segmentationId) {
  const csSegmentation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.segmentation.state.getSegmentation(segmentationId);
  const labelmapData = csSegmentation.representationData[SegmentationRepresentations.Labelmap];
  const {
    volumeId,
    referencedVolumeId
  } = labelmapData;
  const labelmapVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(volumeId);
  const referencedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(referencedVolumeId);
  return {
    labelmapVolume,
    referencedVolume
  };
}
function getLabelmapVolumeFromSegmentation(segmentation) {
  const {
    representationData
  } = segmentation;
  const {
    volumeId
  } = representationData[SegmentationRepresentations.Labelmap];
  return _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(volumeId);
}
const commandsModule = ({
  servicesManager,
  commandsManager,
  extensionManager
}) => {
  const {
    viewportGridService,
    uiNotificationService,
    displaySetService,
    hangingProtocolService,
    toolGroupService,
    cornerstoneViewportService,
    segmentationService
  } = servicesManager.services;
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  const {
    getEnabledElement
  } = utilityModule.exports;
  function _getActiveViewportsEnabledElement() {
    const {
      activeViewportId
    } = viewportGridService.getState();
    const {
      element
    } = getEnabledElement(activeViewportId) || {};
    const enabledElement = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.getEnabledElement(element);
    return enabledElement;
  }
  function _getAnnotationsSelectedByToolNames(toolNames) {
    return toolNames.reduce((allAnnotationUIDs, toolName) => {
      const annotationUIDs = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.selection.getAnnotationsSelectedByToolName(toolName);
      return allAnnotationUIDs.concat(annotationUIDs);
    }, []);
  }
  const actions = {
    getMatchingPTDisplaySet: ({
      viewportMatchDetails
    }) => {
      // Todo: this is assuming that the hanging protocol has successfully matched
      // the correct PT. For future, we should have a way to filter out the PTs
      // that are in the viewer layout (but then we have the problem of the attenuation
      // corrected PT vs the non-attenuation correct PT)

      let ptDisplaySet = null;
      for (const [viewportId, viewportDetails] of viewportMatchDetails) {
        const {
          displaySetsInfo
        } = viewportDetails;
        const displaySets = displaySetsInfo.map(({
          displaySetInstanceUID
        }) => displaySetService.getDisplaySetByUID(displaySetInstanceUID));
        if (!displaySets || displaySets.length === 0) {
          continue;
        }
        ptDisplaySet = displaySets.find(displaySet => displaySet.Modality === 'PT');
        if (ptDisplaySet) {
          break;
        }
      }
      return ptDisplaySet;
    },
    getPTMetadata: ({
      ptDisplaySet
    }) => {
      const dataSource = extensionManager.getDataSources()[0];
      const imageIds = dataSource.getImageIdsForDisplaySet(ptDisplaySet);
      const firstImageId = imageIds[0];
      const instance = metadataProvider.get('instance', firstImageId);
      if (instance.Modality !== 'PT') {
        return;
      }
      const metadata = {
        SeriesTime: instance.SeriesTime,
        Modality: instance.Modality,
        PatientSex: instance.PatientSex,
        PatientWeight: instance.PatientWeight,
        RadiopharmaceuticalInformationSequence: {
          RadionuclideTotalDose: instance.RadiopharmaceuticalInformationSequence[0].RadionuclideTotalDose,
          RadionuclideHalfLife: instance.RadiopharmaceuticalInformationSequence[0].RadionuclideHalfLife,
          RadiopharmaceuticalStartTime: instance.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartTime,
          RadiopharmaceuticalStartDateTime: instance.RadiopharmaceuticalInformationSequence[0].RadiopharmaceuticalStartDateTime
        }
      };
      return metadata;
    },
    createNewLabelmapFromPT: async ({
      label
    }) => {
      // Create a segmentation of the same resolution as the source data
      // using volumeLoader.createAndCacheDerivedVolume.

      const {
        viewportMatchDetails
      } = hangingProtocolService.getMatchDetails();
      const ptDisplaySet = actions.getMatchingPTDisplaySet({
        viewportMatchDetails
      });
      let withPTViewportId = null;
      for (const [viewportId, {
        displaySetsInfo
      }] of viewportMatchDetails.entries()) {
        const isPT = displaySetsInfo.some(({
          displaySetInstanceUID
        }) => displaySetInstanceUID === ptDisplaySet.displaySetInstanceUID);
        if (isPT) {
          withPTViewportId = viewportId;
          break;
        }
      }
      if (!ptDisplaySet) {
        uiNotificationService.error('No matching PT display set found');
        return;
      }
      const currentSegmentations = segmentationService.getSegmentationRepresentations(withPTViewportId);
      const displaySet = displaySetService.getDisplaySetByUID(ptDisplaySet.displaySetInstanceUID);
      const segmentationId = await segmentationService.createLabelmapForDisplaySet(displaySet, {
        label: `Segmentation ${currentSegmentations.length + 1}`,
        segments: {
          1: {
            label: 'Segment 1',
            active: true
          }
        }
      });
      segmentationService.addSegmentationRepresentation(withPTViewportId, {
        segmentationId
      });
      return segmentationId;
    },
    thresholdSegmentationByRectangleROITool: ({
      segmentationId,
      config,
      segmentIndex
    }) => {
      const segmentation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.segmentation.state.getSegmentation(segmentationId);
      const {
        representationData
      } = segmentation;
      const {
        displaySetMatchDetails: matchDetails
      } = hangingProtocolService.getMatchDetails();
      const volumeLoaderScheme = 'cornerstoneStreamingImageVolume'; // Loader id which defines which volume loader to use

      const ctDisplaySet = matchDetails.get('ctDisplaySet');
      const ctVolumeId = `${volumeLoaderScheme}:${ctDisplaySet.displaySetInstanceUID}`; // VolumeId with loader id + volume id

      const {
        volumeId: segVolumeId
      } = representationData[SegmentationRepresentations.Labelmap];
      const {
        referencedVolumeId
      } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(segVolumeId);
      const annotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      if (annotationUIDs.length === 0) {
        uiNotificationService.show({
          title: 'Commands Module',
          message: 'No ROIThreshold Tool is Selected',
          type: 'error'
        });
        return;
      }
      const labelmapVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(segmentationId);
      let referencedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(referencedVolumeId);
      const ctReferencedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(ctVolumeId);

      // check if viewport is

      if (!referencedVolume) {
        throw new Error('No Reference volume found');
      }
      if (!labelmapVolume) {
        throw new Error('No Reference labelmap found');
      }
      const annotation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotation(annotationUIDs[0]);
      const {
        metadata: {
          enabledElement: {
            viewport
          }
        }
      } = annotation;
      const showingReferenceVolume = viewport.hasVolumeId(referencedVolumeId);
      if (!showingReferenceVolume) {
        // if the reference volume is not being displayed, we can't
        // rely on it for thresholding, we have couple of options here
        // 1. We choose whatever volume is being displayed
        // 2. We check if it is a fusion viewport, we pick the volume
        // that matches the size and dimensions of the labelmap. This might
        // happen if the 4D PT is converted to a computed volume and displayed
        // and wants to threshold the labelmap
        // 3. We throw an error
        const displaySetInstanceUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewport.id);
        displaySetInstanceUIDs.forEach(displaySetInstanceUID => {
          const volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolumes().find(volume => volume.volumeId.includes(displaySetInstanceUID));
          if (_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.utilities.isEqual(volume.dimensions, labelmapVolume.dimensions) && _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.utilities.isEqual(volume.spacing, labelmapVolume.spacing)) {
            referencedVolume = volume;
          }
        });
      }
      const {
        ptLower,
        ptUpper,
        ctLower,
        ctUpper
      } = (0,_utils_getThresholdValue__WEBPACK_IMPORTED_MODULE_3__["default"])(annotationUIDs, [referencedVolume, ctReferencedVolume], config);
      return _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.utilities.segmentation.rectangleROIThresholdVolumeByRange(annotationUIDs, labelmapVolume, [{
        volume: referencedVolume,
        lower: ptLower,
        upper: ptUpper
      }, {
        volume: ctReferencedVolume,
        lower: ctLower,
        upper: ctUpper
      }], {
        overwrite: true,
        segmentIndex
      });
    },
    calculateSuvPeak: async ({
      segmentationId,
      segmentIndex
    }) => {
      const segmentation = segmentationService.getSegmentation(segmentationId);
      const {
        representationData
      } = segmentation;
      const {
        volumeId,
        referencedVolumeId
      } = representationData[SegmentationRepresentations.Labelmap];
      const labelmap = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(volumeId);
      const referencedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(referencedVolumeId);

      // if we put it in the top, it will appear in other modes
      workerManager.registerWorker('suv-peak-worker', workerFn, options);
      const annotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      const annotations = annotationUIDs.map(annotationUID => _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotation(annotationUID));
      const labelmapProps = {
        dimensions: labelmap.dimensions,
        origin: labelmap.origin,
        direction: labelmap.direction,
        spacing: labelmap.spacing,
        metadata: labelmap.metadata,
        scalarData: labelmap.voxelManager.getCompleteScalarDataArray()
      };
      const referenceVolumeProps = {
        dimensions: referencedVolume.dimensions,
        origin: referencedVolume.origin,
        direction: referencedVolume.direction,
        spacing: referencedVolume.spacing,
        metadata: referencedVolume.metadata,
        scalarData: referencedVolume.voxelManager.getCompleteScalarDataArray()
      };

      // metadata in annotations has enabledElement which is not serializable
      // we need to remove it
      // Todo: we should probably have a sanitization function for this
      const annotationsToSend = annotations.map(annotation => {
        return {
          ...annotation,
          metadata: {
            ...annotation.metadata,
            enabledElement: {
              ...annotation.metadata.enabledElement,
              viewport: null,
              renderingEngine: null,
              element: null
            }
          }
        };
      });
      const suvPeak = (await workerManager.executeTask('suv-peak-worker', 'calculateSuvPeak', {
        labelmapProps,
        referenceVolumeProps,
        annotations: annotationsToSend,
        segmentIndex
      })) || {};
      return {
        suvPeak: suvPeak.mean,
        suvMax: suvPeak.max,
        suvMaxIJK: suvPeak.maxIJK,
        suvMaxLPS: suvPeak.maxLPS
      };
    },
    getLesionStats: ({
      segmentationId,
      segmentIndex = 1
    }) => {
      const {
        labelmapVolume,
        referencedVolume
      } = getVolumesFromSegmentation(segmentationId);
      const {
        voxelManager: segVoxelManager,
        imageData,
        spacing
      } = labelmapVolume;
      const {
        voxelManager: refVoxelManager
      } = referencedVolume;
      let segmentationMax = -Infinity;
      let segmentationMin = Infinity;
      const segmentationValues = [];
      let voxelCount = 0;
      const callback = ({
        value,
        index
      }) => {
        if (value === segmentIndex) {
          const refValue = refVoxelManager.getAtIndex(index);
          segmentationValues.push(refValue);
          if (refValue > segmentationMax) {
            segmentationMax = refValue;
          }
          if (refValue < segmentationMin) {
            segmentationMin = refValue;
          }
          voxelCount++;
        }
      };
      segVoxelManager.forEach(callback, {
        imageData
      });
      const mean = segmentationValues.reduce((a, b) => a + b, 0) / voxelCount;
      const stats = {
        minValue: segmentationMin,
        maxValue: segmentationMax,
        meanValue: mean,
        stdValue: Math.sqrt(segmentationValues.map(k => (k - mean) ** 2).reduce((acc, curr) => acc + curr, 0) / voxelCount),
        volume: voxelCount * spacing[0] * spacing[1] * spacing[2] * 1e-3
      };
      return stats;
    },
    calculateLesionGlycolysis: ({
      lesionStats
    }) => {
      const {
        meanValue,
        volume
      } = lesionStats;
      return {
        lesionGlyoclysisStats: volume * meanValue
      };
    },
    calculateTMTV: async ({
      segmentations
    }) => {
      const labelmapProps = segmentations.map(segmentation => {
        const labelmap = getLabelmapVolumeFromSegmentation(segmentation);
        return {
          dimensions: labelmap.dimensions,
          spacing: labelmap.spacing,
          scalarData: labelmap.voxelManager.getCompleteScalarDataArray(),
          origin: labelmap.origin,
          direction: labelmap.direction
        };
      });
      if (!labelmapProps.length) {
        return;
      }
      return await workerManager.executeTask('suv-peak-worker', 'calculateTMTV', labelmapProps);
    },
    exportTMTVReportCSV: async ({
      segmentations,
      tmtv,
      config,
      options
    }) => {
      const segReport = commandsManager.runCommand('getSegmentationCSVReport', {
        segmentations
      });
      const tlg = await actions.getTotalLesionGlycolysis({
        segmentations
      });
      const additionalReportRows = [{
        key: 'Total Lesion Glycolysis',
        value: {
          tlg: tlg.toFixed(4)
        }
      }, {
        key: 'Threshold Configuration',
        value: {
          ...config
        }
      }];
      if (tmtv !== undefined) {
        additionalReportRows.unshift({
          key: 'Total Metabolic Tumor Volume',
          value: {
            tmtv
          }
        });
      }
      (0,_utils_createAndDownloadTMTVReport__WEBPACK_IMPORTED_MODULE_4__["default"])(segReport, additionalReportRows, options);
    },
    getTotalLesionGlycolysis: async ({
      segmentations
    }) => {
      const labelmapProps = segmentations.map(segmentation => {
        const labelmap = getLabelmapVolumeFromSegmentation(segmentation);
        return {
          dimensions: labelmap.dimensions,
          spacing: labelmap.spacing,
          scalarData: labelmap.voxelManager.getCompleteScalarDataArray(),
          origin: labelmap.origin,
          direction: labelmap.direction
        };
      });
      const {
        referencedVolume: ptVolume
      } = getVolumesFromSegmentation(segmentations[0].segmentationId);
      const ptVolumeProps = {
        dimensions: ptVolume.dimensions,
        spacing: ptVolume.spacing,
        scalarData: ptVolume.voxelManager.getCompleteScalarDataArray(),
        origin: ptVolume.origin,
        direction: ptVolume.direction
      };
      return await workerManager.executeTask('suv-peak-worker', 'getTotalLesionGlycolysis', {
        labelmapProps,
        referenceVolumeProps: ptVolumeProps
      });
    },
    setStartSliceForROIThresholdTool: () => {
      const {
        viewport
      } = _getActiveViewportsEnabledElement();
      const {
        focalPoint
      } = viewport.getCamera();
      const selectedAnnotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      const annotationUID = selectedAnnotationUIDs[0];
      const annotation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotation(annotationUID);

      // set the current focal point
      annotation.data.startCoordinate = focalPoint;
      // IMPORTANT: invalidate the toolData for the cached stat to get updated
      // and re-calculate the projection points
      annotation.invalidated = true;
      viewport.render();
    },
    setEndSliceForROIThresholdTool: () => {
      const {
        viewport
      } = _getActiveViewportsEnabledElement();
      const selectedAnnotationUIDs = _getAnnotationsSelectedByToolNames(ROI_THRESHOLD_MANUAL_TOOL_IDS);
      const annotationUID = selectedAnnotationUIDs[0];
      const annotation = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotation(annotationUID);

      // get the current focal point
      const focalPointToEnd = viewport.getCamera().focalPoint;
      annotation.data.endCoordinate = focalPointToEnd;

      // IMPORTANT: invalidate the toolData for the cached stat to get updated
      // and re-calculate the projection points
      annotation.invalidated = true;
      viewport.render();
    },
    createTMTVRTReport: () => {
      // get all Rectangle ROI annotation
      const stateManager = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotationManager();
      const annotations = [];
      Object.keys(stateManager.annotations).forEach(frameOfReferenceUID => {
        const forAnnotations = stateManager.annotations[frameOfReferenceUID];
        const ROIAnnotations = ROI_THRESHOLD_MANUAL_TOOL_IDS.reduce((annotations, toolName) => [...annotations, ...(forAnnotations[toolName] ?? [])], []);
        annotations.push(...ROIAnnotations);
      });
      commandsManager.runCommand('exportRTReportForAnnotations', {
        annotations
      });
    },
    getSegmentationCSVReport: ({
      segmentations
    }) => {
      if (!segmentations || !segmentations.length) {
        segmentations = segmentationService.getSegmentations();
      }
      const report = {};
      for (const segmentation of segmentations) {
        const {
          label,
          segmentationId,
          representationData
        } = segmentation;
        const id = segmentationId;
        const segReport = {
          id,
          label
        };
        if (!representationData) {
          report[id] = segReport;
          continue;
        }
        const {
          cachedStats
        } = segmentation.segments[1] || {}; // Assuming we want stats from the first segment

        if (cachedStats) {
          Object.entries(cachedStats).forEach(([key, value]) => {
            if (typeof value !== 'object') {
              segReport[key] = value;
            } else {
              Object.entries(value).forEach(([subKey, subValue]) => {
                const newKey = `${key}_${subKey}`;
                segReport[newKey] = subValue;
              });
            }
          });
        }
        const labelmapVolume = segmentation.representationData[SegmentationRepresentations.Labelmap];
        if (!labelmapVolume) {
          report[id] = segReport;
          continue;
        }
        const referencedVolumeId = labelmapVolume.referencedVolumeId;
        const referencedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(referencedVolumeId);
        if (!referencedVolume) {
          report[id] = segReport;
          continue;
        }
        if (!referencedVolume.imageIds || !referencedVolume.imageIds.length) {
          report[id] = segReport;
          continue;
        }
        const firstImageId = referencedVolume.imageIds[0];
        const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider.get('instance', firstImageId);
        if (!instance) {
          report[id] = segReport;
          continue;
        }
        report[id] = {
          ...segReport,
          PatientID: instance.PatientID ?? '000000',
          PatientName: instance.PatientName.Alphabetic,
          StudyInstanceUID: instance.StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          StudyDate: instance.StudyDate
        };
      }
      return report;
    },
    exportRTReportForAnnotations: ({
      annotations
    }) => {
      (0,_utils_dicomRTAnnotationExport_RTStructureSet__WEBPACK_IMPORTED_MODULE_5__["default"])(annotations);
    },
    setFusionPTColormap: ({
      toolGroupId,
      colormap
    }) => {
      const toolGroup = toolGroupService.getToolGroup(toolGroupId);
      if (!toolGroup) {
        return;
      }
      const {
        viewportMatchDetails
      } = hangingProtocolService.getMatchDetails();
      const ptDisplaySet = actions.getMatchingPTDisplaySet({
        viewportMatchDetails
      });
      if (!ptDisplaySet) {
        return;
      }
      const fusionViewportIds = toolGroup.getViewportIds();
      const viewports = [];
      fusionViewportIds.forEach(viewportId => {
        commandsManager.runCommand('setViewportColormap', {
          viewportId,
          displaySetInstanceUID: ptDisplaySet.displaySetInstanceUID,
          colormap: {
            name: colormap
          }
        });
        viewports.push(cornerstoneViewportService.getCornerstoneViewport(viewportId));
      });
      viewports.forEach(viewport => {
        viewport.render();
      });
    }
  };
  const definitions = {
    setEndSliceForROIThresholdTool: {
      commandFn: actions.setEndSliceForROIThresholdTool
    },
    setStartSliceForROIThresholdTool: {
      commandFn: actions.setStartSliceForROIThresholdTool
    },
    getMatchingPTDisplaySet: {
      commandFn: actions.getMatchingPTDisplaySet
    },
    getPTMetadata: {
      commandFn: actions.getPTMetadata
    },
    createNewLabelmapFromPT: {
      commandFn: actions.createNewLabelmapFromPT
    },
    thresholdSegmentationByRectangleROITool: {
      commandFn: actions.thresholdSegmentationByRectangleROITool
    },
    getTotalLesionGlycolysis: {
      commandFn: actions.getTotalLesionGlycolysis
    },
    calculateSuvPeak: {
      commandFn: actions.calculateSuvPeak
    },
    getLesionStats: {
      commandFn: actions.getLesionStats
    },
    calculateTMTV: {
      commandFn: actions.calculateTMTV
    },
    exportTMTVReportCSV: {
      commandFn: actions.exportTMTVReportCSV
    },
    createTMTVRTReport: {
      commandFn: actions.createTMTVRTReport
    },
    getSegmentationCSVReport: {
      commandFn: actions.getSegmentationCSVReport
    },
    exportRTReportForAnnotations: {
      commandFn: actions.exportRTReportForAnnotations
    },
    setFusionPTColormap: {
      commandFn: actions.setFusionPTColormap
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'TMTV:CORNERSTONE'
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commandsModule);

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

/***/ "../../../extensions/tmtv/src/getHangingProtocolModule.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/tmtv/src/getHangingProtocolModule.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/hpViewports */ "../../../extensions/tmtv/src/utils/hpViewports.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * represents a 3x4 viewport layout configuration. The layout displays CT axial, sagittal, and coronal
 * images in the first row, PT axial, sagittal, and coronal images in the second row, and fusion axial,
 * sagittal, and coronal images in the third row. The fourth column is fully spanned by a MIP sagittal
 * image, covering all three rows. It has synchronizers for windowLevel for all CT and PT images, and
 * also camera synchronizer for each orientation
 */
const stage1 = {
  name: 'default',
  id: 'default',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 3,
      columns: 4,
      layoutOptions: [{
        x: 0,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 0,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 1 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 0,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 1 / 4,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 2 / 4,
        y: 2 / 3,
        width: 1 / 4,
        height: 1 / 3
      }, {
        x: 3 / 4,
        y: 0,
        width: 1 / 4,
        height: 1
      }]
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.mipSAGITTAL],
  createdDate: '2021-02-23T18:32:42.850Z'
};

/**
 * The layout displays CT axial image in the top-left viewport, fusion axial image
 * in the top-right viewport, PT axial image in the bottom-left viewport, and MIP
 * sagittal image in the bottom-right viewport. The layout follows a simple grid
 * pattern with 2 rows and 2 columns. It includes synchronizers as well.
 */
const stage2 = {
  name: 'Fusion 2x2',
  id: 'Fusion-2x2',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 2
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.mipSAGITTAL]
};

/**
 * The top row displays CT images in axial, sagittal, and coronal orientations from
 * left to right, respectively. The bottom row displays PT images in axial, sagittal,
 * and coronal orientations from left to right, respectively.
 * The layout follows a simple grid pattern with 2 rows and 3 columns.
 * It includes synchronizers as well.
 */
const stage3 = {
  name: '2x3-layout',
  id: '2x3-layout',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 3
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ctCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptCORONAL]
};

/**
 * In this layout, the top row displays PT images in coronal, sagittal, and axial
 * orientations from left to right, respectively, followed by a MIP sagittal image
 * that spans both rows on the rightmost side. The bottom row displays fusion images
 * in coronal, sagittal, and axial orientations from left to right, respectively.
 * There is no viewport in the bottom row's rightmost position, as the MIP sagittal viewport
 * from the top row spans the full height of both rows.
 * It includes synchronizers as well.
 */
const stage4 = {
  name: '2x4-layout',
  id: '2x4-layout',
  viewportStructure: {
    layoutType: 'grid',
    properties: {
      rows: 2,
      columns: 4,
      layoutOptions: [{
        x: 0,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 1 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 2 / 4,
        y: 0,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 3 / 4,
        y: 0,
        width: 1 / 4,
        height: 1
      }, {
        x: 0,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 1 / 4,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }, {
        x: 2 / 4,
        y: 1 / 2,
        width: 1 / 4,
        height: 1 / 2
      }]
    }
  },
  viewports: [_utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.ptAXIAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.mipSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionCORONAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionSAGITTAL, _utils_hpViewports__WEBPACK_IMPORTED_MODULE_0__.fusionAXIAL]
};

/**
 * This layout displays three fusion viewports: axial, sagittal, and coronal.
 * It follows a simple grid pattern with 1 row and 3 columns.
 */
// const stage0: AppTypes.HangingProtocol.ProtocolStage = {
//   name: 'Fusion 1x3',
//   viewportStructure: {
//     layoutType: 'grid',
//     properties: {
//       rows: 1,
//       columns: 3,
//     },
//   },
//   viewports: [fusionAXIAL, fusionSAGITTAL, fusionCORONAL],
// };

const ptCT = {
  id: '@ohif/extension-tmtv.hangingProtocolModule.ptCT',
  locked: true,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2022-10-04T19:22:08.894Z',
  availableTo: {},
  editableBy: {},
  imageLoadStrategy: 'interleaveTopToBottom',
  // "default" , "interleaveTopToBottom",  "interleaveCenter"
  protocolMatchingRules: [{
    attribute: 'ModalitiesInStudy',
    constraint: {
      contains: ['CT', 'PT']
    }
  }, {
    attribute: 'StudyDescription',
    constraint: {
      contains: 'PETCT'
    }
  }, {
    attribute: 'StudyDescription',
    constraint: {
      contains: 'PET/CT'
    }
  }],
  displaySetSelectors: {
    ctDisplaySet: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: {
            value: 'CT'
          }
        },
        required: true
      }, {
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'CT'
        }
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'CT WB'
        }
      }]
    },
    ptDisplaySet: {
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: 'PT'
        },
        required: true
      }, {
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'SeriesDescription',
        constraint: {
          contains: 'Corrected'
        }
      }, {
        weight: 2,
        attribute: 'SeriesDescription',
        constraint: {
          doesNotContain: {
            value: 'Uncorrected'
          }
        }
      }]
    }
  },
  stages: [stage1, stage2, stage3, stage4],
  numberOfPriorsReferenced: -1
};
function getHangingProtocolModule() {
  return [{
    name: ptCT.id,
    protocol: ptCT
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getHangingProtocolModule);

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

/***/ "../../../extensions/tmtv/src/getPanelModule.tsx":
/*!*******************************************************!*\
  !*** ../../../extensions/tmtv/src/getPanelModule.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panels */ "../../../extensions/tmtv/src/Panels/index.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _Panels_PanelTMTV__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Panels/PanelTMTV */ "../../../extensions/tmtv/src/Panels/PanelTMTV.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  const wrappedPanelPetSuv = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.PanelPetSUV, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager
    });
  };
  const wrappedROIThresholdToolbox = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Toolbox, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      buttonSectionId: "ROIThresholdToolbox",
      title: "Threshold Tools"
    });
  };
  const wrappedROIThresholdExport = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.PanelROIThresholdExport, {
      commandsManager: commandsManager,
      servicesManager: servicesManager
    });
  };
  const wrappedPanelTMTV = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Toolbox, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      buttonSectionId: "ROIThresholdToolbox",
      title: "Threshold Tools"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels_PanelTMTV__WEBPACK_IMPORTED_MODULE_3__["default"], {
      commandsManager: commandsManager,
      servicesManager: servicesManager
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.PanelROIThresholdExport, {
      commandsManager: commandsManager,
      servicesManager: servicesManager
    }));
  };
  return [{
    name: 'petSUV',
    iconName: 'tab-patient-info',
    iconLabel: 'Patient Info',
    label: 'Patient Info',
    component: wrappedPanelPetSuv
  }, {
    name: 'tmtv',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    component: wrappedPanelTMTV
  }, {
    name: 'tmtvBox',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation Toolbox',
    component: wrappedROIThresholdToolbox
  }, {
    name: 'tmtvExport',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation Export',
    component: wrappedROIThresholdExport
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getPanelModule);

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

/***/ "../../../extensions/tmtv/src/getToolbarModule.tsx":
/*!*********************************************************!*\
  !*** ../../../extensions/tmtv/src/getToolbarModule.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getToolbarModule)
/* harmony export */ });
/* harmony import */ var _Panels_RectangleROIOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Panels/RectangleROIOptions */ "../../../extensions/tmtv/src/Panels/RectangleROIOptions.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function getToolbarModule({
  commandsManager,
  servicesManager
}) {
  return [{
    name: 'tmtv.RectangleROIThresholdOptions',
    defaultComponent: () => (0,_Panels_RectangleROIOptions__WEBPACK_IMPORTED_MODULE_0__["default"])({
      commandsManager,
      servicesManager
    })
  }];
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

/***/ "../../../extensions/tmtv/src/id.js":
/*!******************************************!*\
  !*** ../../../extensions/tmtv/src/id.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/tmtv/package.json");
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

/***/ "../../../extensions/tmtv/src/index.tsx":
/*!**********************************************!*\
  !*** ../../../extensions/tmtv/src/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/tmtv/src/id.js");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/tmtv/src/getHangingProtocolModule.ts");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/tmtv/src/getPanelModule.tsx");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./init */ "../../../extensions/tmtv/src/init.js");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/tmtv/src/commandsModule.ts");
/* harmony import */ var _getToolbarModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getToolbarModule */ "../../../extensions/tmtv/src/getToolbarModule.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








/**
 *
 */
const tmtvExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  preRegistration({
    servicesManager,
    commandsManager,
    extensionManager,
    configuration = {}
  }) {
    (0,_init__WEBPACK_IMPORTED_MODULE_3__["default"])({
      servicesManager,
      commandsManager,
      extensionManager,
      configuration
    });
  },
  getToolbarModule: _getToolbarModule__WEBPACK_IMPORTED_MODULE_5__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_1__["default"],
  getCommandsModule({
    servicesManager,
    commandsManager,
    extensionManager
  }) {
    return (0,_commandsModule__WEBPACK_IMPORTED_MODULE_4__["default"])({
      servicesManager,
      commandsManager,
      extensionManager
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tmtvExtension);

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

/***/ "../../../extensions/tmtv/src/init.js":
/*!********************************************!*\
  !*** ../../../extensions/tmtv/src/init.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _utils_measurementServiceMappings_measurementServiceMappingsFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/measurementServiceMappings/measurementServiceMappingsFactory */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const {
  CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  CORNERSTONE_3D_TOOLS_SOURCE_VERSION
} = _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.Enums;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 * @param {Object|Array} configuration.csToolsConfig
 */
function init({
  servicesManager
}) {
  const {
    measurementService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.RectangleROIStartEndThresholdTool);
  (0,_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.addTool)(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.CircleROIStartEndThresholdTool);
  const {
    RectangleROIStartEndThreshold,
    CircleROIStartEndThreshold
  } = (0,_utils_measurementServiceMappings_measurementServiceMappingsFactory__WEBPACK_IMPORTED_MODULE_2__["default"])(measurementService, displaySetService, cornerstoneViewportService);
  const csTools3DVer1MeasurementSource = measurementService.getSource(CORNERSTONE_3D_TOOLS_SOURCE_NAME, CORNERSTONE_3D_TOOLS_SOURCE_VERSION);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'RectangleROIStartEndThreshold', RectangleROIStartEndThreshold.matchingCriteria, RectangleROIStartEndThreshold.toAnnotation, RectangleROIStartEndThreshold.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CircleROIStartEndThreshold', CircleROIStartEndThreshold.matchingCriteria, CircleROIStartEndThreshold.toAnnotation, CircleROIStartEndThreshold.toMeasurement);
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

/***/ "../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js":
/*!*************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/createAndDownloadTMTVReport.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createAndDownloadTMTVReport)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function createAndDownloadTMTVReport(segReport, additionalReportRows, options = {}) {
  const firstReport = segReport[Object.keys(segReport)[0]];
  const columns = Object.keys(firstReport);
  const csv = [columns.join(',')];
  Object.values(segReport).forEach(segmentation => {
    const row = [];
    columns.forEach(column => {
      // if it is array then we need to replace , with space to avoid csv parsing error
      row.push(Array.isArray(segmentation[column]) ? segmentation[column].join(' ') : segmentation[column]);
    });
    csv.push(row.join(','));
  });
  csv.push('');
  csv.push('');
  csv.push('');
  csv.push(`Patient ID,${firstReport.PatientID}`);
  csv.push(`Study Date,${firstReport.StudyDate}`);
  csv.push('');
  additionalReportRows.forEach(({
    key,
    value: values
  }) => {
    const temp = [];
    temp.push(`${key}`);
    Object.keys(values).forEach(k => {
      temp.push(`${k}`);
      temp.push(`${values[k]}`);
    });
    csv.push(temp.join(','));
  });
  const blob = new Blob([csv.join('\n')], {
    type: 'text/csv;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = options.filename ?? `${firstReport.PatientID}_tmtv.csv`;
  a.click();
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

/***/ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js":
/*!************************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dicomRTAnnotationExport)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const {
  datasetToBlob
} = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data;
const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.classes.MetadataProvider;
function dicomRTAnnotationExport(annotations) {
  const dataset = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_2__.adaptersRT.Cornerstone3D.RTSS.generateRTSSFromAnnotations(annotations, metadataProvider, _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore);
  const reportBlob = datasetToBlob(dataset);

  //Create a URL for the binary.
  var objectUrl = URL.createObjectURL(reportBlob);
  window.location.assign(objectUrl);
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

/***/ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js":
/*!******************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/index.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dicomRTAnnotationExport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dicomRTAnnotationExport */ "../../../extensions/tmtv/src/utils/dicomRTAnnotationExport/RTStructureSet/dicomRTAnnotationExport.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_dicomRTAnnotationExport__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "../../../extensions/tmtv/src/utils/getThresholdValue.ts":
/*!***************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/getThresholdValue.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function getRoiStats(referencedVolume, annotations) {
  // roiStats
  const {
    imageData
  } = referencedVolume;
  const values = imageData.getPointData().getScalars().getData();

  // Todo: add support for other strategies
  const {
    fn,
    baseValue
  } = _getStrategyFn('max');
  let value = baseValue;
  const boundsIJK = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.utilities.rectangleROITool.getBoundsIJKFromRectangleAnnotations(annotations, referencedVolume);
  const [[iMin, iMax], [jMin, jMax], [kMin, kMax]] = boundsIJK;
  for (let i = iMin; i <= iMax; i++) {
    for (let j = jMin; j <= jMax; j++) {
      for (let k = kMin; k <= kMax; k++) {
        const offset = imageData.computeOffsetIndex([i, j, k]);
        value = fn(values[offset], value);
      }
    }
  }
  return value;
}
function getThresholdValues(annotationUIDs, referencedVolumes, config) {
  if (config.strategy === 'range') {
    return {
      ptLower: Number(config.ptLower),
      ptUpper: Number(config.ptUpper),
      ctLower: Number(config.ctLower),
      ctUpper: Number(config.ctUpper)
    };
  }
  const {
    weight
  } = config;
  const annotations = annotationUIDs.map(annotationUID => _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_0__.annotation.state.getAnnotation(annotationUID));
  const ptValue = getRoiStats(referencedVolumes[0], annotations);
  return {
    ctLower: -Infinity,
    ctUpper: +Infinity,
    ptLower: weight * ptValue,
    ptUpper: +Infinity
  };
}
function _getStrategyFn(statistic) {
  const baseValue = -Infinity;
  const fn = (number, maxValue) => {
    if (number > maxValue) {
      maxValue = number;
    }
    return maxValue;
  };
  return {
    fn,
    baseValue
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getThresholdValues);

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

/***/ "../../../extensions/tmtv/src/utils/handleROIThresholding.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/handleROIThresholding.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleROIThresholding: () => (/* binding */ handleROIThresholding)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const handleROIThresholding = async ({
  segmentationId,
  commandsManager,
  segmentationService
}) => {
  const segmentation = segmentationService.getSegmentation(segmentationId);
  (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.triggerEvent)(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.Events.WEB_WORKER_PROGRESS, {
    progress: 0,
    type: 'Calculate Lesion Stats',
    id: segmentationId
  });

  // re-calculating the cached stats for the active segmentation
  const updatedPerSegmentCachedStats = {};
  for (const [segmentIndex, segment] of Object.entries(segmentation.segments)) {
    if (!segment) {
      continue;
    }
    const numericSegmentIndex = Number(segmentIndex);
    const lesionStats = await commandsManager.run('getLesionStats', {
      segmentationId,
      segmentIndex: numericSegmentIndex
    });
    const suvPeak = await commandsManager.run('calculateSuvPeak', {
      segmentationId,
      segmentIndex: numericSegmentIndex
    });
    const lesionGlyoclysisStats = lesionStats.volume * lesionStats.meanValue;

    // update segDetails with the suv peak for the active segmentation
    const cachedStats = {
      lesionStats,
      suvPeak,
      lesionGlyoclysisStats
    };
    const updatedSegment = {
      ...segment,
      cachedStats: {
        ...segment.cachedStats,
        ...cachedStats
      }
    };
    updatedPerSegmentCachedStats[numericSegmentIndex] = cachedStats;
    segmentation.segments[segmentIndex] = updatedSegment;
  }

  // all available segmentations
  const segmentations = segmentationService.getSegmentations();
  const tmtv = await commandsManager.run('calculateTMTV', {
    segmentations
  });
  (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.triggerEvent)(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.eventTarget, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.Enums.Events.WEB_WORKER_PROGRESS, {
    progress: 100,
    type: 'Calculate Lesion Stats',
    id: segmentationId
  });

  // add the tmtv to all the segment cachedStats, although it is a global
  // value but we don't have any other way to display it for now
  // Update all segmentations with the calculated TMTV
  segmentations.forEach(segmentation => {
    segmentation.cachedStats = {
      ...segmentation.cachedStats,
      tmtv
    };

    // Update each segment within the segmentation
    Object.keys(segmentation.segments).forEach(segmentIndex => {
      segmentation.segments[segmentIndex].cachedStats = {
        ...segmentation.segments[segmentIndex].cachedStats,
        tmtv
      };
    });

    // Update the segmentation object
    const updatedSegmentation = {
      ...segmentation,
      segments: {
        ...segmentation.segments
      }
    };
    segmentationService.addOrUpdateSegmentation(updatedSegmentation);
  });
};

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

/***/ "../../../extensions/tmtv/src/utils/hpViewports.ts":
/*!*********************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/hpViewports.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ctAXIAL: () => (/* binding */ ctAXIAL),
/* harmony export */   ctCORONAL: () => (/* binding */ ctCORONAL),
/* harmony export */   ctSAGITTAL: () => (/* binding */ ctSAGITTAL),
/* harmony export */   fusionAXIAL: () => (/* binding */ fusionAXIAL),
/* harmony export */   fusionCORONAL: () => (/* binding */ fusionCORONAL),
/* harmony export */   fusionSAGITTAL: () => (/* binding */ fusionSAGITTAL),
/* harmony export */   mipSAGITTAL: () => (/* binding */ mipSAGITTAL),
/* harmony export */   ptAXIAL: () => (/* binding */ ptAXIAL),
/* harmony export */   ptCORONAL: () => (/* binding */ ptCORONAL),
/* harmony export */   ptSAGITTAL: () => (/* binding */ ptSAGITTAL)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// Common sync group configurations
const cameraPositionSync = id => ({
  type: 'cameraPosition',
  id,
  source: true,
  target: true
});
const hydrateSegSync = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR']
  }
};
const ctAXIAL = {
  viewportOptions: {
    viewportId: 'ctAXIAL',
    viewportType: 'volume',
    orientation: 'axial',
    toolGroupId: 'ctToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ctSAGITTAL = {
  viewportOptions: {
    viewportId: 'ctSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ctCORONAL = {
  viewportOptions: {
    viewportId: 'ctCORONAL',
    viewportType: 'volume',
    orientation: 'coronal',
    toolGroupId: 'ctToolGroup',
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }]
};
const ptAXIAL = {
  viewportOptions: {
    viewportId: 'ptAXIAL',
    viewportType: 'volume',
    background: [1, 1, 1],
    orientation: 'axial',
    toolGroupId: 'ptToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const ptSAGITTAL = {
  viewportOptions: {
    viewportId: 'ptSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const ptCORONAL = {
  viewportOptions: {
    viewportId: 'ptCORONAL',
    viewportType: 'volume',
    orientation: 'coronal',
    background: [1, 1, 1],
    toolGroupId: 'ptToolGroup',
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    options: {
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};
const fusionAXIAL = {
  viewportOptions: {
    viewportId: 'fusionAXIAL',
    viewportType: 'volume',
    orientation: 'axial',
    toolGroupId: 'fusionToolGroup',
    initialImageOptions: {
      // index: 5,
      preset: 'first' // 'first', 'last', 'middle'
    },
    syncGroups: [cameraPositionSync('axialSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const fusionSAGITTAL = {
  viewportOptions: {
    viewportId: 'fusionSAGITTAL',
    viewportType: 'volume',
    orientation: 'sagittal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [cameraPositionSync('sagittalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const fusionCORONAL = {
  viewportOptions: {
    viewportId: 'fusionCoronal',
    viewportType: 'volume',
    orientation: 'coronal',
    toolGroupId: 'fusionToolGroup',
    // initialImageOptions: {
    //   index: 180,
    //   preset: 'middle', // 'first', 'last', 'middle'
    // },
    syncGroups: [cameraPositionSync('coronalSync'), {
      type: 'voi',
      id: 'ctWLSync',
      source: false,
      target: true
    }, {
      type: 'voi',
      id: 'fusionWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: false,
      target: true,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync]
  },
  displaySets: [{
    id: 'ctDisplaySet'
  }, {
    id: 'ptDisplaySet',
    options: {
      colormap: {
        name: 'hsv',
        opacity: [{
          value: 0,
          opacity: 0
        }, {
          value: 0.1,
          opacity: 0.8
        }, {
          value: 1,
          opacity: 0.9
        }]
      },
      voi: {
        custom: 'getPTVOIRange'
      }
    }
  }]
};
const mipSAGITTAL = {
  viewportOptions: {
    viewportId: 'mipSagittal',
    viewportType: 'volume',
    orientation: 'sagittal',
    background: [1, 1, 1],
    toolGroupId: 'mipToolGroup',
    syncGroups: [{
      type: 'voi',
      id: 'ptWLSync',
      source: true,
      target: true,
      options: {
        syncColormap: true
      }
    }, {
      type: 'voi',
      id: 'ptFusionWLSync',
      source: true,
      target: false,
      options: {
        syncColormap: false,
        syncInvertState: false
      }
    }, hydrateSegSync],
    // Custom props can be used to set custom properties which extensions
    // can react on.
    customViewportProps: {
      // We use viewportDisplay to filter the viewports which are displayed
      // in mip and we set the scrollbar according to their rotation index
      // in the cornerstone extension.
      hideOverlays: true
    }
  },
  displaySets: [{
    options: {
      blendMode: 'MIP',
      slabThickness: 'fullVolume',
      voi: {
        custom: 'getPTVOIRange'
      },
      voiInverted: true
    },
    id: 'ptDisplaySet'
  }]
};


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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js":
/*!***************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const CircleROIStartEndThreshold = {
  toAnnotation: (measurement, definition) => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.getSOPInstanceAttributes)(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      cachedStats
    } = data;
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      // points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: metadata.label,
      // displayText: displayText,
      data: data.cachedStats,
      type: 'CircleROIStartEndThreshold'
      // getReport,
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircleROIStartEndThreshold);

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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js":
/*!******************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/supportedTools */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const RectangleROIStartEndThreshold = {
  toAnnotation: (measurement, definition) => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService) => {
    const {
      annotation,
      viewportId
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = _constants_supportedTools__WEBPACK_IMPORTED_MODULE_0__["default"].includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_1__.getSOPInstanceAttributes)(referencedImageId, cornerstoneViewportService, viewportId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      // points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: metadata.label,
      data: data.cachedStats,
      type: 'RectangleROIStartEndThreshold'
    };
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RectangleROIStartEndThreshold);

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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js":
/*!*************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/constants/supportedTools.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (['RectangleROIStartEndThreshold']);

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

/***/ "../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js":
/*!**********************************************************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RectangleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RectangleROIStartEndThreshold */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/RectangleROIStartEndThreshold.js");
/* harmony import */ var _CircleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleROIStartEndThreshold */ "../../../extensions/tmtv/src/utils/measurementServiceMappings/CircleROIStartEndThreshold.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const measurementServiceMappingsFactory = (measurementService, displaySetService, cornerstoneViewportService) => {
  return {
    RectangleROIStartEndThreshold: {
      toAnnotation: _RectangleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_0__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _RectangleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_0__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService),
      matchingCriteria: [{
        valueType: measurementService.VALUE_TYPES.ROI_THRESHOLD_MANUAL
      }]
    },
    CircleROIStartEndThreshold: {
      toAnnotation: _CircleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_1__["default"].toAnnotation,
      toMeasurement: csToolsAnnotation => _CircleROIStartEndThreshold__WEBPACK_IMPORTED_MODULE_1__["default"].toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService),
      matchingCriteria: [{
        valueType: measurementService.VALUE_TYPES.ROI_THRESHOLD_MANUAL
      }]
    }
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (measurementServiceMappingsFactory);

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

/***/ "../../../extensions/tmtv/package.json":
/*!*********************************************!*\
  !*** ../../../extensions/tmtv/package.json ***!
  \*********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-tmtv","version":"3.9.1","description":"OHIF extension for Total Metabolic Tumor Volume","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-tmtv.umd.js","module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.16.0"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.9.1","@ohif/ui":"3.9.1","dcmjs":"*","dicom-parser":"^1.8.9","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^18.3.1"},"dependencies":{"@babel/runtime":"^7.20.13","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_tmtv_src_index_tsx.js.map