var requirementTypesColor = {
	morning: 'rgb(0, 129, 228)',
	afternoon: 'rgb(235, 105, 0)',
	evening: 'rgb(131, 0, 222)',
	socialSciences: 'rgb(0, 155, 207)',
	humanities: 'rgb(248, 168, 0)',
	humanRelations: 'rgb(165, 79, 0)',
	communicationSkills: 'rgb(235, 79, 226)',
	quantitativeSkills: 'rgb(75, 51, 220)',
	naturalSciences: 'rgb(75, 204, 62)',
	transferElectives: 'rgb(99, 99, 99)',
	naturalScienceLab: 'rgb(101, 151, 29)',
	diversityCourse: 'rgb(213, 5, 92)'
}

var requirementTypesAbbrev = {
	morning: 'M',
	afternoon: 'A',
	evening: 'E',
	socialSciences: 'SS',
	humanities: 'H',
	humanRelations: 'R',
	communicationSkills: 'C',
	quantitativeSkills: 'Q',
	naturalSciences: 'NS',
	transferElectives: 'TE',
	naturalScienceLab: 'NS-L',
	diversityCourse: 'D'
}

var requirementTagCSS = {
	morning: 'tagM',
	afternoon: 'tagA',
	evening: 'tagE',
	socialSciences: 'tagSS',
	humanities: 'tagH',
	humanRelations: 'tagR',
	communicationSkills: 'tagC',
	quantitativeSkills: 'tagQ',
	naturalSciences: 'tagNS',
	transferElectives: 'tagTE',
	naturalScienceLab: 'tagNSL',
	diversityCourse: 'tagD'
}

function displayLegend(text) {
    text += '<div class="legend">';
	text += '<h4 id="legendhead">Legend:</h4>';
	text += '<ul>';
	var objectIndex;
	var firstLetter = '';
	for (objectIndex in requirementTypesColor) {
		firstLetter = objectIndex.substring(0,1);
		text+= '<li style="color: ' + requirementTypesColor[objectIndex] + ';">' + requirementTypesAbbrev[objectIndex] +
		': ' + firstLetter.toUpperCase() + objectIndex.substring(1) + '</li>';
	}
	text += '</ul>';
	text += '</div>';
	return text;
}

function displayValidation(text) {
   
   
    text += '<div  id="validationtable"><h4 >Validation:</h4></div>'
    planId = localStorage.getItem('jsonActivePlanID')
   

    // testPlan(int planId,int majorId, int schoolId)
    apiURL = 'http://localhost:5000/api/test/testPlan';
    apiURL += "/" + planId
    //alert(apiURL)
            $.ajax({
                url: apiURL,
                type: 'GET',
              

                success: function (jsonText) {
                    //alert(jsonText)
                    innertext = "<table class='validation'>"
                    for (var i = 0; i < jsonText.length; i++) {
                        innertext += "<tr><td>" + jsonText[i] + "</td></tr>"
                    }

                    innertext += "</table></div>"
                    document.getElementById("validationtable").innerHTML += innertext ;

                },
                error: function () {
                    alert('AJAX FAILED');
                }
            })

   // alert(text);
    return text;
}
	    /*<li style='color: rgb(0, 129, 228);'>M: Morning</li>
	    <li style='color: rgb(235, 105, 0);'>A: Afternoon</li>
	    <li style='color: rgb(131, 0, 222);'>E: Evening</li>
	    <li style='color: rgb(0, 155, 207);'>SS: Social Sciences</li>
	    <li style='color: rgb(248, 168, 0);'>H: Humanities</li>
	    <li style='color: rgb(165, 79, 0);'>R: Human Relations</li>
	    <li style='color: rgb(235, 79, 226);'>C: Communication Skills</li>
	    <li style='color: rgb(75, 51, 220);'>Q: Quantitative Skills</li>
	    <li style='color: rgb(75, 204, 62);'>NS: Natural Sciences</li>
	    <li style='color: rgb(99, 99, 99);'>TE: Transfer Electives</li>
	    <li style='color: rgb(101, 151, 29);'>NS-L: Natural Science Lab</li>
	    <li style='color: rgb(213, 5, 92);'>D: Diversity Course</li>*/
		
	    /*<li style='color: rgb(0, 155, 207);'>SS(Social Sciences): <span>0/15</span> Credits</li>
	    <li style='color: rgb(248, 168, 0);'>H: Humanities: <span>0/15</span> Credits</li>
	    <li style='color: rgb(165, 79, 0);'>R: Human Relations: <span>0</span> Credits</li>
	    <li style='color: rgb(235, 79, 226);'>C: Communication: Skills <span>0/10</span> Credits</li>
	    <li style='color: rgb(75, 51, 220);'>Q: Quantitative: Skills <span>0/5</span> Credits</li>
	    <li style='color: rgb(75, 204, 62);'>NS: Natural Sciences: <span>0/15</span> Credits</li>
	    <li style='color: rgb(99, 99, 99);'>TE: Transfer Electives: <span>0/30</span> Credits</li>
	    <li style='color: rgb(101, 151, 29);'>NS-L: Natural Science Lab: <span>0/5</span> Credits</li>
	    <li style='color: rgb(213, 5, 92);'>D: Diversity Course: <span>0/5</span> Credits</li>*/
    
	
