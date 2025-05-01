"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["extensions_cornerstone-dynamic-volume_src_index_ts"],{

/***/ "../../../extensions/cornerstone-dynamic-volume/src/actions/index.ts":
/*!***************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/actions/index.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateSegmentationsChartDisplaySet: () => (/* reexport safe */ _updateSegmentationsChartDisplaySet__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _updateSegmentationsChartDisplaySet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateSegmentationsChartDisplaySet */ "../../../extensions/cornerstone-dynamic-volume/src/actions/updateSegmentationsChartDisplaySet.ts");
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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/actions/updateSegmentationsChartDisplaySet.ts":
/*!********************************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/actions/updateSegmentationsChartDisplaySet.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateSegmentationsChartDisplaySet)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const CHART_MODALITY = 'CHT';
const SEG_CHART_INSTANCE_UID = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid();

// Private SOPClassUid for chart data
const ChartDataSOPClassUid = '1.9.451.13215.7.3.2.7.6.1';
const {
  utilities: csToolsUtils
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__;
function _getDateTimeStr() {
  const now = new Date();
  const date = now.getFullYear() + ('0' + now.getUTCMonth()).slice(-2) + ('0' + now.getUTCDate()).slice(-2);
  const time = ('0' + now.getUTCHours()).slice(-2) + ('0' + now.getUTCMinutes()).slice(-2) + ('0' + now.getUTCSeconds()).slice(-2);
  return {
    date,
    time
  };
}
function _getTimePointsDataByTagName(volume, timePointsTag) {
  const uniqueTimePoints = volume.imageIds.reduce((timePoints, imageId) => {
    const instance = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getInstanceByImageId(imageId);
    const timePointValue = instance[timePointsTag];
    if (timePointValue !== undefined) {
      timePoints.add(timePointValue);
    }
    return timePoints;
  }, new Set());
  return Array.from(uniqueTimePoints).sort((a, b) => a - b);
}
function _convertTimePointsUnit(timePoints, timePointsUnit) {
  const validUnits = ['ms', 's', 'm', 'h'];
  const divisors = [1000, 60, 60];
  const currentUnitIndex = validUnits.indexOf(timePointsUnit);
  let divisor = 1;
  if (currentUnitIndex !== -1) {
    for (let i = currentUnitIndex; i < validUnits.length - 1; i++) {
      const newDivisor = divisor * divisors[i];
      const greaterThanDivisorCount = timePoints.filter(timePoint => timePoint > newDivisor).length;

      // Change the scale only if more than 50% of the time points are
      // greater than the new divisor.
      if (greaterThanDivisorCount <= timePoints.length / 2) {
        break;
      }
      divisor = newDivisor;
      timePointsUnit = validUnits[i + 1];
    }
    if (divisor > 1) {
      timePoints = timePoints.map(timePoint => timePoint / divisor);
    }
  }
  return {
    timePoints,
    timePointsUnit
  };
}

// It currently supports only one tag but a few other will be added soon
// Supported 4D Tags
//   (0018,1060) Trigger Time                   [NOK]
//   (0018,0081) Echo Time                      [NOK]
//   (0018,0086) Echo Number                    [NOK]
//   (0020,0100) Temporal Position Identifier   [NOK]
//   (0054,1300) FrameReferenceTime             [OK]
function _getTimePointsData(volume) {
  const timePointsTags = {
    FrameReferenceTime: {
      unit: 'ms'
    }
  };
  const timePointsTagNames = Object.keys(timePointsTags);
  let timePoints;
  let timePointsUnit;
  for (let i = 0; i < timePointsTagNames.length; i++) {
    const tagName = timePointsTagNames[i];
    const curTimePoints = _getTimePointsDataByTagName(volume, tagName);
    if (curTimePoints.length) {
      timePoints = curTimePoints;
      timePointsUnit = timePointsTags[tagName].unit;
      break;
    }
  }
  if (!timePoints.length) {
    const concatTagNames = timePointsTagNames.join(', ');
    throw new Error(`Could not extract time points data for the following tags: ${concatTagNames}`);
  }
  const convertedTimePoints = _convertTimePointsUnit(timePoints, timePointsUnit);
  timePoints = convertedTimePoints.timePoints;
  timePointsUnit = convertedTimePoints.timePointsUnit;
  return {
    timePoints,
    timePointsUnit
  };
}
function _getSegmentationData(segmentation, volumesTimePointsCache, {
  servicesManager
}) {
  const {
    displaySetService,
    segmentationService,
    viewportGridService
  } = servicesManager.services;
  const displaySets = displaySetService.getActiveDisplaySets();
  const dynamic4DDisplaySet = displaySets.find(displaySet => {
    const anInstance = displaySet.instances?.[0];
    if (anInstance) {
      return anInstance.FrameReferenceTime !== undefined || anInstance.NumberOfTimeSlices !== undefined;
    }
    return false;
  });

  // const referencedDynamicVolume = cs.cache.getVolume(dynamic4DDisplaySet.displaySetInstanceUID);
  let volumeCacheKey;
  const volumeId = dynamic4DDisplaySet.displaySetInstanceUID;
  for (const [key] of _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache._volumeCache) {
    if (key.includes(volumeId)) {
      volumeCacheKey = key;
      break;
    }
  }
  let referencedDynamicVolume;
  if (volumeCacheKey) {
    referencedDynamicVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.cache.getVolume(volumeCacheKey);
  }
  const {
    StudyInstanceUID,
    StudyDescription
  } = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getInstanceByImageId(referencedDynamicVolume.imageIds[0]);
  const segmentationVolume = segmentationService.getLabelmapVolume(segmentation.segmentationId);
  const maskVolumeId = segmentationVolume?.volumeId;
  const [timeData, _] = csToolsUtils.dynamicVolume.getDataInTime(referencedDynamicVolume, {
    maskVolumeId
  });
  const pixelCount = timeData.length;
  if (pixelCount === 0) {
    return [];
  }

  // Todo: this is useless we should be able to grab color with just segRepUID and segmentIndex
  // const color = csTools.segmentation.config.color.getSegmentIndexColor(
  //   segmentationRepresentationUID,
  //   1 // segmentIndex
  // );
  const viewportId = viewportGridService.getActiveViewportId();
  const color = segmentationService.getSegmentColor(viewportId, segmentation.segmentationId, 1);
  const hexColor = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_1__.utilities.color.rgbToHex(color[0], color[1], color[2]);
  let timePointsData = volumesTimePointsCache.get(referencedDynamicVolume);
  if (!timePointsData) {
    timePointsData = _getTimePointsData(referencedDynamicVolume);
    volumesTimePointsCache.set(referencedDynamicVolume, timePointsData);
  }
  const {
    timePoints,
    timePointsUnit
  } = timePointsData;
  if (timePoints.length !== timeData[0].length) {
    throw new Error('Invalid number of time points returned');
  }
  const timepointsCount = timePoints.length;
  const chartSeriesData = new Array(timepointsCount);
  for (let i = 0; i < timepointsCount; i++) {
    const average = timeData.reduce((acc, cur) => acc + cur[i] / pixelCount, 0);
    chartSeriesData[i] = [timePoints[i], average];
  }
  return {
    StudyInstanceUID,
    StudyDescription,
    chartData: {
      series: {
        label: segmentation.label,
        points: chartSeriesData,
        color: hexColor
      },
      axis: {
        x: {
          label: `Time (${timePointsUnit})`
        },
        y: {
          label: `Vl (Bq/ml)`
        }
      }
    }
  };
}
function _getInstanceFromSegmentations(segmentations, {
  servicesManager
}) {
  if (!segmentations.length) {
    return;
  }
  const volumesTimePointsCache = new WeakMap();
  const segmentationsData = segmentations.map(segmentation => _getSegmentationData(segmentation, volumesTimePointsCache, {
    servicesManager
  }));
  const {
    date: seriesDate,
    time: seriesTime
  } = _getDateTimeStr();
  const series = segmentationsData.reduce((allSeries, curSegData) => {
    return [...allSeries, curSegData.chartData.series];
  }, []);
  const instance = {
    SOPClassUID: ChartDataSOPClassUid,
    Modality: CHART_MODALITY,
    SOPInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid(),
    SeriesDate: seriesDate,
    SeriesTime: seriesTime,
    SeriesInstanceUID: SEG_CHART_INSTANCE_UID,
    StudyInstanceUID: segmentationsData[0].StudyInstanceUID,
    StudyDescription: segmentationsData[0].StudyDescription,
    SeriesNumber: 100,
    SeriesDescription: 'Segmentation chart series data',
    chartData: {
      series,
      axis: {
        ...segmentationsData[0].chartData.axis
      }
    }
  };
  const seriesMetadata = {
    StudyInstanceUID: instance.StudyInstanceUID,
    StudyDescription: instance.StudyDescription,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    SeriesDescription: instance.SeriesDescription,
    SeriesNumber: instance.SeriesNumber,
    SeriesTime: instance.SeriesTime,
    SOPClassUID: instance.SOPClassUID,
    Modality: instance.Modality
  };
  return {
    seriesMetadata,
    instance
  };
}
function updateSegmentationsChartDisplaySet({
  servicesManager
}) {
  debugger;
  const {
    segmentationService
  } = servicesManager.services;
  const segmentations = segmentationService.getSegmentations();
  const {
    seriesMetadata,
    instance
  } = _getInstanceFromSegmentations(segmentations, {
    servicesManager
  }) ?? {};
  if (seriesMetadata && instance) {
    // An event is triggered after adding the instance and the displaySet is created
    _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addSeriesMetadata([seriesMetadata], true);
    _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addInstances([instance], true);
  }
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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/commandsModule.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/commandsModule.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions */ "../../../extensions/cornerstone-dynamic-volume/src/actions/index.ts");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const LABELMAP = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.Enums.SegmentationRepresentations.Labelmap;
const commandsModule = ({
  commandsManager,
  servicesManager
}) => {
  const services = servicesManager.services;
  const {
    displaySetService,
    viewportGridService,
    segmentationService
  } = services;
  const actions = {
    ..._actions__WEBPACK_IMPORTED_MODULE_0__,
    getDynamic4DDisplaySet: () => {
      const displaySets = displaySetService.getActiveDisplaySets();
      const dynamic4DDisplaySet = displaySets.find(displaySet => {
        const anInstance = displaySet.instances?.[0];
        if (anInstance) {
          return anInstance.FrameReferenceTime !== undefined || anInstance.NumberOfTimeSlices !== undefined || anInstance.TemporalPositionIdentifier !== undefined;
        }
        return false;
      });
      return dynamic4DDisplaySet;
    },
    getComputedDisplaySets: () => {
      const displaySetCache = displaySetService.getDisplaySetCache();
      const cachedDisplaySets = [...displaySetCache.values()];
      const computedDisplaySets = cachedDisplaySets.filter(displaySet => {
        return displaySet.isDerived;
      });
      return computedDisplaySets;
    },
    exportTimeReportCSV: ({
      segmentations,
      config,
      options,
      summaryStats
    }) => {
      const dynamic4DDisplaySet = actions.getDynamic4DDisplaySet();
      const volumeId = dynamic4DDisplaySet?.displaySetInstanceUID;

      // cache._volumeCache is a map that has a key that includes the volumeId
      // it is not exactly the volumeId, but it is the key that includes the volumeId
      // so we can't do cache._volumeCache.get(volumeId) we should iterate
      // over the keys and find the one that includes the volumeId
      let volumeCacheKey;
      for (const [key] of _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache._volumeCache) {
        if (key.includes(volumeId)) {
          volumeCacheKey = key;
          break;
        }
      }
      let dynamicVolume;
      if (volumeCacheKey) {
        dynamicVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolume(volumeCacheKey);
      }
      const instance = dynamic4DDisplaySet.instances[0];
      const csv = [];

      // CSV header information with placeholder empty values for the metadata lines
      csv.push(`Patient ID,${instance.PatientID},`);
      csv.push(`Study Date,${instance.StudyDate},`);
      csv.push(`StudyInstanceUID,${instance.StudyInstanceUID},`);
      csv.push(`StudyDescription,${instance.StudyDescription},`);
      csv.push(`SeriesInstanceUID,${instance.SeriesInstanceUID},`);

      // empty line
      csv.push('');
      csv.push('');

      // Helper function to calculate standard deviation
      function calculateStandardDeviation(data) {
        const n = data.length;
        const mean = data.reduce((acc, value) => acc + value, 0) / n;
        const squaredDifferences = data.map(value => (value - mean) ** 2);
        const variance = squaredDifferences.reduce((acc, value) => acc + value, 0) / n;
        const stdDeviation = Math.sqrt(variance);
        return stdDeviation;
      }
      // Iterate through each segmentation to get the timeData and ijkCoords
      segmentations.forEach(segmentation => {
        const volume = segmentationService.getLabelmapVolume(segmentation.segmentationId);
        const [timeData, ijkCoords] = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.dynamicVolume.getDataInTime(dynamicVolume, {
          maskVolumeId: volume.volumeId
        });
        if (summaryStats) {
          // Adding column headers for pixel identifier and segmentation label ids
          let headers = 'Operation,Segmentation Label ID';
          const maxLength = dynamicVolume.numTimePoints;
          for (let t = 0; t < maxLength; t++) {
            headers += `,Time Point ${t}`;
          }
          csv.push(headers);
          // // perform summary statistics on the timeData including for each time point, mean, median, min, max, and standard deviation for
          // // all the voxels in the ROI
          const mean = [];
          const min = [];
          const minIJK = [];
          const max = [];
          const maxIJK = [];
          const std = [];
          const numVoxels = timeData.length;
          // Helper function to calculate standard deviation
          for (let timeIndex = 0; timeIndex < maxLength; timeIndex++) {
            // for each voxel in the ROI, get the value at the current time point
            const voxelValues = [];
            let sum = 0;
            let minValue = Infinity;
            let maxValue = -Infinity;
            let minIndex = 0;
            let maxIndex = 0;

            // Single pass through the data to collect all needed values
            for (let voxelIndex = 0; voxelIndex < numVoxels; voxelIndex++) {
              const value = timeData[voxelIndex][timeIndex];
              voxelValues.push(value);
              sum += value;
              if (value < minValue) {
                minValue = value;
                minIndex = voxelIndex;
              }
              if (value > maxValue) {
                maxValue = value;
                maxIndex = voxelIndex;
              }
            }
            mean.push(sum / numVoxels);
            min.push(minValue);
            minIJK.push(ijkCoords[minIndex]);
            max.push(maxValue);
            maxIJK.push(ijkCoords[maxIndex]);
            std.push(calculateStandardDeviation(voxelValues));
          }
          let row = `Mean,${segmentation.label}`;
          // Generate separate rows for each statistic
          for (let t = 0; t < maxLength; t++) {
            row += `,${mean[t]}`;
          }
          csv.push(row);
          row = `Standard Deviation,${segmentation.label}`;
          for (let t = 0; t < maxLength; t++) {
            row += `,${std[t]}`;
          }
          csv.push(row);
          row = `Min,${segmentation.label}`;
          for (let t = 0; t < maxLength; t++) {
            row += `,${min[t]}`;
          }
          csv.push(row);
          row = `Max,${segmentation.label}`;
          for (let t = 0; t < maxLength; t++) {
            row += `,${max[t]}`;
          }
          csv.push(row);
        } else {
          // Adding column headers for pixel identifier and segmentation label ids
          let headers = 'Pixel Identifier (IJK),Segmentation Label ID';
          const maxLength = dynamicVolume.numTimePoints;
          for (let t = 0; t < maxLength; t++) {
            headers += `,Time Point ${t}`;
          }
          csv.push(headers);
          // Assuming timeData and ijkCoords are of the same length
          for (let i = 0; i < timeData.length; i++) {
            // Generate the pixel identifier
            const pixelIdentifier = `${ijkCoords[i][0]}_${ijkCoords[i][1]}_${ijkCoords[i][2]}`;

            // Start a new row for the current pixel
            let row = `${pixelIdentifier},${segmentation.label}`;

            // Add time data points for this pixel
            for (let t = 0; t < timeData[i].length; t++) {
              row += `,${timeData[i][t]}`;
            }

            // Append the row to the CSV array
            csv.push(row);
          }
        }
      });

      // Convert to CSV string
      const csvContent = csv.join('\n');

      // Generate filename and trigger download
      const filename = `${instance.PatientID}.csv`;
      const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    swapDynamicWithComputedDisplaySet: ({
      displaySet
    }) => {
      const computedDisplaySet = displaySet;
      const displaySetCache = displaySetService.getDisplaySetCache();
      const cachedDisplaySetKeys = [displaySetCache.keys()];
      const {
        displaySetInstanceUID
      } = computedDisplaySet;
      // Check to see if computed display set is already in cache
      if (!cachedDisplaySetKeys.includes(displaySetInstanceUID)) {
        displaySetCache.set(displaySetInstanceUID, computedDisplaySet);
      }

      // Get all viewports and their corresponding indices
      const {
        viewports
      } = viewportGridService.getState();

      // get the viewports in the grid
      // iterate over them and find the ones that are showing a dynamic
      // volume (displaySet), and replace that exact displaySet with the
      // computed displaySet

      const dynamic4DDisplaySet = actions.getDynamic4DDisplaySet();
      const viewportsToUpdate = [];
      for (const [key, value] of viewports) {
        const viewport = value;
        const viewportOptions = viewport.viewportOptions;
        const {
          displaySetInstanceUIDs
        } = viewport;
        const displaySetInstanceUIDIndex = displaySetInstanceUIDs.indexOf(dynamic4DDisplaySet.displaySetInstanceUID);
        if (displaySetInstanceUIDIndex !== -1) {
          const newViewport = {
            viewportId: viewport.viewportId,
            // merge the other displaySetInstanceUIDs with the new one
            displaySetInstanceUIDs: [...displaySetInstanceUIDs.slice(0, displaySetInstanceUIDIndex), displaySetInstanceUID, ...displaySetInstanceUIDs.slice(displaySetInstanceUIDIndex + 1)],
            viewportOptions: {
              initialImageOptions: viewportOptions.initialImageOptions,
              viewportType: 'volume',
              orientation: viewportOptions.orientation,
              background: viewportOptions.background
            }
          };
          viewportsToUpdate.push(newViewport);
        }
      }
      viewportGridService.setDisplaySetsForViewports(viewportsToUpdate);
    },
    swapComputedWithDynamicDisplaySet: () => {
      // Todo: this assumes there is only one dynamic display set in the viewer
      const dynamicDisplaySet = actions.getDynamic4DDisplaySet();
      const displaySetCache = displaySetService.getDisplaySetCache();
      const cachedDisplaySetKeys = [...displaySetCache.keys()]; // Fix: Spread to get the array
      const {
        displaySetInstanceUID
      } = dynamicDisplaySet;

      // Check to see if dynamic display set is already in cache
      if (!cachedDisplaySetKeys.includes(displaySetInstanceUID)) {
        displaySetCache.set(displaySetInstanceUID, dynamicDisplaySet);
      }

      // Get all viewports and their corresponding indices
      const {
        viewports
      } = viewportGridService.getState();

      // Get the computed 4D display set
      const computed4DDisplaySet = actions.getComputedDisplaySets()[0];
      const viewportsToUpdate = [];
      for (const [key, value] of viewports) {
        const viewport = value;
        const viewportOptions = viewport.viewportOptions;
        const {
          displaySetInstanceUIDs
        } = viewport;
        const displaySetInstanceUIDIndex = displaySetInstanceUIDs.indexOf(computed4DDisplaySet.displaySetInstanceUID);
        if (displaySetInstanceUIDIndex !== -1) {
          const newViewport = {
            viewportId: viewport.viewportId,
            // merge the other displaySetInstanceUIDs with the new one
            displaySetInstanceUIDs: [...displaySetInstanceUIDs.slice(0, displaySetInstanceUIDIndex), displaySetInstanceUID, ...displaySetInstanceUIDs.slice(displaySetInstanceUIDIndex + 1)],
            viewportOptions: {
              initialImageOptions: viewportOptions.initialImageOptions,
              viewportType: 'volume',
              orientation: viewportOptions.orientation,
              background: viewportOptions.background
            }
          };
          viewportsToUpdate.push(newViewport);
        }
      }
      viewportGridService.setDisplaySetsForViewports(viewportsToUpdate);
    },
    createNewLabelMapForDynamicVolume: async ({
      label
    }) => {
      const {
        viewports,
        activeViewportId
      } = viewportGridService.getState();

      // get the dynamic 4D display set
      const dynamic4DDisplaySet = actions.getDynamic4DDisplaySet();
      const dynamic4DDisplaySetInstanceUID = dynamic4DDisplaySet.displaySetInstanceUID;

      // check if the dynamic 4D display set is in the display, if not we might have
      // the computed volumes and we should choose them for the segmentation
      // creation

      let referenceDisplaySet;
      const activeViewport = viewports.get(activeViewportId);
      const activeDisplaySetInstanceUIDs = activeViewport.displaySetInstanceUIDs;
      const dynamicIsInActiveViewport = activeDisplaySetInstanceUIDs.includes(dynamic4DDisplaySetInstanceUID);
      if (dynamicIsInActiveViewport) {
        referenceDisplaySet = dynamic4DDisplaySet;
      }
      if (!referenceDisplaySet) {
        // try to see if there is any derived displaySet in the active viewport
        // which is referencing the dynamic 4D display set

        // Todo: this is wrong but I don't have time to fix it now
        const cachedDisplaySets = displaySetService.getDisplaySetCache();
        for (const [key, displaySet] of cachedDisplaySets) {
          if (displaySet.referenceDisplaySetUID === dynamic4DDisplaySetInstanceUID) {
            referenceDisplaySet = displaySet;
            break;
          }
        }
      }
      if (!referenceDisplaySet) {
        throw new Error('No reference display set found based on the dynamic data');
      }
      const displaySet = displaySetService.getDisplaySetByUID(referenceDisplaySet.displaySetInstanceUID);
      const segmentationId = await segmentationService.createLabelmapForDisplaySet(displaySet, {
        label
      });
      const firstViewport = viewports.values().next().value;
      await segmentationService.addSegmentationRepresentation(firstViewport.viewportId, {
        segmentationId
      });
      return segmentationId;
    }
  };
  const definitions = {
    updateSegmentationsChartDisplaySet: {
      commandFn: actions.updateSegmentationsChartDisplaySet,
      storeContexts: [],
      options: {}
    },
    exportTimeReportCSV: {
      commandFn: actions.exportTimeReportCSV,
      storeContexts: [],
      options: {}
    },
    swapDynamicWithComputedDisplaySet: {
      commandFn: actions.swapDynamicWithComputedDisplaySet,
      storeContexts: [],
      options: {}
    },
    createNewLabelMapForDynamicVolume: {
      commandFn: actions.createNewLabelMapForDynamicVolume,
      storeContexts: [],
      options: {}
    },
    swapComputedWithDynamicDisplaySet: {
      commandFn: actions.swapComputedWithDynamicDisplaySet,
      storeContexts: [],
      options: {}
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'DYNAMIC-VOLUME:CORNERSTONE'
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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/getHangingProtocolModule.ts":
/*!**************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/getHangingProtocolModule.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const DEFAULT_COLORMAP = '2hot';
const toolGroupIds = {
  pt: 'dynamic4D-pt',
  fusion: 'dynamic4D-fusion',
  ct: 'dynamic4D-ct'
};
function getPTOptions({
  colormap,
  voiInverted
} = {}) {
  return {
    blendMode: 'MIP',
    colormap,
    voi: {
      windowWidth: 5,
      windowCenter: 2.5
    },
    voiInverted
  };
}
function getPTViewports() {
  const ptOptionsParams = {
    colormap: {
      name: DEFAULT_COLORMAP,
      opacity: [{
        value: 0,
        opacity: 0
      }, {
        value: 0.1,
        opacity: 1
      }, {
        value: 1,
        opacity: 1
      }]
    },
    voiInverted: false
  };
  return [{
    viewportOptions: {
      viewportId: 'ptAxial',
      viewportType: 'volume',
      orientation: 'axial',
      toolGroupId: toolGroupIds.pt,
      initialImageOptions: {
        preset: 'middle' // 'first', 'last', 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'axialSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ptWLSync',
        source: true,
        target: true
      }]
    },
    displaySets: [{
      id: 'ptDisplaySet',
      options: {
        ...getPTOptions(ptOptionsParams)
      }
    }]
  }, {
    viewportOptions: {
      viewportId: 'ptSagittal',
      viewportType: 'volume',
      orientation: 'sagittal',
      toolGroupId: toolGroupIds.pt,
      initialImageOptions: {
        preset: 'middle' // 'first', 'last', 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'sagittalSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ptWLSync',
        source: true,
        target: true
      }]
    },
    displaySets: [{
      id: 'ptDisplaySet',
      options: {
        ...getPTOptions(ptOptionsParams)
      }
    }]
  }, {
    viewportOptions: {
      viewportId: 'ptCoronal',
      viewportType: 'volume',
      orientation: 'coronal',
      toolGroupId: toolGroupIds.pt,
      initialImageOptions: {
        preset: 'middle' // 'first', 'last', 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'coronalSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ptWLSync',
        source: true,
        target: true
      }]
    },
    displaySets: [{
      id: 'ptDisplaySet',
      options: {
        ...getPTOptions(ptOptionsParams)
      }
    }]
  }];
}
function getFusionViewports() {
  const ptOptionsParams = {
    colormap: {
      name: DEFAULT_COLORMAP,
      opacity: [{
        value: 0,
        opacity: 0
      }, {
        value: 0.1,
        opacity: 0.8
      }, {
        value: 1,
        opacity: 0.8
      }]
    }
  };
  return [{
    viewportOptions: {
      viewportId: 'fusionAxial',
      viewportType: 'volume',
      orientation: 'axial',
      toolGroupId: toolGroupIds.fusion,
      initialImageOptions: {
        preset: 'middle' // 'first', 'last', 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'axialSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ctWLSync',
        source: false,
        target: true
      }, {
        type: 'voi',
        id: 'fusionWLSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: false,
        target: true,
        options: {
          syncInvertState: false
        }
      }, {
        type: 'hydrateseg',
        id: 'sameFORId',
        source: true,
        target: true,
        options: {
          matchingRules: ['sameFOR']
        }
      }]
    },
    displaySets: [{
      id: 'ctDisplaySet'
    }, {
      options: {
        ...getPTOptions(ptOptionsParams)
      },
      id: 'ptDisplaySet'
    }]
  }, {
    viewportOptions: {
      viewportId: 'fusionSagittal',
      viewportType: 'volume',
      orientation: 'sagittal',
      toolGroupId: toolGroupIds.fusion,
      initialImageOptions: {
        preset: 'middle' // 'first', 'last', 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'sagittalSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ctWLSync',
        source: false,
        target: true
      }, {
        type: 'voi',
        id: 'fusionWLSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: false,
        target: true,
        options: {
          syncInvertState: false
        }
      }, {
        type: 'hydrateseg',
        id: 'sameFORId',
        source: true,
        target: true,
        options: {
          matchingRules: ['sameFOR']
        }
      }]
    },
    displaySets: [{
      id: 'ctDisplaySet'
    }, {
      options: {
        ...getPTOptions(ptOptionsParams)
      },
      id: 'ptDisplaySet'
    }]
  }, {
    viewportOptions: {
      viewportId: 'fusionCoronal',
      viewportType: 'volume',
      orientation: 'coronal',
      toolGroupId: toolGroupIds.fusion,
      initialImageOptions: {
        preset: 'middle' // 'first', 'last', 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'coronalSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ctWLSync',
        source: false,
        target: true
      }, {
        type: 'voi',
        id: 'fusionWLSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ptFusionWLSync',
        source: false,
        target: true,
        options: {
          syncInvertState: false
        }
      }, {
        type: 'hydrateseg',
        id: 'sameFORId',
        source: true,
        target: true,
        options: {
          matchingRules: ['sameFOR']
        }
      }]
    },
    displaySets: [{
      id: 'ctDisplaySet'
    }, {
      options: {
        ...getPTOptions(ptOptionsParams)
      },
      id: 'ptDisplaySet'
    }]
  }];
}
function getSeriesChartViewport() {
  return {
    viewportOptions: {
      viewportId: 'seriesChart'
    },
    displaySets: [{
      id: 'chartDisplaySet',
      options: {
        // This dataset does not require the download of any instance since it is pre-computed locally,
        // but interleaveTopToBottom.ts was not loading any series because it consider that all viewports
        // are a Cornerstone viewport which is not true in this case and it waits for all viewports to
        // have called interleaveTopToBottom(...).
        skipLoading: true
      }
    }]
  };
}
function getCTViewports() {
  return [{
    viewportOptions: {
      viewportId: 'ctAxial',
      viewportType: 'volume',
      orientation: 'axial',
      toolGroupId: toolGroupIds.ct,
      initialImageOptions: {
        preset: 'middle' // 'first', 'last', 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'axialSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ctWLSync',
        source: true,
        target: true
      }]
    },
    displaySets: [{
      id: 'ctDisplaySet'
    }]
  }, {
    viewportOptions: {
      viewportId: 'ctSagittal',
      viewportType: 'volume',
      orientation: 'sagittal',
      toolGroupId: toolGroupIds.ct,
      initialImageOptions: {
        preset: 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'sagittalSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ctWLSync',
        source: true,
        target: true
      }]
    },
    displaySets: [{
      id: 'ctDisplaySet'
    }]
  }, {
    viewportOptions: {
      viewportId: 'ctCoronal',
      viewportType: 'volume',
      orientation: 'coronal',
      toolGroupId: toolGroupIds.ct,
      initialImageOptions: {
        preset: 'middle'
      },
      syncGroups: [{
        type: 'cameraPosition',
        id: 'coronalSync',
        source: true,
        target: true
      }, {
        type: 'voi',
        id: 'ctWLSync',
        source: true,
        target: true
      }]
    },
    displaySets: [{
      id: 'ctDisplaySet'
    }]
  }];
}
const defaultProtocol = {
  id: 'default4D',
  locked: true,
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  hasUpdatedPriorsInformation: false,
  name: 'Default',
  createdDate: '2023-01-01T00:00:00.000Z',
  modifiedDate: '2023-01-01T00:00:00.000Z',
  availableTo: {},
  editableBy: {},
  imageLoadStrategy: 'default',
  // "default" , "interleaveTopToBottom",  "interleaveCenter"
  protocolMatchingRules: [{
    attribute: 'ModalitiesInStudy',
    constraint: {
      contains: ['CT', 'PT']
    }
  }],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: -1,
  displaySetSelectors: {
    defaultDisplaySetId: {
      // Unused currently
      imageMatchingRules: [],
      // Matches displaysets, NOT series
      seriesMatchingRules: [
      // Try to match series with images by default, to prevent weird display
      // on SEG/SR containing studies
      {
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      }]
      // Can be used to select matching studies
      // studyMatchingRules: [],
    },
    ctDisplaySet: {
      // Unused currently
      imageMatchingRules: [],
      // Matches displaysets, NOT series
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
      }]
      // Can be used to select matching studies
      // studyMatchingRules: [],
    },
    ptDisplaySet: {
      // Unused currently
      imageMatchingRules: [],
      // Matches displaysets, NOT series
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
      }

      // Should we check if CorrectedImage contains ATTN?
      // (0028,0051) (CorrectedImage): NORM\DTIM\ATTN\SCAT\RADL\DECY
      ]
      // Can be used to select matching studies
      // studyMatchingRules: [],
    },
    chartDisplaySet: {
      // Unused currently
      imageMatchingRules: [],
      // Matches displaysets, NOT series
      seriesMatchingRules: [{
        attribute: 'Modality',
        constraint: {
          equals: {
            value: 'CHT'
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'dataPreparation',
    name: 'Data Preparation',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3
      }
    },
    viewports: [...getPTViewports()],
    createdDate: '2023-01-01T00:00:00.000Z'
  }, {
    id: 'registration',
    name: 'Registration',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 3,
        columns: 3
      }
    },
    viewports: [...getFusionViewports(), ...getCTViewports(), ...getPTViewports()],
    createdDate: '2023-01-01T00:00:00.000Z'
  }, {
    id: 'roiQuantification',
    name: 'ROI Quantification',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3
      }
    },
    viewports: [...getFusionViewports()],
    createdDate: '2023-01-01T00:00:00.000Z'
  }, {
    id: 'kineticAnalysis',
    name: 'Kinetic Analysis',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 3,
        layoutOptions: [{
          x: 0,
          y: 0,
          width: 1 / 3,
          height: 1 / 2
        }, {
          x: 1 / 3,
          y: 0,
          width: 1 / 3,
          height: 1 / 2
        }, {
          x: 2 / 3,
          y: 0,
          width: 1 / 3,
          height: 1 / 2
        }, {
          x: 0,
          y: 1 / 2,
          width: 1,
          height: 1 / 2
        }]
      }
    },
    viewports: [...getFusionViewports(), getSeriesChartViewport()],
    createdDate: '2023-01-01T00:00:00.000Z'
  }]
};

/**
 * HangingProtocolModule should provide a list of hanging protocols that will be
 * available in OHIF for Modes to use to decide on the structure of the viewports
 * and also the series that hung in the viewports. Each hanging protocol is defined by
 * { name, protocols}. Examples include the default hanging protocol provided by
 * the default extension that shows 2x2 viewports.
 */

function getHangingProtocolModule() {
  return [{
    name: defaultProtocol.id,
    protocol: defaultProtocol
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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/getPanelModule.tsx":
/*!*****************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/getPanelModule.tsx ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panels */ "../../../extensions/cornerstone-dynamic-volume/src/panels/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* harmony import */ var _panels_DynamicExport__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./panels/DynamicExport */ "../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicExport.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager,
  configuration
}) {
  const wrappedDynamicDataPanel = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_panels__WEBPACK_IMPORTED_MODULE_1__.DynamicDataPanel, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager
    });
  };
  const wrappedDynamicSegmentation = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Toolbox, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      buttonSectionId: "dynamic-toolbox",
      title: "Threshold Tools"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_3__.PanelSegmentation, {
      servicesManager: servicesManager,
      commandsManager: commandsManager,
      extensionManager: extensionManager,
      configuration: configuration
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_panels_DynamicExport__WEBPACK_IMPORTED_MODULE_4__["default"], {
      servicesManager: servicesManager,
      commandsManager: commandsManager
    })));
  };
  return [{
    name: 'dynamic-volume',
    iconName: 'tab-4d',
    iconLabel: '4D Workflow',
    label: '4D Workflow',
    component: wrappedDynamicDataPanel
  }, {
    name: 'dynamic-segmentation',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation',
    component: wrappedDynamicSegmentation
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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/id.js":
/*!****************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/id.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SOPClassHandlerName: () => (/* binding */ SOPClassHandlerName),
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/cornerstone-dynamic-volume/package.json");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const id = _package_json__WEBPACK_IMPORTED_MODULE_0__.name;
const SOPClassHandlerName = 'dynamic-volume';


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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/index.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/index.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dynamicVolumeExtension)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../extensions/cornerstone-dynamic-volume/src/id.js");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/cornerstone-dynamic-volume/src/commandsModule.ts");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/cornerstone-dynamic-volume/src/getPanelModule.tsx");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/cornerstone-dynamic-volume/src/getHangingProtocolModule.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







