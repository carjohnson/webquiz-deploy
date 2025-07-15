(self["webpackChunk"] = self["webpackChunk"] || []).push([["ohif-extensions_ohif-extension-webquiz_src_index_tsx"],{

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/index.js":
/*!****************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/index.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/index.js");


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/arithmetic/index.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/arithmetic/index.js ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {

    ceil: function(val) {
        return Math.ceil(val / 10) * 10;
    },

    round: function(n) {
        return Math.round(n);
    },

    fround: function(n) {
        return Math.fround(n)
    },

    /**
     * Returns the largest integer less than or equal to the given number.
     * @param n
     * @returns {number}
     */
    floor: function(n) {
        return Math.floor(n);
    },

    sign: function(n) {
        return Math.sign(n);
    },

    abs: function(n) {
        return Math.abs(n)
    },

    imul: function(a, b) {
        return Math.imul(a, b);
    },

    pow: function(base, exp) {
        return Math.pow(base, exp);
    },

    square: function(val) {
        return val * val;
    },

    cube: function(val) {
        return val * val * val;
    },

    sqrt: function(n) {
        return Math.sqrt(n);
    },

    cbrt: function (n) {
        return Math.cbrt(n);
    },

    exp: function (n) {
        return Math.exp(n);
    },

    expm1: function(n) {
        return Math.expm1(n);
    },

    trunc: function(n) {
        return Math.trunc(n);
    },

    greatestCommonDivisor: function gcd(x, y) {
        var remainder = x % y;
        if (remainder === 0) {
            return y;
        }

        return gcd(y, remainder);
    },

    log: function (n) {
        return Math.log(n);
    },

    log2: function (n) {
        return Math.log2(n);
    },

    log10: function (n) {
        return Math.log10(n);
    },

    log1p: function(n) {
        return Math.log1p(n);
    },

    hypot: function(...arr) {
        return Math.hypot(...arr);
    }, 

    /**
     * Performs ceil in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dCeil: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        console.log('dCeil', num, n, multiplyValue, Math.ceil(num / multiplyValue) * multiplyValue)
        return Math.ceil(num * multiplyValue) / multiplyValue;
    },

    /**
     * Performs round in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dRound: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        return Math.round(num * multiplyValue) / multiplyValue;
    },

    /**
     * Performs floor in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dFloor: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        return Math.floor(num * multiplyValue) / multiplyValue;
    },

    /**
     * Performs trunc in the n decimal digit of num
     * @param num
     * @param n
     * @returns {number}
     */
    dTrunc: function(num, n) {
        let multiplyValue = Math.pow(10, n);
        return Math.trunc(num * multiplyValue) / multiplyValue;
    }

};


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/constants.js":
/*!************************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/constants.js ***!
  \************************************************************************************************/
/***/ ((module) => {

/**
 * A constants class to maintain all the fixed variables.
 * @type {Object}
 */
module.exports = Object.freeze({
    /**
     * Built-in constants.
     */
    PI: Math.PI,
    E: Math.E,
    LN10: Math.LN10,
    LN2: Math.LN2,
    LOG10E: Math.LOG10E,
    LOG2E: Math.LOG2E,
    SQRT1_2: Math.SQRT1_2,
    SQRT2: Math.SQRT2,


    /**
     * Unit converter constants.
     */
    FEET_TO_INCHES_FACTOR:  12,
    FEET_TO_METERS_FACTOR: 0.3048,
    FEET_TO_MILES_FACTOR: 1 / 5280,
    FEET_TO_YARDS_FACTOR: 1 / 3,
    INCHES_TO_FEET_FACTOR: 1 / 12,
    INCHES_TO_METERS_FACTOR: 0.0254,
    INCHES_TO_MILES_FACTOR: 1 / 63360,
    INCHES_TO_YARDS_FACTOR: 1 / 36,
    MILES_TO_FEET_FACTOR: 5280,
    MILES_TO_INCHES_FACTOR: 63360,
    MILES_TO_METERS_FACTOR: 1609.344,
    MILES_TO_YARDS_FACTOR: 1760,
    YARDS_TO_INCHES_FACTOR: 36,
    YARDS_TO_FEET_FACTOR: 3,
    YARDS_TO_METERS_FACTOR: 0.9144,
    YARDS_TO_MILES_FACTOR: 1 / 1760,
    CELSIUS_TO_FAHRENEIT_MUTLIPLIER_FACTOR: 9 / 5,
    CELSIUS_TO_FAHRENEIT_FACTOR: 32


});


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/index.js":
/*!********************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/index.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = Object.assign({},
    __webpack_require__(/*! ./utils */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/utils/index.js"),
    __webpack_require__(/*! ./statistics */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/statistics/index.js"),
    __webpack_require__(/*! ./probability */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/probability/index.js"),
    __webpack_require__(/*! ./arithmetic */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/arithmetic/index.js"),
    __webpack_require__(/*! ./unit */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/unit/index.js"),
    __webpack_require__(/*! ./trigonometric */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/trigonometric/index.js")
);


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/probability/index.js":
/*!********************************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/probability/index.js ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {

    random: function() {
        return Math.random();
    },

    randomElement: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    factorial: function(n) {
        return n * (n-1);
    }
};


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/statistics/index.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/statistics/index.js ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {

    minElement: function(arr) {
        return Math.min.apply(null, arr);
    },

    maxElement: function(arr) {
        return Math.max.apply(null, arr);
    },

    between: function (val, min, max) {
        return min<=val==val<=max;
    }
}


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/trigonometric/index.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/trigonometric/index.js ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {
// Trigonometric functions
    sin: function (n) {
        return Math.sin(n);
    },

    cos: function (n) {
        return Math.cos(n);
    },

    tan: function (n) {
        return Math.tan(n);
    },

    acos: function (n) {
        return Math.acos(n);
    },

    asin: function (n) {
        return Math.asin(n);
    },

    acosh: function (n) {
        return Math.acosh(n);
    },

    atan: function (n) {
        return Math.atan(n);
    },

    /**
     * Arc tangent of two numbers. Both arguments are used to determine the quadrant of the result.
     * @param y
     * @param x
     * @returns {number} an angle expressed in radians
     */
    atan2: function (y, x) {
        return Math.atan2(y, x);
    }

};


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/unit/index.js":
/*!*************************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/unit/index.js ***!
  \*************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var constants = __webpack_require__(/*! ../constants */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/constants.js");
module.exports = {

    // Unit converters
    yardsToFeet: function(n) {
        return n * constants.YARDS_TO_FEET_FACTOR;
    },

    feetToYards: function(n) {
        return n * constants.FEET_TO_YARDS_FACTOR;
    },

    yardsToInches: function(n) {
        return n * constants.YARDS_TO_INCHES_FACTOR;
    },

    inchesToYards: function(n) {
        return constants.INCHES_TO_YARDS_FACTOR * n;
    },

    inchesToMiles: function(n) {
        return constants.INCHES_TO_MILES_FACTOR * n;
    },

    feetToInches: function(n) {
        return constants.FEET_TO_INCHES_FACTOR * n;
    },

    feetToMeters: function (n) {
        return constants.FEET_TO_METERS_FACTOR * n;
    },

    feetToMiles: function(n) {
        return constants.FEET_TO_MILES_FACTOR * n;
    },

    inchesToFeet: function(n) {
        return constants.INCHES_TO_FEET_FACTOR * n;
    },

    inchesToMeters: function(n) {
        return constants.INCHES_TO_METERS_FACTOR * n;
    },

    milesToYards: function(n) {
        return constants.MILES_TO_YARDS_FACTOR * n;
    },

    milesToMeters: function(n) {
        return constants.MILES_TO_METERS_FACTOR * n;
    },

    milesToInches: function(n) {
        return constants.MILES_TO_INCHES_FACTOR * n;
    },

    milesToFeet: function(n) {
        return constants.MILES_TO_FEET_FACTOR * n;
    },

    yardsToMiles: function(n) {
        return constants.YARDS_TO_MILES_FACTOR * n;
    },

    yardsToMeters: function(n) {
        return constants.YARDS_TO_METERS_FACTOR * n;
    },

    toFahrenheit: function(val) {
        return val * constants.CELSIUS_TO_FAHRENEIT_MUTLIPLIER_FACTOR + constants.CELSIUS_TO_FAHRENEIT_FACTOR;
    },

    toCelsius: function(val) {
        return (val - constants.CELSIUS_TO_FAHRENEIT_FACTOR) / constants.CELSIUS_TO_FAHRENEIT_MUTLIPLIER_FACTOR;
    },

};


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/utils/index.js":
/*!**************************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/lib/utils/index.js ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {
    isPrime: function(n) {
        for (var i = 2 ; i < n ; i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return n > 1;
    },

    isEven: function(n) {
        return n % 2 === 0;
    },

    isOdd: function(n) {
        return !this.isEven(n);
    },

    format: function(val, decimals) {
        return ( val.toFixed(decimals) )/1;
    },

    dropFirstDigit: function(n) {
        return Number(n.toString().substring(1));
    },

    dropLastDigit: function(n) {
        return Number(n.toString().substring(0, n.toString().length-1));
    },

    dropDigit: function(n, pos) {
        return Number(n.toString().substring(0, pos-1).concat(n.toString().substring(pos, n)));
    }
};


/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/src/CreateCustomIcon.tsx":
/*!***********************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/src/CreateCustomIcon.tsx ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_BainesTransparentTiny_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/BainesTransparentTiny.png */ "../../../../ohif-extensions/ohif-extension-webquiz/assets/BainesTransparentTiny.png");
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


const CreateCustomIcon = Icons => {
  //   console.log('📦 Icons keys:', Object.keys(Icons));   // for debug

  const BaineslogoIcon = props => {
    const {
      width = 22,
      height = 22,
      ...rest
    } = props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", _extends({
      src: _assets_BainesTransparentTiny_png__WEBPACK_IMPORTED_MODULE_1__["default"],
      width: width,
      height: height
    }, rest));
  };
  Icons.addIcon('baines-logo', BaineslogoIcon);
};
_c = CreateCustomIcon;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateCustomIcon);
var _c;
__webpack_require__.$Refresh$.register(_c, "CreateCustomIcon");

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

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/src/Questions/btnComponent.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/src/Questions/btnComponent.tsx ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! buffer */ "../../../node_modules/buffer/index.js");
/* harmony import */ var _utils_util_segmentation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/util_segmentation */ "../../../../ohif-extensions/ohif-extension-webquiz/src/utils/util_segmentation.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








const {
  datasetToDict
} = dcmjs__WEBPACK_IMPORTED_MODULE_2__.data;
function BtnComponent({
  measurementData,
  segmentationData,
  refreshData,
  setIsSaved
}) {
  const handleUploadAnnotationsClick = () => {
    // refresh the annotation data before posting
    // segmentation data is refreshed automatically through segmentation service
    const [freshMeasurementData, freshVolumeData] = refreshData();
    console.log('Number of measurements: ', freshMeasurementData.length);
    console.log("Number of segments:", freshVolumeData.length);
    window.parent.postMessage({
      type: 'annotations',
      measurementdata: freshMeasurementData,
      segmentationdata: freshVolumeData
    }, '*');
    setIsSaved(true);
  };
  const handleUploadSegmentationsClick = async () => {
    const [,, freshSegmentationData] = refreshData();
    const selectedId = freshSegmentationData[0]?.segmentationId;
    const currentViewports = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.getAllViewportIds?.() || [(0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.getEnabledElement)()?.viewport?.id];
    const state = {
      segmentationId: selectedId,
      viewportIds: currentViewports
    };
    const result = await (0,_utils_util_segmentation__WEBPACK_IMPORTED_MODULE_6__.getGeneratedSegmentation)(state);
    if (!result?.dataset) {
      console.error("No dataset generated.");
      return;
    }
    uploadDICOMData(result.dataset, `segmentation-${Date.now()}.dcm`);
  };
  const uploadDICOMData = (dataset, filename) => {
    try {
      const buffer = buffer__WEBPACK_IMPORTED_MODULE_5__.Buffer.from(datasetToDict(dataset).write());
      const blob = new Blob([buffer], {
        type: "application/dicom"
      });

      // Send blob to parent app
      window.parent.postMessage({
        type: "SEGMENTATION_UPLOAD",
        filename,
        payload: blob
      }, "*");
      console.log("📤 Segmentation message posted to parent window.");
    } catch (error) {
      console.error("❌ Failed to post segmentation:", error);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: handleUploadSegmentationsClick
  }, "Upload Segmentations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: handleUploadAnnotationsClick
  }, "Post"));
}
_c = BtnComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BtnComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "BtnComponent");

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

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/src/WebQuizSidePanelComponent.tsx":
/*!********************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/src/WebQuizSidePanelComponent.tsx ***!
  \********************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! math.js */ "../../../../ohif-extensions/ohif-extension-webquiz/node_modules/math.js/index.js");
