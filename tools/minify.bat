@ECHO ON
REM Starting to minify JS & CSS files ...

@ECHO OFF
REM don't watch the sausage being made

REM the folder this script is in 
SET TOOLS=%~DP0
SET CORE=%TOOLS%\..\src
SET OUT_DIR=%TOOLS%\..\release

REM Combine JS files into one file
type "%CORE%\util.js" "%CORE%\calendar.js" "%CORE%\calendar_header.js" "%CORE%\calendar_body.js" "%CORE%\event_list.js" "%CORE%\event_row.js" "%CORE%\event_data.js" "%CORE%\controller.js" > "%OUT_DIR%\events_calendar.js"

REM Combine CSS files into one file
type "%CORE%\style.css" > "%OUT_DIR%\events_calendar.css"

REM Combine other files into one file
type "%CORE%\dummy_data.json" > "%OUT_DIR%\dummy_data.json"

REM Compress with YUI Compressor  
java -jar "%TOOLS%\yuicompressor-2.4.7.jar" -o "%OUT_DIR%\events_calendar.min.js" "%OUT_DIR%\events_calendar.js"
java -jar "%TOOLS%\yuicompressor-2.4.7.jar" -o "%OUT_DIR%\events_calendar.min.css" "%OUT_DIR%\events_calendar.css"

del "%OUT_DIR%\events_calendar.js"
del "%OUT_DIR%\events_calendar.css"

REM cd "%TOOLS%"

@ECHO ON