function displayCreditMets(text) {
	text += '<div class="creditsmet">';
	text += '<h4>Credit Requirement Met Status</h4>';
	text += '<i class="refresh fa fa-refresh fa-spin"></i>';
	text += '<ul>';
	var objectIndex;
	var firstLetter = '';
	var noPrint = true;
	for (objectIndex in requirementTypesColor) {
		if (noPrint) {
			if (objectIndex.search('s') != 0) {
			    continue;
		    } else {
				noPrint = false;
			}
		}
		firstLetter = objectIndex.substring(0,1);
		text+= '<li style="color: ' + requirementTypesColor[objectIndex] + ';">' + requirementTypesAbbrev[objectIndex] +
		'(' + firstLetter.toUpperCase() + objectIndex.substring(1) + '): <span>0/15</span> Credits</li>';
	}
	text += '</ul>';
	text += '<i class="check fa fa-check-circle"></i>';
	text += '</div>';
	return text;
}

function displayTable(text, numOfColumn, numOfRow) {
	var columnIndex = 0;
	var rowIndex;
	var cellIndex;
	var tagIndex;
	var setClassText = '';
	var indent = '';
    

    // each table
	for (;columnIndex < activeDegreeTable.columnArray.length / 4; columnIndex++) {
		if (columnIndex != 0) {
			indent = ' style="margin-left: 20.5em;"';
		}
		text += '<div class="maintable1"' + indent + '>';
		text+= '<ul class="tableheader">';
		text+= '<li>' + activeDegreeTable.columnArray[columnIndex*4].year + ' Fall</li>';
		text+= '<li>' + activeDegreeTable.columnArray[columnIndex*4+1].year + ' Winter</li>';
		text+= '<li>' + activeDegreeTable.columnArray[columnIndex*4+2].year + ' Spring</li>';
		text+= '<li>' + activeDegreeTable.columnArray[columnIndex*4+3].year + ' Summer</li>';
		text+= '</ul>';
		rowIndex = 0;
	    cellIndex = 0

	    // each column in table's set of columns
	    for (var j = 0; j < 4; j++) {
	        var currentColumn = activeDegreeTable.columnArray[columnIndex * 4 + j].cellArray
            
            
	        text += '<ul class="table1'  + ' item"' +'id="' + columnIndex + "" + j + '">'

            //console.log(currentColumn)
            // each row in column
            for (var i = 0; i < currentColumn.length; i++) {

                if (currentColumn[i].course.courseNumber === "") {
                    break;
                }
              //  if (i == currentColumn.length -1 || currentColumn[i+1].course.courseNumber == "") {  //if last row
              //      setClassText = ' class="last"';
              //  }
	            //console.log(currentColumn[i].course.courseNumber)
				text+= '<li class="' + 'item"' + setClassText + '>';
				text += '<div class="cell">';
				

				text += '<p class="tabletext">' + currentColumn[i].course.courseNumber + '</p>';
				tagIndex = 0;
				for (;tagIndex < 1; tagIndex++) {
					//objectname[].length
					//text+= '<span id="' + requirementTagCSS[objectname[tagIndex]] + '">' + requirementTypesAbbrev[objectname[tagIndex]] + '</span>';
					text+= '<span id="' + 'tagM' + '">' + 'M' + '</span>';
				}
				text+= '</div>';
				text += '</li>';

            }
	        text += "<li class='item placeholder'></li>"

	        text += '</ul>';

	    }

		text += '</div>';
		
		text+= '<table class="tableborder">';
		text+= '<tr>';
		text+= '<td></td>';
		text+= '<td></td>';
		text+= '<td></td>';
		text+= '<td></td>';
		text+= '</tr>';
		text+= '</table>';
		
		text += '<div class="maintable2">';
		text += '<ul class="table2">';
		text += '<li>M</li>';
		text += '<li>M</li>';
		text += '<li>M</li>';
		text += '<li>M</li>';
		text += '</ul>';
		text += '<ul class="table2">';
		text += '<li>M</li>';
		text += '<li>M</li>';
		text += '<li>M</li>';
		text += '<li>M</li>';
		text += '</ul>';
		text += '</div>';
	}

    localStorage.setItem('numberOfTables', columnIndex);
   
	return text;
}


