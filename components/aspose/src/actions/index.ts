import { convertHtmlToPdf } from "./convert/convertHtmlToPdf";
import { convertPdfToDoc } from "./convert/convertPdfToDoc";
import { convertPdfToHtml } from "./convert/convertPdfToHtml";
import { convertDiagram } from "./diagram/convertDiagram";
import { getDiagram } from "./diagram/getDiagram";
import { saveDiagramAs } from "./diagram/saveDiagramAs";
import { convertCloudStorageDocument } from "./document/convertCloudStorageDocument";
import { convertLocalDocument } from "./document/convertLocalDocument";
import { createDocument } from "./document/createDocument";
import { getDocument } from "./document/getDocument";
import { loadWebDocument } from "./document/loadWebDocument";
import { saveDocumentAs } from "./document/saveDocumentAs";
import { splitDocument } from "./document/splitDocument";
import { copyFile } from "./file/copyFile";
import { deleteFile } from "./file/deleteFile";
import { downloadFile } from "./file/downloadFile";
import { moveFile } from "./file/moveFile";
import { uploadFile } from "./file/uploadFile";
import { copyFolder } from "./folder/copyFolder";
import { createFolder } from "./folder/createFolder";
import { deleteFolder } from "./folder/deleteFolder";
import { getFilesList } from "./folder/getFilesList";
import { moveFolder } from "./folder/moveFolder";

export default {
  createFolder,
  copyFolder,
  deleteFolder,
  moveFolder,
  getFilesList,
  downloadFile,
  deleteFile,
  copyFile,
  uploadFile,
  moveFile,
  createDocument,
  getDocument,
  loadWebDocument,
  getDiagram,
  convertDiagram,
  saveDiagramAs,
  convertLocalDocument,
  convertCloudStorageDocument,
  saveDocumentAs,
  convertHtmlToPdf,
  convertPdfToHtml,
  convertPdfToDoc,
  splitDocument,
};
