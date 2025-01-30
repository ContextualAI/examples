# Google Sheets Script for Intergrating Contextual AI
A Google Sheets script that automates form filling using Contextual AI's API integration. This script enables the automatic population of form fields based on a Contextual AI RAG agent.

## Features
- Use Contextual AI RAG Agents from within Sheets
- Real-time API integration

## Prerequisites 
- Access to Google Sheets
- Contextual AI API key

<br>

![Sheets Demo](sheets_demo.gif)

See how to use the script and configure it

## Configuring Sheets Script
- Here is an [example Google sheet](https://docs.google.com/spreadsheets/d/1Yh8SWJaF88Jz040j4dudSKJS5Npkbz4lxfdDHj9agkw/edit?usp=sharing) with the script installed
- Go to File > Make a copy (this way you have your own version)
- Go to Extensions > Apps Script
- Modify agent URL and API key with your agent ID and API key
- Add your form fields in Column A
- Add instructions in Column B (hidden by default)

## Running the Script
- There are already custom menu buttons that will run the scripts
- By selecting the three vertical dots on the buttons, you can modify the executed scripts
- Watch Column C for the current processing status
- Results will appear in real-time as they're fetched

## Code Structure
The [full code](sheets_script.js) for the script.
The script consists of two main functions:

### fetchDataAndPopulateSheet()
Main function that coordinates the data fetching process
Handles sheet range selection and iteration
Manages API call scheduling

```javascript
function fetchDataAndPopulateSheet() {
 const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 const loadingCell = sheet.getRange("D1");
 loadingCell.setValue("Bear with us... asking Contextual AI...");


//  update with your agent ID and API key
 const apiUrl = 'https://api.contextual.ai/v1/agents/99bd0fc6-75ca-4057-91b1-28dc1c261221/query?retrievals_only=false'
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
```

### makeApiCall()
Handles individual API calls to Contextual AI
Formats request payload
Processes API responses

```javascript
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
```

### Error Handling
The script includes basic error handling:
- API connection issues
- Data formatting problems
- Rate limiting responses
- Invalid sheet ranges

## Security Considerations
- Store API keys securely
- Don't share sheets containing API credentials
- Regularly rotate API keys
- Limit script access to necessary users only

## Troubleshooting

This guide assumes basic familiarity with Google Sheets and Apps Script. For detailed API documentation, refer to [API docs](https://docs.contextual.ai/).
