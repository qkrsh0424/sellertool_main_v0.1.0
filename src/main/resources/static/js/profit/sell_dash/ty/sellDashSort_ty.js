function eventTableSortHandler() {
    return {
        sortTableHandler: function() {
            $('.ty-st-sd-sort-icon').click(function() {
                var table = $(this).parents('table').eq(0)
                var rows = table.find('tr:gt(0)').toArray().sort(eventTableSortHandler().comparer($(this).index()))
                this.asc = !this.asc
                if (!this.asc) { rows = rows.reverse() }
                for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
            })
        },

        comparer: function(index) {
            return function(a, b) {
                var valA = eventTableSortHandler().getCellValue(a, index),
                    valB = eventTableSortHandler().getCellValue(b, index)
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
            }
        },

        getCellValue: function(row, index) {
            return $(row).children('td').eq(index).text()
        },

        isClickedCheck: function(id) {
            let selectedTalbeHd = $(`#ty_i_st_sd_table_sort_${id}`);
            if (selectedTalbeHd.hasClass('fas fa-sort')) {
                selectedTalbeHd.removeClass('fas fa-sort')
                selectedTalbeHd.addClass('ty-st-sd-table-sort-by-desc')
            } else if (selectedTalbeHd.hasClass('ty-st-sd-table-sort-by-desc')) {
                selectedTalbeHd.addClass('ty-st-sd-table-sort-by-asc')
                selectedTalbeHd.removeClass('ty-st-sd-table-sort-by-desc')
            } else if (selectedTalbeHd.hasClass('ty-st-sd-table-sort-by-asc')) {
                selectedTalbeHd.removeClass('ty-st-sd-table-sort-by-asc')
                selectedTalbeHd.addClass('ty-st-sd-table-sort-by-desc')
            }
        }
    }
}