var dragToNewList = false;

function dragAndDrop() {
   table = localStorage.getItem('numberOfTables');
    var elem;
    groupArray = createDragAndDropGroupArray(table, 4)
   for (var i = 0; i < groupArray.length; i++) {
       elem = document.getElementById(groupArray[i]);
       //console.log(elem.children.length)

       Sortable.create(elem,
           {
               group: {
                   name: groupArray[i],
                   put: groupArray,

               },

               draggable: ".item",
              
               
           //    //ref: http://jsbin.com/fikecunuqo/edit?css,js,output
               onEnd: function (/**Event*/evt) {
                   if (evt.to.children.length == 2) {
                       var placeholder = evt.to.children[evt.newIndex - 1];
                       console.log(placeholder)
                       placeholder.parentNode.removeChild(placeholder);

                       evt.to.appendChild(placeholder);
                   }
          


               
           },
               animation: 150,
             
           });
   }
}

//*[@id="10"]/li[1]/div/p

function printElem(item, index) {
   // console.log(item.value)
}
function canBeDragged(elem) {
    return elem.length < 4
}
function createDragAndDropGroupArray(table, row) {
    var test = [];
    for (var i = 0; i < table; i++) {
        for (var j = 0; j < row; j++) {
            if (i == 0) {
                test[test.length] = ("0" + j) + ""

            }
            else
                test[test.length] = (i * 10 + j) + ""
        }

    }
    return test;
}

function tableObject() {
    this.columnArray = [];
    this.pushColumnObject = function (columnObj) {
        this.columnArray.push(columnObj);
    }
}
function columnObject(quarter, year) {
    this.cellArray = [];
    this.quarter = quarter;
    this.year = year;
    /*this.update = function (?) {
    	???
    }
    this.addInputBox = function (?) {
    	???
    }
    this.columnSort = function (?) {
	    ???
    }*/
    this.pushCellObject = function (cellObj) {
        this.cellArray.push(cellObj);
    }
    this.addCellObject = function (cellObj) {
        this.cellArray[cellObj.course.courseid] = cellObj;
    }
    this.popCellObject = function () {
        return this.cellArray.pop();
    }
    this.removeCellObject = function () {
    }
}

function cellObject(courseObj) {
    this.course = courseObj;
    //this.xIcon = removeObject;
    //this.undoIcon = undoObject;
    //this.inputBox = inputObject;
    this.addCourse = function (newCourse) {
        this.course = newCourse;
    }
    /*this.removeCourse = function (?) {
		???
	}
	this.showObject = function (?) {
		???
	}
	this.hideObject = function (?) {
		???
	}*/
}

