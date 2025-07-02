"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["ohif-extensions_ohif-extension-webquiz_src_index_tsx"],{

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/src/CreateCustomIcon.tsx":
/*!***********************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/src/CreateCustomIcon.tsx ***!
  \***********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function BtnComponent({
  measurementData,
  segmentationData
}) {
  const handleButtonClick = () => {
    console.log('Number of measurements: ', measurementData.length);
    console.log("Number of segmentations:", segmentationData.length);
    window.parent.postMessage({
      type: 'annotations',
      measurementdata: measurementData,
      segmentationdata: segmentationData
    }, '*');
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    onClick: handleButtonClick
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






const lo_annotationdata = [];

/**
 *  Creating a React component to be used as a side panel in OHIF.
 *  Also performs a simple div that uses Math.js to output the square root.
 */
function WebQuizSidePanelComponent() {
  _s();
  _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_4__.eventTarget.addEventListener(_cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_5__.Enums.Events.ANNOTATION_COMPLETED, o_annotationdata => {
    console.log("===> boom - annotation completed");
    const bIsNotIncluded = lo_annotationdata.findIndex(item => item === o_annotationdata.detail) === -1;
    if (bIsNotIncluded) {
      lo_annotationdata.push(o_annotationdata.detail);
    }
  });
  const {
    servicesManager
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_3__.useSystem)();
  const {
    segmentationService
  } = servicesManager.services;
  const lo_segmentations = segmentationService.getSegmentations();
  console.log("===> num segs:", lo_segmentations.length);
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
  console.table(lo_allVolumes);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-white w-full text-center"
  }, `Web Quiz version : ${(0,math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(9)}`, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Questions_btnComponent__WEBPACK_IMPORTED_MODULE_2__["default"], {
    measurementData: lo_annotationdata,
    segmentationData: lo_allVolumes
  }));
}
_s(WebQuizSidePanelComponent, "9im43WjHHpYAdxqRAjz29gyfNeo=", false, function () {
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

/***/ "../../../../ohif-extensions/ohif-extension-webquiz/assets/BainesTransparentTiny.png":
/*!*******************************************************************************************!*\
  !*** ../../../../ohif-extensions/ohif-extension-webquiz/assets/BainesTransparentTiny.png ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

module.exports = /*#__PURE__*/JSON.parse('{"name":"ohif-extension-webquiz","version":"0.0.1","description":"","author":"","license":"MIT","main":"dist/umd/ohif-extension-webquiz/index.umd.js","files":["dist/**","public/**","README.md"],"repository":"OHIF/Viewers","keywords":["ohif-extension"],"module":"src/index.tsx","engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"scripts":{"dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:my-extension":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"^3.11.0-beta.37","@ohif/extension-default":"^3.11.0-beta.37","@ohif/extension-cornerstone":"^3.11.0-beta.37","@ohif/i18n":"^1.0.0","prop-types":"^15.6.2","react":"^18.3.1","react-dom":"^18.3.1","react-i18next":"^12.2.2","react-router":"^6.23.1","react-router-dom":"^6.23.1","webpack":"5.89.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"^7.20.13","math.js":"^1.1.46","react":"^19.1.0"},"devDependencies":{"@babel/core":"7.24.7","@babel/plugin-proposal-class-properties":"^7.16.7","@babel/plugin-proposal-object-rest-spread":"^7.17.3","@babel/plugin-proposal-private-methods":"^7.18.6","@babel/plugin-syntax-dynamic-import":"^7.8.3","@babel/plugin-transform-arrow-functions":"^7.16.7","@babel/plugin-transform-regenerator":"^7.16.7","@babel/plugin-transform-runtime":"7.24.7","@babel/plugin-transform-typescript":"^7.13.0","@babel/preset-env":"7.24.7","@babel/preset-react":"^7.16.7","@babel/preset-typescript":"^7.13.0","@babel/plugin-proposal-private-property-in-object":"7.21.11","babel-eslint":"9.x","babel-loader":"^8.2.4","@svgr/webpack":"^8.1.0","babel-plugin-module-resolver":"^5.0.0","clean-webpack-plugin":"^4.0.0","copy-webpack-plugin":"^10.2.0","cross-env":"^7.0.3","dotenv":"^14.1.0","eslint":"^8.39.0","eslint-loader":"^2.0.0","webpack":"5.89.0","webpack-merge":"^5.7.3","webpack-cli":"^5.0.2"}}');

/***/ })

}]);
//# sourceMappingURL=ohif-extensions_ohif-extension-webquiz_src_index_tsx.js.map