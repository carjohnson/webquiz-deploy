"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["extensions_dicom-microscopy_src_index_tsx"],{

/***/ "../../../extensions/dicom-microscopy/src/DicomMicroscopySRSopClassHandler.js":
/*!************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/DicomMicroscopySRSopClassHandler.js ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDicomMicroscopySRSopClassHandler)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _utils_loadSR__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/loadSR */ "../../../extensions/dicom-microscopy/src/utils/loadSR.ts");
/* harmony import */ var _utils_toArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/toArray */ "../../../extensions/dicom-microscopy/src/utils/toArray.js");
/* harmony import */ var _utils_dcmCodeValues__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/dcmCodeValues */ "../../../extensions/dicom-microscopy/src/utils/dcmCodeValues.js");
/* harmony import */ var _utils_getSourceDisplaySet__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getSourceDisplaySet */ "../../../extensions/dicom-microscopy/src/utils/getSourceDisplaySet.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






const {
  utils
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"];
const SOP_CLASS_UIDS = {
  COMPREHENSIVE_3D_SR: '1.2.840.10008.5.1.4.1.1.88.34'
};
const SOPClassHandlerId = '@ohif/extension-dicom-microscopy.sopClassHandlerModule.DicomMicroscopySRSopClassHandler';
function _getReferencedFrameOfReferenceUID(naturalizedDataset) {
  const {
    ContentSequence
  } = naturalizedDataset;
  const imagingMeasurementsContentItem = ContentSequence.find(ci => ci.ConceptNameCodeSequence.CodeValue === _utils_dcmCodeValues__WEBPACK_IMPORTED_MODULE_3__["default"].IMAGING_MEASUREMENTS);
  const firstMeasurementGroupContentItem = (0,_utils_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(imagingMeasurementsContentItem.ContentSequence).find(ci => ci.ConceptNameCodeSequence.CodeValue === _utils_dcmCodeValues__WEBPACK_IMPORTED_MODULE_3__["default"].MEASUREMENT_GROUP);
  const imageRegionContentItem = (0,_utils_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(firstMeasurementGroupContentItem.ContentSequence).find(ci => ci.ConceptNameCodeSequence.CodeValue === _utils_dcmCodeValues__WEBPACK_IMPORTED_MODULE_3__["default"].IMAGE_REGION);
  return imageRegionContentItem.ReferencedFrameOfReferenceUID;
}
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const {
    displaySetService,
    microscopyService
  } = servicesManager.services;
  const instance = instances[0];

  // TODO ! Consumption of DICOMMicroscopySRSOPClassHandler to a derived dataset or normal dataset?
  // TODO -> Easy to swap this to a "non-derived" displaySet, but unfortunately need to put it in a different extension.
  const naturalizedDataset = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getSeries(instance.StudyInstanceUID, instance.SeriesInstanceUID).instances[0];
  const ReferencedFrameOfReferenceUID = _getReferencedFrameOfReferenceUID(naturalizedDataset);
  const {
    FrameOfReferenceUID,
    SeriesDescription,
    ContentDate,
    ContentTime,
    SeriesNumber,
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SOPClassUID
  } = instance;
  const displaySet = {
    plugin: 'microscopy',
    Modality: 'SR',
    altImageText: 'Microscopy SR',
    displaySetInstanceUID: utils.guid(),
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    ReferencedFrameOfReferenceUID,
    SOPClassHandlerId,
    SOPClassUID,
    SeriesDescription,
    // Map the content date/time to the series date/time, these are only used for filtering.
    SeriesDate: ContentDate,
    SeriesTime: ContentTime,
    SeriesNumber,
    instance,
    metadata: naturalizedDataset,
    isDerived: true,
    isLoading: false,
    isLoaded: false,
    loadError: false
  };
  displaySet.load = function (referencedDisplaySet) {
    return (0,_utils_loadSR__WEBPACK_IMPORTED_MODULE_1__["default"])(microscopyService, displaySet, referencedDisplaySet).catch(error => {
      displaySet.isLoaded = false;
      displaySet.loadError = true;
      throw new Error(error);
    });
  };
  displaySet.getSourceDisplaySet = function () {
    let allDisplaySets = [];
    const studyMetadata = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
    studyMetadata.series.forEach(series => {
      const displaySets = displaySetService.getDisplaySetsForSeries(series.SeriesInstanceUID);
      allDisplaySets = allDisplaySets.concat(displaySets);
    });
    return (0,_utils_getSourceDisplaySet__WEBPACK_IMPORTED_MODULE_4__["default"])(allDisplaySets, displaySet);
  };
  return [displaySet];
}
function getDicomMicroscopySRSopClassHandler({
  servicesManager,
  extensionManager
}) {
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return {
    name: 'DicomMicroscopySRSopClassHandler',
    sopClassUids: [SOP_CLASS_UIDS.COMPREHENSIVE_3D_SR],
    getDisplaySetsFromSeries
  };
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/components/MicroscopyPanel/MicroscopyPanel.tsx":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/components/MicroscopyPanel/MicroscopyPanel.tsx ***!
  \***********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _services_MicroscopyService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/MicroscopyService */ "../../../extensions/dicom-microscopy/src/services/MicroscopyService.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _utils_constructSR__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/constructSR */ "../../../extensions/dicom-microscopy/src/utils/constructSR.ts");
/* harmony import */ var _utils_saveByteArray__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/saveByteArray */ "../../../extensions/dicom-microscopy/src/utils/saveByteArray.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();









let saving = false;
const {
  datasetToBuffer
} = dcmjs__WEBPACK_IMPORTED_MODULE_6__["default"].data;
const formatArea = area => {
  let mult = 1;
  let unit = 'mm';
  if (area > 1000000) {
    unit = 'm';
    mult = 1 / 1000000;
  } else if (area < 1) {
    unit = 'μm';
    mult = 1000000;
  }
  return `${(area * mult).toFixed(2)} ${unit}²`;
};
const formatLength = (length, unit) => {
  let mult = 1;
  if (unit == 'km' || !unit && length > 1000000) {
    unit = 'km';
    mult = 1 / 1000000;
  } else if (unit == 'm' || !unit && length > 1000) {
    unit = 'm';
    mult = 1 / 1000;
  } else if (unit == 'μm' || !unit && length < 1) {
    unit = 'μm';
    mult = 1000;
  } else if (unit && unit != 'mm') {
    throw new Error(`Unknown length unit ${unit}`);
  } else {
    unit = 'mm';
  }
  return `${(length * mult).toFixed(2)} ${unit}`;
};
/**
 * Microscopy Measurements Panel Component
 *
 * @param props
 * @returns
 */
function MicroscopyPanel(props) {
  _s();
  const {
    microscopyService
  } = props.servicesManager.services;
  const [studyInstanceUID, setStudyInstanceUID] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [roiAnnotations, setRoiAnnotations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [selectedAnnotation, setSelectedAnnotation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    servicesManager,
    extensionManager
  } = props;
  const {
    uiDialogService,
    displaySetService
  } = servicesManager.services;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const viewport = props.viewports.get(props.activeViewportId);
    if (viewport?.displaySetInstanceUIDs[0]) {
      const displaySet = displaySetService.getDisplaySetByUID(viewport.displaySetInstanceUIDs[0]);
      if (displaySet) {
        setStudyInstanceUID(displaySet.StudyInstanceUID);
      }
    }
  }, [props.viewports, props.activeViewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const onAnnotationUpdated = () => {
      const roiAnnotations = microscopyService.getAnnotationsForStudy(studyInstanceUID);
      setRoiAnnotations(roiAnnotations);
    };
    const onAnnotationSelected = () => {
      const selectedAnnotation = microscopyService.getSelectedAnnotation();
      setSelectedAnnotation(selectedAnnotation);
    };
    const onAnnotationRemoved = () => {
      onAnnotationUpdated();
    };
    const {
      unsubscribe: unsubscribeAnnotationUpdated
    } = microscopyService.subscribe(_services_MicroscopyService__WEBPACK_IMPORTED_MODULE_5__.EVENTS.ANNOTATION_UPDATED, onAnnotationUpdated);
    const {
      unsubscribe: unsubscribeAnnotationSelected
    } = microscopyService.subscribe(_services_MicroscopyService__WEBPACK_IMPORTED_MODULE_5__.EVENTS.ANNOTATION_SELECTED, onAnnotationSelected);
    const {
      unsubscribe: unsubscribeAnnotationRemoved
    } = microscopyService.subscribe(_services_MicroscopyService__WEBPACK_IMPORTED_MODULE_5__.EVENTS.ANNOTATION_REMOVED, onAnnotationRemoved);
    onAnnotationUpdated();
    onAnnotationSelected();

    // on unload unsubscribe from events
    return () => {
      unsubscribeAnnotationUpdated();
      unsubscribeAnnotationSelected();
      unsubscribeAnnotationRemoved();
    };
  }, [studyInstanceUID]);

  /**
   * On clicking "Save Annotations" button, prompt an input modal for the
   * new series' description, and continue to save.
   *
   * @returns
   */
  const promptSave = () => {
    const annotations = microscopyService.getAnnotationsForStudy(studyInstanceUID);
    if (!annotations || saving) {
      return;
    }
    (0,_ohif_extension_default__WEBPACK_IMPORTED_MODULE_1__.callInputDialog)({
      uiDialogService,
      title: 'Enter description of the Series',
      defaultValue: '',
      onSave: value => {
        saveFunction(value);
      }
    });
  };
  const getAllDisplaySets = studyMetadata => {
    let allDisplaySets = [];
    studyMetadata.series.forEach(series => {
      const displaySets = displaySetService.getDisplaySetsForSeries(series.SeriesInstanceUID);
      allDisplaySets = allDisplaySets.concat(displaySets);
    });
    return allDisplaySets;
  };

  /**
   * Save annotations as a series
   *
   * @param SeriesDescription - series description
   * @returns
   */
  const saveFunction = async SeriesDescription => {
    const dataSource = extensionManager.getActiveDataSource()[0];
    const {
      onSaveComplete
    } = props;
    const annotations = microscopyService.getAnnotationsForStudy(studyInstanceUID);
    saving = true;

    // There is only one viewer possible for one study,
    // Since once study contains multiple resolution levels (series) of one whole
    // Slide image.

    const studyMetadata = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.DicomMetadataStore.getStudy(studyInstanceUID);
    const displaySets = getAllDisplaySets(studyMetadata);
    const smDisplaySet = displaySets.find(ds => ds.Modality === 'SM');

    // Get the next available series number after 4700.

    const dsWithMetadata = displaySets.filter(ds => ds.metadata && ds.metadata.SeriesNumber && typeof ds.metadata.SeriesNumber === 'number');

    // Generate next series number
    const seriesNumbers = dsWithMetadata.map(ds => ds.metadata.SeriesNumber);
    const maxSeriesNumber = Math.max(...seriesNumbers, 4700);
    const SeriesNumber = maxSeriesNumber + 1;
    const {
      instance: metadata
    } = smDisplaySet;

    // construct SR dataset
    const dataset = (0,_utils_constructSR__WEBPACK_IMPORTED_MODULE_7__["default"])(metadata, {
      SeriesDescription,
      SeriesNumber
    }, annotations);

    // Save in DICOM format
    try {
      if (dataSource) {
        if (dataSource.wadoRoot == 'saveDicom') {
          // download as DICOM file
          const part10Buffer = datasetToBuffer(dataset);
          (0,_utils_saveByteArray__WEBPACK_IMPORTED_MODULE_8__.saveByteArray)(part10Buffer, `sr-microscopy.dcm`);
        } else {
          // Save into Web Data source
          const {
            StudyInstanceUID
          } = dataset;
          await dataSource.store.dicom(dataset);
          if (StudyInstanceUID) {
            dataSource.deleteStudyMetadataPromise(StudyInstanceUID);
          }
        }
        onSaveComplete({
          title: 'SR Saved',
          message: 'Measurements downloaded successfully',
          type: 'success'
        });
      } else {
        console.error('Server unspecified');
      }
    } catch (error) {
      onSaveComplete({
        title: 'SR Save Failed',
        message: error.message || error.toString(),
        type: 'error'
      });
    } finally {
      saving = false;
    }
  };

  /**
   * On clicking "Reject annotations" button
   */
  const onDeleteCurrentSRHandler = async () => {
    try {
      const activeViewport = props.viewports[props.activeViewportId];
      const {
        StudyInstanceUID
      } = activeViewport;

      // TODO: studies?
      const study = _ohif_core__WEBPACK_IMPORTED_MODULE_2__.DicomMetadataStore.getStudy(StudyInstanceUID);
      const lastDerivedDisplaySet = study.derivedDisplaySets.sort((ds1, ds2) => {
        const dateTime1 = Number(`${ds1.SeriesDate}${ds1.SeriesTime}`);
        const dateTime2 = Number(`${ds2.SeriesDate}${ds2.SeriesTime}`);
        return dateTime1 > dateTime2;
      })[study.derivedDisplaySets.length - 1];

      // TODO: use dataSource.reject.dicom()
      // await DICOMSR.rejectMeasurements(
      //   study.wadoRoot,
      //   lastDerivedDisplaySet.StudyInstanceUID,
      //   lastDerivedDisplaySet.SeriesInstanceUID
      // );
      props.onRejectComplete({
        title: 'Report rejected',
        message: 'Latest report rejected successfully',
        type: 'success'
      });
    } catch (error) {
      props.onRejectComplete({
        title: 'Failed to reject report',
        message: error.message,
        type: 'error'
      });
    }
  };

  /**
   * Handler for clicking event of an annotation item.
   *
   * @param param0
   */
  const onMeasurementItemClickHandler = ({
    uid
  }) => {
    const roiAnnotation = microscopyService.getAnnotation(uid);
    microscopyService.selectAnnotation(roiAnnotation);
    microscopyService.focusAnnotation(roiAnnotation, props.activeViewportId);
  };

  /**
   * Handler for "Edit" action of an annotation item
   * @param param0
   */
  const onMeasurementItemEditHandler = ({
    uid,
    isActive
  }) => {
    props.commandsManager.runCommand('setLabel', {
      uid
    }, 'MICROSCOPY');
  };
  const onMeasurementDeleteHandler = ({
    uid,
    isActive
  }) => {
    const roiAnnotation = microscopyService.getAnnotation(uid);
    microscopyService.removeAnnotation(roiAnnotation);
  };

  // Convert ROI annotations managed by microscopyService into our
  // own format for display
  const data = roiAnnotations.map((roiAnnotation, index) => {
    const label = roiAnnotation.getDetailedLabel();
    const area = roiAnnotation.getArea();
    const length = roiAnnotation.getLength();
    const shortAxisLength = roiAnnotation.roiGraphic.properties.shortAxisLength;
    const isSelected = selectedAnnotation === roiAnnotation;

    // other events
    const {
      uid
    } = roiAnnotation;

    // display text
    const displayText = [];
    if (area !== undefined) {
      displayText.push(formatArea(area));
    } else if (length !== undefined) {
      displayText.push(shortAxisLength ? `${formatLength(length, 'μm')} x ${formatLength(shortAxisLength, 'μm')}` : `${formatLength(length, 'μm')}`);
    }

    // convert to measurementItem format compatible with <MeasurementTable /> component
    return {
      uid,
      index,
      label,
      isActive: isSelected,
      displayText,
      roiAnnotation
    };
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ohif-scrollbar overflow-y-auto overflow-x-hidden",
    "data-cy": 'measurements-panel'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col"
  }, data.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.DataRow, {
    key: item.uid,
    number: item.index + 1,
    title: item.label,
    isSelected: item.isActive,
    onSelect: () => onMeasurementItemClickHandler({
      uid: item.uid
    }),
    details: {
      primary: item.displayText,
      secondary: []
    },
    isVisible: true,
    onToggleVisibility: () => {},
    isLocked: false,
    onToggleLocked: () => {},
    onRename: () => onMeasurementItemEditHandler({
      uid: item.uid,
      isActive: item.isActive
    }),
    onDelete: () => onMeasurementDeleteHandler({
      uid: item.uid,
      isActive: item.isActive
    }),
    onColor: () => {},
    disableEditing: false,
    description: item.displayText.join(', ')
  })))));
}
_s(MicroscopyPanel, "/re50xd4XZu0tZ8ab/g3kIVSXgc=");
_c = MicroscopyPanel;
const connectedMicroscopyPanel = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__.withTranslation)(['MicroscopyTable', 'Common'])(MicroscopyPanel);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectedMicroscopyPanel);
var _c;
__webpack_require__.$Refresh$.register(_c, "MicroscopyPanel");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/getCommandsModule.ts":
/*!*********************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/getCommandsModule.ts ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCommandsModule)
/* harmony export */ });
/* harmony import */ var _ohif_extension_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/extension-default */ "../../../extensions/default/src/index.ts");
/* harmony import */ var _utils_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/styles */ "../../../extensions/dicom-microscopy/src/utils/styles.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function getCommandsModule({
  servicesManager,
  commandsManager,
  extensionManager
}) {
  const {
    viewportGridService,
    uiDialogService,
    microscopyService
  } = servicesManager.services;
  const actions = {
    // Measurement tool commands:
    deleteMeasurement: ({
      uid
    }) => {
      if (uid) {
        const roiAnnotation = microscopyService.getAnnotation(uid);
        if (roiAnnotation) {
          microscopyService.removeAnnotation(roiAnnotation);
        }
      }
    },
    setLabel: ({
      uid
    }) => {
      const roiAnnotation = microscopyService.getAnnotation(uid);
      (0,_ohif_extension_default__WEBPACK_IMPORTED_MODULE_0__.callInputDialog)({
        uiDialogService,
        defaultValue: '',
        onSave: value => {
          roiAnnotation.setLabel(value);
          microscopyService.triggerRelabel(roiAnnotation);
        }
      });
    },
    setToolActive: ({
      toolName,
      toolGroupId = 'MICROSCOPY'
    }) => {
      const dragPanOnMiddle = ['dragPan', {
        bindings: {
          mouseButtons: ['middle']
        }
      }];
      const dragZoomOnRight = ['dragZoom', {
        bindings: {
          mouseButtons: ['right']
        }
      }];
      if (['line', 'box', 'circle', 'point', 'polygon', 'freehandpolygon', 'freehandline'].indexOf(toolName) >= 0) {
        // TODO: read from configuration
        const options = {
          geometryType: toolName,
          vertexEnabled: true,
          styleOptions: _utils_styles__WEBPACK_IMPORTED_MODULE_1__["default"]["default"],
          bindings: {
            mouseButtons: ['left']
          }
        };
        if ('line' === toolName) {
          options.minPoints = 2;
          options.maxPoints = 2;
        } else if ('point' === toolName) {
          delete options.styleOptions;
          delete options.vertexEnabled;
        }
        microscopyService.activateInteractions([['draw', options], dragPanOnMiddle, dragZoomOnRight]);
      } else if (toolName == 'dragPan') {
        microscopyService.activateInteractions([['dragPan', {
          bindings: {
            mouseButtons: ['left', 'middle']
          }
        }], dragZoomOnRight]);
      } else {
        microscopyService.activateInteractions([[toolName, {
          bindings: {
            mouseButtons: ['left']
          }
        }], dragPanOnMiddle, dragZoomOnRight]);
      }
    },
    toggleOverlays: () => {
      // overlay
      const overlays = document.getElementsByClassName('microscopy-viewport-overlay');
      let onoff = false; // true if this will toggle on
      for (let i = 0; i < overlays.length; i++) {
        if (i === 0) {
          onoff = overlays.item(0).classList.contains('hidden');
        }
        overlays.item(i).classList.toggle('hidden');
      }

      // overview
      const {
        activeViewportId
      } = viewportGridService.getState();
      microscopyService.toggleOverviewMap(activeViewportId);
    },
    toggleAnnotations: () => {
      microscopyService.toggleROIsVisibility();
    }
  };
  const definitions = {
    deleteMeasurement: {
      commandFn: actions.deleteMeasurement
    },
    setLabel: {
      commandFn: actions.setLabel
    },
    setToolActive: {
      commandFn: actions.setToolActive
    },
    toggleOverlays: {
      commandFn: actions.toggleOverlays
    },
    toggleAnnotations: {
      commandFn: actions.toggleAnnotations
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'MICROSCOPY'
  };
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/getCustomizationModule.ts":
/*!**************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/getCustomizationModule.ts ***!
  \**************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomizationModule)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function getCustomizationModule() {
  return [];
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/getPanelModule.tsx":
/*!*******************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/getPanelModule.tsx ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPanelModule)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _components_MicroscopyPanel_MicroscopyPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/MicroscopyPanel/MicroscopyPanel */ "../../../extensions/dicom-microscopy/src/components/MicroscopyPanel/MicroscopyPanel.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  var _s = __webpack_require__.$Refresh$.signature();
  const wrappedMeasurementPanel = ({}) => {
    _s();
    const [{
      activeViewportId,
      viewports
    }] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid)();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_MicroscopyPanel_MicroscopyPanel__WEBPACK_IMPORTED_MODULE_2__["default"], {
      viewports: viewports,
      activeViewportId: activeViewportId,
      onSaveComplete: () => {},
      onRejectComplete: () => {},
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager
    });
  };
  _s(wrappedMeasurementPanel, "EV8IprZhHE92zX5UCb7fBNmhByk=", false, function () {
    return [_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid];
  });
  return [{
    name: 'measure',
    iconName: 'tab-linear',
    iconLabel: 'Measure',
    label: 'Measurements',
    secondaryLabel: 'Measurements',
    component: wrappedMeasurementPanel
  }];
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/id.js":
/*!******************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/id.js ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/dicom-microscopy/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/index.tsx":
/*!**********************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/index.tsx ***!
  \**********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/dicom-microscopy/src/id.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/dicom-microscopy/src/getPanelModule.tsx");
/* harmony import */ var _getCommandsModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getCommandsModule */ "../../../extensions/dicom-microscopy/src/getCommandsModule.ts");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/dicom-microscopy/src/getCustomizationModule.ts");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _DicomMicroscopySRSopClassHandler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DicomMicroscopySRSopClassHandler */ "../../../extensions/dicom-microscopy/src/DicomMicroscopySRSopClassHandler.js");
/* harmony import */ var _services_MicroscopyService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/MicroscopyService */ "../../../extensions/dicom-microscopy/src/services/MicroscopyService.ts");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-resize-detector */ "../../../node_modules/react-resize-detector/build/index.esm.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_9__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}










