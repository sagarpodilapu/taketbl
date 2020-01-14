var sections = [];
var merges = [];
var tables = [];
var selectedItem = null;
var contextmenuSelected = null;
var mergingItems = [];
var mEvent = new Event("multiselect");
var stopdrop;
var restaurants = [];
var restaurant = {};
var loadedFloorplan = {};
/* state fns */

function getSelectedItem() {
  return selectedItem;
}

function getcontent() {
  //
  let previewNode = document.querySelector(".content").cloneNode(true);
  previewNode.id = "previewNode";
  let toast = previewNode.querySelector(".toast");
  let rightmenu =
    previewNode.querySelector(".rightmenutbl") ||
    previewNode.querySelector(".rightmenusection");
  if (toast) {
    previewNode.removeChild(toast);
  }
  if (rightmenu) {
    previewNode.removeChild(rightmenu);
  }
  let itables = previewNode.querySelectorAll(".itable");

  itables.forEach(itable => {
    itable.id = "preview" + itable.id;
    itable.style.border = "none";
    itable.removeAttribute("selected");
    itable.removeAttribute("placed");
  });
  let isections = previewNode.querySelectorAll(".section");
  isections.forEach(isection => {
    isection.id = "preview" + isection.id;
    isection.style.resize = "none";
    let top = parseFloat(isection.style.top.replace("px", "")) + 10 + "px";
    isection.style.top = top;
    isection.removeAttribute("ondragstart");
    isection.removeAttribute("onclick");
    isection.removeAttribute("selected");
    isection.removeAttribute("placed");
    isection.style.border = "none";
  });
  return previewNode;
}
function gettables() {
  return tables;
}
function getsections() {
  return sections;
}
function savefloorplan(msg) {
  $(".toast").toast({ animation: true, autohide: true, delay: 1500 });
  $(".mr-auto").text(msg.Heading);
  $(".text-muted").text("");
  //ajaxCall to save the values;
  /* floorplan :{
        name,description,{weekdays},default,published,startdate,starttime,enddate,endtime,tables,sections
  }*/
  let floorplan = {
    name: "",
    description: "",
    weekdays: {},
    default: "",
    published: "",
    startdate: "",
    enddate: "",
    tables: gettables(),
    sections: getsections(),
    content: {}
  };
  floorplan.name = document.querySelector("input[name='fpnname']").value;
  floorplan.description = document.querySelector(
    "textarea[name='fpdescription']"
  ).value;
  floorplan.default = document.querySelector("input[name='fpdefault']").checked;
  floorplan.published = document.querySelector(
    "input[name='fppublished']"
  ).checked;
  floorplan.content = document.querySelector("#tablettop").innerHTML;
  /*
  
  */

  //gettables from array;

  //gettables from section;
  console.log(floorplan);
  fetch("http://localhost:8003/savefloorplan.php", {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(floorplan)
  })
    .then(response => {})
    .catch(error => {});
}

function getRestaurants() {
  console.log("get restaurants");
  fetch("http://localhost:8003/getrestaurants.php", {
    method: "GET",
    dataType: "json"
  })
    .then(response => {
      // console.log(JSON.parse(response));
      return response.json();
    })
    .then(myJson => {
      console.log(myJson);
      restaurants = myJson;
      return restaurants;
    })
    .catch(error => {
      console.log(error);
    });
}

function getRestaurant(id) {
  fetch("http://localhost:8003/getrestaurant.php", {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ restaurant: id })
  })
    .then(response => {})
    .catch(error => {});
}

function getFloorplan(id) {
  fetch("http://localhost:8003/getfloorplan.php", {
    method: "GET",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ floorplan: id })
  })
    .then(response => {})
    .catch(error => {});
}

