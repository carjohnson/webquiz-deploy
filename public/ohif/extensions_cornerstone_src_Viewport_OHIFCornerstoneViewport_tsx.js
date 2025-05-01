(self["webpackChunk"] = self["webpackChunk"] || []).push([["extensions_cornerstone_src_Viewport_OHIFCornerstoneViewport_tsx"],{

/***/ "../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.tsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-resize-detector */ "../../../node_modules/react-resize-detector/build/index.esm.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ohif/core */ "../../core/src/index.ts");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state */ "../../../extensions/cornerstone/src/state.ts");
/* harmony import */ var _OHIFCornerstoneViewport_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./OHIFCornerstoneViewport.css */ "../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");
/* harmony import */ var _OHIFCornerstoneViewport_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_OHIFCornerstoneViewport_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Overlays_CornerstoneOverlays__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Overlays/CornerstoneOverlays */ "../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx");
/* harmony import */ var _components_CinePlayer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/CinePlayer */ "../../../extensions/cornerstone/src/components/CinePlayer/index.ts");
/* harmony import */ var _components_OHIFViewportActionCorners__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/OHIFViewportActionCorners */ "../../../extensions/cornerstone/src/components/OHIFViewportActionCorners.tsx");
/* harmony import */ var _components_WindowLevelActionMenu_getWindowLevelActionMenu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/WindowLevelActionMenu/getWindowLevelActionMenu */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/getWindowLevelActionMenu.tsx");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @state */ "./state/index.js");
/* harmony import */ var _components_ViewportDataOverlaySettingMenu__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../components/ViewportDataOverlaySettingMenu */ "../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/index.tsx");
/* harmony import */ var _utils_presentations_getViewportPresentations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utils/presentations/getViewportPresentations */ "../../../extensions/cornerstone/src/utils/presentations/getViewportPresentations.ts");
/* harmony import */ var _stores_useSynchronizersStore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../stores/useSynchronizersStore */ "../../../extensions/cornerstone/src/stores/useSynchronizersStore.ts");
/* harmony import */ var _utils_ActiveViewportBehavior__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils/ActiveViewportBehavior */ "../../../extensions/cornerstone/src/utils/ActiveViewportBehavior.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();

















const STACK = 'stack';

/**
 * Caches the jump to measurement operation, so that if display set is shown,
 * it can jump to the measurement.
 */
let cacheJumpToMeasurementEvent;

