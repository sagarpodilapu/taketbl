import React from "react";
class TakeTblParent extends React.Component {
  constructor(props, context) {
    super(props);
    function setLanguage() {
      let lang = navigator.language || navigator.userLanguage;
      if (!lang) {
        lang = "en";
      }
      if (lang.trim().length > 2) {
        lang = lang.split("-");
        if (lang.length === 2) {
          lang = lang[0];
        }
      }
      return lang;
    }
    this.state.lang = setLanguage();
  }
  state = {
    lang: "",
    tables: [],
    activeTable: {},
    sections: [],
    activeSection: {},
    contextmenu: "",
    tableinfo: { tableno: 0, section: "", color: "" }
    //buttons:["callback":{"cancel":this.handleCancel}]
  };

  componentDidMount() {
    var self = this;
    let menulist = { section: "#rightmenusection", tbl: ".rightmenutbl" };
    let actionlist = {
      cancel: "handleCancel",
      ok: "handleOk",
      savetable: "handleSaveTable",
      savesection: "handleSaveSection"
    };
    let fnClick = function(event) {
      //event for saving the information
      event.preventDefault();
      if (
        event.target.type === "button" &&
        event.target.getAttribute("action")
      ) {
        let action = actionlist[event.target.getAttribute("action")];

        if (self[action]) {
          self[action](event);
        }
      }
      let view = event.target.getAttribute("view");
      if (view) {
        if (self.handleClick) {
          self.handleClick(event);
        }
      } else {
        document.removeEventListener("click", fnClick);
      }
    };

    let fnKeydown = function(event) {
      if (event.target.type && event.target.type === "number") {
        if (self.handleKeyDown) {
          self.handleKeyDown(event);
        }
      }

      let view = event.target.getAttribute("view");
      if (view) {
        if (self.handleClick) {
          self.handleClick(event);
        }
      } else {
        document.removeEventListener("click", fnKeydown);
      }
      //document.removeEventListener('click',fnKeydown);
    };
    document.addEventListener("contextmenu", function(event) {
      let test = event && event.target;
      if (!test) return;
      if (window.mergingItems && window.mergingItems.length > 0) {
        document.addEventListener("click", fnClick);
        let rightmenu = document.querySelector(".rightmenutbl");

        if (rightmenu) {
          rightmenu = rightmenu.cloneNode(true);
          rightmenu.id = "mergemenu";
          rightmenu.style.block = "block";

          if (!event.target.parentElement.querySelector("#mergemenu")) {
            event.target.parentElement.appendChild(rightmenu);
            rightmenu.style.top = "0px";
            rightmenu.style.left = "0px";
          }
        }

        return;
      }
      //
      let obj = event.target.getAttribute("selected")
        ? event.target
        : event.target.parentElement &&
          event.target.parentElement.getAttribute("selected")
        ? event.target.parentElement
        : null;

      if (obj) {
        event.preventDefault();
        document.addEventListener("click", fnClick);
        document.addEventListener("keydown", fnKeydown);
        let menu = null;
        let menutype = obj.getAttribute("type");
        let menus = document.querySelectorAll(menulist[menutype]);
        menu = menus[0];
        if (menu) {
          let menuItem = document.getElementById("m" + obj.id);
          if (!menuItem) {
            let nm = menu.cloneNode(true);
            nm.id = "m" + obj.id;

            let top = parseInt(obj.style.top.replace("px", "")) + "px";
            let left = parseInt(obj.style.left.replace("px", "")) + 35 + "px";
            nm.style.top = top;
            nm.style.left = left;

            nm.style.display = "block";
            document.getElementById("content").appendChild(nm);
            menuItem = nm;
          } else {
          }
          window.contextmenuSelected = menuItem;
        } else {
        }
      } else {
        //

        window.contextmenuSelected = null;
        document.removeEventListener("click", fnClick);
        document.removeEventListener("keydown", fnKeydown);
      }
    });
  }
}
export default TakeTblParent;