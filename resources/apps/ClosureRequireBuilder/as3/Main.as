package as3
{
	import fl.controls.Button;
	import fl.controls.Label;
	import fl.controls.ProgressBar;
	import fl.controls.TextArea;
	import fl.controls.TextInput;
	import flash.desktop.NativeApplication;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.InvokeEvent;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.net.SharedObject;
	import flash.utils.Timer;
	
	/**
	 * ...
	 * @author Matt Shaile
	 */
	public class Main extends MovieClip
	{
		private const SUBMIT_TEXT:String = "Go";
		private const BUSY_TEXT:String = "Working...";
		private const WAIT_TIME:int = 1;
		private const SEARCHING:String = "Searching";
		private const BUILDING:String = "Building";
		
		public var inputText:TextInput;
		public var inputButton:Button;
		private var _inputDirectory:File;
		
		public var submitButton:Button;
		
		public var progressBar:ProgressBar;
		public var progressText:Label;
		public var debugText:TextArea;
		
		private var _currentStatus:String;
		
		private var _filesToProcess:Array;
		private var _filesComplete:int;
		
		private var _classes:Array;
		
		private var _loadTimer:Timer;
		private var _so:SharedObject;
		
		private var _namespaceFilter:String = "";
		private var _writeDir:String = "";
		
		public function Main()
		{
			NativeApplication.nativeApplication.addEventListener(InvokeEvent.INVOKE, onInvoke);
			
			_so = SharedObject.getLocal("ClosureRequireBuilder");
			if (_so.data.input)
			{
				_inputDirectory = new File();
				_inputDirectory = _inputDirectory.resolvePath(_so.data.input);
				inputDirectorySelected();
			}
			inputButton.addEventListener(MouseEvent.CLICK, selectInputClicked);
			submitButton.addEventListener(MouseEvent.CLICK, submitClicked);
			
			enableUI(true);
		}
		
		private function onInvoke(e:InvokeEvent):void
		{
			if (e && e.arguments && e.arguments[0] && e.arguments[0].length)
			{
				inputText.text = e.arguments[0];
				
				_inputDirectory = new File();
				_inputDirectory = _inputDirectory.resolvePath(inputText.text);
				inputDirectorySelected();
			}
			
			if (e && e.arguments && e.arguments[1] && e.arguments[1].length)
			{
				_namespaceFilter = e.arguments[1];
			}
			if (e && e.arguments && e.arguments[2] && e.arguments[2].length)
			{
				_writeDir = e.arguments[2];
			}
			
			submitClicked();
		}
		
		private function enableUI(enable:Boolean):void
		{
			inputText.enabled = enable;
			inputButton.enabled = enable;
			submitButton.enabled = enable;
			submitButton.label = enable ? SUBMIT_TEXT : BUSY_TEXT;
		}
		
		private function selectInputClicked(e:MouseEvent):void
		{
			_inputDirectory = new File();
			_inputDirectory.addEventListener(Event.SELECT, inputDirectorySelected);
			_inputDirectory.browseForDirectory("Select a project root directory");
		}
		
		private function inputDirectorySelected(e:Event = null):void
		{
			_so.data.input = _inputDirectory.nativePath;
			_so.flush();
			inputText.text = _inputDirectory.nativePath;
		}
		
		private function submitClicked(e:MouseEvent = null):void
		{
			enableUI(false);
			
			_currentStatus = SEARCHING;
			
			_classes = [];
			
			_filesComplete = 0;
			_filesToProcess = [];
			
			if (_inputDirectory.isDirectory)
			{
				searchDirectory(_inputDirectory);
			}
			else
			{
				_filesToProcess.push(_inputDirectory);
			}
			
			progressBar.setProgress(0, _filesToProcess.length - 1);
			
			if (_filesToProcess.length <= 0)
			{
				progressText.text = "No files found";
				enableUI(true);
			}
			else
			{
				_loadTimer = new Timer(WAIT_TIME, _filesToProcess.length);
				_loadTimer.addEventListener(TimerEvent.TIMER, processNextFile);
				_loadTimer.addEventListener(TimerEvent.TIMER_COMPLETE, complete);
				_loadTimer.start();
			}
		}
		
		private function searchDirectory(directory:File):void
		{
			var files:Array = directory.getDirectoryListing();
			
			for (var i:int = 0; i < files.length; i++)
			{
				var file:File = files[i] as File;
				if (file.isDirectory)
				{
					searchDirectory(file);
				}
				else if (file.extension == "js" && file.nativePath.indexOf(_namespaceFilter) != -1)
				{
					_filesToProcess.push(file);
				}
			}
		}
		
		private function processNextFile(e:TimerEvent):void
		{
			processObject(_filesToProcess[_loadTimer.currentCount - 1]);
		}
		
		private function processObject(file:File):void
		{
			var fileStream:FileStream = new FileStream();
			fileStream.open(file, FileMode.READ);
			var fileData:String = fileStream.readUTFBytes(fileStream.bytesAvailable);
			fileData = fileData.replace(File.lineEnding, "\n");
			fileStream.close();
			
			progressText.text = _currentStatus + "... " + _filesComplete + "/" + (_filesToProcess.length - 1) + " searched [" + file.name + "]";
			
			var originalFileData:String;
			
			if (_currentStatus == SEARCHING)
			{
				originalFileData = fileData;
				fileData = repackage(fileData, file.nativePath);
				if (fileData != originalFileData)
				{
					saveFile(file, fileData);
				}
				
				var classPath:String = getClassPath(fileData);
				if (classPath)
				{
					_classes.push([file.name.slice(0, file.name.length - 3), classPath]);
				} else {
					debugText.text += "NO CLASS PATH FOUND FOR " + file.name + "\n";
				}
			}
			else
			{
				if (getClassPath(fileData))
				{
					originalFileData = fileData;
					fileData = removeRequires(fileData);
					fileData = addRequires(fileData, file.name);
					if (fileData != originalFileData)
					{
						saveFile(file, fileData);
					}
				}
			}
			
			_filesComplete++;
			progressBar.setProgress(_filesComplete, _filesToProcess.length - 1);
		}
		
		private function saveFile(file:File, data:String):void
		{
			var filePath:String = file.nativePath;
			
			if (filePath.indexOf(_writeDir) == -1)
			{
				return;
			}
			
			var file:File = File.desktopDirectory.resolvePath(filePath);
			var stream:FileStream = new FileStream();
			stream.open(file, FileMode.WRITE);
			stream.writeUTFBytes(data);
			stream.close();
		
		}
		
		private function repackage(str:String, path:String):String
		{
			if (path.indexOf("lib/") != -1 || path.indexOf("lib\\") != -1) {
				return str;
			}
			
			var startPackageIndex:int =path.indexOf("js") + 3;
			
			var newPackage:String = path.slice(startPackageIndex, path.length - 3).split("\\").join(".");
			
			var regExp:RegExp;
			regExp = new RegExp("goog.provide\\(['|\"](.*)['|\"]", "g");
			
			str = str.replace(regExp, "goog.provide('" + newPackage + "'");
			
			return str;
		}
		
		private function getClassPath(str:String):String
		{

			var regExp:RegExp;
			regExp = new RegExp("goog.provide\\(['|\"](.*)['|\"]", "g");
			
			var result:Object = regExp.exec(str);
			
			return result ? result[1] : null;
		}
		
		private function removeRequires(str:String):String
		{
			str = str.replace(new RegExp("goog.require\\(.*", "g"), "");
			
			str = str.replace(new RegExp("(goog.provide\\(['|\"].*?['|\"]\\);)(\\s*)", "sm"), "$1\n\n\n");
			
			return str;
		}
		
		private function addRequires(str:String, name:String):String
		{
			name = name.slice(0, name.length - 3);
			
			var regExp:RegExp = new RegExp("(.*goog.provide\\(['|\"](.*?)['|\"]\\);)", "sm");
			var result:Object = regExp.exec(str);
			if (!result)
			{
				debugText.text += "NO PROVIDE FOUND IN " + name + "\n";
				return str;
			}
			else
			{
				var insertionIndex = result[0].length;
			}
			
			var requireStr:String = "\n\n";
			var requireArr:Array = getUsedClasses(str, name);
			for (var i:int = 0; i < requireArr.length; i++)
			{
				requireStr += "goog.require('" + requireArr[i] + "');";
				if (i != requireArr.length - 1)
				{
					requireStr += "\n";
				}
			}
			
			str = str.slice(0, insertionIndex) + requireStr + str.slice(insertionIndex, str.length);
			
			return str;
		}
		
		private function getUsedClasses(str:String, thisClass:String):Array
		{
			var regExp:RegExp = new RegExp("(goog.provide\\(['|\"].*?['|\"]\\);)(.*)", "sm");
			var result:Object = regExp.exec(str);
			str = result ? result[2] : str;
			
			var classes:Array = [];
			
			for (var i:int = 0; i < _classes.length; i++)
			{
				if (_classes[i][0] == thisClass)
				{
					continue;
				}
				regExp = new RegExp("[\\W]" + _classes[i][0] + "[\\W]");
				if (regExp.test(str))
				{
					classes.push(_classes[i][1]);
				}
			}
			
			return classes;
		}
		
		private function complete(e:TimerEvent):void
		{
			if (_currentStatus == SEARCHING)
			{
				_currentStatus = BUILDING;
				_filesComplete = 0;
				
				_loadTimer = new Timer(WAIT_TIME, _filesToProcess.length);
				_loadTimer.addEventListener(TimerEvent.TIMER, processNextFile);
				_loadTimer.addEventListener(TimerEvent.TIMER_COMPLETE, complete);
				_loadTimer.start();
				
			}
			else
			{
				progressText.text = "Completed (" + _filesToProcess.length + " files)";
				
				_loadTimer.removeEventListener(TimerEvent.TIMER, processNextFile);
				_loadTimer.removeEventListener(TimerEvent.TIMER_COMPLETE, complete);
				_loadTimer = null;
				
				enableUI(true);
				
				NativeApplication.nativeApplication.exit();
			}
		}
	
	}

}