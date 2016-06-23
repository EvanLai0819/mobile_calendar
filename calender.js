/**
 * Created by Administrator on 2016/3/1.
 */

var mobile_calender = {
    quickDuration: 5,
    //设置当前的年月日
    cur_year: 0,
    cur_month: 0,
    cur_day: 0,
    //选择的年份和月份
    chose_month: 0,
    chose_year: 0,
    chose_day: 0,
    chose_week: 0,
    //调用的对象
    target: "",
    init: function () {
        $("input").attr("readonly",true);
        $("textarea").attr("readOnly",true);
        html = '<div id="mid"></div><div class="calendar"> <div class="calender_header"> <div class="calender_title">选择日期</div> <div class="week"> <span class="week_item holiday">日</span> <span class="week_item">一</span> <span class="week_item">二</span> <span class="week_item">三</span> <span class="week_item">四</span> <span class="week_item">五</span> <span class="week_item holiday">六</span></div></div><div class="calender_tools"><div class="chose_year_btn"></div> <div class="chose_month_btn"> </div> </div> <div class="calender_content"> <div class="day"> </div></div><div class="footer_month"><div class="footer_title">选择月份 <span class="footer_close"><img src="imgs/close.png" width="24" height="24"></span> </div><div class="chose_month"> <span class="chose_month_item" data-month="1" id="chose_month_1">1月</span><span class="chose_month_item" data-month="2" id="chose_month_2">2月</span> <span class="chose_month_item" data-month="3" id="chose_month_3">3月</span> <span class="chose_month_item" data-month="4" id="chose_month_4">4月</span> <span class="chose_month_item" data-month="5" id="chose_month_5">5月</span> <span class="chose_month_item" data-month="6" id="chose_month_6">6月</span> <span class="chose_month_item" data-month="7" id="chose_month_7">7月</span> <span class="chose_month_item" data-month="8" id="chose_month_8">8月</span> <span class="chose_month_item" data-month="9" id="chose_month_9">9月</span> <span class="chose_month_item" data-month="10" id="chose_month_10">10月</span> <span class="chose_month_item" data-month="11" id="chose_month_11">11月</span> <span class="chose_month_item" data-month="12" id="chose_month_12">12月</span> </div> </div> <div class="footer_year"> <div class="footer_title">选择年份 <span class="footer_close"><img src="imgs/close.png" width="24" height="24"></span> </div> <div class="chose_year"> <div class="chose_year_tools"> <span class="chose_yt_item"><img src="imgs/back.png" class="chose_year_back_btn"></span><span class="chose_yt_item"><img src="imgs/quickBack.png" class="chose_year_quickBack_btn"></span><span class="chose_yt_item"><input id="_year" value=""> </span><span class="chose_yt_item"><img src="imgs/quickNext.png" class="chose_year_quickNext_btn"></span><span class="chose_yt_item"><img src="imgs/next.png" class="chose_year_next_btn"></span> </div> <div class="chose_year"><span class="btn_red chose_year_button chose_year_certain_button">确定</span> <span class="btn_grey chose_year_button chose_year_cancel_button">取消</span></div></div></div> </div>';
        $("body").append(html);
        var mydate = new Date();
        //获取当前年份
        mobile_calender.cur_year = mydate.getFullYear();
        mobile_calender.cur_month = mydate.getMonth() + 1;
        mobile_calender.cur_day = mydate.getDate();

        //初始化MDay
        var MonthDay = mobile_calender.getMDay(mobile_calender.cur_year, mobile_calender.cur_month);
        //获取某月1日是星期几
        var week = mobile_calender.weekNumber(mobile_calender.cur_year, mobile_calender.cur_month, 1);
        //初始化时间
        this.appendDay(week, MonthDay, mobile_calender.cur_year, mobile_calender.cur_month);

        $(".chose_month_btn").click(function () {
            $("#mid").css("display", "block");
            $('.footer_month').show().animate({'bottom': '0px'}, 300);
        })

        $(".chose_year_btn").click(function () {
            $("#mid").css("display", "block");
            $("#_year").val(mobile_calender.cur_year);
            $('.footer_year').show().animate({'bottom': '0px'}, 300);
        })

        $(".footer_close").click(function () {
            $("#mid").css("display", "none");
            $('.footer_month').hide().animate({'bottom': '-177px'}, 300);
            $('.footer_year').show().animate({'bottom': '-177px'}, 300);
        })

        $(".day_item").click(function () {
            mobile_calender.chose_day = $(this).text();
            mobile_calender.chose_year = $(".chose_year_btn").data("year");
            mobile_calender.chose_month = $(".chose_month_btn").data("month");
            mobile_calender.closeCalendar();
        })

        $(".chose_month_item").click(function () {
            mobile_calender.chose_month = $(this).data("month");
            mobile_calender.chose_year = $("#_year").val();
            $(".chose_month_btn").data("month", mobile_calender.chose_month);
            $(".day").empty();
            $("#mid").css("display", "none");
            $('.footer_month').hide().animate({'bottom': '-177px'}, 300);
            mobile_calender.chose_week = mobile_calender.weekNumber(mobile_calender.chose_year, mobile_calender.chose_month, 1);
            MonthDay = mobile_calender.getMDay(mobile_calender.chose_year, mobile_calender.chose_month);
            mobile_calender.appendDay(mobile_calender.chose_week, MonthDay, mobile_calender.chose_year, mobile_calender.chose_month);
        })

        $(".chose_year_certain_button").click(function () {
            mobile_calender.chose_year = $("#_year").val();
            if (!mobile_calender.checkYear(mobile_calender.chose_year)) {
                return false;
            }
            $(".day").empty();
            $("#mid").css("display", "none");
            $('.footer_year').hide().animate({'bottom': '-177px'}, 300);
            mobile_calender.chose_month = $(".chose_month_btn").data("month");
            mobile_calender.chose_week = mobile_calender.weekNumber(mobile_calender.chose_year, mobile_calender.chose_month, 1);
            MonthDay = mobile_calender.getMDay(mobile_calender.chose_year, mobile_calender.chose_month);
            $(".chose_year_btn").data("year", mobile_calender.chose_year);
            mobile_calender.appendDay(mobile_calender.chose_week, MonthDay, mobile_calender.chose_year, mobile_calender.chose_month);
        })

        $(".chose_year_cancel_button").click(function () {
            $("#mid").css("display", "none");
            $('.footer_month').hide().animate({'bottom': '-177px'}, 300);
            $('.footer_year').show().animate({'bottom': '-177px'}, 300);
        })

        $(".chose_year_back_btn").click(function () {
            mobile_calender.yearOpt(1, "sub");
        })

        $(".chose_year_next_btn").click(function () {
            mobile_calender.yearOpt(1, "plus");
        })

        $(".chose_year_quickBack_btn").click(function () {
            mobile_calender.yearOpt(mobile_calender.quickDuration, "sub");
        })

        $(".chose_year_quickNext_btn").click(function () {
            mobile_calender.yearOpt(mobile_calender.quickDuration, "plus");
        })
    },
    getMDay: function (y, m) {
        var mday = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)//判断是否是闰月
            mday[1] = 29;
        return mday[m - 1];
    },
    weekNumber: function (y, m, d) {
        var wk;
        if (m <= 12 && m >= 1) {
            for (var i = 1; i < m; ++i) {
                d += this.getMDay(y, i);
            }
        }
        /*根据日期计算星期的公式*/
        wk = (y - 1 + (y - 1) / 4 - (y - 1) / 100 + (y - 1) / 400 + d) % 7;
        //0对应星期天，1对应星期一
        return parseInt(wk);
    },
    appendDay: function (week, Monthday, year, month) {
        //计算出1号前面有多少个空格
        var html = "";
        for (var i = 0; i < week; i++) {
            html += '<span class="day_item day_none"> </span>';
        }

        //填充正式数据
        for (var i = 1; i <= Monthday; i++) {
            var day_week = mobile_calender.weekNumber(year, month, i);
            var item_class = "";

            if (day_week == 0 || day_week == 6) {
                item_class += " holiday ";
            }

            if (i < mobile_calender.cur_day && month == mobile_calender.cur_month && year == mobile_calender.cur_year) {
                item_class += " day_grey ";
            }

            if (i == mobile_calender.cur_day && month == mobile_calender.cur_month && year == mobile_calender.cur_year) {
                item_class += " today ";
            }

            html += '<span class="day_item ' + item_class + '">' + i + '</span>';
        }

        $(".day").append(html);
        $(".chose_year_btn").html(year + " 年");
        $(".chose_month_btn").html(month + " 月");
        $(".chose_month_btn").data("month", month);
        $(".chose_year_btn").data("year", year);

        $(".day_item").click(function () {
            mobile_calender.chose_day = $(this).text();
            mobile_calender.chose_year = $(".chose_year_btn").data("year");
            mobile_calender.chose_month = $(".chose_month_btn").data("month");
            mobile_calender.closeCalendar();
        })
    },
    yearOpt: function (duration, opt) {
        var year = $("#_year").val();
        if (opt == "plus") {
            year = parseInt(year) + duration;
        } else {
            year = year - duration;
        }
        $("#_year").val(year);
    },
    checkYear: function (year) {
        if (!/^\d{4}$/.test(year)) {
            alert("请输入正确的年份");
            return false;
        }
        return true;
    },
    openCalendar: function () {
        mobile_calender.target = event.target;
        $(".calendar").css("display", "block");
    },
    closeCalendar: function () {
        $(mobile_calender.target).val(mobile_calender.chose_year + "-" + mobile_calender.chose_month + "-" + mobile_calender.chose_day);
        $(".calendar").css("display", "none");
    }
}