// Todo: This should be done with expose of internal API similar to react-vtkjs-viewport
// Then we don't need to worry about the re-renders if the props change.
const OHIFCornerstoneViewport = /*#__PURE__*/_s2(_s(/*#__PURE__*/_s2(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(_c = _s2(_s(_s2(props => {
  _s2();
  _s();
  const {
    displaySets,
    dataSource,
    viewportOptions,
    displaySetOptions,
    servicesManager,
    commandsManager,
    onElementEnabled,
    // eslint-disable-next-line react/prop-types
    onElementDisabled,
    isJumpToMeasurementDisabled = false,
    // Note: you SHOULD NOT use the initialImageIdOrIndex for manipulation
    // of the imageData in the OHIFCornerstoneViewport. This prop is used
    // to set the initial state of the viewport's first image to render
    // eslint-disable-next-line react/prop-types
    initialImageIndex,
    // if the viewport is part of a hanging protocol layout
    // we should not really rely on the old synchronizers and
    // you see below we only rehydrate the synchronizers if the viewport
    // is not part of the hanging protocol layout. HPs should
    // define their own synchronizers. Since the synchronizers are
    // viewportId dependent and
    // eslint-disable-next-line react/prop-types
    isHangingProtocolLayout
  } = props;
  const viewportId = viewportOptions.viewportId;
  if (!viewportId) {
    throw new Error('Viewport ID is required');
  }

  // Make sure displaySetOptions has one object per displaySet
  while (displaySetOptions.length < displaySets.length) {
    displaySetOptions.push({});
  }

  // Since we only have support for dynamic data in volume viewports, we should
  // handle this case here and set the viewportType to volume if any of the
  // displaySets are dynamic volumes
  viewportOptions.viewportType = displaySets.some(ds => ds.isDynamicVolume && ds.isReconstructable) ? 'volume' : viewportOptions.viewportType;
  const [scrollbarHeight, setScrollbarHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('100px');
  const [enabledVPElement, setEnabledVPElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_12__.useAppConfig)();
  const {
    displaySetService,
    toolbarService,
    toolGroupService,
    syncGroupService,
    cornerstoneViewportService,
    segmentationService,
    cornerstoneCacheService,
    viewportActionCornersService
  } = servicesManager.services;
  const [viewportDialogState] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useViewportDialog)();
  // useCallback for scroll bar height calculation
  const setImageScrollBarHeight = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const scrollbarHeight = `${elementRef.current.clientHeight - 40}px`;
    setScrollbarHeight(scrollbarHeight);
  }, [elementRef]);

  // useCallback for onResize
  const onResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (elementRef.current) {
      cornerstoneViewportService.resize();
      setImageScrollBarHeight();
    }
  }, [elementRef]);
  const cleanUpServices = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(viewportInfo => {
    const renderingEngineId = viewportInfo.getRenderingEngineId();
    const syncGroups = viewportInfo.getSyncGroups();
    toolGroupService.removeViewportFromToolGroup(viewportId, renderingEngineId);
    syncGroupService.removeViewportFromSyncGroup(viewportId, renderingEngineId, syncGroups);
    segmentationService.clearSegmentationRepresentations(viewportId);
    viewportActionCornersService.clear(viewportId);
  }, [viewportId, segmentationService, syncGroupService, toolGroupService, viewportActionCornersService]);
  const elementEnabledHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(evt => {
    // check this is this element reference and return early if doesn't match
    if (evt.detail.element !== elementRef.current) {
      return;
    }
    const {
      viewportId,
      element
    } = evt.detail;
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    (0,_state__WEBPACK_IMPORTED_MODULE_6__.setEnabledElement)(viewportId, element);
    setEnabledVPElement(element);
    const renderingEngineId = viewportInfo.getRenderingEngineId();
    const toolGroupId = viewportInfo.getToolGroupId();
    const syncGroups = viewportInfo.getSyncGroups();
    toolGroupService.addViewportToToolGroup(viewportId, renderingEngineId, toolGroupId);
    syncGroupService.addViewportToSyncGroup(viewportId, renderingEngineId, syncGroups);

    // we don't need reactivity here so just use state
    const {
      synchronizersStore
    } = _stores_useSynchronizersStore__WEBPACK_IMPORTED_MODULE_15__.useSynchronizersStore.getState();
    if (synchronizersStore?.[viewportId]?.length && !isHangingProtocolLayout) {
      // If the viewport used to have a synchronizer, re apply it again
      _rehydrateSynchronizers(viewportId, syncGroupService);
    }
    if (onElementEnabled && typeof onElementEnabled === 'function') {
      onElementEnabled(evt);
    }
  }, [viewportId, onElementEnabled, toolGroupService]);

  // disable the element upon unmounting
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    cornerstoneViewportService.enableViewport(viewportId, elementRef.current);
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.ELEMENT_ENABLED, elementEnabledHandler);
    setImageScrollBarHeight();
    return () => {
      const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
      if (!viewportInfo) {
        return;
      }
      cornerstoneViewportService.storePresentation({
        viewportId
      });

      // This should be done after the store presentation since synchronizers
      // will get cleaned up and they need the viewportInfo to be present
      cleanUpServices(viewportInfo);
      if (onElementDisabled && typeof onElementDisabled === 'function') {
        onElementDisabled(viewportInfo);
      }
      cornerstoneViewportService.disableElement(viewportId);
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.eventTarget.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.Enums.Events.ELEMENT_ENABLED, elementEnabledHandler);
    };
  }, []);

  // subscribe to displaySet metadata invalidation (updates)
  // Currently, if the metadata changes we need to re-render the display set
  // for it to take effect in the viewport. As we deal with scaling in the loading,
  // we need to remove the old volume from the cache, and let the
  // viewport to re-add it which will use the new metadata. Otherwise, the
  // viewport will use the cached volume and the new metadata will not be used.
  // Note: this approach does not actually end of sending network requests
  // and it uses the network cache
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SET_SERIES_METADATA_INVALIDATED, async ({
      displaySetInstanceUID: invalidatedDisplaySetInstanceUID,
      invalidateData
    }) => {
      if (!invalidateData) {
        return;
      }
      const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
      if (viewportInfo.hasDisplaySet(invalidatedDisplaySetInstanceUID)) {
        const viewportData = viewportInfo.getViewportData();
        const newViewportData = await cornerstoneCacheService.invalidateViewportData(viewportData, invalidatedDisplaySetInstanceUID, dataSource, displaySetService);
        const keepCamera = true;
        cornerstoneViewportService.updateViewport(viewportId, newViewportData, keepCamera);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [viewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // handle the default viewportType to be stack
    if (!viewportOptions.viewportType) {
      viewportOptions.viewportType = STACK;
    }
    const loadViewportData = async () => {
      const viewportData = await cornerstoneCacheService.createViewportData(displaySets, viewportOptions, dataSource, initialImageIndex);
      const presentations = (0,_utils_presentations_getViewportPresentations__WEBPACK_IMPORTED_MODULE_14__.getViewportPresentations)(viewportId, viewportOptions);
      let measurement;
      if (cacheJumpToMeasurementEvent?.viewportId === viewportId) {
        measurement = cacheJumpToMeasurementEvent.measurement;
        // Delete the position presentation so that viewport navigates direct
        presentations.positionPresentation = null;
        cacheJumpToMeasurementEvent = null;
      }

      // Note: This is a hack to get the grid to re-render the OHIFCornerstoneViewport component
      // Used for segmentation hydration right now, since the logic to decide whether
      // a viewport needs to render a segmentation lives inside the CornerstoneViewportService
      // so we need to re-render (force update via change of the needsRerendering) so that React
      // does the diffing and decides we should render this again (although the id and element has not changed)
      // so that the CornerstoneViewportService can decide whether to render the segmentation or not. Not that we reached here we can turn it off.
      if (viewportOptions.needsRerendering) {
        viewportOptions.needsRerendering = false;
      }
      cornerstoneViewportService.setViewportData(viewportId, viewportData, viewportOptions, displaySetOptions, presentations);
      if (measurement) {
        _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.selection.setAnnotationSelected(measurement.uid);
      }
    };
    loadViewportData();
  }, [viewportOptions, displaySets, dataSource]);

  /**
   * There are two scenarios for jump to click
   * 1. Current viewports contain the displaySet that the annotation was drawn on
   * 2. Current viewports don't contain the displaySet that the annotation was drawn on
   * and we need to change the viewports displaySet for jumping.
   * Since measurement_jump happens via events and listeners, the former case is handled
   * by the measurement_jump direct callback, but the latter case is handled first by
   * the viewportGrid to set the correct displaySet on the viewport, AND THEN we check
   * the cache for jumping to see if there is any jump queued, then we jump to the correct slice.
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isJumpToMeasurementDisabled) {
      return;
    }
    const unsubscribeFromJumpToMeasurementEvents = _subscribeToJumpToMeasurementEvents(elementRef, viewportId, servicesManager);
    _checkForCachedJumpToMeasurementEvents(elementRef, viewportId, displaySets, servicesManager);
    return () => {
      unsubscribeFromJumpToMeasurementEvents();
    };
  }, [displaySets, elementRef, viewportId, isJumpToMeasurementDisabled, servicesManager]);

  // Set up the window level action menu in the viewport action corners.
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Doing an === check here because the default config value when not set is true
    if (appConfig.addWindowLevelActionMenu === false) {
      return;
    }
    const location = viewportActionCornersService.LOCATIONS.topRight;

    // TODO: In the future we should consider using the customization service
    // to determine if and in which corner various action components should go.
    viewportActionCornersService.addComponent({
      viewportId,
      id: 'windowLevelActionMenu',
      component: (0,_components_WindowLevelActionMenu_getWindowLevelActionMenu__WEBPACK_IMPORTED_MODULE_11__.getWindowLevelActionMenu)({
        viewportId,
        element: elementRef.current,
        displaySets,
        servicesManager,
        commandsManager,
        location,
        verticalDirection: _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.AllInOneMenu.VerticalDirection.TopToBottom,
        horizontalDirection: _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.AllInOneMenu.HorizontalDirection.RightToLeft
      }),
      location
    });
    viewportActionCornersService.addComponent({
      viewportId,
      id: 'segmentation',
      component: (0,_components_ViewportDataOverlaySettingMenu__WEBPACK_IMPORTED_MODULE_13__.getViewportDataOverlaySettingsMenu)({
        viewportId,
        element: elementRef.current,
        displaySets,
        servicesManager,
        commandsManager,
        location
      }),
      location
    });
  }, [displaySets, viewportId, viewportActionCornersService, servicesManager, commandsManager, appConfig]);
  const {
    ref: resizeRef
  } = (0,react_resize_detector__WEBPACK_IMPORTED_MODULE_1__.useResizeDetector)({
    onResize
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "viewport-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "cornerstone-viewport-element",
    style: {
      height: '100%',
      width: '100%'
    },
    onContextMenu: e => e.preventDefault(),
    onMouseDown: e => e.preventDefault(),
    ref: el => {
      resizeRef.current = el;
      elementRef.current = el;
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Overlays_CornerstoneOverlays__WEBPACK_IMPORTED_MODULE_8__["default"], {
    viewportId: viewportId,
    toolBarService: toolbarService,
    element: elementRef.current,
    scrollbarHeight: scrollbarHeight,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_CinePlayer__WEBPACK_IMPORTED_MODULE_9__["default"], {
    enabledVPElement: enabledVPElement,
    viewportId: viewportId,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_utils_ActiveViewportBehavior__WEBPACK_IMPORTED_MODULE_16__["default"], {
    viewportId: viewportId,
    servicesManager: servicesManager
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "absolute top-[24px] w-full"
  }, viewportDialogState.viewportId === viewportId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_5__.Notification, {
    id: "viewport-notification",
    message: viewportDialogState.message,
    type: viewportDialogState.type,
    actions: viewportDialogState.actions,
    onSubmit: viewportDialogState.onSubmit,
    onOutsideClick: viewportDialogState.onOutsideClick,
    onKeyPress: viewportDialogState.onKeyPress
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_OHIFViewportActionCorners__WEBPACK_IMPORTED_MODULE_10__["default"], {
    viewportId: viewportId
  }));
}, "GOnXI3iMSLfeuPBYUDidIrN/6ZU=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_12__.useAppConfig, _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useViewportDialog, react_resize_detector__WEBPACK_IMPORTED_MODULE_1__.useResizeDetector];
}), "Hv6BCuzmFn5Dxdh/5jxa/NUGdok=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_12__.useAppConfig, _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useViewportDialog, react_resize_detector__WEBPACK_IMPORTED_MODULE_1__.useResizeDetector];
}), "GOnXI3iMSLfeuPBYUDidIrN/6ZU=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_12__.useAppConfig, _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useViewportDialog, react_resize_detector__WEBPACK_IMPORTED_MODULE_1__.useResizeDetector];
}), areEqual), "GOnXI3iMSLfeuPBYUDidIrN/6ZU=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_12__.useAppConfig, _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useViewportDialog, react_resize_detector__WEBPACK_IMPORTED_MODULE_1__.useResizeDetector];
}), "Hv6BCuzmFn5Dxdh/5jxa/NUGdok=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_12__.useAppConfig, _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useViewportDialog, react_resize_detector__WEBPACK_IMPORTED_MODULE_1__.useResizeDetector];
}), "GOnXI3iMSLfeuPBYUDidIrN/6ZU=", false, function () {
  return [_state__WEBPACK_IMPORTED_MODULE_12__.useAppConfig, _ohif_ui__WEBPACK_IMPORTED_MODULE_5__.useViewportDialog, react_resize_detector__WEBPACK_IMPORTED_MODULE_1__.useResizeDetector];
});
_c2 = OHIFCornerstoneViewport;
function _subscribeToJumpToMeasurementEvents(elementRef, viewportId, servicesManager) {
  const {
    measurementService,
    cornerstoneViewportService
  } = servicesManager.services;
  const {
    unsubscribe
  } = measurementService.subscribe(_ohif_core__WEBPACK_IMPORTED_MODULE_4__.MeasurementService.EVENTS.JUMP_TO_MEASUREMENT_VIEWPORT, props => {
    cacheJumpToMeasurementEvent = props;
    const {
      viewportId: jumpId,
      measurement,
      isConsumed
    } = props;
    if (!measurement || isConsumed) {
      return;
    }
    if (cacheJumpToMeasurementEvent.cornerstoneViewport === undefined) {
      // Decide on which viewport should handle this
      cacheJumpToMeasurementEvent.cornerstoneViewport = cornerstoneViewportService.getViewportIdToJump(jumpId, {
        displaySetInstanceUID: measurement.displaySetInstanceUID,
        ...measurement.metadata,
        referencedImageId: measurement.referencedImageId || measurement.metadata?.referencedImageId
      });
    }
    if (cacheJumpToMeasurementEvent.cornerstoneViewport !== viewportId) {
      return;
    }
    _jumpToMeasurement(measurement, elementRef, viewportId, servicesManager);
  });
  return unsubscribe;
}

// Check if there is a queued jumpToMeasurement event
function _checkForCachedJumpToMeasurementEvents(elementRef, viewportId, displaySets, servicesManager) {
  if (!cacheJumpToMeasurementEvent) {
    return;
  }
  if (cacheJumpToMeasurementEvent.isConsumed) {
    cacheJumpToMeasurementEvent = null;
    return;
  }
  const displaysUIDs = displaySets.map(displaySet => displaySet.displaySetInstanceUID);
  if (!displaysUIDs?.length) {
    return;
  }

  // Jump to measurement if the measurement exists
  const {
    measurement
  } = cacheJumpToMeasurementEvent;
  if (measurement && elementRef) {
    if (displaysUIDs.includes(measurement?.displaySetInstanceUID)) {
      _jumpToMeasurement(measurement, elementRef, viewportId, servicesManager);
    }
  }
}
function _jumpToMeasurement(measurement, targetElementRef, viewportId, servicesManager) {
  const {
    viewportGridService
  } = servicesManager.services;
  const targetElement = targetElementRef.current;

  // Todo: setCornerstoneMeasurementActive should be handled by the toolGroupManager
  //  to set it properly
  // setCornerstoneMeasurementActive(measurement);

  viewportGridService.setActiveViewportId(viewportId);
  const enabledElement = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_3__.getEnabledElement)(targetElement);
  if (enabledElement) {
    // See how the jumpToSlice() of Cornerstone3D deals with imageIdx param.
    const viewport = enabledElement.viewport;
    const {
      metadata
    } = measurement;
    if (!viewport.isReferenceViewable(metadata, {
      withNavigation: true,
      withOrientation: true
    })) {
      console.log("Reference isn't viewable, postponing until updated");
      return;
    }
    viewport.setViewReference(metadata);
    _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_2__.annotation.selection.setAnnotationSelected(measurement.uid);
    // Jump to measurement consumed, remove.
    cacheJumpToMeasurementEvent?.consume?.();
    cacheJumpToMeasurementEvent = null;
  }
}
function _rehydrateSynchronizers(viewportId, syncGroupService) {
  const {
    synchronizersStore
  } = _stores_useSynchronizersStore__WEBPACK_IMPORTED_MODULE_15__.useSynchronizersStore.getState();
  const synchronizers = synchronizersStore[viewportId];
  if (!synchronizers) {
    return;
  }
  synchronizers.forEach(synchronizerObj => {
    if (!synchronizerObj.id) {
      return;
    }
    const {
      id,
      sourceViewports,
      targetViewports
    } = synchronizerObj;
    const synchronizer = syncGroupService.getSynchronizer(id);
    if (!synchronizer) {
      return;
    }
    const sourceViewportInfo = sourceViewports.find(sourceViewport => sourceViewport.viewportId === viewportId);
    const targetViewportInfo = targetViewports.find(targetViewport => targetViewport.viewportId === viewportId);
    const isSourceViewportInSynchronizer = synchronizer.getSourceViewports().find(sourceViewport => sourceViewport.viewportId === viewportId);
    const isTargetViewportInSynchronizer = synchronizer.getTargetViewports().find(targetViewport => targetViewport.viewportId === viewportId);

    // if the viewport was previously a source viewport, add it again
    if (sourceViewportInfo && !isSourceViewportInSynchronizer) {
      synchronizer.addSource({
        viewportId: sourceViewportInfo.viewportId,
        renderingEngineId: sourceViewportInfo.renderingEngineId
      });
    }

    // if the viewport was previously a target viewport, add it again
    if (targetViewportInfo && !isTargetViewportInSynchronizer) {
      synchronizer.addTarget({
        viewportId: targetViewportInfo.viewportId,
        renderingEngineId: targetViewportInfo.renderingEngineId
      });
    }
  });
}

// Component displayName
OHIFCornerstoneViewport.displayName = 'OHIFCornerstoneViewport';
function areEqual(prevProps, nextProps) {
  if (nextProps.needsRerendering) {
    console.debug('OHIFCornerstoneViewport: Rerender caused by: needsRerendering');
    return false;
  }
  if (prevProps.displaySets.length !== nextProps.displaySets.length) {
    console.debug('OHIFCornerstoneViewport: Rerender caused by: displaySets length change');
    return false;
  }
  if (prevProps.viewportOptions.orientation !== nextProps.viewportOptions.orientation) {
    console.debug('OHIFCornerstoneViewport: Rerender caused by: orientation change');
    return false;
  }
  if (prevProps.viewportOptions.toolGroupId !== nextProps.viewportOptions.toolGroupId) {
    console.debug('OHIFCornerstoneViewport: Rerender caused by: toolGroupId change');
    return false;
  }
  if (nextProps.viewportOptions.viewportType && prevProps.viewportOptions.viewportType !== nextProps.viewportOptions.viewportType) {
    console.debug('OHIFCornerstoneViewport: Rerender caused by: viewportType change');
    return false;
  }
  if (nextProps.viewportOptions.needsRerendering) {
    console.debug('OHIFCornerstoneViewport: Rerender caused by: viewportOptions.needsRerendering');
    return false;
  }
  const prevDisplaySets = prevProps.displaySets;
  const nextDisplaySets = nextProps.displaySets;
  if (prevDisplaySets.length !== nextDisplaySets.length) {
    console.debug('OHIFCornerstoneViewport: Rerender caused by: displaySets length mismatch');
    return false;
  }
  for (let i = 0; i < prevDisplaySets.length; i++) {
    const prevDisplaySet = prevDisplaySets[i];
    const foundDisplaySet = nextDisplaySets.find(nextDisplaySet => nextDisplaySet.displaySetInstanceUID === prevDisplaySet.displaySetInstanceUID);
    if (!foundDisplaySet) {
      console.debug('OHIFCornerstoneViewport: Rerender caused by: displaySet not found');
      return false;
    }

    // check they contain the same image
    if (foundDisplaySet.images?.length !== prevDisplaySet.images?.length) {
      console.debug('OHIFCornerstoneViewport: Rerender caused by: images length mismatch');
      return false;
    }

    // check if their imageIds are the same
    if (foundDisplaySet.images?.length) {
      for (let j = 0; j < foundDisplaySet.images.length; j++) {
        if (foundDisplaySet.images[j].imageId !== prevDisplaySet.images[j].imageId) {
          console.debug('OHIFCornerstoneViewport: Rerender caused by: imageId mismatch');
          return false;
        }
      }
    }
  }
  return true;
}

// Helper function to check if display sets have changed
function haveDisplaySetsChanged(prevDisplaySets, currentDisplaySets) {
  if (prevDisplaySets.length !== currentDisplaySets.length) {
    return true;
  }
  return currentDisplaySets.some((currentDS, index) => {
    const prevDS = prevDisplaySets[index];
    return currentDS.displaySetInstanceUID !== prevDS.displaySetInstanceUID;
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFCornerstoneViewport);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "OHIFCornerstoneViewport$React.memo");
__webpack_require__.$Refresh$.register(_c2, "OHIFCornerstoneViewport");

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

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx":
/*!*************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/CornerstoneOverlays.tsx ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ViewportImageScrollbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewportImageScrollbar */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx");
/* harmony import */ var _CustomizableViewportOverlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomizableViewportOverlay */ "../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx");
/* harmony import */ var _ViewportOrientationMarkers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ViewportOrientationMarkers */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx");
/* harmony import */ var _ViewportImageSliceLoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ViewportImageSliceLoadingIndicator */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();