const Component = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().lazy(_c = () => {
  return __webpack_require__.e(/*! import() */ "extensions_dicom-microscopy_src_DicomMicroscopyViewport_tsx").then(__webpack_require__.bind(__webpack_require__, /*! ./DicomMicroscopyViewport */ "../../../extensions/dicom-microscopy/src/DicomMicroscopyViewport.tsx"));
});
_c2 = Component;
const MicroscopyViewport = props => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
    fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, "Loading...")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Component, props));
};

/**
 * You can remove any of the following modules if you don't need them.
 */
_c3 = MicroscopyViewport;
const extension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  async preRegistration({
    servicesManager
  }) {
    servicesManager.registerService(_services_MicroscopyService__WEBPACK_IMPORTED_MODULE_7__["default"].REGISTRATION(servicesManager));
  },
  /**
   * ViewportModule should provide a list of viewports that will be available in OHIF
   * for Modes to consume and use in the viewports. Each viewport is defined by
   * {name, component} object. Example of a viewport module is the CornerstoneViewport
   * that is provided by the Cornerstone extension in OHIF.
   */
  getViewportModule({
    servicesManager,
    extensionManager,
    commandsManager
  }) {
    var _s = __webpack_require__.$Refresh$.signature();
    /**
     *
     * @param props {*}
     * @param props.displaySets
     * @param props.viewportId
     * @param props.viewportLabel
     * @param props.dataSource
     * @param props.viewportOptions
     * @param props.displaySetOptions
     * @returns
     */
    const ExtendedMicroscopyViewport = props => {
      _s();
      const {
        viewportOptions
      } = props;
      const [viewportGrid, viewportGridService] = (0,_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.useViewportGrid)();
      const {
        activeViewportId
      } = viewportGrid;
      const displaySetsKey = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
        return props.displaySets.map(ds => ds.displaySetInstanceUID).join('-');
      }, [props.displaySets]);
      const onResize = lodash_debounce__WEBPACK_IMPORTED_MODULE_9___default()(() => {
        const {
          microscopyService
        } = servicesManager.services;
        const managedViewer = microscopyService.getAllManagedViewers();
        if (managedViewer && managedViewer.length > 0) {
          managedViewer[0].viewer.resize();
        }
      }, 100);
      const {
        ref: resizeRef
      } = (0,react_resize_detector__WEBPACK_IMPORTED_MODULE_8__.useResizeDetector)({
        onResize,
        handleHeight: true,
        handleWidth: true
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(MicroscopyViewport, _extends({
        key: displaySetsKey,
        activeViewportId: activeViewportId,
        setViewportActive: viewportId => {
          viewportGridService.setActiveViewportId(viewportId);
        },
        viewportData: viewportOptions,
        resizeRef: resizeRef
      }, props));
    };
    _s(ExtendedMicroscopyViewport, "1OBN5DeIGEx8FjxA7gaPex5Jr+o=", false, function () {
      return [_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.useViewportGrid, react_resize_detector__WEBPACK_IMPORTED_MODULE_8__.useResizeDetector];
    });
    return [{
      name: 'microscopy-dicom',
      component: ExtendedMicroscopyViewport
    }];
  },
  getToolbarModule({
    servicesManager
  }) {
    return [{
      name: 'evaluate.microscopyTool',
      evaluate: ({
        button
      }) => {
        const {
          microscopyService
        } = servicesManager.services;
        const activeInteractions = microscopyService.getActiveInteractions();
        if (!activeInteractions) {
          return false;
        }
        const isPrimaryActive = activeInteractions.find(interactions => {
          const sameMouseButton = interactions[1].bindings.mouseButtons.includes('left');
          if (!sameMouseButton) {
            return false;
          }
          const notDraw = interactions[0] !== 'draw';

          // there seems to be a custom logic for draw tool for some reason
          return notDraw ? interactions[0] === button.id : interactions[1].geometryType === button.id;
        });
        return {
          disabled: false,
          className: isPrimaryActive ? '!text-black bg-primary-light' : '!text-common-bright hover:!bg-primary-dark hover:!text-primary-light',
          // Todo: isActive right now is used for nested buttons where the primary
          // button needs to be fully rounded (vs partial rounded) when active
          // otherwise it does not have any other use
          isActive: isPrimaryActive
        };
      }
    }];
  },
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule(params) {
    return [(0,_DicomMicroscopySRSopClassHandler__WEBPACK_IMPORTED_MODULE_6__["default"])(params)];
  },
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getCommandsModule: _getCommandsModule__WEBPACK_IMPORTED_MODULE_3__["default"],
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_4__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Component$React.lazy");
__webpack_require__.$Refresh$.register(_c2, "Component");
__webpack_require__.$Refresh$.register(_c3, "MicroscopyViewport");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/services/MicroscopyService.ts":
/*!******************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/services/MicroscopyService.ts ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENTS: () => (/* binding */ EVENTS),
/* harmony export */   "default": () => (/* binding */ MicroscopyService)
/* harmony export */ });
/* harmony import */ var _tools_viewerManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tools/viewerManager */ "../../../extensions/dicom-microscopy/src/tools/viewerManager.js");
/* harmony import */ var _utils_RoiAnnotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/RoiAnnotation */ "../../../extensions/dicom-microscopy/src/utils/RoiAnnotation.js");
/* harmony import */ var _utils_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/styles */ "../../../extensions/dicom-microscopy/src/utils/styles.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _MicroscopyService;