function constructTable(courseObjects, courseListObjects, row) {
    //initialize variables
	var cellIndex = 0;
	//create a temp column
	var tempColumn = new columnObject('', 0);
	
	for (;cellIndex < courseObjects.length; cellIndex++) {
	    statusArray[courseObjects[cellIndex].courseID] = 1;
		var cell = new cellObject(courseObjects[cellIndex]);  //add course object to cell object
		if (maxYear == 0) {
		    maxYear = courseObjects[cellIndex].year;
		}
		else if (maxYear != 0 && minYear == 0) {
		    minYear = Math.min(maxYear, courseObjects[cellIndex].year);
		} else {
		    compare(maxYear, minYear, courseObjects[cellIndex].year); //get max/min year
		}
		tempColumn.pushCellObject(cell);    //add cell object to column object
	}
	cellIndex = 0;
	for (;cellIndex < 1460; cellIndex++) {  //fill undefined gap
		if (typeof statusArray[cellIndex] === 'undefined') {
			statusArray[cellIndex] = 0;
		}
	}
	numOfYear = maxYear - minYear + 1;
	cellIndex = 0;
	for (;cellIndex < numOfYear; cellIndex++) {   //add all necessary column
		activeDegreeTable.pushColumnObject(new columnObject('Fall', maxYear-numOfYear+1+cellIndex));
		activeDegreeTable.pushColumnObject(new columnObject('Winter', maxYear-numOfYear+1+cellIndex));
		activeDegreeTable.pushColumnObject(new columnObject('Spring', maxYear-numOfYear+1+cellIndex));
		activeDegreeTable.pushColumnObject(new columnObject('Summer', maxYear-numOfYear+1+cellIndex));
	}
	cellIndex = 0;
	var tempCellObject;
	var columnIndex;
	for (;cellIndex < tempColumn.cellArray.length; cellIndex++) {
		columnIndex = 0;
		for (;columnIndex < activeDegreeTable.columnArray.length; columnIndex++) {
			if (activeDegreeTable.columnArray[columnIndex].quarter == tempColumn.cellArray[cellIndex].course.quarter && 
			activeDegreeTable.columnArray[columnIndex].year == tempColumn.cellArray[cellIndex].course.year) {
				activeDegreeTable.columnArray[columnIndex].pushCellObject(tempColumn.cellArray[cellIndex]);
				break;
			}
		}
	}
	columnIndex = 0;
	for (;columnIndex < activeDegreeTable.columnArray.length; columnIndex++) {
	    while (activeDegreeTable.columnArray[columnIndex].cellArray.length < row) {
		    var emptyCourse = {
				"planId": -1,
				"courseNumber": "",
				"courseID": -1,
				"quarter": "",
				"year": -1
			}
			var emptyCell = new cellObject(emptyCourse);
			activeDegreeTable.columnArray[columnIndex].pushCellObject(emptyCell);
		}
	}
}

function compare(num1, num2, num3) {
    maxYear = Math.max(num1, num2, num3);
    minYear = Math.min(num1, num2, num3);
}
	  
function tableObject() {
    this.columnArray = [];
    this.pushColumnObject = function (columnObj) {
	    this.columnArray.push(columnObj);
	}
}

function columnObject(quarter, year) {
    this.cellArray = [];
    this.quarter = quarter;
    this.year = year;
    /*this.update = function (?) {
    	???
    }
    this.addInputBox = function (?) {
    	???
    }
    this.columnSort = function (?) {
	    ???
    }*/
    this.pushCellObject = function (cellObj) {
    	this.cellArray.push(cellObj);
    }
    this.addCellObject = function (cellObj) {
    	this.cellArray[cellObj.course.courseid] = cellObj;
    }
    this.popCellObject = function() {
	    return this.cellArray.pop();
    }
    this.removeCellObject = function () {
    }
}

function cellObject(courseObj) {
	this.course = courseObj;
	//this.xIcon = removeObject;
	//this.undoIcon = undoObject;
	//this.inputBox = inputObject;
	this.addCourse = function (newCourse) {
		this.course = newCourse;
	}
	/*this.removeCourse = function (?) {
		???
	}
	this.showObject = function (?) {
		???
	}
	this.hideObject = function (?) {
		???
	}*/
}	  