/**
 * You can remove any of the following modules if you don't need them.
 */
const dynamicVolumeExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   * You ID can be anything you want, but it should be unique.
   */
  id: _id__WEBPACK_IMPORTED_MODULE_0__.id,
  /**
   * Perform any pre-registration tasks here. This is called before the extension
   * is registered. Usually we run tasks such as: configuring the libraries
   * (e.g. cornerstone, cornerstoneTools, ...) or registering any services that
   * this extension is providing.
   */
  preRegistration: ({
    servicesManager,
    commandsManager,
    configuration = {}
  }) => {
    // TODO: look for the right fix
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.cache.setMaxCacheSize(5 * 1024 * 1024 * 1024);
  },
  /**
   * PanelModule should provide a list of panels that will be available in OHIF
   * for Modes to consume and render. Each panel is defined by a {name,
   * iconName, iconLabel, label, component} object. Example of a panel module
   * is the StudyBrowserPanel that is provided by the default extension in OHIF.
   */
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * ViewportModule should provide a list of viewports that will be available in OHIF
   * for Modes to consume and use in the viewports. Each viewport is defined by
   * {name, component} object. Example of a viewport module is the CornerstoneViewport
   * that is provided by the Cornerstone extension in OHIF.
   */
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_3__["default"],
  /**
   * CommandsModule should provide a list of commands that will be available in OHIF
   * for Modes to consume and use in the viewports. Each command is defined by
   * an object of { actions, definitions, defaultContext } where actions is an
   * object of functions, definitions is an object of available commands, their
   * options, and defaultContext is the default context for the command to run against.
   */
  getCommandsModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {
    return (0,_commandsModule__WEBPACK_IMPORTED_MODULE_1__["default"])({
      servicesManager,
      commandsManager,
      extensionManager
    });
  }
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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicDataPanel.tsx":
/*!**************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicDataPanel.tsx ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PanelGenerateImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelGenerateImage */ "../../../extensions/cornerstone-dynamic-volume/src/panels/PanelGenerateImage.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function DynamicDataPanel({
  servicesManager,
  commandsManager,
  tab
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col text-white",
    "data-cy": 'dynamic-volume-panel'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PanelGenerateImage__WEBPACK_IMPORTED_MODULE_1__["default"], {
    commandsManager: commandsManager,
    servicesManager: servicesManager
  })));
}
_c2 = DynamicDataPanel;
_c = DynamicDataPanel;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicDataPanel);
var _c;
__webpack_require__.$Refresh$.register(_c, "DynamicDataPanel");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "DynamicDataPanel");

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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicExport.tsx":
/*!***********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicExport.tsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/extension-cornerstone */ "../../../extensions/cornerstone/src/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



