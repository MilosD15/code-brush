var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// dist/js/colorTheme.js
function setInitialColorTheme() {
  const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setColorTheme(isDark);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => setColorTheme(e.matches));
  return $("body").attr("data-color-theme");
}
function setColorTheme(isDark) {
  const currentColorTheme = isDark ? "dark" : "light";
  $("body").attr("data-color-theme", currentColorTheme);
  localStorage.setItem("CODE_BRUSH-currentColorTheme", currentColorTheme);
  return $("body").attr("data-color-theme");
}
function getCurrentColorTheme() {
  return localStorage.getItem("CODE_BRUSH-currentColorTheme");
}

// dist/js/utilities.js
function makeResponsiveSize(sizeInPixels) {
  const root = document.querySelector(":root");
  const rootFontSize = window.getComputedStyle(root).fontSize;
  const fontSizeNumber = rootFontSize.substring(0, rootFontSize.indexOf("px"));
  const responsiveSize = sizeInPixels * (fontSizeNumber / 16);
  return responsiveSize;
}

// dist/js/variables.js
var ANIMATION_FEATURE_CONTAINER_DURATION = 900;
var ANIMATION_FEATURE_DURATION = 600;
var APP_PREFIX = "CODE_BRUSH";
var LARGE_SCREENS_BREAKPOINT = makeResponsiveSize(900);
var MEDIUM_SCREENS_BREAKPOINT = makeResponsiveSize(500);
var PROGRAMMING_LANGUAGES_DATA = [
  {
    name: "xml",
    extensions: ["xml"],
    editorModeName: "application/xml",
    compilerURL: "/"
  },
  {
    name: "html",
    extensions: ["html", "htm"],
    editorModeName: "text/html",
    compilerURL: "https://www.programiz.com/html/online-compiler/"
  },
  {
    name: "css",
    extensions: ["css"],
    editorModeName: "text/css",
    compilerURL: "https://www.programiz.com/html/online-compiler/"
  },
  {
    name: "javascript",
    extensions: ["js"],
    editorModeName: "text/javascript",
    compilerURL: "https://www.programiz.com/javascript/online-compiler/"
  },
  {
    name: "json",
    extensions: ["json"],
    editorModeName: "application/x-json",
    compilerURL: "/"
  },
  {
    name: "python",
    extensions: ["py"],
    editorModeName: "text/x-python",
    compilerURL: "https://www.programiz.com/python-programming/online-compiler/"
  },
  {
    name: "golang",
    extensions: ["go"],
    editorModeName: "text/x-go",
    compilerURL: "https://replit.com/languages/go"
  },
  {
    name: "ruby",
    extensions: ["rb"],
    editorModeName: "text/x-ruby",
    compilerURL: "https://replit.com/languages/ruby"
  }
];

// dist/js/featuresAnimations.js
$("document").ready(() => {
  if (window.innerWidth < LARGE_SCREENS_BREAKPOINT) {
    $(".features").hide();
    $(".features").css("opacity", 1);
  } else {
    $(".features .description").css("opacity", 1);
  }
  $(".features .description").hide();
  $(window).resize((e) => {
    const windowWidth = e.currentTarget.innerWidth;
    if (windowWidth < LARGE_SCREENS_BREAKPOINT) {
      if ($(".features").css("display") !== "none") {
        $(".features").hide();
        $(".features-container").attr("data-menu-opened", "false");
        $(".features").css("opacity", 1);
      }
    }
    if (windowWidth >= LARGE_SCREENS_BREAKPOINT) {
      if ($(".features").css("display") === "none") {
        $(".features").show();
        $(".features-container").attr("data-menu-opened", "true");
        $(".features .description").css("opacity", 1);
      }
    }
    closeAllDescriptions();
  });
  $(".features-title").click(() => {
    if ($(".features").css("display") === "block") {
      closeFeaturesMenuSmallScreens();
      $(".features-container").attr("data-menu-opened", "false");
    } else {
      openFeaturesMenuSmallScreens();
      $(".features-container").attr("data-menu-opened", "true");
    }
  });
  $(".feature .wrapper button").click((e) => {
    closeAllDescriptions();
    const featureElement = $(e.currentTarget).parents(".feature");
    const descriptionElement = featureElement.children(".description");
    if (descriptionElement.css("display") === "flex") {
      closeDescription(descriptionElement);
      featureElement.attr("data-description-opened", "false");
    } else {
      openDescription(descriptionElement);
      featureElement.attr("data-description-opened", "true");
    }
  });
  $("body").click((e) => {
    const hasFeaturesContainerForParents = $(e.target).parents(".features-container");
    if (hasFeaturesContainerForParents.length == 0) {
      if (window.innerWidth < LARGE_SCREENS_BREAKPOINT) {
        closeFeaturesMenuSmallScreens();
        $(".features-container").attr("data-menu-opened", "false");
      }
      closeAllDescriptions();
    }
  });
});
function closeAllDescriptions() {
  $(".features .description").slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
  $(".feature").attr("data-description-opened", "false");
}
function closeFeaturesMenuSmallScreens() {
  $(".features").slideUp(ANIMATION_FEATURE_CONTAINER_DURATION).fadeOut(ANIMATION_FEATURE_CONTAINER_DURATION);
}
function openFeaturesMenuSmallScreens() {
  $(".features").slideDown(ANIMATION_FEATURE_CONTAINER_DURATION).fadeIn(ANIMATION_FEATURE_CONTAINER_DURATION);
}
function closeDescription(descriptionElement) {
  descriptionElement.slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
}
function openDescription(descriptionElement) {
  descriptionElement.slideDown(ANIMATION_FEATURE_DURATION).fadeIn(ANIMATION_FEATURE_DURATION);
}

// dist/js/namingFile.js
$("document").ready(() => {
  $(".hint").hide();
  $("#name-file-frm").submit((e) => {
    e.preventDefault();
    const namingFileContainer = $(".naming-file-container");
    const isFileNamed = namingFileContainer.attr("data-file") === "named";
    if (isFileNamed) {
      $("#name-file-frm .input").fadeIn(300);
      $("#name-file-frm .file-name").hide();
      $(".naming-file-container").attr("data-file", "unnamed");
      $("#name-file-frm button").text("Save");
      $("#name-file-frm button").attr("data-role", "save-btn");
      $("#name-file-frm input").focus();
    } else {
      const result = validateInput();
      if (result.isValid) {
        const inputValue = $("#name-file-frm input")[0].value.trim();
        onFileProperlyNamed(result.fileType, inputValue);
      } else {
        $("#name-file-frm .input span").text(`${result.errorMessage}.`);
        $("#name-file-frm .input span").slideDown(300).fadeIn(300);
      }
    }
  });
  $("#name-file-frm input").keyup(() => {
    if ($("#name-file-frm input")[0].value === "") {
      $("#name-file-frm .input").attr("data-typing", "off");
    } else {
      $("#name-file-frm .input").attr("data-typing", "on");
    }
    const result = validateInput();
    if (result.isValid) {
      $("#name-file-frm .input span").slideUp(300).fadeOut(300);
    }
  });
  $(".hint-btn").click(() => {
    const tooltipText = $(".hint-btn").attr("data-tooltip");
    if (tooltipText === "Show filename hint") {
      $(".hint-btn").attr("data-tooltip", "Hide filename hint");
      $(".hint").slideDown(ANIMATION_FEATURE_DURATION).fadeIn(ANIMATION_FEATURE_DURATION);
    } else {
      $(".hint-btn").attr("data-tooltip", "Show filename hint");
      $(".hint").slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
    }
  });
});
function onFileProperlyNamed(fileType, filename) {
  $(".editor-container").attr("data-prog-lang", fileType);
  $("#name-file-frm .input").hide();
  $("#name-file-frm .file-name").text(`./${filename}`);
  $("#name-file-frm .file-name").fadeIn(300);
  $("#name-file-frm .file-name").attr("data-file-name", filename);
  $("#name-file-frm button").text("Change file name");
  $("#name-file-frm button").attr("data-role", "change-btn");
  $(".naming-file-container").attr("data-file", "named");
}
function validateInput() {
  const inputValue = $("#name-file-frm input")[0].value.trim();
  if (inputValue === "") {
    return {
      isValid: false,
      errorMessage: "File name omitted"
    };
  }
  const FILE_NAME_REGEX = /^\w+\.(xml|html|htm|css|js|json|py|go|rb)$/;
  if (inputValue.match(FILE_NAME_REGEX) == null) {
    return {
      isValid: false,
      errorMessage: "Incorrect file name format"
    };
  }
  const fileNamePieces = inputValue.split(".");
  const fileExtension = fileNamePieces[fileNamePieces.length - 1].toLowerCase();
  const fileType = getEditorLangMode(fileExtension);
  return {
    isValid: true,
    fileType
  };
}
function getEditorLangMode(fileExtension) {
  for (let i = 0; i < PROGRAMMING_LANGUAGES_DATA.length; i++) {
    const progLangObject = PROGRAMMING_LANGUAGES_DATA[i];
    const hasTargetedExtension = progLangObject.extensions.some((extension) => extension === fileExtension);
    if (hasTargetedExtension) {
      return progLangObject.editorModeName;
    }
  }
  return "js";
}
function isFileNamedProperly() {
  const namingFileContainer = $(".naming-file-container");
  const isFileNamed = namingFileContainer.attr("data-file") === "named";
  if (isFileNamed) {
    const result = validateInput();
    if (result.isValid) {
      return result;
    }
  }
  return false;
}

// dist/_snowpack/pkg/common/codemirror-2a7f36ab.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var codemirror = createCommonjsModule(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    var userAgent = navigator.userAgent;
    var platform = navigator.platform;
    var gecko = /gecko\/\d/i.test(userAgent);
    var ie_upto10 = /MSIE \d/.test(userAgent);
    var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
    var edge = /Edge\/(\d+)/.exec(userAgent);
    var ie = ie_upto10 || ie_11up || edge;
    var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
    var webkit = !edge && /WebKit\//.test(userAgent);
    var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
    var chrome = !edge && /Chrome\/(\d+)/.exec(userAgent);
    var chrome_version = chrome && +chrome[1];
    var presto = /Opera\//.test(userAgent);
    var safari = /Apple Computer/.test(navigator.vendor);
    var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
    var phantom = /PhantomJS/.test(userAgent);
    var ios = safari && (/Mobile\/\w+/.test(userAgent) || navigator.maxTouchPoints > 2);
    var android = /Android/.test(userAgent);
    var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
    var mac = ios || /Mac/.test(platform);
    var chromeOS = /\bCrOS\b/.test(userAgent);
    var windows = /win/i.test(platform);
    var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
    if (presto_version) {
      presto_version = Number(presto_version[1]);
    }
    if (presto_version && presto_version >= 15) {
      presto = false;
      webkit = true;
    }
    var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
    var captureRightClick = gecko || ie && ie_version >= 9;
    function classTest(cls) {
      return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
    }
    var rmClass = function(node, cls) {
      var current = node.className;
      var match = classTest(cls).exec(current);
      if (match) {
        var after = current.slice(match.index + match[0].length);
        node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
      }
    };
    function removeChildren(e) {
      for (var count = e.childNodes.length; count > 0; --count) {
        e.removeChild(e.firstChild);
      }
      return e;
    }
    function removeChildrenAndAdd(parent, e) {
      return removeChildren(parent).appendChild(e);
    }
    function elt(tag, content, className, style) {
      var e = document.createElement(tag);
      if (className) {
        e.className = className;
      }
      if (style) {
        e.style.cssText = style;
      }
      if (typeof content == "string") {
        e.appendChild(document.createTextNode(content));
      } else if (content) {
        for (var i2 = 0; i2 < content.length; ++i2) {
          e.appendChild(content[i2]);
        }
      }
      return e;
    }
    function eltP(tag, content, className, style) {
      var e = elt(tag, content, className, style);
      e.setAttribute("role", "presentation");
      return e;
    }
    var range;
    if (document.createRange) {
      range = function(node, start, end, endNode) {
        var r = document.createRange();
        r.setEnd(endNode || node, end);
        r.setStart(node, start);
        return r;
      };
    } else {
      range = function(node, start, end) {
        var r = document.body.createTextRange();
        try {
          r.moveToElementText(node.parentNode);
        } catch (e) {
          return r;
        }
        r.collapse(true);
        r.moveEnd("character", end);
        r.moveStart("character", start);
        return r;
      };
    }
    function contains(parent, child) {
      if (child.nodeType == 3) {
        child = child.parentNode;
      }
      if (parent.contains) {
        return parent.contains(child);
      }
      do {
        if (child.nodeType == 11) {
          child = child.host;
        }
        if (child == parent) {
          return true;
        }
      } while (child = child.parentNode);
    }
    function activeElt(doc2) {
      var activeElement;
      try {
        activeElement = doc2.activeElement;
      } catch (e) {
        activeElement = doc2.body || null;
      }
      while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement;
      }
      return activeElement;
    }
    function addClass(node, cls) {
      var current = node.className;
      if (!classTest(cls).test(current)) {
        node.className += (current ? " " : "") + cls;
      }
    }
    function joinClasses(a, b) {
      var as = a.split(" ");
      for (var i2 = 0; i2 < as.length; i2++) {
        if (as[i2] && !classTest(as[i2]).test(b)) {
          b += " " + as[i2];
        }
      }
      return b;
    }
    var selectInput = function(node) {
      node.select();
    };
    if (ios) {
      selectInput = function(node) {
        node.selectionStart = 0;
        node.selectionEnd = node.value.length;
      };
    } else if (ie) {
      selectInput = function(node) {
        try {
          node.select();
        } catch (_e) {
        }
      };
    }
    function doc(cm) {
      return cm.display.wrapper.ownerDocument;
    }
    function win(cm) {
      return doc(cm).defaultView;
    }
    function bind(f) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function() {
        return f.apply(null, args);
      };
    }
    function copyObj(obj, target, overwrite) {
      if (!target) {
        target = {};
      }
      for (var prop2 in obj) {
        if (obj.hasOwnProperty(prop2) && (overwrite !== false || !target.hasOwnProperty(prop2))) {
          target[prop2] = obj[prop2];
        }
      }
      return target;
    }
    function countColumn(string, end, tabSize, startIndex, startValue) {
      if (end == null) {
        end = string.search(/[^\s\u00a0]/);
        if (end == -1) {
          end = string.length;
        }
      }
      for (var i2 = startIndex || 0, n = startValue || 0; ; ) {
        var nextTab = string.indexOf("	", i2);
        if (nextTab < 0 || nextTab >= end) {
          return n + (end - i2);
        }
        n += nextTab - i2;
        n += tabSize - n % tabSize;
        i2 = nextTab + 1;
      }
    }
    var Delayed = function() {
      this.id = null;
      this.f = null;
      this.time = 0;
      this.handler = bind(this.onTimeout, this);
    };
    Delayed.prototype.onTimeout = function(self2) {
      self2.id = 0;
      if (self2.time <= +new Date()) {
        self2.f();
      } else {
        setTimeout(self2.handler, self2.time - +new Date());
      }
    };
    Delayed.prototype.set = function(ms, f) {
      this.f = f;
      var time = +new Date() + ms;
      if (!this.id || time < this.time) {
        clearTimeout(this.id);
        this.id = setTimeout(this.handler, ms);
        this.time = time;
      }
    };
    function indexOf(array, elt2) {
      for (var i2 = 0; i2 < array.length; ++i2) {
        if (array[i2] == elt2) {
          return i2;
        }
      }
      return -1;
    }
    var scrollerGap = 50;
    var Pass = {toString: function() {
      return "CodeMirror.Pass";
    }};
    var sel_dontScroll = {scroll: false}, sel_mouse = {origin: "*mouse"}, sel_move = {origin: "+move"};
    function findColumn(string, goal, tabSize) {
      for (var pos = 0, col = 0; ; ) {
        var nextTab = string.indexOf("	", pos);
        if (nextTab == -1) {
          nextTab = string.length;
        }
        var skipped = nextTab - pos;
        if (nextTab == string.length || col + skipped >= goal) {
          return pos + Math.min(skipped, goal - col);
        }
        col += nextTab - pos;
        col += tabSize - col % tabSize;
        pos = nextTab + 1;
        if (col >= goal) {
          return pos;
        }
      }
    }
    var spaceStrs = [""];
    function spaceStr(n) {
      while (spaceStrs.length <= n) {
        spaceStrs.push(lst(spaceStrs) + " ");
      }
      return spaceStrs[n];
    }
    function lst(arr) {
      return arr[arr.length - 1];
    }
    function map(array, f) {
      var out = [];
      for (var i2 = 0; i2 < array.length; i2++) {
        out[i2] = f(array[i2], i2);
      }
      return out;
    }
    function insertSorted(array, value, score) {
      var pos = 0, priority = score(value);
      while (pos < array.length && score(array[pos]) <= priority) {
        pos++;
      }
      array.splice(pos, 0, value);
    }
    function nothing() {
    }
    function createObj(base, props) {
      var inst;
      if (Object.create) {
        inst = Object.create(base);
      } else {
        nothing.prototype = base;
        inst = new nothing();
      }
      if (props) {
        copyObj(props, inst);
      }
      return inst;
    }
    var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    function isWordCharBasic(ch) {
      return /\w/.test(ch) || ch > "" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
    }
    function isWordChar(ch, helper) {
      if (!helper) {
        return isWordCharBasic(ch);
      }
      if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
        return true;
      }
      return helper.test(ch);
    }
    function isEmpty(obj) {
      for (var n in obj) {
        if (obj.hasOwnProperty(n) && obj[n]) {
          return false;
        }
      }
      return true;
    }
    var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function isExtendingChar(ch) {
      return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
    }
    function skipExtendingChars(str, pos, dir) {
      while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
        pos += dir;
      }
      return pos;
    }
    function findFirst(pred, from, to) {
      var dir = from > to ? -1 : 1;
      for (; ; ) {
        if (from == to) {
          return from;
        }
        var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
        if (mid == from) {
          return pred(mid) ? from : to;
        }
        if (pred(mid)) {
          to = mid;
        } else {
          from = mid + dir;
        }
      }
    }
    function iterateBidiSections(order, from, to, f) {
      if (!order) {
        return f(from, to, "ltr", 0);
      }
      var found = false;
      for (var i2 = 0; i2 < order.length; ++i2) {
        var part = order[i2];
        if (part.from < to && part.to > from || from == to && part.to == from) {
          f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i2);
          found = true;
        }
      }
      if (!found) {
        f(from, to, "ltr");
      }
    }
    var bidiOther = null;
    function getBidiPartAt(order, ch, sticky) {
      var found;
      bidiOther = null;
      for (var i2 = 0; i2 < order.length; ++i2) {
        var cur = order[i2];
        if (cur.from < ch && cur.to > ch) {
          return i2;
        }
        if (cur.to == ch) {
          if (cur.from != cur.to && sticky == "before") {
            found = i2;
          } else {
            bidiOther = i2;
          }
        }
        if (cur.from == ch) {
          if (cur.from != cur.to && sticky != "before") {
            found = i2;
          } else {
            bidiOther = i2;
          }
        }
      }
      return found != null ? found : bidiOther;
    }
    var bidiOrdering = function() {
      var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
      var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
      function charType(code) {
        if (code <= 247) {
          return lowTypes.charAt(code);
        } else if (1424 <= code && code <= 1524) {
          return "R";
        } else if (1536 <= code && code <= 1785) {
          return arabicTypes.charAt(code - 1536);
        } else if (1774 <= code && code <= 2220) {
          return "r";
        } else if (8192 <= code && code <= 8203) {
          return "w";
        } else if (code == 8204) {
          return "b";
        } else {
          return "L";
        }
      }
      var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
      var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
      function BidiSpan(level, from, to) {
        this.level = level;
        this.from = from;
        this.to = to;
      }
      return function(str, direction) {
        var outerType = direction == "ltr" ? "L" : "R";
        if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
          return false;
        }
        var len = str.length, types = [];
        for (var i2 = 0; i2 < len; ++i2) {
          types.push(charType(str.charCodeAt(i2)));
        }
        for (var i$12 = 0, prev = outerType; i$12 < len; ++i$12) {
          var type = types[i$12];
          if (type == "m") {
            types[i$12] = prev;
          } else {
            prev = type;
          }
        }
        for (var i$22 = 0, cur = outerType; i$22 < len; ++i$22) {
          var type$1 = types[i$22];
          if (type$1 == "1" && cur == "r") {
            types[i$22] = "n";
          } else if (isStrong.test(type$1)) {
            cur = type$1;
            if (type$1 == "r") {
              types[i$22] = "R";
            }
          }
        }
        for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
          var type$2 = types[i$3];
          if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
            types[i$3] = "1";
          } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
            types[i$3] = prev$1;
          }
          prev$1 = type$2;
        }
        for (var i$4 = 0; i$4 < len; ++i$4) {
          var type$3 = types[i$4];
          if (type$3 == ",") {
            types[i$4] = "N";
          } else if (type$3 == "%") {
            var end = void 0;
            for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {
            }
            var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
            for (var j = i$4; j < end; ++j) {
              types[j] = replace;
            }
            i$4 = end - 1;
          }
        }
        for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
          var type$4 = types[i$5];
          if (cur$1 == "L" && type$4 == "1") {
            types[i$5] = "L";
          } else if (isStrong.test(type$4)) {
            cur$1 = type$4;
          }
        }
        for (var i$6 = 0; i$6 < len; ++i$6) {
          if (isNeutral.test(types[i$6])) {
            var end$1 = void 0;
            for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {
            }
            var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
            var after = (end$1 < len ? types[end$1] : outerType) == "L";
            var replace$1 = before == after ? before ? "L" : "R" : outerType;
            for (var j$1 = i$6; j$1 < end$1; ++j$1) {
              types[j$1] = replace$1;
            }
            i$6 = end$1 - 1;
          }
        }
        var order = [], m;
        for (var i$7 = 0; i$7 < len; ) {
          if (countsAsLeft.test(types[i$7])) {
            var start = i$7;
            for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {
            }
            order.push(new BidiSpan(0, start, i$7));
          } else {
            var pos = i$7, at = order.length, isRTL = direction == "rtl" ? 1 : 0;
            for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {
            }
            for (var j$2 = pos; j$2 < i$7; ) {
              if (countsAsNum.test(types[j$2])) {
                if (pos < j$2) {
                  order.splice(at, 0, new BidiSpan(1, pos, j$2));
                  at += isRTL;
                }
                var nstart = j$2;
                for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {
                }
                order.splice(at, 0, new BidiSpan(2, nstart, j$2));
                at += isRTL;
                pos = j$2;
              } else {
                ++j$2;
              }
            }
            if (pos < i$7) {
              order.splice(at, 0, new BidiSpan(1, pos, i$7));
            }
          }
        }
        if (direction == "ltr") {
          if (order[0].level == 1 && (m = str.match(/^\s+/))) {
            order[0].from = m[0].length;
            order.unshift(new BidiSpan(0, 0, m[0].length));
          }
          if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
            lst(order).to -= m[0].length;
            order.push(new BidiSpan(0, len - m[0].length, len));
          }
        }
        return direction == "rtl" ? order.reverse() : order;
      };
    }();
    function getOrder(line, direction) {
      var order = line.order;
      if (order == null) {
        order = line.order = bidiOrdering(line.text, direction);
      }
      return order;
    }
    var noHandlers = [];
    var on = function(emitter, type, f) {
      if (emitter.addEventListener) {
        emitter.addEventListener(type, f, false);
      } else if (emitter.attachEvent) {
        emitter.attachEvent("on" + type, f);
      } else {
        var map2 = emitter._handlers || (emitter._handlers = {});
        map2[type] = (map2[type] || noHandlers).concat(f);
      }
    };
    function getHandlers(emitter, type) {
      return emitter._handlers && emitter._handlers[type] || noHandlers;
    }
    function off(emitter, type, f) {
      if (emitter.removeEventListener) {
        emitter.removeEventListener(type, f, false);
      } else if (emitter.detachEvent) {
        emitter.detachEvent("on" + type, f);
      } else {
        var map2 = emitter._handlers, arr = map2 && map2[type];
        if (arr) {
          var index = indexOf(arr, f);
          if (index > -1) {
            map2[type] = arr.slice(0, index).concat(arr.slice(index + 1));
          }
        }
      }
    }
    function signal(emitter, type) {
      var handlers = getHandlers(emitter, type);
      if (!handlers.length) {
        return;
      }
      var args = Array.prototype.slice.call(arguments, 2);
      for (var i2 = 0; i2 < handlers.length; ++i2) {
        handlers[i2].apply(null, args);
      }
    }
    function signalDOMEvent(cm, e, override) {
      if (typeof e == "string") {
        e = {type: e, preventDefault: function() {
          this.defaultPrevented = true;
        }};
      }
      signal(cm, override || e.type, cm, e);
      return e_defaultPrevented(e) || e.codemirrorIgnore;
    }
    function signalCursorActivity(cm) {
      var arr = cm._handlers && cm._handlers.cursorActivity;
      if (!arr) {
        return;
      }
      var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
      for (var i2 = 0; i2 < arr.length; ++i2) {
        if (indexOf(set, arr[i2]) == -1) {
          set.push(arr[i2]);
        }
      }
    }
    function hasHandler(emitter, type) {
      return getHandlers(emitter, type).length > 0;
    }
    function eventMixin(ctor) {
      ctor.prototype.on = function(type, f) {
        on(this, type, f);
      };
      ctor.prototype.off = function(type, f) {
        off(this, type, f);
      };
    }
    function e_preventDefault(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
    function e_stopPropagation(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    }
    function e_defaultPrevented(e) {
      return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
    }
    function e_stop(e) {
      e_preventDefault(e);
      e_stopPropagation(e);
    }
    function e_target(e) {
      return e.target || e.srcElement;
    }
    function e_button(e) {
      var b = e.which;
      if (b == null) {
        if (e.button & 1) {
          b = 1;
        } else if (e.button & 2) {
          b = 3;
        } else if (e.button & 4) {
          b = 2;
        }
      }
      if (mac && e.ctrlKey && b == 1) {
        b = 3;
      }
      return b;
    }
    var dragAndDrop = function() {
      if (ie && ie_version < 9) {
        return false;
      }
      var div = elt("div");
      return "draggable" in div || "dragDrop" in div;
    }();
    var zwspSupported;
    function zeroWidthElement(measure) {
      if (zwspSupported == null) {
        var test = elt("span", "​");
        removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
        if (measure.firstChild.offsetHeight != 0) {
          zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
        }
      }
      var node = zwspSupported ? elt("span", "​") : elt("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
      node.setAttribute("cm-text", "");
      return node;
    }
    var badBidiRects;
    function hasBadBidiRects(measure) {
      if (badBidiRects != null) {
        return badBidiRects;
      }
      var txt = removeChildrenAndAdd(measure, document.createTextNode("AخA"));
      var r0 = range(txt, 0, 1).getBoundingClientRect();
      var r1 = range(txt, 1, 2).getBoundingClientRect();
      removeChildren(measure);
      if (!r0 || r0.left == r0.right) {
        return false;
      }
      return badBidiRects = r1.right - r0.right < 3;
    }
    var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function(string) {
      var pos = 0, result = [], l = string.length;
      while (pos <= l) {
        var nl = string.indexOf("\n", pos);
        if (nl == -1) {
          nl = string.length;
        }
        var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
        var rt = line.indexOf("\r");
        if (rt != -1) {
          result.push(line.slice(0, rt));
          pos += rt + 1;
        } else {
          result.push(line);
          pos = nl + 1;
        }
      }
      return result;
    } : function(string) {
      return string.split(/\r\n?|\n/);
    };
    var hasSelection = window.getSelection ? function(te) {
      try {
        return te.selectionStart != te.selectionEnd;
      } catch (e) {
        return false;
      }
    } : function(te) {
      var range2;
      try {
        range2 = te.ownerDocument.selection.createRange();
      } catch (e) {
      }
      if (!range2 || range2.parentElement() != te) {
        return false;
      }
      return range2.compareEndPoints("StartToEnd", range2) != 0;
    };
    var hasCopyEvent = function() {
      var e = elt("div");
      if ("oncopy" in e) {
        return true;
      }
      e.setAttribute("oncopy", "return;");
      return typeof e.oncopy == "function";
    }();
    var badZoomedRects = null;
    function hasBadZoomedRects(measure) {
      if (badZoomedRects != null) {
        return badZoomedRects;
      }
      var node = removeChildrenAndAdd(measure, elt("span", "x"));
      var normal = node.getBoundingClientRect();
      var fromRange = range(node, 0, 1).getBoundingClientRect();
      return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
    }
    var modes = {}, mimeModes = {};
    function defineMode(name, mode) {
      if (arguments.length > 2) {
        mode.dependencies = Array.prototype.slice.call(arguments, 2);
      }
      modes[name] = mode;
    }
    function defineMIME(mime, spec) {
      mimeModes[mime] = spec;
    }
    function resolveMode(spec) {
      if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
        spec = mimeModes[spec];
      } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
        var found = mimeModes[spec.name];
        if (typeof found == "string") {
          found = {name: found};
        }
        spec = createObj(found, spec);
        spec.name = found.name;
      } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
        return resolveMode("application/xml");
      } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
        return resolveMode("application/json");
      }
      if (typeof spec == "string") {
        return {name: spec};
      } else {
        return spec || {name: "null"};
      }
    }
    function getMode(options, spec) {
      spec = resolveMode(spec);
      var mfactory = modes[spec.name];
      if (!mfactory) {
        return getMode(options, "text/plain");
      }
      var modeObj = mfactory(options, spec);
      if (modeExtensions.hasOwnProperty(spec.name)) {
        var exts = modeExtensions[spec.name];
        for (var prop2 in exts) {
          if (!exts.hasOwnProperty(prop2)) {
            continue;
          }
          if (modeObj.hasOwnProperty(prop2)) {
            modeObj["_" + prop2] = modeObj[prop2];
          }
          modeObj[prop2] = exts[prop2];
        }
      }
      modeObj.name = spec.name;
      if (spec.helperType) {
        modeObj.helperType = spec.helperType;
      }
      if (spec.modeProps) {
        for (var prop$1 in spec.modeProps) {
          modeObj[prop$1] = spec.modeProps[prop$1];
        }
      }
      return modeObj;
    }
    var modeExtensions = {};
    function extendMode(mode, properties) {
      var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
      copyObj(properties, exts);
    }
    function copyState(mode, state) {
      if (state === true) {
        return state;
      }
      if (mode.copyState) {
        return mode.copyState(state);
      }
      var nstate = {};
      for (var n in state) {
        var val = state[n];
        if (val instanceof Array) {
          val = val.concat([]);
        }
        nstate[n] = val;
      }
      return nstate;
    }
    function innerMode(mode, state) {
      var info;
      while (mode.innerMode) {
        info = mode.innerMode(state);
        if (!info || info.mode == mode) {
          break;
        }
        state = info.state;
        mode = info.mode;
      }
      return info || {mode, state};
    }
    function startState(mode, a1, a2) {
      return mode.startState ? mode.startState(a1, a2) : true;
    }
    var StringStream = function(string, tabSize, lineOracle) {
      this.pos = this.start = 0;
      this.string = string;
      this.tabSize = tabSize || 8;
      this.lastColumnPos = this.lastColumnValue = 0;
      this.lineStart = 0;
      this.lineOracle = lineOracle;
    };
    StringStream.prototype.eol = function() {
      return this.pos >= this.string.length;
    };
    StringStream.prototype.sol = function() {
      return this.pos == this.lineStart;
    };
    StringStream.prototype.peek = function() {
      return this.string.charAt(this.pos) || void 0;
    };
    StringStream.prototype.next = function() {
      if (this.pos < this.string.length) {
        return this.string.charAt(this.pos++);
      }
    };
    StringStream.prototype.eat = function(match) {
      var ch = this.string.charAt(this.pos);
      var ok;
      if (typeof match == "string") {
        ok = ch == match;
      } else {
        ok = ch && (match.test ? match.test(ch) : match(ch));
      }
      if (ok) {
        ++this.pos;
        return ch;
      }
    };
    StringStream.prototype.eatWhile = function(match) {
      var start = this.pos;
      while (this.eat(match)) {
      }
      return this.pos > start;
    };
    StringStream.prototype.eatSpace = function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
        ++this.pos;
      }
      return this.pos > start;
    };
    StringStream.prototype.skipToEnd = function() {
      this.pos = this.string.length;
    };
    StringStream.prototype.skipTo = function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {
        this.pos = found;
        return true;
      }
    };
    StringStream.prototype.backUp = function(n) {
      this.pos -= n;
    };
    StringStream.prototype.column = function() {
      if (this.lastColumnPos < this.start) {
        this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
        this.lastColumnPos = this.start;
      }
      return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    };
    StringStream.prototype.indentation = function() {
      return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    };
    StringStream.prototype.match = function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function(str) {
          return caseInsensitive ? str.toLowerCase() : str;
        };
        var substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) {
            this.pos += pattern.length;
          }
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) {
          return null;
        }
        if (match && consume !== false) {
          this.pos += match[0].length;
        }
        return match;
      }
    };
    StringStream.prototype.current = function() {
      return this.string.slice(this.start, this.pos);
    };
    StringStream.prototype.hideFirstChars = function(n, inner) {
      this.lineStart += n;
      try {
        return inner();
      } finally {
        this.lineStart -= n;
      }
    };
    StringStream.prototype.lookAhead = function(n) {
      var oracle = this.lineOracle;
      return oracle && oracle.lookAhead(n);
    };
    StringStream.prototype.baseToken = function() {
      var oracle = this.lineOracle;
      return oracle && oracle.baseToken(this.pos);
    };
    function getLine(doc2, n) {
      n -= doc2.first;
      if (n < 0 || n >= doc2.size) {
        throw new Error("There is no line " + (n + doc2.first) + " in the document.");
      }
      var chunk = doc2;
      while (!chunk.lines) {
        for (var i2 = 0; ; ++i2) {
          var child = chunk.children[i2], sz = child.chunkSize();
          if (n < sz) {
            chunk = child;
            break;
          }
          n -= sz;
        }
      }
      return chunk.lines[n];
    }
    function getBetween(doc2, start, end) {
      var out = [], n = start.line;
      doc2.iter(start.line, end.line + 1, function(line) {
        var text = line.text;
        if (n == end.line) {
          text = text.slice(0, end.ch);
        }
        if (n == start.line) {
          text = text.slice(start.ch);
        }
        out.push(text);
        ++n;
      });
      return out;
    }
    function getLines(doc2, from, to) {
      var out = [];
      doc2.iter(from, to, function(line) {
        out.push(line.text);
      });
      return out;
    }
    function updateLineHeight(line, height) {
      var diff = height - line.height;
      if (diff) {
        for (var n = line; n; n = n.parent) {
          n.height += diff;
        }
      }
    }
    function lineNo(line) {
      if (line.parent == null) {
        return null;
      }
      var cur = line.parent, no = indexOf(cur.lines, line);
      for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
        for (var i2 = 0; ; ++i2) {
          if (chunk.children[i2] == cur) {
            break;
          }
          no += chunk.children[i2].chunkSize();
        }
      }
      return no + cur.first;
    }
    function lineAtHeight(chunk, h) {
      var n = chunk.first;
      outer:
        do {
          for (var i$12 = 0; i$12 < chunk.children.length; ++i$12) {
            var child = chunk.children[i$12], ch = child.height;
            if (h < ch) {
              chunk = child;
              continue outer;
            }
            h -= ch;
            n += child.chunkSize();
          }
          return n;
        } while (!chunk.lines);
      var i2 = 0;
      for (; i2 < chunk.lines.length; ++i2) {
        var line = chunk.lines[i2], lh = line.height;
        if (h < lh) {
          break;
        }
        h -= lh;
      }
      return n + i2;
    }
    function isLine(doc2, l) {
      return l >= doc2.first && l < doc2.first + doc2.size;
    }
    function lineNumberFor(options, i2) {
      return String(options.lineNumberFormatter(i2 + options.firstLineNumber));
    }
    function Pos(line, ch, sticky) {
      if (sticky === void 0)
        sticky = null;
      if (!(this instanceof Pos)) {
        return new Pos(line, ch, sticky);
      }
      this.line = line;
      this.ch = ch;
      this.sticky = sticky;
    }
    function cmp(a, b) {
      return a.line - b.line || a.ch - b.ch;
    }
    function equalCursorPos(a, b) {
      return a.sticky == b.sticky && cmp(a, b) == 0;
    }
    function copyPos(x) {
      return Pos(x.line, x.ch);
    }
    function maxPos(a, b) {
      return cmp(a, b) < 0 ? b : a;
    }
    function minPos(a, b) {
      return cmp(a, b) < 0 ? a : b;
    }
    function clipLine(doc2, n) {
      return Math.max(doc2.first, Math.min(n, doc2.first + doc2.size - 1));
    }
    function clipPos(doc2, pos) {
      if (pos.line < doc2.first) {
        return Pos(doc2.first, 0);
      }
      var last = doc2.first + doc2.size - 1;
      if (pos.line > last) {
        return Pos(last, getLine(doc2, last).text.length);
      }
      return clipToLen(pos, getLine(doc2, pos.line).text.length);
    }
    function clipToLen(pos, linelen) {
      var ch = pos.ch;
      if (ch == null || ch > linelen) {
        return Pos(pos.line, linelen);
      } else if (ch < 0) {
        return Pos(pos.line, 0);
      } else {
        return pos;
      }
    }
    function clipPosArray(doc2, array) {
      var out = [];
      for (var i2 = 0; i2 < array.length; i2++) {
        out[i2] = clipPos(doc2, array[i2]);
      }
      return out;
    }
    var SavedContext = function(state, lookAhead) {
      this.state = state;
      this.lookAhead = lookAhead;
    };
    var Context = function(doc2, state, line, lookAhead) {
      this.state = state;
      this.doc = doc2;
      this.line = line;
      this.maxLookAhead = lookAhead || 0;
      this.baseTokens = null;
      this.baseTokenPos = 1;
    };
    Context.prototype.lookAhead = function(n) {
      var line = this.doc.getLine(this.line + n);
      if (line != null && n > this.maxLookAhead) {
        this.maxLookAhead = n;
      }
      return line;
    };
    Context.prototype.baseToken = function(n) {
      if (!this.baseTokens) {
        return null;
      }
      while (this.baseTokens[this.baseTokenPos] <= n) {
        this.baseTokenPos += 2;
      }
      var type = this.baseTokens[this.baseTokenPos + 1];
      return {
        type: type && type.replace(/( |^)overlay .*/, ""),
        size: this.baseTokens[this.baseTokenPos] - n
      };
    };
    Context.prototype.nextLine = function() {
      this.line++;
      if (this.maxLookAhead > 0) {
        this.maxLookAhead--;
      }
    };
    Context.fromSaved = function(doc2, saved, line) {
      if (saved instanceof SavedContext) {
        return new Context(doc2, copyState(doc2.mode, saved.state), line, saved.lookAhead);
      } else {
        return new Context(doc2, copyState(doc2.mode, saved), line);
      }
    };
    Context.prototype.save = function(copy) {
      var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
      return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state;
    };
    function highlightLine(cm, line, context, forceToEnd) {
      var st = [cm.state.modeGen], lineClasses = {};
      runMode(cm, line.text, cm.doc.mode, context, function(end, style) {
        return st.push(end, style);
      }, lineClasses, forceToEnd);
      var state = context.state;
      var loop = function(o2) {
        context.baseTokens = st;
        var overlay = cm.state.overlays[o2], i2 = 1, at = 0;
        context.state = true;
        runMode(cm, line.text, overlay.mode, context, function(end, style) {
          var start = i2;
          while (at < end) {
            var i_end = st[i2];
            if (i_end > end) {
              st.splice(i2, 1, end, st[i2 + 1], i_end);
            }
            i2 += 2;
            at = Math.min(end, i_end);
          }
          if (!style) {
            return;
          }
          if (overlay.opaque) {
            st.splice(start, i2 - start, end, "overlay " + style);
            i2 = start + 2;
          } else {
            for (; start < i2; start += 2) {
              var cur = st[start + 1];
              st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
            }
          }
        }, lineClasses);
        context.state = state;
        context.baseTokens = null;
        context.baseTokenPos = 1;
      };
      for (var o = 0; o < cm.state.overlays.length; ++o)
        loop(o);
      return {styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null};
    }
    function getLineStyles(cm, line, updateFrontier) {
      if (!line.styles || line.styles[0] != cm.state.modeGen) {
        var context = getContextBefore(cm, lineNo(line));
        var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
        var result = highlightLine(cm, line, context);
        if (resetState) {
          context.state = resetState;
        }
        line.stateAfter = context.save(!resetState);
        line.styles = result.styles;
        if (result.classes) {
          line.styleClasses = result.classes;
        } else if (line.styleClasses) {
          line.styleClasses = null;
        }
        if (updateFrontier === cm.doc.highlightFrontier) {
          cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier);
        }
      }
      return line.styles;
    }
    function getContextBefore(cm, n, precise) {
      var doc2 = cm.doc, display = cm.display;
      if (!doc2.mode.startState) {
        return new Context(doc2, true, n);
      }
      var start = findStartLine(cm, n, precise);
      var saved = start > doc2.first && getLine(doc2, start - 1).stateAfter;
      var context = saved ? Context.fromSaved(doc2, saved, start) : new Context(doc2, startState(doc2.mode), start);
      doc2.iter(start, n, function(line) {
        processLine(cm, line.text, context);
        var pos = context.line;
        line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
        context.nextLine();
      });
      if (precise) {
        doc2.modeFrontier = context.line;
      }
      return context;
    }
    function processLine(cm, text, context, startAt) {
      var mode = cm.doc.mode;
      var stream = new StringStream(text, cm.options.tabSize, context);
      stream.start = stream.pos = startAt || 0;
      if (text == "") {
        callBlankLine(mode, context.state);
      }
      while (!stream.eol()) {
        readToken(mode, stream, context.state);
        stream.start = stream.pos;
      }
    }
    function callBlankLine(mode, state) {
      if (mode.blankLine) {
        return mode.blankLine(state);
      }
      if (!mode.innerMode) {
        return;
      }
      var inner = innerMode(mode, state);
      if (inner.mode.blankLine) {
        return inner.mode.blankLine(inner.state);
      }
    }
    function readToken(mode, stream, state, inner) {
      for (var i2 = 0; i2 < 10; i2++) {
        if (inner) {
          inner[0] = innerMode(mode, state).mode;
        }
        var style = mode.token(stream, state);
        if (stream.pos > stream.start) {
          return style;
        }
      }
      throw new Error("Mode " + mode.name + " failed to advance stream.");
    }
    var Token = function(stream, type, state) {
      this.start = stream.start;
      this.end = stream.pos;
      this.string = stream.current();
      this.type = type || null;
      this.state = state;
    };
    function takeToken(cm, pos, precise, asArray) {
      var doc2 = cm.doc, mode = doc2.mode, style;
      pos = clipPos(doc2, pos);
      var line = getLine(doc2, pos.line), context = getContextBefore(cm, pos.line, precise);
      var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
      if (asArray) {
        tokens = [];
      }
      while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
        stream.start = stream.pos;
        style = readToken(mode, stream, context.state);
        if (asArray) {
          tokens.push(new Token(stream, style, copyState(doc2.mode, context.state)));
        }
      }
      return asArray ? tokens : new Token(stream, style, context.state);
    }
    function extractLineClasses(type, output) {
      if (type) {
        for (; ; ) {
          var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
          if (!lineClass) {
            break;
          }
          type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
          var prop2 = lineClass[1] ? "bgClass" : "textClass";
          if (output[prop2] == null) {
            output[prop2] = lineClass[2];
          } else if (!new RegExp("(?:^|\\s)" + lineClass[2] + "(?:$|\\s)").test(output[prop2])) {
            output[prop2] += " " + lineClass[2];
          }
        }
      }
      return type;
    }
    function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
      var flattenSpans = mode.flattenSpans;
      if (flattenSpans == null) {
        flattenSpans = cm.options.flattenSpans;
      }
      var curStart = 0, curStyle = null;
      var stream = new StringStream(text, cm.options.tabSize, context), style;
      var inner = cm.options.addModeClass && [null];
      if (text == "") {
        extractLineClasses(callBlankLine(mode, context.state), lineClasses);
      }
      while (!stream.eol()) {
        if (stream.pos > cm.options.maxHighlightLength) {
          flattenSpans = false;
          if (forceToEnd) {
            processLine(cm, text, context, stream.pos);
          }
          stream.pos = text.length;
          style = null;
        } else {
          style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
        }
        if (inner) {
          var mName = inner[0].name;
          if (mName) {
            style = "m-" + (style ? mName + " " + style : mName);
          }
        }
        if (!flattenSpans || curStyle != style) {
          while (curStart < stream.start) {
            curStart = Math.min(stream.start, curStart + 5e3);
            f(curStart, curStyle);
          }
          curStyle = style;
        }
        stream.start = stream.pos;
      }
      while (curStart < stream.pos) {
        var pos = Math.min(stream.pos, curStart + 5e3);
        f(pos, curStyle);
        curStart = pos;
      }
    }
    function findStartLine(cm, n, precise) {
      var minindent, minline, doc2 = cm.doc;
      var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1e3 : 100);
      for (var search2 = n; search2 > lim; --search2) {
        if (search2 <= doc2.first) {
          return doc2.first;
        }
        var line = getLine(doc2, search2 - 1), after = line.stateAfter;
        if (after && (!precise || search2 + (after instanceof SavedContext ? after.lookAhead : 0) <= doc2.modeFrontier)) {
          return search2;
        }
        var indented = countColumn(line.text, null, cm.options.tabSize);
        if (minline == null || minindent > indented) {
          minline = search2 - 1;
          minindent = indented;
        }
      }
      return minline;
    }
    function retreatFrontier(doc2, n) {
      doc2.modeFrontier = Math.min(doc2.modeFrontier, n);
      if (doc2.highlightFrontier < n - 10) {
        return;
      }
      var start = doc2.first;
      for (var line = n - 1; line > start; line--) {
        var saved = getLine(doc2, line).stateAfter;
        if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
          start = line + 1;
          break;
        }
      }
      doc2.highlightFrontier = Math.min(doc2.highlightFrontier, start);
    }
    var sawReadOnlySpans = false, sawCollapsedSpans = false;
    function seeReadOnlySpans() {
      sawReadOnlySpans = true;
    }
    function seeCollapsedSpans() {
      sawCollapsedSpans = true;
    }
    function MarkedSpan(marker, from, to) {
      this.marker = marker;
      this.from = from;
      this.to = to;
    }
    function getMarkedSpanFor(spans, marker) {
      if (spans) {
        for (var i2 = 0; i2 < spans.length; ++i2) {
          var span = spans[i2];
          if (span.marker == marker) {
            return span;
          }
        }
      }
    }
    function removeMarkedSpan(spans, span) {
      var r;
      for (var i2 = 0; i2 < spans.length; ++i2) {
        if (spans[i2] != span) {
          (r || (r = [])).push(spans[i2]);
        }
      }
      return r;
    }
    function addMarkedSpan(line, span, op) {
      var inThisOp = op && window.WeakSet && (op.markedSpans || (op.markedSpans = new WeakSet()));
      if (inThisOp && line.markedSpans && inThisOp.has(line.markedSpans)) {
        line.markedSpans.push(span);
      } else {
        line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
        if (inThisOp) {
          inThisOp.add(line.markedSpans);
        }
      }
      span.marker.attachLine(line);
    }
    function markedSpansBefore(old, startCh, isInsert) {
      var nw;
      if (old) {
        for (var i2 = 0; i2 < old.length; ++i2) {
          var span = old[i2], marker = span.marker;
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
          if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
            var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
            (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
          }
        }
      }
      return nw;
    }
    function markedSpansAfter(old, endCh, isInsert) {
      var nw;
      if (old) {
        for (var i2 = 0; i2 < old.length; ++i2) {
          var span = old[i2], marker = span.marker;
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
          if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
            var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
            (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh, span.to == null ? null : span.to - endCh));
          }
        }
      }
      return nw;
    }
    function stretchSpansOverChange(doc2, change) {
      if (change.full) {
        return null;
      }
      var oldFirst = isLine(doc2, change.from.line) && getLine(doc2, change.from.line).markedSpans;
      var oldLast = isLine(doc2, change.to.line) && getLine(doc2, change.to.line).markedSpans;
      if (!oldFirst && !oldLast) {
        return null;
      }
      var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
      var first = markedSpansBefore(oldFirst, startCh, isInsert);
      var last = markedSpansAfter(oldLast, endCh, isInsert);
      var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
      if (first) {
        for (var i2 = 0; i2 < first.length; ++i2) {
          var span = first[i2];
          if (span.to == null) {
            var found = getMarkedSpanFor(last, span.marker);
            if (!found) {
              span.to = startCh;
            } else if (sameLine) {
              span.to = found.to == null ? null : found.to + offset;
            }
          }
        }
      }
      if (last) {
        for (var i$12 = 0; i$12 < last.length; ++i$12) {
          var span$1 = last[i$12];
          if (span$1.to != null) {
            span$1.to += offset;
          }
          if (span$1.from == null) {
            var found$1 = getMarkedSpanFor(first, span$1.marker);
            if (!found$1) {
              span$1.from = offset;
              if (sameLine) {
                (first || (first = [])).push(span$1);
              }
            }
          } else {
            span$1.from += offset;
            if (sameLine) {
              (first || (first = [])).push(span$1);
            }
          }
        }
      }
      if (first) {
        first = clearEmptySpans(first);
      }
      if (last && last != first) {
        last = clearEmptySpans(last);
      }
      var newMarkers = [first];
      if (!sameLine) {
        var gap = change.text.length - 2, gapMarkers;
        if (gap > 0 && first) {
          for (var i$22 = 0; i$22 < first.length; ++i$22) {
            if (first[i$22].to == null) {
              (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$22].marker, null, null));
            }
          }
        }
        for (var i$3 = 0; i$3 < gap; ++i$3) {
          newMarkers.push(gapMarkers);
        }
        newMarkers.push(last);
      }
      return newMarkers;
    }
    function clearEmptySpans(spans) {
      for (var i2 = 0; i2 < spans.length; ++i2) {
        var span = spans[i2];
        if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
          spans.splice(i2--, 1);
        }
      }
      if (!spans.length) {
        return null;
      }
      return spans;
    }
    function removeReadOnlyRanges(doc2, from, to) {
      var markers = null;
      doc2.iter(from.line, to.line + 1, function(line) {
        if (line.markedSpans) {
          for (var i3 = 0; i3 < line.markedSpans.length; ++i3) {
            var mark = line.markedSpans[i3].marker;
            if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
              (markers || (markers = [])).push(mark);
            }
          }
        }
      });
      if (!markers) {
        return null;
      }
      var parts = [{from, to}];
      for (var i2 = 0; i2 < markers.length; ++i2) {
        var mk = markers[i2], m = mk.find(0);
        for (var j = 0; j < parts.length; ++j) {
          var p = parts[j];
          if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) {
            continue;
          }
          var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
          if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
            newParts.push({from: p.from, to: m.from});
          }
          if (dto > 0 || !mk.inclusiveRight && !dto) {
            newParts.push({from: m.to, to: p.to});
          }
          parts.splice.apply(parts, newParts);
          j += newParts.length - 3;
        }
      }
      return parts;
    }
    function detachMarkedSpans(line) {
      var spans = line.markedSpans;
      if (!spans) {
        return;
      }
      for (var i2 = 0; i2 < spans.length; ++i2) {
        spans[i2].marker.detachLine(line);
      }
      line.markedSpans = null;
    }
    function attachMarkedSpans(line, spans) {
      if (!spans) {
        return;
      }
      for (var i2 = 0; i2 < spans.length; ++i2) {
        spans[i2].marker.attachLine(line);
      }
      line.markedSpans = spans;
    }
    function extraLeft(marker) {
      return marker.inclusiveLeft ? -1 : 0;
    }
    function extraRight(marker) {
      return marker.inclusiveRight ? 1 : 0;
    }
    function compareCollapsedMarkers(a, b) {
      var lenDiff = a.lines.length - b.lines.length;
      if (lenDiff != 0) {
        return lenDiff;
      }
      var aPos = a.find(), bPos = b.find();
      var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
      if (fromCmp) {
        return -fromCmp;
      }
      var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
      if (toCmp) {
        return toCmp;
      }
      return b.id - a.id;
    }
    function collapsedSpanAtSide(line, start) {
      var sps = sawCollapsedSpans && line.markedSpans, found;
      if (sps) {
        for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
          sp = sps[i2];
          if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
            found = sp.marker;
          }
        }
      }
      return found;
    }
    function collapsedSpanAtStart(line) {
      return collapsedSpanAtSide(line, true);
    }
    function collapsedSpanAtEnd(line) {
      return collapsedSpanAtSide(line, false);
    }
    function collapsedSpanAround(line, ch) {
      var sps = sawCollapsedSpans && line.markedSpans, found;
      if (sps) {
        for (var i2 = 0; i2 < sps.length; ++i2) {
          var sp = sps[i2];
          if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
            found = sp.marker;
          }
        }
      }
      return found;
    }
    function conflictingCollapsedRange(doc2, lineNo2, from, to, marker) {
      var line = getLine(doc2, lineNo2);
      var sps = sawCollapsedSpans && line.markedSpans;
      if (sps) {
        for (var i2 = 0; i2 < sps.length; ++i2) {
          var sp = sps[i2];
          if (!sp.marker.collapsed) {
            continue;
          }
          var found = sp.marker.find(0);
          var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
          var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
          if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
            continue;
          }
          if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
            return true;
          }
        }
      }
    }
    function visualLine(line) {
      var merged;
      while (merged = collapsedSpanAtStart(line)) {
        line = merged.find(-1, true).line;
      }
      return line;
    }
    function visualLineEnd(line) {
      var merged;
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
      }
      return line;
    }
    function visualLineContinued(line) {
      var merged, lines;
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
        (lines || (lines = [])).push(line);
      }
      return lines;
    }
    function visualLineNo(doc2, lineN) {
      var line = getLine(doc2, lineN), vis = visualLine(line);
      if (line == vis) {
        return lineN;
      }
      return lineNo(vis);
    }
    function visualLineEndNo(doc2, lineN) {
      if (lineN > doc2.lastLine()) {
        return lineN;
      }
      var line = getLine(doc2, lineN), merged;
      if (!lineIsHidden(doc2, line)) {
        return lineN;
      }
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
      }
      return lineNo(line) + 1;
    }
    function lineIsHidden(doc2, line) {
      var sps = sawCollapsedSpans && line.markedSpans;
      if (sps) {
        for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
          sp = sps[i2];
          if (!sp.marker.collapsed) {
            continue;
          }
          if (sp.from == null) {
            return true;
          }
          if (sp.marker.widgetNode) {
            continue;
          }
          if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc2, line, sp)) {
            return true;
          }
        }
      }
    }
    function lineIsHiddenInner(doc2, line, span) {
      if (span.to == null) {
        var end = span.marker.find(1, true);
        return lineIsHiddenInner(doc2, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
      }
      if (span.marker.inclusiveRight && span.to == line.text.length) {
        return true;
      }
      for (var sp = void 0, i2 = 0; i2 < line.markedSpans.length; ++i2) {
        sp = line.markedSpans[i2];
        if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc2, line, sp)) {
          return true;
        }
      }
    }
    function heightAtLine(lineObj) {
      lineObj = visualLine(lineObj);
      var h = 0, chunk = lineObj.parent;
      for (var i2 = 0; i2 < chunk.lines.length; ++i2) {
        var line = chunk.lines[i2];
        if (line == lineObj) {
          break;
        } else {
          h += line.height;
        }
      }
      for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
        for (var i$12 = 0; i$12 < p.children.length; ++i$12) {
          var cur = p.children[i$12];
          if (cur == chunk) {
            break;
          } else {
            h += cur.height;
          }
        }
      }
      return h;
    }
    function lineLength(line) {
      if (line.height == 0) {
        return 0;
      }
      var len = line.text.length, merged, cur = line;
      while (merged = collapsedSpanAtStart(cur)) {
        var found = merged.find(0, true);
        cur = found.from.line;
        len += found.from.ch - found.to.ch;
      }
      cur = line;
      while (merged = collapsedSpanAtEnd(cur)) {
        var found$1 = merged.find(0, true);
        len -= cur.text.length - found$1.from.ch;
        cur = found$1.to.line;
        len += cur.text.length - found$1.to.ch;
      }
      return len;
    }
    function findMaxLine(cm) {
      var d = cm.display, doc2 = cm.doc;
      d.maxLine = getLine(doc2, doc2.first);
      d.maxLineLength = lineLength(d.maxLine);
      d.maxLineChanged = true;
      doc2.iter(function(line) {
        var len = lineLength(line);
        if (len > d.maxLineLength) {
          d.maxLineLength = len;
          d.maxLine = line;
        }
      });
    }
    var Line = function(text, markedSpans, estimateHeight2) {
      this.text = text;
      attachMarkedSpans(this, markedSpans);
      this.height = estimateHeight2 ? estimateHeight2(this) : 1;
    };
    Line.prototype.lineNo = function() {
      return lineNo(this);
    };
    eventMixin(Line);
    function updateLine(line, text, markedSpans, estimateHeight2) {
      line.text = text;
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      if (line.styles) {
        line.styles = null;
      }
      if (line.order != null) {
        line.order = null;
      }
      detachMarkedSpans(line);
      attachMarkedSpans(line, markedSpans);
      var estHeight = estimateHeight2 ? estimateHeight2(line) : 1;
      if (estHeight != line.height) {
        updateLineHeight(line, estHeight);
      }
    }
    function cleanUpLine(line) {
      line.parent = null;
      detachMarkedSpans(line);
    }
    var styleToClassCache = {}, styleToClassCacheWithMode = {};
    function interpretTokenStyle(style, options) {
      if (!style || /^\s*$/.test(style)) {
        return null;
      }
      var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
      return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
    }
    function buildLineContent(cm, lineView) {
      var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
      var builder = {
        pre: eltP("pre", [content], "CodeMirror-line"),
        content,
        col: 0,
        pos: 0,
        cm,
        trailingSpace: false,
        splitSpaces: cm.getOption("lineWrapping")
      };
      lineView.measure = {};
      for (var i2 = 0; i2 <= (lineView.rest ? lineView.rest.length : 0); i2++) {
        var line = i2 ? lineView.rest[i2 - 1] : lineView.line, order = void 0;
        builder.pos = 0;
        builder.addToken = buildToken;
        if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction))) {
          builder.addToken = buildTokenBadBidi(builder.addToken, order);
        }
        builder.map = [];
        var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
        insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
        if (line.styleClasses) {
          if (line.styleClasses.bgClass) {
            builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
          }
          if (line.styleClasses.textClass) {
            builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
          }
        }
        if (builder.map.length == 0) {
          builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
        }
        if (i2 == 0) {
          lineView.measure.map = builder.map;
          lineView.measure.cache = {};
        } else {
          (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
          (lineView.measure.caches || (lineView.measure.caches = [])).push({});
        }
      }
      if (webkit) {
        var last = builder.content.lastChild;
        if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
          builder.content.className = "cm-tab-wrap-hack";
        }
      }
      signal(cm, "renderLine", cm, lineView.line, builder.pre);
      if (builder.pre.className) {
        builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
      }
      return builder;
    }
    function defaultSpecialCharPlaceholder(ch) {
      var token = elt("span", "•", "cm-invalidchar");
      token.title = "\\u" + ch.charCodeAt(0).toString(16);
      token.setAttribute("aria-label", token.title);
      return token;
    }
    function buildToken(builder, text, style, startStyle, endStyle, css2, attributes) {
      if (!text) {
        return;
      }
      var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
      var special = builder.cm.state.specialChars, mustWrap = false;
      var content;
      if (!special.test(text)) {
        builder.col += text.length;
        content = document.createTextNode(displayText);
        builder.map.push(builder.pos, builder.pos + text.length, content);
        if (ie && ie_version < 9) {
          mustWrap = true;
        }
        builder.pos += text.length;
      } else {
        content = document.createDocumentFragment();
        var pos = 0;
        while (true) {
          special.lastIndex = pos;
          var m = special.exec(text);
          var skipped = m ? m.index - pos : text.length - pos;
          if (skipped) {
            var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
            if (ie && ie_version < 9) {
              content.appendChild(elt("span", [txt]));
            } else {
              content.appendChild(txt);
            }
            builder.map.push(builder.pos, builder.pos + skipped, txt);
            builder.col += skipped;
            builder.pos += skipped;
          }
          if (!m) {
            break;
          }
          pos += skipped + 1;
          var txt$1 = void 0;
          if (m[0] == "	") {
            var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
            txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
            txt$1.setAttribute("role", "presentation");
            txt$1.setAttribute("cm-text", "	");
            builder.col += tabWidth;
          } else if (m[0] == "\r" || m[0] == "\n") {
            txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "␍" : "␤", "cm-invalidchar"));
            txt$1.setAttribute("cm-text", m[0]);
            builder.col += 1;
          } else {
            txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
            txt$1.setAttribute("cm-text", m[0]);
            if (ie && ie_version < 9) {
              content.appendChild(elt("span", [txt$1]));
            } else {
              content.appendChild(txt$1);
            }
            builder.col += 1;
          }
          builder.map.push(builder.pos, builder.pos + 1, txt$1);
          builder.pos++;
        }
      }
      builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
      if (style || startStyle || endStyle || mustWrap || css2 || attributes) {
        var fullStyle = style || "";
        if (startStyle) {
          fullStyle += startStyle;
        }
        if (endStyle) {
          fullStyle += endStyle;
        }
        var token = elt("span", [content], fullStyle, css2);
        if (attributes) {
          for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class") {
              token.setAttribute(attr, attributes[attr]);
            }
          }
        }
        return builder.content.appendChild(token);
      }
      builder.content.appendChild(content);
    }
    function splitSpaces(text, trailingBefore) {
      if (text.length > 1 && !/  /.test(text)) {
        return text;
      }
      var spaceBefore = trailingBefore, result = "";
      for (var i2 = 0; i2 < text.length; i2++) {
        var ch = text.charAt(i2);
        if (ch == " " && spaceBefore && (i2 == text.length - 1 || text.charCodeAt(i2 + 1) == 32)) {
          ch = " ";
        }
        result += ch;
        spaceBefore = ch == " ";
      }
      return result;
    }
    function buildTokenBadBidi(inner, order) {
      return function(builder, text, style, startStyle, endStyle, css2, attributes) {
        style = style ? style + " cm-force-border" : "cm-force-border";
        var start = builder.pos, end = start + text.length;
        for (; ; ) {
          var part = void 0;
          for (var i2 = 0; i2 < order.length; i2++) {
            part = order[i2];
            if (part.to > start && part.from <= start) {
              break;
            }
          }
          if (part.to >= end) {
            return inner(builder, text, style, startStyle, endStyle, css2, attributes);
          }
          inner(builder, text.slice(0, part.to - start), style, startStyle, null, css2, attributes);
          startStyle = null;
          text = text.slice(part.to - start);
          start = part.to;
        }
      };
    }
    function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
      var widget = !ignoreWidget && marker.widgetNode;
      if (widget) {
        builder.map.push(builder.pos, builder.pos + size, widget);
      }
      if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
        if (!widget) {
          widget = builder.content.appendChild(document.createElement("span"));
        }
        widget.setAttribute("cm-marker", marker.id);
      }
      if (widget) {
        builder.cm.display.input.setUneditable(widget);
        builder.content.appendChild(widget);
      }
      builder.pos += size;
      builder.trailingSpace = false;
    }
    function insertLineContent(line, builder, styles) {
      var spans = line.markedSpans, allText = line.text, at = 0;
      if (!spans) {
        for (var i$12 = 1; i$12 < styles.length; i$12 += 2) {
          builder.addToken(builder, allText.slice(at, at = styles[i$12]), interpretTokenStyle(styles[i$12 + 1], builder.cm.options));
        }
        return;
      }
      var len = allText.length, pos = 0, i2 = 1, text = "", style, css2;
      var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
      for (; ; ) {
        if (nextChange == pos) {
          spanStyle = spanEndStyle = spanStartStyle = css2 = "";
          attributes = null;
          collapsed = null;
          nextChange = Infinity;
          var foundBookmarks = [], endStyles = void 0;
          for (var j = 0; j < spans.length; ++j) {
            var sp = spans[j], m = sp.marker;
            if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
              foundBookmarks.push(m);
            } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
              if (sp.to != null && sp.to != pos && nextChange > sp.to) {
                nextChange = sp.to;
                spanEndStyle = "";
              }
              if (m.className) {
                spanStyle += " " + m.className;
              }
              if (m.css) {
                css2 = (css2 ? css2 + ";" : "") + m.css;
              }
              if (m.startStyle && sp.from == pos) {
                spanStartStyle += " " + m.startStyle;
              }
              if (m.endStyle && sp.to == nextChange) {
                (endStyles || (endStyles = [])).push(m.endStyle, sp.to);
              }
              if (m.title) {
                (attributes || (attributes = {})).title = m.title;
              }
              if (m.attributes) {
                for (var attr in m.attributes) {
                  (attributes || (attributes = {}))[attr] = m.attributes[attr];
                }
              }
              if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) {
                collapsed = sp;
              }
            } else if (sp.from > pos && nextChange > sp.from) {
              nextChange = sp.from;
            }
          }
          if (endStyles) {
            for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
              if (endStyles[j$1 + 1] == nextChange) {
                spanEndStyle += " " + endStyles[j$1];
              }
            }
          }
          if (!collapsed || collapsed.from == pos) {
            for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
              buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
            }
          }
          if (collapsed && (collapsed.from || 0) == pos) {
            buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos, collapsed.marker, collapsed.from == null);
            if (collapsed.to == null) {
              return;
            }
            if (collapsed.to == pos) {
              collapsed = false;
            }
          }
        }
        if (pos >= len) {
          break;
        }
        var upto = Math.min(len, nextChange);
        while (true) {
          if (text) {
            var end = pos + text.length;
            if (!collapsed) {
              var tokenText = end > upto ? text.slice(0, upto - pos) : text;
              builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", css2, attributes);
            }
            if (end >= upto) {
              text = text.slice(upto - pos);
              pos = upto;
              break;
            }
            pos = end;
            spanStartStyle = "";
          }
          text = allText.slice(at, at = styles[i2++]);
          style = interpretTokenStyle(styles[i2++], builder.cm.options);
        }
      }
    }
    function LineView(doc2, line, lineN) {
      this.line = line;
      this.rest = visualLineContinued(line);
      this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
      this.node = this.text = null;
      this.hidden = lineIsHidden(doc2, line);
    }
    function buildViewArray(cm, from, to) {
      var array = [], nextPos;
      for (var pos = from; pos < to; pos = nextPos) {
        var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
        nextPos = pos + view.size;
        array.push(view);
      }
      return array;
    }
    var operationGroup = null;
    function pushOperation(op) {
      if (operationGroup) {
        operationGroup.ops.push(op);
      } else {
        op.ownsGroup = operationGroup = {
          ops: [op],
          delayedCallbacks: []
        };
      }
    }
    function fireCallbacksForOps(group) {
      var callbacks = group.delayedCallbacks, i2 = 0;
      do {
        for (; i2 < callbacks.length; i2++) {
          callbacks[i2].call(null);
        }
        for (var j = 0; j < group.ops.length; j++) {
          var op = group.ops[j];
          if (op.cursorActivityHandlers) {
            while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
              op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
            }
          }
        }
      } while (i2 < callbacks.length);
    }
    function finishOperation(op, endCb) {
      var group = op.ownsGroup;
      if (!group) {
        return;
      }
      try {
        fireCallbacksForOps(group);
      } finally {
        operationGroup = null;
        endCb(group);
      }
    }
    var orphanDelayedCallbacks = null;
    function signalLater(emitter, type) {
      var arr = getHandlers(emitter, type);
      if (!arr.length) {
        return;
      }
      var args = Array.prototype.slice.call(arguments, 2), list;
      if (operationGroup) {
        list = operationGroup.delayedCallbacks;
      } else if (orphanDelayedCallbacks) {
        list = orphanDelayedCallbacks;
      } else {
        list = orphanDelayedCallbacks = [];
        setTimeout(fireOrphanDelayed, 0);
      }
      var loop = function(i3) {
        list.push(function() {
          return arr[i3].apply(null, args);
        });
      };
      for (var i2 = 0; i2 < arr.length; ++i2)
        loop(i2);
    }
    function fireOrphanDelayed() {
      var delayed = orphanDelayedCallbacks;
      orphanDelayedCallbacks = null;
      for (var i2 = 0; i2 < delayed.length; ++i2) {
        delayed[i2]();
      }
    }
    function updateLineForChanges(cm, lineView, lineN, dims) {
      for (var j = 0; j < lineView.changes.length; j++) {
        var type = lineView.changes[j];
        if (type == "text") {
          updateLineText(cm, lineView);
        } else if (type == "gutter") {
          updateLineGutter(cm, lineView, lineN, dims);
        } else if (type == "class") {
          updateLineClasses(cm, lineView);
        } else if (type == "widget") {
          updateLineWidgets(cm, lineView, dims);
        }
      }
      lineView.changes = null;
    }
    function ensureLineWrapped(lineView) {
      if (lineView.node == lineView.text) {
        lineView.node = elt("div", null, null, "position: relative");
        if (lineView.text.parentNode) {
          lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
        }
        lineView.node.appendChild(lineView.text);
        if (ie && ie_version < 8) {
          lineView.node.style.zIndex = 2;
        }
      }
      return lineView.node;
    }
    function updateLineBackground(cm, lineView) {
      var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
      if (cls) {
        cls += " CodeMirror-linebackground";
      }
      if (lineView.background) {
        if (cls) {
          lineView.background.className = cls;
        } else {
          lineView.background.parentNode.removeChild(lineView.background);
          lineView.background = null;
        }
      } else if (cls) {
        var wrap = ensureLineWrapped(lineView);
        lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
        cm.display.input.setUneditable(lineView.background);
      }
    }
    function getLineContent(cm, lineView) {
      var ext = cm.display.externalMeasured;
      if (ext && ext.line == lineView.line) {
        cm.display.externalMeasured = null;
        lineView.measure = ext.measure;
        return ext.built;
      }
      return buildLineContent(cm, lineView);
    }
    function updateLineText(cm, lineView) {
      var cls = lineView.text.className;
      var built = getLineContent(cm, lineView);
      if (lineView.text == lineView.node) {
        lineView.node = built.pre;
      }
      lineView.text.parentNode.replaceChild(built.pre, lineView.text);
      lineView.text = built.pre;
      if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
        lineView.bgClass = built.bgClass;
        lineView.textClass = built.textClass;
        updateLineClasses(cm, lineView);
      } else if (cls) {
        lineView.text.className = cls;
      }
    }
    function updateLineClasses(cm, lineView) {
      updateLineBackground(cm, lineView);
      if (lineView.line.wrapClass) {
        ensureLineWrapped(lineView).className = lineView.line.wrapClass;
      } else if (lineView.node != lineView.text) {
        lineView.node.className = "";
      }
      var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
      lineView.text.className = textClass || "";
    }
    function updateLineGutter(cm, lineView, lineN, dims) {
      if (lineView.gutter) {
        lineView.node.removeChild(lineView.gutter);
        lineView.gutter = null;
      }
      if (lineView.gutterBackground) {
        lineView.node.removeChild(lineView.gutterBackground);
        lineView.gutterBackground = null;
      }
      if (lineView.line.gutterClass) {
        var wrap = ensureLineWrapped(lineView);
        lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass, "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px");
        cm.display.input.setUneditable(lineView.gutterBackground);
        wrap.insertBefore(lineView.gutterBackground, lineView.text);
      }
      var markers = lineView.line.gutterMarkers;
      if (cm.options.lineNumbers || markers) {
        var wrap$1 = ensureLineWrapped(lineView);
        var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
        gutterWrap.setAttribute("aria-hidden", "true");
        cm.display.input.setUneditable(gutterWrap);
        wrap$1.insertBefore(gutterWrap, lineView.text);
        if (lineView.line.gutterClass) {
          gutterWrap.className += " " + lineView.line.gutterClass;
        }
        if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
          lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"));
        }
        if (markers) {
          for (var k = 0; k < cm.display.gutterSpecs.length; ++k) {
            var id = cm.display.gutterSpecs[k].className, found = markers.hasOwnProperty(id) && markers[id];
            if (found) {
              gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
            }
          }
        }
      }
    }
    function updateLineWidgets(cm, lineView, dims) {
      if (lineView.alignable) {
        lineView.alignable = null;
      }
      var isWidget = classTest("CodeMirror-linewidget");
      for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
        next = node.nextSibling;
        if (isWidget.test(node.className)) {
          lineView.node.removeChild(node);
        }
      }
      insertLineWidgets(cm, lineView, dims);
    }
    function buildLineElement(cm, lineView, lineN, dims) {
      var built = getLineContent(cm, lineView);
      lineView.text = lineView.node = built.pre;
      if (built.bgClass) {
        lineView.bgClass = built.bgClass;
      }
      if (built.textClass) {
        lineView.textClass = built.textClass;
      }
      updateLineClasses(cm, lineView);
      updateLineGutter(cm, lineView, lineN, dims);
      insertLineWidgets(cm, lineView, dims);
      return lineView.node;
    }
    function insertLineWidgets(cm, lineView, dims) {
      insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
      if (lineView.rest) {
        for (var i2 = 0; i2 < lineView.rest.length; i2++) {
          insertLineWidgetsFor(cm, lineView.rest[i2], lineView, dims, false);
        }
      }
    }
    function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
      if (!line.widgets) {
        return;
      }
      var wrap = ensureLineWrapped(lineView);
      for (var i2 = 0, ws = line.widgets; i2 < ws.length; ++i2) {
        var widget = ws[i2], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
        if (!widget.handleMouseEvents) {
          node.setAttribute("cm-ignore-events", "true");
        }
        positionLineWidget(widget, node, lineView, dims);
        cm.display.input.setUneditable(node);
        if (allowAbove && widget.above) {
          wrap.insertBefore(node, lineView.gutter || lineView.text);
        } else {
          wrap.appendChild(node);
        }
        signalLater(widget, "redraw");
      }
    }
    function positionLineWidget(widget, node, lineView, dims) {
      if (widget.noHScroll) {
        (lineView.alignable || (lineView.alignable = [])).push(node);
        var width = dims.wrapperWidth;
        node.style.left = dims.fixedPos + "px";
        if (!widget.coverGutter) {
          width -= dims.gutterTotalWidth;
          node.style.paddingLeft = dims.gutterTotalWidth + "px";
        }
        node.style.width = width + "px";
      }
      if (widget.coverGutter) {
        node.style.zIndex = 5;
        node.style.position = "relative";
        if (!widget.noHScroll) {
          node.style.marginLeft = -dims.gutterTotalWidth + "px";
        }
      }
    }
    function widgetHeight(widget) {
      if (widget.height != null) {
        return widget.height;
      }
      var cm = widget.doc.cm;
      if (!cm) {
        return 0;
      }
      if (!contains(document.body, widget.node)) {
        var parentStyle = "position: relative;";
        if (widget.coverGutter) {
          parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
        }
        if (widget.noHScroll) {
          parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
        }
        removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
      }
      return widget.height = widget.node.parentNode.offsetHeight;
    }
    function eventInWidget(display, e) {
      for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
        if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) {
          return true;
        }
      }
    }
    function paddingTop(display) {
      return display.lineSpace.offsetTop;
    }
    function paddingVert(display) {
      return display.mover.offsetHeight - display.lineSpace.offsetHeight;
    }
    function paddingH(display) {
      if (display.cachedPaddingH) {
        return display.cachedPaddingH;
      }
      var e = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
      var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
      var data = {left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight)};
      if (!isNaN(data.left) && !isNaN(data.right)) {
        display.cachedPaddingH = data;
      }
      return data;
    }
    function scrollGap(cm) {
      return scrollerGap - cm.display.nativeBarWidth;
    }
    function displayWidth(cm) {
      return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
    }
    function displayHeight(cm) {
      return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
    }
    function ensureLineHeights(cm, lineView, rect) {
      var wrapping = cm.options.lineWrapping;
      var curWidth = wrapping && displayWidth(cm);
      if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
        var heights = lineView.measure.heights = [];
        if (wrapping) {
          lineView.measure.width = curWidth;
          var rects = lineView.text.firstChild.getClientRects();
          for (var i2 = 0; i2 < rects.length - 1; i2++) {
            var cur = rects[i2], next = rects[i2 + 1];
            if (Math.abs(cur.bottom - next.bottom) > 2) {
              heights.push((cur.bottom + next.top) / 2 - rect.top);
            }
          }
        }
        heights.push(rect.bottom - rect.top);
      }
    }
    function mapFromLineView(lineView, line, lineN) {
      if (lineView.line == line) {
        return {map: lineView.measure.map, cache: lineView.measure.cache};
      }
      if (lineView.rest) {
        for (var i2 = 0; i2 < lineView.rest.length; i2++) {
          if (lineView.rest[i2] == line) {
            return {map: lineView.measure.maps[i2], cache: lineView.measure.caches[i2]};
          }
        }
        for (var i$12 = 0; i$12 < lineView.rest.length; i$12++) {
          if (lineNo(lineView.rest[i$12]) > lineN) {
            return {map: lineView.measure.maps[i$12], cache: lineView.measure.caches[i$12], before: true};
          }
        }
      }
    }
    function updateExternalMeasurement(cm, line) {
      line = visualLine(line);
      var lineN = lineNo(line);
      var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
      view.lineN = lineN;
      var built = view.built = buildLineContent(cm, view);
      view.text = built.pre;
      removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
      return view;
    }
    function measureChar(cm, line, ch, bias) {
      return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
    }
    function findViewForLine(cm, lineN) {
      if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
        return cm.display.view[findViewIndex(cm, lineN)];
      }
      var ext = cm.display.externalMeasured;
      if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
        return ext;
      }
    }
    function prepareMeasureForLine(cm, line) {
      var lineN = lineNo(line);
      var view = findViewForLine(cm, lineN);
      if (view && !view.text) {
        view = null;
      } else if (view && view.changes) {
        updateLineForChanges(cm, view, lineN, getDimensions(cm));
        cm.curOp.forceUpdate = true;
      }
      if (!view) {
        view = updateExternalMeasurement(cm, line);
      }
      var info = mapFromLineView(view, line, lineN);
      return {
        line,
        view,
        rect: null,
        map: info.map,
        cache: info.cache,
        before: info.before,
        hasHeights: false
      };
    }
    function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
      if (prepared.before) {
        ch = -1;
      }
      var key = ch + (bias || ""), found;
      if (prepared.cache.hasOwnProperty(key)) {
        found = prepared.cache[key];
      } else {
        if (!prepared.rect) {
          prepared.rect = prepared.view.text.getBoundingClientRect();
        }
        if (!prepared.hasHeights) {
          ensureLineHeights(cm, prepared.view, prepared.rect);
          prepared.hasHeights = true;
        }
        found = measureCharInner(cm, prepared, ch, bias);
        if (!found.bogus) {
          prepared.cache[key] = found;
        }
      }
      return {
        left: found.left,
        right: found.right,
        top: varHeight ? found.rtop : found.top,
        bottom: varHeight ? found.rbottom : found.bottom
      };
    }
    var nullRect = {left: 0, right: 0, top: 0, bottom: 0};
    function nodeAndOffsetInLineMap(map2, ch, bias) {
      var node, start, end, collapse, mStart, mEnd;
      for (var i2 = 0; i2 < map2.length; i2 += 3) {
        mStart = map2[i2];
        mEnd = map2[i2 + 1];
        if (ch < mStart) {
          start = 0;
          end = 1;
          collapse = "left";
        } else if (ch < mEnd) {
          start = ch - mStart;
          end = start + 1;
        } else if (i2 == map2.length - 3 || ch == mEnd && map2[i2 + 3] > ch) {
          end = mEnd - mStart;
          start = end - 1;
          if (ch >= mEnd) {
            collapse = "right";
          }
        }
        if (start != null) {
          node = map2[i2 + 2];
          if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
            collapse = bias;
          }
          if (bias == "left" && start == 0) {
            while (i2 && map2[i2 - 2] == map2[i2 - 3] && map2[i2 - 1].insertLeft) {
              node = map2[(i2 -= 3) + 2];
              collapse = "left";
            }
          }
          if (bias == "right" && start == mEnd - mStart) {
            while (i2 < map2.length - 3 && map2[i2 + 3] == map2[i2 + 4] && !map2[i2 + 5].insertLeft) {
              node = map2[(i2 += 3) + 2];
              collapse = "right";
            }
          }
          break;
        }
      }
      return {node, start, end, collapse, coverStart: mStart, coverEnd: mEnd};
    }
    function getUsefulRect(rects, bias) {
      var rect = nullRect;
      if (bias == "left") {
        for (var i2 = 0; i2 < rects.length; i2++) {
          if ((rect = rects[i2]).left != rect.right) {
            break;
          }
        }
      } else {
        for (var i$12 = rects.length - 1; i$12 >= 0; i$12--) {
          if ((rect = rects[i$12]).left != rect.right) {
            break;
          }
        }
      }
      return rect;
    }
    function measureCharInner(cm, prepared, ch, bias) {
      var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
      var node = place.node, start = place.start, end = place.end, collapse = place.collapse;
      var rect;
      if (node.nodeType == 3) {
        for (var i$12 = 0; i$12 < 4; i$12++) {
          while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
            --start;
          }
          while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
            ++end;
          }
          if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
            rect = node.parentNode.getBoundingClientRect();
          } else {
            rect = getUsefulRect(range(node, start, end).getClientRects(), bias);
          }
          if (rect.left || rect.right || start == 0) {
            break;
          }
          end = start;
          start = start - 1;
          collapse = "right";
        }
        if (ie && ie_version < 11) {
          rect = maybeUpdateRectForZooming(cm.display.measure, rect);
        }
      } else {
        if (start > 0) {
          collapse = bias = "right";
        }
        var rects;
        if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
          rect = rects[bias == "right" ? rects.length - 1 : 0];
        } else {
          rect = node.getBoundingClientRect();
        }
      }
      if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
        var rSpan = node.parentNode.getClientRects()[0];
        if (rSpan) {
          rect = {left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom};
        } else {
          rect = nullRect;
        }
      }
      var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
      var mid = (rtop + rbot) / 2;
      var heights = prepared.view.measure.heights;
      var i2 = 0;
      for (; i2 < heights.length - 1; i2++) {
        if (mid < heights[i2]) {
          break;
        }
      }
      var top = i2 ? heights[i2 - 1] : 0, bot = heights[i2];
      var result = {
        left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
        right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
        top,
        bottom: bot
      };
      if (!rect.left && !rect.right) {
        result.bogus = true;
      }
      if (!cm.options.singleCursorHeightPerLine) {
        result.rtop = rtop;
        result.rbottom = rbot;
      }
      return result;
    }
    function maybeUpdateRectForZooming(measure, rect) {
      if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
        return rect;
      }
      var scaleX = screen.logicalXDPI / screen.deviceXDPI;
      var scaleY = screen.logicalYDPI / screen.deviceYDPI;
      return {
        left: rect.left * scaleX,
        right: rect.right * scaleX,
        top: rect.top * scaleY,
        bottom: rect.bottom * scaleY
      };
    }
    function clearLineMeasurementCacheFor(lineView) {
      if (lineView.measure) {
        lineView.measure.cache = {};
        lineView.measure.heights = null;
        if (lineView.rest) {
          for (var i2 = 0; i2 < lineView.rest.length; i2++) {
            lineView.measure.caches[i2] = {};
          }
        }
      }
    }
    function clearLineMeasurementCache(cm) {
      cm.display.externalMeasure = null;
      removeChildren(cm.display.lineMeasure);
      for (var i2 = 0; i2 < cm.display.view.length; i2++) {
        clearLineMeasurementCacheFor(cm.display.view[i2]);
      }
    }
    function clearCaches(cm) {
      clearLineMeasurementCache(cm);
      cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
      if (!cm.options.lineWrapping) {
        cm.display.maxLineChanged = true;
      }
      cm.display.lineNumChars = null;
    }
    function pageScrollX(doc2) {
      if (chrome && android) {
        return -(doc2.body.getBoundingClientRect().left - parseInt(getComputedStyle(doc2.body).marginLeft));
      }
      return doc2.defaultView.pageXOffset || (doc2.documentElement || doc2.body).scrollLeft;
    }
    function pageScrollY(doc2) {
      if (chrome && android) {
        return -(doc2.body.getBoundingClientRect().top - parseInt(getComputedStyle(doc2.body).marginTop));
      }
      return doc2.defaultView.pageYOffset || (doc2.documentElement || doc2.body).scrollTop;
    }
    function widgetTopHeight(lineObj) {
      var ref = visualLine(lineObj);
      var widgets = ref.widgets;
      var height = 0;
      if (widgets) {
        for (var i2 = 0; i2 < widgets.length; ++i2) {
          if (widgets[i2].above) {
            height += widgetHeight(widgets[i2]);
          }
        }
      }
      return height;
    }
    function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
      if (!includeWidgets) {
        var height = widgetTopHeight(lineObj);
        rect.top += height;
        rect.bottom += height;
      }
      if (context == "line") {
        return rect;
      }
      if (!context) {
        context = "local";
      }
      var yOff = heightAtLine(lineObj);
      if (context == "local") {
        yOff += paddingTop(cm.display);
      } else {
        yOff -= cm.display.viewOffset;
      }
      if (context == "page" || context == "window") {
        var lOff = cm.display.lineSpace.getBoundingClientRect();
        yOff += lOff.top + (context == "window" ? 0 : pageScrollY(doc(cm)));
        var xOff = lOff.left + (context == "window" ? 0 : pageScrollX(doc(cm)));
        rect.left += xOff;
        rect.right += xOff;
      }
      rect.top += yOff;
      rect.bottom += yOff;
      return rect;
    }
    function fromCoordSystem(cm, coords, context) {
      if (context == "div") {
        return coords;
      }
      var left = coords.left, top = coords.top;
      if (context == "page") {
        left -= pageScrollX(doc(cm));
        top -= pageScrollY(doc(cm));
      } else if (context == "local" || !context) {
        var localBox = cm.display.sizer.getBoundingClientRect();
        left += localBox.left;
        top += localBox.top;
      }
      var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
      return {left: left - lineSpaceBox.left, top: top - lineSpaceBox.top};
    }
    function charCoords(cm, pos, context, lineObj, bias) {
      if (!lineObj) {
        lineObj = getLine(cm.doc, pos.line);
      }
      return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
    }
    function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
      lineObj = lineObj || getLine(cm.doc, pos.line);
      if (!preparedMeasure) {
        preparedMeasure = prepareMeasureForLine(cm, lineObj);
      }
      function get(ch2, right) {
        var m = measureCharPrepared(cm, preparedMeasure, ch2, right ? "right" : "left", varHeight);
        if (right) {
          m.left = m.right;
        } else {
          m.right = m.left;
        }
        return intoCoordSystem(cm, lineObj, m, context);
      }
      var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
      if (ch >= lineObj.text.length) {
        ch = lineObj.text.length;
        sticky = "before";
      } else if (ch <= 0) {
        ch = 0;
        sticky = "after";
      }
      if (!order) {
        return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
      }
      function getBidi(ch2, partPos2, invert) {
        var part = order[partPos2], right = part.level == 1;
        return get(invert ? ch2 - 1 : ch2, right != invert);
      }
      var partPos = getBidiPartAt(order, ch, sticky);
      var other = bidiOther;
      var val = getBidi(ch, partPos, sticky == "before");
      if (other != null) {
        val.other = getBidi(ch, other, sticky != "before");
      }
      return val;
    }
    function estimateCoords(cm, pos) {
      var left = 0;
      pos = clipPos(cm.doc, pos);
      if (!cm.options.lineWrapping) {
        left = charWidth(cm.display) * pos.ch;
      }
      var lineObj = getLine(cm.doc, pos.line);
      var top = heightAtLine(lineObj) + paddingTop(cm.display);
      return {left, right: left, top, bottom: top + lineObj.height};
    }
    function PosWithInfo(line, ch, sticky, outside, xRel) {
      var pos = Pos(line, ch, sticky);
      pos.xRel = xRel;
      if (outside) {
        pos.outside = outside;
      }
      return pos;
    }
    function coordsChar(cm, x, y) {
      var doc2 = cm.doc;
      y += cm.display.viewOffset;
      if (y < 0) {
        return PosWithInfo(doc2.first, 0, null, -1, -1);
      }
      var lineN = lineAtHeight(doc2, y), last = doc2.first + doc2.size - 1;
      if (lineN > last) {
        return PosWithInfo(doc2.first + doc2.size - 1, getLine(doc2, last).text.length, null, 1, 1);
      }
      if (x < 0) {
        x = 0;
      }
      var lineObj = getLine(doc2, lineN);
      for (; ; ) {
        var found = coordsCharInner(cm, lineObj, lineN, x, y);
        var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
        if (!collapsed) {
          return found;
        }
        var rangeEnd = collapsed.find(1);
        if (rangeEnd.line == lineN) {
          return rangeEnd;
        }
        lineObj = getLine(doc2, lineN = rangeEnd.line);
      }
    }
    function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
      y -= widgetTopHeight(lineObj);
      var end = lineObj.text.length;
      var begin = findFirst(function(ch) {
        return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y;
      }, end, 0);
      end = findFirst(function(ch) {
        return measureCharPrepared(cm, preparedMeasure, ch).top > y;
      }, begin, end);
      return {begin, end};
    }
    function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
      if (!preparedMeasure) {
        preparedMeasure = prepareMeasureForLine(cm, lineObj);
      }
      var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
      return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop);
    }
    function boxIsAfter(box, x, y, left) {
      return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x;
    }
    function coordsCharInner(cm, lineObj, lineNo2, x, y) {
      y -= heightAtLine(lineObj);
      var preparedMeasure = prepareMeasureForLine(cm, lineObj);
      var widgetHeight2 = widgetTopHeight(lineObj);
      var begin = 0, end = lineObj.text.length, ltr = true;
      var order = getOrder(lineObj, cm.doc.direction);
      if (order) {
        var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)(cm, lineObj, lineNo2, preparedMeasure, order, x, y);
        ltr = part.level != 1;
        begin = ltr ? part.from : part.to - 1;
        end = ltr ? part.to : part.from - 1;
      }
      var chAround = null, boxAround = null;
      var ch = findFirst(function(ch2) {
        var box = measureCharPrepared(cm, preparedMeasure, ch2);
        box.top += widgetHeight2;
        box.bottom += widgetHeight2;
        if (!boxIsAfter(box, x, y, false)) {
          return false;
        }
        if (box.top <= y && box.left <= x) {
          chAround = ch2;
          boxAround = box;
        }
        return true;
      }, begin, end);
      var baseX, sticky, outside = false;
      if (boxAround) {
        var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
        ch = chAround + (atStart ? 0 : 1);
        sticky = atStart ? "after" : "before";
        baseX = atLeft ? boxAround.left : boxAround.right;
      } else {
        if (!ltr && (ch == end || ch == begin)) {
          ch++;
        }
        sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" : measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight2 <= y == ltr ? "after" : "before";
        var coords = cursorCoords(cm, Pos(lineNo2, ch, sticky), "line", lineObj, preparedMeasure);
        baseX = coords.left;
        outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
      }
      ch = skipExtendingChars(lineObj.text, ch, 1);
      return PosWithInfo(lineNo2, ch, sticky, outside, x - baseX);
    }
    function coordsBidiPart(cm, lineObj, lineNo2, preparedMeasure, order, x, y) {
      var index = findFirst(function(i2) {
        var part2 = order[i2], ltr2 = part2.level != 1;
        return boxIsAfter(cursorCoords(cm, Pos(lineNo2, ltr2 ? part2.to : part2.from, ltr2 ? "before" : "after"), "line", lineObj, preparedMeasure), x, y, true);
      }, 0, order.length - 1);
      var part = order[index];
      if (index > 0) {
        var ltr = part.level != 1;
        var start = cursorCoords(cm, Pos(lineNo2, ltr ? part.from : part.to, ltr ? "after" : "before"), "line", lineObj, preparedMeasure);
        if (boxIsAfter(start, x, y, true) && start.top > y) {
          part = order[index - 1];
        }
      }
      return part;
    }
    function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
      var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
      var begin = ref.begin;
      var end = ref.end;
      if (/\s/.test(lineObj.text.charAt(end - 1))) {
        end--;
      }
      var part = null, closestDist = null;
      for (var i2 = 0; i2 < order.length; i2++) {
        var p = order[i2];
        if (p.from >= end || p.to <= begin) {
          continue;
        }
        var ltr = p.level != 1;
        var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
        var dist = endX < x ? x - endX + 1e9 : endX - x;
        if (!part || closestDist > dist) {
          part = p;
          closestDist = dist;
        }
      }
      if (!part) {
        part = order[order.length - 1];
      }
      if (part.from < begin) {
        part = {from: begin, to: part.to, level: part.level};
      }
      if (part.to > end) {
        part = {from: part.from, to: end, level: part.level};
      }
      return part;
    }
    var measureText;
    function textHeight(display) {
      if (display.cachedTextHeight != null) {
        return display.cachedTextHeight;
      }
      if (measureText == null) {
        measureText = elt("pre", null, "CodeMirror-line-like");
        for (var i2 = 0; i2 < 49; ++i2) {
          measureText.appendChild(document.createTextNode("x"));
          measureText.appendChild(elt("br"));
        }
        measureText.appendChild(document.createTextNode("x"));
      }
      removeChildrenAndAdd(display.measure, measureText);
      var height = measureText.offsetHeight / 50;
      if (height > 3) {
        display.cachedTextHeight = height;
      }
      removeChildren(display.measure);
      return height || 1;
    }
    function charWidth(display) {
      if (display.cachedCharWidth != null) {
        return display.cachedCharWidth;
      }
      var anchor = elt("span", "xxxxxxxxxx");
      var pre = elt("pre", [anchor], "CodeMirror-line-like");
      removeChildrenAndAdd(display.measure, pre);
      var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
      if (width > 2) {
        display.cachedCharWidth = width;
      }
      return width || 10;
    }
    function getDimensions(cm) {
      var d = cm.display, left = {}, width = {};
      var gutterLeft = d.gutters.clientLeft;
      for (var n = d.gutters.firstChild, i2 = 0; n; n = n.nextSibling, ++i2) {
        var id = cm.display.gutterSpecs[i2].className;
        left[id] = n.offsetLeft + n.clientLeft + gutterLeft;
        width[id] = n.clientWidth;
      }
      return {
        fixedPos: compensateForHScroll(d),
        gutterTotalWidth: d.gutters.offsetWidth,
        gutterLeft: left,
        gutterWidth: width,
        wrapperWidth: d.wrapper.clientWidth
      };
    }
    function compensateForHScroll(display) {
      return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
    }
    function estimateHeight(cm) {
      var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
      var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
      return function(line) {
        if (lineIsHidden(cm.doc, line)) {
          return 0;
        }
        var widgetsHeight = 0;
        if (line.widgets) {
          for (var i2 = 0; i2 < line.widgets.length; i2++) {
            if (line.widgets[i2].height) {
              widgetsHeight += line.widgets[i2].height;
            }
          }
        }
        if (wrapping) {
          return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
        } else {
          return widgetsHeight + th;
        }
      };
    }
    function estimateLineHeights(cm) {
      var doc2 = cm.doc, est = estimateHeight(cm);
      doc2.iter(function(line) {
        var estHeight = est(line);
        if (estHeight != line.height) {
          updateLineHeight(line, estHeight);
        }
      });
    }
    function posFromMouse(cm, e, liberal, forRect) {
      var display = cm.display;
      if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") {
        return null;
      }
      var x, y, space = display.lineSpace.getBoundingClientRect();
      try {
        x = e.clientX - space.left;
        y = e.clientY - space.top;
      } catch (e$1) {
        return null;
      }
      var coords = coordsChar(cm, x, y), line;
      if (forRect && coords.xRel > 0 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
        var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
        coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
      }
      return coords;
    }
    function findViewIndex(cm, n) {
      if (n >= cm.display.viewTo) {
        return null;
      }
      n -= cm.display.viewFrom;
      if (n < 0) {
        return null;
      }
      var view = cm.display.view;
      for (var i2 = 0; i2 < view.length; i2++) {
        n -= view[i2].size;
        if (n < 0) {
          return i2;
        }
      }
    }
    function regChange(cm, from, to, lendiff) {
      if (from == null) {
        from = cm.doc.first;
      }
      if (to == null) {
        to = cm.doc.first + cm.doc.size;
      }
      if (!lendiff) {
        lendiff = 0;
      }
      var display = cm.display;
      if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
        display.updateLineNumbers = from;
      }
      cm.curOp.viewChanged = true;
      if (from >= display.viewTo) {
        if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) {
          resetView(cm);
        }
      } else if (to <= display.viewFrom) {
        if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
          resetView(cm);
        } else {
          display.viewFrom += lendiff;
          display.viewTo += lendiff;
        }
      } else if (from <= display.viewFrom && to >= display.viewTo) {
        resetView(cm);
      } else if (from <= display.viewFrom) {
        var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
        if (cut) {
          display.view = display.view.slice(cut.index);
          display.viewFrom = cut.lineN;
          display.viewTo += lendiff;
        } else {
          resetView(cm);
        }
      } else if (to >= display.viewTo) {
        var cut$1 = viewCuttingPoint(cm, from, from, -1);
        if (cut$1) {
          display.view = display.view.slice(0, cut$1.index);
          display.viewTo = cut$1.lineN;
        } else {
          resetView(cm);
        }
      } else {
        var cutTop = viewCuttingPoint(cm, from, from, -1);
        var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
        if (cutTop && cutBot) {
          display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
          display.viewTo += lendiff;
        } else {
          resetView(cm);
        }
      }
      var ext = display.externalMeasured;
      if (ext) {
        if (to < ext.lineN) {
          ext.lineN += lendiff;
        } else if (from < ext.lineN + ext.size) {
          display.externalMeasured = null;
        }
      }
    }
    function regLineChange(cm, line, type) {
      cm.curOp.viewChanged = true;
      var display = cm.display, ext = cm.display.externalMeasured;
      if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
        display.externalMeasured = null;
      }
      if (line < display.viewFrom || line >= display.viewTo) {
        return;
      }
      var lineView = display.view[findViewIndex(cm, line)];
      if (lineView.node == null) {
        return;
      }
      var arr = lineView.changes || (lineView.changes = []);
      if (indexOf(arr, type) == -1) {
        arr.push(type);
      }
    }
    function resetView(cm) {
      cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
      cm.display.view = [];
      cm.display.viewOffset = 0;
    }
    function viewCuttingPoint(cm, oldN, newN, dir) {
      var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
      if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) {
        return {index, lineN: newN};
      }
      var n = cm.display.viewFrom;
      for (var i2 = 0; i2 < index; i2++) {
        n += view[i2].size;
      }
      if (n != oldN) {
        if (dir > 0) {
          if (index == view.length - 1) {
            return null;
          }
          diff = n + view[index].size - oldN;
          index++;
        } else {
          diff = n - oldN;
        }
        oldN += diff;
        newN += diff;
      }
      while (visualLineNo(cm.doc, newN) != newN) {
        if (index == (dir < 0 ? 0 : view.length - 1)) {
          return null;
        }
        newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
        index += dir;
      }
      return {index, lineN: newN};
    }
    function adjustView(cm, from, to) {
      var display = cm.display, view = display.view;
      if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
        display.view = buildViewArray(cm, from, to);
        display.viewFrom = from;
      } else {
        if (display.viewFrom > from) {
          display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
        } else if (display.viewFrom < from) {
          display.view = display.view.slice(findViewIndex(cm, from));
        }
        display.viewFrom = from;
        if (display.viewTo < to) {
          display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
        } else if (display.viewTo > to) {
          display.view = display.view.slice(0, findViewIndex(cm, to));
        }
      }
      display.viewTo = to;
    }
    function countDirtyView(cm) {
      var view = cm.display.view, dirty = 0;
      for (var i2 = 0; i2 < view.length; i2++) {
        var lineView = view[i2];
        if (!lineView.hidden && (!lineView.node || lineView.changes)) {
          ++dirty;
        }
      }
      return dirty;
    }
    function updateSelection(cm) {
      cm.display.input.showSelection(cm.display.input.prepareSelection());
    }
    function prepareSelection(cm, primary) {
      if (primary === void 0)
        primary = true;
      var doc2 = cm.doc, result = {};
      var curFragment = result.cursors = document.createDocumentFragment();
      var selFragment = result.selection = document.createDocumentFragment();
      var customCursor = cm.options.$customCursor;
      if (customCursor) {
        primary = true;
      }
      for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
        if (!primary && i2 == doc2.sel.primIndex) {
          continue;
        }
        var range2 = doc2.sel.ranges[i2];
        if (range2.from().line >= cm.display.viewTo || range2.to().line < cm.display.viewFrom) {
          continue;
        }
        var collapsed = range2.empty();
        if (customCursor) {
          var head = customCursor(cm, range2);
          if (head) {
            drawSelectionCursor(cm, head, curFragment);
          }
        } else if (collapsed || cm.options.showCursorWhenSelecting) {
          drawSelectionCursor(cm, range2.head, curFragment);
        }
        if (!collapsed) {
          drawSelectionRange(cm, range2, selFragment);
        }
      }
      return result;
    }
    function drawSelectionCursor(cm, head, output) {
      var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);
      var cursor = output.appendChild(elt("div", " ", "CodeMirror-cursor"));
      cursor.style.left = pos.left + "px";
      cursor.style.top = pos.top + "px";
      cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
      if (/\bcm-fat-cursor\b/.test(cm.getWrapperElement().className)) {
        var charPos = charCoords(cm, head, "div", null, null);
        var width = charPos.right - charPos.left;
        cursor.style.width = (width > 0 ? width : cm.defaultCharWidth()) + "px";
      }
      if (pos.other) {
        var otherCursor = output.appendChild(elt("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
        otherCursor.style.display = "";
        otherCursor.style.left = pos.other.left + "px";
        otherCursor.style.top = pos.other.top + "px";
        otherCursor.style.height = (pos.other.bottom - pos.other.top) * 0.85 + "px";
      }
    }
    function cmpCoords(a, b) {
      return a.top - b.top || a.left - b.left;
    }
    function drawSelectionRange(cm, range2, output) {
      var display = cm.display, doc2 = cm.doc;
      var fragment = document.createDocumentFragment();
      var padding = paddingH(cm.display), leftSide = padding.left;
      var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
      var docLTR = doc2.direction == "ltr";
      function add(left, top, width, bottom) {
        if (top < 0) {
          top = 0;
        }
        top = Math.round(top);
        bottom = Math.round(bottom);
        fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
      }
      function drawForLine(line, fromArg, toArg) {
        var lineObj = getLine(doc2, line);
        var lineLen = lineObj.text.length;
        var start, end;
        function coords(ch, bias) {
          return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
        }
        function wrapX(pos, dir, side) {
          var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
          var prop2 = dir == "ltr" == (side == "after") ? "left" : "right";
          var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
          return coords(ch, prop2)[prop2];
        }
        var order = getOrder(lineObj, doc2.direction);
        iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir, i2) {
          var ltr = dir == "ltr";
          var fromPos = coords(from, ltr ? "left" : "right");
          var toPos = coords(to - 1, ltr ? "right" : "left");
          var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
          var first = i2 == 0, last = !order || i2 == order.length - 1;
          if (toPos.top - fromPos.top <= 3) {
            var openLeft = (docLTR ? openStart : openEnd) && first;
            var openRight = (docLTR ? openEnd : openStart) && last;
            var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
            var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
            add(left, fromPos.top, right - left, fromPos.bottom);
          } else {
            var topLeft, topRight, botLeft, botRight;
            if (ltr) {
              topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
              topRight = docLTR ? rightSide : wrapX(from, dir, "before");
              botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
              botRight = docLTR && openEnd && last ? rightSide : toPos.right;
            } else {
              topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
              topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
              botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
              botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
            }
            add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
            if (fromPos.bottom < toPos.top) {
              add(leftSide, fromPos.bottom, null, toPos.top);
            }
            add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
          }
          if (!start || cmpCoords(fromPos, start) < 0) {
            start = fromPos;
          }
          if (cmpCoords(toPos, start) < 0) {
            start = toPos;
          }
          if (!end || cmpCoords(fromPos, end) < 0) {
            end = fromPos;
          }
          if (cmpCoords(toPos, end) < 0) {
            end = toPos;
          }
        });
        return {start, end};
      }
      var sFrom = range2.from(), sTo = range2.to();
      if (sFrom.line == sTo.line) {
        drawForLine(sFrom.line, sFrom.ch, sTo.ch);
      } else {
        var fromLine = getLine(doc2, sFrom.line), toLine = getLine(doc2, sTo.line);
        var singleVLine = visualLine(fromLine) == visualLine(toLine);
        var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
        var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
        if (singleVLine) {
          if (leftEnd.top < rightStart.top - 2) {
            add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
            add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
          } else {
            add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
          }
        }
        if (leftEnd.bottom < rightStart.top) {
          add(leftSide, leftEnd.bottom, null, rightStart.top);
        }
      }
      output.appendChild(fragment);
    }
    function restartBlink(cm) {
      if (!cm.state.focused) {
        return;
      }
      var display = cm.display;
      clearInterval(display.blinker);
      var on2 = true;
      display.cursorDiv.style.visibility = "";
      if (cm.options.cursorBlinkRate > 0) {
        display.blinker = setInterval(function() {
          if (!cm.hasFocus()) {
            onBlur(cm);
          }
          display.cursorDiv.style.visibility = (on2 = !on2) ? "" : "hidden";
        }, cm.options.cursorBlinkRate);
      } else if (cm.options.cursorBlinkRate < 0) {
        display.cursorDiv.style.visibility = "hidden";
      }
    }
    function ensureFocus(cm) {
      if (!cm.hasFocus()) {
        cm.display.input.focus();
        if (!cm.state.focused) {
          onFocus(cm);
        }
      }
    }
    function delayBlurEvent(cm) {
      cm.state.delayingBlurEvent = true;
      setTimeout(function() {
        if (cm.state.delayingBlurEvent) {
          cm.state.delayingBlurEvent = false;
          if (cm.state.focused) {
            onBlur(cm);
          }
        }
      }, 100);
    }
    function onFocus(cm, e) {
      if (cm.state.delayingBlurEvent && !cm.state.draggingText) {
        cm.state.delayingBlurEvent = false;
      }
      if (cm.options.readOnly == "nocursor") {
        return;
      }
      if (!cm.state.focused) {
        signal(cm, "focus", cm, e);
        cm.state.focused = true;
        addClass(cm.display.wrapper, "CodeMirror-focused");
        if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
          cm.display.input.reset();
          if (webkit) {
            setTimeout(function() {
              return cm.display.input.reset(true);
            }, 20);
          }
        }
        cm.display.input.receivedFocus();
      }
      restartBlink(cm);
    }
    function onBlur(cm, e) {
      if (cm.state.delayingBlurEvent) {
        return;
      }
      if (cm.state.focused) {
        signal(cm, "blur", cm, e);
        cm.state.focused = false;
        rmClass(cm.display.wrapper, "CodeMirror-focused");
      }
      clearInterval(cm.display.blinker);
      setTimeout(function() {
        if (!cm.state.focused) {
          cm.display.shift = false;
        }
      }, 150);
    }
    function updateHeightsInViewport(cm) {
      var display = cm.display;
      var prevBottom = display.lineDiv.offsetTop;
      var viewTop = Math.max(0, display.scroller.getBoundingClientRect().top);
      var oldHeight = display.lineDiv.getBoundingClientRect().top;
      var mustScroll = 0;
      for (var i2 = 0; i2 < display.view.length; i2++) {
        var cur = display.view[i2], wrapping = cm.options.lineWrapping;
        var height = void 0, width = 0;
        if (cur.hidden) {
          continue;
        }
        oldHeight += cur.line.height;
        if (ie && ie_version < 8) {
          var bot = cur.node.offsetTop + cur.node.offsetHeight;
          height = bot - prevBottom;
          prevBottom = bot;
        } else {
          var box = cur.node.getBoundingClientRect();
          height = box.bottom - box.top;
          if (!wrapping && cur.text.firstChild) {
            width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1;
          }
        }
        var diff = cur.line.height - height;
        if (diff > 5e-3 || diff < -5e-3) {
          if (oldHeight < viewTop) {
            mustScroll -= diff;
          }
          updateLineHeight(cur.line, height);
          updateWidgetHeight(cur.line);
          if (cur.rest) {
            for (var j = 0; j < cur.rest.length; j++) {
              updateWidgetHeight(cur.rest[j]);
            }
          }
        }
        if (width > cm.display.sizerWidth) {
          var chWidth = Math.ceil(width / charWidth(cm.display));
          if (chWidth > cm.display.maxLineLength) {
            cm.display.maxLineLength = chWidth;
            cm.display.maxLine = cur.line;
            cm.display.maxLineChanged = true;
          }
        }
      }
      if (Math.abs(mustScroll) > 2) {
        display.scroller.scrollTop += mustScroll;
      }
    }
    function updateWidgetHeight(line) {
      if (line.widgets) {
        for (var i2 = 0; i2 < line.widgets.length; ++i2) {
          var w = line.widgets[i2], parent = w.node.parentNode;
          if (parent) {
            w.height = parent.offsetHeight;
          }
        }
      }
    }
    function visibleLines(display, doc2, viewport) {
      var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
      top = Math.floor(top - paddingTop(display));
      var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;
      var from = lineAtHeight(doc2, top), to = lineAtHeight(doc2, bottom);
      if (viewport && viewport.ensure) {
        var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
        if (ensureFrom < from) {
          from = ensureFrom;
          to = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureFrom)) + display.wrapper.clientHeight);
        } else if (Math.min(ensureTo, doc2.lastLine()) >= to) {
          from = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureTo)) - display.wrapper.clientHeight);
          to = ensureTo;
        }
      }
      return {from, to: Math.max(to, from + 1)};
    }
    function maybeScrollWindow(cm, rect) {
      if (signalDOMEvent(cm, "scrollCursorIntoView")) {
        return;
      }
      var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
      var doc2 = display.wrapper.ownerDocument;
      if (rect.top + box.top < 0) {
        doScroll = true;
      } else if (rect.bottom + box.top > (doc2.defaultView.innerHeight || doc2.documentElement.clientHeight)) {
        doScroll = false;
      }
      if (doScroll != null && !phantom) {
        var scrollNode = elt("div", "​", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
        cm.display.lineSpace.appendChild(scrollNode);
        scrollNode.scrollIntoView(doScroll);
        cm.display.lineSpace.removeChild(scrollNode);
      }
    }
    function scrollPosIntoView(cm, pos, end, margin) {
      if (margin == null) {
        margin = 0;
      }
      var rect;
      if (!cm.options.lineWrapping && pos == end) {
        end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
        pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
      }
      for (var limit = 0; limit < 5; limit++) {
        var changed = false;
        var coords = cursorCoords(cm, pos);
        var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
        rect = {
          left: Math.min(coords.left, endCoords.left),
          top: Math.min(coords.top, endCoords.top) - margin,
          right: Math.max(coords.left, endCoords.left),
          bottom: Math.max(coords.bottom, endCoords.bottom) + margin
        };
        var scrollPos = calculateScrollPos(cm, rect);
        var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
        if (scrollPos.scrollTop != null) {
          updateScrollTop(cm, scrollPos.scrollTop);
          if (Math.abs(cm.doc.scrollTop - startTop) > 1) {
            changed = true;
          }
        }
        if (scrollPos.scrollLeft != null) {
          setScrollLeft(cm, scrollPos.scrollLeft);
          if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) {
            changed = true;
          }
        }
        if (!changed) {
          break;
        }
      }
      return rect;
    }
    function scrollIntoView(cm, rect) {
      var scrollPos = calculateScrollPos(cm, rect);
      if (scrollPos.scrollTop != null) {
        updateScrollTop(cm, scrollPos.scrollTop);
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
      }
    }
    function calculateScrollPos(cm, rect) {
      var display = cm.display, snapMargin = textHeight(cm.display);
      if (rect.top < 0) {
        rect.top = 0;
      }
      var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
      var screen2 = displayHeight(cm), result = {};
      if (rect.bottom - rect.top > screen2) {
        rect.bottom = rect.top + screen2;
      }
      var docBottom = cm.doc.height + paddingVert(display);
      var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
      if (rect.top < screentop) {
        result.scrollTop = atTop ? 0 : rect.top;
      } else if (rect.bottom > screentop + screen2) {
        var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen2);
        if (newTop != screentop) {
          result.scrollTop = newTop;
        }
      }
      var gutterSpace = cm.options.fixedGutter ? 0 : display.gutters.offsetWidth;
      var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft - gutterSpace;
      var screenw = displayWidth(cm) - display.gutters.offsetWidth;
      var tooWide = rect.right - rect.left > screenw;
      if (tooWide) {
        rect.right = rect.left + screenw;
      }
      if (rect.left < 10) {
        result.scrollLeft = 0;
      } else if (rect.left < screenleft) {
        result.scrollLeft = Math.max(0, rect.left + gutterSpace - (tooWide ? 0 : 10));
      } else if (rect.right > screenw + screenleft - 3) {
        result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
      }
      return result;
    }
    function addToScrollTop(cm, top) {
      if (top == null) {
        return;
      }
      resolveScrollToPos(cm);
      cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
    }
    function ensureCursorVisible(cm) {
      resolveScrollToPos(cm);
      var cur = cm.getCursor();
      cm.curOp.scrollToPos = {from: cur, to: cur, margin: cm.options.cursorScrollMargin};
    }
    function scrollToCoords(cm, x, y) {
      if (x != null || y != null) {
        resolveScrollToPos(cm);
      }
      if (x != null) {
        cm.curOp.scrollLeft = x;
      }
      if (y != null) {
        cm.curOp.scrollTop = y;
      }
    }
    function scrollToRange(cm, range2) {
      resolveScrollToPos(cm);
      cm.curOp.scrollToPos = range2;
    }
    function resolveScrollToPos(cm) {
      var range2 = cm.curOp.scrollToPos;
      if (range2) {
        cm.curOp.scrollToPos = null;
        var from = estimateCoords(cm, range2.from), to = estimateCoords(cm, range2.to);
        scrollToCoordsRange(cm, from, to, range2.margin);
      }
    }
    function scrollToCoordsRange(cm, from, to, margin) {
      var sPos = calculateScrollPos(cm, {
        left: Math.min(from.left, to.left),
        top: Math.min(from.top, to.top) - margin,
        right: Math.max(from.right, to.right),
        bottom: Math.max(from.bottom, to.bottom) + margin
      });
      scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
    }
    function updateScrollTop(cm, val) {
      if (Math.abs(cm.doc.scrollTop - val) < 2) {
        return;
      }
      if (!gecko) {
        updateDisplaySimple(cm, {top: val});
      }
      setScrollTop(cm, val, true);
      if (gecko) {
        updateDisplaySimple(cm);
      }
      startWorker(cm, 100);
    }
    function setScrollTop(cm, val, forceScroll) {
      val = Math.max(0, Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val));
      if (cm.display.scroller.scrollTop == val && !forceScroll) {
        return;
      }
      cm.doc.scrollTop = val;
      cm.display.scrollbars.setScrollTop(val);
      if (cm.display.scroller.scrollTop != val) {
        cm.display.scroller.scrollTop = val;
      }
    }
    function setScrollLeft(cm, val, isScroller, forceScroll) {
      val = Math.max(0, Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth));
      if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) {
        return;
      }
      cm.doc.scrollLeft = val;
      alignHorizontally(cm);
      if (cm.display.scroller.scrollLeft != val) {
        cm.display.scroller.scrollLeft = val;
      }
      cm.display.scrollbars.setScrollLeft(val);
    }
    function measureForScrollbars(cm) {
      var d = cm.display, gutterW = d.gutters.offsetWidth;
      var docH = Math.round(cm.doc.height + paddingVert(cm.display));
      return {
        clientHeight: d.scroller.clientHeight,
        viewHeight: d.wrapper.clientHeight,
        scrollWidth: d.scroller.scrollWidth,
        clientWidth: d.scroller.clientWidth,
        viewWidth: d.wrapper.clientWidth,
        barLeft: cm.options.fixedGutter ? gutterW : 0,
        docHeight: docH,
        scrollHeight: docH + scrollGap(cm) + d.barHeight,
        nativeBarWidth: d.nativeBarWidth,
        gutterWidth: gutterW
      };
    }
    var NativeScrollbars = function(place, scroll, cm) {
      this.cm = cm;
      var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
      var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
      vert.tabIndex = horiz.tabIndex = -1;
      place(vert);
      place(horiz);
      on(vert, "scroll", function() {
        if (vert.clientHeight) {
          scroll(vert.scrollTop, "vertical");
        }
      });
      on(horiz, "scroll", function() {
        if (horiz.clientWidth) {
          scroll(horiz.scrollLeft, "horizontal");
        }
      });
      this.checkedZeroWidth = false;
      if (ie && ie_version < 8) {
        this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
      }
    };
    NativeScrollbars.prototype.update = function(measure) {
      var needsH = measure.scrollWidth > measure.clientWidth + 1;
      var needsV = measure.scrollHeight > measure.clientHeight + 1;
      var sWidth = measure.nativeBarWidth;
      if (needsV) {
        this.vert.style.display = "block";
        this.vert.style.bottom = needsH ? sWidth + "px" : "0";
        var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
        this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
      } else {
        this.vert.scrollTop = 0;
        this.vert.style.display = "";
        this.vert.firstChild.style.height = "0";
      }
      if (needsH) {
        this.horiz.style.display = "block";
        this.horiz.style.right = needsV ? sWidth + "px" : "0";
        this.horiz.style.left = measure.barLeft + "px";
        var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
        this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
      } else {
        this.horiz.style.display = "";
        this.horiz.firstChild.style.width = "0";
      }
      if (!this.checkedZeroWidth && measure.clientHeight > 0) {
        if (sWidth == 0) {
          this.zeroWidthHack();
        }
        this.checkedZeroWidth = true;
      }
      return {right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0};
    };
    NativeScrollbars.prototype.setScrollLeft = function(pos) {
      if (this.horiz.scrollLeft != pos) {
        this.horiz.scrollLeft = pos;
      }
      if (this.disableHoriz) {
        this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }
    };
    NativeScrollbars.prototype.setScrollTop = function(pos) {
      if (this.vert.scrollTop != pos) {
        this.vert.scrollTop = pos;
      }
      if (this.disableVert) {
        this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }
    };
    NativeScrollbars.prototype.zeroWidthHack = function() {
      var w = mac && !mac_geMountainLion ? "12px" : "18px";
      this.horiz.style.height = this.vert.style.width = w;
      this.horiz.style.visibility = this.vert.style.visibility = "hidden";
      this.disableHoriz = new Delayed();
      this.disableVert = new Delayed();
    };
    NativeScrollbars.prototype.enableZeroWidthBar = function(bar, delay, type) {
      bar.style.visibility = "";
      function maybeDisable() {
        var box = bar.getBoundingClientRect();
        var elt2 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
        if (elt2 != bar) {
          bar.style.visibility = "hidden";
        } else {
          delay.set(1e3, maybeDisable);
        }
      }
      delay.set(1e3, maybeDisable);
    };
    NativeScrollbars.prototype.clear = function() {
      var parent = this.horiz.parentNode;
      parent.removeChild(this.horiz);
      parent.removeChild(this.vert);
    };
    var NullScrollbars = function() {
    };
    NullScrollbars.prototype.update = function() {
      return {bottom: 0, right: 0};
    };
    NullScrollbars.prototype.setScrollLeft = function() {
    };
    NullScrollbars.prototype.setScrollTop = function() {
    };
    NullScrollbars.prototype.clear = function() {
    };
    function updateScrollbars(cm, measure) {
      if (!measure) {
        measure = measureForScrollbars(cm);
      }
      var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
      updateScrollbarsInner(cm, measure);
      for (var i2 = 0; i2 < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i2++) {
        if (startWidth != cm.display.barWidth && cm.options.lineWrapping) {
          updateHeightsInViewport(cm);
        }
        updateScrollbarsInner(cm, measureForScrollbars(cm));
        startWidth = cm.display.barWidth;
        startHeight = cm.display.barHeight;
      }
    }
    function updateScrollbarsInner(cm, measure) {
      var d = cm.display;
      var sizes = d.scrollbars.update(measure);
      d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
      d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
      d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";
      if (sizes.right && sizes.bottom) {
        d.scrollbarFiller.style.display = "block";
        d.scrollbarFiller.style.height = sizes.bottom + "px";
        d.scrollbarFiller.style.width = sizes.right + "px";
      } else {
        d.scrollbarFiller.style.display = "";
      }
      if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
        d.gutterFiller.style.display = "block";
        d.gutterFiller.style.height = sizes.bottom + "px";
        d.gutterFiller.style.width = measure.gutterWidth + "px";
      } else {
        d.gutterFiller.style.display = "";
      }
    }
    var scrollbarModel = {native: NativeScrollbars, null: NullScrollbars};
    function initScrollbars(cm) {
      if (cm.display.scrollbars) {
        cm.display.scrollbars.clear();
        if (cm.display.scrollbars.addClass) {
          rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
        }
      }
      cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function(node) {
        cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
        on(node, "mousedown", function() {
          if (cm.state.focused) {
            setTimeout(function() {
              return cm.display.input.focus();
            }, 0);
          }
        });
        node.setAttribute("cm-not-content", "true");
      }, function(pos, axis) {
        if (axis == "horizontal") {
          setScrollLeft(cm, pos);
        } else {
          updateScrollTop(cm, pos);
        }
      }, cm);
      if (cm.display.scrollbars.addClass) {
        addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
      }
    }
    var nextOpId = 0;
    function startOperation(cm) {
      cm.curOp = {
        cm,
        viewChanged: false,
        startHeight: cm.doc.height,
        forceUpdate: false,
        updateInput: 0,
        typing: false,
        changeObjs: null,
        cursorActivityHandlers: null,
        cursorActivityCalled: 0,
        selectionChanged: false,
        updateMaxLine: false,
        scrollLeft: null,
        scrollTop: null,
        scrollToPos: null,
        focus: false,
        id: ++nextOpId,
        markArrays: null
      };
      pushOperation(cm.curOp);
    }
    function endOperation(cm) {
      var op = cm.curOp;
      if (op) {
        finishOperation(op, function(group) {
          for (var i2 = 0; i2 < group.ops.length; i2++) {
            group.ops[i2].cm.curOp = null;
          }
          endOperations(group);
        });
      }
    }
    function endOperations(group) {
      var ops = group.ops;
      for (var i2 = 0; i2 < ops.length; i2++) {
        endOperation_R1(ops[i2]);
      }
      for (var i$12 = 0; i$12 < ops.length; i$12++) {
        endOperation_W1(ops[i$12]);
      }
      for (var i$22 = 0; i$22 < ops.length; i$22++) {
        endOperation_R2(ops[i$22]);
      }
      for (var i$3 = 0; i$3 < ops.length; i$3++) {
        endOperation_W2(ops[i$3]);
      }
      for (var i$4 = 0; i$4 < ops.length; i$4++) {
        endOperation_finish(ops[i$4]);
      }
    }
    function endOperation_R1(op) {
      var cm = op.cm, display = cm.display;
      maybeClipScrollbars(cm);
      if (op.updateMaxLine) {
        findMaxLine(cm);
      }
      op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
      op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && {top: op.scrollTop, ensure: op.scrollToPos}, op.forceUpdate);
    }
    function endOperation_W1(op) {
      op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
    }
    function endOperation_R2(op) {
      var cm = op.cm, display = cm.display;
      if (op.updatedDisplay) {
        updateHeightsInViewport(cm);
      }
      op.barMeasure = measureForScrollbars(cm);
      if (display.maxLineChanged && !cm.options.lineWrapping) {
        op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
        cm.display.sizerWidth = op.adjustWidthTo;
        op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
        op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
      }
      if (op.updatedDisplay || op.selectionChanged) {
        op.preparedSelection = display.input.prepareSelection();
      }
    }
    function endOperation_W2(op) {
      var cm = op.cm;
      if (op.adjustWidthTo != null) {
        cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
        if (op.maxScrollLeft < cm.doc.scrollLeft) {
          setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
        }
        cm.display.maxLineChanged = false;
      }
      var takeFocus = op.focus && op.focus == activeElt(doc(cm));
      if (op.preparedSelection) {
        cm.display.input.showSelection(op.preparedSelection, takeFocus);
      }
      if (op.updatedDisplay || op.startHeight != cm.doc.height) {
        updateScrollbars(cm, op.barMeasure);
      }
      if (op.updatedDisplay) {
        setDocumentHeight(cm, op.barMeasure);
      }
      if (op.selectionChanged) {
        restartBlink(cm);
      }
      if (cm.state.focused && op.updateInput) {
        cm.display.input.reset(op.typing);
      }
      if (takeFocus) {
        ensureFocus(op.cm);
      }
    }
    function endOperation_finish(op) {
      var cm = op.cm, display = cm.display, doc2 = cm.doc;
      if (op.updatedDisplay) {
        postUpdateDisplay(cm, op.update);
      }
      if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
        display.wheelStartX = display.wheelStartY = null;
      }
      if (op.scrollTop != null) {
        setScrollTop(cm, op.scrollTop, op.forceScroll);
      }
      if (op.scrollLeft != null) {
        setScrollLeft(cm, op.scrollLeft, true, true);
      }
      if (op.scrollToPos) {
        var rect = scrollPosIntoView(cm, clipPos(doc2, op.scrollToPos.from), clipPos(doc2, op.scrollToPos.to), op.scrollToPos.margin);
        maybeScrollWindow(cm, rect);
      }
      var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
      if (hidden) {
        for (var i2 = 0; i2 < hidden.length; ++i2) {
          if (!hidden[i2].lines.length) {
            signal(hidden[i2], "hide");
          }
        }
      }
      if (unhidden) {
        for (var i$12 = 0; i$12 < unhidden.length; ++i$12) {
          if (unhidden[i$12].lines.length) {
            signal(unhidden[i$12], "unhide");
          }
        }
      }
      if (display.wrapper.offsetHeight) {
        doc2.scrollTop = cm.display.scroller.scrollTop;
      }
      if (op.changeObjs) {
        signal(cm, "changes", cm, op.changeObjs);
      }
      if (op.update) {
        op.update.finish();
      }
    }
    function runInOp(cm, f) {
      if (cm.curOp) {
        return f();
      }
      startOperation(cm);
      try {
        return f();
      } finally {
        endOperation(cm);
      }
    }
    function operation(cm, f) {
      return function() {
        if (cm.curOp) {
          return f.apply(cm, arguments);
        }
        startOperation(cm);
        try {
          return f.apply(cm, arguments);
        } finally {
          endOperation(cm);
        }
      };
    }
    function methodOp(f) {
      return function() {
        if (this.curOp) {
          return f.apply(this, arguments);
        }
        startOperation(this);
        try {
          return f.apply(this, arguments);
        } finally {
          endOperation(this);
        }
      };
    }
    function docMethodOp(f) {
      return function() {
        var cm = this.cm;
        if (!cm || cm.curOp) {
          return f.apply(this, arguments);
        }
        startOperation(cm);
        try {
          return f.apply(this, arguments);
        } finally {
          endOperation(cm);
        }
      };
    }
    function startWorker(cm, time) {
      if (cm.doc.highlightFrontier < cm.display.viewTo) {
        cm.state.highlight.set(time, bind(highlightWorker, cm));
      }
    }
    function highlightWorker(cm) {
      var doc2 = cm.doc;
      if (doc2.highlightFrontier >= cm.display.viewTo) {
        return;
      }
      var end = +new Date() + cm.options.workTime;
      var context = getContextBefore(cm, doc2.highlightFrontier);
      var changedLines = [];
      doc2.iter(context.line, Math.min(doc2.first + doc2.size, cm.display.viewTo + 500), function(line) {
        if (context.line >= cm.display.viewFrom) {
          var oldStyles = line.styles;
          var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc2.mode, context.state) : null;
          var highlighted = highlightLine(cm, line, context, true);
          if (resetState) {
            context.state = resetState;
          }
          line.styles = highlighted.styles;
          var oldCls = line.styleClasses, newCls = highlighted.classes;
          if (newCls) {
            line.styleClasses = newCls;
          } else if (oldCls) {
            line.styleClasses = null;
          }
          var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
          for (var i2 = 0; !ischange && i2 < oldStyles.length; ++i2) {
            ischange = oldStyles[i2] != line.styles[i2];
          }
          if (ischange) {
            changedLines.push(context.line);
          }
          line.stateAfter = context.save();
          context.nextLine();
        } else {
          if (line.text.length <= cm.options.maxHighlightLength) {
            processLine(cm, line.text, context);
          }
          line.stateAfter = context.line % 5 == 0 ? context.save() : null;
          context.nextLine();
        }
        if (+new Date() > end) {
          startWorker(cm, cm.options.workDelay);
          return true;
        }
      });
      doc2.highlightFrontier = context.line;
      doc2.modeFrontier = Math.max(doc2.modeFrontier, context.line);
      if (changedLines.length) {
        runInOp(cm, function() {
          for (var i2 = 0; i2 < changedLines.length; i2++) {
            regLineChange(cm, changedLines[i2], "text");
          }
        });
      }
    }
    var DisplayUpdate = function(cm, viewport, force) {
      var display = cm.display;
      this.viewport = viewport;
      this.visible = visibleLines(display, cm.doc, viewport);
      this.editorIsHidden = !display.wrapper.offsetWidth;
      this.wrapperHeight = display.wrapper.clientHeight;
      this.wrapperWidth = display.wrapper.clientWidth;
      this.oldDisplayWidth = displayWidth(cm);
      this.force = force;
      this.dims = getDimensions(cm);
      this.events = [];
    };
    DisplayUpdate.prototype.signal = function(emitter, type) {
      if (hasHandler(emitter, type)) {
        this.events.push(arguments);
      }
    };
    DisplayUpdate.prototype.finish = function() {
      for (var i2 = 0; i2 < this.events.length; i2++) {
        signal.apply(null, this.events[i2]);
      }
    };
    function maybeClipScrollbars(cm) {
      var display = cm.display;
      if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
        display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
        display.heightForcer.style.height = scrollGap(cm) + "px";
        display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
        display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
        display.scrollbarsClipped = true;
      }
    }
    function selectionSnapshot(cm) {
      if (cm.hasFocus()) {
        return null;
      }
      var active = activeElt(doc(cm));
      if (!active || !contains(cm.display.lineDiv, active)) {
        return null;
      }
      var result = {activeElt: active};
      if (window.getSelection) {
        var sel = win(cm).getSelection();
        if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
          result.anchorNode = sel.anchorNode;
          result.anchorOffset = sel.anchorOffset;
          result.focusNode = sel.focusNode;
          result.focusOffset = sel.focusOffset;
        }
      }
      return result;
    }
    function restoreSelection(snapshot) {
      if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt(snapshot.activeElt.ownerDocument)) {
        return;
      }
      snapshot.activeElt.focus();
      if (!/^(INPUT|TEXTAREA)$/.test(snapshot.activeElt.nodeName) && snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
        var doc2 = snapshot.activeElt.ownerDocument;
        var sel = doc2.defaultView.getSelection(), range2 = doc2.createRange();
        range2.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
        range2.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range2);
        sel.extend(snapshot.focusNode, snapshot.focusOffset);
      }
    }
    function updateDisplayIfNeeded(cm, update) {
      var display = cm.display, doc2 = cm.doc;
      if (update.editorIsHidden) {
        resetView(cm);
        return false;
      }
      if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0) {
        return false;
      }
      if (maybeUpdateLineNumberWidth(cm)) {
        resetView(cm);
        update.dims = getDimensions(cm);
      }
      var end = doc2.first + doc2.size;
      var from = Math.max(update.visible.from - cm.options.viewportMargin, doc2.first);
      var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
      if (display.viewFrom < from && from - display.viewFrom < 20) {
        from = Math.max(doc2.first, display.viewFrom);
      }
      if (display.viewTo > to && display.viewTo - to < 20) {
        to = Math.min(end, display.viewTo);
      }
      if (sawCollapsedSpans) {
        from = visualLineNo(cm.doc, from);
        to = visualLineEndNo(cm.doc, to);
      }
      var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
      adjustView(cm, from, to);
      display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
      cm.display.mover.style.top = display.viewOffset + "px";
      var toUpdate = countDirtyView(cm);
      if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
        return false;
      }
      var selSnapshot = selectionSnapshot(cm);
      if (toUpdate > 4) {
        display.lineDiv.style.display = "none";
      }
      patchDisplay(cm, display.updateLineNumbers, update.dims);
      if (toUpdate > 4) {
        display.lineDiv.style.display = "";
      }
      display.renderedView = display.view;
      restoreSelection(selSnapshot);
      removeChildren(display.cursorDiv);
      removeChildren(display.selectionDiv);
      display.gutters.style.height = display.sizer.style.minHeight = 0;
      if (different) {
        display.lastWrapHeight = update.wrapperHeight;
        display.lastWrapWidth = update.wrapperWidth;
        startWorker(cm, 400);
      }
      display.updateLineNumbers = null;
      return true;
    }
    function postUpdateDisplay(cm, update) {
      var viewport = update.viewport;
      for (var first = true; ; first = false) {
        if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
          if (viewport && viewport.top != null) {
            viewport = {top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top)};
          }
          update.visible = visibleLines(cm.display, cm.doc, viewport);
          if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) {
            break;
          }
        } else if (first) {
          update.visible = visibleLines(cm.display, cm.doc, viewport);
        }
        if (!updateDisplayIfNeeded(cm, update)) {
          break;
        }
        updateHeightsInViewport(cm);
        var barMeasure = measureForScrollbars(cm);
        updateSelection(cm);
        updateScrollbars(cm, barMeasure);
        setDocumentHeight(cm, barMeasure);
        update.force = false;
      }
      update.signal(cm, "update", cm);
      if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
        update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
        cm.display.reportedViewFrom = cm.display.viewFrom;
        cm.display.reportedViewTo = cm.display.viewTo;
      }
    }
    function updateDisplaySimple(cm, viewport) {
      var update = new DisplayUpdate(cm, viewport);
      if (updateDisplayIfNeeded(cm, update)) {
        updateHeightsInViewport(cm);
        postUpdateDisplay(cm, update);
        var barMeasure = measureForScrollbars(cm);
        updateSelection(cm);
        updateScrollbars(cm, barMeasure);
        setDocumentHeight(cm, barMeasure);
        update.finish();
      }
    }
    function patchDisplay(cm, updateNumbersFrom, dims) {
      var display = cm.display, lineNumbers = cm.options.lineNumbers;
      var container = display.lineDiv, cur = container.firstChild;
      function rm(node2) {
        var next = node2.nextSibling;
        if (webkit && mac && cm.display.currentWheelTarget == node2) {
          node2.style.display = "none";
        } else {
          node2.parentNode.removeChild(node2);
        }
        return next;
      }
      var view = display.view, lineN = display.viewFrom;
      for (var i2 = 0; i2 < view.length; i2++) {
        var lineView = view[i2];
        if (lineView.hidden)
          ;
        else if (!lineView.node || lineView.node.parentNode != container) {
          var node = buildLineElement(cm, lineView, lineN, dims);
          container.insertBefore(node, cur);
        } else {
          while (cur != lineView.node) {
            cur = rm(cur);
          }
          var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
          if (lineView.changes) {
            if (indexOf(lineView.changes, "gutter") > -1) {
              updateNumber = false;
            }
            updateLineForChanges(cm, lineView, lineN, dims);
          }
          if (updateNumber) {
            removeChildren(lineView.lineNumber);
            lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
          }
          cur = lineView.node.nextSibling;
        }
        lineN += lineView.size;
      }
      while (cur) {
        cur = rm(cur);
      }
    }
    function updateGutterSpace(display) {
      var width = display.gutters.offsetWidth;
      display.sizer.style.marginLeft = width + "px";
      signalLater(display, "gutterChanged", display);
    }
    function setDocumentHeight(cm, measure) {
      cm.display.sizer.style.minHeight = measure.docHeight + "px";
      cm.display.heightForcer.style.top = measure.docHeight + "px";
      cm.display.gutters.style.height = measure.docHeight + cm.display.barHeight + scrollGap(cm) + "px";
    }
    function alignHorizontally(cm) {
      var display = cm.display, view = display.view;
      if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) {
        return;
      }
      var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
      var gutterW = display.gutters.offsetWidth, left = comp + "px";
      for (var i2 = 0; i2 < view.length; i2++) {
        if (!view[i2].hidden) {
          if (cm.options.fixedGutter) {
            if (view[i2].gutter) {
              view[i2].gutter.style.left = left;
            }
            if (view[i2].gutterBackground) {
              view[i2].gutterBackground.style.left = left;
            }
          }
          var align = view[i2].alignable;
          if (align) {
            for (var j = 0; j < align.length; j++) {
              align[j].style.left = left;
            }
          }
        }
      }
      if (cm.options.fixedGutter) {
        display.gutters.style.left = comp + gutterW + "px";
      }
    }
    function maybeUpdateLineNumberWidth(cm) {
      if (!cm.options.lineNumbers) {
        return false;
      }
      var doc2 = cm.doc, last = lineNumberFor(cm.options, doc2.first + doc2.size - 1), display = cm.display;
      if (last.length != display.lineNumChars) {
        var test = display.measure.appendChild(elt("div", [elt("div", last)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
        var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
        display.lineGutter.style.width = "";
        display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
        display.lineNumWidth = display.lineNumInnerWidth + padding;
        display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
        display.lineGutter.style.width = display.lineNumWidth + "px";
        updateGutterSpace(cm.display);
        return true;
      }
      return false;
    }
    function getGutters(gutters, lineNumbers) {
      var result = [], sawLineNumbers = false;
      for (var i2 = 0; i2 < gutters.length; i2++) {
        var name = gutters[i2], style = null;
        if (typeof name != "string") {
          style = name.style;
          name = name.className;
        }
        if (name == "CodeMirror-linenumbers") {
          if (!lineNumbers) {
            continue;
          } else {
            sawLineNumbers = true;
          }
        }
        result.push({className: name, style});
      }
      if (lineNumbers && !sawLineNumbers) {
        result.push({className: "CodeMirror-linenumbers", style: null});
      }
      return result;
    }
    function renderGutters(display) {
      var gutters = display.gutters, specs = display.gutterSpecs;
      removeChildren(gutters);
      display.lineGutter = null;
      for (var i2 = 0; i2 < specs.length; ++i2) {
        var ref = specs[i2];
        var className = ref.className;
        var style = ref.style;
        var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
        if (style) {
          gElt.style.cssText = style;
        }
        if (className == "CodeMirror-linenumbers") {
          display.lineGutter = gElt;
          gElt.style.width = (display.lineNumWidth || 1) + "px";
        }
      }
      gutters.style.display = specs.length ? "" : "none";
      updateGutterSpace(display);
    }
    function updateGutters(cm) {
      renderGutters(cm.display);
      regChange(cm);
      alignHorizontally(cm);
    }
    function Display(place, doc2, input, options) {
      var d = this;
      this.input = input;
      d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
      d.scrollbarFiller.setAttribute("cm-not-content", "true");
      d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
      d.gutterFiller.setAttribute("cm-not-content", "true");
      d.lineDiv = eltP("div", null, "CodeMirror-code");
      d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
      d.cursorDiv = elt("div", null, "CodeMirror-cursors");
      d.measure = elt("div", null, "CodeMirror-measure");
      d.lineMeasure = elt("div", null, "CodeMirror-measure");
      d.lineSpace = eltP("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv], null, "position: relative; outline: none");
      var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
      d.mover = elt("div", [lines], null, "position: relative");
      d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
      d.sizerWidth = null;
      d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
      d.gutters = elt("div", null, "CodeMirror-gutters");
      d.lineGutter = null;
      d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
      d.scroller.setAttribute("tabIndex", "-1");
      d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
      d.wrapper.setAttribute("translate", "no");
      if (ie && ie_version < 8) {
        d.gutters.style.zIndex = -1;
        d.scroller.style.paddingRight = 0;
      }
      if (!webkit && !(gecko && mobile)) {
        d.scroller.draggable = true;
      }
      if (place) {
        if (place.appendChild) {
          place.appendChild(d.wrapper);
        } else {
          place(d.wrapper);
        }
      }
      d.viewFrom = d.viewTo = doc2.first;
      d.reportedViewFrom = d.reportedViewTo = doc2.first;
      d.view = [];
      d.renderedView = null;
      d.externalMeasured = null;
      d.viewOffset = 0;
      d.lastWrapHeight = d.lastWrapWidth = 0;
      d.updateLineNumbers = null;
      d.nativeBarWidth = d.barHeight = d.barWidth = 0;
      d.scrollbarsClipped = false;
      d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
      d.alignWidgets = false;
      d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
      d.maxLine = null;
      d.maxLineLength = 0;
      d.maxLineChanged = false;
      d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
      d.shift = false;
      d.selForContextMenu = null;
      d.activeTouch = null;
      d.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
      renderGutters(d);
      input.init(d);
    }
    var wheelSamples = 0, wheelPixelsPerUnit = null;
    if (ie) {
      wheelPixelsPerUnit = -0.53;
    } else if (gecko) {
      wheelPixelsPerUnit = 15;
    } else if (chrome) {
      wheelPixelsPerUnit = -0.7;
    } else if (safari) {
      wheelPixelsPerUnit = -1 / 3;
    }
    function wheelEventDelta(e) {
      var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
      if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) {
        dx = e.detail;
      }
      if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) {
        dy = e.detail;
      } else if (dy == null) {
        dy = e.wheelDelta;
      }
      return {x: dx, y: dy};
    }
    function wheelEventPixels(e) {
      var delta = wheelEventDelta(e);
      delta.x *= wheelPixelsPerUnit;
      delta.y *= wheelPixelsPerUnit;
      return delta;
    }
    function onScrollWheel(cm, e) {
      if (chrome && chrome_version == 102) {
        if (cm.display.chromeScrollHack == null) {
          cm.display.sizer.style.pointerEvents = "none";
        } else {
          clearTimeout(cm.display.chromeScrollHack);
        }
        cm.display.chromeScrollHack = setTimeout(function() {
          cm.display.chromeScrollHack = null;
          cm.display.sizer.style.pointerEvents = "";
        }, 100);
      }
      var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;
      var pixelsPerUnit = wheelPixelsPerUnit;
      if (e.deltaMode === 0) {
        dx = e.deltaX;
        dy = e.deltaY;
        pixelsPerUnit = 1;
      }
      var display = cm.display, scroll = display.scroller;
      var canScrollX = scroll.scrollWidth > scroll.clientWidth;
      var canScrollY = scroll.scrollHeight > scroll.clientHeight;
      if (!(dx && canScrollX || dy && canScrollY)) {
        return;
      }
      if (dy && mac && webkit) {
        outer:
          for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
            for (var i2 = 0; i2 < view.length; i2++) {
              if (view[i2].node == cur) {
                cm.display.currentWheelTarget = cur;
                break outer;
              }
            }
          }
      }
      if (dx && !gecko && !presto && pixelsPerUnit != null) {
        if (dy && canScrollY) {
          updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * pixelsPerUnit));
        }
        setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * pixelsPerUnit));
        if (!dy || dy && canScrollY) {
          e_preventDefault(e);
        }
        display.wheelStartX = null;
        return;
      }
      if (dy && pixelsPerUnit != null) {
        var pixels = dy * pixelsPerUnit;
        var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
        if (pixels < 0) {
          top = Math.max(0, top + pixels - 50);
        } else {
          bot = Math.min(cm.doc.height, bot + pixels + 50);
        }
        updateDisplaySimple(cm, {top, bottom: bot});
      }
      if (wheelSamples < 20 && e.deltaMode !== 0) {
        if (display.wheelStartX == null) {
          display.wheelStartX = scroll.scrollLeft;
          display.wheelStartY = scroll.scrollTop;
          display.wheelDX = dx;
          display.wheelDY = dy;
          setTimeout(function() {
            if (display.wheelStartX == null) {
              return;
            }
            var movedX = scroll.scrollLeft - display.wheelStartX;
            var movedY = scroll.scrollTop - display.wheelStartY;
            var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
            display.wheelStartX = display.wheelStartY = null;
            if (!sample) {
              return;
            }
            wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
            ++wheelSamples;
          }, 200);
        } else {
          display.wheelDX += dx;
          display.wheelDY += dy;
        }
      }
    }
    var Selection = function(ranges, primIndex) {
      this.ranges = ranges;
      this.primIndex = primIndex;
    };
    Selection.prototype.primary = function() {
      return this.ranges[this.primIndex];
    };
    Selection.prototype.equals = function(other) {
      if (other == this) {
        return true;
      }
      if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
        return false;
      }
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        var here = this.ranges[i2], there = other.ranges[i2];
        if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
          return false;
        }
      }
      return true;
    };
    Selection.prototype.deepCopy = function() {
      var out = [];
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        out[i2] = new Range(copyPos(this.ranges[i2].anchor), copyPos(this.ranges[i2].head));
      }
      return new Selection(out, this.primIndex);
    };
    Selection.prototype.somethingSelected = function() {
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        if (!this.ranges[i2].empty()) {
          return true;
        }
      }
      return false;
    };
    Selection.prototype.contains = function(pos, end) {
      if (!end) {
        end = pos;
      }
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        var range2 = this.ranges[i2];
        if (cmp(end, range2.from()) >= 0 && cmp(pos, range2.to()) <= 0) {
          return i2;
        }
      }
      return -1;
    };
    var Range = function(anchor, head) {
      this.anchor = anchor;
      this.head = head;
    };
    Range.prototype.from = function() {
      return minPos(this.anchor, this.head);
    };
    Range.prototype.to = function() {
      return maxPos(this.anchor, this.head);
    };
    Range.prototype.empty = function() {
      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
    };
    function normalizeSelection(cm, ranges, primIndex) {
      var mayTouch = cm && cm.options.selectionsMayTouch;
      var prim = ranges[primIndex];
      ranges.sort(function(a, b) {
        return cmp(a.from(), b.from());
      });
      primIndex = indexOf(ranges, prim);
      for (var i2 = 1; i2 < ranges.length; i2++) {
        var cur = ranges[i2], prev = ranges[i2 - 1];
        var diff = cmp(prev.to(), cur.from());
        if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
          var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
          var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
          if (i2 <= primIndex) {
            --primIndex;
          }
          ranges.splice(--i2, 2, new Range(inv ? to : from, inv ? from : to));
        }
      }
      return new Selection(ranges, primIndex);
    }
    function simpleSelection(anchor, head) {
      return new Selection([new Range(anchor, head || anchor)], 0);
    }
    function changeEnd(change) {
      if (!change.text) {
        return change.to;
      }
      return Pos(change.from.line + change.text.length - 1, lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
    }
    function adjustForChange(pos, change) {
      if (cmp(pos, change.from) < 0) {
        return pos;
      }
      if (cmp(pos, change.to) <= 0) {
        return changeEnd(change);
      }
      var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
      if (pos.line == change.to.line) {
        ch += changeEnd(change).ch - change.to.ch;
      }
      return Pos(line, ch);
    }
    function computeSelAfterChange(doc2, change) {
      var out = [];
      for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
        var range2 = doc2.sel.ranges[i2];
        out.push(new Range(adjustForChange(range2.anchor, change), adjustForChange(range2.head, change)));
      }
      return normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
    }
    function offsetPos(pos, old, nw) {
      if (pos.line == old.line) {
        return Pos(nw.line, pos.ch - old.ch + nw.ch);
      } else {
        return Pos(nw.line + (pos.line - old.line), pos.ch);
      }
    }
    function computeReplacedSel(doc2, changes, hint) {
      var out = [];
      var oldPrev = Pos(doc2.first, 0), newPrev = oldPrev;
      for (var i2 = 0; i2 < changes.length; i2++) {
        var change = changes[i2];
        var from = offsetPos(change.from, oldPrev, newPrev);
        var to = offsetPos(changeEnd(change), oldPrev, newPrev);
        oldPrev = change.to;
        newPrev = to;
        if (hint == "around") {
          var range2 = doc2.sel.ranges[i2], inv = cmp(range2.head, range2.anchor) < 0;
          out[i2] = new Range(inv ? to : from, inv ? from : to);
        } else {
          out[i2] = new Range(from, from);
        }
      }
      return new Selection(out, doc2.sel.primIndex);
    }
    function loadMode(cm) {
      cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
      resetModeState(cm);
    }
    function resetModeState(cm) {
      cm.doc.iter(function(line) {
        if (line.stateAfter) {
          line.stateAfter = null;
        }
        if (line.styles) {
          line.styles = null;
        }
      });
      cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
      startWorker(cm, 100);
      cm.state.modeGen++;
      if (cm.curOp) {
        regChange(cm);
      }
    }
    function isWholeLineUpdate(doc2, change) {
      return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc2.cm || doc2.cm.options.wholeLineUpdateBefore);
    }
    function updateDoc(doc2, change, markedSpans, estimateHeight2) {
      function spansFor(n) {
        return markedSpans ? markedSpans[n] : null;
      }
      function update(line, text2, spans) {
        updateLine(line, text2, spans, estimateHeight2);
        signalLater(line, "change", line, change);
      }
      function linesFor(start, end) {
        var result = [];
        for (var i2 = start; i2 < end; ++i2) {
          result.push(new Line(text[i2], spansFor(i2), estimateHeight2));
        }
        return result;
      }
      var from = change.from, to = change.to, text = change.text;
      var firstLine = getLine(doc2, from.line), lastLine = getLine(doc2, to.line);
      var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
      if (change.full) {
        doc2.insert(0, linesFor(0, text.length));
        doc2.remove(text.length, doc2.size - text.length);
      } else if (isWholeLineUpdate(doc2, change)) {
        var added = linesFor(0, text.length - 1);
        update(lastLine, lastLine.text, lastSpans);
        if (nlines) {
          doc2.remove(from.line, nlines);
        }
        if (added.length) {
          doc2.insert(from.line, added);
        }
      } else if (firstLine == lastLine) {
        if (text.length == 1) {
          update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
        } else {
          var added$1 = linesFor(1, text.length - 1);
          added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight2));
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
          doc2.insert(from.line + 1, added$1);
        }
      } else if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
        doc2.remove(from.line + 1, nlines);
      } else {
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
        var added$2 = linesFor(1, text.length - 1);
        if (nlines > 1) {
          doc2.remove(from.line + 1, nlines - 1);
        }
        doc2.insert(from.line + 1, added$2);
      }
      signalLater(doc2, "change", doc2, change);
    }
    function linkedDocs(doc2, f, sharedHistOnly) {
      function propagate(doc3, skip, sharedHist) {
        if (doc3.linked) {
          for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
            var rel = doc3.linked[i2];
            if (rel.doc == skip) {
              continue;
            }
            var shared = sharedHist && rel.sharedHist;
            if (sharedHistOnly && !shared) {
              continue;
            }
            f(rel.doc, shared);
            propagate(rel.doc, doc3, shared);
          }
        }
      }
      propagate(doc2, null, true);
    }
    function attachDoc(cm, doc2) {
      if (doc2.cm) {
        throw new Error("This document is already in use.");
      }
      cm.doc = doc2;
      doc2.cm = cm;
      estimateLineHeights(cm);
      loadMode(cm);
      setDirectionClass(cm);
      cm.options.direction = doc2.direction;
      if (!cm.options.lineWrapping) {
        findMaxLine(cm);
      }
      cm.options.mode = doc2.modeOption;
      regChange(cm);
    }
    function setDirectionClass(cm) {
      (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
    }
    function directionChanged(cm) {
      runInOp(cm, function() {
        setDirectionClass(cm);
        regChange(cm);
      });
    }
    function History(prev) {
      this.done = [];
      this.undone = [];
      this.undoDepth = prev ? prev.undoDepth : Infinity;
      this.lastModTime = this.lastSelTime = 0;
      this.lastOp = this.lastSelOp = null;
      this.lastOrigin = this.lastSelOrigin = null;
      this.generation = this.maxGeneration = prev ? prev.maxGeneration : 1;
    }
    function historyChangeFromChange(doc2, change) {
      var histChange = {from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc2, change.from, change.to)};
      attachLocalSpans(doc2, histChange, change.from.line, change.to.line + 1);
      linkedDocs(doc2, function(doc3) {
        return attachLocalSpans(doc3, histChange, change.from.line, change.to.line + 1);
      }, true);
      return histChange;
    }
    function clearSelectionEvents(array) {
      while (array.length) {
        var last = lst(array);
        if (last.ranges) {
          array.pop();
        } else {
          break;
        }
      }
    }
    function lastChangeEvent(hist, force) {
      if (force) {
        clearSelectionEvents(hist.done);
        return lst(hist.done);
      } else if (hist.done.length && !lst(hist.done).ranges) {
        return lst(hist.done);
      } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
        hist.done.pop();
        return lst(hist.done);
      }
    }
    function addChangeToHistory(doc2, change, selAfter, opId) {
      var hist = doc2.history;
      hist.undone.length = 0;
      var time = +new Date(), cur;
      var last;
      if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc2.cm ? doc2.cm.options.historyEventDelay : 500) || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
        last = lst(cur.changes);
        if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
          last.to = changeEnd(change);
        } else {
          cur.changes.push(historyChangeFromChange(doc2, change));
        }
      } else {
        var before = lst(hist.done);
        if (!before || !before.ranges) {
          pushSelectionToHistory(doc2.sel, hist.done);
        }
        cur = {
          changes: [historyChangeFromChange(doc2, change)],
          generation: hist.generation
        };
        hist.done.push(cur);
        while (hist.done.length > hist.undoDepth) {
          hist.done.shift();
          if (!hist.done[0].ranges) {
            hist.done.shift();
          }
        }
      }
      hist.done.push(selAfter);
      hist.generation = ++hist.maxGeneration;
      hist.lastModTime = hist.lastSelTime = time;
      hist.lastOp = hist.lastSelOp = opId;
      hist.lastOrigin = hist.lastSelOrigin = change.origin;
      if (!last) {
        signal(doc2, "historyAdded");
      }
    }
    function selectionEventCanBeMerged(doc2, origin, prev, sel) {
      var ch = origin.charAt(0);
      return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc2.history.lastSelTime <= (doc2.cm ? doc2.cm.options.historyEventDelay : 500);
    }
    function addSelectionToHistory(doc2, sel, opId, options) {
      var hist = doc2.history, origin = options && options.origin;
      if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc2, origin, lst(hist.done), sel))) {
        hist.done[hist.done.length - 1] = sel;
      } else {
        pushSelectionToHistory(sel, hist.done);
      }
      hist.lastSelTime = +new Date();
      hist.lastSelOrigin = origin;
      hist.lastSelOp = opId;
      if (options && options.clearRedo !== false) {
        clearSelectionEvents(hist.undone);
      }
    }
    function pushSelectionToHistory(sel, dest) {
      var top = lst(dest);
      if (!(top && top.ranges && top.equals(sel))) {
        dest.push(sel);
      }
    }
    function attachLocalSpans(doc2, change, from, to) {
      var existing = change["spans_" + doc2.id], n = 0;
      doc2.iter(Math.max(doc2.first, from), Math.min(doc2.first + doc2.size, to), function(line) {
        if (line.markedSpans) {
          (existing || (existing = change["spans_" + doc2.id] = {}))[n] = line.markedSpans;
        }
        ++n;
      });
    }
    function removeClearedSpans(spans) {
      if (!spans) {
        return null;
      }
      var out;
      for (var i2 = 0; i2 < spans.length; ++i2) {
        if (spans[i2].marker.explicitlyCleared) {
          if (!out) {
            out = spans.slice(0, i2);
          }
        } else if (out) {
          out.push(spans[i2]);
        }
      }
      return !out ? spans : out.length ? out : null;
    }
    function getOldSpans(doc2, change) {
      var found = change["spans_" + doc2.id];
      if (!found) {
        return null;
      }
      var nw = [];
      for (var i2 = 0; i2 < change.text.length; ++i2) {
        nw.push(removeClearedSpans(found[i2]));
      }
      return nw;
    }
    function mergeOldSpans(doc2, change) {
      var old = getOldSpans(doc2, change);
      var stretched = stretchSpansOverChange(doc2, change);
      if (!old) {
        return stretched;
      }
      if (!stretched) {
        return old;
      }
      for (var i2 = 0; i2 < old.length; ++i2) {
        var oldCur = old[i2], stretchCur = stretched[i2];
        if (oldCur && stretchCur) {
          spans:
            for (var j = 0; j < stretchCur.length; ++j) {
              var span = stretchCur[j];
              for (var k = 0; k < oldCur.length; ++k) {
                if (oldCur[k].marker == span.marker) {
                  continue spans;
                }
              }
              oldCur.push(span);
            }
        } else if (stretchCur) {
          old[i2] = stretchCur;
        }
      }
      return old;
    }
    function copyHistoryArray(events, newGroup, instantiateSel) {
      var copy = [];
      for (var i2 = 0; i2 < events.length; ++i2) {
        var event = events[i2];
        if (event.ranges) {
          copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
          continue;
        }
        var changes = event.changes, newChanges = [];
        copy.push({changes: newChanges});
        for (var j = 0; j < changes.length; ++j) {
          var change = changes[j], m = void 0;
          newChanges.push({from: change.from, to: change.to, text: change.text});
          if (newGroup) {
            for (var prop2 in change) {
              if (m = prop2.match(/^spans_(\d+)$/)) {
                if (indexOf(newGroup, Number(m[1])) > -1) {
                  lst(newChanges)[prop2] = change[prop2];
                  delete change[prop2];
                }
              }
            }
          }
        }
      }
      return copy;
    }
    function extendRange(range2, head, other, extend) {
      if (extend) {
        var anchor = range2.anchor;
        if (other) {
          var posBefore = cmp(head, anchor) < 0;
          if (posBefore != cmp(other, anchor) < 0) {
            anchor = head;
            head = other;
          } else if (posBefore != cmp(head, other) < 0) {
            head = other;
          }
        }
        return new Range(anchor, head);
      } else {
        return new Range(other || head, head);
      }
    }
    function extendSelection(doc2, head, other, options, extend) {
      if (extend == null) {
        extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
      }
      setSelection(doc2, new Selection([extendRange(doc2.sel.primary(), head, other, extend)], 0), options);
    }
    function extendSelections(doc2, heads, options) {
      var out = [];
      var extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
      for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
        out[i2] = extendRange(doc2.sel.ranges[i2], heads[i2], null, extend);
      }
      var newSel = normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
      setSelection(doc2, newSel, options);
    }
    function replaceOneSelection(doc2, i2, range2, options) {
      var ranges = doc2.sel.ranges.slice(0);
      ranges[i2] = range2;
      setSelection(doc2, normalizeSelection(doc2.cm, ranges, doc2.sel.primIndex), options);
    }
    function setSimpleSelection(doc2, anchor, head, options) {
      setSelection(doc2, simpleSelection(anchor, head), options);
    }
    function filterSelectionChange(doc2, sel, options) {
      var obj = {
        ranges: sel.ranges,
        update: function(ranges) {
          this.ranges = [];
          for (var i2 = 0; i2 < ranges.length; i2++) {
            this.ranges[i2] = new Range(clipPos(doc2, ranges[i2].anchor), clipPos(doc2, ranges[i2].head));
          }
        },
        origin: options && options.origin
      };
      signal(doc2, "beforeSelectionChange", doc2, obj);
      if (doc2.cm) {
        signal(doc2.cm, "beforeSelectionChange", doc2.cm, obj);
      }
      if (obj.ranges != sel.ranges) {
        return normalizeSelection(doc2.cm, obj.ranges, obj.ranges.length - 1);
      } else {
        return sel;
      }
    }
    function setSelectionReplaceHistory(doc2, sel, options) {
      var done = doc2.history.done, last = lst(done);
      if (last && last.ranges) {
        done[done.length - 1] = sel;
        setSelectionNoUndo(doc2, sel, options);
      } else {
        setSelection(doc2, sel, options);
      }
    }
    function setSelection(doc2, sel, options) {
      setSelectionNoUndo(doc2, sel, options);
      addSelectionToHistory(doc2, doc2.sel, doc2.cm ? doc2.cm.curOp.id : NaN, options);
    }
    function setSelectionNoUndo(doc2, sel, options) {
      if (hasHandler(doc2, "beforeSelectionChange") || doc2.cm && hasHandler(doc2.cm, "beforeSelectionChange")) {
        sel = filterSelectionChange(doc2, sel, options);
      }
      var bias = options && options.bias || (cmp(sel.primary().head, doc2.sel.primary().head) < 0 ? -1 : 1);
      setSelectionInner(doc2, skipAtomicInSelection(doc2, sel, bias, true));
      if (!(options && options.scroll === false) && doc2.cm && doc2.cm.getOption("readOnly") != "nocursor") {
        ensureCursorVisible(doc2.cm);
      }
    }
    function setSelectionInner(doc2, sel) {
      if (sel.equals(doc2.sel)) {
        return;
      }
      doc2.sel = sel;
      if (doc2.cm) {
        doc2.cm.curOp.updateInput = 1;
        doc2.cm.curOp.selectionChanged = true;
        signalCursorActivity(doc2.cm);
      }
      signalLater(doc2, "cursorActivity", doc2);
    }
    function reCheckSelection(doc2) {
      setSelectionInner(doc2, skipAtomicInSelection(doc2, doc2.sel, null, false));
    }
    function skipAtomicInSelection(doc2, sel, bias, mayClear) {
      var out;
      for (var i2 = 0; i2 < sel.ranges.length; i2++) {
        var range2 = sel.ranges[i2];
        var old = sel.ranges.length == doc2.sel.ranges.length && doc2.sel.ranges[i2];
        var newAnchor = skipAtomic(doc2, range2.anchor, old && old.anchor, bias, mayClear);
        var newHead = range2.head == range2.anchor ? newAnchor : skipAtomic(doc2, range2.head, old && old.head, bias, mayClear);
        if (out || newAnchor != range2.anchor || newHead != range2.head) {
          if (!out) {
            out = sel.ranges.slice(0, i2);
          }
          out[i2] = new Range(newAnchor, newHead);
        }
      }
      return out ? normalizeSelection(doc2.cm, out, sel.primIndex) : sel;
    }
    function skipAtomicInner(doc2, pos, oldPos, dir, mayClear) {
      var line = getLine(doc2, pos.line);
      if (line.markedSpans) {
        for (var i2 = 0; i2 < line.markedSpans.length; ++i2) {
          var sp = line.markedSpans[i2], m = sp.marker;
          var preventCursorLeft = "selectLeft" in m ? !m.selectLeft : m.inclusiveLeft;
          var preventCursorRight = "selectRight" in m ? !m.selectRight : m.inclusiveRight;
          if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
            if (mayClear) {
              signal(m, "beforeCursorEnter");
              if (m.explicitlyCleared) {
                if (!line.markedSpans) {
                  break;
                } else {
                  --i2;
                  continue;
                }
              }
            }
            if (!m.atomic) {
              continue;
            }
            if (oldPos) {
              var near = m.find(dir < 0 ? 1 : -1), diff = void 0;
              if (dir < 0 ? preventCursorRight : preventCursorLeft) {
                near = movePos(doc2, near, -dir, near && near.line == pos.line ? line : null);
              }
              if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
                return skipAtomicInner(doc2, near, pos, dir, mayClear);
              }
            }
            var far = m.find(dir < 0 ? -1 : 1);
            if (dir < 0 ? preventCursorLeft : preventCursorRight) {
              far = movePos(doc2, far, dir, far.line == pos.line ? line : null);
            }
            return far ? skipAtomicInner(doc2, far, pos, dir, mayClear) : null;
          }
        }
      }
      return pos;
    }
    function skipAtomic(doc2, pos, oldPos, bias, mayClear) {
      var dir = bias || 1;
      var found = skipAtomicInner(doc2, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, dir, true) || skipAtomicInner(doc2, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, -dir, true);
      if (!found) {
        doc2.cantEdit = true;
        return Pos(doc2.first, 0);
      }
      return found;
    }
    function movePos(doc2, pos, dir, line) {
      if (dir < 0 && pos.ch == 0) {
        if (pos.line > doc2.first) {
          return clipPos(doc2, Pos(pos.line - 1));
        } else {
          return null;
        }
      } else if (dir > 0 && pos.ch == (line || getLine(doc2, pos.line)).text.length) {
        if (pos.line < doc2.first + doc2.size - 1) {
          return Pos(pos.line + 1, 0);
        } else {
          return null;
        }
      } else {
        return new Pos(pos.line, pos.ch + dir);
      }
    }
    function selectAll(cm) {
      cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
    }
    function filterChange(doc2, change, update) {
      var obj = {
        canceled: false,
        from: change.from,
        to: change.to,
        text: change.text,
        origin: change.origin,
        cancel: function() {
          return obj.canceled = true;
        }
      };
      if (update) {
        obj.update = function(from, to, text, origin) {
          if (from) {
            obj.from = clipPos(doc2, from);
          }
          if (to) {
            obj.to = clipPos(doc2, to);
          }
          if (text) {
            obj.text = text;
          }
          if (origin !== void 0) {
            obj.origin = origin;
          }
        };
      }
      signal(doc2, "beforeChange", doc2, obj);
      if (doc2.cm) {
        signal(doc2.cm, "beforeChange", doc2.cm, obj);
      }
      if (obj.canceled) {
        if (doc2.cm) {
          doc2.cm.curOp.updateInput = 2;
        }
        return null;
      }
      return {from: obj.from, to: obj.to, text: obj.text, origin: obj.origin};
    }
    function makeChange(doc2, change, ignoreReadOnly) {
      if (doc2.cm) {
        if (!doc2.cm.curOp) {
          return operation(doc2.cm, makeChange)(doc2, change, ignoreReadOnly);
        }
        if (doc2.cm.state.suppressEdits) {
          return;
        }
      }
      if (hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange")) {
        change = filterChange(doc2, change, true);
        if (!change) {
          return;
        }
      }
      var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc2, change.from, change.to);
      if (split) {
        for (var i2 = split.length - 1; i2 >= 0; --i2) {
          makeChangeInner(doc2, {from: split[i2].from, to: split[i2].to, text: i2 ? [""] : change.text, origin: change.origin});
        }
      } else {
        makeChangeInner(doc2, change);
      }
    }
    function makeChangeInner(doc2, change) {
      if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
        return;
      }
      var selAfter = computeSelAfterChange(doc2, change);
      addChangeToHistory(doc2, change, selAfter, doc2.cm ? doc2.cm.curOp.id : NaN);
      makeChangeSingleDoc(doc2, change, selAfter, stretchSpansOverChange(doc2, change));
      var rebased = [];
      linkedDocs(doc2, function(doc3, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
          rebaseHist(doc3.history, change);
          rebased.push(doc3.history);
        }
        makeChangeSingleDoc(doc3, change, null, stretchSpansOverChange(doc3, change));
      });
    }
    function makeChangeFromHistory(doc2, type, allowSelectionOnly) {
      var suppress = doc2.cm && doc2.cm.state.suppressEdits;
      if (suppress && !allowSelectionOnly) {
        return;
      }
      var hist = doc2.history, event, selAfter = doc2.sel;
      var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
      var i2 = 0;
      for (; i2 < source.length; i2++) {
        event = source[i2];
        if (allowSelectionOnly ? event.ranges && !event.equals(doc2.sel) : !event.ranges) {
          break;
        }
      }
      if (i2 == source.length) {
        return;
      }
      hist.lastOrigin = hist.lastSelOrigin = null;
      for (; ; ) {
        event = source.pop();
        if (event.ranges) {
          pushSelectionToHistory(event, dest);
          if (allowSelectionOnly && !event.equals(doc2.sel)) {
            setSelection(doc2, event, {clearRedo: false});
            return;
          }
          selAfter = event;
        } else if (suppress) {
          source.push(event);
          return;
        } else {
          break;
        }
      }
      var antiChanges = [];
      pushSelectionToHistory(selAfter, dest);
      dest.push({changes: antiChanges, generation: hist.generation});
      hist.generation = event.generation || ++hist.maxGeneration;
      var filter = hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange");
      var loop = function(i3) {
        var change = event.changes[i3];
        change.origin = type;
        if (filter && !filterChange(doc2, change, false)) {
          source.length = 0;
          return {};
        }
        antiChanges.push(historyChangeFromChange(doc2, change));
        var after = i3 ? computeSelAfterChange(doc2, change) : lst(source);
        makeChangeSingleDoc(doc2, change, after, mergeOldSpans(doc2, change));
        if (!i3 && doc2.cm) {
          doc2.cm.scrollIntoView({from: change.from, to: changeEnd(change)});
        }
        var rebased = [];
        linkedDocs(doc2, function(doc3, sharedHist) {
          if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
            rebaseHist(doc3.history, change);
            rebased.push(doc3.history);
          }
          makeChangeSingleDoc(doc3, change, null, mergeOldSpans(doc3, change));
        });
      };
      for (var i$12 = event.changes.length - 1; i$12 >= 0; --i$12) {
        var returned = loop(i$12);
        if (returned)
          return returned.v;
      }
    }
    function shiftDoc(doc2, distance) {
      if (distance == 0) {
        return;
      }
      doc2.first += distance;
      doc2.sel = new Selection(map(doc2.sel.ranges, function(range2) {
        return new Range(Pos(range2.anchor.line + distance, range2.anchor.ch), Pos(range2.head.line + distance, range2.head.ch));
      }), doc2.sel.primIndex);
      if (doc2.cm) {
        regChange(doc2.cm, doc2.first, doc2.first - distance, distance);
        for (var d = doc2.cm.display, l = d.viewFrom; l < d.viewTo; l++) {
          regLineChange(doc2.cm, l, "gutter");
        }
      }
    }
    function makeChangeSingleDoc(doc2, change, selAfter, spans) {
      if (doc2.cm && !doc2.cm.curOp) {
        return operation(doc2.cm, makeChangeSingleDoc)(doc2, change, selAfter, spans);
      }
      if (change.to.line < doc2.first) {
        shiftDoc(doc2, change.text.length - 1 - (change.to.line - change.from.line));
        return;
      }
      if (change.from.line > doc2.lastLine()) {
        return;
      }
      if (change.from.line < doc2.first) {
        var shift = change.text.length - 1 - (doc2.first - change.from.line);
        shiftDoc(doc2, shift);
        change = {
          from: Pos(doc2.first, 0),
          to: Pos(change.to.line + shift, change.to.ch),
          text: [lst(change.text)],
          origin: change.origin
        };
      }
      var last = doc2.lastLine();
      if (change.to.line > last) {
        change = {
          from: change.from,
          to: Pos(last, getLine(doc2, last).text.length),
          text: [change.text[0]],
          origin: change.origin
        };
      }
      change.removed = getBetween(doc2, change.from, change.to);
      if (!selAfter) {
        selAfter = computeSelAfterChange(doc2, change);
      }
      if (doc2.cm) {
        makeChangeSingleDocInEditor(doc2.cm, change, spans);
      } else {
        updateDoc(doc2, change, spans);
      }
      setSelectionNoUndo(doc2, selAfter, sel_dontScroll);
      if (doc2.cantEdit && skipAtomic(doc2, Pos(doc2.firstLine(), 0))) {
        doc2.cantEdit = false;
      }
    }
    function makeChangeSingleDocInEditor(cm, change, spans) {
      var doc2 = cm.doc, display = cm.display, from = change.from, to = change.to;
      var recomputeMaxLength = false, checkWidthStart = from.line;
      if (!cm.options.lineWrapping) {
        checkWidthStart = lineNo(visualLine(getLine(doc2, from.line)));
        doc2.iter(checkWidthStart, to.line + 1, function(line) {
          if (line == display.maxLine) {
            recomputeMaxLength = true;
            return true;
          }
        });
      }
      if (doc2.sel.contains(change.from, change.to) > -1) {
        signalCursorActivity(cm);
      }
      updateDoc(doc2, change, spans, estimateHeight(cm));
      if (!cm.options.lineWrapping) {
        doc2.iter(checkWidthStart, from.line + change.text.length, function(line) {
          var len = lineLength(line);
          if (len > display.maxLineLength) {
            display.maxLine = line;
            display.maxLineLength = len;
            display.maxLineChanged = true;
            recomputeMaxLength = false;
          }
        });
        if (recomputeMaxLength) {
          cm.curOp.updateMaxLine = true;
        }
      }
      retreatFrontier(doc2, from.line);
      startWorker(cm, 400);
      var lendiff = change.text.length - (to.line - from.line) - 1;
      if (change.full) {
        regChange(cm);
      } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) {
        regLineChange(cm, from.line, "text");
      } else {
        regChange(cm, from.line, to.line + 1, lendiff);
      }
      var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
      if (changeHandler || changesHandler) {
        var obj = {
          from,
          to,
          text: change.text,
          removed: change.removed,
          origin: change.origin
        };
        if (changeHandler) {
          signalLater(cm, "change", cm, obj);
        }
        if (changesHandler) {
          (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
        }
      }
      cm.display.selForContextMenu = null;
    }
    function replaceRange(doc2, code, from, to, origin) {
      var assign;
      if (!to) {
        to = from;
      }
      if (cmp(to, from) < 0) {
        assign = [to, from], from = assign[0], to = assign[1];
      }
      if (typeof code == "string") {
        code = doc2.splitLines(code);
      }
      makeChange(doc2, {from, to, text: code, origin});
    }
    function rebaseHistSelSingle(pos, from, to, diff) {
      if (to < pos.line) {
        pos.line += diff;
      } else if (from < pos.line) {
        pos.line = from;
        pos.ch = 0;
      }
    }
    function rebaseHistArray(array, from, to, diff) {
      for (var i2 = 0; i2 < array.length; ++i2) {
        var sub = array[i2], ok = true;
        if (sub.ranges) {
          if (!sub.copied) {
            sub = array[i2] = sub.deepCopy();
            sub.copied = true;
          }
          for (var j = 0; j < sub.ranges.length; j++) {
            rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
            rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
          }
          continue;
        }
        for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
          var cur = sub.changes[j$1];
          if (to < cur.from.line) {
            cur.from = Pos(cur.from.line + diff, cur.from.ch);
            cur.to = Pos(cur.to.line + diff, cur.to.ch);
          } else if (from <= cur.to.line) {
            ok = false;
            break;
          }
        }
        if (!ok) {
          array.splice(0, i2 + 1);
          i2 = 0;
        }
      }
    }
    function rebaseHist(hist, change) {
      var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
      rebaseHistArray(hist.done, from, to, diff);
      rebaseHistArray(hist.undone, from, to, diff);
    }
    function changeLine(doc2, handle, changeType, op) {
      var no = handle, line = handle;
      if (typeof handle == "number") {
        line = getLine(doc2, clipLine(doc2, handle));
      } else {
        no = lineNo(handle);
      }
      if (no == null) {
        return null;
      }
      if (op(line, no) && doc2.cm) {
        regLineChange(doc2.cm, no, changeType);
      }
      return line;
    }
    function LeafChunk(lines) {
      this.lines = lines;
      this.parent = null;
      var height = 0;
      for (var i2 = 0; i2 < lines.length; ++i2) {
        lines[i2].parent = this;
        height += lines[i2].height;
      }
      this.height = height;
    }
    LeafChunk.prototype = {
      chunkSize: function() {
        return this.lines.length;
      },
      removeInner: function(at, n) {
        for (var i2 = at, e = at + n; i2 < e; ++i2) {
          var line = this.lines[i2];
          this.height -= line.height;
          cleanUpLine(line);
          signalLater(line, "delete");
        }
        this.lines.splice(at, n);
      },
      collapse: function(lines) {
        lines.push.apply(lines, this.lines);
      },
      insertInner: function(at, lines, height) {
        this.height += height;
        this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
        for (var i2 = 0; i2 < lines.length; ++i2) {
          lines[i2].parent = this;
        }
      },
      iterN: function(at, n, op) {
        for (var e = at + n; at < e; ++at) {
          if (op(this.lines[at])) {
            return true;
          }
        }
      }
    };
    function BranchChunk(children) {
      this.children = children;
      var size = 0, height = 0;
      for (var i2 = 0; i2 < children.length; ++i2) {
        var ch = children[i2];
        size += ch.chunkSize();
        height += ch.height;
        ch.parent = this;
      }
      this.size = size;
      this.height = height;
      this.parent = null;
    }
    BranchChunk.prototype = {
      chunkSize: function() {
        return this.size;
      },
      removeInner: function(at, n) {
        this.size -= n;
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          var child = this.children[i2], sz = child.chunkSize();
          if (at < sz) {
            var rm = Math.min(n, sz - at), oldHeight = child.height;
            child.removeInner(at, rm);
            this.height -= oldHeight - child.height;
            if (sz == rm) {
              this.children.splice(i2--, 1);
              child.parent = null;
            }
            if ((n -= rm) == 0) {
              break;
            }
            at = 0;
          } else {
            at -= sz;
          }
        }
        if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
          var lines = [];
          this.collapse(lines);
          this.children = [new LeafChunk(lines)];
          this.children[0].parent = this;
        }
      },
      collapse: function(lines) {
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          this.children[i2].collapse(lines);
        }
      },
      insertInner: function(at, lines, height) {
        this.size += lines.length;
        this.height += height;
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          var child = this.children[i2], sz = child.chunkSize();
          if (at <= sz) {
            child.insertInner(at, lines, height);
            if (child.lines && child.lines.length > 50) {
              var remaining = child.lines.length % 25 + 25;
              for (var pos = remaining; pos < child.lines.length; ) {
                var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
                child.height -= leaf.height;
                this.children.splice(++i2, 0, leaf);
                leaf.parent = this;
              }
              child.lines = child.lines.slice(0, remaining);
              this.maybeSpill();
            }
            break;
          }
          at -= sz;
        }
      },
      maybeSpill: function() {
        if (this.children.length <= 10) {
          return;
        }
        var me = this;
        do {
          var spilled = me.children.splice(me.children.length - 5, 5);
          var sibling = new BranchChunk(spilled);
          if (!me.parent) {
            var copy = new BranchChunk(me.children);
            copy.parent = me;
            me.children = [copy, sibling];
            me = copy;
          } else {
            me.size -= sibling.size;
            me.height -= sibling.height;
            var myIndex = indexOf(me.parent.children, me);
            me.parent.children.splice(myIndex + 1, 0, sibling);
          }
          sibling.parent = me.parent;
        } while (me.children.length > 10);
        me.parent.maybeSpill();
      },
      iterN: function(at, n, op) {
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          var child = this.children[i2], sz = child.chunkSize();
          if (at < sz) {
            var used = Math.min(n, sz - at);
            if (child.iterN(at, used, op)) {
              return true;
            }
            if ((n -= used) == 0) {
              break;
            }
            at = 0;
          } else {
            at -= sz;
          }
        }
      }
    };
    var LineWidget = function(doc2, node, options) {
      if (options) {
        for (var opt in options) {
          if (options.hasOwnProperty(opt)) {
            this[opt] = options[opt];
          }
        }
      }
      this.doc = doc2;
      this.node = node;
    };
    LineWidget.prototype.clear = function() {
      var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
      if (no == null || !ws) {
        return;
      }
      for (var i2 = 0; i2 < ws.length; ++i2) {
        if (ws[i2] == this) {
          ws.splice(i2--, 1);
        }
      }
      if (!ws.length) {
        line.widgets = null;
      }
      var height = widgetHeight(this);
      updateLineHeight(line, Math.max(0, line.height - height));
      if (cm) {
        runInOp(cm, function() {
          adjustScrollWhenAboveVisible(cm, line, -height);
          regLineChange(cm, no, "widget");
        });
        signalLater(cm, "lineWidgetCleared", cm, this, no);
      }
    };
    LineWidget.prototype.changed = function() {
      var this$1 = this;
      var oldH = this.height, cm = this.doc.cm, line = this.line;
      this.height = null;
      var diff = widgetHeight(this) - oldH;
      if (!diff) {
        return;
      }
      if (!lineIsHidden(this.doc, line)) {
        updateLineHeight(line, line.height + diff);
      }
      if (cm) {
        runInOp(cm, function() {
          cm.curOp.forceUpdate = true;
          adjustScrollWhenAboveVisible(cm, line, diff);
          signalLater(cm, "lineWidgetChanged", cm, this$1, lineNo(line));
        });
      }
    };
    eventMixin(LineWidget);
    function adjustScrollWhenAboveVisible(cm, line, diff) {
      if (heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) {
        addToScrollTop(cm, diff);
      }
    }
    function addLineWidget(doc2, handle, node, options) {
      var widget = new LineWidget(doc2, node, options);
      var cm = doc2.cm;
      if (cm && widget.noHScroll) {
        cm.display.alignWidgets = true;
      }
      changeLine(doc2, handle, "widget", function(line) {
        var widgets = line.widgets || (line.widgets = []);
        if (widget.insertAt == null) {
          widgets.push(widget);
        } else {
          widgets.splice(Math.min(widgets.length, Math.max(0, widget.insertAt)), 0, widget);
        }
        widget.line = line;
        if (cm && !lineIsHidden(doc2, line)) {
          var aboveVisible = heightAtLine(line) < doc2.scrollTop;
          updateLineHeight(line, line.height + widgetHeight(widget));
          if (aboveVisible) {
            addToScrollTop(cm, widget.height);
          }
          cm.curOp.forceUpdate = true;
        }
        return true;
      });
      if (cm) {
        signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
      }
      return widget;
    }
    var nextMarkerId = 0;
    var TextMarker = function(doc2, type) {
      this.lines = [];
      this.type = type;
      this.doc = doc2;
      this.id = ++nextMarkerId;
    };
    TextMarker.prototype.clear = function() {
      if (this.explicitlyCleared) {
        return;
      }
      var cm = this.doc.cm, withOp = cm && !cm.curOp;
      if (withOp) {
        startOperation(cm);
      }
      if (hasHandler(this, "clear")) {
        var found = this.find();
        if (found) {
          signalLater(this, "clear", found.from, found.to);
        }
      }
      var min = null, max = null;
      for (var i2 = 0; i2 < this.lines.length; ++i2) {
        var line = this.lines[i2];
        var span = getMarkedSpanFor(line.markedSpans, this);
        if (cm && !this.collapsed) {
          regLineChange(cm, lineNo(line), "text");
        } else if (cm) {
          if (span.to != null) {
            max = lineNo(line);
          }
          if (span.from != null) {
            min = lineNo(line);
          }
        }
        line.markedSpans = removeMarkedSpan(line.markedSpans, span);
        if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm) {
          updateLineHeight(line, textHeight(cm.display));
        }
      }
      if (cm && this.collapsed && !cm.options.lineWrapping) {
        for (var i$12 = 0; i$12 < this.lines.length; ++i$12) {
          var visual = visualLine(this.lines[i$12]), len = lineLength(visual);
          if (len > cm.display.maxLineLength) {
            cm.display.maxLine = visual;
            cm.display.maxLineLength = len;
            cm.display.maxLineChanged = true;
          }
        }
      }
      if (min != null && cm && this.collapsed) {
        regChange(cm, min, max + 1);
      }
      this.lines.length = 0;
      this.explicitlyCleared = true;
      if (this.atomic && this.doc.cantEdit) {
        this.doc.cantEdit = false;
        if (cm) {
          reCheckSelection(cm.doc);
        }
      }
      if (cm) {
        signalLater(cm, "markerCleared", cm, this, min, max);
      }
      if (withOp) {
        endOperation(cm);
      }
      if (this.parent) {
        this.parent.clear();
      }
    };
    TextMarker.prototype.find = function(side, lineObj) {
      if (side == null && this.type == "bookmark") {
        side = 1;
      }
      var from, to;
      for (var i2 = 0; i2 < this.lines.length; ++i2) {
        var line = this.lines[i2];
        var span = getMarkedSpanFor(line.markedSpans, this);
        if (span.from != null) {
          from = Pos(lineObj ? line : lineNo(line), span.from);
          if (side == -1) {
            return from;
          }
        }
        if (span.to != null) {
          to = Pos(lineObj ? line : lineNo(line), span.to);
          if (side == 1) {
            return to;
          }
        }
      }
      return from && {from, to};
    };
    TextMarker.prototype.changed = function() {
      var this$1 = this;
      var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
      if (!pos || !cm) {
        return;
      }
      runInOp(cm, function() {
        var line = pos.line, lineN = lineNo(pos.line);
        var view = findViewForLine(cm, lineN);
        if (view) {
          clearLineMeasurementCacheFor(view);
          cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
        }
        cm.curOp.updateMaxLine = true;
        if (!lineIsHidden(widget.doc, line) && widget.height != null) {
          var oldHeight = widget.height;
          widget.height = null;
          var dHeight = widgetHeight(widget) - oldHeight;
          if (dHeight) {
            updateLineHeight(line, line.height + dHeight);
          }
        }
        signalLater(cm, "markerChanged", cm, this$1);
      });
    };
    TextMarker.prototype.attachLine = function(line) {
      if (!this.lines.length && this.doc.cm) {
        var op = this.doc.cm.curOp;
        if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
          (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
        }
      }
      this.lines.push(line);
    };
    TextMarker.prototype.detachLine = function(line) {
      this.lines.splice(indexOf(this.lines, line), 1);
      if (!this.lines.length && this.doc.cm) {
        var op = this.doc.cm.curOp;
        (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
      }
    };
    eventMixin(TextMarker);
    function markText(doc2, from, to, options, type) {
      if (options && options.shared) {
        return markTextShared(doc2, from, to, options, type);
      }
      if (doc2.cm && !doc2.cm.curOp) {
        return operation(doc2.cm, markText)(doc2, from, to, options, type);
      }
      var marker = new TextMarker(doc2, type), diff = cmp(from, to);
      if (options) {
        copyObj(options, marker, false);
      }
      if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
        return marker;
      }
      if (marker.replacedWith) {
        marker.collapsed = true;
        marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
        if (!options.handleMouseEvents) {
          marker.widgetNode.setAttribute("cm-ignore-events", "true");
        }
        if (options.insertLeft) {
          marker.widgetNode.insertLeft = true;
        }
      }
      if (marker.collapsed) {
        if (conflictingCollapsedRange(doc2, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc2, to.line, from, to, marker)) {
          throw new Error("Inserting collapsed marker partially overlapping an existing one");
        }
        seeCollapsedSpans();
      }
      if (marker.addToHistory) {
        addChangeToHistory(doc2, {from, to, origin: "markText"}, doc2.sel, NaN);
      }
      var curLine = from.line, cm = doc2.cm, updateMaxLine;
      doc2.iter(curLine, to.line + 1, function(line) {
        if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) {
          updateMaxLine = true;
        }
        if (marker.collapsed && curLine != from.line) {
          updateLineHeight(line, 0);
        }
        addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch : null, curLine == to.line ? to.ch : null), doc2.cm && doc2.cm.curOp);
        ++curLine;
      });
      if (marker.collapsed) {
        doc2.iter(from.line, to.line + 1, function(line) {
          if (lineIsHidden(doc2, line)) {
            updateLineHeight(line, 0);
          }
        });
      }
      if (marker.clearOnEnter) {
        on(marker, "beforeCursorEnter", function() {
          return marker.clear();
        });
      }
      if (marker.readOnly) {
        seeReadOnlySpans();
        if (doc2.history.done.length || doc2.history.undone.length) {
          doc2.clearHistory();
        }
      }
      if (marker.collapsed) {
        marker.id = ++nextMarkerId;
        marker.atomic = true;
      }
      if (cm) {
        if (updateMaxLine) {
          cm.curOp.updateMaxLine = true;
        }
        if (marker.collapsed) {
          regChange(cm, from.line, to.line + 1);
        } else if (marker.className || marker.startStyle || marker.endStyle || marker.css || marker.attributes || marker.title) {
          for (var i2 = from.line; i2 <= to.line; i2++) {
            regLineChange(cm, i2, "text");
          }
        }
        if (marker.atomic) {
          reCheckSelection(cm.doc);
        }
        signalLater(cm, "markerAdded", cm, marker);
      }
      return marker;
    }
    var SharedTextMarker = function(markers, primary) {
      this.markers = markers;
      this.primary = primary;
      for (var i2 = 0; i2 < markers.length; ++i2) {
        markers[i2].parent = this;
      }
    };
    SharedTextMarker.prototype.clear = function() {
      if (this.explicitlyCleared) {
        return;
      }
      this.explicitlyCleared = true;
      for (var i2 = 0; i2 < this.markers.length; ++i2) {
        this.markers[i2].clear();
      }
      signalLater(this, "clear");
    };
    SharedTextMarker.prototype.find = function(side, lineObj) {
      return this.primary.find(side, lineObj);
    };
    eventMixin(SharedTextMarker);
    function markTextShared(doc2, from, to, options, type) {
      options = copyObj(options);
      options.shared = false;
      var markers = [markText(doc2, from, to, options, type)], primary = markers[0];
      var widget = options.widgetNode;
      linkedDocs(doc2, function(doc3) {
        if (widget) {
          options.widgetNode = widget.cloneNode(true);
        }
        markers.push(markText(doc3, clipPos(doc3, from), clipPos(doc3, to), options, type));
        for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
          if (doc3.linked[i2].isParent) {
            return;
          }
        }
        primary = lst(markers);
      });
      return new SharedTextMarker(markers, primary);
    }
    function findSharedMarkers(doc2) {
      return doc2.findMarks(Pos(doc2.first, 0), doc2.clipPos(Pos(doc2.lastLine())), function(m) {
        return m.parent;
      });
    }
    function copySharedMarkers(doc2, markers) {
      for (var i2 = 0; i2 < markers.length; i2++) {
        var marker = markers[i2], pos = marker.find();
        var mFrom = doc2.clipPos(pos.from), mTo = doc2.clipPos(pos.to);
        if (cmp(mFrom, mTo)) {
          var subMark = markText(doc2, mFrom, mTo, marker.primary, marker.primary.type);
          marker.markers.push(subMark);
          subMark.parent = marker;
        }
      }
    }
    function detachSharedMarkers(markers) {
      var loop = function(i3) {
        var marker = markers[i3], linked = [marker.primary.doc];
        linkedDocs(marker.primary.doc, function(d) {
          return linked.push(d);
        });
        for (var j = 0; j < marker.markers.length; j++) {
          var subMarker = marker.markers[j];
          if (indexOf(linked, subMarker.doc) == -1) {
            subMarker.parent = null;
            marker.markers.splice(j--, 1);
          }
        }
      };
      for (var i2 = 0; i2 < markers.length; i2++)
        loop(i2);
    }
    var nextDocId = 0;
    var Doc = function(text, mode, firstLine, lineSep, direction) {
      if (!(this instanceof Doc)) {
        return new Doc(text, mode, firstLine, lineSep, direction);
      }
      if (firstLine == null) {
        firstLine = 0;
      }
      BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
      this.first = firstLine;
      this.scrollTop = this.scrollLeft = 0;
      this.cantEdit = false;
      this.cleanGeneration = 1;
      this.modeFrontier = this.highlightFrontier = firstLine;
      var start = Pos(firstLine, 0);
      this.sel = simpleSelection(start);
      this.history = new History(null);
      this.id = ++nextDocId;
      this.modeOption = mode;
      this.lineSep = lineSep;
      this.direction = direction == "rtl" ? "rtl" : "ltr";
      this.extend = false;
      if (typeof text == "string") {
        text = this.splitLines(text);
      }
      updateDoc(this, {from: start, to: start, text});
      setSelection(this, simpleSelection(start), sel_dontScroll);
    };
    Doc.prototype = createObj(BranchChunk.prototype, {
      constructor: Doc,
      iter: function(from, to, op) {
        if (op) {
          this.iterN(from - this.first, to - from, op);
        } else {
          this.iterN(this.first, this.first + this.size, from);
        }
      },
      insert: function(at, lines) {
        var height = 0;
        for (var i2 = 0; i2 < lines.length; ++i2) {
          height += lines[i2].height;
        }
        this.insertInner(at - this.first, lines, height);
      },
      remove: function(at, n) {
        this.removeInner(at - this.first, n);
      },
      getValue: function(lineSep) {
        var lines = getLines(this, this.first, this.first + this.size);
        if (lineSep === false) {
          return lines;
        }
        return lines.join(lineSep || this.lineSeparator());
      },
      setValue: docMethodOp(function(code) {
        var top = Pos(this.first, 0), last = this.first + this.size - 1;
        makeChange(this, {
          from: top,
          to: Pos(last, getLine(this, last).text.length),
          text: this.splitLines(code),
          origin: "setValue",
          full: true
        }, true);
        if (this.cm) {
          scrollToCoords(this.cm, 0, 0);
        }
        setSelection(this, simpleSelection(top), sel_dontScroll);
      }),
      replaceRange: function(code, from, to, origin) {
        from = clipPos(this, from);
        to = to ? clipPos(this, to) : from;
        replaceRange(this, code, from, to, origin);
      },
      getRange: function(from, to, lineSep) {
        var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
        if (lineSep === false) {
          return lines;
        }
        if (lineSep === "") {
          return lines.join("");
        }
        return lines.join(lineSep || this.lineSeparator());
      },
      getLine: function(line) {
        var l = this.getLineHandle(line);
        return l && l.text;
      },
      getLineHandle: function(line) {
        if (isLine(this, line)) {
          return getLine(this, line);
        }
      },
      getLineNumber: function(line) {
        return lineNo(line);
      },
      getLineHandleVisualStart: function(line) {
        if (typeof line == "number") {
          line = getLine(this, line);
        }
        return visualLine(line);
      },
      lineCount: function() {
        return this.size;
      },
      firstLine: function() {
        return this.first;
      },
      lastLine: function() {
        return this.first + this.size - 1;
      },
      clipPos: function(pos) {
        return clipPos(this, pos);
      },
      getCursor: function(start) {
        var range2 = this.sel.primary(), pos;
        if (start == null || start == "head") {
          pos = range2.head;
        } else if (start == "anchor") {
          pos = range2.anchor;
        } else if (start == "end" || start == "to" || start === false) {
          pos = range2.to();
        } else {
          pos = range2.from();
        }
        return pos;
      },
      listSelections: function() {
        return this.sel.ranges;
      },
      somethingSelected: function() {
        return this.sel.somethingSelected();
      },
      setCursor: docMethodOp(function(line, ch, options) {
        setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
      }),
      setSelection: docMethodOp(function(anchor, head, options) {
        setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
      }),
      extendSelection: docMethodOp(function(head, other, options) {
        extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
      }),
      extendSelections: docMethodOp(function(heads, options) {
        extendSelections(this, clipPosArray(this, heads), options);
      }),
      extendSelectionsBy: docMethodOp(function(f, options) {
        var heads = map(this.sel.ranges, f);
        extendSelections(this, clipPosArray(this, heads), options);
      }),
      setSelections: docMethodOp(function(ranges, primary, options) {
        if (!ranges.length) {
          return;
        }
        var out = [];
        for (var i2 = 0; i2 < ranges.length; i2++) {
          out[i2] = new Range(clipPos(this, ranges[i2].anchor), clipPos(this, ranges[i2].head || ranges[i2].anchor));
        }
        if (primary == null) {
          primary = Math.min(ranges.length - 1, this.sel.primIndex);
        }
        setSelection(this, normalizeSelection(this.cm, out, primary), options);
      }),
      addSelection: docMethodOp(function(anchor, head, options) {
        var ranges = this.sel.ranges.slice(0);
        ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
        setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
      }),
      getSelection: function(lineSep) {
        var ranges = this.sel.ranges, lines;
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
          lines = lines ? lines.concat(sel) : sel;
        }
        if (lineSep === false) {
          return lines;
        } else {
          return lines.join(lineSep || this.lineSeparator());
        }
      },
      getSelections: function(lineSep) {
        var parts = [], ranges = this.sel.ranges;
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
          if (lineSep !== false) {
            sel = sel.join(lineSep || this.lineSeparator());
          }
          parts[i2] = sel;
        }
        return parts;
      },
      replaceSelection: function(code, collapse, origin) {
        var dup = [];
        for (var i2 = 0; i2 < this.sel.ranges.length; i2++) {
          dup[i2] = code;
        }
        this.replaceSelections(dup, collapse, origin || "+input");
      },
      replaceSelections: docMethodOp(function(code, collapse, origin) {
        var changes = [], sel = this.sel;
        for (var i2 = 0; i2 < sel.ranges.length; i2++) {
          var range2 = sel.ranges[i2];
          changes[i2] = {from: range2.from(), to: range2.to(), text: this.splitLines(code[i2]), origin};
        }
        var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
        for (var i$12 = changes.length - 1; i$12 >= 0; i$12--) {
          makeChange(this, changes[i$12]);
        }
        if (newSel) {
          setSelectionReplaceHistory(this, newSel);
        } else if (this.cm) {
          ensureCursorVisible(this.cm);
        }
      }),
      undo: docMethodOp(function() {
        makeChangeFromHistory(this, "undo");
      }),
      redo: docMethodOp(function() {
        makeChangeFromHistory(this, "redo");
      }),
      undoSelection: docMethodOp(function() {
        makeChangeFromHistory(this, "undo", true);
      }),
      redoSelection: docMethodOp(function() {
        makeChangeFromHistory(this, "redo", true);
      }),
      setExtending: function(val) {
        this.extend = val;
      },
      getExtending: function() {
        return this.extend;
      },
      historySize: function() {
        var hist = this.history, done = 0, undone = 0;
        for (var i2 = 0; i2 < hist.done.length; i2++) {
          if (!hist.done[i2].ranges) {
            ++done;
          }
        }
        for (var i$12 = 0; i$12 < hist.undone.length; i$12++) {
          if (!hist.undone[i$12].ranges) {
            ++undone;
          }
        }
        return {undo: done, redo: undone};
      },
      clearHistory: function() {
        var this$1 = this;
        this.history = new History(this.history);
        linkedDocs(this, function(doc2) {
          return doc2.history = this$1.history;
        }, true);
      },
      markClean: function() {
        this.cleanGeneration = this.changeGeneration(true);
      },
      changeGeneration: function(forceSplit) {
        if (forceSplit) {
          this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
        }
        return this.history.generation;
      },
      isClean: function(gen) {
        return this.history.generation == (gen || this.cleanGeneration);
      },
      getHistory: function() {
        return {
          done: copyHistoryArray(this.history.done),
          undone: copyHistoryArray(this.history.undone)
        };
      },
      setHistory: function(histData) {
        var hist = this.history = new History(this.history);
        hist.done = copyHistoryArray(histData.done.slice(0), null, true);
        hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
      },
      setGutterMarker: docMethodOp(function(line, gutterID, value) {
        return changeLine(this, line, "gutter", function(line2) {
          var markers = line2.gutterMarkers || (line2.gutterMarkers = {});
          markers[gutterID] = value;
          if (!value && isEmpty(markers)) {
            line2.gutterMarkers = null;
          }
          return true;
        });
      }),
      clearGutter: docMethodOp(function(gutterID) {
        var this$1 = this;
        this.iter(function(line) {
          if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
            changeLine(this$1, line, "gutter", function() {
              line.gutterMarkers[gutterID] = null;
              if (isEmpty(line.gutterMarkers)) {
                line.gutterMarkers = null;
              }
              return true;
            });
          }
        });
      }),
      lineInfo: function(line) {
        var n;
        if (typeof line == "number") {
          if (!isLine(this, line)) {
            return null;
          }
          n = line;
          line = getLine(this, line);
          if (!line) {
            return null;
          }
        } else {
          n = lineNo(line);
          if (n == null) {
            return null;
          }
        }
        return {
          line: n,
          handle: line,
          text: line.text,
          gutterMarkers: line.gutterMarkers,
          textClass: line.textClass,
          bgClass: line.bgClass,
          wrapClass: line.wrapClass,
          widgets: line.widgets
        };
      },
      addLineClass: docMethodOp(function(handle, where, cls) {
        return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
          var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
          if (!line[prop2]) {
            line[prop2] = cls;
          } else if (classTest(cls).test(line[prop2])) {
            return false;
          } else {
            line[prop2] += " " + cls;
          }
          return true;
        });
      }),
      removeLineClass: docMethodOp(function(handle, where, cls) {
        return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
          var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
          var cur = line[prop2];
          if (!cur) {
            return false;
          } else if (cls == null) {
            line[prop2] = null;
          } else {
            var found = cur.match(classTest(cls));
            if (!found) {
              return false;
            }
            var end = found.index + found[0].length;
            line[prop2] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
          }
          return true;
        });
      }),
      addLineWidget: docMethodOp(function(handle, node, options) {
        return addLineWidget(this, handle, node, options);
      }),
      removeLineWidget: function(widget) {
        widget.clear();
      },
      markText: function(from, to, options) {
        return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
      },
      setBookmark: function(pos, options) {
        var realOpts = {
          replacedWith: options && (options.nodeType == null ? options.widget : options),
          insertLeft: options && options.insertLeft,
          clearWhenEmpty: false,
          shared: options && options.shared,
          handleMouseEvents: options && options.handleMouseEvents
        };
        pos = clipPos(this, pos);
        return markText(this, pos, pos, realOpts, "bookmark");
      },
      findMarksAt: function(pos) {
        pos = clipPos(this, pos);
        var markers = [], spans = getLine(this, pos.line).markedSpans;
        if (spans) {
          for (var i2 = 0; i2 < spans.length; ++i2) {
            var span = spans[i2];
            if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
              markers.push(span.marker.parent || span.marker);
            }
          }
        }
        return markers;
      },
      findMarks: function(from, to, filter) {
        from = clipPos(this, from);
        to = clipPos(this, to);
        var found = [], lineNo2 = from.line;
        this.iter(from.line, to.line + 1, function(line) {
          var spans = line.markedSpans;
          if (spans) {
            for (var i2 = 0; i2 < spans.length; i2++) {
              var span = spans[i2];
              if (!(span.to != null && lineNo2 == from.line && from.ch >= span.to || span.from == null && lineNo2 != from.line || span.from != null && lineNo2 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
                found.push(span.marker.parent || span.marker);
              }
            }
          }
          ++lineNo2;
        });
        return found;
      },
      getAllMarks: function() {
        var markers = [];
        this.iter(function(line) {
          var sps = line.markedSpans;
          if (sps) {
            for (var i2 = 0; i2 < sps.length; ++i2) {
              if (sps[i2].from != null) {
                markers.push(sps[i2].marker);
              }
            }
          }
        });
        return markers;
      },
      posFromIndex: function(off2) {
        var ch, lineNo2 = this.first, sepSize = this.lineSeparator().length;
        this.iter(function(line) {
          var sz = line.text.length + sepSize;
          if (sz > off2) {
            ch = off2;
            return true;
          }
          off2 -= sz;
          ++lineNo2;
        });
        return clipPos(this, Pos(lineNo2, ch));
      },
      indexFromPos: function(coords) {
        coords = clipPos(this, coords);
        var index = coords.ch;
        if (coords.line < this.first || coords.ch < 0) {
          return 0;
        }
        var sepSize = this.lineSeparator().length;
        this.iter(this.first, coords.line, function(line) {
          index += line.text.length + sepSize;
        });
        return index;
      },
      copy: function(copyHistory) {
        var doc2 = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
        doc2.scrollTop = this.scrollTop;
        doc2.scrollLeft = this.scrollLeft;
        doc2.sel = this.sel;
        doc2.extend = false;
        if (copyHistory) {
          doc2.history.undoDepth = this.history.undoDepth;
          doc2.setHistory(this.getHistory());
        }
        return doc2;
      },
      linkedDoc: function(options) {
        if (!options) {
          options = {};
        }
        var from = this.first, to = this.first + this.size;
        if (options.from != null && options.from > from) {
          from = options.from;
        }
        if (options.to != null && options.to < to) {
          to = options.to;
        }
        var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
        if (options.sharedHist) {
          copy.history = this.history;
        }
        (this.linked || (this.linked = [])).push({doc: copy, sharedHist: options.sharedHist});
        copy.linked = [{doc: this, isParent: true, sharedHist: options.sharedHist}];
        copySharedMarkers(copy, findSharedMarkers(this));
        return copy;
      },
      unlinkDoc: function(other) {
        if (other instanceof CodeMirror) {
          other = other.doc;
        }
        if (this.linked) {
          for (var i2 = 0; i2 < this.linked.length; ++i2) {
            var link = this.linked[i2];
            if (link.doc != other) {
              continue;
            }
            this.linked.splice(i2, 1);
            other.unlinkDoc(this);
            detachSharedMarkers(findSharedMarkers(this));
            break;
          }
        }
        if (other.history == this.history) {
          var splitIds = [other.id];
          linkedDocs(other, function(doc2) {
            return splitIds.push(doc2.id);
          }, true);
          other.history = new History(null);
          other.history.done = copyHistoryArray(this.history.done, splitIds);
          other.history.undone = copyHistoryArray(this.history.undone, splitIds);
        }
      },
      iterLinkedDocs: function(f) {
        linkedDocs(this, f);
      },
      getMode: function() {
        return this.mode;
      },
      getEditor: function() {
        return this.cm;
      },
      splitLines: function(str) {
        if (this.lineSep) {
          return str.split(this.lineSep);
        }
        return splitLinesAuto(str);
      },
      lineSeparator: function() {
        return this.lineSep || "\n";
      },
      setDirection: docMethodOp(function(dir) {
        if (dir != "rtl") {
          dir = "ltr";
        }
        if (dir == this.direction) {
          return;
        }
        this.direction = dir;
        this.iter(function(line) {
          return line.order = null;
        });
        if (this.cm) {
          directionChanged(this.cm);
        }
      })
    });
    Doc.prototype.eachLine = Doc.prototype.iter;
    var lastDrop = 0;
    function onDrop(e) {
      var cm = this;
      clearDragCursor(cm);
      if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
        return;
      }
      e_preventDefault(e);
      if (ie) {
        lastDrop = +new Date();
      }
      var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
      if (!pos || cm.isReadOnly()) {
        return;
      }
      if (files && files.length && window.FileReader && window.File) {
        var n = files.length, text = Array(n), read = 0;
        var markAsReadAndPasteIfAllFilesAreRead = function() {
          if (++read == n) {
            operation(cm, function() {
              pos = clipPos(cm.doc, pos);
              var change = {
                from: pos,
                to: pos,
                text: cm.doc.splitLines(text.filter(function(t) {
                  return t != null;
                }).join(cm.doc.lineSeparator())),
                origin: "paste"
              };
              makeChange(cm.doc, change);
              setSelectionReplaceHistory(cm.doc, simpleSelection(clipPos(cm.doc, pos), clipPos(cm.doc, changeEnd(change))));
            })();
          }
        };
        var readTextFromFile = function(file, i3) {
          if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
            markAsReadAndPasteIfAllFilesAreRead();
            return;
          }
          var reader = new FileReader();
          reader.onerror = function() {
            return markAsReadAndPasteIfAllFilesAreRead();
          };
          reader.onload = function() {
            var content = reader.result;
            if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
              markAsReadAndPasteIfAllFilesAreRead();
              return;
            }
            text[i3] = content;
            markAsReadAndPasteIfAllFilesAreRead();
          };
          reader.readAsText(file);
        };
        for (var i2 = 0; i2 < files.length; i2++) {
          readTextFromFile(files[i2], i2);
        }
      } else {
        if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
          cm.state.draggingText(e);
          setTimeout(function() {
            return cm.display.input.focus();
          }, 20);
          return;
        }
        try {
          var text$1 = e.dataTransfer.getData("Text");
          if (text$1) {
            var selected;
            if (cm.state.draggingText && !cm.state.draggingText.copy) {
              selected = cm.listSelections();
            }
            setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
            if (selected) {
              for (var i$12 = 0; i$12 < selected.length; ++i$12) {
                replaceRange(cm.doc, "", selected[i$12].anchor, selected[i$12].head, "drag");
              }
            }
            cm.replaceSelection(text$1, "around", "paste");
            cm.display.input.focus();
          }
        } catch (e$1) {
        }
      }
    }
    function onDragStart(cm, e) {
      if (ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) {
        e_stop(e);
        return;
      }
      if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
        return;
      }
      e.dataTransfer.setData("Text", cm.getSelection());
      e.dataTransfer.effectAllowed = "copyMove";
      if (e.dataTransfer.setDragImage && !safari) {
        var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
        img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        if (presto) {
          img.width = img.height = 1;
          cm.display.wrapper.appendChild(img);
          img._top = img.offsetTop;
        }
        e.dataTransfer.setDragImage(img, 0, 0);
        if (presto) {
          img.parentNode.removeChild(img);
        }
      }
    }
    function onDragOver(cm, e) {
      var pos = posFromMouse(cm, e);
      if (!pos) {
        return;
      }
      var frag = document.createDocumentFragment();
      drawSelectionCursor(cm, pos, frag);
      if (!cm.display.dragCursor) {
        cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
        cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
      }
      removeChildrenAndAdd(cm.display.dragCursor, frag);
    }
    function clearDragCursor(cm) {
      if (cm.display.dragCursor) {
        cm.display.lineSpace.removeChild(cm.display.dragCursor);
        cm.display.dragCursor = null;
      }
    }
    function forEachCodeMirror(f) {
      if (!document.getElementsByClassName) {
        return;
      }
      var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
      for (var i2 = 0; i2 < byClass.length; i2++) {
        var cm = byClass[i2].CodeMirror;
        if (cm) {
          editors.push(cm);
        }
      }
      if (editors.length) {
        editors[0].operation(function() {
          for (var i3 = 0; i3 < editors.length; i3++) {
            f(editors[i3]);
          }
        });
      }
    }
    var globalsRegistered = false;
    function ensureGlobalHandlers() {
      if (globalsRegistered) {
        return;
      }
      registerGlobalHandlers();
      globalsRegistered = true;
    }
    function registerGlobalHandlers() {
      var resizeTimer;
      on(window, "resize", function() {
        if (resizeTimer == null) {
          resizeTimer = setTimeout(function() {
            resizeTimer = null;
            forEachCodeMirror(onResize);
          }, 100);
        }
      });
      on(window, "blur", function() {
        return forEachCodeMirror(onBlur);
      });
    }
    function onResize(cm) {
      var d = cm.display;
      d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
      d.scrollbarsClipped = false;
      cm.setSize();
    }
    var keyNames = {
      3: "Pause",
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Esc",
      32: "Space",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      44: "PrintScrn",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "=",
      91: "Mod",
      92: "Mod",
      93: "Mod",
      106: "*",
      107: "=",
      109: "-",
      110: ".",
      111: "/",
      145: "ScrollLock",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      224: "Mod",
      63232: "Up",
      63233: "Down",
      63234: "Left",
      63235: "Right",
      63272: "Delete",
      63273: "Home",
      63275: "End",
      63276: "PageUp",
      63277: "PageDown",
      63302: "Insert"
    };
    for (var i = 0; i < 10; i++) {
      keyNames[i + 48] = keyNames[i + 96] = String(i);
    }
    for (var i$1 = 65; i$1 <= 90; i$1++) {
      keyNames[i$1] = String.fromCharCode(i$1);
    }
    for (var i$2 = 1; i$2 <= 12; i$2++) {
      keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2;
    }
    var keyMap = {};
    keyMap.basic = {
      Left: "goCharLeft",
      Right: "goCharRight",
      Up: "goLineUp",
      Down: "goLineDown",
      End: "goLineEnd",
      Home: "goLineStartSmart",
      PageUp: "goPageUp",
      PageDown: "goPageDown",
      Delete: "delCharAfter",
      Backspace: "delCharBefore",
      "Shift-Backspace": "delCharBefore",
      Tab: "defaultTab",
      "Shift-Tab": "indentAuto",
      Enter: "newlineAndIndent",
      Insert: "toggleOverwrite",
      Esc: "singleSelection"
    };
    keyMap.pcDefault = {
      "Ctrl-A": "selectAll",
      "Ctrl-D": "deleteLine",
      "Ctrl-Z": "undo",
      "Shift-Ctrl-Z": "redo",
      "Ctrl-Y": "redo",
      "Ctrl-Home": "goDocStart",
      "Ctrl-End": "goDocEnd",
      "Ctrl-Up": "goLineUp",
      "Ctrl-Down": "goLineDown",
      "Ctrl-Left": "goGroupLeft",
      "Ctrl-Right": "goGroupRight",
      "Alt-Left": "goLineStart",
      "Alt-Right": "goLineEnd",
      "Ctrl-Backspace": "delGroupBefore",
      "Ctrl-Delete": "delGroupAfter",
      "Ctrl-S": "save",
      "Ctrl-F": "find",
      "Ctrl-G": "findNext",
      "Shift-Ctrl-G": "findPrev",
      "Shift-Ctrl-F": "replace",
      "Shift-Ctrl-R": "replaceAll",
      "Ctrl-[": "indentLess",
      "Ctrl-]": "indentMore",
      "Ctrl-U": "undoSelection",
      "Shift-Ctrl-U": "redoSelection",
      "Alt-U": "redoSelection",
      fallthrough: "basic"
    };
    keyMap.emacsy = {
      "Ctrl-F": "goCharRight",
      "Ctrl-B": "goCharLeft",
      "Ctrl-P": "goLineUp",
      "Ctrl-N": "goLineDown",
      "Ctrl-A": "goLineStart",
      "Ctrl-E": "goLineEnd",
      "Ctrl-V": "goPageDown",
      "Shift-Ctrl-V": "goPageUp",
      "Ctrl-D": "delCharAfter",
      "Ctrl-H": "delCharBefore",
      "Alt-Backspace": "delWordBefore",
      "Ctrl-K": "killLine",
      "Ctrl-T": "transposeChars",
      "Ctrl-O": "openLine"
    };
    keyMap.macDefault = {
      "Cmd-A": "selectAll",
      "Cmd-D": "deleteLine",
      "Cmd-Z": "undo",
      "Shift-Cmd-Z": "redo",
      "Cmd-Y": "redo",
      "Cmd-Home": "goDocStart",
      "Cmd-Up": "goDocStart",
      "Cmd-End": "goDocEnd",
      "Cmd-Down": "goDocEnd",
      "Alt-Left": "goGroupLeft",
      "Alt-Right": "goGroupRight",
      "Cmd-Left": "goLineLeft",
      "Cmd-Right": "goLineRight",
      "Alt-Backspace": "delGroupBefore",
      "Ctrl-Alt-Backspace": "delGroupAfter",
      "Alt-Delete": "delGroupAfter",
      "Cmd-S": "save",
      "Cmd-F": "find",
      "Cmd-G": "findNext",
      "Shift-Cmd-G": "findPrev",
      "Cmd-Alt-F": "replace",
      "Shift-Cmd-Alt-F": "replaceAll",
      "Cmd-[": "indentLess",
      "Cmd-]": "indentMore",
      "Cmd-Backspace": "delWrappedLineLeft",
      "Cmd-Delete": "delWrappedLineRight",
      "Cmd-U": "undoSelection",
      "Shift-Cmd-U": "redoSelection",
      "Ctrl-Up": "goDocStart",
      "Ctrl-Down": "goDocEnd",
      fallthrough: ["basic", "emacsy"]
    };
    keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
    function normalizeKeyName(name) {
      var parts = name.split(/-(?!$)/);
      name = parts[parts.length - 1];
      var alt, ctrl, shift, cmd;
      for (var i2 = 0; i2 < parts.length - 1; i2++) {
        var mod = parts[i2];
        if (/^(cmd|meta|m)$/i.test(mod)) {
          cmd = true;
        } else if (/^a(lt)?$/i.test(mod)) {
          alt = true;
        } else if (/^(c|ctrl|control)$/i.test(mod)) {
          ctrl = true;
        } else if (/^s(hift)?$/i.test(mod)) {
          shift = true;
        } else {
          throw new Error("Unrecognized modifier name: " + mod);
        }
      }
      if (alt) {
        name = "Alt-" + name;
      }
      if (ctrl) {
        name = "Ctrl-" + name;
      }
      if (cmd) {
        name = "Cmd-" + name;
      }
      if (shift) {
        name = "Shift-" + name;
      }
      return name;
    }
    function normalizeKeyMap(keymap) {
      var copy = {};
      for (var keyname in keymap) {
        if (keymap.hasOwnProperty(keyname)) {
          var value = keymap[keyname];
          if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
            continue;
          }
          if (value == "...") {
            delete keymap[keyname];
            continue;
          }
          var keys = map(keyname.split(" "), normalizeKeyName);
          for (var i2 = 0; i2 < keys.length; i2++) {
            var val = void 0, name = void 0;
            if (i2 == keys.length - 1) {
              name = keys.join(" ");
              val = value;
            } else {
              name = keys.slice(0, i2 + 1).join(" ");
              val = "...";
            }
            var prev = copy[name];
            if (!prev) {
              copy[name] = val;
            } else if (prev != val) {
              throw new Error("Inconsistent bindings for " + name);
            }
          }
          delete keymap[keyname];
        }
      }
      for (var prop2 in copy) {
        keymap[prop2] = copy[prop2];
      }
      return keymap;
    }
    function lookupKey(key, map2, handle, context) {
      map2 = getKeyMap(map2);
      var found = map2.call ? map2.call(key, context) : map2[key];
      if (found === false) {
        return "nothing";
      }
      if (found === "...") {
        return "multi";
      }
      if (found != null && handle(found)) {
        return "handled";
      }
      if (map2.fallthrough) {
        if (Object.prototype.toString.call(map2.fallthrough) != "[object Array]") {
          return lookupKey(key, map2.fallthrough, handle, context);
        }
        for (var i2 = 0; i2 < map2.fallthrough.length; i2++) {
          var result = lookupKey(key, map2.fallthrough[i2], handle, context);
          if (result) {
            return result;
          }
        }
      }
    }
    function isModifierKey(value) {
      var name = typeof value == "string" ? value : keyNames[value.keyCode];
      return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
    }
    function addModifierNames(name, event, noShift) {
      var base = name;
      if (event.altKey && base != "Alt") {
        name = "Alt-" + name;
      }
      if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
        name = "Ctrl-" + name;
      }
      if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Mod") {
        name = "Cmd-" + name;
      }
      if (!noShift && event.shiftKey && base != "Shift") {
        name = "Shift-" + name;
      }
      return name;
    }
    function keyName(event, noShift) {
      if (presto && event.keyCode == 34 && event["char"]) {
        return false;
      }
      var name = keyNames[event.keyCode];
      if (name == null || event.altGraphKey) {
        return false;
      }
      if (event.keyCode == 3 && event.code) {
        name = event.code;
      }
      return addModifierNames(name, event, noShift);
    }
    function getKeyMap(val) {
      return typeof val == "string" ? keyMap[val] : val;
    }
    function deleteNearSelection(cm, compute) {
      var ranges = cm.doc.sel.ranges, kill = [];
      for (var i2 = 0; i2 < ranges.length; i2++) {
        var toKill = compute(ranges[i2]);
        while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
          var replaced = kill.pop();
          if (cmp(replaced.from, toKill.from) < 0) {
            toKill.from = replaced.from;
            break;
          }
        }
        kill.push(toKill);
      }
      runInOp(cm, function() {
        for (var i3 = kill.length - 1; i3 >= 0; i3--) {
          replaceRange(cm.doc, "", kill[i3].from, kill[i3].to, "+delete");
        }
        ensureCursorVisible(cm);
      });
    }
    function moveCharLogically(line, ch, dir) {
      var target = skipExtendingChars(line.text, ch + dir, dir);
      return target < 0 || target > line.text.length ? null : target;
    }
    function moveLogically(line, start, dir) {
      var ch = moveCharLogically(line, start.ch, dir);
      return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
    }
    function endOfLine(visually, cm, lineObj, lineNo2, dir) {
      if (visually) {
        if (cm.doc.direction == "rtl") {
          dir = -dir;
        }
        var order = getOrder(lineObj, cm.doc.direction);
        if (order) {
          var part = dir < 0 ? lst(order) : order[0];
          var moveInStorageOrder = dir < 0 == (part.level == 1);
          var sticky = moveInStorageOrder ? "after" : "before";
          var ch;
          if (part.level > 0 || cm.doc.direction == "rtl") {
            var prep = prepareMeasureForLine(cm, lineObj);
            ch = dir < 0 ? lineObj.text.length - 1 : 0;
            var targetTop = measureCharPrepared(cm, prep, ch).top;
            ch = findFirst(function(ch2) {
              return measureCharPrepared(cm, prep, ch2).top == targetTop;
            }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
            if (sticky == "before") {
              ch = moveCharLogically(lineObj, ch, 1);
            }
          } else {
            ch = dir < 0 ? part.to : part.from;
          }
          return new Pos(lineNo2, ch, sticky);
        }
      }
      return new Pos(lineNo2, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
    }
    function moveVisually(cm, line, start, dir) {
      var bidi = getOrder(line, cm.doc.direction);
      if (!bidi) {
        return moveLogically(line, start, dir);
      }
      if (start.ch >= line.text.length) {
        start.ch = line.text.length;
        start.sticky = "before";
      } else if (start.ch <= 0) {
        start.ch = 0;
        start.sticky = "after";
      }
      var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
      if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
        return moveLogically(line, start, dir);
      }
      var mv = function(pos, dir2) {
        return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir2);
      };
      var prep;
      var getWrappedLineExtent = function(ch2) {
        if (!cm.options.lineWrapping) {
          return {begin: 0, end: line.text.length};
        }
        prep = prep || prepareMeasureForLine(cm, line);
        return wrappedLineExtentChar(cm, line, prep, ch2);
      };
      var wrappedLineExtent2 = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);
      if (cm.doc.direction == "rtl" || part.level == 1) {
        var moveInStorageOrder = part.level == 1 == dir < 0;
        var ch = mv(start, moveInStorageOrder ? 1 : -1);
        if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent2.begin : ch <= part.to && ch <= wrappedLineExtent2.end)) {
          var sticky = moveInStorageOrder ? "before" : "after";
          return new Pos(start.line, ch, sticky);
        }
      }
      var searchInVisualLine = function(partPos2, dir2, wrappedLineExtent3) {
        var getRes = function(ch3, moveInStorageOrder3) {
          return moveInStorageOrder3 ? new Pos(start.line, mv(ch3, 1), "before") : new Pos(start.line, ch3, "after");
        };
        for (; partPos2 >= 0 && partPos2 < bidi.length; partPos2 += dir2) {
          var part2 = bidi[partPos2];
          var moveInStorageOrder2 = dir2 > 0 == (part2.level != 1);
          var ch2 = moveInStorageOrder2 ? wrappedLineExtent3.begin : mv(wrappedLineExtent3.end, -1);
          if (part2.from <= ch2 && ch2 < part2.to) {
            return getRes(ch2, moveInStorageOrder2);
          }
          ch2 = moveInStorageOrder2 ? part2.from : mv(part2.to, -1);
          if (wrappedLineExtent3.begin <= ch2 && ch2 < wrappedLineExtent3.end) {
            return getRes(ch2, moveInStorageOrder2);
          }
        }
      };
      var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent2);
      if (res) {
        return res;
      }
      var nextCh = dir > 0 ? wrappedLineExtent2.end : mv(wrappedLineExtent2.begin, -1);
      if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
        res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
        if (res) {
          return res;
        }
      }
      return null;
    }
    var commands = {
      selectAll,
      singleSelection: function(cm) {
        return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
      },
      killLine: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          if (range2.empty()) {
            var len = getLine(cm.doc, range2.head.line).text.length;
            if (range2.head.ch == len && range2.head.line < cm.lastLine()) {
              return {from: range2.head, to: Pos(range2.head.line + 1, 0)};
            } else {
              return {from: range2.head, to: Pos(range2.head.line, len)};
            }
          } else {
            return {from: range2.from(), to: range2.to()};
          }
        });
      },
      deleteLine: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          return {
            from: Pos(range2.from().line, 0),
            to: clipPos(cm.doc, Pos(range2.to().line + 1, 0))
          };
        });
      },
      delLineLeft: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          return {
            from: Pos(range2.from().line, 0),
            to: range2.from()
          };
        });
      },
      delWrappedLineLeft: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          var top = cm.charCoords(range2.head, "div").top + 5;
          var leftPos = cm.coordsChar({left: 0, top}, "div");
          return {from: leftPos, to: range2.from()};
        });
      },
      delWrappedLineRight: function(cm) {
        return deleteNearSelection(cm, function(range2) {
          var top = cm.charCoords(range2.head, "div").top + 5;
          var rightPos = cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top}, "div");
          return {from: range2.from(), to: rightPos};
        });
      },
      undo: function(cm) {
        return cm.undo();
      },
      redo: function(cm) {
        return cm.redo();
      },
      undoSelection: function(cm) {
        return cm.undoSelection();
      },
      redoSelection: function(cm) {
        return cm.redoSelection();
      },
      goDocStart: function(cm) {
        return cm.extendSelection(Pos(cm.firstLine(), 0));
      },
      goDocEnd: function(cm) {
        return cm.extendSelection(Pos(cm.lastLine()));
      },
      goLineStart: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          return lineStart(cm, range2.head.line);
        }, {origin: "+move", bias: 1});
      },
      goLineStartSmart: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          return lineStartSmart(cm, range2.head);
        }, {origin: "+move", bias: 1});
      },
      goLineEnd: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          return lineEnd(cm, range2.head.line);
        }, {origin: "+move", bias: -1});
      },
      goLineRight: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          var top = cm.cursorCoords(range2.head, "div").top + 5;
          return cm.coordsChar({left: cm.display.lineDiv.offsetWidth + 100, top}, "div");
        }, sel_move);
      },
      goLineLeft: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          var top = cm.cursorCoords(range2.head, "div").top + 5;
          return cm.coordsChar({left: 0, top}, "div");
        }, sel_move);
      },
      goLineLeftSmart: function(cm) {
        return cm.extendSelectionsBy(function(range2) {
          var top = cm.cursorCoords(range2.head, "div").top + 5;
          var pos = cm.coordsChar({left: 0, top}, "div");
          if (pos.ch < cm.getLine(pos.line).search(/\S/)) {
            return lineStartSmart(cm, range2.head);
          }
          return pos;
        }, sel_move);
      },
      goLineUp: function(cm) {
        return cm.moveV(-1, "line");
      },
      goLineDown: function(cm) {
        return cm.moveV(1, "line");
      },
      goPageUp: function(cm) {
        return cm.moveV(-1, "page");
      },
      goPageDown: function(cm) {
        return cm.moveV(1, "page");
      },
      goCharLeft: function(cm) {
        return cm.moveH(-1, "char");
      },
      goCharRight: function(cm) {
        return cm.moveH(1, "char");
      },
      goColumnLeft: function(cm) {
        return cm.moveH(-1, "column");
      },
      goColumnRight: function(cm) {
        return cm.moveH(1, "column");
      },
      goWordLeft: function(cm) {
        return cm.moveH(-1, "word");
      },
      goGroupRight: function(cm) {
        return cm.moveH(1, "group");
      },
      goGroupLeft: function(cm) {
        return cm.moveH(-1, "group");
      },
      goWordRight: function(cm) {
        return cm.moveH(1, "word");
      },
      delCharBefore: function(cm) {
        return cm.deleteH(-1, "codepoint");
      },
      delCharAfter: function(cm) {
        return cm.deleteH(1, "char");
      },
      delWordBefore: function(cm) {
        return cm.deleteH(-1, "word");
      },
      delWordAfter: function(cm) {
        return cm.deleteH(1, "word");
      },
      delGroupBefore: function(cm) {
        return cm.deleteH(-1, "group");
      },
      delGroupAfter: function(cm) {
        return cm.deleteH(1, "group");
      },
      indentAuto: function(cm) {
        return cm.indentSelection("smart");
      },
      indentMore: function(cm) {
        return cm.indentSelection("add");
      },
      indentLess: function(cm) {
        return cm.indentSelection("subtract");
      },
      insertTab: function(cm) {
        return cm.replaceSelection("	");
      },
      insertSoftTab: function(cm) {
        var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var pos = ranges[i2].from();
          var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
          spaces.push(spaceStr(tabSize - col % tabSize));
        }
        cm.replaceSelections(spaces);
      },
      defaultTab: function(cm) {
        if (cm.somethingSelected()) {
          cm.indentSelection("add");
        } else {
          cm.execCommand("insertTab");
        }
      },
      transposeChars: function(cm) {
        return runInOp(cm, function() {
          var ranges = cm.listSelections(), newSel = [];
          for (var i2 = 0; i2 < ranges.length; i2++) {
            if (!ranges[i2].empty()) {
              continue;
            }
            var cur = ranges[i2].head, line = getLine(cm.doc, cur.line).text;
            if (line) {
              if (cur.ch == line.length) {
                cur = new Pos(cur.line, cur.ch - 1);
              }
              if (cur.ch > 0) {
                cur = new Pos(cur.line, cur.ch + 1);
                cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), Pos(cur.line, cur.ch - 2), cur, "+transpose");
              } else if (cur.line > cm.doc.first) {
                var prev = getLine(cm.doc, cur.line - 1).text;
                if (prev) {
                  cur = new Pos(cur.line, 1);
                  cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1), Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
                }
              }
            }
            newSel.push(new Range(cur, cur));
          }
          cm.setSelections(newSel);
        });
      },
      newlineAndIndent: function(cm) {
        return runInOp(cm, function() {
          var sels = cm.listSelections();
          for (var i2 = sels.length - 1; i2 >= 0; i2--) {
            cm.replaceRange(cm.doc.lineSeparator(), sels[i2].anchor, sels[i2].head, "+input");
          }
          sels = cm.listSelections();
          for (var i$12 = 0; i$12 < sels.length; i$12++) {
            cm.indentLine(sels[i$12].from().line, null, true);
          }
          ensureCursorVisible(cm);
        });
      },
      openLine: function(cm) {
        return cm.replaceSelection("\n", "start");
      },
      toggleOverwrite: function(cm) {
        return cm.toggleOverwrite();
      }
    };
    function lineStart(cm, lineN) {
      var line = getLine(cm.doc, lineN);
      var visual = visualLine(line);
      if (visual != line) {
        lineN = lineNo(visual);
      }
      return endOfLine(true, cm, visual, lineN, 1);
    }
    function lineEnd(cm, lineN) {
      var line = getLine(cm.doc, lineN);
      var visual = visualLineEnd(line);
      if (visual != line) {
        lineN = lineNo(visual);
      }
      return endOfLine(true, cm, line, lineN, -1);
    }
    function lineStartSmart(cm, pos) {
      var start = lineStart(cm, pos.line);
      var line = getLine(cm.doc, start.line);
      var order = getOrder(line, cm.doc.direction);
      if (!order || order[0].level == 0) {
        var firstNonWS = Math.max(start.ch, line.text.search(/\S/));
        var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
        return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
      }
      return start;
    }
    function doHandleBinding(cm, bound, dropShift) {
      if (typeof bound == "string") {
        bound = commands[bound];
        if (!bound) {
          return false;
        }
      }
      cm.display.input.ensurePolled();
      var prevShift = cm.display.shift, done = false;
      try {
        if (cm.isReadOnly()) {
          cm.state.suppressEdits = true;
        }
        if (dropShift) {
          cm.display.shift = false;
        }
        done = bound(cm) != Pass;
      } finally {
        cm.display.shift = prevShift;
        cm.state.suppressEdits = false;
      }
      return done;
    }
    function lookupKeyForEditor(cm, name, handle) {
      for (var i2 = 0; i2 < cm.state.keyMaps.length; i2++) {
        var result = lookupKey(name, cm.state.keyMaps[i2], handle, cm);
        if (result) {
          return result;
        }
      }
      return cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm) || lookupKey(name, cm.options.keyMap, handle, cm);
    }
    var stopSeq = new Delayed();
    function dispatchKey(cm, name, e, handle) {
      var seq = cm.state.keySeq;
      if (seq) {
        if (isModifierKey(name)) {
          return "handled";
        }
        if (/\'$/.test(name)) {
          cm.state.keySeq = null;
        } else {
          stopSeq.set(50, function() {
            if (cm.state.keySeq == seq) {
              cm.state.keySeq = null;
              cm.display.input.reset();
            }
          });
        }
        if (dispatchKeyInner(cm, seq + " " + name, e, handle)) {
          return true;
        }
      }
      return dispatchKeyInner(cm, name, e, handle);
    }
    function dispatchKeyInner(cm, name, e, handle) {
      var result = lookupKeyForEditor(cm, name, handle);
      if (result == "multi") {
        cm.state.keySeq = name;
      }
      if (result == "handled") {
        signalLater(cm, "keyHandled", cm, name, e);
      }
      if (result == "handled" || result == "multi") {
        e_preventDefault(e);
        restartBlink(cm);
      }
      return !!result;
    }
    function handleKeyBinding(cm, e) {
      var name = keyName(e, true);
      if (!name) {
        return false;
      }
      if (e.shiftKey && !cm.state.keySeq) {
        return dispatchKey(cm, "Shift-" + name, e, function(b) {
          return doHandleBinding(cm, b, true);
        }) || dispatchKey(cm, name, e, function(b) {
          if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) {
            return doHandleBinding(cm, b);
          }
        });
      } else {
        return dispatchKey(cm, name, e, function(b) {
          return doHandleBinding(cm, b);
        });
      }
    }
    function handleCharBinding(cm, e, ch) {
      return dispatchKey(cm, "'" + ch + "'", e, function(b) {
        return doHandleBinding(cm, b, true);
      });
    }
    var lastStoppedKey = null;
    function onKeyDown(e) {
      var cm = this;
      if (e.target && e.target != cm.display.input.getField()) {
        return;
      }
      cm.curOp.focus = activeElt(doc(cm));
      if (signalDOMEvent(cm, e)) {
        return;
      }
      if (ie && ie_version < 11 && e.keyCode == 27) {
        e.returnValue = false;
      }
      var code = e.keyCode;
      cm.display.shift = code == 16 || e.shiftKey;
      var handled = handleKeyBinding(cm, e);
      if (presto) {
        lastStoppedKey = handled ? code : null;
        if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) {
          cm.replaceSelection("", null, "cut");
        }
      }
      if (gecko && !mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand) {
        document.execCommand("cut");
      }
      if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) {
        showCrossHair(cm);
      }
    }
    function showCrossHair(cm) {
      var lineDiv = cm.display.lineDiv;
      addClass(lineDiv, "CodeMirror-crosshair");
      function up(e) {
        if (e.keyCode == 18 || !e.altKey) {
          rmClass(lineDiv, "CodeMirror-crosshair");
          off(document, "keyup", up);
          off(document, "mouseover", up);
        }
      }
      on(document, "keyup", up);
      on(document, "mouseover", up);
    }
    function onKeyUp(e) {
      if (e.keyCode == 16) {
        this.doc.sel.shift = false;
      }
      signalDOMEvent(this, e);
    }
    function onKeyPress(e) {
      var cm = this;
      if (e.target && e.target != cm.display.input.getField()) {
        return;
      }
      if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) {
        return;
      }
      var keyCode = e.keyCode, charCode = e.charCode;
      if (presto && keyCode == lastStoppedKey) {
        lastStoppedKey = null;
        e_preventDefault(e);
        return;
      }
      if (presto && (!e.which || e.which < 10) && handleKeyBinding(cm, e)) {
        return;
      }
      var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
      if (ch == "\b") {
        return;
      }
      if (handleCharBinding(cm, e, ch)) {
        return;
      }
      cm.display.input.onKeyPress(e);
    }
    var DOUBLECLICK_DELAY = 400;
    var PastClick = function(time, pos, button) {
      this.time = time;
      this.pos = pos;
      this.button = button;
    };
    PastClick.prototype.compare = function(time, pos, button) {
      return this.time + DOUBLECLICK_DELAY > time && cmp(pos, this.pos) == 0 && button == this.button;
    };
    var lastClick, lastDoubleClick;
    function clickRepeat(pos, button) {
      var now = +new Date();
      if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
        lastClick = lastDoubleClick = null;
        return "triple";
      } else if (lastClick && lastClick.compare(now, pos, button)) {
        lastDoubleClick = new PastClick(now, pos, button);
        lastClick = null;
        return "double";
      } else {
        lastClick = new PastClick(now, pos, button);
        lastDoubleClick = null;
        return "single";
      }
    }
    function onMouseDown(e) {
      var cm = this, display = cm.display;
      if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) {
        return;
      }
      display.input.ensurePolled();
      display.shift = e.shiftKey;
      if (eventInWidget(display, e)) {
        if (!webkit) {
          display.scroller.draggable = false;
          setTimeout(function() {
            return display.scroller.draggable = true;
          }, 100);
        }
        return;
      }
      if (clickInGutter(cm, e)) {
        return;
      }
      var pos = posFromMouse(cm, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
      win(cm).focus();
      if (button == 1 && cm.state.selectingText) {
        cm.state.selectingText(e);
      }
      if (pos && handleMappedButton(cm, button, pos, repeat, e)) {
        return;
      }
      if (button == 1) {
        if (pos) {
          leftButtonDown(cm, pos, repeat, e);
        } else if (e_target(e) == display.scroller) {
          e_preventDefault(e);
        }
      } else if (button == 2) {
        if (pos) {
          extendSelection(cm.doc, pos);
        }
        setTimeout(function() {
          return display.input.focus();
        }, 20);
      } else if (button == 3) {
        if (captureRightClick) {
          cm.display.input.onContextMenu(e);
        } else {
          delayBlurEvent(cm);
        }
      }
    }
    function handleMappedButton(cm, button, pos, repeat, event) {
      var name = "Click";
      if (repeat == "double") {
        name = "Double" + name;
      } else if (repeat == "triple") {
        name = "Triple" + name;
      }
      name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;
      return dispatchKey(cm, addModifierNames(name, event), event, function(bound) {
        if (typeof bound == "string") {
          bound = commands[bound];
        }
        if (!bound) {
          return false;
        }
        var done = false;
        try {
          if (cm.isReadOnly()) {
            cm.state.suppressEdits = true;
          }
          done = bound(cm, pos) != Pass;
        } finally {
          cm.state.suppressEdits = false;
        }
        return done;
      });
    }
    function configureMouse(cm, repeat, event) {
      var option = cm.getOption("configureMouse");
      var value = option ? option(cm, repeat, event) : {};
      if (value.unit == null) {
        var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
        value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
      }
      if (value.extend == null || cm.doc.extend) {
        value.extend = cm.doc.extend || event.shiftKey;
      }
      if (value.addNew == null) {
        value.addNew = mac ? event.metaKey : event.ctrlKey;
      }
      if (value.moveOnDrag == null) {
        value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey);
      }
      return value;
    }
    function leftButtonDown(cm, pos, repeat, event) {
      if (ie) {
        setTimeout(bind(ensureFocus, cm), 0);
      } else {
        cm.curOp.focus = activeElt(doc(cm));
      }
      var behavior = configureMouse(cm, repeat, event);
      var sel = cm.doc.sel, contained;
      if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() && repeat == "single" && (contained = sel.contains(pos)) > -1 && (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) && (cmp(contained.to(), pos) > 0 || pos.xRel < 0)) {
        leftButtonStartDrag(cm, event, pos, behavior);
      } else {
        leftButtonSelect(cm, event, pos, behavior);
      }
    }
    function leftButtonStartDrag(cm, event, pos, behavior) {
      var display = cm.display, moved = false;
      var dragEnd = operation(cm, function(e) {
        if (webkit) {
          display.scroller.draggable = false;
        }
        cm.state.draggingText = false;
        if (cm.state.delayingBlurEvent) {
          if (cm.hasFocus()) {
            cm.state.delayingBlurEvent = false;
          } else {
            delayBlurEvent(cm);
          }
        }
        off(display.wrapper.ownerDocument, "mouseup", dragEnd);
        off(display.wrapper.ownerDocument, "mousemove", mouseMove);
        off(display.scroller, "dragstart", dragStart);
        off(display.scroller, "drop", dragEnd);
        if (!moved) {
          e_preventDefault(e);
          if (!behavior.addNew) {
            extendSelection(cm.doc, pos, null, null, behavior.extend);
          }
          if (webkit && !safari || ie && ie_version == 9) {
            setTimeout(function() {
              display.wrapper.ownerDocument.body.focus({preventScroll: true});
              display.input.focus();
            }, 20);
          } else {
            display.input.focus();
          }
        }
      });
      var mouseMove = function(e2) {
        moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
      };
      var dragStart = function() {
        return moved = true;
      };
      if (webkit) {
        display.scroller.draggable = true;
      }
      cm.state.draggingText = dragEnd;
      dragEnd.copy = !behavior.moveOnDrag;
      on(display.wrapper.ownerDocument, "mouseup", dragEnd);
      on(display.wrapper.ownerDocument, "mousemove", mouseMove);
      on(display.scroller, "dragstart", dragStart);
      on(display.scroller, "drop", dragEnd);
      cm.state.delayingBlurEvent = true;
      setTimeout(function() {
        return display.input.focus();
      }, 20);
      if (display.scroller.dragDrop) {
        display.scroller.dragDrop();
      }
    }
    function rangeForUnit(cm, pos, unit) {
      if (unit == "char") {
        return new Range(pos, pos);
      }
      if (unit == "word") {
        return cm.findWordAt(pos);
      }
      if (unit == "line") {
        return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
      }
      var result = unit(cm, pos);
      return new Range(result.from, result.to);
    }
    function leftButtonSelect(cm, event, start, behavior) {
      if (ie) {
        delayBlurEvent(cm);
      }
      var display = cm.display, doc$1 = cm.doc;
      e_preventDefault(event);
      var ourRange, ourIndex, startSel = doc$1.sel, ranges = startSel.ranges;
      if (behavior.addNew && !behavior.extend) {
        ourIndex = doc$1.sel.contains(start);
        if (ourIndex > -1) {
          ourRange = ranges[ourIndex];
        } else {
          ourRange = new Range(start, start);
        }
      } else {
        ourRange = doc$1.sel.primary();
        ourIndex = doc$1.sel.primIndex;
      }
      if (behavior.unit == "rectangle") {
        if (!behavior.addNew) {
          ourRange = new Range(start, start);
        }
        start = posFromMouse(cm, event, true, true);
        ourIndex = -1;
      } else {
        var range2 = rangeForUnit(cm, start, behavior.unit);
        if (behavior.extend) {
          ourRange = extendRange(ourRange, range2.anchor, range2.head, behavior.extend);
        } else {
          ourRange = range2;
        }
      }
      if (!behavior.addNew) {
        ourIndex = 0;
        setSelection(doc$1, new Selection([ourRange], 0), sel_mouse);
        startSel = doc$1.sel;
      } else if (ourIndex == -1) {
        ourIndex = ranges.length;
        setSelection(doc$1, normalizeSelection(cm, ranges.concat([ourRange]), ourIndex), {scroll: false, origin: "*mouse"});
      } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
        setSelection(doc$1, normalizeSelection(cm, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0), {scroll: false, origin: "*mouse"});
        startSel = doc$1.sel;
      } else {
        replaceOneSelection(doc$1, ourIndex, ourRange, sel_mouse);
      }
      var lastPos = start;
      function extendTo(pos) {
        if (cmp(lastPos, pos) == 0) {
          return;
        }
        lastPos = pos;
        if (behavior.unit == "rectangle") {
          var ranges2 = [], tabSize = cm.options.tabSize;
          var startCol = countColumn(getLine(doc$1, start.line).text, start.ch, tabSize);
          var posCol = countColumn(getLine(doc$1, pos.line).text, pos.ch, tabSize);
          var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
          for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
            var text = getLine(doc$1, line).text, leftPos = findColumn(text, left, tabSize);
            if (left == right) {
              ranges2.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
            } else if (text.length > leftPos) {
              ranges2.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
            }
          }
          if (!ranges2.length) {
            ranges2.push(new Range(start, start));
          }
          setSelection(doc$1, normalizeSelection(cm, startSel.ranges.slice(0, ourIndex).concat(ranges2), ourIndex), {origin: "*mouse", scroll: false});
          cm.scrollIntoView(pos);
        } else {
          var oldRange = ourRange;
          var range3 = rangeForUnit(cm, pos, behavior.unit);
          var anchor = oldRange.anchor, head;
          if (cmp(range3.anchor, anchor) > 0) {
            head = range3.head;
            anchor = minPos(oldRange.from(), range3.anchor);
          } else {
            head = range3.anchor;
            anchor = maxPos(oldRange.to(), range3.head);
          }
          var ranges$1 = startSel.ranges.slice(0);
          ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc$1, anchor), head));
          setSelection(doc$1, normalizeSelection(cm, ranges$1, ourIndex), sel_mouse);
        }
      }
      var editorSize = display.wrapper.getBoundingClientRect();
      var counter = 0;
      function extend(e) {
        var curCount = ++counter;
        var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
        if (!cur) {
          return;
        }
        if (cmp(cur, lastPos) != 0) {
          cm.curOp.focus = activeElt(doc(cm));
          extendTo(cur);
          var visible = visibleLines(display, doc$1);
          if (cur.line >= visible.to || cur.line < visible.from) {
            setTimeout(operation(cm, function() {
              if (counter == curCount) {
                extend(e);
              }
            }), 150);
          }
        } else {
          var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
          if (outside) {
            setTimeout(operation(cm, function() {
              if (counter != curCount) {
                return;
              }
              display.scroller.scrollTop += outside;
              extend(e);
            }), 50);
          }
        }
      }
      function done(e) {
        cm.state.selectingText = false;
        counter = Infinity;
        if (e) {
          e_preventDefault(e);
          display.input.focus();
        }
        off(display.wrapper.ownerDocument, "mousemove", move);
        off(display.wrapper.ownerDocument, "mouseup", up);
        doc$1.history.lastSelOrigin = null;
      }
      var move = operation(cm, function(e) {
        if (e.buttons === 0 || !e_button(e)) {
          done(e);
        } else {
          extend(e);
        }
      });
      var up = operation(cm, done);
      cm.state.selectingText = up;
      on(display.wrapper.ownerDocument, "mousemove", move);
      on(display.wrapper.ownerDocument, "mouseup", up);
    }
    function bidiSimplify(cm, range2) {
      var anchor = range2.anchor;
      var head = range2.head;
      var anchorLine = getLine(cm.doc, anchor.line);
      if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) {
        return range2;
      }
      var order = getOrder(anchorLine);
      if (!order) {
        return range2;
      }
      var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
      if (part.from != anchor.ch && part.to != anchor.ch) {
        return range2;
      }
      var boundary = index + (part.from == anchor.ch == (part.level != 1) ? 0 : 1);
      if (boundary == 0 || boundary == order.length) {
        return range2;
      }
      var leftSide;
      if (head.line != anchor.line) {
        leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
      } else {
        var headIndex = getBidiPartAt(order, head.ch, head.sticky);
        var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
        if (headIndex == boundary - 1 || headIndex == boundary) {
          leftSide = dir < 0;
        } else {
          leftSide = dir > 0;
        }
      }
      var usePart = order[boundary + (leftSide ? -1 : 0)];
      var from = leftSide == (usePart.level == 1);
      var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
      return anchor.ch == ch && anchor.sticky == sticky ? range2 : new Range(new Pos(anchor.line, ch, sticky), head);
    }
    function gutterEvent(cm, e, type, prevent) {
      var mX, mY;
      if (e.touches) {
        mX = e.touches[0].clientX;
        mY = e.touches[0].clientY;
      } else {
        try {
          mX = e.clientX;
          mY = e.clientY;
        } catch (e$1) {
          return false;
        }
      }
      if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) {
        return false;
      }
      if (prevent) {
        e_preventDefault(e);
      }
      var display = cm.display;
      var lineBox = display.lineDiv.getBoundingClientRect();
      if (mY > lineBox.bottom || !hasHandler(cm, type)) {
        return e_defaultPrevented(e);
      }
      mY -= lineBox.top - display.viewOffset;
      for (var i2 = 0; i2 < cm.display.gutterSpecs.length; ++i2) {
        var g = display.gutters.childNodes[i2];
        if (g && g.getBoundingClientRect().right >= mX) {
          var line = lineAtHeight(cm.doc, mY);
          var gutter = cm.display.gutterSpecs[i2];
          signal(cm, type, cm, line, gutter.className, e);
          return e_defaultPrevented(e);
        }
      }
    }
    function clickInGutter(cm, e) {
      return gutterEvent(cm, e, "gutterClick", true);
    }
    function onContextMenu(cm, e) {
      if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) {
        return;
      }
      if (signalDOMEvent(cm, e, "contextmenu")) {
        return;
      }
      if (!captureRightClick) {
        cm.display.input.onContextMenu(e);
      }
    }
    function contextMenuInGutter(cm, e) {
      if (!hasHandler(cm, "gutterContextMenu")) {
        return false;
      }
      return gutterEvent(cm, e, "gutterContextMenu", false);
    }
    function themeChanged(cm) {
      cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
      clearCaches(cm);
    }
    var Init = {toString: function() {
      return "CodeMirror.Init";
    }};
    var defaults = {};
    var optionHandlers = {};
    function defineOptions(CodeMirror2) {
      var optionHandlers2 = CodeMirror2.optionHandlers;
      function option(name, deflt, handle, notOnInit) {
        CodeMirror2.defaults[name] = deflt;
        if (handle) {
          optionHandlers2[name] = notOnInit ? function(cm, val, old) {
            if (old != Init) {
              handle(cm, val, old);
            }
          } : handle;
        }
      }
      CodeMirror2.defineOption = option;
      CodeMirror2.Init = Init;
      option("value", "", function(cm, val) {
        return cm.setValue(val);
      }, true);
      option("mode", null, function(cm, val) {
        cm.doc.modeOption = val;
        loadMode(cm);
      }, true);
      option("indentUnit", 2, loadMode, true);
      option("indentWithTabs", false);
      option("smartIndent", true);
      option("tabSize", 4, function(cm) {
        resetModeState(cm);
        clearCaches(cm);
        regChange(cm);
      }, true);
      option("lineSeparator", null, function(cm, val) {
        cm.doc.lineSep = val;
        if (!val) {
          return;
        }
        var newBreaks = [], lineNo2 = cm.doc.first;
        cm.doc.iter(function(line) {
          for (var pos = 0; ; ) {
            var found = line.text.indexOf(val, pos);
            if (found == -1) {
              break;
            }
            pos = found + val.length;
            newBreaks.push(Pos(lineNo2, found));
          }
          lineNo2++;
        });
        for (var i2 = newBreaks.length - 1; i2 >= 0; i2--) {
          replaceRange(cm.doc, val, newBreaks[i2], Pos(newBreaks[i2].line, newBreaks[i2].ch + val.length));
        }
      });
      option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(cm, val, old) {
        cm.state.specialChars = new RegExp(val.source + (val.test("	") ? "" : "|	"), "g");
        if (old != Init) {
          cm.refresh();
        }
      });
      option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
        return cm.refresh();
      }, true);
      option("electricChars", true);
      option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
        throw new Error("inputStyle can not (yet) be changed in a running editor");
      }, true);
      option("spellcheck", false, function(cm, val) {
        return cm.getInputField().spellcheck = val;
      }, true);
      option("autocorrect", false, function(cm, val) {
        return cm.getInputField().autocorrect = val;
      }, true);
      option("autocapitalize", false, function(cm, val) {
        return cm.getInputField().autocapitalize = val;
      }, true);
      option("rtlMoveVisually", !windows);
      option("wholeLineUpdateBefore", true);
      option("theme", "default", function(cm) {
        themeChanged(cm);
        updateGutters(cm);
      }, true);
      option("keyMap", "default", function(cm, val, old) {
        var next = getKeyMap(val);
        var prev = old != Init && getKeyMap(old);
        if (prev && prev.detach) {
          prev.detach(cm, next);
        }
        if (next.attach) {
          next.attach(cm, prev || null);
        }
      });
      option("extraKeys", null);
      option("configureMouse", null);
      option("lineWrapping", false, wrappingChanged, true);
      option("gutters", [], function(cm, val) {
        cm.display.gutterSpecs = getGutters(val, cm.options.lineNumbers);
        updateGutters(cm);
      }, true);
      option("fixedGutter", true, function(cm, val) {
        cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
        cm.refresh();
      }, true);
      option("coverGutterNextToScrollbar", false, function(cm) {
        return updateScrollbars(cm);
      }, true);
      option("scrollbarStyle", "native", function(cm) {
        initScrollbars(cm);
        updateScrollbars(cm);
        cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
        cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
      }, true);
      option("lineNumbers", false, function(cm, val) {
        cm.display.gutterSpecs = getGutters(cm.options.gutters, val);
        updateGutters(cm);
      }, true);
      option("firstLineNumber", 1, updateGutters, true);
      option("lineNumberFormatter", function(integer) {
        return integer;
      }, updateGutters, true);
      option("showCursorWhenSelecting", false, updateSelection, true);
      option("resetSelectionOnContextMenu", true);
      option("lineWiseCopyCut", true);
      option("pasteLinesPerSelection", true);
      option("selectionsMayTouch", false);
      option("readOnly", false, function(cm, val) {
        if (val == "nocursor") {
          onBlur(cm);
          cm.display.input.blur();
        }
        cm.display.input.readOnlyChanged(val);
      });
      option("screenReaderLabel", null, function(cm, val) {
        val = val === "" ? null : val;
        cm.display.input.screenReaderLabelChanged(val);
      });
      option("disableInput", false, function(cm, val) {
        if (!val) {
          cm.display.input.reset();
        }
      }, true);
      option("dragDrop", true, dragDropChanged);
      option("allowDropFileTypes", null);
      option("cursorBlinkRate", 530);
      option("cursorScrollMargin", 0);
      option("cursorHeight", 1, updateSelection, true);
      option("singleCursorHeightPerLine", true, updateSelection, true);
      option("workTime", 100);
      option("workDelay", 100);
      option("flattenSpans", true, resetModeState, true);
      option("addModeClass", false, resetModeState, true);
      option("pollInterval", 100);
      option("undoDepth", 200, function(cm, val) {
        return cm.doc.history.undoDepth = val;
      });
      option("historyEventDelay", 1250);
      option("viewportMargin", 10, function(cm) {
        return cm.refresh();
      }, true);
      option("maxHighlightLength", 1e4, resetModeState, true);
      option("moveInputWithCursor", true, function(cm, val) {
        if (!val) {
          cm.display.input.resetPosition();
        }
      });
      option("tabindex", null, function(cm, val) {
        return cm.display.input.getField().tabIndex = val || "";
      });
      option("autofocus", null);
      option("direction", "ltr", function(cm, val) {
        return cm.doc.setDirection(val);
      }, true);
      option("phrases", null);
    }
    function dragDropChanged(cm, value, old) {
      var wasOn = old && old != Init;
      if (!value != !wasOn) {
        var funcs = cm.display.dragFunctions;
        var toggle = value ? on : off;
        toggle(cm.display.scroller, "dragstart", funcs.start);
        toggle(cm.display.scroller, "dragenter", funcs.enter);
        toggle(cm.display.scroller, "dragover", funcs.over);
        toggle(cm.display.scroller, "dragleave", funcs.leave);
        toggle(cm.display.scroller, "drop", funcs.drop);
      }
    }
    function wrappingChanged(cm) {
      if (cm.options.lineWrapping) {
        addClass(cm.display.wrapper, "CodeMirror-wrap");
        cm.display.sizer.style.minWidth = "";
        cm.display.sizerWidth = null;
      } else {
        rmClass(cm.display.wrapper, "CodeMirror-wrap");
        findMaxLine(cm);
      }
      estimateLineHeights(cm);
      regChange(cm);
      clearCaches(cm);
      setTimeout(function() {
        return updateScrollbars(cm);
      }, 100);
    }
    function CodeMirror(place, options) {
      var this$1 = this;
      if (!(this instanceof CodeMirror)) {
        return new CodeMirror(place, options);
      }
      this.options = options = options ? copyObj(options) : {};
      copyObj(defaults, options, false);
      var doc2 = options.value;
      if (typeof doc2 == "string") {
        doc2 = new Doc(doc2, options.mode, null, options.lineSeparator, options.direction);
      } else if (options.mode) {
        doc2.modeOption = options.mode;
      }
      this.doc = doc2;
      var input = new CodeMirror.inputStyles[options.inputStyle](this);
      var display = this.display = new Display(place, doc2, input, options);
      display.wrapper.CodeMirror = this;
      themeChanged(this);
      if (options.lineWrapping) {
        this.display.wrapper.className += " CodeMirror-wrap";
      }
      initScrollbars(this);
      this.state = {
        keyMaps: [],
        overlays: [],
        modeGen: 0,
        overwrite: false,
        delayingBlurEvent: false,
        focused: false,
        suppressEdits: false,
        pasteIncoming: -1,
        cutIncoming: -1,
        selectingText: false,
        draggingText: false,
        highlight: new Delayed(),
        keySeq: null,
        specialChars: null
      };
      if (options.autofocus && !mobile) {
        display.input.focus();
      }
      if (ie && ie_version < 11) {
        setTimeout(function() {
          return this$1.display.input.reset(true);
        }, 20);
      }
      registerEventHandlers(this);
      ensureGlobalHandlers();
      startOperation(this);
      this.curOp.forceUpdate = true;
      attachDoc(this, doc2);
      if (options.autofocus && !mobile || this.hasFocus()) {
        setTimeout(function() {
          if (this$1.hasFocus() && !this$1.state.focused) {
            onFocus(this$1);
          }
        }, 20);
      } else {
        onBlur(this);
      }
      for (var opt in optionHandlers) {
        if (optionHandlers.hasOwnProperty(opt)) {
          optionHandlers[opt](this, options[opt], Init);
        }
      }
      maybeUpdateLineNumberWidth(this);
      if (options.finishInit) {
        options.finishInit(this);
      }
      for (var i2 = 0; i2 < initHooks.length; ++i2) {
        initHooks[i2](this);
      }
      endOperation(this);
      if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
        display.lineDiv.style.textRendering = "auto";
      }
    }
    CodeMirror.defaults = defaults;
    CodeMirror.optionHandlers = optionHandlers;
    function registerEventHandlers(cm) {
      var d = cm.display;
      on(d.scroller, "mousedown", operation(cm, onMouseDown));
      if (ie && ie_version < 11) {
        on(d.scroller, "dblclick", operation(cm, function(e) {
          if (signalDOMEvent(cm, e)) {
            return;
          }
          var pos = posFromMouse(cm, e);
          if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) {
            return;
          }
          e_preventDefault(e);
          var word = cm.findWordAt(pos);
          extendSelection(cm.doc, word.anchor, word.head);
        }));
      } else {
        on(d.scroller, "dblclick", function(e) {
          return signalDOMEvent(cm, e) || e_preventDefault(e);
        });
      }
      on(d.scroller, "contextmenu", function(e) {
        return onContextMenu(cm, e);
      });
      on(d.input.getField(), "contextmenu", function(e) {
        if (!d.scroller.contains(e.target)) {
          onContextMenu(cm, e);
        }
      });
      var touchFinished, prevTouch = {end: 0};
      function finishTouch() {
        if (d.activeTouch) {
          touchFinished = setTimeout(function() {
            return d.activeTouch = null;
          }, 1e3);
          prevTouch = d.activeTouch;
          prevTouch.end = +new Date();
        }
      }
      function isMouseLikeTouchEvent(e) {
        if (e.touches.length != 1) {
          return false;
        }
        var touch = e.touches[0];
        return touch.radiusX <= 1 && touch.radiusY <= 1;
      }
      function farAway(touch, other) {
        if (other.left == null) {
          return true;
        }
        var dx = other.left - touch.left, dy = other.top - touch.top;
        return dx * dx + dy * dy > 20 * 20;
      }
      on(d.scroller, "touchstart", function(e) {
        if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
          d.input.ensurePolled();
          clearTimeout(touchFinished);
          var now = +new Date();
          d.activeTouch = {
            start: now,
            moved: false,
            prev: now - prevTouch.end <= 300 ? prevTouch : null
          };
          if (e.touches.length == 1) {
            d.activeTouch.left = e.touches[0].pageX;
            d.activeTouch.top = e.touches[0].pageY;
          }
        }
      });
      on(d.scroller, "touchmove", function() {
        if (d.activeTouch) {
          d.activeTouch.moved = true;
        }
      });
      on(d.scroller, "touchend", function(e) {
        var touch = d.activeTouch;
        if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && new Date() - touch.start < 300) {
          var pos = cm.coordsChar(d.activeTouch, "page"), range2;
          if (!touch.prev || farAway(touch, touch.prev)) {
            range2 = new Range(pos, pos);
          } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) {
            range2 = cm.findWordAt(pos);
          } else {
            range2 = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
          }
          cm.setSelection(range2.anchor, range2.head);
          cm.focus();
          e_preventDefault(e);
        }
        finishTouch();
      });
      on(d.scroller, "touchcancel", finishTouch);
      on(d.scroller, "scroll", function() {
        if (d.scroller.clientHeight) {
          updateScrollTop(cm, d.scroller.scrollTop);
          setScrollLeft(cm, d.scroller.scrollLeft, true);
          signal(cm, "scroll", cm);
        }
      });
      on(d.scroller, "mousewheel", function(e) {
        return onScrollWheel(cm, e);
      });
      on(d.scroller, "DOMMouseScroll", function(e) {
        return onScrollWheel(cm, e);
      });
      on(d.wrapper, "scroll", function() {
        return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
      });
      d.dragFunctions = {
        enter: function(e) {
          if (!signalDOMEvent(cm, e)) {
            e_stop(e);
          }
        },
        over: function(e) {
          if (!signalDOMEvent(cm, e)) {
            onDragOver(cm, e);
            e_stop(e);
          }
        },
        start: function(e) {
          return onDragStart(cm, e);
        },
        drop: operation(cm, onDrop),
        leave: function(e) {
          if (!signalDOMEvent(cm, e)) {
            clearDragCursor(cm);
          }
        }
      };
      var inp = d.input.getField();
      on(inp, "keyup", function(e) {
        return onKeyUp.call(cm, e);
      });
      on(inp, "keydown", operation(cm, onKeyDown));
      on(inp, "keypress", operation(cm, onKeyPress));
      on(inp, "focus", function(e) {
        return onFocus(cm, e);
      });
      on(inp, "blur", function(e) {
        return onBlur(cm, e);
      });
    }
    var initHooks = [];
    CodeMirror.defineInitHook = function(f) {
      return initHooks.push(f);
    };
    function indentLine(cm, n, how, aggressive) {
      var doc2 = cm.doc, state;
      if (how == null) {
        how = "add";
      }
      if (how == "smart") {
        if (!doc2.mode.indent) {
          how = "prev";
        } else {
          state = getContextBefore(cm, n).state;
        }
      }
      var tabSize = cm.options.tabSize;
      var line = getLine(doc2, n), curSpace = countColumn(line.text, null, tabSize);
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      var curSpaceString = line.text.match(/^\s*/)[0], indentation;
      if (!aggressive && !/\S/.test(line.text)) {
        indentation = 0;
        how = "not";
      } else if (how == "smart") {
        indentation = doc2.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
        if (indentation == Pass || indentation > 150) {
          if (!aggressive) {
            return;
          }
          how = "prev";
        }
      }
      if (how == "prev") {
        if (n > doc2.first) {
          indentation = countColumn(getLine(doc2, n - 1).text, null, tabSize);
        } else {
          indentation = 0;
        }
      } else if (how == "add") {
        indentation = curSpace + cm.options.indentUnit;
      } else if (how == "subtract") {
        indentation = curSpace - cm.options.indentUnit;
      } else if (typeof how == "number") {
        indentation = curSpace + how;
      }
      indentation = Math.max(0, indentation);
      var indentString = "", pos = 0;
      if (cm.options.indentWithTabs) {
        for (var i2 = Math.floor(indentation / tabSize); i2; --i2) {
          pos += tabSize;
          indentString += "	";
        }
      }
      if (pos < indentation) {
        indentString += spaceStr(indentation - pos);
      }
      if (indentString != curSpaceString) {
        replaceRange(doc2, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
        line.stateAfter = null;
        return true;
      } else {
        for (var i$12 = 0; i$12 < doc2.sel.ranges.length; i$12++) {
          var range2 = doc2.sel.ranges[i$12];
          if (range2.head.line == n && range2.head.ch < curSpaceString.length) {
            var pos$1 = Pos(n, curSpaceString.length);
            replaceOneSelection(doc2, i$12, new Range(pos$1, pos$1));
            break;
          }
        }
      }
    }
    var lastCopied = null;
    function setLastCopied(newLastCopied) {
      lastCopied = newLastCopied;
    }
    function applyTextInput(cm, inserted, deleted, sel, origin) {
      var doc2 = cm.doc;
      cm.display.shift = false;
      if (!sel) {
        sel = doc2.sel;
      }
      var recent = +new Date() - 200;
      var paste = origin == "paste" || cm.state.pasteIncoming > recent;
      var textLines = splitLinesAuto(inserted), multiPaste = null;
      if (paste && sel.ranges.length > 1) {
        if (lastCopied && lastCopied.text.join("\n") == inserted) {
          if (sel.ranges.length % lastCopied.text.length == 0) {
            multiPaste = [];
            for (var i2 = 0; i2 < lastCopied.text.length; i2++) {
              multiPaste.push(doc2.splitLines(lastCopied.text[i2]));
            }
          }
        } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
          multiPaste = map(textLines, function(l) {
            return [l];
          });
        }
      }
      var updateInput = cm.curOp.updateInput;
      for (var i$12 = sel.ranges.length - 1; i$12 >= 0; i$12--) {
        var range2 = sel.ranges[i$12];
        var from = range2.from(), to = range2.to();
        if (range2.empty()) {
          if (deleted && deleted > 0) {
            from = Pos(from.line, from.ch - deleted);
          } else if (cm.state.overwrite && !paste) {
            to = Pos(to.line, Math.min(getLine(doc2, to.line).text.length, to.ch + lst(textLines).length));
          } else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == textLines.join("\n")) {
            from = to = Pos(from.line, 0);
          }
        }
        var changeEvent = {
          from,
          to,
          text: multiPaste ? multiPaste[i$12 % multiPaste.length] : textLines,
          origin: origin || (paste ? "paste" : cm.state.cutIncoming > recent ? "cut" : "+input")
        };
        makeChange(cm.doc, changeEvent);
        signalLater(cm, "inputRead", cm, changeEvent);
      }
      if (inserted && !paste) {
        triggerElectric(cm, inserted);
      }
      ensureCursorVisible(cm);
      if (cm.curOp.updateInput < 2) {
        cm.curOp.updateInput = updateInput;
      }
      cm.curOp.typing = true;
      cm.state.pasteIncoming = cm.state.cutIncoming = -1;
    }
    function handlePaste(e, cm) {
      var pasted = e.clipboardData && e.clipboardData.getData("Text");
      if (pasted) {
        e.preventDefault();
        if (!cm.isReadOnly() && !cm.options.disableInput && cm.hasFocus()) {
          runInOp(cm, function() {
            return applyTextInput(cm, pasted, 0, null, "paste");
          });
        }
        return true;
      }
    }
    function triggerElectric(cm, inserted) {
      if (!cm.options.electricChars || !cm.options.smartIndent) {
        return;
      }
      var sel = cm.doc.sel;
      for (var i2 = sel.ranges.length - 1; i2 >= 0; i2--) {
        var range2 = sel.ranges[i2];
        if (range2.head.ch > 100 || i2 && sel.ranges[i2 - 1].head.line == range2.head.line) {
          continue;
        }
        var mode = cm.getModeAt(range2.head);
        var indented = false;
        if (mode.electricChars) {
          for (var j = 0; j < mode.electricChars.length; j++) {
            if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
              indented = indentLine(cm, range2.head.line, "smart");
              break;
            }
          }
        } else if (mode.electricInput) {
          if (mode.electricInput.test(getLine(cm.doc, range2.head.line).text.slice(0, range2.head.ch))) {
            indented = indentLine(cm, range2.head.line, "smart");
          }
        }
        if (indented) {
          signalLater(cm, "electricInput", cm, range2.head.line);
        }
      }
    }
    function copyableRanges(cm) {
      var text = [], ranges = [];
      for (var i2 = 0; i2 < cm.doc.sel.ranges.length; i2++) {
        var line = cm.doc.sel.ranges[i2].head.line;
        var lineRange = {anchor: Pos(line, 0), head: Pos(line + 1, 0)};
        ranges.push(lineRange);
        text.push(cm.getRange(lineRange.anchor, lineRange.head));
      }
      return {text, ranges};
    }
    function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
      field.setAttribute("autocorrect", autocorrect ? "" : "off");
      field.setAttribute("autocapitalize", autocapitalize ? "" : "off");
      field.setAttribute("spellcheck", !!spellcheck);
    }
    function hiddenTextarea() {
      var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none");
      var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
      if (webkit) {
        te.style.width = "1000px";
      } else {
        te.setAttribute("wrap", "off");
      }
      if (ios) {
        te.style.border = "1px solid black";
      }
      disableBrowserMagic(te);
      return div;
    }
    function addEditorMethods(CodeMirror2) {
      var optionHandlers2 = CodeMirror2.optionHandlers;
      var helpers = CodeMirror2.helpers = {};
      CodeMirror2.prototype = {
        constructor: CodeMirror2,
        focus: function() {
          win(this).focus();
          this.display.input.focus();
        },
        setOption: function(option, value) {
          var options = this.options, old = options[option];
          if (options[option] == value && option != "mode") {
            return;
          }
          options[option] = value;
          if (optionHandlers2.hasOwnProperty(option)) {
            operation(this, optionHandlers2[option])(this, value, old);
          }
          signal(this, "optionChange", this, option);
        },
        getOption: function(option) {
          return this.options[option];
        },
        getDoc: function() {
          return this.doc;
        },
        addKeyMap: function(map2, bottom) {
          this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map2));
        },
        removeKeyMap: function(map2) {
          var maps = this.state.keyMaps;
          for (var i2 = 0; i2 < maps.length; ++i2) {
            if (maps[i2] == map2 || maps[i2].name == map2) {
              maps.splice(i2, 1);
              return true;
            }
          }
        },
        addOverlay: methodOp(function(spec, options) {
          var mode = spec.token ? spec : CodeMirror2.getMode(this.options, spec);
          if (mode.startState) {
            throw new Error("Overlays may not be stateful.");
          }
          insertSorted(this.state.overlays, {
            mode,
            modeSpec: spec,
            opaque: options && options.opaque,
            priority: options && options.priority || 0
          }, function(overlay) {
            return overlay.priority;
          });
          this.state.modeGen++;
          regChange(this);
        }),
        removeOverlay: methodOp(function(spec) {
          var overlays = this.state.overlays;
          for (var i2 = 0; i2 < overlays.length; ++i2) {
            var cur = overlays[i2].modeSpec;
            if (cur == spec || typeof spec == "string" && cur.name == spec) {
              overlays.splice(i2, 1);
              this.state.modeGen++;
              regChange(this);
              return;
            }
          }
        }),
        indentLine: methodOp(function(n, dir, aggressive) {
          if (typeof dir != "string" && typeof dir != "number") {
            if (dir == null) {
              dir = this.options.smartIndent ? "smart" : "prev";
            } else {
              dir = dir ? "add" : "subtract";
            }
          }
          if (isLine(this.doc, n)) {
            indentLine(this, n, dir, aggressive);
          }
        }),
        indentSelection: methodOp(function(how) {
          var ranges = this.doc.sel.ranges, end = -1;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var range2 = ranges[i2];
            if (!range2.empty()) {
              var from = range2.from(), to = range2.to();
              var start = Math.max(end, from.line);
              end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
              for (var j = start; j < end; ++j) {
                indentLine(this, j, how);
              }
              var newRanges = this.doc.sel.ranges;
              if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i2].from().ch > 0) {
                replaceOneSelection(this.doc, i2, new Range(from, newRanges[i2].to()), sel_dontScroll);
              }
            } else if (range2.head.line > end) {
              indentLine(this, range2.head.line, how, true);
              end = range2.head.line;
              if (i2 == this.doc.sel.primIndex) {
                ensureCursorVisible(this);
              }
            }
          }
        }),
        getTokenAt: function(pos, precise) {
          return takeToken(this, pos, precise);
        },
        getLineTokens: function(line, precise) {
          return takeToken(this, Pos(line), precise, true);
        },
        getTokenTypeAt: function(pos) {
          pos = clipPos(this.doc, pos);
          var styles = getLineStyles(this, getLine(this.doc, pos.line));
          var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
          var type;
          if (ch == 0) {
            type = styles[2];
          } else {
            for (; ; ) {
              var mid = before + after >> 1;
              if ((mid ? styles[mid * 2 - 1] : 0) >= ch) {
                after = mid;
              } else if (styles[mid * 2 + 1] < ch) {
                before = mid + 1;
              } else {
                type = styles[mid * 2 + 2];
                break;
              }
            }
          }
          var cut = type ? type.indexOf("overlay ") : -1;
          return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
        },
        getModeAt: function(pos) {
          var mode = this.doc.mode;
          if (!mode.innerMode) {
            return mode;
          }
          return CodeMirror2.innerMode(mode, this.getTokenAt(pos).state).mode;
        },
        getHelper: function(pos, type) {
          return this.getHelpers(pos, type)[0];
        },
        getHelpers: function(pos, type) {
          var found = [];
          if (!helpers.hasOwnProperty(type)) {
            return found;
          }
          var help = helpers[type], mode = this.getModeAt(pos);
          if (typeof mode[type] == "string") {
            if (help[mode[type]]) {
              found.push(help[mode[type]]);
            }
          } else if (mode[type]) {
            for (var i2 = 0; i2 < mode[type].length; i2++) {
              var val = help[mode[type][i2]];
              if (val) {
                found.push(val);
              }
            }
          } else if (mode.helperType && help[mode.helperType]) {
            found.push(help[mode.helperType]);
          } else if (help[mode.name]) {
            found.push(help[mode.name]);
          }
          for (var i$12 = 0; i$12 < help._global.length; i$12++) {
            var cur = help._global[i$12];
            if (cur.pred(mode, this) && indexOf(found, cur.val) == -1) {
              found.push(cur.val);
            }
          }
          return found;
        },
        getStateAfter: function(line, precise) {
          var doc2 = this.doc;
          line = clipLine(doc2, line == null ? doc2.first + doc2.size - 1 : line);
          return getContextBefore(this, line + 1, precise).state;
        },
        cursorCoords: function(start, mode) {
          var pos, range2 = this.doc.sel.primary();
          if (start == null) {
            pos = range2.head;
          } else if (typeof start == "object") {
            pos = clipPos(this.doc, start);
          } else {
            pos = start ? range2.from() : range2.to();
          }
          return cursorCoords(this, pos, mode || "page");
        },
        charCoords: function(pos, mode) {
          return charCoords(this, clipPos(this.doc, pos), mode || "page");
        },
        coordsChar: function(coords, mode) {
          coords = fromCoordSystem(this, coords, mode || "page");
          return coordsChar(this, coords.left, coords.top);
        },
        lineAtHeight: function(height, mode) {
          height = fromCoordSystem(this, {top: height, left: 0}, mode || "page").top;
          return lineAtHeight(this.doc, height + this.display.viewOffset);
        },
        heightAtLine: function(line, mode, includeWidgets) {
          var end = false, lineObj;
          if (typeof line == "number") {
            var last = this.doc.first + this.doc.size - 1;
            if (line < this.doc.first) {
              line = this.doc.first;
            } else if (line > last) {
              line = last;
              end = true;
            }
            lineObj = getLine(this.doc, line);
          } else {
            lineObj = line;
          }
          return intoCoordSystem(this, lineObj, {top: 0, left: 0}, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
        },
        defaultTextHeight: function() {
          return textHeight(this.display);
        },
        defaultCharWidth: function() {
          return charWidth(this.display);
        },
        getViewport: function() {
          return {from: this.display.viewFrom, to: this.display.viewTo};
        },
        addWidget: function(pos, node, scroll, vert, horiz) {
          var display = this.display;
          pos = cursorCoords(this, clipPos(this.doc, pos));
          var top = pos.bottom, left = pos.left;
          node.style.position = "absolute";
          node.setAttribute("cm-ignore-events", "true");
          this.display.input.setUneditable(node);
          display.sizer.appendChild(node);
          if (vert == "over") {
            top = pos.top;
          } else if (vert == "above" || vert == "near") {
            var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
            if ((vert == "above" || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
              top = pos.top - node.offsetHeight;
            } else if (pos.bottom + node.offsetHeight <= vspace) {
              top = pos.bottom;
            }
            if (left + node.offsetWidth > hspace) {
              left = hspace - node.offsetWidth;
            }
          }
          node.style.top = top + "px";
          node.style.left = node.style.right = "";
          if (horiz == "right") {
            left = display.sizer.clientWidth - node.offsetWidth;
            node.style.right = "0px";
          } else {
            if (horiz == "left") {
              left = 0;
            } else if (horiz == "middle") {
              left = (display.sizer.clientWidth - node.offsetWidth) / 2;
            }
            node.style.left = left + "px";
          }
          if (scroll) {
            scrollIntoView(this, {left, top, right: left + node.offsetWidth, bottom: top + node.offsetHeight});
          }
        },
        triggerOnKeyDown: methodOp(onKeyDown),
        triggerOnKeyPress: methodOp(onKeyPress),
        triggerOnKeyUp: onKeyUp,
        triggerOnMouseDown: methodOp(onMouseDown),
        execCommand: function(cmd) {
          if (commands.hasOwnProperty(cmd)) {
            return commands[cmd].call(null, this);
          }
        },
        triggerElectric: methodOp(function(text) {
          triggerElectric(this, text);
        }),
        findPosH: function(from, amount, unit, visually) {
          var dir = 1;
          if (amount < 0) {
            dir = -1;
            amount = -amount;
          }
          var cur = clipPos(this.doc, from);
          for (var i2 = 0; i2 < amount; ++i2) {
            cur = findPosH(this.doc, cur, dir, unit, visually);
            if (cur.hitSide) {
              break;
            }
          }
          return cur;
        },
        moveH: methodOp(function(dir, unit) {
          var this$1 = this;
          this.extendSelectionsBy(function(range2) {
            if (this$1.display.shift || this$1.doc.extend || range2.empty()) {
              return findPosH(this$1.doc, range2.head, dir, unit, this$1.options.rtlMoveVisually);
            } else {
              return dir < 0 ? range2.from() : range2.to();
            }
          }, sel_move);
        }),
        deleteH: methodOp(function(dir, unit) {
          var sel = this.doc.sel, doc2 = this.doc;
          if (sel.somethingSelected()) {
            doc2.replaceSelection("", null, "+delete");
          } else {
            deleteNearSelection(this, function(range2) {
              var other = findPosH(doc2, range2.head, dir, unit, false);
              return dir < 0 ? {from: other, to: range2.head} : {from: range2.head, to: other};
            });
          }
        }),
        findPosV: function(from, amount, unit, goalColumn) {
          var dir = 1, x = goalColumn;
          if (amount < 0) {
            dir = -1;
            amount = -amount;
          }
          var cur = clipPos(this.doc, from);
          for (var i2 = 0; i2 < amount; ++i2) {
            var coords = cursorCoords(this, cur, "div");
            if (x == null) {
              x = coords.left;
            } else {
              coords.left = x;
            }
            cur = findPosV(this, coords, dir, unit);
            if (cur.hitSide) {
              break;
            }
          }
          return cur;
        },
        moveV: methodOp(function(dir, unit) {
          var this$1 = this;
          var doc2 = this.doc, goals = [];
          var collapse = !this.display.shift && !doc2.extend && doc2.sel.somethingSelected();
          doc2.extendSelectionsBy(function(range2) {
            if (collapse) {
              return dir < 0 ? range2.from() : range2.to();
            }
            var headPos = cursorCoords(this$1, range2.head, "div");
            if (range2.goalColumn != null) {
              headPos.left = range2.goalColumn;
            }
            goals.push(headPos.left);
            var pos = findPosV(this$1, headPos, dir, unit);
            if (unit == "page" && range2 == doc2.sel.primary()) {
              addToScrollTop(this$1, charCoords(this$1, pos, "div").top - headPos.top);
            }
            return pos;
          }, sel_move);
          if (goals.length) {
            for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
              doc2.sel.ranges[i2].goalColumn = goals[i2];
            }
          }
        }),
        findWordAt: function(pos) {
          var doc2 = this.doc, line = getLine(doc2, pos.line).text;
          var start = pos.ch, end = pos.ch;
          if (line) {
            var helper = this.getHelper(pos, "wordChars");
            if ((pos.sticky == "before" || end == line.length) && start) {
              --start;
            } else {
              ++end;
            }
            var startChar = line.charAt(start);
            var check = isWordChar(startChar, helper) ? function(ch) {
              return isWordChar(ch, helper);
            } : /\s/.test(startChar) ? function(ch) {
              return /\s/.test(ch);
            } : function(ch) {
              return !/\s/.test(ch) && !isWordChar(ch);
            };
            while (start > 0 && check(line.charAt(start - 1))) {
              --start;
            }
            while (end < line.length && check(line.charAt(end))) {
              ++end;
            }
          }
          return new Range(Pos(pos.line, start), Pos(pos.line, end));
        },
        toggleOverwrite: function(value) {
          if (value != null && value == this.state.overwrite) {
            return;
          }
          if (this.state.overwrite = !this.state.overwrite) {
            addClass(this.display.cursorDiv, "CodeMirror-overwrite");
          } else {
            rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
          }
          signal(this, "overwriteToggle", this, this.state.overwrite);
        },
        hasFocus: function() {
          return this.display.input.getField() == activeElt(doc(this));
        },
        isReadOnly: function() {
          return !!(this.options.readOnly || this.doc.cantEdit);
        },
        scrollTo: methodOp(function(x, y) {
          scrollToCoords(this, x, y);
        }),
        getScrollInfo: function() {
          var scroller = this.display.scroller;
          return {
            left: scroller.scrollLeft,
            top: scroller.scrollTop,
            height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
            width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
            clientHeight: displayHeight(this),
            clientWidth: displayWidth(this)
          };
        },
        scrollIntoView: methodOp(function(range2, margin) {
          if (range2 == null) {
            range2 = {from: this.doc.sel.primary().head, to: null};
            if (margin == null) {
              margin = this.options.cursorScrollMargin;
            }
          } else if (typeof range2 == "number") {
            range2 = {from: Pos(range2, 0), to: null};
          } else if (range2.from == null) {
            range2 = {from: range2, to: null};
          }
          if (!range2.to) {
            range2.to = range2.from;
          }
          range2.margin = margin || 0;
          if (range2.from.line != null) {
            scrollToRange(this, range2);
          } else {
            scrollToCoordsRange(this, range2.from, range2.to, range2.margin);
          }
        }),
        setSize: methodOp(function(width, height) {
          var this$1 = this;
          var interpret = function(val) {
            return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
          };
          if (width != null) {
            this.display.wrapper.style.width = interpret(width);
          }
          if (height != null) {
            this.display.wrapper.style.height = interpret(height);
          }
          if (this.options.lineWrapping) {
            clearLineMeasurementCache(this);
          }
          var lineNo2 = this.display.viewFrom;
          this.doc.iter(lineNo2, this.display.viewTo, function(line) {
            if (line.widgets) {
              for (var i2 = 0; i2 < line.widgets.length; i2++) {
                if (line.widgets[i2].noHScroll) {
                  regLineChange(this$1, lineNo2, "widget");
                  break;
                }
              }
            }
            ++lineNo2;
          });
          this.curOp.forceUpdate = true;
          signal(this, "refresh", this);
        }),
        operation: function(f) {
          return runInOp(this, f);
        },
        startOperation: function() {
          return startOperation(this);
        },
        endOperation: function() {
          return endOperation(this);
        },
        refresh: methodOp(function() {
          var oldHeight = this.display.cachedTextHeight;
          regChange(this);
          this.curOp.forceUpdate = true;
          clearCaches(this);
          scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
          updateGutterSpace(this.display);
          if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > 0.5 || this.options.lineWrapping) {
            estimateLineHeights(this);
          }
          signal(this, "refresh", this);
        }),
        swapDoc: methodOp(function(doc2) {
          var old = this.doc;
          old.cm = null;
          if (this.state.selectingText) {
            this.state.selectingText();
          }
          attachDoc(this, doc2);
          clearCaches(this);
          this.display.input.reset();
          scrollToCoords(this, doc2.scrollLeft, doc2.scrollTop);
          this.curOp.forceScroll = true;
          signalLater(this, "swapDoc", this, old);
          return old;
        }),
        phrase: function(phraseText) {
          var phrases = this.options.phrases;
          return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText;
        },
        getInputField: function() {
          return this.display.input.getField();
        },
        getWrapperElement: function() {
          return this.display.wrapper;
        },
        getScrollerElement: function() {
          return this.display.scroller;
        },
        getGutterElement: function() {
          return this.display.gutters;
        }
      };
      eventMixin(CodeMirror2);
      CodeMirror2.registerHelper = function(type, name, value) {
        if (!helpers.hasOwnProperty(type)) {
          helpers[type] = CodeMirror2[type] = {_global: []};
        }
        helpers[type][name] = value;
      };
      CodeMirror2.registerGlobalHelper = function(type, name, predicate, value) {
        CodeMirror2.registerHelper(type, name, value);
        helpers[type]._global.push({pred: predicate, val: value});
      };
    }
    function findPosH(doc2, pos, dir, unit, visually) {
      var oldPos = pos;
      var origDir = dir;
      var lineObj = getLine(doc2, pos.line);
      var lineDir = visually && doc2.direction == "rtl" ? -dir : dir;
      function findNextLine() {
        var l = pos.line + lineDir;
        if (l < doc2.first || l >= doc2.first + doc2.size) {
          return false;
        }
        pos = new Pos(l, pos.ch, pos.sticky);
        return lineObj = getLine(doc2, l);
      }
      function moveOnce(boundToLine) {
        var next;
        if (unit == "codepoint") {
          var ch = lineObj.text.charCodeAt(pos.ch + (dir > 0 ? 0 : -1));
          if (isNaN(ch)) {
            next = null;
          } else {
            var astral = dir > 0 ? ch >= 55296 && ch < 56320 : ch >= 56320 && ch < 57343;
            next = new Pos(pos.line, Math.max(0, Math.min(lineObj.text.length, pos.ch + dir * (astral ? 2 : 1))), -dir);
          }
        } else if (visually) {
          next = moveVisually(doc2.cm, lineObj, pos, dir);
        } else {
          next = moveLogically(lineObj, pos, dir);
        }
        if (next == null) {
          if (!boundToLine && findNextLine()) {
            pos = endOfLine(visually, doc2.cm, lineObj, pos.line, lineDir);
          } else {
            return false;
          }
        } else {
          pos = next;
        }
        return true;
      }
      if (unit == "char" || unit == "codepoint") {
        moveOnce();
      } else if (unit == "column") {
        moveOnce(true);
      } else if (unit == "word" || unit == "group") {
        var sawType = null, group = unit == "group";
        var helper = doc2.cm && doc2.cm.getHelper(pos, "wordChars");
        for (var first = true; ; first = false) {
          if (dir < 0 && !moveOnce(!first)) {
            break;
          }
          var cur = lineObj.text.charAt(pos.ch) || "\n";
          var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
          if (group && !first && !type) {
            type = "s";
          }
          if (sawType && sawType != type) {
            if (dir < 0) {
              dir = 1;
              moveOnce();
              pos.sticky = "after";
            }
            break;
          }
          if (type) {
            sawType = type;
          }
          if (dir > 0 && !moveOnce(!first)) {
            break;
          }
        }
      }
      var result = skipAtomic(doc2, pos, oldPos, origDir, true);
      if (equalCursorPos(oldPos, result)) {
        result.hitSide = true;
      }
      return result;
    }
    function findPosV(cm, pos, dir, unit) {
      var doc2 = cm.doc, x = pos.left, y;
      if (unit == "page") {
        var pageSize = Math.min(cm.display.wrapper.clientHeight, win(cm).innerHeight || doc2(cm).documentElement.clientHeight);
        var moveAmount = Math.max(pageSize - 0.5 * textHeight(cm.display), 3);
        y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
      } else if (unit == "line") {
        y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
      }
      var target;
      for (; ; ) {
        target = coordsChar(cm, x, y);
        if (!target.outside) {
          break;
        }
        if (dir < 0 ? y <= 0 : y >= doc2.height) {
          target.hitSide = true;
          break;
        }
        y += dir * 5;
      }
      return target;
    }
    var ContentEditableInput = function(cm) {
      this.cm = cm;
      this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
      this.polling = new Delayed();
      this.composing = null;
      this.gracePeriod = false;
      this.readDOMTimeout = null;
    };
    ContentEditableInput.prototype.init = function(display) {
      var this$1 = this;
      var input = this, cm = input.cm;
      var div = input.div = display.lineDiv;
      div.contentEditable = true;
      disableBrowserMagic(div, cm.options.spellcheck, cm.options.autocorrect, cm.options.autocapitalize);
      function belongsToInput(e) {
        for (var t = e.target; t; t = t.parentNode) {
          if (t == div) {
            return true;
          }
          if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) {
            break;
          }
        }
        return false;
      }
      on(div, "paste", function(e) {
        if (!belongsToInput(e) || signalDOMEvent(cm, e) || handlePaste(e, cm)) {
          return;
        }
        if (ie_version <= 11) {
          setTimeout(operation(cm, function() {
            return this$1.updateFromDOM();
          }), 20);
        }
      });
      on(div, "compositionstart", function(e) {
        this$1.composing = {data: e.data, done: false};
      });
      on(div, "compositionupdate", function(e) {
        if (!this$1.composing) {
          this$1.composing = {data: e.data, done: false};
        }
      });
      on(div, "compositionend", function(e) {
        if (this$1.composing) {
          if (e.data != this$1.composing.data) {
            this$1.readFromDOMSoon();
          }
          this$1.composing.done = true;
        }
      });
      on(div, "touchstart", function() {
        return input.forceCompositionEnd();
      });
      on(div, "input", function() {
        if (!this$1.composing) {
          this$1.readFromDOMSoon();
        }
      });
      function onCopyCut(e) {
        if (!belongsToInput(e) || signalDOMEvent(cm, e)) {
          return;
        }
        if (cm.somethingSelected()) {
          setLastCopied({lineWise: false, text: cm.getSelections()});
          if (e.type == "cut") {
            cm.replaceSelection("", null, "cut");
          }
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          setLastCopied({lineWise: true, text: ranges.text});
          if (e.type == "cut") {
            cm.operation(function() {
              cm.setSelections(ranges.ranges, 0, sel_dontScroll);
              cm.replaceSelection("", null, "cut");
            });
          }
        }
        if (e.clipboardData) {
          e.clipboardData.clearData();
          var content = lastCopied.text.join("\n");
          e.clipboardData.setData("Text", content);
          if (e.clipboardData.getData("Text") == content) {
            e.preventDefault();
            return;
          }
        }
        var kludge = hiddenTextarea(), te = kludge.firstChild;
        cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
        te.value = lastCopied.text.join("\n");
        var hadFocus = activeElt(div.ownerDocument);
        selectInput(te);
        setTimeout(function() {
          cm.display.lineSpace.removeChild(kludge);
          hadFocus.focus();
          if (hadFocus == div) {
            input.showPrimarySelection();
          }
        }, 50);
      }
      on(div, "copy", onCopyCut);
      on(div, "cut", onCopyCut);
    };
    ContentEditableInput.prototype.screenReaderLabelChanged = function(label) {
      if (label) {
        this.div.setAttribute("aria-label", label);
      } else {
        this.div.removeAttribute("aria-label");
      }
    };
    ContentEditableInput.prototype.prepareSelection = function() {
      var result = prepareSelection(this.cm, false);
      result.focus = activeElt(this.div.ownerDocument) == this.div;
      return result;
    };
    ContentEditableInput.prototype.showSelection = function(info, takeFocus) {
      if (!info || !this.cm.display.view.length) {
        return;
      }
      if (info.focus || takeFocus) {
        this.showPrimarySelection();
      }
      this.showMultipleSelections(info);
    };
    ContentEditableInput.prototype.getSelection = function() {
      return this.cm.display.wrapper.ownerDocument.getSelection();
    };
    ContentEditableInput.prototype.showPrimarySelection = function() {
      var sel = this.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
      var from = prim.from(), to = prim.to();
      if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
        sel.removeAllRanges();
        return;
      }
      var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
      var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
      if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
        return;
      }
      var view = cm.display.view;
      var start = from.line >= cm.display.viewFrom && posToDOM(cm, from) || {node: view[0].measure.map[2], offset: 0};
      var end = to.line < cm.display.viewTo && posToDOM(cm, to);
      if (!end) {
        var measure = view[view.length - 1].measure;
        var map2 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
        end = {node: map2[map2.length - 1], offset: map2[map2.length - 2] - map2[map2.length - 3]};
      }
      if (!start || !end) {
        sel.removeAllRanges();
        return;
      }
      var old = sel.rangeCount && sel.getRangeAt(0), rng;
      try {
        rng = range(start.node, start.offset, end.offset, end.node);
      } catch (e) {
      }
      if (rng) {
        if (!gecko && cm.state.focused) {
          sel.collapse(start.node, start.offset);
          if (!rng.collapsed) {
            sel.removeAllRanges();
            sel.addRange(rng);
          }
        } else {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
        if (old && sel.anchorNode == null) {
          sel.addRange(old);
        } else if (gecko) {
          this.startGracePeriod();
        }
      }
      this.rememberSelection();
    };
    ContentEditableInput.prototype.startGracePeriod = function() {
      var this$1 = this;
      clearTimeout(this.gracePeriod);
      this.gracePeriod = setTimeout(function() {
        this$1.gracePeriod = false;
        if (this$1.selectionChanged()) {
          this$1.cm.operation(function() {
            return this$1.cm.curOp.selectionChanged = true;
          });
        }
      }, 20);
    };
    ContentEditableInput.prototype.showMultipleSelections = function(info) {
      removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
      removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
    };
    ContentEditableInput.prototype.rememberSelection = function() {
      var sel = this.getSelection();
      this.lastAnchorNode = sel.anchorNode;
      this.lastAnchorOffset = sel.anchorOffset;
      this.lastFocusNode = sel.focusNode;
      this.lastFocusOffset = sel.focusOffset;
    };
    ContentEditableInput.prototype.selectionInEditor = function() {
      var sel = this.getSelection();
      if (!sel.rangeCount) {
        return false;
      }
      var node = sel.getRangeAt(0).commonAncestorContainer;
      return contains(this.div, node);
    };
    ContentEditableInput.prototype.focus = function() {
      if (this.cm.options.readOnly != "nocursor") {
        if (!this.selectionInEditor() || activeElt(this.div.ownerDocument) != this.div) {
          this.showSelection(this.prepareSelection(), true);
        }
        this.div.focus();
      }
    };
    ContentEditableInput.prototype.blur = function() {
      this.div.blur();
    };
    ContentEditableInput.prototype.getField = function() {
      return this.div;
    };
    ContentEditableInput.prototype.supportsTouch = function() {
      return true;
    };
    ContentEditableInput.prototype.receivedFocus = function() {
      var this$1 = this;
      var input = this;
      if (this.selectionInEditor()) {
        setTimeout(function() {
          return this$1.pollSelection();
        }, 20);
      } else {
        runInOp(this.cm, function() {
          return input.cm.curOp.selectionChanged = true;
        });
      }
      function poll() {
        if (input.cm.state.focused) {
          input.pollSelection();
          input.polling.set(input.cm.options.pollInterval, poll);
        }
      }
      this.polling.set(this.cm.options.pollInterval, poll);
    };
    ContentEditableInput.prototype.selectionChanged = function() {
      var sel = this.getSelection();
      return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
    };
    ContentEditableInput.prototype.pollSelection = function() {
      if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
        return;
      }
      var sel = this.getSelection(), cm = this.cm;
      if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
        this.cm.triggerOnKeyDown({type: "keydown", keyCode: 8, preventDefault: Math.abs});
        this.blur();
        this.focus();
        return;
      }
      if (this.composing) {
        return;
      }
      this.rememberSelection();
      var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
      var head = domToPos(cm, sel.focusNode, sel.focusOffset);
      if (anchor && head) {
        runInOp(cm, function() {
          setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
          if (anchor.bad || head.bad) {
            cm.curOp.selectionChanged = true;
          }
        });
      }
    };
    ContentEditableInput.prototype.pollContent = function() {
      if (this.readDOMTimeout != null) {
        clearTimeout(this.readDOMTimeout);
        this.readDOMTimeout = null;
      }
      var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
      var from = sel.from(), to = sel.to();
      if (from.ch == 0 && from.line > cm.firstLine()) {
        from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length);
      }
      if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine()) {
        to = Pos(to.line + 1, 0);
      }
      if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
        return false;
      }
      var fromIndex, fromLine, fromNode;
      if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
        fromLine = lineNo(display.view[0].line);
        fromNode = display.view[0].node;
      } else {
        fromLine = lineNo(display.view[fromIndex].line);
        fromNode = display.view[fromIndex - 1].node.nextSibling;
      }
      var toIndex = findViewIndex(cm, to.line);
      var toLine, toNode;
      if (toIndex == display.view.length - 1) {
        toLine = display.viewTo - 1;
        toNode = display.lineDiv.lastChild;
      } else {
        toLine = lineNo(display.view[toIndex + 1].line) - 1;
        toNode = display.view[toIndex + 1].node.previousSibling;
      }
      if (!fromNode) {
        return false;
      }
      var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
      var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
      while (newText.length > 1 && oldText.length > 1) {
        if (lst(newText) == lst(oldText)) {
          newText.pop();
          oldText.pop();
          toLine--;
        } else if (newText[0] == oldText[0]) {
          newText.shift();
          oldText.shift();
          fromLine++;
        } else {
          break;
        }
      }
      var cutFront = 0, cutEnd = 0;
      var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
      while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
        ++cutFront;
      }
      var newBot = lst(newText), oldBot = lst(oldText);
      var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0), oldBot.length - (oldText.length == 1 ? cutFront : 0));
      while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
        ++cutEnd;
      }
      if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
        while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
          cutFront--;
          cutEnd++;
        }
      }
      newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
      newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");
      var chFrom = Pos(fromLine, cutFront);
      var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
      if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
        replaceRange(cm.doc, newText, chFrom, chTo, "+input");
        return true;
      }
    };
    ContentEditableInput.prototype.ensurePolled = function() {
      this.forceCompositionEnd();
    };
    ContentEditableInput.prototype.reset = function() {
      this.forceCompositionEnd();
    };
    ContentEditableInput.prototype.forceCompositionEnd = function() {
      if (!this.composing) {
        return;
      }
      clearTimeout(this.readDOMTimeout);
      this.composing = null;
      this.updateFromDOM();
      this.div.blur();
      this.div.focus();
    };
    ContentEditableInput.prototype.readFromDOMSoon = function() {
      var this$1 = this;
      if (this.readDOMTimeout != null) {
        return;
      }
      this.readDOMTimeout = setTimeout(function() {
        this$1.readDOMTimeout = null;
        if (this$1.composing) {
          if (this$1.composing.done) {
            this$1.composing = null;
          } else {
            return;
          }
        }
        this$1.updateFromDOM();
      }, 80);
    };
    ContentEditableInput.prototype.updateFromDOM = function() {
      var this$1 = this;
      if (this.cm.isReadOnly() || !this.pollContent()) {
        runInOp(this.cm, function() {
          return regChange(this$1.cm);
        });
      }
    };
    ContentEditableInput.prototype.setUneditable = function(node) {
      node.contentEditable = "false";
    };
    ContentEditableInput.prototype.onKeyPress = function(e) {
      if (e.charCode == 0 || this.composing) {
        return;
      }
      e.preventDefault();
      if (!this.cm.isReadOnly()) {
        operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
      }
    };
    ContentEditableInput.prototype.readOnlyChanged = function(val) {
      this.div.contentEditable = String(val != "nocursor");
    };
    ContentEditableInput.prototype.onContextMenu = function() {
    };
    ContentEditableInput.prototype.resetPosition = function() {
    };
    ContentEditableInput.prototype.needsContentAttribute = true;
    function posToDOM(cm, pos) {
      var view = findViewForLine(cm, pos.line);
      if (!view || view.hidden) {
        return null;
      }
      var line = getLine(cm.doc, pos.line);
      var info = mapFromLineView(view, line, pos.line);
      var order = getOrder(line, cm.doc.direction), side = "left";
      if (order) {
        var partPos = getBidiPartAt(order, pos.ch);
        side = partPos % 2 ? "right" : "left";
      }
      var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
      result.offset = result.collapse == "right" ? result.end : result.start;
      return result;
    }
    function isInGutter(node) {
      for (var scan = node; scan; scan = scan.parentNode) {
        if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
          return true;
        }
      }
      return false;
    }
    function badPos(pos, bad) {
      if (bad) {
        pos.bad = true;
      }
      return pos;
    }
    function domTextBetween(cm, from, to, fromLine, toLine) {
      var text = "", closing = false, lineSep = cm.doc.lineSeparator(), extraLinebreak = false;
      function recognizeMarker(id) {
        return function(marker) {
          return marker.id == id;
        };
      }
      function close() {
        if (closing) {
          text += lineSep;
          if (extraLinebreak) {
            text += lineSep;
          }
          closing = extraLinebreak = false;
        }
      }
      function addText(str) {
        if (str) {
          close();
          text += str;
        }
      }
      function walk(node) {
        if (node.nodeType == 1) {
          var cmText = node.getAttribute("cm-text");
          if (cmText) {
            addText(cmText);
            return;
          }
          var markerID = node.getAttribute("cm-marker"), range2;
          if (markerID) {
            var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
            if (found.length && (range2 = found[0].find(0))) {
              addText(getBetween(cm.doc, range2.from, range2.to).join(lineSep));
            }
            return;
          }
          if (node.getAttribute("contenteditable") == "false") {
            return;
          }
          var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
          if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) {
            return;
          }
          if (isBlock) {
            close();
          }
          for (var i2 = 0; i2 < node.childNodes.length; i2++) {
            walk(node.childNodes[i2]);
          }
          if (/^(pre|p)$/i.test(node.nodeName)) {
            extraLinebreak = true;
          }
          if (isBlock) {
            closing = true;
          }
        } else if (node.nodeType == 3) {
          addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
      }
      for (; ; ) {
        walk(from);
        if (from == to) {
          break;
        }
        from = from.nextSibling;
        extraLinebreak = false;
      }
      return text;
    }
    function domToPos(cm, node, offset) {
      var lineNode;
      if (node == cm.display.lineDiv) {
        lineNode = cm.display.lineDiv.childNodes[offset];
        if (!lineNode) {
          return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
        }
        node = null;
        offset = 0;
      } else {
        for (lineNode = node; ; lineNode = lineNode.parentNode) {
          if (!lineNode || lineNode == cm.display.lineDiv) {
            return null;
          }
          if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) {
            break;
          }
        }
      }
      for (var i2 = 0; i2 < cm.display.view.length; i2++) {
        var lineView = cm.display.view[i2];
        if (lineView.node == lineNode) {
          return locateNodeInLineView(lineView, node, offset);
        }
      }
    }
    function locateNodeInLineView(lineView, node, offset) {
      var wrapper = lineView.text.firstChild, bad = false;
      if (!node || !contains(wrapper, node)) {
        return badPos(Pos(lineNo(lineView.line), 0), true);
      }
      if (node == wrapper) {
        bad = true;
        node = wrapper.childNodes[offset];
        offset = 0;
        if (!node) {
          var line = lineView.rest ? lst(lineView.rest) : lineView.line;
          return badPos(Pos(lineNo(line), line.text.length), bad);
        }
      }
      var textNode = node.nodeType == 3 ? node : null, topNode = node;
      if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
        textNode = node.firstChild;
        if (offset) {
          offset = textNode.nodeValue.length;
        }
      }
      while (topNode.parentNode != wrapper) {
        topNode = topNode.parentNode;
      }
      var measure = lineView.measure, maps = measure.maps;
      function find(textNode2, topNode2, offset2) {
        for (var i2 = -1; i2 < (maps ? maps.length : 0); i2++) {
          var map2 = i2 < 0 ? measure.map : maps[i2];
          for (var j = 0; j < map2.length; j += 3) {
            var curNode = map2[j + 2];
            if (curNode == textNode2 || curNode == topNode2) {
              var line2 = lineNo(i2 < 0 ? lineView.line : lineView.rest[i2]);
              var ch = map2[j] + offset2;
              if (offset2 < 0 || curNode != textNode2) {
                ch = map2[j + (offset2 ? 1 : 0)];
              }
              return Pos(line2, ch);
            }
          }
        }
      }
      var found = find(textNode, topNode, offset);
      if (found) {
        return badPos(found, bad);
      }
      for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
        found = find(after, after.firstChild, 0);
        if (found) {
          return badPos(Pos(found.line, found.ch - dist), bad);
        } else {
          dist += after.textContent.length;
        }
      }
      for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
        found = find(before, before.firstChild, -1);
        if (found) {
          return badPos(Pos(found.line, found.ch + dist$1), bad);
        } else {
          dist$1 += before.textContent.length;
        }
      }
    }
    var TextareaInput = function(cm) {
      this.cm = cm;
      this.prevInput = "";
      this.pollingFast = false;
      this.polling = new Delayed();
      this.hasSelection = false;
      this.composing = null;
      this.resetting = false;
    };
    TextareaInput.prototype.init = function(display) {
      var this$1 = this;
      var input = this, cm = this.cm;
      this.createField(display);
      var te = this.textarea;
      display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);
      if (ios) {
        te.style.width = "0px";
      }
      on(te, "input", function() {
        if (ie && ie_version >= 9 && this$1.hasSelection) {
          this$1.hasSelection = null;
        }
        input.poll();
      });
      on(te, "paste", function(e) {
        if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
          return;
        }
        cm.state.pasteIncoming = +new Date();
        input.fastPoll();
      });
      function prepareCopyCut(e) {
        if (signalDOMEvent(cm, e)) {
          return;
        }
        if (cm.somethingSelected()) {
          setLastCopied({lineWise: false, text: cm.getSelections()});
        } else if (!cm.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm);
          setLastCopied({lineWise: true, text: ranges.text});
          if (e.type == "cut") {
            cm.setSelections(ranges.ranges, null, sel_dontScroll);
          } else {
            input.prevInput = "";
            te.value = ranges.text.join("\n");
            selectInput(te);
          }
        }
        if (e.type == "cut") {
          cm.state.cutIncoming = +new Date();
        }
      }
      on(te, "cut", prepareCopyCut);
      on(te, "copy", prepareCopyCut);
      on(display.scroller, "paste", function(e) {
        if (eventInWidget(display, e) || signalDOMEvent(cm, e)) {
          return;
        }
        if (!te.dispatchEvent) {
          cm.state.pasteIncoming = +new Date();
          input.focus();
          return;
        }
        var event = new Event("paste");
        event.clipboardData = e.clipboardData;
        te.dispatchEvent(event);
      });
      on(display.lineSpace, "selectstart", function(e) {
        if (!eventInWidget(display, e)) {
          e_preventDefault(e);
        }
      });
      on(te, "compositionstart", function() {
        var start = cm.getCursor("from");
        if (input.composing) {
          input.composing.range.clear();
        }
        input.composing = {
          start,
          range: cm.markText(start, cm.getCursor("to"), {className: "CodeMirror-composing"})
        };
      });
      on(te, "compositionend", function() {
        if (input.composing) {
          input.poll();
          input.composing.range.clear();
          input.composing = null;
        }
      });
    };
    TextareaInput.prototype.createField = function(_display) {
      this.wrapper = hiddenTextarea();
      this.textarea = this.wrapper.firstChild;
    };
    TextareaInput.prototype.screenReaderLabelChanged = function(label) {
      if (label) {
        this.textarea.setAttribute("aria-label", label);
      } else {
        this.textarea.removeAttribute("aria-label");
      }
    };
    TextareaInput.prototype.prepareSelection = function() {
      var cm = this.cm, display = cm.display, doc2 = cm.doc;
      var result = prepareSelection(cm);
      if (cm.options.moveInputWithCursor) {
        var headPos = cursorCoords(cm, doc2.sel.primary().head, "div");
        var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
        result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
        result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
      }
      return result;
    };
    TextareaInput.prototype.showSelection = function(drawn) {
      var cm = this.cm, display = cm.display;
      removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
      removeChildrenAndAdd(display.selectionDiv, drawn.selection);
      if (drawn.teTop != null) {
        this.wrapper.style.top = drawn.teTop + "px";
        this.wrapper.style.left = drawn.teLeft + "px";
      }
    };
    TextareaInput.prototype.reset = function(typing) {
      if (this.contextMenuPending || this.composing && typing) {
        return;
      }
      var cm = this.cm;
      this.resetting = true;
      if (cm.somethingSelected()) {
        this.prevInput = "";
        var content = cm.getSelection();
        this.textarea.value = content;
        if (cm.state.focused) {
          selectInput(this.textarea);
        }
        if (ie && ie_version >= 9) {
          this.hasSelection = content;
        }
      } else if (!typing) {
        this.prevInput = this.textarea.value = "";
        if (ie && ie_version >= 9) {
          this.hasSelection = null;
        }
      }
      this.resetting = false;
    };
    TextareaInput.prototype.getField = function() {
      return this.textarea;
    };
    TextareaInput.prototype.supportsTouch = function() {
      return false;
    };
    TextareaInput.prototype.focus = function() {
      if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt(this.textarea.ownerDocument) != this.textarea)) {
        try {
          this.textarea.focus();
        } catch (e) {
        }
      }
    };
    TextareaInput.prototype.blur = function() {
      this.textarea.blur();
    };
    TextareaInput.prototype.resetPosition = function() {
      this.wrapper.style.top = this.wrapper.style.left = 0;
    };
    TextareaInput.prototype.receivedFocus = function() {
      this.slowPoll();
    };
    TextareaInput.prototype.slowPoll = function() {
      var this$1 = this;
      if (this.pollingFast) {
        return;
      }
      this.polling.set(this.cm.options.pollInterval, function() {
        this$1.poll();
        if (this$1.cm.state.focused) {
          this$1.slowPoll();
        }
      });
    };
    TextareaInput.prototype.fastPoll = function() {
      var missed = false, input = this;
      input.pollingFast = true;
      function p() {
        var changed = input.poll();
        if (!changed && !missed) {
          missed = true;
          input.polling.set(60, p);
        } else {
          input.pollingFast = false;
          input.slowPoll();
        }
      }
      input.polling.set(20, p);
    };
    TextareaInput.prototype.poll = function() {
      var this$1 = this;
      var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
      if (this.contextMenuPending || this.resetting || !cm.state.focused || hasSelection(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) {
        return false;
      }
      var text = input.value;
      if (text == prevInput && !cm.somethingSelected()) {
        return false;
      }
      if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
        cm.display.input.reset();
        return false;
      }
      if (cm.doc.sel == cm.display.selForContextMenu) {
        var first = text.charCodeAt(0);
        if (first == 8203 && !prevInput) {
          prevInput = "​";
        }
        if (first == 8666) {
          this.reset();
          return this.cm.execCommand("undo");
        }
      }
      var same = 0, l = Math.min(prevInput.length, text.length);
      while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
        ++same;
      }
      runInOp(cm, function() {
        applyTextInput(cm, text.slice(same), prevInput.length - same, null, this$1.composing ? "*compose" : null);
        if (text.length > 1e3 || text.indexOf("\n") > -1) {
          input.value = this$1.prevInput = "";
        } else {
          this$1.prevInput = text;
        }
        if (this$1.composing) {
          this$1.composing.range.clear();
          this$1.composing.range = cm.markText(this$1.composing.start, cm.getCursor("to"), {className: "CodeMirror-composing"});
        }
      });
      return true;
    };
    TextareaInput.prototype.ensurePolled = function() {
      if (this.pollingFast && this.poll()) {
        this.pollingFast = false;
      }
    };
    TextareaInput.prototype.onKeyPress = function() {
      if (ie && ie_version >= 9) {
        this.hasSelection = null;
      }
      this.fastPoll();
    };
    TextareaInput.prototype.onContextMenu = function(e) {
      var input = this, cm = input.cm, display = cm.display, te = input.textarea;
      if (input.contextMenuPending) {
        input.contextMenuPending();
      }
      var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
      if (!pos || presto) {
        return;
      }
      var reset = cm.options.resetSelectionOnContextMenu;
      if (reset && cm.doc.sel.contains(pos) == -1) {
        operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
      }
      var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
      var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
      input.wrapper.style.cssText = "position: static";
      te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      var oldScrollY;
      if (webkit) {
        oldScrollY = te.ownerDocument.defaultView.scrollY;
      }
      display.input.focus();
      if (webkit) {
        te.ownerDocument.defaultView.scrollTo(null, oldScrollY);
      }
      display.input.reset();
      if (!cm.somethingSelected()) {
        te.value = input.prevInput = " ";
      }
      input.contextMenuPending = rehide;
      display.selForContextMenu = cm.doc.sel;
      clearTimeout(display.detectingSelectAll);
      function prepareSelectAllHack() {
        if (te.selectionStart != null) {
          var selected = cm.somethingSelected();
          var extval = "​" + (selected ? te.value : "");
          te.value = "⇚";
          te.value = extval;
          input.prevInput = selected ? "" : "​";
          te.selectionStart = 1;
          te.selectionEnd = extval.length;
          display.selForContextMenu = cm.doc.sel;
        }
      }
      function rehide() {
        if (input.contextMenuPending != rehide) {
          return;
        }
        input.contextMenuPending = false;
        input.wrapper.style.cssText = oldWrapperCSS;
        te.style.cssText = oldCSS;
        if (ie && ie_version < 9) {
          display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
        }
        if (te.selectionStart != null) {
          if (!ie || ie && ie_version < 9) {
            prepareSelectAllHack();
          }
          var i2 = 0, poll = function() {
            if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "​") {
              operation(cm, selectAll)(cm);
            } else if (i2++ < 10) {
              display.detectingSelectAll = setTimeout(poll, 500);
            } else {
              display.selForContextMenu = null;
              display.input.reset();
            }
          };
          display.detectingSelectAll = setTimeout(poll, 200);
        }
      }
      if (ie && ie_version >= 9) {
        prepareSelectAllHack();
      }
      if (captureRightClick) {
        e_stop(e);
        var mouseup = function() {
          off(window, "mouseup", mouseup);
          setTimeout(rehide, 20);
        };
        on(window, "mouseup", mouseup);
      } else {
        setTimeout(rehide, 50);
      }
    };
    TextareaInput.prototype.readOnlyChanged = function(val) {
      if (!val) {
        this.reset();
      }
      this.textarea.disabled = val == "nocursor";
      this.textarea.readOnly = !!val;
    };
    TextareaInput.prototype.setUneditable = function() {
    };
    TextareaInput.prototype.needsContentAttribute = false;
    function fromTextArea(textarea, options) {
      options = options ? copyObj(options) : {};
      options.value = textarea.value;
      if (!options.tabindex && textarea.tabIndex) {
        options.tabindex = textarea.tabIndex;
      }
      if (!options.placeholder && textarea.placeholder) {
        options.placeholder = textarea.placeholder;
      }
      if (options.autofocus == null) {
        var hasFocus = activeElt(textarea.ownerDocument);
        options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
      }
      function save() {
        textarea.value = cm.getValue();
      }
      var realSubmit;
      if (textarea.form) {
        on(textarea.form, "submit", save);
        if (!options.leaveSubmitMethodAlone) {
          var form = textarea.form;
          realSubmit = form.submit;
          try {
            var wrappedSubmit = form.submit = function() {
              save();
              form.submit = realSubmit;
              form.submit();
              form.submit = wrappedSubmit;
            };
          } catch (e) {
          }
        }
      }
      options.finishInit = function(cm2) {
        cm2.save = save;
        cm2.getTextArea = function() {
          return textarea;
        };
        cm2.toTextArea = function() {
          cm2.toTextArea = isNaN;
          save();
          textarea.parentNode.removeChild(cm2.getWrapperElement());
          textarea.style.display = "";
          if (textarea.form) {
            off(textarea.form, "submit", save);
            if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function") {
              textarea.form.submit = realSubmit;
            }
          }
        };
      };
      textarea.style.display = "none";
      var cm = CodeMirror(function(node) {
        return textarea.parentNode.insertBefore(node, textarea.nextSibling);
      }, options);
      return cm;
    }
    function addLegacyProps(CodeMirror2) {
      CodeMirror2.off = off;
      CodeMirror2.on = on;
      CodeMirror2.wheelEventPixels = wheelEventPixels;
      CodeMirror2.Doc = Doc;
      CodeMirror2.splitLines = splitLinesAuto;
      CodeMirror2.countColumn = countColumn;
      CodeMirror2.findColumn = findColumn;
      CodeMirror2.isWordChar = isWordCharBasic;
      CodeMirror2.Pass = Pass;
      CodeMirror2.signal = signal;
      CodeMirror2.Line = Line;
      CodeMirror2.changeEnd = changeEnd;
      CodeMirror2.scrollbarModel = scrollbarModel;
      CodeMirror2.Pos = Pos;
      CodeMirror2.cmpPos = cmp;
      CodeMirror2.modes = modes;
      CodeMirror2.mimeModes = mimeModes;
      CodeMirror2.resolveMode = resolveMode;
      CodeMirror2.getMode = getMode;
      CodeMirror2.modeExtensions = modeExtensions;
      CodeMirror2.extendMode = extendMode;
      CodeMirror2.copyState = copyState;
      CodeMirror2.startState = startState;
      CodeMirror2.innerMode = innerMode;
      CodeMirror2.commands = commands;
      CodeMirror2.keyMap = keyMap;
      CodeMirror2.keyName = keyName;
      CodeMirror2.isModifierKey = isModifierKey;
      CodeMirror2.lookupKey = lookupKey;
      CodeMirror2.normalizeKeyMap = normalizeKeyMap;
      CodeMirror2.StringStream = StringStream;
      CodeMirror2.SharedTextMarker = SharedTextMarker;
      CodeMirror2.TextMarker = TextMarker;
      CodeMirror2.LineWidget = LineWidget;
      CodeMirror2.e_preventDefault = e_preventDefault;
      CodeMirror2.e_stopPropagation = e_stopPropagation;
      CodeMirror2.e_stop = e_stop;
      CodeMirror2.addClass = addClass;
      CodeMirror2.contains = contains;
      CodeMirror2.rmClass = rmClass;
      CodeMirror2.keyNames = keyNames;
    }
    defineOptions(CodeMirror);
    addEditorMethods(CodeMirror);
    var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
    for (var prop in Doc.prototype) {
      if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
        CodeMirror.prototype[prop] = function(method) {
          return function() {
            return method.apply(this.doc, arguments);
          };
        }(Doc.prototype[prop]);
      }
    }
    eventMixin(Doc);
    CodeMirror.inputStyles = {textarea: TextareaInput, contenteditable: ContentEditableInput};
    CodeMirror.defineMode = function(name) {
      if (!CodeMirror.defaults.mode && name != "null") {
        CodeMirror.defaults.mode = name;
      }
      defineMode.apply(this, arguments);
    };
    CodeMirror.defineMIME = defineMIME;
    CodeMirror.defineMode("null", function() {
      return {token: function(stream) {
        return stream.skipToEnd();
      }};
    });
    CodeMirror.defineMIME("text/plain", "null");
    CodeMirror.defineExtension = function(name, func) {
      CodeMirror.prototype[name] = func;
    };
    CodeMirror.defineDocExtension = function(name, func) {
      Doc.prototype[name] = func;
    };
    CodeMirror.fromTextArea = fromTextArea;
    addLegacyProps(CodeMirror);
    CodeMirror.version = "5.65.8";
    return CodeMirror;
  });
});

// dist/_snowpack/pkg/codemirror/mode/xml/xml.js
var xml = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var htmlConfig = {
      autoSelfClosers: {
        area: true,
        base: true,
        br: true,
        col: true,
        command: true,
        embed: true,
        frame: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true,
        menuitem: true
      },
      implicitlyClosed: {
        dd: true,
        li: true,
        optgroup: true,
        option: true,
        p: true,
        rp: true,
        rt: true,
        tbody: true,
        td: true,
        tfoot: true,
        th: true,
        tr: true
      },
      contextGrabbers: {
        dd: {dd: true, dt: true},
        dt: {dd: true, dt: true},
        li: {li: true},
        option: {option: true, optgroup: true},
        optgroup: {optgroup: true},
        p: {
          address: true,
          article: true,
          aside: true,
          blockquote: true,
          dir: true,
          div: true,
          dl: true,
          fieldset: true,
          footer: true,
          form: true,
          h1: true,
          h2: true,
          h3: true,
          h4: true,
          h5: true,
          h6: true,
          header: true,
          hgroup: true,
          hr: true,
          menu: true,
          nav: true,
          ol: true,
          p: true,
          pre: true,
          section: true,
          table: true,
          ul: true
        },
        rp: {rp: true, rt: true},
        rt: {rp: true, rt: true},
        tbody: {tbody: true, tfoot: true},
        td: {td: true, th: true},
        tfoot: {tbody: true},
        th: {td: true, th: true},
        thead: {tbody: true, tfoot: true},
        tr: {tr: true}
      },
      doNotIndent: {pre: true},
      allowUnquoted: true,
      allowMissing: true,
      caseFold: true
    };
    var xmlConfig = {
      autoSelfClosers: {},
      implicitlyClosed: {},
      contextGrabbers: {},
      doNotIndent: {},
      allowUnquoted: false,
      allowMissing: false,
      allowMissingTagName: false,
      caseFold: false
    };
    CodeMirror.defineMode("xml", function(editorConf, config_) {
      var indentUnit = editorConf.indentUnit;
      var config = {};
      var defaults = config_.htmlMode ? htmlConfig : xmlConfig;
      for (var prop in defaults)
        config[prop] = defaults[prop];
      for (var prop in config_)
        config[prop] = config_[prop];
      var type, setStyle;
      function inText(stream, state) {
        function chain(parser) {
          state.tokenize = parser;
          return parser(stream, state);
        }
        var ch = stream.next();
        if (ch == "<") {
          if (stream.eat("!")) {
            if (stream.eat("[")) {
              if (stream.match("CDATA["))
                return chain(inBlock("atom", "]]>"));
              else
                return null;
            } else if (stream.match("--")) {
              return chain(inBlock("comment", "-->"));
            } else if (stream.match("DOCTYPE", true, true)) {
              stream.eatWhile(/[\w\._\-]/);
              return chain(doctype(1));
            } else {
              return null;
            }
          } else if (stream.eat("?")) {
            stream.eatWhile(/[\w\._\-]/);
            state.tokenize = inBlock("meta", "?>");
            return "meta";
          } else {
            type = stream.eat("/") ? "closeTag" : "openTag";
            state.tokenize = inTag;
            return "tag bracket";
          }
        } else if (ch == "&") {
          var ok;
          if (stream.eat("#")) {
            if (stream.eat("x")) {
              ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
            } else {
              ok = stream.eatWhile(/[\d]/) && stream.eat(";");
            }
          } else {
            ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
          }
          return ok ? "atom" : "error";
        } else {
          stream.eatWhile(/[^&<]/);
          return null;
        }
      }
      inText.isInText = true;
      function inTag(stream, state) {
        var ch = stream.next();
        if (ch == ">" || ch == "/" && stream.eat(">")) {
          state.tokenize = inText;
          type = ch == ">" ? "endTag" : "selfcloseTag";
          return "tag bracket";
        } else if (ch == "=") {
          type = "equals";
          return null;
        } else if (ch == "<") {
          state.tokenize = inText;
          state.state = baseState;
          state.tagName = state.tagStart = null;
          var next = state.tokenize(stream, state);
          return next ? next + " tag error" : "tag error";
        } else if (/[\'\"]/.test(ch)) {
          state.tokenize = inAttribute(ch);
          state.stringStartCol = stream.column();
          return state.tokenize(stream, state);
        } else {
          stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
          return "word";
        }
      }
      function inAttribute(quote) {
        var closure = function(stream, state) {
          while (!stream.eol()) {
            if (stream.next() == quote) {
              state.tokenize = inTag;
              break;
            }
          }
          return "string";
        };
        closure.isInAttribute = true;
        return closure;
      }
      function inBlock(style, terminator) {
        return function(stream, state) {
          while (!stream.eol()) {
            if (stream.match(terminator)) {
              state.tokenize = inText;
              break;
            }
            stream.next();
          }
          return style;
        };
      }
      function doctype(depth) {
        return function(stream, state) {
          var ch;
          while ((ch = stream.next()) != null) {
            if (ch == "<") {
              state.tokenize = doctype(depth + 1);
              return state.tokenize(stream, state);
            } else if (ch == ">") {
              if (depth == 1) {
                state.tokenize = inText;
                break;
              } else {
                state.tokenize = doctype(depth - 1);
                return state.tokenize(stream, state);
              }
            }
          }
          return "meta";
        };
      }
      function lower(tagName) {
        return tagName && tagName.toLowerCase();
      }
      function Context(state, tagName, startOfLine) {
        this.prev = state.context;
        this.tagName = tagName || "";
        this.indent = state.indented;
        this.startOfLine = startOfLine;
        if (config.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent)
          this.noIndent = true;
      }
      function popContext(state) {
        if (state.context)
          state.context = state.context.prev;
      }
      function maybePopContext(state, nextTagName) {
        var parentTagName;
        while (true) {
          if (!state.context) {
            return;
          }
          parentTagName = state.context.tagName;
          if (!config.contextGrabbers.hasOwnProperty(lower(parentTagName)) || !config.contextGrabbers[lower(parentTagName)].hasOwnProperty(lower(nextTagName))) {
            return;
          }
          popContext(state);
        }
      }
      function baseState(type2, stream, state) {
        if (type2 == "openTag") {
          state.tagStart = stream.column();
          return tagNameState;
        } else if (type2 == "closeTag") {
          return closeTagNameState;
        } else {
          return baseState;
        }
      }
      function tagNameState(type2, stream, state) {
        if (type2 == "word") {
          state.tagName = stream.current();
          setStyle = "tag";
          return attrState;
        } else if (config.allowMissingTagName && type2 == "endTag") {
          setStyle = "tag bracket";
          return attrState(type2, stream, state);
        } else {
          setStyle = "error";
          return tagNameState;
        }
      }
      function closeTagNameState(type2, stream, state) {
        if (type2 == "word") {
          var tagName = stream.current();
          if (state.context && state.context.tagName != tagName && config.implicitlyClosed.hasOwnProperty(lower(state.context.tagName)))
            popContext(state);
          if (state.context && state.context.tagName == tagName || config.matchClosing === false) {
            setStyle = "tag";
            return closeState;
          } else {
            setStyle = "tag error";
            return closeStateErr;
          }
        } else if (config.allowMissingTagName && type2 == "endTag") {
          setStyle = "tag bracket";
          return closeState(type2, stream, state);
        } else {
          setStyle = "error";
          return closeStateErr;
        }
      }
      function closeState(type2, _stream, state) {
        if (type2 != "endTag") {
          setStyle = "error";
          return closeState;
        }
        popContext(state);
        return baseState;
      }
      function closeStateErr(type2, stream, state) {
        setStyle = "error";
        return closeState(type2, stream, state);
      }
      function attrState(type2, _stream, state) {
        if (type2 == "word") {
          setStyle = "attribute";
          return attrEqState;
        } else if (type2 == "endTag" || type2 == "selfcloseTag") {
          var tagName = state.tagName, tagStart = state.tagStart;
          state.tagName = state.tagStart = null;
          if (type2 == "selfcloseTag" || config.autoSelfClosers.hasOwnProperty(lower(tagName))) {
            maybePopContext(state, tagName);
          } else {
            maybePopContext(state, tagName);
            state.context = new Context(state, tagName, tagStart == state.indented);
          }
          return baseState;
        }
        setStyle = "error";
        return attrState;
      }
      function attrEqState(type2, stream, state) {
        if (type2 == "equals")
          return attrValueState;
        if (!config.allowMissing)
          setStyle = "error";
        return attrState(type2, stream, state);
      }
      function attrValueState(type2, stream, state) {
        if (type2 == "string")
          return attrContinuedState;
        if (type2 == "word" && config.allowUnquoted) {
          setStyle = "string";
          return attrState;
        }
        setStyle = "error";
        return attrState(type2, stream, state);
      }
      function attrContinuedState(type2, stream, state) {
        if (type2 == "string")
          return attrContinuedState;
        return attrState(type2, stream, state);
      }
      return {
        startState: function(baseIndent) {
          var state = {
            tokenize: inText,
            state: baseState,
            indented: baseIndent || 0,
            tagName: null,
            tagStart: null,
            context: null
          };
          if (baseIndent != null)
            state.baseIndent = baseIndent;
          return state;
        },
        token: function(stream, state) {
          if (!state.tagName && stream.sol())
            state.indented = stream.indentation();
          if (stream.eatSpace())
            return null;
          type = null;
          var style = state.tokenize(stream, state);
          if ((style || type) && style != "comment") {
            setStyle = null;
            state.state = state.state(type || style, stream, state);
            if (setStyle)
              style = setStyle == "error" ? style + " error" : setStyle;
          }
          return style;
        },
        indent: function(state, textAfter, fullLine) {
          var context = state.context;
          if (state.tokenize.isInAttribute) {
            if (state.tagStart == state.indented)
              return state.stringStartCol + 1;
            else
              return state.indented + indentUnit;
          }
          if (context && context.noIndent)
            return CodeMirror.Pass;
          if (state.tokenize != inTag && state.tokenize != inText)
            return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
          if (state.tagName) {
            if (config.multilineTagIndentPastTag !== false)
              return state.tagStart + state.tagName.length + 2;
            else
              return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
          }
          if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter))
            return 0;
          var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
          if (tagAfter && tagAfter[1]) {
            while (context) {
              if (context.tagName == tagAfter[2]) {
                context = context.prev;
                break;
              } else if (config.implicitlyClosed.hasOwnProperty(lower(context.tagName))) {
                context = context.prev;
              } else {
                break;
              }
            }
          } else if (tagAfter) {
            while (context) {
              var grabbers = config.contextGrabbers[lower(context.tagName)];
              if (grabbers && grabbers.hasOwnProperty(lower(tagAfter[2])))
                context = context.prev;
              else
                break;
            }
          }
          while (context && context.prev && !context.startOfLine)
            context = context.prev;
          if (context)
            return context.indent + indentUnit;
          else
            return state.baseIndent || 0;
        },
        electricInput: /<\/[\s\w:]+>$/,
        blockCommentStart: "<!--",
        blockCommentEnd: "-->",
        configuration: config.htmlMode ? "html" : "xml",
        helperType: config.htmlMode ? "html" : "xml",
        skipAttribute: function(state) {
          if (state.state == attrValueState)
            state.state = attrState;
        },
        xmlCurrentTag: function(state) {
          return state.tagName ? {name: state.tagName, close: state.type == "closeTag"} : null;
        },
        xmlCurrentContext: function(state) {
          var context = [];
          for (var cx = state.context; cx; cx = cx.prev)
            context.push(cx.tagName);
          return context.reverse();
        }
      };
    });
    CodeMirror.defineMIME("text/xml", "xml");
    CodeMirror.defineMIME("application/xml", "xml");
    if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
      CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});
  });
});
var xml_default = xml;

// dist/_snowpack/pkg/codemirror/mode/css/css.js
var css = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    CodeMirror.defineMode("css", function(config, parserConfig) {
      var inline = parserConfig.inline;
      if (!parserConfig.propertyKeywords)
        parserConfig = CodeMirror.resolveMode("text/css");
      var indentUnit = config.indentUnit, tokenHooks = parserConfig.tokenHooks, documentTypes2 = parserConfig.documentTypes || {}, mediaTypes2 = parserConfig.mediaTypes || {}, mediaFeatures2 = parserConfig.mediaFeatures || {}, mediaValueKeywords2 = parserConfig.mediaValueKeywords || {}, propertyKeywords2 = parserConfig.propertyKeywords || {}, nonStandardPropertyKeywords2 = parserConfig.nonStandardPropertyKeywords || {}, fontProperties2 = parserConfig.fontProperties || {}, counterDescriptors2 = parserConfig.counterDescriptors || {}, colorKeywords2 = parserConfig.colorKeywords || {}, valueKeywords2 = parserConfig.valueKeywords || {}, allowNested = parserConfig.allowNested, lineComment = parserConfig.lineComment, supportsAtComponent = parserConfig.supportsAtComponent === true, highlightNonStandardPropertyKeywords = config.highlightNonStandardPropertyKeywords !== false;
      var type, override;
      function ret(style, tp) {
        type = tp;
        return style;
      }
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (tokenHooks[ch]) {
          var result = tokenHooks[ch](stream, state);
          if (result !== false)
            return result;
        }
        if (ch == "@") {
          stream.eatWhile(/[\w\\\-]/);
          return ret("def", stream.current());
        } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
          return ret(null, "compare");
        } else if (ch == '"' || ch == "'") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        } else if (ch == "#") {
          stream.eatWhile(/[\w\\\-]/);
          return ret("atom", "hash");
        } else if (ch == "!") {
          stream.match(/^\s*\w*/);
          return ret("keyword", "important");
        } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
          stream.eatWhile(/[\w.%]/);
          return ret("number", "unit");
        } else if (ch === "-") {
          if (/[\d.]/.test(stream.peek())) {
            stream.eatWhile(/[\w.%]/);
            return ret("number", "unit");
          } else if (stream.match(/^-[\w\\\-]*/)) {
            stream.eatWhile(/[\w\\\-]/);
            if (stream.match(/^\s*:/, false))
              return ret("variable-2", "variable-definition");
            return ret("variable-2", "variable");
          } else if (stream.match(/^\w+-/)) {
            return ret("meta", "meta");
          }
        } else if (/[,+>*\/]/.test(ch)) {
          return ret(null, "select-op");
        } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
          return ret("qualifier", "qualifier");
        } else if (/[:;{}\[\]\(\)]/.test(ch)) {
          return ret(null, ch);
        } else if (stream.match(/^[\w-.]+(?=\()/)) {
          if (/^(url(-prefix)?|domain|regexp)$/i.test(stream.current())) {
            state.tokenize = tokenParenthesized;
          }
          return ret("variable callee", "variable");
        } else if (/[\w\\\-]/.test(ch)) {
          stream.eatWhile(/[\w\\\-]/);
          return ret("property", "word");
        } else {
          return ret(null, null);
        }
      }
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, ch;
          while ((ch = stream.next()) != null) {
            if (ch == quote && !escaped) {
              if (quote == ")")
                stream.backUp(1);
              break;
            }
            escaped = !escaped && ch == "\\";
          }
          if (ch == quote || !escaped && quote != ")")
            state.tokenize = null;
          return ret("string", "string");
        };
      }
      function tokenParenthesized(stream, state) {
        stream.next();
        if (!stream.match(/^\s*[\"\')]/, false))
          state.tokenize = tokenString(")");
        else
          state.tokenize = null;
        return ret(null, "(");
      }
      function Context(type2, indent, prev) {
        this.type = type2;
        this.indent = indent;
        this.prev = prev;
      }
      function pushContext(state, stream, type2, indent) {
        state.context = new Context(type2, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
        return type2;
      }
      function popContext(state) {
        if (state.context.prev)
          state.context = state.context.prev;
        return state.context.type;
      }
      function pass(type2, stream, state) {
        return states[state.context.type](type2, stream, state);
      }
      function popAndPass(type2, stream, state, n) {
        for (var i = n || 1; i > 0; i--)
          state.context = state.context.prev;
        return pass(type2, stream, state);
      }
      function wordAsValue(stream) {
        var word = stream.current().toLowerCase();
        if (valueKeywords2.hasOwnProperty(word))
          override = "atom";
        else if (colorKeywords2.hasOwnProperty(word))
          override = "keyword";
        else
          override = "variable";
      }
      var states = {};
      states.top = function(type2, stream, state) {
        if (type2 == "{") {
          return pushContext(state, stream, "block");
        } else if (type2 == "}" && state.context.prev) {
          return popContext(state);
        } else if (supportsAtComponent && /@component/i.test(type2)) {
          return pushContext(state, stream, "atComponentBlock");
        } else if (/^@(-moz-)?document$/i.test(type2)) {
          return pushContext(state, stream, "documentTypes");
        } else if (/^@(media|supports|(-moz-)?document|import)$/i.test(type2)) {
          return pushContext(state, stream, "atBlock");
        } else if (/^@(font-face|counter-style)/i.test(type2)) {
          state.stateArg = type2;
          return "restricted_atBlock_before";
        } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(type2)) {
          return "keyframes";
        } else if (type2 && type2.charAt(0) == "@") {
          return pushContext(state, stream, "at");
        } else if (type2 == "hash") {
          override = "builtin";
        } else if (type2 == "word") {
          override = "tag";
        } else if (type2 == "variable-definition") {
          return "maybeprop";
        } else if (type2 == "interpolation") {
          return pushContext(state, stream, "interpolation");
        } else if (type2 == ":") {
          return "pseudo";
        } else if (allowNested && type2 == "(") {
          return pushContext(state, stream, "parens");
        }
        return state.context.type;
      };
      states.block = function(type2, stream, state) {
        if (type2 == "word") {
          var word = stream.current().toLowerCase();
          if (propertyKeywords2.hasOwnProperty(word)) {
            override = "property";
            return "maybeprop";
          } else if (nonStandardPropertyKeywords2.hasOwnProperty(word)) {
            override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
            return "maybeprop";
          } else if (allowNested) {
            override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
            return "block";
          } else {
            override += " error";
            return "maybeprop";
          }
        } else if (type2 == "meta") {
          return "block";
        } else if (!allowNested && (type2 == "hash" || type2 == "qualifier")) {
          override = "error";
          return "block";
        } else {
          return states.top(type2, stream, state);
        }
      };
      states.maybeprop = function(type2, stream, state) {
        if (type2 == ":")
          return pushContext(state, stream, "prop");
        return pass(type2, stream, state);
      };
      states.prop = function(type2, stream, state) {
        if (type2 == ";")
          return popContext(state);
        if (type2 == "{" && allowNested)
          return pushContext(state, stream, "propBlock");
        if (type2 == "}" || type2 == "{")
          return popAndPass(type2, stream, state);
        if (type2 == "(")
          return pushContext(state, stream, "parens");
        if (type2 == "hash" && !/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(stream.current())) {
          override += " error";
        } else if (type2 == "word") {
          wordAsValue(stream);
        } else if (type2 == "interpolation") {
          return pushContext(state, stream, "interpolation");
        }
        return "prop";
      };
      states.propBlock = function(type2, _stream, state) {
        if (type2 == "}")
          return popContext(state);
        if (type2 == "word") {
          override = "property";
          return "maybeprop";
        }
        return state.context.type;
      };
      states.parens = function(type2, stream, state) {
        if (type2 == "{" || type2 == "}")
          return popAndPass(type2, stream, state);
        if (type2 == ")")
          return popContext(state);
        if (type2 == "(")
          return pushContext(state, stream, "parens");
        if (type2 == "interpolation")
          return pushContext(state, stream, "interpolation");
        if (type2 == "word")
          wordAsValue(stream);
        return "parens";
      };
      states.pseudo = function(type2, stream, state) {
        if (type2 == "meta")
          return "pseudo";
        if (type2 == "word") {
          override = "variable-3";
          return state.context.type;
        }
        return pass(type2, stream, state);
      };
      states.documentTypes = function(type2, stream, state) {
        if (type2 == "word" && documentTypes2.hasOwnProperty(stream.current())) {
          override = "tag";
          return state.context.type;
        } else {
          return states.atBlock(type2, stream, state);
        }
      };
      states.atBlock = function(type2, stream, state) {
        if (type2 == "(")
          return pushContext(state, stream, "atBlock_parens");
        if (type2 == "}" || type2 == ";")
          return popAndPass(type2, stream, state);
        if (type2 == "{")
          return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");
        if (type2 == "interpolation")
          return pushContext(state, stream, "interpolation");
        if (type2 == "word") {
          var word = stream.current().toLowerCase();
          if (word == "only" || word == "not" || word == "and" || word == "or")
            override = "keyword";
          else if (mediaTypes2.hasOwnProperty(word))
            override = "attribute";
          else if (mediaFeatures2.hasOwnProperty(word))
            override = "property";
          else if (mediaValueKeywords2.hasOwnProperty(word))
            override = "keyword";
          else if (propertyKeywords2.hasOwnProperty(word))
            override = "property";
          else if (nonStandardPropertyKeywords2.hasOwnProperty(word))
            override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
          else if (valueKeywords2.hasOwnProperty(word))
            override = "atom";
          else if (colorKeywords2.hasOwnProperty(word))
            override = "keyword";
          else
            override = "error";
        }
        return state.context.type;
      };
      states.atComponentBlock = function(type2, stream, state) {
        if (type2 == "}")
          return popAndPass(type2, stream, state);
        if (type2 == "{")
          return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
        if (type2 == "word")
          override = "error";
        return state.context.type;
      };
      states.atBlock_parens = function(type2, stream, state) {
        if (type2 == ")")
          return popContext(state);
        if (type2 == "{" || type2 == "}")
          return popAndPass(type2, stream, state, 2);
        return states.atBlock(type2, stream, state);
      };
      states.restricted_atBlock_before = function(type2, stream, state) {
        if (type2 == "{")
          return pushContext(state, stream, "restricted_atBlock");
        if (type2 == "word" && state.stateArg == "@counter-style") {
          override = "variable";
          return "restricted_atBlock_before";
        }
        return pass(type2, stream, state);
      };
      states.restricted_atBlock = function(type2, stream, state) {
        if (type2 == "}") {
          state.stateArg = null;
          return popContext(state);
        }
        if (type2 == "word") {
          if (state.stateArg == "@font-face" && !fontProperties2.hasOwnProperty(stream.current().toLowerCase()) || state.stateArg == "@counter-style" && !counterDescriptors2.hasOwnProperty(stream.current().toLowerCase()))
            override = "error";
          else
            override = "property";
          return "maybeprop";
        }
        return "restricted_atBlock";
      };
      states.keyframes = function(type2, stream, state) {
        if (type2 == "word") {
          override = "variable";
          return "keyframes";
        }
        if (type2 == "{")
          return pushContext(state, stream, "top");
        return pass(type2, stream, state);
      };
      states.at = function(type2, stream, state) {
        if (type2 == ";")
          return popContext(state);
        if (type2 == "{" || type2 == "}")
          return popAndPass(type2, stream, state);
        if (type2 == "word")
          override = "tag";
        else if (type2 == "hash")
          override = "builtin";
        return "at";
      };
      states.interpolation = function(type2, stream, state) {
        if (type2 == "}")
          return popContext(state);
        if (type2 == "{" || type2 == ";")
          return popAndPass(type2, stream, state);
        if (type2 == "word")
          override = "variable";
        else if (type2 != "variable" && type2 != "(" && type2 != ")")
          override = "error";
        return "interpolation";
      };
      return {
        startState: function(base) {
          return {
            tokenize: null,
            state: inline ? "block" : "top",
            stateArg: null,
            context: new Context(inline ? "block" : "top", base || 0, null)
          };
        },
        token: function(stream, state) {
          if (!state.tokenize && stream.eatSpace())
            return null;
          var style = (state.tokenize || tokenBase)(stream, state);
          if (style && typeof style == "object") {
            type = style[1];
            style = style[0];
          }
          override = style;
          if (type != "comment")
            state.state = states[state.state](type, stream, state);
          return override;
        },
        indent: function(state, textAfter) {
          var cx = state.context, ch = textAfter && textAfter.charAt(0);
          var indent = cx.indent;
          if (cx.type == "prop" && (ch == "}" || ch == ")"))
            cx = cx.prev;
          if (cx.prev) {
            if (ch == "}" && (cx.type == "block" || cx.type == "top" || cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
              cx = cx.prev;
              indent = cx.indent;
            } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") || ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
              indent = Math.max(0, cx.indent - indentUnit);
            }
          }
          return indent;
        },
        electricChars: "}",
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        blockCommentContinue: " * ",
        lineComment,
        fold: "brace"
      };
    });
    function keySet(array) {
      var keys = {};
      for (var i = 0; i < array.length; ++i) {
        keys[array[i].toLowerCase()] = true;
      }
      return keys;
    }
    var documentTypes_ = [
      "domain",
      "regexp",
      "url",
      "url-prefix"
    ], documentTypes = keySet(documentTypes_);
    var mediaTypes_ = [
      "all",
      "aural",
      "braille",
      "handheld",
      "print",
      "projection",
      "screen",
      "tty",
      "tv",
      "embossed"
    ], mediaTypes = keySet(mediaTypes_);
    var mediaFeatures_ = [
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "device-width",
      "min-device-width",
      "max-device-width",
      "device-height",
      "min-device-height",
      "max-device-height",
      "aspect-ratio",
      "min-aspect-ratio",
      "max-aspect-ratio",
      "device-aspect-ratio",
      "min-device-aspect-ratio",
      "max-device-aspect-ratio",
      "color",
      "min-color",
      "max-color",
      "color-index",
      "min-color-index",
      "max-color-index",
      "monochrome",
      "min-monochrome",
      "max-monochrome",
      "resolution",
      "min-resolution",
      "max-resolution",
      "scan",
      "grid",
      "orientation",
      "device-pixel-ratio",
      "min-device-pixel-ratio",
      "max-device-pixel-ratio",
      "pointer",
      "any-pointer",
      "hover",
      "any-hover",
      "prefers-color-scheme",
      "dynamic-range",
      "video-dynamic-range"
    ], mediaFeatures = keySet(mediaFeatures_);
    var mediaValueKeywords_ = [
      "landscape",
      "portrait",
      "none",
      "coarse",
      "fine",
      "on-demand",
      "hover",
      "interlace",
      "progressive",
      "dark",
      "light",
      "standard",
      "high"
    ], mediaValueKeywords = keySet(mediaValueKeywords_);
    var propertyKeywords_ = [
      "align-content",
      "align-items",
      "align-self",
      "alignment-adjust",
      "alignment-baseline",
      "all",
      "anchor-point",
      "animation",
      "animation-delay",
      "animation-direction",
      "animation-duration",
      "animation-fill-mode",
      "animation-iteration-count",
      "animation-name",
      "animation-play-state",
      "animation-timing-function",
      "appearance",
      "azimuth",
      "backdrop-filter",
      "backface-visibility",
      "background",
      "background-attachment",
      "background-blend-mode",
      "background-clip",
      "background-color",
      "background-image",
      "background-origin",
      "background-position",
      "background-position-x",
      "background-position-y",
      "background-repeat",
      "background-size",
      "baseline-shift",
      "binding",
      "bleed",
      "block-size",
      "bookmark-label",
      "bookmark-level",
      "bookmark-state",
      "bookmark-target",
      "border",
      "border-bottom",
      "border-bottom-color",
      "border-bottom-left-radius",
      "border-bottom-right-radius",
      "border-bottom-style",
      "border-bottom-width",
      "border-collapse",
      "border-color",
      "border-image",
      "border-image-outset",
      "border-image-repeat",
      "border-image-slice",
      "border-image-source",
      "border-image-width",
      "border-left",
      "border-left-color",
      "border-left-style",
      "border-left-width",
      "border-radius",
      "border-right",
      "border-right-color",
      "border-right-style",
      "border-right-width",
      "border-spacing",
      "border-style",
      "border-top",
      "border-top-color",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-top-style",
      "border-top-width",
      "border-width",
      "bottom",
      "box-decoration-break",
      "box-shadow",
      "box-sizing",
      "break-after",
      "break-before",
      "break-inside",
      "caption-side",
      "caret-color",
      "clear",
      "clip",
      "color",
      "color-profile",
      "column-count",
      "column-fill",
      "column-gap",
      "column-rule",
      "column-rule-color",
      "column-rule-style",
      "column-rule-width",
      "column-span",
      "column-width",
      "columns",
      "contain",
      "content",
      "counter-increment",
      "counter-reset",
      "crop",
      "cue",
      "cue-after",
      "cue-before",
      "cursor",
      "direction",
      "display",
      "dominant-baseline",
      "drop-initial-after-adjust",
      "drop-initial-after-align",
      "drop-initial-before-adjust",
      "drop-initial-before-align",
      "drop-initial-size",
      "drop-initial-value",
      "elevation",
      "empty-cells",
      "fit",
      "fit-content",
      "fit-position",
      "flex",
      "flex-basis",
      "flex-direction",
      "flex-flow",
      "flex-grow",
      "flex-shrink",
      "flex-wrap",
      "float",
      "float-offset",
      "flow-from",
      "flow-into",
      "font",
      "font-family",
      "font-feature-settings",
      "font-kerning",
      "font-language-override",
      "font-optical-sizing",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-synthesis",
      "font-variant",
      "font-variant-alternates",
      "font-variant-caps",
      "font-variant-east-asian",
      "font-variant-ligatures",
      "font-variant-numeric",
      "font-variant-position",
      "font-variation-settings",
      "font-weight",
      "gap",
      "grid",
      "grid-area",
      "grid-auto-columns",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-column",
      "grid-column-end",
      "grid-column-gap",
      "grid-column-start",
      "grid-gap",
      "grid-row",
      "grid-row-end",
      "grid-row-gap",
      "grid-row-start",
      "grid-template",
      "grid-template-areas",
      "grid-template-columns",
      "grid-template-rows",
      "hanging-punctuation",
      "height",
      "hyphens",
      "icon",
      "image-orientation",
      "image-rendering",
      "image-resolution",
      "inline-box-align",
      "inset",
      "inset-block",
      "inset-block-end",
      "inset-block-start",
      "inset-inline",
      "inset-inline-end",
      "inset-inline-start",
      "isolation",
      "justify-content",
      "justify-items",
      "justify-self",
      "left",
      "letter-spacing",
      "line-break",
      "line-height",
      "line-height-step",
      "line-stacking",
      "line-stacking-ruby",
      "line-stacking-shift",
      "line-stacking-strategy",
      "list-style",
      "list-style-image",
      "list-style-position",
      "list-style-type",
      "margin",
      "margin-bottom",
      "margin-left",
      "margin-right",
      "margin-top",
      "marks",
      "marquee-direction",
      "marquee-loop",
      "marquee-play-count",
      "marquee-speed",
      "marquee-style",
      "mask-clip",
      "mask-composite",
      "mask-image",
      "mask-mode",
      "mask-origin",
      "mask-position",
      "mask-repeat",
      "mask-size",
      "mask-type",
      "max-block-size",
      "max-height",
      "max-inline-size",
      "max-width",
      "min-block-size",
      "min-height",
      "min-inline-size",
      "min-width",
      "mix-blend-mode",
      "move-to",
      "nav-down",
      "nav-index",
      "nav-left",
      "nav-right",
      "nav-up",
      "object-fit",
      "object-position",
      "offset",
      "offset-anchor",
      "offset-distance",
      "offset-path",
      "offset-position",
      "offset-rotate",
      "opacity",
      "order",
      "orphans",
      "outline",
      "outline-color",
      "outline-offset",
      "outline-style",
      "outline-width",
      "overflow",
      "overflow-style",
      "overflow-wrap",
      "overflow-x",
      "overflow-y",
      "padding",
      "padding-bottom",
      "padding-left",
      "padding-right",
      "padding-top",
      "page",
      "page-break-after",
      "page-break-before",
      "page-break-inside",
      "page-policy",
      "pause",
      "pause-after",
      "pause-before",
      "perspective",
      "perspective-origin",
      "pitch",
      "pitch-range",
      "place-content",
      "place-items",
      "place-self",
      "play-during",
      "position",
      "presentation-level",
      "punctuation-trim",
      "quotes",
      "region-break-after",
      "region-break-before",
      "region-break-inside",
      "region-fragment",
      "rendering-intent",
      "resize",
      "rest",
      "rest-after",
      "rest-before",
      "richness",
      "right",
      "rotate",
      "rotation",
      "rotation-point",
      "row-gap",
      "ruby-align",
      "ruby-overhang",
      "ruby-position",
      "ruby-span",
      "scale",
      "scroll-behavior",
      "scroll-margin",
      "scroll-margin-block",
      "scroll-margin-block-end",
      "scroll-margin-block-start",
      "scroll-margin-bottom",
      "scroll-margin-inline",
      "scroll-margin-inline-end",
      "scroll-margin-inline-start",
      "scroll-margin-left",
      "scroll-margin-right",
      "scroll-margin-top",
      "scroll-padding",
      "scroll-padding-block",
      "scroll-padding-block-end",
      "scroll-padding-block-start",
      "scroll-padding-bottom",
      "scroll-padding-inline",
      "scroll-padding-inline-end",
      "scroll-padding-inline-start",
      "scroll-padding-left",
      "scroll-padding-right",
      "scroll-padding-top",
      "scroll-snap-align",
      "scroll-snap-type",
      "shape-image-threshold",
      "shape-inside",
      "shape-margin",
      "shape-outside",
      "size",
      "speak",
      "speak-as",
      "speak-header",
      "speak-numeral",
      "speak-punctuation",
      "speech-rate",
      "stress",
      "string-set",
      "tab-size",
      "table-layout",
      "target",
      "target-name",
      "target-new",
      "target-position",
      "text-align",
      "text-align-last",
      "text-combine-upright",
      "text-decoration",
      "text-decoration-color",
      "text-decoration-line",
      "text-decoration-skip",
      "text-decoration-skip-ink",
      "text-decoration-style",
      "text-emphasis",
      "text-emphasis-color",
      "text-emphasis-position",
      "text-emphasis-style",
      "text-height",
      "text-indent",
      "text-justify",
      "text-orientation",
      "text-outline",
      "text-overflow",
      "text-rendering",
      "text-shadow",
      "text-size-adjust",
      "text-space-collapse",
      "text-transform",
      "text-underline-position",
      "text-wrap",
      "top",
      "touch-action",
      "transform",
      "transform-origin",
      "transform-style",
      "transition",
      "transition-delay",
      "transition-duration",
      "transition-property",
      "transition-timing-function",
      "translate",
      "unicode-bidi",
      "user-select",
      "vertical-align",
      "visibility",
      "voice-balance",
      "voice-duration",
      "voice-family",
      "voice-pitch",
      "voice-range",
      "voice-rate",
      "voice-stress",
      "voice-volume",
      "volume",
      "white-space",
      "widows",
      "width",
      "will-change",
      "word-break",
      "word-spacing",
      "word-wrap",
      "writing-mode",
      "z-index",
      "clip-path",
      "clip-rule",
      "mask",
      "enable-background",
      "filter",
      "flood-color",
      "flood-opacity",
      "lighting-color",
      "stop-color",
      "stop-opacity",
      "pointer-events",
      "color-interpolation",
      "color-interpolation-filters",
      "color-rendering",
      "fill",
      "fill-opacity",
      "fill-rule",
      "image-rendering",
      "marker",
      "marker-end",
      "marker-mid",
      "marker-start",
      "paint-order",
      "shape-rendering",
      "stroke",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-rendering",
      "baseline-shift",
      "dominant-baseline",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "text-anchor",
      "writing-mode"
    ], propertyKeywords = keySet(propertyKeywords_);
    var nonStandardPropertyKeywords_ = [
      "accent-color",
      "aspect-ratio",
      "border-block",
      "border-block-color",
      "border-block-end",
      "border-block-end-color",
      "border-block-end-style",
      "border-block-end-width",
      "border-block-start",
      "border-block-start-color",
      "border-block-start-style",
      "border-block-start-width",
      "border-block-style",
      "border-block-width",
      "border-inline",
      "border-inline-color",
      "border-inline-end",
      "border-inline-end-color",
      "border-inline-end-style",
      "border-inline-end-width",
      "border-inline-start",
      "border-inline-start-color",
      "border-inline-start-style",
      "border-inline-start-width",
      "border-inline-style",
      "border-inline-width",
      "content-visibility",
      "margin-block",
      "margin-block-end",
      "margin-block-start",
      "margin-inline",
      "margin-inline-end",
      "margin-inline-start",
      "overflow-anchor",
      "overscroll-behavior",
      "padding-block",
      "padding-block-end",
      "padding-block-start",
      "padding-inline",
      "padding-inline-end",
      "padding-inline-start",
      "scroll-snap-stop",
      "scrollbar-3d-light-color",
      "scrollbar-arrow-color",
      "scrollbar-base-color",
      "scrollbar-dark-shadow-color",
      "scrollbar-face-color",
      "scrollbar-highlight-color",
      "scrollbar-shadow-color",
      "scrollbar-track-color",
      "searchfield-cancel-button",
      "searchfield-decoration",
      "searchfield-results-button",
      "searchfield-results-decoration",
      "shape-inside",
      "zoom"
    ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);
    var fontProperties_ = [
      "font-display",
      "font-family",
      "src",
      "unicode-range",
      "font-variant",
      "font-feature-settings",
      "font-stretch",
      "font-weight",
      "font-style"
    ], fontProperties = keySet(fontProperties_);
    var counterDescriptors_ = [
      "additive-symbols",
      "fallback",
      "negative",
      "pad",
      "prefix",
      "range",
      "speak-as",
      "suffix",
      "symbols",
      "system"
    ], counterDescriptors = keySet(counterDescriptors_);
    var colorKeywords_ = [
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkgrey",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkslategrey",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "grey",
      "green",
      "greenyellow",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightgrey",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightslategrey",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "magenta",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "rebeccapurple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "slategrey",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen"
    ], colorKeywords = keySet(colorKeywords_);
    var valueKeywords_ = [
      "above",
      "absolute",
      "activeborder",
      "additive",
      "activecaption",
      "afar",
      "after-white-space",
      "ahead",
      "alias",
      "all",
      "all-scroll",
      "alphabetic",
      "alternate",
      "always",
      "amharic",
      "amharic-abegede",
      "antialiased",
      "appworkspace",
      "arabic-indic",
      "armenian",
      "asterisks",
      "attr",
      "auto",
      "auto-flow",
      "avoid",
      "avoid-column",
      "avoid-page",
      "avoid-region",
      "axis-pan",
      "background",
      "backwards",
      "baseline",
      "below",
      "bidi-override",
      "binary",
      "bengali",
      "blink",
      "block",
      "block-axis",
      "blur",
      "bold",
      "bolder",
      "border",
      "border-box",
      "both",
      "bottom",
      "break",
      "break-all",
      "break-word",
      "brightness",
      "bullets",
      "button",
      "buttonface",
      "buttonhighlight",
      "buttonshadow",
      "buttontext",
      "calc",
      "cambodian",
      "capitalize",
      "caps-lock-indicator",
      "caption",
      "captiontext",
      "caret",
      "cell",
      "center",
      "checkbox",
      "circle",
      "cjk-decimal",
      "cjk-earthly-branch",
      "cjk-heavenly-stem",
      "cjk-ideographic",
      "clear",
      "clip",
      "close-quote",
      "col-resize",
      "collapse",
      "color",
      "color-burn",
      "color-dodge",
      "column",
      "column-reverse",
      "compact",
      "condensed",
      "conic-gradient",
      "contain",
      "content",
      "contents",
      "content-box",
      "context-menu",
      "continuous",
      "contrast",
      "copy",
      "counter",
      "counters",
      "cover",
      "crop",
      "cross",
      "crosshair",
      "cubic-bezier",
      "currentcolor",
      "cursive",
      "cyclic",
      "darken",
      "dashed",
      "decimal",
      "decimal-leading-zero",
      "default",
      "default-button",
      "dense",
      "destination-atop",
      "destination-in",
      "destination-out",
      "destination-over",
      "devanagari",
      "difference",
      "disc",
      "discard",
      "disclosure-closed",
      "disclosure-open",
      "document",
      "dot-dash",
      "dot-dot-dash",
      "dotted",
      "double",
      "down",
      "drop-shadow",
      "e-resize",
      "ease",
      "ease-in",
      "ease-in-out",
      "ease-out",
      "element",
      "ellipse",
      "ellipsis",
      "embed",
      "end",
      "ethiopic",
      "ethiopic-abegede",
      "ethiopic-abegede-am-et",
      "ethiopic-abegede-gez",
      "ethiopic-abegede-ti-er",
      "ethiopic-abegede-ti-et",
      "ethiopic-halehame-aa-er",
      "ethiopic-halehame-aa-et",
      "ethiopic-halehame-am-et",
      "ethiopic-halehame-gez",
      "ethiopic-halehame-om-et",
      "ethiopic-halehame-sid-et",
      "ethiopic-halehame-so-et",
      "ethiopic-halehame-ti-er",
      "ethiopic-halehame-ti-et",
      "ethiopic-halehame-tig",
      "ethiopic-numeric",
      "ew-resize",
      "exclusion",
      "expanded",
      "extends",
      "extra-condensed",
      "extra-expanded",
      "fantasy",
      "fast",
      "fill",
      "fill-box",
      "fixed",
      "flat",
      "flex",
      "flex-end",
      "flex-start",
      "footnotes",
      "forwards",
      "from",
      "geometricPrecision",
      "georgian",
      "grayscale",
      "graytext",
      "grid",
      "groove",
      "gujarati",
      "gurmukhi",
      "hand",
      "hangul",
      "hangul-consonant",
      "hard-light",
      "hebrew",
      "help",
      "hidden",
      "hide",
      "higher",
      "highlight",
      "highlighttext",
      "hiragana",
      "hiragana-iroha",
      "horizontal",
      "hsl",
      "hsla",
      "hue",
      "hue-rotate",
      "icon",
      "ignore",
      "inactiveborder",
      "inactivecaption",
      "inactivecaptiontext",
      "infinite",
      "infobackground",
      "infotext",
      "inherit",
      "initial",
      "inline",
      "inline-axis",
      "inline-block",
      "inline-flex",
      "inline-grid",
      "inline-table",
      "inset",
      "inside",
      "intrinsic",
      "invert",
      "italic",
      "japanese-formal",
      "japanese-informal",
      "justify",
      "kannada",
      "katakana",
      "katakana-iroha",
      "keep-all",
      "khmer",
      "korean-hangul-formal",
      "korean-hanja-formal",
      "korean-hanja-informal",
      "landscape",
      "lao",
      "large",
      "larger",
      "left",
      "level",
      "lighter",
      "lighten",
      "line-through",
      "linear",
      "linear-gradient",
      "lines",
      "list-item",
      "listbox",
      "listitem",
      "local",
      "logical",
      "loud",
      "lower",
      "lower-alpha",
      "lower-armenian",
      "lower-greek",
      "lower-hexadecimal",
      "lower-latin",
      "lower-norwegian",
      "lower-roman",
      "lowercase",
      "ltr",
      "luminosity",
      "malayalam",
      "manipulation",
      "match",
      "matrix",
      "matrix3d",
      "media-play-button",
      "media-slider",
      "media-sliderthumb",
      "media-volume-slider",
      "media-volume-sliderthumb",
      "medium",
      "menu",
      "menulist",
      "menulist-button",
      "menutext",
      "message-box",
      "middle",
      "min-intrinsic",
      "mix",
      "mongolian",
      "monospace",
      "move",
      "multiple",
      "multiple_mask_images",
      "multiply",
      "myanmar",
      "n-resize",
      "narrower",
      "ne-resize",
      "nesw-resize",
      "no-close-quote",
      "no-drop",
      "no-open-quote",
      "no-repeat",
      "none",
      "normal",
      "not-allowed",
      "nowrap",
      "ns-resize",
      "numbers",
      "numeric",
      "nw-resize",
      "nwse-resize",
      "oblique",
      "octal",
      "opacity",
      "open-quote",
      "optimizeLegibility",
      "optimizeSpeed",
      "oriya",
      "oromo",
      "outset",
      "outside",
      "outside-shape",
      "overlay",
      "overline",
      "padding",
      "padding-box",
      "painted",
      "page",
      "paused",
      "persian",
      "perspective",
      "pinch-zoom",
      "plus-darker",
      "plus-lighter",
      "pointer",
      "polygon",
      "portrait",
      "pre",
      "pre-line",
      "pre-wrap",
      "preserve-3d",
      "progress",
      "push-button",
      "radial-gradient",
      "radio",
      "read-only",
      "read-write",
      "read-write-plaintext-only",
      "rectangle",
      "region",
      "relative",
      "repeat",
      "repeating-linear-gradient",
      "repeating-radial-gradient",
      "repeating-conic-gradient",
      "repeat-x",
      "repeat-y",
      "reset",
      "reverse",
      "rgb",
      "rgba",
      "ridge",
      "right",
      "rotate",
      "rotate3d",
      "rotateX",
      "rotateY",
      "rotateZ",
      "round",
      "row",
      "row-resize",
      "row-reverse",
      "rtl",
      "run-in",
      "running",
      "s-resize",
      "sans-serif",
      "saturate",
      "saturation",
      "scale",
      "scale3d",
      "scaleX",
      "scaleY",
      "scaleZ",
      "screen",
      "scroll",
      "scrollbar",
      "scroll-position",
      "se-resize",
      "searchfield",
      "searchfield-cancel-button",
      "searchfield-decoration",
      "searchfield-results-button",
      "searchfield-results-decoration",
      "self-start",
      "self-end",
      "semi-condensed",
      "semi-expanded",
      "separate",
      "sepia",
      "serif",
      "show",
      "sidama",
      "simp-chinese-formal",
      "simp-chinese-informal",
      "single",
      "skew",
      "skewX",
      "skewY",
      "skip-white-space",
      "slide",
      "slider-horizontal",
      "slider-vertical",
      "sliderthumb-horizontal",
      "sliderthumb-vertical",
      "slow",
      "small",
      "small-caps",
      "small-caption",
      "smaller",
      "soft-light",
      "solid",
      "somali",
      "source-atop",
      "source-in",
      "source-out",
      "source-over",
      "space",
      "space-around",
      "space-between",
      "space-evenly",
      "spell-out",
      "square",
      "square-button",
      "start",
      "static",
      "status-bar",
      "stretch",
      "stroke",
      "stroke-box",
      "sub",
      "subpixel-antialiased",
      "svg_masks",
      "super",
      "sw-resize",
      "symbolic",
      "symbols",
      "system-ui",
      "table",
      "table-caption",
      "table-cell",
      "table-column",
      "table-column-group",
      "table-footer-group",
      "table-header-group",
      "table-row",
      "table-row-group",
      "tamil",
      "telugu",
      "text",
      "text-bottom",
      "text-top",
      "textarea",
      "textfield",
      "thai",
      "thick",
      "thin",
      "threeddarkshadow",
      "threedface",
      "threedhighlight",
      "threedlightshadow",
      "threedshadow",
      "tibetan",
      "tigre",
      "tigrinya-er",
      "tigrinya-er-abegede",
      "tigrinya-et",
      "tigrinya-et-abegede",
      "to",
      "top",
      "trad-chinese-formal",
      "trad-chinese-informal",
      "transform",
      "translate",
      "translate3d",
      "translateX",
      "translateY",
      "translateZ",
      "transparent",
      "ultra-condensed",
      "ultra-expanded",
      "underline",
      "unidirectional-pan",
      "unset",
      "up",
      "upper-alpha",
      "upper-armenian",
      "upper-greek",
      "upper-hexadecimal",
      "upper-latin",
      "upper-norwegian",
      "upper-roman",
      "uppercase",
      "urdu",
      "url",
      "var",
      "vertical",
      "vertical-text",
      "view-box",
      "visible",
      "visibleFill",
      "visiblePainted",
      "visibleStroke",
      "visual",
      "w-resize",
      "wait",
      "wave",
      "wider",
      "window",
      "windowframe",
      "windowtext",
      "words",
      "wrap",
      "wrap-reverse",
      "x-large",
      "x-small",
      "xor",
      "xx-large",
      "xx-small"
    ], valueKeywords = keySet(valueKeywords_);
    var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_).concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_).concat(valueKeywords_);
    CodeMirror.registerHelper("hintWords", "css", allWords);
    function tokenCComment(stream, state) {
      var maybeEnd = false, ch;
      while ((ch = stream.next()) != null) {
        if (maybeEnd && ch == "/") {
          state.tokenize = null;
          break;
        }
        maybeEnd = ch == "*";
      }
      return ["comment", "comment"];
    }
    CodeMirror.defineMIME("text/css", {
      documentTypes,
      mediaTypes,
      mediaFeatures,
      mediaValueKeywords,
      propertyKeywords,
      nonStandardPropertyKeywords,
      fontProperties,
      counterDescriptors,
      colorKeywords,
      valueKeywords,
      tokenHooks: {
        "/": function(stream, state) {
          if (!stream.eat("*"))
            return false;
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        }
      },
      name: "css"
    });
    CodeMirror.defineMIME("text/x-scss", {
      mediaTypes,
      mediaFeatures,
      mediaValueKeywords,
      propertyKeywords,
      nonStandardPropertyKeywords,
      colorKeywords,
      valueKeywords,
      fontProperties,
      allowNested: true,
      lineComment: "//",
      tokenHooks: {
        "/": function(stream, state) {
          if (stream.eat("/")) {
            stream.skipToEnd();
            return ["comment", "comment"];
          } else if (stream.eat("*")) {
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          } else {
            return ["operator", "operator"];
          }
        },
        ":": function(stream) {
          if (stream.match(/^\s*\{/, false))
            return [null, null];
          return false;
        },
        $: function(stream) {
          stream.match(/^[\w-]+/);
          if (stream.match(/^\s*:/, false))
            return ["variable-2", "variable-definition"];
          return ["variable-2", "variable"];
        },
        "#": function(stream) {
          if (!stream.eat("{"))
            return false;
          return [null, "interpolation"];
        }
      },
      name: "css",
      helperType: "scss"
    });
    CodeMirror.defineMIME("text/x-less", {
      mediaTypes,
      mediaFeatures,
      mediaValueKeywords,
      propertyKeywords,
      nonStandardPropertyKeywords,
      colorKeywords,
      valueKeywords,
      fontProperties,
      allowNested: true,
      lineComment: "//",
      tokenHooks: {
        "/": function(stream, state) {
          if (stream.eat("/")) {
            stream.skipToEnd();
            return ["comment", "comment"];
          } else if (stream.eat("*")) {
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          } else {
            return ["operator", "operator"];
          }
        },
        "@": function(stream) {
          if (stream.eat("{"))
            return [null, "interpolation"];
          if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false))
            return false;
          stream.eatWhile(/[\w\\\-]/);
          if (stream.match(/^\s*:/, false))
            return ["variable-2", "variable-definition"];
          return ["variable-2", "variable"];
        },
        "&": function() {
          return ["atom", "atom"];
        }
      },
      name: "css",
      helperType: "less"
    });
    CodeMirror.defineMIME("text/x-gss", {
      documentTypes,
      mediaTypes,
      mediaFeatures,
      propertyKeywords,
      nonStandardPropertyKeywords,
      fontProperties,
      counterDescriptors,
      colorKeywords,
      valueKeywords,
      supportsAtComponent: true,
      tokenHooks: {
        "/": function(stream, state) {
          if (!stream.eat("*"))
            return false;
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        }
      },
      name: "css",
      helperType: "gss"
    });
  });
});
var css_default = css;

// dist/_snowpack/pkg/codemirror/mode/javascript/javascript.js
var javascript = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    CodeMirror.defineMode("javascript", function(config, parserConfig) {
      var indentUnit = config.indentUnit;
      var statementIndent = parserConfig.statementIndent;
      var jsonldMode = parserConfig.jsonld;
      var jsonMode = parserConfig.json || jsonldMode;
      var trackScope = parserConfig.trackScope !== false;
      var isTS = parserConfig.typescript;
      var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
      var keywords = function() {
        function kw(type2) {
          return {type: type2, style: "keyword"};
        }
        var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
        var operator = kw("operator"), atom = {type: "atom", style: "atom"};
        return {
          if: kw("if"),
          while: A,
          with: A,
          else: B,
          do: B,
          try: B,
          finally: B,
          return: D,
          break: D,
          continue: D,
          new: kw("new"),
          delete: C,
          void: C,
          throw: C,
          debugger: kw("debugger"),
          var: kw("var"),
          const: kw("var"),
          let: kw("var"),
          function: kw("function"),
          catch: kw("catch"),
          for: kw("for"),
          switch: kw("switch"),
          case: kw("case"),
          default: kw("default"),
          in: operator,
          typeof: operator,
          instanceof: operator,
          true: atom,
          false: atom,
          null: atom,
          undefined: atom,
          NaN: atom,
          Infinity: atom,
          this: kw("this"),
          class: kw("class"),
          super: kw("atom"),
          yield: C,
          export: kw("export"),
          import: kw("import"),
          extends: C,
          await: C
        };
      }();
      var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
      var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
      function readRegexp(stream) {
        var escaped = false, next, inSet = false;
        while ((next = stream.next()) != null) {
          if (!escaped) {
            if (next == "/" && !inSet)
              return;
            if (next == "[")
              inSet = true;
            else if (inSet && next == "]")
              inSet = false;
          }
          escaped = !escaped && next == "\\";
        }
      }
      var type, content;
      function ret(tp, style, cont2) {
        type = tp;
        content = cont2;
        return style;
      }
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (ch == '"' || ch == "'") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
          return ret("number", "number");
        } else if (ch == "." && stream.match("..")) {
          return ret("spread", "meta");
        } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
          return ret(ch);
        } else if (ch == "=" && stream.eat(">")) {
          return ret("=>", "operator");
        } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
          return ret("number", "number");
        } else if (/\d/.test(ch)) {
          stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
          return ret("number", "number");
        } else if (ch == "/") {
          if (stream.eat("*")) {
            state.tokenize = tokenComment;
            return tokenComment(stream, state);
          } else if (stream.eat("/")) {
            stream.skipToEnd();
            return ret("comment", "comment");
          } else if (expressionAllowed(stream, state, 1)) {
            readRegexp(stream);
            stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
            return ret("regexp", "string-2");
          } else {
            stream.eat("=");
            return ret("operator", "operator", stream.current());
          }
        } else if (ch == "`") {
          state.tokenize = tokenQuasi;
          return tokenQuasi(stream, state);
        } else if (ch == "#" && stream.peek() == "!") {
          stream.skipToEnd();
          return ret("meta", "meta");
        } else if (ch == "#" && stream.eatWhile(wordRE)) {
          return ret("variable", "property");
        } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start))) {
          stream.skipToEnd();
          return ret("comment", "comment");
        } else if (isOperatorChar.test(ch)) {
          if (ch != ">" || !state.lexical || state.lexical.type != ">") {
            if (stream.eat("=")) {
              if (ch == "!" || ch == "=")
                stream.eat("=");
            } else if (/[<>*+\-|&?]/.test(ch)) {
              stream.eat(ch);
              if (ch == ">")
                stream.eat(ch);
            }
          }
          if (ch == "?" && stream.eat("."))
            return ret(".");
          return ret("operator", "operator", stream.current());
        } else if (wordRE.test(ch)) {
          stream.eatWhile(wordRE);
          var word = stream.current();
          if (state.lastType != ".") {
            if (keywords.propertyIsEnumerable(word)) {
              var kw = keywords[word];
              return ret(kw.type, kw.style, word);
            }
            if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
              return ret("async", "keyword", word);
          }
          return ret("variable", "variable", word);
        }
      }
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, next;
          if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
            state.tokenize = tokenBase;
            return ret("jsonld-keyword", "meta");
          }
          while ((next = stream.next()) != null) {
            if (next == quote && !escaped)
              break;
            escaped = !escaped && next == "\\";
          }
          if (!escaped)
            state.tokenize = tokenBase;
          return ret("string", "string");
        };
      }
      function tokenComment(stream, state) {
        var maybeEnd = false, ch;
        while (ch = stream.next()) {
          if (ch == "/" && maybeEnd) {
            state.tokenize = tokenBase;
            break;
          }
          maybeEnd = ch == "*";
        }
        return ret("comment", "comment");
      }
      function tokenQuasi(stream, state) {
        var escaped = false, next;
        while ((next = stream.next()) != null) {
          if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
            state.tokenize = tokenBase;
            break;
          }
          escaped = !escaped && next == "\\";
        }
        return ret("quasi", "string-2", stream.current());
      }
      var brackets = "([{}])";
      function findFatArrow(stream, state) {
        if (state.fatArrowAt)
          state.fatArrowAt = null;
        var arrow = stream.string.indexOf("=>", stream.start);
        if (arrow < 0)
          return;
        if (isTS) {
          var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
          if (m)
            arrow = m.index;
        }
        var depth = 0, sawSomething = false;
        for (var pos = arrow - 1; pos >= 0; --pos) {
          var ch = stream.string.charAt(pos);
          var bracket = brackets.indexOf(ch);
          if (bracket >= 0 && bracket < 3) {
            if (!depth) {
              ++pos;
              break;
            }
            if (--depth == 0) {
              if (ch == "(")
                sawSomething = true;
              break;
            }
          } else if (bracket >= 3 && bracket < 6) {
            ++depth;
          } else if (wordRE.test(ch)) {
            sawSomething = true;
          } else if (/["'\/`]/.test(ch)) {
            for (; ; --pos) {
              if (pos == 0)
                return;
              var next = stream.string.charAt(pos - 1);
              if (next == ch && stream.string.charAt(pos - 2) != "\\") {
                pos--;
                break;
              }
            }
          } else if (sawSomething && !depth) {
            ++pos;
            break;
          }
        }
        if (sawSomething && !depth)
          state.fatArrowAt = pos;
      }
      var atomicTypes = {
        atom: true,
        number: true,
        variable: true,
        string: true,
        regexp: true,
        this: true,
        import: true,
        "jsonld-keyword": true
      };
      function JSLexical(indented, column, type2, align, prev, info) {
        this.indented = indented;
        this.column = column;
        this.type = type2;
        this.prev = prev;
        this.info = info;
        if (align != null)
          this.align = align;
      }
      function inScope(state, varname) {
        if (!trackScope)
          return false;
        for (var v = state.localVars; v; v = v.next)
          if (v.name == varname)
            return true;
        for (var cx2 = state.context; cx2; cx2 = cx2.prev) {
          for (var v = cx2.vars; v; v = v.next)
            if (v.name == varname)
              return true;
        }
      }
      function parseJS(state, style, type2, content2, stream) {
        var cc = state.cc;
        cx.state = state;
        cx.stream = stream;
        cx.marked = null, cx.cc = cc;
        cx.style = style;
        if (!state.lexical.hasOwnProperty("align"))
          state.lexical.align = true;
        while (true) {
          var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
          if (combinator(type2, content2)) {
            while (cc.length && cc[cc.length - 1].lex)
              cc.pop()();
            if (cx.marked)
              return cx.marked;
            if (type2 == "variable" && inScope(state, content2))
              return "variable-2";
            return style;
          }
        }
      }
      var cx = {state: null, column: null, marked: null, cc: null};
      function pass() {
        for (var i = arguments.length - 1; i >= 0; i--)
          cx.cc.push(arguments[i]);
      }
      function cont() {
        pass.apply(null, arguments);
        return true;
      }
      function inList(name, list) {
        for (var v = list; v; v = v.next)
          if (v.name == name)
            return true;
        return false;
      }
      function register(varname) {
        var state = cx.state;
        cx.marked = "def";
        if (!trackScope)
          return;
        if (state.context) {
          if (state.lexical.info == "var" && state.context && state.context.block) {
            var newContext = registerVarScoped(varname, state.context);
            if (newContext != null) {
              state.context = newContext;
              return;
            }
          } else if (!inList(varname, state.localVars)) {
            state.localVars = new Var(varname, state.localVars);
            return;
          }
        }
        if (parserConfig.globalVars && !inList(varname, state.globalVars))
          state.globalVars = new Var(varname, state.globalVars);
      }
      function registerVarScoped(varname, context) {
        if (!context) {
          return null;
        } else if (context.block) {
          var inner = registerVarScoped(varname, context.prev);
          if (!inner)
            return null;
          if (inner == context.prev)
            return context;
          return new Context(inner, context.vars, true);
        } else if (inList(varname, context.vars)) {
          return context;
        } else {
          return new Context(context.prev, new Var(varname, context.vars), false);
        }
      }
      function isModifier(name) {
        return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly";
      }
      function Context(prev, vars, block2) {
        this.prev = prev;
        this.vars = vars;
        this.block = block2;
      }
      function Var(name, next) {
        this.name = name;
        this.next = next;
      }
      var defaultVars = new Var("this", new Var("arguments", null));
      function pushcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
        cx.state.localVars = defaultVars;
      }
      function pushblockcontext() {
        cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
        cx.state.localVars = null;
      }
      pushcontext.lex = pushblockcontext.lex = true;
      function popcontext() {
        cx.state.localVars = cx.state.context.vars;
        cx.state.context = cx.state.context.prev;
      }
      popcontext.lex = true;
      function pushlex(type2, info) {
        var result = function() {
          var state = cx.state, indent = state.indented;
          if (state.lexical.type == "stat")
            indent = state.lexical.indented;
          else
            for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
              indent = outer.indented;
          state.lexical = new JSLexical(indent, cx.stream.column(), type2, null, state.lexical, info);
        };
        result.lex = true;
        return result;
      }
      function poplex() {
        var state = cx.state;
        if (state.lexical.prev) {
          if (state.lexical.type == ")")
            state.indented = state.lexical.indented;
          state.lexical = state.lexical.prev;
        }
      }
      poplex.lex = true;
      function expect(wanted) {
        function exp(type2) {
          if (type2 == wanted)
            return cont();
          else if (wanted == ";" || type2 == "}" || type2 == ")" || type2 == "]")
            return pass();
          else
            return cont(exp);
        }
        return exp;
      }
      function statement(type2, value) {
        if (type2 == "var")
          return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
        if (type2 == "keyword a")
          return cont(pushlex("form"), parenExpr, statement, poplex);
        if (type2 == "keyword b")
          return cont(pushlex("form"), statement, poplex);
        if (type2 == "keyword d")
          return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
        if (type2 == "debugger")
          return cont(expect(";"));
        if (type2 == "{")
          return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
        if (type2 == ";")
          return cont();
        if (type2 == "if") {
          if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
            cx.state.cc.pop()();
          return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
        }
        if (type2 == "function")
          return cont(functiondef);
        if (type2 == "for")
          return cont(pushlex("form"), pushblockcontext, forspec, statement, popcontext, poplex);
        if (type2 == "class" || isTS && value == "interface") {
          cx.marked = "keyword";
          return cont(pushlex("form", type2 == "class" ? type2 : value), className, poplex);
        }
        if (type2 == "variable") {
          if (isTS && value == "declare") {
            cx.marked = "keyword";
            return cont(statement);
          } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
            cx.marked = "keyword";
            if (value == "enum")
              return cont(enumdef);
            else if (value == "type")
              return cont(typename, expect("operator"), typeexpr, expect(";"));
            else
              return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex);
          } else if (isTS && value == "namespace") {
            cx.marked = "keyword";
            return cont(pushlex("form"), expression, statement, poplex);
          } else if (isTS && value == "abstract") {
            cx.marked = "keyword";
            return cont(statement);
          } else {
            return cont(pushlex("stat"), maybelabel);
          }
        }
        if (type2 == "switch")
          return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), pushblockcontext, block, poplex, poplex, popcontext);
        if (type2 == "case")
          return cont(expression, expect(":"));
        if (type2 == "default")
          return cont(expect(":"));
        if (type2 == "catch")
          return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
        if (type2 == "export")
          return cont(pushlex("stat"), afterExport, poplex);
        if (type2 == "import")
          return cont(pushlex("stat"), afterImport, poplex);
        if (type2 == "async")
          return cont(statement);
        if (value == "@")
          return cont(expression, statement);
        return pass(pushlex("stat"), expression, expect(";"), poplex);
      }
      function maybeCatchBinding(type2) {
        if (type2 == "(")
          return cont(funarg, expect(")"));
      }
      function expression(type2, value) {
        return expressionInner(type2, value, false);
      }
      function expressionNoComma(type2, value) {
        return expressionInner(type2, value, true);
      }
      function parenExpr(type2) {
        if (type2 != "(")
          return pass();
        return cont(pushlex(")"), maybeexpression, expect(")"), poplex);
      }
      function expressionInner(type2, value, noComma) {
        if (cx.state.fatArrowAt == cx.stream.start) {
          var body = noComma ? arrowBodyNoComma : arrowBody;
          if (type2 == "(")
            return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
          else if (type2 == "variable")
            return pass(pushcontext, pattern, expect("=>"), body, popcontext);
        }
        var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
        if (atomicTypes.hasOwnProperty(type2))
          return cont(maybeop);
        if (type2 == "function")
          return cont(functiondef, maybeop);
        if (type2 == "class" || isTS && value == "interface") {
          cx.marked = "keyword";
          return cont(pushlex("form"), classExpression, poplex);
        }
        if (type2 == "keyword c" || type2 == "async")
          return cont(noComma ? expressionNoComma : expression);
        if (type2 == "(")
          return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
        if (type2 == "operator" || type2 == "spread")
          return cont(noComma ? expressionNoComma : expression);
        if (type2 == "[")
          return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
        if (type2 == "{")
          return contCommasep(objprop, "}", null, maybeop);
        if (type2 == "quasi")
          return pass(quasi, maybeop);
        if (type2 == "new")
          return cont(maybeTarget(noComma));
        return cont();
      }
      function maybeexpression(type2) {
        if (type2.match(/[;\}\)\],]/))
          return pass();
        return pass(expression);
      }
      function maybeoperatorComma(type2, value) {
        if (type2 == ",")
          return cont(maybeexpression);
        return maybeoperatorNoComma(type2, value, false);
      }
      function maybeoperatorNoComma(type2, value, noComma) {
        var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
        var expr = noComma == false ? expression : expressionNoComma;
        if (type2 == "=>")
          return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
        if (type2 == "operator") {
          if (/\+\+|--/.test(value) || isTS && value == "!")
            return cont(me);
          if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
            return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
          if (value == "?")
            return cont(expression, expect(":"), expr);
          return cont(expr);
        }
        if (type2 == "quasi") {
          return pass(quasi, me);
        }
        if (type2 == ";")
          return;
        if (type2 == "(")
          return contCommasep(expressionNoComma, ")", "call", me);
        if (type2 == ".")
          return cont(property, me);
        if (type2 == "[")
          return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
        if (isTS && value == "as") {
          cx.marked = "keyword";
          return cont(typeexpr, me);
        }
        if (type2 == "regexp") {
          cx.state.lastType = cx.marked = "operator";
          cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
          return cont(expr);
        }
      }
      function quasi(type2, value) {
        if (type2 != "quasi")
          return pass();
        if (value.slice(value.length - 2) != "${")
          return cont(quasi);
        return cont(maybeexpression, continueQuasi);
      }
      function continueQuasi(type2) {
        if (type2 == "}") {
          cx.marked = "string-2";
          cx.state.tokenize = tokenQuasi;
          return cont(quasi);
        }
      }
      function arrowBody(type2) {
        findFatArrow(cx.stream, cx.state);
        return pass(type2 == "{" ? statement : expression);
      }
      function arrowBodyNoComma(type2) {
        findFatArrow(cx.stream, cx.state);
        return pass(type2 == "{" ? statement : expressionNoComma);
      }
      function maybeTarget(noComma) {
        return function(type2) {
          if (type2 == ".")
            return cont(noComma ? targetNoComma : target);
          else if (type2 == "variable" && isTS)
            return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma);
          else
            return pass(noComma ? expressionNoComma : expression);
        };
      }
      function target(_, value) {
        if (value == "target") {
          cx.marked = "keyword";
          return cont(maybeoperatorComma);
        }
      }
      function targetNoComma(_, value) {
        if (value == "target") {
          cx.marked = "keyword";
          return cont(maybeoperatorNoComma);
        }
      }
      function maybelabel(type2) {
        if (type2 == ":")
          return cont(poplex, statement);
        return pass(maybeoperatorComma, expect(";"), poplex);
      }
      function property(type2) {
        if (type2 == "variable") {
          cx.marked = "property";
          return cont();
        }
      }
      function objprop(type2, value) {
        if (type2 == "async") {
          cx.marked = "property";
          return cont(objprop);
        } else if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          if (value == "get" || value == "set")
            return cont(getterSetter);
          var m;
          if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
            cx.state.fatArrowAt = cx.stream.pos + m[0].length;
          return cont(afterprop);
        } else if (type2 == "number" || type2 == "string") {
          cx.marked = jsonldMode ? "property" : cx.style + " property";
          return cont(afterprop);
        } else if (type2 == "jsonld-keyword") {
          return cont(afterprop);
        } else if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(objprop);
        } else if (type2 == "[") {
          return cont(expression, maybetype, expect("]"), afterprop);
        } else if (type2 == "spread") {
          return cont(expressionNoComma, afterprop);
        } else if (value == "*") {
          cx.marked = "keyword";
          return cont(objprop);
        } else if (type2 == ":") {
          return pass(afterprop);
        }
      }
      function getterSetter(type2) {
        if (type2 != "variable")
          return pass(afterprop);
        cx.marked = "property";
        return cont(functiondef);
      }
      function afterprop(type2) {
        if (type2 == ":")
          return cont(expressionNoComma);
        if (type2 == "(")
          return pass(functiondef);
      }
      function commasep(what, end, sep) {
        function proceed(type2, value) {
          if (sep ? sep.indexOf(type2) > -1 : type2 == ",") {
            var lex = cx.state.lexical;
            if (lex.info == "call")
              lex.pos = (lex.pos || 0) + 1;
            return cont(function(type3, value2) {
              if (type3 == end || value2 == end)
                return pass();
              return pass(what);
            }, proceed);
          }
          if (type2 == end || value == end)
            return cont();
          if (sep && sep.indexOf(";") > -1)
            return pass(what);
          return cont(expect(end));
        }
        return function(type2, value) {
          if (type2 == end || value == end)
            return cont();
          return pass(what, proceed);
        };
      }
      function contCommasep(what, end, info) {
        for (var i = 3; i < arguments.length; i++)
          cx.cc.push(arguments[i]);
        return cont(pushlex(end, info), commasep(what, end), poplex);
      }
      function block(type2) {
        if (type2 == "}")
          return cont();
        return pass(statement, block);
      }
      function maybetype(type2, value) {
        if (isTS) {
          if (type2 == ":")
            return cont(typeexpr);
          if (value == "?")
            return cont(maybetype);
        }
      }
      function maybetypeOrIn(type2, value) {
        if (isTS && (type2 == ":" || value == "in"))
          return cont(typeexpr);
      }
      function mayberettype(type2) {
        if (isTS && type2 == ":") {
          if (cx.stream.match(/^\s*\w+\s+is\b/, false))
            return cont(expression, isKW, typeexpr);
          else
            return cont(typeexpr);
        }
      }
      function isKW(_, value) {
        if (value == "is") {
          cx.marked = "keyword";
          return cont();
        }
      }
      function typeexpr(type2, value) {
        if (value == "keyof" || value == "typeof" || value == "infer" || value == "readonly") {
          cx.marked = "keyword";
          return cont(value == "typeof" ? expressionNoComma : typeexpr);
        }
        if (type2 == "variable" || value == "void") {
          cx.marked = "type";
          return cont(afterType);
        }
        if (value == "|" || value == "&")
          return cont(typeexpr);
        if (type2 == "string" || type2 == "number" || type2 == "atom")
          return cont(afterType);
        if (type2 == "[")
          return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType);
        if (type2 == "{")
          return cont(pushlex("}"), typeprops, poplex, afterType);
        if (type2 == "(")
          return cont(commasep(typearg, ")"), maybeReturnType, afterType);
        if (type2 == "<")
          return cont(commasep(typeexpr, ">"), typeexpr);
        if (type2 == "quasi") {
          return pass(quasiType, afterType);
        }
      }
      function maybeReturnType(type2) {
        if (type2 == "=>")
          return cont(typeexpr);
      }
      function typeprops(type2) {
        if (type2.match(/[\}\)\]]/))
          return cont();
        if (type2 == "," || type2 == ";")
          return cont(typeprops);
        return pass(typeprop, typeprops);
      }
      function typeprop(type2, value) {
        if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(typeprop);
        } else if (value == "?" || type2 == "number" || type2 == "string") {
          return cont(typeprop);
        } else if (type2 == ":") {
          return cont(typeexpr);
        } else if (type2 == "[") {
          return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop);
        } else if (type2 == "(") {
          return pass(functiondecl, typeprop);
        } else if (!type2.match(/[;\}\)\],]/)) {
          return cont();
        }
      }
      function quasiType(type2, value) {
        if (type2 != "quasi")
          return pass();
        if (value.slice(value.length - 2) != "${")
          return cont(quasiType);
        return cont(typeexpr, continueQuasiType);
      }
      function continueQuasiType(type2) {
        if (type2 == "}") {
          cx.marked = "string-2";
          cx.state.tokenize = tokenQuasi;
          return cont(quasiType);
        }
      }
      function typearg(type2, value) {
        if (type2 == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?")
          return cont(typearg);
        if (type2 == ":")
          return cont(typeexpr);
        if (type2 == "spread")
          return cont(typearg);
        return pass(typeexpr);
      }
      function afterType(type2, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
        if (value == "|" || type2 == "." || value == "&")
          return cont(typeexpr);
        if (type2 == "[")
          return cont(typeexpr, expect("]"), afterType);
        if (value == "extends" || value == "implements") {
          cx.marked = "keyword";
          return cont(typeexpr);
        }
        if (value == "?")
          return cont(typeexpr, expect(":"), typeexpr);
      }
      function maybeTypeArgs(_, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
      }
      function typeparam() {
        return pass(typeexpr, maybeTypeDefault);
      }
      function maybeTypeDefault(_, value) {
        if (value == "=")
          return cont(typeexpr);
      }
      function vardef(_, value) {
        if (value == "enum") {
          cx.marked = "keyword";
          return cont(enumdef);
        }
        return pass(pattern, maybetype, maybeAssign, vardefCont);
      }
      function pattern(type2, value) {
        if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(pattern);
        }
        if (type2 == "variable") {
          register(value);
          return cont();
        }
        if (type2 == "spread")
          return cont(pattern);
        if (type2 == "[")
          return contCommasep(eltpattern, "]");
        if (type2 == "{")
          return contCommasep(proppattern, "}");
      }
      function proppattern(type2, value) {
        if (type2 == "variable" && !cx.stream.match(/^\s*:/, false)) {
          register(value);
          return cont(maybeAssign);
        }
        if (type2 == "variable")
          cx.marked = "property";
        if (type2 == "spread")
          return cont(pattern);
        if (type2 == "}")
          return pass();
        if (type2 == "[")
          return cont(expression, expect("]"), expect(":"), proppattern);
        return cont(expect(":"), pattern, maybeAssign);
      }
      function eltpattern() {
        return pass(pattern, maybeAssign);
      }
      function maybeAssign(_type, value) {
        if (value == "=")
          return cont(expressionNoComma);
      }
      function vardefCont(type2) {
        if (type2 == ",")
          return cont(vardef);
      }
      function maybeelse(type2, value) {
        if (type2 == "keyword b" && value == "else")
          return cont(pushlex("form", "else"), statement, poplex);
      }
      function forspec(type2, value) {
        if (value == "await")
          return cont(forspec);
        if (type2 == "(")
          return cont(pushlex(")"), forspec1, poplex);
      }
      function forspec1(type2) {
        if (type2 == "var")
          return cont(vardef, forspec2);
        if (type2 == "variable")
          return cont(forspec2);
        return pass(forspec2);
      }
      function forspec2(type2, value) {
        if (type2 == ")")
          return cont();
        if (type2 == ";")
          return cont(forspec2);
        if (value == "in" || value == "of") {
          cx.marked = "keyword";
          return cont(expression, forspec2);
        }
        return pass(expression, forspec2);
      }
      function functiondef(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(functiondef);
        }
        if (type2 == "variable") {
          register(value);
          return cont(functiondef);
        }
        if (type2 == "(")
          return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
        if (isTS && value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef);
      }
      function functiondecl(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(functiondecl);
        }
        if (type2 == "variable") {
          register(value);
          return cont(functiondecl);
        }
        if (type2 == "(")
          return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
        if (isTS && value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl);
      }
      function typename(type2, value) {
        if (type2 == "keyword" || type2 == "variable") {
          cx.marked = "type";
          return cont(typename);
        } else if (value == "<") {
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex);
        }
      }
      function funarg(type2, value) {
        if (value == "@")
          cont(expression, funarg);
        if (type2 == "spread")
          return cont(funarg);
        if (isTS && isModifier(value)) {
          cx.marked = "keyword";
          return cont(funarg);
        }
        if (isTS && type2 == "this")
          return cont(maybetype, maybeAssign);
        return pass(pattern, maybetype, maybeAssign);
      }
      function classExpression(type2, value) {
        if (type2 == "variable")
          return className(type2, value);
        return classNameAfter(type2, value);
      }
      function className(type2, value) {
        if (type2 == "variable") {
          register(value);
          return cont(classNameAfter);
        }
      }
      function classNameAfter(type2, value) {
        if (value == "<")
          return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter);
        if (value == "extends" || value == "implements" || isTS && type2 == ",") {
          if (value == "implements")
            cx.marked = "keyword";
          return cont(isTS ? typeexpr : expression, classNameAfter);
        }
        if (type2 == "{")
          return cont(pushlex("}"), classBody, poplex);
      }
      function classBody(type2, value) {
        if (type2 == "async" || type2 == "variable" && (value == "static" || value == "get" || value == "set" || isTS && isModifier(value)) && cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (type2 == "variable" || cx.style == "keyword") {
          cx.marked = "property";
          return cont(classfield, classBody);
        }
        if (type2 == "number" || type2 == "string")
          return cont(classfield, classBody);
        if (type2 == "[")
          return cont(expression, maybetype, expect("]"), classfield, classBody);
        if (value == "*") {
          cx.marked = "keyword";
          return cont(classBody);
        }
        if (isTS && type2 == "(")
          return pass(functiondecl, classBody);
        if (type2 == ";" || type2 == ",")
          return cont(classBody);
        if (type2 == "}")
          return cont();
        if (value == "@")
          return cont(expression, classBody);
      }
      function classfield(type2, value) {
        if (value == "!")
          return cont(classfield);
        if (value == "?")
          return cont(classfield);
        if (type2 == ":")
          return cont(typeexpr, maybeAssign);
        if (value == "=")
          return cont(expressionNoComma);
        var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
        return pass(isInterface ? functiondecl : functiondef);
      }
      function afterExport(type2, value) {
        if (value == "*") {
          cx.marked = "keyword";
          return cont(maybeFrom, expect(";"));
        }
        if (value == "default") {
          cx.marked = "keyword";
          return cont(expression, expect(";"));
        }
        if (type2 == "{")
          return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
        return pass(statement);
      }
      function exportField(type2, value) {
        if (value == "as") {
          cx.marked = "keyword";
          return cont(expect("variable"));
        }
        if (type2 == "variable")
          return pass(expressionNoComma, exportField);
      }
      function afterImport(type2) {
        if (type2 == "string")
          return cont();
        if (type2 == "(")
          return pass(expression);
        if (type2 == ".")
          return pass(maybeoperatorComma);
        return pass(importSpec, maybeMoreImports, maybeFrom);
      }
      function importSpec(type2, value) {
        if (type2 == "{")
          return contCommasep(importSpec, "}");
        if (type2 == "variable")
          register(value);
        if (value == "*")
          cx.marked = "keyword";
        return cont(maybeAs);
      }
      function maybeMoreImports(type2) {
        if (type2 == ",")
          return cont(importSpec, maybeMoreImports);
      }
      function maybeAs(_type, value) {
        if (value == "as") {
          cx.marked = "keyword";
          return cont(importSpec);
        }
      }
      function maybeFrom(_type, value) {
        if (value == "from") {
          cx.marked = "keyword";
          return cont(expression);
        }
      }
      function arrayLiteral(type2) {
        if (type2 == "]")
          return cont();
        return pass(commasep(expressionNoComma, "]"));
      }
      function enumdef() {
        return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex);
      }
      function enummember() {
        return pass(pattern, maybeAssign);
      }
      function isContinuedStatement(state, textAfter) {
        return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
      }
      function expressionAllowed(stream, state, backUp) {
        return state.tokenize == tokenBase && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) || state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0)));
      }
      return {
        startState: function(basecolumn) {
          var state = {
            tokenize: tokenBase,
            lastType: "sof",
            cc: [],
            lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
            localVars: parserConfig.localVars,
            context: parserConfig.localVars && new Context(null, null, false),
            indented: basecolumn || 0
          };
          if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
            state.globalVars = parserConfig.globalVars;
          return state;
        },
        token: function(stream, state) {
          if (stream.sol()) {
            if (!state.lexical.hasOwnProperty("align"))
              state.lexical.align = false;
            state.indented = stream.indentation();
            findFatArrow(stream, state);
          }
          if (state.tokenize != tokenComment && stream.eatSpace())
            return null;
          var style = state.tokenize(stream, state);
          if (type == "comment")
            return style;
          state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
          return parseJS(state, style, type, content, stream);
        },
        indent: function(state, textAfter) {
          if (state.tokenize == tokenComment || state.tokenize == tokenQuasi)
            return CodeMirror.Pass;
          if (state.tokenize != tokenBase)
            return 0;
          var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
          if (!/^\s*else\b/.test(textAfter))
            for (var i = state.cc.length - 1; i >= 0; --i) {
              var c = state.cc[i];
              if (c == poplex)
                lexical = lexical.prev;
              else if (c != maybeelse && c != popcontext)
                break;
            }
          while ((lexical.type == "stat" || lexical.type == "form") && (firstChar == "}" || (top = state.cc[state.cc.length - 1]) && (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/.test(textAfter)))
            lexical = lexical.prev;
          if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
            lexical = lexical.prev;
          var type2 = lexical.type, closing = firstChar == type2;
          if (type2 == "vardef")
            return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
          else if (type2 == "form" && firstChar == "{")
            return lexical.indented;
          else if (type2 == "form")
            return lexical.indented + indentUnit;
          else if (type2 == "stat")
            return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
          else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
            return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
          else if (lexical.align)
            return lexical.column + (closing ? 0 : 1);
          else
            return lexical.indented + (closing ? 0 : indentUnit);
        },
        electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
        blockCommentStart: jsonMode ? null : "/*",
        blockCommentEnd: jsonMode ? null : "*/",
        blockCommentContinue: jsonMode ? null : " * ",
        lineComment: jsonMode ? null : "//",
        fold: "brace",
        closeBrackets: "()[]{}''\"\"``",
        helperType: jsonMode ? "json" : "javascript",
        jsonldMode,
        jsonMode,
        expressionAllowed,
        skipExpression: function(state) {
          parseJS(state, "atom", "atom", "true", new CodeMirror.StringStream("", 2, null));
        }
      };
    });
    CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);
    CodeMirror.defineMIME("text/javascript", "javascript");
    CodeMirror.defineMIME("text/ecmascript", "javascript");
    CodeMirror.defineMIME("application/javascript", "javascript");
    CodeMirror.defineMIME("application/x-javascript", "javascript");
    CodeMirror.defineMIME("application/ecmascript", "javascript");
    CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
    CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
    CodeMirror.defineMIME("application/manifest+json", {name: "javascript", json: true});
    CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
    CodeMirror.defineMIME("text/typescript", {name: "javascript", typescript: true});
    CodeMirror.defineMIME("application/typescript", {name: "javascript", typescript: true});
  });
});
var javascript_default = javascript;

// dist/_snowpack/pkg/codemirror/mode/jsx/jsx.js
var jsx = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror, xml_default, javascript_default);
  })(function(CodeMirror) {
    function Context(state, mode, depth, prev) {
      this.state = state;
      this.mode = mode;
      this.depth = depth;
      this.prev = prev;
    }
    function copyContext(context) {
      return new Context(CodeMirror.copyState(context.mode, context.state), context.mode, context.depth, context.prev && copyContext(context.prev));
    }
    CodeMirror.defineMode("jsx", function(config, modeConfig) {
      var xmlMode = CodeMirror.getMode(config, {name: "xml", allowMissing: true, multilineTagIndentPastTag: false, allowMissingTagName: true});
      var jsMode = CodeMirror.getMode(config, modeConfig && modeConfig.base || "javascript");
      function flatXMLIndent(state) {
        var tagName = state.tagName;
        state.tagName = null;
        var result = xmlMode.indent(state, "", "");
        state.tagName = tagName;
        return result;
      }
      function token(stream, state) {
        if (state.context.mode == xmlMode)
          return xmlToken(stream, state, state.context);
        else
          return jsToken(stream, state, state.context);
      }
      function xmlToken(stream, state, cx) {
        if (cx.depth == 2) {
          if (stream.match(/^.*?\*\//))
            cx.depth = 1;
          else
            stream.skipToEnd();
          return "comment";
        }
        if (stream.peek() == "{") {
          xmlMode.skipAttribute(cx.state);
          var indent = flatXMLIndent(cx.state), xmlContext = cx.state.context;
          if (xmlContext && stream.match(/^[^>]*>\s*$/, false)) {
            while (xmlContext.prev && !xmlContext.startOfLine)
              xmlContext = xmlContext.prev;
            if (xmlContext.startOfLine)
              indent -= config.indentUnit;
            else if (cx.prev.state.lexical)
              indent = cx.prev.state.lexical.indented;
          } else if (cx.depth == 1) {
            indent += config.indentUnit;
          }
          state.context = new Context(CodeMirror.startState(jsMode, indent), jsMode, 0, state.context);
          return null;
        }
        if (cx.depth == 1) {
          if (stream.peek() == "<") {
            xmlMode.skipAttribute(cx.state);
            state.context = new Context(CodeMirror.startState(xmlMode, flatXMLIndent(cx.state)), xmlMode, 0, state.context);
            return null;
          } else if (stream.match("//")) {
            stream.skipToEnd();
            return "comment";
          } else if (stream.match("/*")) {
            cx.depth = 2;
            return token(stream, state);
          }
        }
        var style = xmlMode.token(stream, cx.state), cur = stream.current(), stop;
        if (/\btag\b/.test(style)) {
          if (/>$/.test(cur)) {
            if (cx.state.context)
              cx.depth = 0;
            else
              state.context = state.context.prev;
          } else if (/^</.test(cur)) {
            cx.depth = 1;
          }
        } else if (!style && (stop = cur.indexOf("{")) > -1) {
          stream.backUp(cur.length - stop);
        }
        return style;
      }
      function jsToken(stream, state, cx) {
        if (stream.peek() == "<" && jsMode.expressionAllowed(stream, cx.state)) {
          state.context = new Context(CodeMirror.startState(xmlMode, jsMode.indent(cx.state, "", "")), xmlMode, 0, state.context);
          jsMode.skipExpression(cx.state);
          return null;
        }
        var style = jsMode.token(stream, cx.state);
        if (!style && cx.depth != null) {
          var cur = stream.current();
          if (cur == "{") {
            cx.depth++;
          } else if (cur == "}") {
            if (--cx.depth == 0)
              state.context = state.context.prev;
          }
        }
        return style;
      }
      return {
        startState: function() {
          return {context: new Context(CodeMirror.startState(jsMode), jsMode)};
        },
        copyState: function(state) {
          return {context: copyContext(state.context)};
        },
        token,
        indent: function(state, textAfter, fullLine) {
          return state.context.mode.indent(state.context.state, textAfter, fullLine);
        },
        innerMode: function(state) {
          return state.context;
        }
      };
    }, "xml", "javascript");
    CodeMirror.defineMIME("text/jsx", "jsx");
    CodeMirror.defineMIME("text/typescript-jsx", {name: "jsx", base: {name: "javascript", typescript: true}});
  });
});

// dist/_snowpack/pkg/codemirror/mode/python/python.js
var python = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function wordRegexp(words2) {
      return new RegExp("^((" + words2.join(")|(") + "))\\b");
    }
    var wordOperators = wordRegexp(["and", "or", "not", "is"]);
    var commonKeywords = [
      "as",
      "assert",
      "break",
      "class",
      "continue",
      "def",
      "del",
      "elif",
      "else",
      "except",
      "finally",
      "for",
      "from",
      "global",
      "if",
      "import",
      "lambda",
      "pass",
      "raise",
      "return",
      "try",
      "while",
      "with",
      "yield",
      "in"
    ];
    var commonBuiltins = [
      "abs",
      "all",
      "any",
      "bin",
      "bool",
      "bytearray",
      "callable",
      "chr",
      "classmethod",
      "compile",
      "complex",
      "delattr",
      "dict",
      "dir",
      "divmod",
      "enumerate",
      "eval",
      "filter",
      "float",
      "format",
      "frozenset",
      "getattr",
      "globals",
      "hasattr",
      "hash",
      "help",
      "hex",
      "id",
      "input",
      "int",
      "isinstance",
      "issubclass",
      "iter",
      "len",
      "list",
      "locals",
      "map",
      "max",
      "memoryview",
      "min",
      "next",
      "object",
      "oct",
      "open",
      "ord",
      "pow",
      "property",
      "range",
      "repr",
      "reversed",
      "round",
      "set",
      "setattr",
      "slice",
      "sorted",
      "staticmethod",
      "str",
      "sum",
      "super",
      "tuple",
      "type",
      "vars",
      "zip",
      "__import__",
      "NotImplemented",
      "Ellipsis",
      "__debug__"
    ];
    CodeMirror.registerHelper("hintWords", "python", commonKeywords.concat(commonBuiltins).concat(["exec", "print"]));
    function top(state) {
      return state.scopes[state.scopes.length - 1];
    }
    CodeMirror.defineMode("python", function(conf, parserConf) {
      var ERRORCLASS = "error";
      var delimiters = parserConf.delimiters || parserConf.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/;
      var operators = [
        parserConf.singleOperators,
        parserConf.doubleOperators,
        parserConf.doubleDelimiters,
        parserConf.tripleDelimiters,
        parserConf.operators || /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/
      ];
      for (var i = 0; i < operators.length; i++)
        if (!operators[i])
          operators.splice(i--, 1);
      var hangingIndent = parserConf.hangingIndent || conf.indentUnit;
      var myKeywords = commonKeywords, myBuiltins = commonBuiltins;
      if (parserConf.extra_keywords != void 0)
        myKeywords = myKeywords.concat(parserConf.extra_keywords);
      if (parserConf.extra_builtins != void 0)
        myBuiltins = myBuiltins.concat(parserConf.extra_builtins);
      var py3 = !(parserConf.version && Number(parserConf.version) < 3);
      if (py3) {
        var identifiers = parserConf.identifiers || /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
        myKeywords = myKeywords.concat(["nonlocal", "False", "True", "None", "async", "await"]);
        myBuiltins = myBuiltins.concat(["ascii", "bytes", "exec", "print"]);
        var stringPrefixes = new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`, "i");
      } else {
        var identifiers = parserConf.identifiers || /^[_A-Za-z][_A-Za-z0-9]*/;
        myKeywords = myKeywords.concat(["exec", "print"]);
        myBuiltins = myBuiltins.concat([
          "apply",
          "basestring",
          "buffer",
          "cmp",
          "coerce",
          "execfile",
          "file",
          "intern",
          "long",
          "raw_input",
          "reduce",
          "reload",
          "unichr",
          "unicode",
          "xrange",
          "False",
          "True",
          "None"
        ]);
        var stringPrefixes = new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`, "i");
      }
      var keywords = wordRegexp(myKeywords);
      var builtins = wordRegexp(myBuiltins);
      function tokenBase(stream, state) {
        var sol = stream.sol() && state.lastToken != "\\";
        if (sol)
          state.indent = stream.indentation();
        if (sol && top(state).type == "py") {
          var scopeOffset = top(state).offset;
          if (stream.eatSpace()) {
            var lineOffset = stream.indentation();
            if (lineOffset > scopeOffset)
              pushPyScope(state);
            else if (lineOffset < scopeOffset && dedent(stream, state) && stream.peek() != "#")
              state.errorToken = true;
            return null;
          } else {
            var style = tokenBaseInner(stream, state);
            if (scopeOffset > 0 && dedent(stream, state))
              style += " " + ERRORCLASS;
            return style;
          }
        }
        return tokenBaseInner(stream, state);
      }
      function tokenBaseInner(stream, state, inFormat) {
        if (stream.eatSpace())
          return null;
        if (!inFormat && stream.match(/^#.*/))
          return "comment";
        if (stream.match(/^[0-9\.]/, false)) {
          var floatLiteral = false;
          if (stream.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)) {
            floatLiteral = true;
          }
          if (stream.match(/^[\d_]+\.\d*/)) {
            floatLiteral = true;
          }
          if (stream.match(/^\.\d+/)) {
            floatLiteral = true;
          }
          if (floatLiteral) {
            stream.eat(/J/i);
            return "number";
          }
          var intLiteral = false;
          if (stream.match(/^0x[0-9a-f_]+/i))
            intLiteral = true;
          if (stream.match(/^0b[01_]+/i))
            intLiteral = true;
          if (stream.match(/^0o[0-7_]+/i))
            intLiteral = true;
          if (stream.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)) {
            stream.eat(/J/i);
            intLiteral = true;
          }
          if (stream.match(/^0(?![\dx])/i))
            intLiteral = true;
          if (intLiteral) {
            stream.eat(/L/i);
            return "number";
          }
        }
        if (stream.match(stringPrefixes)) {
          var isFmtString = stream.current().toLowerCase().indexOf("f") !== -1;
          if (!isFmtString) {
            state.tokenize = tokenStringFactory(stream.current(), state.tokenize);
            return state.tokenize(stream, state);
          } else {
            state.tokenize = formatStringFactory(stream.current(), state.tokenize);
            return state.tokenize(stream, state);
          }
        }
        for (var i2 = 0; i2 < operators.length; i2++)
          if (stream.match(operators[i2]))
            return "operator";
        if (stream.match(delimiters))
          return "punctuation";
        if (state.lastToken == "." && stream.match(identifiers))
          return "property";
        if (stream.match(keywords) || stream.match(wordOperators))
          return "keyword";
        if (stream.match(builtins))
          return "builtin";
        if (stream.match(/^(self|cls)\b/))
          return "variable-2";
        if (stream.match(identifiers)) {
          if (state.lastToken == "def" || state.lastToken == "class")
            return "def";
          return "variable";
        }
        stream.next();
        return inFormat ? null : ERRORCLASS;
      }
      function formatStringFactory(delimiter, tokenOuter) {
        while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
          delimiter = delimiter.substr(1);
        var singleline = delimiter.length == 1;
        var OUTCLASS = "string";
        function tokenNestedExpr(depth) {
          return function(stream, state) {
            var inner = tokenBaseInner(stream, state, true);
            if (inner == "punctuation") {
              if (stream.current() == "{") {
                state.tokenize = tokenNestedExpr(depth + 1);
              } else if (stream.current() == "}") {
                if (depth > 1)
                  state.tokenize = tokenNestedExpr(depth - 1);
                else
                  state.tokenize = tokenString;
              }
            }
            return inner;
          };
        }
        function tokenString(stream, state) {
          while (!stream.eol()) {
            stream.eatWhile(/[^'"\{\}\\]/);
            if (stream.eat("\\")) {
              stream.next();
              if (singleline && stream.eol())
                return OUTCLASS;
            } else if (stream.match(delimiter)) {
              state.tokenize = tokenOuter;
              return OUTCLASS;
            } else if (stream.match("{{")) {
              return OUTCLASS;
            } else if (stream.match("{", false)) {
              state.tokenize = tokenNestedExpr(0);
              if (stream.current())
                return OUTCLASS;
              else
                return state.tokenize(stream, state);
            } else if (stream.match("}}")) {
              return OUTCLASS;
            } else if (stream.match("}")) {
              return ERRORCLASS;
            } else {
              stream.eat(/['"]/);
            }
          }
          if (singleline) {
            if (parserConf.singleLineStringErrors)
              return ERRORCLASS;
            else
              state.tokenize = tokenOuter;
          }
          return OUTCLASS;
        }
        tokenString.isString = true;
        return tokenString;
      }
      function tokenStringFactory(delimiter, tokenOuter) {
        while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
          delimiter = delimiter.substr(1);
        var singleline = delimiter.length == 1;
        var OUTCLASS = "string";
        function tokenString(stream, state) {
          while (!stream.eol()) {
            stream.eatWhile(/[^'"\\]/);
            if (stream.eat("\\")) {
              stream.next();
              if (singleline && stream.eol())
                return OUTCLASS;
            } else if (stream.match(delimiter)) {
              state.tokenize = tokenOuter;
              return OUTCLASS;
            } else {
              stream.eat(/['"]/);
            }
          }
          if (singleline) {
            if (parserConf.singleLineStringErrors)
              return ERRORCLASS;
            else
              state.tokenize = tokenOuter;
          }
          return OUTCLASS;
        }
        tokenString.isString = true;
        return tokenString;
      }
      function pushPyScope(state) {
        while (top(state).type != "py")
          state.scopes.pop();
        state.scopes.push({
          offset: top(state).offset + conf.indentUnit,
          type: "py",
          align: null
        });
      }
      function pushBracketScope(stream, state, type) {
        var align = stream.match(/^[\s\[\{\(]*(?:#|$)/, false) ? null : stream.column() + 1;
        state.scopes.push({
          offset: state.indent + hangingIndent,
          type,
          align
        });
      }
      function dedent(stream, state) {
        var indented = stream.indentation();
        while (state.scopes.length > 1 && top(state).offset > indented) {
          if (top(state).type != "py")
            return true;
          state.scopes.pop();
        }
        return top(state).offset != indented;
      }
      function tokenLexer(stream, state) {
        if (stream.sol()) {
          state.beginningOfLine = true;
          state.dedent = false;
        }
        var style = state.tokenize(stream, state);
        var current = stream.current();
        if (state.beginningOfLine && current == "@")
          return stream.match(identifiers, false) ? "meta" : py3 ? "operator" : ERRORCLASS;
        if (/\S/.test(current))
          state.beginningOfLine = false;
        if ((style == "variable" || style == "builtin") && state.lastToken == "meta")
          style = "meta";
        if (current == "pass" || current == "return")
          state.dedent = true;
        if (current == "lambda")
          state.lambda = true;
        if (current == ":" && !state.lambda && top(state).type == "py" && stream.match(/^\s*(?:#|$)/, false))
          pushPyScope(state);
        if (current.length == 1 && !/string|comment/.test(style)) {
          var delimiter_index = "[({".indexOf(current);
          if (delimiter_index != -1)
            pushBracketScope(stream, state, "])}".slice(delimiter_index, delimiter_index + 1));
          delimiter_index = "])}".indexOf(current);
          if (delimiter_index != -1) {
            if (top(state).type == current)
              state.indent = state.scopes.pop().offset - hangingIndent;
            else
              return ERRORCLASS;
          }
        }
        if (state.dedent && stream.eol() && top(state).type == "py" && state.scopes.length > 1)
          state.scopes.pop();
        return style;
      }
      var external = {
        startState: function(basecolumn) {
          return {
            tokenize: tokenBase,
            scopes: [{offset: basecolumn || 0, type: "py", align: null}],
            indent: basecolumn || 0,
            lastToken: null,
            lambda: false,
            dedent: 0
          };
        },
        token: function(stream, state) {
          var addErr = state.errorToken;
          if (addErr)
            state.errorToken = false;
          var style = tokenLexer(stream, state);
          if (style && style != "comment")
            state.lastToken = style == "keyword" || style == "punctuation" ? stream.current() : style;
          if (style == "punctuation")
            style = null;
          if (stream.eol() && state.lambda)
            state.lambda = false;
          return addErr ? style + " " + ERRORCLASS : style;
        },
        indent: function(state, textAfter) {
          if (state.tokenize != tokenBase)
            return state.tokenize.isString ? CodeMirror.Pass : 0;
          var scope = top(state);
          var closing = scope.type == textAfter.charAt(0) || scope.type == "py" && !state.dedent && /^(else:|elif |except |finally:)/.test(textAfter);
          if (scope.align != null)
            return scope.align - (closing ? 1 : 0);
          else
            return scope.offset - (closing ? hangingIndent : 0);
        },
        electricInput: /^\s*([\}\]\)]|else:|elif |except |finally:)$/,
        closeBrackets: {triples: `'"`},
        lineComment: "#",
        fold: "indent"
      };
      return external;
    });
    CodeMirror.defineMIME("text/x-python", "python");
    var words = function(str) {
      return str.split(" ");
    };
    CodeMirror.defineMIME("text/x-cython", {
      name: "python",
      extra_keywords: words("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")
    });
  });
});

// dist/_snowpack/pkg/codemirror/mode/go/go.js
var go = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    CodeMirror.defineMode("go", function(config) {
      var indentUnit = config.indentUnit;
      var keywords = {
        break: true,
        case: true,
        chan: true,
        const: true,
        continue: true,
        default: true,
        defer: true,
        else: true,
        fallthrough: true,
        for: true,
        func: true,
        go: true,
        goto: true,
        if: true,
        import: true,
        interface: true,
        map: true,
        package: true,
        range: true,
        return: true,
        select: true,
        struct: true,
        switch: true,
        type: true,
        var: true,
        bool: true,
        byte: true,
        complex64: true,
        complex128: true,
        float32: true,
        float64: true,
        int8: true,
        int16: true,
        int32: true,
        int64: true,
        string: true,
        uint8: true,
        uint16: true,
        uint32: true,
        uint64: true,
        int: true,
        uint: true,
        uintptr: true,
        error: true,
        rune: true,
        any: true,
        comparable: true
      };
      var atoms = {
        true: true,
        false: true,
        iota: true,
        nil: true,
        append: true,
        cap: true,
        close: true,
        complex: true,
        copy: true,
        delete: true,
        imag: true,
        len: true,
        make: true,
        new: true,
        panic: true,
        print: true,
        println: true,
        real: true,
        recover: true
      };
      var isOperatorChar = /[+\-*&^%:=<>!|\/]/;
      var curPunc;
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (ch == '"' || ch == "'" || ch == "`") {
          state.tokenize = tokenString(ch);
          return state.tokenize(stream, state);
        }
        if (/[\d\.]/.test(ch)) {
          if (ch == ".") {
            stream.match(/^[0-9]+([eE][\-+]?[0-9]+)?/);
          } else if (ch == "0") {
            stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);
          } else {
            stream.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/);
          }
          return "number";
        }
        if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
          curPunc = ch;
          return null;
        }
        if (ch == "/") {
          if (stream.eat("*")) {
            state.tokenize = tokenComment;
            return tokenComment(stream, state);
          }
          if (stream.eat("/")) {
            stream.skipToEnd();
            return "comment";
          }
        }
        if (isOperatorChar.test(ch)) {
          stream.eatWhile(isOperatorChar);
          return "operator";
        }
        stream.eatWhile(/[\w\$_\xa1-\uffff]/);
        var cur = stream.current();
        if (keywords.propertyIsEnumerable(cur)) {
          if (cur == "case" || cur == "default")
            curPunc = "case";
          return "keyword";
        }
        if (atoms.propertyIsEnumerable(cur))
          return "atom";
        return "variable";
      }
      function tokenString(quote) {
        return function(stream, state) {
          var escaped = false, next, end = false;
          while ((next = stream.next()) != null) {
            if (next == quote && !escaped) {
              end = true;
              break;
            }
            escaped = !escaped && quote != "`" && next == "\\";
          }
          if (end || !(escaped || quote == "`"))
            state.tokenize = tokenBase;
          return "string";
        };
      }
      function tokenComment(stream, state) {
        var maybeEnd = false, ch;
        while (ch = stream.next()) {
          if (ch == "/" && maybeEnd) {
            state.tokenize = tokenBase;
            break;
          }
          maybeEnd = ch == "*";
        }
        return "comment";
      }
      function Context(indented, column, type, align, prev) {
        this.indented = indented;
        this.column = column;
        this.type = type;
        this.align = align;
        this.prev = prev;
      }
      function pushContext(state, col, type) {
        return state.context = new Context(state.indented, col, type, null, state.context);
      }
      function popContext(state) {
        if (!state.context.prev)
          return;
        var t = state.context.type;
        if (t == ")" || t == "]" || t == "}")
          state.indented = state.context.indented;
        return state.context = state.context.prev;
      }
      return {
        startState: function(basecolumn) {
          return {
            tokenize: null,
            context: new Context((basecolumn || 0) - indentUnit, 0, "top", false),
            indented: 0,
            startOfLine: true
          };
        },
        token: function(stream, state) {
          var ctx = state.context;
          if (stream.sol()) {
            if (ctx.align == null)
              ctx.align = false;
            state.indented = stream.indentation();
            state.startOfLine = true;
            if (ctx.type == "case")
              ctx.type = "}";
          }
          if (stream.eatSpace())
            return null;
          curPunc = null;
          var style = (state.tokenize || tokenBase)(stream, state);
          if (style == "comment")
            return style;
          if (ctx.align == null)
            ctx.align = true;
          if (curPunc == "{")
            pushContext(state, stream.column(), "}");
          else if (curPunc == "[")
            pushContext(state, stream.column(), "]");
          else if (curPunc == "(")
            pushContext(state, stream.column(), ")");
          else if (curPunc == "case")
            ctx.type = "case";
          else if (curPunc == "}" && ctx.type == "}")
            popContext(state);
          else if (curPunc == ctx.type)
            popContext(state);
          state.startOfLine = false;
          return style;
        },
        indent: function(state, textAfter) {
          if (state.tokenize != tokenBase && state.tokenize != null)
            return CodeMirror.Pass;
          var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
          if (ctx.type == "case" && /^(?:case|default)\b/.test(textAfter)) {
            state.context.type = "}";
            return ctx.indented;
          }
          var closing = firstChar == ctx.type;
          if (ctx.align)
            return ctx.column + (closing ? 0 : 1);
          else
            return ctx.indented + (closing ? 0 : indentUnit);
        },
        electricChars: "{}):",
        closeBrackets: "()[]{}''\"\"``",
        fold: "brace",
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        lineComment: "//"
      };
    });
    CodeMirror.defineMIME("text/x-go", "go");
  });
});

// dist/_snowpack/pkg/codemirror/mode/ruby/ruby.js
var ruby = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function wordObj(words) {
      var o = {};
      for (var i = 0, e = words.length; i < e; ++i)
        o[words[i]] = true;
      return o;
    }
    var keywordList = [
      "alias",
      "and",
      "BEGIN",
      "begin",
      "break",
      "case",
      "class",
      "def",
      "defined?",
      "do",
      "else",
      "elsif",
      "END",
      "end",
      "ensure",
      "false",
      "for",
      "if",
      "in",
      "module",
      "next",
      "not",
      "or",
      "redo",
      "rescue",
      "retry",
      "return",
      "self",
      "super",
      "then",
      "true",
      "undef",
      "unless",
      "until",
      "when",
      "while",
      "yield",
      "nil",
      "raise",
      "throw",
      "catch",
      "fail",
      "loop",
      "callcc",
      "caller",
      "lambda",
      "proc",
      "public",
      "protected",
      "private",
      "require",
      "load",
      "require_relative",
      "extend",
      "autoload",
      "__END__",
      "__FILE__",
      "__LINE__",
      "__dir__"
    ], keywords = wordObj(keywordList);
    var indentWords = wordObj([
      "def",
      "class",
      "case",
      "for",
      "while",
      "until",
      "module",
      "catch",
      "loop",
      "proc",
      "begin"
    ]);
    var dedentWords = wordObj(["end", "until"]);
    var opening = {"[": "]", "{": "}", "(": ")"};
    var closing = {"]": "[", "}": "{", ")": "("};
    CodeMirror.defineMode("ruby", function(config) {
      var curPunc;
      function chain(newtok, stream, state) {
        state.tokenize.push(newtok);
        return newtok(stream, state);
      }
      function tokenBase(stream, state) {
        if (stream.sol() && stream.match("=begin") && stream.eol()) {
          state.tokenize.push(readBlockComment);
          return "comment";
        }
        if (stream.eatSpace())
          return null;
        var ch = stream.next(), m;
        if (ch == "`" || ch == "'" || ch == '"') {
          return chain(readQuoted(ch, "string", ch == '"' || ch == "`"), stream, state);
        } else if (ch == "/") {
          if (regexpAhead(stream))
            return chain(readQuoted(ch, "string-2", true), stream, state);
          else
            return "operator";
        } else if (ch == "%") {
          var style = "string", embed = true;
          if (stream.eat("s"))
            style = "atom";
          else if (stream.eat(/[WQ]/))
            style = "string";
          else if (stream.eat(/[r]/))
            style = "string-2";
          else if (stream.eat(/[wxq]/)) {
            style = "string";
            embed = false;
          }
          var delim = stream.eat(/[^\w\s=]/);
          if (!delim)
            return "operator";
          if (opening.propertyIsEnumerable(delim))
            delim = opening[delim];
          return chain(readQuoted(delim, style, embed, true), stream, state);
        } else if (ch == "#") {
          stream.skipToEnd();
          return "comment";
        } else if (ch == "<" && (m = stream.match(/^<([-~])[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))) {
          return chain(readHereDoc(m[2], m[1]), stream, state);
        } else if (ch == "0") {
          if (stream.eat("x"))
            stream.eatWhile(/[\da-fA-F]/);
          else if (stream.eat("b"))
            stream.eatWhile(/[01]/);
          else
            stream.eatWhile(/[0-7]/);
          return "number";
        } else if (/\d/.test(ch)) {
          stream.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/);
          return "number";
        } else if (ch == "?") {
          while (stream.match(/^\\[CM]-/)) {
          }
          if (stream.eat("\\"))
            stream.eatWhile(/\w/);
          else
            stream.next();
          return "string";
        } else if (ch == ":") {
          if (stream.eat("'"))
            return chain(readQuoted("'", "atom", false), stream, state);
          if (stream.eat('"'))
            return chain(readQuoted('"', "atom", true), stream, state);
          if (stream.eat(/[\<\>]/)) {
            stream.eat(/[\<\>]/);
            return "atom";
          }
          if (stream.eat(/[\+\-\*\/\&\|\:\!]/)) {
            return "atom";
          }
          if (stream.eat(/[a-zA-Z$@_\xa1-\uffff]/)) {
            stream.eatWhile(/[\w$\xa1-\uffff]/);
            stream.eat(/[\?\!\=]/);
            return "atom";
          }
          return "operator";
        } else if (ch == "@" && stream.match(/^@?[a-zA-Z_\xa1-\uffff]/)) {
          stream.eat("@");
          stream.eatWhile(/[\w\xa1-\uffff]/);
          return "variable-2";
        } else if (ch == "$") {
          if (stream.eat(/[a-zA-Z_]/)) {
            stream.eatWhile(/[\w]/);
          } else if (stream.eat(/\d/)) {
            stream.eat(/\d/);
          } else {
            stream.next();
          }
          return "variable-3";
        } else if (/[a-zA-Z_\xa1-\uffff]/.test(ch)) {
          stream.eatWhile(/[\w\xa1-\uffff]/);
          stream.eat(/[\?\!]/);
          if (stream.eat(":"))
            return "atom";
          return "ident";
        } else if (ch == "|" && (state.varList || state.lastTok == "{" || state.lastTok == "do")) {
          curPunc = "|";
          return null;
        } else if (/[\(\)\[\]{}\\;]/.test(ch)) {
          curPunc = ch;
          return null;
        } else if (ch == "-" && stream.eat(">")) {
          return "arrow";
        } else if (/[=+\-\/*:\.^%<>~|]/.test(ch)) {
          var more = stream.eatWhile(/[=+\-\/*:\.^%<>~|]/);
          if (ch == "." && !more)
            curPunc = ".";
          return "operator";
        } else {
          return null;
        }
      }
      function regexpAhead(stream) {
        var start = stream.pos, depth = 0, next, found = false, escaped = false;
        while ((next = stream.next()) != null) {
          if (!escaped) {
            if ("[{(".indexOf(next) > -1) {
              depth++;
            } else if ("]})".indexOf(next) > -1) {
              depth--;
              if (depth < 0)
                break;
            } else if (next == "/" && depth == 0) {
              found = true;
              break;
            }
            escaped = next == "\\";
          } else {
            escaped = false;
          }
        }
        stream.backUp(stream.pos - start);
        return found;
      }
      function tokenBaseUntilBrace(depth) {
        if (!depth)
          depth = 1;
        return function(stream, state) {
          if (stream.peek() == "}") {
            if (depth == 1) {
              state.tokenize.pop();
              return state.tokenize[state.tokenize.length - 1](stream, state);
            } else {
              state.tokenize[state.tokenize.length - 1] = tokenBaseUntilBrace(depth - 1);
            }
          } else if (stream.peek() == "{") {
            state.tokenize[state.tokenize.length - 1] = tokenBaseUntilBrace(depth + 1);
          }
          return tokenBase(stream, state);
        };
      }
      function tokenBaseOnce() {
        var alreadyCalled = false;
        return function(stream, state) {
          if (alreadyCalled) {
            state.tokenize.pop();
            return state.tokenize[state.tokenize.length - 1](stream, state);
          }
          alreadyCalled = true;
          return tokenBase(stream, state);
        };
      }
      function readQuoted(quote, style, embed, unescaped) {
        return function(stream, state) {
          var escaped = false, ch;
          if (state.context.type === "read-quoted-paused") {
            state.context = state.context.prev;
            stream.eat("}");
          }
          while ((ch = stream.next()) != null) {
            if (ch == quote && (unescaped || !escaped)) {
              state.tokenize.pop();
              break;
            }
            if (embed && ch == "#" && !escaped) {
              if (stream.eat("{")) {
                if (quote == "}") {
                  state.context = {prev: state.context, type: "read-quoted-paused"};
                }
                state.tokenize.push(tokenBaseUntilBrace());
                break;
              } else if (/[@\$]/.test(stream.peek())) {
                state.tokenize.push(tokenBaseOnce());
                break;
              }
            }
            escaped = !escaped && ch == "\\";
          }
          return style;
        };
      }
      function readHereDoc(phrase, mayIndent) {
        return function(stream, state) {
          if (mayIndent)
            stream.eatSpace();
          if (stream.match(phrase))
            state.tokenize.pop();
          else
            stream.skipToEnd();
          return "string";
        };
      }
      function readBlockComment(stream, state) {
        if (stream.sol() && stream.match("=end") && stream.eol())
          state.tokenize.pop();
        stream.skipToEnd();
        return "comment";
      }
      return {
        startState: function() {
          return {
            tokenize: [tokenBase],
            indented: 0,
            context: {type: "top", indented: -config.indentUnit},
            continuedLine: false,
            lastTok: null,
            varList: false
          };
        },
        token: function(stream, state) {
          curPunc = null;
          if (stream.sol())
            state.indented = stream.indentation();
          var style = state.tokenize[state.tokenize.length - 1](stream, state), kwtype;
          var thisTok = curPunc;
          if (style == "ident") {
            var word = stream.current();
            style = state.lastTok == "." ? "property" : keywords.propertyIsEnumerable(stream.current()) ? "keyword" : /^[A-Z]/.test(word) ? "tag" : state.lastTok == "def" || state.lastTok == "class" || state.varList ? "def" : "variable";
            if (style == "keyword") {
              thisTok = word;
              if (indentWords.propertyIsEnumerable(word))
                kwtype = "indent";
              else if (dedentWords.propertyIsEnumerable(word))
                kwtype = "dedent";
              else if ((word == "if" || word == "unless") && stream.column() == stream.indentation())
                kwtype = "indent";
              else if (word == "do" && state.context.indented < state.indented)
                kwtype = "indent";
            }
          }
          if (curPunc || style && style != "comment")
            state.lastTok = thisTok;
          if (curPunc == "|")
            state.varList = !state.varList;
          if (kwtype == "indent" || /[\(\[\{]/.test(curPunc))
            state.context = {prev: state.context, type: curPunc || style, indented: state.indented};
          else if ((kwtype == "dedent" || /[\)\]\}]/.test(curPunc)) && state.context.prev)
            state.context = state.context.prev;
          if (stream.eol())
            state.continuedLine = curPunc == "\\" || style == "operator";
          return style;
        },
        indent: function(state, textAfter) {
          if (state.tokenize[state.tokenize.length - 1] != tokenBase)
            return CodeMirror.Pass;
          var firstChar = textAfter && textAfter.charAt(0);
          var ct = state.context;
          var closed = ct.type == closing[firstChar] || ct.type == "keyword" && /^(?:end|until|else|elsif|when|rescue)\b/.test(textAfter);
          return ct.indented + (closed ? 0 : config.indentUnit) + (state.continuedLine ? config.indentUnit : 0);
        },
        electricInput: /^\s*(?:end|rescue|elsif|else|\})$/,
        lineComment: "#",
        fold: "indent"
      };
    });
    CodeMirror.defineMIME("text/x-ruby", "ruby");
    CodeMirror.registerHelper("hintWords", "ruby", keywordList);
  });
});

// dist/_snowpack/pkg/codemirror/addon/edit/closebrackets.js
var closebrackets = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var defaults = {
      pairs: `()[]{}''""`,
      closeBefore: `)]}'":;>`,
      triples: "",
      explode: "[]{}"
    };
    var Pos = CodeMirror.Pos;
    CodeMirror.defineOption("autoCloseBrackets", false, function(cm, val, old) {
      if (old && old != CodeMirror.Init) {
        cm.removeKeyMap(keyMap);
        cm.state.closeBrackets = null;
      }
      if (val) {
        ensureBound(getOption(val, "pairs"));
        cm.state.closeBrackets = val;
        cm.addKeyMap(keyMap);
      }
    });
    function getOption(conf, name) {
      if (name == "pairs" && typeof conf == "string")
        return conf;
      if (typeof conf == "object" && conf[name] != null)
        return conf[name];
      return defaults[name];
    }
    var keyMap = {Backspace: handleBackspace, Enter: handleEnter};
    function ensureBound(chars) {
      for (var i = 0; i < chars.length; i++) {
        var ch = chars.charAt(i), key = "'" + ch + "'";
        if (!keyMap[key])
          keyMap[key] = handler(ch);
      }
    }
    ensureBound(defaults.pairs + "`");
    function handler(ch) {
      return function(cm) {
        return handleChar(cm, ch);
      };
    }
    function getConfig(cm) {
      var deflt = cm.state.closeBrackets;
      if (!deflt || deflt.override)
        return deflt;
      var mode = cm.getModeAt(cm.getCursor());
      return mode.closeBrackets || deflt;
    }
    function handleBackspace(cm) {
      var conf = getConfig(cm);
      if (!conf || cm.getOption("disableInput"))
        return CodeMirror.Pass;
      var pairs = getOption(conf, "pairs");
      var ranges = cm.listSelections();
      for (var i = 0; i < ranges.length; i++) {
        if (!ranges[i].empty())
          return CodeMirror.Pass;
        var around = charsAround(cm, ranges[i].head);
        if (!around || pairs.indexOf(around) % 2 != 0)
          return CodeMirror.Pass;
      }
      for (var i = ranges.length - 1; i >= 0; i--) {
        var cur = ranges[i].head;
        cm.replaceRange("", Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1), "+delete");
      }
    }
    function handleEnter(cm) {
      var conf = getConfig(cm);
      var explode = conf && getOption(conf, "explode");
      if (!explode || cm.getOption("disableInput"))
        return CodeMirror.Pass;
      var ranges = cm.listSelections();
      for (var i = 0; i < ranges.length; i++) {
        if (!ranges[i].empty())
          return CodeMirror.Pass;
        var around = charsAround(cm, ranges[i].head);
        if (!around || explode.indexOf(around) % 2 != 0)
          return CodeMirror.Pass;
      }
      cm.operation(function() {
        var linesep = cm.lineSeparator() || "\n";
        cm.replaceSelection(linesep + linesep, null);
        moveSel(cm, -1);
        ranges = cm.listSelections();
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var line = ranges[i2].head.line;
          cm.indentLine(line, null, true);
          cm.indentLine(line + 1, null, true);
        }
      });
    }
    function moveSel(cm, dir) {
      var newRanges = [], ranges = cm.listSelections(), primary = 0;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        if (range.head == cm.getCursor())
          primary = i;
        var pos = range.head.ch || dir > 0 ? {line: range.head.line, ch: range.head.ch + dir} : {line: range.head.line - 1};
        newRanges.push({anchor: pos, head: pos});
      }
      cm.setSelections(newRanges, primary);
    }
    function contractSelection(sel) {
      var inverted = CodeMirror.cmpPos(sel.anchor, sel.head) > 0;
      return {
        anchor: new Pos(sel.anchor.line, sel.anchor.ch + (inverted ? -1 : 1)),
        head: new Pos(sel.head.line, sel.head.ch + (inverted ? 1 : -1))
      };
    }
    function handleChar(cm, ch) {
      var conf = getConfig(cm);
      if (!conf || cm.getOption("disableInput"))
        return CodeMirror.Pass;
      var pairs = getOption(conf, "pairs");
      var pos = pairs.indexOf(ch);
      if (pos == -1)
        return CodeMirror.Pass;
      var closeBefore = getOption(conf, "closeBefore");
      var triples = getOption(conf, "triples");
      var identical = pairs.charAt(pos + 1) == ch;
      var ranges = cm.listSelections();
      var opening = pos % 2 == 0;
      var type;
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i], cur = range.head, curType;
        var next = cm.getRange(cur, Pos(cur.line, cur.ch + 1));
        if (opening && !range.empty()) {
          curType = "surround";
        } else if ((identical || !opening) && next == ch) {
          if (identical && stringStartsAfter(cm, cur))
            curType = "both";
          else if (triples.indexOf(ch) >= 0 && cm.getRange(cur, Pos(cur.line, cur.ch + 3)) == ch + ch + ch)
            curType = "skipThree";
          else
            curType = "skip";
        } else if (identical && cur.ch > 1 && triples.indexOf(ch) >= 0 && cm.getRange(Pos(cur.line, cur.ch - 2), cur) == ch + ch) {
          if (cur.ch > 2 && /\bstring/.test(cm.getTokenTypeAt(Pos(cur.line, cur.ch - 2))))
            return CodeMirror.Pass;
          curType = "addFour";
        } else if (identical) {
          var prev = cur.ch == 0 ? " " : cm.getRange(Pos(cur.line, cur.ch - 1), cur);
          if (!CodeMirror.isWordChar(next) && prev != ch && !CodeMirror.isWordChar(prev))
            curType = "both";
          else
            return CodeMirror.Pass;
        } else if (opening && (next.length === 0 || /\s/.test(next) || closeBefore.indexOf(next) > -1)) {
          curType = "both";
        } else {
          return CodeMirror.Pass;
        }
        if (!type)
          type = curType;
        else if (type != curType)
          return CodeMirror.Pass;
      }
      var left = pos % 2 ? pairs.charAt(pos - 1) : ch;
      var right = pos % 2 ? ch : pairs.charAt(pos + 1);
      cm.operation(function() {
        if (type == "skip") {
          moveSel(cm, 1);
        } else if (type == "skipThree") {
          moveSel(cm, 3);
        } else if (type == "surround") {
          var sels = cm.getSelections();
          for (var i2 = 0; i2 < sels.length; i2++)
            sels[i2] = left + sels[i2] + right;
          cm.replaceSelections(sels, "around");
          sels = cm.listSelections().slice();
          for (var i2 = 0; i2 < sels.length; i2++)
            sels[i2] = contractSelection(sels[i2]);
          cm.setSelections(sels);
        } else if (type == "both") {
          cm.replaceSelection(left + right, null);
          cm.triggerElectric(left + right);
          moveSel(cm, -1);
        } else if (type == "addFour") {
          cm.replaceSelection(left + left + left + left, "before");
          moveSel(cm, 1);
        }
      });
    }
    function charsAround(cm, pos) {
      var str = cm.getRange(Pos(pos.line, pos.ch - 1), Pos(pos.line, pos.ch + 1));
      return str.length == 2 ? str : null;
    }
    function stringStartsAfter(cm, pos) {
      var token = cm.getTokenAt(Pos(pos.line, pos.ch + 1));
      return /\bstring/.test(token.type) && token.start == pos.ch && (pos.ch == 0 || !/\bstring/.test(cm.getTokenTypeAt(pos)));
    }
  });
});

// dist/_snowpack/pkg/codemirror/addon/fold/xml-fold.js
var xmlFold = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var Pos = CodeMirror.Pos;
    function cmp(a, b) {
      return a.line - b.line || a.ch - b.ch;
    }
    var nameStartChar = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var xmlTagStart = new RegExp("<(/?)([" + nameStartChar + "][" + nameChar + "]*)", "g");
    function Iter(cm, line, ch, range) {
      this.line = line;
      this.ch = ch;
      this.cm = cm;
      this.text = cm.getLine(line);
      this.min = range ? Math.max(range.from, cm.firstLine()) : cm.firstLine();
      this.max = range ? Math.min(range.to - 1, cm.lastLine()) : cm.lastLine();
    }
    function tagAt(iter, ch) {
      var type = iter.cm.getTokenTypeAt(Pos(iter.line, ch));
      return type && /\btag\b/.test(type);
    }
    function nextLine(iter) {
      if (iter.line >= iter.max)
        return;
      iter.ch = 0;
      iter.text = iter.cm.getLine(++iter.line);
      return true;
    }
    function prevLine(iter) {
      if (iter.line <= iter.min)
        return;
      iter.text = iter.cm.getLine(--iter.line);
      iter.ch = iter.text.length;
      return true;
    }
    function toTagEnd(iter) {
      for (; ; ) {
        var gt = iter.text.indexOf(">", iter.ch);
        if (gt == -1) {
          if (nextLine(iter))
            continue;
          else
            return;
        }
        if (!tagAt(iter, gt + 1)) {
          iter.ch = gt + 1;
          continue;
        }
        var lastSlash = iter.text.lastIndexOf("/", gt);
        var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
        iter.ch = gt + 1;
        return selfClose ? "selfClose" : "regular";
      }
    }
    function toTagStart(iter) {
      for (; ; ) {
        var lt = iter.ch ? iter.text.lastIndexOf("<", iter.ch - 1) : -1;
        if (lt == -1) {
          if (prevLine(iter))
            continue;
          else
            return;
        }
        if (!tagAt(iter, lt + 1)) {
          iter.ch = lt;
          continue;
        }
        xmlTagStart.lastIndex = lt;
        iter.ch = lt;
        var match = xmlTagStart.exec(iter.text);
        if (match && match.index == lt)
          return match;
      }
    }
    function toNextTag(iter) {
      for (; ; ) {
        xmlTagStart.lastIndex = iter.ch;
        var found = xmlTagStart.exec(iter.text);
        if (!found) {
          if (nextLine(iter))
            continue;
          else
            return;
        }
        if (!tagAt(iter, found.index + 1)) {
          iter.ch = found.index + 1;
          continue;
        }
        iter.ch = found.index + found[0].length;
        return found;
      }
    }
    function toPrevTag(iter) {
      for (; ; ) {
        var gt = iter.ch ? iter.text.lastIndexOf(">", iter.ch - 1) : -1;
        if (gt == -1) {
          if (prevLine(iter))
            continue;
          else
            return;
        }
        if (!tagAt(iter, gt + 1)) {
          iter.ch = gt;
          continue;
        }
        var lastSlash = iter.text.lastIndexOf("/", gt);
        var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
        iter.ch = gt + 1;
        return selfClose ? "selfClose" : "regular";
      }
    }
    function findMatchingClose(iter, tag) {
      var stack = [];
      for (; ; ) {
        var next = toNextTag(iter), end, startLine = iter.line, startCh = iter.ch - (next ? next[0].length : 0);
        if (!next || !(end = toTagEnd(iter)))
          return;
        if (end == "selfClose")
          continue;
        if (next[1]) {
          for (var i = stack.length - 1; i >= 0; --i)
            if (stack[i] == next[2]) {
              stack.length = i;
              break;
            }
          if (i < 0 && (!tag || tag == next[2]))
            return {
              tag: next[2],
              from: Pos(startLine, startCh),
              to: Pos(iter.line, iter.ch)
            };
        } else {
          stack.push(next[2]);
        }
      }
    }
    function findMatchingOpen(iter, tag) {
      var stack = [];
      for (; ; ) {
        var prev = toPrevTag(iter);
        if (!prev)
          return;
        if (prev == "selfClose") {
          toTagStart(iter);
          continue;
        }
        var endLine = iter.line, endCh = iter.ch;
        var start = toTagStart(iter);
        if (!start)
          return;
        if (start[1]) {
          stack.push(start[2]);
        } else {
          for (var i = stack.length - 1; i >= 0; --i)
            if (stack[i] == start[2]) {
              stack.length = i;
              break;
            }
          if (i < 0 && (!tag || tag == start[2]))
            return {
              tag: start[2],
              from: Pos(iter.line, iter.ch),
              to: Pos(endLine, endCh)
            };
        }
      }
    }
    CodeMirror.registerHelper("fold", "xml", function(cm, start) {
      var iter = new Iter(cm, start.line, 0);
      for (; ; ) {
        var openTag = toNextTag(iter);
        if (!openTag || iter.line != start.line)
          return;
        var end = toTagEnd(iter);
        if (!end)
          return;
        if (!openTag[1] && end != "selfClose") {
          var startPos = Pos(iter.line, iter.ch);
          var endPos = findMatchingClose(iter, openTag[2]);
          return endPos && cmp(endPos.from, startPos) > 0 ? {from: startPos, to: endPos.from} : null;
        }
      }
    });
    CodeMirror.findMatchingTag = function(cm, pos, range) {
      var iter = new Iter(cm, pos.line, pos.ch, range);
      if (iter.text.indexOf(">") == -1 && iter.text.indexOf("<") == -1)
        return;
      var end = toTagEnd(iter), to = end && Pos(iter.line, iter.ch);
      var start = end && toTagStart(iter);
      if (!end || !start || cmp(iter, pos) > 0)
        return;
      var here = {from: Pos(iter.line, iter.ch), to, tag: start[2]};
      if (end == "selfClose")
        return {open: here, close: null, at: "open"};
      if (start[1]) {
        return {open: findMatchingOpen(iter, start[2]), close: here, at: "close"};
      } else {
        iter = new Iter(cm, to.line, to.ch, range);
        return {open: here, close: findMatchingClose(iter, start[2]), at: "open"};
      }
    };
    CodeMirror.findEnclosingTag = function(cm, pos, range, tag) {
      var iter = new Iter(cm, pos.line, pos.ch, range);
      for (; ; ) {
        var open = findMatchingOpen(iter, tag);
        if (!open)
          break;
        var forward = new Iter(cm, pos.line, pos.ch, range);
        var close = findMatchingClose(forward, open.tag);
        if (close)
          return {open, close};
      }
    };
    CodeMirror.scanForClosingTag = function(cm, pos, name, end) {
      var iter = new Iter(cm, pos.line, pos.ch, end ? {from: 0, to: end} : null);
      return findMatchingClose(iter, name);
    };
  });
});
var xml_fold_default = xmlFold;

// dist/_snowpack/pkg/codemirror/addon/edit/closetag.js
var closetag = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror, xml_fold_default);
  })(function(CodeMirror) {
    CodeMirror.defineOption("autoCloseTags", false, function(cm, val, old) {
      if (old != CodeMirror.Init && old)
        cm.removeKeyMap("autoCloseTags");
      if (!val)
        return;
      var map = {name: "autoCloseTags"};
      if (typeof val != "object" || val.whenClosing !== false)
        map["'/'"] = function(cm2) {
          return autoCloseSlash(cm2);
        };
      if (typeof val != "object" || val.whenOpening !== false)
        map["'>'"] = function(cm2) {
          return autoCloseGT(cm2);
        };
      cm.addKeyMap(map);
    });
    var htmlDontClose = [
      "area",
      "base",
      "br",
      "col",
      "command",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr"
    ];
    var htmlIndent = [
      "applet",
      "blockquote",
      "body",
      "button",
      "div",
      "dl",
      "fieldset",
      "form",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "html",
      "iframe",
      "layer",
      "legend",
      "object",
      "ol",
      "p",
      "select",
      "table",
      "ul"
    ];
    function autoCloseGT(cm) {
      if (cm.getOption("disableInput"))
        return CodeMirror.Pass;
      var ranges = cm.listSelections(), replacements = [];
      var opt = cm.getOption("autoCloseTags");
      for (var i = 0; i < ranges.length; i++) {
        if (!ranges[i].empty())
          return CodeMirror.Pass;
        var pos = ranges[i].head, tok = cm.getTokenAt(pos);
        var inner = CodeMirror.innerMode(cm.getMode(), tok.state), state = inner.state;
        var tagInfo = inner.mode.xmlCurrentTag && inner.mode.xmlCurrentTag(state);
        var tagName = tagInfo && tagInfo.name;
        if (!tagName)
          return CodeMirror.Pass;
        var html = inner.mode.configuration == "html";
        var dontCloseTags = typeof opt == "object" && opt.dontCloseTags || html && htmlDontClose;
        var indentTags = typeof opt == "object" && opt.indentTags || html && htmlIndent;
        if (tok.end > pos.ch)
          tagName = tagName.slice(0, tagName.length - tok.end + pos.ch);
        var lowerTagName = tagName.toLowerCase();
        if (!tagName || tok.type == "string" && (tok.end != pos.ch || !/[\"\']/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1) || tok.type == "tag" && tagInfo.close || tok.string.indexOf("/") == pos.ch - tok.start - 1 || dontCloseTags && indexOf(dontCloseTags, lowerTagName) > -1 || closingTagExists(cm, inner.mode.xmlCurrentContext && inner.mode.xmlCurrentContext(state) || [], tagName, pos, true))
          return CodeMirror.Pass;
        var emptyTags = typeof opt == "object" && opt.emptyTags;
        if (emptyTags && indexOf(emptyTags, tagName) > -1) {
          replacements[i] = {text: "/>", newPos: CodeMirror.Pos(pos.line, pos.ch + 2)};
          continue;
        }
        var indent = indentTags && indexOf(indentTags, lowerTagName) > -1;
        replacements[i] = {
          indent,
          text: ">" + (indent ? "\n\n" : "") + "</" + tagName + ">",
          newPos: indent ? CodeMirror.Pos(pos.line + 1, 0) : CodeMirror.Pos(pos.line, pos.ch + 1)
        };
      }
      var dontIndentOnAutoClose = typeof opt == "object" && opt.dontIndentOnAutoClose;
      for (var i = ranges.length - 1; i >= 0; i--) {
        var info = replacements[i];
        cm.replaceRange(info.text, ranges[i].head, ranges[i].anchor, "+insert");
        var sel = cm.listSelections().slice(0);
        sel[i] = {head: info.newPos, anchor: info.newPos};
        cm.setSelections(sel);
        if (!dontIndentOnAutoClose && info.indent) {
          cm.indentLine(info.newPos.line, null, true);
          cm.indentLine(info.newPos.line + 1, null, true);
        }
      }
    }
    function autoCloseCurrent(cm, typingSlash) {
      var ranges = cm.listSelections(), replacements = [];
      var head = typingSlash ? "/" : "</";
      var opt = cm.getOption("autoCloseTags");
      var dontIndentOnAutoClose = typeof opt == "object" && opt.dontIndentOnSlash;
      for (var i = 0; i < ranges.length; i++) {
        if (!ranges[i].empty())
          return CodeMirror.Pass;
        var pos = ranges[i].head, tok = cm.getTokenAt(pos);
        var inner = CodeMirror.innerMode(cm.getMode(), tok.state), state = inner.state;
        if (typingSlash && (tok.type == "string" || tok.string.charAt(0) != "<" || tok.start != pos.ch - 1))
          return CodeMirror.Pass;
        var replacement, mixed = inner.mode.name != "xml" && cm.getMode().name == "htmlmixed";
        if (mixed && inner.mode.name == "javascript") {
          replacement = head + "script";
        } else if (mixed && inner.mode.name == "css") {
          replacement = head + "style";
        } else {
          var context = inner.mode.xmlCurrentContext && inner.mode.xmlCurrentContext(state);
          var top = context.length ? context[context.length - 1] : "";
          if (!context || context.length && closingTagExists(cm, context, top, pos))
            return CodeMirror.Pass;
          replacement = head + top;
        }
        if (cm.getLine(pos.line).charAt(tok.end) != ">")
          replacement += ">";
        replacements[i] = replacement;
      }
      cm.replaceSelections(replacements);
      ranges = cm.listSelections();
      if (!dontIndentOnAutoClose) {
        for (var i = 0; i < ranges.length; i++)
          if (i == ranges.length - 1 || ranges[i].head.line < ranges[i + 1].head.line)
            cm.indentLine(ranges[i].head.line);
      }
    }
    function autoCloseSlash(cm) {
      if (cm.getOption("disableInput"))
        return CodeMirror.Pass;
      return autoCloseCurrent(cm, true);
    }
    CodeMirror.commands.closeTag = function(cm) {
      return autoCloseCurrent(cm);
    };
    function indexOf(collection, elt) {
      if (collection.indexOf)
        return collection.indexOf(elt);
      for (var i = 0, e = collection.length; i < e; ++i)
        if (collection[i] == elt)
          return i;
      return -1;
    }
    function closingTagExists(cm, context, tagName, pos, newTag) {
      if (!CodeMirror.scanForClosingTag)
        return false;
      var end = Math.min(cm.lastLine() + 1, pos.line + 500);
      var nextClose = CodeMirror.scanForClosingTag(cm, pos, null, end);
      if (!nextClose || nextClose.tag != tagName)
        return false;
      var onCx = newTag ? 1 : 0;
      for (var i = context.length - 1; i >= 0; i--) {
        if (context[i] == tagName)
          ++onCx;
        else
          break;
      }
      pos = nextClose.to;
      for (var i = 1; i < onCx; i++) {
        var next = CodeMirror.scanForClosingTag(cm, pos, null, end);
        if (!next || next.tag != tagName)
          return false;
        pos = next.to;
      }
      return true;
    }
  });
});

// dist/_snowpack/pkg/codemirror/addon/selection/active-line.js
var activeLine = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var WRAP_CLASS = "CodeMirror-activeline";
    var BACK_CLASS = "CodeMirror-activeline-background";
    var GUTT_CLASS = "CodeMirror-activeline-gutter";
    CodeMirror.defineOption("styleActiveLine", false, function(cm, val, old) {
      var prev = old == CodeMirror.Init ? false : old;
      if (val == prev)
        return;
      if (prev) {
        cm.off("beforeSelectionChange", selectionChange);
        clearActiveLines(cm);
        delete cm.state.activeLines;
      }
      if (val) {
        cm.state.activeLines = [];
        updateActiveLines(cm, cm.listSelections());
        cm.on("beforeSelectionChange", selectionChange);
      }
    });
    function clearActiveLines(cm) {
      for (var i = 0; i < cm.state.activeLines.length; i++) {
        cm.removeLineClass(cm.state.activeLines[i], "wrap", WRAP_CLASS);
        cm.removeLineClass(cm.state.activeLines[i], "background", BACK_CLASS);
        cm.removeLineClass(cm.state.activeLines[i], "gutter", GUTT_CLASS);
      }
    }
    function sameArray(a, b) {
      if (a.length != b.length)
        return false;
      for (var i = 0; i < a.length; i++)
        if (a[i] != b[i])
          return false;
      return true;
    }
    function updateActiveLines(cm, ranges) {
      var active = [];
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];
        var option = cm.getOption("styleActiveLine");
        if (typeof option == "object" && option.nonEmpty ? range.anchor.line != range.head.line : !range.empty())
          continue;
        var line = cm.getLineHandleVisualStart(range.head.line);
        if (active[active.length - 1] != line)
          active.push(line);
      }
      if (sameArray(cm.state.activeLines, active))
        return;
      cm.operation(function() {
        clearActiveLines(cm);
        for (var i2 = 0; i2 < active.length; i2++) {
          cm.addLineClass(active[i2], "wrap", WRAP_CLASS);
          cm.addLineClass(active[i2], "background", BACK_CLASS);
          cm.addLineClass(active[i2], "gutter", GUTT_CLASS);
        }
        cm.state.activeLines = active;
      });
    }
    function selectionChange(cm, sel) {
      updateActiveLines(cm, sel.ranges);
    }
  });
});

// dist/_snowpack/pkg/codemirror/addon/wrap/hardwrap.js
var hardwrap = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var Pos = CodeMirror.Pos;
    function findParagraph(cm, pos, options) {
      var startRE = options.paragraphStart || cm.getHelper(pos, "paragraphStart");
      for (var start = pos.line, first = cm.firstLine(); start > first; --start) {
        var line = cm.getLine(start);
        if (startRE && startRE.test(line))
          break;
        if (!/\S/.test(line)) {
          ++start;
          break;
        }
      }
      var endRE = options.paragraphEnd || cm.getHelper(pos, "paragraphEnd");
      for (var end = pos.line + 1, last = cm.lastLine(); end <= last; ++end) {
        var line = cm.getLine(end);
        if (endRE && endRE.test(line)) {
          ++end;
          break;
        }
        if (!/\S/.test(line))
          break;
      }
      return {from: start, to: end};
    }
    function findBreakPoint(text, column, wrapOn, killTrailingSpace, forceBreak) {
      var at = column;
      while (at < text.length && text.charAt(at) == " ")
        at++;
      for (; at > 0; --at)
        if (wrapOn.test(text.slice(at - 1, at + 1)))
          break;
      if (!forceBreak && at <= text.match(/^[ \t]*/)[0].length) {
        for (at = column + 1; at < text.length - 1; ++at) {
          if (wrapOn.test(text.slice(at - 1, at + 1)))
            break;
        }
      }
      for (var first = true; ; first = false) {
        var endOfText = at;
        if (killTrailingSpace)
          while (text.charAt(endOfText - 1) == " ")
            --endOfText;
        if (endOfText == 0 && first)
          at = column;
        else
          return {from: endOfText, to: at};
      }
    }
    function wrapRange(cm, from, to, options) {
      from = cm.clipPos(from);
      to = cm.clipPos(to);
      var column = options.column || 80;
      var wrapOn = options.wrapOn || /\s\S|-[^\.\d]/;
      var forceBreak = options.forceBreak !== false;
      var killTrailing = options.killTrailingSpace !== false;
      var changes = [], curLine = "", curNo = from.line;
      var lines = cm.getRange(from, to, false);
      if (!lines.length)
        return null;
      var leadingSpace = lines[0].match(/^[ \t]*/)[0];
      if (leadingSpace.length >= column)
        column = leadingSpace.length + 1;
      for (var i = 0; i < lines.length; ++i) {
        var text = lines[i], oldLen = curLine.length, spaceInserted = 0;
        if (curLine && text && !wrapOn.test(curLine.charAt(curLine.length - 1) + text.charAt(0))) {
          curLine += " ";
          spaceInserted = 1;
        }
        var spaceTrimmed = "";
        if (i) {
          spaceTrimmed = text.match(/^\s*/)[0];
          text = text.slice(spaceTrimmed.length);
        }
        curLine += text;
        if (i) {
          var firstBreak = curLine.length > column && leadingSpace == spaceTrimmed && findBreakPoint(curLine, column, wrapOn, killTrailing, forceBreak);
          if (!firstBreak || firstBreak.from != oldLen || firstBreak.to != oldLen + spaceInserted) {
            changes.push({
              text: [spaceInserted ? " " : ""],
              from: Pos(curNo, oldLen),
              to: Pos(curNo + 1, spaceTrimmed.length)
            });
          } else {
            curLine = leadingSpace + text;
            ++curNo;
          }
        }
        while (curLine.length > column) {
          var bp = findBreakPoint(curLine, column, wrapOn, killTrailing, forceBreak);
          if (bp.from != bp.to || forceBreak && leadingSpace !== curLine.slice(0, bp.to)) {
            changes.push({
              text: ["", leadingSpace],
              from: Pos(curNo, bp.from),
              to: Pos(curNo, bp.to)
            });
            curLine = leadingSpace + curLine.slice(bp.to);
            ++curNo;
          } else {
            break;
          }
        }
      }
      if (changes.length)
        cm.operation(function() {
          for (var i2 = 0; i2 < changes.length; ++i2) {
            var change = changes[i2];
            if (change.text || CodeMirror.cmpPos(change.from, change.to))
              cm.replaceRange(change.text, change.from, change.to);
          }
        });
      return changes.length ? {from: changes[0].from, to: CodeMirror.changeEnd(changes[changes.length - 1])} : null;
    }
    CodeMirror.defineExtension("wrapParagraph", function(pos, options) {
      options = options || {};
      if (!pos)
        pos = this.getCursor();
      var para = findParagraph(this, pos, options);
      return wrapRange(this, Pos(para.from, 0), Pos(para.to - 1), options);
    });
    CodeMirror.commands.wrapLines = function(cm) {
      cm.operation(function() {
        var ranges = cm.listSelections(), at = cm.lastLine() + 1;
        for (var i = ranges.length - 1; i >= 0; i--) {
          var range = ranges[i], span;
          if (range.empty()) {
            var para = findParagraph(cm, range.head, {});
            span = {from: Pos(para.from, 0), to: Pos(para.to - 1)};
          } else {
            span = {from: range.from(), to: range.to()};
          }
          if (span.to.line >= at)
            continue;
          at = span.from.line;
          wrapRange(cm, span.from, span.to, {});
        }
      });
    };
    CodeMirror.defineExtension("wrapRange", function(from, to, options) {
      return wrapRange(this, from, to, options || {});
    });
    CodeMirror.defineExtension("wrapParagraphsInRange", function(from, to, options) {
      options = options || {};
      var cm = this, paras = [];
      for (var line = from.line; line <= to.line; ) {
        var para = findParagraph(cm, Pos(line, 0), options);
        paras.push(para);
        line = para.to;
      }
      var madeChange = false;
      if (paras.length)
        cm.operation(function() {
          for (var i = paras.length - 1; i >= 0; --i)
            madeChange = madeChange || wrapRange(cm, Pos(paras[i].from, 0), Pos(paras[i].to - 1), options);
        });
      return madeChange;
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/hint/show-hint.js
var showHint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var HINT_ELEMENT_CLASS = "CodeMirror-hint";
    var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";
    CodeMirror.showHint = function(cm, getHints, options) {
      if (!getHints)
        return cm.showHint(options);
      if (options && options.async)
        getHints.async = true;
      var newOpts = {hint: getHints};
      if (options)
        for (var prop in options)
          newOpts[prop] = options[prop];
      return cm.showHint(newOpts);
    };
    CodeMirror.defineExtension("showHint", function(options) {
      options = parseOptions(this, this.getCursor("start"), options);
      var selections = this.listSelections();
      if (selections.length > 1)
        return;
      if (this.somethingSelected()) {
        if (!options.hint.supportsSelection)
          return;
        for (var i = 0; i < selections.length; i++)
          if (selections[i].head.line != selections[i].anchor.line)
            return;
      }
      if (this.state.completionActive)
        this.state.completionActive.close();
      var completion = this.state.completionActive = new Completion(this, options);
      if (!completion.options.hint)
        return;
      CodeMirror.signal(this, "startCompletion", this);
      completion.update(true);
    });
    CodeMirror.defineExtension("closeHint", function() {
      if (this.state.completionActive)
        this.state.completionActive.close();
    });
    function Completion(cm, options) {
      this.cm = cm;
      this.options = options;
      this.widget = null;
      this.debounce = 0;
      this.tick = 0;
      this.startPos = this.cm.getCursor("start");
      this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;
      if (this.options.updateOnCursorActivity) {
        var self2 = this;
        cm.on("cursorActivity", this.activityFunc = function() {
          self2.cursorActivity();
        });
      }
    }
    var requestAnimationFrame = window.requestAnimationFrame || function(fn) {
      return setTimeout(fn, 1e3 / 60);
    };
    var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
    Completion.prototype = {
      close: function() {
        if (!this.active())
          return;
        this.cm.state.completionActive = null;
        this.tick = null;
        if (this.options.updateOnCursorActivity) {
          this.cm.off("cursorActivity", this.activityFunc);
        }
        if (this.widget && this.data)
          CodeMirror.signal(this.data, "close");
        if (this.widget)
          this.widget.close();
        CodeMirror.signal(this.cm, "endCompletion", this.cm);
      },
      active: function() {
        return this.cm.state.completionActive == this;
      },
      pick: function(data, i) {
        var completion = data.list[i], self2 = this;
        this.cm.operation(function() {
          if (completion.hint)
            completion.hint(self2.cm, data, completion);
          else
            self2.cm.replaceRange(getText(completion), completion.from || data.from, completion.to || data.to, "complete");
          CodeMirror.signal(data, "pick", completion);
          self2.cm.scrollIntoView();
        });
        if (this.options.closeOnPick) {
          this.close();
        }
      },
      cursorActivity: function() {
        if (this.debounce) {
          cancelAnimationFrame(this.debounce);
          this.debounce = 0;
        }
        var identStart = this.startPos;
        if (this.data) {
          identStart = this.data.from;
        }
        var pos = this.cm.getCursor(), line = this.cm.getLine(pos.line);
        if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch || pos.ch < identStart.ch || this.cm.somethingSelected() || (!pos.ch || this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
          this.close();
        } else {
          var self2 = this;
          this.debounce = requestAnimationFrame(function() {
            self2.update();
          });
          if (this.widget)
            this.widget.disable();
        }
      },
      update: function(first) {
        if (this.tick == null)
          return;
        var self2 = this, myTick = ++this.tick;
        fetchHints(this.options.hint, this.cm, this.options, function(data) {
          if (self2.tick == myTick)
            self2.finishUpdate(data, first);
        });
      },
      finishUpdate: function(data, first) {
        if (this.data)
          CodeMirror.signal(this.data, "update");
        var picked = this.widget && this.widget.picked || first && this.options.completeSingle;
        if (this.widget)
          this.widget.close();
        this.data = data;
        if (data && data.list.length) {
          if (picked && data.list.length == 1) {
            this.pick(data, 0);
          } else {
            this.widget = new Widget(this, data);
            CodeMirror.signal(data, "shown");
          }
        }
      }
    };
    function parseOptions(cm, pos, options) {
      var editor = cm.options.hintOptions;
      var out = {};
      for (var prop in defaultOptions)
        out[prop] = defaultOptions[prop];
      if (editor) {
        for (var prop in editor)
          if (editor[prop] !== void 0)
            out[prop] = editor[prop];
      }
      if (options) {
        for (var prop in options)
          if (options[prop] !== void 0)
            out[prop] = options[prop];
      }
      if (out.hint.resolve)
        out.hint = out.hint.resolve(cm, pos);
      return out;
    }
    function getText(completion) {
      if (typeof completion == "string")
        return completion;
      else
        return completion.text;
    }
    function buildKeyMap(completion, handle) {
      var baseMap = {
        Up: function() {
          handle.moveFocus(-1);
        },
        Down: function() {
          handle.moveFocus(1);
        },
        PageUp: function() {
          handle.moveFocus(-handle.menuSize() + 1, true);
        },
        PageDown: function() {
          handle.moveFocus(handle.menuSize() - 1, true);
        },
        Home: function() {
          handle.setFocus(0);
        },
        End: function() {
          handle.setFocus(handle.length - 1);
        },
        Enter: handle.pick,
        Tab: handle.pick,
        Esc: handle.close
      };
      var mac = /Mac/.test(navigator.platform);
      if (mac) {
        baseMap["Ctrl-P"] = function() {
          handle.moveFocus(-1);
        };
        baseMap["Ctrl-N"] = function() {
          handle.moveFocus(1);
        };
      }
      var custom = completion.options.customKeys;
      var ourMap = custom ? {} : baseMap;
      function addBinding(key2, val) {
        var bound;
        if (typeof val != "string")
          bound = function(cm) {
            return val(cm, handle);
          };
        else if (baseMap.hasOwnProperty(val))
          bound = baseMap[val];
        else
          bound = val;
        ourMap[key2] = bound;
      }
      if (custom) {
        for (var key in custom)
          if (custom.hasOwnProperty(key))
            addBinding(key, custom[key]);
      }
      var extra = completion.options.extraKeys;
      if (extra) {
        for (var key in extra)
          if (extra.hasOwnProperty(key))
            addBinding(key, extra[key]);
      }
      return ourMap;
    }
    function getHintElement(hintsElement, el) {
      while (el && el != hintsElement) {
        if (el.nodeName.toUpperCase() === "LI" && el.parentNode == hintsElement)
          return el;
        el = el.parentNode;
      }
    }
    function Widget(completion, data) {
      this.id = "cm-complete-" + Math.floor(Math.random(1e6));
      this.completion = completion;
      this.data = data;
      this.picked = false;
      var widget = this, cm = completion.cm;
      var ownerDocument = cm.getInputField().ownerDocument;
      var parentWindow = ownerDocument.defaultView || ownerDocument.parentWindow;
      var hints = this.hints = ownerDocument.createElement("ul");
      hints.setAttribute("role", "listbox");
      hints.setAttribute("aria-expanded", "true");
      hints.id = this.id;
      var theme = completion.cm.options.theme;
      hints.className = "CodeMirror-hints " + theme;
      this.selectedHint = data.selectedHint || 0;
      var completions = data.list;
      for (var i = 0; i < completions.length; ++i) {
        var elt = hints.appendChild(ownerDocument.createElement("li")), cur = completions[i];
        var className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS);
        if (cur.className != null)
          className = cur.className + " " + className;
        elt.className = className;
        if (i == this.selectedHint)
          elt.setAttribute("aria-selected", "true");
        elt.id = this.id + "-" + i;
        elt.setAttribute("role", "option");
        if (cur.render)
          cur.render(elt, data, cur);
        else
          elt.appendChild(ownerDocument.createTextNode(cur.displayText || getText(cur)));
        elt.hintId = i;
      }
      var container = completion.options.container || ownerDocument.body;
      var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
      var left = pos.left, top = pos.bottom, below = true;
      var offsetLeft = 0, offsetTop = 0;
      if (container !== ownerDocument.body) {
        var isContainerPositioned = ["absolute", "relative", "fixed"].indexOf(parentWindow.getComputedStyle(container).position) !== -1;
        var offsetParent = isContainerPositioned ? container : container.offsetParent;
        var offsetParentPosition = offsetParent.getBoundingClientRect();
        var bodyPosition = ownerDocument.body.getBoundingClientRect();
        offsetLeft = offsetParentPosition.left - bodyPosition.left - offsetParent.scrollLeft;
        offsetTop = offsetParentPosition.top - bodyPosition.top - offsetParent.scrollTop;
      }
      hints.style.left = left - offsetLeft + "px";
      hints.style.top = top - offsetTop + "px";
      var winW = parentWindow.innerWidth || Math.max(ownerDocument.body.offsetWidth, ownerDocument.documentElement.offsetWidth);
      var winH = parentWindow.innerHeight || Math.max(ownerDocument.body.offsetHeight, ownerDocument.documentElement.offsetHeight);
      container.appendChild(hints);
      cm.getInputField().setAttribute("aria-autocomplete", "list");
      cm.getInputField().setAttribute("aria-owns", this.id);
      cm.getInputField().setAttribute("aria-activedescendant", this.id + "-" + this.selectedHint);
      var box = completion.options.moveOnOverlap ? hints.getBoundingClientRect() : new DOMRect();
      var scrolls = completion.options.paddingForScrollbar ? hints.scrollHeight > hints.clientHeight + 1 : false;
      var startScroll;
      setTimeout(function() {
        startScroll = cm.getScrollInfo();
      });
      var overlapY = box.bottom - winH;
      if (overlapY > 0) {
        var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
        if (curTop - height > 0) {
          hints.style.top = (top = pos.top - height - offsetTop) + "px";
          below = false;
        } else if (height > winH) {
          hints.style.height = winH - 5 + "px";
          hints.style.top = (top = pos.bottom - box.top - offsetTop) + "px";
          var cursor = cm.getCursor();
          if (data.from.ch != cursor.ch) {
            pos = cm.cursorCoords(cursor);
            hints.style.left = (left = pos.left - offsetLeft) + "px";
            box = hints.getBoundingClientRect();
          }
        }
      }
      var overlapX = box.right - winW;
      if (scrolls)
        overlapX += cm.display.nativeBarWidth;
      if (overlapX > 0) {
        if (box.right - box.left > winW) {
          hints.style.width = winW - 5 + "px";
          overlapX -= box.right - box.left - winW;
        }
        hints.style.left = (left = Math.max(pos.left - overlapX - offsetLeft, 0)) + "px";
      }
      if (scrolls)
        for (var node = hints.firstChild; node; node = node.nextSibling)
          node.style.paddingRight = cm.display.nativeBarWidth + "px";
      cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
        moveFocus: function(n, avoidWrap) {
          widget.changeActive(widget.selectedHint + n, avoidWrap);
        },
        setFocus: function(n) {
          widget.changeActive(n);
        },
        menuSize: function() {
          return widget.screenAmount();
        },
        length: completions.length,
        close: function() {
          completion.close();
        },
        pick: function() {
          widget.pick();
        },
        data
      }));
      if (completion.options.closeOnUnfocus) {
        var closingOnBlur;
        cm.on("blur", this.onBlur = function() {
          closingOnBlur = setTimeout(function() {
            completion.close();
          }, 100);
        });
        cm.on("focus", this.onFocus = function() {
          clearTimeout(closingOnBlur);
        });
      }
      cm.on("scroll", this.onScroll = function() {
        var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect();
        if (!startScroll)
          startScroll = cm.getScrollInfo();
        var newTop = top + startScroll.top - curScroll.top;
        var point = newTop - (parentWindow.pageYOffset || (ownerDocument.documentElement || ownerDocument.body).scrollTop);
        if (!below)
          point += hints.offsetHeight;
        if (point <= editor.top || point >= editor.bottom)
          return completion.close();
        hints.style.top = newTop + "px";
        hints.style.left = left + startScroll.left - curScroll.left + "px";
      });
      CodeMirror.on(hints, "dblclick", function(e) {
        var t = getHintElement(hints, e.target || e.srcElement);
        if (t && t.hintId != null) {
          widget.changeActive(t.hintId);
          widget.pick();
        }
      });
      CodeMirror.on(hints, "click", function(e) {
        var t = getHintElement(hints, e.target || e.srcElement);
        if (t && t.hintId != null) {
          widget.changeActive(t.hintId);
          if (completion.options.completeOnSingleClick)
            widget.pick();
        }
      });
      CodeMirror.on(hints, "mousedown", function() {
        setTimeout(function() {
          cm.focus();
        }, 20);
      });
      var selectedHintRange = this.getSelectedHintRange();
      if (selectedHintRange.from !== 0 || selectedHintRange.to !== 0) {
        this.scrollToActive();
      }
      CodeMirror.signal(data, "select", completions[this.selectedHint], hints.childNodes[this.selectedHint]);
      return true;
    }
    Widget.prototype = {
      close: function() {
        if (this.completion.widget != this)
          return;
        this.completion.widget = null;
        if (this.hints.parentNode)
          this.hints.parentNode.removeChild(this.hints);
        this.completion.cm.removeKeyMap(this.keyMap);
        var input = this.completion.cm.getInputField();
        input.removeAttribute("aria-activedescendant");
        input.removeAttribute("aria-owns");
        var cm = this.completion.cm;
        if (this.completion.options.closeOnUnfocus) {
          cm.off("blur", this.onBlur);
          cm.off("focus", this.onFocus);
        }
        cm.off("scroll", this.onScroll);
      },
      disable: function() {
        this.completion.cm.removeKeyMap(this.keyMap);
        var widget = this;
        this.keyMap = {Enter: function() {
          widget.picked = true;
        }};
        this.completion.cm.addKeyMap(this.keyMap);
      },
      pick: function() {
        this.completion.pick(this.data, this.selectedHint);
      },
      changeActive: function(i, avoidWrap) {
        if (i >= this.data.list.length)
          i = avoidWrap ? this.data.list.length - 1 : 0;
        else if (i < 0)
          i = avoidWrap ? 0 : this.data.list.length - 1;
        if (this.selectedHint == i)
          return;
        var node = this.hints.childNodes[this.selectedHint];
        if (node) {
          node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
          node.removeAttribute("aria-selected");
        }
        node = this.hints.childNodes[this.selectedHint = i];
        node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
        node.setAttribute("aria-selected", "true");
        this.completion.cm.getInputField().setAttribute("aria-activedescendant", node.id);
        this.scrollToActive();
        CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], node);
      },
      scrollToActive: function() {
        var selectedHintRange = this.getSelectedHintRange();
        var node1 = this.hints.childNodes[selectedHintRange.from];
        var node2 = this.hints.childNodes[selectedHintRange.to];
        var firstNode = this.hints.firstChild;
        if (node1.offsetTop < this.hints.scrollTop)
          this.hints.scrollTop = node1.offsetTop - firstNode.offsetTop;
        else if (node2.offsetTop + node2.offsetHeight > this.hints.scrollTop + this.hints.clientHeight)
          this.hints.scrollTop = node2.offsetTop + node2.offsetHeight - this.hints.clientHeight + firstNode.offsetTop;
      },
      screenAmount: function() {
        return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
      },
      getSelectedHintRange: function() {
        var margin = this.completion.options.scrollMargin || 0;
        return {
          from: Math.max(0, this.selectedHint - margin),
          to: Math.min(this.data.list.length - 1, this.selectedHint + margin)
        };
      }
    };
    function applicableHelpers(cm, helpers) {
      if (!cm.somethingSelected())
        return helpers;
      var result = [];
      for (var i = 0; i < helpers.length; i++)
        if (helpers[i].supportsSelection)
          result.push(helpers[i]);
      return result;
    }
    function fetchHints(hint, cm, options, callback) {
      if (hint.async) {
        hint(cm, callback, options);
      } else {
        var result = hint(cm, options);
        if (result && result.then)
          result.then(callback);
        else
          callback(result);
      }
    }
    function resolveAutoHints(cm, pos) {
      var helpers = cm.getHelpers(pos, "hint"), words;
      if (helpers.length) {
        var resolved = function(cm2, callback, options) {
          var app = applicableHelpers(cm2, helpers);
          function run(i) {
            if (i == app.length)
              return callback(null);
            fetchHints(app[i], cm2, options, function(result) {
              if (result && result.list.length > 0)
                callback(result);
              else
                run(i + 1);
            });
          }
          run(0);
        };
        resolved.async = true;
        resolved.supportsSelection = true;
        return resolved;
      } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
        return function(cm2) {
          return CodeMirror.hint.fromList(cm2, {words});
        };
      } else if (CodeMirror.hint.anyword) {
        return function(cm2, options) {
          return CodeMirror.hint.anyword(cm2, options);
        };
      } else {
        return function() {
        };
      }
    }
    CodeMirror.registerHelper("hint", "auto", {
      resolve: resolveAutoHints
    });
    CodeMirror.registerHelper("hint", "fromList", function(cm, options) {
      var cur = cm.getCursor(), token = cm.getTokenAt(cur);
      var term, from = CodeMirror.Pos(cur.line, token.start), to = cur;
      if (token.start < cur.ch && /\w/.test(token.string.charAt(cur.ch - token.start - 1))) {
        term = token.string.substr(0, cur.ch - token.start);
      } else {
        term = "";
        from = cur;
      }
      var found = [];
      for (var i = 0; i < options.words.length; i++) {
        var word = options.words[i];
        if (word.slice(0, term.length) == term)
          found.push(word);
      }
      if (found.length)
        return {list: found, from, to};
    });
    CodeMirror.commands.autocomplete = CodeMirror.showHint;
    var defaultOptions = {
      hint: CodeMirror.hint.auto,
      completeSingle: true,
      alignWithWord: true,
      closeCharacters: /[\s()\[\]{};:>,]/,
      closeOnPick: true,
      closeOnUnfocus: true,
      updateOnCursorActivity: true,
      completeOnSingleClick: true,
      container: null,
      customKeys: null,
      extraKeys: null,
      paddingForScrollbar: true,
      moveOnOverlap: true
    };
    CodeMirror.defineOption("hintOptions", null);
  });
});

// dist/_snowpack/pkg/codemirror/addon/hint/xml-hint.js
var xmlHint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var Pos = CodeMirror.Pos;
    function matches(hint, typed, matchInMiddle) {
      if (matchInMiddle)
        return hint.indexOf(typed) >= 0;
      else
        return hint.lastIndexOf(typed, 0) == 0;
    }
    function getHints(cm, options) {
      var tags = options && options.schemaInfo;
      var quote = options && options.quoteChar || '"';
      var matchInMiddle = options && options.matchInMiddle;
      if (!tags)
        return;
      var cur = cm.getCursor(), token = cm.getTokenAt(cur);
      if (token.end > cur.ch) {
        token.end = cur.ch;
        token.string = token.string.slice(0, cur.ch - token.start);
      }
      var inner = CodeMirror.innerMode(cm.getMode(), token.state);
      if (!inner.mode.xmlCurrentTag)
        return;
      var result = [], replaceToken = false, prefix;
      var tag = /\btag\b/.test(token.type) && !/>$/.test(token.string);
      var tagName = tag && /^\w/.test(token.string), tagStart;
      if (tagName) {
        var before = cm.getLine(cur.line).slice(Math.max(0, token.start - 2), token.start);
        var tagType = /<\/$/.test(before) ? "close" : /<$/.test(before) ? "open" : null;
        if (tagType)
          tagStart = token.start - (tagType == "close" ? 2 : 1);
      } else if (tag && token.string == "<") {
        tagType = "open";
      } else if (tag && token.string == "</") {
        tagType = "close";
      }
      var tagInfo = inner.mode.xmlCurrentTag(inner.state);
      if (!tag && !tagInfo || tagType) {
        if (tagName)
          prefix = token.string;
        replaceToken = tagType;
        var context = inner.mode.xmlCurrentContext ? inner.mode.xmlCurrentContext(inner.state) : [];
        var inner = context.length && context[context.length - 1];
        var curTag = inner && tags[inner];
        var childList = inner ? curTag && curTag.children : tags["!top"];
        if (childList && tagType != "close") {
          for (var i = 0; i < childList.length; ++i)
            if (!prefix || matches(childList[i], prefix, matchInMiddle))
              result.push("<" + childList[i]);
        } else if (tagType != "close") {
          for (var name in tags)
            if (tags.hasOwnProperty(name) && name != "!top" && name != "!attrs" && (!prefix || matches(name, prefix, matchInMiddle)))
              result.push("<" + name);
        }
        if (inner && (!prefix || tagType == "close" && matches(inner, prefix, matchInMiddle)))
          result.push("</" + inner + ">");
      } else {
        var curTag = tagInfo && tags[tagInfo.name], attrs = curTag && curTag.attrs;
        var globalAttrs = tags["!attrs"];
        if (!attrs && !globalAttrs)
          return;
        if (!attrs) {
          attrs = globalAttrs;
        } else if (globalAttrs) {
          var set = {};
          for (var nm in globalAttrs)
            if (globalAttrs.hasOwnProperty(nm))
              set[nm] = globalAttrs[nm];
          for (var nm in attrs)
            if (attrs.hasOwnProperty(nm))
              set[nm] = attrs[nm];
          attrs = set;
        }
        if (token.type == "string" || token.string == "=") {
          var before = cm.getRange(Pos(cur.line, Math.max(0, cur.ch - 60)), Pos(cur.line, token.type == "string" ? token.start : token.end));
          var atName = before.match(/([^\s\u00a0=<>\"\']+)=$/), atValues;
          if (!atName || !attrs.hasOwnProperty(atName[1]) || !(atValues = attrs[atName[1]]))
            return;
          if (typeof atValues == "function")
            atValues = atValues.call(this, cm);
          if (token.type == "string") {
            prefix = token.string;
            var n = 0;
            if (/['"]/.test(token.string.charAt(0))) {
              quote = token.string.charAt(0);
              prefix = token.string.slice(1);
              n++;
            }
            var len = token.string.length;
            if (/['"]/.test(token.string.charAt(len - 1))) {
              quote = token.string.charAt(len - 1);
              prefix = token.string.substr(n, len - 2);
            }
            if (n) {
              var line = cm.getLine(cur.line);
              if (line.length > token.end && line.charAt(token.end) == quote)
                token.end++;
            }
            replaceToken = true;
          }
          var returnHintsFromAtValues = function(atValues2) {
            if (atValues2) {
              for (var i2 = 0; i2 < atValues2.length; ++i2)
                if (!prefix || matches(atValues2[i2], prefix, matchInMiddle))
                  result.push(quote + atValues2[i2] + quote);
            }
            return returnHints();
          };
          if (atValues && atValues.then)
            return atValues.then(returnHintsFromAtValues);
          return returnHintsFromAtValues(atValues);
        } else {
          if (token.type == "attribute") {
            prefix = token.string;
            replaceToken = true;
          }
          for (var attr in attrs)
            if (attrs.hasOwnProperty(attr) && (!prefix || matches(attr, prefix, matchInMiddle)))
              result.push(attr);
        }
      }
      function returnHints() {
        return {
          list: result,
          from: replaceToken ? Pos(cur.line, tagStart == null ? token.start : tagStart) : cur,
          to: replaceToken ? Pos(cur.line, token.end) : cur
        };
      }
      return returnHints();
    }
    CodeMirror.registerHelper("hint", "xml", getHints);
  });
});
var xml_hint_default = xmlHint;

// dist/_snowpack/pkg/codemirror/addon/hint/html-hint.js
var htmlHint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror, xml_hint_default);
  })(function(CodeMirror) {
    var langs = "ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu".split(" ");
    var targets = ["_blank", "_self", "_top", "_parent"];
    var charsets = ["ascii", "utf-8", "utf-16", "latin1", "latin1"];
    var methods = ["get", "post", "put", "delete"];
    var encs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
    var media = [
      "all",
      "screen",
      "print",
      "embossed",
      "braille",
      "handheld",
      "print",
      "projection",
      "screen",
      "tty",
      "tv",
      "speech",
      "3d-glasses",
      "resolution [>][<][=] [X]",
      "device-aspect-ratio: X/Y",
      "orientation:portrait",
      "orientation:landscape",
      "device-height: [X]",
      "device-width: [X]"
    ];
    var s = {attrs: {}};
    var data = {
      a: {
        attrs: {
          href: null,
          ping: null,
          type: null,
          media,
          target: targets,
          hreflang: langs
        }
      },
      abbr: s,
      acronym: s,
      address: s,
      applet: s,
      area: {
        attrs: {
          alt: null,
          coords: null,
          href: null,
          target: null,
          ping: null,
          media,
          hreflang: langs,
          type: null,
          shape: ["default", "rect", "circle", "poly"]
        }
      },
      article: s,
      aside: s,
      audio: {
        attrs: {
          src: null,
          mediagroup: null,
          crossorigin: ["anonymous", "use-credentials"],
          preload: ["none", "metadata", "auto"],
          autoplay: ["", "autoplay"],
          loop: ["", "loop"],
          controls: ["", "controls"]
        }
      },
      b: s,
      base: {attrs: {href: null, target: targets}},
      basefont: s,
      bdi: s,
      bdo: s,
      big: s,
      blockquote: {attrs: {cite: null}},
      body: s,
      br: s,
      button: {
        attrs: {
          form: null,
          formaction: null,
          name: null,
          value: null,
          autofocus: ["", "autofocus"],
          disabled: ["", "autofocus"],
          formenctype: encs,
          formmethod: methods,
          formnovalidate: ["", "novalidate"],
          formtarget: targets,
          type: ["submit", "reset", "button"]
        }
      },
      canvas: {attrs: {width: null, height: null}},
      caption: s,
      center: s,
      cite: s,
      code: s,
      col: {attrs: {span: null}},
      colgroup: {attrs: {span: null}},
      command: {
        attrs: {
          type: ["command", "checkbox", "radio"],
          label: null,
          icon: null,
          radiogroup: null,
          command: null,
          title: null,
          disabled: ["", "disabled"],
          checked: ["", "checked"]
        }
      },
      data: {attrs: {value: null}},
      datagrid: {attrs: {disabled: ["", "disabled"], multiple: ["", "multiple"]}},
      datalist: {attrs: {data: null}},
      dd: s,
      del: {attrs: {cite: null, datetime: null}},
      details: {attrs: {open: ["", "open"]}},
      dfn: s,
      dir: s,
      div: s,
      dialog: {attrs: {open: null}},
      dl: s,
      dt: s,
      em: s,
      embed: {attrs: {src: null, type: null, width: null, height: null}},
      eventsource: {attrs: {src: null}},
      fieldset: {attrs: {disabled: ["", "disabled"], form: null, name: null}},
      figcaption: s,
      figure: s,
      font: s,
      footer: s,
      form: {
        attrs: {
          action: null,
          name: null,
          "accept-charset": charsets,
          autocomplete: ["on", "off"],
          enctype: encs,
          method: methods,
          novalidate: ["", "novalidate"],
          target: targets
        }
      },
      frame: s,
      frameset: s,
      h1: s,
      h2: s,
      h3: s,
      h4: s,
      h5: s,
      h6: s,
      head: {
        attrs: {},
        children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
      },
      header: s,
      hgroup: s,
      hr: s,
      html: {
        attrs: {manifest: null},
        children: ["head", "body"]
      },
      i: s,
      iframe: {
        attrs: {
          src: null,
          srcdoc: null,
          name: null,
          width: null,
          height: null,
          sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
          seamless: ["", "seamless"]
        }
      },
      img: {
        attrs: {
          alt: null,
          src: null,
          ismap: null,
          usemap: null,
          width: null,
          height: null,
          crossorigin: ["anonymous", "use-credentials"]
        }
      },
      input: {
        attrs: {
          alt: null,
          dirname: null,
          form: null,
          formaction: null,
          height: null,
          list: null,
          max: null,
          maxlength: null,
          min: null,
          name: null,
          pattern: null,
          placeholder: null,
          size: null,
          src: null,
          step: null,
          value: null,
          width: null,
          accept: ["audio/*", "video/*", "image/*"],
          autocomplete: ["on", "off"],
          autofocus: ["", "autofocus"],
          checked: ["", "checked"],
          disabled: ["", "disabled"],
          formenctype: encs,
          formmethod: methods,
          formnovalidate: ["", "novalidate"],
          formtarget: targets,
          multiple: ["", "multiple"],
          readonly: ["", "readonly"],
          required: ["", "required"],
          type: [
            "hidden",
            "text",
            "search",
            "tel",
            "url",
            "email",
            "password",
            "datetime",
            "date",
            "month",
            "week",
            "time",
            "datetime-local",
            "number",
            "range",
            "color",
            "checkbox",
            "radio",
            "file",
            "submit",
            "image",
            "reset",
            "button"
          ]
        }
      },
      ins: {attrs: {cite: null, datetime: null}},
      kbd: s,
      keygen: {
        attrs: {
          challenge: null,
          form: null,
          name: null,
          autofocus: ["", "autofocus"],
          disabled: ["", "disabled"],
          keytype: ["RSA"]
        }
      },
      label: {attrs: {for: null, form: null}},
      legend: s,
      li: {attrs: {value: null}},
      link: {
        attrs: {
          href: null,
          type: null,
          hreflang: langs,
          media,
          sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
        }
      },
      map: {attrs: {name: null}},
      mark: s,
      menu: {attrs: {label: null, type: ["list", "context", "toolbar"]}},
      meta: {
        attrs: {
          content: null,
          charset: charsets,
          name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
          "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
        }
      },
      meter: {attrs: {value: null, min: null, low: null, high: null, max: null, optimum: null}},
      nav: s,
      noframes: s,
      noscript: s,
      object: {
        attrs: {
          data: null,
          type: null,
          name: null,
          usemap: null,
          form: null,
          width: null,
          height: null,
          typemustmatch: ["", "typemustmatch"]
        }
      },
      ol: {attrs: {reversed: ["", "reversed"], start: null, type: ["1", "a", "A", "i", "I"]}},
      optgroup: {attrs: {disabled: ["", "disabled"], label: null}},
      option: {attrs: {disabled: ["", "disabled"], label: null, selected: ["", "selected"], value: null}},
      output: {attrs: {for: null, form: null, name: null}},
      p: s,
      param: {attrs: {name: null, value: null}},
      pre: s,
      progress: {attrs: {value: null, max: null}},
      q: {attrs: {cite: null}},
      rp: s,
      rt: s,
      ruby: s,
      s,
      samp: s,
      script: {
        attrs: {
          type: ["text/javascript"],
          src: null,
          async: ["", "async"],
          defer: ["", "defer"],
          charset: charsets
        }
      },
      section: s,
      select: {
        attrs: {
          form: null,
          name: null,
          size: null,
          autofocus: ["", "autofocus"],
          disabled: ["", "disabled"],
          multiple: ["", "multiple"]
        }
      },
      small: s,
      source: {attrs: {src: null, type: null, media: null}},
      span: s,
      strike: s,
      strong: s,
      style: {
        attrs: {
          type: ["text/css"],
          media,
          scoped: null
        }
      },
      sub: s,
      summary: s,
      sup: s,
      table: s,
      tbody: s,
      td: {attrs: {colspan: null, rowspan: null, headers: null}},
      textarea: {
        attrs: {
          dirname: null,
          form: null,
          maxlength: null,
          name: null,
          placeholder: null,
          rows: null,
          cols: null,
          autofocus: ["", "autofocus"],
          disabled: ["", "disabled"],
          readonly: ["", "readonly"],
          required: ["", "required"],
          wrap: ["soft", "hard"]
        }
      },
      tfoot: s,
      th: {attrs: {colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"]}},
      thead: s,
      time: {attrs: {datetime: null}},
      title: s,
      tr: s,
      track: {
        attrs: {
          src: null,
          label: null,
          default: null,
          kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
          srclang: langs
        }
      },
      tt: s,
      u: s,
      ul: s,
      var: s,
      video: {
        attrs: {
          src: null,
          poster: null,
          width: null,
          height: null,
          crossorigin: ["anonymous", "use-credentials"],
          preload: ["auto", "metadata", "none"],
          autoplay: ["", "autoplay"],
          mediagroup: ["movie"],
          muted: ["", "muted"],
          controls: ["", "controls"]
        }
      },
      wbr: s
    };
    var globalAttrs = {
      accesskey: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      class: null,
      contenteditable: ["true", "false"],
      contextmenu: null,
      dir: ["ltr", "rtl", "auto"],
      draggable: ["true", "false", "auto"],
      dropzone: ["copy", "move", "link", "string:", "file:"],
      hidden: ["hidden"],
      id: null,
      inert: ["inert"],
      itemid: null,
      itemprop: null,
      itemref: null,
      itemscope: ["itemscope"],
      itemtype: null,
      lang: ["en", "es"],
      spellcheck: ["true", "false"],
      autocorrect: ["true", "false"],
      autocapitalize: ["true", "false"],
      style: null,
      tabindex: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      title: null,
      translate: ["yes", "no"],
      onclick: null,
      rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"]
    };
    function populate(obj) {
      for (var attr in globalAttrs)
        if (globalAttrs.hasOwnProperty(attr))
          obj.attrs[attr] = globalAttrs[attr];
    }
    populate(s);
    for (var tag in data)
      if (data.hasOwnProperty(tag) && data[tag] != s)
        populate(data[tag]);
    CodeMirror.htmlSchema = data;
    function htmlHint2(cm, options) {
      var local = {schemaInfo: data};
      if (options)
        for (var opt in options)
          local[opt] = options[opt];
      return CodeMirror.hint.xml(cm, local);
    }
    CodeMirror.registerHelper("hint", "html", htmlHint2);
  });
});

// dist/_snowpack/pkg/codemirror/addon/hint/css-hint.js
var cssHint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror, css_default);
  })(function(CodeMirror) {
    var pseudoClasses = {
      active: 1,
      after: 1,
      before: 1,
      checked: 1,
      default: 1,
      disabled: 1,
      empty: 1,
      enabled: 1,
      "first-child": 1,
      "first-letter": 1,
      "first-line": 1,
      "first-of-type": 1,
      focus: 1,
      hover: 1,
      "in-range": 1,
      indeterminate: 1,
      invalid: 1,
      lang: 1,
      "last-child": 1,
      "last-of-type": 1,
      link: 1,
      not: 1,
      "nth-child": 1,
      "nth-last-child": 1,
      "nth-last-of-type": 1,
      "nth-of-type": 1,
      "only-of-type": 1,
      "only-child": 1,
      optional: 1,
      "out-of-range": 1,
      placeholder: 1,
      "read-only": 1,
      "read-write": 1,
      required: 1,
      root: 1,
      selection: 1,
      target: 1,
      valid: 1,
      visited: 1
    };
    CodeMirror.registerHelper("hint", "css", function(cm) {
      var cur = cm.getCursor(), token = cm.getTokenAt(cur);
      var inner = CodeMirror.innerMode(cm.getMode(), token.state);
      if (inner.mode.name != "css")
        return;
      if (token.type == "keyword" && "!important".indexOf(token.string) == 0)
        return {
          list: ["!important"],
          from: CodeMirror.Pos(cur.line, token.start),
          to: CodeMirror.Pos(cur.line, token.end)
        };
      var start = token.start, end = cur.ch, word = token.string.slice(0, end - start);
      if (/[^\w$_-]/.test(word)) {
        word = "";
        start = end = cur.ch;
      }
      var spec = CodeMirror.resolveMode("text/css");
      var result = [];
      function add(keywords) {
        for (var name in keywords)
          if (!word || name.lastIndexOf(word, 0) == 0)
            result.push(name);
      }
      var st = inner.state.state;
      if (st == "pseudo" || token.type == "variable-3") {
        add(pseudoClasses);
      } else if (st == "block" || st == "maybeprop") {
        add(spec.propertyKeywords);
      } else if (st == "prop" || st == "parens" || st == "at" || st == "params") {
        add(spec.valueKeywords);
        add(spec.colorKeywords);
      } else if (st == "media" || st == "media_parens") {
        add(spec.mediaTypes);
        add(spec.mediaFeatures);
      }
      if (result.length)
        return {
          list: result,
          from: CodeMirror.Pos(cur.line, start),
          to: CodeMirror.Pos(cur.line, end)
        };
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/hint/javascript-hint.js
var javascriptHint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var Pos = CodeMirror.Pos;
    function forEach(arr, f) {
      for (var i = 0, e = arr.length; i < e; ++i)
        f(arr[i]);
    }
    function arrayContains(arr, item) {
      if (!Array.prototype.indexOf) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === item) {
            return true;
          }
        }
        return false;
      }
      return arr.indexOf(item) != -1;
    }
    function scriptHint(editor, keywords, getToken, options) {
      var cur = editor.getCursor(), token = getToken(editor, cur);
      if (/\b(?:string|comment)\b/.test(token.type))
        return;
      var innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
      if (innerMode.mode.helperType === "json")
        return;
      token.state = innerMode.state;
      if (!/^[\w$_]*$/.test(token.string)) {
        token = {
          start: cur.ch,
          end: cur.ch,
          string: "",
          state: token.state,
          type: token.string == "." ? "property" : null
        };
      } else if (token.end > cur.ch) {
        token.end = cur.ch;
        token.string = token.string.slice(0, cur.ch - token.start);
      }
      var tprop = token;
      while (tprop.type == "property") {
        tprop = getToken(editor, Pos(cur.line, tprop.start));
        if (tprop.string != ".")
          return;
        tprop = getToken(editor, Pos(cur.line, tprop.start));
        if (!context)
          var context = [];
        context.push(tprop);
      }
      return {
        list: getCompletions(token, context, keywords, options),
        from: Pos(cur.line, token.start),
        to: Pos(cur.line, token.end)
      };
    }
    function javascriptHint2(editor, options) {
      return scriptHint(editor, javascriptKeywords, function(e, cur) {
        return e.getTokenAt(cur);
      }, options);
    }
    CodeMirror.registerHelper("hint", "javascript", javascriptHint2);
    function getCoffeeScriptToken(editor, cur) {
      var token = editor.getTokenAt(cur);
      if (cur.ch == token.start + 1 && token.string.charAt(0) == ".") {
        token.end = token.start;
        token.string = ".";
        token.type = "property";
      } else if (/^\.[\w$_]*$/.test(token.string)) {
        token.type = "property";
        token.start++;
        token.string = token.string.replace(/\./, "");
      }
      return token;
    }
    function coffeescriptHint(editor, options) {
      return scriptHint(editor, coffeescriptKeywords, getCoffeeScriptToken, options);
    }
    CodeMirror.registerHelper("hint", "coffeescript", coffeescriptHint);
    var stringProps = "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" ");
    var arrayProps = "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" ");
    var funcProps = "prototype apply call bind".split(" ");
    var javascriptKeywords = "break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(" ");
    var coffeescriptKeywords = "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ");
    function forAllProps(obj, callback) {
      if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
        for (var name in obj)
          callback(name);
      } else {
        for (var o = obj; o; o = Object.getPrototypeOf(o))
          Object.getOwnPropertyNames(o).forEach(callback);
      }
    }
    function getCompletions(token, context, keywords, options) {
      var found = [], start = token.string, global2 = options && options.globalScope || window;
      function maybeAdd(str) {
        if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str))
          found.push(str);
      }
      function gatherCompletions(obj2) {
        if (typeof obj2 == "string")
          forEach(stringProps, maybeAdd);
        else if (obj2 instanceof Array)
          forEach(arrayProps, maybeAdd);
        else if (obj2 instanceof Function)
          forEach(funcProps, maybeAdd);
        forAllProps(obj2, maybeAdd);
      }
      if (context && context.length) {
        var obj = context.pop(), base;
        if (obj.type && obj.type.indexOf("variable") === 0) {
          if (options && options.additionalContext)
            base = options.additionalContext[obj.string];
          if (!options || options.useGlobalScope !== false)
            base = base || global2[obj.string];
        } else if (obj.type == "string") {
          base = "";
        } else if (obj.type == "atom") {
          base = 1;
        } else if (obj.type == "function") {
          if (global2.jQuery != null && (obj.string == "$" || obj.string == "jQuery") && typeof global2.jQuery == "function")
            base = global2.jQuery();
          else if (global2._ != null && obj.string == "_" && typeof global2._ == "function")
            base = global2._();
        }
        while (base != null && context.length)
          base = base[context.pop().string];
        if (base != null)
          gatherCompletions(base);
      } else {
        for (var v = token.state.localVars; v; v = v.next)
          maybeAdd(v.name);
        for (var c = token.state.context; c; c = c.prev)
          for (var v = c.vars; v; v = v.next)
            maybeAdd(v.name);
        for (var v = token.state.globalVars; v; v = v.next)
          maybeAdd(v.name);
        if (options && options.additionalContext != null)
          for (var key in options.additionalContext)
            maybeAdd(key);
        if (!options || options.useGlobalScope !== false)
          gatherCompletions(global2);
        forEach(keywords, maybeAdd);
      }
      return found;
    }
  });
});

// dist/_snowpack/pkg/codemirror/addon/hint/anyword-hint.js
var anywordHint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var WORD = /[\w$]+/, RANGE = 500;
    CodeMirror.registerHelper("hint", "anyword", function(editor, options) {
      var word = options && options.word || WORD;
      var range = options && options.range || RANGE;
      var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
      var end = cur.ch, start = end;
      while (start && word.test(curLine.charAt(start - 1)))
        --start;
      var curWord = start != end && curLine.slice(start, end);
      var list = options && options.list || [], seen = {};
      var re = new RegExp(word.source, "g");
      for (var dir = -1; dir <= 1; dir += 2) {
        var line = cur.line, endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
        for (; line != endLine; line += dir) {
          var text = editor.getLine(line), m;
          while (m = re.exec(text)) {
            if (line == cur.line && m[0] === curWord)
              continue;
            if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
              seen[m[0]] = true;
              list.push(m[0]);
            }
          }
        }
      }
      return {list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/search/searchcursor.js
var searchcursor = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var Pos = CodeMirror.Pos;
    function regexpFlags(regexp) {
      var flags = regexp.flags;
      return flags != null ? flags : (regexp.ignoreCase ? "i" : "") + (regexp.global ? "g" : "") + (regexp.multiline ? "m" : "");
    }
    function ensureFlags(regexp, flags) {
      var current = regexpFlags(regexp), target = current;
      for (var i = 0; i < flags.length; i++)
        if (target.indexOf(flags.charAt(i)) == -1)
          target += flags.charAt(i);
      return current == target ? regexp : new RegExp(regexp.source, target);
    }
    function maybeMultiline(regexp) {
      return /\\s|\\n|\n|\\W|\\D|\[\^/.test(regexp.source);
    }
    function searchRegexpForward(doc, regexp, start) {
      regexp = ensureFlags(regexp, "g");
      for (var line = start.line, ch = start.ch, last = doc.lastLine(); line <= last; line++, ch = 0) {
        regexp.lastIndex = ch;
        var string = doc.getLine(line), match = regexp.exec(string);
        if (match)
          return {
            from: Pos(line, match.index),
            to: Pos(line, match.index + match[0].length),
            match
          };
      }
    }
    function searchRegexpForwardMultiline(doc, regexp, start) {
      if (!maybeMultiline(regexp))
        return searchRegexpForward(doc, regexp, start);
      regexp = ensureFlags(regexp, "gm");
      var string, chunk = 1;
      for (var line = start.line, last = doc.lastLine(); line <= last; ) {
        for (var i = 0; i < chunk; i++) {
          if (line > last)
            break;
          var curLine = doc.getLine(line++);
          string = string == null ? curLine : string + "\n" + curLine;
        }
        chunk = chunk * 2;
        regexp.lastIndex = start.ch;
        var match = regexp.exec(string);
        if (match) {
          var before = string.slice(0, match.index).split("\n"), inside = match[0].split("\n");
          var startLine = start.line + before.length - 1, startCh = before[before.length - 1].length;
          return {
            from: Pos(startLine, startCh),
            to: Pos(startLine + inside.length - 1, inside.length == 1 ? startCh + inside[0].length : inside[inside.length - 1].length),
            match
          };
        }
      }
    }
    function lastMatchIn(string, regexp, endMargin) {
      var match, from = 0;
      while (from <= string.length) {
        regexp.lastIndex = from;
        var newMatch = regexp.exec(string);
        if (!newMatch)
          break;
        var end = newMatch.index + newMatch[0].length;
        if (end > string.length - endMargin)
          break;
        if (!match || end > match.index + match[0].length)
          match = newMatch;
        from = newMatch.index + 1;
      }
      return match;
    }
    function searchRegexpBackward(doc, regexp, start) {
      regexp = ensureFlags(regexp, "g");
      for (var line = start.line, ch = start.ch, first = doc.firstLine(); line >= first; line--, ch = -1) {
        var string = doc.getLine(line);
        var match = lastMatchIn(string, regexp, ch < 0 ? 0 : string.length - ch);
        if (match)
          return {
            from: Pos(line, match.index),
            to: Pos(line, match.index + match[0].length),
            match
          };
      }
    }
    function searchRegexpBackwardMultiline(doc, regexp, start) {
      if (!maybeMultiline(regexp))
        return searchRegexpBackward(doc, regexp, start);
      regexp = ensureFlags(regexp, "gm");
      var string, chunkSize = 1, endMargin = doc.getLine(start.line).length - start.ch;
      for (var line = start.line, first = doc.firstLine(); line >= first; ) {
        for (var i = 0; i < chunkSize && line >= first; i++) {
          var curLine = doc.getLine(line--);
          string = string == null ? curLine : curLine + "\n" + string;
        }
        chunkSize *= 2;
        var match = lastMatchIn(string, regexp, endMargin);
        if (match) {
          var before = string.slice(0, match.index).split("\n"), inside = match[0].split("\n");
          var startLine = line + before.length, startCh = before[before.length - 1].length;
          return {
            from: Pos(startLine, startCh),
            to: Pos(startLine + inside.length - 1, inside.length == 1 ? startCh + inside[0].length : inside[inside.length - 1].length),
            match
          };
        }
      }
    }
    var doFold, noFold;
    if (String.prototype.normalize) {
      doFold = function(str) {
        return str.normalize("NFD").toLowerCase();
      };
      noFold = function(str) {
        return str.normalize("NFD");
      };
    } else {
      doFold = function(str) {
        return str.toLowerCase();
      };
      noFold = function(str) {
        return str;
      };
    }
    function adjustPos(orig, folded, pos, foldFunc) {
      if (orig.length == folded.length)
        return pos;
      for (var min = 0, max = pos + Math.max(0, orig.length - folded.length); ; ) {
        if (min == max)
          return min;
        var mid = min + max >> 1;
        var len = foldFunc(orig.slice(0, mid)).length;
        if (len == pos)
          return mid;
        else if (len > pos)
          max = mid;
        else
          min = mid + 1;
      }
    }
    function searchStringForward(doc, query, start, caseFold) {
      if (!query.length)
        return null;
      var fold = caseFold ? doFold : noFold;
      var lines = fold(query).split(/\r|\n\r?/);
      search:
        for (var line = start.line, ch = start.ch, last = doc.lastLine() + 1 - lines.length; line <= last; line++, ch = 0) {
          var orig = doc.getLine(line).slice(ch), string = fold(orig);
          if (lines.length == 1) {
            var found = string.indexOf(lines[0]);
            if (found == -1)
              continue search;
            var start = adjustPos(orig, string, found, fold) + ch;
            return {
              from: Pos(line, adjustPos(orig, string, found, fold) + ch),
              to: Pos(line, adjustPos(orig, string, found + lines[0].length, fold) + ch)
            };
          } else {
            var cutFrom = string.length - lines[0].length;
            if (string.slice(cutFrom) != lines[0])
              continue search;
            for (var i = 1; i < lines.length - 1; i++)
              if (fold(doc.getLine(line + i)) != lines[i])
                continue search;
            var end = doc.getLine(line + lines.length - 1), endString = fold(end), lastLine = lines[lines.length - 1];
            if (endString.slice(0, lastLine.length) != lastLine)
              continue search;
            return {
              from: Pos(line, adjustPos(orig, string, cutFrom, fold) + ch),
              to: Pos(line + lines.length - 1, adjustPos(end, endString, lastLine.length, fold))
            };
          }
        }
    }
    function searchStringBackward(doc, query, start, caseFold) {
      if (!query.length)
        return null;
      var fold = caseFold ? doFold : noFold;
      var lines = fold(query).split(/\r|\n\r?/);
      search:
        for (var line = start.line, ch = start.ch, first = doc.firstLine() - 1 + lines.length; line >= first; line--, ch = -1) {
          var orig = doc.getLine(line);
          if (ch > -1)
            orig = orig.slice(0, ch);
          var string = fold(orig);
          if (lines.length == 1) {
            var found = string.lastIndexOf(lines[0]);
            if (found == -1)
              continue search;
            return {
              from: Pos(line, adjustPos(orig, string, found, fold)),
              to: Pos(line, adjustPos(orig, string, found + lines[0].length, fold))
            };
          } else {
            var lastLine = lines[lines.length - 1];
            if (string.slice(0, lastLine.length) != lastLine)
              continue search;
            for (var i = 1, start = line - lines.length + 1; i < lines.length - 1; i++)
              if (fold(doc.getLine(start + i)) != lines[i])
                continue search;
            var top = doc.getLine(line + 1 - lines.length), topString = fold(top);
            if (topString.slice(topString.length - lines[0].length) != lines[0])
              continue search;
            return {
              from: Pos(line + 1 - lines.length, adjustPos(top, topString, top.length - lines[0].length, fold)),
              to: Pos(line, adjustPos(orig, string, lastLine.length, fold))
            };
          }
        }
    }
    function SearchCursor(doc, query, pos, options) {
      this.atOccurrence = false;
      this.afterEmptyMatch = false;
      this.doc = doc;
      pos = pos ? doc.clipPos(pos) : Pos(0, 0);
      this.pos = {from: pos, to: pos};
      var caseFold;
      if (typeof options == "object") {
        caseFold = options.caseFold;
      } else {
        caseFold = options;
        options = null;
      }
      if (typeof query == "string") {
        if (caseFold == null)
          caseFold = false;
        this.matches = function(reverse, pos2) {
          return (reverse ? searchStringBackward : searchStringForward)(doc, query, pos2, caseFold);
        };
      } else {
        query = ensureFlags(query, "gm");
        if (!options || options.multiline !== false)
          this.matches = function(reverse, pos2) {
            return (reverse ? searchRegexpBackwardMultiline : searchRegexpForwardMultiline)(doc, query, pos2);
          };
        else
          this.matches = function(reverse, pos2) {
            return (reverse ? searchRegexpBackward : searchRegexpForward)(doc, query, pos2);
          };
      }
    }
    SearchCursor.prototype = {
      findNext: function() {
        return this.find(false);
      },
      findPrevious: function() {
        return this.find(true);
      },
      find: function(reverse) {
        var head = this.doc.clipPos(reverse ? this.pos.from : this.pos.to);
        if (this.afterEmptyMatch && this.atOccurrence) {
          head = Pos(head.line, head.ch);
          if (reverse) {
            head.ch--;
            if (head.ch < 0) {
              head.line--;
              head.ch = (this.doc.getLine(head.line) || "").length;
            }
          } else {
            head.ch++;
            if (head.ch > (this.doc.getLine(head.line) || "").length) {
              head.ch = 0;
              head.line++;
            }
          }
          if (CodeMirror.cmpPos(head, this.doc.clipPos(head)) != 0) {
            return this.atOccurrence = false;
          }
        }
        var result = this.matches(reverse, head);
        this.afterEmptyMatch = result && CodeMirror.cmpPos(result.from, result.to) == 0;
        if (result) {
          this.pos = result;
          this.atOccurrence = true;
          return this.pos.match || true;
        } else {
          var end = Pos(reverse ? this.doc.firstLine() : this.doc.lastLine() + 1, 0);
          this.pos = {from: end, to: end};
          return this.atOccurrence = false;
        }
      },
      from: function() {
        if (this.atOccurrence)
          return this.pos.from;
      },
      to: function() {
        if (this.atOccurrence)
          return this.pos.to;
      },
      replace: function(newText, origin) {
        if (!this.atOccurrence)
          return;
        var lines = CodeMirror.splitLines(newText);
        this.doc.replaceRange(lines, this.pos.from, this.pos.to, origin);
        this.pos.to = Pos(this.pos.from.line + lines.length - 1, lines[lines.length - 1].length + (lines.length == 1 ? this.pos.from.ch : 0));
      }
    };
    CodeMirror.defineExtension("getSearchCursor", function(query, pos, caseFold) {
      return new SearchCursor(this.doc, query, pos, caseFold);
    });
    CodeMirror.defineDocExtension("getSearchCursor", function(query, pos, caseFold) {
      return new SearchCursor(this, query, pos, caseFold);
    });
    CodeMirror.defineExtension("selectMatches", function(query, caseFold) {
      var ranges = [];
      var cur = this.getSearchCursor(query, this.getCursor("from"), caseFold);
      while (cur.findNext()) {
        if (CodeMirror.cmpPos(cur.to(), this.getCursor("to")) > 0)
          break;
        ranges.push({anchor: cur.from(), head: cur.to()});
      }
      if (ranges.length)
        this.setSelections(ranges, 0);
    });
  });
});
var searchcursor_default = searchcursor;

// dist/_snowpack/pkg/codemirror/addon/dialog/dialog.js
var dialog = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function dialogDiv(cm, template, bottom) {
      var wrap = cm.getWrapperElement();
      var dialog2;
      dialog2 = wrap.appendChild(document.createElement("div"));
      if (bottom)
        dialog2.className = "CodeMirror-dialog CodeMirror-dialog-bottom";
      else
        dialog2.className = "CodeMirror-dialog CodeMirror-dialog-top";
      if (typeof template == "string") {
        dialog2.innerHTML = template;
      } else {
        dialog2.appendChild(template);
      }
      CodeMirror.addClass(wrap, "dialog-opened");
      return dialog2;
    }
    function closeNotification(cm, newVal) {
      if (cm.state.currentNotificationClose)
        cm.state.currentNotificationClose();
      cm.state.currentNotificationClose = newVal;
    }
    CodeMirror.defineExtension("openDialog", function(template, callback, options) {
      if (!options)
        options = {};
      closeNotification(this, null);
      var dialog2 = dialogDiv(this, template, options.bottom);
      var closed = false, me = this;
      function close(newVal) {
        if (typeof newVal == "string") {
          inp.value = newVal;
        } else {
          if (closed)
            return;
          closed = true;
          CodeMirror.rmClass(dialog2.parentNode, "dialog-opened");
          dialog2.parentNode.removeChild(dialog2);
          me.focus();
          if (options.onClose)
            options.onClose(dialog2);
        }
      }
      var inp = dialog2.getElementsByTagName("input")[0], button;
      if (inp) {
        inp.focus();
        if (options.value) {
          inp.value = options.value;
          if (options.selectValueOnOpen !== false) {
            inp.select();
          }
        }
        if (options.onInput)
          CodeMirror.on(inp, "input", function(e) {
            options.onInput(e, inp.value, close);
          });
        if (options.onKeyUp)
          CodeMirror.on(inp, "keyup", function(e) {
            options.onKeyUp(e, inp.value, close);
          });
        CodeMirror.on(inp, "keydown", function(e) {
          if (options && options.onKeyDown && options.onKeyDown(e, inp.value, close)) {
            return;
          }
          if (e.keyCode == 27 || options.closeOnEnter !== false && e.keyCode == 13) {
            inp.blur();
            CodeMirror.e_stop(e);
            close();
          }
          if (e.keyCode == 13)
            callback(inp.value, e);
        });
        if (options.closeOnBlur !== false)
          CodeMirror.on(dialog2, "focusout", function(evt) {
            if (evt.relatedTarget !== null)
              close();
          });
      } else if (button = dialog2.getElementsByTagName("button")[0]) {
        CodeMirror.on(button, "click", function() {
          close();
          me.focus();
        });
        if (options.closeOnBlur !== false)
          CodeMirror.on(button, "blur", close);
        button.focus();
      }
      return close;
    });
    CodeMirror.defineExtension("openConfirm", function(template, callbacks, options) {
      closeNotification(this, null);
      var dialog2 = dialogDiv(this, template, options && options.bottom);
      var buttons = dialog2.getElementsByTagName("button");
      var closed = false, me = this, blurring = 1;
      function close() {
        if (closed)
          return;
        closed = true;
        CodeMirror.rmClass(dialog2.parentNode, "dialog-opened");
        dialog2.parentNode.removeChild(dialog2);
        me.focus();
      }
      buttons[0].focus();
      for (var i = 0; i < buttons.length; ++i) {
        var b = buttons[i];
        (function(callback) {
          CodeMirror.on(b, "click", function(e) {
            CodeMirror.e_preventDefault(e);
            close();
            if (callback)
              callback(me);
          });
        })(callbacks[i]);
        CodeMirror.on(b, "blur", function() {
          --blurring;
          setTimeout(function() {
            if (blurring <= 0)
              close();
          }, 200);
        });
        CodeMirror.on(b, "focus", function() {
          ++blurring;
        });
      }
    });
    CodeMirror.defineExtension("openNotification", function(template, options) {
      closeNotification(this, close);
      var dialog2 = dialogDiv(this, template, options && options.bottom);
      var closed = false, doneTimer;
      var duration = options && typeof options.duration !== "undefined" ? options.duration : 5e3;
      function close() {
        if (closed)
          return;
        closed = true;
        clearTimeout(doneTimer);
        CodeMirror.rmClass(dialog2.parentNode, "dialog-opened");
        dialog2.parentNode.removeChild(dialog2);
      }
      CodeMirror.on(dialog2, "click", function(e) {
        CodeMirror.e_preventDefault(e);
        close();
      });
      if (duration)
        doneTimer = setTimeout(close, duration);
      return close;
    });
  });
});
var dialog_default = dialog;

// dist/_snowpack/pkg/codemirror/addon/search/search.js
var search = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror, searchcursor_default, dialog_default);
  })(function(CodeMirror) {
    CodeMirror.defineOption("search", {bottom: false});
    function searchOverlay(query, caseInsensitive) {
      if (typeof query == "string")
        query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), caseInsensitive ? "gi" : "g");
      else if (!query.global)
        query = new RegExp(query.source, query.ignoreCase ? "gi" : "g");
      return {token: function(stream) {
        query.lastIndex = stream.pos;
        var match = query.exec(stream.string);
        if (match && match.index == stream.pos) {
          stream.pos += match[0].length || 1;
          return "searching";
        } else if (match) {
          stream.pos = match.index;
        } else {
          stream.skipToEnd();
        }
      }};
    }
    function SearchState() {
      this.posFrom = this.posTo = this.lastQuery = this.query = null;
      this.overlay = null;
    }
    function getSearchState(cm) {
      return cm.state.search || (cm.state.search = new SearchState());
    }
    function queryCaseInsensitive(query) {
      return typeof query == "string" && query == query.toLowerCase();
    }
    function getSearchCursor(cm, query, pos) {
      return cm.getSearchCursor(query, pos, {caseFold: queryCaseInsensitive(query), multiline: true});
    }
    function persistentDialog(cm, text, deflt, onEnter, onKeyDown) {
      cm.openDialog(text, onEnter, {
        value: deflt,
        selectValueOnOpen: true,
        closeOnEnter: false,
        onClose: function() {
          clearSearch(cm);
        },
        onKeyDown,
        bottom: cm.options.search.bottom
      });
    }
    function dialog2(cm, text, shortText, deflt, f) {
      if (cm.openDialog)
        cm.openDialog(text, f, {value: deflt, selectValueOnOpen: true, bottom: cm.options.search.bottom});
      else
        f(prompt(shortText, deflt));
    }
    function confirmDialog(cm, text, shortText, fs) {
      if (cm.openConfirm)
        cm.openConfirm(text, fs);
      else if (confirm(shortText))
        fs[0]();
    }
    function parseString(string) {
      return string.replace(/\\([nrt\\])/g, function(match, ch) {
        if (ch == "n")
          return "\n";
        if (ch == "r")
          return "\r";
        if (ch == "t")
          return "	";
        if (ch == "\\")
          return "\\";
        return match;
      });
    }
    function parseQuery(query) {
      var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
      if (isRE) {
        try {
          query = new RegExp(isRE[1], isRE[2].indexOf("i") == -1 ? "" : "i");
        } catch (e) {
        }
      } else {
        query = parseString(query);
      }
      if (typeof query == "string" ? query == "" : query.test(""))
        query = /x^/;
      return query;
    }
    function startSearch(cm, state, query) {
      state.queryText = query;
      state.query = parseQuery(query);
      cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
      state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query));
      cm.addOverlay(state.overlay);
      if (cm.showMatchesOnScrollbar) {
        if (state.annotate) {
          state.annotate.clear();
          state.annotate = null;
        }
        state.annotate = cm.showMatchesOnScrollbar(state.query, queryCaseInsensitive(state.query));
      }
    }
    function doSearch(cm, rev, persistent, immediate) {
      var state = getSearchState(cm);
      if (state.query)
        return findNext(cm, rev);
      var q = cm.getSelection() || state.lastQuery;
      if (q instanceof RegExp && q.source == "x^")
        q = null;
      if (persistent && cm.openDialog) {
        var hiding = null;
        var searchNext = function(query, event) {
          CodeMirror.e_stop(event);
          if (!query)
            return;
          if (query != state.queryText) {
            startSearch(cm, state, query);
            state.posFrom = state.posTo = cm.getCursor();
          }
          if (hiding)
            hiding.style.opacity = 1;
          findNext(cm, event.shiftKey, function(_, to) {
            var dialog3;
            if (to.line < 3 && document.querySelector && (dialog3 = cm.display.wrapper.querySelector(".CodeMirror-dialog")) && dialog3.getBoundingClientRect().bottom - 4 > cm.cursorCoords(to, "window").top)
              (hiding = dialog3).style.opacity = 0.4;
          });
        };
        persistentDialog(cm, getQueryDialog(cm), q, searchNext, function(event, query) {
          var keyName = CodeMirror.keyName(event);
          var extra = cm.getOption("extraKeys"), cmd = extra && extra[keyName] || CodeMirror.keyMap[cm.getOption("keyMap")][keyName];
          if (cmd == "findNext" || cmd == "findPrev" || cmd == "findPersistentNext" || cmd == "findPersistentPrev") {
            CodeMirror.e_stop(event);
            startSearch(cm, getSearchState(cm), query);
            cm.execCommand(cmd);
          } else if (cmd == "find" || cmd == "findPersistent") {
            CodeMirror.e_stop(event);
            searchNext(query, event);
          }
        });
        if (immediate && q) {
          startSearch(cm, state, q);
          findNext(cm, rev);
        }
      } else {
        dialog2(cm, getQueryDialog(cm), "Search for:", q, function(query) {
          if (query && !state.query)
            cm.operation(function() {
              startSearch(cm, state, query);
              state.posFrom = state.posTo = cm.getCursor();
              findNext(cm, rev);
            });
        });
      }
    }
    function findNext(cm, rev, callback) {
      cm.operation(function() {
        var state = getSearchState(cm);
        var cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
        if (!cursor.find(rev)) {
          cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
          if (!cursor.find(rev))
            return;
        }
        cm.setSelection(cursor.from(), cursor.to());
        cm.scrollIntoView({from: cursor.from(), to: cursor.to()}, 20);
        state.posFrom = cursor.from();
        state.posTo = cursor.to();
        if (callback)
          callback(cursor.from(), cursor.to());
      });
    }
    function clearSearch(cm) {
      cm.operation(function() {
        var state = getSearchState(cm);
        state.lastQuery = state.query;
        if (!state.query)
          return;
        state.query = state.queryText = null;
        cm.removeOverlay(state.overlay);
        if (state.annotate) {
          state.annotate.clear();
          state.annotate = null;
        }
      });
    }
    function el(tag, attrs) {
      var element = tag ? document.createElement(tag) : document.createDocumentFragment();
      for (var key in attrs) {
        element[key] = attrs[key];
      }
      for (var i = 2; i < arguments.length; i++) {
        var child = arguments[i];
        element.appendChild(typeof child == "string" ? document.createTextNode(child) : child);
      }
      return element;
    }
    function getQueryDialog(cm) {
      var label = el("label", {className: "CodeMirror-search-label"}, cm.phrase("Search:"), el("input", {
        type: "text",
        style: "width: 10em",
        className: "CodeMirror-search-field",
        id: "CodeMirror-search-field"
      }));
      label.setAttribute("for", "CodeMirror-search-field");
      return el("", null, label, " ", el("span", {style: "color: #666", className: "CodeMirror-search-hint"}, cm.phrase("(Use /re/ syntax for regexp search)")));
    }
    function getReplaceQueryDialog(cm) {
      return el("", null, " ", el("input", {type: "text", style: "width: 10em", className: "CodeMirror-search-field"}), " ", el("span", {style: "color: #666", className: "CodeMirror-search-hint"}, cm.phrase("(Use /re/ syntax for regexp search)")));
    }
    function getReplacementQueryDialog(cm) {
      return el("", null, el("span", {className: "CodeMirror-search-label"}, cm.phrase("With:")), " ", el("input", {type: "text", style: "width: 10em", className: "CodeMirror-search-field"}));
    }
    function getDoReplaceConfirm(cm) {
      return el("", null, el("span", {className: "CodeMirror-search-label"}, cm.phrase("Replace?")), " ", el("button", {}, cm.phrase("Yes")), " ", el("button", {}, cm.phrase("No")), " ", el("button", {}, cm.phrase("All")), " ", el("button", {}, cm.phrase("Stop")));
    }
    function replaceAll(cm, query, text) {
      cm.operation(function() {
        for (var cursor = getSearchCursor(cm, query); cursor.findNext(); ) {
          if (typeof query != "string") {
            var match = cm.getRange(cursor.from(), cursor.to()).match(query);
            cursor.replace(text.replace(/\$(\d)/g, function(_, i) {
              return match[i];
            }));
          } else
            cursor.replace(text);
        }
      });
    }
    function replace(cm, all) {
      if (cm.getOption("readOnly"))
        return;
      var query = cm.getSelection() || getSearchState(cm).lastQuery;
      var dialogText = all ? cm.phrase("Replace all:") : cm.phrase("Replace:");
      var fragment = el("", null, el("span", {className: "CodeMirror-search-label"}, dialogText), getReplaceQueryDialog(cm));
      dialog2(cm, fragment, dialogText, query, function(query2) {
        if (!query2)
          return;
        query2 = parseQuery(query2);
        dialog2(cm, getReplacementQueryDialog(cm), cm.phrase("Replace with:"), "", function(text) {
          text = parseString(text);
          if (all) {
            replaceAll(cm, query2, text);
          } else {
            clearSearch(cm);
            var cursor = getSearchCursor(cm, query2, cm.getCursor("from"));
            var advance = function() {
              var start = cursor.from(), match;
              if (!(match = cursor.findNext())) {
                cursor = getSearchCursor(cm, query2);
                if (!(match = cursor.findNext()) || start && cursor.from().line == start.line && cursor.from().ch == start.ch)
                  return;
              }
              cm.setSelection(cursor.from(), cursor.to());
              cm.scrollIntoView({from: cursor.from(), to: cursor.to()});
              confirmDialog(cm, getDoReplaceConfirm(cm), cm.phrase("Replace?"), [
                function() {
                  doReplace(match);
                },
                advance,
                function() {
                  replaceAll(cm, query2, text);
                }
              ]);
            };
            var doReplace = function(match) {
              cursor.replace(typeof query2 == "string" ? text : text.replace(/\$(\d)/g, function(_, i) {
                return match[i];
              }));
              advance();
            };
            advance();
          }
        });
      });
    }
    CodeMirror.commands.find = function(cm) {
      clearSearch(cm);
      doSearch(cm);
    };
    CodeMirror.commands.findPersistent = function(cm) {
      clearSearch(cm);
      doSearch(cm, false, true);
    };
    CodeMirror.commands.findPersistentNext = function(cm) {
      doSearch(cm, false, true, true);
    };
    CodeMirror.commands.findPersistentPrev = function(cm) {
      doSearch(cm, true, true, true);
    };
    CodeMirror.commands.findNext = doSearch;
    CodeMirror.commands.findPrev = function(cm) {
      doSearch(cm, true);
    };
    CodeMirror.commands.clearSearch = clearSearch;
    CodeMirror.commands.replace = replace;
    CodeMirror.commands.replaceAll = function(cm) {
      replace(cm, true);
    };
  });
});

// dist/_snowpack/pkg/codemirror/addon/search/jump-to-line.js
var jumpToLine = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror, dialog_default);
  })(function(CodeMirror) {
    CodeMirror.defineOption("search", {bottom: false});
    function dialog2(cm, text, shortText, deflt, f) {
      if (cm.openDialog)
        cm.openDialog(text, f, {value: deflt, selectValueOnOpen: true, bottom: cm.options.search.bottom});
      else
        f(prompt(shortText, deflt));
    }
    function getJumpDialog(cm) {
      return cm.phrase("Jump to line:") + ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">' + cm.phrase("(Use line:column or scroll% syntax)") + "</span>";
    }
    function interpretLine(cm, string) {
      var num = Number(string);
      if (/^[-+]/.test(string))
        return cm.getCursor().line + num;
      else
        return num - 1;
    }
    CodeMirror.commands.jumpToLine = function(cm) {
      var cur = cm.getCursor();
      dialog2(cm, getJumpDialog(cm), cm.phrase("Jump to line:"), cur.line + 1 + ":" + cur.ch, function(posStr) {
        if (!posStr)
          return;
        var match;
        if (match = /^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(posStr)) {
          cm.setCursor(interpretLine(cm, match[1]), Number(match[2]));
        } else if (match = /^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(posStr)) {
          var line = Math.round(cm.lineCount() * Number(match[1]) / 100);
          if (/^[-+]/.test(match[1]))
            line = cur.line + line + 1;
          cm.setCursor(line - 1, cur.ch);
        } else if (match = /^\s*\:?\s*([\+\-]?\d+)\s*/.exec(posStr)) {
          cm.setCursor(interpretLine(cm, match[1]), cur.ch);
        }
      });
    };
    CodeMirror.keyMap["default"]["Alt-G"] = "jumpToLine";
  });
});

// dist/_snowpack/pkg/codemirror/addon/scroll/simplescrollbars.js
var simplescrollbars = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function Bar(cls, orientation, scroll) {
      this.orientation = orientation;
      this.scroll = scroll;
      this.screen = this.total = this.size = 1;
      this.pos = 0;
      this.node = document.createElement("div");
      this.node.className = cls + "-" + orientation;
      this.inner = this.node.appendChild(document.createElement("div"));
      var self2 = this;
      CodeMirror.on(this.inner, "mousedown", function(e) {
        if (e.which != 1)
          return;
        CodeMirror.e_preventDefault(e);
        var axis = self2.orientation == "horizontal" ? "pageX" : "pageY";
        var start = e[axis], startpos = self2.pos;
        function done() {
          CodeMirror.off(document, "mousemove", move);
          CodeMirror.off(document, "mouseup", done);
        }
        function move(e2) {
          if (e2.which != 1)
            return done();
          self2.moveTo(startpos + (e2[axis] - start) * (self2.total / self2.size));
        }
        CodeMirror.on(document, "mousemove", move);
        CodeMirror.on(document, "mouseup", done);
      });
      CodeMirror.on(this.node, "click", function(e) {
        CodeMirror.e_preventDefault(e);
        var innerBox = self2.inner.getBoundingClientRect(), where;
        if (self2.orientation == "horizontal")
          where = e.clientX < innerBox.left ? -1 : e.clientX > innerBox.right ? 1 : 0;
        else
          where = e.clientY < innerBox.top ? -1 : e.clientY > innerBox.bottom ? 1 : 0;
        self2.moveTo(self2.pos + where * self2.screen);
      });
      function onWheel(e) {
        var moved = CodeMirror.wheelEventPixels(e)[self2.orientation == "horizontal" ? "x" : "y"];
        var oldPos = self2.pos;
        self2.moveTo(self2.pos + moved);
        if (self2.pos != oldPos)
          CodeMirror.e_preventDefault(e);
      }
      CodeMirror.on(this.node, "mousewheel", onWheel);
      CodeMirror.on(this.node, "DOMMouseScroll", onWheel);
    }
    Bar.prototype.setPos = function(pos, force) {
      if (pos < 0)
        pos = 0;
      if (pos > this.total - this.screen)
        pos = this.total - this.screen;
      if (!force && pos == this.pos)
        return false;
      this.pos = pos;
      this.inner.style[this.orientation == "horizontal" ? "left" : "top"] = pos * (this.size / this.total) + "px";
      return true;
    };
    Bar.prototype.moveTo = function(pos) {
      if (this.setPos(pos))
        this.scroll(pos, this.orientation);
    };
    var minButtonSize = 10;
    Bar.prototype.update = function(scrollSize, clientSize, barSize) {
      var sizeChanged = this.screen != clientSize || this.total != scrollSize || this.size != barSize;
      if (sizeChanged) {
        this.screen = clientSize;
        this.total = scrollSize;
        this.size = barSize;
      }
      var buttonSize = this.screen * (this.size / this.total);
      if (buttonSize < minButtonSize) {
        this.size -= minButtonSize - buttonSize;
        buttonSize = minButtonSize;
      }
      this.inner.style[this.orientation == "horizontal" ? "width" : "height"] = buttonSize + "px";
      this.setPos(this.pos, sizeChanged);
    };
    function SimpleScrollbars(cls, place, scroll) {
      this.addClass = cls;
      this.horiz = new Bar(cls, "horizontal", scroll);
      place(this.horiz.node);
      this.vert = new Bar(cls, "vertical", scroll);
      place(this.vert.node);
      this.width = null;
    }
    SimpleScrollbars.prototype.update = function(measure) {
      if (this.width == null) {
        var style = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
        if (style)
          this.width = parseInt(style.height);
      }
      var width = this.width || 0;
      var needsH = measure.scrollWidth > measure.clientWidth + 1;
      var needsV = measure.scrollHeight > measure.clientHeight + 1;
      this.vert.node.style.display = needsV ? "block" : "none";
      this.horiz.node.style.display = needsH ? "block" : "none";
      if (needsV) {
        this.vert.update(measure.scrollHeight, measure.clientHeight, measure.viewHeight - (needsH ? width : 0));
        this.vert.node.style.bottom = needsH ? width + "px" : "0";
      }
      if (needsH) {
        this.horiz.update(measure.scrollWidth, measure.clientWidth, measure.viewWidth - (needsV ? width : 0) - measure.barLeft);
        this.horiz.node.style.right = needsV ? width + "px" : "0";
        this.horiz.node.style.left = measure.barLeft + "px";
      }
      return {right: needsV ? width : 0, bottom: needsH ? width : 0};
    };
    SimpleScrollbars.prototype.setScrollTop = function(pos) {
      this.vert.setPos(pos);
    };
    SimpleScrollbars.prototype.setScrollLeft = function(pos) {
      this.horiz.setPos(pos);
    };
    SimpleScrollbars.prototype.clear = function() {
      var parent = this.horiz.node.parentNode;
      parent.removeChild(this.horiz.node);
      parent.removeChild(this.vert.node);
    };
    CodeMirror.scrollbarModel.simple = function(place, scroll) {
      return new SimpleScrollbars("CodeMirror-simplescroll", place, scroll);
    };
    CodeMirror.scrollbarModel.overlay = function(place, scroll) {
      return new SimpleScrollbars("CodeMirror-overlayscroll", place, scroll);
    };
  });
});

// dist/_snowpack/pkg/codemirror/addon/lint/lint.js
var lint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    var GUTTER_ID = "CodeMirror-lint-markers";
    var LINT_LINE_ID = "CodeMirror-lint-line-";
    function showTooltip(cm, e, content) {
      var tt = document.createElement("div");
      tt.className = "CodeMirror-lint-tooltip cm-s-" + cm.options.theme;
      tt.appendChild(content.cloneNode(true));
      if (cm.state.lint.options.selfContain)
        cm.getWrapperElement().appendChild(tt);
      else
        document.body.appendChild(tt);
      function position(e2) {
        if (!tt.parentNode)
          return CodeMirror.off(document, "mousemove", position);
        tt.style.top = Math.max(0, e2.clientY - tt.offsetHeight - 5) + "px";
        tt.style.left = e2.clientX + 5 + "px";
      }
      CodeMirror.on(document, "mousemove", position);
      position(e);
      if (tt.style.opacity != null)
        tt.style.opacity = 1;
      return tt;
    }
    function rm(elt) {
      if (elt.parentNode)
        elt.parentNode.removeChild(elt);
    }
    function hideTooltip(tt) {
      if (!tt.parentNode)
        return;
      if (tt.style.opacity == null)
        rm(tt);
      tt.style.opacity = 0;
      setTimeout(function() {
        rm(tt);
      }, 600);
    }
    function showTooltipFor(cm, e, content, node) {
      var tooltip = showTooltip(cm, e, content);
      function hide() {
        CodeMirror.off(node, "mouseout", hide);
        if (tooltip) {
          hideTooltip(tooltip);
          tooltip = null;
        }
      }
      var poll = setInterval(function() {
        if (tooltip)
          for (var n = node; ; n = n.parentNode) {
            if (n && n.nodeType == 11)
              n = n.host;
            if (n == document.body)
              return;
            if (!n) {
              hide();
              break;
            }
          }
        if (!tooltip)
          return clearInterval(poll);
      }, 400);
      CodeMirror.on(node, "mouseout", hide);
    }
    function LintState(cm, conf, hasGutter) {
      this.marked = [];
      if (conf instanceof Function)
        conf = {getAnnotations: conf};
      if (!conf || conf === true)
        conf = {};
      this.options = {};
      this.linterOptions = conf.options || {};
      for (var prop in defaults)
        this.options[prop] = defaults[prop];
      for (var prop in conf) {
        if (defaults.hasOwnProperty(prop)) {
          if (conf[prop] != null)
            this.options[prop] = conf[prop];
        } else if (!conf.options) {
          this.linterOptions[prop] = conf[prop];
        }
      }
      this.timeout = null;
      this.hasGutter = hasGutter;
      this.onMouseOver = function(e) {
        onMouseOver(cm, e);
      };
      this.waitingFor = 0;
    }
    var defaults = {
      highlightLines: false,
      tooltips: true,
      delay: 500,
      lintOnChange: true,
      getAnnotations: null,
      async: false,
      selfContain: null,
      formatAnnotation: null,
      onUpdateLinting: null
    };
    function clearMarks(cm) {
      var state = cm.state.lint;
      if (state.hasGutter)
        cm.clearGutter(GUTTER_ID);
      if (state.options.highlightLines)
        clearErrorLines(cm);
      for (var i = 0; i < state.marked.length; ++i)
        state.marked[i].clear();
      state.marked.length = 0;
    }
    function clearErrorLines(cm) {
      cm.eachLine(function(line) {
        var has = line.wrapClass && /\bCodeMirror-lint-line-\w+\b/.exec(line.wrapClass);
        if (has)
          cm.removeLineClass(line, "wrap", has[0]);
      });
    }
    function makeMarker(cm, labels, severity, multiple, tooltips) {
      var marker = document.createElement("div"), inner = marker;
      marker.className = "CodeMirror-lint-marker CodeMirror-lint-marker-" + severity;
      if (multiple) {
        inner = marker.appendChild(document.createElement("div"));
        inner.className = "CodeMirror-lint-marker CodeMirror-lint-marker-multiple";
      }
      if (tooltips != false)
        CodeMirror.on(inner, "mouseover", function(e) {
          showTooltipFor(cm, e, labels, inner);
        });
      return marker;
    }
    function getMaxSeverity(a, b) {
      if (a == "error")
        return a;
      else
        return b;
    }
    function groupByLine(annotations) {
      var lines = [];
      for (var i = 0; i < annotations.length; ++i) {
        var ann = annotations[i], line = ann.from.line;
        (lines[line] || (lines[line] = [])).push(ann);
      }
      return lines;
    }
    function annotationTooltip(ann) {
      var severity = ann.severity;
      if (!severity)
        severity = "error";
      var tip = document.createElement("div");
      tip.className = "CodeMirror-lint-message CodeMirror-lint-message-" + severity;
      if (typeof ann.messageHTML != "undefined") {
        tip.innerHTML = ann.messageHTML;
      } else {
        tip.appendChild(document.createTextNode(ann.message));
      }
      return tip;
    }
    function lintAsync(cm, getAnnotations) {
      var state = cm.state.lint;
      var id = ++state.waitingFor;
      function abort() {
        id = -1;
        cm.off("change", abort);
      }
      cm.on("change", abort);
      getAnnotations(cm.getValue(), function(annotations, arg2) {
        cm.off("change", abort);
        if (state.waitingFor != id)
          return;
        if (arg2 && annotations instanceof CodeMirror)
          annotations = arg2;
        cm.operation(function() {
          updateLinting(cm, annotations);
        });
      }, state.linterOptions, cm);
    }
    function startLinting(cm) {
      var state = cm.state.lint;
      if (!state)
        return;
      var options = state.options;
      var getAnnotations = options.getAnnotations || cm.getHelper(CodeMirror.Pos(0, 0), "lint");
      if (!getAnnotations)
        return;
      if (options.async || getAnnotations.async) {
        lintAsync(cm, getAnnotations);
      } else {
        var annotations = getAnnotations(cm.getValue(), state.linterOptions, cm);
        if (!annotations)
          return;
        if (annotations.then)
          annotations.then(function(issues) {
            cm.operation(function() {
              updateLinting(cm, issues);
            });
          });
        else
          cm.operation(function() {
            updateLinting(cm, annotations);
          });
      }
    }
    function updateLinting(cm, annotationsNotSorted) {
      var state = cm.state.lint;
      if (!state)
        return;
      var options = state.options;
      clearMarks(cm);
      var annotations = groupByLine(annotationsNotSorted);
      for (var line = 0; line < annotations.length; ++line) {
        var anns = annotations[line];
        if (!anns)
          continue;
        var message = [];
        anns = anns.filter(function(item) {
          return message.indexOf(item.message) > -1 ? false : message.push(item.message);
        });
        var maxSeverity = null;
        var tipLabel = state.hasGutter && document.createDocumentFragment();
        for (var i = 0; i < anns.length; ++i) {
          var ann = anns[i];
          var severity = ann.severity;
          if (!severity)
            severity = "error";
          maxSeverity = getMaxSeverity(maxSeverity, severity);
          if (options.formatAnnotation)
            ann = options.formatAnnotation(ann);
          if (state.hasGutter)
            tipLabel.appendChild(annotationTooltip(ann));
          if (ann.to)
            state.marked.push(cm.markText(ann.from, ann.to, {
              className: "CodeMirror-lint-mark CodeMirror-lint-mark-" + severity,
              __annotation: ann
            }));
        }
        if (state.hasGutter)
          cm.setGutterMarker(line, GUTTER_ID, makeMarker(cm, tipLabel, maxSeverity, annotations[line].length > 1, options.tooltips));
        if (options.highlightLines)
          cm.addLineClass(line, "wrap", LINT_LINE_ID + maxSeverity);
      }
      if (options.onUpdateLinting)
        options.onUpdateLinting(annotationsNotSorted, annotations, cm);
    }
    function onChange(cm) {
      var state = cm.state.lint;
      if (!state)
        return;
      clearTimeout(state.timeout);
      state.timeout = setTimeout(function() {
        startLinting(cm);
      }, state.options.delay);
    }
    function popupTooltips(cm, annotations, e) {
      var target = e.target || e.srcElement;
      var tooltip = document.createDocumentFragment();
      for (var i = 0; i < annotations.length; i++) {
        var ann = annotations[i];
        tooltip.appendChild(annotationTooltip(ann));
      }
      showTooltipFor(cm, e, tooltip, target);
    }
    function onMouseOver(cm, e) {
      var target = e.target || e.srcElement;
      if (!/\bCodeMirror-lint-mark-/.test(target.className))
        return;
      var box = target.getBoundingClientRect(), x = (box.left + box.right) / 2, y = (box.top + box.bottom) / 2;
      var spans = cm.findMarksAt(cm.coordsChar({left: x, top: y}, "client"));
      var annotations = [];
      for (var i = 0; i < spans.length; ++i) {
        var ann = spans[i].__annotation;
        if (ann)
          annotations.push(ann);
      }
      if (annotations.length)
        popupTooltips(cm, annotations, e);
    }
    CodeMirror.defineOption("lint", false, function(cm, val, old) {
      if (old && old != CodeMirror.Init) {
        clearMarks(cm);
        if (cm.state.lint.options.lintOnChange !== false)
          cm.off("change", onChange);
        CodeMirror.off(cm.getWrapperElement(), "mouseover", cm.state.lint.onMouseOver);
        clearTimeout(cm.state.lint.timeout);
        delete cm.state.lint;
      }
      if (val) {
        var gutters = cm.getOption("gutters"), hasLintGutter = false;
        for (var i = 0; i < gutters.length; ++i)
          if (gutters[i] == GUTTER_ID)
            hasLintGutter = true;
        var state = cm.state.lint = new LintState(cm, val, hasLintGutter);
        if (state.options.lintOnChange)
          cm.on("change", onChange);
        if (state.options.tooltips != false && state.options.tooltips != "gutter")
          CodeMirror.on(cm.getWrapperElement(), "mouseover", state.onMouseOver);
        startLinting(cm);
      }
    });
    CodeMirror.defineExtension("performLint", function() {
      startLinting(this);
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/lint/css-lint.js
var cssLint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    CodeMirror.registerHelper("lint", "css", function(text, options) {
      var found = [];
      if (!window.CSSLint) {
        if (window.console) {
          window.console.error("Error: window.CSSLint not defined, CodeMirror CSS linting cannot run.");
        }
        return found;
      }
      var results = CSSLint.verify(text, options), messages = results.messages, message = null;
      for (var i = 0; i < messages.length; i++) {
        message = messages[i];
        var startLine = message.line - 1, endLine = message.line - 1, startCol = message.col - 1, endCol = message.col;
        found.push({
          from: CodeMirror.Pos(startLine, startCol),
          to: CodeMirror.Pos(endLine, endCol),
          message: message.message,
          severity: message.type
        });
      }
      return found;
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/lint/javascript-lint.js
var javascriptLint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function validator(text, options) {
      if (!window.JSHINT) {
        if (window.console) {
          window.console.error("Error: window.JSHINT not defined, CodeMirror JavaScript linting cannot run.");
        }
        return [];
      }
      if (!options.indent)
        options.indent = 1;
      JSHINT(text, options, options.globals);
      var errors = JSHINT.data().errors, result = [];
      if (errors)
        parseErrors(errors, result);
      return result;
    }
    CodeMirror.registerHelper("lint", "javascript", validator);
    function parseErrors(errors, output) {
      for (var i = 0; i < errors.length; i++) {
        var error = errors[i];
        if (error) {
          if (error.line <= 0) {
            if (window.console) {
              window.console.warn("Cannot display JSHint error (invalid line " + error.line + ")", error);
            }
            continue;
          }
          var start = error.character - 1, end = start + 1;
          if (error.evidence) {
            var index = error.evidence.substring(start).search(/.\b/);
            if (index > -1) {
              end += index;
            }
          }
          var hint = {
            message: error.reason,
            severity: error.code ? error.code.startsWith("W") ? "warning" : "error" : "error",
            from: CodeMirror.Pos(error.line - 1, start),
            to: CodeMirror.Pos(error.line - 1, end)
          };
          output.push(hint);
        }
      }
    }
  });
});

// dist/_snowpack/pkg/codemirror/addon/lint/json-lint.js
var jsonLint = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    CodeMirror.registerHelper("lint", "json", function(text) {
      var found = [];
      if (!window.jsonlint) {
        if (window.console) {
          window.console.error("Error: window.jsonlint not defined, CodeMirror JSON linting cannot run.");
        }
        return found;
      }
      var jsonlint = window.jsonlint.parser || window.jsonlint;
      jsonlint.parseError = function(str, hash) {
        var loc = hash.loc;
        found.push({
          from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
          to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
          message: str
        });
      };
      try {
        jsonlint.parse(text);
      } catch (e) {
      }
      return found;
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/fold/foldcode.js
var foldcode = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function doFold(cm, pos, options, force) {
      if (options && options.call) {
        var finder = options;
        options = null;
      } else {
        var finder = getOption(cm, options, "rangeFinder");
      }
      if (typeof pos == "number")
        pos = CodeMirror.Pos(pos, 0);
      var minSize = getOption(cm, options, "minFoldSize");
      function getRange(allowFolded) {
        var range2 = finder(cm, pos);
        if (!range2 || range2.to.line - range2.from.line < minSize)
          return null;
        if (force === "fold")
          return range2;
        var marks = cm.findMarksAt(range2.from);
        for (var i = 0; i < marks.length; ++i) {
          if (marks[i].__isFold) {
            if (!allowFolded)
              return null;
            range2.cleared = true;
            marks[i].clear();
          }
        }
        return range2;
      }
      var range = getRange(true);
      if (getOption(cm, options, "scanUp"))
        while (!range && pos.line > cm.firstLine()) {
          pos = CodeMirror.Pos(pos.line - 1, 0);
          range = getRange(false);
        }
      if (!range || range.cleared || force === "unfold")
        return;
      var myWidget = makeWidget(cm, options, range);
      CodeMirror.on(myWidget, "mousedown", function(e) {
        myRange.clear();
        CodeMirror.e_preventDefault(e);
      });
      var myRange = cm.markText(range.from, range.to, {
        replacedWith: myWidget,
        clearOnEnter: getOption(cm, options, "clearOnEnter"),
        __isFold: true
      });
      myRange.on("clear", function(from, to) {
        CodeMirror.signal(cm, "unfold", cm, from, to);
      });
      CodeMirror.signal(cm, "fold", cm, range.from, range.to);
    }
    function makeWidget(cm, options, range) {
      var widget = getOption(cm, options, "widget");
      if (typeof widget == "function") {
        widget = widget(range.from, range.to);
      }
      if (typeof widget == "string") {
        var text = document.createTextNode(widget);
        widget = document.createElement("span");
        widget.appendChild(text);
        widget.className = "CodeMirror-foldmarker";
      } else if (widget) {
        widget = widget.cloneNode(true);
      }
      return widget;
    }
    CodeMirror.newFoldFunction = function(rangeFinder, widget) {
      return function(cm, pos) {
        doFold(cm, pos, {rangeFinder, widget});
      };
    };
    CodeMirror.defineExtension("foldCode", function(pos, options, force) {
      doFold(this, pos, options, force);
    });
    CodeMirror.defineExtension("isFolded", function(pos) {
      var marks = this.findMarksAt(pos);
      for (var i = 0; i < marks.length; ++i)
        if (marks[i].__isFold)
          return true;
    });
    CodeMirror.commands.toggleFold = function(cm) {
      cm.foldCode(cm.getCursor());
    };
    CodeMirror.commands.fold = function(cm) {
      cm.foldCode(cm.getCursor(), null, "fold");
    };
    CodeMirror.commands.unfold = function(cm) {
      cm.foldCode(cm.getCursor(), {scanUp: false}, "unfold");
    };
    CodeMirror.commands.foldAll = function(cm) {
      cm.operation(function() {
        for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
          cm.foldCode(CodeMirror.Pos(i, 0), {scanUp: false}, "fold");
      });
    };
    CodeMirror.commands.unfoldAll = function(cm) {
      cm.operation(function() {
        for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
          cm.foldCode(CodeMirror.Pos(i, 0), {scanUp: false}, "unfold");
      });
    };
    CodeMirror.registerHelper("fold", "combine", function() {
      var funcs = Array.prototype.slice.call(arguments, 0);
      return function(cm, start) {
        for (var i = 0; i < funcs.length; ++i) {
          var found = funcs[i](cm, start);
          if (found)
            return found;
        }
      };
    });
    CodeMirror.registerHelper("fold", "auto", function(cm, start) {
      var helpers = cm.getHelpers(start, "fold");
      for (var i = 0; i < helpers.length; i++) {
        var cur = helpers[i](cm, start);
        if (cur)
          return cur;
      }
    });
    var defaultOptions = {
      rangeFinder: CodeMirror.fold.auto,
      widget: "↔",
      minFoldSize: 0,
      scanUp: false,
      clearOnEnter: true
    };
    CodeMirror.defineOption("foldOptions", null);
    function getOption(cm, options, name) {
      if (options && options[name] !== void 0)
        return options[name];
      var editorOptions = cm.options.foldOptions;
      if (editorOptions && editorOptions[name] !== void 0)
        return editorOptions[name];
      return defaultOptions[name];
    }
    CodeMirror.defineExtension("foldOption", function(options, name) {
      return getOption(this, options, name);
    });
  });
});
var foldcode_default = foldcode;

// dist/_snowpack/pkg/codemirror/addon/fold/brace-fold.js
var braceFold = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function bracketFolding(pairs) {
      return function(cm, start) {
        var line = start.line, lineText = cm.getLine(line);
        function findOpening(pair) {
          var tokenType;
          for (var at = start.ch, pass = 0; ; ) {
            var found2 = at <= 0 ? -1 : lineText.lastIndexOf(pair[0], at - 1);
            if (found2 == -1) {
              if (pass == 1)
                break;
              pass = 1;
              at = lineText.length;
              continue;
            }
            if (pass == 1 && found2 < start.ch)
              break;
            tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found2 + 1));
            if (!/^(comment|string)/.test(tokenType))
              return {ch: found2 + 1, tokenType, pair};
            at = found2 - 1;
          }
        }
        function findRange(found2) {
          var count = 1, lastLine = cm.lastLine(), end, startCh = found2.ch, endCh;
          outer:
            for (var i2 = line; i2 <= lastLine; ++i2) {
              var text = cm.getLine(i2), pos = i2 == line ? startCh : 0;
              for (; ; ) {
                var nextOpen = text.indexOf(found2.pair[0], pos), nextClose = text.indexOf(found2.pair[1], pos);
                if (nextOpen < 0)
                  nextOpen = text.length;
                if (nextClose < 0)
                  nextClose = text.length;
                pos = Math.min(nextOpen, nextClose);
                if (pos == text.length)
                  break;
                if (cm.getTokenTypeAt(CodeMirror.Pos(i2, pos + 1)) == found2.tokenType) {
                  if (pos == nextOpen)
                    ++count;
                  else if (!--count) {
                    end = i2;
                    endCh = pos;
                    break outer;
                  }
                }
                ++pos;
              }
            }
          if (end == null || line == end)
            return null;
          return {
            from: CodeMirror.Pos(line, startCh),
            to: CodeMirror.Pos(end, endCh)
          };
        }
        var found = [];
        for (var i = 0; i < pairs.length; i++) {
          var open = findOpening(pairs[i]);
          if (open)
            found.push(open);
        }
        found.sort(function(a, b) {
          return a.ch - b.ch;
        });
        for (var i = 0; i < found.length; i++) {
          var range = findRange(found[i]);
          if (range)
            return range;
        }
        return null;
      };
    }
    CodeMirror.registerHelper("fold", "brace", bracketFolding([["{", "}"], ["[", "]"]]));
    CodeMirror.registerHelper("fold", "brace-paren", bracketFolding([["{", "}"], ["[", "]"], ["(", ")"]]));
    CodeMirror.registerHelper("fold", "import", function(cm, start) {
      function hasImport(line) {
        if (line < cm.firstLine() || line > cm.lastLine())
          return null;
        var start2 = cm.getTokenAt(CodeMirror.Pos(line, 1));
        if (!/\S/.test(start2.string))
          start2 = cm.getTokenAt(CodeMirror.Pos(line, start2.end + 1));
        if (start2.type != "keyword" || start2.string != "import")
          return null;
        for (var i = line, e = Math.min(cm.lastLine(), line + 10); i <= e; ++i) {
          var text = cm.getLine(i), semi = text.indexOf(";");
          if (semi != -1)
            return {startCh: start2.end, end: CodeMirror.Pos(i, semi)};
        }
      }
      var startLine = start.line, has = hasImport(startLine), prev;
      if (!has || hasImport(startLine - 1) || (prev = hasImport(startLine - 2)) && prev.end.line == startLine - 1)
        return null;
      for (var end = has.end; ; ) {
        var next = hasImport(end.line + 1);
        if (next == null)
          break;
        end = next.end;
      }
      return {from: cm.clipPos(CodeMirror.Pos(startLine, has.startCh + 1)), to: end};
    });
    CodeMirror.registerHelper("fold", "include", function(cm, start) {
      function hasInclude(line) {
        if (line < cm.firstLine() || line > cm.lastLine())
          return null;
        var start2 = cm.getTokenAt(CodeMirror.Pos(line, 1));
        if (!/\S/.test(start2.string))
          start2 = cm.getTokenAt(CodeMirror.Pos(line, start2.end + 1));
        if (start2.type == "meta" && start2.string.slice(0, 8) == "#include")
          return start2.start + 8;
      }
      var startLine = start.line, has = hasInclude(startLine);
      if (has == null || hasInclude(startLine - 1) != null)
        return null;
      for (var end = startLine; ; ) {
        var next = hasInclude(end + 1);
        if (next == null)
          break;
        ++end;
      }
      return {
        from: CodeMirror.Pos(startLine, has + 1),
        to: cm.clipPos(CodeMirror.Pos(end))
      };
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/fold/comment-fold.js
var commentFold = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    CodeMirror.registerGlobalHelper("fold", "comment", function(mode) {
      return mode.blockCommentStart && mode.blockCommentEnd;
    }, function(cm, start) {
      var mode = cm.getModeAt(start), startToken = mode.blockCommentStart, endToken = mode.blockCommentEnd;
      if (!startToken || !endToken)
        return;
      var line = start.line, lineText = cm.getLine(line);
      var startCh;
      for (var at = start.ch, pass = 0; ; ) {
        var found = at <= 0 ? -1 : lineText.lastIndexOf(startToken, at - 1);
        if (found == -1) {
          if (pass == 1)
            return;
          pass = 1;
          at = lineText.length;
          continue;
        }
        if (pass == 1 && found < start.ch)
          return;
        if (/comment/.test(cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1))) && (found == 0 || lineText.slice(found - endToken.length, found) == endToken || !/comment/.test(cm.getTokenTypeAt(CodeMirror.Pos(line, found))))) {
          startCh = found + startToken.length;
          break;
        }
        at = found - 1;
      }
      var depth = 1, lastLine = cm.lastLine(), end, endCh;
      outer:
        for (var i = line; i <= lastLine; ++i) {
          var text = cm.getLine(i), pos = i == line ? startCh : 0;
          for (; ; ) {
            var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
            if (nextOpen < 0)
              nextOpen = text.length;
            if (nextClose < 0)
              nextClose = text.length;
            pos = Math.min(nextOpen, nextClose);
            if (pos == text.length)
              break;
            if (pos == nextOpen)
              ++depth;
            else if (!--depth) {
              end = i;
              endCh = pos;
              break outer;
            }
            ++pos;
          }
        }
      if (end == null || line == end && endCh == startCh)
        return;
      return {
        from: CodeMirror.Pos(line, startCh),
        to: CodeMirror.Pos(end, endCh)
      };
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/fold/foldgutter.js
var foldgutter = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror, foldcode_default);
  })(function(CodeMirror) {
    CodeMirror.defineOption("foldGutter", false, function(cm, val, old) {
      if (old && old != CodeMirror.Init) {
        cm.clearGutter(cm.state.foldGutter.options.gutter);
        cm.state.foldGutter = null;
        cm.off("gutterClick", onGutterClick);
        cm.off("changes", onChange);
        cm.off("viewportChange", onViewportChange);
        cm.off("fold", onFold);
        cm.off("unfold", onFold);
        cm.off("swapDoc", onChange);
        cm.off("optionChange", optionChange);
      }
      if (val) {
        cm.state.foldGutter = new State(parseOptions(val));
        updateInViewport(cm);
        cm.on("gutterClick", onGutterClick);
        cm.on("changes", onChange);
        cm.on("viewportChange", onViewportChange);
        cm.on("fold", onFold);
        cm.on("unfold", onFold);
        cm.on("swapDoc", onChange);
        cm.on("optionChange", optionChange);
      }
    });
    var Pos = CodeMirror.Pos;
    function State(options) {
      this.options = options;
      this.from = this.to = 0;
    }
    function parseOptions(opts) {
      if (opts === true)
        opts = {};
      if (opts.gutter == null)
        opts.gutter = "CodeMirror-foldgutter";
      if (opts.indicatorOpen == null)
        opts.indicatorOpen = "CodeMirror-foldgutter-open";
      if (opts.indicatorFolded == null)
        opts.indicatorFolded = "CodeMirror-foldgutter-folded";
      return opts;
    }
    function isFolded(cm, line) {
      var marks = cm.findMarks(Pos(line, 0), Pos(line + 1, 0));
      for (var i = 0; i < marks.length; ++i) {
        if (marks[i].__isFold) {
          var fromPos = marks[i].find(-1);
          if (fromPos && fromPos.line === line)
            return marks[i];
        }
      }
    }
    function marker(spec) {
      if (typeof spec == "string") {
        var elt = document.createElement("div");
        elt.className = spec + " CodeMirror-guttermarker-subtle";
        return elt;
      } else {
        return spec.cloneNode(true);
      }
    }
    function updateFoldInfo(cm, from, to) {
      var opts = cm.state.foldGutter.options, cur = from - 1;
      var minSize = cm.foldOption(opts, "minFoldSize");
      var func = cm.foldOption(opts, "rangeFinder");
      var clsFolded = typeof opts.indicatorFolded == "string" && classTest(opts.indicatorFolded);
      var clsOpen = typeof opts.indicatorOpen == "string" && classTest(opts.indicatorOpen);
      cm.eachLine(from, to, function(line) {
        ++cur;
        var mark = null;
        var old = line.gutterMarkers;
        if (old)
          old = old[opts.gutter];
        if (isFolded(cm, cur)) {
          if (clsFolded && old && clsFolded.test(old.className))
            return;
          mark = marker(opts.indicatorFolded);
        } else {
          var pos = Pos(cur, 0);
          var range = func && func(cm, pos);
          if (range && range.to.line - range.from.line >= minSize) {
            if (clsOpen && old && clsOpen.test(old.className))
              return;
            mark = marker(opts.indicatorOpen);
          }
        }
        if (!mark && !old)
          return;
        cm.setGutterMarker(line, opts.gutter, mark);
      });
    }
    function classTest(cls) {
      return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
    }
    function updateInViewport(cm) {
      var vp = cm.getViewport(), state = cm.state.foldGutter;
      if (!state)
        return;
      cm.operation(function() {
        updateFoldInfo(cm, vp.from, vp.to);
      });
      state.from = vp.from;
      state.to = vp.to;
    }
    function onGutterClick(cm, line, gutter) {
      var state = cm.state.foldGutter;
      if (!state)
        return;
      var opts = state.options;
      if (gutter != opts.gutter)
        return;
      var folded = isFolded(cm, line);
      if (folded)
        folded.clear();
      else
        cm.foldCode(Pos(line, 0), opts);
    }
    function optionChange(cm, option) {
      if (option == "mode")
        onChange(cm);
    }
    function onChange(cm) {
      var state = cm.state.foldGutter;
      if (!state)
        return;
      var opts = state.options;
      state.from = state.to = 0;
      clearTimeout(state.changeUpdate);
      state.changeUpdate = setTimeout(function() {
        updateInViewport(cm);
      }, opts.foldOnChangeTimeSpan || 600);
    }
    function onViewportChange(cm) {
      var state = cm.state.foldGutter;
      if (!state)
        return;
      var opts = state.options;
      clearTimeout(state.changeUpdate);
      state.changeUpdate = setTimeout(function() {
        var vp = cm.getViewport();
        if (state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20) {
          updateInViewport(cm);
        } else {
          cm.operation(function() {
            if (vp.from < state.from) {
              updateFoldInfo(cm, vp.from, state.from);
              state.from = vp.from;
            }
            if (vp.to > state.to) {
              updateFoldInfo(cm, state.to, vp.to);
              state.to = vp.to;
            }
          });
        }
      }, opts.updateViewportTimeSpan || 400);
    }
    function onFold(cm, from) {
      var state = cm.state.foldGutter;
      if (!state)
        return;
      var line = from.line;
      if (line >= state.from && line < state.to)
        updateFoldInfo(cm, line, line + 1);
    }
  });
});

// dist/_snowpack/pkg/codemirror/addon/fold/indent-fold.js
var indentFold = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    function lineIndent(cm, lineNo) {
      var text = cm.getLine(lineNo);
      var spaceTo = text.search(/\S/);
      if (spaceTo == -1 || /\bcomment\b/.test(cm.getTokenTypeAt(CodeMirror.Pos(lineNo, spaceTo + 1))))
        return -1;
      return CodeMirror.countColumn(text, null, cm.getOption("tabSize"));
    }
    CodeMirror.registerHelper("fold", "indent", function(cm, start) {
      var myIndent = lineIndent(cm, start.line);
      if (myIndent < 0)
        return;
      var lastLineInFold = null;
      for (var i = start.line + 1, end = cm.lastLine(); i <= end; ++i) {
        var indent = lineIndent(cm, i);
        if (indent == -1)
          ;
        else if (indent > myIndent) {
          lastLineInFold = i;
        } else {
          break;
        }
      }
      if (lastLineInFold)
        return {
          from: CodeMirror.Pos(start.line, cm.getLine(start.line).length),
          to: CodeMirror.Pos(lastLineInFold, cm.getLine(lastLineInFold).length)
        };
    });
  });
});

// dist/_snowpack/pkg/codemirror/addon/fold/markdown-fold.js
var markdownFold = createCommonjsModule(function(module, exports) {
  (function(mod) {
    mod(codemirror);
  })(function(CodeMirror) {
    CodeMirror.registerHelper("fold", "markdown", function(cm, start) {
      var maxDepth = 100;
      function isHeader(lineNo) {
        var tokentype = cm.getTokenTypeAt(CodeMirror.Pos(lineNo, 0));
        return tokentype && /\bheader\b/.test(tokentype);
      }
      function headerLevel(lineNo, line, nextLine2) {
        var match = line && line.match(/^#+/);
        if (match && isHeader(lineNo))
          return match[0].length;
        match = nextLine2 && nextLine2.match(/^[=\-]+\s*$/);
        if (match && isHeader(lineNo + 1))
          return nextLine2[0] == "=" ? 1 : 2;
        return maxDepth;
      }
      var firstLine = cm.getLine(start.line), nextLine = cm.getLine(start.line + 1);
      var level = headerLevel(start.line, firstLine, nextLine);
      if (level === maxDepth)
        return void 0;
      var lastLineNo = cm.lastLine();
      var end = start.line, nextNextLine = cm.getLine(end + 2);
      while (end < lastLineNo) {
        if (headerLevel(end + 1, nextLine, nextNextLine) <= level)
          break;
        ++end;
        nextLine = nextNextLine;
        nextNextLine = cm.getLine(end + 2);
      }
      return {
        from: CodeMirror.Pos(start.line, firstLine.length),
        to: CodeMirror.Pos(end, cm.getLine(end).length)
      };
    });
  });
});

// dist/js/Editor.js
var _editor, _initializeEditor, initializeEditor_fn, _setInitialValue, setInitialValue_fn;
var _Editor = class {
  constructor(editorElement, currentColorTheme, readOnly = false) {
    _setInitialValue.add(this);
    _editor.set(this, void 0);
    __privateSet(this, _editor, __privateMethod(_Editor, _initializeEditor, initializeEditor_fn).call(_Editor, editorElement, readOnly));
    __privateMethod(this, _setInitialValue, setInitialValue_fn).call(this);
    this.setTheme(currentColorTheme);
  }
  addShortcut(keyCombination, callback) {
    const map = {[keyCombination]: function(cm) {
      callback(cm);
    }};
    __privateGet(this, _editor).addKeyMap(map);
  }
  getInitialValue() {
    let initialMessage = "//		KEEP IN MIND:\n";
    initialMessage += "\n// Every time you make a new file, it will be saved and\n";
    initialMessage += "// you can see all of your previous files by clicking on\n";
    initialMessage += "// History icon below the header in the right corner.\n";
    initialMessage += "\n// Every time you make a change in any of your files,\n";
    initialMessage += "// it will be saved automatically.\n";
    initialMessage += "\n// The editor is optimized for mobile phones and tablets\n";
    initialMessage += "// as well, but it is mainly made for computers and laptops.\n";
    initialMessage += "// Some of the editor features won't work on mobile devices.\n";
    initialMessage += "\n// Files with .xml and .json extension cannot be compiled.\n";
    initialMessage += "\n// Every time you want to see this info again, just click";
    initialMessage += "\n// on the Info button below the header in the left corner.\n";
    return initialMessage;
  }
  setValue(newValue) {
    __privateGet(this, _editor).setValue(newValue);
  }
  clear() {
    __privateGet(this, _editor).setValue("");
    __privateGet(this, _editor).clearHistory();
    __privateGet(this, _editor).focus();
  }
  focus() {
    __privateGet(this, _editor).focus();
  }
  setTheme(theme = "dark") {
    const themeString = theme === "dark" ? "base16-dark" : "base16-light";
    __privateGet(this, _editor).setOption("theme", themeString);
  }
  setLanguage(language = "text/javascript") {
    __privateGet(this, _editor).setOption("mode", language);
  }
  set readOnly(value) {
    __privateGet(this, _editor).setOption("readOnly", value);
  }
  getEditorCode() {
    return __privateGet(this, _editor).getValue();
  }
  getEditorMode() {
    return __privateGet(this, _editor).getOption("mode");
  }
};
var Editor = _Editor;
_editor = new WeakMap();
_initializeEditor = new WeakSet();
initializeEditor_fn = function(editorElement, readOnly) {
  return codemirror.fromTextArea(editorElement, {
    lineNumbers: true,
    readOnly,
    mode: "text/javascript",
    theme: "base16-dark",
    autoCloseBrackets: true,
    autoCloseTags: true,
    styleActiveLine: true,
    scrollbarStyle: "simple",
    lint: true,
    selfContain: true,
    highlightLines: true,
    extraKeys: {Alt: "autocomplete"},
    foldGutter: true,
    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  });
};
_setInitialValue = new WeakSet();
setInitialValue_fn = function() {
  this.clear();
  const initialMessage = this.getInitialValue();
  __privateGet(this, _editor).setValue(initialMessage);
};
_initializeEditor.add(Editor);
var Editor_default = Editor;

// dist/js/infoEvents.js
$("document").ready(() => {
  $(".info-btn").click(() => {
    $(".general-info-container").slideDown(ANIMATION_FEATURE_DURATION).fadeIn(ANIMATION_FEATURE_DURATION);
  });
  $(".general-info-container [data-close-btn]").click(() => {
    $(".general-info-container").slideUp(ANIMATION_FEATURE_DURATION).fadeOut(ANIMATION_FEATURE_DURATION);
  });
});

// dist/js/localStorageManip.js
function saveFileInLocalStorage(newFile) {
  let files = getSavedFiles();
  const existingFileObject = findFile(newFile.name);
  files = deactivatePreviousActiveElement(files);
  if (existingFileObject === void 0) {
    files.push(newFile);
  } else {
    files = files.map((file) => {
      if (file.name === newFile.name) {
        file.text = newFile.text;
        file.isActive = true;
      }
      return file;
    });
  }
  saveFiles(files);
}
function deactivatePreviousActiveElement(files) {
  return files.map((file) => {
    file.isActive = false;
    return file;
  });
}
function findFile(filename) {
  const files = getSavedFiles();
  return files.find((file) => file.name === filename);
}
function saveFiles(files) {
  localStorage.setItem(`${APP_PREFIX}-files`, JSON.stringify(files));
}
function getSavedFiles() {
  const files = localStorage.getItem(`${APP_PREFIX}-files`);
  if (files == null || files === "[]") {
    saveFiles([]);
    return [];
  }
  return JSON.parse(files);
}

// dist/js/loader.js
var loader = document.querySelector("[data-loader]");
var transitionBetweenStatesDuration = 500;
var numberOfLoadingAnimationStates = 3;
var additionalLoadingAnimationDelay = 200;
var loaderFadingOutDuration = 800;
startLoaderAnimation();
var loadingStartTime = new Date().getTime();
window.onload = () => {
  const loadingEndTime = new Date().getTime();
  const loadingTime = loadingEndTime - loadingStartTime;
  removeLoader(loadingTime);
};
function removeLoader(loadingTime) {
  const loadingAnimationDuration = transitionBetweenStatesDuration * numberOfLoadingAnimationStates + additionalLoadingAnimationDelay;
  if (loadingTime >= loadingAnimationDuration) {
    loader.dataset.animationState = "fade-out";
    removeLoaderFromDOM(0);
  } else {
    setTimeout(() => {
      loader.dataset.animationState = "fade-out";
    }, loadingAnimationDuration - loadingTime);
    removeLoaderFromDOM(loadingAnimationDuration - loadingTime);
  }
}
function removeLoaderFromDOM(delay) {
  setTimeout(() => {
    loader.remove();
  }, delay + loaderFadingOutDuration);
}
function startLoaderAnimation() {
  const playShorterAnimation = sessionStorage.getItem(`${APP_PREFIX}-browsingCodeBrush`);
  if (playShorterAnimation === "true") {
    numberOfLoadingAnimationStates = 1;
    loaderFadingOutDuration = 600;
    loader.dataset.animationState = "enlargement";
  } else {
    loader.dataset.animationState = "show-logo";
    setTimeout(() => {
      loader.dataset.animationState = "show-editor-name";
    }, transitionBetweenStatesDuration);
    setTimeout(() => {
      loader.dataset.animationState = "enlargement";
    }, transitionBetweenStatesDuration * 2);
    sessionStorage.setItem(`${APP_PREFIX}-browsingCodeBrush`, true);
  }
}

// dist/js/main.js
$("document").ready(() => {
  let mainEditor;
  const editorElement = document.querySelector("textarea#mainEditor");
  if (getSavedFiles().length === 0) {
    mainEditor = new Editor_default(editorElement, getCurrentColorTheme(), true);
    $("#name-file-frm input").focus();
  } else {
    const activeFile = getSavedFiles().find((file) => file.isActive === true);
    mainEditor = new Editor_default(editorElement, getCurrentColorTheme());
    const progLangObject = PROGRAMMING_LANGUAGES_DATA.find((progLang) => progLang.editorModeName === activeFile.editorMode);
    mainEditor.setLanguage(progLangObject.editorModeName);
    mainEditor.setValue(activeFile.text);
    onFileProperlyNamed(progLangObject.editorModeName, activeFile.name);
  }
  if (getCurrentColorTheme() == null) {
    mainEditor.setTheme(setInitialColorTheme());
  } else {
    const isDark = getCurrentColorTheme() === "dark";
    setColorTheme(isDark);
  }
  $(".dark-mode-btn").click(() => {
    const isDark = $("body").attr("data-color-theme") === "dark";
    mainEditor.setTheme(setColorTheme(!isDark));
  });
  $("#name-file-frm").submit(() => {
    const result = isFileNamedProperly();
    if (result) {
      $(".open-compiler-btn").removeClass("stay-red");
      $(".open-compiler-btn").attr("data-tooltip", "Run");
      erasePreviousEditor();
      mainEditor = null;
      mainEditor = new Editor_default(editorElement, getCurrentColorTheme());
      mainEditor.setLanguage(result.fileType);
      mainEditor.clear();
      const currentFilename = $("#name-file-frm .file-name").attr("data-file-name");
      const existingFileObject = findFile(currentFilename);
      if (existingFileObject) {
        mainEditor.setValue(existingFileObject.text);
      }
      saveFileInLocalStorage({
        name: $("#name-file-frm .file-name").attr("data-file-name"),
        editorMode: mainEditor.getEditorMode(),
        text: mainEditor.getEditorCode(),
        isActive: true
      });
    }
    if ($("#name-file-frm button").attr("data-role") === "save-btn") {
      mainEditor.readOnly = true;
      saveFileInLocalStorage({
        name: $("#name-file-frm .file-name").attr("data-file-name"),
        editorMode: mainEditor.getEditorMode(),
        text: mainEditor.getEditorCode(),
        isActive: true
      });
    } else {
      mainEditor.readOnly = false;
    }
  });
  $(".copy-code-btn").click(() => {
    handleCopyingEditorCode(mainEditor);
  });
  $(".open-compiler-btn").click(() => {
    const currentEditorMode = $(".editor-container").attr("data-prog-lang");
    const currentLanguageObject = PROGRAMMING_LANGUAGES_DATA.find((progLang) => progLang.editorModeName === currentEditorMode);
    const currentLanguageCompilerURL = currentLanguageObject.compilerURL;
    if (currentLanguageCompilerURL === "/") {
      $(".open-compiler-btn").attr("data-tooltip", "Code cannot be compiled!");
      $(".open-compiler-btn").addClass("no-compiler");
      setTimeout(() => {
        $(".open-compiler-btn").removeClass("no-compiler");
        $(".open-compiler-btn").addClass("stay-red");
        $(".open-compiler-btn").blur();
      }, 2e3);
    } else {
      handleCopyingEditorCode(mainEditor);
      setTimeout(() => {
        window.open(currentLanguageCompilerURL, "_blank");
      }, 600);
    }
  });
  window.addEventListener("beforeunload", () => {
    if (mainEditor.getEditorCode() === mainEditor.getInitialValue())
      return;
    saveFileInLocalStorage({
      name: $("#name-file-frm .file-name").attr("data-file-name"),
      editorMode: mainEditor.getEditorMode(),
      text: mainEditor.getEditorCode(),
      isActive: true
    });
  });
});
function handleCopyingEditorCode(mainEditor) {
  const editorText = mainEditor.getEditorCode();
  navigator.clipboard.writeText(editorText);
  $(".copy-code-btn").addClass("clicked");
  $(".copy-code-btn").attr("data-tooltip", "Copied! 🎉");
  setTimeout(() => {
    $(".copy-code-btn").removeClass("clicked");
    $(".copy-code-btn").blur();
    $(".copy-code-btn").attr("data-tooltip", "Copy");
  }, 2e3);
}
function erasePreviousEditor() {
  $(".CodeMirror").remove();
}
//# sourceMappingURL=main.js.map
