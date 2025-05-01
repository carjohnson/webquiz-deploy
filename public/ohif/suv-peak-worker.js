/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../../extensions/tmtv/src/utils/calculateSUVPeakWorker.js":
/*!********************************************************************!*\
  !*** ../../../extensions/tmtv/src/utils/calculateSUVPeakWorker.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _kitware_vtk_js_Common_DataModel_ImageData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @kitware/vtk.js/Common/DataModel/ImageData */ "../../../node_modules/@kitware/vtk.js/Common/DataModel/ImageData.js");
/* harmony import */ var _kitware_vtk_js_Common_Core_DataArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @kitware/vtk.js/Common/Core/DataArray */ "../../../node_modules/@kitware/vtk.js/Common/Core/DataArray.js");
/* harmony import */ var comlink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! comlink */ "../../../node_modules/comlink/dist/esm/comlink.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const createVolume = ({
  dimensions,
  origin,
  direction,
  spacing,
  metadata,
  scalarData
}) => {
  const imageData = _kitware_vtk_js_Common_DataModel_ImageData__WEBPACK_IMPORTED_MODULE_3__["default"].newInstance();
  imageData.setDimensions(dimensions);
  imageData.setOrigin(origin);
  imageData.setDirection(direction);
  imageData.setSpacing(spacing);
  const scalarArray = _kitware_vtk_js_Common_Core_DataArray__WEBPACK_IMPORTED_MODULE_4__["default"].newInstance({
    name: 'Pixels',
    numberOfComponents: 1,
    values: scalarData
  });
  imageData.getPointData().setScalars(scalarArray);
  imageData.modified();
  const voxelManager = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__.utilities.VoxelManager.createScalarVolumeVoxelManager({
    scalarData,
    dimensions,
    numberOfComponents: 1
  });
  return {
    imageData,
    spacing,
    origin,
    direction,
    metadata,
    voxelManager
  };
};

/**
 * This method calculates the SUV peak on a segmented ROI from a reference PET
 * volume. If a rectangle annotation is provided, the peak is calculated within that
 * rectangle. Otherwise, the calculation is performed on the entire volume which
 * will be slower but same result.
 * @param viewport Viewport to use for the calculation
 * @param labelmap Labelmap from which the mask is taken
 * @param referenceVolume PET volume to use for SUV calculation
 * @param toolData [Optional] list of toolData to use for SUV calculation
 * @param segmentIndex The index of the segment to use for masking
 * @returns
 */
