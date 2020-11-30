function calandarHandler(){
    return {
        loadInit: function(){
            this.setInitDate();
            this.setDateHtml();
        },
        setInitDate: function(){
            let startDate = new Date();
            let endDate = new Date();
            startDate.setDate(startDate.getDate() - 6);

            startDate.setHours(0,0,0,0);
            endDate.setHours(23,59,59,999);

            DATE_SETTING.startDate = startDate.toUTCString();
            DATE_SETTING.endDate = endDate.toUTCString();
        },
        setDateHtml: function(){
            let startDate = this.formatDateFitInput(DATE_SETTING.startDate);
            let endDate = this.formatDateFitInput(DATE_SETTING.endDate);
            $("#i_mdash_start_date").val(startDate);
            $("#i_mdash_end_date").val(endDate);
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
        dateChange: function(){
            return{
                changeStartDate: async function(event){
                    let startDate = new Date(event.value);
                    startDate.setHours(0,0,0,0);
                    DATE_SETTING.startDate = startDate.toUTCString();
                    
                },
                changeEndDate: async function(event){
                    let endDate = new Date(event.value);
                    endDate.setHours(23,59,59,999);
                    DATE_SETTING.endDate = endDate.toUTCString();
                }
            }
        }
    }
}