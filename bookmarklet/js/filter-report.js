/**
 * WCAG 2 Parsing Validation Filter bookmarklet
 * Reports the number of errors and warnings found affecting accessibility and describes errors according to WCAG 2 Success Criterion 4.1.1 Parsing.
 * Version 5
 *
 * Author: Jon Gibbins
 * Based on code by Steve Faulkner
 * https://developer.paciellogroup.com/blog/2012/02/wcag-2-0-parsing-error-bookmarklet/
 *
 * Bookmarklet
 * Compressed with Crunchinator:
 * http://ted.mielczarek.org/code/mozilla/bookmarklet.html
 * javascript:(function(){javascript:(function(){var filters=["tag seen","Stray end tag","Bad start tag","violates nesting rules","Duplicate ID","Unclosed element","not allowed as child of element","unclosed elements","unquoted attribute value","Duplicate attribute","descendant of an element with the attribute"].join("|"),i,nT=0,nP1=0,result,resultText,results,resultsP1={},root=document.getElementById("results");if(!root){return;}results=root.getElementsByTagName("li");for(i=results.length-1;i>=0;i--){result=results[i];if(result.id.substr(0,3)==="vnu"){if(result.className!=="info"){nT=nT+1;}resultText=""+result.textContent;resultText=resultText.substring(0,resultText.indexOf('.'));if(resultText.match(filters)==null){result.style.display="none";result.className=result.className+"a11y-ignore";}else{resultsP1[resultText.substr(7)]=true;nP1=nP1+1;}}}resultText="";for(i in resultsP1){if(resultsP1.hasOwnProperty(i)){resultText=resultText+"- "+i+"\n";}}alert(nT+" validation errors and warnings.\n"+nP1+" instances of errors known to create accessibility issues:\n"+resultText);})();})();
 */
javascript: (function () {
	var filters = [
				{"Duplicate ID"},
				"tag seen",
				"Stray end tag",
				"Bad start tag",
				"violates nesting rules",
				"Duplicate ID"
				// "first occurrence of ID", // Warning related to "Duplicate ID"
				"Unclosed element",
				"not allowed as child of element",
				"unclosed elements",
				// "not allowed on element", // "Attribute X not allowed on element"
				"unquoted attribute value",
				"Duplicate attribute",
				"descendant of an element with the attribute"
			].join("|"),
		i,
		nT = 0, // Total validation errors and warnings
		nP1 = 0, // Errors affecting accessibility at P1
		// nP2 = 0, // Errors affecting accessibility at P2
		result,
		resultText,
		results,
		resultsP1 = {},
		// resultsP2 = {},
		// resultsWarnings = {},
		root = document.getElementById("results");

	if (!root) {
		return;
	}

	results = root.getElementsByTagName("li");

	for (i = results.length - 1; i >= 0; i--) {
		result = results[i];

		// Filter to only match first-level list items
		if (result.id.substr(0, 3) === "vnu") {
			if (result.className !== "info") {
				nT = nT + 1;
			}

			resultText = "" + result.textContent; // Result to string
			resultText = resultText.substring(0, resultText.indexOf('.')); // Trim

			if (resultText.match(filters) == null) {
				result.style.display = "none";
				result.className = result.className + "a11y-ignore";
			}
			// else if (resultText.match("not allowed on element") != null) {
			// 	// Separate "Attribute X not allowed on element" errors from others
			// 	resultsP2[resultText.substr(7)] = true;
			// 	nP2 = nP2 + 1;
			// }
			else {
				// All other errors
				resultsP1[resultText.substr(7)] = true;
				nP1 = nP1 + 1;
			}

			//if (resultText.substring(0, 8) == 'Warning:') {
			//	resultsWarnings[resultText.substr(9)] = true;
			//}
		}
	}

	resultText = "";

	// Add warnings to report
	//for (i in resultsWarnings) {
	//	if (resultsWarnings.hasOwnProperty(i)) {
	//		resultText = i + "; " + resultText;
	//	}
	//}
	//resultText = "\nWarnings:\n" + resultText;

	// Add P2 errors to report
	// for (i in resultsP2) {
	// 	if (resultsP2.hasOwnProperty(i)) {
	// 		resultText = i + "; " + resultText;
	// 	}
	// }
	// resultText = "\n" + nP2 + " low priority errors:\n" + resultText + "\n";

	// Add P1 errors to report
	for (i in resultsP1) {
		if (resultsP1.hasOwnProperty(i)) {
			resultText = resultText + "- " + i + "\n";
		}
	}
	// resultText = "\n" + nP1 + " high priority errors:\n" + resultText + "\n";

	// Output report
	// alert(nT + " validation errors and warnings.\nErrors that may impact accessibility:" + resultText);
	alert(nT + " validation errors and warnings.\n" + nP1 + " instances of errors known to create accessibility issues:\n" + resultText);
})();
