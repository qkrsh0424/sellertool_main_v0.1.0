function calandarHandler() {
    return {
        loadInit: function() {
            this.setInitDate();
            this.designCalandar_ty();
        },
        setInitDate: function() {
            let startDate = moment().subtract(6, 'days');
            let endDate = moment();

            startDate._d.setHours(0, 0, 0, 0);
            endDate._d.setHours(23, 59, 59, 999);

            DATE_SETTING.startDate = startDate._d.toUTCString();
            DATE_SETTING.endDate = endDate._d.toUTCString();
        },
        designCalandar_ty: function() {

            $('#i_mdash_start_date').daterangepicker({
                    language: 'kr',
                    alwaysShowCalendars: true,
                    startDate: moment().subtract(6, 'days'),
                    endDate: moment(),
                    changeYear: true,
                    changeMonth: true,
                    autoApply: true,
                    dateFormat: 'yy-mm-dd',
                    cssClass: 'e-date-icon',
                    showMonthAfterYear: true,
                    // showCustomRangeLabel: false,
                    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    ranges: {
                        '오늘': [moment(), moment()],
                        '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        '지난7일': [moment().subtract(6, 'days'), moment()],
                        '지난14일': [moment().subtract(13, 'days'), moment()],
                        '지난30일': [moment().subtract(29, 'days'), moment()],
                        '이번달': [moment().startOf('month'), moment().endOf('month')],
                        '지난달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]

                    },
                    locale: {
                        format: 'YYYY.MM.DD',
                        applyLabel: '적용',
                        cancelLabel: '취소',
                        "customRangeLabel": "사용자설정",
                        "separator": " ~ ",
                        "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
                        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                    },
                },
                function(start, end) {
                    let startDate = new Date(start._d);
                    let endDate = new Date(end._d);
                    calandarHandler().dateChange(startDate, endDate);
                }
            )
        },
        formatDateFitInput: function(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        },
        dateChange: function(start, end) {
            let startDate = start;
            let endDate = end;

            DATE_SETTING.startDate = startDate.toUTCString();
            DATE_SETTING.endDate = endDate.toUTCString();

            console.log(DATE_SETTING);

            searchForData();

        },
    }
}