/* harmony import */ var math_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(math_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Questions_btnComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Questions/btnComponent */ "../../../../ohif-extensions/ohif-extension-webquiz/src/Questions/btnComponent.tsx");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();








/**
 *  Creating a React component to be used as a side panel in OHIF.
 *  Also performs a simple div that uses Math.js to output the square root.
 */

function WebQuizSidePanelComponent() {
  _s();
  // set up useEffect hook to manage gathering all data from services
  //  as the other components may be updating asynchronously and this
  //  component needs to be subscribed to those updates

  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_3__.useSystem)();
  const {
    segmentationService
  } = servicesManager.services;
  const [segmentationData, setSegmentationData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [volumeData, setVolumeData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [annotationData, setAnnotationData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isSaved, setIsSaved] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  // generic for capture of cachedStats object

  // Annotations listeners
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleAnnotationChange = () => {
      const lo_annotationStats = getAnnotationsStats();
      setAnnotationData(lo_annotationStats);

      ////// for debug /////
      // const lengths = lo_annotationStats.flatMap((statsObj) => 
      //     Object.values(statsObj)
      //         .filter((stat): stat is { length: number } => typeof stat === 'object' && stat !== null && 'length' in stat)
      //         .map((stat) => stat.length)
      //     );

      // console.log("LENGTHS ===>", lengths);
    };

    // Register listeners
    // cornerstone.eventTarget.addEventListener(cornerstoneTools.Enums.Events.ANNOTATION_ADDED, handleAnnotationChange);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.ANNOTATION_MODIFIED, handleAnnotationChange);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.ANNOTATION_REMOVED, handleAnnotationChange);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.ANNOTATION_COMPLETED, handleAnnotationChange);

    // Cleanup on unmount
    return () => {
      // cornerstone.eventTarget.removeEventListener(cornerstoneTools.Enums.Events.ANNOTATION_ADDED, handleAnnotationChange);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.ANNOTATION_MODIFIED, handleAnnotationChange);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.ANNOTATION_REMOVED, handleAnnotationChange);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.ANNOTATION_COMPLETED, handleAnnotationChange);
    };
  }, []);

  //=====================
  // Segmentation listener

  // don't rely on segmentationService. 
  // These useEffects are tapping into the events for a more immediate response
  // useEffect(() => {
  //     const lo_allVolumes = getSegmentationStats();
  //     setVolumeData(lo_allVolumes);
  //     console.table(lo_allVolumes);
  //     }, [segmentationService]);
  // Refactored ... ===>
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleSegmentationChange = () => {
      const [lo_segmentations, lo_allVolumes] = getSegmentationStats();
      setVolumeData(lo_allVolumes);
      console.table(lo_allVolumes);
    };
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_ADDED, handleSegmentationChange);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_DELETED, handleSegmentationChange);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_MODIFIED, handleSegmentationChange);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_DATA_MODIFIED, handleSegmentationChange);
    return () => {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_ADDED, handleSegmentationChange);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_DELETED, handleSegmentationChange);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_MODIFIED, handleSegmentationChange);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.removeEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.SEGMENTATION_DATA_MODIFIED, handleSegmentationChange);
    };
  }, []);

  //=====================
  // watch for changes to the state properties
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (annotationData.length > 0) {
      setIsSaved(false);
      // console.log(' Annotation Change');
    }
  }, [annotationData]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (volumeData.length > 0) {
      setIsSaved(false);
      // console.log(' Volume Change');
    }
  }, [volumeData]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (segmentationData.length > 0) {
      setIsSaved(false);
      // console.log(' Volume Change');
    }
  }, [segmentationData]);

  ////////////////////////////////////////////
  //=====================
  // helper functions
  //=====================
  ////////////////////////////////////////////

  //=====================
  // function to get list of all cached annotation stats
  const getAnnotationsStats = () => {
    const lo_annotationStats = [];
    const allAnnotations = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.annotation.state.getAllAnnotations();
    allAnnotations.forEach((ann, index) => {
      const stats = ann.data?.cachedStats;
      if (stats && Object.keys(stats).length > 0) {
        lo_annotationStats.push(stats);
        // console.log("ANNOTATION Tool ===>", ` Annotation ${index}:`, ann.data.cachedStats);
      }
    });
    return lo_annotationStats;
  };

  //=====================
  // function to get the list of objects holding segmentations and
  //  extract volume data
  const getSegmentationStats = () => {
    const lo_segmentations = segmentationService.getSegmentations();
    const lo_allVolumes = [];
    lo_segmentations.forEach((segmentation, segIndex) => {
      const segments = segmentation.segments;
      Object.keys(segments).forEach(segmentKey => {
        const segment = segments[segmentKey];
        const volume = segment?.cachedStats?.namedStats?.volume?.value;
        if (volume !== undefined) {
          lo_allVolumes.push({
            segmentation: segIndex + 1,
            segment: segmentKey,
            volume
          });
        }
      });
    });
    return [lo_segmentations, lo_allVolumes];
  };

  //=====================
  const refreshData = () => {
    const lo_annotationStats = getAnnotationsStats();
    setAnnotationData(lo_annotationStats);
    const [lo_segmentations, lo_allVolumes] = getSegmentationStats();
    setVolumeData(lo_allVolumes);
    setSegmentationData(lo_segmentations);
    console.table(lo_allVolumes);
    return [lo_annotationStats, lo_allVolumes, lo_segmentations]; // ensures stats are updated before continuing
  };

  ////////////////////////////////////////////
  //=====================
  // return
  //=====================
  ////////////////////////////////////////////
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-white w-full text-center"
  }, `Web Quiz version : ${(0,math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(4)}`, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Questions_btnComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    measurementData: annotationData,
    segmentationData: segmentationData,
    refreshData: refreshData,
    setIsSaved: setIsSaved
  }));
}
_s(WebQuizSidePanelComponent, "vdaIHZ2iZtlnqzUFfB0Ch/9/9Y4=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_3__.useSystem];
});
_c = WebQuizSidePanelComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebQuizSidePanelComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "WebQuizSidePanelComponent");

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

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/src/id.js":
/*!********************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/src/id.js ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../../ohif-extensions/ohif-extension-webquiz/package.json");
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

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/src/index.tsx":
/*!************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/src/index.tsx ***!
  \************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./id */ "../../../../ohif-extensions/ohif-extension-webquiz/src/id.js");
