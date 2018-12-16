// datatable class

class DataTable {

    constructor(tableId, colTypes, tableData) {
        this.tableId = tableId;
        this.colTypes = colTypes;
        this.tableData = tableData;
        this.lastSortedColumn = -1;
        this.colCount = colTypes.length - 1;
        this.rowCount = tableData.length - 1;
    }

    show() {
        let table = document.getElementById(this.tableId);
        table.setAttribute("class", "table table-hover");
        let tableHead = document.createElement('thead');
        let tableBody = document.createElement('tbody');

        table.appendChild(tableHead);
        table.appendChild(tableBody);

        var tr = document.createElement('tr');
        tableHead.appendChild(tr);
        let colCount = 0;
        for (let col of this.colTypes) {

            var cell = document.createElement('th');
            var title = document.createElement("a");
            title.setAttribute("href", "#");
            title.innerHTML = col.text;
            title.onclick = this.sortTable.bind(this, colCount, col.type);

            cell.appendChild(title);

            let filter = document.createElement("input");
            filter.setAttribute("type", "text");
            filter.setAttribute("id", "filter" + colCount);
            filter.onkeyup = this.filterText.bind(this);
            filter.setAttribute("style", "display:block");

            cell.appendChild(filter);

            tr.appendChild(cell);
            colCount++;
        }

        for (let rowCount = 0; rowCount <= this.rowCount; rowCount++) {
            let row = document.createElement('tr');
            row.setAttribute("id", "row_" + rowCount);

            for (let colCount = 0; colCount <= this.colCount; colCount++) {
                let cell = document.createElement('td');
                if (this.colTypes[colCount].edit)
                    cell.setAttribute("contenteditable", "true");
                cell.setAttribute("id", "cell_" + colCount + "_" + rowCount);
                cell.appendChild(document.createTextNode(this.tableData[rowCount][colCount]));
                row.appendChild(cell);

                if (this.onRender) {
                    this.onRender(row, cell, rowCount, colCount,this.colTypes[colCount].type,);
                }
            }
            tableBody.appendChild(row);
        }
    }

    //Table sorting
    sortTable(colCount, type) {
        let sortColumn = colCount;
        let table = document.getElementById(this.tableId);
        let tbody = table.getElementsByTagName("tbody")[0];
        let rows = tbody.getElementsByTagName("tr");
        let arrayOfRows = [];
        type = type.toUpperCase();
        for (let i = 0, len = rows.length; i < len; i++) {
            arrayOfRows[i] = {};
            arrayOfRows[i].oldIndex = i;
            let celltext = rows[i].getElementsByTagName("td")[sortColumn].innerHTML.replace(/<[^>]*>/g, "");
            arrayOfRows[i].value = celltext;
            switch (type) {
                case "N": arrayOfRows[i].value = parseFloat(celltext); break;
                case "D": arrayOfRows[i].value = new Date(celltext); break;
                default: arrayOfRows[i].value = celltext.toLowerCase();
            }
        }
        if (sortColumn == this.lastSortedColumn) { arrayOfRows.reverse(); }
        else {
            this.lastSortedColumn = sortColumn;
            arrayOfRows.sort((a, b) => {
                let aval = a.value;
                let bval = b.value;
                return (aval == bval ? 0 : (aval > bval ? 1 : -1));
            });
        }
        let newTableBody = document.createElement("tbody");
        for (let i = 0, len = arrayOfRows.length; i < len; i++) {
            newTableBody.appendChild(rows[arrayOfRows[i].oldIndex].cloneNode(true));
        }
        table.replaceChild(newTableBody, tbody);
    }

    //Filtering table rows based on filter value
    filterText() {
        let hiddenRows = [];
        for (let row = 0; row <= this.rowCount; row++) {
            for (let col = 0; col <= this.colCount; col++) {
                let filterText = $('#filter' + col).val().toLowerCase().replace("*", ".*");

                const rex = new RegExp(filterText);

                let cellValue = $("#cell_" + col + "_" + row).text().toLowerCase();
                let result = rex.test(cellValue);
                if (!result) {
                    hiddenRows.push(row);
                    break;
                }
            }
        }

        for (let row = 0; row <= this.rowCount; row++) {
            if (hiddenRows.indexOf(row) != -1)
                $("#row_" + row).hide();
            else
                $("#row_" + row).show();
        }
    }
}
