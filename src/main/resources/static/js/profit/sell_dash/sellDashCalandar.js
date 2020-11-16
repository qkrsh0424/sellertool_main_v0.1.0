function calandarHandler(){
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
        setDateHtml: function(){
            console.log(DATE_SETTING);
            let startDate = this.formatDateFitInput(DATE_SETTING.startDate);

            $("#i_search_date").val(startDate);
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
        dateChange: function(event){
            let startDate = new Date(event.value);
            let endDate = new Date(event.value);
            let sellDate = new Date(event.value);

            startDate.setHours(0,0,0,0);
            endDate.setHours(23,59,59,999);
            sellDate.setHours(9,0,0,0);

            DATE_SETTING.startDate = startDate.toUTCString();
            DATE_SETTING.endDate = endDate.toUTCString();
            DATE_SETTING.sellDate = sellDate.toUTCString();
            console.log(DATE_SETTING);
        },
        setCurrentTimeHtml: function(){
            let currentTime = new Date();
            $("#i_timezone_current_time").html(currentTime);
        }
    }
}