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
		this.styleSheets.registerPath("main", "resource://thinbars/content/css/main.css");
		
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
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("findbar > *")
					.forceHeight(value));
		});
		
		this.preferences.registerBool("findbar.notransition", true, function(name, value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("findbar")
						.addSelector("findbar *")
						.add("transition", "none")
						.add("animation", "none"));
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		
		this.preferences.registerInt("findbar.padding.bottom", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector(".findbar-container")
					.autoPadding("bottom", value));
		});
		
		this.preferences.registerInt("findbar.padding.left", 1, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector(".findbar-container")
					.autoPadding("left", value));
		});
		
		this.preferences.registerInt("findbar.padding.right", 1, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector(".findbar-container")
					.autoPadding("right", value));
		});
		
		this.preferences.registerInt("findbar.padding.top", -1, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector(".findbar-container")
					.autoPadding("top", value));
		});
		
		this.preferences.registerInt("findbar.textbox.padding", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector(".findbar-textbox")
					.autoPadding("", value));
		});
		
		this.preferences.registerInt("menubar.height", 24, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #toolbar-menubar > *")
					.forceHeight(value));
		});
		this.preferences.registerBool("menubar.hide", false, function(name , value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("#navigator-toolbox #toolbar-menubar")
						.hide());
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		this.preferences.registerInt("menubar.items.padding.bottom", -5, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #toolbar-menubar .toolbarbutton-icon")
					.autoPadding("bottom", value));
		});
		this.preferences.registerInt("menubar.items.padding.left", -2, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #toolbar-menubar .toolbarbutton-icon")
					.autoPadding("left", value));
		});
		this.preferences.registerInt("menubar.items.padding.right", -2, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #toolbar-menubar .toolbarbutton-icon")
					.autoPadding("right", value));
		});
		this.preferences.registerInt("menubar.items.padding.top", -5, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #toolbar-menubar .toolbarbutton-icon")
					.autoPadding("top", value));
		});
		
		this.preferences.registerInt("navbar.height", 27, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #nav-bar")
					.forceHeight(value));
		});
		this.preferences.registerBool("navbar.hide", false, function(name , value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("#navigator-toolbox #nav-bar")
						.add("visibility", "collapse"));
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		this.preferences.registerInt("navbar.items.padding.bottom", -2, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #nav-bar.toolbarbutton-1 .toolbarbutton-icon")
					.autoPadding("bottom", value));
		});
		this.preferences.registerInt("navbar.items.padding.left", -2, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #nav-bar.toolbarbutton-1 .toolbarbutton-icon")
					.autoPadding("left", value));
		});
		this.preferences.registerInt("navbar.items.padding.right", -2, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #nav-bar.toolbarbutton-1 .toolbarbutton-icon")
					.autoPadding("right", value));
		});
		this.preferences.registerInt("navbar.items.padding.top", -2, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox #nav-bar.toolbarbutton-1 .toolbarbutton-icon")
					.autoPadding("top", value));
		});
		this.preferences.registerBool("navbar.notransition", true, function(name, value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("#navigator-toolbox #nav-bar")
						.addSelector("#navigator-toolbox #nav-bar*")
						.add("transition", "none")
						.add("animation", "none"));
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		
		this.preferences.registerInt("menus.padding.bottom", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox .popup-internal-box .scrollbox-innerbox")
					.autoPadding("bottom", value));
		});
		this.preferences.registerInt("menus.padding.left", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox .popup-internal-box .scrollbox-innerbox")
					.autoPadding("left", value));
		});
		this.preferences.registerInt("menus.padding.right", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox .popup-internal-box .scrollbox-innerbox")
					.autoPadding("right", value));
		});
		this.preferences.registerInt("menus.padding.top", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#navigator-toolbox .popup-internal-box .scrollbox-innerbox")
					.autoPadding("top", value));
		});
		
		this.preferences.registerInt("other.identity_icons.padding.bottom", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#identity-box")
					.addSelector("#identity-icons")
					.autoPadding("bottom", value));
		});
		this.preferences.registerInt("other.identity_icons.padding.top", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#identity-box")
					.addSelector("#identity-icons")
					.autoPadding("top", value));
		});
		this.preferences.registerBool("other.items.bookmarks_icon.hide_dropdown", true, function(name, value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("#navigator-toolbox #bookmarks-menu-button > .toolbarbutton-menubutton-dropmarker")
						.hide());
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		this.preferences.registerBool("other.notificationbar.hide", false, function(name, value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector(".notificationbox-stack")
						.hide());
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		this.preferences.registerInt("other.urlbar.dropdown.minwidth", 0, function(name, value) {
			_this.styleSheets.registerForBrowser(name, new CSSBuilder()
					.addSelector("#PopupAutoCompleteRichResult")
					.addSelector("#PopupAutoCompleteRichResult > *")
					.minWidth(value));
		});
		this.preferences.registerBool("other.urlbar.dropdown.notransition", true, function(name, value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("#PopupAutoCompleteRichResult")
						.addSelector("#PopupAutoCompleteRichResult *")
						.add("transition", "none")
						.add("animation", "none"));
			} else {
				_this.styleSheets.unregister(name);
			}
		});
		var urlbarHeightFunction = function(name, value) {
			if (_this.preferences.getBool("other.urlbar.height.force")) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("#navigator-toolbox #urlbar")
						.forceHeight(_this.preferences.getInt("other.urlbar.height")));
			} else {
				_this.styleSheets.unregister("other.urlbar.height");
			}
		};
		this.preferences.registerInt("other.urlbar.height", 24, urlbarHeightFunction);
		this.preferences.registerBool("other.urlbar.height.force", false, urlbarHeightFunction);
		this.preferences.registerBool("other.urlbar.padding.left", true, function(name, value) {
			if (value) {
				_this.styleSheets.registerForBrowser(name, new CSSBuilder()
						.addSelector("#navigator-toolbox #urlbar-wrapper")
						.padding("left", 16));
			} else {
				_this.styleSheets.unregister(name);
			}
		});
	}
};