function CornerstoneOverlays(props) {
  _s2();
  _s();
  const {
    viewportId,
    element,
    scrollbarHeight,
    servicesManager
  } = props;
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const [imageSliceData, setImageSliceData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    imageIndex: 0,
    numberOfSlices: 0
  });
  const [viewportData, setViewportData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      unsubscribe
    } = cornerstoneViewportService.subscribe(cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED, props => {
      if (props.viewportId !== viewportId) {
        return;
      }
      setViewportData(props.viewportData);
    });
    return () => {
      unsubscribe();
    };
  }, [viewportId]);
  if (!element) {
    return null;
  }
  if (viewportData) {
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    if (viewportInfo?.viewportOptions?.customViewportProps?.hideOverlays) {
      return null;
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "noselect"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ViewportImageScrollbar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    viewportId: viewportId,
    viewportData: viewportData,
    element: element,
    imageSliceData: imageSliceData,
    setImageSliceData: setImageSliceData,
    scrollbarHeight: scrollbarHeight,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_CustomizableViewportOverlay__WEBPACK_IMPORTED_MODULE_2__["default"], {
    imageSliceData: imageSliceData,
    viewportData: viewportData,
    viewportId: viewportId,
    servicesManager: servicesManager,
    element: element
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ViewportImageSliceLoadingIndicator__WEBPACK_IMPORTED_MODULE_4__["default"], {
    viewportData: viewportData,
    element: element
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ViewportOrientationMarkers__WEBPACK_IMPORTED_MODULE_3__["default"], {
    imageSliceData: imageSliceData,
    element: element,
    viewportData: viewportData,
    servicesManager: servicesManager,
    viewportId: viewportId
  }));
}
_s2(CornerstoneOverlays, "7y4R8Q5uzdtKJyb5WwOhOhBbbr0=");
_c2 = CornerstoneOverlays;
_s(CornerstoneOverlays, "zi02/9Wk0VqcS4wwgLKPZy/Ua9A=");
_c = CornerstoneOverlays;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CornerstoneOverlays);
var _c;
__webpack_require__.$Refresh$.register(_c, "CornerstoneOverlays");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "CornerstoneOverlays");

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

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx":
/*!****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageScrollbar.tsx ***!
  \****************************************************************************************/
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
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




function CornerstoneImageScrollbar({
  viewportData,
  viewportId,
  element,
  imageSliceData,
  setImageSliceData,
  scrollbarHeight,
  servicesManager
}) {
  _s2();
  _s();
  const {
    cineService,
    cornerstoneViewportService
  } = servicesManager.services;
  const onImageScrollbarChange = (imageIndex, viewportId) => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const {
      isCineEnabled
    } = cineService.getState();
    if (isCineEnabled) {
      // on image scrollbar change, stop the CINE if it is playing
      cineService.stopClip(element, {
        viewportId
      });
      cineService.setCine({
        id: viewportId,
        isPlaying: false
      });
    }
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.jumpToSlice(viewport.element, {
      imageIndex,
      debounceLoading: true
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!viewportData) {
      return;
    }
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport || viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.VolumeViewport3D) {
      return;
    }
    const imageIndex = viewport.getCurrentImageIdIndex();
    const numberOfSlices = viewport.getNumberOfSlices();
    setImageSliceData({
      imageIndex: imageIndex,
      numberOfSlices
    });
  }, [viewportId, viewportData]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!viewportData) {
      return;
    }
    const {
      viewportType
    } = viewportData;
    const eventId = viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.ViewportType.STACK && _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_VIEWPORT_SCROLL || viewportType === _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.ViewportType.ORTHOGRAPHIC && _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.VOLUME_NEW_IMAGE || _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.IMAGE_RENDERED;
    const updateIndex = event => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (!viewport || viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.VolumeViewport3D) {
        return;
      }
      const {
        imageIndex,
        newImageIdIndex = imageIndex
      } = event.detail;
      const numberOfSlices = viewport.getNumberOfSlices();
      // find the index of imageId in the imageIds
      setImageSliceData({
        imageIndex: newImageIdIndex,
        numberOfSlices
      });
    };
    element.addEventListener(eventId, updateIndex);
    return () => {
      element.removeEventListener(eventId, updateIndex);
    };
  }, [viewportData, element]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.ImageScrollbar, {
    onChange: evt => onImageScrollbarChange(evt, viewportId),
    max: imageSliceData.numberOfSlices ? imageSliceData.numberOfSlices - 1 : 0,
    height: scrollbarHeight,
    value: imageSliceData.imageIndex || 0
  });
}
_s2(CornerstoneImageScrollbar, "3ubReDTFssvu4DHeldAg55cW/CI=");
_c2 = CornerstoneImageScrollbar;
_s(CornerstoneImageScrollbar, "3ubReDTFssvu4DHeldAg55cW/CI=");
_c = CornerstoneImageScrollbar;
CornerstoneImageScrollbar.propTypes = {
  viewportData: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  viewportId: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  element: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(Element),
  scrollbarHeight: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  imageSliceData: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired,
  setImageSliceData: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  servicesManager: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CornerstoneImageScrollbar);
var _c;
__webpack_require__.$Refresh$.register(_c, "CornerstoneImageScrollbar");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "CornerstoneImageScrollbar");

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

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx":
/*!****************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportImageSliceLoadingIndicator.tsx ***!
  \****************************************************************************************************/
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
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



function ViewportImageSliceLoadingIndicator({
  viewportData,
  element
}) {
  _s2();
  _s();
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const loadIndicatorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const imageIdToBeLoaded = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setLoadingState = evt => {
    clearTimeout(loadIndicatorRef.current);
    loadIndicatorRef.current = setTimeout(() => {
      setLoading(true);
    }, 50);
  };
  const setFinishLoadingState = evt => {
    clearTimeout(loadIndicatorRef.current);
    setLoading(false);
  };
  const setErrorState = evt => {
    clearTimeout(loadIndicatorRef.current);
    if (imageIdToBeLoaded.current === evt.detail.imageId) {
      setError(evt.detail.error);
      imageIdToBeLoaded.current = null;
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_VIEWPORT_SCROLL, setLoadingState);
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.IMAGE_LOAD_ERROR, setErrorState);
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_NEW_IMAGE, setFinishLoadingState);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_VIEWPORT_SCROLL, setLoadingState);
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.STACK_NEW_IMAGE, setFinishLoadingState);
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.IMAGE_LOAD_ERROR, setErrorState);
    };
  }, [element, viewportData]);
  if (error) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "absolute top-0 left-0 h-full w-full bg-black opacity-50"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "transparent flex h-full w-full items-center justify-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
      className: "text-primary-light text-xl font-light"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "Error Loading Image"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "An error has occurred."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, error)))));
  }
  if (loading) {
    return (/*#__PURE__*/
      // IMPORTANT: we need to use the pointer-events-none class to prevent the loading indicator from
      // interacting with the mouse, since scrolling should propagate to the viewport underneath
      react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "pointer-events-none absolute top-0 left-0 h-full w-full bg-black opacity-50"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "transparent flex h-full w-full items-center justify-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", {
        className: "text-primary-light text-xl font-light"
      }, "Loading...")))
    );
  }
  return null;
}
_s2(ViewportImageSliceLoadingIndicator, "wmzvmDz6U27GCrinWCqhxix/R8w=");
_c2 = ViewportImageSliceLoadingIndicator;
_s(ViewportImageSliceLoadingIndicator, "wmzvmDz6U27GCrinWCqhxix/R8w=");
_c = ViewportImageSliceLoadingIndicator;
ViewportImageSliceLoadingIndicator.propTypes = {
  error: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  element: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewportImageSliceLoadingIndicator);
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewportImageSliceLoadingIndicator");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ViewportImageSliceLoadingIndicator");

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

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.tsx ***!
  \********************************************************************************************/
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
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cornerstonejs/tools */ "../../../node_modules/@cornerstonejs/tools/dist/esm/index.js");
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gl-matrix */ "../../../node_modules/gl-matrix/esm/index.js");
/* harmony import */ var _ViewportOrientationMarkers_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ViewportOrientationMarkers.css */ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");
/* harmony import */ var _ViewportOrientationMarkers_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ViewportOrientationMarkers_css__WEBPACK_IMPORTED_MODULE_5__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();






const {
  getOrientationStringLPS,
  invertOrientationStringLPS
} = _cornerstonejs_tools__WEBPACK_IMPORTED_MODULE_3__.utilities.orientation;
function ViewportOrientationMarkers({
  element,
  viewportData,
  imageSliceData,
  viewportId,
  servicesManager,
  orientationMarkers = ['top', 'left']
}) {
  _s2();
  _s();
  // Rotation is in degrees
  const [rotation, setRotation] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [flipHorizontal, setFlipHorizontal] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [flipVertical, setFlipVertical] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const cameraModifiedListener = evt => {
      const {
        previousCamera,
        camera
      } = evt.detail;
      const {
        rotation
      } = camera;
      if (rotation !== undefined) {
        setRotation(rotation);
      }
      if (camera.flipHorizontal !== undefined && previousCamera.flipHorizontal !== camera.flipHorizontal) {
        setFlipHorizontal(camera.flipHorizontal);
      }
      if (camera.flipVertical !== undefined && previousCamera.flipVertical !== camera.flipVertical) {
        setFlipVertical(camera.flipVertical);
      }
    };
    element.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.CAMERA_MODIFIED, cameraModifiedListener);
    return () => {
      element.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.CAMERA_MODIFIED, cameraModifiedListener);
    };
  }, []);
  const markers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!viewportData) {
      return '';
    }
    let rowCosines, columnCosines, isDefaultValueSetForRowCosine, isDefaultValueSetForColumnCosine;
    if (viewportData.viewportType === 'stack') {
      const imageIndex = imageSliceData.imageIndex;
      const imageId = viewportData.data[0].imageIds?.[imageIndex];

      // Workaround for below TODO stub
      if (!imageId) {
        return false;
      }
      ({
        rowCosines,
        columnCosines,
        isDefaultValueSetForColumnCosine,
        isDefaultValueSetForColumnCosine
      } = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.metaData.get('imagePlaneModule', imageId) || {});
    } else {
      if (!element || !(0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(element)) {
        return '';
      }
      const {
        viewport
      } = (0,_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.getEnabledElement)(element);
      const {
        viewUp,
        viewPlaneNormal
      } = viewport.getCamera();
      const viewRight = gl_matrix__WEBPACK_IMPORTED_MODULE_4__.vec3.create();
      gl_matrix__WEBPACK_IMPORTED_MODULE_4__.vec3.cross(viewRight, viewUp, viewPlaneNormal);
      columnCosines = [-viewUp[0], -viewUp[1], -viewUp[2]];
      rowCosines = viewRight;
    }
    if (!rowCosines || !columnCosines || rotation === undefined || isDefaultValueSetForRowCosine || isDefaultValueSetForColumnCosine) {
      return '';
    }
    const markers = _getOrientationMarkers(rowCosines, columnCosines, rotation, flipVertical, flipHorizontal);
    const ohifViewport = cornerstoneViewportService.getViewportInfo(viewportId);
    if (!ohifViewport) {
      console.log('ViewportOrientationMarkers::No viewport');
      return null;
    }
    return orientationMarkers.map((m, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('overlay-text', `${m}-mid orientation-marker`, 'text-aqua-pale', 'text-[13px]', 'leading-5'),
      key: `${m}-mid orientation-marker`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "orientation-marker-value"
    }, markers[m])));
  }, [viewportData, imageSliceData, rotation, flipVertical, flipHorizontal, orientationMarkers, element]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "ViewportOrientationMarkers select-none"
  }, markers);
}

/**
 *
 * Computes the orientation labels on a Cornerstone-enabled Viewport element
 * when the viewport settings change (e.g. when a horizontal flip or a rotation occurs)
 *
 * @param {*} rowCosines
 * @param {*} columnCosines
 * @param {*} rotation in degrees
 * @returns
 */
_s2(ViewportOrientationMarkers, "H8YMKgoCPaA4OtBIE+oe45xpE7w=");
_c2 = ViewportOrientationMarkers;
_s(ViewportOrientationMarkers, "H8YMKgoCPaA4OtBIE+oe45xpE7w=");
_c = ViewportOrientationMarkers;
function _getOrientationMarkers(rowCosines, columnCosines, rotation, flipVertical, flipHorizontal) {
  const rowString = getOrientationStringLPS(rowCosines);
  const columnString = getOrientationStringLPS(columnCosines);
  const oppositeRowString = invertOrientationStringLPS(rowString);
  const oppositeColumnString = invertOrientationStringLPS(columnString);
  const markers = {
    top: oppositeColumnString,
    left: oppositeRowString,
    right: rowString,
    bottom: columnString
  };

  // If any vertical or horizontal flips are applied, change the orientation strings ahead of
  // the rotation applications
  if (flipVertical) {
    markers.top = invertOrientationStringLPS(markers.top);
    markers.bottom = invertOrientationStringLPS(markers.bottom);
  }
  if (flipHorizontal) {
    markers.left = invertOrientationStringLPS(markers.left);
    markers.right = invertOrientationStringLPS(markers.right);
  }

  // Swap the labels accordingly if the viewport has been rotated
  // This could be done in a more complex way for intermediate rotation values (e.g. 45 degrees)
  if (rotation === 90 || rotation === -270) {
    return {
      top: markers.left,
      left: invertOrientationStringLPS(markers.top),
      right: invertOrientationStringLPS(markers.bottom),
      bottom: markers.right // left
    };
  } else if (rotation === -90 || rotation === 270) {
    return {
      top: invertOrientationStringLPS(markers.left),
      left: markers.top,
      bottom: markers.left,
      right: markers.bottom
    };
  } else if (rotation === 180 || rotation === -180) {
    return {
      top: invertOrientationStringLPS(markers.top),
      left: invertOrientationStringLPS(markers.left),
      bottom: invertOrientationStringLPS(markers.bottom),
      right: invertOrientationStringLPS(markers.right)
    };
  }
  return markers;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewportOrientationMarkers);
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewportOrientationMarkers");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ViewportOrientationMarkers");

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

