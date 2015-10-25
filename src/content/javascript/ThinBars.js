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

Components.utils.import("chrome://thinbars/content/javascript/sfab/CSSBuilder.js");
Components.utils.import("chrome://thinbars/content/javascript/sfab/DynamicStyleSheets.js");
Components.utils.import("chrome://thinbars/content/javascript/sfab/Preferences.js");

var ThinBars = {
	preferences : new Preferences(),
	
	styleSheets : new DynamicStyleSheets(),
	
	init : function() {
		this.styleSheets.init();
		this.preferences.init("extensions.org.bonsaimind.thinbars.");
		
		this.setDefaultPreferences();
	},
	
	destroy : function() {
		this.preferences.destroy();
		this.styleSheets.unregisterAll();
	},
	
	setDefaultPreferences : function() {
		// Needed for the callbacks.
		var _this = this;
		
		this.preferences.registerInt("findbar.height", 22, function(name, value) {
			var css = new CSSBuilder("findbar > *");
			css = css.forceHeight(value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerBool("findbar.notransition", true, function(name, value) {
			if (value) {
				var css = new CSSBuilder("findbar, .findbar-button > *");
				css = css.add("transition", "none");
				_this.styleSheets.register(name, css.toCSS());
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		
		this.preferences.registerInt("findbar.padding.bottom", 0, function(name, value) {
			var css = new CSSBuilder(".findbar-container");
			css = css.autoPadding("bottom", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("findbar.padding.left", 1, function(name, value) {
			var css = new CSSBuilder(".findbar-container");
			css = css.autoPadding("left", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("findbar.padding.right", 1, function(name, value) {
			var css = new CSSBuilder(".findbar-container");
			css = css.autoPadding("right", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("findbar.padding.top", -1, function(name, value) {
			var css = new CSSBuilder(".findbar-container");
			css = css.autoPadding("top", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("findbar.textbox.padding", 0, function(name, value) {
			var css = new CSSBuilder(".findbar-textbox");
			css = css.autoPadding("", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("menubar.height", 22, function(name, value) {
			var css = new CSSBuilder("#toolbar-menubar > *");
			css = css.forceHeight(value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("menubar.items.padding.top", -2, function(name, value) {
			var css = new CSSBuilder("#toolbar-menubar .toolbarbutton-icon");
			css = css.autoPadding("top", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		// , #urlbar-icons
		this.preferences.registerInt("menubar.items.padding.bottom", -2, function(name, value) {
			var css = new CSSBuilder("#toolbar-menubar .toolbarbutton-icon, #identity-box");
			css = css.autoPadding("bottom", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("navbar.height", 27, function(name, value) {
			var css = new CSSBuilder("#nav-bar");
			css = css.forceHeight(value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("navbar.items.padding.top", -2, function(name, value) {
			var css = new CSSBuilder("#nav-bar .toolbarbutton-icon");
			css = css.autoPadding("top", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerInt("navbar.items.padding.bottom", -2, function(name, value) {
			var css = new CSSBuilder("#nav-bar .toolbarbutton-icon, #identity-box");
			css = css.autoPadding("bottom", value);
			_this.styleSheets.register(name, css.toCSS());
		});
		
		this.preferences.registerBool("navbar.notransition", true, function(name, value) {
			if (value) {
				var css = new CSSBuilder("#nav-bar");
				css = css.addSelector("#nav-bar > *");
				css = css.addSelector("#nav-bar > #nav-bar-customization-target");
				css = css.addSelector("#nav-bar > #nav-bar-customization-target > *");
				css = css.add("transition", "none");
				
				_this.styleSheets.register(name, css.toCSS());
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		
		this.preferences.registerBool("other.items.bookmarks_icon.hide_dropdown", true, function(name, value) {
			if (value) {
				var css = new CSSBuilder("#bookmarks-menu-button > .toolbarbutton-menubutton-dropmarker");
				css = css.hide();
				_this.styleSheets.register(name, css.toCSS());
			} else {
				_this.styleSheets.unregister(name);
			}
		});
	}
};