/* harmony import */ var _WebQuizSidePanelComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebQuizSidePanelComponent */ "../../../../ohif-extensions/ohif-extension-webquiz/src/WebQuizSidePanelComponent.tsx");
/* harmony import */ var _CreateCustomIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateCustomIcon */ "../../../../ohif-extensions/ohif-extension-webquiz/src/CreateCustomIcon.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





(0,_CreateCustomIcon__WEBPACK_IMPORTED_MODULE_2__["default"])(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_3__.Icons);

/**
 * You can remove any of the following modules if you don't need them.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
  }) => {},
  /**
   * PanelModule should provide a list of panels that will be available in OHIF
   * for Modes to consume and render. Each panel is defined by a {name,
   * iconName, iconLabel, label, component} object. Example of a panel module
   * is the StudyBrowserPanel that is provided by the default extension in OHIF.
   */
  getPanelModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {
    // console.log('🧪 In Panel Module Is baines-logo in Icons?', 'baines-logo' in Icons);
    return [{
      name: "webquiz",
      iconName: 'baines-logo',
      iconLabel: "Web Quiz",
      label: "Web Quiz",
      component: _WebQuizSidePanelComponent__WEBPACK_IMPORTED_MODULE_1__["default"]
    }];
  },
  /**
   * ViewportModule should provide a list of viewports that will be available in OHIF
   * for Modes to consume and use in the viewports. Each viewport is defined by
   * {name, component} object. Example of a viewport module is the CornerstoneViewport
   * that is provided by the Cornerstone extension in OHIF.
   */
  getViewportModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {},
  /**
   * ToolbarModule should provide a list of tool buttons that will be available in OHIF
   * for Modes to consume and use in the toolbar. Each tool button is defined by
   * {name, defaultComponent, clickHandler }. Examples include radioGroupIcons and
   * splitButton toolButton that the default extension is providing.
   */
  getToolbarModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {},
  /**
   * LayoutTemplateMOdule should provide a list of layout templates that will be
   * available in OHIF for Modes to consume and use to layout the viewer.
   * Each layout template is defined by a { name, id, component}. Examples include
   * the default layout template provided by the default extension which renders
   * a Header, left and right sidebars, and a viewport section in the middle
   * of the viewer.
   */
  getLayoutTemplateModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {},
  /**
   * SopClassHandlerModule should provide a list of sop class handlers that will be
   * available in OHIF for Modes to consume and use to create displaySets from Series.
   * Each sop class handler is defined by a { name, sopClassUids, getDisplaySetsFromSeries}.
   * Examples include the default sop class handler provided by the default extension
   */
  getSopClassHandlerModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {},
  /**
   * HangingProtocolModule should provide a list of hanging protocols that will be
   * available in OHIF for Modes to use to decide on the structure of the viewports
   * and also the series that hung in the viewports. Each hanging protocol is defined by
   * { name, protocols}. Examples include the default hanging protocol provided by
   * the default extension that shows 2x2 viewports.
   */
  getHangingProtocolModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {},
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
  }) => {},
  /**
   * ContextModule should provide a list of context that will be available in OHIF
   * and will be provided to the Modes. A context is a state that is shared OHIF.
   * Context is defined by an object of { name, context, provider }. Examples include
   * the measurementTracking context provided by the measurementTracking extension.
   */
  getContextModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {},
  /**
   * DataSourceModule should provide a list of data sources to be used in OHIF.
   * DataSources can be used to map the external data formats to the OHIF's
   * native format. DataSources are defined by an object of { name, type, createDataSource }.
   */
  getDataSourcesModule: ({
    servicesManager,
    commandsManager,
    extensionManager
  }) => {}
});

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

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/src/utils/util_segmentation.ts":
/*!*****************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/src/utils/util_segmentation.ts ***!
  \*****************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGeneratedSegmentation: () => (/* binding */ getGeneratedSegmentation),
