function calandarHandler() {
    return {
        setInitDate: function(){
            let startDate = new Date();
            let endDate = new Date();
            let sellDate = new Date();

            startDate.setHours(0,0,0,0);
            endDate.setHours(23,59,59,999);
            sellDate.setHours(9,0,0,0);

            DATE_SETTING.startDate = startDate.toUTCString();
            DATE_SETTING.endDate = endDate.toUTCString();
            DATE_SETTING.sellDate = sellDate.toUTCString();
        },
        designCalandar_ty: function () {
            $('#i_search_date').daterangepicker(
                {
                    language: 'kr',
                    singleDatePicker: true,
                    changeYear: true,
                    changeMonth: true,
                    autoApply: true,
                    dateFormat: 'yy-mm-dd',
                    cssClass: 'e-date-icon',
                    showMonthAfterYear: true,
                    showCustomRangeLabel: false,
                    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    ranges: { 
                        '오늘': [moment(), moment()], 
                        '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')], 
                        '2일전': [moment().subtract(2, 'days'), moment().subtract(2, 'days')], 
                        '7일전': [moment().subtract(7, 'days'), moment().subtract(7, 'days')], 
                        '14일전': [moment().subtract(14, 'days'), moment().subtract(14, 'days')], 
                        '21일전': [moment().subtract(21, 'days'), moment().subtract(21, 'days')], 
                        '30일전': [moment().subtract(30, 'days'), moment().subtract(30, 'days')], 
                        
                       },
                    locale: {
                        format: '선택된 날짜 : YYYY.MM.DD',
                        applyLabel: '적용',
                        cancelLabel: '취소',
                        customRangeLabel:'',
                        "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
                        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                    },
                },
                function (start, end) {
                    let startDate= new Date(start._d);
                    let endDate = new Date(end._d);
                    calandarHandler().dateChange(startDate,endDate);
                    } 
                )
        },
        dateChange: function (start,end) {
            let startDate= start;
            let endDate = end;
            let sellDate = startDate;
            
            sellDate.setHours(9,0,0,0);

            DATE_SETTING.startDate = startDate.toUTCString();
            DATE_SETTING.endDate = endDate.toUTCString();
            DATE_SETTING.sellDate = sellDate.toUTCString();
            // console.log(DATE_SETTING);

            eventItemHandler().itemSearchClick();
        },
        setCurrentTimeHtml: function () {
            let currentTime = new Date();
            $("#i_timezone_current_time").html(currentTime);
        }
    }
}