function savetable(e, msg) {
  let tblid = selectedItem.id.replace("newId", "");
  let tblinputs = contextmenuSelected.querySelectorAll("input");
  if (contextmenuSelected && contextmenuSelected.style.display == "none") {
    contextmenuSelected.style.display = "block";
  }
  let error = "";
  $(".toast").toast({ animation: true, autohide: true, delay: 1500 });
  $(".mr-auto").text(msg.Heading);
  $(".text-muted").text("");
  let inputs = [];
  tblinputs.forEach(input => {
    if (input.required == true && input.value == 0) {
      error =
        error +
        '<p style="color:red;">' +
        input.placeholder +
        " " +
        msg.Empty +
        "</p>";
    }
    // no duplicates of table number
    tables.forEach(table => {
      if (
        input.name == "tableno" &&
        table.tableno == input.value &&
        tblid !== table.id &&
        table.state == "A"
      ) {
        error =
          error +
          '<p style="color:red;">' +
          input.placeholder +
          ":" +
          input.value +
          " " +
          msg.AlreadyExist +
          "</p>";
      }
    });
    inputs.push(input);
    // no exceeding table counts
  });
  if (error.trim().length > 0) {
    $(".toast-body").html(error);
    $(".toast").toast("show");
    return false;
  }
  let ctable;
  let section;
  tables.forEach(table => {
    if (table.id == tblid) {
      ctable = table;
      inputs.forEach(input => {
        table[input.name] = input.value;
      });
      let parentItem = selectedItem.parentElement;
      if (parentItem.getAttribute("class").indexOf("section") > -1) {
        let secid = parentItem.id.replace("section", "");
        table["sectionid"] = secid;
        sections.forEach(sec => {
          if (sec.id == secid) {
            table["name"] = sec.name;
          }
        });
      }
      let stkelement = selectedItem.querySelector(".fa-stack-1x");
      if (stkelement) {
        stkelement.innerHTML = ctable.tableno;
        stkelement.style.color = "white";
      }
    }
  });

  if (ctable && selectedItem) {
    if (selectedItem.getAttribute("class").indexOf("locked") > -1) {
      document.getElementById("tbltype").innerHTML =
        '<i class="fa fa-lock itable locked smallfont" aria-hidden="true"></i>';
    } else {
      document.getElementById("tbltype").innerHTML =
        '<i class="fa fa-unlock itable smallfont" aria-hidden="true"></i>';
    }
    document.getElementById("tblno").innerHTML = ctable.tableno;
    document.getElementById("tbltoseat").innerHTML = ctable.seats;
    document.getElementById("tblsection").innerHTML = ctable.name;
    document.getElementById("rseats").innerHTML =
      parseInt(document.getElementById("rseats").innerHTML) - ctable.seats;
    if (contextmenuSelected.style.display == "block") {
      contextmenuSelected.style.display = "none";
    }
  }
}
/* global fns */
var section = {
  create: function(id) {
    if (!stopdrop) {
      if (!id || id == 0) {
        id = 1;
      }
      let div = document.createElement("DIV");
      div.id = "section" + id;
      div.setAttribute("class", "section");
      div.setAttribute("ondragstart", "drag(event);");
      div.setAttribute("ondrageenter", "return sectionenter(event)");
      div.setAttribute("ondrop", "return sectiondrop(event)");
      div.setAttribute("onclick", "select(event);");
      div.setAttribute("type", "section");
      div.setAttribute("draggable", "true");
      this.id = id;
      sections.push({
        id: id,
        name: "",
        bearer: "",
        state: "A",
        date: new Date(),
        style: div.style
      });
      return div;
    }
    stopdrop = false;
  },
  update: function(name, bearer, color) {
    this.name = name;
    this.bearer = bearer;
    this.color = color;
  },
  id: "",
  name: "",
  bearer: "",
  color: ""
};

function sectionenter(ev) {}
function sectiondrop(ev) {
  let obj = selectedItem;
  if (!obj) {
    obj = document.getElementById(ev.dataTransfer.getData("text"));
  }
  if (!obj) {
    return; // trying to move an invalide node
  }
  if (obj.id == ev.target.id) return; //trying to move the same node ot itself;
  type = obj.getAttribute("class").indexOf("table") > 0;
  if (!type) {
    /// trying to move a section or anyother type into section
    $(".toast").toast({ animation: true, autohide: true, delay: 1500 });
    $(".mr-auto").text("Section Error");
    $(".text-muted").text("");
    $(".toast-body").text("Section cannot be placed inside another section");
    $(".toast").toast("show");
    stopdrop = true;
    ev.preventDefault();
    return false;
  } else {
    if (
      obj.getAttribute("placed") &&
      obj.parentElement &&
      obj.parentElement.id &&
      obj.parentElement.id.indexOf("content") > -1
    ) {
      let movNode = obj.cloneNode(true);
      ev.currentTarget.appendChild(movNode);

      select(movNode);
      obj.remove();
      ev.preventDefault();
      return;
    }
  }
}

