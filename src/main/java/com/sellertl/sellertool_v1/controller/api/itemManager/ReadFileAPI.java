package com.sellertl.sellertool_v1.controller.api.itemManager;

import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@RestController
@RequestMapping(value = "/api/item_manager/read_file")
public class ReadFileAPI {
    // /api/item_manager/read_file/naver_excel
    @PostMapping("/naver_excel")
    public String ReadNaverExcelFile(HttpServletRequest request, @RequestParam("readFiles") MultipartFile readFile) throws Exception {
        try {
            // 파일 읽어들이기
            MultipartFile file = readFile;
            
            // Iterator<String> mIterator = request.getFileNames();
            // if (mIterator.hasNext()) {
            //     file = request.getFile(mIterator.next());
            // }

            // // 엑셀파일 열기 (엑셀버전 2007 이상일때, 오픈방법)
            OPCPackage opcPackage = OPCPackage.open(file.getInputStream());
            XSSFWorkbook wb = new XSSFWorkbook(opcPackage);

            // Sheet 수
            int sheetNum = wb.getNumberOfSheets();

            // Sheet 수만큼 Loop
            for (int num = 0; num < sheetNum; num++) {

                XSSFSheet sheet = wb.getSheetAt(num);
                Iterator<Row> iterator = sheet.iterator();

                // Row
                while (iterator.hasNext()) {
                    Row currentRow = iterator.next();
                    Iterator<Cell> cellIterator = currentRow.iterator();

                    // Cell
                    while (cellIterator.hasNext()) {
                        Cell currentCell = cellIterator.next();

                        /*
                         * poi라이브러리에서 Cell안에 데이터를 꺼내기 위해서 셀타입에 따라 접근연산자(.)로 꺼내는 메소드가 달라지기 때문에 셀타입을 비교 후
                         * 셀데이터를 추출합니다.
                         */
                        if (currentCell.getCellTypeEnum() == CellType.STRING) {
                            System.out.print(currentCell.getStringCellValue() + "\t");
                        } else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
                            System.out.print((int) currentCell.getNumericCellValue() + "\t");
                        }
                    }
                    System.out.println(); // Row를 구분해주기 위한 엔터
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"message\":\"error\"}";
        }
        return "{\"message\":\"SUCCESS\"}";
    }
}
