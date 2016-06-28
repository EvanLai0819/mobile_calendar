#  简单说明
---
年份选择

![](http://photo.gz-studio.com.cn/uploads/images/2016/06/23/146666567149946.png)

月份选择

![](http://photo.gz-studio.com.cn/uploads/images/2016/06/23/146666571362764.png)


## 使用方法

引入该项目中的CSS样式

	<link rel="stylesheet" href="calendar.min.css">

引入该项目中的JS样式

	<script src="calender.js"></script>

把imgs文件夹放在网站根目录

初始化日历

	<script>
	   $(function () {
        mobile_calender.init();
        })
	</script>

在所需日历的标签上加上onclick方法

	mobile_calender.openCalendar();