function savesection(event, msg) {
  let sectioninputs = contextmenuSelected.querySelectorAll("input");
  $(".toast").toast({ animation: true, autohide: true, delay: 1500 });
  $(".mr-auto").text(msg.Heading);
  $(".text-muted").text("");
  let error = "";
  let inputs = [];
  sectioninputs.forEach(input => {
    if (input.value.trim().length == 0 && input.required == true) {
      error =
        error +
        "<p style='color:red;'>" +
        input.placeholder +
        " " +
        msg.Empty +
        "</p> ";
    }
    sections.forEach(sec => {
      if (
        input.value.trim().length > 0 &&
        sec.name == input.value &&
        sec.id != selectedItem.id.replace("section", "")
      ) {
        error =
          error +
          "<p style='color:red;'>" +
          input.placeholder +
          " :" +
          input.value +
          " " +
          msg.AlreadyExists +
          "</p>";
      }
    });
    inputs.push(input);
  });
  if (error.trim().length > 0) {
    $(".toast-body").html(error);
    $(".toast").toast("show");
    return false;
  }
  let id = selectedItem.id.replace("section", "");
  sections.forEach(sec => {
    if (sec.id == id) {
      inputs.forEach(input => {
        sec[input.name] = input.value;
        selectedItem.setAttribute("title", input.value);
        if (contextmenuSelected.style.display == "block") {
          contextmenuSelected.style.display = "none";
        }
      });
    }
  });
  return true;
}

function setdefault(state) {
  weekdays = document.querySelector(".weekdays");
  if (weekdays) {
    weekdays.style.pointerEvents = "";
    if (state) {
      weekdays.style.pointerEvents = "none";
    }
  }
  dates = document.querySelectorAll(".dates");
  if (dates) {
    dates.forEach(date => {
      date.style.pointerEvents = "";
      if (state) {
        date.style.pointerEvents = "none";
      }
    });
  }
}
function setweekday() {
  let dates = document.querySelectorAll(".dates");
  let ddefault = document.querySelector("#default");
  let weekdays = document.querySelectorAll(
    ".weekdays > tr > td > label > input"
  );
  let checked = false;
  if (weekdays) {
    weekdays.forEach(weekday => {
      if (weekday.checked) {
        checked = true;
      }
    });
  }
  if (dates) {
    dates.forEach(date => {
      date.style.pointerEvents = "";
      if (checked) {
        date.style.pointerEvents = "none";
      }
    });
  }
  ddefault.style.pointerEvent = "";
  ddefault.parentElement.style.pointerEvents = "";
  if (checked) {
    ddefault.style.pointerEvents = "none";
    ddefault.parentElement.style.pointerEvents = "none";
  }
}

function disableDates(event) {
  // default
}

function positive(event) {
  if (event.keyCode == 189 || event.keyCode == 69 || event.keyCode == 190) {
    return false;
  }
}

var table = {
  id: "",
  seats: 0,
  sectionid: 0,
  type: ""
};

function setSectionColor(color) {
  if (
    selectedItem &&
    selectedItem.getAttribute("class").indexOf("section") > -1
  ) {
    selectedItem.style.backgroundColor = color;
  }
}
function allowDrop(ev) {
  ev.preventDefault();
}

function dragenter(ev) {
  //
}
function tableforUi(id) {
  let searchedTable = null;
  tables.forEach(table => {
    if (table.uid === id && table.state === "A") {
      searchedTable = table;
    }
  });
  return searchedTable;
}

function findMergItemExist(id) {
  let itemfound = null;
  mergingItems.forEach(mergeItem => {
    if (mergeItem.id == id) {
      itemfound = mergeItem;
    }
  });
  return itemfound;
}