const EVENTS = {
  ANNOTATION_UPDATED: 'annotationUpdated',
  ANNOTATION_SELECTED: 'annotationSelected',
  ANNOTATION_REMOVED: 'annotationRemoved',
  RELABEL: 'relabel',
  DELETE: 'delete'
};

/**
 * MicroscopyService is responsible to manage multiple third-party API's
 * microscopy viewers expose methods to manage the interaction with these
 * viewers and handle their ROI graphics to create, remove and modify the
 * ROI annotations relevant to the application
 */
class MicroscopyService extends _ohif_core__WEBPACK_IMPORTED_MODULE_3__.PubSubService {
  constructor({
    servicesManager,
    extensionManager
  }) {
    super(EVENTS);
    this.servicesManager = void 0;
    this.managedViewers = new Set();
    this.roiUids = new Set();
    this.annotations = {};
    this.selectedAnnotation = null;
    this.pendingFocus = false;
    this.servicesManager = servicesManager;
    this.peerImport = extensionManager.appConfig.peerImport;
    this._onRoiAdded = this._onRoiAdded.bind(this);
    this._onRoiModified = this._onRoiModified.bind(this);
    this._onRoiRemoved = this._onRoiRemoved.bind(this);
    this._onRoiUpdated = this._onRoiUpdated.bind(this);
    this._onRoiSelected = this._onRoiSelected.bind(this);
    this.isROIsVisible = true;
  }

  /**
   * Clears all the annotations and managed viewers, setting the manager state
   * to its initial state
   */
  clear() {
    this.managedViewers.forEach(managedViewer => managedViewer.destroy());
    this.managedViewers.clear();
    for (const key in this.annotations) {
      delete this.annotations[key];
    }
    this.roiUids.clear();
    this.selectedAnnotation = null;
    this.pendingFocus = false;
  }
  clearAnnotations() {
    Object.keys(this.annotations).forEach(uid => {
      this.removeAnnotation(this.annotations[uid]);
    });
  }
  importDicomMicroscopyViewer() {
    return this.peerImport("dicom-microscopy-viewer");
  }

  /**
   * Observes when a ROI graphic is added, creating the correspondent annotation
   * with the current graphic and view state.
   * Creates a subscription for label updating for the created annotation and
   * publishes an ANNOTATION_UPDATED event when it happens.
   * Also triggers the relabel process after the graphic is placed.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The added ROI graphic object
   * @param {ViewerManager} data.managedViewer The origin viewer for the event
   */
  _onRoiAdded(data) {
    const {
      roiGraphic,
      managedViewer,
      label
    } = data;
    const {
      studyInstanceUID,
      seriesInstanceUID
    } = managedViewer;
    const viewState = managedViewer.getViewState();
    const roiAnnotation = new _utils_RoiAnnotation__WEBPACK_IMPORTED_MODULE_1__["default"](roiGraphic, studyInstanceUID, seriesInstanceUID, '', viewState);
    this.roiUids.add(roiGraphic.uid);
    this.annotations[roiGraphic.uid] = roiAnnotation;
    roiAnnotation.subscribe(_utils_RoiAnnotation__WEBPACK_IMPORTED_MODULE_1__.EVENTS.LABEL_UPDATED, () => {
      this._broadcastEvent(EVENTS.ANNOTATION_UPDATED, roiAnnotation);
    });
    if (label !== undefined) {
      roiAnnotation.setLabel(label);
    } else {
      const onRelabel = item => managedViewer.updateROIProperties({
        uid: roiGraphic.uid,
        properties: {
          label: item.label,
          finding: item.finding
        }
      });
      this.triggerRelabel(roiAnnotation, true, onRelabel);
    }
  }

  /**
   * Observes when a ROI graphic is modified, updating the correspondent
   * annotation with the current graphic and view state.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The modified ROI graphic object
   */
  _onRoiModified(data) {
    const {
      roiGraphic,
      managedViewer
    } = data;
    const roiAnnotation = this.getAnnotation(roiGraphic.uid);
    if (!roiAnnotation) {
      return;
    }
    roiAnnotation.setRoiGraphic(roiGraphic);
    roiAnnotation.setViewState(managedViewer.getViewState());
  }

  /**
   * Observes when a ROI graphic is removed, reflecting the removal in the
   * annotations' state.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The removed ROI graphic object
   */
  _onRoiRemoved(data) {
    const {
      roiGraphic
    } = data;
    this.roiUids.delete(roiGraphic.uid);
    this.annotations[roiGraphic.uid].destroy();
    delete this.annotations[roiGraphic.uid];
    this._broadcastEvent(EVENTS.ANNOTATION_REMOVED, roiGraphic);
  }

  /**
   * Observes any changes on ROI graphics and synchronize all the managed
   * viewers to reflect those changes.
   * Also publishes an ANNOTATION_UPDATED event to notify the subscribers.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The added ROI graphic object
   * @param {ViewerManager} data.managedViewer The origin viewer for the event
   */
  _onRoiUpdated(data) {
    const {
      roiGraphic,
      managedViewer
    } = data;
    this.synchronizeViewers(managedViewer);
    this._broadcastEvent(EVENTS.ANNOTATION_UPDATED, this.getAnnotation(roiGraphic.uid));
  }

  /**
   * Observes when an ROI is selected.
   * Also publishes an ANNOTATION_SELECTED event to notify the subscribers.
   *
   * @param {Object} data The published data
   * @param {Object} data.roiGraphic The added ROI graphic object
   * @param {ViewerManager} data.managedViewer The origin viewer for the event
   */
  _onRoiSelected(data) {
    const {
      roiGraphic
    } = data;
    const selectedAnnotation = this.getAnnotation(roiGraphic.uid);
    if (selectedAnnotation && selectedAnnotation !== this.getSelectedAnnotation()) {
      if (this.selectedAnnotation) {
        this.clearSelection();
      }
      this.selectedAnnotation = selectedAnnotation;
      this._broadcastEvent(EVENTS.ANNOTATION_SELECTED, selectedAnnotation);
    }
  }

  /**
   * Creates the subscriptions for the managed viewer being added
   *
   * @param {ViewerManager} managedViewer The viewer being added
   */
  _addManagedViewerSubscriptions(managedViewer) {
    managedViewer._roiAddedSubscription = managedViewer.subscribe(_tools_viewerManager__WEBPACK_IMPORTED_MODULE_0__.EVENTS.ADDED, this._onRoiAdded);
    managedViewer._roiModifiedSubscription = managedViewer.subscribe(_tools_viewerManager__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MODIFIED, this._onRoiModified);
    managedViewer._roiRemovedSubscription = managedViewer.subscribe(_tools_viewerManager__WEBPACK_IMPORTED_MODULE_0__.EVENTS.REMOVED, this._onRoiRemoved);
    managedViewer._roiUpdatedSubscription = managedViewer.subscribe(_tools_viewerManager__WEBPACK_IMPORTED_MODULE_0__.EVENTS.UPDATED, this._onRoiUpdated);
    managedViewer._roiSelectedSubscription = managedViewer.subscribe(_tools_viewerManager__WEBPACK_IMPORTED_MODULE_0__.EVENTS.UPDATED, this._onRoiSelected);
  }

