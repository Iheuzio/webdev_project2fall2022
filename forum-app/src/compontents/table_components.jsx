
import React from 'react';

/**
 * @description This is the table component that is used to render the tables, we map it to have the ability to render multiple tables used for side and side_start
 * @param {tables} Passes in the list of tables to be rendered based on an array of objects
 * @returns 
 */
const TableComponent = ({ tables }) => {
  return (
      // This is the table component that is used to render the tables, we map it to have the ability to render multiple tables
    <div>
      {tables.map(table => {
        // This is the destructuring of the table object
        let { title, headers, data, id } = table;
        // if the data is null we know that the table is empty and we return an empty div
        if (!data || data.length === 0) return <div></div>;
        // meanwhile we know that the admin table is empty and we return an empty div for the header data
        if (!headers || headers.length === 0) {
          headers = data[0].map(() => '');
        }
        return (
          // have an extra  for fragment so we can wrap the br with the final div (adds visual spacing that is a block eleement when there's overflow)
          // max spacing is just the height of the table
          // table spacing is just the values of the tables as well as how they should be displayed using flex and such, Also specifies distance between the tables and styles them
          <><div id="max_spacing">
            <div id="table_spacing">
              {/* This id is passed here because we need to alternate the background color of the tables */}
              <table id={id}>
                <thead>
                  <tr>
                    {/* This is the title of the table relative to its value in the array, we also set the colspan to the amount of values in the body data*/}
                    <th colSpan={data.length} id="header_style">{title}</th>
                  </tr>
                  <tr>
                    {/* This is the headers data of the table relative to its value in the array */}
                    {headers.map(header => <th id="header_row">{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {/* For each of the rows in the data array we map it to the table based on the region in the array and that cell gets mapped itself, the rows get appended when the cells are mapped */}
                  {data.map((row, index) => (
                    <tr key={index}>
                      {row.map(cell => <td>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             {/* Break is for spacing so we have a block element so when it overflows you can see the spacing still */}
          </div><br /></>

        );
      })}
    </div>
  );
}

export default TableComponent;