function DynamicExport({
  commandsManager,
  servicesManager
}) {
  _s2();
  _s();
  const segmentations = (0,_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__.useSegmentations)({
    servicesManager
  });
  if (!segmentations?.length) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex h-8 w-full items-center rounded pr-0.5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    size: "sm",
    variant: "ghost",
    className: "pl-1.5",
    onClick: () => {
      commandsManager.runCommand('exportTimeReportCSV', {
        segmentations,
        options: {
          filename: 'TimeData.csv'
        }
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.Export, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "pl-1"
  }, "Time Data"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex h-8 w-full items-center rounded pr-0.5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    size: "sm",
    variant: "ghost",
    className: "pl-1.5",
    onClick: () => {
      commandsManager.runCommand('exportTimeReportCSV', {
        segmentations,
        summaryStats: true,
        options: {
          filename: 'ROIStats.csv'
        }
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.Export, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "pl-1"
  }, "ROI Stats"))));
}
_s2(DynamicExport, "sHxp9xRb7yqlEMO5fbDvxCZevB8=", false, function () {
  return [_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__.useSegmentations];
});
_c2 = DynamicExport;
_s(DynamicExport, "sHxp9xRb7yqlEMO5fbDvxCZevB8=", false, function () {
  return [_ohif_extension_cornerstone__WEBPACK_IMPORTED_MODULE_2__.useSegmentations];
});
_c = DynamicExport;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicExport);
var _c;
__webpack_require__.$Refresh$.register(_c, "DynamicExport");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "DynamicExport");

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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicVolumeControls.tsx":
/*!*******************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicVolumeControls.tsx ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
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




const controlClassNames = {
  sizeClassName: 'w-[58px] h-[28px]',
  arrowsDirection: 'horizontal',
  labelPosition: 'bottom'
};
const Header = ({
  title,
  tooltip
}) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "flex items-center space-x-1"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
  content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-white"
  }, tooltip),
  position: "bottom-left",
  tight: true,
  tooltipBoxClassName: "max-w-xs p-2"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Icon, {
  name: "info-link",
  className: "text-primary-active h-[14px] w-[14px]"
})), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "text-aqua-pale text-[11px] uppercase"
}, title));
_c4 = Header;
_c = Header;
const DynamicVolumeControls = ({
  isPlaying,
  onPlayPauseChange,
  // fps
  fps,
  onFpsChange,
  minFps,
  maxFps,
  // Frames
  currentFrameIndex,
  onFrameChange,
  framesLength,
  onGenerate,
  onDoubleRangeChange,
  onDynamicClick
}) => {
  _s2();
  _s();
  const [computedView, setComputedView] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [computeViewMode, setComputeViewMode] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.DynamicOperatorType.SUM);
  const [sliderRangeValues, setSliderRangeValues] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([0, framesLength - 1]);
  const handleSliderChange = newValues => {
    onDoubleRangeChange(newValues);
    setSliderRangeValues(newValues);
  };
  const formatLabel = value => Math.round(value);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex select-none flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.PanelSection, {
    title: "Controls",
    childrenClassName: "space-y-4 pb-5 px-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Header, {
    title: "View",
    tooltip: 'Select the view mode, 4D to view the dynamic volume or Computed to view the computed volume'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: "mt-2 w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "w-1/2",
    onClick: () => {
      setComputedView(false);
      onDynamicClick?.();
    }
  }, "4D"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "w-1/2",
    onClick: () => {
      setComputedView(true);
    }
  }, "Computed"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FrameControls, {
    onPlayPauseChange: onPlayPauseChange,
    isPlaying: isPlaying,
    computedView: computedView
    // fps
    ,

    fps: fps,
    onFpsChange: onFpsChange,
    minFps: minFps,
    maxFps: maxFps
    //
    ,

    framesLength: framesLength,
    onFrameChange: onFrameChange,
    currentFrameIndex: currentFrameIndex
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `mt-6 flex flex-col ${computedView ? '' : 'ohif-disabled'}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Header, {
    title: "Computed Operation",
    tooltip: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Operation Buttons (SUM, AVERAGE, SUBTRACT): Select the mathematical operation to be applied to the data set.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), " Range Slider: Choose the numeric range within which the operation will be performed.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), "Generate Button: Execute the chosen operation on the specified range of data.", ' ')
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    className: `mt-2 w-full`,
    separated: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "w-1/2",
    onClick: () => setComputeViewMode(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.DynamicOperatorType.SUM)
  }, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.DynamicOperatorType.SUM.toString().toUpperCase()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "w-1/2",
    onClick: () => setComputeViewMode(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.DynamicOperatorType.AVERAGE)
  }, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.DynamicOperatorType.AVERAGE.toString().toUpperCase()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "w-1/2",
    onClick: () => setComputeViewMode(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.DynamicOperatorType.SUBTRACT)
  }, _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.DynamicOperatorType.SUBTRACT.toString().toUpperCase())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-2 w-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.DoubleSlider, {
    min: 0,
    max: framesLength - 1,
    step: 1,
    defaultValue: sliderRangeValues,
    onValueChange: handleSliderChange,
    formatLabel: formatLabel,
    className: "w-full"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "mt-2 !h-[26px] !w-[115px] self-start !p-0",
    onClick: () => {
      onGenerate(computeViewMode);
    }
  }, "Generate"))));
};
_s2(DynamicVolumeControls, "Ps9BVBjVhDGFXofScTqVm+Pk6fk=");
_c5 = DynamicVolumeControls;
_s(DynamicVolumeControls, "Ps9BVBjVhDGFXofScTqVm+Pk6fk=");
_c2 = DynamicVolumeControls;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DynamicVolumeControls);
function FrameControls({
  isPlaying,
  onPlayPauseChange,
  fps,
  minFps,
  maxFps,
  onFpsChange,
  framesLength,
  onFrameChange,
  currentFrameIndex,
  computedView
}) {
  const getPlayPauseIconName = () => isPlaying ? 'icon-pause' : 'icon-play';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: computedView && 'ohif-disabled'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Header, {
    title: "4D Controls",
    tooltip: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Play/Pause Button: Begin or pause the animation of the 4D visualization. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), " Frame Selector: Navigate through individual frames of the 4D data. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), " FPS (Frames Per Second) Selector: Adjust the playback speed of the animation.")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mt-3 flex justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.IconButton, {
    className: "bg-customblue-30 h-[26px] w-[58px] rounded-[4px]",
    onClick: () => onPlayPauseChange(!isPlaying)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Icon, {
    name: getPlayPauseIconName(),
    className: "active:text-primary-light hover:bg-customblue-300 h-[24px] w-[24px] cursor-pointer text-white"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.InputNumber, _extends({
    value: currentFrameIndex,
    onChange: onFrameChange,
    minValue: 0,
    maxValue: framesLength - 1,
    label: "Frame"
  }, controlClassNames)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.InputNumber, _extends({
    value: fps,
    onChange: onFpsChange,
    minValue: minFps,
    maxValue: maxFps
  }, controlClassNames, {
    label: "FPS"
  }))));
}
_c6 = FrameControls;
_c3 = FrameControls;
var _c, _c2, _c3;
__webpack_require__.$Refresh$.register(_c, "Header");
__webpack_require__.$Refresh$.register(_c2, "DynamicVolumeControls");
__webpack_require__.$Refresh$.register(_c3, "FrameControls");
var _c4, _c5, _c6;
__webpack_require__.$Refresh$.register(_c4, "Header");
__webpack_require__.$Refresh$.register(_c5, "DynamicVolumeControls");
__webpack_require__.$Refresh$.register(_c6, "FrameControls");

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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/panels/PanelGenerateImage.tsx":
/*!****************************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/panels/PanelGenerateImage.tsx ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PanelGenerateImage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _DynamicVolumeControls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DynamicVolumeControls */ "../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicVolumeControls.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();