  /**
   * Removes the subscriptions for the managed viewer being removed
   *
   * @param {ViewerManager} managedViewer The viewer being removed
   */
  _removeManagedViewerSubscriptions(managedViewer) {
    managedViewer._roiAddedSubscription && managedViewer._roiAddedSubscription.unsubscribe();
    managedViewer._roiModifiedSubscription && managedViewer._roiModifiedSubscription.unsubscribe();
    managedViewer._roiRemovedSubscription && managedViewer._roiRemovedSubscription.unsubscribe();
    managedViewer._roiUpdatedSubscription && managedViewer._roiUpdatedSubscription.unsubscribe();
    managedViewer._roiSelectedSubscription && managedViewer._roiSelectedSubscription.unsubscribe();
    managedViewer._roiAddedSubscription = null;
    managedViewer._roiModifiedSubscription = null;
    managedViewer._roiRemovedSubscription = null;
    managedViewer._roiUpdatedSubscription = null;
    managedViewer._roiSelectedSubscription = null;
  }

  /**
   * Returns the managed viewers that are displaying the image with the given
   * study and series UIDs
   *
   * @param {String} studyInstanceUID UID for the study
   * @param {String} seriesInstanceUID UID for the series
   *
   * @returns {Array} The managed viewers for the given series UID
   */
  _getManagedViewersForSeries(studyInstanceUID, seriesInstanceUID) {
    const filter = managedViewer => managedViewer.studyInstanceUID === studyInstanceUID && managedViewer.seriesInstanceUID === seriesInstanceUID;
    return Array.from(this.managedViewers).filter(filter);
  }

  /**
   * Returns the managed viewers that are displaying the image with the given
   * study UID
   *
   * @param {String} studyInstanceUID UID for the study
   *
   * @returns {Array} The managed viewers for the given series UID
   */
  getManagedViewersForStudy(studyInstanceUID) {
    const filter = managedViewer => managedViewer.studyInstanceUID === studyInstanceUID;
    return Array.from(this.managedViewers).filter(filter);
  }

  /**
   * Restores the created annotations for the viewer being added
   *
   * @param {ViewerManager} managedViewer The viewer being added
   */
  _restoreAnnotations(managedViewer) {
    const {
      studyInstanceUID,
      seriesInstanceUID
    } = managedViewer;
    const annotations = this.getAnnotationsForSeries(studyInstanceUID, seriesInstanceUID);
    annotations.forEach(roiAnnotation => {
      managedViewer.addRoiGraphic(roiAnnotation.roiGraphic);
    });
  }

  /**
   * Creates a managed viewer instance for the given third-party API's viewer.
   * Restores existing annotations for the given study/series.
   * Adds event subscriptions for the viewer being added.
   * Focuses the selected annotation when the viewer is being loaded into the
   * active viewport.
   *
   * @param viewer - Third-party viewer API's object to be managed
   * @param viewportId - The viewport Id where the viewer will be loaded
   * @param container - The DOM element where it will be rendered
   * @param studyInstanceUID - The study UID of the loaded image
   * @param seriesInstanceUID - The series UID of the loaded image
   * @param displaySets - All displaySets related to the same StudyInstanceUID
   *
   * @returns {ViewerManager} managed viewer
   */
  addViewer(viewer, viewportId, container, studyInstanceUID, seriesInstanceUID) {
    const managedViewer = new _tools_viewerManager__WEBPACK_IMPORTED_MODULE_0__["default"](viewer, viewportId, container, studyInstanceUID, seriesInstanceUID);
    this._restoreAnnotations(managedViewer);
    viewer._manager = managedViewer;
    this.managedViewers.add(managedViewer);

    // this._potentiallyLoadSR(studyInstanceUID, displaySets);
    this._addManagedViewerSubscriptions(managedViewer);
    if (this.pendingFocus) {
      this.pendingFocus = false;
      this.focusAnnotation(this.selectedAnnotation, viewportId);
    }
    return managedViewer;
  }
  _potentiallyLoadSR(StudyInstanceUID, displaySets) {
    const studyMetadata = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.DicomMetadataStore.getStudy(StudyInstanceUID);
    const smDisplaySet = displaySets.find(ds => ds.Modality === 'SM');
    const {
      FrameOfReferenceUID,
      othersFrameOfReferenceUID
    } = smDisplaySet;
    if (!studyMetadata) {
      return;
    }
    let derivedDisplaySets = FrameOfReferenceUID ? displaySets.filter(ds => ds.ReferencedFrameOfReferenceUID === FrameOfReferenceUID ||
    // sometimes each depth instance has the different FrameOfReferenceID
    othersFrameOfReferenceUID.includes(ds.ReferencedFrameOfReferenceUID)) : [];
    if (!derivedDisplaySets.length) {
      return;
    }
    derivedDisplaySets = derivedDisplaySets.filter(ds => ds.Modality === 'SR');
    if (derivedDisplaySets.some(ds => ds.isLoaded === true)) {
      // Don't auto load
      return;
    }

    // find most recent and load it.
    let recentDateTime = 0;
    let recentDisplaySet = derivedDisplaySets[0];
    derivedDisplaySets.forEach(ds => {
      const dateTime = Number(`${ds.SeriesDate}${ds.SeriesTime}`);
      if (dateTime > recentDateTime) {
        recentDateTime = dateTime;
        recentDisplaySet = ds;
      }
    });
    recentDisplaySet.isLoading = true;
    recentDisplaySet.load(smDisplaySet);
  }

  /**
   * Removes the given third-party viewer API's object from the managed viewers
   * and clears all its event subscriptions
   *
   * @param {Object} viewer Third-party viewer API's object to be removed
   */
  removeViewer(viewer) {
    const managedViewer = viewer._manager;
    this._removeManagedViewerSubscriptions(managedViewer);
    managedViewer.destroy();
    this.managedViewers.delete(managedViewer);
  }

  /**
   * Toggle ROIs visibility
   */
  toggleROIsVisibility() {
    this.isROIsVisible ? this.hideROIs() : this.showROIs;
    this.isROIsVisible = !this.isROIsVisible;
  }

  /**
   * Hide all ROIs
   */
  hideROIs() {
    this.managedViewers.forEach(mv => mv.hideROIs());
  }

  /** Show all ROIs */
  showROIs() {
    this.managedViewers.forEach(mv => mv.showROIs());
  }

  /**
   * Returns a RoiAnnotation instance for the given ROI UID
   *
   * @param {String} uid UID of the annotation
   *
   * @returns {RoiAnnotation} The RoiAnnotation instance found for the given UID
   */
  getAnnotation(uid) {
    return this.annotations[uid];
  }

  /**
   * Returns all the RoiAnnotation instances being managed
   *
   * @returns {Array} All RoiAnnotation instances
   */
  getAnnotations() {
    const annotations = [];
    Object.keys(this.annotations).forEach(uid => {
      annotations.push(this.getAnnotation(uid));
    });
    return annotations;
  }

  /**
   * Returns the RoiAnnotation instances registered with the given study UID
   *
   * @param {String} studyInstanceUID UID for the study
   */
  getAnnotationsForStudy(studyInstanceUID) {
    const filter = a => a.studyInstanceUID === studyInstanceUID;
    return this.getAnnotations().filter(filter);
  }

  /**
   * Returns the RoiAnnotation instances registered with the given study and
   * series UIDs
   *
   * @param {String} studyInstanceUID UID for the study
   * @param {String} seriesInstanceUID UID for the series
   */
  getAnnotationsForSeries(studyInstanceUID, seriesInstanceUID) {
    const filter = annotation => annotation.studyInstanceUID === studyInstanceUID && annotation.seriesInstanceUID === seriesInstanceUID;
    return this.getAnnotations().filter(filter);
  }

  /**
   * Returns the selected RoiAnnotation instance or null if none is selected
   *
   * @returns {RoiAnnotation} The selected RoiAnnotation instance
   */
  getSelectedAnnotation() {
    return this.selectedAnnotation;
  }

  /**
   * Clear current RoiAnnotation selection
   */
  clearSelection() {
    if (this.selectedAnnotation) {
      this.setROIStyle(this.selectedAnnotation.uid, {
        stroke: {
          color: '#00ff00'
        }
      });
    }
    this.selectedAnnotation = null;
  }

  /**
   * Selects the given RoiAnnotation instance, publishing an ANNOTATION_SELECTED
   * event to notify all the subscribers
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be selected
   */
  selectAnnotation(roiAnnotation) {
    if (this.selectedAnnotation) {
      this.clearSelection();
    }
    this.selectedAnnotation = roiAnnotation;
    this._broadcastEvent(EVENTS.ANNOTATION_SELECTED, roiAnnotation);
    this.setROIStyle(roiAnnotation.uid, _utils_styles__WEBPACK_IMPORTED_MODULE_2__["default"].active);
  }

  /**
   * Toggles overview map
   *
   * @param viewportId The active viewport index
   * @returns {void}
   */
  toggleOverviewMap(viewportId) {
    const managedViewers = Array.from(this.managedViewers);
    const managedViewer = managedViewers.find(mv => mv.viewportId === viewportId);
    if (managedViewer) {
      managedViewer.toggleOverviewMap();
    }
  }

  /**
   * Removes a RoiAnnotation instance from the managed annotations and reflects
   * its removal on all third-party viewers being managed
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be removed
   */
  removeAnnotation(roiAnnotation) {
    const {
      uid,
      studyInstanceUID,
      seriesInstanceUID
    } = roiAnnotation;
    const filter = managedViewer => managedViewer.studyInstanceUID === studyInstanceUID && managedViewer.seriesInstanceUID === seriesInstanceUID;
    const managedViewers = Array.from(this.managedViewers).filter(filter);
    managedViewers.forEach(managedViewer => managedViewer.removeRoiGraphic(uid));
    if (this.annotations[uid]) {
      this.roiUids.delete(uid);
      this.annotations[uid].destroy();
      delete this.annotations[uid];
      this._broadcastEvent(EVENTS.ANNOTATION_REMOVED, roiAnnotation);
    }
  }

  /**
   * Focus the given RoiAnnotation instance by changing the OpenLayers' Map view
   * state of the managed viewer with the given viewport index.
   * If the image for the given annotation is not yet loaded into the viewport,
   * it will set a pendingFocus flag to true in order to perform the focus when
   * the managed viewer instance is created.
   *
   * @param {RoiAnnotation} roiAnnotation RoiAnnotation instance to be focused
   * @param {string} viewportId Index of the viewport to focus
   */
  focusAnnotation(roiAnnotation, viewportId) {
    const filter = mv => mv.viewportId === viewportId;
    const managedViewer = Array.from(this.managedViewers).find(filter);
    if (managedViewer) {
      managedViewer.setViewStateByExtent(roiAnnotation);
    } else {
      this.pendingFocus = true;
    }
  }

  /**
   * Synchronize the ROI graphics for all the managed viewers that has the same
   * series UID of the given managed viewer
   *
   * @param {ViewerManager} baseManagedViewer Reference managed viewer
   */
  synchronizeViewers(baseManagedViewer) {
    const {
      studyInstanceUID,
      seriesInstanceUID
    } = baseManagedViewer;
    const managedViewers = this._getManagedViewersForSeries(studyInstanceUID, seriesInstanceUID);

    // Prevent infinite loops arrising from updates.
    managedViewers.forEach(managedViewer => this._removeManagedViewerSubscriptions(managedViewer));
    managedViewers.forEach(managedViewer => {
      if (managedViewer === baseManagedViewer) {
        return;
      }
      const annotations = this.getAnnotationsForSeries(studyInstanceUID, seriesInstanceUID);
      managedViewer.clearRoiGraphics();
      annotations.forEach(roiAnnotation => {
        managedViewer.addRoiGraphic(roiAnnotation.roiGraphic);
      });
    });
    managedViewers.forEach(managedViewer => this._addManagedViewerSubscriptions(managedViewer));
  }

