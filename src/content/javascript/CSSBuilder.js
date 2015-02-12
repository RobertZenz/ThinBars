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
	
	this.height = function(value) {
		this.add("height", value);
		return this;
	};
	
	this.maxHeight = function(value) {
		this.add("max-Height", value);
		return this;
	};
	
	this.maxWidth = function(value) {
		this.add("max-width", value);
		return this;
	};
	
	this.minHeight = function(value) {
		this.add("min-Height", value);
		return this;
	};
	
	this.minWidth = function(value) {
		this.add("min-width", value);
		return this;
	};
	
	this.padding = function(postfix, value) {
		var declaration = "";
		
		if (postfix != null && postfix !== "") {
			declaration = declaration + "-" + postfix;
		}
		
		if (value >= 0) {
			this.add("padding" + declaration, value + "px");
		} else {
			this.add("padding" + declaration, "0px");
			this.add("margin" + declaration, value + "px");
		}
		
		return this;
	};
	
	this.width = function(value) {
		this.add("width", value);
		return this;
	};
	
	this.toCSS = function() {
		return this.selector + " {\n" + this.declarations + "}";
	};
};