/***/ "../../../extensions/cornerstone/src/components/CinePlayer/CinePlayer.tsx":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/CinePlayer/CinePlayer.tsx ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @state */ "./state/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s3 = __webpack_require__.$Refresh$.signature(),
  _s4 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature(),
  _s2 = __webpack_require__.$Refresh$.signature();




function WrappedCinePlayer({
  enabledVPElement,
  viewportId,
  servicesManager
}) {
  _s3();
  _s();
  const {
    customizationService,
    displaySetService,
    viewportGridService
  } = servicesManager.services;
  const [{
    isCineEnabled,
    cines
  }, cineService] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useCine)();
  const [newStackFrameRate, setNewStackFrameRate] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(24);
  const [dynamicInfo, setDynamicInfo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [appConfig] = (0,_state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig)();
  const isMountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const cineHandler = () => {
    if (!cines?.[viewportId] || !enabledVPElement) {
      return;
    }
    const {
      isPlaying = false,
      frameRate = 24
    } = cines[viewportId];
    const validFrameRate = Math.max(frameRate, 1);
    return isPlaying ? cineService.playClip(enabledVPElement, {
      framesPerSecond: validFrameRate,
      viewportId
    }) : cineService.stopClip(enabledVPElement);
  };
  const newDisplaySetHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!enabledVPElement || !isCineEnabled) {
      return;
    }
    const {
      viewports
    } = viewportGridService.getState();
    const {
      displaySetInstanceUIDs
    } = viewports.get(viewportId);
    let frameRate = 24;
    let isPlaying = cines[viewportId]?.isPlaying || false;
    displaySetInstanceUIDs.forEach(displaySetInstanceUID => {
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      if (displaySet.FrameRate) {
        // displaySet.FrameRate corresponds to DICOM tag (0018,1063) which is defined as the the frame time in milliseconds
        // So a bit of math to get the actual frame rate.
        frameRate = Math.round(1000 / displaySet.FrameRate);
        isPlaying ||= !!appConfig.autoPlayCine;
      }

      // check if the displaySet is dynamic and set the dynamic info
      if (displaySet.isDynamicVolume) {
        const {
          dynamicVolumeInfo
        } = displaySet;
        const numTimePoints = dynamicVolumeInfo.timePoints.length;
        const label = dynamicVolumeInfo.splittingTag;
        const timePointIndex = dynamicVolumeInfo.timePointIndex || 0;
        setDynamicInfo({
          volumeId: displaySet.displaySetInstanceUID,
          timePointIndex,
          numTimePoints,
          label
        });
      } else {
        setDynamicInfo(null);
      }
    });
    if (isPlaying) {
      cineService.setIsCineEnabled(isPlaying);
    }
    cineService.setCine({
      id: viewportId,
      isPlaying,
      frameRate
    });
    setNewStackFrameRate(frameRate);
  }, [displaySetService, viewportId, viewportGridService, cines, isCineEnabled, enabledVPElement]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    isMountedRef.current = true;
    newDisplaySetHandler();
    return () => {
      isMountedRef.current = false;
    };
  }, [isCineEnabled, newDisplaySetHandler]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isCineEnabled) {
      return;
    }
    cineHandler();
  }, [isCineEnabled, cineHandler, enabledVPElement]);

  /**
   * Use effect for handling new display set
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!enabledVPElement) {
      return;
    }
    enabledVPElement.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.VIEWPORT_NEW_IMAGE_SET, newDisplaySetHandler);
    // this doesn't makes sense that we are listening to this event on viewport element
    enabledVPElement.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, newDisplaySetHandler);
    return () => {
      cineService.setCine({
        id: viewportId,
        isPlaying: false
      });
      enabledVPElement.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.VIEWPORT_NEW_IMAGE_SET, newDisplaySetHandler);
      enabledVPElement.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, newDisplaySetHandler);
    };
  }, [enabledVPElement, newDisplaySetHandler, viewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!cines || !cines[viewportId] || !enabledVPElement || !isMountedRef.current) {
      return;
    }
    cineHandler();
    return () => {
      cineService.stopClip(enabledVPElement, {
        viewportId
      });
    };
  }, [cines, viewportId, cineService, enabledVPElement, cineHandler]);
  if (!isCineEnabled) {
    return null;
  }
  const cine = cines[viewportId];
  const isPlaying = cine?.isPlaying || false;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(RenderCinePlayer, {
    viewportId: viewportId,
    cineService: cineService,
    newStackFrameRate: newStackFrameRate,
    isPlaying: isPlaying,
    dynamicInfo: dynamicInfo,
    customizationService: customizationService
  });
}
_s3(WrappedCinePlayer, "KDnWruUt0OxNbkaov1IuXj9K31k=", false, function () {
  return [_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useCine, _state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig];
});
_c3 = WrappedCinePlayer;
_s(WrappedCinePlayer, "r0hxwwn3JytPzIpQ/rJo8yIeShg=", false, function () {
  return [_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.useCine, _state__WEBPACK_IMPORTED_MODULE_3__.useAppConfig];
});
_c = WrappedCinePlayer;
function RenderCinePlayer({
  viewportId,
  cineService,
  newStackFrameRate,
  isPlaying,
  dynamicInfo: dynamicInfoProp,
  customizationService
}) {
  _s4();
  _s2();
  const {
    component: CinePlayerComponent = _ohif_ui__WEBPACK_IMPORTED_MODULE_1__.CinePlayer
  } = customizationService.get('cinePlayer') ?? {};
  const [dynamicInfo, setDynamicInfo] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dynamicInfoProp);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setDynamicInfo(dynamicInfoProp);
  }, [dynamicInfoProp]);

  /**
   * Use effect for handling 4D time index changed
   */
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!dynamicInfo) {
      return;
    }
    const handleTimePointIndexChange = evt => {
      const {
        volumeId,
        timePointIndex,
        numTimePoints,
        splittingTag
      } = evt.detail;
      setDynamicInfo({
        volumeId,
        timePointIndex,
        numTimePoints,
        label: splittingTag
      });
    };
    _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.addEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.DYNAMIC_VOLUME_TIME_POINT_INDEX_CHANGED, handleTimePointIndexChange);
    return () => {
      _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.eventTarget.removeEventListener(_cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.Enums.Events.DYNAMIC_VOLUME_TIME_POINT_INDEX_CHANGED, handleTimePointIndexChange);
    };
  }, [dynamicInfo]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!dynamicInfo) {
      return;
    }
    const {
      volumeId,
      timePointIndex,
      numTimePoints,
      splittingTag
    } = dynamicInfo || {};
    const volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolume(volumeId, true);
    volume.timePointIndex = timePointIndex;
    setDynamicInfo({
      volumeId,
      timePointIndex,
      numTimePoints,
      label: splittingTag
    });
  }, []);
  const updateDynamicInfo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(props => {
    const {
      volumeId,
      timePointIndex
    } = props;
    const volume = _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.cache.getVolume(volumeId, true);
    volume.timePointIndex = timePointIndex;
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CinePlayerComponent, {
    className: "absolute left-1/2 bottom-3 -translate-x-1/2",
    frameRate: newStackFrameRate,
    isPlaying: isPlaying,
    onClose: () => {
      // also stop the clip
      cineService.setCine({
        id: viewportId,
        isPlaying: false
      });
      cineService.setIsCineEnabled(false);
      cineService.setViewportCineClosed(viewportId);
    },
    onPlayPauseChange: isPlaying => {
      cineService.setCine({
        id: viewportId,
        isPlaying
      });
    },
    onFrameRateChange: frameRate => cineService.setCine({
      id: viewportId,
      frameRate
    }),
    dynamicInfo: dynamicInfo,
    updateDynamicInfo: updateDynamicInfo
  });
}
_s4(RenderCinePlayer, "JKVqxBuKJePknzpHlw0z+0z0gWQ=");
_c4 = RenderCinePlayer;
_s2(RenderCinePlayer, "JKVqxBuKJePknzpHlw0z+0z0gWQ=");
_c2 = RenderCinePlayer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WrappedCinePlayer);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "WrappedCinePlayer");
__webpack_require__.$Refresh$.register(_c2, "RenderCinePlayer");
var _c3, _c4;
__webpack_require__.$Refresh$.register(_c3, "WrappedCinePlayer");
__webpack_require__.$Refresh$.register(_c4, "RenderCinePlayer");

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

/***/ "../../../extensions/cornerstone/src/components/CinePlayer/index.ts":
/*!**************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/CinePlayer/index.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CinePlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CinePlayer */ "../../../extensions/cornerstone/src/components/CinePlayer/CinePlayer.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_CinePlayer__WEBPACK_IMPORTED_MODULE_0__["default"]);

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

/***/ "../../../extensions/cornerstone/src/components/OHIFViewportActionCorners.tsx":
/*!************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/OHIFViewportActionCorners.tsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contextProviders_ViewportActionCornersProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contextProviders/ViewportActionCornersProvider */ "../../../extensions/cornerstone/src/contextProviders/ViewportActionCornersProvider.tsx");
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



function OHIFViewportActionCorners({
  viewportId
}) {
  _s2();
  _s();
  const [viewportActionCornersState] = (0,_contextProviders_ViewportActionCornersProvider__WEBPACK_IMPORTED_MODULE_1__.useViewportActionCornersContext)();
  if (!viewportActionCornersState[viewportId]) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_2__.ViewportActionCorners, {
    cornerComponents: viewportActionCornersState[viewportId]
  });
}
_s2(OHIFViewportActionCorners, "teBNgQ5HAFQq8d/FqiVrvegThuY=", false, function () {
  return [_contextProviders_ViewportActionCornersProvider__WEBPACK_IMPORTED_MODULE_1__.useViewportActionCornersContext];
});
_c2 = OHIFViewportActionCorners;
_s(OHIFViewportActionCorners, "teBNgQ5HAFQq8d/FqiVrvegThuY=", false, function () {
  return [_contextProviders_ViewportActionCornersProvider__WEBPACK_IMPORTED_MODULE_1__.useViewportActionCornersContext];
});
_c = OHIFViewportActionCorners;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OHIFViewportActionCorners);
var _c;
__webpack_require__.$Refresh$.register(_c, "OHIFViewportActionCorners");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "OHIFViewportActionCorners");

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

/***/ "../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/ViewportSegmentationMenu.tsx":
/*!******************************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/ViewportSegmentationMenu.tsx ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _cornerstonejs_tools_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/tools/enums */ "../../../node_modules/@cornerstonejs/tools/dist/esm/enums/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



