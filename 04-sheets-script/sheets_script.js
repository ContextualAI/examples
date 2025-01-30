function fetchDataAndPopulateSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const loadingCell = sheet.getRange("D1");
  loadingCell.setValue("Bear with us... asking Contextual AI...");

//  update with your agent ID and API key
  const apiUrl = 'https://api.contextual.ai/v1/agents/99bd0fc6-75ca-4057-91b1-28dc1c201221/query?retrievals_only=false'
  const apiKey = 'key-ADD_YOURS';

  try {
    const scopeMetadata = sheet.getRange(1, 3).getValue(); // Column B, Row 1
    const formFieldsRange = sheet.getRange(5, 1, sheet.getLastRow() - 4, 2); // Columns A and B starting from Row 5
    const formFieldsValues = formFieldsRange.getValues();

    const rowsWithData = formFieldsValues
      .map(([field, instructions], idx) => ({ field, instructions, row: idx + 5 }))
      .filter(({ field, instructions }) => field && instructions);

    rowsWithData.forEach(({ row }) => {
      sheet.getRange(row, 3).setValue("Bear with us... asking Contextual AI...");
    });

    // Staggered execution of API calls
    rowsWithData.forEach((data, index) => {
      makeApiCall(data, scopeMetadata, apiUrl, apiKey, sheet);
    });
  } catch (error) {
    console.error(`Error in fetchDataAndPopulateSheet: ${error.message}`);
  } finally {
    loadingCell.clearContent();
  }
}

function makeApiCall(data, scopeMetadata, apiUrl, apiKey, sheet) {
  
  const { field, instructions, row } = data;
  console.log(`Starting call: ${row}`)
  const messageContent = `Ignore the previous format. ${instructions}: ${field} (${scopeMetadata})`;

  const payload = {
    messages: [
      {
        content: messageContent,
        role: "user",
      },
    ],
  };

  const options = {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    payload: JSON.stringify(payload),
  };

  try {
    sheet.getRange(row, 3).setValue("Bear with us... asking Contextual AI...");
    SpreadsheetApp.flush(); // Ensure the value is displayed before the API call
    const response = UrlFetchApp.fetch(apiUrl, options);
    const result = JSON.parse(response.getContentText());
    console.log(`Finished call: ${row}`)
    const answer = result.message.content.trim();
    const retrievalContents = JSON.stringify(result.retrieval_contents, null, 2);
    const attributions = JSON.stringify(result.attributions, null, 2);

    // Populate the sheet with the API response data
    sheet.getRange(row, 3).setValue(answer); // Column C (Answer)
    //sheet.getRange(row, 4).setValue(retrievalContents); // Column D (Retrieved Documents)
    //sheet.getRange(row, 5).setValue(attributions); // Column E (Evidence)
    SpreadsheetApp.flush();
  } catch (error) {
    console.error(`Error in processing row ${row}: ${error.message}`);
    sheet.getRange(row, 3).setValue("Error: " + error.message);
  }
}


function clearPopulatedRows() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Show loading message
    const loadingCell = sheet.getRange("D1");
    loadingCell.setValue("Clearing...");

    try {
        // Determine the range to clear
        const startRow = 5; // Starting row
        const startColumn = 3; // Starting column (Column C)
        const numColumns = 3; // Number of columns to clear (C, D, E)
        const lastRow = sheet.getLastRow(); // Last row in the sheet

        // Clear the range
        const range = sheet.getRange(startRow, startColumn, lastRow - startRow + 1, numColumns);
        range.clearContent();
    } finally {
        // Clear the loading message
        loadingCell.clearContent();
    }
}