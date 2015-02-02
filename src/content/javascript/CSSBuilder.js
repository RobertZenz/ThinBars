/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

"use strict"

var EXPORTED_SYMBOLS = [ "CSSBuilder" ];

var CSSBuilder = function(selector) {
	this.declarations = "";
	this.selector = selector;
	
	this.add = function(declaration, value) {
		this.declarations = this.declarations + declaration + ": " + value + " !important;\n";
		return this;
	};
	
	this.forceHeight = function(value) {
		this.add("height", value);
		this.add("min-height", value);
		this.add("max-height", value);
		return this;
	};
	
	this.forceWidth = function(value) {
		this.add("width", value);
		this.add("min-width", value);
		this.add("max-width", value);
		return this;
	};
	
	this.toCSS = function() {
		return this.selector + " {\n" + this.declarations + "}";
	};
};