/* harmony export */   getSegmentationIds: () => (/* binding */ getSegmentationIds)
/* harmony export */ });
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/adapters */ "../../../node_modules/@cornerstonejs/adapters/dist/esm/index.js");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// Utility to convert the segmentation object obtained through OHIF segmentationService
// This is modified code which  originated from example utility found in cornerstonejs github
//          cornerstone3D/packages/adapters/examples/segmentationVolume/utils.ts





const {
  cache,
  imageLoader,
  metaData
} = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_0__;
const {
  segmentation: csToolsSegmentation
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_1__;
const {
  downloadDICOMData
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_2__.helpers;
const {
  Cornerstone3D
} = _cornerstonejs_adapters__WEBPACK_IMPORTED_MODULE_2__.adaptersSEG;
async function getGeneratedSegmentation(state) {
  const {
    segmentationId,
    viewportIds
  } = state;
  const segmentationIds = getSegmentationIds();
  if (!segmentationIds.length) {
    return null;
  }
  const segmentation = csToolsSegmentation.state.getSegmentation(segmentationId);
  const {
    imageIds
  } = segmentation.representationData.Labelmap;
  const segImages = imageIds.map(imageId => cache.getImage(imageId));
  const referencedImages = segImages.map(image => cache.getImage(image.referencedImageId));
  const labelmaps2D = [];
  let z = 0;
  for (const segImage of segImages) {
    const segmentsOnLabelmap = new Set();
    const pixelData = segImage.getPixelData();
    const {
      rows,
      columns
    } = segImage;
    for (let i = 0; i < pixelData.length; i++) {
      const segment = pixelData[i];
      if (segment !== 0) {
        segmentsOnLabelmap.add(segment);
      }
    }
    labelmaps2D[z++] = {
      segmentsOnLabelmap: Array.from(segmentsOnLabelmap),
      pixelData,
      rows,
      columns
    };
  }
  const allSegmentsOnLabelmap = labelmaps2D.map(lm => lm.segmentsOnLabelmap);
  const labelmap3D = {
    segmentsOnLabelmap: Array.from(new Set(allSegmentsOnLabelmap.flat())),
    metadata: [],
    labelmaps2D
  };
  labelmap3D.segmentsOnLabelmap.forEach(segmentIndex => {
    const color = csToolsSegmentation.config.color.getSegmentIndexColor(viewportIds[0], segmentationId, segmentIndex) || [255, 255, 255, 255]; // fallback RGBA

    const RecommendedDisplayCIELabValue = dcmjs__WEBPACK_IMPORTED_MODULE_3__["default"].data.Colors.rgb2DICOMLAB(color.slice(0, 3).map(value => value / 255)).map(value => Math.round(value));
    const segmentMetadata = {
      SegmentNumber: segmentIndex.toString(),
      SegmentLabel: `Segment ${segmentIndex}`,
      SegmentAlgorithmType: "MANUAL",
      SegmentAlgorithmName: "OHIF Brush",
      RecommendedDisplayCIELabValue,
      SegmentedPropertyCategoryCodeSequence: {
        CodeValue: "T-D0050",
        CodingSchemeDesignator: "SRT",
        CodeMeaning: "Tissue"
      },
      SegmentedPropertyTypeCodeSequence: {
        CodeValue: "T-D0050",
        CodingSchemeDesignator: "SRT",
        CodeMeaning: "Tissue"
      }
    };
    labelmap3D.metadata[segmentIndex] = segmentMetadata;
  });
  return Cornerstone3D.Segmentation.generateSegmentation(referencedImages, labelmap3D, metaData);
}
function getSegmentationIds() {
  return csToolsSegmentation.state.getSegmentations().map(x => x.segmentationId);
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

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/assets/BainesTransparentTiny.png":
/*!*******************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/assets/BainesTransparentTiny.png ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/images/BainesTransparentTiny.png");

/***/ }),

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/package.json":
/*!***********************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/package.json ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"ohif-extension-webquiz","version":"0.0.1","description":"","author":"","license":"MIT","main":"dist/umd/ohif-extension-webquiz/index.umd.js","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:my-extension":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"^3.11.0-beta.37","@ohif/extension-default":"^3.11.0-beta.37","@ohif/extension-cornerstone":"^3.11.0-beta.37","@ohif/i18n":"^1.0.0","prop-types":"^15.6.2","react":"^18.3.1","react-dom":"^18.3.1","react-i18next":"^12.2.2","react-router":"^6.23.1","react-router-dom":"^6.23.1","webpack":"5.89.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"^7.20.13","math.js":"^1.1.46","react":"^19.1.0"},"devDependencies":{"@babel/core":"7.24.7","@babel/plugin-proposal-class-properties":"^7.16.7","@babel/plugin-proposal-object-rest-spread":"^7.17.3","@babel/plugin-proposal-private-methods":"^7.18.6","@babel/plugin-syntax-dynamic-import":"^7.8.3","@babel/plugin-transform-arrow-functions":"^7.16.7","@babel/plugin-transform-regenerator":"^7.16.7","@babel/plugin-transform-runtime":"7.24.7","@babel/plugin-transform-typescript":"^7.13.0","@babel/preset-env":"7.24.7","@babel/preset-react":"^7.16.7","@babel/preset-typescript":"^7.13.0","@babel/plugin-proposal-private-property-in-object":"7.21.11","babel-eslint":"9.x","babel-loader":"^8.2.4","@svgr/webpack":"^8.1.0","babel-plugin-module-resolver":"^5.0.0","clean-webpack-plugin":"^4.0.0","copy-webpack-plugin":"^10.2.0","cross-env":"^7.0.3","dotenv":"^14.1.0","eslint":"^8.39.0","eslint-loader":"^2.0.0","webpack":"5.89.0","webpack-merge":"^5.7.3","webpack-cli":"^5.0.2"}}');

/***/ })

}]);
//# sourceMappingURL=ohif-extensions_ohif-extension-webquiz_src_index_tsx.js.map