  /**
   * Activates interactions across all the viewers being managed
   *
   * @param {Array} interactions interactions
   */
  activateInteractions(interactions) {
    this.managedViewers.forEach(mv => mv.activateInteractions(interactions));
    this.activeInteractions = interactions;
  }
  getActiveInteractions() {
    return this.activeInteractions;
  }

  /**
   * Triggers the relabelling process for the given RoiAnnotation instance, by
   * publishing the RELABEL event to notify the subscribers
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be relabelled
   * @param {boolean} newAnnotation Whether the annotation is newly drawn (so it deletes on cancel).
   */
  triggerRelabel(roiAnnotation, newAnnotation = false, onRelabel) {
    if (!onRelabel) {
      onRelabel = ({
        label
      }) => this.managedViewers.forEach(mv => mv.updateROIProperties({
        uid: roiAnnotation.uid,
        properties: {
          label
        }
      }));
    }
    this._broadcastEvent(EVENTS.RELABEL, {
      roiAnnotation,
      deleteCallback: () => this.removeAnnotation(roiAnnotation),
      successCallback: onRelabel,
      newAnnotation
    });
  }

  /**
   * Triggers the deletion process for the given RoiAnnotation instance, by
   * publishing the DELETE event to notify the subscribers
   *
   * @param {RoiAnnotation} roiAnnotation The instance to be deleted
   */
  triggerDelete(roiAnnotation) {
    this._broadcastEvent(EVENTS.DELETE, roiAnnotation);
  }

  /**
   * Set ROI style for all managed viewers
   *
   * @param {string} uid The ROI uid that will be styled
   * @param {object} styleOptions - Style options
   * @param {object*} styleOptions.stroke - Style options for the outline of the geometry
   * @param {number[]} styleOptions.stroke.color - RGBA color of the outline
   * @param {number} styleOptions.stroke.width - Width of the outline
   * @param {object*} styleOptions.fill - Style options for body the geometry
   * @param {number[]} styleOptions.fill.color - RGBA color of the body
   * @param {object*} styleOptions.image - Style options for image
   */
  setROIStyle(uid, styleOptions) {
    this.managedViewers.forEach(mv => mv.setROIStyle(uid, styleOptions));
  }

  /**
   * Get all managed viewers
   *
   * @returns {Array} managedViewers
   */
  getAllManagedViewers() {
    return Array.from(this.managedViewers);
  }
}
_MicroscopyService = MicroscopyService;
MicroscopyService.REGISTRATION = servicesManager => {
  return {
    name: 'microscopyService',
    altName: 'MicroscopyService',
    create: props => {
      return new _MicroscopyService(props);
    }
  };
};


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/tools/viewerManager.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/tools/viewerManager.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENTS: () => (/* binding */ EVENTS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_coordinateFormatScoord3d2Geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/coordinateFormatScoord3d2Geometry */ "../../../extensions/dicom-microscopy/src/utils/coordinateFormatScoord3d2Geometry.js");
/* harmony import */ var _utils_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/styles */ "../../../extensions/dicom-microscopy/src/utils/styles.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





// Events from the third-party viewer
const ApiEvents = {
  /** Triggered when a ROI was added. */
  ROI_ADDED: 'dicommicroscopyviewer_roi_added',
  /** Triggered when a ROI was modified. */
  ROI_MODIFIED: 'dicommicroscopyviewer_roi_modified',
  /** Triggered when a ROI was removed. */
  ROI_REMOVED: 'dicommicroscopyviewer_roi_removed',
  /** Triggered when a ROI was drawn. */
  ROI_DRAWN: `dicommicroscopyviewer_roi_drawn`,
  /** Triggered when a ROI was selected. */
  ROI_SELECTED: `dicommicroscopyviewer_roi_selected`,
  /** Triggered when a viewport move has started. */
  MOVE_STARTED: `dicommicroscopyviewer_move_started`,
  /** Triggered when a viewport move has ended. */
  MOVE_ENDED: `dicommicroscopyviewer_move_ended`,
  /** Triggered when a loading of data has started. */
  LOADING_STARTED: `dicommicroscopyviewer_loading_started`,
  /** Triggered when a loading of data has ended. */
  LOADING_ENDED: `dicommicroscopyviewer_loading_ended`,
  /** Triggered when an error occurs during loading of data. */
  LOADING_ERROR: `dicommicroscopyviewer_loading_error`,
  /* Triggered when the loading of an image tile has started. */
  FRAME_LOADING_STARTED: `dicommicroscopyviewer_frame_loading_started`,
  /* Triggered when the loading of an image tile has ended. */
  FRAME_LOADING_ENDED: `dicommicroscopyviewer_frame_loading_ended`,
  /* Triggered when the error occurs during loading of an image tile. */
  FRAME_LOADING_ERROR: `dicommicroscopyviewer_frame_loading_ended`
};
const EVENTS = {
  ADDED: 'added',
  MODIFIED: 'modified',
  REMOVED: 'removed',
  UPDATED: 'updated',
  SELECTED: 'selected'
};

/**
 * ViewerManager encapsulates the complexity of the third-party viewer and
 * expose only the features/behaviors that are relevant to the application
 */
class ViewerManager extends _ohif_core__WEBPACK_IMPORTED_MODULE_2__.PubSubService {
  constructor(viewer, viewportId, container, studyInstanceUID, seriesInstanceUID) {
    super(EVENTS);
    this.viewer = viewer;
    this.viewportId = viewportId;
    this.container = container;
    this.studyInstanceUID = studyInstanceUID;
    this.seriesInstanceUID = seriesInstanceUID;
    this.onRoiAdded = this.roiAddedHandler.bind(this);
    this.onRoiModified = this.roiModifiedHandler.bind(this);
    this.onRoiRemoved = this.roiRemovedHandler.bind(this);
    this.onRoiSelected = this.roiSelectedHandler.bind(this);
    this.contextMenuCallback = () => {};

    // init symbols
    const symbols = Object.getOwnPropertySymbols(this.viewer);
    this._drawingSource = symbols.find(p => p.description === 'drawingSource');
    this._pyramid = symbols.find(p => p.description === 'pyramid');
    this._map = symbols.find(p => p.description === 'map');
    this._affine = symbols.find(p => p.description === 'affine');
    this.registerEvents();
    this.activateDefaultInteractions();
  }
  addContextMenuCallback(callback) {
    this.contextMenuCallback = callback;
  }

  /**
   * Destroys this managed viewer instance, clearing all the event handlers
   */
  destroy() {
    this.unregisterEvents();
  }

  /**
   * This is to overrides the _broadcastEvent method of PubSubService and always
   * send the ROI graphic object and this managed viewer instance.
   * Due to the way that PubSubService is written, the same name override of the
   * function doesn't work.
   *
   * @param {String} key key Subscription key
   * @param {Object} roiGraphic ROI graphic object created by the third-party API
   */
  publish(key, roiGraphic) {
    this._broadcastEvent(key, {
      roiGraphic,
      managedViewer: this
    });
  }

  /**
   * Registers all the relevant event handlers for the third-party API
   */
  registerEvents() {
    this.container.addEventListener(ApiEvents.ROI_ADDED, this.onRoiAdded);
    this.container.addEventListener(ApiEvents.ROI_MODIFIED, this.onRoiModified);
    this.container.addEventListener(ApiEvents.ROI_REMOVED, this.onRoiRemoved);
    this.container.addEventListener(ApiEvents.ROI_SELECTED, this.onRoiSelected);
  }

  /**
   * Clears all the relevant event handlers for the third-party API
   */
  unregisterEvents() {
    this.container.removeEventListener(ApiEvents.ROI_ADDED, this.onRoiAdded);
    this.container.removeEventListener(ApiEvents.ROI_MODIFIED, this.onRoiModified);
    this.container.removeEventListener(ApiEvents.ROI_REMOVED, this.onRoiRemoved);
    this.container.removeEventListener(ApiEvents.ROI_SELECTED, this.onRoiSelected);
  }

  /**
   * Handles the ROI_ADDED event triggered by the third-party API
   *
   * @param {Event} event Event triggered by the third-party API
   */
  roiAddedHandler(event) {
    const roiGraphic = event.detail.payload;
    this.publish(EVENTS.ADDED, roiGraphic);
    this.publish(EVENTS.UPDATED, roiGraphic);
  }

  /**
   * Handles the ROI_MODIFIED event triggered by the third-party API
   *
   * @param {Event} event Event triggered by the third-party API
   */
  roiModifiedHandler(event) {
    const roiGraphic = event.detail.payload;
    this.publish(EVENTS.MODIFIED, roiGraphic);
    this.publish(EVENTS.UPDATED, roiGraphic);
  }

  /**
   * Handles the ROI_REMOVED event triggered by the third-party API
   *
   * @param {Event} event Event triggered by the third-party API
   */
  roiRemovedHandler(event) {
    const roiGraphic = event.detail.payload;
    this.publish(EVENTS.REMOVED, roiGraphic);
    this.publish(EVENTS.UPDATED, roiGraphic);
  }

  /**
   * Handles the ROI_SELECTED event triggered by the third-party API
   *
   * @param {Event} event Event triggered by the third-party API
   */
  roiSelectedHandler(event) {
    const roiGraphic = event.detail.payload;
    this.publish(EVENTS.SELECTED, roiGraphic);
  }

  /**
   * Run the given callback operation without triggering any events for this
   * instance, so subscribers will not be affected
   *
   * @param {Function} callback Callback that will run sinlently
   */
  runSilently(callback) {
    this.unregisterEvents();
    callback();
    this.registerEvents();
  }

  /**
   * Removes all the ROI graphics from the third-party API
   */
  clearRoiGraphics() {
    this.runSilently(() => this.viewer.removeAllROIs());
  }
  showROIs() {
    this.viewer.showROIs();
  }
  hideROIs() {
    this.viewer.hideROIs();
  }

  /**
   * Adds the given ROI graphic into the third-party API
   *
   * @param {Object} roiGraphic ROI graphic object to be added
   */
  addRoiGraphic(roiGraphic) {
    this.runSilently(() => this.viewer.addROI(roiGraphic, _utils_styles__WEBPACK_IMPORTED_MODULE_1__["default"]["default"]));
  }

  /**
   * Adds the given ROI graphic into the third-party API, and also add a label.
   * Used for importing from SR.
   *
   * @param {Object} roiGraphic ROI graphic object to be added.
   * @param {String} label The label of the annotation.
   */
  addRoiGraphicWithLabel(roiGraphic, label) {
    // NOTE: Dicom Microscopy Viewer will override styles for "Text" evaluations
    // to hide all other geometries, we are not going to use its label.
    // if (label) {
    //   if (!roiGraphic.properties) roiGraphic.properties = {};
    //   roiGraphic.properties.label = label;
    // }
    this.runSilently(() => this.viewer.addROI(roiGraphic, _utils_styles__WEBPACK_IMPORTED_MODULE_1__["default"]["default"]));
    this._broadcastEvent(EVENTS.ADDED, {
      roiGraphic,
      managedViewer: this,
      label
    });
  }

