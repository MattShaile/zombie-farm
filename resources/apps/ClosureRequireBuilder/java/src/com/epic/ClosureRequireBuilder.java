package com.epic;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ClosureRequireBuilder {

    private static final int WAIT_TIME = 1;
    private static final String SEARCHING = "Searching";
    private static final String BUILDING = "Building";

    //public var progressBar:ProgressBar;
    //public var progressText:Label;
    //public var debugText:TextArea;

    private static String currentStatus = SEARCHING;

    private static ArrayList<String> filesToProcess = new ArrayList<String>();
    private static int filesComplete = 0;

    private static ArrayList<String[]> classes = new ArrayList<String[]>();

    private static String basePath;
    private static String namespaceFilter = "";
    private static String writeDirectory = "";

    public static void main(String[] args) throws IOException {
        if (args.length == 3) {
            basePath = args[0];
            namespaceFilter = args[1];
            writeDirectory = args[2];
        } else {
            System.out.println("Incorrect number of arguments, expecting 3 (basePath namespaceFilter writeDirectory");
        }

        start();
    }

    public static void start() throws IOException {
        getAllFiles(basePath);

        // Read all files, grab class names and provides
        for (int i = 0; i < filesToProcess.size(); i++) {
            processFile(filesToProcess.get(i));
        }

        currentStatus = BUILDING;

        // Get all used classes and insert requires
        for (int i = 0; i < filesToProcess.size(); i++) {
            processFile(filesToProcess.get(i));
        }

        // Check it out yo
    }

    private static void processFile(String path) throws IOException {
        String fileName = path.substring(path.lastIndexOf("\\") + 1, path.length() - 3);
        String fileData = readFile(path);

        String originalFileData;

        if (currentStatus == SEARCHING) {
            originalFileData = fileData;
            fileData = repackage(fileData, path);
            if (!fileData.equals(originalFileData)) {
                writeFile(path, fileData);
            }

            String classPath = getClassPath(fileData);
            if (classPath != null) {
                String[] newClass = new String[2];
                newClass[0] = fileName;
                newClass[1] = classPath;
                classes.add(newClass);
            } else {
                System.out.println("NO CLASS PATH FOUND FOR " + path);
            }
        } else {
            if (getClassPath(fileData) != null) {
                originalFileData = fileData;
                fileData = removeRequires(fileData);
                fileData = addRequires(fileData, fileName);
                if (!fileData.equals(originalFileData)) {
                    writeFile(path, fileData);
                }
            }
        }

        filesComplete++;
    }

    static String repackage(String str, String path) {
        if (path.contains("lib/") || path.contains("lib\\")) {
            return str;
        }

        int startPackageIndex = path.indexOf("js") + 3;

        String newPackage = path.substring(startPackageIndex, path.length() - 3).replace("\\", ".");

        str = str.replaceAll("goog.provide\\(['|\"](.*)['|\"]", "goog.provide('" + newPackage + "'");

        return str;
    }

    private static String getClassPath(String str) {

        Pattern pattern = Pattern.compile("goog.provide\\(['|\"](.*)['|\"]");
        Matcher matcher = pattern.matcher(str);

        return matcher.find() ? matcher.group(1) : null;
    }

    private static String removeRequires(String str) {
        str = str.replaceAll("goog.require\\(.*", "");

        str = str.replaceAll("(goog.provide\\(['|\"].*?['|\"]\\);)(\\s*)", "$1\n\n\n");

        return str;
    }

    private static String addRequires(String str, String name) {
        Pattern pattern = Pattern.compile("(.*goog.provide\\(['|\"](.*?)['|\"]\\);)", Pattern.DOTALL + Pattern.MULTILINE);
        Matcher matcher = pattern.matcher(str);

        if (!matcher.find()) {
            System.out.println("NO PROVIDE FOUND IN " + name);
            return str;
        }

        int insertionIndex = matcher.group(0).length();

        String requireStr = "\n\n";
        ArrayList<String> requireArr = getUsedClasses(str, name);
        for (int i = 0; i < requireArr.size(); i++) {
            requireStr += "goog.require('" + requireArr.get(i) + "');";
            if (i != requireArr.size() - 1) {
                requireStr += "\n";
            }
        }

        str = str.substring(0, insertionIndex) + requireStr + str.substring(insertionIndex, str.length());

        return str;
    }

    private static ArrayList<String> getUsedClasses(String str, String thisClass) {

        Pattern pattern = Pattern.compile("(goog.provide\\(['|\"].*?['|\"]\\);)(.*)", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(str);

        str = matcher.find() ? matcher.group(2) : str;

        ArrayList<String> myClasses = new ArrayList<String>();

        for (int i = 0; i < classes.size(); i++) {
            if (classes.get(i)[0].equals(thisClass)) {
                continue;
            }

            pattern = Pattern.compile("[\\W]" + classes.get(i)[0] + "[\\W]", Pattern.DOTALL + Pattern.MULTILINE);
            matcher = pattern.matcher(str);

            if (matcher.find()) {
                myClasses.add(classes.get(i)[1]);
            }
        }

        return myClasses;
    }

    static String readFile(String path) throws IOException {
        byte[] encoded = Files.readAllBytes(Paths.get(path));
        return Charset.defaultCharset().decode(ByteBuffer.wrap(encoded)).toString();
    }

    static void writeFile(String path, String content) throws IOException {
        FileWriter fw = new FileWriter(path);
        StringWriter sw = new StringWriter();
        sw.write(content);
        fw.write(sw.toString());
        fw.close();
    }

    static void getAllFiles(String basePath) {
        File dir = new File(basePath);

        if (dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; children != null && i < children.length; i++) {
                getAllFiles(basePath + "\\" + children[i]);
            }
        }

        if (dir.isFile()) {
            if (dir.getName().endsWith(".js") && dir.getAbsolutePath().contains(namespaceFilter)) {
                filesToProcess.add(dir.getAbsolutePath());
            }
        }
    }
}
