/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This is a fork/based on Small Tabs, written by ロシア,
 * https://addons.mozilla.org/en-US/firefox/addon/small-tabs/
 */

"use strict";

var EXPORTED_SYMBOLS = [ "ThinBars" ];

Components.utils.import("resource://gre/modules/Services.jsm");

Components.utils.import("chrome://thinbars/content/javascript/DynamicStyleSheets.js");
Components.utils.import("chrome://thinbars/content/javascript/Preferences.js");

var ThinBars = {
	
	getWindows : function() {
		var windows = [];
		
		var browserWindows = Services.wm.getEnumerator("navigator:browser");
		
		while (browserWindows.hasMoreElements()) {
			var browserWindow = browserWindows.getNext();
			browserWindow.QueryInterface(Components.interfaces.nsIDOMWindow);
			windows.push(browserWindow);
		}
		
		return windows;
	},
	
	handleEvent : function(event) {
		var document = event.target;
		var window = document.defaultView;
		
		window.removeEventListener("load", this, true);
		
		if (document.documentElement.getAttribute("windowtype") != "navigator:browser") {
			return;
		}
		
		this.loadScript(window);
	},
	
	loadScript : function(window) {
	},
	
	unloadScript : function(window) {
	},
	
	onOpenWindow : function(window) {
		var domWindow = window.docShell.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(
				Components.interfaces.nsIDOMWindow);
		domWindow.addEventListener("load", this, true);
	},
	
	onCloseWindow : function(window) {
	},
	
	onWindowTitleChange : function(window, title) {
	},
	
	setDefaultPreferences : function() {
		Preferences.registerInt("menubar.height", 0, function(name, value) {
			if (value > 0) {
				DynamicStyleSheets.register(name, "#toolbar-menubar > * { height: " + value + "px !important;"
						+ "max-height: " + value + "px !important;" + "min-height: " + value + "px !important; }");
			} else {
				DynamicStyleSheets.unregister(name);
			}
		});
	},
	
	init : function() {
		DynamicStyleSheets.init();
		
		Preferences.init("extensions.org.bonsaimind.thinbars.");
		this.setDefaultPreferences();
		
		Services.wm.addListener(this);
		
		this.getWindows().forEach(function(window) {
			this.loadScript(window);
		}, this);
	},
	
	uninit : function() {
		Preferences.destroy();
		DynamicStyleSheets.unregisterAll();
		
		Services.wm.removeListener(this);
		
		this.getWindows().forEach(function(window) {
			this.unloadScript(window);
		}, this);
	}
};