  /**
   * Sets ROI style
   *
   * @param {String} uid ROI graphic UID to be styled
   * @param {object} styleOptions - Style options
   * @param {object} styleOptions.stroke - Style options for the outline of the geometry
   * @param {number[]} styleOptions.stroke.color - RGBA color of the outline
   * @param {number} styleOptions.stroke.width - Width of the outline
   * @param {object} styleOptions.fill - Style options for body the geometry
   * @param {number[]} styleOptions.fill.color - RGBA color of the body
   * @param {object} styleOptions.image - Style options for image
   */
  setROIStyle(uid, styleOptions) {
    this.viewer.setROIStyle(uid, styleOptions);
  }

  /**
   * Removes the ROI graphic with the given UID from the third-party API
   *
   * @param {String} uid ROI graphic UID to be removed
   */
  removeRoiGraphic(uid) {
    this.viewer.removeROI(uid);
  }

  /**
   * Update properties of regions of interest.
   *
   * @param {object} roi - ROI to be updated
   * @param {string} roi.uid - Unique identifier of the region of interest
   * @param {object} roi.properties - ROI properties
   * @returns {void}
   */
  updateROIProperties({
    uid,
    properties
  }) {
    this.viewer.updateROI({
      uid,
      properties
    });
  }

  /**
   * Toggles overview map
   *
   * @returns {void}
   */
  toggleOverviewMap() {
    this.viewer.toggleOverviewMap();
  }

  /**
   * Activates the viewer default interactions
   * @returns {void}
   */
  activateDefaultInteractions() {
    /** Disable browser's native context menu inside the canvas */
    document.querySelector('.DicomMicroscopyViewer').addEventListener('contextmenu', event => {
      event.preventDefault();
      // comment out when context menu for microscopy is enabled
      // if (typeof this.contextMenuCallback === 'function') {
      //   this.contextMenuCallback(event);
      // }
    }, false);
    const defaultInteractions = [['dragPan', {
      bindings: {
        mouseButtons: ['middle']
      }
    }], ['dragZoom', {
      bindings: {
        mouseButtons: ['right']
      }
    }], ['modify', {}]];
    this.activateInteractions(defaultInteractions);
  }

  /**
   * Activates interactions
   * @param {Array} interactions Interactions to be activated
   * @returns {void}
   */
  activateInteractions(interactions) {
    const interactionsMap = {
      draw: activate => activate ? 'activateDrawInteraction' : 'deactivateDrawInteraction',
      modify: activate => activate ? 'activateModifyInteraction' : 'deactivateModifyInteraction',
      translate: activate => activate ? 'activateTranslateInteraction' : 'deactivateTranslateInteraction',
      snap: activate => activate ? 'activateSnapInteraction' : 'deactivateSnapInteraction',
      dragPan: activate => activate ? 'activateDragPanInteraction' : 'deactivateDragPanInteraction',
      dragZoom: activate => activate ? 'activateDragZoomInteraction' : 'deactivateDragZoomInteraction',
      select: activate => activate ? 'activateSelectInteraction' : 'deactivateSelectInteraction'
    };
    const availableInteractionsName = Object.keys(interactionsMap);
    availableInteractionsName.forEach(availableInteractionName => {
      const interaction = interactions.find(interaction => interaction[0] === availableInteractionName);
      if (!interaction) {
        const deactivateInteractionMethod = interactionsMap[availableInteractionName](false);
        this.viewer[deactivateInteractionMethod]();
      } else {
        const [name, config] = interaction;
        const activateInteractionMethod = interactionsMap[name](true);
        this.viewer[activateInteractionMethod](config);
      }
    });
  }

  /**
   * Accesses the internals of third-party API and returns the OpenLayers Map
   *
   * @returns {Object} OpenLayers Map component instance
   */
  _getMapView() {
    const map = this._getMap();
    return map.getView();
  }
  _getMap() {
    const symbols = Object.getOwnPropertySymbols(this.viewer);
    const _map = symbols.find(s => String(s) === 'Symbol(map)');
    window['map'] = this.viewer[_map];
    return this.viewer[_map];
  }

  /**
   * Returns the current state for the OpenLayers View
   *
   * @returns {Object} Current view state
   */
  getViewState() {
    const view = this._getMapView();
    return {
      center: view.getCenter(),
      resolution: view.getResolution(),
      zoom: view.getZoom()
    };
  }

  /**
   * Sets the current state for the OpenLayers View
   *
   * @param {Object} viewState View state to be applied
   */
  setViewState(viewState) {
    const view = this._getMapView();
    view.setZoom(viewState.zoom);
    view.setResolution(viewState.resolution);
    view.setCenter(viewState.center);
  }
  setViewStateByExtent(roiAnnotation) {
    const coordinates = roiAnnotation.getCoordinates();
    if (Array.isArray(coordinates[0]) && !coordinates[2]) {
      this._jumpToPolyline(coordinates);
    } else if (Array.isArray(coordinates[0])) {
      this._jumpToPolygonOrEllipse(coordinates);
    } else {
      this._jumpToPoint(coordinates);
    }
  }
  _jumpToPoint(coord) {
    const pyramid = this.viewer[this._pyramid].metadata;
    const mappedCoord = (0,_utils_coordinateFormatScoord3d2Geometry__WEBPACK_IMPORTED_MODULE_0__["default"])(coord, pyramid);
    const view = this._getMapView();
    view.setCenter(mappedCoord);
  }
  _jumpToPolyline(coord) {
    const pyramid = this.viewer[this._pyramid].metadata;
    const mappedCoord = (0,_utils_coordinateFormatScoord3d2Geometry__WEBPACK_IMPORTED_MODULE_0__["default"])(coord, pyramid);
    const view = this._getMapView();
    const x = mappedCoord[0];
    const y = mappedCoord[1];
    const xab = (x[0] + y[0]) / 2;
    const yab = (x[1] + y[1]) / 2;
    const midpoint = [xab, yab];
    view.setCenter(midpoint);
  }
  _jumpToPolygonOrEllipse(coordinates) {
    const pyramid = this.viewer[this._pyramid].metadata;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    coordinates.forEach(coord => {
      let mappedCoord = (0,_utils_coordinateFormatScoord3d2Geometry__WEBPACK_IMPORTED_MODULE_0__["default"])(coord, pyramid);
      const [x, y] = mappedCoord;
      if (x < minX) {
        minX = x;
      } else if (x > maxX) {
        maxX = x;
      }
      if (y < minY) {
        minY = y;
      } else if (y > maxY) {
        maxY = y;
      }
    });
    const width = maxX - minX;
    const height = maxY - minY;
    minX -= 0.5 * width;
    maxX += 0.5 * width;
    minY -= 0.5 * height;
    maxY += 0.5 * height;
    const map = this._getMap();
    map.getView().fit([minX, minY, maxX, maxY], map.getSize());
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewerManager);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/DEVICE_OBSERVER_UID.js":
/*!*****************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/DEVICE_OBSERVER_UID.js ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// We need to define a UID for this extension as a device, and it should be the same for all saves:

const uid = '2.25.285241207697168520771311899641885187923';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uid);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/RoiAnnotation.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/RoiAnnotation.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENTS: () => (/* binding */ EVENTS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _areaOfPolygon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./areaOfPolygon */ "../../../extensions/dicom-microscopy/src/utils/areaOfPolygon.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const EVENTS = {
  LABEL_UPDATED: 'labelUpdated',
  GRAPHIC_UPDATED: 'graphicUpdated',
  VIEW_UPDATED: 'viewUpdated',
  REMOVED: 'removed'
};

/**
 * Represents a single annotation for the Microscopy Viewer
 */
class RoiAnnotation extends _ohif_core__WEBPACK_IMPORTED_MODULE_1__.PubSubService {
  constructor(roiGraphic, studyInstanceUID, seriesInstanceUID, label = '', viewState = null) {
    super(EVENTS);
    this.uid = roiGraphic.uid;
    this.roiGraphic = roiGraphic;
    this.studyInstanceUID = studyInstanceUID;
    this.seriesInstanceUID = seriesInstanceUID;
    this.label = label;
    this.viewState = viewState;
    this.setMeasurements(roiGraphic);
  }
  getScoord3d() {
    const roiGraphic = this.roiGraphic;
    const roiGraphicSymbols = Object.getOwnPropertySymbols(roiGraphic);
    const _scoord3d = roiGraphicSymbols.find(s => String(s) === 'Symbol(scoord3d)');
    return roiGraphic[_scoord3d];
  }
  getCoordinates() {
    const scoord3d = this.getScoord3d();
    const scoord3dSymbols = Object.getOwnPropertySymbols(scoord3d);
    const _coordinates = scoord3dSymbols.find(s => String(s) === 'Symbol(coordinates)');
    const coordinates = scoord3d[_coordinates];
    return coordinates;
  }

  /**
   * When called will trigger the REMOVED event
   */
  destroy() {
    this._broadcastEvent(EVENTS.REMOVED, this);
  }

  /**
   * Updates the ROI graphic for the annotation and triggers the GRAPHIC_UPDATED
   * event
   *
   * @param {Object} roiGraphic
   */
  setRoiGraphic(roiGraphic) {
    this.roiGraphic = roiGraphic;
    this.setMeasurements();
    this._broadcastEvent(EVENTS.GRAPHIC_UPDATED, this);
  }

  /**
   * Update ROI measurement values based on its scoord3d coordinates.
   *
   * @returns {void}
   */
  setMeasurements() {
    const type = this.roiGraphic.scoord3d.graphicType;
    const coordinates = this.roiGraphic.scoord3d.graphicData;
    switch (type) {
      case 'ELLIPSE':
        // This is a circle so only need one side
        const point1 = coordinates[0];
        const point2 = coordinates[1];
        let xLength2 = point2[0] - point1[0];
        let yLength2 = point2[1] - point1[1];
        xLength2 *= xLength2;
        yLength2 *= yLength2;
        const length = Math.sqrt(xLength2 + yLength2);
        const radius = length / 2;
        const areaEllipse = Math.PI * radius * radius;
        this._area = areaEllipse;
        this._length = undefined;
        break;
      case 'POLYGON':
        const areaPolygon = (0,_areaOfPolygon__WEBPACK_IMPORTED_MODULE_0__["default"])(coordinates);
        this._area = areaPolygon;
        this._length = undefined;
        break;
      case 'POINT':
        this._area = undefined;
        this._length = undefined;
        break;
      case 'POLYLINE':
        let len = 0;
        for (let i = 1; i < coordinates.length; i++) {
          const p1 = coordinates[i - 1];
          const p2 = coordinates[i];
          let xLen = p2[0] - p1[0];
          let yLen = p2[1] - p1[1];
          xLen *= xLen;
          yLen *= yLen;
          len += Math.sqrt(xLen + yLen);
        }
        this._area = undefined;
        this._length = len;
        break;
    }
  }

  /**
   * Update the OpenLayer Map's view state for the annotation and triggers the
   * VIEW_UPDATED event
   *
   * @param {Object} viewState The new view state for the annotation
   */
  setViewState(viewState) {
    this.viewState = viewState;
    this._broadcastEvent(EVENTS.VIEW_UPDATED, this);
  }

  /**
   * Update the label for the annotation and triggers the LABEL_UPDATED event
   *
   * @param {String} label New label for the annotation
   */
  setLabel(label, finding) {
    this.label = label || finding && finding.CodeMeaning;
    this.finding = finding || {
      CodingSchemeDesignator: '@ohif/extension-dicom-microscopy',
      CodeValue: label,
      CodeMeaning: label
    };
    this._broadcastEvent(EVENTS.LABEL_UPDATED, this);
  }

  /**
   * Returns the geometry type of the annotation concatenated with the label
   * defined for the annotation.
   * Difference with getDetailedLabel() is that this will return empty string for empty
   * label.
   *
   * @returns {String} Text with geometry type and label
   */
  getLabel() {
    const label = this.label ? `${this.label}` : '';
    return label;
  }