function ViewportSegmentationMenu({
  viewportId,
  servicesManager
}) {
  _s2();
  _s();
  const {
    segmentationService
  } = servicesManager.services;
  const [activeSegmentations, setActiveSegmentations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [availableSegmentations, setAvailableSegmentations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateSegmentations = () => {
      const active = segmentationService.getSegmentationRepresentations(viewportId);
      setActiveSegmentations(active);
      const all = segmentationService.getSegmentations();
      const available = all.filter(seg => !active.some(activeSeg => activeSeg.segmentationId === seg.segmentationId));
      setAvailableSegmentations(available);
    };
    updateSegmentations();
    const subscriptions = [segmentationService.EVENTS.SEGMENTATION_MODIFIED, segmentationService.EVENTS.SEGMENTATION_REMOVED, segmentationService.EVENTS.SEGMENTATION_REPRESENTATION_MODIFIED].map(event => segmentationService.subscribe(event, updateSegmentations));
    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
    };
  }, [segmentationService, viewportId]);
  const toggleSegmentationRepresentationVisibility = (segmentationId, type = _cornerstonejs_tools_enums__WEBPACK_IMPORTED_MODULE_2__.SegmentationRepresentations.Labelmap) => {
    segmentationService.toggleSegmentationRepresentationVisibility(viewportId, {
      segmentationId,
      type
    });
  };
  const addSegmentationToViewport = segmentationId => {
    segmentationService.addSegmentationRepresentation(viewportId, {
      segmentationId
    });
  };
  const removeSegmentationFromViewport = segmentationId => {
    segmentationService.removeSegmentationRepresentations(viewportId, {
      segmentationId
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-muted flex h-full w-[262px] flex-col rounded p-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-muted-foreground mb-2 text-xs font-semibold"
  }, "Current Viewport"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "space-y-1"
  }, activeSegmentations.map(segmentation => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    key: segmentation.id,
    className: "flex items-center text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "ghost",
    size: "icon",
    className: "text-muted-foreground mr-2",
    onClick: () => removeSegmentationFromViewport(segmentation.segmentationId)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.Minus, {
    className: "h-6 w-6"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-foreground flex-grow"
  }, segmentation.label), segmentation.visible ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "ghost",
    size: "icon",
    className: "text-muted-foreground",
    onClick: () => toggleSegmentationRepresentationVisibility(segmentation.segmentationId, segmentation.type)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.Hide, {
    className: "h-6 w-6"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "ghost",
    size: "icon",
    className: "text-muted-foreground",
    onClick: () => toggleSegmentationRepresentationVisibility(segmentation.segmentationId, segmentation.type)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.Show, {
    className: "h-6 w-6"
  }))))), availableSegmentations.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Separator, {
    className: "bg-input mb-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-muted-foreground mb-2 text-xs font-semibold"
  }, "Available"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "space-y-1"
  }, availableSegmentations.map(({
    segmentationId,
    label
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    key: segmentationId,
    className: "flex items-center text-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "ghost",
    size: "icon",
    className: "text-muted-foreground mr-2",
    onClick: () => addSegmentationToViewport(segmentationId)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.Plus, {
    className: "h-6 w-6"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "text-foreground/60"
  }, label))))));
}
_s2(ViewportSegmentationMenu, "KJHjTaQhN4Lq2W0xDiQ6gcrEvFU=");
_c2 = ViewportSegmentationMenu;
_s(ViewportSegmentationMenu, "KJHjTaQhN4Lq2W0xDiQ6gcrEvFU=");
_c = ViewportSegmentationMenu;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewportSegmentationMenu);
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewportSegmentationMenu");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ViewportSegmentationMenu");

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

/***/ "../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/ViewportSegmentationMenuWrapper.tsx":
/*!*************************************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/ViewportSegmentationMenuWrapper.tsx ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewportSegmentationMenuWrapper: () => (/* binding */ ViewportSegmentationMenuWrapper)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui-next */ "../../ui-next/src/index.ts");
/* harmony import */ var _ViewportSegmentationMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewportSegmentationMenu */ "../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/ViewportSegmentationMenu.tsx");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _hooks_useSegmentations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../hooks/useSegmentations */ "../../../extensions/cornerstone/src/hooks/useSegmentations.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();





function ViewportSegmentationMenuWrapper({
  viewportId,
  displaySets,
  servicesManager,
  commandsManager,
  location
}) {
  _s2();
  _s();
  const {
    viewportActionCornersService,
    viewportGridService
  } = servicesManager.services;
  const segmentations = (0,_hooks_useSegmentations__WEBPACK_IMPORTED_MODULE_4__.useSegmentations)({
    servicesManager
  });
  const activeViewportId = viewportGridService.getActiveViewportId();
  const isActiveViewport = viewportId === activeViewportId;
  const {
    align,
    side
  } = getAlignAndSide(viewportActionCornersService, location);
  if (!segmentations?.length) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Popover, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.PopoverTrigger, {
    asChild: true,
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "ghost",
    size: "icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.Icons.ViewportViews, {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('text-highlight', isActiveViewport ? 'visible' : 'invisible group-hover/pane:visible')
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui_next__WEBPACK_IMPORTED_MODULE_1__.PopoverContent, {
    className: "border-none bg-transparent p-0 shadow-none",
    side: side,
    align: align,
    alignOffset: -15,
    sideOffset: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ViewportSegmentationMenu__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "w-full",
    viewportId: viewportId,
    displaySets: displaySets,
    servicesManager: servicesManager,
    commandsManager: commandsManager
  })));
}
_s2(ViewportSegmentationMenuWrapper, "sHxp9xRb7yqlEMO5fbDvxCZevB8=", false, function () {
  return [_hooks_useSegmentations__WEBPACK_IMPORTED_MODULE_4__.useSegmentations];
});
_c2 = ViewportSegmentationMenuWrapper;
_s(ViewportSegmentationMenuWrapper, "sHxp9xRb7yqlEMO5fbDvxCZevB8=", false, function () {
  return [_hooks_useSegmentations__WEBPACK_IMPORTED_MODULE_4__.useSegmentations];
});
_c = ViewportSegmentationMenuWrapper;
const getAlignAndSide = (viewportActionCornersService, location) => {
  const ViewportActionCornersLocations = viewportActionCornersService.LOCATIONS;
  switch (location) {
    case ViewportActionCornersLocations.topLeft:
      return {
        align: 'start',
        side: 'bottom'
      };
    case ViewportActionCornersLocations.topRight:
      return {
        align: 'end',
        side: 'bottom'
      };
    case ViewportActionCornersLocations.bottomLeft:
      return {
        align: 'start',
        side: 'top'
      };
    case ViewportActionCornersLocations.bottomRight:
      return {
        align: 'end',
        side: 'top'
      };
    default:
      console.debug('Unknown location, defaulting to bottom-start');
      return {
        align: 'start',
        side: 'bottom'
      };
  }
};
var _c;
__webpack_require__.$Refresh$.register(_c, "ViewportSegmentationMenuWrapper");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "ViewportSegmentationMenuWrapper");

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

/***/ "../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/index.tsx":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/index.tsx ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getViewportDataOverlaySettingsMenu: () => (/* binding */ getViewportDataOverlaySettingsMenu)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ViewportSegmentationMenuWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewportSegmentationMenuWrapper */ "../../../extensions/cornerstone/src/components/ViewportDataOverlaySettingMenu/ViewportSegmentationMenuWrapper.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function getViewportDataOverlaySettingsMenu(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ViewportSegmentationMenuWrapper__WEBPACK_IMPORTED_MODULE_1__.ViewportSegmentationMenuWrapper, props);
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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/Colorbar.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/Colorbar.tsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Colorbar: () => (/* binding */ Colorbar),
/* harmony export */   setViewportColorbar: () => (/* binding */ setViewportColorbar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




function setViewportColorbar(viewportId, displaySets, commandsManager, servicesManager, colorbarOptions) {
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
  const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
  const backgroundColor = viewportInfo.getViewportOptions().background;
  const isLight = backgroundColor ? _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.utilities.isEqual(backgroundColor, [1, 1, 1]) : false;
  if (isLight) {
    colorbarOptions.ticks = {
      position: 'left',
      style: {
        font: '12px Arial',
        color: '#000000',
        maxNumTicks: 8,
        tickSize: 5,
        tickWidth: 1,
        labelMargin: 3
      }
    };
  }
  const displaySetInstanceUIDs = [];
  if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.StackViewport) {
    displaySetInstanceUIDs.push(viewportId);
  }
  if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.VolumeViewport) {
    displaySets.forEach(ds => {
      displaySetInstanceUIDs.push(ds.displaySetInstanceUID);
    });
  }
  commandsManager.run({
    commandName: 'toggleViewportColorbar',
    commandOptions: {
      viewportId,
      options: colorbarOptions,
      displaySetInstanceUIDs
    },
    context: 'CORNERSTONE'
  });
}
function Colorbar({
  viewportId,
  displaySets,
  commandsManager,
  servicesManager,
  colorbarProperties
}) {
  _s2();
  _s();
  const {
    colorbarService
  } = servicesManager.services;
  const {
    width: colorbarWidth,
    colorbarTickPosition,
    colorbarContainerPosition,
    colormaps,
    colorbarInitialColormap
  } = colorbarProperties;
  const [showColorbar, setShowColorbar] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(colorbarService.hasColorbar(viewportId));
  const onSetColorbar = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setViewportColorbar(viewportId, displaySets, commandsManager, servicesManager, {
      viewportId,
      colormaps,
      ticks: {
        position: colorbarTickPosition
      },
      width: colorbarWidth,
      position: colorbarContainerPosition,
      activeColormapName: colorbarInitialColormap
    });
  }, [commandsManager]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateColorbarState = () => {
      setShowColorbar(colorbarService.hasColorbar(viewportId));
    };
    const {
      unsubscribe
    } = colorbarService.subscribe(colorbarService.EVENTS.STATE_CHANGED, updateColorbarState);
    return () => {
      unsubscribe();
    };
  }, [viewportId]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex w-full justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mr-2 w-[28px]"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.SwitchButton, {
    label: "Display Color bar",
    checked: showColorbar,
    onChange: () => {
      onSetColorbar();
    }
  }));
}
_s2(Colorbar, "7L7LlgPQpFaaR2n8WyKsMfqaSEQ=");
_c2 = Colorbar;
_s(Colorbar, "7L7LlgPQpFaaR2n8WyKsMfqaSEQ=");
_c = Colorbar;
var _c;
__webpack_require__.$Refresh$.register(_c, "Colorbar");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "Colorbar");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/Colormap.tsx":
/*!*****************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/Colormap.tsx ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Colormap: () => (/* binding */ Colormap)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



function Colormap({
  colormaps,
  viewportId,
  displaySets,
  commandsManager,
  servicesManager
}) {
  _s2();
  _s();
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const [activeDisplaySet, setActiveDisplaySet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(displaySets[0]);
  const [showPreview, setShowPreview] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [prePreviewColormap, setPrePreviewColormap] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const showPreviewRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(showPreview);
  showPreviewRef.current = showPreview;
  const prePreviewColormapRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(prePreviewColormap);
  prePreviewColormapRef.current = prePreviewColormap;
  const activeDisplaySetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(activeDisplaySet);
  activeDisplaySetRef.current = activeDisplaySet;
  const onSetColorLUT = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(props => {
    // TODO: Better way to check if it's a fusion
    const oneOpacityColormaps = ['Grayscale', 'X Ray'];
    const opacity = displaySets.length > 1 && !oneOpacityColormaps.includes(props.colormap.name) ? 0.5 : 1;
    commandsManager.run({
      commandName: 'setViewportColormap',
      commandOptions: {
        ...props,
        opacity,
        immediate: true
      },
      context: 'CORNERSTONE'
    });
  }, [commandsManager]);
  const getViewportColormap = (viewportId, displaySet) => {
    const {
      displaySetInstanceUID
    } = displaySet;
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_2__.StackViewport) {
      const {
        colormap
      } = viewport.getProperties();
      if (!colormap) {
        return colormaps.find(c => c.Name === 'Grayscale') || colormaps[0];
      }
      return colormap;
    }
    const actorEntries = viewport.getActors();
    const actorEntry = actorEntries?.find(entry => entry.referencedId.includes(displaySetInstanceUID));
    const {
      colormap
    } = viewport.getProperties(actorEntry.referencedId);
    if (!colormap) {
      return colormaps.find(c => c.Name === 'Grayscale') || colormaps[0];
    }
    return colormap;
  };
  const buttons = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return displaySets.map((displaySet, index) => ({
      children: displaySet.Modality,
      key: index,
      style: {
        minWidth: `calc(100% / ${displaySets.length})`,
        fontSize: '0.8rem',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }));
  }, [displaySets]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setActiveDisplaySet(displaySets[displaySets.length - 1]);
  }, [displaySets]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, buttons.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex w-full justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.ButtonGroup, {
    onActiveIndexChange: index => {
      setActiveDisplaySet(displaySets[index]);
      setPrePreviewColormap(null);
    },
    activeIndex: displaySets.findIndex(ds => ds.displaySetInstanceUID === activeDisplaySetRef.current.displaySetInstanceUID) || 1,
    className: "w-[70%] text-[10px]"
  }, buttons.map(({
    children,
    key,
    style
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    key: key,
    style: style
  }, children)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex w-full justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.SwitchButton, {
    label: "Preview in viewport",
    checked: showPreview,
    onChange: checked => {
      setShowPreview(checked);
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.AllInOneMenu.DividerItem, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.AllInOneMenu.ItemPanel, null, colormaps.map((colormap, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.AllInOneMenu.Item, {
    key: index,
    label: colormap.description,
    onClick: () => {
      onSetColorLUT({
        viewportId,
        colormap,
        displaySetInstanceUID: activeDisplaySetRef.current.displaySetInstanceUID
      });
      setPrePreviewColormap(null);
    },
    onMouseEnter: () => {
      if (showPreviewRef.current) {
        setPrePreviewColormap(getViewportColormap(viewportId, activeDisplaySetRef.current));
        onSetColorLUT({
          viewportId,
          colormap,
          displaySetInstanceUID: activeDisplaySetRef.current.displaySetInstanceUID
        });
      }
    },
    onMouseLeave: () => {
      if (showPreviewRef.current && prePreviewColormapRef.current) {
        onSetColorLUT({
          viewportId,
          colormap: prePreviewColormapRef.current,
          displaySetInstanceUID: activeDisplaySetRef.current.displaySetInstanceUID
        });
      }
    }
  }))));
}
_s2(Colormap, "zBKOcYgzPEU6iEAgvZge+AXqyGY=");
_c2 = Colormap;
_s(Colormap, "zBKOcYgzPEU6iEAgvZge+AXqyGY=");
_c = Colormap;
var _c;
__webpack_require__.$Refresh$.register(_c, "Colormap");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "Colormap");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeLighting.tsx":
/*!***********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeLighting.tsx ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VolumeLighting: () => (/* binding */ VolumeLighting)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();