const SOPClassHandlerId = '@ohif/extension-default.sopClassHandlerModule.stack';
function PanelGenerateImage({
  servicesManager,
  commandsManager
}) {
  _s2();
  _s();
  const {
    cornerstoneViewportService,
    viewportGridService,
    displaySetService
  } = servicesManager.services;
  const [{
    isCineEnabled
  }, cineService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useCine)();
  const [{
    activeViewportId
  }] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid)();

  //
  const [timePointsRange, setTimePointsRange] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([0, 0]);
  const [timePointsRangeToUseForGenerate, setTimePointsRangeToUseForGenerate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([0, 0]);
  const [computedDisplaySet, setComputedDisplaySet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [dynamicVolume, setDynamicVolume] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [frameRate, setFrameRate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(20);
  const [isPlaying, setIsPlaying] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(isCineEnabled);
  const [timePointRendered, setTimePointRendered] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [displayingComputed, setDisplayingComputed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  //
  const uuidComputedVolume = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.uuidv4());
  const uuidDynamicVolume = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const computedVolumeId = `cornerstoneStreamingImageVolume:${uuidComputedVolume.current}`;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const viewportDataChangedEvt = cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED;
    const cineStateChangedEvt = servicesManager.services.cineService.EVENTS.CINE_STATE_CHANGED;
    const viewportDataChangedCallback = evtDetails => {
      evtDetails.viewportData.data.forEach(volumeData => {
        if (volumeData.volume?.isDynamicVolume()) {
          setDynamicVolume(volumeData.volume);
          uuidDynamicVolume.current = volumeData.displaySetInstanceUID;
          const newRange = [1, volumeData.volume.numTimePoints];
          setTimePointsRange(newRange);
          setTimePointsRangeToUseForGenerate(newRange);
        }
      });
    };
    const cineStateChangedCallback = evt => {
      setIsPlaying(evt.isPlaying);
    };
    const {
      unsubscribe: unsubscribeViewportData
    } = cornerstoneViewportService.subscribe(viewportDataChangedEvt, viewportDataChangedCallback);
    const {
      unsubscribe: unsubscribeCineState
    } = servicesManager.services.cineService.subscribe(cineStateChangedEvt, cineStateChangedCallback);
    return () => {
      unsubscribeViewportData();
      unsubscribeCineState();
    };
  }, [cornerstoneViewportService, cineService, servicesManager.services.cineService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const evt = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.DYNAMIC_VOLUME_TIME_POINT_INDEX_CHANGED;
    const callback = evt => {
      setTimePointRendered(evt.detail.timePointIndex);
    };
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(evt, callback);
    return () => {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.removeEventListener(evt, callback);
    };
  }, [cornerstoneViewportService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const displaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(activeViewportId);
    if (!displaySetUIDs?.length) {
      return;
    }
    const displaySets = displaySetUIDs.map(displaySetService.getDisplaySetByUID);
    const dynamicVolumeDisplaySet = displaySets.find(displaySet => displaySet.isDynamicVolume);
    if (!dynamicVolumeDisplaySet) {
      return;
    }
    const dynamicVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolumes().find(volume => volume.volumeId.includes(dynamicVolumeDisplaySet.displaySetInstanceUID));
    if (!dynamicVolume) {
      return;
    }
    setDynamicVolume(dynamicVolume);
    uuidDynamicVolume.current = dynamicVolumeDisplaySet.displaySetInstanceUID;
    const newRange = [1, dynamicVolume.numTimePoints];
    setTimePointsRange(newRange);
    setTimePointsRangeToUseForGenerate(newRange);
  }, [activeViewportId, viewportGridService, displaySetService, cornerstoneViewportService, cineService]);
  function renderGeneratedImage(displaySet) {
    commandsManager.runCommand('swapDynamicWithComputedDisplaySet', {
      displaySet
    });
    setDisplayingComputed(true);
  }
  function renderDynamicImage(displaySet) {
    commandsManager.runCommand('swapComputedWithDynamicDisplaySet');
  }

  // Get computed volume from cache, calculate the data across the time frames,
  // set the scalar data to the computedVolume, and create displaySet
  async function onGenerateImage(operationName) {
    const dynamicVolumeId = dynamicVolume.volumeId;
    if (!dynamicVolumeId) {
      return;
    }
    let computedVolume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolume(computedVolumeId);
    if (!computedVolume) {
      computedVolume = await _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.volumeLoader.createAndCacheDerivedVolume(dynamicVolumeId, {
        volumeId: computedVolumeId
      });
    }
    const [start, end] = timePointsRangeToUseForGenerate;
    const frameNumbers = Array.from({
      length: end - start + 1
    }, (_, i) => i + start - 1);
    const options = {
      frameNumbers: operationName === 'SUBTRACT' ? [start, end - 1] : frameNumbers,
      targetVolume: computedVolume
    };
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.dynamicVolume.updateVolumeFromTimeData(dynamicVolume, operationName, options);

    // If computed display set does not exist, create an object to be used as
    // the displaySet. If it does exist, update the image data and vtkTexture
    if (!computedDisplaySet) {
      const displaySet = {
        volumeLoaderSchema: computedVolume.volumeId.split(':')[0],
        displaySetInstanceUID: uuidComputedVolume.current,
        SOPClassHandlerId: SOPClassHandlerId,
        Modality: dynamicVolume.metadata.Modality,
        isMultiFrame: false,
        numImageFrames: 1,
        uid: uuidComputedVolume.current,
        referenceDisplaySetUID: dynamicVolume.volumeId.split(':')[1],
        madeInClient: true,
        FrameOfReferenceUID: dynamicVolume.metadata.FrameOfReferenceUID,
        isDerived: true,
        imageIds: computedVolume.imageIds
      };
      setComputedDisplaySet(displaySet);
      renderGeneratedImage(displaySet);
    } else {
      commandsManager.runCommand('updateVolumeData', {
        volume: computedVolume
      });
      cornerstoneViewportService.getRenderingEngine().render();
      renderGeneratedImage(computedDisplaySet);
    }
  }
  const onPlayPauseChange = isPlaying => {
    isPlaying ? handlePlay() : handleStop();
  };
  const handlePlay = () => {
    setIsPlaying(true);
    const viewportInfo = cornerstoneViewportService.getViewportInfo(activeViewportId);
    if (!viewportInfo) {
      return;
    }
    const {
      element
    } = viewportInfo;
    cineService.playClip(element, {
      framesPerSecond: frameRate,
      viewportId: activeViewportId
    });
  };
  const handleStop = () => {
    setIsPlaying(false);
    const {
      element
    } = cornerstoneViewportService.getViewportInfo(activeViewportId);
    cineService.stopClip(element);
  };
  const handleSetFrameRate = newFrameRate => {
    setFrameRate(newFrameRate);
    handleStop();
    handlePlay();
  };
  function handleSliderChange(newValues) {
    if (newValues[0] === timePointsRangeToUseForGenerate[0] && newValues[1] === timePointsRangeToUseForGenerate[1]) {
      return;
    }
    setTimePointsRangeToUseForGenerate(newValues);
  }
  if (!dynamicVolume || timePointsRange.length === 0) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_DynamicVolumeControls__WEBPACK_IMPORTED_MODULE_4__["default"], {
    fps: frameRate,
    isPlaying: isPlaying,
    onPlayPauseChange: onPlayPauseChange,
    minFps: 1,
    maxFps: 50,
    currentFrameIndex: timePointRendered,
    onFpsChange: handleSetFrameRate,
    framesLength: timePointsRange[1],
    onFrameChange: timePointIndex => {
      dynamicVolume.timePointIndex = timePointIndex;
    },
    onGenerate: onGenerateImage,
    onDynamicClick: displayingComputed ? () => renderDynamicImage(computedDisplaySet) : null,
    onDoubleRangeChange: handleSliderChange,
    initialRangeValues: timePointsRangeToUseForGenerate
  });
}
_s2(PanelGenerateImage, "QOoCd2SRzDuqWybM67SLX/ZOCAw=", false, function () {
  return [_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useCine, _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid];
});
_c2 = PanelGenerateImage;
_s(PanelGenerateImage, "ysK1Y3SE/ydCvMohmUcRk7FJRUA=", false, function () {
  return [_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useCine, _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid];
});
_c = PanelGenerateImage;
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelGenerateImage");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "PanelGenerateImage");

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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/panels/WorkflowPanel.tsx":
/*!***********************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/panels/WorkflowPanel.tsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function WorkflowPanel({
  servicesManager
}) {
  const ProgressDropdownWithService = servicesManager.services.customizationService.getCustomization('progressDropdownWithServiceComponent').component;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "data-cy": 'workflow-panel',
    className: "bg-secondary-dark mb-1 px-3 py-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mb-1"
  }, "Workflow"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ProgressDropdownWithService, {
    servicesManager: servicesManager
  })));
}
_c2 = WorkflowPanel;
_c = WorkflowPanel;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WorkflowPanel);
var _c;
__webpack_require__.$Refresh$.register(_c, "WorkflowPanel");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "WorkflowPanel");

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

/***/ "../../../extensions/cornerstone-dynamic-volume/src/panels/index.js":
/*!**************************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/src/panels/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DynamicDataPanel: () => (/* reexport safe */ _DynamicDataPanel__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   PanelGenerateImage: () => (/* reexport safe */ _PanelGenerateImage__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   WorkflowPanel: () => (/* reexport safe */ _WorkflowPanel__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _DynamicDataPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DynamicDataPanel */ "../../../extensions/cornerstone-dynamic-volume/src/panels/DynamicDataPanel.tsx");
/* harmony import */ var _WorkflowPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorkflowPanel */ "../../../extensions/cornerstone-dynamic-volume/src/panels/WorkflowPanel.tsx");
/* harmony import */ var _PanelGenerateImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelGenerateImage */ "../../../extensions/cornerstone-dynamic-volume/src/panels/PanelGenerateImage.tsx");
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

/***/ "../../../extensions/cornerstone-dynamic-volume/package.json":
/*!*******************************************************************!*\
  !*** ../../../extensions/cornerstone-dynamic-volume/package.json ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-cornerstone-dynamic-volume","version":"3.9.1","description":"OHIF extension for 4D volumes data","author":"OHIF","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-cornerstone-dynamic-volume.umd.js","module":"src/index.ts","exports":{".":"./src/index.ts","./types":"./src/types/index.ts"},"files":["dist","README.md"],"publishConfig":{"access":"public"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","start":"yarn run dev","test:unit":"jest --watchAll","test:unit:ci":"jest --ci --runInBand --collectCoverage --passWithNoTests"},"peerDependencies":{"@ohif/core":"3.9.1","@ohif/extension-cornerstone":"3.9.1","@ohif/extension-default":"3.9.1","@ohif/i18n":"3.9.1","@ohif/ui":"3.9.1","dcmjs":"*","dicom-parser":"^1.8.21","hammerjs":"^2.0.8","prop-types":"^15.6.2","react":"^18.3.1"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/core":"^2.2.20","@cornerstonejs/tools":"^2.2.20","classnames":"^2.3.2"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone-dynamic-volume_src_index_ts.js.map