  /**
   * Returns the geometry type of the annotation concatenated with the label
   * defined for the annotation
   *
   * @returns {String} Text with geometry type and label
   */
  getDetailedLabel() {
    const label = this.label ? `${this.label}` : '(empty)';
    return label;
  }
  getLength() {
    return this._length;
  }
  getArea() {
    return this._area;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RoiAnnotation);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/areaOfPolygon.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/areaOfPolygon.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areaOfPolygon)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function areaOfPolygon(coordinates) {
  // Shoelace algorithm.
  const n = coordinates.length;
  let area = 0.0;
  let j = n - 1;
  for (let i = 0; i < n; i++) {
    area += (coordinates[j][0] + coordinates[i][0]) * (coordinates[j][1] - coordinates[i][1]);
    j = i; // j is previous vertex to i
  }

  // Return absolute value of half the sum
  // (The value is halved as we are summing up triangles, not rectangles).
  return Math.abs(area / 2.0);
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/constructSR.ts":
/*!*********************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/constructSR.ts ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ constructSR)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _DEVICE_OBSERVER_UID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DEVICE_OBSERVER_UID */ "../../../extensions/dicom-microscopy/src/utils/DEVICE_OBSERVER_UID.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 *
 * @param {*} metadata - Microscopy Image instance metadata
 * @param {*} SeriesDescription - SR description
 * @param {*} annotations - Annotations
 *
 * @return Comprehensive3DSR dataset
 */
function constructSR(metadata, {
  SeriesDescription,
  SeriesNumber
}, annotations) {
  // Handle malformed data
  if (!metadata.SpecimenDescriptionSequence) {
    metadata.SpecimenDescriptionSequence = {
      SpecimenUID: metadata.SeriesInstanceUID,
      SpecimenIdentifier: metadata.SeriesDescription
    };
  }
  const {
    SpecimenDescriptionSequence
  } = metadata;

  // construct Comprehensive3DSR dataset
  const observationContext = new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.ObservationContext({
    observerPersonContext: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.ObserverContext({
      observerType: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
        value: '121006',
        schemeDesignator: 'DCM',
        meaning: 'Person'
      }),
      observerIdentifyingAttributes: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.PersonObserverIdentifyingAttributes({
        name: '@ohif/extension-dicom-microscopy'
      })
    }),
    observerDeviceContext: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.ObserverContext({
      observerType: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
        value: '121007',
        schemeDesignator: 'DCM',
        meaning: 'Device'
      }),
      observerIdentifyingAttributes: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.DeviceObserverIdentifyingAttributes({
        uid: _DEVICE_OBSERVER_UID__WEBPACK_IMPORTED_MODULE_1__["default"]
      })
    }),
    subjectContext: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.SubjectContext({
      subjectClass: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
        value: '121027',
        schemeDesignator: 'DCM',
        meaning: 'Specimen'
      }),
      subjectClassSpecificContext: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.SubjectContextSpecimen({
        uid: SpecimenDescriptionSequence.SpecimenUID,
        identifier: SpecimenDescriptionSequence.SpecimenIdentifier || metadata.SeriesInstanceUID,
        containerIdentifier: metadata.ContainerIdentifier || metadata.SeriesInstanceUID
      })
    })
  });
  const imagingMeasurements = [];
  for (let i = 0; i < annotations.length; i++) {
    const {
      roiGraphic: roi,
      label
    } = annotations[i];
    let {
      measurements,
      evaluations,
      marker,
      presentationState
    } = roi.properties;
    console.log('[SR] storing marker...', marker);
    console.log('[SR] storing measurements...', measurements);
    console.log('[SR] storing evaluations...', evaluations);
    console.log('[SR] storing presentation state...', presentationState);
    if (presentationState) {
      presentationState.marker = marker;
    }

    /** Avoid incompatibility with dcmjs */
    measurements = measurements.map(measurement => {
      const ConceptName = Array.isArray(measurement.ConceptNameCodeSequence) ? measurement.ConceptNameCodeSequence[0] : measurement.ConceptNameCodeSequence;
      const MeasuredValue = Array.isArray(measurement.MeasuredValueSequence) ? measurement.MeasuredValueSequence[0] : measurement.MeasuredValueSequence;
      const MeasuredValueUnits = Array.isArray(MeasuredValue.MeasurementUnitsCodeSequence) ? MeasuredValue.MeasurementUnitsCodeSequence[0] : MeasuredValue.MeasurementUnitsCodeSequence;
      return new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.valueTypes.NumContentItem({
        name: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
          meaning: ConceptName.CodeMeaning,
          value: ConceptName.CodeValue,
          schemeDesignator: ConceptName.CodingSchemeDesignator
        }),
        value: MeasuredValue.NumericValue,
        unit: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
          value: MeasuredValueUnits.CodeValue,
          meaning: MeasuredValueUnits.CodeMeaning,
          schemeDesignator: MeasuredValueUnits.CodingSchemeDesignator
        })
      });
    });

    /** Avoid incompatibility with dcmjs */
    evaluations = evaluations.map(evaluation => {
      const ConceptName = Array.isArray(evaluation.ConceptNameCodeSequence) ? evaluation.ConceptNameCodeSequence[0] : evaluation.ConceptNameCodeSequence;
      return new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.valueTypes.TextContentItem({
        name: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
          value: ConceptName.CodeValue,
          meaning: ConceptName.CodeMeaning,
          schemeDesignator: ConceptName.CodingSchemeDesignator
        }),
        value: evaluation.TextValue,
        relationshipType: evaluation.RelationshipType
      });
    });
    const identifier = `ROI #${i + 1}`;
    const group = new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.PlanarROIMeasurementsAndQualitativeEvaluations({
      trackingIdentifier: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.TrackingIdentifier({
        uid: roi.uid,
        identifier: presentationState ? identifier.concat(`(${JSON.stringify(presentationState)})`) : identifier
      }),
      referencedRegion: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.contentItems.ImageRegion3D({
        graphicType: roi.scoord3d.graphicType,
        graphicData: roi.scoord3d.graphicData,
        frameOfReferenceUID: roi.scoord3d.frameOfReferenceUID
      }),
      findingType: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
        value: label,
        schemeDesignator: '@ohif/extension-dicom-microscopy',
        meaning: 'FREETEXT'
      }),
      /** Evaluations will conflict with current tracking identifier */
      /** qualitativeEvaluations: evaluations, */
      measurements
    });
    imagingMeasurements.push(...group);
  }
  const measurementReport = new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.MeasurementReport({
    languageOfContentItemAndDescendants: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.templates.LanguageOfContentItemAndDescendants({}),
    observationContext,
    procedureReported: new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.coding.CodedConcept({
      value: '112703',
      schemeDesignator: 'DCM',
      meaning: 'Whole Slide Imaging'
    }),
    imagingMeasurements
  });
  const dataset = new dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].sr.documents.Comprehensive3DSR({
    content: measurementReport[0],
    evidence: [metadata],
    seriesInstanceUID: dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.DicomMetaDictionary.uid(),
    seriesNumber: SeriesNumber,
    seriesDescription: SeriesDescription || 'Whole slide imaging structured report',
    sopInstanceUID: dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.DicomMetaDictionary.uid(),
    instanceNumber: 1,
    manufacturer: 'dcmjs-org'
  });
  dataset.SpecificCharacterSet = 'ISO_IR 192';
  const fileMetaInformationVersionArray = new Uint8Array(2);
  fileMetaInformationVersionArray[1] = 1;
  dataset._meta = {
    FileMetaInformationVersion: {
      Value: [fileMetaInformationVersionArray.buffer],
      // TODO
      vr: 'OB'
    },
    MediaStorageSOPClassUID: dataset.sopClassUID,
    MediaStorageSOPInstanceUID: dataset.sopInstanceUID,
    TransferSyntaxUID: {
      Value: ['1.2.840.10008.1.2.1'],
      vr: 'UI'
    },
    ImplementationClassUID: {
      Value: [dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.DicomMetaDictionary.uid()],
      vr: 'UI'
    },
    ImplementationVersionName: {
      Value: ['@ohif/extension-dicom-microscopy'],
      vr: 'SH'
    }
  };
  return dataset;
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/coordinateFormatScoord3d2Geometry.js":
/*!*******************************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/coordinateFormatScoord3d2Geometry.js ***!
  \*******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ coordinateFormatScoord3d2Geometry)
/* harmony export */ });
/* harmony import */ var mathjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mathjs */ "../../../node_modules/mathjs/lib/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



// TODO -> This is pulled out of some internal logic from Dicom Microscopy Viewer,
// We should likely just expose this there.

function coordinateFormatScoord3d2Geometry(coordinates, pyramid) {
  let transform = false;
  if (!Array.isArray(coordinates[0])) {
    coordinates = [coordinates];
    transform = true;
  }
  const metadata = pyramid[pyramid.length - 1];
  const orientation = metadata.ImageOrientationSlide;
  const spacing = _getPixelSpacing(metadata);
  const origin = metadata.TotalPixelMatrixOriginSequence[0];
  const offset = [Number(origin.XOffsetInSlideCoordinateSystem), Number(origin.YOffsetInSlideCoordinateSystem)];
  coordinates = coordinates.map(c => {
    const slideCoord = [c[0], c[1]];
    const pixelCoord = mapSlideCoord2PixelCoord({
      offset,
      orientation,
      spacing,
      point: slideCoord
    });
    return [pixelCoord[0], -(pixelCoord[1] + 1), 0];
  });
  if (transform) {
    return coordinates[0];
  }
  return coordinates;
}
function _getPixelSpacing(metadata) {
  if (metadata.PixelSpacing) {
    return metadata.PixelSpacing;
  }
  const functionalGroup = metadata.SharedFunctionalGroupsSequence[0];
  const pixelMeasures = functionalGroup.PixelMeasuresSequence[0];
  return pixelMeasures.PixelSpacing;
}
function mapSlideCoord2PixelCoord(options) {
  // X and Y Offset in Slide Coordinate System
  if (!('offset' in options)) {
    throw new Error('Option "offset" is required.');
  }
  if (!Array.isArray(options.offset)) {
    throw new Error('Option "offset" must be an array.');
  }
  if (options.offset.length !== 2) {
    throw new Error('Option "offset" must be an array with 2 elements.');
  }
  const offset = options.offset;

  // Image Orientation Slide with direction cosines for Row and Column direction
  if (!('orientation' in options)) {
    throw new Error('Option "orientation" is required.');
  }
  if (!Array.isArray(options.orientation)) {
    throw new Error('Option "orientation" must be an array.');
  }
  if (options.orientation.length !== 6) {
    throw new Error('Option "orientation" must be an array with 6 elements.');
  }
  const orientation = options.orientation;

  // Pixel Spacing along the Row and Column direction
  if (!('spacing' in options)) {
    throw new Error('Option "spacing" is required.');
  }
  if (!Array.isArray(options.spacing)) {
    throw new Error('Option "spacing" must be an array.');
  }
  if (options.spacing.length !== 2) {
    throw new Error('Option "spacing" must be an array with 2 elements.');
  }
  const spacing = options.spacing;

  // X and Y coordinate in the Slide Coordinate System
  if (!('point' in options)) {
    throw new Error('Option "point" is required.');
  }
  if (!Array.isArray(options.point)) {
    throw new Error('Option "point" must be an array.');
  }
  if (options.point.length !== 2) {
    throw new Error('Option "point" must be an array with 2 elements.');
  }
  const point = options.point;
  const m = [[orientation[0] * spacing[1], orientation[3] * spacing[0], offset[0]], [orientation[1] * spacing[1], orientation[4] * spacing[0], offset[1]], [0, 0, 1]];
  const mInverted = (0,mathjs__WEBPACK_IMPORTED_MODULE_0__.inv)(m);
  const vSlide = [[point[0]], [point[1]], [1]];
  const vImage = (0,mathjs__WEBPACK_IMPORTED_MODULE_0__.multiply)(mInverted, vSlide);
  const row = Number(vImage[1][0].toFixed(4));
  const col = Number(vImage[0][0].toFixed(4));
  return [col, row];
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/dcmCodeValues.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/dcmCodeValues.js ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const DCM_CODE_VALUES = {
  IMAGING_MEASUREMENTS: '126010',
  MEASUREMENT_GROUP: '125007',
  IMAGE_REGION: '111030',
  FINDING: '121071',
  TRACKING_UNIQUE_IDENTIFIER: '112039',
  LENGTH: '410668003',
  AREA: '42798000',
  SHORT_AXIS: 'G-A186',
  LONG_AXIS: 'G-A185',
  ELLIPSE_AREA: 'G-D7FE' // TODO: Remove this
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DCM_CODE_VALUES);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/getSourceDisplaySet.js":
/*!*****************************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/getSourceDisplaySet.js ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSourceDisplaySet)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Get referenced SM displaySet from SR displaySet
 *
 * @param {*} allDisplaySets
 * @param {*} microscopySRDisplaySet
 * @returns
 */
function getSourceDisplaySet(allDisplaySets, microscopySRDisplaySet) {
  const {
    ReferencedFrameOfReferenceUID
  } = microscopySRDisplaySet;
  const otherDisplaySets = allDisplaySets.filter(ds => ds.displaySetInstanceUID !== microscopySRDisplaySet.displaySetInstanceUID);
  const referencedDisplaySet = otherDisplaySets.find(displaySet => displaySet.Modality === 'SM' && (displaySet.FrameOfReferenceUID === ReferencedFrameOfReferenceUID ||
  // sometimes each depth instance has the different FrameOfReferenceID
  displaySet.othersFrameOfReferenceUID.includes(ReferencedFrameOfReferenceUID)));
  if (!referencedDisplaySet && otherDisplaySets.length >= 1) {
    console.warn('No display set with FrameOfReferenceUID', ReferencedFrameOfReferenceUID, 'single series, assuming data error, defaulting to only series.');
    return otherDisplaySets.find(displaySet => displaySet.Modality === 'SM');
  }
  return referencedDisplaySet;
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/loadSR.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/loadSR.ts ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadSR)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dcmCodeValues */ "../../../extensions/dicom-microscopy/src/utils/dcmCodeValues.js");
/* harmony import */ var _toArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toArray */ "../../../extensions/dicom-microscopy/src/utils/toArray.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const MeasurementReport = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].adapters.DICOMMicroscopyViewer.MeasurementReport;