function VolumeLighting({
  servicesManager,
  commandsManager,
  viewportId
}) {
  _s2();
  _s();
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const [ambient, setAmbient] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [diffuse, setDiffuse] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [specular, setSpecular] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const onAmbientChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    commandsManager.runCommand('setVolumeLighting', {
      viewportId,
      options: {
        ambient
      }
    });
  }, [ambient, commandsManager, viewportId]);
  const onDiffuseChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    commandsManager.runCommand('setVolumeLighting', {
      viewportId,
      options: {
        diffuse
      }
    });
  }, [diffuse, commandsManager, viewportId]);
  const onSpecularChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    commandsManager.runCommand('setVolumeLighting', {
      viewportId,
      options: {
        specular
      }
    });
  }, [specular, commandsManager, viewportId]);
  const calculateBackground = value => {
    const percentage = (value - 0) / (1 - 0) * 100;
    return `linear-gradient(to right, #5acce6 0%, #5acce6 ${percentage}%, #3a3f99 ${percentage}%, #3a3f99 100%)`;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const {
      actor
    } = viewport.getActors()[0];
    const ambient = actor.getProperty().getAmbient();
    const diffuse = actor.getProperty().getDiffuse();
    const specular = actor.getProperty().getSpecular();
    setAmbient(ambient);
    setDiffuse(diffuse);
    setSpecular(specular);
  }, [viewportId, cornerstoneViewportService]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex  w-full flex-row !items-center justify-between gap-[10px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "block  text-white",
    htmlFor: "ambient"
  }, "Ambient"), ambient !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: "bg-inputfield-main h-2 w-[120px] cursor-pointer appearance-none rounded-lg",
    value: ambient,
    onChange: e => {
      setAmbient(e.target.value);
      onAmbientChange();
    },
    id: "ambient",
    max: 1,
    min: 0,
    type: "range",
    step: 0.1,
    style: {
      background: calculateBackground(ambient),
      '--thumb-inner-color': '#5acce6',
      '--thumb-outer-color': '#090c29'
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex  w-full flex-row !items-center justify-between gap-[10px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "block  text-white",
    htmlFor: "diffuse"
  }, "Diffuse"), diffuse !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: "bg-inputfield-main h-2 w-[120px] cursor-pointer appearance-none rounded-lg",
    value: diffuse,
    onChange: e => {
      setDiffuse(e.target.value);
      onDiffuseChange();
    },
    id: "diffuse",
    max: 1,
    min: 0,
    type: "range",
    step: 0.1,
    style: {
      background: calculateBackground(diffuse),
      '--thumb-inner-color': '#5acce6',
      '--thumb-outer-color': '#090c29'
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex  w-full flex-row !items-center justify-between gap-[10px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "block  text-white",
    htmlFor: "specular"
  }, "Specular"), specular !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: "bg-inputfield-main h-2 w-[120px] cursor-pointer appearance-none rounded-lg",
    value: specular,
    onChange: e => {
      setSpecular(e.target.value);
      onSpecularChange();
    },
    id: "specular",
    max: 1,
    min: 0,
    type: "range",
    step: 0.1,
    style: {
      background: calculateBackground(specular),
      '--thumb-inner-color': '#5acce6',
      '--thumb-outer-color': '#090c29'
    }
  })));
}
_s2(VolumeLighting, "xGTTknlDiDQnEyEpSDuzbHtNYLY=");
_c2 = VolumeLighting;
_s(VolumeLighting, "xGTTknlDiDQnEyEpSDuzbHtNYLY=");
_c = VolumeLighting;
var _c;
__webpack_require__.$Refresh$.register(_c, "VolumeLighting");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "VolumeLighting");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingOptions.tsx":
/*!*******************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingOptions.tsx ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VolumeRenderingOptions: () => (/* binding */ VolumeRenderingOptions)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _VolumeRenderingQuality__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VolumeRenderingQuality */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingQuality.tsx");
/* harmony import */ var _VolumeShift__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VolumeShift */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeShift.tsx");
/* harmony import */ var _VolumeLighting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./VolumeLighting */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeLighting.tsx");
/* harmony import */ var _VolumeShade__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VolumeShade */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeShade.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");







function VolumeRenderingOptions({
  viewportId,
  commandsManager,
  volumeRenderingQualityRange,
  servicesManager
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.AllInOneMenu.ItemPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VolumeRenderingQuality__WEBPACK_IMPORTED_MODULE_2__.VolumeRenderingQuality, {
    viewportId: viewportId,
    commandsManager: commandsManager,
    servicesManager: servicesManager,
    volumeRenderingQualityRange: volumeRenderingQualityRange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VolumeShift__WEBPACK_IMPORTED_MODULE_3__.VolumeShift, {
    viewportId: viewportId,
    commandsManager: commandsManager,
    servicesManager: servicesManager
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item mt-2 flex !h-[20px] w-full justify-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text-aqua-pale text-[13px]"
  }, "LIGHTING")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bg-primary-dark mt-1 mb-1 h-[2px] w-full"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex w-full justify-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VolumeShade__WEBPACK_IMPORTED_MODULE_5__.VolumeShade, {
    commandsManager: commandsManager,
    servicesManager: servicesManager,
    viewportId: viewportId
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VolumeLighting__WEBPACK_IMPORTED_MODULE_4__.VolumeLighting, {
    viewportId: viewportId,
    commandsManager: commandsManager,
    servicesManager: servicesManager
  }));
}
_c2 = VolumeRenderingOptions;
_c = VolumeRenderingOptions;
var _c;
__webpack_require__.$Refresh$.register(_c, "VolumeRenderingOptions");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "VolumeRenderingOptions");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingPresets.tsx":
/*!*******************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingPresets.tsx ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VolumeRenderingPresets: () => (/* binding */ VolumeRenderingPresets)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _VolumeRenderingPresetsContent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VolumeRenderingPresetsContent */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingPresetsContent.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function VolumeRenderingPresets({
  viewportId,
  servicesManager,
  commandsManager,
  volumeRenderingPresets
}) {
  const {
    uiModalService
  } = servicesManager.services;
  const onClickPresets = () => {
    uiModalService.show({
      content: _VolumeRenderingPresetsContent__WEBPACK_IMPORTED_MODULE_2__.VolumeRenderingPresetsContent,
      title: 'Rendering Presets',
      movable: true,
      contentProps: {
        onClose: uiModalService.hide,
        presets: volumeRenderingPresets,
        viewportId,
        commandsManager
      },
      containerDimensions: 'h-[543px] w-[460px]',
      contentDimensions: 'h-[493px] w-[460px]  pl-[12px] pr-[12px]'
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.AllInOneMenu.Item, {
    label: "Rendering Presets",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.Icon, {
      name: "VolumeRendering"
    }),
    rightIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.Icon, {
      name: "action-new-dialog"
    }),
    onClick: onClickPresets
  });
}
_c2 = VolumeRenderingPresets;
_c = VolumeRenderingPresets;
var _c;
__webpack_require__.$Refresh$.register(_c, "VolumeRenderingPresets");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "VolumeRenderingPresets");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingPresetsContent.tsx":
/*!**************************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingPresetsContent.tsx ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VolumeRenderingPresetsContent: () => (/* binding */ VolumeRenderingPresetsContent)
/* harmony export */ });
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();




function VolumeRenderingPresetsContent({
  presets,
  viewportId,
  commandsManager,
  onClose
}) {
  _s2();
  _s();
  const [filteredPresets, setFilteredPresets] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(presets);
  const [searchValue, setSearchValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedPreset, setSelectedPreset] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const handleSearchChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(value => {
    setSearchValue(value);
    const filtered = value ? presets.filter(preset => preset.name.toLowerCase().includes(value.toLowerCase())) : presets;
    setFilteredPresets(filtered);
  }, [presets]);
  const handleApply = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(props => {
    commandsManager.runCommand('setViewportPreset', {
      ...props
    });
  }, [commandsManager]);
  const formatLabel = (label, maxChars) => {
    return label.length > maxChars ? `${label.slice(0, maxChars)}...` : label;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex min-h-full w-full flex-col justify-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "border-secondary-light h-[433px] w-full overflow-hidden rounded border bg-black px-2.5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex h-[46px] w-full items-center justify-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "h-[26px] w-[200px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.InputFilterText, {
    value: searchValue,
    onDebounceChange: handleSearchChange,
    placeholder: 'Search all'
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "ohif-scrollbar overflow h-[385px] w-full overflow-y-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "grid grid-cols-4 gap-3 pt-2 pr-3"
  }, filteredPresets.map((preset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    key: index,
    className: "flex cursor-pointer flex-col items-start",
    onClick: () => {
      setSelectedPreset(preset);
      handleApply({
        preset: preset.name,
        viewportId
      });
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.Icon, {
    name: preset.name,
    className: selectedPreset?.name === preset.name ? 'border-primary-light h-[75px] w-[95px] max-w-none rounded border-2' : 'hover:border-primary-light h-[75px] w-[95px] max-w-none rounded border-2 border-black'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("label", {
    className: "text-aqua-pale mt-2 text-left text-xs"
  }, formatLabel(preset.name, 11))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("footer", {
    className: "flex h-[60px] w-full items-center justify-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_0__.Button, {
    name: "Cancel",
    size: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonEnums.size.medium,
    type: _ohif_ui__WEBPACK_IMPORTED_MODULE_0__.ButtonEnums.type.secondary,
    onClick: onClose
  }, ' ', "Cancel", ' '))));
}
_s2(VolumeRenderingPresetsContent, "S8U9EjNgMzg8iLOk5+YwIOGmAHs=");
_c2 = VolumeRenderingPresetsContent;
_s(VolumeRenderingPresetsContent, "S8U9EjNgMzg8iLOk5+YwIOGmAHs=");
_c = VolumeRenderingPresetsContent;
var _c;
__webpack_require__.$Refresh$.register(_c, "VolumeRenderingPresetsContent");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "VolumeRenderingPresetsContent");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingQuality.tsx":
/*!*******************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingQuality.tsx ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VolumeRenderingQuality: () => (/* binding */ VolumeRenderingQuality)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();

function VolumeRenderingQuality({
  volumeRenderingQualityRange,
  commandsManager,
  servicesManager,
  viewportId
}) {
  _s2();
  _s();
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const {
    min,
    max,
    step
  } = volumeRenderingQualityRange;
  const [quality, setQuality] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const onChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(value => {
    commandsManager.runCommand('setVolumeRenderingQulaity', {
      viewportId,
      volumeQuality: value
    });
    setQuality(value);
  }, [commandsManager, viewportId]);
  const calculateBackground = value => {
    const percentage = (value - 0) / (1 - 0) * 100;
    return `linear-gradient(to right, #5acce6 0%, #5acce6 ${percentage}%, #3a3f99 ${percentage}%, #3a3f99 100%)`;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const {
      actor
    } = viewport.getActors()[0];
    const mapper = actor.getMapper();
    const image = mapper.getInputData();
    const spacing = image.getSpacing();
    const sampleDistance = mapper.getSampleDistance();
    const averageSpacing = spacing.reduce((a, b) => a + b) / 3.0;
    if (sampleDistance === averageSpacing) {
      setQuality(1);
    } else {
      setQuality(Math.sqrt(averageSpacing / (sampleDistance * 0.5)));
    }
  }, [cornerstoneViewportService, viewportId]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex  w-full flex-row !items-center justify-between gap-[10px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "block text-white",
    htmlFor: "volume"
  }, "Quality"), quality !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: "bg-inputfield-main h-2 w-[120px] cursor-pointer appearance-none rounded-lg",
    value: quality,
    id: "volume",
    max: max,
    min: min,
    type: "range",
    step: step,
    onChange: e => onChange(parseInt(e.target.value, 10)),
    style: {
      background: calculateBackground((quality - min) / (max - min)),
      '--thumb-inner-color': '#5acce6',
      '--thumb-outer-color': '#090c29'
    }
  })));
}
_s2(VolumeRenderingQuality, "XBbhi2IEBJgrl+/ZVTEO1aRswWA=");
_c2 = VolumeRenderingQuality;
_s(VolumeRenderingQuality, "XBbhi2IEBJgrl+/ZVTEO1aRswWA=");
_c = VolumeRenderingQuality;
var _c;
__webpack_require__.$Refresh$.register(_c, "VolumeRenderingQuality");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "VolumeRenderingQuality");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeShade.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeShade.tsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VolumeShade: () => (/* binding */ VolumeShade)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();