function select(ev) {
  if (ev.shiftKey) {
    // checking for multi select
    let mergingItem = null;
    if (
      selectedItem &&
      selectedItem.getAttribute("type") == "tbl" &&
      ev.target &&
      (ev.target.getAttribute("placed") ||
        ev.target.parentElement.getAttribute("placed") ||
        ev.target.parentElement.parentElement.getAttribute("placed"))
    ) {
      if (ev.target.getAttribute("placed")) {
        mergingItem = ev.target;
      } else {
        if (ev.target.parentElement.getAttribute("placed")) {
          mergingItem = ev.target.parentElement;
        } else {
          if (ev.target.parentElement.parentElement.getAttribute("placed")) {
            // rectange and oval
            mergingItem = ev.target.parentElement.parentElement;
          }
        }
      }

      if (selectedItem.id != mergingItem.id) {
        let tablefound = false;
        selectedTable = tableforUi(selectedItem.id);
        mergingTable = tableforUi(mergingItem.id);
        if (selectedTable.tableno == "" || mergingTable.tableno == "") {
          return;
        }
        //highlight merging table
        mergingItem.style.border = "2px solid green";
        mergingItem.setAttribute("selected", true);
        if (findMergItemExist(mergingItem.id) != null) {
          return;
        }
        if (findMergItemExist(selectedItem.id) == null) {
          mergingItems.push(selectedItem);
        }
        mergingItems.push(mergingItem);
        return;
      }
    }
  }
  if (mergingItems) {
    mergingItems.forEach(mergingItem => {
      mergingItem.style.border = "none";
    });
    mergingItems = [];
  }
  if (ev.target) {
    let cls = ev.target.getAttribute("class");
    let txt = "dropdown-menudropdowndropdown-item";
    if (txt.indexOf(cls) > -1) return;
    let view = ev.target.getAttribute("view");
    if (view && view.indexOf("popup") > -1) return;
  }
  if (selectedItem) {
    if (selectedItem.getAttribute("selected") == "true") {
      let contextMenuItem = document.getElementById("m" + selectedItem.id);
      if (contextMenuItem) {
        contextMenuItem.remove();
        contextmenuSelected = null;
      }
      selectedItem.style.border = "none";
      selectedItem.setAttribute("selected", "");
      selectedItem.setAttribute("draggable", true);
      selectedItem = null;
    }
  }
  if (
    ev &&
    ev.target &&
    ev.target.getAttribute &&
    (ev.target.getAttribute("placed") ||
      ev.target.parentElement.getAttribute("placed") ||
      ev.target.parentElement.parentElement.getAttribute("placed"))
  ) {
    if (ev.target.getAttribute("placed")) {
      selectedItem = ev.target;
    } else {
      if (ev.target.parentElement.getAttribute("placed")) {
        selectedItem = ev.target.parentElement;
      } else {
        if (ev.target.parentElement.parentElement.getAttribute("placed")) {
          // rectange and oval
          selectedItem = ev.target.parentElement.parentElement;
        }
      }
    }
    if (selectedItem.getAttribute("selected") != "true") {
      selectedItem.style.border = "2px solid black";
      selectedItem.setAttribute("selected", true);
    }
  } else {
    if (ev && ev.getAttribute && ev.getAttribute("selected") != "true") {
      ev.style.border = "2px solid black";
      ev.setAttribute("selected", true);
      selectedItem = ev;
    }
  }
  if (selectedItem) {
    let type = "table";
    if (selectedItem.getAttribute("class").indexOf("section") > -1) {
      type = "section";
    }
    if (type == "table") {
      let tblid = selectedItem.id.replace("newId", "");
      let table;
      tables.forEach(tbl => {
        if (tbl.id == tblid) {
          table = tbl;
        }
      });
      if (table) {
        if (selectedItem.getAttribute("class").indexOf("locked") > -1) {
          document.getElementById("tbltype").innerHTML =
            '<i class="fa fa-lock itable locked" aria-hidden="true"></i>';
        } else {
          document.getElementById("tbltype").innerHTML =
            '<i class="fa fa-unlock itable" aria-hidden="true"></i>';
        }
        document.getElementById("tblno").innerHTML = table.tableno;
        document.getElementById("tbltoseat").innerHTML = table.seats;
      }
    }
  }
  return false;
}

function drag(ev) {
  select(ev);
  if (ev && ev.dataTransfer) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}