// Define as async so that it returns a promise, expected by the ViewportGrid
async function loadSR(microscopyService, microscopySRDisplaySet, referencedDisplaySet) {
  const naturalizedDataset = microscopySRDisplaySet.metadata;
  const {
    StudyInstanceUID,
    FrameOfReferenceUID
  } = referencedDisplaySet;
  const managedViewers = microscopyService.getManagedViewersForStudy(StudyInstanceUID);
  if (!managedViewers || !managedViewers.length) {
    return;
  }
  microscopySRDisplaySet.isLoaded = true;
  const {
    rois,
    labels
  } = await _getROIsFromToolState(microscopyService, naturalizedDataset, FrameOfReferenceUID);
  const managedViewer = managedViewers[0];
  for (let i = 0; i < rois.length; i++) {
    // NOTE: When saving Microscopy SR, we are attaching identifier property
    // to each ROI, and when read for display, it is coming in as "TEXT"
    // evaluation.
    // As the Dicom Microscopy Viewer will override styles for "Text" evaluations
    // to hide all other geometries, we are going to manually remove that
    // evaluation item.
    const roi = rois[i];
    const roiSymbols = Object.getOwnPropertySymbols(roi);
    const _properties = roiSymbols.find(s => s.description === 'properties');
    const properties = roi[_properties];
    properties['evaluations'] = [];
    managedViewer.addRoiGraphicWithLabel(roi, labels[i]);
  }
}
async function _getROIsFromToolState(microscopyService, naturalizedDataset, FrameOfReferenceUID) {
  const toolState = MeasurementReport.generateToolState(naturalizedDataset);
  const tools = Object.getOwnPropertyNames(toolState);
  // Does a dynamic import to prevent webpack from rebuilding the library
  const DICOMMicroscopyViewer = await microscopyService.importDicomMicroscopyViewer();
  const measurementGroupContentItems = _getMeasurementGroups(naturalizedDataset);
  const rois = [];
  const labels = [];
  tools.forEach(t => {
    const toolSpecificToolState = toolState[t];
    let scoord3d;
    const capsToolType = t.toUpperCase();
    const measurementGroupContentItemsForTool = measurementGroupContentItems.filter(mg => {
      const imageRegionContentItem = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(mg.ContentSequence).find(ci => ci.ConceptNameCodeSequence.CodeValue === _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].IMAGE_REGION);
      return imageRegionContentItem.GraphicType === capsToolType;
    });
    toolSpecificToolState.forEach((coordinates, index) => {
      const properties = {};
      const options = {
        coordinates,
        frameOfReferenceUID: FrameOfReferenceUID
      };
      if (t === 'Polygon') {
        scoord3d = new DICOMMicroscopyViewer.scoord3d.Polygon(options);
      } else if (t === 'Polyline') {
        scoord3d = new DICOMMicroscopyViewer.scoord3d.Polyline(options);
      } else if (t === 'Point') {
        scoord3d = new DICOMMicroscopyViewer.scoord3d.Point(options);
      } else if (t === 'Ellipse') {
        scoord3d = new DICOMMicroscopyViewer.scoord3d.Ellipse(options);
      } else {
        throw new Error('Unsupported tool type');
      }
      const measurementGroup = measurementGroupContentItemsForTool[index];
      const findingGroup = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(measurementGroup.ContentSequence).find(ci => ci.ConceptNameCodeSequence.CodeValue === _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].FINDING);
      const trackingGroup = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(measurementGroup.ContentSequence).find(ci => ci.ConceptNameCodeSequence.CodeValue === _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].TRACKING_UNIQUE_IDENTIFIER);

      /**
       * Extract presentation state from tracking identifier.
       * Currently is stored in SR but should be stored in its tags.
       */
      if (trackingGroup) {
        const regExp = /\(([^)]+)\)/;
        const matches = regExp.exec(trackingGroup.TextValue);
        if (matches && matches[1]) {
          properties.presentationState = JSON.parse(matches[1]);
          properties.marker = properties.presentationState.marker;
        }
      }
      let measurements = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(measurementGroup.ContentSequence).filter(ci => [_dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].LENGTH, _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].AREA, _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].SHORT_AXIS, _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].LONG_AXIS, _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].ELLIPSE_AREA].includes(ci.ConceptNameCodeSequence.CodeValue));
      let evaluations = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(measurementGroup.ContentSequence).filter(ci => [_dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].TRACKING_UNIQUE_IDENTIFIER].includes(ci.ConceptNameCodeSequence.CodeValue));

      /**
       * TODO: Resolve bug in DCMJS.
       * ConceptNameCodeSequence should be a sequence with only one item.
       */
      evaluations = evaluations.map(evaluation => {
        const e = {
          ...evaluation
        };
        e.ConceptNameCodeSequence = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(e.ConceptNameCodeSequence);
        return e;
      });

      /**
       * TODO: Resolve bug in DCMJS.
       * ConceptNameCodeSequence should be a sequence with only one item.
       */
      measurements = measurements.map(measurement => {
        const m = {
          ...measurement
        };
        m.ConceptNameCodeSequence = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(m.ConceptNameCodeSequence);
        return m;
      });
      if (measurements && measurements.length) {
        properties.measurements = measurements;
        console.log('[SR] retrieving measurements...', measurements);
      }
      if (evaluations && evaluations.length) {
        properties.evaluations = evaluations;
        console.log('[SR] retrieving evaluations...', evaluations);
      }
      const roi = new DICOMMicroscopyViewer.roi.ROI({
        scoord3d,
        properties
      });
      rois.push(roi);
      if (findingGroup) {
        labels.push(findingGroup.ConceptCodeSequence.CodeValue);
      } else {
        labels.push('');
      }
    });
  });
  return {
    rois,
    labels
  };
}
function _getMeasurementGroups(naturalizedDataset) {
  const {
    ContentSequence
  } = naturalizedDataset;
  const imagingMeasurementsContentItem = ContentSequence.find(ci => ci.ConceptNameCodeSequence.CodeValue === _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].IMAGING_MEASUREMENTS);
  const measurementGroupContentItems = (0,_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(imagingMeasurementsContentItem.ContentSequence).filter(ci => ci.ConceptNameCodeSequence.CodeValue === _dcmCodeValues__WEBPACK_IMPORTED_MODULE_1__["default"].MEASUREMENT_GROUP);
  return measurementGroupContentItems;
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/saveByteArray.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/saveByteArray.ts ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   saveByteArray: () => (/* binding */ saveByteArray)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Trigger file download from an array buffer
 * @param buffer
 * @param filename
 */
function saveByteArray(buffer, filename) {
  const blob = new Blob([buffer], {
    type: 'application/dicom'
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/styles.js":
/*!****************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/styles.js ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultFill = {
  color: 'rgba(255,255,255,0.4)'
};
const emptyFill = {
  color: 'rgba(255,255,255,0.0)'
};
const defaultStroke = {
  color: 'rgb(0,255,0)',
  width: 1.5
};
const activeStroke = {
  color: 'rgb(255,255,0)',
  width: 1.5
};
const defaultStyle = {
  image: {
    circle: {
      fill: defaultFill,
      stroke: activeStroke,
      radius: 5
    }
  },
  fill: defaultFill,
  stroke: activeStroke
};
const emptyStyle = {
  image: {
    circle: {
      fill: emptyFill,
      stroke: defaultStroke,
      radius: 5
    }
  },
  fill: emptyFill,
  stroke: defaultStroke
};
const styles = {
  active: defaultStyle,
  default: emptyStyle
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styles);

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/src/utils/toArray.js":
/*!*****************************************************************!*\
  !*** ../../../extensions/dicom-microscopy/src/utils/toArray.js ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toArray)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function toArray(item) {
  return Array.isArray(item) ? item : [item];
}

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (true) {
			errorOverlay = false;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ }),

/***/ "../../../extensions/dicom-microscopy/package.json":
/*!*********************************************************!*\
  !*** ../../../extensions/dicom-microscopy/package.json ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-dicom-microscopy","version":"3.11.0-beta.51","description":"OHIF extension for DICOM microscopy","author":"Bill Wallace, md-prog","license":"MIT","main":"dist/ohif-extension-dicom-microscopy.umd.js","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-pdf":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.11.0-beta.51","@ohif/extension-default":"3.11.0-beta.51","@ohif/i18n":"3.11.0-beta.51","@ohif/ui":"3.11.0-beta.51","prop-types":"^15.6.2","react":"^18.3.1","react-dom":"^18.3.1","react-i18next":"^10.11.0","react-router":"^6.23.1","react-router-dom":"^6.23.1"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/codec-charls":"^1.2.3","@cornerstonejs/codec-libjpeg-turbo-8bit":"^1.2.2","@cornerstonejs/codec-openjpeg":"^1.2.4","colormap":"^2.3","lodash.debounce":"^4.0.8","mathjs":"^12.4.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_dicom-microscopy_src_index_tsx.js.map