function VolumeShade({
  commandsManager,
  viewportId,
  servicesManager
}) {
  _s2();
  _s();
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const [shade, setShade] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [key, setKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const onShadeChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(checked => {
    commandsManager.runCommand('setVolumeLighting', {
      viewportId,
      options: {
        shade: checked
      }
    });
  }, [commandsManager, viewportId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const {
      actor
    } = viewport.getActors()[0];
    const shade = actor.getProperty().getShade();
    setShade(shade);
    setKey(key + 1);
  }, [viewportId, cornerstoneViewportService]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.SwitchButton, {
    key: key,
    label: "Shade",
    checked: shade,
    onChange: () => {
      setShade(!shade);
      onShadeChange(!shade);
    }
  });
}
_s2(VolumeShade, "wggOvvVLrp84jlSGl0oWgNjZ4+8=");
_c2 = VolumeShade;
_s(VolumeShade, "wggOvvVLrp84jlSGl0oWgNjZ4+8=");
_c = VolumeShade;
var _c;
__webpack_require__.$Refresh$.register(_c, "VolumeShade");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "VolumeShade");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeShift.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeShift.tsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VolumeShift: () => (/* binding */ VolumeShift)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();

function VolumeShift({
  viewportId,
  commandsManager,
  servicesManager
}) {
  _s2();
  _s();
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const [minShift, setMinShift] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [maxShift, setMaxShift] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [shift, setShift] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(cornerstoneViewportService.getCornerstoneViewport(viewportId)?.shiftedBy || 0);
  const [step, setStep] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isBlocking, setIsBlocking] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const prevShiftRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(shift);
  const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
  const {
    actor
  } = viewport.getActors()[0];
  const ofun = actor.getProperty().getScalarOpacity(0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isBlocking) {
      return;
    }
    const range = ofun.getRange();
    const transferFunctionWidth = range[1] - range[0];
    const minShift = -transferFunctionWidth;
    const maxShift = transferFunctionWidth;
    setMinShift(minShift);
    setMaxShift(maxShift);
    setStep(Math.pow(10, Math.floor(Math.log10(transferFunctionWidth / 500))));
  }, [cornerstoneViewportService, viewportId, actor, ofun, isBlocking]);
  const onChangeRange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(newShift => {
    const shiftDifference = newShift - prevShiftRef.current;
    prevShiftRef.current = newShift;
    viewport.shiftedBy = newShift;
    commandsManager.runCommand('shiftVolumeOpacityPoints', {
      viewportId,
      shift: shiftDifference
    });
  }, [commandsManager, viewportId, viewport]);
  const calculateBackground = value => {
    const percentage = (value - 0) / (1 - 0) * 100;
    return `linear-gradient(to right, #5acce6 0%, #5acce6 ${percentage}%, #3a3f99 ${percentage}%, #3a3f99 100%)`;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "all-in-one-menu-item flex  w-full flex-row !items-center justify-between gap-[10px]"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("label", {
    className: "block  text-white",
    htmlFor: "shift"
  }, "Shift"), step !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    className: "bg-inputfield-main h-2 w-[120px] cursor-pointer appearance-none rounded-lg",
    value: shift,
    onChange: e => {
      const shiftValue = parseInt(e.target.value, 10);
      setShift(shiftValue);
      onChangeRange(shiftValue);
    },
    id: "shift",
    onMouseDown: () => setIsBlocking(true),
    onMouseUp: () => setIsBlocking(false),
    max: maxShift,
    min: minShift,
    type: "range",
    step: step,
    style: {
      background: calculateBackground((shift - minShift) / (maxShift - minShift)),
      '--thumb-inner-color': '#5acce6',
      '--thumb-outer-color': '#090c29'
    }
  })));
}
_s2(VolumeShift, "ZYslTqFfv+HDQA4GbEV5F1K634Y=");
_c2 = VolumeShift;
_s(VolumeShift, "ZYslTqFfv+HDQA4GbEV5F1K634Y=");
_c = VolumeShift;
var _c;
__webpack_require__.$Refresh$.register(_c, "VolumeShift");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "VolumeShift");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/WindowLevel.tsx":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/WindowLevel.tsx ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WindowLevel: () => (/* binding */ WindowLevel)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();



function WindowLevel({
  viewportId,
  commandsManager,
  presets
}) {
  _s2();
  _s();
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation)('WindowLevelActionMenu');
  const onSetWindowLevel = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(props => {
    commandsManager.run({
      commandName: 'setViewportWindowLevel',
      commandOptions: {
        ...props,
        viewportId
      },
      context: 'CORNERSTONE'
    });
  }, [commandsManager, viewportId]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.AllInOneMenu.ItemPanel, null, presets.map((modalityPresets, modalityIndex) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    key: modalityIndex
  }, Object.entries(modalityPresets).map(([modality, presetsArray]) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), {
    key: modality
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.AllInOneMenu.HeaderItem, null, t('Modality Presets', {
    modality
  })), presetsArray.map((preset, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_1__.AllInOneMenu.Item, {
    key: `${modality}-${index}`,
    label: preset.description,
    secondaryLabel: `${preset.window} / ${preset.level}`,
    onClick: () => onSetWindowLevel(preset)
  })))))));
}
_s2(WindowLevel, "IVjbrgMRAGIPePJUmcFV3VoSLAg=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c2 = WindowLevel;
_s(WindowLevel, "O/9rtnq0yS+3ubPhWQm3u//ukjY=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_2__.useTranslation];
});
_c = WindowLevel;
var _c;
__webpack_require__.$Refresh$.register(_c, "WindowLevel");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "WindowLevel");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/WindowLevelActionMenu.tsx":
/*!******************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/WindowLevelActionMenu.tsx ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WindowLevelActionMenu: () => (/* binding */ WindowLevelActionMenu),
/* harmony export */   nonWLModalities: () => (/* binding */ nonWLModalities)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-i18next */ "../../../node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "../../../node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ohif/ui */ "../../ui/src/index.js");
/* harmony import */ var _Colormap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Colormap */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/Colormap.tsx");
/* harmony import */ var _Colorbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Colorbar */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/Colorbar.tsx");
/* harmony import */ var _WindowLevel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./WindowLevel */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/WindowLevel.tsx");
/* harmony import */ var _VolumeRenderingPresets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VolumeRenderingPresets */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingPresets.tsx");
/* harmony import */ var _VolumeRenderingOptions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VolumeRenderingOptions */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/VolumeRenderingOptions.tsx");
/* harmony import */ var _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @cornerstonejs/core */ "../../../node_modules/@cornerstonejs/core/dist/esm/index.js");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();












const nonWLModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];
function WindowLevelActionMenu({
  viewportId,
  element,
  presets,
  verticalDirection,
  horizontalDirection,
  commandsManager,
  servicesManager,
  colorbarProperties,
  displaySets,
  volumeRenderingPresets,
  volumeRenderingQualityRange
}) {
  _s2();
  _s();
  const {
    colormaps,
    colorbarContainerPosition,
    colorbarInitialColormap,
    colorbarTickPosition,
    width: colorbarWidth
  } = colorbarProperties;
  const {
    colorbarService,
    cornerstoneViewportService
  } = servicesManager.services;
  const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
  const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
  const backgroundColor = viewportInfo.getViewportOptions().background;
  const isLight = backgroundColor ? _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_9__.utilities.isEqual(backgroundColor, [1, 1, 1]) : false;
  const {
    t
  } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation)('WindowLevelActionMenu');
  const [viewportGrid] = (0,_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid)();
  const {
    activeViewportId
  } = viewportGrid;
  const [vpHeight, setVpHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(element?.clientHeight);
  const [menuKey, setMenuKey] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [is3DVolume, setIs3DVolume] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const onSetColorbar = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    (0,_Colorbar__WEBPACK_IMPORTED_MODULE_5__.setViewportColorbar)(viewportId, displaySets, commandsManager, servicesManager, {
      colormaps,
      ticks: {
        position: colorbarTickPosition
      },
      width: colorbarWidth,
      position: colorbarContainerPosition,
      activeColormapName: colorbarInitialColormap
    });
  }, [commandsManager]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const newVpHeight = element?.clientHeight;
    if (vpHeight !== newVpHeight) {
      setVpHeight(newVpHeight);
    }
  }, [element, vpHeight]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!colorbarService.hasColorbar(viewportId)) {
      return;
    }
    window.setTimeout(() => {
      colorbarService.removeColorbar(viewportId);
      onSetColorbar();
    }, 0);
  }, [viewportId, displaySets, viewport]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setMenuKey(menuKey + 1);
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (viewport instanceof _cornerstonejs_core__WEBPACK_IMPORTED_MODULE_9__.VolumeViewport3D) {
      setIs3DVolume(true);
    } else {
      setIs3DVolume(false);
    }
  }, [displaySets, viewportId, presets, volumeRenderingQualityRange, volumeRenderingPresets, colorbarProperties, activeViewportId, viewportGrid]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.AllInOneMenu.IconMenu, {
    icon: "viewport-window-level",
    verticalDirection: verticalDirection,
    horizontalDirection: horizontalDirection,
    iconClassName: classnames__WEBPACK_IMPORTED_MODULE_2___default()(
    // Visible on hover and for the active viewport
    activeViewportId === viewportId ? 'visible' : 'invisible group-hover/pane:visible', 'flex shrink-0 cursor-pointer rounded active:text-white text-primary-light', isLight ? ' hover:bg-secondary-dark' : 'hover:bg-secondary-light/60'),
    menuStyle: {
      maxHeight: vpHeight - 32,
      minWidth: 218
    },
    onVisibilityChange: () => {
      setVpHeight(element.clientHeight);
    },
    menuKey: menuKey
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.AllInOneMenu.ItemPanel, null, !is3DVolume && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Colorbar__WEBPACK_IMPORTED_MODULE_5__.Colorbar, {
    viewportId: viewportId,
    displaySets: displaySets.filter(ds => !nonWLModalities.includes(ds.Modality)),
    commandsManager: commandsManager,
    servicesManager: servicesManager,
    colorbarProperties: colorbarProperties
  }), colormaps && !is3DVolume && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.AllInOneMenu.SubMenu, {
    key: "colorLUTPresets",
    itemLabel: "Color LUT",
    itemIcon: "icon-color-lut"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Colormap__WEBPACK_IMPORTED_MODULE_4__.Colormap, {
    colormaps: colormaps,
    viewportId: viewportId,
    displaySets: displaySets.filter(ds => !nonWLModalities.includes(ds.Modality)),
    commandsManager: commandsManager,
    servicesManager: servicesManager
  })), presets && presets.length > 0 && !is3DVolume && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.AllInOneMenu.SubMenu, {
    key: "windowLevelPresets",
    itemLabel: t('Modality Window Presets'),
    itemIcon: "viewport-window-level"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WindowLevel__WEBPACK_IMPORTED_MODULE_6__.WindowLevel, {
    viewportId: viewportId,
    commandsManager: commandsManager,
    presets: presets
  })), volumeRenderingPresets && is3DVolume && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VolumeRenderingPresets__WEBPACK_IMPORTED_MODULE_7__.VolumeRenderingPresets, {
    servicesManager: servicesManager,
    viewportId: viewportId,
    commandsManager: commandsManager,
    volumeRenderingPresets: volumeRenderingPresets
  }), volumeRenderingQualityRange && is3DVolume && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_ohif_ui__WEBPACK_IMPORTED_MODULE_3__.AllInOneMenu.SubMenu, {
    itemLabel: "Rendering Options"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_VolumeRenderingOptions__WEBPACK_IMPORTED_MODULE_8__.VolumeRenderingOptions, {
    viewportId: viewportId,
    commandsManager: commandsManager,
    volumeRenderingQualityRange: volumeRenderingQualityRange,
    servicesManager: servicesManager
  }))));
}
_s2(WindowLevelActionMenu, "KtnbObgKiKSb4ahVzfwOHilf06c=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid];
});
_c2 = WindowLevelActionMenu;
_s(WindowLevelActionMenu, "humt8x7PYpVOLy+7GR0T6E5Dk1s=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_1__.useTranslation, _ohif_ui__WEBPACK_IMPORTED_MODULE_3__.useViewportGrid];
});
_c = WindowLevelActionMenu;
var _c;
__webpack_require__.$Refresh$.register(_c, "WindowLevelActionMenu");
var _c2;
__webpack_require__.$Refresh$.register(_c2, "WindowLevelActionMenu");

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