function calculateSuvPeak({
  labelmapProps,
  referenceVolumeProps,
  annotations,
  segmentIndex = 1
}) {
  const labelmapInfo = createVolume(labelmapProps);
  const referenceInfo = createVolume(referenceVolumeProps);
  if (referenceInfo.metadata.Modality !== 'PT') {
    return;
  }
  const {
    dimensions,
    imageData: labelmapImageData
  } = labelmapInfo;
  const {
    imageData: referenceVolumeImageData
  } = referenceInfo;
  let boundsIJK;
  // Todo: using the first annotation for now
  if (annotations?.length && annotations[0].data?.cachedStats) {
    const {
      projectionPoints
    } = annotations[0].data.cachedStats;
    const pointsToUse = [].concat(...projectionPoints); // cannot use flat() because of typescript compiler right now

    const rectangleCornersIJK = pointsToUse.map(world => {
      const ijk = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.vec3.fromValues(0, 0, 0);
      referenceVolumeImageData.worldToIndex(world, ijk);
      return ijk;
    });
    boundsIJK = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.boundingBox.getBoundingBoxAroundShape(rectangleCornersIJK, dimensions);
  }
  let max = 0;
  let maxIJK = [0, 0, 0];
  let maxLPS = [0, 0, 0];
  const callback = ({
    pointIJK,
    pointLPS
  }) => {
    const value = labelmapInfo.voxelManager.getAtIJKPoint(pointIJK);
    if (value !== segmentIndex) {
      return;
    }
    const referenceValue = referenceInfo.voxelManager.getAtIJKPoint(pointIJK);
    if (referenceValue > max) {
      max = referenceValue;
      maxIJK = pointIJK;
      maxLPS = pointLPS;
    }
  };
  labelmapInfo.voxelManager.forEach(callback, {
    boundsIJK,
    imageData: labelmapImageData,
    isInObject: () => true,
    returnPoints: true
  });
  const direction = labelmapImageData.getDirection().slice(0, 3);

  /**
   * 2. Find the bottom and top of the great circle for the second sphere (1cc sphere)
   * V = (4/3)πr3
   */
  const radius = Math.pow(1 / (4 / 3 * Math.PI), 1 / 3) * 10;
  const diameter = radius * 2;
  const secondaryCircleWorld = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.vec3.create();
  const bottomWorld = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.vec3.create();
  const topWorld = gl_matrix__WEBPACK_IMPORTED_MODULE_2__.vec3.create();
  referenceVolumeImageData.indexToWorld(maxIJK, secondaryCircleWorld);
  gl_matrix__WEBPACK_IMPORTED_MODULE_2__.vec3.scaleAndAdd(bottomWorld, secondaryCircleWorld, direction, -diameter / 2);
  gl_matrix__WEBPACK_IMPORTED_MODULE_2__.vec3.scaleAndAdd(topWorld, secondaryCircleWorld, direction, diameter / 2);
  const suvPeakCirclePoints = [bottomWorld, topWorld];

  /**
   * 3. Find the Mean and Max of the 1cc sphere centered on the suv Max of the previous
   * sphere
   */
  let count = 0;
  let acc = 0;
  const suvPeakMeanCallback = ({
    value
  }) => {
    acc += value;
    count += 1;
  };
  _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.pointInSurroundingSphereCallback(referenceVolumeImageData, suvPeakCirclePoints, suvPeakMeanCallback);
  const mean = acc / count;
  return {
    max,
    maxIJK,
    maxLPS,
    mean
  };
}
function calculateTMTV(labelmapProps, segmentIndex = 1) {
  const labelmaps = labelmapProps.map(props => createVolume(props));
  const mergedLabelmap = labelmaps.length === 1 ? labelmaps[0] : _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.segmentation.createMergedLabelmapForIndex(labelmaps);
  const {
    imageData,
    spacing
  } = mergedLabelmap;
  const values = imageData.getPointData().getScalars().getData();

  // count non-zero values inside the outputData, this would
  // consider the overlapping regions to be only counted once
  const numVoxels = values.reduce((acc, curr) => {
    if (curr > 0) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return 1e-3 * numVoxels * spacing[0] * spacing[1] * spacing[2];
}
function getTotalLesionGlycolysis({
  labelmapProps,
  referenceVolumeProps
}) {
  const labelmaps = labelmapProps.map(props => createVolume(props));
  const mergedLabelmap = labelmaps.length === 1 ? labelmaps[0] : _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__.utilities.segmentation.createMergedLabelmapForIndex(labelmaps);

  // grabbing the first labelmap referenceVolume since it will be the same for all
  const {
    spacing
  } = labelmaps[0];
  const ptVolume = createVolume(referenceVolumeProps);
  let suv = 0;
  let totalLesionVoxelCount = 0;
  const scalarDataLength = mergedLabelmap.voxelManager.getScalarDataLength();
  for (let i = 0; i < scalarDataLength; i++) {
    // if not background
    if (mergedLabelmap.voxelManager.getAtIndex(i) !== 0) {
      suv += ptVolume.voxelManager.getAtIndex(i);
      totalLesionVoxelCount += 1;
    }
  }

  // Average SUV for the merged labelmap
  const averageSuv = suv / totalLesionVoxelCount;

  // total Lesion Glycolysis [suv * ml]
  return averageSuv * totalLesionVoxelCount * spacing[0] * spacing[1] * spacing[2] * 1e-3;
}
const obj = {
  calculateSuvPeak,
  calculateTMTV,
  getTotalLesionGlycolysis
};
(0,comlink__WEBPACK_IMPORTED_MODULE_5__.expose)(obj);

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

/***/ "?0c00":
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_cornerstonejs_tools_dist_esm_utilities_boundingBox_index_js-node_modules-f10216","vendors-node_modules_cornerstonejs_tools_dist_esm_index_js","vendors-node_modules_comlink_dist_esm_comlink_mjs","vendors-node_modules_kitware_vtk_js_Common_DataModel_ImageData_js","vendors-node_modules_cornerstonejs_core_dist_esm_index_js","vendors-node_modules_pmmmwh_react-refresh-webpack-plugin_lib_runtime_RefreshUtils_js"], () => (__webpack_require__("../../../extensions/tmtv/src/utils/calculateSUVPeakWorker.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd define */
/******/ 	(() => {
/******/ 		__webpack_require__.amdD = function () {
/******/ 			throw new Error('define cannot be used indirect');
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/ohif/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	(() => {
/******/ 		__webpack_require__.i.push((options) => {
/******/ 			const originalFactory = options.factory;
/******/ 			options.factory = function (moduleObject, moduleExports, webpackRequire) {
/******/ 				__webpack_require__.$Refresh$.setup(options.id);
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					if (typeof Promise !== 'undefined' && moduleObject.exports instanceof Promise) {
/******/ 						options.module.exports = options.module.exports.then(
/******/ 							(result) => {
/******/ 								__webpack_require__.$Refresh$.cleanup(options.id);
/******/ 								return result;
/******/ 							},
/******/ 							(reason) => {
/******/ 								__webpack_require__.$Refresh$.cleanup(options.id);
/******/ 								return Promise.reject(reason);
/******/ 							}
/******/ 						);
/******/ 					} else {
/******/ 						__webpack_require__.$Refresh$.cleanup(options.id)
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		})
/******/ 		
/******/ 		__webpack_require__.$Refresh$ = {
/******/ 			register: () => (undefined),
/******/ 			signature: () => ((type) => (type)),
/******/ 			runtime: {
/******/ 				createSignatureFunctionForTransform: () => ((type) => (type)),
/******/ 				register: () => (undefined)
/******/ 			},
/******/ 			setup: (currentModuleId) => {
/******/ 				const prevModuleId = __webpack_require__.$Refresh$.moduleId;
/******/ 				const prevRegister = __webpack_require__.$Refresh$.register;
/******/ 				const prevSignature = __webpack_require__.$Refresh$.signature;
/******/ 				const prevCleanup = __webpack_require__.$Refresh$.cleanup;
/******/ 		
/******/ 				__webpack_require__.$Refresh$.moduleId = currentModuleId;
/******/ 		
/******/ 				__webpack_require__.$Refresh$.register = (type, id) => {
/******/ 					const typeId = currentModuleId + " " + id;
/******/ 					__webpack_require__.$Refresh$.runtime.register(type, typeId);
/******/ 				}
/******/ 		
/******/ 				__webpack_require__.$Refresh$.signature = () => (__webpack_require__.$Refresh$.runtime.createSignatureFunctionForTransform());
/******/ 		
/******/ 				__webpack_require__.$Refresh$.cleanup = (cleanupModuleId) => {
/******/ 					if (currentModuleId === cleanupModuleId) {
/******/ 						__webpack_require__.$Refresh$.moduleId = prevModuleId;
/******/ 						__webpack_require__.$Refresh$.register = prevRegister;
/******/ 						__webpack_require__.$Refresh$.signature = prevSignature;
/******/ 						__webpack_require__.$Refresh$.cleanup = prevCleanup;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = self.location + "";
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"suv-peak-worker": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return Promise.all(["vendors-node_modules_cornerstonejs_tools_dist_esm_utilities_boundingBox_index_js-node_modules-f10216","vendors-node_modules_cornerstonejs_tools_dist_esm_index_js","vendors-node_modules_comlink_dist_esm_comlink_mjs","vendors-node_modules_kitware_vtk_js_Common_DataModel_ImageData_js","vendors-node_modules_cornerstonejs_core_dist_esm_index_js","vendors-node_modules_pmmmwh_react-refresh-webpack-plugin_lib_runtime_RefreshUtils_js"].map(__webpack_require__.e, __webpack_require__)).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=suv-peak-worker.js.map