function getToolType(obj) {
  let type = obj && obj.getAttribute && obj.getAttribute("class");
  if (type.indexOf("section") > -1) {
    return sections;
  }
  if (type.indexOf("table") > -1) {
    return tables;
  }
}

function drop(ev) {
  let obj = null;
  if (selectedItem) {
    obj = selectedItem;
  } else {
    if (ev.dataTransfer && ev.dataTransfer.getData("text")) {
      let data = ev.dataTransfer.getData("text");
      obj = document.getElementById(data);
    }
  }

  if (selectedItem == null && obj == null) {
    return;
  }
  let container = tables;
  if (obj && !obj.getAttribute("placed")) {
    var nodeCopy = obj.cloneNode(true);
    if (
      obj.getAttribute("class") &&
      obj.getAttribute("class").indexOf("iconsection") > -1
    ) {
      if (sections.length == 0) {
        nodeCopy = section.create();
        //container = sections;
      } else {
        nodeCopy = section.create(sections.length + 1);
      }
    } else {
      nodeCopy.id =
        getToolType(obj).length > 0
          ? "newId" + getToolType(obj).length
          : "newId0";
      tables.push({
        id: nodeCopy.id.replace("newId", ""),
        uid: nodeCopy.id,
        tableno: "",
        seats: 0,
        state: "A",
        date: new Date(),
        class: nodeCopy.getAttribute("class"),
        style: nodeCopy.style
      });
    }
    if (!nodeCopy) {
      return; // error condition for creation
    }
    nodeCopy.setAttribute("placed", true);
    //
    nodeCopy.style.position = "absolute";

    ev.target.appendChild(nodeCopy);
    obj = nodeCopy;
    //container.push(obj);
  }
  if (stopdrop) {
    stopdrop = false;
    return;
  }
  let pageX = ev.clientX;
  let pageY = ev.clientY;
  let offsetLeft = ev.target.getBoundingClientRect().left;
  let offsetTop = ev.target.getBoundingClientRect().top;
  let newTop = pageY - offsetTop - obj.offsetHeight / 2;
  let newLeft = pageX - offsetLeft - obj.offsetWidth / 2;
  if (newTop < 0) newTop = 0;
  if (newLeft < 0) newLeft = 0;
  obj.style.top = newTop + "px";
  obj.style.left = newLeft + "px";
  select(obj);
  ev.preventDefault();
}

document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  if (event.keyCode == 8) {
    if (selectedItem && !contextmenuSelected) {
      if (selectedItem.getAttribute("class").indexOf("section") > -1) {
        id = selectedItem.id.replace("section", "");
        sections.forEach(s => {
          if (s.id == id) {
            s.state = "D";
          }
        });
      } else {
        id = selectedItem.id.replace("newId", "");
        tables.forEach(t => {
          if (t.id == id) {
            t.state = "D";
            document.getElementById("tbltype").innerHTML = "";
            document.getElementById("tblno").innerHTML = "";
            document.getElementById("tbltoseat").innerHTML = "";
            document.getElementById("tblsection").innerHTML = "";
            document.getElementById("rseats").innerHTML =
              parseInt(document.getElementById("rseats").innerHTML) +
              parseInt(t.seats);
          }
        });
      }
      selectedItem.remove();
      selectedItem = null;
    }
  }
  if (event.keyCode == 37) {
    if (selectedItem) {
      let left = parseInt(selectedItem.style.left.replace("px", "")) - 1;
      if (left >= 0) selectedItem.style.left = left + "px";
    }
  }
  if (event.keyCode == 38) {
    if (selectedItem) {
      let top = parseInt(selectedItem.style.top.replace("px", "")) - 1;
      if (top >= 0) selectedItem.style.top = top + "px";
    }
  }
  if (event.keyCode == 39) {
    if (selectedItem) {
      let left = parseInt(selectedItem.style.left.replace("px", "")) + 1;
      if (left >= 0) selectedItem.style.left = left + "px";
    }
  }

  if (event.keyCode == 40) {
    if (selectedItem) {
      let top = parseInt(selectedItem.style.top.replace("px", "")) + 1;
      if (top >= 0) selectedItem.style.top = top + "px";
    }
  }

  // do something
});
