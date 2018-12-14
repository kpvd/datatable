
Questions and answers
---------------------

1.How long did you spend on the test? Would you do anything differently if you had more time?

     I spent one and half day on the test. Yes I would do the following things
      1. Add different types of filter for date and numeric columns instead of using same Regex based 
         filter for all columns
      2. Add plugable themes instead of hard coding styles.
      3. Expandable column width by dragging column borders
     
2.In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required

     1. I would add better scripting to configure the datatable for many scenarios.
     2. Ability to run scripts on change of the cell value
     3. Frozen columns and rows
     4. Configurable headers with main headers and sub headers
     
3.What is your favorite CSS property? Why?

      NA
      
4.What is your favorite modern Javascript feature? Why?

      async, await is my favorite feature. It removes callback approach and makes the code more readable
      
5. What is your favorite third-party Vue.js library? Why?

       NA

Datatable features
------------------


This datatable implements the basic requirement expected from a datatable like 
sorting, filtering and scripting

Notes:
1. This implementation is based on ES6(i.e. not supported in older browsers)
2. This implementation is basic (i.e. JavaScript implementation is < 150 lines )
3. The only external Javascript library used in JQuery.
4. The only external css file used is bootstrap


Usage:

1. Create a table tag like the following with a 'id' in html

       <table id="my_table" ></table>

2. Then create a datatable object.
      
       let table = new DataTable(table_id, table_column_definitions, table_data)

    Datatable parameters

        1. table_id --> id of the table (i.e. in our case 'my_table' )
  
        2. table_column_difinitions --> javascript object in the following format
             {
                text: "Description",
                type: "T",
                edit:true
             }
             1. 'text' is the header of the datatable column 
             2. 'type' is either 'T' or 'D' or 'N' (i.e. 'T' for text column, 'D' is for date column and 'N' is for numeric column )
             3. 'edit' is true or false ( true if the cell is editable. The cell can be editable by clicking on the cell )


       3. table_data --> is the actual array based data that will be rendered. for example  
                let array_data =[
                   ["3471DA17-401F-9633-BF81-4CADA6FD5C79", "Kyra Lester", "Curabitur dictum. Phasellus in", "2017-07-23T04:24:49-07:00", 345.54],
                   ["9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E", "Buckminster Alvarado", "dui, in sodales elit erat vitae risus. Duis a mi", "2018-11-08T05:44:15-08:00", 677.08]
                  ];
           an array of array with 2 rows and 5 columns in our case.

     Example datatable object

                    let dataTable = new DataTable("my_table",
                    [{ text: "ID", type: "T" },
                    { text: "Name", type: "T" },
                    { text: "Description", type: "T", edit: true },
                    { text: "Date", type: "D" },
                    { text: "Amount", type: "N" }],
                    array_data);

3. Showing the datatable 

          datatable.show() (without calling 'show' function, datatable wont be shown)
4. Scripting

           It is possible to script the datatable like the following

                table.onRender = function (row, cell, rowNo, cellNo, type){}

           The 'onRender' function will be called for each cell in the tabel once. it can be used to 
           script things like background color of the cell or row, or add additional styles or 
           modify cell content 

          'onRender' parameters
             1. row --> the current 'row' node  (i.e. 'tr' javascrip node object)
             2. cell--> the current 'cell' node (i.e. 'td' javascript node object)
             3. rowNo --> the current row number
             4. cellNo --> the current cell number
             5. type --> the type of the cell, either 'T' or 'D' or 'N'

          Example
             1. To make the second column bold

                table.onRender = function (row, cell, rowNo, cellNo, type) {
                   if (cellNo == 1) {
                       cell.style = "font-weight: bold";
                   }
                }

             2. To make the third column bold abd blue

                table.onRender = function (row, cell, rowNo, cellNo, type) {
                  if (cellNo == 2) {
                    cell.style = "font-weight: bold;color:blue";
                  }
                }

             3. To make the fourth numeric column red if the value is less than zero

                table.onRender = function (row, cell, rowNo, cellNo, type) {
                   if (type == "N" && cellNo == 4) {
                        if (parseFloat(cell.innerHTML) < 0)
                        cell.style = "color:red;font-weight: bold";
                    }
                }

4. Complete example
  
        1. In HTML

            <table id="my_table" ></table>

        2. In Javascript

             let table = new DataTable(
                "my_table",
                [   { text: "ID", type: "T" },
                    { text: "Name", type: "T" },
                    { text: "Description", type: "T", edit: true },
                    { text: "Date", type: "D" },
                    { text: "Amount", type: "N" }
                ],
                TEST_DATA);



        table.onRender = function (row, cell, rowNo, cellNo, type) {
                if (cellNo == 1) {
                    cell.style = "font-weight: bold";
                }

                if (cellNo == 0) {
                    cell.style = "font-style: italic; color:grey";
                }

                if (cellNo == 2) {
                    cell.style = "font-weight: bold;color:blue";
                }

                if (type == "N" && cellNo == 4) {
                    if (parseFloat(cell.innerHTML) < 0)
                        cell.style = "color:red;font-weight: bold";
                }
        }
        table.show();

