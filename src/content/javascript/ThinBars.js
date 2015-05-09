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

Components.utils.import("chrome://thinbars/content/javascript/CSSBuilder.js");
Components.utils.import("chrome://thinbars/content/javascript/DynamicStyleSheets.js");
Components.utils.import("chrome://thinbars/content/javascript/Preferences.js");

var ThinBars = {
	
	init : function() {
		DynamicStyleSheets.init();
		Preferences.init("extensions.org.bonsaimind.thinbars.");
		
		this.setDefaultPreferences();
	},
	
	destroy : function() {
		Preferences.destroy();
		DynamicStyleSheets.unregisterAll();
	},
	
	setDefaultPreferences : function() {
		Preferences.registerInt("findbar.height", 22, function(name, value) {
			var css = new CSSBuilder("findbar > *").forceHeight(value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerBool("findbar.notransition", true, function(name, value) {
			if (value) {
				var css = new CSSBuilder("findbar, .findbar-button > *").add("transition", "none");
				DynamicStyleSheets.register(name, css.toCSS());
			} else {
				DynamicStyleSheets.unregister(name);
			}
		});
		
		Preferences.registerInt("findbar.padding.bottom", 0, function(name, value) {
			var css = new CSSBuilder(".findbar-container").autoPadding("bottom", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("findbar.padding.left", 1, function(name, value) {
			var css = new CSSBuilder(".findbar-container").autoPadding("left", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("findbar.padding.right", 1, function(name, value) {
			var css = new CSSBuilder(".findbar-container").autoPadding("right", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("findbar.padding.top", -1, function(name, value) {
			var css = new CSSBuilder(".findbar-container").autoPadding("top", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("findbar.textbox.padding", 0, function(name, value) {
			var css = new CSSBuilder(".findbar-textbox").autoPadding("", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("menubar.height", 24, function(name, value) {
			var css = new CSSBuilder("#toolbar-menubar > *").forceHeight(value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("menubar.items.padding.top", 0, function(name, value) {
			var css = new CSSBuilder("#toolbar-menubar .toolbarbutton-icon").autoPadding("top", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		// , #urlbar-icons
		Preferences.registerInt("menubar.items.padding.bottom", 0, function(name, value) {
			var css = new CSSBuilder("#toolbar-menubar .toolbarbutton-icon, #identity-box")
					.autoPadding("bottom", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("navbar.height", 26, function(name, value) {
			var css = new CSSBuilder("#nav-bar").forceHeight(value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("navbar.items.padding.top", -2, function(name, value) {
			var css = new CSSBuilder("#nav-bar .toolbarbutton-icon").autoPadding("top", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerInt("navbar.items.padding.bottom", -2, function(name, value) {
			var css = new CSSBuilder("#nav-bar .toolbarbutton-icon, #identity-box").autoPadding("bottom", value);
			DynamicStyleSheets.register(name, css.toCSS());
		});
		
		Preferences.registerBool("navbar.notransition", true, function(name, value) {
			if (value) {
				var css = new CSSBuilder("#nav-bar");
				css = css.addSelector("#nav-bar > *");
				css = css.addSelector("#nav-bar > #nav-bar-customization-target > *");
				css = css.add("transition", "none");
				
				DynamicStyleSheets.register(name, css.toCSS());
			} else {
				DynamicStyleSheets.unregister(name);
			}
		});
		
		Preferences.registerBool("other.items.bookmarks_icon.hide_dropdown", true, function(name, value) {
			if (value) {
				var css = new CSSBuilder("#bookmarks-menu-button > .toolbarbutton-menubutton-dropmarker").hide();
				DynamicStyleSheets.register(name, css.toCSS());
			} else {
				DynamicStyleSheets.unregister(name);
			}
		});
	}
};