/***/ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/getWindowLevelActionMenu.tsx":
/*!*********************************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/getWindowLevelActionMenu.tsx ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWindowLevelActionMenu: () => (/* binding */ getWindowLevelActionMenu)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _WindowLevelActionMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WindowLevelActionMenu */ "../../../extensions/cornerstone/src/components/WindowLevelActionMenu/WindowLevelActionMenu.tsx");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");



function getWindowLevelActionMenu({
  viewportId,
  element,
  displaySets,
  servicesManager,
  commandsManager,
  verticalDirection,
  horizontalDirection
}) {
  const {
    customizationService
  } = servicesManager.services;
  const {
    presets
  } = customizationService.get('cornerstone.windowLevelPresets');
  const colorbarProperties = customizationService.get('cornerstone.colorbar');
  const {
    volumeRenderingPresets,
    volumeRenderingQualityRange
  } = customizationService.get('cornerstone.3dVolumeRendering');
  const displaySetPresets = displaySets.filter(displaySet => presets[displaySet.Modality]).map(displaySet => {
    return {
      [displaySet.Modality]: presets[displaySet.Modality]
    };
  });
  const modalities = displaySets.map(displaySet => displaySet.Modality).filter(modality => !_WindowLevelActionMenu__WEBPACK_IMPORTED_MODULE_1__.nonWLModalities.includes(modality));
  if (modalities.length === 0) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_WindowLevelActionMenu__WEBPACK_IMPORTED_MODULE_1__.WindowLevelActionMenu, {
    viewportId: viewportId,
    element: element,
    presets: displaySetPresets,
    verticalDirection: verticalDirection,
    horizontalDirection: horizontalDirection,
    commandsManager: commandsManager,
    servicesManager: servicesManager,
    colorbarProperties: colorbarProperties,
    displaySets: displaySets,
    volumeRenderingPresets: volumeRenderingPresets,
    volumeRenderingQualityRange: volumeRenderingQualityRange
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

/***/ "../../../extensions/cornerstone/src/utils/ActiveViewportBehavior.tsx":
/*!****************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/ActiveViewportBehavior.tsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");

var _s2 = __webpack_require__.$Refresh$.signature();
var _s = __webpack_require__.$Refresh$.signature();

const MODALITIES_REQUIRING_CINE_AUTO_MOUNT = ['OT', 'US'];
const ActiveViewportBehavior = /*#__PURE__*/_s2(_s(/*#__PURE__*/_s2(/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(_c = _s2(_s(_s2(({
  servicesManager,
  viewportId
}) => {
  _s2();
  _s();
  const {
    displaySetService,
    cineService,
    viewportGridService,
    customizationService
  } = servicesManager.services;
  const [activeViewportId, setActiveViewportId] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(viewportId);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const subscription = viewportGridService.subscribe(viewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED, ({
      viewportId
    }) => setActiveViewportId(viewportId));
    return () => subscription.unsubscribe();
  }, [viewportId, viewportGridService]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (cineService.isViewportCineClosed(activeViewportId)) {
      return;
    }
    const displaySetInstanceUIDs = viewportGridService.getDisplaySetsUIDsForViewport(activeViewportId);
    if (!displaySetInstanceUIDs) {
      return;
    }
    const displaySets = displaySetInstanceUIDs.map(uid => displaySetService.getDisplaySetByUID(uid));
    if (!displaySets.length) {
      return;
    }
    const modalities = displaySets.map(displaySet => displaySet?.Modality);
    const {
      modalities: sourceModalities
    } = customizationService.getModeCustomization('autoCineModalities', {
      id: 'autoCineModalities',
      modalities: MODALITIES_REQUIRING_CINE_AUTO_MOUNT
    });
    const requiresCine = modalities.some(modality => sourceModalities.includes(modality));
    if (requiresCine && !cineService.getState().isCineEnabled) {
      cineService.setIsCineEnabled(true);
    }
  }, [activeViewportId, cineService, viewportGridService, displaySetService, customizationService]);
  return null;
}, "dOwk7NMWhmFSu6pJp+WoHzwjqiY="), "dOwk7NMWhmFSu6pJp+WoHzwjqiY="), "dOwk7NMWhmFSu6pJp+WoHzwjqiY="), arePropsEqual), "dOwk7NMWhmFSu6pJp+WoHzwjqiY="), "dOwk7NMWhmFSu6pJp+WoHzwjqiY="), "dOwk7NMWhmFSu6pJp+WoHzwjqiY=");
_c2 = ActiveViewportBehavior;
ActiveViewportBehavior.displayName = 'ActiveViewportBehavior';
function arePropsEqual(prevProps, nextProps) {
  return prevProps.viewportId === nextProps.viewportId && prevProps.servicesManager === nextProps.servicesManager;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActiveViewportBehavior);
var _c, _c2;
__webpack_require__.$Refresh$.register(_c, "ActiveViewportBehavior$memo");
__webpack_require__.$Refresh$.register(_c2, "ActiveViewportBehavior");

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

/***/ "../../../extensions/cornerstone/src/utils/presentations/getViewportPresentations.ts":
/*!*******************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/utils/presentations/getViewportPresentations.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getViewportPresentations: () => (/* binding */ getViewportPresentations)
/* harmony export */ });
/* harmony import */ var _stores_usePositionPresentationStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../stores/usePositionPresentationStore */ "../../../extensions/cornerstone/src/stores/usePositionPresentationStore.ts");
/* harmony import */ var _stores_useLutPresentationStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../stores/useLutPresentationStore */ "../../../extensions/cornerstone/src/stores/useLutPresentationStore.ts");
/* harmony import */ var _stores_useSegmentationPresentationStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../stores/useSegmentationPresentationStore */ "../../../extensions/cornerstone/src/stores/useSegmentationPresentationStore.ts");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "../../../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../../../node_modules/react-refresh/runtime.js */ "../../../node_modules/react-refresh/runtime.js");




function getViewportPresentations(viewportId, viewportOptions) {
  const {
    lutPresentationStore
  } = _stores_useLutPresentationStore__WEBPACK_IMPORTED_MODULE_1__.useLutPresentationStore.getState();
  const {
    positionPresentationStore
  } = _stores_usePositionPresentationStore__WEBPACK_IMPORTED_MODULE_0__.usePositionPresentationStore.getState();
  const {
    segmentationPresentationStore
  } = _stores_useSegmentationPresentationStore__WEBPACK_IMPORTED_MODULE_2__.useSegmentationPresentationStore.getState();

  // NOTE: this is the new viewport state, we should not get the presentationIds from the cornerstoneViewportService
  // since that has the old viewport state
  const {
    presentationIds
  } = viewportOptions;
  if (!presentationIds) {
    return {
      positionPresentation: null,
      lutPresentation: null,
      segmentationPresentation: null
    };
  }
  const {
    lutPresentationId,
    positionPresentationId,
    segmentationPresentationId
  } = presentationIds;
  return {
    positionPresentation: positionPresentationStore[positionPresentationId],
    lutPresentation: lutPresentationStore[lutPresentationId],
    segmentationPresentation: segmentationPresentationStore[segmentationPresentationId]
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

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, `.viewport-wrapper {
  width: 100%;
  height: 100%; /* MUST have \`height\` to prevent resize infinite loop */
  position: relative;
}

.cornerstone-viewport-element {
  outline: 0 !important;
}

.cornerstone-viewport-element {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;

  /* Prevent the blue outline in Chrome when a viewport is selected */

  /* Prevents the entire page from getting larger
     when the magnify tool is near the sides/corners of the page */
  overflow: hidden;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css"],"names":[],"mappings":"AAAA;EACE,WAAW;EACX,YAAY,EAAE,uDAAuD;EACrE,kBAAkB;AACpB;;AAEA;EAOE,qBAAqB;AAKvB;;AAZA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,uBAAuB;;EAEvB,mEAAmE;;EAGnE;kEACgE;EAChE,gBAAgB;AAClB","sourcesContent":[".viewport-wrapper {\n  width: 100%;\n  height: 100%; /* MUST have `height` to prevent resize infinite loop */\n  position: relative;\n}\n\n.cornerstone-viewport-element {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  background-color: black;\n\n  /* Prevent the blue outline in Chrome when a viewport is selected */\n  outline: 0 !important;\n\n  /* Prevents the entire page from getting larger\n     when the magnify tool is near the sides/corners of the page */\n  overflow: hidden;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "../../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.ViewportOrientationMarkers {
  --marker-width: 100px;
  --marker-height: 100px;
  --scrollbar-width: 20px;
  pointer-events: none;
  font-size: 15px;
  line-height: 18px;
}
.ViewportOrientationMarkers .orientation-marker {
  position: absolute;
}
.ViewportOrientationMarkers .top-mid {
  top: 0.6rem;
  left: 50%;
}
.ViewportOrientationMarkers .left-mid {
  top: 47%;
  left: 5px;
}
.ViewportOrientationMarkers .right-mid {
  top: 47%;
  left: calc(100% - var(--marker-width) - var(--scrollbar-width));
}
.ViewportOrientationMarkers .bottom-mid {
  top: calc(100% - var(--marker-height) - 0.6rem);
  left: 47%;
}
.ViewportOrientationMarkers .right-mid .orientation-marker-value {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
      -ms-flex-pack: end;
          justify-content: flex-end;
  min-width: var(--marker-width);
}
.ViewportOrientationMarkers .bottom-mid .orientation-marker-value {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  min-height: var(--marker-height);
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
      -ms-flex-direction: column-reverse;
          flex-direction: column-reverse;
}
`, "",{"version":3,"sources":["webpack://./../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,uBAAuB;EACvB,oBAAoB;EACpB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,SAAS;AACX;AACA;EACE,QAAQ;EACR,SAAS;AACX;AACA;EACE,QAAQ;EACR,+DAA+D;AACjE;AACA;EACE,+CAA+C;EAC/C,SAAS;AACX;AACA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,qBAAyB;MAAzB,kBAAyB;UAAzB,yBAAyB;EACzB,8BAA8B;AAChC;AACA;EACE,oBAAa;EAAb,oBAAa;EAAb,aAAa;EACb,uBAA2B;MAA3B,oBAA2B;UAA3B,2BAA2B;EAC3B,gCAAgC;EAChC,4BAA8B;EAA9B,8BAA8B;MAA9B,kCAA8B;UAA9B,8BAA8B;AAChC","sourcesContent":[".ViewportOrientationMarkers {\n  --marker-width: 100px;\n  --marker-height: 100px;\n  --scrollbar-width: 20px;\n  pointer-events: none;\n  font-size: 15px;\n  line-height: 18px;\n}\n.ViewportOrientationMarkers .orientation-marker {\n  position: absolute;\n}\n.ViewportOrientationMarkers .top-mid {\n  top: 0.6rem;\n  left: 50%;\n}\n.ViewportOrientationMarkers .left-mid {\n  top: 47%;\n  left: 5px;\n}\n.ViewportOrientationMarkers .right-mid {\n  top: 47%;\n  left: calc(100% - var(--marker-width) - var(--scrollbar-width));\n}\n.ViewportOrientationMarkers .bottom-mid {\n  top: calc(100% - var(--marker-height) - 0.6rem);\n  left: 47%;\n}\n.ViewportOrientationMarkers .right-mid .orientation-marker-value {\n  display: flex;\n  justify-content: flex-end;\n  min-width: var(--marker-width);\n}\n.ViewportOrientationMarkers .bottom-mid .orientation-marker-value {\n  display: flex;\n  justify-content: flex-start;\n  min-height: var(--marker-height);\n  flex-direction: column-reverse;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css":
/*!********************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./OHIFCornerstoneViewport.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/cornerstone/src/Viewport/OHIFCornerstoneViewport.css");

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

/***/ "../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css":
/*!********************************************************************************************!*\
  !*** ../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!./ViewportOrientationMarkers.css */ "../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].use[1]!../../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].use[2]!../../../extensions/cornerstone/src/Viewport/Overlays/ViewportOrientationMarkers.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

}]);
//# sourceMappingURL=extensions_cornerstone_src_Viewport_OHIFCornerstoneViewport_tsx.js.map