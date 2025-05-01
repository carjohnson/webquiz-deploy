(self["webpackChunk"] = self["webpackChunk"] || []).push([["extensions_default_src_index_ts"],{

/***/ "../../../extensions/default/src/Actions/createReportAsync.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/Actions/createReportAsync.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 *
 * @param {*} servicesManager
 */
async function createReportAsync({
  servicesManager,
  getReport,
  reportType = 'measurement'
}) {
  const {
    displaySetService,
    uiNotificationService,
    uiDialogService
  } = servicesManager.services;
  const loadingDialogId = uiDialogService.create({
    showOverlay: true,
    isDraggable: false,
    centralize: true,
    content: Loading
  });
  try {
    const naturalizedReport = await getReport();
    if (!naturalizedReport) return;

    // The "Mode" route listens for DicomMetadataStore changes
    // When a new instance is added, it listens and
    // automatically calls makeDisplaySets
    _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances([naturalizedReport], true);
    const displaySet = displaySetService.getMostRecentDisplaySet();
    const displaySetInstanceUID = displaySet.displaySetInstanceUID;
    uiNotificationService.show({
      title: 'Create Report',
      message: `${reportType} saved successfully`,
      type: 'success'
    });
    return [displaySetInstanceUID];
  } catch (error) {
    uiNotificationService.show({
      title: 'Create Report',
      message: error.message || `Failed to store ${reportType}`,
      type: 'error'
    });
    throw new Error(`Failed to store ${reportType}. Error: ${error.message || 'Unknown error'}`);
  } finally {
    uiDialogService.dismiss({
      id: loadingDialogId
    });
  }
}
function Loading() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-primary-active"
  }, "Loading...");
}
_c2 = Loading;
_c = Loading;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createReportAsync);
var _c;
__webpack_require__.$Refresh$.register(_c, "Loading");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "Loading");

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

/***/ "../../../extensions/default/src/Components/DataSourceConfigurationComponent.tsx":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/Components/DataSourceConfigurationComponent.tsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _DataSourceConfigurationModalComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataSourceConfigurationModalComponent */ "../../../extensions/default/src/Components/DataSourceConfigurationModalComponent.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




function DataSourceConfigurationComponent({
  servicesManager,
  extensionManager
}) {
  _s2();
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)('DataSourceConfiguration');
  const {
    show,
    hide
  } = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useModal)();
  const {
    customizationService
  } = servicesManager.services;
  const [configurationAPI, setConfigurationAPI] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [configuredItems, setConfiguredItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let shouldUpdate = true;
    const dataSourceChangedCallback = async () => {
      const activeDataSourceDef = extensionManager.getActiveDataSourceDefinition();
      if (!activeDataSourceDef.configuration.configurationAPI) {
        return;
      }
      const {
        factory: configurationAPIFactory
      } = customizationService.get(activeDataSourceDef.configuration.configurationAPI) ?? {};
      if (!configurationAPIFactory) {
        return;
      }
      const configAPI = configurationAPIFactory(activeDataSourceDef.sourceName);
      setConfigurationAPI(configAPI);

      // New configuration API means that the existing configured items must be cleared.
      setConfiguredItems(null);
      configAPI.getConfiguredItems().then(list => {
        if (shouldUpdate) {
          setConfiguredItems(list);
        }
      });
    };
    const sub = extensionManager.subscribe(extensionManager.EVENTS.ACTIVE_DATA_SOURCE_CHANGED, dataSourceChangedCallback);
    dataSourceChangedCallback();
    return () => {
      shouldUpdate = false;
      sub.unsubscribe();
    };
  }, []);
  const showConfigurationModal = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    show({
      content: _DataSourceConfigurationModalComponent__WEBPACK_IMPORTED_MODULE_3__["default"],
      title: t('Configure Data Source'),
      contentProps: {
        configurationAPI,
        configuredItems,
        onHide: hide
      }
    });
  }, [configurationAPI, configuredItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!configurationAPI || !configuredItems) {
      return;
    }
    if (configuredItems.length !== configurationAPI.getItemLabels().length) {
      // Not the correct number of configured items, so show the modal to configure the data source.
      showConfigurationModal();
    }
  }, [configurationAPI, configuredItems, showConfigurationModal]);
  return configuredItems ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-aqua-pale flex items-center overflow-hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.Icon, {
    name: "settings",
    className: "mr-2.5 h-3.5 w-3.5 shrink-0 cursor-pointer",
    onClick: showConfigurationModal
  }), configuredItems.map((item, itemIndex) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: itemIndex,
      className: "flex overflow-hidden"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: itemIndex,
      className: "overflow-hidden text-ellipsis whitespace-nowrap"
    }, item.name), itemIndex !== configuredItems.length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "px-2.5"
    }, "|"));
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null);
}
_s2(DataSourceConfigurationComponent, "bBg3JxcyiXWOlzlRoI7Z61H/OZk=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useModal];
});
_c2 = DataSourceConfigurationComponent;
_s(DataSourceConfigurationComponent, "z/s21Nt7xhJxcAKLYZbmvTdjuqs=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.useModal];
});
_c = DataSourceConfigurationComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataSourceConfigurationComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "DataSourceConfigurationComponent");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "DataSourceConfigurationComponent");

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

/***/ "../../../extensions/default/src/Components/DataSourceConfigurationModalComponent.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/default/src/Components/DataSourceConfigurationModalComponent.tsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ItemListComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ItemListComponent */ "../../../extensions/default/src/Components/ItemListComponent.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();





const NO_WRAP_ELLIPSIS_CLASS_NAMES = 'text-ellipsis whitespace-nowrap overflow-hidden';
function DataSourceConfigurationModalComponent({
  configurationAPI,
  configuredItems,
  onHide
}) {
  _s2();
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('DataSourceConfiguration');
  const [itemList, setItemList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [selectedItems, setSelectedItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(configuredItems);
  const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const [itemLabels] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(configurationAPI.getItemLabels());

  // Determines whether to show the full/existing configuration for the data source.
  // A full or complete configuration is one where the data source (path) has the
  // maximum/required number of path items. Anything less is considered not complete and
  // the configuration starts from scratch (i.e. as if no items are configured at all).
  // TODO: consider configuration starting from a partial (i.e. non-empty) configuration
  const [showFullConfig, setShowFullConfig] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(itemLabels.length === configuredItems.length);

  /**
   * The index of the selected item that is considered current and for which
   * its sub-items should be displayed in the items list component. When the
   * full/existing configuration for a data source is to be shown, the current
   * selected item is the second to last in the `selectedItems` list.
   */
  const currentSelectedItemIndex = showFullConfig ? selectedItems.length - 2 : selectedItems.length - 1;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let shouldUpdate = true;
    setErrorMessage(null);

    // Clear out the former/old list while we fetch the next sub item list.
    setItemList(null);
    if (selectedItems.length === 0) {
      configurationAPI.initialize().then(items => {
        if (shouldUpdate) {
          setItemList(items);
        }
      }).catch(error => setErrorMessage(error.message));
    } else if (!showFullConfig && selectedItems.length === itemLabels.length) {
      // The last item to configure the data source (path) has been selected.
      configurationAPI.setCurrentItem(selectedItems[selectedItems.length - 1]);
      // We can hide the modal dialog now.
      onHide();
    } else {
      configurationAPI.setCurrentItem(selectedItems[currentSelectedItemIndex]).then(items => {
        if (shouldUpdate) {
          setItemList(items);
        }
      }).catch(error => setErrorMessage(error.message));
    }
    return () => {
      shouldUpdate = false;
    };
  }, [selectedItems, configurationAPI, onHide, itemLabels, showFullConfig, currentSelectedItemIndex]);
  const getSelectedItemCursorClasses = itemIndex => itemIndex !== itemLabels.length - 1 && itemIndex < selectedItems.length ? 'cursor-pointer' : 'cursor-auto';
  const getSelectedItemBackgroundClasses = itemIndex => itemIndex < selectedItems.length ? classnames__WEBPACK_IMPORTED_MODULE_0___default()('bg-black/[.4]', itemIndex !== itemLabels.length - 1 ? 'hover:bg-transparent active:bg-secondary-dark' : '') : 'bg-transparent';
  const getSelectedItemBorderClasses = itemIndex => itemIndex === currentSelectedItemIndex + 1 ? classnames__WEBPACK_IMPORTED_MODULE_0___default()('border-2', 'border-solid', 'border-primary-light') : itemIndex < selectedItems.length ? 'border border-solid border-primary-active hover:border-primary-light active:border-white' : 'border border-dashed border-secondary-light';
  const getSelectedItemTextClasses = itemIndex => itemIndex <= selectedItems.length ? 'text-primary-light' : 'text-primary-active';
  const getErrorComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "flex min-h-[1px] grow flex-col gap-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "text-primary-light text-[20px]"
    }, t(`Error fetching ${itemLabels[selectedItems.length]} list`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "grow bg-black p-4 text-[14px]"
    }, errorMessage));
  };
  const getSelectedItemsComponent = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: "flex gap-4"
    }, itemLabels.map((itemLabel, itemLabelIndex) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        key: itemLabel,
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('flex min-w-[1px] shrink basis-[200px] flex-col gap-1 rounded-md p-3.5', getSelectedItemCursorClasses(itemLabelIndex), getSelectedItemBackgroundClasses(itemLabelIndex), getSelectedItemBorderClasses(itemLabelIndex), getSelectedItemTextClasses(itemLabelIndex)),
        onClick: showFullConfig && itemLabelIndex < currentSelectedItemIndex || itemLabelIndex <= currentSelectedItemIndex ? () => {
          setShowFullConfig(false);
          setSelectedItems(theList => theList.slice(0, itemLabelIndex));
        } : undefined
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: "text- flex items-center gap-2"
      }, itemLabelIndex < selectedItems.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
        name: "status-tracked"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
        name: "status-untracked"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(NO_WRAP_ELLIPSIS_CLASS_NAMES)
      }, t(itemLabel))), itemLabelIndex < selectedItems.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('text-[14px] text-white', NO_WRAP_ELLIPSIS_CLASS_NAMES)
      }, selectedItems[itemLabelIndex].name) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("br", null));
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex h-[calc(100vh-300px)] select-none flex-col gap-4 pt-0.5"
  }, getSelectedItemsComponent(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "h-0.5 w-full shrink-0 bg-black"
  }), errorMessage ? getErrorComponent() : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ItemListComponent__WEBPACK_IMPORTED_MODULE_4__["default"], {
    itemLabel: itemLabels[currentSelectedItemIndex + 1],
    itemList: itemList,
    onItemClicked: item => {
      setShowFullConfig(false);
      setSelectedItems(theList => [...theList.slice(0, currentSelectedItemIndex + 1), item]);
    }
  }));
}
_s2(DataSourceConfigurationModalComponent, "4U1nWu0JHjOrcSK6xCxSs7RNCkQ=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c2 = DataSourceConfigurationModalComponent;
_s(DataSourceConfigurationModalComponent, "7VJrzno7BwV8C5KB6URPAzyaOAY=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c = DataSourceConfigurationModalComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataSourceConfigurationModalComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "DataSourceConfigurationModalComponent");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "DataSourceConfigurationModalComponent");

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

/***/ "../../../extensions/default/src/Components/ItemListComponent.tsx":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/Components/ItemListComponent.tsx ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




function ItemListComponent({
  itemLabel,
  itemList,
  onItemClicked
}) {
  _s2();
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('DataSourceConfiguration');
  const [filterValue, setFilterValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setFilterValue('');
  }, [itemList]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex min-h-[1px] grow flex-col gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-primary-light text-[20px]"
  }, t(`Select ${itemLabel}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.InputFilterText, {
    className: "max-w-[40%] grow",
    value: filterValue,
    onDebounceChange: setFilterValue,
    placeholder: t(`Search ${itemLabel} list`)
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "relative flex min-h-[1px] grow flex-col bg-black text-[14px]"
  }, itemList == null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.LoadingIndicatorProgress, {
    className: 'h-full w-full'
  }) : itemList.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "text-primary-light flex h-full flex-col items-center justify-center px-6 py-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
    name: "magnifier",
    className: "mb-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", null, t(`No ${itemLabel} available`))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "bg-secondary-dark px-3 py-1.5 text-white"
  }, t(itemLabel)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "ohif-scrollbar overflow-auto"
  }, itemList.filter(item => !filterValue || item.name.toLowerCase().includes(filterValue.toLowerCase())).map(item => {
    const border = 'rounded border-transparent border-b-secondary-light border-[1px] hover:border-primary-light';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_0___default()('hover:text-primary-light hover:bg-primary-dark group mx-2 flex items-center justify-between px-6 py-2', border),
      key: item.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
      onClick: () => onItemClicked(item),
      className: "invisible group-hover:visible",
      endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.Icon, {
        name: "arrow-left"
      })
    }, t('Select')));
  })))));
}
_s2(ItemListComponent, "ReeOvurdrGYU6IabnDSBH9JQZ0o=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c2 = ItemListComponent;
_s(ItemListComponent, "rR5I8PISI1wRZUp/QMr48ilhIFM=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c = ItemListComponent;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemListComponent);
var _c;
__webpack_require__.$Refresh$.register(_c, "ItemListComponent");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ItemListComponent");

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

/***/ "../../../extensions/default/src/Components/LineChartViewport/LineChartViewport.tsx":
/*!******************************************************************************************!*\
  !*** ../../../extensions/default/src/Components/LineChartViewport/LineChartViewport.tsx ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LineChartViewport)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const LineChartViewport = ({
  displaySets
}) => {
  const displaySet = displaySets[0];
  const {
    axis: chartAxis,
    series: chartSeries
  } = displaySet.instance.chartData;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.LineChart, {
    showLegend: true,
    legendWidth: 150,
    axis: {
      x: {
        label: chartAxis.x.label,
        indexRef: 0,
        type: 'x',
        range: {
          min: 0
        }
      },
      y: {
        label: chartAxis.y.label,
        indexRef: 1,
        type: 'y'
      }
    },
    series: chartSeries
  });
};
_c2 = LineChartViewport;
_c = LineChartViewport;

var _c;
__webpack_require__.$Refresh$.register(_c, "LineChartViewport");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "LineChartViewport");

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

/***/ "../../../extensions/default/src/Components/LineChartViewport/index.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/default/src/Components/LineChartViewport/index.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _LineChartViewport__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _LineChartViewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineChartViewport */ "../../../extensions/default/src/Components/LineChartViewport/LineChartViewport.tsx");
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

/***/ "../../../extensions/default/src/Components/ProgressDropdownWithService.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/Components/ProgressDropdownWithService.tsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProgressDropdownWithService: () => (/* binding */ ProgressDropdownWithService)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();


const workflowStepsToDropdownOptions = (steps = []) => steps.map(step => ({
  label: step.name,
  value: step.id,
  info: step.info,
  activated: false,
  completed: false
}));
function ProgressDropdownWithService({
  servicesManager
}) {
  _s2();
  _s();
  const {
    workflowStepsService
  } = servicesManager.services;
  const [activeStepId, setActiveStepId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(workflowStepsService.activeWorkflowStep?.id);
  const [dropdownOptions, setDropdownOptions] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(workflowStepsToDropdownOptions(workflowStepsService.workflowSteps));
  const setCurrentAndPreviousOptionsAsCompleted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(currentOption => {
    if (currentOption.completed) {
      return;
    }
    setDropdownOptions(prevOptions => {
      const newOptionsState = [...prevOptions];
      const startIndex = newOptionsState.findIndex(option => option.value === currentOption.value);
      for (let i = startIndex; i >= 0; i--) {
        const option = newOptionsState[i];
        if (option.completed) {
          break;
        }
        newOptionsState[i] = {
          ...option,
          completed: true
        };
      }
      return newOptionsState;
    });
  }, []);
  const handleDropdownChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    selectedOption
  }) => {
    if (!selectedOption) {
      return;
    }

    // TODO: Steps should be marked as completed after user has
    // completed some action when required (not implemented)
    setCurrentAndPreviousOptionsAsCompleted(selectedOption);
    setActiveStepId(selectedOption.value);
  }, [setCurrentAndPreviousOptionsAsCompleted]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let timeoutId;
    if (activeStepId) {
      // We've used setTimeout to give it more time to update the UI since
      // create3DFilterableFromDataArray from Texture.js may take 600+ ms to run
      // when there is a new series to load in the next step but that resulted
      // in the followed React error when updating the content from left/right panels
      // and all component states were being lost:
      //   Error: Can't perform a React state update on an unmounted component
      workflowStepsService.setActiveWorkflowStep(activeStepId);
    }
    return () => clearTimeout(timeoutId);
  }, [activeStepId, workflowStepsService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe: unsubStepsChanged
    } = workflowStepsService.subscribe(workflowStepsService.EVENTS.STEPS_CHANGED, () => setDropdownOptions(workflowStepsToDropdownOptions(workflowStepsService.workflowSteps)));
    const {
      unsubscribe: unsubActiveStepChanged
    } = workflowStepsService.subscribe(workflowStepsService.EVENTS.ACTIVE_STEP_CHANGED, () => setActiveStepId(workflowStepsService.activeWorkflowStep.id));
    return () => {
      unsubStepsChanged();
      unsubActiveStepChanged();
    };
  }, [servicesManager, workflowStepsService]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ProgressDropdown, {
    options: dropdownOptions,
    value: activeStepId,
    onChange: handleDropdownChange
  });
}
_s2(ProgressDropdownWithService, "ZbOTG1EasY9xNRYzmUyrwececqo=");
_c2 = ProgressDropdownWithService;
_s(ProgressDropdownWithService, "ZbOTG1EasY9xNRYzmUyrwececqo=");
_c = ProgressDropdownWithService;
var _c;
__webpack_require__.$Refresh$.register(_c, "ProgressDropdownWithService");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ProgressDropdownWithService");

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

/***/ "../../../extensions/default/src/Components/SidePanelWithServices.tsx":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/Components/SidePanelWithServices.tsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
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


const SidePanelWithServices = ({
  servicesManager,
  side,
  activeTabIndex: activeTabIndexProp,
  tabs: tabsProp,
  expandedWidth,
  ...props
}) => {
  _s2();
  _s();
  const panelService = servicesManager?.services?.panelService;

  // Tracks whether this SidePanel has been opened at least once since this SidePanel was inserted into the DOM.
  // Thus going to the Study List page and back to the viewer resets this flag for a SidePanel.
  const [sidePanelOpen, setSidePanelOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(activeTabIndexProp !== null);
  const [activeTabIndex, setActiveTabIndex] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(activeTabIndexProp);
  const [tabs, setTabs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(tabsProp ?? panelService.getPanels(side));
  const handleActiveTabIndexChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    activeTabIndex
  }) => {
    setActiveTabIndex(activeTabIndex);
    setSidePanelOpen(activeTabIndex !== null);
  }, []);
  const handleOpen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setSidePanelOpen(true);
    // If panel is being opened but no tab is active, set first tab as active
    if (activeTabIndex === null && tabs.length > 0) {
      setActiveTabIndex(0);
    }
  }, [activeTabIndex, tabs]);
  const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setSidePanelOpen(false);
    setActiveTabIndex(null);
  }, []);

  /** update the active tab index from outside */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setActiveTabIndex(activeTabIndexProp);
  }, [activeTabIndexProp]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = panelService.subscribe(panelService.EVENTS.PANELS_CHANGED, panelChangedEvent => {
      if (panelChangedEvent.position !== side) {
        return;
      }
      setTabs(panelService.getPanels(side));
    });
    return () => {
      unsubscribe();
    };
  }, [panelService, side]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const activatePanelSubscription = panelService.subscribe(panelService.EVENTS.ACTIVATE_PANEL, activatePanelEvent => {
      if (sidePanelOpen || activatePanelEvent.forceActive) {
        const tabIndex = tabs.findIndex(tab => tab.id === activatePanelEvent.panelId);
        if (tabIndex !== -1) {
          setActiveTabIndex(tabIndex);
        }
      }
    });
    return () => {
      activatePanelSubscription.unsubscribe();
    };
  }, [tabs, sidePanelOpen, panelService]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.SidePanel, _extends({}, props, {
    side: side,
    tabs: tabs,
    activeTabIndex: activeTabIndex,
    onOpen: handleOpen,
    onClose: handleClose,
    onActiveTabIndexChange: handleActiveTabIndexChange,
    expandedWidth: expandedWidth
  }));
};
_s2(SidePanelWithServices, "GdtgtA/NtyMR+BVavm+FaL9ySRI=");
_c2 = SidePanelWithServices;
_s(SidePanelWithServices, "GdtgtA/NtyMR+BVavm+FaL9ySRI=");
_c = SidePanelWithServices;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidePanelWithServices);
var _c;
__webpack_require__.$Refresh$.register(_c, "SidePanelWithServices");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "SidePanelWithServices");

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

/***/ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContextMenuController)
/* harmony export */ });
/* harmony import */ var _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenuItemsBuilder */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
/* harmony import */ var _platform_ui_src_components_ContextMenu_ContextMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../platform/ui/src/components/ContextMenu/ContextMenu */ "../../ui/src/components/ContextMenu/ContextMenu.tsx");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _ContextMenuController;



/**
 * The context menu controller is a helper class that knows how
 * to manage context menus based on the UI Customization Service.
 * There are a few parts to this:
 *    1. Basic controls to manage displaying and hiding context menus
 *    2. Menu selection services, which use the UI customization service
 *       to choose which menu to display
 *    3. Menu item adapter services to convert menu items into displayable and actionable items.
 *
 * The format for a menu is defined in the exported type MenuItem
 */
class ContextMenuController {
  constructor(servicesManager, commandsManager) {
    this.commandsManager = void 0;
    this.services = void 0;
    this.menuItems = void 0;
    this.services = servicesManager.services;
    this.commandsManager = commandsManager;
  }
  closeContextMenu() {
    this.services.uiDialogService.dismiss({
      id: 'context-menu'
    });
  }

  /**
   * Figures out which context menu is appropriate to display and shows it.
   *
   * @param contextMenuProps - the context menu properties, see ./types.ts
   * @param viewportElement - the DOM element this context menu is related to
   * @param defaultPointsPosition - a default position to show the context menu
   */
  showContextMenu(contextMenuProps, viewportElement, defaultPointsPosition) {
    if (!this.services.uiDialogService) {
      console.warn('Unable to show dialog; no UI Dialog Service available.');
      return;
    }
    const {
      event,
      subMenu,
      menuId,
      menus,
      selectorProps
    } = contextMenuProps;
    const annotationManager = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.state.getAnnotationManager();
    const {
      locking
    } = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation;
    const targetAnnotationId = selectorProps?.nearbyToolData?.annotationUID;
    const isLocked = locking.isAnnotationLocked(annotationManager.getAnnotation(targetAnnotationId));
    if (isLocked) {
      console.warn('Annotation is locked.');
      return;
    }
    const items = _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_0__.getMenuItems(selectorProps || contextMenuProps, event, menus, menuId);
    this.services.uiDialogService.dismiss({
      id: 'context-menu'
    });
    this.services.uiDialogService.create({
      id: 'context-menu',
      isDraggable: false,
      preservePosition: false,
      preventCutOf: true,
      defaultPosition: ContextMenuController._getDefaultPosition(defaultPointsPosition, event?.detail, viewportElement),
      event,
      content: _platform_ui_src_components_ContextMenu_ContextMenu__WEBPACK_IMPORTED_MODULE_1__["default"],
      // This naming is part of the uiDialogService convention
      // Clicking outside simply closes the dialog box.
      onClickOutside: () => this.services.uiDialogService.dismiss({
        id: 'context-menu'
      }),
      contentProps: {
        items,
        selectorProps,
        menus,
        event,
        subMenu,
        eventData: event?.detail,
        onClose: () => {
          this.services.uiDialogService.dismiss({
            id: 'context-menu'
          });
        },
        /**
         * Displays a sub-menu, removing this menu
         * @param {*} item
         * @param {*} itemRef
         * @param {*} subProps
         */
        onShowSubMenu: (item, itemRef, subProps) => {
          if (!itemRef.subMenu) {
            console.warn('No submenu defined for', item, itemRef, subProps);
            return;
          }
          this.showContextMenu({
            ...contextMenuProps,
            menuId: itemRef.subMenu
          }, viewportElement, defaultPointsPosition);
        },
        // Default is to run the specified commands.
        onDefault: (item, itemRef, subProps) => {
          this.commandsManager.run(item, {
            ...selectorProps,
            ...itemRef,
            subProps
          });
        }
      }
    });
  }
}
_ContextMenuController = ContextMenuController;
ContextMenuController.getDefaultPosition = () => {
  return {
    x: 0,
    y: 0
  };
};
ContextMenuController._getEventDefaultPosition = eventDetail => ({
  x: eventDetail && eventDetail.currentPoints.client[0],
  y: eventDetail && eventDetail.currentPoints.client[1]
});
ContextMenuController._getElementDefaultPosition = element => {
  if (element) {
    const boundingClientRect = element.getBoundingClientRect();
    return {
      x: boundingClientRect.x,
      y: boundingClientRect.y
    };
  }
  return {
    x: undefined,
    y: undefined
  };
};
ContextMenuController._getCanvasPointsPosition = (points = [], element) => {
  const viewerPos = _ContextMenuController._getElementDefaultPosition(element);
  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const point = {
      x: points[pointIndex][0] || points[pointIndex]['x'],
      y: points[pointIndex][1] || points[pointIndex]['y']
    };
    if (_ContextMenuController._isValidPosition(point) && _ContextMenuController._isValidPosition(viewerPos)) {
      return {
        x: point.x + viewerPos.x,
        y: point.y + viewerPos.y
      };
    }
  }
};
ContextMenuController._isValidPosition = source => {
  return source && typeof source.x === 'number' && typeof source.y === 'number';
};
/**
 * Returns the context menu default position. It look for the positions of: canvasPoints (got from selected), event that triggers it, current viewport element
 */
ContextMenuController._getDefaultPosition = (canvasPoints, eventDetail, viewerElement) => {
  function* getPositionIterator() {
    yield _ContextMenuController._getCanvasPointsPosition(canvasPoints, viewerElement);
    yield _ContextMenuController._getEventDefaultPosition(eventDetail);
    yield _ContextMenuController._getElementDefaultPosition(viewerElement);
    yield _ContextMenuController.getDefaultPosition();
  }
  const positionIterator = getPositionIterator();
  let current = positionIterator.next();
  let position = current.value;
  while (!current.done) {
    position = current.value;
    if (_ContextMenuController._isValidPosition(position)) {
      positionIterator.return();
    }
    current = positionIterator.next();
  }
  return position;
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

/***/ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts":
/*!******************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adaptItem: () => (/* binding */ adaptItem),
/* harmony export */   findMenu: () => (/* binding */ findMenu),
/* harmony export */   findMenuById: () => (/* binding */ findMenuById),
/* harmony export */   findMenuDefault: () => (/* binding */ findMenuDefault),
/* harmony export */   getMenuItems: () => (/* binding */ getMenuItems)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Finds menu by menu id
 *
 * @returns Menu having the menuId
 */
function findMenuById(menus, menuId) {
  if (!menuId) {
    return;
  }
  return menus.find(menu => menu.id === menuId);
}

/**
 * Default finding menu method.  This method will go through
 * the list of menus until it finds the first one which
 * has no selector, OR has the selector, when applied to the
 * check props, return true.
 * The selectorProps are a set of provided properties which can be
 * passed into the selector function to determine when to display a menu.
 * For example, a selector function of:
 * `({displayset}) => displaySet?.SeriesDescription?.indexOf?.('Left')!==-1
 * would match series descriptions containing 'Left'.
 *
 * @param {Object[]} menus List of menus
 * @param {*} subProps
 * @returns
 */
function findMenuDefault(menus, subProps) {
  if (!menus) {
    return null;
  }
  return menus.find(menu => !menu.selector || menu.selector(subProps.selectorProps));
}

/**
 * Finds the menu to be used for different scenarios:
 * This will first look for a subMenu with the specified subMenuId
 * Next it will look for the first menu whose selector returns true.
 *
 * @param menus - List of menus
 * @param props - root props
 * @param menuIdFilter - menu id identifier (to be considered on selection)
 *      This is intended to support other types of filtering in the future.
 */
function findMenu(menus, props, menuIdFilter) {
  const {
    subMenu
  } = props;
  function* findMenuIterator() {
    yield findMenuById(menus, menuIdFilter || subMenu);
    yield findMenuDefault(menus, props);
  }
  const findIt = findMenuIterator();
  let current = findIt.next();
  let menu = current.value;
  while (!current.done) {
    menu = current.value;
    if (menu) {
      findIt.return();
    }
    current = findIt.next();
  }
  return menu;
}

/**
 * Returns the menu from a list of possible menus, based on the actual state of component props and tool data nearby.
 * This uses the findMenu command above to first find the appropriate
 * menu, and then it chooses the actual contents of that menu.
 * A menu item can be optional by implementing the 'selector',
 * which will be called with the selectorProps, and if it does not return true,
 * then the item is excluded.
 *
 * Other menus can be delegated to by setting the delegating value to
 * a string id for another menu.  That menu's content will replace the
 * current menu item (only if the item would be included).
 *
 * This allows single id menus to be chosen by id, but have varying contents
 * based on the delegated menus.
 *
 * Finally, for each item, the adaptItem call is made.  This allows
 * items to modify themselves before being displayed, such as
 * incorporating additional information from translation sources.
 * See the `test-mode` examples for details.
 *
 * @param selectorProps
 * @param {*} event event that originates the context menu
 * @param {*} menus List of menus
 * @param {*} menuIdFilter
 * @returns
 */
function getMenuItems(selectorProps, event, menus, menuIdFilter) {
  // Include both the check props and the ...check props as one is used
  // by the child menu and the other used by the selector function
  const subProps = {
    selectorProps,
    event
  };
  const menu = findMenu(menus, subProps, menuIdFilter);
  if (!menu) {
    return undefined;
  }
  if (!menu.items) {
    console.warn('Must define items in menu', menu);
    return [];
  }
  let menuItems = [];
  menu.items.forEach(item => {
    const {
      delegating,
      selector,
      subMenu
    } = item;
    if (!selector || selector(selectorProps)) {
      if (delegating) {
        menuItems = [...menuItems, ...getMenuItems(selectorProps, event, menus, subMenu)];
      } else {
        const toAdd = adaptItem(item, subProps);
        menuItems.push(toAdd);
      }
    }
  });
  return menuItems;
}

/**
 * Returns item adapted to be consumed by ContextMenu component
 * and then goes through the item to add action behaviour for clicking the item,
 * making it compatible with the default ContextMenu display.
 *
 * @param {Object} item
 * @param {Object} subProps
 * @returns a MenuItem that is compatible with the base ContextMenu
 *    This requires having a label and set of actions to be called.
 */
function adaptItem(item, subProps) {
  const newItem = {
    ...item,
    value: subProps.selectorProps?.value
  };
  if (item.actionType === 'ShowSubMenu' && !newItem.iconRight) {
    newItem.iconRight = 'chevron-menu';
  }
  if (!item.action) {
    newItem.action = (itemRef, componentProps) => {
      const {
        event = {}
      } = componentProps;
      const {
        detail = {}
      } = event;
      newItem.element = detail.element;
      componentProps.onClose();
      const action = componentProps[`on${itemRef.actionType || 'Default'}`];
      if (action) {
        action.call(componentProps, newItem, itemRef, subProps);
      } else {
        console.warn('No action defined for', itemRef);
      }
    };
  }
  return newItem;
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

/***/ "../../../extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultContextMenu = {
  id: 'measurementsContextMenu',
  customizationType: 'ohif.contextMenu',
  menus: [
  // Get the items from the UI Customization for the menu name (and have a custom name)
  {
    id: 'forExistingMeasurement',
    selector: ({
      nearbyToolData
    }) => !!nearbyToolData,
    items: [{
      label: 'Delete measurement',
      commands: [{
        commandName: 'deleteMeasurement',
        // we only have support for cornerstoneTools context menu since
        // they are svg based
        context: 'CORNERSTONE'
      }]
    }, {
      label: 'Add Label',
      commands: [{
        commandName: 'setMeasurementLabel'
      }]
    }]
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultContextMenu);

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

/***/ "../../../extensions/default/src/CustomizableContextMenu/index.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/index.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenuController: () => (/* reexport safe */ _ContextMenuController__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ContextMenuItemsBuilder: () => (/* reexport module object */ _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   CustomizableContextMenuTypes: () => (/* reexport module object */ _types__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   defaultContextMenu: () => (/* reexport safe */ _defaultContextMenu__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _ContextMenuController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenuController */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx");
/* harmony import */ var _ContextMenuItemsBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextMenuItemsBuilder */ "../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts");
/* harmony import */ var _defaultContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "../../../extensions/default/src/CustomizableContextMenu/types.ts");
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

/***/ "../../../extensions/default/src/CustomizableContextMenu/types.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/CustomizableContextMenu/types.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/***/ "../../../extensions/default/src/DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI.ts":
/*!***********************************************************************************************************!*\
  !*** ../../../extensions/default/src/DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleCloudDataSourceConfigurationAPI: () => (/* binding */ GoogleCloudDataSourceConfigurationAPI)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * This file contains the implementations of BaseDataSourceConfigurationAPIItem
 * and BaseDataSourceConfigurationAPI for the Google cloud healthcare API. To
 * better understand this implementation and/or to implement custom implementations,
 * see the platform\core\src\types\DataSourceConfigurationAPI.ts and its JS doc
 * comments as a guide.
 */
/**
 * The various Google Cloud Healthcare path item types.
 */
var ItemType = /*#__PURE__*/function (ItemType) {
  ItemType[ItemType["projects"] = 0] = "projects";
  ItemType[ItemType["locations"] = 1] = "locations";
  ItemType[ItemType["datasets"] = 2] = "datasets";
  ItemType[ItemType["dicomStores"] = 3] = "dicomStores";
  return ItemType;
}(ItemType || {});
const initialUrl = 'https://cloudresourcemanager.googleapis.com/v1';
const baseHealthcareUrl = 'https://healthcare.googleapis.com/v1';
class GoogleCloudDataSourceConfigurationAPIItem {
  constructor() {
    this.id = void 0;
    this.name = void 0;
    this.url = void 0;
    this.itemType = void 0;
  }
}
class GoogleCloudDataSourceConfigurationAPI {
  constructor(dataSourceName, servicesManager, extensionManager) {
    this._extensionManager = void 0;
    this._fetchOptions = void 0;
    this._dataSourceName = void 0;
    this.getItemLabels = () => ['Project', 'Location', 'Data set', 'DICOM store'];
    this._dataSourceName = dataSourceName;
    this._extensionManager = extensionManager;
    const userAuthenticationService = servicesManager.services.userAuthenticationService;
    this._fetchOptions = {
      method: 'GET',
      headers: userAuthenticationService.getAuthorizationHeader()
    };
  }
  async initialize() {
    const url = `${initialUrl}/projects`;
    const projects = await GoogleCloudDataSourceConfigurationAPI._doFetch(url, ItemType.projects, this._fetchOptions);
    if (!projects?.length) {
      return [];
    }
    const projectItems = projects.map(project => {
      return {
        id: project.projectId,
        name: project.name,
        itemType: ItemType.projects,
        url: `${baseHealthcareUrl}/projects/${project.projectId}`
      };
    });
    return projectItems;
  }
  async setCurrentItem(anItem) {
    const googleCloudItem = anItem;
    if (googleCloudItem.itemType === ItemType.dicomStores) {
      // Last configurable item, so update the data source configuration.
      const url = `${googleCloudItem.url}/dicomWeb`;
      const dataSourceDefCopy = JSON.parse(JSON.stringify(this._extensionManager.getDataSourceDefinition(this._dataSourceName)));
      dataSourceDefCopy.configuration = {
        ...dataSourceDefCopy.configuration,
        wadoUriRoot: url,
        qidoRoot: url,
        wadoRoot: url
      };
      this._extensionManager.updateDataSourceConfiguration(dataSourceDefCopy.sourceName, dataSourceDefCopy.configuration);
      return [];
    }
    const subItemType = googleCloudItem.itemType + 1;
    const subItemField = `${ItemType[subItemType]}`;
    const url = `${googleCloudItem.url}/${subItemField}`;
    const fetchedSubItems = await GoogleCloudDataSourceConfigurationAPI._doFetch(url, subItemType, this._fetchOptions);
    if (!fetchedSubItems?.length) {
      return [];
    }
    const subItems = fetchedSubItems.map(subItem => {
      const nameSplit = subItem.name.split('/');
      return {
        id: subItem.name,
        name: nameSplit[nameSplit.length - 1],
        itemType: subItemType,
        url: `${baseHealthcareUrl}/${subItem.name}`
      };
    });
    return subItems;
  }
  async getConfiguredItems() {
    const dataSourceDefinition = this._extensionManager.getDataSourceDefinition(this._dataSourceName);
    const url = dataSourceDefinition.configuration.wadoUriRoot;
    const projectsIndex = url.indexOf('projects');
    // Split the configured URL into (essentially) pairs (i.e. item type followed by item)
    // Explicitly: ['projects','aProject','locations','aLocation','datasets','aDataSet','dicomStores','aDicomStore']
    // Note that a partial configuration will have a subset of the above.
    const urlSplit = url.substring(projectsIndex).split('/');
    const configuredItems = [];
    for (let itemType = 0;
    // the number of configured items is either the max (4) or the number extracted from the url split
    itemType < 4 && (itemType + 1) * 2 < urlSplit.length; itemType += 1) {
      if (itemType === ItemType.projects) {
        const projectId = urlSplit[1];
        const projectUrl = `${initialUrl}/projects/${projectId}`;
        const data = await GoogleCloudDataSourceConfigurationAPI._doFetch(projectUrl, ItemType.projects, this._fetchOptions);
        const project = data[0];
        configuredItems.push({
          id: project.projectId,
          name: project.name,
          itemType: itemType,
          url: `${baseHealthcareUrl}/projects/${project.projectId}`
        });
      } else {
        const relativePath = urlSplit.slice(0, itemType * 2 + 2).join('/');
        configuredItems.push({
          id: relativePath,
          name: urlSplit[itemType * 2 + 1],
          itemType: itemType,
          url: `${baseHealthcareUrl}/${relativePath}`
        });
      }
    }
    return configuredItems;
  }

  /**
   * Fetches an array of items the specified item type.
   * @param urlStr the fetch url
   * @param fetchItemType the type to fetch
   * @param fetchOptions the header options for the fetch (e.g. authorization header)
   * @param fetchSearchParams any search query params; currently only used for paging results
   * @returns an array of items of the specified type
   */
  static async _doFetch(urlStr, fetchItemType, fetchOptions = {}, fetchSearchParams = {}) {
    try {
      const url = new URL(urlStr);
      url.search = new URLSearchParams(fetchSearchParams).toString();
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      if (response.status >= 200 && response.status < 300 && data != null) {
        if (data.nextPageToken != null) {
          fetchSearchParams.pageToken = data.nextPageToken;
          const subPageData = await this._doFetch(urlStr, fetchItemType, fetchOptions, fetchSearchParams);
          data[ItemType[fetchItemType]] = data[ItemType[fetchItemType]].concat(subPageData);
        }
        if (data[ItemType[fetchItemType]]) {
          return data[ItemType[fetchItemType]];
        } else if (data.name) {
          return [data];
        } else {
          return [];
        }
      } else {
        const message = data?.error?.message || `Error returned from Google Cloud Healthcare: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }
    } catch (err) {
      const message = err?.message || 'Error occurred during fetch request.';
      throw new Error(message);
    }
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

/***/ "../../../extensions/default/src/DicomJSONDataSource/index.js":
/*!********************************************************************!*\
  !*** ../../../extensions/default/src/DicomJSONDataSource/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomJSONApi: () => (/* binding */ createDicomJSONApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ "../../../node_modules/query-string/index.js");
/* harmony import */ var _DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DicomWebDataSource/utils/getImageId */ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js");
/* harmony import */ var _utils_getDirectURL__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getDirectURL */ "../../../extensions/default/src/utils/getDirectURL.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
const mappings = {
  studyInstanceUid: 'StudyInstanceUID',
  patientId: 'PatientID'
};
let _store = {
  urls: [],
  studyInstanceUIDMap: new Map() // map of urls to array of study instance UIDs
  // {
  //   url: url1
  //   studies: [Study1, Study2], // if multiple studies
  // }
  // {
  //   url: url2
  //   studies: [Study1],
  // }
  // }
};
function wrapSequences(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively wrap sequences for nested objects
      acc[key] = wrapSequences(obj[key]);
    } else {
      acc[key] = obj[key];
    }
    if (key.endsWith('Sequence')) {
      acc[key] = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].utils.addAccessors(acc[key]);
    }
    return acc;
  }, Array.isArray(obj) ? [] : {});
}
const getMetaDataByURL = url => {
  return _store.urls.find(metaData => metaData.url === url);
};
const findStudies = (key, value) => {
  let studies = [];
  _store.urls.map(metaData => {
    metaData.studies.map(aStudy => {
      if (aStudy[key] === value) {
        studies.push(aStudy);
      }
    });
  });
  return studies;
};
function createDicomJSONApi(dicomJsonConfig) {
  const implementation = {
    initialize: async ({
      query,
      url
    }) => {
      if (!url) {
        url = query.get('url');
      }
      let metaData = getMetaDataByURL(url);

      // if we have already cached the data from this specific url
      // We are only handling one StudyInstanceUID to run; however,
      // all studies for patientID will be put in the correct tab
      if (metaData) {
        return metaData.studies.map(aStudy => {
          return aStudy.StudyInstanceUID;
        });
      }
      const response = await fetch(url);
      const data = await response.json();
      let StudyInstanceUID;
      let SeriesInstanceUID;
      data.studies.forEach(study => {
        StudyInstanceUID = study.StudyInstanceUID;
        study.series.forEach(series => {
          SeriesInstanceUID = series.SeriesInstanceUID;
          series.instances.forEach(instance => {
            const {
              metadata: naturalizedDicom
            } = instance;
            const imageId = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
              instance,
              config: dicomJsonConfig
            });
            const {
              query
            } = query_string__WEBPACK_IMPORTED_MODULE_1__.parseUrl(instance.url);

            // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
            metadataProvider.addImageIdToUIDs(imageId, {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID: naturalizedDicom.SOPInstanceUID,
              frameNumber: query.frame ? parseInt(query.frame) : undefined
            });
          });
        });
      });
      _store.urls.push({
        url,
        studies: [...data.studies]
      });
      _store.studyInstanceUIDMap.set(url, data.studies.map(study => study.StudyInstanceUID));
    },
    query: {
      studies: {
        mapParams: () => {},
        search: async param => {
          const [key, value] = Object.entries(param)[0];
          const mappedParam = mappings[key];

          // todo: should fetch from dicomMetadataStore
          const studies = findStudies(mappedParam, value);
          return studies.map(aStudy => {
            return {
              accession: aStudy.AccessionNumber,
              date: aStudy.StudyDate,
              description: aStudy.StudyDescription,
              instances: aStudy.NumInstances,
              modalities: aStudy.Modalities,
              mrn: aStudy.PatientID,
              patientName: aStudy.PatientName,
              studyInstanceUid: aStudy.StudyInstanceUID,
              NumInstances: aStudy.NumInstances,
              time: aStudy.StudyTime
            };
          });
        },
        processResults: () => {
          console.warn(' DICOMJson QUERY processResults not implemented');
        }
      },
      series: {
        // mapParams: mapParams.bind(),
        search: () => {
          console.warn(' DICOMJson QUERY SERIES SEARCH not implemented');
        }
      },
      instances: {
        search: () => {
          console.warn(' DICOMJson QUERY instances SEARCH not implemented');
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {string} params.defaultPath path for the pixel data url
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @param {string} params.fetchPart unknown?
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */
      directURL: params => {
        return (0,_utils_getDirectURL__WEBPACK_IMPORTED_MODULE_3__["default"])(dicomJsonConfig, params);
      },
      series: {
        metadata: async ({
          filters,
          StudyInstanceUID,
          madeInClient = false,
          customSort
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          const study = findStudies('StudyInstanceUID', StudyInstanceUID)[0];
          let series;
          if (customSort) {
            series = customSort(study.series);
          } else {
            series = study.series;
          }
          const seriesKeys = ['SeriesInstanceUID', 'SeriesInstanceUIDs', 'seriesInstanceUID', 'seriesInstanceUIDs'];
          const seriesFilter = seriesKeys.find(key => filters[key]);
          if (seriesFilter) {
            const seriesUIDs = filters[seriesFilter];
            series = series.filter(s => seriesUIDs.includes(s.SeriesInstanceUID));
          }
          const seriesSummaryMetadata = series.map(series => {
            const seriesSummary = {
              StudyInstanceUID: study.StudyInstanceUID,
              ...series
            };
            delete seriesSummary.instances;
            return seriesSummary;
          });

          // Async load series, store as retrieved
          function storeInstances(naturalizedInstances) {
            _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
          }
          _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
          function setSuccessFlag() {
            const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID, madeInClient);
            study.isLoaded = true;
          }
          const numberOfSeries = series.length;
          series.forEach((series, index) => {
            const instances = series.instances.map(instance => {
              // for instance.metadata if the key ends with sequence then
              // we need to add a proxy to the first item in the sequence
              // so that we can access the value of the sequence
              // by using sequenceName.value
              const modifiedMetadata = wrapSequences(instance.metadata);
              const obj = {
                ...modifiedMetadata,
                url: instance.url,
                imageId: (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
                  instance,
                  config: dicomJsonConfig
                }),
                ...series,
                ...study
              };
              delete obj.instances;
              delete obj.series;
              return obj;
            });
            storeInstances(instances);
            if (index === numberOfSeries - 1) {
              setSuccessFlag();
            }
          });
        }
      }
    },
    store: {
      dicom: () => {
        console.warn(' DICOMJson store dicom not implemented');
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      const {
        StudyInstanceUID,
        SeriesInstanceUID
      } = displaySet;
      const study = findStudies('StudyInstanceUID', StudyInstanceUID)[0];
      const series = study.series.find(s => s.SeriesInstanceUID === SeriesInstanceUID) || [];
      const instanceMap = new Map();
      series.instances.forEach(instance => {
        if (instance?.metadata?.SOPInstanceUID) {
          const {
            metadata,
            url
          } = instance;
          const existingInstances = instanceMap.get(metadata.SOPInstanceUID) || [];
          existingInstances.push({
            ...metadata,
            url
          });
          instanceMap.set(metadata.SOPInstanceUID, existingInstances);
        }
      });
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames || 1;
        const instances = instanceMap.get(instance.SOPInstanceUID) || [instance];
        for (let i = 0; i < NumberOfFrames; i++) {
          const imageId = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
            instance: instances[Math.min(i, instances.length - 1)],
            frame: NumberOfFrames > 1 ? i : undefined,
            config: dicomJsonConfig
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame
    }) {
      const imageIds = (0,_DicomWebDataSource_utils_getImageId__WEBPACK_IMPORTED_MODULE_2__["default"])({
        instance,
        frame
      });
      return imageIds;
    },
    getStudyInstanceUIDs: ({
      params,
      query
    }) => {
      const url = query.get('url');
      return _store.studyInstanceUIDMap.get(url);
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/DicomLocalDataSource/index.js":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/DicomLocalDataSource/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomLocalApi: () => (/* binding */ createDicomLocalApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
const {
  EVENTS
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore;
const END_MODALITIES = {
  SR: true,
  SEG: true,
  DOC: true
};
const compareValue = (v1, v2, def = 0) => {
  if (v1 === v2) {
    return def;
  }
  if (v1 < v2) {
    return -1;
  }
  return 1;
};

// Sorting SR modalities to be at the end of series list
const customSort = (seriesA, seriesB) => {
  const instanceA = seriesA.instances[0];
  const instanceB = seriesB.instances[0];
  const modalityA = instanceA.Modality;
  const modalityB = instanceB.Modality;
  const isEndA = END_MODALITIES[modalityA];
  const isEndB = END_MODALITIES[modalityB];
  if (isEndA && isEndB) {
    // Compare by series date
    return compareValue(instanceA.SeriesNumber, instanceB.SeriesNumber);
  }
  if (!isEndA && !isEndB) {
    return compareValue(instanceB.SeriesNumber, instanceA.SeriesNumber);
  }
  return isEndA ? -1 : 1;
};
function createDicomLocalApi(dicomLocalConfig) {
  const {
    name
  } = dicomLocalConfig;
  const implementation = {
    initialize: ({
      params,
      query
    }) => {},
    query: {
      studies: {
        mapParams: () => {},
        search: params => {
          const studyUIDs = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudyInstanceUIDs();
          return studyUIDs.map(StudyInstanceUID => {
            let numInstances = 0;
            const modalities = new Set();

            // Calculating the number of instances in the study and modalities
            // present in the study
            const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
            study.series.forEach(aSeries => {
              numInstances += aSeries.instances.length;
              modalities.add(aSeries.instances[0].Modality);
            });

            // first instance in the first series
            const firstInstance = study?.series[0]?.instances[0];
            if (firstInstance) {
              return {
                accession: firstInstance.AccessionNumber,
                date: firstInstance.StudyDate,
                description: firstInstance.StudyDescription,
                mrn: firstInstance.PatientID,
                patientName: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatPN(firstInstance.PatientName),
                studyInstanceUid: firstInstance.StudyInstanceUID,
                time: firstInstance.StudyTime,
                //
                instances: numInstances,
                modalities: Array.from(modalities).join('/'),
                NumInstances: numInstances
              };
            }
          });
        },
        processResults: () => {
          console.warn(' DICOMLocal QUERY processResults not implemented');
        }
      },
      series: {
        search: studyInstanceUID => {
          const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(studyInstanceUID);
          return study.series.map(aSeries => {
            const firstInstance = aSeries?.instances[0];
            return {
              studyInstanceUid: studyInstanceUID,
              seriesInstanceUid: firstInstance.SeriesInstanceUID,
              modality: firstInstance.Modality,
              seriesNumber: firstInstance.SeriesNumber,
              seriesDate: firstInstance.SeriesDate,
              numSeriesInstances: aSeries.instances.length,
              description: firstInstance.SeriesDescription
            };
          });
        }
      },
      instances: {
        search: () => {
          console.warn(' DICOMLocal QUERY instances SEARCH not implemented');
        }
      }
    },
    retrieve: {
      directURL: params => {
        const {
          instance,
          tag,
          defaultType
        } = params;
        const value = instance[tag];
        if (value instanceof Array && value[0] instanceof ArrayBuffer) {
          return URL.createObjectURL(new Blob([value[0]], {
            type: defaultType
          }));
        }
      },
      series: {
        metadata: async ({
          StudyInstanceUID,
          madeInClient = false
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }

          // Instances metadata already added via local upload
          const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID, madeInClient);

          // Series metadata already added via local upload
          _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore._broadcastEvent(EVENTS.SERIES_ADDED, {
            StudyInstanceUID,
            madeInClient
          });
          study.series.forEach(aSeries => {
            const {
              SeriesInstanceUID
            } = aSeries;
            aSeries.instances.forEach(instance => {
              const {
                url: imageId,
                StudyInstanceUID,
                SeriesInstanceUID,
                SOPInstanceUID
              } = instance;
              instance.imageId = imageId;
              const numberOfFrames = instance.NumberOfFrames || 1;
              // Process all frames consistently, whether single or multiframe
              for (let i = 0; i < numberOfFrames; i++) {
                const frameNumber = i + 1;
                const frameImageId = implementation.getImageIdsForInstance({
                  instance,
                  frame: frameNumber
                });
                // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
                metadataProvider.addImageIdToUIDs(frameImageId, {
                  StudyInstanceUID,
                  SeriesInstanceUID,
                  SOPInstanceUID,
                  frameNumber: numberOfFrames > 1 ? frameNumber : undefined
                });
              }
            });
            _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore._broadcastEvent(EVENTS.INSTANCES_ADDED, {
              StudyInstanceUID,
              SeriesInstanceUID,
              madeInClient
            });
          });
        }
      }
    },
    store: {
      dicom: naturalizedReport => {
        const reportBlob = dcmjs__WEBPACK_IMPORTED_MODULE_1__["default"].data.datasetToBlob(naturalizedReport);

        //Create a URL for the binary.
        var objectUrl = URL.createObjectURL(reportBlob);
        window.location.assign(objectUrl);
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          // in multiframe we start at frame 1
          for (let i = 1; i <= NumberOfFrames; i++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame: i
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame
    }) {
      // Important: Never use instance.imageId because it might be multiframe,
      // which would make it an invalid imageId.
      // if (instance.imageId) {
      //   return instance.imageId;
      // }

      const {
        StudyInstanceUID,
        SeriesInstanceUID,
        SOPInstanceUID
      } = instance;
      const storedInstance = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getInstance(StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID);
      let imageId = storedInstance.url;
      if (frame !== undefined) {
        imageId += `&frame=${frame}`;
      }
      return imageId;
    },
    deleteStudyMetadataPromise() {
      console.log('deleteStudyMetadataPromise not implemented');
    },
    getStudyInstanceUIDs: ({
      params,
      query
    }) => {
      const {
        StudyInstanceUIDs: paramsStudyInstanceUIDs
      } = params;
      const queryStudyInstanceUIDs = query.getAll('StudyInstanceUIDs');
      const StudyInstanceUIDs = queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];

      // Put SRs at the end of series list to make sure images are loaded first
      let isStudyInCache = false;
      StudyInstanceUIDsAsArray.forEach(StudyInstanceUID => {
        const study = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getStudy(StudyInstanceUID);
        if (study) {
          study.series = study.series.sort(customSort);
          isStudyInCache = true;
        }
      });
      return isStudyInCache ? StudyInstanceUIDsAsArray : [];
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "../../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _DicomTagTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DicomTagTable */ "../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx");
/* harmony import */ var _DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DicomTagBrowser.css */ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");
/* harmony import */ var _DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_DicomTagBrowser_css__WEBPACK_IMPORTED_MODULE_8__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();









const {
  ImageSet
} = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.classes;
const {
  DicomMetaDictionary
} = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data;
const {
  nameMap
} = DicomMetaDictionary;
const DicomTagBrowser = ({
  displaySets,
  displaySetInstanceUID
}) => {
  _s2();
  _s();
  // The column indices that are to be excluded during a filter of the table.
  // At present the column indices are:
  // 0: DICOM tag
  // 1: VR
  // 2: Keyword
  // 3: Value
  const excludedColumnIndicesForFilter = new Set([1]);
  const [selectedDisplaySetInstanceUID, setSelectedDisplaySetInstanceUID] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(displaySetInstanceUID);
  const [instanceNumber, setInstanceNumber] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
  const [filterValue, setFilterValue] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const onSelectChange = value => {
    setSelectedDisplaySetInstanceUID(value.value);
    setInstanceNumber(1);
  };
  const activeDisplaySet = displaySets.find(ds => ds.displaySetInstanceUID === selectedDisplaySetInstanceUID);
  const isImageStack = _isImageStack(activeDisplaySet);
  const showInstanceList = isImageStack && activeDisplaySet.images.length > 1;
  const displaySetList = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    displaySets.sort((a, b) => a.SeriesNumber - b.SeriesNumber);
    return displaySets.map(displaySet => {
      const {
        displaySetInstanceUID,
        SeriesDate,
        SeriesTime,
        SeriesNumber,
        SeriesDescription,
        Modality
      } = displaySet;

      /* Map to display representation */
      const dateStr = `${SeriesDate}:${SeriesTime}`.split('.')[0];
      const date = moment__WEBPACK_IMPORTED_MODULE_1___default()(dateStr, 'YYYYMMDD:HHmmss');
      const displayDate = date.format('ddd, MMM Do YYYY');
      return {
        value: displaySetInstanceUID,
        label: `${SeriesNumber} (${Modality}):  ${SeriesDescription}`,
        description: displayDate
      };
    });
  }, [displaySets]);
  const rows = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    let metadata;
    if (isImageStack) {
      metadata = activeDisplaySet.images[instanceNumber - 1];
    } else {
      metadata = activeDisplaySet.instance || activeDisplaySet;
    }
    const tags = getSortedTags(metadata);
    return getFormattedRowsFromTags(tags, metadata);
  }, [instanceNumber, selectedDisplaySetInstanceUID]);
  const filteredRows = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    if (!filterValue) {
      return rows;
    }
    const filterValueLowerCase = filterValue.toLowerCase();
    return rows.filter(row => {
      return row.reduce((keepRow, col, colIndex) => {
        if (keepRow) {
          // We are already keeping the row, why do more work so return now.
          return keepRow;
        }
        if (excludedColumnIndicesForFilter.has(colIndex)) {
          return keepRow;
        }
        return keepRow || col.toLowerCase().includes(filterValueLowerCase);
      }, false);
    });
  }, [rows, filterValue]);
  const debouncedSetFilterValue = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return lodash_debounce__WEBPACK_IMPORTED_MODULE_5___default()(setFilterValue, 200);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    return () => {
      debouncedSetFilterValue?.cancel();
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "dicom-tag-browser-content bg-muted"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "mb-6 flex flex-row items-start pl-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "flex w-full flex-row items-start gap-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "flex w-1/3 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
    className: "text-muted-foreground flex h-6 items-center text-xs"
  }, "Series"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_6__.Select, {
    value: selectedDisplaySetInstanceUID,
    onValueChange: value => onSelectChange({
      value
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_6__.SelectTrigger, null, displaySetList.find(ds => ds.value === selectedDisplaySetInstanceUID)?.label || 'Select Series'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_6__.SelectContent, null, displaySetList.map(item => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_6__.SelectItem, {
      key: item.value,
      value: item.value
    }, item.label, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
      className: "text-muted-foreground ml-1 text-xs"
    }, item.description));
  })))), showInstanceList && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "mx-auto flex w-1/5 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
    className: "text-muted-foreground flex h-6 items-center text-xs"
  }, "Instance Number (", instanceNumber, " of ", activeDisplaySet.images.length, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_6__.Slider, {
    value: [instanceNumber],
    onValueChange: ([value]) => {
      setInstanceNumber(value);
    },
    min: 1,
    max: activeDisplaySet.images.length,
    step: 1,
    className: "pt-4"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
    className: "ml-auto flex w-1/3 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("span", {
    className: "text-muted-foreground flex h-6 items-center text-xs"
  }, "Search metadata"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.InputFilterText, {
    placeholder: "Search metadata...",
    onDebounceChange: setFilterValue
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_DicomTagTable__WEBPACK_IMPORTED_MODULE_7__["default"], {
    rows: filteredRows
  }));
};
_s2(DicomTagBrowser, "MgA+XglviBbpB+L6Hi6dbkEzCsc=");
_c2 = DicomTagBrowser;
_s(DicomTagBrowser, "MgA+XglviBbpB+L6Hi6dbkEzCsc=");
_c = DicomTagBrowser;
function getFormattedRowsFromTags(tags, metadata) {
  const rows = [];
  tags.forEach(tagInfo => {
    if (tagInfo.vr === 'SQ') {
      rows.push([`${tagInfo.tagIndent}${tagInfo.tag}`, tagInfo.vr, tagInfo.keyword, '']);
      const {
        values
      } = tagInfo;
      values.forEach((item, index) => {
        const formatedRowsFromTags = getFormattedRowsFromTags(item, metadata);
        rows.push([`${item[0].tagIndent}(FFFE,E000)`, '', `Item #${index}`, '']);
        rows.push(...formatedRowsFromTags);
      });
    } else {
      if (tagInfo.vr === 'xs') {
        try {
          const tag = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.Tag.fromPString(tagInfo.tag).toCleanString();
          const originalTagInfo = metadata[tag];
          tagInfo.vr = originalTagInfo.vr;
        } catch (error) {
          console.error(`Failed to parse value representation for tag '${tagInfo.keyword}'`);
        }
      }
      rows.push([`${tagInfo.tagIndent}${tagInfo.tag}`, tagInfo.vr, tagInfo.keyword, tagInfo.value]);
    }
  });
  return rows;
}
function getSortedTags(metadata) {
  const tagList = getRows(metadata);

  // Sort top level tags, sequence groups are sorted when created.
  _sortTagList(tagList);
  return tagList;
}
function getRows(metadata, depth = 0) {
  // Tag, Type, Value, Keyword

  const keywords = Object.keys(metadata);
  let tagIndent = '';
  for (let i = 0; i < depth; i++) {
    tagIndent += '>';
  }
  if (depth > 0) {
    tagIndent += ' '; // If indented, add a space after the indents.
  }
  const rows = [];
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    if (keyword === '_vrMap') {
      continue;
    }
    const tagInfo = nameMap[keyword];
    let value = metadata[keyword];
    if (tagInfo && tagInfo.vr === 'SQ') {
      const sequenceAsArray = toArray(value);

      // Push line defining the sequence

      const sequence = {
        tag: tagInfo.tag,
        tagIndent,
        vr: tagInfo.vr,
        keyword,
        values: []
      };
      rows.push(sequence);
      if (value === null) {
        // Type 2 Sequence
        continue;
      }
      sequenceAsArray.forEach(item => {
        const sequenceRows = getRows(item, depth + 1);
        if (sequenceRows.length) {
          // Sort the sequence group.
          _sortTagList(sequenceRows);
          sequence.values.push(sequenceRows);
        }
      });
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] != 'object') {
        value = value.join('\\');
      }
    }
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (typeof value !== 'string') {
      if (value === null) {
        value = ' ';
      } else {
        if (typeof value === 'object') {
          if (value.InlineBinary) {
            value = 'Inline Binary';
          } else if (value.BulkDataURI) {
            value = `Bulk Data URI`; //: ${value.BulkDataURI}`;
          } else if (value.Alphabetic) {
            value = value.Alphabetic;
          } else {
            console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
            console.warn(value);
            value = ' ';
          }
        } else {
          console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
          value = ' ';
        }
      }
    }

    // tag / vr/ keyword/ value

    // Remove retired tags
    keyword = keyword.replace('RETIRED_', '');
    if (tagInfo) {
      rows.push({
        tag: tagInfo.tag,
        tagIndent,
        vr: tagInfo.vr,
        keyword,
        value
      });
    } else {
      // skip properties without hex tag numbers
      const regex = /[0-9A-Fa-f]{6}/g;
      if (keyword.match(regex)) {
        const tag = `(${keyword.substring(0, 4)},${keyword.substring(4, 8)})`;
        rows.push({
          tag,
          tagIndent,
          vr: '',
          keyword: 'Private Tag',
          value
        });
      }
    }
  }
  return rows;
}
function _isImageStack(displaySet) {
  return displaySet instanceof ImageSet;
}
function toArray(objectOrArray) {
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}
function _sortTagList(tagList) {
  tagList.sort((a, b) => {
    if (a.tag < b.tag) {
      return -1;
    }
    return 1;
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DicomTagBrowser);
var _c;
__webpack_require__.$Refresh$.register(_c, "DicomTagBrowser");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "DicomTagBrowser");

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

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-window */ "../../../node_modules/react-window/dist/index.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash.debounce */ "../../../node_modules/lodash.debounce/index.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




const lineHeightPx = 20;
const lineHeightClassName = `leading-[${lineHeightPx}px]`;
const rowVerticalPaddingPx = 10;
const rowBottomBorderPx = 1;
const rowVerticalPaddingStyle = {
  padding: `${rowVerticalPaddingPx}px 0`
};
const rowStyle = {
  borderBottomWidth: `${rowBottomBorderPx}px`,
  ...rowVerticalPaddingStyle
};
function ColumnHeaders({
  tagRef,
  vrRef,
  keywordRef,
  valueRef
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('bg-secondary-dark ohif-scrollbar flex w-full flex-row overflow-y-scroll'),
    style: rowVerticalPaddingStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-4/24 px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: tagRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Tag"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-2/24 px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: vrRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "VR"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-6/24 px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: keywordRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Keyword"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "w-5/24 grow px-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    ref: valueRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Value"))));
}
_c3 = ColumnHeaders;
_c = ColumnHeaders;
function DicomTagTable({
  rows
}) {
  _s2();
  _s();
  const listRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [tagHeaderElem, setTagHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [vrHeaderElem, setVrHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [keywordHeaderElem, setKeywordHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [valueHeaderElem, setValueHeaderElem] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  // Here the refs are inturn stored in state to trigger a render of the table.
  // This virtualized table does NOT render until the header is rendered because the header column widths are used to determine the row heights in the table.
  // Therefore whenever the refs change (in particular the first time the refs are set), we want to trigger a render of the table.
  const tagRef = elem => {
    if (elem) {
      setTagHeaderElem(elem);
    }
  };
  const vrRef = elem => {
    if (elem) {
      setVrHeaderElem(elem);
    }
  };
  const keywordRef = elem => {
    if (elem) {
      setKeywordHeaderElem(elem);
    }
  };
  const valueRef = elem => {
    if (elem) {
      setValueHeaderElem(elem);
    }
  };

  /**
   * When new rows are set, scroll to the top and reset the virtualization.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!listRef?.current) {
      return;
    }
    listRef.current.scrollTo(0);
    listRef.current.resetAfterIndex(0);
  }, [rows]);

  /**
   * When the browser window resizes, update the row virtualization (i.e. row heights)
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const debouncedResize = lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(() => listRef.current.resetAfterIndex(0), 100);
    window.addEventListener('resize', debouncedResize);
    return () => {
      debouncedResize.cancel();
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);
  const Row = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(({
    index,
    style
  }) => {
    const row = rows[index];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        ...style,
        ...rowStyle
      },
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('hover:bg-secondary-main border-secondary-light flex w-full flex-row items-center break-all bg-black text-base transition duration-300', lineHeightClassName),
      key: `DICOMTagRow-${index}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "w-4/24 px-3"
    }, row[0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "w-2/24 px-3"
    }, row[1]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "w-6/24 px-3"
    }, row[2]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "w-5/24 grow px-3"
    }, row[3]));
  }, [rows]);

  /**
   * Whenever any one of the column headers is set, then the header is rendered.
   * Here we chose the tag header.
   */
  const isHeaderRendered = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => tagHeaderElem !== null, [tagHeaderElem]);

  /**
   * Get the item/row size. We use the header column widths to calculate the various row heights.
   * @param index the row index
   * @returns the row height
   */
  const getItemSize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(index => {
    const headerWidths = [tagHeaderElem.offsetWidth, vrHeaderElem.offsetWidth, keywordHeaderElem.offsetWidth, valueHeaderElem.offsetWidth];
    const context = canvasRef.current.getContext('2d');
    context.font = getComputedStyle(canvasRef.current).font;
    return rows[index].map((colText, index) => {
      const colOneLineWidth = context.measureText(colText).width;
      const numLines = Math.ceil(colOneLineWidth / headerWidths[index]);
      return numLines * lineHeightPx + 2 * rowVerticalPaddingPx + rowBottomBorderPx;
    }).reduce((maxHeight, colHeight) => Math.max(maxHeight, colHeight));
  }, [rows, keywordHeaderElem, tagHeaderElem, valueHeaderElem, vrHeaderElem]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("canvas", {
    style: {
      visibility: 'hidden',
      position: 'absolute'
    },
    className: "text-base",
    ref: canvasRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ColumnHeaders, {
    tagRef: tagRef,
    vrRef: vrRef,
    keywordRef: keywordRef,
    valueRef: valueRef
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative m-auto border-2 border-black bg-black",
    style: {
      height: '32rem'
    }
  }, isHeaderRendered() && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_window__WEBPACK_IMPORTED_MODULE_1__.VariableSizeList, {
    ref: listRef,
    height: 500,
    itemCount: rows.length,
    itemSize: getItemSize,
    width: '100%',
    className: "ohif-scrollbar"
  }, Row)));
}
_s2(DicomTagTable, "ytVxf3pVkicvFQAq/lr97TftPAE=");
_c4 = DicomTagTable;
_s(DicomTagTable, "ytVxf3pVkicvFQAq/lr97TftPAE=");
_c2 = DicomTagTable;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DicomTagTable);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "ColumnHeaders");
__webpack_require__.$Refresh$.register(_c2, "DicomTagTable");
var _c3, _c4;
__webpack_require__.$Refresh$.register(_c3, "ColumnHeaders");
__webpack_require__.$Refresh$.register(_c4, "DicomTagTable");

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

/***/ "../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(wadoRoot) {
  return {
    series: (StudyInstanceUID, SeriesInstanceUID) => {
      return new Promise((resolve, reject) => {
        // Reject because of Quality. (Seems the most sensible out of the options)
        const CodeValueAndCodeSchemeDesignator = `113001%5EDCM`;
        const url = `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/reject/${CodeValueAndCodeSchemeDesignator}`;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        //Send the proper header information along with the request
        // TODO -> Auth when we re-add authorization.

        console.log(xhr);
        xhr.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr.readyState == 4) {
            switch (xhr.status) {
              case 204:
                resolve(xhr.responseText);
                break;
              case 404:
                reject('Your dataSource does not support reject functionality');
            }
          }
        };
        xhr.send();
      });
    }
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

/***/ "../../../extensions/default/src/DicomWebDataSource/index.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomWebApi: () => (/* binding */ createDicomWebApi)
/* harmony export */ });
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _qido_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qido.js */ "../../../extensions/default/src/DicomWebDataSource/qido.js");
/* harmony import */ var _dcm4cheeReject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dcm4cheeReject.js */ "../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js");
/* harmony import */ var _utils_getImageId_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getImageId.js */ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js");
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./retrieveStudyMetadata.js */ "../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js");
/* harmony import */ var _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/StaticWadoClient */ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts");
/* harmony import */ var _utils_getDirectURL__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/getDirectURL */ "../../../extensions/default/src/utils/getDirectURL.ts");
/* harmony import */ var _utils_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");











const {
  DicomMetaDictionary,
  DicomDict
} = dcmjs__WEBPACK_IMPORTED_MODULE_5__["default"].data;
const {
  naturalizeDataset,
  denaturalizeDataset
} = DicomMetaDictionary;
const ImplementationClassUID = '2.25.270695996825855179949881587723571202391.2.0.0';
const ImplementationVersionName = 'OHIF-VIEWER-2.0.0';
const EXPLICIT_VR_LITTLE_ENDIAN = '1.2.840.10008.1.2.1';
const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.classes.MetadataProvider;

/**
 * Creates a DICOM Web API based on the provided configuration.
 *
 * @param {object} dicomWebConfig - Configuration for the DICOM Web API
 * @param {string} dicomWebConfig.name - Data source name
 * @param {string} dicomWebConfig.wadoUriRoot - Legacy? (potentially unused/replaced)
 * @param {string} dicomWebConfig.qidoRoot - Base URL to use for QIDO requests
 * @param {string} dicomWebConfig.wadoRoot - Base URL to use for WADO requests
 * @param {string} dicomWebConfig.wadoUri - Base URL to use for WADO URI requests
 * @param {boolean} dicomWebConfig.qidoSupportsIncludeField - Whether QIDO supports the "Include" option to request additional fields in response
 * @param {string} dicomWebConfig.imageRendering - wadors | ? (unsure of where/how this is used)
 * @param {string} dicomWebConfig.thumbnailRendering - wadors | ? (unsure of where/how this is used)
 * @param {boolean} dicomWebConfig.supportsReject - Whether the server supports reject calls (i.e. DCM4CHEE)
 * @param {boolean} dicomWebConfig.lazyLoadStudy - "enableStudyLazyLoad"; Request series meta async instead of blocking
 * @param {string|boolean} dicomWebConfig.singlepart - indicates if the retrieves can fetch singlepart. Options are bulkdata, video, image, or boolean true
 * @param {string} dicomWebConfig.requestTransferSyntaxUID - Transfer syntax to request from the server
 * @param {object} dicomWebConfig.acceptHeader - Accept header to use for requests
 * @param {boolean} dicomWebConfig.omitQuotationForMultipartRequest - Whether to omit quotation marks for multipart requests
 * @param {boolean} dicomWebConfig.supportsFuzzyMatching - Whether the server supports fuzzy matching
 * @param {boolean} dicomWebConfig.supportsWildcard - Whether the server supports wildcard matching
 * @param {boolean} dicomWebConfig.supportsNativeDICOMModel - Whether the server supports the native DICOM model
 * @param {boolean} dicomWebConfig.enableStudyLazyLoad - Whether to enable study lazy loading
 * @param {boolean} dicomWebConfig.enableRequestTag - Whether to enable request tag
 * @param {boolean} dicomWebConfig.enableStudyLazyLoad - Whether to enable study lazy loading
 * @param {boolean} dicomWebConfig.bulkDataURI - Whether to enable bulkDataURI
 * @param {function} dicomWebConfig.onConfiguration - Function that is called after the configuration is initialized
 * @param {boolean} dicomWebConfig.staticWado - Whether to use the static WADO client
 * @param {object} userAuthenticationService - User authentication service
 * @param {object} userAuthenticationService.getAuthorizationHeader - Function that returns the authorization header
 * @returns {object} - DICOM Web API object
 */
function createDicomWebApi(dicomWebConfig, servicesManager) {
  const {
    userAuthenticationService,
    customizationService
  } = servicesManager.services;
  let dicomWebConfigCopy, qidoConfig, wadoConfig, qidoDicomWebClient, wadoDicomWebClient, getAuthrorizationHeader, generateWadoHeader;
  const implementation = {
    initialize: ({
      params,
      query
    }) => {
      if (dicomWebConfig.onConfiguration && typeof dicomWebConfig.onConfiguration === 'function') {
        dicomWebConfig = dicomWebConfig.onConfiguration(dicomWebConfig, {
          params,
          query
        });
      }
      dicomWebConfigCopy = JSON.parse(JSON.stringify(dicomWebConfig));
      getAuthrorizationHeader = () => {
        const xhrRequestHeaders = {};
        const authHeaders = userAuthenticationService.getAuthorizationHeader();
        if (authHeaders && authHeaders.Authorization) {
          xhrRequestHeaders.Authorization = authHeaders.Authorization;
        }
        return xhrRequestHeaders;
      };
      generateWadoHeader = () => {
        const authorizationHeader = getAuthrorizationHeader();
        //Generate accept header depending on config params
        const formattedAcceptHeader = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.generateAcceptHeader(dicomWebConfig.acceptHeader, dicomWebConfig.requestTransferSyntaxUID, dicomWebConfig.omitQuotationForMultipartRequest);
        return {
          ...authorizationHeader,
          Accept: formattedAcceptHeader
        };
      };
      qidoConfig = {
        url: dicomWebConfig.qidoRoot,
        staticWado: dicomWebConfig.staticWado,
        singlepart: dicomWebConfig.singlepart,
        headers: userAuthenticationService.getAuthorizationHeader(),
        errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.errorHandler.getHTTPErrorHandler()
      };
      wadoConfig = {
        url: dicomWebConfig.wadoRoot,
        staticWado: dicomWebConfig.staticWado,
        singlepart: dicomWebConfig.singlepart,
        headers: userAuthenticationService.getAuthorizationHeader(),
        errorInterceptor: _ohif_core__WEBPACK_IMPORTED_MODULE_1__.errorHandler.getHTTPErrorHandler()
      };

      // TODO -> Two clients sucks, but its better than 1000.
      // TODO -> We'll need to merge auth later.
      qidoDicomWebClient = dicomWebConfig.staticWado ? new _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__["default"](qidoConfig) : new dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient(qidoConfig);
      wadoDicomWebClient = dicomWebConfig.staticWado ? new _utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_7__["default"](wadoConfig) : new dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient(wadoConfig);
    },
    query: {
      studies: {
        mapParams: _qido_js__WEBPACK_IMPORTED_MODULE_2__.mapParams.bind(),
        search: async function (origParams) {
          qidoDicomWebClient.headers = getAuthrorizationHeader();
          const {
            studyInstanceUid,
            seriesInstanceUid,
            ...mappedParams
          } = (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.mapParams)(origParams, {
            supportsFuzzyMatching: dicomWebConfig.supportsFuzzyMatching,
            supportsWildcard: dicomWebConfig.supportsWildcard
          }) || {};
          const results = await (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.search)(qidoDicomWebClient, undefined, undefined, mappedParams);
          return (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.processResults)(results);
        },
        processResults: _qido_js__WEBPACK_IMPORTED_MODULE_2__.processResults.bind()
      },
      series: {
        // mapParams: mapParams.bind(),
        search: async function (studyInstanceUid) {
          qidoDicomWebClient.headers = getAuthrorizationHeader();
          const results = await (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.seriesInStudy)(qidoDicomWebClient, studyInstanceUid);
          return (0,_qido_js__WEBPACK_IMPORTED_MODULE_2__.processSeriesResults)(results);
        }
        // processResults: processResults.bind(),
      },
      instances: {
        search: (studyInstanceUid, queryParameters) => {
          qidoDicomWebClient.headers = getAuthrorizationHeader();
          return _qido_js__WEBPACK_IMPORTED_MODULE_2__.search.call(undefined, qidoDicomWebClient, studyInstanceUid, null, queryParameters);
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */
      directURL: params => {
        return (0,_utils_getDirectURL__WEBPACK_IMPORTED_MODULE_8__["default"])({
          wadoRoot: dicomWebConfig.wadoRoot,
          singlepart: dicomWebConfig.singlepart
        }, params);
      },
      /**
       * Provide direct access to the dicom web client for certain use cases
       * where the dicom web client is used by an external library such as the
       * microscopy viewer.
       * Note this instance only needs to support the wado queries, and may not
       * support any QIDO or STOW operations.
       */
      getWadoDicomWebClient: () => wadoDicomWebClient,
      bulkDataURI: async ({
        StudyInstanceUID,
        BulkDataURI
      }) => {
        qidoDicomWebClient.headers = getAuthrorizationHeader();
        const options = {
          multipart: false,
          BulkDataURI,
          StudyInstanceUID
        };
        return qidoDicomWebClient.retrieveBulkData(options).then(val => {
          const ret = val && val[0] || undefined;
          return ret;
        });
      },
      series: {
        metadata: async ({
          StudyInstanceUID,
          filters,
          sortCriteria,
          sortFunction,
          madeInClient = false,
          returnPromises = false
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          if (dicomWebConfig.enableStudyLazyLoad) {
            return implementation._retrieveSeriesMetadataAsync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient, returnPromises);
          }
          return implementation._retrieveSeriesMetadataSync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient);
        }
      }
    },
    store: {
      dicom: async (dataset, request, dicomDict) => {
        wadoDicomWebClient.headers = getAuthrorizationHeader();
        if (dataset instanceof ArrayBuffer) {
          const options = {
            datasets: [dataset],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        } else {
          let effectiveDicomDict = dicomDict;
          if (!dicomDict) {
            const meta = {
              FileMetaInformationVersion: dataset._meta?.FileMetaInformationVersion?.Value,
              MediaStorageSOPClassUID: dataset.SOPClassUID,
              MediaStorageSOPInstanceUID: dataset.SOPInstanceUID,
              TransferSyntaxUID: EXPLICIT_VR_LITTLE_ENDIAN,
              ImplementationClassUID,
              ImplementationVersionName
            };
            const denaturalized = denaturalizeDataset(meta);
            const defaultDicomDict = new DicomDict(denaturalized);
            defaultDicomDict.dict = denaturalizeDataset(dataset);
            effectiveDicomDict = defaultDicomDict;
          }
          const part10Buffer = effectiveDicomDict.write();
          const options = {
            datasets: [part10Buffer],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        }
      }
    },
    _retrieveSeriesMetadataSync: async (StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient) => {
      const enableStudyLazyLoad = false;
      wadoDicomWebClient.headers = generateWadoHeader();
      // data is all SOPInstanceUIDs
      const data = await (0,_retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.retrieveStudyMetadata)(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig);

      // first naturalize the data
      const naturalizedInstancesMetadata = data.map(naturalizeDataset);
      const seriesSummaryMetadata = {};
      const instancesPerSeries = {};
      naturalizedInstancesMetadata.forEach(instance => {
        if (!seriesSummaryMetadata[instance.SeriesInstanceUID]) {
          seriesSummaryMetadata[instance.SeriesInstanceUID] = {
            StudyInstanceUID: instance.StudyInstanceUID,
            StudyDescription: instance.StudyDescription,
            SeriesInstanceUID: instance.SeriesInstanceUID,
            SeriesDescription: instance.SeriesDescription,
            SeriesNumber: instance.SeriesNumber,
            SeriesTime: instance.SeriesTime,
            SOPClassUID: instance.SOPClassUID,
            ProtocolName: instance.ProtocolName,
            Modality: instance.Modality
          };
        }
        if (!instancesPerSeries[instance.SeriesInstanceUID]) {
          instancesPerSeries[instance.SeriesInstanceUID] = [];
        }
        const imageId = implementation.getImageIdsForInstance({
          instance
        });
        instance.imageId = imageId;
        instance.wadoRoot = dicomWebConfig.wadoRoot;
        instance.wadoUri = dicomWebConfig.wadoUri;
        metadataProvider.addImageIdToUIDs(imageId, {
          StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          SOPInstanceUID: instance.SOPInstanceUID
        });
        instancesPerSeries[instance.SeriesInstanceUID].push(instance);
      });

      // grab all the series metadata
      const seriesMetadata = Object.values(seriesSummaryMetadata);
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addSeriesMetadata(seriesMetadata, madeInClient);
      Object.keys(instancesPerSeries).forEach(seriesInstanceUID => _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances(instancesPerSeries[seriesInstanceUID], madeInClient));
      return seriesSummaryMetadata;
    },
    _retrieveSeriesMetadataAsync: async (StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient = false, returnPromises = false) => {
      const enableStudyLazyLoad = true;
      wadoDicomWebClient.headers = generateWadoHeader();
      // Get Series
      const {
        preLoadData: seriesSummaryMetadata,
        promises: seriesPromises
      } = await (0,_retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.retrieveStudyMetadata)(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig);

      /**
       * Adds the retrieve bulkdata function to naturalized DICOM data.
       * This is done recursively, for sub-sequences.
       */
      const addRetrieveBulkDataNaturalized = (naturalized, instance = naturalized) => {
        for (const key of Object.keys(naturalized)) {
          const value = naturalized[key];
          if (Array.isArray(value) && typeof value[0] === 'object') {
            // Fix recursive values
            value.forEach(child => addRetrieveBulkDataNaturalized(child, instance));
            continue;
          }

          // The value.Value will be set with the bulkdata read value
          // in which case it isn't necessary to re-read this.
          if (value && value.BulkDataURI && !value.Value) {
            // handle the scenarios where bulkDataURI is relative path
            (0,_utils_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_9__.fixBulkDataURI)(value, instance, dicomWebConfig);
            // Provide a method to fetch bulkdata
            value.retrieveBulkData = retrieveBulkData.bind(qidoDicomWebClient, value);
          }
        }
        return naturalized;
      };

      /**
       * naturalizes the dataset, and adds a retrieve bulkdata method
       * to any values containing BulkDataURI.
       * @param {*} instance
       * @returns naturalized dataset, with retrieveBulkData methods
       */
      const addRetrieveBulkData = instance => {
        const naturalized = naturalizeDataset(instance);

        // if we know the server doesn't use bulkDataURI, then don't
        if (!dicomWebConfig.bulkDataURI?.enabled) {
          return naturalized;
        }
        return addRetrieveBulkDataNaturalized(naturalized);
      };

      // Async load series, store as retrieved
      function storeInstances(instances) {
        const naturalizedInstances = instances.map(addRetrieveBulkData);

        // Adding instanceMetadata to OHIF MetadataProvider
        naturalizedInstances.forEach(instance => {
          instance.wadoRoot = dicomWebConfig.wadoRoot;
          instance.wadoUri = dicomWebConfig.wadoUri;
          const {
            StudyInstanceUID,
            SeriesInstanceUID,
            SOPInstanceUID
          } = instance;
          const numberOfFrames = instance.NumberOfFrames || 1;
          // Process all frames consistently, whether single or multiframe
          for (let i = 0; i < numberOfFrames; i++) {
            const frameNumber = i + 1;
            const frameImageId = implementation.getImageIdsForInstance({
              instance,
              frame: frameNumber
            });
            // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
            metadataProvider.addImageIdToUIDs(frameImageId, {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID,
              frameNumber: numberOfFrames > 1 ? frameNumber : undefined
            });
          }

          // Adding imageId to each instance
          // Todo: This is not the best way I can think of to let external
          // metadata handlers know about the imageId that is stored in the store
          const imageId = implementation.getImageIdsForInstance({
            instance
          });
          instance.imageId = imageId;
        });
        _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addInstances(naturalizedInstances, madeInClient);
      }
      function setSuccessFlag() {
        const study = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.getStudy(StudyInstanceUID);
        if (!study) {
          return;
        }
        study.isLoaded = true;
      }

      // Google Cloud Healthcare doesn't return StudyInstanceUID, so we need to add
      // it manually here
      seriesSummaryMetadata.forEach(aSeries => {
        aSeries.StudyInstanceUID = StudyInstanceUID;
      });
      _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DicomMetadataStore.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
      const seriesDeliveredPromises = seriesPromises.map(promise => {
        if (!returnPromises) {
          promise?.start();
        }
        return promise.then(instances => {
          storeInstances(instances);
        });
      });
      if (returnPromises) {
        Promise.all(seriesDeliveredPromises).then(() => setSuccessFlag());
        return seriesPromises;
      } else {
        await Promise.all(seriesDeliveredPromises);
        setSuccessFlag();
      }
      return seriesSummaryMetadata;
    },
    deleteStudyMetadataPromise: _retrieveStudyMetadata_js__WEBPACK_IMPORTED_MODULE_6__.deleteStudyMetadataPromise,
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          for (let frame = 1; frame <= NumberOfFrames; frame++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame = undefined
    }) {
      const imageIds = (0,_utils_getImageId_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        instance,
        frame,
        config: dicomWebConfig
      });
      return imageIds;
    },
    getConfig() {
      return dicomWebConfigCopy;
    },
    getStudyInstanceUIDs({
      params,
      query
    }) {
      const {
        StudyInstanceUIDs: paramsStudyInstanceUIDs
      } = params;
      const queryStudyInstanceUIDs = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils.splitComma(query.getAll('StudyInstanceUIDs'));
      const StudyInstanceUIDs = queryStudyInstanceUIDs.length && queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];
      return StudyInstanceUIDsAsArray;
    }
  };
  if (dicomWebConfig.supportsReject) {
    implementation.reject = (0,_dcm4cheeReject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dicomWebConfig.wadoRoot);
  }
  return _ohif_core__WEBPACK_IMPORTED_MODULE_1__.IWebApiDataSource.create(implementation);
}

/**
 * A bindable function that retrieves the bulk data against this as the
 * dicomweb client, and on the given value element.
 *
 * @param value - a bind value that stores the retrieve value to short circuit the
 *    next retrieve instance.
 * @param options - to allow specifying the content type.
 */
function retrieveBulkData(value, options = {}) {
  const {
    mediaType
  } = options;
  const useOptions = {
    // The bulkdata fetches work with either multipart or
    // singlepart, so set multipart to false to let the server
    // decide which type to respond with.
    multipart: false,
    BulkDataURI: value.BulkDataURI,
    mediaTypes: mediaType ? [{
      mediaType
    }, {
      mediaType: 'application/octet-stream'
    }] : undefined,
    ...options
  };
  return this.retrieveBulkData(useOptions).then(val => {
    // There are DICOM PDF cases where the first ArrayBuffer in the array is
    // the bulk data and DICOM video cases where the second ArrayBuffer is
    // the bulk data. Here we play it safe and do a find.
    const ret = val instanceof Array && val.find(arrayBuffer => arrayBuffer?.byteLength) || undefined;
    value.Value = ret;
    return ret;
  });
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

/***/ "../../../extensions/default/src/DicomWebDataSource/qido.js":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/qido.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ searchStudies),
/* harmony export */   mapParams: () => (/* binding */ mapParams),
/* harmony export */   processResults: () => (/* binding */ processResults),
/* harmony export */   processSeriesResults: () => (/* binding */ processSeriesResults),
/* harmony export */   search: () => (/* binding */ search),
/* harmony export */   seriesInStudy: () => (/* binding */ seriesInStudy)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/sortStudy */ "../../core/src/utils/sortStudy.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * QIDO - Query based on ID for DICOM Objects
 * search for studies, series and instances by patient ID, and receive their
 * unique identifiers for further usage.
 *
 * Quick: https://www.dicomstandard.org/dicomweb/query-qido-rs/
 * Standard: http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6
 *
 * Routes:
 * ==========
 * /studies?
 * /studies/{studyInstanceUid}/series?
 * /studies/{studyInstanceUid}/series/{seriesInstanceUid}/instances?
 *
 * Query Parameters:
 * ================
 * | KEY              | VALUE              |
 * |------------------|--------------------|
 * | {attributeId}    | {value}            |
 * | includeField     | {attribute} or all |
 * | fuzzymatching    | true OR false      |
 * | limit            | {number}           |
 * | offset           | {number}           |
 */


const {
  getString,
  getName,
  getModalities
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DICOMWeb;

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoStudies - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoStudies[0].qidoStudy - An object where each key is the DICOM Tag group+element
 * @param {object} qidoStudies[0].qidoStudy[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoStudies[0].qidoStudy[dicomTag].vr - Value Representation
 * @param {string[]} qidoStudies[0].qidoStudy[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processResults(qidoStudies) {
  if (!qidoStudies || !qidoStudies.length) {
    return [];
  }
  const studies = [];
  qidoStudies.forEach(qidoStudy => studies.push({
    studyInstanceUid: getString(qidoStudy['0020000D']),
    date: getString(qidoStudy['00080020']),
    // YYYYMMDD
    time: getString(qidoStudy['00080030']),
    // HHmmss.SSS (24-hour, minutes, seconds, fractional seconds)
    accession: getString(qidoStudy['00080050']) || '',
    // short string, probably a number?
    mrn: getString(qidoStudy['00100020']) || '',
    // medicalRecordNumber
    patientName: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatPN(getName(qidoStudy['00100010'])) || '',
    instances: Number(getString(qidoStudy['00201208'])) || 0,
    // number
    description: getString(qidoStudy['00081030']) || '',
    modalities: getString(getModalities(qidoStudy['00080060'], qidoStudy['00080061'])) || ''
  }));
  return studies;
}

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoSeries - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoSeries[0].qidoSeries - An object where each key is the DICOM Tag group+element
 * @param {object} qidoSeries[0].qidoSeries[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoSeries[0].qidoSeries[dicomTag].vr - Value Representation
 * @param {string[]} qidoSeries[0].qidoSeries[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processSeriesResults(qidoSeries) {
  const series = [];
  if (qidoSeries && qidoSeries.length) {
    qidoSeries.forEach(qidoSeries => series.push({
      studyInstanceUid: getString(qidoSeries['0020000D']),
      seriesInstanceUid: getString(qidoSeries['0020000E']),
      modality: getString(qidoSeries['00080060']),
      seriesNumber: getString(qidoSeries['00200011']),
      seriesDate: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.formatDate(getString(qidoSeries['00080021'])),
      numSeriesInstances: Number(getString(qidoSeries['00201209'])),
      description: getString(qidoSeries['0008103E'])
    }));
  }
  (0,_ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__.sortStudySeries)(series);
  return series;
}

/**
 *
 * @param {object} dicomWebClient - Client similar to what's provided by `dicomweb-client` library
 * @param {function} dicomWebClient.searchForStudies -
 * @param {string} [studyInstanceUid]
 * @param {string} [seriesInstanceUid]
 * @param {string} [queryParamaters]
 * @returns {Promise<results>} - Promise that resolves results
 */
async function search(dicomWebClient, studyInstanceUid, seriesInstanceUid, queryParameters) {
  let searchResult = await dicomWebClient.searchForStudies({
    studyInstanceUid: undefined,
    queryParams: queryParameters
  });
  return searchResult;
}

/**
 *
 * @param {string} studyInstanceUID - ID of study to return a list of series for
 * @returns {Promise} - Resolves SeriesMetadata[] in study
 */
function seriesInStudy(dicomWebClient, studyInstanceUID) {
  // Series Description
  // Already included?
  const commaSeparatedFields = ['0008103E', '00080021'].join(',');
  const queryParams = {
    includefield: commaSeparatedFields
  };
  return dicomWebClient.searchForSeries({
    studyInstanceUID,
    queryParams
  });
}
function searchStudies(server, filter) {
  const queryParams = getQIDOQueryParams(filter, server.qidoSupportsIncludeField);
  const options = {
    queryParams
  };
  return dicomWeb.searchForStudies(options).then(resultDataToStudies);
}

/**
 * Produces a QIDO URL given server details and a set of specified search filter
 * items
 *
 * @param filter
 * @param serverSupportsQIDOIncludeField
 * @returns {string} The URL with encoded filter query data
 */
function mapParams(params, options = {}) {
  if (!params) {
    return;
  }
  const commaSeparatedFields = ['00081030',
  // Study Description
  '00080060' // Modality
  // Add more fields here if you want them in the result
  ].join(',');
  const useWildcard = params?.disableWildcard !== undefined ? !params.disableWildcard : options.supportsWildcard;
  const withWildcard = value => {
    return useWildcard && value ? `*${value}*` : value;
  };
  const parameters = {
    // Named
    PatientName: withWildcard(params.patientName),
    //PatientID: withWildcard(params.patientId),
    '00100020': withWildcard(params.patientId),
    // Temporarily to make the tests pass with dicomweb-server.. Apparently it's broken?
    AccessionNumber: withWildcard(params.accessionNumber),
    StudyDescription: withWildcard(params.studyDescription),
    ModalitiesInStudy: params.modalitiesInStudy,
    // Other
    limit: params.limit || 101,
    offset: params.offset || 0,
    fuzzymatching: options.supportsFuzzyMatching === true,
    includefield: commaSeparatedFields // serverSupportsQIDOIncludeField ? commaSeparatedFields : 'all',
  };

  // build the StudyDate range parameter
  if (params.startDate && params.endDate) {
    parameters.StudyDate = `${params.startDate}-${params.endDate}`;
  } else if (params.startDate) {
    const today = new Date();
    const DD = String(today.getDate()).padStart(2, '0');
    const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const YYYY = today.getFullYear();
    const todayStr = `${YYYY}${MM}${DD}`;
    parameters.StudyDate = `${params.startDate}-${todayStr}`;
  } else if (params.endDate) {
    const oldDateStr = `19700102`;
    parameters.StudyDate = `${oldDateStr}-${params.endDate}`;
  }

  // Build the StudyInstanceUID parameter
  if (params.studyInstanceUid) {
    let studyUids = params.studyInstanceUid;
    studyUids = Array.isArray(studyUids) ? studyUids.join() : studyUids;
    studyUids = studyUids.replace(/[^0-9.]+/g, '\\');
    parameters.StudyInstanceUID = studyUids;
  }

  // Clean query params of undefined values.
  const final = {};
  Object.keys(parameters).forEach(key => {
    if (parameters[key] !== undefined && parameters[key] !== '') {
      final[key] = parameters[key];
    }
  });
  return final;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteStudyMetadataPromise: () => (/* binding */ deleteStudyMetadataPromise),
/* harmony export */   retrieveStudyMetadata: () => (/* binding */ retrieveStudyMetadata)
/* harmony export */ });
/* harmony import */ var _utils_retrieveMetadataFiltered_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/retrieveMetadataFiltered.js */ "../../../extensions/default/src/DicomWebDataSource/utils/retrieveMetadataFiltered.js");
/* harmony import */ var _wado_retrieveMetadata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wado/retrieveMetadata.js */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const moduleName = 'RetrieveStudyMetadata';
// Cache for promises. Prevents unnecessary subsequent calls to the server
const StudyMetaDataPromises = new Map();

/**
 * Retrieves study metadata.
 *
 * @param {Object} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {string} StudyInstanceUID The UID of the Study to be retrieved
 * @param {boolean} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously.
 * @param {Object} [filters] Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns {Promise} that will be resolved with the metadata or rejected with the error
 */
function retrieveStudyMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig = {}) {
  // @TODO: Whenever a study metadata request has failed, its related promise will be rejected once and for all
  // and further requests for that metadata will always fail. On failure, we probably need to remove the
  // corresponding promise from the "StudyMetaDataPromises" map...

  if (!dicomWebClient) {
    throw new Error(`${moduleName}: Required 'dicomWebClient' parameter not provided.`);
  }
  if (!StudyInstanceUID) {
    throw new Error(`${moduleName}: Required 'StudyInstanceUID' parameter not provided.`);
  }
  const promiseId = `${dicomWebConfig.name}:${StudyInstanceUID}`;

  // Already waiting on result? Return cached promise
  if (StudyMetaDataPromises.has(promiseId)) {
    return StudyMetaDataPromises.get(promiseId);
  }
  let promise;
  if (filters && filters.seriesInstanceUID && Array.isArray(filters.seriesInstanceUID)) {
    promise = (0,_utils_retrieveMetadataFiltered_js__WEBPACK_IMPORTED_MODULE_0__["default"])(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction);
  } else {
    // Create a promise to handle the data retrieval
    promise = new Promise((resolve, reject) => {
      (0,_wado_retrieveMetadata_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction).then(function (data) {
        resolve(data);
      }, reject);
    });
  }

  // Store the promise in cache
  StudyMetaDataPromises.set(promiseId, promise);
  return promise;
}

/**
 * Delete the cached study metadata retrieval promise to ensure that the browser will
 * re-retrieve the study metadata when it is next requested.
 *
 * @param {String} StudyInstanceUID The UID of the Study to be removed from cache
 */
function deleteStudyMetadataPromise(StudyInstanceUID) {
  if (StudyMetaDataPromises.has(StudyInstanceUID)) {
    StudyMetaDataPromises.delete(StudyInstanceUID);
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StaticWadoClient)
/* harmony export */ });
/* harmony import */ var dicomweb_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dicomweb-client */ "../../../node_modules/dicomweb-client/build/dicomweb-client.es.js");
/* harmony import */ var _fixMultipart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fixMultipart */ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultipart.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const {
  DICOMwebClient
} = dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api;
const anyDicomwebClient = DICOMwebClient;

// Ugly over-ride, but the internals aren't otherwise accessible.
if (!anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue) {
  anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue = anyDicomwebClient._buildMultipartAcceptHeaderFieldValue;
  anyDicomwebClient._buildMultipartAcceptHeaderFieldValue = function (mediaTypes, acceptableTypes) {
    if (mediaTypes.length === 1 && mediaTypes[0].mediaType.endsWith('/*')) {
      return '*/*';
    } else {
      return anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue(mediaTypes, acceptableTypes);
    }
  };
}

/**
 * An implementation of the static wado client, that fetches data from
 * a static response rather than actually doing real queries.  This allows
 * fast encoding of test data, but because it is static, anything actually
 * performing searches doesn't work.  This version fixes the query issue
 * by manually implementing a query option.
 */

class StaticWadoClient extends dicomweb_client__WEBPACK_IMPORTED_MODULE_0__.api.DICOMwebClient {
  constructor(config) {
    super(config);
    this.config = void 0;
    this.staticWado = void 0;
    this.staticWado = config.staticWado;
    this.config = config;
  }

  /**
   * Handle improperly specified multipart/related return type.
   * Note if the response is SUPPOSED to be multipart encoded already, then this
   * will double-decode it.
   *
   * @param options
   * @returns De-multiparted response data.
   *
   */
  retrieveBulkData(options) {
    const shouldFixMultipart = this.config.fixBulkdataMultipart !== false;
    const useOptions = {
      ...options
    };
    if (this.staticWado) {
      useOptions.mediaTypes = [{
        mediaType: 'application/*'
      }];
    }
    return super.retrieveBulkData(useOptions).then(result => shouldFixMultipart ? (0,_fixMultipart__WEBPACK_IMPORTED_MODULE_1__["default"])(result) : result);
  }

  /**
   * Retrieves instance frames using the image/* media type when configured
   * to do so (static wado back end).
   */
  retrieveInstanceFrames(options) {
    if (this.staticWado) {
      return super.retrieveInstanceFrames({
        ...options,
        mediaTypes: [{
          mediaType: 'image/*'
        }]
      });
    } else {
      return super.retrieveInstanceFrames(options);
    }
  }

  /**
   * Replace the search for studies remote query with a local version which
   * retrieves a complete query list and then sub-selects from it locally.
   * @param {*} options
   * @returns
   */
  async searchForStudies(options) {
    if (!this.staticWado) {
      return super.searchForStudies(options);
    }
    const searchResult = await super.searchForStudies(options);
    const {
      queryParams
    } = options;
    if (!queryParams) {
      return searchResult;
    }
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(study => {
      for (const key of Object.keys(StaticWadoClient.studyFilterKeys)) {
        if (!this.filterItem(key, lowerParams, study, StaticWadoClient.studyFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }
  async searchForSeries(options) {
    if (!this.staticWado) {
      return super.searchForSeries(options);
    }
    const searchResult = await super.searchForSeries(options);
    const {
      queryParams
    } = options;
    if (!queryParams) {
      return searchResult;
    }
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(series => {
      for (const key of Object.keys(StaticWadoClient.seriesFilterKeys)) {
        if (!this.filterItem(key, lowerParams, series, StaticWadoClient.seriesFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }

  /**
   * Compares values, matching any instance of desired to any instance of
   * actual by recursively go through the paired set of values.  That is,
   * this is O(m*n) where m is how many items in desired and n is the length of actual
   * Then, at the individual item node, compares the Alphabetic name if present,
   * and does a sub-string matching on string values, and otherwise does an
   * exact match comparison.
   *
   * @param {*} desired
   * @param {*} actual
   * @returns true if the values match
   */
  compareValues(desired, actual) {
    if (Array.isArray(desired)) {
      return desired.find(item => this.compareValues(item, actual));
    }
    if (Array.isArray(actual)) {
      return actual.find(actualItem => this.compareValues(desired, actualItem));
    }
    if (actual?.Alphabetic) {
      actual = actual.Alphabetic;
    }
    if (typeof actual == 'string') {
      if (actual.length === 0) {
        return true;
      }
      if (desired.length === 0 || desired === '*') {
        return true;
      }
      if (desired[0] === '*' && desired[desired.length - 1] === '*') {
        // console.log(`Comparing ${actual} to ${desired.substring(1, desired.length - 1)}`)
        return actual.indexOf(desired.substring(1, desired.length - 1)) != -1;
      } else if (desired[desired.length - 1] === '*') {
        return actual.indexOf(desired.substring(0, desired.length - 1)) != -1;
      } else if (desired[0] === '*') {
        return actual.indexOf(desired.substring(1)) === actual.length - desired.length + 1;
      }
    }
    return desired === actual;
  }

  /** Compares a pair of dates to see if the value is within the range */
  compareDateRange(range, value) {
    if (!value) {
      return true;
    }
    const dash = range.indexOf('-');
    if (dash === -1) {
      return this.compareValues(range, value);
    }
    const start = range.substring(0, dash);
    const end = range.substring(dash + 1);
    return (!start || value >= start) && (!end || value <= end);
  }

  /**
   * Filters the return list by the query parameters.
   *
   * @param anyCaseKey - a possible search key
   * @param queryParams -
   * @param {*} study
   * @param {*} sourceFilterMap
   * @returns
   */
  filterItem(key, queryParams, study, sourceFilterMap) {
    const altKey = sourceFilterMap[key] || key;
    if (!queryParams) {
      return true;
    }
    const testValue = queryParams[key] || queryParams[altKey];
    if (!testValue) {
      return true;
    }
    const valueElem = study[key] || study[altKey];
    if (!valueElem) {
      return false;
    }
    if (valueElem.vr === 'DA' && valueElem.Value?.[0]) {
      return this.compareDateRange(testValue, valueElem.Value[0]);
    }
    const value = valueElem.Value;
    return this.compareValues(testValue, value);
  }

  /** Converts the query parameters to lower case query parameters */
  toLowerParams(queryParams) {
    const lowerParams = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      lowerParams[key.toLowerCase()] = value;
    });
    return lowerParams;
  }
}
StaticWadoClient.studyFilterKeys = {
  studyinstanceuid: '0020000D',
  patientname: '00100010',
  '00100020': 'mrn',
  studydescription: '00081030',
  studydate: '00080020',
  modalitiesinstudy: '00080061',
  accessionnumber: '00080050'
};
StaticWadoClient.seriesFilterKeys = {
  seriesinstanceuid: '0020000E',
  seriesnumber: '00200011',
  modality: '00080060'
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/cleanDenaturalizedDataset.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/cleanDenaturalizedDataset.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanDenaturalizedDataset: () => (/* binding */ cleanDenaturalizedDataset),
/* harmony export */   transferDenaturalizedDataset: () => (/* binding */ transferDenaturalizedDataset)
/* harmony export */ });
/* harmony import */ var _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function isPrimitive(v) {
  return !(typeof v == 'object' || Array.isArray(v));
}
const vrNumerics = new Set(['DS', 'FL', 'FD', 'IS', 'OD', 'OF', 'OL', 'OV', 'SL', 'SS', 'SV', 'UL', 'US', 'UV']);

/**
 * Specialized for DICOM JSON format dataset cleaning.
 * @param obj
 * @returns
 */
function cleanDenaturalizedDataset(obj, options) {
  if (Array.isArray(obj)) {
    const newAry = obj.map(o => isPrimitive(o) ? o : cleanDenaturalizedDataset(o, options));
    return newAry;
  }
  if (isPrimitive(obj)) {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    if (obj[key].Value === null && obj[key].vr) {
      delete obj[key].Value;
    } else if (Array.isArray(obj[key].Value) && obj[key].vr) {
      if (obj[key].Value.length === 1 && obj[key].Value[0].BulkDataURI) {
        if (options?.dataSourceConfig) {
          // Not needed unless data source is directly used for loading data.
          (0,_fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__.fixBulkDataURI)(obj[key].Value[0], options, options.dataSourceConfig);
        }
        obj[key].BulkDataURI = obj[key].Value[0].BulkDataURI;

        // prevent mixed-content blockage
        if (window.location.protocol === 'https:' && obj[key].BulkDataURI.startsWith('http:')) {
          obj[key].BulkDataURI = obj[key].BulkDataURI.replace('http:', 'https:');
        }
        delete obj[key].Value;
      } else if (vrNumerics.has(obj[key].vr)) {
        obj[key].Value = obj[key].Value.map(v => +v);
      } else {
        obj[key].Value = obj[key].Value.map(entry => cleanDenaturalizedDataset(entry, options));
      }
    }
  });
  return obj;
}

/**
 * This is required to make the denaturalized data transferrable when it has
 * added proxy values.
 */
function transferDenaturalizedDataset(dataset) {
  const noNull = cleanDenaturalizedDataset(dataset);
  return JSON.parse(JSON.stringify(noNull));
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/findIndexOfString.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/findIndexOfString.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function checkToken(token, data, dataOffset) {
  if (dataOffset + token.length > data.length) {
    return false;
  }
  let endIndex = dataOffset;
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== data[endIndex++]) {
      return false;
    }
  }
  return true;
}
function stringToUint8Array(str) {
  const uint = new Uint8Array(str.length);
  for (let i = 0, j = str.length; i < j; i++) {
    uint[i] = str.charCodeAt(i);
  }
  return uint;
}
function findIndexOfString(data, str, offset) {
  offset = offset || 0;
  const token = stringToUint8Array(str);
  for (let i = offset; i < data.length; i++) {
    if (token[0] === data[i]) {
      // console.log('match @', i);
      if (checkToken(token, data, i)) {
        return i;
      }
    }
  }
  return -1;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findIndexOfString);

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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixBulkDataURI: () => (/* binding */ fixBulkDataURI)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Modifies a bulkDataURI to ensure it is absolute based on the DICOMWeb configuration and
 * instance data. The modification is in-place.
 *
 * If the bulkDataURI is relative to the series or study (according to the DICOM standard),
 * it is made absolute by prepending the relevant paths.
 *
 * In scenarios where the bulkDataURI is a server-relative path (starting with '/'), the function
 * handles two cases:
 *
 * 1. If the wado root is absolute (starts with 'http'), it prepends the wado root to the bulkDataURI.
 * 2. If the wado root is relative, no changes are needed as the bulkDataURI is already correctly relative to the server root.
 *
 * @param value - The object containing BulkDataURI to be fixed.
 * @param instance - The object (DICOM instance data) containing StudyInstanceUID and SeriesInstanceUID.
 * @param dicomWebConfig - The DICOMWeb configuration object, containing wadoRoot and potentially bulkDataURI.relativeResolution.
 * @returns The function modifies `value` in-place, it does not return a value.
 */
function fixBulkDataURI(value, instance, dicomWebConfig) {
  // in case of the relative path, make it absolute. The current DICOM standard says
  // the bulkdataURI is relative to the series. However, there are situations where
  // it can be relative to the study too
  let {
    BulkDataURI
  } = value;
  const {
    bulkDataURI: uriConfig = {}
  } = dicomWebConfig;
  BulkDataURI = uriConfig.transform?.(BulkDataURI) || BulkDataURI;

  // Handle incorrectly prefixed origins
  const {
    startsWith,
    prefixWith = ''
  } = uriConfig;
  if (startsWith && BulkDataURI.startsWith(startsWith)) {
    BulkDataURI = prefixWith + BulkDataURI.substring(startsWith.length);
    value.BulkDataURI = BulkDataURI;
  }
  if (!BulkDataURI.startsWith('http') && !value.BulkDataURI.startsWith('/')) {
    const {
      StudyInstanceUID,
      SeriesInstanceUID
    } = instance;
    const isInstanceStart = BulkDataURI.startsWith('instances/') || BulkDataURI.startsWith('../');
    if (BulkDataURI.startsWith('series/') || BulkDataURI.startsWith('bulkdata/') || uriConfig.relativeResolution === 'studies' && !isInstanceStart) {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/${BulkDataURI}`;
    } else if (isInstanceStart || uriConfig.relativeResolution === 'series' || !uriConfig.relativeResolution) {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/${BulkDataURI}`;
    }
    return;
  }

  // in case it is relative path but starts at the server (e.g., /bulk/1e, note the missing http
  // in the beginning and the first character is /) There are two scenarios, whether the wado root
  // is absolute or relative. In case of absolute, we need to prepend the wado root to the bulkdata
  // uri (e.g., bulkData: /bulk/1e, wado root: http://myserver.com/dicomweb, output: http://myserver.com/bulk/1e)
  // and in case of relative wado root, we need to prepend the bulkdata uri to the wado root (e.g,. bulkData: /bulk/1e
  // wado root: /dicomweb, output: /bulk/1e)
  if (BulkDataURI[0] === '/') {
    if (dicomWebConfig.wadoRoot.startsWith('http')) {
      // Absolute wado root
      const url = new URL(dicomWebConfig.wadoRoot);
      value.BulkDataURI = `${url.origin}${BulkDataURI}`;
    } else {
      // Relative wado root, we don't need to do anything, bulkdata uri is already correct
    }
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultiValueKeys.ts":
/*!*************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/fixMultiValueKeys.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixMultiValueKeys: () => (/* binding */ fixMultiValueKeys)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Fix multi-valued keys so that those which are strings split by
 * a backslash are returned as arrays.
 */
function fixMultiValueKeys(naturalData, keys = ['ImageType']) {
  for (const key of keys) {
    if (typeof naturalData[key] === 'string') {
      naturalData[key] = naturalData[key].split('\\');
    }
  }
  return naturalData;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultipart.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/fixMultipart.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fixMultipart),
/* harmony export */   findBoundary: () => (/* binding */ findBoundary),
/* harmony export */   findContentType: () => (/* binding */ findContentType),
/* harmony export */   uint8ArrayToString: () => (/* binding */ uint8ArrayToString)
/* harmony export */ });
/* harmony import */ var _findIndexOfString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./findIndexOfString */ "../../../extensions/default/src/DicomWebDataSource/utils/findIndexOfString.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Fix multipart data coming back from the retrieve bulkdata request, but
 * incorrectly tagged as application/octet-stream.  Some servers don't handle
 * the response type correctly, and this method is relatively robust about
 * detecting multipart data correctly.  It will only extract one value.
 */
function fixMultipart(arrayData) {
  const data = new Uint8Array(arrayData[0]);
  // Don't know the exact minimum length, but it is at least 25 to encode multipart
  if (data.length < 25) {
    return arrayData;
  }
  const dashIndex = (0,_findIndexOfString__WEBPACK_IMPORTED_MODULE_0__["default"])(data, '--');
  if (dashIndex > 6) {
    return arrayData;
  }
  const tokenIndex = (0,_findIndexOfString__WEBPACK_IMPORTED_MODULE_0__["default"])(data, '\r\n\r\n', dashIndex);
  if (tokenIndex > 512) {
    // Allow for 512 characters in the header - there is no apriori limit, but
    // this seems ok for now as we only expect it to have content type in it.
    return arrayData;
  }
  const header = uint8ArrayToString(data, 0, tokenIndex);
  // Now find the boundary  marker
  const responseHeaders = header.split('\r\n');
  const boundary = findBoundary(responseHeaders);
  if (!boundary) {
    return arrayData;
  }
  // Start of actual data is 4 characters after the token
  const offset = tokenIndex + 4;
  const endIndex = (0,_findIndexOfString__WEBPACK_IMPORTED_MODULE_0__["default"])(data, boundary, offset);
  if (endIndex === -1) {
    return arrayData;
  }
  return [data.slice(offset, endIndex - 2).buffer];
}
function findBoundary(header) {
  for (let i = 0; i < header.length; i++) {
    if (header[i].substr(0, 2) === '--') {
      return header[i];
    }
  }
}
function findContentType(header) {
  for (let i = 0; i < header.length; i++) {
    if (header[i].substr(0, 13) === 'Content-Type:') {
      return header[i].substr(13).trim();
    }
  }
}
function uint8ArrayToString(data, offset, length) {
  offset = offset || 0;
  length = length || data.length - offset;
  let str = '';
  for (let i = offset; i < offset + length; i++) {
    str += String.fromCharCode(data[i]);
  }
  return str;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getImageId)
/* harmony export */ });
/* harmony import */ var _getWADORSImageId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWADORSImageId */ "../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function buildInstanceWadoUrl(config, instance) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const params = [];
  params.push('requestType=WADO');
  params.push(`studyUID=${StudyInstanceUID}`);
  params.push(`seriesUID=${SeriesInstanceUID}`);
  params.push(`objectUID=${SOPInstanceUID}`);
  params.push('contentType=application/dicom');
  params.push('transferSyntax=*');
  const paramString = params.join('&');
  return `${config.wadoUriRoot}?${paramString}`;
}

/**
 * Obtain an imageId for Cornerstone from an image instance
 *
 * @param instance
 * @param frame
 * @param thumbnail
 * @returns {string} The imageId to be used by Cornerstone
 */
function getImageId({
  instance,
  frame,
  config,
  thumbnail = false
}) {
  if (!instance) {
    return;
  }
  if (instance.imageId && frame === undefined) {
    return instance.imageId;
  }
  if (instance.url) {
    return instance.url;
  }
  const renderingAttr = thumbnail ? 'thumbnailRendering' : 'imageRendering';
  if (!config[renderingAttr] || config[renderingAttr] === 'wadouri') {
    const wadouri = buildInstanceWadoUrl(config, instance);
    let imageId = 'dicomweb:' + wadouri;
    if (frame !== undefined) {
      imageId += '&frame=' + frame;
    }
    return imageId;
  } else {
    return (0,_getWADORSImageId__WEBPACK_IMPORTED_MODULE_0__["default"])(instance, config, frame); // WADO-RS Retrieve Frame
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWADORSImageId)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function buildInstanceWadoRsUri(instance, config) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  return `${config.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}`;
}
function buildInstanceFrameWadoRsUri(instance, config, frame) {
  const baseWadoRsUri = buildInstanceWadoRsUri(instance, config);
  frame = frame || 1;
  return `${baseWadoRsUri}/frames/${frame}`;
}

// function getWADORSImageUrl(instance, frame) {
//   const wadorsuri = buildInstanceFrameWadoRsUri(instance, config, frame);

//   if (!wadorsuri) {
//     return;
//   }

//   // Use null to obtain an imageId which represents the instance
//   if (frame === null) {
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, '');
//   } else {
//     // We need to sum 1 because WADO-RS frame number is 1-based
//     frame = frame ? parseInt(frame) + 1 : 1;

//     // Replaces /frame/1 by /frame/{frame}
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, `frames/${frame}`);
//   }

//   return wadorsuri;
// }

/**
 * Obtain an imageId for Cornerstone based on the WADO-RS scheme
 *
 * @param {object} instanceMetada metadata object (InstanceMetadata)
 * @param {(string\|number)} [frame] the frame number
 * @returns {string} The imageId to be used by Cornerstone
 */
function getWADORSImageId(instance, config, frame) {
  //const uri = getWADORSImageUrl(instance, frame);
  const uri = buildInstanceFrameWadoRsUri(instance, config, frame);
  if (!uri) {
    return;
  }
  return `wadors:${uri}`;
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/index.ts":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/index.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanDenaturalizedDataset: () => (/* reexport safe */ _cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_1__.cleanDenaturalizedDataset),
/* harmony export */   fixBulkDataURI: () => (/* reexport safe */ _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__.fixBulkDataURI),
/* harmony export */   fixMultiValueKeys: () => (/* reexport safe */ _fixMultiValueKeys__WEBPACK_IMPORTED_MODULE_2__.fixMultiValueKeys),
/* harmony export */   transferDenaturalizedDataset: () => (/* reexport safe */ _cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_1__.transferDenaturalizedDataset)
/* harmony export */ });
/* harmony import */ var _fixBulkDataURI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fixBulkDataURI */ "../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts");
/* harmony import */ var _cleanDenaturalizedDataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cleanDenaturalizedDataset */ "../../../extensions/default/src/DicomWebDataSource/utils/cleanDenaturalizedDataset.ts");
/* harmony import */ var _fixMultiValueKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fixMultiValueKeys */ "../../../extensions/default/src/DicomWebDataSource/utils/fixMultiValueKeys.ts");
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

/***/ "../../../extensions/default/src/DicomWebDataSource/utils/retrieveMetadataFiltered.js":
/*!********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/utils/retrieveMetadataFiltered.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wado_retrieveMetadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../wado/retrieveMetadata */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Retrieve metadata filtered.
 *
 * @param {*} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {*} StudyInstanceUID The UID of the Study to be retrieved
 * @param {*} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously
 * @param {object} filters Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns
 */
function retrieveMetadataFiltered(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction) {
  const {
    seriesInstanceUID
  } = filters;
  return new Promise((resolve, reject) => {
    const promises = seriesInstanceUID.map(uid => {
      const seriesSpecificFilters = Object.assign({}, filters, {
        seriesInstanceUID: uid
      });
      return (0,_wado_retrieveMetadata__WEBPACK_IMPORTED_MODULE_0__["default"])(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, seriesSpecificFilters, sortCriteria, sortFunction);
    });
    if (enableStudyLazyLoad === true) {
      Promise.all(promises).then(results => {
        const aggregatedResult = {
          preLoadData: [],
          promises: []
        };
        results.forEach(({
          preLoadData,
          promises
        }) => {
          aggregatedResult.preLoadData = aggregatedResult.preLoadData.concat(preLoadData);
          aggregatedResult.promises = aggregatedResult.promises.concat(promises);
        });
        resolve(aggregatedResult);
      }, reject);
    } else {
      Promise.all(promises).then(results => {
        resolve(results.flat());
      }, reject);
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (retrieveMetadataFiltered);

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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _retrieveMetadataLoaderSync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retrieveMetadataLoaderSync */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js");
/* harmony import */ var _retrieveMetadataLoaderAsync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retrieveMetadataLoaderAsync */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Retrieve Study metadata from a DICOM server. If the server is configured to use lazy load, only the first series
 * will be loaded and the property "studyLoader" will be set to let consumer load remaining series as needed.
 *
 * @param {*} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {*} StudyInstanceUID The UID of the Study to be retrieved
 * @param {*} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously
 * @param {object} filters Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns {Promise} A promises that resolves the study descriptor object
 */
async function RetrieveMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters = {}, sortCriteria, sortFunction) {
  const RetrieveMetadataLoader = enableStudyLazyLoad !== false ? _retrieveMetadataLoaderAsync__WEBPACK_IMPORTED_MODULE_1__["default"] : _retrieveMetadataLoaderSync__WEBPACK_IMPORTED_MODULE_0__["default"];
  const retrieveMetadataLoader = new RetrieveMetadataLoader(dicomWebClient, StudyInstanceUID, filters, sortCriteria, sortFunction);
  const data = await retrieveMetadataLoader.execLoad();
  return data;
}
_c2 = RetrieveMetadata;
_c = RetrieveMetadata;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RetrieveMetadata);
var _c;
__webpack_require__.$Refresh$.register(_c, "RetrieveMetadata");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "RetrieveMetadata");

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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoader)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Class to define inheritance of load retrieve strategy.
 * The process can be async load (lazy) or sync load
 *
 * There are methods that must be implemented at consumer level
 * To retrieve study call execLoad
 */
class RetrieveMetadataLoader {
  /**
   * @constructor
   * @param {Object} client The dicomweb-client.
   * @param {Array} studyInstanceUID Study instance ui to be retrieved
   * @param {Object} [filters] - Object containing filters to be applied on retrieve metadata process
   * @param {string} [filters.seriesInstanceUID] - series instance uid to filter results against
   * @param {Object} [sortCriteria] - Custom sort criteria used for series
   * @param {Function} [sortFunction] - Custom sort function for series
   */
  constructor(client, studyInstanceUID, filters = {}, sortCriteria = undefined, sortFunction = undefined) {
    this.client = client;
    this.studyInstanceUID = studyInstanceUID;
    this.filters = filters;
    this.sortCriteria = sortCriteria;
    this.sortFunction = sortFunction;
  }
  async execLoad() {
    const preLoadData = await this.preLoad();
    const loadData = await this.load(preLoadData);
    const postLoadData = await this.posLoad(loadData);
    return postLoadData;
  }

  /**
   * It iterates over given loaders running each one. Loaders parameters must be bind when getting it.
   * @param {Array} loaders - array of loader to retrieve data.
   */
  async runLoaders(loaders) {
    let result;
    for (const loader of loaders) {
      result = await loader();
      if (result && result.length) {
        break; // closes iterator in case data is retrieved successfully
      }
    }
    if (loaders.next().done && !result) {
      throw new Error('RetrieveMetadataLoader failed');
    }
    return result;
  }

  // Methods to be overwrite
  async configLoad() {}
  async preLoad() {}
  async load(preLoadData) {}
  async posLoad(loadData) {}
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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js":
/*!**********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeferredPromise: () => (/* binding */ DeferredPromise),
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoaderAsync)
/* harmony export */ });
/* harmony import */ var dcmjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dcmjs */ "../../../node_modules/dcmjs/build/dcmjs.es.js");
/* harmony import */ var _ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/sortStudy */ "../../core/src/utils/sortStudy.ts");
/* harmony import */ var _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retrieveMetadataLoader */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





// Series Date, Series Time, Series Description and Series Number to be included
// in the series metadata query result
const includeField = ['00080021', '00080031', '0008103E', '00200011'].join(',');
class DeferredPromise {
  constructor() {
    this.metadata = undefined;
    this.processFunction = undefined;
    this.internalPromise = undefined;
    this.thenFunction = undefined;
    this.rejectFunction = undefined;
  }
  setMetadata(metadata) {
    this.metadata = metadata;
  }
  setProcessFunction(func) {
    this.processFunction = func;
  }
  getPromise() {
    return this.start();
  }
  start() {
    if (this.internalPromise) {
      return this.internalPromise;
    }
    this.internalPromise = this.processFunction();
    // in case then and reject functions called before start
    if (this.thenFunction) {
      this.then(this.thenFunction);
      this.thenFunction = undefined;
    }
    if (this.rejectFunction) {
      this.reject(this.rejectFunction);
      this.rejectFunction = undefined;
    }
    return this.internalPromise;
  }
  then(func) {
    if (this.internalPromise) {
      return this.internalPromise.then(func);
    } else {
      this.thenFunction = func;
    }
  }
  reject(func) {
    if (this.internalPromise) {
      return this.internalPromise.reject(func);
    } else {
      this.rejectFunction = func;
    }
  }
}
/**
 * Creates an immutable series loader object which loads each series sequentially using the iterator interface.
 *
 * @param {DICOMWebClient} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {string} studyInstanceUID The Study Instance UID from which series will be loaded
 * @param {Array} seriesInstanceUIDList A list of Series Instance UIDs
 *
 * @returns {Object} Returns an object which supports loading of instances from each of given Series Instance UID
 */
function makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDList) {
  return Object.freeze({
    hasNext() {
      return seriesInstanceUIDList.length > 0;
    },
    next() {
      const {
        seriesInstanceUID,
        metadata
      } = seriesInstanceUIDList.shift();
      const promise = new DeferredPromise();
      promise.setMetadata(metadata);
      promise.setProcessFunction(() => {
        return client.retrieveSeriesMetadata({
          studyInstanceUID,
          seriesInstanceUID
        });
      });
      return promise;
    }
  });
}

/**
 * Class for async load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * It loads the one series and then append to seriesLoader the others to be consumed/loaded
 */
class RetrieveMetadataLoaderAsync extends _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_2__["default"] {
  /**
   * @returns {Array} Array of preLoaders. To be consumed as queue
   */
  *getPreLoaders() {
    const preLoaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;

    // asking to include Series Date, Series Time, Series Description
    // and Series Number in the series metadata returned to better sort series
    // in preLoad function
    let options = {
      studyInstanceUID,
      queryParams: {
        includefield: includeField
      }
    };
    if (seriesInstanceUID) {
      options.queryParams.SeriesInstanceUID = seriesInstanceUID;
      preLoaders.push(client.searchForSeries.bind(client, options));
    }
    // Fallback preloader
    preLoaders.push(client.searchForSeries.bind(client, options));
    yield* preLoaders;
  }
  async preLoad() {
    const preLoaders = this.getPreLoaders();
    const result = await this.runLoaders(preLoaders);
    const sortCriteria = this.sortCriteria;
    const sortFunction = this.sortFunction;
    const {
      naturalizeDataset
    } = dcmjs__WEBPACK_IMPORTED_MODULE_0__["default"].data.DicomMetaDictionary;
    const naturalized = result.map(naturalizeDataset);
    return (0,_ohif_core_src_utils_sortStudy__WEBPACK_IMPORTED_MODULE_1__.sortStudySeries)(naturalized, sortCriteria, sortFunction);
  }
  async load(preLoadData) {
    const {
      client,
      studyInstanceUID
    } = this;
    const seriesInstanceUIDs = preLoadData.map(seriesMetadata => {
      return {
        seriesInstanceUID: seriesMetadata.SeriesInstanceUID,
        metadata: seriesMetadata
      };
    });
    const seriesAsyncLoader = makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDs);
    const promises = [];
    while (seriesAsyncLoader.hasNext()) {
      const promise = seriesAsyncLoader.next();
      promises.push(promise);
    }
    return {
      preLoadData,
      promises
    };
  }
  async posLoad({
    preLoadData,
    promises
  }) {
    return {
      preLoadData,
      promises
    };
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

/***/ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RetrieveMetadataLoaderSync)
/* harmony export */ });
/* harmony import */ var _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./retrieveMetadataLoader */ "../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// import { api } from 'dicomweb-client';
// import DICOMWeb from '../../../DICOMWeb/';



/**
 * Class for sync load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * A list of loaders (getLoaders) can be created so, it will be applied a fallback load strategy.
 * I.e Retrieve metadata using all loaders possibilities.
 */
class RetrieveMetadataLoaderSync extends _retrieveMetadataLoader__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getOptions() {
    const {
      studyInstanceUID,
      filters
    } = this;
    const options = {
      studyInstanceUID
    };
    const {
      seriesInstanceUID
    } = filters;
    if (seriesInstanceUID) {
      options['seriesInstanceUID'] = seriesInstanceUID;
    }
    return options;
  }

  /**
   * @returns {Array} Array of loaders. To be consumed as queue
   */
  *getLoaders() {
    const loaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;
    if (seriesInstanceUID) {
      loaders.push(client.retrieveSeriesMetadata.bind(client, {
        studyInstanceUID,
        seriesInstanceUID
      }));
    }
    loaders.push(client.retrieveStudyMetadata.bind(client, {
      studyInstanceUID
    }));
    yield* loaders;
  }
  async load(preLoadData) {
    const loaders = this.getLoaders();
    const result = this.runLoaders(loaders);
    return result;
  }
  async posLoad(loadData) {
    return loadData;
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

/***/ "../../../extensions/default/src/DicomWebProxyDataSource/index.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/DicomWebProxyDataSource/index.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDicomWebProxyApi: () => (/* binding */ createDicomWebProxyApi)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DicomWebDataSource/index */ "../../../extensions/default/src/DicomWebDataSource/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * This datasource is initialized with a url that returns a JSON object with a
 * dicomWeb datasource configuration array present in a "servers" object.
 *
 * Only the first array item is parsed, if there are multiple items in the
 * dicomWeb configuration array
 *
 */
function createDicomWebProxyApi(dicomWebProxyConfig, servicesManager) {
  const {
    name
  } = dicomWebProxyConfig;
  let dicomWebDelegate = undefined;
  const implementation = {
    initialize: async ({
      params,
      query
    }) => {
      const url = query.get('url');
      if (!url) {
        throw new Error(`No url for '${name}'`);
      } else {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.servers?.dicomWeb?.[0]) {
          throw new Error('Invalid configuration returned by url');
        }
        dicomWebDelegate = (0,_DicomWebDataSource_index__WEBPACK_IMPORTED_MODULE_1__.createDicomWebApi)(data.servers.dicomWeb[0].configuration || data.servers.dicomWeb[0], servicesManager);
        dicomWebDelegate.initialize({
          params,
          query
        });
      }
    },
    query: {
      studies: {
        search: params => dicomWebDelegate.query.studies.search(params)
      },
      series: {
        search: (...args) => dicomWebDelegate.query.series.search(...args)
      },
      instances: {
        search: (studyInstanceUid, queryParameters) => dicomWebDelegate.query.instances.search(studyInstanceUid, queryParameters)
      }
    },
    retrieve: {
      directURL: (...args) => dicomWebDelegate.retrieve.directURL(...args),
      series: {
        metadata: async (...args) => dicomWebDelegate.retrieve.series.metadata(...args)
      }
    },
    store: {
      dicom: (...args) => dicomWebDelegate.store(...args)
    },
    deleteStudyMetadataPromise: (...args) => dicomWebDelegate.deleteStudyMetadataPromise(...args),
    getImageIdsForDisplaySet: (...args) => dicomWebDelegate.getImageIdsForDisplaySet(...args),
    getImageIdsForInstance: (...args) => dicomWebDelegate.getImageIdsForInstance(...args),
    getStudyInstanceUIDs({
      params,
      query
    }) {
      let studyInstanceUIDs = [];

      // there seem to be a couple of variations of the case for this parameter
      const queryStudyInstanceUIDs = query.get('studyInstanceUIDs') || query.get('studyInstanceUids');
      if (!queryStudyInstanceUIDs) {
        throw new Error(`No studyInstanceUids in request for '${name}'`);
      }
      studyInstanceUIDs = queryStudyInstanceUIDs.split(';');
      return studyInstanceUIDs;
    }
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/MergeDataSource/index.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/default/src/MergeDataSource/index.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callByRetrieveAETitle: () => (/* binding */ callByRetrieveAETitle),
/* harmony export */   callForAllDataSources: () => (/* binding */ callForAllDataSources),
/* harmony export */   callForAllDataSourcesAsync: () => (/* binding */ callForAllDataSourcesAsync),
/* harmony export */   callForDefaultDataSource: () => (/* binding */ callForDefaultDataSource),
/* harmony export */   createMergeDataSourceApi: () => (/* binding */ createMergeDataSourceApi),
/* harmony export */   mergeMap: () => (/* binding */ mergeMap)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "../../../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const mergeMap = {
  'query.studies.search': {
    mergeKey: 'studyInstanceUid',
    tagFunc: x => x
  },
  'query.series.search': {
    mergeKey: 'seriesInstanceUid',
    tagFunc: (series, sourceName) => {
      series.forEach(series => {
        series.RetrieveAETitle = sourceName;
        _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.updateSeriesMetadata(series);
      });
      return series;
    }
  }
};

/**
 * Calls all data sources asynchronously and merges the results.
 * @param {CallForAllDataSourcesAsyncOptions} options - The options for calling all data sources.
 * @param {string} options.path - The path to the function to be called on each data source.
 * @param {unknown[]} options.args - The arguments to be passed to the function.
 * @param {ExtensionManager} options.extensionManager - The extension manager.
 * @param {string[]} options.dataSourceNames - The names of the data sources to be called.
 * @param {string} options.defaultDataSourceName - The name of the default data source.
 * @returns {Promise<unknown[]>} - A promise that resolves to the merged data from all data sources.
 */
const callForAllDataSourcesAsync = async ({
  mergeMap,
  path,
  args,
  extensionManager,
  dataSourceNames,
  defaultDataSourceName
}) => {
  const {
    mergeKey,
    tagFunc
  } = mergeMap[path] || {
    tagFunc: x => x
  };

  /** Sort by default data source */
  const defs = Object.values(extensionManager.dataSourceDefs);
  const defaultDataSourceDef = defs.find(def => def.sourceName === defaultDataSourceName);
  const dataSourceDefs = defs.filter(def => def.sourceName !== defaultDataSourceName);
  if (defaultDataSourceDef) {
    dataSourceDefs.unshift(defaultDataSourceDef);
  }
  const promises = [];
  const sourceNames = [];
  for (const dataSourceDef of dataSourceDefs) {
    const {
      configuration,
      sourceName
    } = dataSourceDef;
    if (!!configuration && dataSourceNames.includes(sourceName)) {
      const [dataSource] = extensionManager.getDataSources(sourceName);
      const func = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(dataSource, path);
      const promise = func.apply(dataSource, args);
      promises.push(promise);
      sourceNames.push(sourceName);
    }
  }
  const data = await Promise.allSettled(promises);
  const mergedData = data.map((data, i) => tagFunc(data.value, sourceNames[i]));
  let results = [];
  if (mergeKey) {
    results = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.uniqBy)(mergedData.flat(), obj => (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(obj, mergeKey));
  } else {
    results = mergedData.flat();
  }
  return results;
};

/**
 * Calls all data sources that match the provided names and merges their data.
 * @param options - The options for calling all data sources.
 * @param options.path - The path to the function to be called on each data source.
 * @param options.args - The arguments to be passed to the function.
 * @param options.extensionManager - The extension manager instance.
 * @param options.dataSourceNames - The names of the data sources to be called.
 * @param options.defaultDataSourceName - The name of the default data source.
 * @returns The merged data from all the matching data sources.
 */
const callForAllDataSources = ({
  path,
  args,
  extensionManager,
  dataSourceNames,
  defaultDataSourceName
}) => {
  /** Sort by default data source */
  const defs = Object.values(extensionManager.dataSourceDefs);
  const defaultDataSourceDef = defs.find(def => def.sourceName === defaultDataSourceName);
  const dataSourceDefs = defs.filter(def => def.sourceName !== defaultDataSourceName);
  if (defaultDataSourceDef) {
    dataSourceDefs.unshift(defaultDataSourceDef);
  }
  const mergedData = [];
  for (const dataSourceDef of dataSourceDefs) {
    const {
      configuration,
      sourceName
    } = dataSourceDef;
    if (!!configuration && dataSourceNames.includes(sourceName)) {
      const [dataSource] = extensionManager.getDataSources(sourceName);
      const func = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(dataSource, path);
      const data = func.apply(dataSource, args);
      mergedData.push(data);
    }
  }
  return mergedData.flat();
};

/**
 * Calls the default data source function specified by the given path with the provided arguments.
 * @param {CallForDefaultDataSourceOptions} options - The options for calling the default data source.
 * @param {string} options.path - The path to the function within the default data source.
 * @param {unknown[]} options.args - The arguments to pass to the function.
 * @param {string} options.defaultDataSourceName - The name of the default data source.
 * @param {ExtensionManager} options.extensionManager - The extension manager instance.
 * @returns {unknown} - The result of calling the default data source function.
 */
const callForDefaultDataSource = ({
  path,
  args,
  defaultDataSourceName,
  extensionManager
}) => {
  const [dataSource] = extensionManager.getDataSources(defaultDataSourceName);
  const func = (0,lodash__WEBPACK_IMPORTED_MODULE_1__.get)(dataSource, path);
  return func.apply(dataSource, args);
};

/**
 * Calls the data source specified by the RetrieveAETitle of the given display set.
 * @typedef {Object} CallByRetrieveAETitleOptions
 * @property {string} path - The path of the method to call on the data source.
 * @property {any[]} args - The arguments to pass to the method.
 * @property {string} defaultDataSourceName - The name of the default data source.
 * @property {ExtensionManager} extensionManager - The extension manager.
 */
const callByRetrieveAETitle = ({
  path,
  args,
  defaultDataSourceName,
  extensionManager
}) => {
  const [displaySet] = args;
  const seriesMetadata = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getSeries(displaySet.StudyInstanceUID, displaySet.SeriesInstanceUID);
  const [dataSource] = extensionManager.getDataSources(seriesMetadata.RetrieveAETitle || defaultDataSourceName);
  return dataSource[path](...args);
};
function createMergeDataSourceApi(mergeConfig, servicesManager, extensionManager) {
  const {
    seriesMerge
  } = mergeConfig;
  const {
    dataSourceNames,
    defaultDataSourceName
  } = seriesMerge;
  const implementation = {
    initialize: (...args) => callForAllDataSources({
      path: 'initialize',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    }),
    query: {
      studies: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.studies.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      },
      series: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.series.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      },
      instances: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.instances.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      }
    },
    retrieve: {
      bulkDataURI: (...args) => callForAllDataSourcesAsync({
        mergeMap,
        path: 'retrieve.bulkDataURI',
        args,
        extensionManager,
        dataSourceNames,
        defaultDataSourceName
      }),
      directURL: (...args) => callForDefaultDataSource({
        path: 'retrieve.directURL',
        args,
        defaultDataSourceName,
        extensionManager
      }),
      series: {
        metadata: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'retrieve.series.metadata',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      }
    },
    store: {
      dicom: (...args) => callForDefaultDataSource({
        path: 'store.dicom',
        args,
        defaultDataSourceName,
        extensionManager
      })
    },
    deleteStudyMetadataPromise: (...args) => callForAllDataSources({
      path: 'deleteStudyMetadataPromise',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    }),
    getImageIdsForDisplaySet: (...args) => callByRetrieveAETitle({
      path: 'getImageIdsForDisplaySet',
      args,
      defaultDataSourceName,
      extensionManager
    }),
    getImageIdsForInstance: (...args) => callByRetrieveAETitle({
      path: 'getImageIdsForDisplaySet',
      args,
      defaultDataSourceName,
      extensionManager
    }),
    getStudyInstanceUIDs: (...args) => callForAllDataSources({
      path: 'getStudyInstanceUIDs',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    })
  };
  return _ohif_core__WEBPACK_IMPORTED_MODULE_0__.IWebApiDataSource.create(implementation);
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

/***/ "../../../extensions/default/src/Panels/DataSourceSelector.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/Panels/DataSourceSelector.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();





function DataSourceSelector() {
  _s2();
  _s();
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();

  // This is frowned upon, but the raw config is needed here to provide
  // the selector
  const dsConfigs = appConfig.dataSources;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex h-screen w-screen items-center justify-center "
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-secondary-dark mx-auto space-y-2 rounded-lg py-8 px-8 drop-shadow-md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: "mx-auto block h-14",
    src: "./ohif-logo.svg",
    alt: "OHIF"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "space-y-2 pt-4 text-center"
  }, dsConfigs.filter(it => it.sourceName !== 'dicomjson' && it.sourceName !== 'dicomlocal').map(ds => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: ds.sourceName
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-white"
  }, ds.configuration?.friendlyName || ds.friendlyName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    type: _ohif_ui__WEBPACK_IMPORTED_MODULE_4__.ButtonEnums.type.primary,
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ml-2'),
    onClick: () => {
      navigate({
        pathname: '/',
        search: `datasources=${ds.sourceName}`
      });
    }
  }, ds.sourceName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null)))))));
}
_s2(DataSourceSelector, "vWWYUHztbe5Wm6NOy7wIPD3E4Q4=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig, react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate];
});
_c2 = DataSourceSelector;
_s(DataSourceSelector, "vWWYUHztbe5Wm6NOy7wIPD3E4Q4=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig, react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate];
});
_c = DataSourceSelector;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DataSourceSelector);
var _c;
__webpack_require__.$Refresh$.register(_c, "DataSourceSelector");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "DataSourceSelector");

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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PanelStudyBrowserHeader */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "../../../extensions/default/src/Panels/StudyBrowser/constants/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();








const {
  sortStudyInstances,
  formatDate,
  createStudyBrowserTabs
} = _ohif_core__WEBPACK_IMPORTED_MODULE_3__.utils;

/**
 *
 * @param {*} param0
 */
function PanelStudyBrowser({
  servicesManager,
  getImageSrc,
  getStudiesForPatientByMRN,
  requestDisplaySetCreationForStudy,
  dataSource,
  commandsManager
}) {
  _s2();
  _s();
  const {
    hangingProtocolService,
    displaySetService,
    uiNotificationService,
    customizationService
  } = servicesManager.services;
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate)();

  // Normally you nest the components so the tree isn't so deep, and the data
  // doesn't have to have such an intense shape. This works well enough for now.
  // Tabs --> Studies --> DisplaySets --> Thumbnails
  const {
    StudyInstanceUIDs
  } = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useImageViewer)();
  const [{
    activeViewportId,
    viewports,
    isHangingProtocolLayout
  }, viewportGridService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid)();
  const [activeTabName, setActiveTabName] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('all');
  const [expandedStudyInstanceUIDs, setExpandedStudyInstanceUIDs] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([...StudyInstanceUIDs]);
  const [hasLoadedViewports, setHasLoadedViewports] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [studyDisplayList, setStudyDisplayList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [displaySets, setDisplaySets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [thumbnailImageSrcMap, setThumbnailImageSrcMap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [viewPresets, setViewPresets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(customizationService.getCustomization('studyBrowser.viewPresets')?.value || _constants__WEBPACK_IMPORTED_MODULE_6__.defaultViewPresets);
  const [actionIcons, setActionIcons] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_constants__WEBPACK_IMPORTED_MODULE_6__.defaultActionIcons);

  // multiple can be true or false
  const updateActionIconValue = actionIcon => {
    actionIcon.value = !actionIcon.value;
    const newActionIcons = [...actionIcons];
    setActionIcons(newActionIcons);
  };

  // only one is true at a time
  const updateViewPresetValue = viewPreset => {
    if (!viewPreset) {
      return;
    }
    const newViewPresets = viewPresets.map(preset => {
      preset.selected = preset.id === viewPreset.id;
      return preset;
    });
    setViewPresets(newViewPresets);
  };
  const onDoubleClickThumbnailHandler = displaySetInstanceUID => {
    let updatedViewports = [];
    const viewportId = activeViewportId;
    try {
      updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportId, displaySetInstanceUID, isHangingProtocolLayout);
    } catch (error) {
      console.warn(error);
      uiNotificationService.show({
        title: 'Thumbnail Double Click',
        message: 'The selected display sets could not be added to the viewport.',
        type: 'error',
        duration: 3000
      });
    }
    viewportGridService.setDisplaySetsForViewports(updatedViewports);
  };

  // ~~ studyDisplayList
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Fetch all studies for the patient in each primary study
    async function fetchStudiesForPatient(StudyInstanceUID) {
      // current study qido
      const qidoForStudyUID = await dataSource.query.studies.search({
        studyInstanceUid: StudyInstanceUID
      });
      if (!qidoForStudyUID?.length) {
        navigate('/notfoundstudy', '_self');
        throw new Error('Invalid study URL');
      }
      let qidoStudiesForPatient = qidoForStudyUID;

      // try to fetch the prior studies based on the patientID if the
      // server can respond.
      try {
        qidoStudiesForPatient = await getStudiesForPatientByMRN(qidoForStudyUID);
      } catch (error) {
        console.warn(error);
      }
      const mappedStudies = _mapDataSourceStudies(qidoStudiesForPatient);
      const actuallyMappedStudies = mappedStudies.map(qidoStudy => {
        return {
          studyInstanceUid: qidoStudy.StudyInstanceUID,
          date: formatDate(qidoStudy.StudyDate),
          description: qidoStudy.StudyDescription,
          modalities: qidoStudy.ModalitiesInStudy,
          numInstances: qidoStudy.NumInstances
        };
      });
      setStudyDisplayList(prevArray => {
        const ret = [...prevArray];
        for (const study of actuallyMappedStudies) {
          if (!prevArray.find(it => it.studyInstanceUid === study.studyInstanceUid)) {
            ret.push(study);
          }
        }
        return ret;
      });
    }
    StudyInstanceUIDs.forEach(sid => fetchStudiesForPatient(sid));
  }, [StudyInstanceUIDs, dataSource, getStudiesForPatientByMRN, navigate]);

  // // ~~ Initial Thumbnails
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!hasLoadedViewports) {
      if (activeViewportId) {
        // Once there is an active viewport id, it means the layout is ready
        // so wait a bit of time to allow the viewports preferential loading
        // which improves user experience of responsiveness significantly on slower
        // systems.
        window.setTimeout(() => setHasLoadedViewports(true), 250);
      }
      return;
    }
    const currentDisplaySets = displaySetService.activeDisplaySets;
    currentDisplaySets.forEach(async dSet => {
      const newImageSrcEntry = {};
      const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
      const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
      const imageId = imageIds[Math.floor(imageIds.length / 2)];

      // TODO: Is it okay that imageIds are not returned here for SR displaySets?
      if (!imageId || displaySet?.unsupported) {
        return;
      }
      // When the image arrives, render it and store the result in the thumbnailImgSrcMap
      newImageSrcEntry[dSet.displaySetInstanceUID] = await getImageSrc(imageId);
      setThumbnailImageSrcMap(prevState => {
        return {
          ...prevState,
          ...newImageSrcEntry
        };
      });
    });
  }, [StudyInstanceUIDs, dataSource, displaySetService, getImageSrc, hasLoadedViewports, activeViewportId]);

  // ~~ displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // TODO: Are we sure `activeDisplaySets` will always be accurate?
    const currentDisplaySets = displaySetService.activeDisplaySets;
    const mappedDisplaySets = _mapDisplaySets(currentDisplaySets, thumbnailImageSrcMap);
    sortStudyInstances(mappedDisplaySets);
    setDisplaySets(mappedDisplaySets);
  }, [StudyInstanceUIDs, thumbnailImageSrcMap, displaySetService]);

  // ~~ subscriptions --> displaySets
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // DISPLAY_SETS_ADDED returns an array of DisplaySets that were added
    const SubscriptionDisplaySetsAdded = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, data => {
      // for some reason this breaks thumbnail loading
      // if (!hasLoadedViewports) {
      //   return;
      // }
      const {
        displaySetsAdded
      } = data;
      displaySetsAdded.forEach(async dSet => {
        const newImageSrcEntry = {};
        const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
        if (displaySet?.unsupported) {
          return;
        }
        const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
        const imageId = imageIds[Math.floor(imageIds.length / 2)];

        // TODO: Is it okay that imageIds are not returned here for SR displaysets?
        if (!imageId) {
          return;
        }
        // When the image arrives, render it and store the result in the thumbnailImgSrcMap
        newImageSrcEntry[dSet.displaySetInstanceUID] = await getImageSrc(imageId, dSet.initialViewport);
        setThumbnailImageSrcMap(prevState => {
          return {
            ...prevState,
            ...newImageSrcEntry
          };
        });
      });
    });
    return () => {
      SubscriptionDisplaySetsAdded.unsubscribe();
    };
  }, [getImageSrc, dataSource, displaySetService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // TODO: Will this always hold _all_ the displaySets we care about?
    // DISPLAY_SETS_CHANGED returns `DisplaySerService.activeDisplaySets`
    const SubscriptionDisplaySetsChanged = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_CHANGED, changedDisplaySets => {
      const mappedDisplaySets = _mapDisplaySets(changedDisplaySets, thumbnailImageSrcMap);
      setDisplaySets(mappedDisplaySets);
    });
    const SubscriptionDisplaySetMetaDataInvalidated = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SET_SERIES_METADATA_INVALIDATED, () => {
      const mappedDisplaySets = _mapDisplaySets(displaySetService.getActiveDisplaySets(), thumbnailImageSrcMap);
      setDisplaySets(mappedDisplaySets);
    });
    return () => {
      SubscriptionDisplaySetsChanged.unsubscribe();
      SubscriptionDisplaySetMetaDataInvalidated.unsubscribe();
    };
  }, [StudyInstanceUIDs, thumbnailImageSrcMap, displaySetService]);
  const tabs = createStudyBrowserTabs(StudyInstanceUIDs, studyDisplayList, displaySets);

  // TODO: Should not fire this on "close"
  function _handleStudyClick(StudyInstanceUID) {
    const shouldCollapseStudy = expandedStudyInstanceUIDs.includes(StudyInstanceUID);
    const updatedExpandedStudyInstanceUIDs = shouldCollapseStudy ?
    // eslint-disable-next-line prettier/prettier
    [...expandedStudyInstanceUIDs.filter(stdyUid => stdyUid !== StudyInstanceUID)] : [...expandedStudyInstanceUIDs, StudyInstanceUID];
    setExpandedStudyInstanceUIDs(updatedExpandedStudyInstanceUIDs);
    if (!shouldCollapseStudy) {
      const madeInClient = true;
      requestDisplaySetCreationForStudy(displaySetService, StudyInstanceUID, madeInClient);
    }
  }
  const activeDisplaySetInstanceUIDs = viewports.get(activeViewportId)?.displaySetInstanceUIDs;
  const onThumbnailContextMenu = (commandName, options) => {
    commandsManager.runCommand(commandName, options);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_5__.PanelStudyBrowserHeader, {
    viewPresets: viewPresets,
    updateViewPresetValue: updateViewPresetValue,
    actionIcons: actionIcons,
    updateActionIconValue: updateActionIconValue
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Separator, {
    orientation: "horizontal",
    className: "bg-black",
    thickness: "2px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.StudyBrowser, {
    tabs: tabs,
    servicesManager: servicesManager,
    activeTabName: activeTabName,
    onDoubleClickThumbnail: onDoubleClickThumbnailHandler,
    activeDisplaySetInstanceUIDs: activeDisplaySetInstanceUIDs,
    expandedStudyInstanceUIDs: expandedStudyInstanceUIDs,
    onClickStudy: _handleStudyClick,
    onClickTab: clickedTabName => {
      setActiveTabName(clickedTabName);
    },
    showSettings: actionIcons.find(icon => icon.id === 'settings').value,
    viewPresets: viewPresets,
    onThumbnailContextMenu: onThumbnailContextMenu
  }));
}
_s2(PanelStudyBrowser, "etmF4qX2Pf0Iotai0oLVlwCj45g=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate, _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useImageViewer, _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid];
});
_c2 = PanelStudyBrowser;
_s(PanelStudyBrowser, "cNMsu3qlFJkwCV2QrWKb4D3RvEU=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useNavigate, _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useImageViewer, _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useViewportGrid];
});
_c = PanelStudyBrowser;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PanelStudyBrowser);

/**
 * Maps from the DataSource's format to a naturalized object
 *
 * @param {*} studies
 */
function _mapDataSourceStudies(studies) {
  return studies.map(study => {
    // TODO: Why does the data source return in this format?
    return {
      AccessionNumber: study.accession,
      StudyDate: study.date,
      StudyDescription: study.description,
      NumInstances: study.instances,
      ModalitiesInStudy: study.modalities,
      PatientID: study.mrn,
      PatientName: study.patientName,
      StudyInstanceUID: study.studyInstanceUid,
      StudyTime: study.time
    };
  });
}
function _mapDisplaySets(displaySets, thumbnailImageSrcMap) {
  const thumbnailDisplaySets = [];
  const thumbnailNoImageDisplaySets = [];
  displaySets.filter(ds => !ds.excludeFromThumbnailBrowser).forEach(ds => {
    const imageSrc = thumbnailImageSrcMap[ds.displaySetInstanceUID];
    const componentType = _getComponentType(ds);
    const array = componentType === 'thumbnail' ? thumbnailDisplaySets : thumbnailNoImageDisplaySets;
    array.push({
      displaySetInstanceUID: ds.displaySetInstanceUID,
      description: ds.SeriesDescription || '',
      seriesNumber: ds.SeriesNumber,
      modality: ds.Modality,
      seriesDate: ds.SeriesDate,
      seriesTime: ds.SeriesTime,
      numInstances: ds.numImageFrames,
      countIcon: ds.countIcon,
      StudyInstanceUID: ds.StudyInstanceUID,
      messages: ds.messages,
      componentType,
      imageSrc,
      dragData: {
        type: 'displayset',
        displaySetInstanceUID: ds.displaySetInstanceUID
        // .. Any other data to pass
      },
      isHydratedForDerivedDisplaySet: ds.isHydrated
    });
  });
  return [...thumbnailDisplaySets, ...thumbnailNoImageDisplaySets];
}
const thumbnailNoImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];
function _getComponentType(ds) {
  if (thumbnailNoImageModalities.includes(ds.Modality) || ds?.unsupported) {
    // TODO probably others.
    return 'thumbnailNoImage';
  }
  return 'thumbnail';
}
var _c;
__webpack_require__.$Refresh$.register(_c, "PanelStudyBrowser");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "PanelStudyBrowser");

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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelStudyBrowserHeader: () => (/* binding */ PanelStudyBrowserHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function PanelStudyBrowserHeader({
  viewPresets,
  updateViewPresetValue,
  actionIcons,
  updateActionIconValue
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-muted flex h-[40px] select-none rounded-t p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: 'flex h-[24px] w-full select-none justify-center self-center text-[14px]'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex w-full items-center gap-[10px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-primary-active flex items-center space-x-1"
  }, actionIcons.map((icon, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons[icon.iconName] || _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.MissingIcon, {
    key: index,
    onClick: () => updateActionIconValue(icon),
    className: `cursor-pointer`
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ml-auto flex h-full items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToggleGroup, {
    type: "single",
    value: viewPresets.filter(preset => preset.selected)[0].id,
    onValueChange: value => {
      const selectedViewPreset = viewPresets.find(preset => preset.id === value);
      updateViewPresetValue(selectedViewPreset);
    }
  }, viewPresets.map((viewPreset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.ToggleGroupItem, {
    key: index,
    "aria-label": viewPreset.id,
    value: viewPreset.id,
    className: "text-actions-primary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons[viewPreset.iconName] || _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.MissingIcon)))))))));
}
_c2 = PanelStudyBrowserHeader;
_c = PanelStudyBrowserHeader;

var _c;
__webpack_require__.$Refresh$.register(_c, "PanelStudyBrowserHeader");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "PanelStudyBrowserHeader");

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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/constants/actionIcons.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/constants/actionIcons.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultActionIcons: () => (/* binding */ defaultActionIcons)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultActionIcons = [{
  id: 'settings',
  iconName: 'Settings',
  value: false
}];


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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/constants/index.ts":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/constants/index.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultActionIcons: () => (/* reexport safe */ _actionIcons__WEBPACK_IMPORTED_MODULE_0__.defaultActionIcons),
/* harmony export */   defaultViewPresets: () => (/* reexport safe */ _viewPresets__WEBPACK_IMPORTED_MODULE_1__.defaultViewPresets)
/* harmony export */ });
/* harmony import */ var _actionIcons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionIcons */ "../../../extensions/default/src/Panels/StudyBrowser/constants/actionIcons.ts");
/* harmony import */ var _viewPresets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./viewPresets */ "../../../extensions/default/src/Panels/StudyBrowser/constants/viewPresets.ts");
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

/***/ "../../../extensions/default/src/Panels/StudyBrowser/constants/viewPresets.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/StudyBrowser/constants/viewPresets.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultViewPresets: () => (/* binding */ defaultViewPresets)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultViewPresets = [{
  id: 'list',
  iconName: 'ListView',
  selected: false
}, {
  id: 'thumbnails',
  iconName: 'ThumbnailView',
  selected: true
}];


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

/***/ "../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StudyBrowser/PanelStudyBrowser */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx");
/* harmony import */ var _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getImageSrcFromImageId */ "../../../extensions/default/src/Panels/getImageSrcFromImageId.js");
/* harmony import */ var _getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getStudiesForPatientByMRN */ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js");
/* harmony import */ var _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./requestDisplaySetCreationForStudy */ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();


//





/**
 * Wraps the PanelStudyBrowser and provides features afforded by managers/services
 *
 * @param {object} params
 * @param {object} commandsManager
 * @param {object} extensionManager
 */
function WrappedPanelStudyBrowser({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  _s2();
  _s();
  // TODO: This should be made available a different way; route should have
  // already determined our datasource
  const dataSource = extensionManager.getDataSources()[0];
  const _getStudiesForPatientByMRN = _getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_4__["default"].bind(null, dataSource);
  const _getImageSrcFromImageId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_createGetImageSrcFromImageIdFn(extensionManager), []);
  const _requestDisplaySetCreationForStudy = _requestDisplaySetCreationForStudy__WEBPACK_IMPORTED_MODULE_5__["default"].bind(null, dataSource);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_2__["default"], {
    servicesManager: servicesManager,
    dataSource: dataSource,
    getImageSrc: _getImageSrcFromImageId,
    getStudiesForPatientByMRN: _getStudiesForPatientByMRN,
    requestDisplaySetCreationForStudy: _requestDisplaySetCreationForStudy
  });
}

/**
 * Grabs cornerstone library reference using a dependent command from
 * the @ohif/extension-cornerstone extension. Then creates a helper function
 * that can take an imageId and return an image src.
 *
 * @param {func} getCommand - CommandManager's getCommand method
 * @returns {func} getImageSrcFromImageId - A utility function powered by
 * cornerstone
 */
_s2(WrappedPanelStudyBrowser, "6UNZGNSlqXCQ9xMAv9ueU6g1qw0=");
_c2 = WrappedPanelStudyBrowser;
_s(WrappedPanelStudyBrowser, "6UNZGNSlqXCQ9xMAv9ueU6g1qw0=");
_c = WrappedPanelStudyBrowser;
function _createGetImageSrcFromImageIdFn(extensionManager) {
  const utilities = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  try {
    const {
      cornerstone
    } = utilities.exports.getCornerstoneLibraries();
    return _getImageSrcFromImageId__WEBPACK_IMPORTED_MODULE_3__["default"].bind(null, cornerstone);
  } catch (ex) {
    throw new Error('Required command not found');
  }
}
WrappedPanelStudyBrowser.propTypes = {
  commandsManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  extensionManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WrappedPanelStudyBrowser);
var _c;
__webpack_require__.$Refresh$.register(_c, "WrappedPanelStudyBrowser");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "WrappedPanelStudyBrowser");

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

/***/ "../../../extensions/default/src/Panels/createReportDialogPrompt.tsx":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/createReportDialogPrompt.tsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateReportDialogPrompt)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/_shared/PROMPT_RESPONSES */ "../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function CreateReportDialogPrompt(uiDialogService, {
  extensionManager
}) {
  return new Promise(function (resolve, reject) {
    let dialogId = undefined;
    const _handleClose = () => {
      // Dismiss dialog
      uiDialogService.dismiss({
        id: dialogId
      });
      // Notify of cancel action
      resolve({
        action: _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CANCEL,
        value: undefined,
        dataSourceName: undefined
      });
    };

    /**
     *
     * @param {string} param0.action - value of action performed
     * @param {string} param0.value - value from input field
     */
    const _handleFormSubmit = ({
      action,
      value
    }) => {
      uiDialogService.dismiss({
        id: dialogId
      });
      switch (action.id) {
        case 'save':
          resolve({
            action: _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CREATE_REPORT,
            value: value.label,
            dataSourceName: value.dataSourceName
          });
          break;
        case 'cancel':
          resolve({
            action: _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CANCEL,
            value: undefined,
            dataSourceName: undefined
          });
          break;
      }
    };
    const dataSourcesOpts = Object.keys(extensionManager.dataSourceMap).filter(ds => {
      const configuration = extensionManager.dataSourceDefs[ds]?.configuration;
      const supportsStow = configuration?.supportsStow ?? configuration?.wadoRoot;
      return supportsStow;
    }).map(ds => {
      return {
        value: ds,
        label: ds,
        placeHolder: ds
      };
    });
    dialogId = uiDialogService.create({
      centralize: true,
      isDraggable: false,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Dialog,
      useLastPosition: false,
      showOverlay: true,
      contentProps: {
        title: 'Create Report',
        value: {
          label: '',
          dataSourceName: extensionManager.activeDataSource
        },
        noCloseButton: true,
        onClose: _handleClose,
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonEnums.type.secondary
        }, {
          id: 'save',
          text: 'Save',
          type: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonEnums.type.primary
        }],
        // TODO: Should be on button press...
        onSubmit: _handleFormSubmit,
        body: ({
          value,
          setValue
        }) => {
          const onChangeHandler = event => {
            event.persist();
            setValue(value => ({
              ...value,
              label: event.target.value
            }));
          };
          const onKeyPressHandler = event => {
            if (event.key === 'Enter') {
              uiDialogService.dismiss({
                id: dialogId
              });
              resolve({
                action: _utils_shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_2__["default"].CREATE_REPORT,
                value: value.label
              });
            }
          };
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, dataSourcesOpts.length > 1 && window.config?.allowMultiSelectExport && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
            className: "text-[14px] leading-[1.2] text-white"
          }, "Data Source"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Select, {
            closeMenuOnSelect: true,
            className: "border-primary-main mt-2 bg-black",
            options: dataSourcesOpts,
            placeholder: dataSourcesOpts.find(option => option.value === value.dataSourceName).placeHolder,
            value: value.dataSourceName,
            onChange: evt => {
              setValue(v => ({
                ...v,
                dataSourceName: evt.value
              }));
            },
            isClearable: false
          })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
            className: "mt-3"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
            autoFocus: true,
            label: "Enter the report name",
            labelClassName: "text-white text-[14px] leading-[1.2]",
            className: "border-primary-main bg-black",
            type: "text",
            value: value.label,
            onChange: onChangeHandler,
            onKeyPress: onKeyPressHandler,
            required: true
          })));
        }
      }
    });
  });
}
_c2 = CreateReportDialogPrompt;
_c = CreateReportDialogPrompt;
var _c;
__webpack_require__.$Refresh$.register(_c, "CreateReportDialogPrompt");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "CreateReportDialogPrompt");

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

/***/ "../../../extensions/default/src/Panels/getImageSrcFromImageId.js":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/getImageSrcFromImageId.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * @param {*} cornerstone
 * @param {*} imageId
 */
function getImageSrcFromImageId(cornerstone, imageId) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    cornerstone.utilities.loadImageToCanvas({
      canvas,
      imageId,
      thumbnail: true
    }).then(imageId => {
      resolve(canvas.toDataURL());
    }).catch(reject);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getImageSrcFromImageId);

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

/***/ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

async function getStudiesForPatientByMRN(dataSource, qidoForStudyUID) {
  if (qidoForStudyUID && qidoForStudyUID.length && qidoForStudyUID[0].mrn) {
    return dataSource.query.studies.search({
      patientId: qidoForStudyUID[0].mrn,
      disableWildcard: true
    });
  }
  console.log('No mrn found for', qidoForStudyUID);
  return qidoForStudyUID;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getStudiesForPatientByMRN);

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

/***/ "../../../extensions/default/src/Panels/index.js":
/*!*******************************************************!*\
  !*** ../../../extensions/default/src/Panels/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelStudyBrowser: () => (/* reexport safe */ _StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   WrappedPanelStudyBrowser: () => (/* reexport safe */ _WrappedPanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   createReportDialogPrompt: () => (/* reexport safe */ _createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_2__["default"])
/* harmony export */ });
/* harmony import */ var _StudyBrowser_PanelStudyBrowser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StudyBrowser/PanelStudyBrowser */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx");
/* harmony import */ var _WrappedPanelStudyBrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WrappedPanelStudyBrowser */ "../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx");
/* harmony import */ var _createReportDialogPrompt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createReportDialogPrompt */ "../../../extensions/default/src/Panels/createReportDialogPrompt.tsx");
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

/***/ "../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

function requestDisplaySetCreationForStudy(dataSource, displaySetService, StudyInstanceUID, madeInClient) {
  // TODO: is this already short-circuited by the map of Retrieve promises?
  if (displaySetService.activeDisplaySets.some(displaySet => displaySet.StudyInstanceUID === StudyInstanceUID)) {
    return;
  }
  dataSource.retrieve.series.metadata({
    StudyInstanceUID,
    madeInClient
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestDisplaySetCreationForStudy);

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

/***/ "../../../extensions/default/src/SOPClassHandlers/chartSOPClassHandler.ts":
/*!********************************************************************************!*\
  !*** ../../../extensions/default/src/SOPClassHandlers/chartSOPClassHandler.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chartHandler: () => (/* binding */ chartHandler)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../id */ "../../../extensions/default/src/id.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const SOPClassHandlerName = 'chart';
const CHART_MODALITY = 'CHT';

// Private SOPClassUid for chart data
const ChartDataSOPClassUid = '1.9.451.13215.7.3.2.7.6.1';
const sopClassUids = [ChartDataSOPClassUid];
const makeChartDataDisplaySet = (instance, sopClassUids) => {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPClassUID
  } = instance;
  return {
    Modality: CHART_MODALITY,
    loading: false,
    isReconstructable: false,
    displaySetInstanceUID: _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: `${_id__WEBPACK_IMPORTED_MODULE_1__.id}.sopClassHandlerModule.${SOPClassHandlerName}`,
    SOPClassUID,
    isDerivedDisplaySet: true,
    isLoaded: true,
    sopClassUids,
    instance,
    instances: [instance],
    /**
     * Adds instances to the chart displaySet, rather than creating a new one
     * when user moves to a different workflow step and gets back to a step that
     * recreates the chart
     */
    addInstances: function (instances, _displaySetService) {
      this.instances.push(...instances);
      this.instance = this.instances[this.instances.length - 1];
      return this;
    }
  };
};
function getSopClassUids(instances) {
  const uniqueSopClassUidsInSeries = new Set();
  instances.forEach(instance => {
    uniqueSopClassUidsInSeries.add(instance.SOPClassUID);
  });
  const sopClassUids = Array.from(uniqueSopClassUidsInSeries);
  return sopClassUids;
}
function _getDisplaySetsFromSeries(instances) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const sopClassUids = getSopClassUids(instances);
  const displaySets = instances.map(instance => {
    if (instance.Modality === CHART_MODALITY) {
      return makeChartDataDisplaySet(instance, sopClassUids);
    }
    throw new Error('Unsupported modality');
  });
  return displaySets;
}
const chartHandler = {
  name: SOPClassHandlerName,
  sopClassUids,
  getDisplaySetsFromSeries: instances => {
    return _getDisplaySetsFromSeries(instances);
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

/***/ "../../../extensions/default/src/Toolbar/Toolbar.tsx":
/*!***********************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/Toolbar.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toolbar: () => (/* binding */ Toolbar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
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


function Toolbar({
  servicesManager,
  buttonSection = 'primary'
}) {
  _s2();
  _s();
  const {
    toolbarButtons,
    onInteraction
  } = (0,_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useToolbar)({
    servicesManager,
    buttonSection
  });
  if (!toolbarButtons.length) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, toolbarButtons.map(toolDef => {
    if (!toolDef) {
      return null;
    }
    const {
      id,
      Component,
      componentProps
    } = toolDef;
    const tool = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Component, _extends({
      key: id,
      id: id,
      onInteraction: onInteraction,
      servicesManager: servicesManager
    }, componentProps));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      key: id
    }, tool);
  }));
}
_s2(Toolbar, "D0KFsaoXJQxIT0v6bvZscNoeplo=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useToolbar];
});
_c2 = Toolbar;
_s(Toolbar, "G4GyD1VnY7I2CiaMioG1liuUGjU=", false, function () {
  return [_ohif_core__WEBPACK_IMPORTED_MODULE_1__.useToolbar];
});
_c = Toolbar;
var _c;
__webpack_require__.$Refresh$.register(_c, "Toolbar");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "Toolbar");

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

/***/ "../../../extensions/default/src/Toolbar/ToolbarButtonGroupWithServices.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarButtonGroupWithServices.tsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();


function ToolbarButtonGroupWithServices({
  groupId,
  items,
  onInteraction,
  size
}) {
  _s2();
  _s();
  const getSplitButtonItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(items => items.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton, {
    key: item.id,
    icon: item.icon,
    label: item.label,
    disabled: item.disabled,
    className: item.className,
    disabledText: item.disabledText,
    id: item.id,
    size: size,
    onClick: () => {
      onInteraction({
        groupId,
        itemId: item.id,
        commands: item.commands
      });
    }
    // Note: this is necessary since tooltip will add
    // default styles to the tooltip container which
    // we don't want for groups
    ,

    toolTipClassName: ""
  })), [onInteraction, groupId]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonGroup, null, getSplitButtonItems(items));
}
_s2(ToolbarButtonGroupWithServices, "FSAESCtgZQtOmqxGW3+y3244RJ8=");
_c2 = ToolbarButtonGroupWithServices;
_s(ToolbarButtonGroupWithServices, "FSAESCtgZQtOmqxGW3+y3244RJ8=");
_c = ToolbarButtonGroupWithServices;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolbarButtonGroupWithServices);
var _c;
__webpack_require__.$Refresh$.register(_c, "ToolbarButtonGroupWithServices");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ToolbarButtonGroupWithServices");

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

/***/ "../../../extensions/default/src/Toolbar/ToolbarDivider.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarDivider.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToolbarDivider)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function ToolbarDivider() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "border-common-dark mx-2 h-8 w-4 self-center border-l"
  });
}
_c2 = ToolbarDivider;
_c = ToolbarDivider;
var _c;
__webpack_require__.$Refresh$.register(_c, "ToolbarDivider");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ToolbarDivider");

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

/***/ "../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s3 = __webpack_require__.$Refresh$.signature(),
  _s4 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}



const defaultCommonPresets = [{
  icon: 'layout-common-1x1',
  commandOptions: {
    numRows: 1,
    numCols: 1
  }
}, {
  icon: 'layout-common-1x2',
  commandOptions: {
    numRows: 1,
    numCols: 2
  }
}, {
  icon: 'layout-common-2x2',
  commandOptions: {
    numRows: 2,
    numCols: 2
  }
}, {
  icon: 'layout-common-2x3',
  commandOptions: {
    numRows: 2,
    numCols: 3
  }
}];
const _areSelectorsValid = (hp, displaySets, hangingProtocolService) => {
  if (!hp.displaySetSelectors || Object.values(hp.displaySetSelectors).length === 0) {
    return true;
  }
  return hangingProtocolService.areRequiredSelectorsValid(Object.values(hp.displaySetSelectors), displaySets[0]);
};
const generateAdvancedPresets = ({
  servicesManager
}) => {
  const {
    hangingProtocolService,
    viewportGridService,
    displaySetService
  } = servicesManager.services;
  const hangingProtocols = Array.from(hangingProtocolService.protocols.values());
  const viewportId = viewportGridService.getActiveViewportId();
  if (!viewportId) {
    return [];
  }
  const displaySetInsaneUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);
  if (!displaySetInsaneUIDs) {
    return [];
  }
  const displaySets = displaySetInsaneUIDs.map(uid => displaySetService.getDisplaySetByUID(uid));
  return hangingProtocols.map(hp => {
    if (!hp.isPreset) {
      return null;
    }
    const areValid = _areSelectorsValid(hp, displaySets, hangingProtocolService);
    return {
      icon: hp.icon,
      title: hp.name,
      commandOptions: {
        protocolId: hp.id
      },
      disabled: !areValid
    };
  }).filter(preset => preset !== null);
};
function ToolbarLayoutSelectorWithServices({
  commandsManager,
  servicesManager,
  ...props
}) {
  _s3();
  _s();
  const [isDisabled, setIsDisabled] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleMouseEnter = () => {
    setIsDisabled(false);
  };
  const onSelection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(props => {
    commandsManager.run({
      commandName: 'setViewportGridLayout',
      commandOptions: {
        ...props
      }
    });
    setIsDisabled(true);
  }, []);
  const onSelectionPreset = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(props => {
    commandsManager.run({
      commandName: 'setHangingProtocol',
      commandOptions: {
        ...props
      }
    });
    setIsDisabled(true);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    onMouseEnter: handleMouseEnter
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(LayoutSelector, _extends({}, props, {
    onSelection: onSelection,
    onSelectionPreset: onSelectionPreset,
    servicesManager: servicesManager,
    tooltipDisabled: isDisabled
  })));
}
_s3(ToolbarLayoutSelectorWithServices, "CrHDIzEETGXVbfu61kP+YQPaKEU=");
_c3 = ToolbarLayoutSelectorWithServices;
_s(ToolbarLayoutSelectorWithServices, "CrHDIzEETGXVbfu61kP+YQPaKEU=");
_c = ToolbarLayoutSelectorWithServices;
function LayoutSelector({
  rows = 3,
  columns = 4,
  onLayoutChange = () => {},
  className,
  onSelection,
  onSelectionPreset,
  servicesManager,
  tooltipDisabled,
  ...rest
}) {
  _s4();
  _s2();
  const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const dropdownRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    customizationService
  } = servicesManager.services;
  const commonPresets = customizationService.get('commonPresets') || defaultCommonPresets;
  const advancedPresets = customizationService.get('advancedPresets') || generateAdvancedPresets({
    servicesManager
  });
  const closeOnOutsideClick = event => {
    if (isOpen && dropdownRef.current) {
      setIsOpen(false);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isOpen) {
      return;
    }
    setTimeout(() => {
      window.addEventListener('click', closeOnOutsideClick);
    }, 0);
    return () => {
      window.removeEventListener('click', closeOnOutsideClick);
      dropdownRef.current = null;
    };
  }, [isOpen]);
  const onInteractionHandler = () => {
    setIsOpen(!isOpen);
  };
  const DropdownContent = isOpen ? _ohif_ui__WEBPACK_IMPORTED_MODULE_2__.LayoutSelector : null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    id: "Layout",
    label: "Layout",
    icon: "tool-layout",
    onInteraction: onInteractionHandler,
    className: className,
    rounded: rest.rounded,
    disableToolTip: tooltipDisabled,
    dropdownContent: DropdownContent !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex",
      ref: dropdownRef
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "bg-secondary-dark flex flex-col gap-2.5 p-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "text-aqua-pale text-xs"
    }, "Common"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex gap-4"
    }, commonPresets.map((preset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.LayoutPreset, {
      key: index,
      classNames: "hover:bg-primary-dark group p-1 cursor-pointer",
      icon: preset.icon,
      commandOptions: preset.commandOptions,
      onSelection: onSelection
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "h-[2px] bg-black"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "text-aqua-pale text-xs"
    }, "Advanced"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "flex flex-col gap-2.5"
    }, advancedPresets.map((preset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.LayoutPreset, {
      key: index + commonPresets.length,
      classNames: "hover:bg-primary-dark group flex gap-2 p-1 cursor-pointer",
      icon: preset.icon,
      title: preset.title,
      disabled: preset.disabled,
      commandOptions: preset.commandOptions,
      onSelection: onSelectionPreset
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "bg-primary-dark flex flex-col gap-2.5 border-l-2 border-solid border-black  p-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "text-aqua-pale text-xs"
    }, "Custom"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DropdownContent, {
      rows: rows,
      columns: columns,
      onSelection: onSelection
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      className: "text-aqua-pale text-xs leading-tight"
    }, "Hover to select ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), "rows and columns ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("br", null), " Click to apply"))),
    isActive: isOpen,
    type: "toggle"
  });
}
_s4(LayoutSelector, "uhOyve9TWk+bvhPJTPlaMsUEQAY=");
_c4 = LayoutSelector;
_s2(LayoutSelector, "uhOyve9TWk+bvhPJTPlaMsUEQAY=");
_c2 = LayoutSelector;
LayoutSelector.propTypes = {
  rows: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  columns: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
  onLayoutChange: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolbarLayoutSelectorWithServices);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "ToolbarLayoutSelectorWithServices");
__webpack_require__.$Refresh$.register(_c2, "LayoutSelector");
var _c3, _c4;
__webpack_require__.$Refresh$.register(_c3, "ToolbarLayoutSelectorWithServices");
__webpack_require__.$Refresh$.register(_c4, "LayoutSelector");

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

/***/ "../../../extensions/default/src/Toolbar/ToolbarSplitButtonWithServices.tsx":
/*!**********************************************************************************!*\
  !*** ../../../extensions/default/src/Toolbar/ToolbarSplitButtonWithServices.tsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
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



function ToolbarSplitButtonWithServices({
  groupId,
  primary,
  secondary,
  items,
  renderer,
  onInteraction,
  servicesManager
}) {
  _s2();
  _s();
  const {
    toolbarService
  } = servicesManager?.services;

  /* Bubbles up individual item clicks */
  const getSplitButtonItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(items => items.map((item, index) => ({
    ...item,
    index,
    onClick: () => {
      onInteraction({
        groupId,
        itemId: item.id,
        commands: item.commands
      });
    }
  })), [groupId, onInteraction]);
  const PrimaryButtonComponent = toolbarService?.getButtonComponentForUIType(primary.uiType) ?? _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton;
  const listItemRenderer = renderer;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.SplitButton, {
    primary: primary,
    secondary: secondary,
    items: getSplitButtonItems(items),
    groupId: groupId,
    renderer: listItemRenderer,
    onInteraction: onInteraction,
    Component: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(PrimaryButtonComponent, _extends({}, props, {
      servicesManager: servicesManager
    }))
  });
}
_s2(ToolbarSplitButtonWithServices, "FSAESCtgZQtOmqxGW3+y3244RJ8=");
_c2 = ToolbarSplitButtonWithServices;
_s(ToolbarSplitButtonWithServices, "FSAESCtgZQtOmqxGW3+y3244RJ8=");
_c = ToolbarSplitButtonWithServices;
ToolbarSplitButtonWithServices.propTypes = {
  groupId: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  primary: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    uiType: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
  }),
  secondary: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    icon: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    tooltip: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
  }),
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    icon: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    tooltip: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
  })),
  renderer: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  onInteraction: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  servicesManager: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    services: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
      toolbarService: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object)
    })
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolbarSplitButtonWithServices);
var _c;
__webpack_require__.$Refresh$.register(_c, "ToolbarSplitButtonWithServices");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ToolbarSplitButtonWithServices");

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

/***/ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PatientInfoVisibility: () => (/* binding */ PatientInfoVisibility),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../hooks/usePatientInfo */ "../../../extensions/default/src/hooks/usePatientInfo.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



let PatientInfoVisibility = /*#__PURE__*/function (PatientInfoVisibility) {
  PatientInfoVisibility["VISIBLE"] = "visible";
  PatientInfoVisibility["VISIBLE_COLLAPSED"] = "visibleCollapsed";
  PatientInfoVisibility["DISABLED"] = "disabled";
  PatientInfoVisibility["VISIBLE_READONLY"] = "visibleReadOnly";
  return PatientInfoVisibility;
}({});
const formatWithEllipsis = (str, maxLength) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};
function HeaderPatientInfo({
  servicesManager,
  appConfig
}) {
  _s2();
  _s();
  const initialExpandedState = appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE || appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE_READONLY;
  const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialExpandedState);
  const {
    patientInfo,
    isMixedPatients
  } = (0,_hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_1__["default"])(servicesManager);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isMixedPatients && expanded) {
      setExpanded(false);
    }
  }, [isMixedPatients, expanded]);
  const handleOnClick = () => {
    if (!isMixedPatients && appConfig.showPatientInfo !== PatientInfoVisibility.VISIBLE_READONLY) {
      setExpanded(!expanded);
    }
  };
  const formattedPatientName = formatWithEllipsis(patientInfo.PatientName, 27);
  const formattedPatientID = formatWithEllipsis(patientInfo.PatientID, 15);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "hover:bg-primary-dark flex cursor-pointer items-center justify-center gap-1 rounded-lg",
    onClick: handleOnClick
  }, isMixedPatients ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.MultiplePatients, {
    className: "text-primary-active"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.Patient, {
    className: "text-primary-active"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-col justify-center"
  }, expanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "self-start text-[13px] font-bold text-white"
  }, formattedPatientName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-aqua-pale flex gap-2 text-[11px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, formattedPatientID), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, patientInfo.PatientSex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, patientInfo.PatientDOB))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-primary-active self-center text-[13px]"
  }, isMixedPatients ? 'Multiple Patients' : 'Patient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_2__.Icons.ChevronPatient, {
    className: `text-primary-active ${expanded ? 'rotate-180' : ''}`
  }));
}
_s2(HeaderPatientInfo, "aekHMZyRCCytEVeE8BYjXA1ED04=", false, function () {
  return [_hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_1__["default"]];
});
_c2 = HeaderPatientInfo;
_s(HeaderPatientInfo, "irJxFXETJxLHzq4YF+0FCJDLKm0=", false, function () {
  return [_hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_1__["default"]];
});
_c = HeaderPatientInfo;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderPatientInfo);
var _c;
__webpack_require__.$Refresh$.register(_c, "HeaderPatientInfo");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "HeaderPatientInfo");

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

/***/ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/index.js":
/*!*******************************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/index.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderPatientInfo */ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "../../../extensions/default/src/ViewerLayout/ViewerHeader.tsx":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/ViewerHeader.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "../node_modules/react-router/dist/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ohif_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ohif/i18n */ "../../i18n/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Toolbar/Toolbar */ "../../../extensions/default/src/Toolbar/Toolbar.tsx");
/* harmony import */ var _HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./HeaderPatientInfo */ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/index.js");
/* harmony import */ var _HeaderPatientInfo_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./HeaderPatientInfo/HeaderPatientInfo */ "../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();











const {
  availableLanguages,
  defaultLanguage,
  currentLanguage
} = _ohif_i18n__WEBPACK_IMPORTED_MODULE_6__["default"];
function ViewerHeader({
  hotkeysManager,
  extensionManager,
  servicesManager,
  appConfig
}) {
  _s2();
  _s();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate)();
  const location = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation)();
  const onClickReturnButton = () => {
    const {
      pathname
    } = location;
    const dataSourceIdx = pathname.indexOf('/', 1);
    const query = new URLSearchParams(window.location.search);
    const configUrl = query.get('configUrl');
    const dataSourceName = pathname.substring(dataSourceIdx + 1);
    const existingDataSource = extensionManager.getDataSources(dataSourceName);
    const searchQuery = new URLSearchParams();
    if (dataSourceIdx !== -1 && existingDataSource) {
      searchQuery.append('datasources', pathname.substring(dataSourceIdx + 1));
    }
    if (configUrl) {
      searchQuery.append('configUrl', configUrl);
    }
    navigate({
      pathname: '/',
      search: decodeURIComponent(searchQuery.toString())
    });
  };
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)();
  const {
    show,
    hide
  } = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_4__.useModal)();
  const {
    hotkeyDefinitions,
    hotkeyDefaults
  } = hotkeysManager;
  const versionNumber = "3.9.1";
  const commitHash = "610faa5a2738da5eabc40e57e338c359f481e852";
  const menuOptions = [{
    title: t('Header:About'),
    icon: 'info',
    onClick: () => show({
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_4__.AboutModal,
      title: t('AboutModal:About OHIF Viewer'),
      contentProps: {
        versionNumber,
        commitHash
      },
      containerDimensions: 'max-w-4xl max-h-4xl'
    })
  }, {
    title: t('Header:Preferences'),
    icon: 'settings',
    onClick: () => show({
      title: t('UserPreferencesModal:User preferences'),
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_4__.UserPreferences,
      containerDimensions: 'w-[70%] max-w-[900px]',
      contentProps: {
        hotkeyDefaults: hotkeysManager.getValidHotkeyDefinitions(hotkeyDefaults),
        hotkeyDefinitions,
        currentLanguage: currentLanguage(),
        availableLanguages,
        defaultLanguage,
        onCancel: () => {
          _ohif_core__WEBPACK_IMPORTED_MODULE_7__.hotkeys.stopRecord();
          _ohif_core__WEBPACK_IMPORTED_MODULE_7__.hotkeys.unpause();
          hide();
        },
        onSubmit: ({
          hotkeyDefinitions,
          language
        }) => {
          if (language.value !== currentLanguage().value) {
            _ohif_i18n__WEBPACK_IMPORTED_MODULE_6__["default"].changeLanguage(language.value);
          }
          hotkeysManager.setHotkeys(hotkeyDefinitions);
          hide();
        },
        onReset: () => hotkeysManager.restoreDefaultBindings(),
        hotkeysModule: _ohif_core__WEBPACK_IMPORTED_MODULE_7__.hotkeys
      }
    })
  }];
  if (appConfig.oidc) {
    menuOptions.push({
      title: t('Header:Logout'),
      icon: 'power-off',
      onClick: async () => {
        navigate(`/logout?redirect_uri=${encodeURIComponent(window.location.href)}`);
      }
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_5__.Header, {
    menuOptions: menuOptions,
    isReturnEnabled: !!appConfig.showStudyList,
    onClickReturnButton: onClickReturnButton,
    WhiteLabeling: appConfig.whiteLabeling,
    Secondary: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {
      servicesManager: servicesManager,
      buttonSection: "secondary"
    }),
    PatientInfo: appConfig.showPatientInfo !== _HeaderPatientInfo_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_10__.PatientInfoVisibility.DISABLED && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_HeaderPatientInfo__WEBPACK_IMPORTED_MODULE_9__["default"], {
      servicesManager: servicesManager,
      appConfig: appConfig
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex justify-center gap-[4px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Toolbar_Toolbar__WEBPACK_IMPORTED_MODULE_8__.Toolbar, {
    servicesManager: servicesManager
  })));
}
_s2(ViewerHeader, "L3rFyuSFoZRoN3cphVy0aBKNJYI=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate, react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation, react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_4__.useModal];
});
_c2 = ViewerHeader;
_s(ViewerHeader, "hwuC5dpAQvT9VJ5uq2LuGqE6fiI=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useNavigate, react_router__WEBPACK_IMPORTED_MODULE_3__.useLocation, react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_4__.useModal];
});
_c = ViewerHeader;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewerHeader);
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewerHeader");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ViewerHeader");

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

/***/ "../../../extensions/default/src/ViewerLayout/index.tsx":
/*!**************************************************************!*\
  !*** ../../../extensions/default/src/ViewerLayout/index.tsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _ViewerHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ViewerHeader */ "../../../extensions/default/src/ViewerLayout/ViewerHeader.tsx");
/* harmony import */ var _Components_SidePanelWithServices__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Components/SidePanelWithServices */ "../../../extensions/default/src/Components/SidePanelWithServices.tsx");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();








function ViewerLayout({
  // From Extension Module Params
  extensionManager,
  servicesManager,
  hotkeysManager,
  commandsManager,
  // From Modes
  viewports,
  ViewportGridComp,
  leftPanelClosed = false,
  rightPanelClosed = false
}) {
  _s2();
  _s();
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_4__.useAppConfig)();
  const {
    panelService,
    hangingProtocolService
  } = servicesManager.services;
  const [showLoadingIndicator, setShowLoadingIndicator] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(appConfig.showLoadingIndicator);
  const hasPanels = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(side => !!panelService.getPanels(side).length, [panelService]);
  const [hasRightPanels, setHasRightPanels] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(hasPanels('right'));
  const [hasLeftPanels, setHasLeftPanels] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(hasPanels('left'));
  const [leftPanelClosedState, setLeftPanelClosed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(leftPanelClosed);
  const [rightPanelClosedState, setRightPanelClosed] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(rightPanelClosed);

  /**
   * Set body classes (tailwindcss) that don't allow vertical
   * or horizontal overflow (no scrolling). Also guarantee window
   * is sized to our viewport.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.body.classList.add('bg-black');
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('bg-black');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  const getComponent = id => {
    const entry = extensionManager.getModuleEntry(id);
    if (!entry || !entry.component) {
      throw new Error(`${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`);
    }
    return {
      entry,
      content: entry.component
    };
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_3__.HangingProtocolService.EVENTS.PROTOCOL_CHANGED,
    // Todo: right now to set the loading indicator to false, we need to wait for the
    // hangingProtocolService to finish applying the viewport matching to each viewport,
    // however, this might not be the only approach to set the loading indicator to false. we need to explore this further.
    () => {
      setShowLoadingIndicator(false);
    });
    return () => {
      unsubscribe();
    };
  }, [hangingProtocolService]);
  const getViewportComponentData = viewportComponent => {
    const {
      entry
    } = getComponent(viewportComponent.namespace);
    return {
      component: entry.component,
      displaySetsToDisplay: viewportComponent.displaySetsToDisplay
    };
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = panelService.subscribe(panelService.EVENTS.PANELS_CHANGED, ({
      options
    }) => {
      setHasLeftPanels(hasPanels('left'));
      setHasRightPanels(hasPanels('right'));
      if (options?.leftPanelClosed !== undefined) {
        setLeftPanelClosed(options.leftPanelClosed);
      }
      if (options?.rightPanelClosed !== undefined) {
        setRightPanelClosed(options.rightPanelClosed);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [panelService, hasPanels]);
  const viewportComponents = viewports.map(getViewportComponentData);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ViewerHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
    hotkeysManager: hotkeysManager,
    extensionManager: extensionManager,
    servicesManager: servicesManager,
    appConfig: appConfig
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black",
    style: {
      height: 'calc(100vh - 52px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, showLoadingIndicator && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.LoadingIndicatorProgress, {
    className: "h-full w-full bg-black"
  }), hasLeftPanels ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Components_SidePanelWithServices__WEBPACK_IMPORTED_MODULE_6__["default"], {
    side: "left",
    activeTabIndex: leftPanelClosedState ? null : 0,
    servicesManager: servicesManager
  }) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex h-full flex-1 flex-col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ViewportGridComp, {
    servicesManager: servicesManager,
    viewportComponents: viewportComponents,
    commandsManager: commandsManager
  }))), hasRightPanels ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Components_SidePanelWithServices__WEBPACK_IMPORTED_MODULE_6__["default"], {
    side: "right",
    activeTabIndex: rightPanelClosedState ? null : 0,
    servicesManager: servicesManager
  }) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_7__.Onboarding, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.InvestigationalUseDialog, {
    dialogConfiguration: appConfig?.investigationalUseDialog
  }));
}
_s2(ViewerLayout, "XLWPmkiy3/X1/BFJs9nHGfqp43k=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_4__.useAppConfig];
});
_c2 = ViewerLayout;
_s(ViewerLayout, "XLWPmkiy3/X1/BFJs9nHGfqp43k=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_4__.useAppConfig];
});
_c = ViewerLayout;
ViewerLayout.propTypes = {
  // From extension module params
  extensionManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().shape({
    getModuleEntry: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
  }).isRequired,
  commandsManager: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_ohif_core__WEBPACK_IMPORTED_MODULE_3__.CommandsManager),
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  // From modes
  leftPanels: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  rightPanels: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array),
  leftPanelClosed: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  rightPanelClosed: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  /** Responsible for rendering our grid of viewports; provided by consuming application */
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_1___default().node), (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)]).isRequired,
  viewports: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewerLayout);
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewerLayout");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ViewerLayout");

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

/***/ "../../../extensions/default/src/commandsModule.ts":
/*!*********************************************************!*\
  !*** ../../../extensions/default/src/commandsModule.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomizableContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/index.ts");
/* harmony import */ var _DicomTagBrowser_DicomTagBrowser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DicomTagBrowser/DicomTagBrowser */ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx");
/* harmony import */ var _utils_reuseCachedLayouts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/reuseCachedLayouts */ "../../../extensions/default/src/utils/reuseCachedLayouts.ts");
/* harmony import */ var _findViewportsByPosition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./findViewportsByPosition */ "../../../extensions/default/src/findViewportsByPosition.ts");
/* harmony import */ var _ohif_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/app */ "./index.js");
/* harmony import */ var _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stores/useViewportGridStore */ "../../../extensions/default/src/stores/useViewportGridStore.ts");
/* harmony import */ var _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stores/useDisplaySetSelectorStore */ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts");
/* harmony import */ var _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stores/useHangingProtocolStageIndexStore */ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts");
/* harmony import */ var _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./stores/useToggleHangingProtocolStore */ "../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts");
/* harmony import */ var _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stores/useViewportsByPositionStore */ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts");
/* harmony import */ var _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stores/useToggleOneUpViewportGridStore */ "../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");












const commandsModule = ({
  servicesManager,
  commandsManager
}) => {
  const {
    customizationService,
    measurementService,
    hangingProtocolService,
    uiNotificationService,
    viewportGridService,
    displaySetService
  } = servicesManager.services;

  // Define a context menu controller for use with any context menus
  const contextMenuController = new _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_0__.ContextMenuController(servicesManager, commandsManager);
  const actions = {
    /**
     * Show the context menu.
     * @param options.menuId defines the menu name to lookup, from customizationService
     * @param options.defaultMenu contains the default menu set to use
     * @param options.element is the element to show the menu within
     * @param options.event is the event that caused the context menu
     * @param options.selectorProps is the set of selection properties to use
     */
    showContextMenu: options => {
      const {
        menuCustomizationId,
        element,
        event,
        selectorProps,
        defaultPointsPosition = []
      } = options;
      const optionsToUse = {
        ...options
      };
      if (menuCustomizationId) {
        Object.assign(optionsToUse, customizationService.get(menuCustomizationId, _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_0__.defaultContextMenu));
      }

      // TODO - make the selectorProps richer by including the study metadata and display set.
      const {
        protocol,
        stage
      } = hangingProtocolService.getActiveProtocol();
      optionsToUse.selectorProps = {
        event,
        protocol,
        stage,
        ...selectorProps
      };
      contextMenuController.showContextMenu(optionsToUse, element, defaultPointsPosition);
    },
    /** Close a context menu currently displayed */
    closeContextMenu: () => {
      contextMenuController.closeContextMenu();
    },
    displayNotification: ({
      text,
      title,
      type
    }) => {
      uiNotificationService.show({
        title: title,
        message: text,
        type: type
      });
    },
    clearMeasurements: () => {
      measurementService.clear();
    },
    /**
     *  Sets the specified protocol
     *    1. Records any existing state using the viewport grid service
     *    2. Finds the destination state - this can be one of:
     *       a. The specified protocol stage
     *       b. An alternate (toggled or restored) protocol stage
     *       c. A restored custom layout
     *    3. Finds the parameters for the specified state
     *       a. Gets the displaySetSelectorMap
     *       b. Gets the map by position
     *       c. Gets any toggle mapping to map position to/from current view
     *    4. If restore, then sets layout
     *       a. Maps viewport position by currently displayed viewport map id
     *       b. Uses toggle information to map display set id
     *    5. Else applies the hanging protocol
     *       a. HP Service is provided displaySetSelectorMap
     *       b. HP Service will throw an exception if it isn't applicable
     * @param options - contains information on the HP to apply
     * @param options.activeStudyUID - the updated study to apply the HP to
     * @param options.protocolId - the protocol ID to change to
     * @param options.stageId - the stageId to apply
     * @param options.stageIndex - the index of the stage to go to.
     * @param options.reset - flag to indicate if the HP should be reset to its original and not restored to a previous state
     */
    setHangingProtocol: ({
      activeStudyUID = '',
      protocolId,
      stageId,
      stageIndex,
      reset = false
    }) => {
      try {
        // Stores in the state the display set selector id to displaySetUID mapping
        // Pass in viewportId for the active viewport.  This item will get set as
        // the activeViewportId
        const state = viewportGridService.getState();
        const hpInfo = hangingProtocolService.getState();
        (0,_utils_reuseCachedLayouts__WEBPACK_IMPORTED_MODULE_2__["default"])(state, hangingProtocolService);
        const {
          hangingProtocolStageIndexMap
        } = _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_7__.useHangingProtocolStageIndexStore.getState();
        const {
          displaySetSelectorMap
        } = _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_6__.useDisplaySetSelectorStore.getState();
        if (!protocolId) {
          // Reuse the previous protocol id, and optionally stage
          protocolId = hpInfo.protocolId;
          if (stageId === undefined && stageIndex === undefined) {
            stageIndex = hpInfo.stageIndex;
          }
        } else if (stageIndex === undefined && stageId === undefined) {
          // Re-set the same stage as was previously used
          const hangingId = `${activeStudyUID || hpInfo.activeStudyUID}:${protocolId}`;
          stageIndex = hangingProtocolStageIndexMap[hangingId]?.stageIndex;
        }
        const useStageIdx = stageIndex ?? hangingProtocolService.getStageIndex(protocolId, {
          stageId,
          stageIndex
        });
        if (activeStudyUID) {
          hangingProtocolService.setActiveStudyUID(activeStudyUID);
        }
        const storedHanging = `${hangingProtocolService.getState().activeStudyUID}:${protocolId}:${useStageIdx || 0}`;
        const {
          viewportGridState
        } = _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_5__.useViewportGridStore.getState();
        const restoreProtocol = !reset && viewportGridState[storedHanging];
        if (protocolId === hpInfo.protocolId && useStageIdx === hpInfo.stageIndex && !activeStudyUID) {
          // Clear the HP setting to reset them
          hangingProtocolService.setProtocol(protocolId, {
            stageId,
            stageIndex: useStageIdx
          });
        } else {
          hangingProtocolService.setProtocol(protocolId, {
            displaySetSelectorMap,
            stageId,
            stageIndex: useStageIdx,
            restoreProtocol
          });
          if (restoreProtocol) {
            viewportGridService.set(viewportGridState[storedHanging]);
          }
        }
        // Do this after successfully applying the update
        const {
          setDisplaySetSelector
        } = _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_6__.useDisplaySetSelectorStore.getState();
        setDisplaySetSelector(`${activeStudyUID || hpInfo.activeStudyUID}:activeDisplaySet:0`, null);
        return true;
      } catch (e) {
        console.error(e);
        uiNotificationService.show({
          title: 'Apply Hanging Protocol',
          message: 'The hanging protocol could not be applied.',
          type: 'error',
          duration: 3000
        });
        return false;
      }
    },
    toggleHangingProtocol: ({
      protocolId,
      stageIndex
    }) => {
      const {
        protocol,
        stageIndex: desiredStageIndex,
        activeStudy
      } = hangingProtocolService.getActiveProtocol();
      const {
        toggleHangingProtocol,
        setToggleHangingProtocol
      } = _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_8__.useToggleHangingProtocolStore.getState();
      const storedHanging = `${activeStudy.StudyInstanceUID}:${protocolId}:${stageIndex | 0}`;
      if (protocol.id === protocolId && (stageIndex === undefined || stageIndex === desiredStageIndex)) {
        // Toggling off - restore to previous state
        const previousState = toggleHangingProtocol[storedHanging] || {
          protocolId: 'default'
        };
        return actions.setHangingProtocol(previousState);
      } else {
        setToggleHangingProtocol(storedHanging, {
          protocolId: protocol.id,
          stageIndex: desiredStageIndex
        });
        return actions.setHangingProtocol({
          protocolId,
          stageIndex,
          reset: true
        });
      }
    },
    deltaStage: ({
      direction
    }) => {
      const {
        protocolId,
        stageIndex: oldStageIndex
      } = hangingProtocolService.getState();
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      for (let stageIndex = oldStageIndex + direction; stageIndex >= 0 && stageIndex < protocol.stages.length; stageIndex += direction) {
        if (protocol.stages[stageIndex].status !== 'disabled') {
          return actions.setHangingProtocol({
            protocolId,
            stageIndex
          });
        }
      }
      uiNotificationService.show({
        title: 'Change Stage',
        message: 'The hanging protocol has no more applicable stages',
        type: 'info',
        duration: 3000
      });
    },
    /**
     * Changes the viewport grid layout in terms of the MxN layout.
     */
    setViewportGridLayout: ({
      numRows,
      numCols,
      isHangingProtocolLayout = false
    }) => {
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      const onLayoutChange = protocol.callbacks?.onLayoutChange;
      if (commandsManager.run(onLayoutChange, {
        numRows,
        numCols
      }) === false) {
        console.log('setViewportGridLayout running', onLayoutChange, numRows, numCols);
        // Don't apply the layout if the run command returns false
        return;
      }
      const completeLayout = () => {
        const state = viewportGridService.getState();
        (0,_findViewportsByPosition__WEBPACK_IMPORTED_MODULE_3__["default"])(state, {
          numRows,
          numCols
        });
        const {
          viewportsByPosition,
          initialInDisplay
        } = _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_9__.useViewportsByPositionStore.getState();
        const findOrCreateViewport = _findViewportsByPosition__WEBPACK_IMPORTED_MODULE_3__.findOrCreateViewport.bind(null, hangingProtocolService, isHangingProtocolLayout, {
          ...viewportsByPosition,
          initialInDisplay
        });
        viewportGridService.setLayout({
          numRows,
          numCols,
          findOrCreateViewport,
          isHangingProtocolLayout
        });
      };
      // Need to finish any work in the callback
      window.setTimeout(completeLayout, 0);
    },
    toggleOneUp() {
      const viewportGridState = viewportGridService.getState();
      const {
        activeViewportId,
        viewports,
        layout,
        isHangingProtocolLayout
      } = viewportGridState;
      const {
        displaySetInstanceUIDs,
        displaySetOptions,
        viewportOptions
      } = viewports.get(activeViewportId);
      if (layout.numCols === 1 && layout.numRows === 1) {
        // The viewer is in one-up. Check if there is a state to restore/toggle back to.
        const {
          toggleOneUpViewportGridStore
        } = _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_10__.useToggleOneUpViewportGridStore.getState();
        if (!toggleOneUpViewportGridStore) {
          return;
        }
        // There is a state to toggle back to. The viewport that was
        // originally toggled to one up was the former active viewport.
        const viewportIdToUpdate = toggleOneUpViewportGridStore.activeViewportId;

        // We are restoring the previous layout but taking into the account that
        // the current one up viewport might have a new displaySet dragged and dropped on it.
        // updatedViewportsViaHP below contains the viewports applicable to the HP that existed
        // prior to the toggle to one-up - including the updated viewports if a display
        // set swap were to have occurred.
        const updatedViewportsViaHP = displaySetInstanceUIDs.length > 1 ? [] : displaySetInstanceUIDs.map(displaySetInstanceUID => hangingProtocolService.getViewportsRequireUpdate(viewportIdToUpdate, displaySetInstanceUID, isHangingProtocolLayout)).flat();

        // findOrCreateViewport returns either one of the updatedViewportsViaHP
        // returned from the HP service OR if there is not one from the HP service then
        // simply returns what was in the previous state for a given position in the layout.
        const findOrCreateViewport = (position, positionId) => {
          // Find the viewport for the given position prior to the toggle to one-up.
          const preOneUpViewport = Array.from(toggleOneUpViewportGridStore.viewports.values()).find(viewport => viewport.positionId === positionId);

          // Use the viewport id from before the toggle to one-up to find any updates to the viewport.
          const viewport = updatedViewportsViaHP.find(viewport => viewport.viewportId === preOneUpViewport.viewportId);
          return viewport ?
          // Use the applicable viewport from the HP updated viewports
          {
            viewportOptions,
            displaySetOptions,
            ...viewport
          } :
          // Use the previous viewport for the given position
          preOneUpViewport;
        };
        const layoutOptions = viewportGridService.getLayoutOptionsFromState(toggleOneUpViewportGridStore);

        // Restore the previous layout including the active viewport.
        viewportGridService.setLayout({
          numRows: toggleOneUpViewportGridStore.layout.numRows,
          numCols: toggleOneUpViewportGridStore.layout.numCols,
          activeViewportId: viewportIdToUpdate,
          layoutOptions,
          findOrCreateViewport,
          isHangingProtocolLayout: true
        });

        // Reset crosshairs after restoring the layout
        setTimeout(() => {
          commandsManager.runCommand('resetCrosshairs');
        }, 0);
      } else {
        // We are not in one-up, so toggle to one up.

        // Store the current viewport grid state so we can toggle it back later.
        const {
          setToggleOneUpViewportGridStore
        } = _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_10__.useToggleOneUpViewportGridStore.getState();
        setToggleOneUpViewportGridStore(viewportGridState);

        // one being toggled to one up.
        const findOrCreateViewport = () => {
          return {
            displaySetInstanceUIDs,
            displaySetOptions,
            viewportOptions
          };
        };

        // Set the layout to be 1x1/one-up.
        viewportGridService.setLayout({
          numRows: 1,
          numCols: 1,
          findOrCreateViewport,
          isHangingProtocolLayout: true
        });
      }
    },
    /**
     * Exposes the browser history navigation used by OHIF. This command can be used to either replace or
     * push a new entry into the browser history. For example, the following will replace the current
     * browser history entry with the specified relative URL which changes the study displayed to the
     * study with study instance UID 1.2.3. Note that as a result of using `options.replace = true`, the
     * page prior to invoking this command cannot be returned to via the browser back button.
     *
     * navigateHistory({
     *   to: 'viewer?StudyInstanceUIDs=1.2.3',
     *   options: { replace: true },
     * });
     *
     * @param historyArgs - arguments for the history function;
     *                      the `to` property is the URL;
     *                      the `options.replace` is a boolean indicating if the current browser history entry
     *                      should be replaced or a new entry pushed onto the history (stack); the default value
     *                      for `replace` is false
     */
    navigateHistory(historyArgs) {
      _ohif_app__WEBPACK_IMPORTED_MODULE_4__.history.navigate(historyArgs.to, historyArgs.options);
    },
    openDICOMTagViewer({
      displaySetInstanceUID
    }) {
      const {
        activeViewportId,
        viewports
      } = viewportGridService.getState();
      const activeViewportSpecificData = viewports.get(activeViewportId);
      const {
        displaySetInstanceUIDs
      } = activeViewportSpecificData;
      const displaySets = displaySetService.activeDisplaySets;
      const {
        UIModalService
      } = servicesManager.services;
      const defaultDisplaySetInstanceUID = displaySetInstanceUID || displaySetInstanceUIDs[0];
      UIModalService.show({
        content: _DicomTagBrowser_DicomTagBrowser__WEBPACK_IMPORTED_MODULE_1__["default"],
        contentProps: {
          displaySets,
          displaySetInstanceUID: defaultDisplaySetInstanceUID,
          onClose: UIModalService.hide
        },
        containerDimensions: 'w-[70%] max-w-[900px]',
        title: 'DICOM Tag Browser'
      });
    },
    /**
     * Toggle viewport overlay (the information panel shown on the four corners
     * of the viewport)
     * @see ViewportOverlay and CustomizableViewportOverlay components
     */
    toggleOverlays: () => {
      const overlays = document.getElementsByClassName('viewport-overlay');
      for (let i = 0; i < overlays.length; i++) {
        overlays.item(i).classList.toggle('hidden');
      }
    },
    scrollActiveThumbnailIntoView: () => {
      const {
        activeViewportId,
        viewports
      } = viewportGridService.getState();
      const activeViewport = viewports.get(activeViewportId);
      const activeDisplaySetInstanceUID = activeViewport.displaySetInstanceUIDs[0];
      const thumbnailList = document.querySelector('#ohif-thumbnail-list');
      if (!thumbnailList) {
        return;
      }
      const thumbnailListBounds = thumbnailList.getBoundingClientRect();
      const thumbnail = document.querySelector(`#thumbnail-${activeDisplaySetInstanceUID}`);
      if (!thumbnail) {
        return;
      }
      const thumbnailBounds = thumbnail.getBoundingClientRect();

      // This only handles a vertical thumbnail list.
      if (thumbnailBounds.top >= thumbnailListBounds.top && thumbnailBounds.top <= thumbnailListBounds.bottom) {
        return;
      }
      thumbnail.scrollIntoView({
        behavior: 'smooth'
      });
    },
    updateViewportDisplaySet: ({
      direction,
      excludeNonImageModalities
    }) => {
      const nonImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];
      const currentDisplaySets = [...displaySetService.activeDisplaySets];
      const {
        activeViewportId,
        viewports,
        isHangingProtocolLayout
      } = viewportGridService.getState();
      const {
        displaySetInstanceUIDs
      } = viewports.get(activeViewportId);
      const activeDisplaySetIndex = currentDisplaySets.findIndex(displaySet => displaySetInstanceUIDs.includes(displaySet.displaySetInstanceUID));
      let displaySetIndexToShow;
      for (displaySetIndexToShow = activeDisplaySetIndex + direction; displaySetIndexToShow > -1 && displaySetIndexToShow < currentDisplaySets.length; displaySetIndexToShow += direction) {
        if (!excludeNonImageModalities || !nonImageModalities.includes(currentDisplaySets[displaySetIndexToShow].Modality)) {
          break;
        }
      }
      if (displaySetIndexToShow < 0 || displaySetIndexToShow >= currentDisplaySets.length) {
        return;
      }
      const {
        displaySetInstanceUID
      } = currentDisplaySets[displaySetIndexToShow];
      let updatedViewports = [];
      try {
        updatedViewports = hangingProtocolService.getViewportsRequireUpdate(activeViewportId, displaySetInstanceUID, isHangingProtocolLayout);
      } catch (error) {
        console.warn(error);
        uiNotificationService.show({
          title: 'Navigate Viewport Display Set',
          message: 'The requested display sets could not be added to the viewport due to a mismatch in the Hanging Protocol rules.',
          type: 'info',
          duration: 3000
        });
      }
      viewportGridService.setDisplaySetsForViewports(updatedViewports);
      setTimeout(() => actions.scrollActiveThumbnailIntoView(), 0);
    }
  };
  const definitions = {
    showContextMenu: {
      commandFn: actions.showContextMenu
    },
    closeContextMenu: {
      commandFn: actions.closeContextMenu
    },
    clearMeasurements: {
      commandFn: actions.clearMeasurements
    },
    displayNotification: {
      commandFn: actions.displayNotification
    },
    setHangingProtocol: {
      commandFn: actions.setHangingProtocol
    },
    toggleHangingProtocol: {
      commandFn: actions.toggleHangingProtocol
    },
    navigateHistory: {
      commandFn: actions.navigateHistory
    },
    nextStage: {
      commandFn: actions.deltaStage,
      options: {
        direction: 1
      }
    },
    previousStage: {
      commandFn: actions.deltaStage,
      options: {
        direction: -1
      }
    },
    setViewportGridLayout: {
      commandFn: actions.setViewportGridLayout
    },
    toggleOneUp: {
      commandFn: actions.toggleOneUp
    },
    openDICOMTagViewer: {
      commandFn: actions.openDICOMTagViewer
    },
    updateViewportDisplaySet: {
      commandFn: actions.updateViewportDisplaySet
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'DEFAULT'
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

/***/ "../../../extensions/default/src/findViewportsByPosition.ts":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/findViewportsByPosition.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   findOrCreateViewport: () => (/* binding */ findOrCreateViewport)
/* harmony export */ });
/* harmony import */ var _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stores/useViewportsByPositionStore */ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * This find or create viewport is paired with the reduce results from
 * below, and the action of this viewport is to look for previously filled
 * viewports, and to reuse by position id.  If there is no filled viewport,
 * then one can be re-used from the display set if it isn't going to be displayed.
 * @param hangingProtocolService - bound parameter supplied before using this
 * @param viewportsByPosition - bound parameter supplied before using this
 * @param position - the position in the grid to retrieve
 * @param positionId - the current position on screen to retrieve
 * @param options - the set of options used, so that subsequent calls can
 *                  store state that is reset by the setLayout.
 *                  This class uses the options to store the already viewed
 *                  display sets, filling it initially with the pre-existing viewports.
 */
const findOrCreateViewport = (hangingProtocolService, isHangingProtocolLayout, viewportsByPosition, position, positionId, options) => {
  const byPositionViewport = viewportsByPosition?.[positionId];
  if (byPositionViewport) {
    return {
      ...byPositionViewport
    };
  }
  const {
    protocolId,
    stageIndex
  } = hangingProtocolService.getState();

  // Setup the initial in display correctly for initial view/select
  if (!options.inDisplay) {
    options.inDisplay = [...viewportsByPosition.initialInDisplay];
  }

  // See if there is a default viewport for new views
  const missing = hangingProtocolService.getMissingViewport(isHangingProtocolLayout ? protocolId : 'default', stageIndex, options);
  if (missing) {
    const displaySetInstanceUIDs = missing.displaySetsInfo.map(it => it.displaySetInstanceUID);
    options.inDisplay.push(...displaySetInstanceUIDs);
    return {
      displaySetInstanceUIDs,
      displaySetOptions: missing.displaySetsInfo.map(it => it.displaySetOptions),
      viewportOptions: {
        ...missing.viewportOptions
      }
    };
  }

  // and lastly if there is no default viewport, then we see if we can grab the
  // viewportsByPosition at the position index and use that
  // const candidate = Object.values(viewportsByPosition)[position];

  // // if it has something to display, then we can use it
  // return candidate?.displaySetInstanceUIDs ? candidate : {};
  return {};
};

/**
 * Records the information on what viewports are displayed in which position.
 * Also records what instances from the existing positions are going to be in
 * view initially.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const findViewportsByPosition = (state, {
  numRows,
  numCols
}) => {
  const {
    viewports
  } = state;
  const {
    setViewportsByPosition,
    addInitialInDisplay
  } = _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_0__.useViewportsByPositionStore.getState();
  const initialInDisplay = [];
  const viewportsByPosition = {};
  viewports.forEach(viewport => {
    if (viewport.positionId) {
      const storedViewport = {
        ...viewport,
        viewportOptions: {
          ...viewport.viewportOptions
        }
      };
      viewportsByPosition[viewport.positionId] = storedViewport;
      setViewportsByPosition(viewport.positionId, storedViewport);
    }
  });
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const positionId = `${col}-${row}`;
      const viewport = viewportsByPosition[positionId];
      if (viewport?.displaySetInstanceUIDs) {
        initialInDisplay.push(...viewport.displaySetInstanceUIDs);
      }
    }
  }
  initialInDisplay.forEach(displaySetInstanceUID => addInitialInDisplay(displaySetInstanceUID));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findViewportsByPosition);

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

/***/ "../../../extensions/default/src/getCustomizationModule.tsx":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/getCustomizationModule.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCustomizationModule)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Panels_DataSourceSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panels/DataSourceSelector */ "../../../extensions/default/src/Panels/DataSourceSelector.tsx");
/* harmony import */ var _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/ProgressDropdownWithService */ "../../../extensions/default/src/Components/ProgressDropdownWithService.tsx");
/* harmony import */ var _Components_DataSourceConfigurationComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/DataSourceConfigurationComponent */ "../../../extensions/default/src/Components/DataSourceConfigurationComponent.tsx");
/* harmony import */ var _DataSourceConfigurationAPI_GoogleCloudDataSourceConfigurationAPI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI */ "../../../extensions/default/src/DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const formatDate = _ohif_core__WEBPACK_IMPORTED_MODULE_5__.utils.formatDate;

/**
 *
 * Note: this is an example of how the customization module can be used
 * using the customization module. Below, we are adding a new custom route
 * to the application at the path /custom and rendering a custom component
 * Real world use cases of the having a custom route would be to add a
 * custom page for the user to view their profile, or to add a custom
 * page for login etc.
 */
function getCustomizationModule({
  servicesManager,
  extensionManager
}) {
  return [{
    name: 'helloPage',
    merge: 'Append',
    value: {
      id: 'customRoutes',
      routes: [{
        path: '/custom',
        children: () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
          style: {
            color: 'white'
          }
        }, "Hello Custom Route")
      }]
    }
  },
  // Example customization to list a set of datasources
  {
    name: 'datasources',
    merge: 'Append',
    value: {
      id: 'customRoutes',
      routes: [{
        path: '/datasources',
        children: _Panels_DataSourceSelector__WEBPACK_IMPORTED_MODULE_1__["default"]
      }]
    }
  }, {
    name: 'default',
    value: [
    /**
     * Customization Component Type definition for overlay items.
     * Overlay items are texts (or other components) that will be displayed
     * on a Viewport Overlay, which contains the information panels on the
     * four corners of a viewport.
     *
     * @definition of a overlay item using this type
     * The value to be displayed is defined by
     *  - setting DICOM image instance's property to this field,
     *  - or defining contentF()
     *
     * {
     *   id: string - unique id for the overlay item
     *   customizationType: string - indicates customization type definition to this
     *   label: string - Label, to be displayed for the item
     *   title: string - Tooltip, for the item
     *   color: string - Color of the text
     *   condition: ({ instance }) => boolean - decides whether to display the overlay item or not
     *   attribute: string - property name of the DICOM image instance
     *   contentF: ({ instance, formatters }) => string | component,
     * }
     *
     * @example
     *  {
     *    id: 'PatientNameOverlay',
     *    customizationType: 'ohif.overlayItem',
     *    label: 'PN:',
     *    title: 'Patient Name',
     *    color: 'yellow',
     *    condition: ({ instance }) => instance && instance.PatientName && instance.PatientName.Alphabetic,
     *    attribute: 'PatientName',
     *    contentF: ({ instance, formatters: { formatPN } }) => `${formatPN(instance.PatientName.Alphabetic)} ${(instance.PatientSex ? '(' + instance.PatientSex + ')' : '')}`,
     *  },
     *
     * @see CustomizableViewportOverlay
     */
    {
      id: 'ohif.overlayItem',
      content: function (props) {
        if (this.condition && !this.condition(props)) {
          return null;
        }
        const {
          instance
        } = props;
        const value = instance && this.attribute ? instance[this.attribute] : this.contentF && typeof this.contentF === 'function' ? this.contentF(props) : null;
        if (!value) {
          return null;
        }
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
          className: "overlay-item flex flex-row",
          style: {
            color: this.color || undefined
          },
          title: this.title || ''
        }, this.label && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
          className: "mr-1 shrink-0"
        }, this.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
          className: "font-light"
        }, value));
      }
    }, {
      id: 'ohif.contextMenu',
      /** Applies the customizationType to all the menu items.
       * This function clones the object and child objects to prevent
       * changes to the original customization object.
       */
      transform: function (customizationService) {
        // Don't modify the children, as those are copied by reference
        const clonedObject = {
          ...this
        };
        clonedObject.menus = this.menus.map(menu => ({
          ...menu
        }));
        for (const menu of clonedObject.menus) {
          const {
            items: originalItems
          } = menu;
          menu.items = [];
          for (const item of originalItems) {
            menu.items.push(customizationService.transform(item));
          }
        }
        return clonedObject;
      }
    }, {
      // the generic GUI component to configure a data source using an instance of a BaseDataSourceConfigurationAPI
      id: 'ohif.dataSourceConfigurationComponent',
      component: _Components_DataSourceConfigurationComponent__WEBPACK_IMPORTED_MODULE_3__["default"].bind(null, {
        servicesManager,
        extensionManager
      })
    }, {
      // The factory for creating an instance of a BaseDataSourceConfigurationAPI for Google Cloud Healthcare
      id: 'ohif.dataSourceConfigurationAPI.google',
      factory: dataSourceName => new _DataSourceConfigurationAPI_GoogleCloudDataSourceConfigurationAPI__WEBPACK_IMPORTED_MODULE_4__.GoogleCloudDataSourceConfigurationAPI(dataSourceName, servicesManager, extensionManager)
    }, {
      id: 'progressDropdownWithServiceComponent',
      component: _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_2__.ProgressDropdownWithService
    }, {
      id: 'studyBrowser.sortFunctions',
      values: [{
        label: 'Series Number',
        sortFunction: (a, b) => {
          return a?.SeriesNumber - b?.SeriesNumber;
        }
      }, {
        label: 'Series Date',
        sortFunction: (a, b) => {
          const dateA = new Date(formatDate(a?.SeriesDate));
          const dateB = new Date(formatDate(b?.SeriesDate));
          return dateB.getTime() - dateA.getTime();
        }
      }]
    }, {
      id: 'studyBrowser.viewPresets',
      // change your default selected preset here
      value: [{
        id: 'list',
        iconName: 'ListView',
        selected: false
      }, {
        id: 'thumbnails',
        iconName: 'ThumbnailView',
        selected: true
      }]
    }]
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

/***/ "../../../extensions/default/src/getDataSourcesModule.js":
/*!***************************************************************!*\
  !*** ../../../extensions/default/src/getDataSourcesModule.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DicomWebDataSource_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DicomWebDataSource/index.js */ "../../../extensions/default/src/DicomWebDataSource/index.js");
/* harmony import */ var _DicomJSONDataSource_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DicomJSONDataSource/index.js */ "../../../extensions/default/src/DicomJSONDataSource/index.js");
/* harmony import */ var _DicomLocalDataSource_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DicomLocalDataSource/index.js */ "../../../extensions/default/src/DicomLocalDataSource/index.js");
/* harmony import */ var _DicomWebProxyDataSource_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DicomWebProxyDataSource/index */ "../../../extensions/default/src/DicomWebProxyDataSource/index.ts");
/* harmony import */ var _MergeDataSource_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MergeDataSource/index */ "../../../extensions/default/src/MergeDataSource/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

// TODO: Pull in IWebClientApi from @ohif/core
// TODO: Use constructor to create an instance of IWebClientApi
// TODO: Use existing DICOMWeb configuration (previously, appConfig, to configure instance)







/**
 *
 */
function getDataSourcesModule() {
  return [{
    name: 'dicomweb',
    type: 'webApi',
    createDataSource: _DicomWebDataSource_index_js__WEBPACK_IMPORTED_MODULE_0__.createDicomWebApi
  }, {
    name: 'dicomwebproxy',
    type: 'webApi',
    createDataSource: _DicomWebProxyDataSource_index__WEBPACK_IMPORTED_MODULE_3__.createDicomWebProxyApi
  }, {
    name: 'dicomjson',
    type: 'jsonApi',
    createDataSource: _DicomJSONDataSource_index_js__WEBPACK_IMPORTED_MODULE_1__.createDicomJSONApi
  }, {
    name: 'dicomlocal',
    type: 'localApi',
    createDataSource: _DicomLocalDataSource_index_js__WEBPACK_IMPORTED_MODULE_2__.createDicomLocalApi
  }, {
    name: 'merge',
    type: 'mergeApi',
    createDataSource: _MergeDataSource_index__WEBPACK_IMPORTED_MODULE_4__.createMergeDataSourceApi
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDataSourcesModule);

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

/***/ "../../../extensions/default/src/getDisplaySetMessages.ts":
/*!****************************************************************!*\
  !*** ../../../extensions/default/src/getDisplaySetMessages.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDisplaySetMessages)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_sortInstancesByPosition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/sortInstancesByPosition */ "../../core/src/utils/sortInstancesByPosition.ts");
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _utils_validations_checkMultiframe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/validations/checkMultiframe */ "../../../extensions/default/src/utils/validations/checkMultiframe.ts");
/* harmony import */ var _utils_validations_checkSingleFrames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/validations/checkSingleFrames */ "../../../extensions/default/src/utils/validations/checkSingleFrames.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






/**
 * Checks if a series is reconstructable to a 3D volume.
 *
 * @param {Object[]} instances An array of `OHIFInstanceMetadata` objects.
 */
function getDisplaySetMessages(instances, isReconstructable, isDynamicVolume) {
  const messages = new _ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessageList();
  if (isDynamicVolume) {
    return messages;
  }
  if (!instances.length) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessage.CODES.NO_VALID_INSTANCES);
    return;
  }
  const firstInstance = instances[0];
  const {
    Modality,
    ImageType,
    NumberOfFrames
  } = firstInstance;
  // Due to current requirements, LOCALIZER series doesn't have any messages
  if (ImageType?.includes('LOCALIZER')) {
    return messages;
  }
  if (!_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__.constructableModalities.includes(Modality)) {
    return messages;
  }
  const isMultiframe = NumberOfFrames > 1;
  // Can't reconstruct if all instances don't have the ImagePositionPatient.
  if (!isMultiframe && !instances.every(instance => instance.ImagePositionPatient)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessage.CODES.NO_POSITION_INFORMATION);
  }
  const sortedInstances = (0,_ohif_core_src_utils_sortInstancesByPosition__WEBPACK_IMPORTED_MODULE_0__["default"])(instances);
  isMultiframe ? (0,_utils_validations_checkMultiframe__WEBPACK_IMPORTED_MODULE_3__["default"])(sortedInstances[0], messages) : (0,_utils_validations_checkSingleFrames__WEBPACK_IMPORTED_MODULE_4__["default"])(sortedInstances, messages);
  if (!isReconstructable) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_2__.DisplaySetMessage.CODES.NOT_RECONSTRUCTABLE);
  }
  return messages;
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

/***/ "../../../extensions/default/src/getDisplaySetsFromUnsupportedSeries.js":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/getDisplaySetsFromUnsupportedSeries.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDisplaySetsFromUnsupportedSeries)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_classes_ImageSet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/classes/ImageSet */ "../../core/src/classes/ImageSet.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Default handler for a instance list with an unsupported sopClassUID
 */
function getDisplaySetsFromUnsupportedSeries(instances) {
  const imageSet = new _ohif_core_src_classes_ImageSet__WEBPACK_IMPORTED_MODULE_0__["default"](instances);
  const messages = new _ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessageList();
  messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.UNSUPPORTED_DISPLAYSET);
  const instance = instances[0];
  imageSet.setAttributes({
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    FrameRate: instance.FrameTime,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: instance.SeriesDescription || '',
    Modality: instance.Modality,
    numImageFrames: instances.length,
    unsupported: true,
    SOPClassHandlerId: 'unsupported',
    isReconstructable: false,
    messages
  });
  return [imageSet];
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

/***/ "../../../extensions/default/src/getHangingProtocolModule.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/getHangingProtocolModule.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hangingprotocols/hpMNGrid */ "../../../extensions/default/src/hangingprotocols/hpMNGrid.ts");
/* harmony import */ var _hangingprotocols_hpCompare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hangingprotocols/hpCompare */ "../../../extensions/default/src/hangingprotocols/hpCompare.ts");
/* harmony import */ var _hangingprotocols_hpMammo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hangingprotocols/hpMammo */ "../../../extensions/default/src/hangingprotocols/hpMammo.ts");
/* harmony import */ var _hangingprotocols_hpScale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hangingprotocols/hpScale */ "../../../extensions/default/src/hangingprotocols/hpScale.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





const defaultProtocol = {
  id: 'default',
  locked: true,
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2023-04-01',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  toolGroupIds: ['default'],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: 0,
  // Default viewport is used to define the viewport when
  // additional viewports are added using the layout tool
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true,
      syncGroups: [{
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
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    defaultDisplaySetId: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
      // Try to match series with images by default, to prevent weird display
      // on SEG/SR containing studies
      {
        weight: 10,
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 10,
        constraint: {
          equals: true
        }
      }]
    }
  },
  stages: [{
    name: 'default',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        viewportType: 'stack',
        viewportId: 'default',
        toolGroupId: 'default',
        // This will specify the initial image options index if it matches in the URL
        // and will otherwise not specify anything.
        initialImageOptions: {
          custom: 'sopInstanceLocation'
        },
        // Other options for initialImageOptions, which can be included in the default
        // custom attribute, or can be provided directly.
        //   index: 180,
        //   preset: 'middle', // 'first', 'last', 'middle'
        // },
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }],
    createdDate: '2021-02-23T18:32:42.850Z'
  }]
};
function getHangingProtocolModule() {
  return [{
    name: defaultProtocol.id,
    protocol: defaultProtocol
  },
  // Create a MxN comparison hanging protocol available by default
  {
    name: _hangingprotocols_hpCompare__WEBPACK_IMPORTED_MODULE_1__["default"].id,
    protocol: _hangingprotocols_hpCompare__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    name: _hangingprotocols_hpMammo__WEBPACK_IMPORTED_MODULE_2__["default"].id,
    protocol: _hangingprotocols_hpMammo__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, {
    name: _hangingprotocols_hpScale__WEBPACK_IMPORTED_MODULE_3__["default"].id,
    protocol: _hangingprotocols_hpScale__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  // Create a MxN hanging protocol available by default
  {
    name: _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__["default"].id,
    protocol: _hangingprotocols_hpMNGrid__WEBPACK_IMPORTED_MODULE_0__["default"]
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

/***/ "../../../extensions/default/src/getLayoutTemplateModule.js":
/*!******************************************************************!*\
  !*** ../../../extensions/default/src/getLayoutTemplateModule.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewerLayout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewerLayout */ "../../../extensions/default/src/ViewerLayout/index.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/*
- Define layout for the viewer in mode configuration.
- Pass in the viewport types that can populate the viewer.
- Init layout based on the displaySets and the objects.
*/

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__({
  servicesManager,
  extensionManager,
  commandsManager,
  hotkeysManager
}) {
  function ViewerLayoutWithServices(props) {
    return (0,_ViewerLayout__WEBPACK_IMPORTED_MODULE_0__["default"])({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props
    });
  }
  return [
  // Layout Template Definition
  // TODO: this is weird naming
  {
    name: 'viewerLayout',
    id: 'viewerLayout',
    component: ViewerLayoutWithServices
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

/***/ "../../../extensions/default/src/getPTImageIdInstanceMetadata.ts":
/*!***********************************************************************!*\
  !*** ../../../extensions/default/src/getPTImageIdInstanceMetadata.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPTImageIdInstanceMetadata),
/* harmony export */   getPTImageIdInstanceMetadata: () => (/* binding */ getPTImageIdInstanceMetadata)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__["default"].classes.MetadataProvider;
function getPTImageIdInstanceMetadata(imageId) {
  const dicomMetaData = metadataProvider.get('instance', imageId);
  if (!dicomMetaData) {
    throw new Error('dicom metadata are required');
  }
  if (dicomMetaData.SeriesDate === undefined || dicomMetaData.SeriesTime === undefined || dicomMetaData.CorrectedImage === undefined || dicomMetaData.Units === undefined || !dicomMetaData.RadiopharmaceuticalInformationSequence || dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose === undefined || dicomMetaData.DecayCorrection === undefined || dicomMetaData.AcquisitionDate === undefined || dicomMetaData.AcquisitionTime === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartDateTime === undefined && dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime === undefined) {
    throw new Error('required metadata are missing');
  }
  if (dicomMetaData.PatientWeight === undefined) {
    console.warn('PatientWeight missing from PT instance metadata');
  }
  const instanceMetadata = {
    CorrectedImage: dicomMetaData.CorrectedImage,
    Units: dicomMetaData.Units,
    RadionuclideHalfLife: dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife,
    RadionuclideTotalDose: dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose,
    RadiopharmaceuticalStartDateTime: dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartDateTime,
    RadiopharmaceuticalStartTime: dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime,
    DecayCorrection: dicomMetaData.DecayCorrection,
    PatientWeight: dicomMetaData.PatientWeight,
    SeriesDate: dicomMetaData.SeriesDate,
    SeriesTime: dicomMetaData.SeriesTime,
    AcquisitionDate: dicomMetaData.AcquisitionDate,
    AcquisitionTime: dicomMetaData.AcquisitionTime
  };
  if (dicomMetaData['70531000'] || dicomMetaData['70531000'] !== undefined || dicomMetaData['70531009'] || dicomMetaData['70531009'] !== undefined) {
    const philipsPETPrivateGroup = {
      SUVScaleFactor: dicomMetaData['70531000'],
      ActivityConcentrationScaleFactor: dicomMetaData['70531009']
    };
    instanceMetadata.PhilipsPETPrivateGroup = philipsPETPrivateGroup;
  }
  if (dicomMetaData['0009100d'] && dicomMetaData['0009100d'] !== undefined) {
    instanceMetadata.GEPrivatePostInjectionDateTime = dicomMetaData['0009100d'];
  }
  if (dicomMetaData.FrameReferenceTime && dicomMetaData.FrameReferenceTime !== undefined) {
    instanceMetadata.FrameReferenceTime = dicomMetaData.FrameReferenceTime;
  }
  if (dicomMetaData.ActualFrameDuration && dicomMetaData.ActualFrameDuration !== undefined) {
    instanceMetadata.ActualFrameDuration = dicomMetaData.ActualFrameDuration;
  }
  if (dicomMetaData.PatientSex && dicomMetaData.PatientSex !== undefined) {
    instanceMetadata.PatientSex = dicomMetaData.PatientSex;
  }
  if (dicomMetaData.PatientSize && dicomMetaData.PatientSize !== undefined) {
    instanceMetadata.PatientSize = dicomMetaData.PatientSize;
  }
  return instanceMetadata;
}
function convertInterfaceTimeToString(time) {
  const hours = `${time.hours || '00'}`.padStart(2, '0');
  const minutes = `${time.minutes || '00'}`.padStart(2, '0');
  const seconds = `${time.seconds || '00'}`.padStart(2, '0');
  const fractionalSeconds = `${time.fractionalSeconds || '000000'}`.padEnd(6, '0');
  const timeString = `${hours}${minutes}${seconds}.${fractionalSeconds}`;
  return timeString;
}
function convertInterfaceDateToString(date) {
  const month = `${date.month}`.padStart(2, '0');
  const day = `${date.day}`.padStart(2, '0');
  const dateString = `${date.year}${month}${day}`;
  return dateString;
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

/***/ "../../../extensions/default/src/getPanelModule.tsx":
/*!**********************************************************!*\
  !*** ../../../extensions/default/src/getPanelModule.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Panels */ "../../../extensions/default/src/Panels/index.js");
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! i18next */ "../../../node_modules/i18next/dist/esm/i18next.js");
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




// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  return [{
    name: 'seriesList',
    iconName: 'tab-studies',
    iconLabel: 'Studies',
    label: i18next__WEBPACK_IMPORTED_MODULE_2__["default"].t('SidePanel:Studies'),
    component: props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panels__WEBPACK_IMPORTED_MODULE_1__.WrappedPanelStudyBrowser, _extends({}, props, {
      commandsManager: commandsManager,
      extensionManager: extensionManager,
      servicesManager: servicesManager
    }))
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

/***/ "../../../extensions/default/src/getSopClassHandlerModule.js":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/getSopClassHandlerModule.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _id__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./id */ "../../../extensions/default/src/id.js");
/* harmony import */ var _getDisplaySetMessages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDisplaySetMessages */ "../../../extensions/default/src/getDisplaySetMessages.ts");
/* harmony import */ var _getDisplaySetsFromUnsupportedSeries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getDisplaySetsFromUnsupportedSeries */ "../../../extensions/default/src/getDisplaySetsFromUnsupportedSeries.js");
/* harmony import */ var _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SOPClassHandlers/chartSOPClassHandler */ "../../../extensions/default/src/SOPClassHandlers/chartSOPClassHandler.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






const {
  isImage,
  sopClassDictionary,
  isDisplaySetReconstructable
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils;
const {
  ImageSet
} = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes;
const DEFAULT_VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume';
const DYNAMIC_VOLUME_LOADER_SCHEME = 'cornerstoneStreamingDynamicImageVolume';
const sopClassHandlerName = 'stack';
let appContext = {};
const getDynamicVolumeInfo = instances => {
  const {
    extensionManager
  } = appContext;
  if (!extensionManager) {
    throw new Error('extensionManager is not available');
  }
  const imageIds = instances.map(({
    imageId
  }) => imageId);
  const volumeLoaderUtility = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.volumeLoader');
  const {
    getDynamicVolumeInfo: csGetDynamicVolumeInfo
  } = volumeLoaderUtility.exports;
  return csGetDynamicVolumeInfo(imageIds);
};
const isMultiFrame = instance => {
  return instance.NumberOfFrames > 1;
};
function getDisplaySetInfo(instances) {
  const dynamicVolumeInfo = getDynamicVolumeInfo(instances);
  const {
    isDynamicVolume,
    timePoints
  } = dynamicVolumeInfo;
  let displaySetInfo;
  const {
    appConfig
  } = appContext;
  if (isDynamicVolume) {
    const timePoint = timePoints[0];
    const instancesMap = new Map();

    // O(n) to convert it into a map and O(1) to find each instance
    instances.forEach(instance => instancesMap.set(instance.imageId, instance));
    const firstTimePointInstances = timePoint.map(imageId => instancesMap.get(imageId));
    displaySetInfo = isDisplaySetReconstructable(firstTimePointInstances, appConfig);
  } else {
    displaySetInfo = isDisplaySetReconstructable(instances, appConfig);
  }
  return {
    isDynamicVolume,
    ...displaySetInfo,
    dynamicVolumeInfo
  };
}
const makeDisplaySet = instances => {
  const instance = instances[0];
  const imageSet = new ImageSet(instances);
  const {
    isDynamicVolume,
    value: isReconstructable,
    averageSpacingBetweenFrames,
    dynamicVolumeInfo
  } = getDisplaySetInfo(instances);
  const volumeLoaderSchema = isDynamicVolume ? DYNAMIC_VOLUME_LOADER_SCHEME : DEFAULT_VOLUME_LOADER_SCHEME;

  // set appropriate attributes to image set...
  const messages = (0,_getDisplaySetMessages__WEBPACK_IMPORTED_MODULE_2__["default"])(instances, isReconstructable, isDynamicVolume);
  imageSet.setAttributes({
    volumeLoaderSchema,
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    FrameRate: instance.FrameTime,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: instance.SeriesDescription || '',
    Modality: instance.Modality,
    isMultiFrame: isMultiFrame(instance),
    countIcon: isReconstructable ? 'icon-mpr' : undefined,
    numImageFrames: instances.length,
    SOPClassHandlerId: `${_id__WEBPACK_IMPORTED_MODULE_1__.id}.sopClassHandlerModule.${sopClassHandlerName}`,
    isReconstructable,
    messages,
    averageSpacingBetweenFrames: averageSpacingBetweenFrames || null,
    isDynamicVolume,
    dynamicVolumeInfo
  });

  // Sort the images in this series if needed
  const shallSort = true; //!OHIF.utils.ObjectPath.get(Meteor, 'settings.public.ui.sortSeriesByIncomingOrder');
  if (shallSort) {
    imageSet.sortBy((a, b) => {
      // Sort by InstanceNumber (0020,0013)
      return (parseInt(a.InstanceNumber) || 0) - (parseInt(b.InstanceNumber) || 0);
    });
  }

  // Include the first image instance number (after sorted)
  /*imageSet.setAttribute(
    'instanceNumber',
    imageSet.getImage(0).InstanceNumber
  );*/

  /*const isReconstructable = isDisplaySetReconstructable(series, instances);
   imageSet.isReconstructable = isReconstructable.value;
   if (isReconstructable.missingFrames) {
    // TODO -> This is currently unused, but may be used for reconstructing
    // Volumes with gaps later on.
    imageSet.missingFrames = isReconstructable.missingFrames;
  }*/

  return imageSet;
};
const isSingleImageModality = modality => {
  return modality === 'CR' || modality === 'MG' || modality === 'DX';
};
function getSopClassUids(instances) {
  const uniqueSopClassUidsInSeries = new Set();
  instances.forEach(instance => {
    uniqueSopClassUidsInSeries.add(instance.SOPClassUID);
  });
  const sopClassUids = Array.from(uniqueSopClassUidsInSeries);
  return sopClassUids;
}

/**
 * Basic SOPClassHandler:
 * - For all Image types that are stackable, create
 *   a displaySet with a stack of images
 *
 * @param {SeriesMetadata} series The series metadata object from which the display sets will be created
 * @returns {Array} The list of display sets created for the given series object
 */
function getDisplaySetsFromSeries(instances) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const displaySets = [];
  const sopClassUids = getSopClassUids(instances);

  // Search through the instances (InstanceMetadata object) of this series
  // Split Multi-frame instances and Single-image modalities
  // into their own specific display sets. Place the rest of each
  // series into another display set.
  const stackableInstances = [];
  instances.forEach(instance => {
    // All imaging modalities must have a valid value for sopClassUid (x00080016) or rows (x00280010)
    if (!isImage(instance.SOPClassUID) && !instance.Rows) {
      return;
    }
    let displaySet;
    if (isMultiFrame(instance)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        numImageFrames: instance.NumberOfFrames,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else if (isSingleImageModality(instance.Modality)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else {
      stackableInstances.push(instance);
    }
  });
  if (stackableInstances.length) {
    const displaySet = makeDisplaySet(stackableInstances);
    displaySet.setAttribute('studyInstanceUid', instances[0].StudyInstanceUID);
    displaySet.setAttributes({
      sopClassUids
    });
    displaySets.push(displaySet);
  }
  return displaySets;
}
const sopClassUids = [sopClassDictionary.ComputedRadiographyImageStorage, sopClassDictionary.DigitalXRayImageStorageForPresentation, sopClassDictionary.DigitalXRayImageStorageForProcessing, sopClassDictionary.DigitalMammographyXRayImageStorageForPresentation, sopClassDictionary.DigitalMammographyXRayImageStorageForProcessing, sopClassDictionary.DigitalIntraOralXRayImageStorageForPresentation, sopClassDictionary.DigitalIntraOralXRayImageStorageForProcessing, sopClassDictionary.CTImageStorage, sopClassDictionary.EnhancedCTImageStorage, sopClassDictionary.LegacyConvertedEnhancedCTImageStorage, sopClassDictionary.UltrasoundMultiframeImageStorage, sopClassDictionary.MRImageStorage, sopClassDictionary.EnhancedMRImageStorage, sopClassDictionary.EnhancedMRColorImageStorage, sopClassDictionary.LegacyConvertedEnhancedMRImageStorage, sopClassDictionary.UltrasoundImageStorage, sopClassDictionary.UltrasoundImageStorageRET, sopClassDictionary.SecondaryCaptureImageStorage, sopClassDictionary.MultiframeSingleBitSecondaryCaptureImageStorage, sopClassDictionary.MultiframeGrayscaleByteSecondaryCaptureImageStorage, sopClassDictionary.MultiframeGrayscaleWordSecondaryCaptureImageStorage, sopClassDictionary.MultiframeTrueColorSecondaryCaptureImageStorage, sopClassDictionary.XRayAngiographicImageStorage, sopClassDictionary.EnhancedXAImageStorage, sopClassDictionary.XRayRadiofluoroscopicImageStorage, sopClassDictionary.EnhancedXRFImageStorage, sopClassDictionary.XRay3DAngiographicImageStorage, sopClassDictionary.XRay3DCraniofacialImageStorage, sopClassDictionary.BreastTomosynthesisImageStorage, sopClassDictionary.BreastProjectionXRayImageStorageForPresentation, sopClassDictionary.BreastProjectionXRayImageStorageForProcessing, sopClassDictionary.IntravascularOpticalCoherenceTomographyImageStorageForPresentation, sopClassDictionary.IntravascularOpticalCoherenceTomographyImageStorageForProcessing, sopClassDictionary.NuclearMedicineImageStorage, sopClassDictionary.VLEndoscopicImageStorage, sopClassDictionary.VideoEndoscopicImageStorage, sopClassDictionary.VLMicroscopicImageStorage, sopClassDictionary.VideoMicroscopicImageStorage, sopClassDictionary.VLSlideCoordinatesMicroscopicImageStorage, sopClassDictionary.VLPhotographicImageStorage, sopClassDictionary.VideoPhotographicImageStorage, sopClassDictionary.OphthalmicPhotography8BitImageStorage, sopClassDictionary.OphthalmicPhotography16BitImageStorage, sopClassDictionary.OphthalmicTomographyImageStorage,
// Handled by another sop class module
// sopClassDictionary.VLWholeSlideMicroscopyImageStorage,
sopClassDictionary.PositronEmissionTomographyImageStorage, sopClassDictionary.EnhancedPETImageStorage, sopClassDictionary.LegacyConvertedEnhancedPETImageStorage, sopClassDictionary.RTImageStorage, sopClassDictionary.EnhancedUSVolumeStorage];
function getSopClassHandlerModule(appContextParam) {
  appContext = appContextParam;
  return [{
    name: sopClassHandlerName,
    sopClassUids,
    getDisplaySetsFromSeries
  }, {
    name: 'not-supported-display-sets-handler',
    sopClassUids: [],
    getDisplaySetsFromSeries: _getDisplaySetsFromUnsupportedSeries__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, {
    name: _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_4__.chartHandler.name,
    sopClassUids: _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_4__.chartHandler.sopClassUids,
    getDisplaySetsFromSeries: _SOPClassHandlers_chartSOPClassHandler__WEBPACK_IMPORTED_MODULE_4__.chartHandler.getDisplaySetsFromSeries
  }];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSopClassHandlerModule);

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

/***/ "../../../extensions/default/src/getToolbarModule.tsx":
/*!************************************************************!*\
  !*** ../../../extensions/default/src/getToolbarModule.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getToolbarModule)
/* harmony export */ });
/* harmony import */ var _Toolbar_ToolbarDivider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Toolbar/ToolbarDivider */ "../../../extensions/default/src/Toolbar/ToolbarDivider.tsx");
/* harmony import */ var _Toolbar_ToolbarLayoutSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Toolbar/ToolbarLayoutSelector */ "../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx");
/* harmony import */ var _Toolbar_ToolbarSplitButtonWithServices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Toolbar/ToolbarSplitButtonWithServices */ "../../../extensions/default/src/Toolbar/ToolbarSplitButtonWithServices.tsx");
/* harmony import */ var _Toolbar_ToolbarButtonGroupWithServices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Toolbar/ToolbarButtonGroupWithServices */ "../../../extensions/default/src/Toolbar/ToolbarButtonGroupWithServices.tsx");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/ProgressDropdownWithService */ "../../../extensions/default/src/Components/ProgressDropdownWithService.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







const getClassName = isToggled => {
  return {
    className: isToggled ? '!text-primary-active' : '!text-common-bright hover:!bg-primary-dark hover:text-primary-light'
  };
};
function getToolbarModule({
  commandsManager,
  servicesManager
}) {
  const {
    cineService
  } = servicesManager.services;
  return [{
    name: 'ohif.radioGroup',
    defaultComponent: _ohif_ui__WEBPACK_IMPORTED_MODULE_4__.ToolbarButton
  }, {
    name: 'ohif.divider',
    defaultComponent: _Toolbar_ToolbarDivider__WEBPACK_IMPORTED_MODULE_0__["default"]
  }, {
    name: 'ohif.splitButton',
    defaultComponent: _Toolbar_ToolbarSplitButtonWithServices__WEBPACK_IMPORTED_MODULE_2__["default"]
  }, {
    name: 'ohif.layoutSelector',
    defaultComponent: props => (0,_Toolbar_ToolbarLayoutSelector__WEBPACK_IMPORTED_MODULE_1__["default"])({
      ...props,
      commandsManager,
      servicesManager
    })
  }, {
    name: 'ohif.buttonGroup',
    defaultComponent: _Toolbar_ToolbarButtonGroupWithServices__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, {
    name: 'ohif.progressDropdown',
    defaultComponent: _Components_ProgressDropdownWithService__WEBPACK_IMPORTED_MODULE_5__.ProgressDropdownWithService
  }, {
    name: 'evaluate.group.promoteToPrimary',
    evaluate: ({
      viewportId,
      button,
      itemId
    }) => {
      const {
        items
      } = button.props;
      if (!itemId) {
        return {
          primary: button.props.primary,
          items
        };
      }

      // other wise we can move the clicked tool to the primary button
      const clickedItemProps = items.find(item => item.id === itemId || item.itemId === itemId);
      return {
        primary: clickedItemProps,
        items
      };
    }
  }, {
    name: 'evaluate.cine',
    evaluate: () => {
      const isToggled = cineService.getState().isCineEnabled;
      return getClassName(isToggled);
    }
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

/***/ "../../../extensions/default/src/getViewportModule.tsx":
/*!*************************************************************!*\
  !*** ../../../extensions/default/src/getViewportModule.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportModule)
/* harmony export */ });
/* harmony import */ var _Components_LineChartViewport_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/LineChartViewport/index */ "../../../extensions/default/src/Components/LineChartViewport/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const getViewportModule = ({
  servicesManager,
  commandsManager,
  extensionManager
}) => {
  return [{
    name: 'chartViewport',
    component: _Components_LineChartViewport_index__WEBPACK_IMPORTED_MODULE_0__["default"]
  }];
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

/***/ "../../../extensions/default/src/hangingprotocols/hpCompare.ts":
/*!*********************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpCompare.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const defaultDisplaySetSelector = {
  studyMatchingRules: [{
    // The priorInstance is a study counter that indicates what position this study is in
    // and the value comes from the options parameter.
    attribute: 'studyInstanceUIDsIndex',
    from: 'options',
    required: true,
    constraint: {
      equals: {
        value: 0
      }
    }
  }],
  seriesMatchingRules: [{
    attribute: 'numImageFrames',
    constraint: {
      greaterThan: {
        value: 0
      }
    }
  },
  // This display set will select the specified items by preference
  // It has no affect if nothing is specified in the URL.
  {
    attribute: 'isDisplaySetFromUrl',
    weight: 10,
    constraint: {
      equals: true
    }
  }]
};
const priorDisplaySetSelector = {
  studyMatchingRules: [{
    // The priorInstance is a study counter that indicates what position this study is in
    // and the value comes from the options parameter.
    attribute: 'studyInstanceUIDsIndex',
    from: 'options',
    required: true,
    constraint: {
      equals: {
        value: 1
      }
    }
  }],
  seriesMatchingRules: [{
    attribute: 'numImageFrames',
    constraint: {
      greaterThan: {
        value: 0
      }
    }
  },
  // This display set will select the specified items by preference
  // It has no affect if nothing is specified in the URL.
  {
    attribute: 'isDisplaySetFromUrl',
    weight: 10,
    constraint: {
      equals: true
    }
  }]
};
const currentDisplaySet = {
  id: 'defaultDisplaySetId'
};
const priorDisplaySet = {
  id: 'priorDisplaySetId'
};
const currentViewport0 = {
  viewportOptions: {
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [currentDisplaySet]
};
const currentViewport1 = {
  ...currentViewport0,
  displaySets: [{
    ...currentDisplaySet,
    matchedDisplaySetsIndex: 1
  }]
};
const priorViewport0 = {
  ...currentViewport0,
  displaySets: [priorDisplaySet]
};
const priorViewport1 = {
  ...priorViewport0,
  displaySets: [{
    ...priorDisplaySet,
    matchedDisplaySetsIndex: 1
  }]
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMNCompare = {
  id: '@ohif/hpCompare',
  description: 'Compare two studies in various layouts',
  name: 'Compare Two Studies',
  numberOfPriorsReferenced: 1,
  protocolMatchingRules: [{
    id: 'Two Studies',
    weight: 1000,
    // is there a second study or in another work the attribute
    // studyInstanceUIDsIndex that we get from prior should not be null
    attribute: 'StudyInstanceUID',
    from: 'prior',
    required: true,
    constraint: {
      notNull: true
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: defaultDisplaySetSelector,
    priorDisplaySetId: priorDisplaySetSelector
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    name: '2x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 4
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [currentViewport0, priorViewport0, currentViewport1, priorViewport1]
  }, {
    name: '2x1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 2
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 2
      }
    },
    viewports: [currentViewport0, priorViewport0]
  }]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpMNCompare);

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

/***/ "../../../extensions/default/src/hangingprotocols/hpMNGrid.ts":
/*!********************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpMNGrid.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HYDRATE_SEG_SYNC_GROUP: () => (/* binding */ HYDRATE_SEG_SYNC_GROUP),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Sync group configuration for hydrating segmentations across viewports
 * that share the same frame of reference
 * @type {Types.HangingProtocol.SyncGroup}
 */
const HYDRATE_SEG_SYNC_GROUP = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR']
  }
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMN = {
  id: '@ohif/mnGrid',
  description: 'Has various hanging protocol grid layouts',
  name: '2x2',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        },
        required: true
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 10,
        constraint: {
          equals: true
        }
      }]
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true,
      syncGroups: [HYDRATE_SEG_SYNC_GROUP]
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    id: '2x2',
    name: '2x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 4
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        syncGroups: [{
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
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        matchedDisplaySetsIndex: 2,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        matchedDisplaySetsIndex: 3,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // 3x1 stage
  {
    id: '3x1',
    // Obsolete settings:
    requiredViewports: 1,
    preferredViewports: 3,
    // New equivalent:
    stageActivation: {
      enabled: {
        minViewportsMatched: 3
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 1
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 2
      }]
    }]
  },
  // A 2x1 stage
  {
    id: '2x1',
    requiredViewports: 1,
    preferredViewports: 2,
    stageActivation: {
      enabled: {
        minViewportsMatched: 2
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
  {
    id: '1x1',
    requiredViewports: 1,
    preferredViewports: 1,
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }],
  numberOfPriorsReferenced: -1
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpMN);

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

/***/ "../../../extensions/default/src/hangingprotocols/hpMammo.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpMammo.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mammoDisplaySetSelector */ "../../../extensions/default/src/hangingprotocols/mammoDisplaySetSelector.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const rightDisplayArea = {
  storeAsInitialCamera: true,
  imageArea: [0.8, 0.8],
  imageCanvasPoint: {
    imagePoint: [0, 0.5],
    canvasPoint: [0, 0.5]
  }
};
const leftDisplayArea = {
  storeAsInitialCamera: true,
  imageArea: [0.8, 0.8],
  imageCanvasPoint: {
    imagePoint: [1, 0.5],
    canvasPoint: [1, 0.5]
  }
};
const hpMammography = {
  id: '@ohif/hpMammo',
  hasUpdatedPriorsInformation: false,
  name: 'Mammography Breast Screening',
  protocolMatchingRules: [{
    id: 'Mammography',
    weight: 150,
    attribute: 'ModalitiesInStudy',
    constraint: {
      contains: 'MG'
    },
    required: true
  }, {
    id: 'numberOfImages',
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 2
    },
    required: true
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    RCC: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RCC,
    LCC: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LCC,
    RMLO: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RMLO,
    LMLO: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LMLO,
    RCCPrior: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RCCPrior,
    LCCPrior: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LCCPrior,
    RMLOPrior: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.RMLOPrior,
    LMLOPrior: _mammoDisplaySetSelector__WEBPACK_IMPORTED_MODULE_0__.LMLOPrior
  },
  stages: [{
    name: 'CC/MLO',
    viewportStructure: {
      type: 'grid',
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        // flipHorizontal: true,
        // rotation: 180,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'RCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        // flipHorizontal: true,
        displayArea: rightDisplayArea,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'LCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        // rotation: 180,
        // flipHorizontal: true,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'RMLO'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
        // flipHorizontal: true,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'LMLO'
      }]
    }]
  },
  // Compare CC current/prior top/bottom
  {
    name: 'CC compare',
    viewportStructure: {
      type: 'grid',
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: true,
        rotation: 180
      },
      displaySets: [{
        id: 'RCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        flipHorizontal: true,
        displayArea: rightDisplayArea
      },
      displaySets: [{
        id: 'LCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: true
      },
      displaySets: [{
        id: 'RCCPrior'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea
      },
      displaySets: [{
        id: 'LCCPrior'
      }]
    }]
  }],
  // Indicates it is prior aware, but will work with no priors
  numberOfPriorsReferenced: 0
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpMammography);

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

/***/ "../../../extensions/default/src/hangingprotocols/hpScale.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/hpScale.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const displayAreaScale1 = {
  type: 'SCALE',
  scale: 1,
  storeAsInitialCamera: true
};
const displayAreaScale15 = {
  ...displayAreaScale1,
  scale: 15
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpScale = {
  id: '@ohif/hpScale',
  description: 'Has various hanging protocol grid layouts',
  name: 'Scale Images',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        },
        required: true
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 10,
        constraint: {
          equals: true
        }
      }]
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      displayArea: displayAreaScale1,
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [
  // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
  {
    name: 'Scale 1:1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        displayArea: displayAreaScale1
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'Scale 1:15',
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        displayArea: displayAreaScale15
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }],
  numberOfPriorsReferenced: -1
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (hpScale);

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

/***/ "../../../extensions/default/src/hangingprotocols/index.ts":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/index.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hpCompare: () => (/* reexport safe */ _hpCompare__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   hpMNGrid: () => (/* reexport safe */ _hpMNGrid__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   hpMammo: () => (/* reexport safe */ _hpMammo__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   lateralityAttribute: () => (/* reexport safe */ _laterality__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   registerHangingProtocolAttributes: () => (/* reexport safe */ _registerHangingProtocolAttributes__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   viewCodeAttribute: () => (/* reexport safe */ _viewCode__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _viewCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewCode */ "../../../extensions/default/src/hangingprotocols/viewCode.ts");
/* harmony import */ var _laterality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./laterality */ "../../../extensions/default/src/hangingprotocols/laterality.ts");
/* harmony import */ var _registerHangingProtocolAttributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registerHangingProtocolAttributes */ "../../../extensions/default/src/hangingprotocols/registerHangingProtocolAttributes.ts");
/* harmony import */ var _hpMammo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hpMammo */ "../../../extensions/default/src/hangingprotocols/hpMammo.ts");
/* harmony import */ var _hpMNGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hpMNGrid */ "../../../extensions/default/src/hangingprotocols/hpMNGrid.ts");
/* harmony import */ var _hpCompare__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hpCompare */ "../../../extensions/default/src/hangingprotocols/hpCompare.ts");
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

/***/ "../../../extensions/default/src/hangingprotocols/laterality.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/laterality.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displaySet => {
  const frameAnatomy = displaySet?.images?.[0]?.SharedFunctionalGroupsSequence?.[0]?.FrameAnatomySequence?.[0];
  if (!frameAnatomy) {
    return undefined;
  }
  const laterality = frameAnatomy?.FrameLaterality;
  return laterality;
});

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

/***/ "../../../extensions/default/src/hangingprotocols/mammoDisplaySetSelector.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/mammoDisplaySetSelector.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LCC: () => (/* binding */ LCC),
/* harmony export */   LCCPrior: () => (/* binding */ LCCPrior),
/* harmony export */   LMLO: () => (/* binding */ LMLO),
/* harmony export */   LMLOPrior: () => (/* binding */ LMLOPrior),
/* harmony export */   RCC: () => (/* binding */ RCC),
/* harmony export */   RCCPrior: () => (/* binding */ RCCPrior),
/* harmony export */   RMLO: () => (/* binding */ RMLO),
/* harmony export */   RMLOPrior: () => (/* binding */ RMLOPrior)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const priorStudyMatchingRules = [{
  // The priorInstance is a study counter that indicates what position this study is in
  // and the value comes from the options parameter.
  attribute: 'studyInstanceUIDsIndex',
  from: 'options',
  required: true,
  constraint: {
    equals: {
      value: 1
    }
  }
}];
const currentStudyMatchingRules = [{
  // The priorInstance is a study counter that indicates what position this study is in
  // and the value comes from the options parameter.
  attribute: 'studyInstanceUIDsIndex',
  from: 'options',
  required: true,
  constraint: {
    equals: {
      value: 0
    }
  }
}];
const LCCSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399162004'
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    contains: 'L'
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'L CC'
  }
}];
const RCCSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399162004'
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['P', 'L']
  }
}, {
  attribute: 'PatientOrientation',
  constraint: {
    doesNotEqual: ['A', 'R']
  },
  required: true
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'CC'
  }
}];
const LMLOSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399368009'
  }
}, {
  weight: 0,
  attribute: 'ViewCode',
  constraint: {
    doesNotEqual: 'SCT:399162004'
  },
  required: true
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['A', 'R']
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'L MLO'
  }
}];
const RMLOSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399368009'
  }
}, {
  attribute: 'ViewCode',
  constraint: {
    doesNotEqual: 'SCT:399162004'
  },
  required: true
}, {
  attribute: 'PatientOrientation',
  constraint: {
    doesNotContain: ['P', 'FL']
  },
  required: true
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['P', 'L']
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['A', 'FR']
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'R MLO'
  }
}, {
  attribute: 'SeriesDescription',
  required: true,
  constraint: {
    doesNotContain: 'CC'
  }
}, {
  attribute: 'SeriesDescription',
  required: true,
  constraint: {
    doesNotEqual: 'L MLO'
  },
  required: true
}];
const RCC = {
  seriesMatchingRules: RCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const RCCPrior = {
  seriesMatchingRules: RCCSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const LCC = {
  seriesMatchingRules: LCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const LCCPrior = {
  seriesMatchingRules: LCCSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const RMLO = {
  seriesMatchingRules: RMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const RMLOPrior = {
  seriesMatchingRules: RMLOSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const LMLO = {
  seriesMatchingRules: LMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const LMLOPrior = {
  seriesMatchingRules: LMLOSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
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

/***/ "../../../extensions/default/src/hangingprotocols/registerHangingProtocolAttributes.ts":
/*!*********************************************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/registerHangingProtocolAttributes.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ registerHangingProtocolAttributes)
/* harmony export */ });
/* harmony import */ var _viewCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewCode */ "../../../extensions/default/src/hangingprotocols/viewCode.ts");
/* harmony import */ var _laterality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./laterality */ "../../../extensions/default/src/hangingprotocols/laterality.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function registerHangingProtocolAttributes({
  servicesManager
}) {
  const {
    hangingProtocolService
  } = servicesManager.services;
  hangingProtocolService.addCustomAttribute('ViewCode', 'View Code Designator:Value', _viewCode__WEBPACK_IMPORTED_MODULE_0__["default"]);
  hangingProtocolService.addCustomAttribute('Laterality', 'Laterality of object', _laterality__WEBPACK_IMPORTED_MODULE_1__["default"]);
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

/***/ "../../../extensions/default/src/hangingprotocols/viewCode.ts":
/*!********************************************************************!*\
  !*** ../../../extensions/default/src/hangingprotocols/viewCode.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displaySet => {
  const ViewCodeSequence = displaySet?.images[0]?.ViewCodeSequence[0];
  if (!ViewCodeSequence) {
    return undefined;
  }
  const {
    CodingSchemeDesignator,
    CodeValue
  } = ViewCodeSequence;
  if (!CodingSchemeDesignator || !CodeValue) {
    return undefined;
  }
  return `${CodingSchemeDesignator}:${CodeValue}`;
});

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

/***/ "../../../extensions/default/src/hooks/usePatientInfo.tsx":
/*!****************************************************************!*\
  !*** ../../../extensions/default/src/hooks/usePatientInfo.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();


const {
  formatPN,
  formatDate
} = _ohif_core__WEBPACK_IMPORTED_MODULE_1__.utils;
function usePatientInfo(servicesManager) {
  _s2();
  _s();
  const {
    displaySetService
  } = servicesManager.services;
  const [patientInfo, setPatientInfo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    PatientName: '',
    PatientID: '',
    PatientSex: '',
    PatientDOB: ''
  });
  const [isMixedPatients, setIsMixedPatients] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const displaySets = displaySetService.getActiveDisplaySets();
  const checkMixedPatients = PatientID => {
    const displaySets = displaySetService.getActiveDisplaySets();
    let isMixedPatients = false;
    displaySets.forEach(displaySet => {
      const instance = displaySet?.instances?.[0] || displaySet?.instance;
      if (!instance) {
        return;
      }
      if (instance.PatientID !== PatientID) {
        isMixedPatients = true;
      }
    });
    setIsMixedPatients(isMixedPatients);
  };
  const updatePatientInfo = () => {
    const displaySet = displaySets[0];
    const instance = displaySet?.instances?.[0] || displaySet?.instance;
    if (!instance) {
      return;
    }
    setPatientInfo({
      PatientID: instance.PatientID || null,
      PatientName: instance.PatientName ? formatPN(instance.PatientName.Alphabetic) : null,
      PatientSex: instance.PatientSex || null,
      PatientDOB: formatDate(instance.PatientBirthDate) || null
    });
    checkMixedPatients(instance.PatientID || null);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const subscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, () => updatePatientInfo());
    return () => subscription.unsubscribe();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    updatePatientInfo();
  }, [displaySets]);
  return {
    patientInfo,
    isMixedPatients
  };
}
_s2(usePatientInfo, "+xuf6kKNLt4PWfiY4m0up/m00Bw=");
_s(usePatientInfo, "DMHHrlh4G5MtC6Yf3a/JitloUt0=");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (usePatientInfo);

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

/***/ "../../../extensions/default/src/id.js":
/*!*********************************************!*\
  !*** ../../../extensions/default/src/id.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   id: () => (/* binding */ id)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "../../../extensions/default/package.json");
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

/***/ "../../../extensions/default/src/index.ts":
/*!************************************************!*\
  !*** ../../../extensions/default/src/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenuController: () => (/* reexport safe */ _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_12__.ContextMenuController),
/* harmony export */   CustomizableContextMenuTypes: () => (/* reexport safe */ _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_12__.CustomizableContextMenuTypes),
/* harmony export */   PanelStudyBrowserHeader: () => (/* reexport safe */ _Panels_StudyBrowser_PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_29__.PanelStudyBrowserHeader),
/* harmony export */   StaticWadoClient: () => (/* reexport safe */ _DicomWebDataSource_utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   callInputDialog: () => (/* reexport safe */ _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_24__.callInputDialog),
/* harmony export */   callLabelAutocompleteDialog: () => (/* reexport safe */ _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_24__.callLabelAutocompleteDialog),
/* harmony export */   cleanDenaturalizedDataset: () => (/* reexport safe */ _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_13__.cleanDenaturalizedDataset),
/* harmony export */   colorPickerDialog: () => (/* reexport safe */ _utils_colorPickerDialog__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   createReportAsync: () => (/* reexport safe */ _Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   createReportDialogPrompt: () => (/* reexport safe */ _Panels__WEBPACK_IMPORTED_MODULE_14__.createReportDialogPrompt),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   dicomWebUtils: () => (/* reexport module object */ _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_13__),
/* harmony export */   getStudiesForPatientByMRN: () => (/* reexport safe */ _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   promptLabelAnnotation: () => (/* reexport safe */ _utils_promptLabelAnnotation__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   promptSaveReport: () => (/* reexport safe */ _utils_promptSaveReport__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   showLabelAnnotationPopup: () => (/* reexport safe */ _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_24__.showLabelAnnotationPopup),
/* harmony export */   useDisplaySetSelectorStore: () => (/* reexport safe */ _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_20__.useDisplaySetSelectorStore),
/* harmony export */   useHangingProtocolStageIndexStore: () => (/* reexport safe */ _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_21__.useHangingProtocolStageIndexStore),
/* harmony export */   usePatientInfo: () => (/* reexport safe */ _hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   useToggleHangingProtocolStore: () => (/* reexport safe */ _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_22__.useToggleHangingProtocolStore),
/* harmony export */   useToggleOneUpViewportGridStore: () => (/* reexport safe */ _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_23__.useToggleOneUpViewportGridStore),
/* harmony export */   useUIStateStore: () => (/* reexport safe */ _stores_useUIStateStore__WEBPACK_IMPORTED_MODULE_19__.useUIStateStore),
/* harmony export */   useViewportGridStore: () => (/* reexport safe */ _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_18__.useViewportGridStore),
/* harmony export */   useViewportsByPositionStore: () => (/* reexport safe */ _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_17__.useViewportsByPositionStore),
/* harmony export */   utils: () => (/* reexport module object */ _utils__WEBPACK_IMPORTED_MODULE_30__)
/* harmony export */ });
/* harmony import */ var _getDataSourcesModule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDataSourcesModule.js */ "../../../extensions/default/src/getDataSourcesModule.js");
/* harmony import */ var _getLayoutTemplateModule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getLayoutTemplateModule.js */ "../../../extensions/default/src/getLayoutTemplateModule.js");
/* harmony import */ var _getPanelModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPanelModule */ "../../../extensions/default/src/getPanelModule.tsx");
/* harmony import */ var _getSopClassHandlerModule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getSopClassHandlerModule.js */ "../../../extensions/default/src/getSopClassHandlerModule.js");
/* harmony import */ var _getToolbarModule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getToolbarModule */ "../../../extensions/default/src/getToolbarModule.tsx");
/* harmony import */ var _commandsModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./commandsModule */ "../../../extensions/default/src/commandsModule.ts");
/* harmony import */ var _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getHangingProtocolModule */ "../../../extensions/default/src/getHangingProtocolModule.js");
/* harmony import */ var _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Panels/getStudiesForPatientByMRN */ "../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js");
/* harmony import */ var _getCustomizationModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getCustomizationModule */ "../../../extensions/default/src/getCustomizationModule.tsx");
/* harmony import */ var _getViewportModule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getViewportModule */ "../../../extensions/default/src/getViewportModule.tsx");
/* harmony import */ var _id_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./id.js */ "../../../extensions/default/src/id.js");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./init */ "../../../extensions/default/src/init.ts");
/* harmony import */ var _CustomizableContextMenu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CustomizableContextMenu */ "../../../extensions/default/src/CustomizableContextMenu/index.ts");
/* harmony import */ var _DicomWebDataSource_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./DicomWebDataSource/utils */ "../../../extensions/default/src/DicomWebDataSource/utils/index.ts");
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Panels */ "../../../extensions/default/src/Panels/index.js");
/* harmony import */ var _Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Actions/createReportAsync */ "../../../extensions/default/src/Actions/createReportAsync.tsx");
/* harmony import */ var _DicomWebDataSource_utils_StaticWadoClient__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./DicomWebDataSource/utils/StaticWadoClient */ "../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts");
/* harmony import */ var _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./stores/useViewportsByPositionStore */ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts");
/* harmony import */ var _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./stores/useViewportGridStore */ "../../../extensions/default/src/stores/useViewportGridStore.ts");
/* harmony import */ var _stores_useUIStateStore__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./stores/useUIStateStore */ "../../../extensions/default/src/stores/useUIStateStore.ts");
/* harmony import */ var _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./stores/useDisplaySetSelectorStore */ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts");
/* harmony import */ var _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./stores/useHangingProtocolStageIndexStore */ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts");
/* harmony import */ var _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./stores/useToggleHangingProtocolStore */ "../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts");
/* harmony import */ var _stores_useToggleOneUpViewportGridStore__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./stores/useToggleOneUpViewportGridStore */ "../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts");
/* harmony import */ var _utils_callInputDialog__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./utils/callInputDialog */ "../../../extensions/default/src/utils/callInputDialog.tsx");
/* harmony import */ var _utils_colorPickerDialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./utils/colorPickerDialog */ "../../../extensions/default/src/utils/colorPickerDialog.tsx");
/* harmony import */ var _utils_promptSaveReport__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./utils/promptSaveReport */ "../../../extensions/default/src/utils/promptSaveReport.js");
/* harmony import */ var _utils_promptLabelAnnotation__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./utils/promptLabelAnnotation */ "../../../extensions/default/src/utils/promptLabelAnnotation.js");
/* harmony import */ var _hooks_usePatientInfo__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./hooks/usePatientInfo */ "../../../extensions/default/src/hooks/usePatientInfo.tsx");
/* harmony import */ var _Panels_StudyBrowser_PanelStudyBrowserHeader__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Panels/StudyBrowser/PanelStudyBrowserHeader */ "../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./utils */ "../../../extensions/default/src/utils/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

































const defaultExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: _id_js__WEBPACK_IMPORTED_MODULE_10__.id,
  preRegistration: _init__WEBPACK_IMPORTED_MODULE_11__["default"],
  onModeExit() {
    _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_18__.useViewportGridStore.getState().clearViewportGridState();
    _stores_useUIStateStore__WEBPACK_IMPORTED_MODULE_19__.useUIStateStore.getState().clearUIState();
    _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_20__.useDisplaySetSelectorStore.getState().clearDisplaySetSelectorMap();
    _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_21__.useHangingProtocolStageIndexStore.getState().clearHangingProtocolStageIndexMap();
    _stores_useToggleHangingProtocolStore__WEBPACK_IMPORTED_MODULE_22__.useToggleHangingProtocolStore.getState().clearToggleHangingProtocol();
    _stores_useViewportsByPositionStore__WEBPACK_IMPORTED_MODULE_17__.useViewportsByPositionStore.getState().clearViewportsByPosition();
  },
  getDataSourcesModule: _getDataSourcesModule_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  getViewportModule: _getViewportModule__WEBPACK_IMPORTED_MODULE_9__["default"],
  getLayoutTemplateModule: _getLayoutTemplateModule_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  getPanelModule: _getPanelModule__WEBPACK_IMPORTED_MODULE_2__["default"],
  getHangingProtocolModule: _getHangingProtocolModule__WEBPACK_IMPORTED_MODULE_6__["default"],
  getSopClassHandlerModule: _getSopClassHandlerModule_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  getToolbarModule: _getToolbarModule__WEBPACK_IMPORTED_MODULE_4__["default"],
  getCommandsModule: _commandsModule__WEBPACK_IMPORTED_MODULE_5__["default"],
  getUtilityModule({
    servicesManager
  }) {
    return [{
      name: 'common',
      exports: {
        getStudiesForPatientByMRN: _Panels_getStudiesForPatientByMRN__WEBPACK_IMPORTED_MODULE_7__["default"]
      }
    }];
  },
  getCustomizationModule: _getCustomizationModule__WEBPACK_IMPORTED_MODULE_8__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultExtension);


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

/***/ "../../../extensions/default/src/init.ts":
/*!***********************************************!*\
  !*** ../../../extensions/default/src/init.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _cornerstonejs_calculate_suv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cornerstonejs/calculate-suv */ "../../../node_modules/@cornerstonejs/calculate-suv/dist/calculate-suv.esm.js");
/* harmony import */ var _getPTImageIdInstanceMetadata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getPTImageIdInstanceMetadata */ "../../../extensions/default/src/getPTImageIdInstanceMetadata.ts");
/* harmony import */ var _hangingprotocols__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hangingprotocols */ "../../../extensions/default/src/hangingprotocols/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





const metadataProvider = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.classes.MetadataProvider;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 */
function init({
  servicesManager,
  configuration = {},
  commandsManager
}) {
  const {
    toolbarService,
    cineService,
    viewportGridService
  } = servicesManager.services;
  toolbarService.registerEventForToolbarUpdate(cineService, [cineService.EVENTS.CINE_STATE_CHANGED]);
  // Add
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.EVENTS.INSTANCES_ADDED, handlePETImageMetadata);

  // If the metadata for PET has changed by the user (e.g. manually changing the PatientWeight)
  // we need to recalculate the SUV Scaling Factors
  _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.EVENTS.SERIES_UPDATED, handlePETImageMetadata);

  // Adds extra custom attributes for use by hanging protocols
  (0,_hangingprotocols__WEBPACK_IMPORTED_MODULE_3__.registerHangingProtocolAttributes)({
    servicesManager
  });

  // Function to process and subscribe to events for a given set of commands and listeners
  const subscribeToEvents = listeners => {
    Object.entries(listeners).forEach(([event, commands]) => {
      const supportedEvents = [viewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED, viewportGridService.EVENTS.VIEWPORTS_READY];
      if (supportedEvents.includes(event)) {
        viewportGridService.subscribe(event, eventData => {
          const viewportId = eventData?.viewportId ?? viewportGridService.getActiveViewportId();
          commandsManager.run(commands, {
            viewportId
          });
        });
      }
    });
  };
  toolbarService.subscribe(toolbarService.EVENTS.TOOL_BAR_MODIFIED, state => {
    const {
      buttons
    } = state;
    for (const [id, button] of Object.entries(buttons)) {
      const {
        groupId,
        items,
        listeners
      } = button.props || {};

      // Handle group items' listeners
      if (groupId && items) {
        items.forEach(item => {
          if (item.listeners) {
            subscribeToEvents(item.listeners);
          }
        });
      }

      // Handle button listeners
      if (listeners) {
        subscribeToEvents(listeners);
      }
    }
  });
}
const handlePETImageMetadata = ({
  SeriesInstanceUID,
  StudyInstanceUID
}) => {
  const {
    instances
  } = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.DicomMetadataStore.getSeries(StudyInstanceUID, SeriesInstanceUID);
  if (!instances?.length) {
    return;
  }
  const modality = instances[0].Modality;
  if (!modality || modality !== 'PT') {
    return;
  }
  const imageIds = instances.map(instance => instance.imageId);
  const instanceMetadataArray = [];
  // try except block to prevent errors when the metadata is not correct
  try {
    imageIds.forEach(imageId => {
      const instanceMetadata = (0,_getPTImageIdInstanceMetadata__WEBPACK_IMPORTED_MODULE_2__["default"])(imageId);
      if (instanceMetadata) {
        instanceMetadataArray.push(instanceMetadata);
      }
    });
    if (!instanceMetadataArray.length) {
      return;
    }
    const suvScalingFactors = (0,_cornerstonejs_calculate_suv__WEBPACK_IMPORTED_MODULE_1__.calculateSUVScalingFactors)(instanceMetadataArray);
    instanceMetadataArray.forEach((instanceMetadata, index) => {
      metadataProvider.addCustomMetadata(imageIds[index], 'scalingModule', suvScalingFactors[index]);
    });
  } catch (error) {
    console.log(error);
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

/***/ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useDisplaySetSelectorStore: () => (/* binding */ useDisplaySetSelectorStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Identifier for the display set selector store type.
 */
const PRESENTATION_TYPE_ID = 'displaySetSelectorId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * State shape for the Display Set Selector store.
 */

/**
 * Creates the Display Set Selector store.
 *
 * @param set - The zustand set function.
 * @returns The display set selector store state and actions.
 */
const createDisplaySetSelectorStore = set => ({
  type: PRESENTATION_TYPE_ID,
  displaySetSelectorMap: {},
  /**
   * Sets the display set selector for a given key.
   */
  setDisplaySetSelector: (key, value) => set(state => ({
    displaySetSelectorMap: {
      ...state.displaySetSelectorMap,
      [key]: value
    }
  }), false, 'setDisplaySetSelector'),
  /**
   * Clears the entire display set selector map.
   */
  clearDisplaySetSelectorMap: () => set({
    displaySetSelectorMap: {}
  }, false, 'clearDisplaySetSelectorMap')
});

/**
 * Zustand store for managing display set selectors.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useDisplaySetSelectorStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createDisplaySetSelectorStore, {
  name: 'DisplaySetSelectorStore'
}) : createDisplaySetSelectorStore);

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

/***/ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts":
/*!***********************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useHangingProtocolStageIndexStore: () => (/* binding */ useHangingProtocolStageIndexStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const PRESENTATION_TYPE_ID = 'hangingProtocolStageIndexId';
const DEBUG_STORE = false;

/**
 * Represents the state and actions for managing hanging protocol stage indexes.
 */

/**
 * Creates the Hanging Protocol Stage Index store.
 *
 * @param set - The zustand set function.
 * @returns The hanging protocol stage index store state and actions.
 */
const createHangingProtocolStageIndexStore = set => ({
  hangingProtocolStageIndexMap: {},
  type: PRESENTATION_TYPE_ID,
  /**
   * Sets the hanging protocol stage index for a given key.
   */
  setHangingProtocolStageIndex: (key, value) => set(state => ({
    hangingProtocolStageIndexMap: {
      ...state.hangingProtocolStageIndexMap,
      [key]: value
    }
  }), false, 'setHangingProtocolStageIndex'),
  /**
   * Clears all hanging protocol stage indexes.
   */
  clearHangingProtocolStageIndexMap: () => set({
    hangingProtocolStageIndexMap: {}
  }, false, 'clearHangingProtocolStageIndexMap')
});

/**
 * Zustand store for managing hanging protocol stage indexes.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useHangingProtocolStageIndexStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createHangingProtocolStageIndexStore, {
  name: 'HangingProtocolStageIndexStore'
}) : createHangingProtocolStageIndexStore);

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

/***/ "../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts":
/*!*******************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useToggleHangingProtocolStore: () => (/* binding */ useToggleHangingProtocolStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const PRESENTATION_TYPE_ID = 'toggleHangingProtocolId';
const DEBUG_STORE = false;

/**
 * Represents the state and actions for managing toggle hanging protocols.
 */

/**
 * Creates the Toggle Hanging Protocol store.
 *
 * @param set - The zustand set function.
 * @returns The toggle hanging protocol store state and actions.
 */
const createToggleHangingProtocolStore = set => ({
  toggleHangingProtocol: {},
  type: PRESENTATION_TYPE_ID,
  /**
   * Sets the toggle hanging protocol for a given key.
   */
  setToggleHangingProtocol: (key, value) => set(state => ({
    toggleHangingProtocol: {
      ...state.toggleHangingProtocol,
      [key]: value
    }
  }), false, 'setToggleHangingProtocol'),
  /**
   * Clears all toggle hanging protocols.
   */
  clearToggleHangingProtocol: () => set({
    toggleHangingProtocol: {}
  }, false, 'clearToggleHangingProtocol')
});

/**
 * Zustand store for managing toggle hanging protocols.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useToggleHangingProtocolStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createToggleHangingProtocolStore, {
  name: 'ToggleHangingProtocolStore'
}) : createToggleHangingProtocolStore);

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

/***/ "../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts":
/*!*********************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useToggleOneUpViewportGridStore: () => (/* binding */ useToggleOneUpViewportGridStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/esm/index.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


const PRESENTATION_TYPE_ID = 'toggleOneUpViewportGridId';
// Stores the entire ViewportGridService getState when toggling to one up
// (e.g. via a double click) so that it can be restored when toggling back.
const useToggleOneUpViewportGridStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)(set => ({
  toggleOneUpViewportGridStore: null,
  type: PRESENTATION_TYPE_ID,
  setToggleOneUpViewportGridStore: state => set({
    toggleOneUpViewportGridStore: state
  }),
  clearToggleOneUpViewportGridStore: () => set({
    toggleOneUpViewportGridStore: null
  })
}));

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

/***/ "../../../extensions/default/src/stores/useUIStateStore.ts":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/stores/useUIStateStore.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useUIStateStore: () => (/* binding */ useUIStateStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Identifier for the UI State store type.
 */
const PRESENTATION_TYPE_ID = 'uiStateId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * Represents the UI state.
 */

/**
 * State shape for the UI State store.
 */

/**
 * Creates the UI State store.
 *
 * @param set - The zustand set function.
 * @returns The UI State store state and actions.
 */
const createUIStateStore = set => ({
  type: PRESENTATION_TYPE_ID,
  uiState: {},
  /**
   * Sets the UI state for a given key.
   */
  setUIState: (key, value) => set(state => ({
    uiState: {
      ...state.uiState,
      [key]: value
    }
  }), false, 'setUIState'),
  /**
   * Clears all UI state.
   */
  clearUIState: () => set({
    uiState: {}
  }, false, 'clearUIState')
});

/**
 * Zustand store for managing UI state.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useUIStateStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createUIStateStore, {
  name: 'UIStateStore'
}) : createUIStateStore);

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

/***/ "../../../extensions/default/src/stores/useViewportGridStore.ts":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/stores/useViewportGridStore.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useViewportGridStore: () => (/* binding */ useViewportGridStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Identifier for the viewport grid store type.
 */
const PRESENTATION_TYPE_ID = 'viewportGridId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * Represents the state of the viewport grid.
 */

/**
 * State shape for the Viewport Grid store.
 */

/**
 * Creates the Viewport Grid store.
 *
 * @param set - The zustand set function.
 * @returns The Viewport Grid store state and actions.
 */
const createViewportGridStore = set => ({
  type: PRESENTATION_TYPE_ID,
  viewportGridState: {},
  /**
   * Sets the viewport grid state for a given key.
   */
  setViewportGridState: (key, value) => set(state => ({
    viewportGridState: {
      ...state.viewportGridState,
      [key]: value
    }
  }), false, 'setViewportGridState'),
  /**
   * Clears the entire viewport grid state.
   */
  clearViewportGridState: () => set({
    viewportGridState: {}
  }, false, 'clearViewportGridState')
});

/**
 * Zustand store for managing viewport grid state.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useViewportGridStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createViewportGridStore, {
  name: 'ViewportGridStore'
}) : createViewportGridStore);

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

/***/ "../../../extensions/default/src/stores/useViewportsByPositionStore.ts":
/*!*****************************************************************************!*\
  !*** ../../../extensions/default/src/stores/useViewportsByPositionStore.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useViewportsByPositionStore: () => (/* binding */ useViewportsByPositionStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zustand */ "../node_modules/zustand/esm/index.mjs");
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zustand/middleware */ "../node_modules/zustand/esm/middleware.mjs");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



const PRESENTATION_TYPE_ID = 'viewportsByPositionId';
const DEBUG_STORE = true;

/**
 * Represents the state and actions for managing viewports by position.
 */

/**
 * Creates the Viewports By Position store.
 *
 * @param set - The zustand set function.
 * @returns The Viewports By Position store state and actions.
 */
const createViewportsByPositionStore = set => ({
  type: PRESENTATION_TYPE_ID,
  viewportsByPosition: {},
  initialInDisplay: [],
  /**
   * Sets the viewport for a given key.
   */
  setViewportsByPosition: (key, value) => set(state => ({
    viewportsByPosition: {
      ...state.viewportsByPosition,
      [key]: value
    }
  }), false, 'setViewportsByPosition'),
  /**
   * Clears all viewports by position.
   */
  clearViewportsByPosition: () => set({
    viewportsByPosition: {}
  }, false, 'clearViewportsByPosition'),
  /**
   * Adds an initial display viewport.
   */
  addInitialInDisplay: value => set(state => ({
    initialInDisplay: [...state.initialInDisplay, value]
  }), false, 'addInitialInDisplay')
});

/**
 * Zustand store for managing viewports by position.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useViewportsByPositionStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__.create)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__.devtools)(createViewportsByPositionStore, {
  name: 'ViewportsByPositionStore'
}) : createViewportsByPositionStore);

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

/***/ "../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts":
/*!*************************************************************************!*\
  !*** ../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RESPONSE);

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

/***/ "../../../extensions/default/src/utils/addIcon.ts":
/*!********************************************************!*\
  !*** ../../../extensions/default/src/utils/addIcon.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addIcon: () => (/* binding */ addIcon)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/** Adds the icon to both ui and ui-next */
function addIcon(name, icon) {
  (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.addIcon)(name, icon);
  _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.addIcon(name, icon);
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

/***/ "../../../extensions/default/src/utils/calculateScanAxisNormal.ts":
/*!************************************************************************!*\
  !*** ../../../extensions/default/src/utils/calculateScanAxisNormal.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calculateScanAxisNormal)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Calculates the scanAxisNormal based on a image orientation vector extract from a frame
 * @param {*} imageOrientation
 * @returns
 */
function calculateScanAxisNormal(imageOrientation) {
  const rowCosineVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(imageOrientation[0], imageOrientation[1], imageOrientation[2]);
  const colCosineVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.fromValues(imageOrientation[3], imageOrientation[4], imageOrientation[5]);
  return gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.cross(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(), rowCosineVec, colCosineVec);
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

/***/ "../../../extensions/default/src/utils/callInputDialog.tsx":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/utils/callInputDialog.tsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callInputDialog: () => (/* binding */ callInputDialog),
/* harmony export */   callLabelAutocompleteDialog: () => (/* binding */ callLabelAutocompleteDialog),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   showLabelAnnotationPopup: () => (/* binding */ showLabelAnnotationPopup)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 *
 * @param {*} data
 * @param {*} data.text
 * @param {*} data.label
 * @param {*} event
 * @param {*} callback
 * @param {*} isArrowAnnotateInputDialog
 * @param {*} dialogConfig
 * @param {string?} dialogConfig.dialogTitle - title of the input dialog
 * @param {string?} dialogConfig.inputLabel - show label above the input
 */

function callInputDialog(uiDialogService, data, callback, isArrowAnnotateInputDialog = true, dialogConfig = {}) {
  const dialogId = 'dialog-enter-annotation';
  const label = data ? isArrowAnnotateInputDialog ? data.text : data.label : '';
  const {
    dialogTitle = 'Annotation',
    inputLabel = 'Enter your annotation',
    validateFunc = value => true
  } = dialogConfig;
  const onSubmitHandler = ({
    action,
    value
  }) => {
    switch (action.id) {
      case 'save':
        if (typeof validateFunc === 'function' && !validateFunc(value.label)) {
          return;
        }
        callback(value.label, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({
      id: dialogId
    });
  };
  if (uiDialogService) {
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Dialog,
      contentProps: {
        title: dialogTitle,
        value: {
          label
        },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({
          id: dialogId
        }),
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonEnums.type.secondary
        }, {
          id: 'save',
          text: 'Save',
          type: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonEnums.type.primary
        }],
        onSubmit: onSubmitHandler,
        body: ({
          value,
          setValue
        }) => {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Input, {
            autoFocus: true,
            className: "border-primary-main bg-black",
            type: "text",
            id: "annotation",
            label: inputLabel,
            labelClassName: "text-white text-[14px] leading-[1.2]",
            value: value.label,
            onChange: event => {
              event.persist();
              setValue(value => ({
                ...value,
                label: event.target.value
              }));
            },
            onKeyPress: event => {
              if (event.key === 'Enter') {
                onSubmitHandler({
                  value,
                  action: {
                    id: 'save'
                  }
                });
              }
            }
          });
        }
      }
    });
  }
}
function callLabelAutocompleteDialog(uiDialogService, callback, dialogConfig, labelConfig) {
  const exclusive = labelConfig ? labelConfig.exclusive : false;
  const dropDownItems = labelConfig ? labelConfig.items : [];
  const {
    validateFunc = value => true
  } = dialogConfig;
  const labellingDoneCallback = value => {
    if (typeof value === 'string') {
      if (typeof validateFunc === 'function' && !validateFunc(value)) {
        return;
      }
      callback(value, 'save');
    } else {
      callback('', 'cancel');
    }
    uiDialogService.dismiss({
      id: 'select-annotation'
    });
  };
  uiDialogService.create({
    id: 'select-annotation',
    centralize: true,
    isDraggable: false,
    showOverlay: true,
    content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.LabellingFlow,
    contentProps: {
      labellingDoneCallback: labellingDoneCallback,
      measurementData: {
        label: ''
      },
      componentClassName: {},
      labelData: dropDownItems,
      exclusive: exclusive
    }
  });
}
function showLabelAnnotationPopup(measurement, uiDialogService, labelConfig) {
  const exclusive = labelConfig ? labelConfig.exclusive : false;
  const dropDownItems = labelConfig ? labelConfig.items : [];
  return new Promise((resolve, reject) => {
    const labellingDoneCallback = value => {
      uiDialogService.dismiss({
        id: 'select-annotation'
      });
      if (typeof value === 'string') {
        measurement.label = value;
      }
      resolve(measurement);
    };
    uiDialogService.create({
      id: 'select-annotation',
      isDraggable: false,
      showOverlay: true,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.LabellingFlow,
      defaultPosition: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      contentProps: {
        labellingDoneCallback: labellingDoneCallback,
        measurementData: measurement,
        componentClassName: {},
        labelData: dropDownItems,
        exclusive: exclusive
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (callInputDialog);

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

/***/ "../../../extensions/default/src/utils/colorPickerDialog.tsx":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/utils/colorPickerDialog.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var react_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-color */ "../../../node_modules/react-color/es/index.js");
/* harmony import */ var _colorPickerDialog_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./colorPickerDialog.css */ "../../../extensions/default/src/utils/colorPickerDialog.css");
/* harmony import */ var _colorPickerDialog_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_colorPickerDialog_css__WEBPACK_IMPORTED_MODULE_3__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





function colorPickerDialog(uiDialogService, rgbaColor, callback) {
  const dialogId = 'pick-color';
  const onSubmitHandler = ({
    action,
    value
  }) => {
    switch (action.id) {
      case 'save':
        callback(value.rgbaColor, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({
      id: dialogId
    });
  };
  if (uiDialogService) {
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.Dialog,
      contentProps: {
        title: 'Segment Color',
        value: {
          rgbaColor
        },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({
          id: dialogId
        }),
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: 'primary'
        }, {
          id: 'save',
          text: 'Save',
          type: 'secondary'
        }],
        onSubmit: onSubmitHandler,
        body: ({
          value,
          setValue
        }) => {
          const handleChange = color => {
            setValue({
              rgbaColor: color.rgb
            });
          };
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_color__WEBPACK_IMPORTED_MODULE_2__.ChromePicker, {
            color: value.rgbaColor,
            onChange: handleChange,
            presetColors: [],
            width: 300
          });
        }
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (colorPickerDialog);

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

/***/ "../../../extensions/default/src/utils/createRenderedRetrieve.js":
/*!***********************************************************************!*\
  !*** ../../../extensions/default/src/utils/createRenderedRetrieve.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Generates the rendered URL that can be used for direct retrieve of the pixel data binary stream.
 *
 * @param {object} config - The configuration object.
 * @param {string} config.wadoRoot - The root URL for the WADO service.
 * @param {object} params - The parameters object.
 * @param {string} params.tag - The tag name of the URL to retrieve.
 * @param {string} params.defaultPath - The path for the pixel data URL.
 * @param {object} params.instance - The instance object that the tag is in.
 * @param {string} params.defaultType - The mime type of the response.
 * @param {string} params.singlepart - The type of the part to retrieve.
 * @param {string} params.fetchPart - Unknown parameter.
 * @param {string} params.url - Unknown parameter.
 * @returns {string|Promise<string>} - An absolute URL to the binary stream.
 */
const createRenderedRetrieve = (config, params) => {
  const {
    wadoRoot
  } = config;
  const {
    instance,
    tag = 'PixelData'
  } = params;
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const bulkDataURI = instance[tag]?.BulkDataURI ?? '';
  if (bulkDataURI?.indexOf('?') !== -1) {
    // The value instance has parameters, so it should not revert to the rendered
    return;
  }
  if (tag === 'PixelData' || tag === 'EncapsulatedDocument') {
    return `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}/rendered`;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRenderedRetrieve);

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

/***/ "../../../extensions/default/src/utils/getBulkdataValue.js":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/utils/getBulkdataValue.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

/**
 * Generates a URL that can be used for direct retrieve of the bulkdata.
 *
 * @param {object} config - The configuration object.
 * @param {object} params - The parameters object.
 * @param {string} params.tag - The tag name of the URL to retrieve.
 * @param {string} params.defaultPath - The path for the pixel data URL.
 * @param {object} params.instance - The instance object that the tag is in.
 * @param {string} params.defaultType - The mime type of the response.
 * @param {string} params.singlepart - The type of the part to retrieve.
 * @param {string} params.fetchPart - Unknown.
 * @returns {string|Promise<string>} - An absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
 *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI.
 */
const getBulkdataValue = (config, params) => {
  const {
    instance,
    tag = 'PixelData',
    defaultPath = '/pixeldata',
    defaultType = 'video/mp4'
  } = params;
  const value = instance[tag];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const BulkDataURI = value && value.BulkDataURI || `series/${SeriesInstanceUID}/instances/${SOPInstanceUID}${defaultPath}`;
  const hasQuery = BulkDataURI.indexOf('?') !== -1;
  const hasAccept = BulkDataURI.indexOf('accept=') !== -1;
  const acceptUri = BulkDataURI + (hasAccept ? '' : (hasQuery ? '&' : '?') + `accept=${defaultType}`);
  if (acceptUri.startsWith('series/')) {
    const {
      wadoRoot
    } = config;
    return `${wadoRoot}/studies/${StudyInstanceUID}/${acceptUri}`;
  }

  // The DICOMweb standard states that the default is multipart related, and then
  // separately states that the accept parameter is the URL parameter equivalent of the accept header.
  return acceptUri;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getBulkdataValue);

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

/***/ "../../../extensions/default/src/utils/getDirectURL.ts":
/*!*************************************************************!*\
  !*** ../../../extensions/default/src/utils/getDirectURL.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _getBulkdataValue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getBulkdataValue */ "../../../extensions/default/src/utils/getBulkdataValue.js");
/* harmony import */ var _createRenderedRetrieve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createRenderedRetrieve */ "../../../extensions/default/src/utils/createRenderedRetrieve.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





/**
 * Generates a URL that can be used for direct retrieve of the bulkdata
 *
 * @param {object} params
 * @param {string} params.tag is the tag name of the URL to retrieve
 * @param {string} params.defaultPath path for the pixel data url
 * @param {object} params.instance is the instance object that the tag is in
 * @param {string} params.defaultType is the mime type of the response
 * @param {string} params.singlepart is the type of the part to retrieve
 * @param {string} params.fetchPart unknown?
 * @param {string} params.url unknown?
 * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
 *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
 */
const getDirectURL = (config, params) => {
  const {
    singlepart
  } = config;
  const {
    instance,
    tag = 'PixelData',
    defaultType = 'video/mp4',
    singlepart: fetchPart = 'video',
    url = null
  } = params;
  if (url) {
    return url;
  }
  const value = instance[tag];
  if (value) {
    if (value.DirectRetrieveURL) {
      return value.DirectRetrieveURL;
    }
    if (value.InlineBinary) {
      const blob = _ohif_core__WEBPACK_IMPORTED_MODULE_0__.utils.b64toBlob(value.InlineBinary, defaultType);
      value.DirectRetrieveURL = URL.createObjectURL(blob);
      return value.DirectRetrieveURL;
    }
    if (!singlepart || singlepart !== true && singlepart.indexOf(fetchPart) === -1) {
      if (value.retrieveBulkData) {
        // Try the specified retrieve type.
        const options = {
          mediaType: defaultType
        };
        return value.retrieveBulkData(options).then(arr => {
          value.DirectRetrieveURL = URL.createObjectURL(new Blob([arr], {
            type: defaultType
          }));
          return value.DirectRetrieveURL;
        });
      }
      console.warn('Unable to retrieve', tag, 'from', instance);
      return undefined;
    }
  }
  return (0,_createRenderedRetrieve__WEBPACK_IMPORTED_MODULE_2__["default"])(config, params) || (0,_getBulkdataValue__WEBPACK_IMPORTED_MODULE_1__["default"])(config, params);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getDirectURL);

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

/***/ "../../../extensions/default/src/utils/getNextSRSeriesNumber.js":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/utils/getNextSRSeriesNumber.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNextSRSeriesNumber)
/* harmony export */ });
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

const MIN_SR_SERIES_NUMBER = 4700;
function getNextSRSeriesNumber(displaySetService) {
  const activeDisplaySets = displaySetService.getActiveDisplaySets();
  const srDisplaySets = activeDisplaySets.filter(ds => ds.Modality === 'SR');
  const srSeriesNumbers = srDisplaySets.map(ds => ds.SeriesNumber);
  const maxSeriesNumber = Math.max(...srSeriesNumbers, MIN_SR_SERIES_NUMBER);
  return maxSeriesNumber + 1;
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

/***/ "../../../extensions/default/src/utils/index.ts":
/*!******************************************************!*\
  !*** ../../../extensions/default/src/utils/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addIcon: () => (/* reexport safe */ _addIcon__WEBPACK_IMPORTED_MODULE_0__.addIcon)
/* harmony export */ });
/* harmony import */ var _addIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addIcon */ "../../../extensions/default/src/utils/addIcon.ts");
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

/***/ "../../../extensions/default/src/utils/promptLabelAnnotation.js":
/*!**********************************************************************!*\
  !*** ../../../extensions/default/src/utils/promptLabelAnnotation.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _callInputDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./callInputDialog */ "../../../extensions/default/src/utils/callInputDialog.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


function promptLabelAnnotation({
  servicesManager
}, ctx, evt) {
  const {
    measurementService,
    customizationService
  } = servicesManager.services;
  const {
    viewportId,
    StudyInstanceUID,
    SeriesInstanceUID,
    measurementId
  } = evt;
  return new Promise(async function (resolve) {
    const labelConfig = customizationService.get('measurementLabels');
    const measurement = measurementService.getMeasurement(measurementId);
    const value = await (0,_callInputDialog__WEBPACK_IMPORTED_MODULE_0__.showLabelAnnotationPopup)(measurement, servicesManager.services.uiDialogService, labelConfig);
    measurementService.update(measurementId, {
      ...value
    }, true);
    resolve({
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptLabelAnnotation);

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

/***/ "../../../extensions/default/src/utils/promptSaveReport.js":
/*!*****************************************************************!*\
  !*** ../../../extensions/default/src/utils/promptSaveReport.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Actions/createReportAsync */ "../../../extensions/default/src/Actions/createReportAsync.tsx");
/* harmony import */ var _Panels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Panels */ "../../../extensions/default/src/Panels/index.js");
/* harmony import */ var _getNextSRSeriesNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getNextSRSeriesNumber */ "../../../extensions/default/src/utils/getNextSRSeriesNumber.js");
/* harmony import */ var _shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_shared/PROMPT_RESPONSES */ "../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");





async function promptSaveReport({
  servicesManager,
  commandsManager,
  extensionManager
}, ctx, evt) {
  const {
    uiDialogService,
    measurementService,
    displaySetService
  } = servicesManager.services;
  const viewportId = evt.viewportId === undefined ? evt.data.viewportId : evt.viewportId;
  const isBackupSave = evt.isBackupSave === undefined ? evt.data.isBackupSave : evt.isBackupSave;
  const StudyInstanceUID = evt?.data?.StudyInstanceUID;
  const SeriesInstanceUID = evt?.data?.SeriesInstanceUID;
  const {
    trackedStudy,
    trackedSeries
  } = ctx;
  let displaySetInstanceUIDs;
  try {
    const promptResult = await (0,_Panels__WEBPACK_IMPORTED_MODULE_1__.createReportDialogPrompt)(uiDialogService, {
      extensionManager
    });
    if (promptResult.action === _shared_PROMPT_RESPONSES__WEBPACK_IMPORTED_MODULE_3__["default"].CREATE_REPORT) {
      const dataSources = extensionManager.getDataSources();
      const dataSource = dataSources[0];
      const measurements = measurementService.getMeasurements();
      const trackedMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID)).filter(m => m.referencedImageId != null);
      const SeriesDescription =
      // isUndefinedOrEmpty
      promptResult.value === undefined || promptResult.value === '' ? 'Research Derived Series' // default
      : promptResult.value; // provided value

      const SeriesNumber = (0,_getNextSRSeriesNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(displaySetService);
      const getReport = async () => {
        return commandsManager.runCommand('storeMeasurements', {
          measurementData: trackedMeasurements,
          dataSource,
          additionalFindingTypes: ['ArrowAnnotate'],
          options: {
            SeriesDescription,
            SeriesNumber
          }
        }, 'CORNERSTONE_STRUCTURED_REPORT');
      };
      displaySetInstanceUIDs = await (0,_Actions_createReportAsync__WEBPACK_IMPORTED_MODULE_0__["default"])({
        servicesManager,
        getReport
      });
    } else if (promptResult.action === RESPONSE.CANCEL) {
      // Do nothing
    }
    return {
      userResponse: promptResult.action,
      createdDisplaySetInstanceUIDs: displaySetInstanceUIDs,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId,
      isBackupSave
    };
  } catch (error) {
    return null;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promptSaveReport);

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

/***/ "../../../extensions/default/src/utils/reuseCachedLayouts.ts":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/utils/reuseCachedLayouts.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stores/useViewportGridStore */ "../../../extensions/default/src/stores/useViewportGridStore.ts");
/* harmony import */ var _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stores/useDisplaySetSelectorStore */ "../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts");
/* harmony import */ var _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stores/useHangingProtocolStageIndexStore */ "../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Calculates a set of state information for hanging protocols and viewport grid
 * which defines the currently applied hanging protocol state.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const reuseCachedLayout = (state, hangingProtocolService) => {
  const {
    activeViewportId
  } = state;
  const {
    protocol
  } = hangingProtocolService.getActiveProtocol();
  if (!protocol) {
    return;
  }
  const hpInfo = hangingProtocolService.getState();
  const {
    protocolId,
    stageIndex,
    activeStudyUID
  } = hpInfo;
  const {
    viewportGridState,
    setViewportGridState
  } = _stores_useViewportGridStore__WEBPACK_IMPORTED_MODULE_0__.useViewportGridStore.getState();
  const {
    displaySetSelectorMap,
    setDisplaySetSelector
  } = _stores_useDisplaySetSelectorStore__WEBPACK_IMPORTED_MODULE_1__.useDisplaySetSelectorStore.getState();
  const {
    hangingProtocolStageIndexMap,
    setHangingProtocolStageIndex
  } = _stores_useHangingProtocolStageIndexStore__WEBPACK_IMPORTED_MODULE_2__.useHangingProtocolStageIndexStore.getState();
  const stage = protocol.stages[stageIndex];
  const storeId = `${activeStudyUID}:${protocolId}:${stageIndex}`;
  const cacheId = `${activeStudyUID}:${protocolId}`;
  const {
    rows,
    columns
  } = stage.viewportStructure.properties;
  const custom = stage.viewports.length !== state.viewports.size || state.layout.numRows !== rows || state.layout.numCols !== columns;
  hangingProtocolStageIndexMap[cacheId] = hpInfo;
  if (storeId && custom) {
    setViewportGridState(storeId, {
      ...state
    });
  }
  state.viewports.forEach((viewport, viewportId) => {
    const {
      displaySetOptions,
      displaySetInstanceUIDs
    } = viewport;
    if (!displaySetOptions) {
      return;
    }
    for (let i = 0; i < displaySetOptions.length; i++) {
      const displaySetUID = displaySetInstanceUIDs[i];
      if (!displaySetUID) {
        continue;
      }
      if (viewportId === activeViewportId && i === 0) {
        setDisplaySetSelector(`${activeStudyUID}:activeDisplaySet:0`, displaySetUID);
      }
      if (displaySetOptions[i]?.id) {
        setDisplaySetSelector(`${activeStudyUID}:${displaySetOptions[i].id}:${displaySetOptions[i].matchedDisplaySetsIndex || 0}`, displaySetUID);
      }
    }
  });
  setHangingProtocolStageIndex(cacheId, hpInfo);
  return {
    hangingProtocolStageIndexMap,
    viewportGridStore: viewportGridState,
    displaySetSelectorMap
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reuseCachedLayout);

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

/***/ "../../../extensions/default/src/utils/validations/areAllImageComponentsEqual.ts":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageComponentsEqual.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageComponentsEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Check if all voxels in series images has same number of components (samplesPerPixel)
 * @param {*} instances
 * @returns
 */
function areAllImageComponentsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageSamplesPerPixel = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.SamplesPerPixel);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const {
      SamplesPerPixel
    } = instance;
    if (SamplesPerPixel !== firstImageSamplesPerPixel) {
      return false;
    }
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImageDimensionsEqual.ts":
/*!***************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageDimensionsEqual.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageDimensionsEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



/**
 * Check if the frames in a series has different dimensions
 * @param {*} instances
 * @returns
 */
function areAllImageDimensionsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageRows = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.Rows);
  const firstImageColumns = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.Columns);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const {
      Rows,
      Columns
    } = instance;
    if (Rows !== firstImageRows || Columns !== firstImageColumns) {
      return false;
    }
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImageOrientationsEqual.ts":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageOrientationsEqual.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageOrientationsEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Check is the series has frames with different orientations
 * @param {*} instances
 * @returns
 */
function areAllImageOrientationsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageOrientationPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(firstImage.ImageOrientationPatient);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imageOrientationPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_0__["default"])(instance.ImageOrientationPatient);
    if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_1__._isSameOrientation)(imageOrientationPatient, firstImageOrientationPatient)) {
      return false;
    }
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImagePositionsEqual.ts":
/*!**************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImagePositionsEqual.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImagePositionsEqual)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _calculateScanAxisNormal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../calculateScanAxisNormal */ "../../../extensions/default/src/utils/calculateScanAxisNormal.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");






/**
 * Checks if there is a position shift between consecutive frames
 * @param {*} previousPosition
 * @param {*} actualPosition
 * @param {*} scanAxisNormal
 * @param {*} averageSpacingBetweenFrames
 * @returns
 */
function _checkSeriesPositionShift(previousPosition, actualPosition, scanAxisNormal, averageSpacingBetweenFrames) {
  // predicted position should be the previous position added by the multiplication
  // of the scanAxisNormal and the average spacing between frames
  const predictedPosition = gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.scaleAndAdd(gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.create(), previousPosition, scanAxisNormal, averageSpacingBetweenFrames);
  return gl_matrix__WEBPACK_IMPORTED_MODULE_0__.vec3.distance(actualPosition, predictedPosition) > averageSpacingBetweenFrames;
}

/**
 * Checks if a series has position shifts between consecutive frames
 * @param {*} instances
 * @returns
 */
function areAllImagePositionsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImageOrientationPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instances[0].ImageOrientationPatient);
  if (!firstImageOrientationPatient) {
    return false;
  }
  const scanAxisNormal = (0,_calculateScanAxisNormal__WEBPACK_IMPORTED_MODULE_3__["default"])(firstImageOrientationPatient);
  const firstImagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instances[0].ImagePositionPatient);
  const lastIpp = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instances[instances.length - 1].ImagePositionPatient);
  const averageSpacingBetweenFrames = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_2__._getPerpendicularDistance)(firstImagePositionPatient, lastIpp) / (instances.length - 1);
  let previousImagePositionPatient = firstImagePositionPatient;
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_1__["default"])(instance.ImagePositionPatient);
    if (_checkSeriesPositionShift(previousImagePositionPatient, imagePositionPatient, scanAxisNormal, averageSpacingBetweenFrames)) {
      return false;
    }
    previousImagePositionPatient = imagePositionPatient;
  }
  return true;
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

/***/ "../../../extensions/default/src/utils/validations/areAllImageSpacingEqual.ts":
/*!************************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/areAllImageSpacingEqual.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ areAllImageSpacingEqual)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/core/src/utils/toNumber */ "../../core/src/utils/toNumber.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Checks if series has spacing issues
 * @param {*} instances
 * @param {*} warnings
 */
function areAllImageSpacingEqual(instances, messages) {
  if (!instances?.length) {
    return;
  }
  const firstImagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(instances[0].ImagePositionPatient);
  if (!firstImagePositionPatient) {
    return;
  }
  const lastIpp = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(instances[instances.length - 1].ImagePositionPatient);
  const averageSpacingBetweenFrames = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__._getPerpendicularDistance)(firstImagePositionPatient, lastIpp) / (instances.length - 1);
  let previousImagePositionPatient = firstImagePositionPatient;
  const issuesFound = [];
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imagePositionPatient = (0,_ohif_core_src_utils_toNumber__WEBPACK_IMPORTED_MODULE_2__["default"])(instance.ImagePositionPatient);
    const spacingBetweenFrames = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__._getPerpendicularDistance)(imagePositionPatient, previousImagePositionPatient);
    const spacingIssue = (0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__._getSpacingIssue)(spacingBetweenFrames, averageSpacingBetweenFrames);
    if (spacingIssue) {
      const issue = spacingIssue.issue;

      // avoid multiple warning of the same thing
      if (!issuesFound.includes(issue)) {
        issuesFound.push(issue);
        if (issue === _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.reconstructionIssues.MISSING_FRAMES) {
          messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MISSING_FRAMES);
        } else if (issue === _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.reconstructionIssues.IRREGULAR_SPACING) {
          messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.IRREGULAR_SPACING);
        }
      }
      // we just want to find issues not how many
      if (issuesFound.length > 1) {
        break;
      }
    }
    previousImagePositionPatient = imagePositionPatient;
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

/***/ "../../../extensions/default/src/utils/validations/checkMultiframe.ts":
/*!****************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/checkMultiframe.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkMultiFrame)
/* harmony export */ });
/* harmony import */ var _ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/core/src/utils/isDisplaySetReconstructable */ "../../core/src/utils/isDisplaySetReconstructable.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




/**
 * Check various multi frame issues. It calls OHIF core functions
 * @param {*} multiFrameInstance
 * @param {*} warnings
 */
function checkMultiFrame(multiFrameInstance, messages) {
  if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.hasPixelMeasurements)(multiFrameInstance)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MULTIFRAME_NO_PIXEL_MEASUREMENTS);
  }
  if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.hasOrientation)(multiFrameInstance)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MULTIFRAME_NO_ORIENTATION);
  }
  if (!(0,_ohif_core_src_utils_isDisplaySetReconstructable__WEBPACK_IMPORTED_MODULE_0__.hasPosition)(multiFrameInstance)) {
    messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_1__.DisplaySetMessage.CODES.MULTIFRAME_NO_POSITION_INFORMATION);
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

/***/ "../../../extensions/default/src/utils/validations/checkSingleFrames.ts":
/*!******************************************************************************!*\
  !*** ../../../extensions/default/src/utils/validations/checkSingleFrames.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkSingleFrames)
/* harmony export */ });
/* harmony import */ var _areAllImageDimensionsEqual__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./areAllImageDimensionsEqual */ "../../../extensions/default/src/utils/validations/areAllImageDimensionsEqual.ts");
/* harmony import */ var _areAllImageComponentsEqual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./areAllImageComponentsEqual */ "../../../extensions/default/src/utils/validations/areAllImageComponentsEqual.ts");
/* harmony import */ var _areAllImageOrientationsEqual__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./areAllImageOrientationsEqual */ "../../../extensions/default/src/utils/validations/areAllImageOrientationsEqual.ts");
/* harmony import */ var _areAllImagePositionsEqual__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./areAllImagePositionsEqual */ "../../../extensions/default/src/utils/validations/areAllImagePositionsEqual.ts");
/* harmony import */ var _areAllImageSpacingEqual__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./areAllImageSpacingEqual */ "../../../extensions/default/src/utils/validations/areAllImageSpacingEqual.ts");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");








/**
 * Runs various checks in a single frame series
 * @param {*} instances
 * @param {*} warnings
 */
function checkSingleFrames(instances, messages) {
  if (instances.length > 2) {
    if (!(0,_areAllImageDimensionsEqual__WEBPACK_IMPORTED_MODULE_0__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_DIMENSIONS);
    }
    if (!(0,_areAllImageComponentsEqual__WEBPACK_IMPORTED_MODULE_1__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_COMPONENTS);
    }
    if (!(0,_areAllImageOrientationsEqual__WEBPACK_IMPORTED_MODULE_2__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_ORIENTATIONS);
    }
    if (!(0,_areAllImagePositionsEqual__WEBPACK_IMPORTED_MODULE_3__["default"])(instances)) {
      messages.addMessage(_ohif_core__WEBPACK_IMPORTED_MODULE_5__.DisplaySetMessage.CODES.INCONSISTENT_POSITION_INFORMATION);
    }
    (0,_areAllImageSpacingEqual__WEBPACK_IMPORTED_MODULE_4__["default"])(instances, messages);
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

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.dicom-tag-browser-table {
  margin-right: auto;
  margin-left: auto;
}

.dicom-tag-browser-table-wrapper {
  /*  height: 500px;*/
  /*overflow-y: scroll;*/
  overflow-x: scroll;
}

.dicom-tag-browser-table tr {
  padding-left: 10px;
  padding-right: 10px;
  color: #ffffff;
  border-top: 1px solid #ddd;
  white-space: nowrap;
}

.stick {
  position: sticky;
  overflow: clip;
}

.dicom-tag-browser-content {
  overflow: hidden;
  width: 100%;
  padding-bottom: 50px;
  /*height: 500px;*/
}

.dicom-tag-browser-instance-range .range {
  height: 20px;
}

.dicom-tag-browser-instance-range {
  padding: 20px 0 20px 0;
}

.dicom-tag-browser-table td.dicom-tag-browser-table-center {
  text-align: center;
}

.dicom-tag-browser-table th {
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
  color: '#20A5D6';
}

.dicom-tag-browser-table th.dicom-tag-browser-table-left {
  text-align: left;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,mBAAmB;EACnB,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,WAAW;EACX,oBAAoB;EACpB,iBAAiB;AACnB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":[".dicom-tag-browser-table {\n  margin-right: auto;\n  margin-left: auto;\n}\n\n.dicom-tag-browser-table-wrapper {\n  /*  height: 500px;*/\n  /*overflow-y: scroll;*/\n  overflow-x: scroll;\n}\n\n.dicom-tag-browser-table tr {\n  padding-left: 10px;\n  padding-right: 10px;\n  color: #ffffff;\n  border-top: 1px solid #ddd;\n  white-space: nowrap;\n}\n\n.stick {\n  position: sticky;\n  overflow: clip;\n}\n\n.dicom-tag-browser-content {\n  overflow: hidden;\n  width: 100%;\n  padding-bottom: 50px;\n  /*height: 500px;*/\n}\n\n.dicom-tag-browser-instance-range .range {\n  height: 20px;\n}\n\n.dicom-tag-browser-instance-range {\n  padding: 20px 0 20px 0;\n}\n\n.dicom-tag-browser-table td.dicom-tag-browser-table-center {\n  text-align: center;\n}\n\n.dicom-tag-browser-table th {\n  padding-left: 10px;\n  padding-right: 10px;\n  text-align: center;\n  color: '#20A5D6';\n}\n\n.dicom-tag-browser-table th.dicom-tag-browser-table-left {\n  text-align: left;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.chrome-picker {
  background: #090c29 !important;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/default/src/utils/colorPickerDialog.css"],"names":[],"mappings":"AAAA;EACE,8BAA8B;AAChC","sourcesContent":[".chrome-picker {\n  background: #090c29 !important;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css":
/*!***************************************************************************!*\
  !*** ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./DicomTagBrowser.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../extensions/default/src/utils/colorPickerDialog.css":
/*!*******************************************************************!*\
  !*** ../../../extensions/default/src/utils/colorPickerDialog.css ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./colorPickerDialog.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/default/src/utils/colorPickerDialog.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "../../../extensions/default/package.json":
/*!************************************************!*\
  !*** ../../../extensions/default/package.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"@ohif/extension-default","version":"3.9.1","description":"Common/default features and functionality for basic image viewing","author":"OHIF Core Team","license":"MIT","repository":"OHIF/Viewers","main":"dist/ohif-extension-default.umd.js","module":"src/index.ts","publishConfig":{"access":"public"},"engines":{"node":">=14","npm":">=6","yarn":">=1.18.0"},"files":["dist","README.md"],"keywords":["ohif-extension"],"scripts":{"clean":"shx rm -rf dist","clean:deep":"yarn run clean && shx rm -rf node_modules","dev":"cross-env NODE_ENV=development webpack --config .webpack/webpack.dev.js --watch --output-pathinfo","dev:dicom-pdf":"yarn run dev","build":"cross-env NODE_ENV=production webpack --config .webpack/webpack.prod.js","build:package-1":"yarn run build","start":"yarn run dev"},"peerDependencies":{"@ohif/core":"3.9.1","@ohif/i18n":"3.9.1","dcmjs":"*","dicomweb-client":"^0.10.4","prop-types":"^15.6.2","react":"^18.3.1","react-dom":"^18.3.1","react-i18next":"^12.2.2","react-window":"^1.8.9","webpack":"5.89.0","webpack-merge":"^5.7.3"},"dependencies":{"@babel/runtime":"^7.20.13","@cornerstonejs/calculate-suv":"^1.1.0"}}');

/***/ })

}]);
//# sourceMappingURL=extensions_default_src_index_ts.js.map